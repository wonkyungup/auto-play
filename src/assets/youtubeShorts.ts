import Utils from './utils';
import $ from 'jquery';

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
    const video: any = await Utils.waitForElement('video');
    await Utils.sleep(300);

    this._innerVideo = video || null;
    this._innerList =
      Array.from(
        <HTMLCollection>video?.closest('#shorts-inner-container')?.children,
      ) || [];

    this._innerContainer =
      this._innerList.filter(
        (element) => $(element).attr('is-active') !== undefined,
      )[0] || null;

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
