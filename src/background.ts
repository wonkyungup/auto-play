import Browser from 'webextension-polyfill';
import Defs from "./assets/constants";
import DB from './model';
import Tabs from './assets/tabs';
import ContextMenu from "./assets/contextMenu";

const db = new DB();
const tabs = new Tabs();
const contextMenu = new ContextMenu();

tabs.onHandlerTabs();
contextMenu.onHandlerContextMenu();

Browser.runtime.onMessage.addListener(async (req) => {
    switch (req) {
        case Defs.STR_ERROR:
        default:
            await db.disabled();
            break;
    }
});
