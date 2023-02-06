import Storage from './model';
import { Tabs, Utils, Defs } from './assets';

window.onload = async () => {
    await Storage.init();
};

chrome.runtime.onMessage.addListener(async req => {
    if (req.action === Defs.ACTION_CLICK) {
        Tabs.onUpdatedTab(async (id, url) => {
            await Tabs.onCheckValidUrl(id, url);
        })
    }
})

Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    try {
        if (await Utils.isValidToUri(url)) {
            chrome.tabs.sendMessage(id, { action: Defs.ACTION_USE });
            return;
        }

        await Storage.onToggleValue();
        await Utils.setIcon();

        if (await Storage.getValue()) {
            // start auto play
            chrome.tabs.sendMessage(id, { action: Defs.ACTION_AUTO_PLAY });
        } else {
            // pause auto play
        }
    } catch (err) {
        await Utils.onErrorHandler(id);
    }
})

Tabs.onActivatedTab(async ({ id, url }: { id: number, url: string }) => {
    await Tabs.onCheckValidUrl(id, url);
})
