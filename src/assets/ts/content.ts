import Defs from './constants';

chrome.runtime.onMessage.addListener((req) => {
    switch (req.action) {
        case Defs.ACTION_ALERT:
            alert(req.message);
            break
        case Defs.ACTION_ENABLE:
            console.log('1')
            console.log(req.message);
            break
        default:
            break
    }
})
