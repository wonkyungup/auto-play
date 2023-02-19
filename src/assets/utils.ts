import Defs from './constants';

export default class Utils {
    static isValidToYoutubeShort (url: string) {
        return url.includes(Defs.URI_YOUTUBE_SHORTS);
    }

    static isValidToTikTok (url: string) {
        return (url.includes(Defs.URI_TIKTOK) && url.includes('video'));
    }

    static isInValidToUrl (url: string) {
        return (!Utils.isValidToTikTok(url) && !Utils.isValidToYoutubeShort(url));
    }
}
