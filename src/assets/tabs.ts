import Defs from './constants'

export default class Tabs {
    static onClickIconTab (cb: (args: any) => void) {
        chrome.browserAction.onClicked.addListener(async ({id}) => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(await Tabs.getTabInfo(<number>id));
        });
    };

    static getTabInfo (id: number) {
        return new Promise(resolve => {
            chrome.tabs.get(<number>id, (tab) => {
                resolve(tab);
            })
        });
    };

    static onActivatedTab (cb: (args: any) => void) {
        chrome.tabs.onActivated.addListener(async activeInfo => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(await Tabs.getTabInfo(activeInfo.tabId));
        });
    };

    static onUpdatedTab (cb: (args: { id: number, url: string }) => void) {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (changeInfo.url) {
                cb({ id: tabId, url: changeInfo.url });
            }
        });
    };

    static isValidToChromeExtend (url: string) {
        return url.includes(Defs.URI_CHROME_EXTEND);
    }

    static isInValidToUri () {
        return new Promise(resolve => {
            chrome.tabs.query({}, (tabs) => {
                let urls = Array.from(tabs);
                if (urls.length > 0) {
                    resolve(urls.map(info => info.url).filter((url: any) => url.includes(Defs.URI_YOUTUBE_SHORTS).length <= 0));
                }
            })
        })
    }
};
