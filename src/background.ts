import Browser from 'webextension-polyfill';
import DB from './model';
import Tabs from './assets/tabs';
import Defs from './assets/constants';

const db = new DB();

window.onload = async () => await db.disabled();
Browser.runtime.onMessage.addListener(async () => await db.disabled());

const isValidToYoutubeShort = (url: string) => url.includes(Defs.URI_YOUTUBE_SHORTS);
const onWatchTab = async () => {
    const tabId = await db.getActiveTabSync();
    if (tabId) {
        const tabs = <any[]>await Tabs.getAllTabSync();
        const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));

        if (activeTab.length > 0) {
            const { id, url } = activeTab[0];
            if (!isValidToYoutubeShort(url) && await db.getStateIconSync()) {
                await db.disabled();
            }

            await Browser.tabs.sendMessage(<number>id, Defs.STR_YOUTUBE_SHORTS);
        } else {
            await db.disabled();
        }
    }
}

Tabs.onActivatedTab(async () => await onWatchTab());
Tabs.onUpdatedTab(async ()  => await onWatchTab());
Tabs.onClickIconTab(async ({ id, url }: { id: number, url: string }) => {
    if (!isValidToYoutubeShort(url) && !await db.getStateIconSync()) {
        await Browser.tabs.sendMessage(id, Defs.URI_ERROR);
    } else {
        await db.toggleStateIcon();

        if (await db.getActiveTabSync() && !await db.getStateIconSync()) {
            return await onWatchTab();
        }

        await db.setActiveTab(id);
        await Browser.tabs.sendMessage(id, Defs.STR_YOUTUBE_SHORTS);
    }
})
