import Storage from './model';
import { Tabs, Utils, Defs } from './assets';

window.onload = async () => {
    await Storage.init();
};

Tabs.onActivatedTab(async ({ id, url }: { id: number, url: string }) => {
    await Tabs.onCheckValidUrl(id, url);
})

chrome.runtime.onMessage.addListener(async req => {
    const { action, height } = req;

    switch (action) {
        case Defs.ACTION_CLICK:
            Tabs.onUpdatedTab(async (id, url) => {
                await Tabs.onCheckValidUrl(id, url);
            })
            break
        case Defs.ACTION_SCROLL_DOWN:
            Tabs.onUpdatedTab(async (id, url) => {
                console.log(height);
                chrome.tabs.sendMessage(id, {
                    action: Defs.ACTION_AUTO_PLAY,
                    state: await Storage.getValue(),
                    useURI: await Utils.onValidToUri(url),
                    height: height
                });
            })
            break
        default:
            break
    }
})

Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    try {
        const isValidToUri = (await Utils.onValidToUri(url)).filter(isState => isState).length <= 0;
        if (isValidToUri) {
            throw new Error('isValidToUri :: ERROR');
            return;
        }

        await Storage.onToggleValue();
        await Utils.setIcon();

        chrome.tabs.sendMessage(id, {
            action: Defs.ACTION_AUTO_PLAY,
            state: await Storage.getValue(),
            useURI: await Utils.onValidToUri(url),
            height: 0,
        });
    } catch (err) {
        await Utils.onErrorHandler(id);
    }
})
