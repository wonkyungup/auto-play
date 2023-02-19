import DB from './model';
import Tabs from './assets/tabs';
import Defs from './assets/constants';

const db = new DB();

window.onload = async () => await db.disabled();
chrome.runtime.onMessage.addListener(async () => await db.disabled());

const isValidToYoutubeShort = (url: string) => {
    return url.includes(Defs.URI_YOUTUBE_SHORTS);
}

const onWatchTab = async () => {
    const tabId = await db.getActiveTabSync();
    if (tabId) {
        const tabs = <any>await Tabs.getAllTabSync();
        const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));

        if (activeTab.length > 0) {
            if (!isValidToYoutubeShort(activeTab[0].url) && await db.getStateIconSync()) {
                await db.disabled();
            }

            chrome.tabs.sendMessage(<number>tabId, { action: Defs.STR_YOUTUBE });
        }
    }
}

Tabs.onActivatedTab(async () => await onWatchTab());
Tabs.onUpdatedTab(async ()  => await onWatchTab());
Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    if (!isValidToYoutubeShort(url) && !await db.getStateIconSync())
        chrome.tabs.sendMessage(id, { action: Defs.URI_ERROR });
    else
        await db.toggleStateIcon();

        if (await db.getActiveTabSync() && !await db.getStateIconSync()) {
            await onWatchTab();
            return;
        }

        await db.setActiveTab(id);
    chrome.tabs.sendMessage(id, { action: Defs.STR_YOUTUBE });
})
