import Storage from './model';
import YoutubeShorts from './assets/youtubeShorts';
import Defs from './assets/constants';

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const state = await Storage.getValue();
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');

            let timer: string | number | NodeJS.Timeout | undefined;
            youtubeShorts._container?.addEventListener('scroll', () => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(async () => {
                    console.log('scroll test');
                    await youtubeShorts.onExecution(<Boolean>state);
                }, 1000)
            })

            return await youtubeShorts.onExecution(<Boolean>state);
        case Defs.STR_ERROR:
        default:
            alert('올바르지 않는 주소 입니다.')
            return;
    }
})
