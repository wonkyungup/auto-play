import Defs from '../assets/constants';

export default class Storage {
    static getValue () {
        return new Promise(resolve => {
            chrome.storage.sync.get([Defs.STORAGE_KEY], (result) => {
                resolve(result.state);
            });
        });
    }

    static async disabled () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: false });
        chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
    }

    static async toggle () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: !await Storage.getValue() });
        await Storage.setMatchIcon();
    }

    static async setMatchIcon () {
        if (await Storage.getValue()) chrome.browserAction.setIcon({ path: Defs.ICON_ENABLE });
        else chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
     }
}
