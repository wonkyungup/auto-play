import * as React from 'react';
import { useState } from 'react';
import Defs from '../../assets/constatns';
import { store } from '../../store';
import Button from './Base/Button';
import Content from './Base/Content';
import OptionCC from './ClosedCaption/Row';
import OptionPlayBackRate from './PlayBackRate/Row';

const OptionApp = () => {
  const { base, closedCaption, playBackRate } = store.getState().options;
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
  if (closedCaption.state) store.dispatch({ type: Defs.REDUX_YTS_SHOW_CC });
  else store.dispatch({ type: Defs.REDUX_YTS_HIDDEN_CC });

  // Play Back Rate
  store.dispatch({
    type: Defs.REDUX_YTS_PLAY_BACK_RATE,
    speed: playBackRate.speed,
  });

  return (
    <div>
      <Button rotate={rotate} onClick={() => setCardOpen(!cardOpen)} />
      {cardOpen && (
        <Content onMouseLeave={() => setCardOpen(!cardOpen)}>
          <OptionCC />
          <OptionPlayBackRate />
        </Content>
      )}
    </div>
  );
};

export default OptionApp;
