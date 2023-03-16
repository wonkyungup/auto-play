import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

const isValidToUrl = (url: string) => url.includes(Defs.URL_YOUTUBE_SHORTS);

Browser.runtime.onMessage.addListener(async ({ event }, sender) => {
  try {
    switch (event) {
      case Defs.EVENT_PAGE_RELOAD:
        return Browser.tabs.sendMessage(
          <number>sender.tab?.id,
          Defs.EVENT_PAGE_RELOAD,
        );
      case Defs.EVENT_PAGE_LISTENER:
        Browser.tabs.onUpdated.addListener(async function listener(
          tabId,
          changeInfo,
          tab,
        ) {
          if (changeInfo.status === 'complete' && tab?.url !== undefined) {
            Browser.tabs.onUpdated.removeListener(await listener);
            await Browser.tabs.sendMessage(tabId, {
              event: Defs.EVENT_PAGE_LISTENER,
            });
            return;
          }
        });
        break;
      default:
        break;
    }
  } catch (e: any) {
    console.log(`BACKGROUND :: LISTENER :: ERROR :: ${e.message}`);
  }
  return false;
});
