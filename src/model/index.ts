import Defs from '../assets/constants';
import Utils from '../assets/utils';

export default class Storage {
    static async init () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: false, height: 0 });
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

    static getHeight () {
        return new Promise(resolve => {
            chrome.storage.sync.get(['height'], (result) => {
                resolve(result.height);
            });
        });
    }
    static async onToggleValue () {
        await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: !await Storage.getValue() });
        await Utils.setIcon();
    }

    static async setHeight (height: number) {
        await chrome.storage.sync.set({ height: height });
    }
}
