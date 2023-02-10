export default class YoutubeShorts {
    ct: HTMLElement | null;
    list: [] | unknown;
    constructor(container: string, innerContainer: string) {
        this.ct = document.getElementById(container);
        this.list = this.getList(innerContainer);
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

    findCurPlay (callback: { (play: any): void; (arg0: any): void; }) {
        const _list = this.list;

        // @ts-ignore
        for (let i = 0; i < _list.length; i++) {
            // @ts-ignore
            const target = _list[i];
            if (target.getAttribute('is-active') !== null) {
                callback(target);
            }
        }
    }

    getCurPlayHeight (play: { querySelector?: (arg0: string) => any; id?: any; }) {
        const _list = this.list;

        if (_list != null) {
            // @ts-ignore
            return _list
                .filter((element: { id: string; }) => Number(element.id) <= Number(play.id))
                .map((element: { offsetHeight: number; }) => element.offsetHeight)
                .reduce((acc: number, cur: number) => acc + cur, 0);
        }
    }
}
