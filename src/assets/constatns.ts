export interface TypeToggleSwitch {
  status: boolean;
}

export interface TypeOptions {
  rotate: number;
  isCC: boolean;
}

export interface TypeYTS {
  innerContainer: Element | null;
  innerList: any[];
  innerVideo: any;
  innerPlayerControl: any;
}

export interface TypeProps {
  yts: {
    _innerContainer: Element | null;
    _innerList: any[];
    _innerVideo: any;
    _innerPlayerControl: any;
    waitForVideoContainer: () => void;
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
  static REDUX_OPTIONS_ROTATE = 'View/ROTATE';
  static REDUX_OPTIONS_CC = 'View/CC';
  static REDUX_YTS_WAIT_FOR_VIDEO = 'Yts/WAIT_FOR_VIDEO';
  static REDUX_YTS_NEXT_INNER = 'Yts/NEXT_INNER';
  static REDUX_YTS_LOOP_VIDEO = 'Yts/LOOP_VIDEO';
  static REDUX_YTS_NEXT_VIDEO = 'Yts/NEXT_VIDEO';
  static REDUX_YTS_SHOW_CC = 'Yts/SHOW_CC';
  static REDUX_YTS_HIDDEN_CC = 'Yts/HIDDEN_CC';
}
