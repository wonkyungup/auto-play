import { Defs, Utils } from './assets';
import Storage from './model'

chrome.runtime.onMessage.addListener(async (req) => {
    const { action, url } = req;
    if (action !== Defs.ACTION_AUTO_PLAY) {
        alert('올바르지않는 URL 입니다');
        return;
    }

    const state = await Storage.getValue();
    const height = Number(await Storage.getHeight());
    const validToUriList = await Utils.onValidToUri(url);

    if (validToUriList[0] && !validToUriList[1]) {
        const video = document.querySelector('video');
        const container = document.getElementById('shorts-container');

        if (!state) {
            console.log('disable: ');
            console.log(await Storage.getHeight());
            // *
            video?.removeEventListener('playing', () => {
                console.log('removed');
            })
        }
        else {
            video?.addEventListener('playing', async () => {
                console.log('enable: ');
                console.log(await Storage.getHeight());
                await Storage.setHeight(height === 0 ? Number(container?.offsetHeight) : Number(height + Number(container?.offsetHeight)));
                container?.scrollTo({ top: Number(await Storage.getHeight()), behavior: 'smooth' });
            })
        }
    }

    if (!validToUriList[0] && validToUriList[1]) {
        // tiktok
        return;
    }
})
