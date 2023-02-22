import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';
import Browser from 'webextension-polyfill';

Browser.runtime.onMessage.addListener(async message => {
    switch (message) {
        case Defs.STR_YOUTUBE_SHORTS:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
            return await youtubeShorts.onExecution();
        case Defs.URI_ERROR:
        default:
            return await Browser.runtime.sendMessage('error');
    }
})
