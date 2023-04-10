import * as React from 'react';
import { useState } from 'react';
import Defs from '../../assets/constatns';
import { store } from '../../store';
import OptionBtn from './Button';
import OptionContent from './Content';
import ItemCC from './Item/ItemCC';
import ItemPlayBackRate from './Item/ItemPlayBackRate';

const OptionView = () => {
  const [rotate, setRotate] = useState(store.getState().options.rotate);
  const [cardOpen, setCardOpen] = useState(false);

  React.useEffect(() => {
    setRotate(cardOpen ? 90 : 0);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_ROTATE,
      rotate: cardOpen ? 90 : 0,
    });
  }, [cardOpen]);

  // CC
  if (store.getState().options.isCC)
    store.dispatch({ type: Defs.REDUX_YTS_SHOW_CC });
  else store.dispatch({ type: Defs.REDUX_YTS_HIDDEN_CC });

  // Play Back Rate
  store.dispatch({
    type: Defs.REDUX_YTS_PLAY_BACK_RATE,
    nPlayBackRate: store.getState().options.nPlayBackRate,
  });

  return (
    <div>
      <OptionBtn rotate={rotate} onClick={() => setCardOpen(!cardOpen)} />
      {cardOpen && (
        <OptionContent onMouseLeave={() => setCardOpen(!cardOpen)}>
          <ItemCC />
          <ItemPlayBackRate />
        </OptionContent>
      )}
    </div>
  );
};

export default OptionView;
