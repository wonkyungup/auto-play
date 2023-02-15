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

const onWatchTab = async () => {
    const tabId = await Storage.getValue(Defs.STORAGE_TAB_KEY);
    if (tabId) {
        const tabs = <any>await Tabs.getAllTabSync();
        const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));

        if (activeTab.length <= 0) {
            await Storage.disabled();
        }

        chrome.tabs.sendMessage(<number>tabId, { action: Defs.STR_YOUTUBE });
    }
}

Tabs.onActivatedTab(async () => await onWatchTab());
Tabs.onUpdatedTab(async ()  => await onWatchTab());

Tabs.onClickIconTab(async ({ id, url }: TypeActiveTab) => {
    if (Tabs.isInValidToUrl(url) && !await Storage.getValue(Defs.STORAGE_ICON_KEY)) {
        await Storage.disabled();
        chrome.tabs.sendMessage(id, { action: Defs.STR_ERROR });
    } else {
        await Storage.toggle();

        const tabId = await Storage.getValue(Defs.STORAGE_TAB_KEY);
        if (tabId && !await Storage.getValue(Defs.STORAGE_ICON_KEY)) {
            await onWatchTab();
            return;
        }

        await Storage.activeTabId(id);
        chrome.tabs.sendMessage(id, { action: Defs.STR_YOUTUBE });
    }
})
