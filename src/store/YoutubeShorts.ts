import { createSlice, current } from '@reduxjs/toolkit';
import Defs from '../assets/constatns';
import Utils from '../assets/utils';
import $ from 'jquery';
import Browser from 'webextension-polyfill';

interface TypeYTS {
  innerContainer: Element | null;
  innerList: any[];
  innerVideo: any;
  innerPlayerControl: any;
}

const initialState: TypeYTS = {
  innerContainer: null,
  innerList: [],
  innerVideo: null,
  innerPlayerControl: null,
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
    onYtsCC: (state, action) => {
      Utils.waitForElement('#ytp-caption-window-container').then((cc) => {
        const isCC = action.payload;
        if (cc) {
          if (isCC) $(cc).show();
          else $(cc).hide();
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
} = ytsSlice.actions;

export default ytsSlice.reducer;
