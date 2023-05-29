import '@/i18n';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from '@/assets/constatns';
import YoutubeShortsBase from '@/assets/youtubeShortsBase';
import EventsListener from '@/assets/eventsListener';
import ToggleSwitch from '@/components/ToggleSwitch';
import SystemTheme from '@/components/SystemTheme';
import OptionApp from '@/components/Options/App';
import { Provider } from 'react-redux';
import store, { RootState } from '@/store';
import { onAwaitYtsForVideo } from '@/store/YoutubeShorts';
import DownloadLink from '@/components/DownloadLink';

const eventsListener = new EventsListener();
const youtubeShorts = new YoutubeShortsBase();

eventsListener.onInitialize();

Browser.runtime.onMessage.addListener(async ({ event }) => {
  switch (event) {
    case Defs.EVENT_PAGE_RELOAD:
    case Defs.EVENT_PAGE_UPDATE:
      const { _innerContainer, _innerList, _innerPlayerControl, _innerVideo } =
        await youtubeShorts.waitForVideoContainer();

      store.dispatch(
        onAwaitYtsForVideo({
          innerContainer: _innerContainer,
          innerList: _innerList,
          innerPlayerControl: _innerPlayerControl,
          innerVideo: _innerVideo,
        }),
      );

      if ($('#auto-youtube-shorts-scroll-down').length > 0) {
        $('#auto-youtube-shorts-scroll-down').remove();
      }

      const state: RootState = store.getState();

      if (state) {
        $(state.yts.innerPlayerControl)
          .children('yt-icon-button:eq(1)')
          .before(
            '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
          );

        ReactDOM.render(
          <Provider store={store}>
            <SystemTheme>
              <ToggleSwitch />
              <DownloadLink />
              <OptionApp />
            </SystemTheme>
          </Provider>,
          document.getElementById('auto-youtube-shorts-scroll-down'),
        );
      }
      break;
    default:
      break;
  }
});
