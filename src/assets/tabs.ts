import Browser from 'webextension-polyfill';
import Defs from "./constants";
import DB from "../model";

const db = new DB();

export default class Tabs {
    isValidToYoutubeShort (url: string) {
        return url.includes(Defs.URI_YOUTUBE_SHORTS);
    };

    async getTabInfo (id: number) {
        return await Browser.tabs.get(<number>id);
    };

    onClickIconTab () {
        Browser.action.onClicked.addListener(async ({id}) => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            try {
                const tab = await this.getTabInfo(<number>id);
                if (!this.isValidToYoutubeShort(<string>tab.url) && !await db.getStateIconSync()) await Browser.tabs.sendMessage(<number>tab.id, Defs.URI_ERROR);
                else {
                    await db.toggleStateIcon();

                    if (await db.getActiveTabSync() && !await db.getStateIconSync()) {
                        return await this.onWatchTab();
                    }

                    await db.setActiveTab(<number>tab.id);
                    await Browser.tabs.sendMessage(<number>tab.id, Defs.STR_YOUTUBE_SHORTS);
                }
            } catch (err) {
                console.log(err);
            }
        });
    };

    onActivatedTab () {
        Browser.tabs.onActivated.addListener(async () => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            await this.onWatchTab();
        });
    };

    onUpdatedTab () {
        Browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            if (changeInfo.url) {
                await this.onWatchTab();
            }
        });
    };

    async getAllTabSync () {
        return await Browser.tabs.query({});
    }

    async onWatchTab () {
        const tabId = await db.getActiveTabSync();
        try {
            if (tabId) {
                const tabs = <any[]>await this.getAllTabSync();
                const activeTab = tabs.filter((info: { id: number }) => info?.id === Number(tabId));

                if (activeTab.length <= 0) await db.disabled();
                else {
                    const { id, url } = activeTab[0];
                    if (!this.isValidToYoutubeShort(url) && await db.getStateIconSync()) {
                        await db.disabled();
                    }

                    await Browser.tabs.sendMessage(id, Defs.STR_YOUTUBE_SHORTS);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    onHandlerTabs () {
       this.onClickIconTab();
       this.onActivatedTab();
       this.onUpdatedTab();
    }
};
