import Defs from '../assets/constants';

export default class Storage {
    static getValue (target: string) {
        return new Promise(resolve => {
            chrome.storage.sync.get([target], (result) => {
                switch (target) {
                    case Defs.STORAGE_ICON_KEY:
                        resolve(result[Defs.STORAGE_ICON_KEY]);
                        break;
                    case Defs.STORAGE_TAB_KEY:
                        resolve(result[Defs.STORAGE_TAB_KEY]);
                        break;
                    default:
                        break;
                }
            });
        });
    }

    static async activeTabId (id: number) {
        if (await Storage.getValue(Defs.STORAGE_ICON_KEY)) await chrome.storage.sync.set({ [Defs.STORAGE_TAB_KEY]: id });
        else await chrome.storage.sync.set({ [Defs.STORAGE_TAB_KEY]: '' });
    }

    static async disabled () {
        await chrome.storage.sync.set({ [Defs.STORAGE_ICON_KEY]: false });
        await chrome.storage.sync.set({ [Defs.STORAGE_TAB_KEY]: '' });
        chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
    }

    static async toggle () {
        await chrome.storage.sync.set({ [Defs.STORAGE_ICON_KEY]: !await Storage.getValue(Defs.STORAGE_ICON_KEY) });
        await Storage.setMatchIcon();
    }

    static async setMatchIcon () {
        if (await Storage.getValue(Defs.STORAGE_ICON_KEY)) chrome.browserAction.setIcon({ path: Defs.ICON_ENABLE });
        else chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
     }
}
