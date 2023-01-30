chrome.storage.sync.get(['state'], async (result) => {
    const state = result.state;

    if (state) {
        await chrome.runtime.sendMessage({ state: state })
    }
})
