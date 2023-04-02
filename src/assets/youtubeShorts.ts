import Utils from './utils';
import $ from 'jquery';
import Browser from 'webextension-polyfill';
import Defs from './constatns';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  _innerVideo: any;
  _innerPlayerControl: any;
  _innerVideoCC: any;
  constructor() {
    this._innerContainer = null;
    this._innerList = [];
    this._innerVideo = null;
    this._innerPlayerControl = null;
    this._innerVideoCC = null;
  }

  async waitForVideoContainer(delay: number) {
    const cc = await Utils.waitForElement('#ytp-caption-window-container');
    const video: any = await Utils.waitForElement('video');

    await Utils.sleep(delay);

    this._innerVideo = video || null;
    this._innerList =
      Array.from(
        <HTMLCollection>video?.closest('#shorts-inner-container')?.children,
      ) || [];

    this._innerContainer =
      this._innerList.filter(
        (element) => $(element).attr('is-active') !== undefined,
      )[0] || null;

    this._innerPlayerControl = this._innerContainer?.querySelector(
      'ytd-shorts-player-controls',
    );

    this._innerVideoCC = cc;
    return;
  }

  async getNextElement() {
    await this.waitForVideoContainer(500);

    const index = this._innerList.indexOf(this._innerContainer);
    if (index > 0) {
      return this._innerList[index + 1];
    }
  }

  doesLoopVideo() {
    this._innerVideo?.setAttribute('loop', String(true));
  }

  doesNextVideo() {
    this._innerVideo?.removeAttribute('loop');
    this._innerVideo.onended = async () => {
      const element = await this.getNextElement();
      element.scrollIntoView({ block: 'end', behavior: 'smooth' });
      await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
    };
  }

  showVideoCC() {
    const cc = this._innerVideoCC;
    $(cc).show();
  }

  hiddenVideoCC() {
    const cc = this._innerVideoCC;
    $(cc).hide();
  }
}
