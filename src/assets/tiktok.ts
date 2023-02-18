import Defs from './constants';
import Storage from '../model';

export default class Tiktok {
    _video: HTMLElement | null;
    _root: any;
    constructor() {
        this._video = document.querySelector('video');
        this._root = null;
    }

    async isValidToMode () {
        // mode = 2
        return this._video?.closest("div[mode='2']");
    }

    async toggleChatElement (state: boolean) {
        this._root = this._video?.closest("div[mode='2']")?.parentNode?.parentNode?.parentNode;
        this._root = Array.from(<HTMLCollection>this._root?.children);

        for (let i = 0; i < this._root.length; i++) {
            const element = this._root[i];
            if (state) {
                if (i > 0 ) element.style.display = 'none';
            }  else {
                element.style.display = 'flex';
            }
        }
    }

    async doesNextVideo () {
        const _video = this._video;
        const _root = this._root;

        if (_root.length > 0) {
            const _buttonsElement = _root[0].getElementsByTagName('button');
            const downButton = _buttonsElement[_buttonsElement.length - 1];

            if (_video !== null) {
                _video.addEventListener('ended', () => {
                    downButton.click();
                })
            }
        }
    }

    async onExecution () {
        const state = await Storage.getValue(Defs.STORAGE_ICON_KEY);
        if (await this.isValidToMode()) {
            await this.toggleChatElement(<boolean>state);

            if (state) {
                // await this.doesNextVideo();
            }
            return;
        } else {
            throw new Error('error');
        }
    }
}
