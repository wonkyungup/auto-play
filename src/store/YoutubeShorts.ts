import Defs, { TypeYTS } from '../assets/constatns';
import Utils from '../assets/utils';
import $ from 'jquery';
import Browser from 'webextension-polyfill';

const initialState: TypeYTS = {
  innerContainer: null,
  innerList: [],
  innerVideo: null,
  innerPlayerControl: null,
};

const ytsReducer = async (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_YTS_WAIT_FOR_VIDEO:
      // eslint-disable-next-line no-case-declarations
      const video: any = await Utils.waitForElement('video');
      await Utils.sleep(700);

      state.innerVideo = video;
      state.innerList =
        Array.from(
          <HTMLCollection>video?.closest('#shorts-inner-container')?.children,
        ) || [];
      state.innerContainer =
        state.innerList.filter(
          (element) => $(element).attr('is-active') !== undefined,
        )[0] || null;
      state.innerPlayerControl = state.innerContainer?.querySelector(
        'ytd-shorts-player-controls',
      );
      break;
    case Defs.REDUX_YTS_NEXT_INNER:
      await ytsReducer(state, { type: Defs.REDUX_YTS_WAIT_FOR_VIDEO });

      // eslint-disable-next-line no-case-declarations
      const index = state.innerList.indexOf(state.innerContainer);
      if (index > 0) {
        return state.innerList[index + 1];
      }
      break;
    case Defs.REDUX_YTS_LOOP_VIDEO:
      state.innerVideo?.setAttribute('loop', String(true));
      break;
    case Defs.REDUX_YTS_NEXT_VIDEO:
      state.innerVideo?.removeAttribute('loop');
      state.innerVideo.onended = async () => {
        const element = await ytsReducer(state, {
          type: Defs.REDUX_YTS_NEXT_INNER,
        });
        element.scrollIntoView({ block: 'end', behavior: 'smooth' });
        await Browser.runtime.sendMessage({ event: Defs.EVENT_PAGE_UPDATE });
      };
      break;
    case Defs.REDUX_YTS_SHOW_CC:
      Utils.waitForElement('#ytp-caption-window-container').then((cc) => {
        if (cc) {
          $(cc).show();
        }
      });
      break;
    case Defs.REDUX_YTS_HIDDEN_CC:
      Utils.waitForElement('#ytp-caption-window-container').then((cc) => {
        if (cc) {
          $(cc).hide();
        }
      });
      break;
    default:
      break;
  }

  return state;
};

export { ytsReducer };
