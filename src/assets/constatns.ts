export interface TypeToggleSwitch {
  status: boolean;
}

export interface TypeOptions {
  rotate: number;
  isCC: boolean;
}

export interface TypeProps {
  yts: {
    _innerContainer: Element | null;
    _innerList: any[];
    _innerVideo: any;
    _innerPlayerControl: any;
    _innerVideoCC: any;
    waitForVideoContainer: (arg0: number) => void;
    getNextElement: () => void;
    doesLoopVideo: () => void;
    doesNextVideo: () => void;
    showVideoCC: () => void;
    hiddenVideoCC: () => void;
  };
}

export default class Defs {
  static URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
  static URL_GITHUB =
    'https://github.com/wonkyungup/auto-youtube-shorts-scroll-down';

  static EVENT_PAGE_UPDATE = 'Page Update';
  static EVENT_PAGE_RELOAD = 'Page Reload';

  // Redux
  static REDUX_TOGGLE_SWITCH_CHANGE = 'ToggleSwitch/CHANGE';
  static REDUX_OPTIONS_ROTATE = 'Options/ROTATE';
  static REDUX_OPTIONS_CC = 'Options/CC';
}
