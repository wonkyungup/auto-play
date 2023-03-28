import './i18n';
import './assets/style/style.css';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import EventsListener from './assets/eventsListener';
import ToggleSwitch from './components/ToggleSwitch';
import SystemTheme from './components/SystemTheme';

new EventsListener();

const youtubeShorts = new YoutubeShorts();

const Switch = () => {
  const [checked, setChecked] = React.useState(youtubeShorts._isAutoPlay);
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    youtubeShorts.onToggleAutoPlayState(event.target.checked);
  };

  React.useEffect(() => {
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
          <Switch />
        </SystemTheme>,
        document.getElementById('auto-youtube-shorts-scroll-down'),
      );
      break;
    default:
      break;
  }
});
