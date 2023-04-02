import './i18n';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import EventsListener from './assets/eventsListener';
import ToggleSwitch from './components/ToggleSwitch';
import SystemTheme from './components/SystemTheme';
import Options from './components/Options';

new EventsListener();
const youtubeShorts = new YoutubeShorts();

Browser.runtime.onMessage.addListener(async ({ event }) => {
  switch (event) {
    case Defs.EVENT_PAGE_RELOAD:
    case Defs.EVENT_PAGE_UPDATE:
      await youtubeShorts.waitForVideoContainer(1000);

      if ($('#auto-youtube-shorts-scroll-down').length > 0) {
        $('#auto-youtube-shorts-scroll-down').remove();
      }

      $(youtubeShorts._innerPlayerControl)
        .children('yt-icon-button:eq(1)')
        .before(
          '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
        );

      ReactDOM.render(
        <SystemTheme>
          <ToggleSwitch yts={youtubeShorts} />
          <Options yts={youtubeShorts} />
        </SystemTheme>,
        document.getElementById('auto-youtube-shorts-scroll-down'),
      );
      break;
    default:
      break;
  }
});
