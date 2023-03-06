import Browser from "webextension-polyfill";
import Defs from "./constants";

interface Option {
    id: string,
    title: string,
    contexts: any[]
}

export default class ContextMenu {
    constructor() {
        const option: Option = {
            id: Defs.CONTEXT_MENU_OPTION_ID,
            title: Defs.CONTEXT_MENU_OPTION_TITLE,
            contexts: Defs.CONTEXT_MENU_CONTEXTS
        }

        Browser.contextMenus.create(option)
    }

    onHandlerContextMenu () {
        Browser.contextMenus.onClicked.addListener(async (menuInfo) => {
            const { menuItemId } = menuInfo

            switch (menuItemId) {
                case Defs.CONTEXT_MENU_OPTION_ID:
                    await Browser.windows.create({
                        url: 'https://stackoverflow.com/questions/33361715/open-extension-popup-when-click-on-context-menu',
                        focused: true,
                        type: 'popup',
                        width: 640,
                        height: 480
                    });
                    break;
                default:
                    break;
            }
        })
    }
}
