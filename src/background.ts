import Storage from './model';
import Tabs from './assets/tabs'
import Defs from './assets/constants'

interface TypeActiveTab {
    id: number,
    url: string
}

window.onload = async () => {
    await Storage.disabled();
};

Tabs.onActivatedTab(async ({ id, url }: TypeActiveTab) => {
    if (Tabs.isValidToChromeExtend(url)) {
        await Storage.disabled();
        return;
    }

    chrome.tabs.sendMessage(id, { onClick: false, url: url });
})

Tabs.onUpdatedTab(async ({ id, url }: TypeActiveTab) => {
    if (Tabs.isValidToChromeExtend(url)) {
        await Storage.disabled();
        return;
    }

    chrome.tabs.sendMessage(id, { onClick: false, url: url });
})

Tabs.onClickIconTab(async ({ id, url }: TypeActiveTab) => {
    if (Tabs.isValidToChromeExtend(url)) {
        await Storage.disabled();
        return;
    }

    await Storage.toggle();
    chrome.tabs.sendMessage(id, { onClick: true, url: url });
})

chrome.runtime.onMessage.addListener(async ({ message }) => {
    switch (message) {
        case Defs.STR_INVALID_URI:
        case Defs.STR_ERROR:
        default:
            await Storage.disabled();
            break
    }
})
