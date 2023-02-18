import Storage from './model';
import Tabs from './assets/tabs';
import Defs from './assets/constants';

window.onload = async () => {
    await Storage.disabled();
};

const onWatchTab = async () => {
    const tabId = await Storage.getValue(Defs.STORAGE_TAB_KEY);
    if (tabId) {
        const tabs = <any>await Tabs.getAllTabSync();
        const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));
        let method = '';

        if (activeTab.length <= 0) {
            await Storage.disabled();
        }

        if (Tabs.isValidToYoutubeShort(activeTab[0].url)) {
            method = Defs.STR_YOUTUBE;
        }

        if (Tabs.isValidToTikTok(activeTab[0].url)) {
            method = Defs.STR_TIKTOK;
        }

        chrome.tabs.sendMessage(<number>tabId, { action: method, url: activeTab[0].url });
    }
}

Tabs.onActivatedTab(async () => {
    await onWatchTab();
});

Tabs.onUpdatedTab(async ()  => {
    await onWatchTab()
});

Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    let method = '';
    const isInValidToUrl = (!Tabs.isValidToTikTok(url) && !Tabs.isValidToYoutubeShort(url));

    if (isInValidToUrl
        && !await Storage.getValue(Defs.STORAGE_ICON_KEY)
    ) {
        await Storage.disabled();
        chrome.tabs.sendMessage(id, { action: Defs.STR_ERROR });
    } else {
        await Storage.toggle();

        if (await Storage.getValue(Defs.STORAGE_TAB_KEY)
            && !await Storage.getValue(Defs.STORAGE_ICON_KEY)
        ) {
            await onWatchTab();
            return;
        }

        if (Tabs.isValidToYoutubeShort(url)) {
            method = Defs.STR_YOUTUBE;
        }

        if (Tabs.isValidToTikTok(url)) {
            method = Defs.STR_TIKTOK;
        }

        await Storage.activeTabId(id);
        chrome.tabs.sendMessage(id, { action: method, url: url });
    }
})
