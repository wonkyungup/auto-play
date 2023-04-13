import * as React from 'react';
import { useState } from 'react';
import Defs from '../../assets/constatns';
import { store } from '../../store';
import Button from './Base/Button';
import Content from './Base/Content';
import ClosedCaption from './Items/ClosedCaption';
import PlayBackRate from './Items/PlayBackRate';
import Controls from './Items/Controls';

const OptionApp = () => {
  const { base, closedCaption, playBackRate, controls } =
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

  // CC
  store.dispatch({
    type: Defs.REDUX_YTS_CC,
    cc: closedCaption.state,
  });

  // Play Back Rate
  store.dispatch({
    type: Defs.REDUX_YTS_PLAY_BACK_RATE,
    speed: playBackRate.speed,
  });

  // Controls
  store.dispatch({
    type: Defs.REDUX_YTS_CONTROLS,
    isControls: controls.state,
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
          <Controls />
        </Content>
      )}
    </div>
  );
};

export default OptionApp;
