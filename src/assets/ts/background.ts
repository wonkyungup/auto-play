chrome.runtime.onMessage.addListener((req, sender, sendRes) =>{
    const state = req.state;

    if (state) {
        // auto play video
        console.log('auto play video');
    }
})
