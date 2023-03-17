import './assets/style/style.css';
import $ from 'jquery';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import Utils from './assets/utils';

let isAutoPlay: boolean = false;

/*
  1. page reload
  2. wheel
  3. keyup
  4. up down button click
  5. shorts button click
*/

Browser.runtime
  .sendMessage({ event: Defs.EVENT_PAGE_UPDATE })
  .then(() => console.log('reload!'));

$(document).on(
  'wheel',
  async () =>
    await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE }),
);

$(document).on('keyup', async (event) => {
  if (event.keyCode === 38 || event.keyCode === 40) {
    await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
  }
});

Browser.runtime.onMessage.addListener(async ({ event }) => {
  if (event === Defs.EVENT_PAGE_UPDATE) {
    console.log(Defs.EVENT_PAGE_UPDATE);
    await Utils.onWaitForElement('#shorts-container');

    if ($('#shorts-container').length > 0) {
      const youtubeShorts = new YoutubeShorts('shorts-inner-container');

      const video = youtubeShorts._innerContainer;
      if (video !== null) {
        if ($('#auto-youtube-shorts-scroll-down').length > 0) {
          $('#auto-youtube-shorts-scroll-down').remove();
        }

        $(video)
          .find('ytd-shorts-player-controls')
          .children('yt-icon-button:eq(1)')
          .before(
            '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
          );

        $('#auto-youtube-shorts-scroll-down').append(
          '<label class="switch">\n' +
            '  <input type="checkbox">\n' +
            '  <span class="slider round"></span>\n' +
            '</label>',
        );
      }
    }
  }
});
