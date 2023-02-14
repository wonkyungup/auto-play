import Storage from './model';
import YoutubeShorts from './assets/youtubeShorts';
import Defs from './assets/constants';

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const state = await Storage.getValue();
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');

            youtubeShorts._container?.addEventListener('scroll', require('lodash').throttle(async () => {
                 await youtubeShorts.onExecution(<Boolean>state);
            }, Defs.NUMBER_TIMER, { trailing: true, leading: false }));

            return await youtubeShorts.onExecution(<Boolean>state);
        case Defs.STR_ERROR:
        default:
            alert('올바르지 않는 주소 입니다.')
            return;
    }
})
