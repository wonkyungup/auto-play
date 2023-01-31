chrome.runtime.onMessage.addListener((req, sender, sendRes) =>{
    chrome.storage.sync.get(['state'], (result) => {
        if (req === 'videoPlay') {
            const state = result.state;

            if (state) {
                console.log('auto play');
            }
        }
    })
})
