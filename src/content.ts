import $ from 'jquery';
import Browser from 'webextension-polyfill';
import Defs from './assets/constatns';
import YoutubeShorts from './assets/youtubeShorts';

let isAutoPlay: boolean = false;
const youtubeShorts = new YoutubeShorts();

const waitForElm = (selector: any) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

$(async () => {
  await waitForElm('#shorts-container');
  await youtubeShorts.onReadyActiveVideo();

  const actions = youtubeShorts._innerContainer?.querySelectorAll(
    'ytd-shorts-player-controls',
  );

  if (actions) {
    const actionsList = actions[0].children;
    if (actionsList.length > 0) {
      const beforeDiv = actionsList[actionsList.length - 1];

      const autoYoutubeShortsScrollDown = document.getElementById(
        'auto-youtube-shorts-scroll-down',
      );
      if (autoYoutubeShortsScrollDown) {
        autoYoutubeShortsScrollDown.remove();
      }

      const div = document.createElement('div');
      div.id = 'auto-youtube-shorts-scroll-down';
      div.innerText = 'test';
      div.style.display = 'inline-block';
      div.style.position = 'relative';
      div.style.marginTop = '-7px';

      beforeDiv?.parentNode?.insertBefore(div, beforeDiv);
    }
  }
});

Browser.runtime.onMessage.addListener(async (request) => {
  if (
    request === Defs.EVENT_PAGE_LISTENER ||
    request === Defs.EVENT_PAGE_RELOAD
  ) {
    console.log('1');
  }
});
