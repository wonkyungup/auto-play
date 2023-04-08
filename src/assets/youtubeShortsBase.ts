import Utils from './utils';
import $ from 'jquery';

export default class YoutubeShortsBase {
  _innerContainer: Element | null;
  _innerList: any[];
  _innerVideo: any;
  _innerPlayerControl: any;
  constructor() {
    this._innerContainer = null;
    this._innerList = [];
    this._innerVideo = null;
    this._innerPlayerControl = null;
  }

  async waitForVideoContainer() {
    const video: any = await Utils.waitForElement('video');

    await Utils.sleep(1000);

    this._innerVideo = video;
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

    return this;
  }
}
