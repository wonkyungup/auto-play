import './assets/style/style.css';
import $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';
import EventsListener from './assets/eventsListener';
import ToggleSwitch from './components/ToggleSwitch';

let isAutoPlay: boolean = false;

EventsListener.onReload();
EventsListener.onKeyup();
EventsListener.onShortUpDownButton();
EventsListener.onWheelRemove();

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
    <ToggleSwitch
      isSwitch={checked}
      onChange={(event) => handlerChange(event)}
    />
  );
};

Browser.runtime.onMessage.addListener(async ({ event }) => {
  if (event === Defs.EVENT_PAGE_UPDATE || event === Defs.EVENT_PAGE_RELOAD) {
    await youtubeShorts.waitForVideoContainer();
    console.log(youtubeShorts);
    // await Utils.onWaitForElement('#shorts-inner-container');
    //
    // if ($('#shorts-inner-container').length > 0) {
    //   await youtubeShorts.onReady(
    //     '#shorts-container',
    //     '#shorts-inner-container',
    //   );
    //
    //   const shortsContainer = youtubeShorts._shortsContainer;
    //   const innerContainer = youtubeShorts._innerContainer;
    //
    //   // console.log(shortsContainer);
    //   // console.log(innerContainer);
    //   if (innerContainer === null) {
    //     await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_RELOAD });
    //   }
    //
    //   if (innerContainer !== null) {
    //     const autoYoutubeShortsScrollDown = $(
    //       '#auto-youtube-shorts-scroll-down',
    //     );
    //     if (autoYoutubeShortsScrollDown.length <= 0) {
    //       $(innerContainer)
    //         .parent()
    //         .append(
    //           '<div id="auto-youtube-shorts-scroll-down" style="display: inline-block;position: relative;" ></div>',
    //         );
    //
    //       ReactDOM.render(
    //         <Switch />,
    //         document.getElementById('auto-youtube-shorts-scroll-down'),
    //       );
    //     }
    //   }
    // }
  }
});
