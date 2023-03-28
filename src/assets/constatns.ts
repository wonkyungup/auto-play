export interface TypeProps {
  yts: {
    _innerContainer: Element | null;
    _innerList: any[];
    _innerVideo: any;
    _innerPlayerControl: any;
    _isAutoPlay: boolean;
    onToggleAutoPlayState: (arg0: boolean) => void;
    waitForVideoContainer: () => void;
    getNextElement: () => void;
    doesLoopVideo: () => void;
    doesNextVideo: () => void;
  };
}

export default class Defs {
  static URL_YOUTUBE_SHORTS = 'https://www.youtube.com/shorts';
  static URL_GITHUB =
    'https://github.com/wonkyungup/auto-youtube-shorts-scroll-down';

  static EVENT_PAGE_UPDATE = 'Page Update';
  static EVENT_PAGE_RELOAD = 'Page Reload';
}
