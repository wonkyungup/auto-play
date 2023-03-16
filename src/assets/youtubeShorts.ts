import Browser from 'webextension-polyfill';
import Defs from './constatns';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  constructor() {
    this._innerList = [];
    this._innerContainer = null;
  }

  async onReadyActiveVideo() {
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
    await this.onReadyActiveVideo();

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

      await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER);
    });
  }
}
