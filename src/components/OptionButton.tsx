import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import Defs, { TypeProps } from '../assets/constatns';
import { store } from '../store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const OptionButton = (props: TypeProps) => {
  const { t } = useTranslation();
  const [rotate, setRotate] = useState(store.getState().options.rotate);
  const [cardOpen, setCardOpen] = useState(false);

  const handleButtonClick = () => {
    props.yts._innerVideo.pause();
    setCardOpen(!cardOpen);
  };

  React.useEffect(() => {
    setRotate(cardOpen ? 90 : 0);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_ROTATE,
      rotate: cardOpen ? 90 : 0,
    });
  }, [cardOpen]);

  return (
    <div>
      <Tooltip title={t('tooltip:setting')} arrow>
        <IconButton
          disabled
          aria-label="option"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 9,
            top: 0,
            right: 0,
            left: 60,
            transform: `rotate(${rotate}deg)`,
            color: '#ffffff',
          }}
          onClick={handleButtonClick}
        >
          <SettingsIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
      {cardOpen && (
        <Card
          sx={{
            position: 'absolute',
            pointerEvents: 'all',
            width: 200,
            left: 50,
            top: 33,
            opacity: 0.8,
          }}
        >
          <CardContent>Options</CardContent>
        </Card>
      )}
    </div>
  );
};

export default OptionButton;
