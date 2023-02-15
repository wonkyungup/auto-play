import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
            return await youtubeShorts.onExecution();
        case Defs.STR_ERROR:
        default:
            alert('올바르지 않는 주소 입니다.')
            return;
    }
})
