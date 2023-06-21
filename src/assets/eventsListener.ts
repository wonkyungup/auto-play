import Browser from 'webextension-polyfill';
import Defs from './constatns';
import $ from 'jquery';
import Utils from './utils';
import watchWheel from 'watch-wheel';

export default class EventsListener {
  onInitialize() {
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
    const shortContainer = document.getElementById('content');
    if (shortContainer) {
      watchWheel(shortContainer, async ({ type }: { type: string }) => {
        if (type === Defs.STR_WHEEL_END) {
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
        }
      });
    }
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
