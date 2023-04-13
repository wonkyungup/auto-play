export interface TypeToggleSwitch {
  status: boolean;
}

export interface TypeOptions {
  base: {
    rotate: number;
  };
  closedCaption: {
    state: boolean;
  };
  playBackRate: {
    speed: number;
  };
  controls: {
    state: boolean;
  };
}

export interface TypeYTS {
  innerContainer: Element | null;
  innerList: any[];
  innerVideo: any;
  innerPlayerControl: any;
}

export default class Defs {
  static URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
  static URL_GITHUB =
    'https://github.com/wonkyungup/auto-youtube-shorts-scroll-down';

  static EVENT_PAGE_UPDATE = 'Page Update';
  static EVENT_PAGE_RELOAD = 'Page Reload';

  static REDUX_TOGGLE_SWITCH_CHANGE = 'ToggleSwitch/CHANGE';
  static REDUX_OPTIONS_ROTATE = 'OPTIONS/ROTATE';
  static REDUX_OPTIONS_CC = 'OPTIONS/CC';
  static REDUX_OPTIONS_PLAY_BACK_RATE = 'OPTIONS/PBR';
  static REDUX_OPTIONS_CONTROLS = 'OPTIONS/CONTROLS';
  static REDUX_YTS_WAIT_FOR_VIDEO = 'YOUTUBESHORTS/WAIT_FOR_VIDEO';
  static REDUX_YTS_NEXT_INNER = 'YOUTUBESHORTS/NEXT_INNER';
  static REDUX_YTS_LOOP_VIDEO = 'YOUTUBESHORTS/LOOP_VIDEO';
  static REDUX_YTS_NEXT_VIDEO = 'YOUTUBESHORTS/NEXT_VIDEO';
  static REDUX_YTS_CC = 'YOUTUBESHORTS/CC';
  static REDUX_YTS_PLAY_BACK_RATE = 'YOUTUBESHORTS/PBR';
  static REDUX_YTS_CONTROLS = 'YOUTUBESHORTS/CONTROLS';
}
