import * as React from 'react';
import { useState } from 'react';
import Defs from '../../assets/constatns';
import { store } from '../../store';
import OptionBtn from './Button';
import OptionContent from './Content';
import ItemCC from './Item/ItemCC';

const OptionView = () => {
  const [rotate, setRotate] = useState(store.getState().options.rotate);
  const [cardOpen, setCardOpen] = useState(false);
  const [cc, setCC] = useState(store.getState().options.isCC);

  React.useEffect(() => {
    setRotate(cardOpen ? 90 : 0);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_ROTATE,
      rotate: cardOpen ? 90 : 0,
    });
  }, [cardOpen]);

  React.useEffect(() => {
    if (cc) store.dispatch({ type: Defs.REDUX_YTS_SHOW_CC });
    else store.dispatch({ type: Defs.REDUX_YTS_HIDDEN_CC });
  }, [cc]);

  return (
    <div>
      <OptionBtn rotate={rotate} onClick={() => setCardOpen(!cardOpen)} />
      {cardOpen && (
        <OptionContent onMouseLeave={() => setCardOpen(!cardOpen)}>
          <ItemCC
            cc={cc}
            onClick={() => {
              setCC(!cc);
              store.dispatch({
                type: Defs.REDUX_OPTIONS_CC,
                cc: !cc,
              });
            }}
          />
        </OptionContent>
      )}
    </div>
  );
};

export default OptionView;
