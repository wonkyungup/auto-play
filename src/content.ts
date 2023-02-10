import Defs from './assets/constants';
import Storage from './model';
import YoutubeShorts from './assets/youtubeShorts';

const doesYoutubeShorts = async (state: Boolean) => {
    const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
    const curPlay = await youtubeShorts.getCurPlayVideo();

    setTimeout(() => {
        const video = curPlay.querySelector('video');
        if (!state) {
            video?.setAttribute('loop', String(true));
            return;
        }
        video?.removeAttribute('loop');
        video?.addEventListener('ended', () => {
            youtubeShorts.ct?.scrollTo({ top: youtubeShorts.getCurPlayHeight(curPlay), behavior: 'smooth' })
        })
    }, 1000);
}

chrome.runtime.onMessage.addListener(async ({ onClick, url }) => {
    const state = await Storage.getValue();

    try {
        if (url.includes(Defs.URI_YOUTUBE_SHORTS)) {
            // https://www.youtube.com/shorts/4HGxOzTSKRQ
            await doesYoutubeShorts(<Boolean>state);
            return;
        }

        if (url.includes(Defs.URI_TIKTOK)) {
            return;
        }

        if (onClick) {
            alert('올바르지 않는 주소 입니다.');
        }
        chrome.runtime.sendMessage({ message: Defs.STR_INVALID_URI });
        return;
    } catch (error) {
        console.error(error.message);
        chrome.runtime.sendMessage({ message: Defs.STR_ERROR });
        return;
    }
})
