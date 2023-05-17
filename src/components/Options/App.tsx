import * as React from 'react';
import { useState } from 'react';
import Defs from '../../assets/constatns';
import store from '../../store';
import Button from './Base/Button';
import Content from './Base/Content';
import ClosedCaption from './Items/ClosedCaption';
import PlayBackRate from './Items/PlayBackRate';
import WindowOverlay from './Items/WindowOverlay';
import ControlVideoVol from './Items/ControlVideoVol';

const OptionApp = () => {
  const { base, closedCaption, playBackRate, clearWindowText, videoVol } =
    store.getState().options;
  const [rotate, setRotate] = useState(base.rotate);
  const [cardOpen, setCardOpen] = useState(false);

  React.useEffect(() => {
    setRotate(cardOpen ? 90 : 0);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_ROTATE,
      rotate: cardOpen ? 90 : 0,
    });
  }, [cardOpen]);

  store.dispatch({
    type: Defs.REDUX_YTS_CC,
    cc: closedCaption.state,
  });

  store.dispatch({
    type: Defs.REDUX_YTS_PLAY_BACK_RATE,
    speed: playBackRate.speed,
  });

  store.dispatch({
    type: Defs.REDUX_YTS_WINDOW_OVERLAY,
    clearWindowText: clearWindowText.state,
  });

  store.dispatch({
    type: Defs.REDUX_YTS_CONTROL_VIDEO_VOL,
    vol: videoVol.value,
  });

  return (
    <div>
      <Button rotate={rotate} onClick={() => setCardOpen(!cardOpen)} />
      {cardOpen && (
        <Content
          onMouseLeave={() => {
            setCardOpen(!cardOpen);
          }}
        >
          <ClosedCaption />
          <PlayBackRate />
          <WindowOverlay />
          <ControlVideoVol />
        </Content>
      )}
    </div>
  );
};

export default OptionApp;
