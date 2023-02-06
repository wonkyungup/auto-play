import { Utils } from "./index";
import Storage from "../model";

export default class Tabs {
    static onClickIconTab (cb: (arg0: any) => void) {
        chrome.browserAction.onClicked.addListener(async ({id}) => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(await Tabs.getTabInfo(<number>id));
        });
    };

    static onQueryTab (cb: (arg0: any) => void) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(tab);
        });
    }

    static onActivatedTab (cb: (arg0: any) => void) {
        chrome.tabs.onActivated.addListener(async activeInfo => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(await Tabs.getTabInfo(activeInfo.tabId));
        })
    }

    static getTabInfo (id: number) {
        return new Promise(resolve => {
            chrome.tabs.get(<number>id, (tab) => {
                resolve(tab);
            })
        })
    }

    static onUpdatedTab (cb: (arg0: any, url: string) => void) {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.url) {
                cb(tabId, changeInfo.url);
            }
        })
    }

    static async onCheckValidUrl (id: number , url: string) {
        try {
            if (await Storage.getValue() && await Utils.isValidToUri(url)) {
                await Storage.init();
                await Utils.setIcon();
            }
        } catch (err) {
            await Utils.onErrorHandler(id);
        }
    }
};
