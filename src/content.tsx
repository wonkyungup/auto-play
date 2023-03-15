import './i18n';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SystemTheme from './components/SystemTheme';
import ToggleSwitch from './components/ToggleSwitch';
import OptionButton from './components/OptionButton';
import YoutubeShorts from './assets/youtubeShorts';
import Defs from './assets/constants';
import { EventEmitter } from 'events';

const ee = new EventEmitter();
const youtubeShorts = new YoutubeShorts(ee);

let isAutoPlay: boolean = false;

setTimeout(async () => {
  if (document.getElementById('guide-inner-content')) {
    document.getElementById('guide-inner-content')?.remove();
  }

  if (document.querySelector('#content > ytd-mini-guide-renderer')) {
    document.querySelector('#content > ytd-mini-guide-renderer')?.remove();
  }

  if (document.getElementById('masthead')) {
    document.getElementById('masthead')?.remove();
  }

  await youtubeShorts.setActivateEvent();
  window.onload = () => ee.emit(Defs.EVENT_PAGE_WATCH);
}, 500);

const App = () => {
  const [isSwitch, setIsSwitch] = React.useState(isAutoPlay);
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isAutoPlay = event.target.checked;
    setIsSwitch(isAutoPlay);
  };

  const openOptionModal = () => {
    console.log('openOptionModal');
  };

  React.useEffect(() => {
    if (isSwitch) {
      youtubeShorts.doesNextVideo();
    } else {
      youtubeShorts.doesLoopVideo();
    }
  }, [isSwitch]);

  return (
    <SystemTheme>
      <ToggleSwitch
        isSwitch={isSwitch}
        onChange={(event) => handlerChange(event)}
      />
      <OptionButton onClick={() => openOptionModal()} />
    </SystemTheme>
  );
};

ee.on(Defs.EVENT_PAGE_WATCH, () => {
  ReactDOM.render(<App />, document.getElementById('masthead-container'));
});
