import { Defs } from './assets';

window.addEventListener('click', async () => {
    chrome.runtime.sendMessage({ action: Defs.ACTION_CLICK });
}, { once: true })

chrome.runtime.onMessage.addListener((req) => {
    const { action, state, useURI, height } = req;
    if (action !== Defs.ACTION_AUTO_PLAY) {
        alert('올바르지않는 URL 입니다');
        return;
    }

    // useURI: [boolean, boolean] = [youtube-shorts, tiktok]
    if (useURI[0] && !useURI[1]) {
        if (state) {
            const video = document.querySelector('video');
            const container = document.getElementById('shorts-container');

            video?.addEventListener('playing', () => {
                container?.scrollTo({ top: container.offsetHeight, behavior: 'smooth' });
            }, false)

            container?.addEventListener('scroll', (event) => {
                console.log(event)
                // @ts-ignore
                console.log(event.target.offsetHeight);
                chrome.runtime.sendMessage({ action: Defs.ACTION_SCROLL_DOWN })
            }, false)
        }
    }

    if (!useURI[0] && useURI[1]) {
        //
    }
})
