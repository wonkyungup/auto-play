import './i18n';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShortsBase from './assets/youtubeShortsBase';
import EventsListener from './assets/eventsListener';
import ToggleSwitch from './components/ToggleSwitch';
import SystemTheme from './components/SystemTheme';
import OptionApp from './components/Options/App';
import DownloaderApp from './components/Downloader';
import { store } from './store';

const eventsListener = new EventsListener();
const youtubeShorts = new YoutubeShortsBase();

eventsListener.onInitialize();

Browser.runtime.onMessage.addListener(async ({ event }) => {
  switch (event) {
    case Defs.EVENT_PAGE_RELOAD:
    case Defs.EVENT_PAGE_UPDATE:
      const { _innerContainer, _innerList, _innerPlayerControl, _innerVideo } =
        await youtubeShorts.waitForVideoContainer();
      store.dispatch({
        type: Defs.REDUX_YTS_WAIT_FOR_VIDEO,
        innerContainer: _innerContainer,
        innerList: _innerList,
        innerPlayerControl: _innerPlayerControl,
        innerVideo: _innerVideo,
      });

      if ($('#auto-youtube-shorts-scroll-down').length > 0) {
        $('#auto-youtube-shorts-scroll-down').remove();
      }

      $(store.getState().yts.innerPlayerControl)
        .children('yt-icon-button:eq(1)')
        .before(
          '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
        );

      ReactDOM.render(
        <SystemTheme>
          <ToggleSwitch />
          <DownloaderApp />
          <OptionApp />
        </SystemTheme>,
        document.getElementById('auto-youtube-shorts-scroll-down'),
      );
      break;
    default:
      break;
  }
});
