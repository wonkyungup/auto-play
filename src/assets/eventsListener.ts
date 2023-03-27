import Browser from 'webextension-polyfill';
import Defs from './constatns';
import $ from 'jquery';
import Utils from './utils';

export default class EventsListener {
  constructor() {
    this.onReload();
    this.onWheel();
    this.onKeyup();
    this.onShortUpDownButton();
  }

  onReload() {
    Browser.runtime
      .sendMessage({ event: Defs.EVENT_PAGE_RELOAD })
      .then(() => {});
  }

  onKeyup() {
    $(document).on('keyup', async (event) => {
      if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
      }
    });
  }

  onWheel() {
    let isScrolling: boolean = false;
    let timeoutId: number | NodeJS.Timeout | undefined;

    window.addEventListener('wheel', (): void => {
      if (!isScrolling) {
        isScrolling = true;
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async (): Promise<void> => {
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
          isScrolling = false;
          timeoutId = undefined;
        }, 100);
      }
    });
  }

  onShortUpDownButton() {
    Utils.waitForElement('#shorts-container').then(() => {
      const upBtn = $('#navigation-button-up').find('yt-button-shape');
      const downBtn = $('#navigation-button-down').find('yt-button-shape');

      upBtn.on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({
            event: Defs.EVENT_PAGE_UPDATE,
          }),
      );

      downBtn.on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({
            event: Defs.EVENT_PAGE_UPDATE,
          }),
      );
    });
  }
}
