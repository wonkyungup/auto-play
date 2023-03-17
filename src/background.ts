import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

Browser.runtime.onMessage.addListener(async ({ event }, sender) => {
  try {
    if (event === Defs.EVENT_PAGE_UPDATE) {
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
    }
  } catch (e: any) {
    if (e) {
      console.log(`BACKGROUND :: LISTENER :: ERROR :: ${e.message}`);
    }
  }
});
