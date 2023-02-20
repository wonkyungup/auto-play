import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';
import Browser from 'webextension-polyfill';

Browser.runtime.onMessage.addListener(async message => {
    if (message !== Defs.STR_YOUTUBE_SHORTS) {
        return await Browser.runtime.sendMessage('error');
    }

    const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
    return await youtubeShorts.onExecution();
})
