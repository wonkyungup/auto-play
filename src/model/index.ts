import Defs from '../assets/constants';

export default class DB {
    getStateIconSync () {
        return new Promise(resolve => {
            chrome.storage.sync.get([Defs.DB_ICON], (result) => {
                resolve(result[Defs.DB_ICON]);
            });
        });
    }

    getActiveTabSync () {
        return new Promise(resolve => {
            chrome.storage.sync.get([Defs.DB_TAB], (result) => {
                resolve(result[Defs.DB_TAB]);
            });
        });
    }


    async setActiveTab (id: number) {
        if (await this.getStateIconSync())
            await chrome.storage.sync.set({ [Defs.DB_TAB]: id });
        else
            await chrome.storage.sync.set({ [Defs.DB_TAB]: '' });
    }

    async disabled () {
        await chrome.storage.sync.set({ [Defs.DB_ICON]: false });
        await chrome.storage.sync.set({ [Defs.DB_TAB]: '' });
        chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
    }

    async toggleStateIcon () {
        await chrome.storage.sync.set({ [Defs.DB_ICON]: !await this.getStateIconSync() });
        await this.doesMatchIcon();
    }

    async doesMatchIcon () {
        if (await this.getStateIconSync())
            chrome.browserAction.setIcon({ path: Defs.ICON_ENABLE });
        else
            chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
    }
}
