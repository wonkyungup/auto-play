import Browser from "webextension-polyfill";

const URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
const isValidToUrl = (url: string) => url.includes(URL_YOUTUBE_SHORTS) ;

Browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    try {
        if (Browser.runtime.lastError) console.error(Browser.runtime.lastError);
        if (isValidToUrl(<string>changeInfo.url)) {
            await Browser.tabs.sendMessage(tabId, `URL: Detection`);
        }
    } catch (err) {
        console.log(err);
    }
});
