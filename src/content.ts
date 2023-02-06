import { Defs } from './assets';

window.addEventListener('click', async () => {
    chrome.runtime.sendMessage({ action: Defs.ACTION_CLICK });
}, { once: true })

chrome.runtime.onMessage.addListener((req) => {
    switch (req.action) {
        case Defs.ACTION_AUTO_PLAY:
            console.log('auto play');
            break
        case Defs.ACTION_USE:
        case Defs.ACTION_ERROR:
            alert('올바르지않는 URL 입니다');
            break
        default:
            break
    }
})
