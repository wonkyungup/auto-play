import './assets/style/style.css';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

const youtubeShorts = new YoutubeShorts();

const Switch = () => {
  const [checked, setChecked] = React.useState(isAutoPlay);
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isAutoPlay = event.target.checked;
    setChecked(isAutoPlay);
  };

  React.useEffect(() => {
    if (checked) {
      youtubeShorts.doesNextVideo();
    } else {
      youtubeShorts.doesLoopVideo();
    }
  }, [checked]);

  return (
    <label id="auto-play-switch" className="switch">
      <input
        type="checkbox"
        checked={isAutoPlay}
        onChange={(event) => handlerChange(event)}
      />
      <span className="slider round"></span>
    </label>
  );
};

Browser.runtime.onMessage.addListener(async ({ event }) => {
  if (event === Defs.EVENT_PAGE_UPDATE || event === Defs.EVENT_PAGE_RELOAD) {
    await Utils.onWaitForElement('#shorts-inner-container');

    if ($('#shorts-inner-container').length > 0) {
      await youtubeShorts.onReadyVideo('#shorts-inner-container');
      const video = youtubeShorts._innerContainer;

      if (video === null) {
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_RELOAD });
      }

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

        ReactDOM.render(
          <Switch />,
          document.getElementById('auto-youtube-shorts-scroll-down'),
        );
      }
    }
  }
});
