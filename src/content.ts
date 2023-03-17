import './assets/style/style.css';
import $ from 'jquery';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import Utils from './assets/utils';
import EventsListener from './assets/eventsListener';

let isAutoPlay: boolean = false;

EventsListener.onReload();
EventsListener.onWheel();
EventsListener.onKeyup();
EventsListener.onGuideShortsButton();
EventsListener.onGuideMiniShortButton();
EventsListener.onShortUpDownButton();

Browser.runtime.onMessage.addListener(async ({ event }) => {
  if (event === Defs.EVENT_PAGE_UPDATE || event === Defs.EVENT_PAGE_RELOAD) {
    const shortsInnerContainerID = '#shorts-inner-container';
    const autoYoutubeShortsScrollDown = '#auto-youtube-shorts-scroll-down';

    await Utils.onWaitForElement(shortsInnerContainerID);

    if ($('#shorts-inner-container').length > 0) {
      const youtubeShorts = new YoutubeShorts(shortsInnerContainerID);
      const video = youtubeShorts._innerContainer;

      if (video === null) {
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_RELOAD });
      }

      if (video !== null) {
        if ($(autoYoutubeShortsScrollDown).length > 0) {
          $(autoYoutubeShortsScrollDown).remove();
        }

        $(video)
          .find('ytd-shorts-player-controls')
          .children('yt-icon-button:eq(1)')
          .before(
            '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
          );

        $(autoYoutubeShortsScrollDown).append(
          '<label class="switch">\n' +
            '  <input type="checkbox">\n' +
            '  <span class="slider round"></span>\n' +
            '</label>',
        );
      }
    }
  }
});
