import Browser from 'webextension-polyfill';
import Defs from './constatns';
import $ from 'jquery';
import Utils from './utils';

export default class EventsListener {
  static onReload() {
    Browser.runtime
      .sendMessage({ event: Defs.EVENT_PAGE_UPDATE })
      .then(() => console.log('reload!'));
  }

  static onWheel() {
    $(document).on(
      'wheel',
      async () =>
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
    );
  }

  static onKeyup() {
    $(document).on('keyup', async (event) => {
      if (event.keyCode === 38 || event.keyCode === 40) {
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
      }
    });
  }

  static onGuideShortsButton() {
    Utils.onWaitForElement('ytd-guide-entry-renderer').then(() => {
      const guideShortsButton = $('ytd-guide-entry-renderer')[1];
      $(guideShortsButton).on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
      );
    });
  }

  static onGuideMiniShortButton() {
    Utils.onWaitForElement('ytd-mini-guide-entry-renderer').then(() => {
      const guideMiniShortsButton = $('ytd-mini-guide-entry-renderer')[1];
      $(guideMiniShortsButton).on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
      );
    });
  }

  static onShortUpDownButton() {
    Utils.onWaitForElement('#shorts-container').then(() => {
      $($('#navigation-button-up').find('yt-button-shape')).on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
      );
      $($('#navigation-button-down').find('yt-button-shape')).on(
        'click',
        async () =>
          await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
      );
    });
  }
}
