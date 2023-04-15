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

const ytsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_YTS_WAIT_FOR_VIDEO:
      state.innerVideo = action.innerVideo;
      state.innerContainer = action.innerContainer;
      state.innerList = action.innerList;
      state.innerPlayerControl = action.innerPlayerControl;
      break;
    case Defs.REDUX_YTS_NEXT_INNER:
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
    case Defs.REDUX_YTS_CC:
      Utils.waitForElement('#ytp-caption-window-container').then((cc) => {
        const isCC = action.cc;
        if (cc) {
          if (isCC) $(cc).show();
          else $(cc).hide();
        }
      });
      break;
    case Defs.REDUX_YTS_PLAY_BACK_RATE:
      state.innerVideo.playbackRate = action.speed;
      break;
    case Defs.REDUX_YTS_CONTROLS:
      const { innerVideo, innerContainer } = state;
      const overlay = innerContainer?.querySelector('#overlay');
      const progressBar = innerContainer?.querySelector('#progress-bar');
      const setControls = () => {
        const controls = action.isControls;
        if (controls) $(innerVideo).attr('controls', 'true');
        else $(innerVideo).removeAttr('controls');
      };

      $(innerVideo).on('timeupdate', () => setControls());
      $(innerVideo).on('pause', () => setControls());
      $(innerVideo).on('play', () => setControls());
      $(innerVideo).on('click', () => setControls());
      $(innerVideo).on('mouseleave', () => {
        setControls();
        console.log('1');
      });

      if (overlay && progressBar) {
        if (action.isControls) {
          $(overlay).css('padding', '0 0 50px 0');
          $(progressBar).css({ display: 'none' });
          $(innerVideo).attr('controls', 'true');
        } else {
          $(overlay).css('padding', '0');
          $(progressBar).css({ display: 'block' });
          $(innerVideo).removeAttr('controls');
        }
      }
      break;
    default:
      break;
  }

  return state;
};

export { ytsReducer };
