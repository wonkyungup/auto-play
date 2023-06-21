import { createSlice, current } from '@reduxjs/toolkit';
import Defs from '@/assets/constatns';
import $ from 'jquery';
import Browser from 'webextension-polyfill';
import Utils from '@/assets/utils';
import axios from 'axios';

interface TypeYTS {
  innerContainer: Element | null;
  innerList: any[];
  innerVideo: any;
  innerPlayerControl: any;
  isMenuActive: boolean;
}

const initialState: TypeYTS = {
  innerContainer: null,
  innerList: [],
  innerVideo: null,
  innerPlayerControl: null,
  isMenuActive: false,
};

const ytsSlice = createSlice({
  name: 'yts',
  initialState,
  reducers: {
    onAwaitYtsForVideo: (state, action) => {
      state.innerVideo = action.payload.innerVideo;
      state.innerContainer = action.payload.innerContainer;
      state.innerList = action.payload.innerList;
      state.innerPlayerControl = action.payload.innerPlayerControl;
    },
    onYtsLoopVideo: (state) => {
      state.innerVideo?.setAttribute('loop', String(true));
    },
    onYtsNextVideo: (state) => {
      const yts = current(state);

      yts.innerVideo?.removeAttribute('loop');
      yts.innerVideo.onended = async () => {
        const afterIndex: number = yts.innerList.indexOf(yts.innerContainer);
        yts.innerList[afterIndex + 1].scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        });

        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
      };
    },
    onYtsCC: (state) => {
      if (!state.isMenuActive) {
        const menu: HTMLElement = document.querySelector(
          '#button-shape yt-touch-feedback-shape div.yt-spec-touch-feedback-shape__fill',
        ) as HTMLElement;

        if (menu !== null) {
          menu.click();
          menu.click();

          state.isMenuActive = true;
        }
      }

      Utils.waitForElement(
        '#items ytd-menu-navigation-item-renderer:nth-child(2) tp-yt-paper-item',
      ).then((ccElement) => {
        const btn: HTMLElement = ccElement as HTMLElement;
        if (btn !== null) {
          btn.click();
        }
      });
    },
    onYtsPlayBackRate: (state, action) => {
      state.innerVideo.playbackRate = action.payload;
    },
    onYtsOverlay: (state, action) => {
      const { innerContainer } = state;

      if (innerContainer) {
        const _overlay = $(innerContainer).find('.overlay');

        if (action.payload) _overlay.css('display', 'none');
        else _overlay.css('display', 'block');
      }
    },
    onYtsVolume: (state, action) => {
      state.innerVideo.volume = action.payload;
    },
    onYtsShowDisLike: (state, action) => {
      const likeState = action.payload;
      const elementDisLike: Element | null | undefined =
        state.innerContainer?.querySelector('#dislike-button span');

      if (elementDisLike) {
        if (likeState) {
          const arrShowLink: string[] = window.location.href.split('/');
          const shortId: string = arrShowLink[arrShowLink.length - 1];

          /*
            returnyoutubedislike.com
          */

          axios
            .get(`https://returnyoutubedislikeapi.com/votes?videoId=${shortId}`)
            .then(
              ({ data }) =>
                (elementDisLike.innerHTML = data.dislikes.toString()),
            )
            .catch((err): void => {
              if (err) elementDisLike.innerHTML = 'error';
            });
        } else {
          elementDisLike.innerHTML = 'dislike';
        }
      }

      return;
    },
  },
});

export const {
  onAwaitYtsForVideo,
  onYtsLoopVideo,
  onYtsNextVideo,
  onYtsVolume,
  onYtsOverlay,
  onYtsPlayBackRate,
  onYtsCC,
  onYtsShowDisLike,
} = ytsSlice.actions;

export default ytsSlice.reducer;
