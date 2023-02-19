import Defs from './assets/constants';
import YoutubeShorts from './assets/youtubeShorts';
import DB from './model';

const db = new DB();

chrome.runtime.onMessage.addListener(async ({ action }) => {
    switch (action) {
        case Defs.STR_YOUTUBE:
            const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
            return await youtubeShorts.onExecution();
        case Defs.URI_ERROR:
        default:
            chrome.runtime.sendMessage('error');
            return;
    }
})
