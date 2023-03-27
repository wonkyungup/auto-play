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
import OptionButton from './components/OptionButton';

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

const Options = () => {
  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return <OptionButton onClick={(event) => handlerClick(event)} />;
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
        <div>
          <Switch />
          <Options />
        </div>,
        document.getElementById('auto-youtube-shorts-scroll-down'),
      );
      break;
    default:
      break;
  }
});
