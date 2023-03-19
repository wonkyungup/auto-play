import Browser from 'webextension-polyfill';
import Defs from './constatns';
import $ from 'jquery';
import Utils from './utils';

export default class EventsListener {
  static onReload() {
    Browser.runtime
      .sendMessage({ event: Defs.EVENT_PAGE_UPDATE })
      .then(() => {});
  }

  static onKeyup() {
    $(document).on('keyup', async (event) => {
      if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
      }
    });
  }

  static onWheelRemove() {
    window.addEventListener(
      'wheel',
      () =>
        alert('마우스 휠 대신, 화살표 버튼 혹은 키보드 위/아래를 사용해주세요'),
      false,
    );
  }

  static onShortUpDownButton() {
    Utils.waitForElement('#shorts-container').then(() => {
      const upBtn = $('#navigation-button-up').find('yt-button-shape');
      const downBtn = $('#navigation-button-down').find('yt-button-shape');

      upBtn.on('click', async () => {
        await Browser.runtime.sendMessage({
          event: Defs.EVENT_PAGE_UPDATE,
        });
      });

      downBtn.on('click', async () => {
        await Browser.runtime.sendMessage({
          event: Defs.EVENT_PAGE_UPDATE,
        });
      });
    });
  }
}
