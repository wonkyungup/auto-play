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
  clearWindowText: {
    state: boolean;
  };
  videoVol: {
    value: number;
  };
}

export interface TypeYTS {
  innerContainer: Element | null;
  innerList: any[];
  innerVideo: any;
  innerPlayerControl: any;
}

export interface TypeDownloader {
  url: string;
}

export default class Defs {
  static URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
  static URL_GITHUB =
    'https://github.com/wonkyungup/auto-youtube-shorts-scroll-down';

  static EVENT_PAGE_UPDATE = 'Page Update';
  static EVENT_PAGE_RELOAD = 'Page Reload';

  // Redux
  static REDUX_TOGGLE_SWITCH_CHANGE = 'TOGGLE_SWITCH/CHANGE';
  static REDUX_OPTIONS_ROTATE = 'OPTIONS/ROTATE';
  static REDUX_OPTIONS_CC = 'OPTIONS/CC';
  static REDUX_OPTION_PLAY_BACK_RATE = 'OPTIONS/PBR'; // PBR = Play Back Rate
  static REDUX_OPTION_WINDOW_OVERLAY = 'OPTIONS/CLEAN_WINDOW_TEXT';
  static REDUX_OPTION_CONTROL_VIDEO_VOL = 'OPTIONS/CONTROL_VIDEO_VOL';
  static REDUX_YTS_WAIT_FOR_VIDEO = 'YTS/WAIT_FOR_VIDEO';
  static REDUX_YTS_NEXT_INNER = 'YTS/NEXT_INNER';
  static REDUX_YTS_LOOP_VIDEO = 'YTS/LOOP_VIDEO';
  static REDUX_YTS_NEXT_VIDEO = 'YTS/NEXT_VIDEO';
  static REDUX_YTS_CC = 'YTS/CC';
  static REDUX_YTS_PLAY_BACK_RATE = 'YTS/PBR'; // PBR = Play Back Rate
  static REDUX_YTS_WINDOW_OVERLAY = 'YTS/CLEAN_WINDOW_TEXT';
  static REDUX_YTS_CONTROL_VIDEO_VOL = 'YTS/CONTROL_VIDEO_VOL';
  static REDUX_DOWNLOADER = 'DOWNLOADER/VIDEO';
}
