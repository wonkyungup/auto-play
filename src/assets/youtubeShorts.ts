import Browser from 'webextension-polyfill';
import Defs from './constatns';

export default class YoutubeShorts {
  _innerContainer: Element | null;
  _innerList: any[];
  constructor() {
    this._innerList = [];
    this._innerContainer = null;
    this.setActivateEvent();
  }

  async setCurPlayVideo() {
    this._innerList = Array.from(
      <HTMLCollection>document.getElementById('shorts-inner-container')?.children,
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

      await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER);
    });
  }

  setActivateEvent () {
    window.onload = async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_RELOAD);
    document.getElementById("shorts-container")?.addEventListener("wheel", async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER));
    document.querySelector("#navigation-button-up > ytd-button-renderer > yt-button-shape > button")?.addEventListener("click", async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER));
    document.querySelector("#navigation-button-down > ytd-button-renderer > yt-button-shape > button")?.addEventListener("click", async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER));
    document.querySelector("#items > ytd-guide-entry-renderer:nth-child(2)")?.addEventListener("click", async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER));
    document.querySelector("#items > ytd-mini-guide-entry-renderer:nth-child(2)")?.addEventListener("click", async () => await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER));

    document.addEventListener("keyup", async (event) => {
      if (event.keyCode === 38 || event.keyCode === 40) {
        await Browser.runtime.sendMessage(Defs.EVENT_PAGE_LISTENER);
      }
    })
  }
}
