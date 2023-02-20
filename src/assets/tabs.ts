import Browser from 'webextension-polyfill';

export default class Tabs {
     static async getTabInfo (id: number) {
        return await Browser.tabs.get(<number>id);
    };

    static onClickIconTab (cb: (args: any) => void) {
        Browser.browserAction.onClicked.addListener(async ({id}) => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            cb(await Tabs.getTabInfo(<number>id));
        });
    };

    static onActivatedTab (cb: () => void) {
        Browser.tabs.onActivated.addListener(() => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            cb();
        });
    };

    static onUpdatedTab (cb: () => void) {
        Browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (Browser.runtime.lastError) {
                console.error(Browser.runtime.lastError);
            }

            if (changeInfo.url) cb();
        });
    };

    static async getAllTabSync () {
        return await Browser.tabs.query({});
    }
};
