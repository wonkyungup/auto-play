import Storage from './model';
import Tabs from './assets/tabs';
import Defs from './assets/constants';

interface TypeActiveTab {
    id: number,
    url: string
}

window.onload = async () => {
    await Storage.disabled();
};

Tabs.onActivatedTab(async ({ id, url }: TypeActiveTab) => {
    if (!Tabs.isValidToUrl(url)) {
        chrome.tabs.sendMessage(id, { action: Defs.STR_YOUTUBE });
    }
})

Tabs.onClickIconTab(async ({ id, url }: TypeActiveTab) => {
    if (Tabs.isInValidToUrl(url) && !await Storage.getValue()) {
        await Storage.disabled();
        chrome.tabs.sendMessage(id, { action: Defs.STR_ERROR });
    } else {
        await Storage.toggle();
        chrome.tabs.sendMessage(id, { action: Defs.STR_YOUTUBE });
    }
})
