import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';
import Tiktok from './assets/tiktok';
import DB from './model';

const db = new DB();

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
            return await youtubeShorts.onExecution();
        case Defs.STR_TIKTOK:
            const tiktok = new Tiktok();
            try {
                await tiktok.onExecution();
            } catch (e) {
                if (await db.getStateIconSync()) {
                    alert('올바르지 않는 주소 입니다. tiktok mode');
                }
                chrome.runtime.sendMessage('error');
            }
            break;
        case Defs.URI_ERROR:
            alert('올바르지 않는 주소 입니다.');
            chrome.runtime.sendMessage('error');
            break;
        default:
            return;
    }
})
