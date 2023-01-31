const setAutoPlay = () => {
    // video length check - <video />
    chrome.runtime.sendMessage('videoPlay');
}

// tab reload
console.log('pageReload');
setAutoPlay();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === 'videoReady') {
        setAutoPlay();
    }
});
