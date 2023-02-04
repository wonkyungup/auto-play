import Defs from './constants';

const isCheckUrl = async (url: string | undefined) => {
    const list = Defs.URI_LIST;
    return list.map(keyword => (url != null) ? url.includes(keyword) : '').filter(isState => isState).length;
}

const getState = () => {
    return new Promise(resolve => {
        chrome.storage.sync.get([Defs.STORAGE_KEY], (result) => {
            resolve(result.state);
        });
    });
};

const setIcon = async () => {
    if (await getState()) chrome.browserAction.setIcon({ path: Defs.ICON_ENABLE });
    else chrome.browserAction.setIcon({ path: Defs.ICON_DISABLE });
}

chrome.browserAction.onClicked.addListener(async ({id, url}) => {
    if (await isCheckUrl(url) <= 0 && id != null) {
        chrome.tabs.sendMessage(id, {
            action: Defs.ACTION_ALERT,
            message: '현재 사용 가능한 URL: \n' +
                '- Youtube Shorts\n' +
                '- Tiktok'
        });
        return
    }

    await chrome.storage.sync.set({ [Defs.STORAGE_KEY]: !await getState() });
    await setIcon();

    if (id != null) {
        chrome.tabs.sendMessage(id, {
            action: Defs.ACTION_ENABLE,
            message: 'movement'
        });
    }
});

window.onload = () => {
    chrome.storage.sync.set({ state: false }, () => {
        console.log('Installed', new Date());
    });
};
