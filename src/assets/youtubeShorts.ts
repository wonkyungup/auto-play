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
            if (target.getAttribute('is-active') !== null) {
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
}
