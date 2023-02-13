import Defs from '../assets/constants';

export default class YoutubeShorts {
    _container: HTMLElement | null;
    _inner: string;
    constructor(container: string, innerContainer: string) {
        this._container = document.getElementById(container);
        this._inner = innerContainer;
    }

    async getCurPlayVideo () {
        const innerList = Array.from(<any>document.getElementById(this._inner)?.children);
        for (let index = 1; index < innerList.length -1; index++) {
            const inner = innerList[index];
            // @ts-ignore
            if (inner.getAttribute(Defs.STR_IS_ACTIVE) !== null) {
                return { inner: inner, innerList: innerList };
            }
        }
    }

    async getCurPlayHeight () {
        // @ts-ignore
        const { inner, innerList } = await this.getCurPlayVideo();
        return innerList
            .filter((element: { id: string }) => Number(element.id) <= Number(inner.id))
            .map((element: { offsetHeight: number }) => element.offsetHeight)
            .reduce((acc: number, cur: number) => acc + cur, 0);
    }

    async doesLoopVideo () {
        // @ts-ignore
        const { inner } = await this.getCurPlayVideo();
        setTimeout(() => {
            const video = inner?.querySelector('video');
            if (!video) {
                return this.doesLoopVideo();
            }
            video?.setAttribute('loop', String(true));
        }, Defs.NUMBER_TIMER)
    }

    async doesNextVideo () {
        // @ts-ignore
        const { inner } = await this.getCurPlayVideo();
        setTimeout(() => {
            const video = inner.querySelector('video');
            video?.removeAttribute('loop');
            video?.addEventListener('ended', async () => {
                this._container?.scrollTo({ top: await this.getCurPlayHeight(), behavior: 'smooth' })
            })
        }, Defs.NUMBER_TIMER);
    }

    async onExecution (state: Boolean) {
        if (!state) {
            await this.doesLoopVideo();
            return;
        }

        return await this.doesNextVideo();
    }
}
