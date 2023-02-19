import DB from './model';
import Tabs from './assets/tabs';
import Defs from './assets/constants';
import Utils from './assets/utils';

const db = new DB();

window.onload = async () => await db.disabled();
chrome.runtime.onMessage.addListener(async () => await db.disabled());

const onWatchTab = async () => {
    const tabId = await db.getActiveTabSync();
    if (tabId) {
        const tabs = <any>await Tabs.getAllTabSync();
        const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));

        if (activeTab.length > 0) {
            if (Utils.isInValidToUrl(activeTab[0].url) && await db.getStateIconSync()) {
                await db.disabled();
            }

            chrome.tabs.sendMessage(<number>tabId, {
                action: Utils.isValidToYoutubeShort(activeTab[0].url) ? Defs.STR_YOUTUBE : Defs.STR_TIKTOK
            });
        }
    }
}

Tabs.onActivatedTab(async () => await onWatchTab());
Tabs.onUpdatedTab(async ()  => await onWatchTab());
Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    if (Utils.isInValidToUrl(url) && !await db.getStateIconSync())
        chrome.tabs.sendMessage(id, { action: Defs.URI_ERROR });
    else
        await db.toggleStateIcon();

        if (await db.getActiveTabSync() && !await db.getStateIconSync()) {
            await onWatchTab();
            return;
        }

        await db.setActiveTab(id);
        chrome.tabs.sendMessage(id, {
            action: Utils.isValidToYoutubeShort(url) ? Defs.STR_YOUTUBE : Defs.STR_TIKTOK
        });
})
