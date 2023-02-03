const STORAGE_KEY: string = 'state';
const ICON_ENABLE: string = 'icon16.png';
const ICON_DISABLE: string = 'icon16_disable.png';

const getState = () => {
    return new Promise(resolve => {
        chrome.storage.sync.get([STORAGE_KEY], (result) => {
            resolve(result.state);
        });
    });
};

const setIcon = async () => {
    if (await getState()) chrome.browserAction.setIcon({ path: ICON_ENABLE });
    else chrome.browserAction.setIcon({ path: ICON_DISABLE });
}

chrome.browserAction.onClicked.addListener(async (tab) => {
    await chrome.storage.sync.set({ [STORAGE_KEY]: !await getState() })
    await setIcon();

    if (await getState() && tab.id != null) {
        chrome.tabs.sendMessage(tab.id, {
            action: 'enable',
            message: 'onState'
        });
    }
});


// load page
window.onload = () => {
    chrome.storage.sync.set({ state: false }, () => {
        console.log('Installed', new Date());
    });
};
