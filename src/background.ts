import Browser from 'webextension-polyfill';
import Defs from '@/assets/constatns';

Browser.runtime.onMessage.addListener(async ({ event }, sender) => {
  try {
    switch (event) {
      case Defs.EVENT_PAGE_RELOAD:
        return Browser.tabs.sendMessage(<number>sender.tab?.id, {
          event: Defs.EVENT_PAGE_RELOAD,
        });
      case Defs.EVENT_PAGE_UPDATE:
        let captured = false;
        Browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
          if (
            !captured &&
            changeInfo.status === 'complete' &&
            tab?.url !== undefined
          ) {
            captured = true;
            return await Browser.tabs.sendMessage(tabId, {
              event: Defs.EVENT_PAGE_UPDATE,
            });
          }
        });
        break;
      default:
        break;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(`BACKGROUND :: LISTENER :: ERROR :: ${e.message}`);
    }
  }
});
