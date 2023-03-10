import Browser from "webextension-polyfill";

const URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
const isValidToUrl = (url: string) => url.includes(URL_YOUTUBE_SHORTS);

Browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    try {
        if (Browser.runtime.lastError) console.error(Browser.runtime.lastError);
        else if (changeInfo.url && isValidToUrl(changeInfo?.url)) {
            await Browser.tabs.sendMessage(tabId, 'URL: Detection');
        }
    } catch (err) {
        console.log(`TAB :: UPDATE :: ERROR :: ${err}`);
    }
});

Browser.runtime.onMessage.addListener(async (request, sender) => {
    if (request === 'URL: Detection') {
        const tabId = sender.tab?.id;
        if (tabId) {
            await Browser.tabs.sendMessage(tabId, 'URL: Detection');
        }
    }
})
