import './assets/style/style.css';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import EventsListener from './assets/eventsListener';
import ToggleSwitch from './components/ToggleSwitch';

new EventsListener();

const youtubeShorts = new YoutubeShorts();

const Switch = () => {
  const [checked, setChecked] = React.useState(false);
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    Browser.storage.local
      .set({ isAutoPlay: event.target.checked })
      .then(() => {});
  };

  React.useEffect(() => {
    const checkStorageData = async () => {
      return await Browser.storage.local.get(['isAutoPlay']);
    };

    checkStorageData().then((r) => setChecked(r.isAutoPlay));

    if (checked) {
      youtubeShorts.doesNextVideo();
    } else {
      youtubeShorts.doesLoopVideo();
    }
  }, [checked]);

  return (
    <ToggleSwitch
      isSwitch={checked}
      onChange={(event) => handlerChange(event)}
    />
  );
};

Browser.runtime.onMessage.addListener(async ({ event }) => {
  switch (event) {
    case Defs.EVENT_PAGE_RELOAD:
    case Defs.EVENT_PAGE_UPDATE:
      await youtubeShorts.waitForVideoContainer();

      // eslint-disable-next-line no-case-declarations
      const autoYoutubeShortsScrollDown = $('#auto-youtube-shorts-scroll-down');
      if (autoYoutubeShortsScrollDown.length > 0) {
        autoYoutubeShortsScrollDown.remove();
      }

      $(youtubeShorts._innerPlayerControl)
        .children('yt-icon-button:eq(1)')
        .before(
          '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
        );

      ReactDOM.render(
        <Switch />,
        document.getElementById('auto-youtube-shorts-scroll-down'),
      );
      break;
    default:
      break;
  }
});
