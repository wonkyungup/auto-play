import Defs from '../assets/constants';
import Browser from 'webextension-polyfill';

export default class DB {
    async getStateIconSync () {
        const _obj = await Browser.storage.sync.get([Defs.DB_ICON]);
        return _obj[Defs.DB_ICON];
    }

    async getActiveTabSync () {
        const _obj = await Browser.storage.sync.get([Defs.DB_TAB]);
        return _obj[Defs.DB_TAB];
    }


    async setActiveTab (id: number) {
        if (await this.getStateIconSync()) {
            await Browser.storage.sync.set({ [Defs.DB_TAB]: id });
        } else {
            await Browser.storage.sync.set({ [Defs.DB_TAB]: '' });
        }
    }

    async disabled () {
        await Browser.storage.sync.set({ [Defs.DB_ICON]: false });
        await Browser.storage.sync.set({ [Defs.DB_TAB]: '' });
        await Browser.action.setIcon({ path: Defs.ICON_DISABLE });
    }

    async toggleStateIcon () {
        await Browser.storage.sync.set({ [Defs.DB_ICON]: !await this.getStateIconSync() });
        await this.doesMatchIcon();
    }

    async doesMatchIcon () {
        if (await this.getStateIconSync()) {
            await Browser.action.setIcon({ path: Defs.ICON_ENABLE });
        } else {
            await Browser.action.setIcon({ path: Defs.ICON_DISABLE });
        }
    }
}
