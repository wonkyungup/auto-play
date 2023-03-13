import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';

const isValidToUrl = (url: string) => url.includes(Defs.URL_YOUTUBE_SHORTS);

Browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  try {
    if (Browser.runtime.lastError) console.error(Browser.runtime.lastError);
    else if (changeInfo.url && isValidToUrl(changeInfo?.url)) {
      await Browser.tabs.sendMessage(tabId, Defs.EVENT_URL_DETECTION);
    }
  } catch (err) {
    console.log(`TAB :: UPDATE :: ERROR :: ${err}`);
  }
});

Browser.runtime.onMessage.addListener(async (request, sender) => {
  if (request === Defs.EVENT_URL_DETECTION) {
    const tabId = sender.tab?.id;
    if (tabId) {
      await Browser.tabs.sendMessage(tabId, Defs.EVENT_URL_DETECTION);
    }
  }
});
