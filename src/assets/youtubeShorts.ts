import Defs from '../assets/constants';

export default class YoutubeShorts {
    ct: HTMLElement | null;
    list: any[];
    constructor(container: string, innerContainer: string) {
        this.ct = document.getElementById(container);
        this.list = <[]>this.getList(innerContainer);
    }

    getList (innerContainer: string) {
        const inner = document.getElementById(innerContainer);
        if (inner != null) {
            const list = Array.from(inner.children);
            list.shift();
            list.pop();

            return list;
        }
    }

    async getCurPlayVideo () {
        const _list = this.list;

        for (let i = 0; i < _list.length; i++) {
            const target = _list[i];
            if (target.getAttribute(Defs.STR_IS_ACTIVE) !== null) {
                return target;
            }
        }
    }

    getCurPlayHeight (play: Element) {
        const _list = this.list;
        return _list
            .filter((element: { id: string }) => Number(element.id) <= Number(play.id))
            .map((element: { offsetHeight: number }) => element.offsetHeight)
            .reduce((acc: number, cur: number) => acc + cur, 0);
    }

    async doesLoopVideo () {
        const activePlay = await this.getCurPlayVideo();
        setTimeout(() => {
            const video = activePlay.querySelector('video');
            video?.setAttribute('loop', String(true));
        }, Defs.NUMBER_TIMER)
    }

    async doesPlayVideo () {
        const activePlay = await this.getCurPlayVideo();
        setTimeout(() => {
            const video = activePlay.querySelector('video');
            video?.removeAttribute('loop');
            video?.addEventListener('ended', () => {
                this.ct?.scrollTo({ top: this.getCurPlayHeight(activePlay), behavior: 'smooth' })
                setTimeout(async () => {
                    await this.doesPlayVideo();
                }, Defs.NUMBER_TIMER)
            })
        }, Defs.NUMBER_TIMER);
    }
}
