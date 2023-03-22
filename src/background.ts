import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

Browser.runtime.onMessage.addListener(async ({ event }, sender) => {
  try {
    switch (event) {
      case Defs.EVENT_PAGE_RELOAD:
        return Browser.tabs.sendMessage(<number>sender.tab?.id, {
          event: Defs.EVENT_PAGE_RELOAD,
        });
      case Defs.EVENT_PAGE_UPDATE:
        Browser.tabs.onUpdated.addListener(async function listener(
          tabId,
          changeInfo,
          tab,
        ) {
          if (changeInfo.status === 'complete' && tab?.url !== undefined) {
            Browser.tabs.onUpdated.removeListener(await listener);
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
