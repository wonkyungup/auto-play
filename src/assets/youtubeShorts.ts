import $ from 'jquery';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  constructor() {
    this._innerList = [];
    this._innerContainer = null;
  }

  async onReadyVideo(innerContainerID: string) {
    this._innerList = Array.from($(innerContainerID).children());
    this._innerContainer =
      this._innerList.filter(
        (inner) => inner.getAttribute('is-active') !== null,
      )[0] || null;
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
