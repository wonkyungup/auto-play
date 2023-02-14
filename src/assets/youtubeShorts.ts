import Defs from '../assets/constants';

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

    async getCurPlayHeight () {
        // return this._obj.innerList
        //     .filter((element: { id: string }) => Number(element.id) <= Number(this._obj.inner.id))
        //     .map((element: { offsetHeight: number }) => element.offsetHeight)
        //     .reduce((acc: number, cur: number) => acc + cur, 0);
    }

    doesLoopVideo () {
        const video = this._obj.inner?.querySelector('video');

        video?.setAttribute('loop', String(true));
    }

    doesNextVideo () {
        const video = this._obj.inner?.querySelector('video');

        video?.removeAttribute('loop');
        video?.addEventListener('ended', () => {
            this._container?.scrollTo({ top: this.getCurPlayHeight(), behavior: 'smooth' })
        })
    }

    async onExecution (state: Boolean) {
         await this.setCurPlayVideo();

        if (!state) {
            this.doesLoopVideo();
            return;
        }

        console.log(this._obj.innerList);
        console.log(await this.getCurPlayHeight());
        return this.doesNextVideo();
    }
}
