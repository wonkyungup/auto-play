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

  // Redux
  static REDUX_TOGGLE_SWITCH_CHANGE = 'ToggleSwitch/CHANGE';
  static REDUX_OPTIONS_ROTATE = 'View/ROTATE';
  static REDUX_OPTIONS_CC = 'View/CC';
  static REDUX_OPTION_PLAY_BACK_RATE = 'View/PBR'; // PBR = Play Back Rate
  static REDUX_YTS_WAIT_FOR_VIDEO = 'Yts/WAIT_FOR_VIDEO';
  static REDUX_YTS_NEXT_INNER = 'Yts/NEXT_INNER';
  static REDUX_YTS_LOOP_VIDEO = 'Yts/LOOP_VIDEO';
  static REDUX_YTS_NEXT_VIDEO = 'Yts/NEXT_VIDEO';
  static REDUX_YTS_CC = 'Yts/CC';
  static REDUX_YTS_PLAY_BACK_RATE = 'Yts/PBR'; // PBR = Play Back Rate
}
