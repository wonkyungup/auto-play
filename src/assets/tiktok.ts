import DB from '../model';

const db = new DB();

export default class Tiktok {
    _video: HTMLElement | null;
    _divRoot: HTMLElement | any;
    _divMode: HTMLElement | null;
    constructor() {
        this._video = null;
        this._divRoot = null;
        this._divMode = null;
    }

    async setElement () {
        this._video = document.querySelector('video');
        this._divMode = <HTMLElement>this._video?.closest("div[mode='2']");

        this._divRoot = this._divMode?.parentNode?.parentNode?.parentNode;
        this._divRoot = Array.from(<HTMLCollection>this._divRoot.children);
        return;
    }

    toggleScreenElement (state: boolean) {
        const _list = Array.from(<HTMLCollection>this._divRoot?.children);
        for (let i = 1; i < _list.length; i++) {
            const element = <HTMLElement>_list[i];
            if (state) {
                element.style.display = 'none';
            } else {
                element.style.display = 'flex';
            }
        }
    }

    refreshVideoElement () {
        setTimeout(async () => {
            await this.onExecution();
        }, 0)
    }

    doesNextVideo () {
        if (!this._video || !this._divRoot) {
            this.refreshVideoElement();
        }

        const _list = this._divRoot;
        for (let i = 1; i < _list.length; i++) {
            const element = <HTMLElement>_list[i];
            element.style.display = 'none';
        }

        const _buttons = _list[0].getElementsByTagName('button');
        const _dwButton = _buttons[_buttons.length - 1];

        this._video?.addEventListener('ended', () => {
            setTimeout(() => {
                _dwButton.click();
            }, 0)
        });
    }

    doesDisabledIcon () {
        if (!this._divRoot) {
            this.refreshVideoElement();
        }

        const _list = this._divRoot;
        for (let i = 1; i < _list.length; i++) {
            const element = <HTMLElement>_list[i];
            element.style.display = 'flex';
        }
    }

    async onExecution () {
        const state = await db.getStateIconSync();
        await this.setElement();

        if (state) {
            this.doesNextVideo();
        } else {
            this.doesDisabledIcon();
        }

        return;
    }
}
