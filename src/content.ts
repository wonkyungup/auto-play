import Storage from './model';
import YoutubeShorts from './assets/youtubeShorts';
import Defs from './assets/constants';

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');

            if (!await Storage.getValue()) {
                await youtubeShorts.doesLoopVideo();
                return;
            }

            await youtubeShorts.doesPlayVideo();
            return;
        case Defs.STR_ERROR:
        default:
            alert('올바르지 않는 주소 입니다.')
            return;
    }
})
