import Defs from './constants';

export default class Tabs {
    static getTabInfo (id: number) {
        return new Promise(resolve => {
            chrome.tabs.get(<number>id, (tab) => {
                resolve(tab);
            })
        });
    };

    static onClickIconTab (cb: (args: any) => void) {
        chrome.browserAction.onClicked.addListener(async ({id}) => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb(await Tabs.getTabInfo(<number>id));
        });
    };

    static onActivatedTab (cb: () => void) {
        chrome.tabs.onActivated.addListener(() => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            cb();
        });
    };

    static isValidToUrl (url: string) {
        return url.includes(Defs.URI_YOUTUBE_SHORTS);
    }

    static isInValidToUrl (url: string) {
        return (url.includes(Defs.URI_CHROME_EXTEND) || !url.includes(Defs.URI_YOUTUBE_SHORTS));
    }

    static onUpdatedTab (cb: () => void) { // back -> content
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            if (changeInfo.url) cb();
        });
    };

    static getAllTabSync () {
        return new Promise(resolve => {
            chrome.tabs.query({}, tabs => {
                if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
                resolve(tabs);
            })
        })
    }
};
