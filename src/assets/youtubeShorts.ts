import Defs from './constatns';
import Utils from './utils';
import { waitForTheElement } from 'wait-for-the-element';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  _innerVideo: any;
  constructor() {
    this._innerContainer = null;
    this._innerList = [];
    this._innerVideo = null;
  }

  async waitForVideoContainer() {
    const video = await waitForTheElement('video', {
      timeout: Defs.TIMEOUT_AWAIT_ELEMENT,
    });
    await Utils.sleep(Defs.TIMEOUT_SLEEP_ELEMENT);
    this._innerVideo = video || null;
    this._innerContainer = video?.closest('ytd-reel-video-renderer') || null;
    this._innerList =
      Array.from(
        <HTMLCollection>video?.closest('#shorts-inner-container')?.children,
      ) || [];

    return;
  }

  async getNextElement() {
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
    });
  }
}
