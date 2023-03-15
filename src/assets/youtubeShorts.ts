import Defs from './constants';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  _ee: any;
  constructor(ee: any) {
    this._innerList = [];
    this._innerContainer = null;
    this._ee = ee;
  }

  async setCurPlayVideo() {
    this._innerList = Array.from(
      <HTMLCollection>(
        document.getElementById('shorts-inner-container')?.children
      ),
    );
    for (let index = 0; index < this._innerList.length; index++) {
      const innerContainer = <Element>this._innerList[index];
      if (innerContainer.getAttribute('is-active') !== null) {
        this._innerContainer = innerContainer;
        return;
      }
    }
  }

  async getNextElement() {
    await this.setCurPlayVideo();

    const index = this._innerList.indexOf(this._innerContainer);
    if (index > 0) {
      return this._innerList[index + 1];
    }
  }

  doesLoopVideo() {
    const video = this._innerContainer?.querySelector('video');
    video?.setAttribute('loop', String(true));
  }

  doesNextVideo() {
    const video = this._innerContainer?.querySelector('video');
    video?.removeAttribute('loop');
    video?.addEventListener('ended', async () => {
      const element = await this.getNextElement();
      element.scrollIntoView({ block: 'end', behavior: 'smooth' });

      this._ee.emit(Defs.EVENT_PAGE_WATCH);
    });
  }

  async setActivateEvent() {
    const navigationDown: HTMLElement | null = document.querySelector(
      '#navigation-button-down',
    );
    const navigationUp: HTMLElement | null = document.querySelector(
      '#navigation-button-up',
    );
    if (navigationDown) {
      navigationDown.addEventListener('click', () => {
        this._ee.emit(Defs.EVENT_PAGE_WATCH);
      });
    }
    if (navigationUp) {
      navigationUp.addEventListener('click', () => {
        this._ee.emit(Defs.EVENT_PAGE_WATCH);
      });
    }

    document.addEventListener('wheel', () => {
      this._ee.emit(Defs.EVENT_PAGE_WATCH);
    });

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 38 || event.keyCode === 40) {
        this._ee.emit(Defs.EVENT_PAGE_WATCH);
      }
    });

    return;
  }
}
