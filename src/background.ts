import Storage from './model';
import { Tabs, Utils, Defs } from './assets';

window.onload = async () => {
    await Storage.init();
    await Utils.setIcon();
};

Tabs.onActivatedTab(async ({ id, url }: { id: number, url: string }) => {
    if (!await Tabs.isCheckValidTabUrl(url)) {
        await Storage.setDisableValue();
        await Utils.setIcon();
    }

    chrome.tabs.sendMessage(id, { action: Defs.ACTION_AUTO_PLAY, url: url });
})

Tabs.onUpdatedTab(async (id, url) => {
    if (!await Tabs.isCheckValidTabUrl(url)) {
        await Storage.init();
        await Utils.setIcon();
    } else {
        chrome.tabs.sendMessage(id, { action: Defs.ACTION_AUTO_PLAY, url: url });
    }
})

Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    if (!await Tabs.isCheckValidTabUrl(url)) {
        chrome.tabs.sendMessage(id, { action: Defs.ACTION_ERROR });
    } else {
        await Storage.onToggleValue();
        chrome.tabs.sendMessage(id, { action: Defs.ACTION_AUTO_PLAY, url: url });
    }
})
