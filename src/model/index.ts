import Defs from '../assets/constants';

export default class Storage {
    static async init () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: false });
    }

    static getValue () {
        return new Promise(resolve => {
            chrome.storage.sync.get([Defs.STORAGE_KEY], (result) => {
                resolve(result.state);
            });
        });
    }

    static async onToggleValue () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: !await Storage.getValue() });
    }
}
