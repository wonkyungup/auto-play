export default class Tiktok {
    _main: HTMLElement | null;
    _video: HTMLElement | null;
    _videoRoot: any;
    _list: any;
    constructor(main: string) {
        this._video = document.querySelector('video');
        this._videoRoot = this._video?.closest("div[data-e2e=recommend-list-item-container]");
        this._main = document.getElementById(main);
        this._list = this._main?.children[0].children;
    }

    static isFullScreen (url: string) {
        return url.split('/').length > 5;
    }
}
