import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

const isValidToUrl = (url: string) => url.includes(Defs.URL_YOUTUBE_SHORTS);

Browser.runtime.onMessage.addListener(async (request, sender) => {
  try {
    switch (request) {
      case Defs.EVENT_PAGE_RELOAD:
        return Browser.tabs.sendMessage(
          <number>sender.tab?.id,
          Defs.EVENT_URL_DETECTION,
        );
      case Defs.EVENT_PAGE_LISTENER:
        Browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
          if (Browser.runtime.lastError) {
            throw new Error(<any>Browser.runtime.lastError);
          }

          if (changeInfo.url && isValidToUrl(changeInfo?.url)) {
            return await Browser.tabs.sendMessage(
              tabId,
              Defs.EVENT_URL_DETECTION,
            );
          }
        });
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(`BACKGROUND :: LISTENER :: ERROR :: ${e}`);
  }
  return false;
});
