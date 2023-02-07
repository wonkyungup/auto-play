import Defs from './constants';
import Storage from '../model';

export default class Utils {
    static async onErrorHandler (id: number) {
        await Storage.init();
        console.error('Utils :: ERROR :: Handler');
        chrome.tabs.sendMessage(id, { action: Defs.ACTION_ERROR });
    }

    static async onValidToUri (url: string) {
        const list = Defs.URI_LIST;
        return list.map(keyword => (url != null) ? url.includes(keyword) : '');
    }

    static async setIcon ()  {
        if (await Storage.getValue()) {
            chrome.browserAction.setIcon({ path: Defs.ICON_ENABLE });
        } else {
            chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
        }
    }
}
