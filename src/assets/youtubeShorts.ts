import Defs from '../assets/constants';
import Storage from '../model'

export default class YoutubeShorts {
    _container: HTMLElement | null;
    _inner: string;
    _obj: any;
    constructor(container: string, innerContainer: string) {
        this._container = document.getElementById(container);
        this._inner = innerContainer;
        this._obj = {};
    }

    async setCurPlayVideo () {
        const innerList = Array.from(<any>document.getElementById(this._inner)?.children);
        for (let index = 0; index < innerList.length; index++) {
            const inner = <Element>innerList[index];
            if (inner.getAttribute(Defs.STR_IS_ACTIVE) !== null) {
                this._obj = { inner: inner, innerList: innerList };
                return;
            }
        }
    }

    getCurPlayHeight () { // 수정 필요
        return this._obj.innerList
            .filter((element: { id: string }) => Number(element.id) <= Number(this._obj.inner.id))
            .map((element: { offsetHeight: number }) => element.offsetHeight)
            .reduce((acc: number, cur: number) => acc + cur, 0);
    }

    doesLoopVideo () {
        const video = this._obj.inner?.querySelector('video');
        video?.setAttribute('loop', String(true));
    }

    doesNextVideo () {
        const video = this._obj.inner?.querySelector('video');
        if (!video) {
            return this.refreshExecution();
        }
        video?.removeAttribute('loop');
        video?.addEventListener('ended', () => {
            this._container?.scrollTo({ top: this.getCurPlayHeight(), behavior: 'smooth' })
        })
    }

    refreshExecution () {
        setTimeout(async () => {
            await this.onExecution();
        }, 0)
    }

    async onExecution () {
        const state = await Storage.getValue(Defs.STORAGE_ICON_KEY);
        await this.setCurPlayVideo();

        console.log(state);
        if (!state) {
            this.doesLoopVideo();
            return;
        }

        return this.doesNextVideo();
    }
}
