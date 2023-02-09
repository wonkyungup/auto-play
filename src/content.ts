import { Defs, Utils } from './assets';
import Storage from './model';

const getPlayList = async (innerContainer: string) => {
    const inner = document.getElementById(innerContainer);
    if (inner != null) {
        const list = Array.from(inner.children);
        list.shift();
        list.pop();

        return list;
    }
}

const getCurPlayHeight = (play: Element, list: Array<any>) => {
    return list
        .filter(element => Number(element.id) <= Number(play.id))
        .map(element => element.offsetHeight)
        .reduce((acc, cur) => acc + cur, 0);
}

chrome.runtime.onMessage.addListener(async (req) => {
    const { action, url } = req;
    if (action !== Defs.ACTION_AUTO_PLAY) {
        alert('올바르지않는 URL 입니다');
        return undefined;
    }

    const state = await Storage.getValue();
    const validToUriList = await Utils.onValidToUri(url);

    if (validToUriList[0] && !validToUriList[1]) { // youtube
        const container = document.getElementById('shorts-container');
        const playList = await getPlayList('shorts-inner-container');

        // https://www.youtube.com/shorts/4HGxOzTSKRQ
        if (playList != null) {
            for(let index = 0; index < playList.length; index++) {
                const curPlay = playList[index]

                if (curPlay.getAttribute('is-active') !== null) {
                    setTimeout(() => {
                        const video = curPlay.querySelector('video');

                        if (state) {
                            video?.removeAttribute('loop');
                            video?.addEventListener('ended', () => {
                                container?.scrollTo({ top: getCurPlayHeight(curPlay, playList), behavior: 'smooth' })
                            })
                        } else {
                            video?.setAttribute('loop', String(true));
                        }
                    }, 1000);
                }
            }
        }
    }

    if (!validToUriList[0] && validToUriList[1]) { // tiktok
        return undefined;
    }

    return undefined;
})
