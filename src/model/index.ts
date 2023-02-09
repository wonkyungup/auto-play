import Defs from '../assets/constants';
import Utils from '../assets/utils';

export default class Storage {
    static async init () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: false });
    }

    static async setDisableValue () {
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
        await Utils.setIcon();
    }
}
