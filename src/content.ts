import { Defs, Utils } from './assets';
import Storage from './model';
import YoutubeShorts from './assets/youtubeShorts'

chrome.runtime.onMessage.addListener(async (req) => {
    const { action, url } = req;
    if (action !== Defs.ACTION_AUTO_PLAY) {
        alert('올바르지않는 URL 입니다');
        return undefined;
    }

    const state = await Storage.getValue();
    const validToUriList = await Utils.onValidToUri(url);

    if (validToUriList[0] && !validToUriList[1]) {
        // https://www.youtube.com/shorts/4HGxOzTSKRQ
        const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');

        youtubeShorts.findCurPlay((play: { querySelector: (arg0: string) => any; }) => {
            setTimeout(() => {
                const video = play.querySelector('video');

                if (state) {
                    video?.removeAttribute('loop');
                    video?.addEventListener('ended', () => {
                        youtubeShorts.ct?.scrollTo({ top: youtubeShorts.getCurPlayHeight(play), behavior: 'smooth' })
                    })
                } else {
                    video?.setAttribute('loop', String(true));
                }
            }, 1000);
        })
    }

    if (!validToUriList[0] && validToUriList[1]) { // tiktok
        return undefined;
    }

    return undefined;
})
