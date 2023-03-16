import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

const isValidToUrl = (url: string) => url.includes(Defs.URL_YOUTUBE_SHORTS);

Browser.runtime.onMessage.addListener(async (request, sender) => {
  try {
    switch (request) {
      case Defs.EVENT_PAGE_RELOAD:
        return Browser.tabs.sendMessage(
          <number>sender.tab?.id,
          Defs.EVENT_PAGE_RELOAD,
        );
      case Defs.EVENT_PAGE_LISTENER:
        Browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
          console.log(changeInfo);
          if (isValidToUrl(<string>changeInfo?.url)) {
            if (changeInfo.status === 'completed' && tab?.url !== undefined) {
              return await Browser.tabs.sendMessage(
                tabId,
                Defs.EVENT_PAGE_LISTENER,
              );
            }
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
