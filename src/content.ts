import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';
import Tiktok from './assets/tiktok';
import Storage from './model';

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
            return await youtubeShorts.onExecution();
        case Defs.STR_TIKTOK:
            const tiktok = new Tiktok();
            try {
                return await tiktok.onExecution();
            } catch (err) {
                if (err) {
                    if (await Storage.getValue(Defs.STORAGE_ICON_KEY)) alert('올바르지 않는 주소 입니다.');
                    chrome.runtime.sendMessage('error');
                }
            }
            break;
        case Defs.ERROR_YOUTUBE_SHORTS:
            alert('올바르지 않는 주소 입니다.');
            chrome.runtime.sendMessage('error');
            break;
        default:
            return;
    }
})
