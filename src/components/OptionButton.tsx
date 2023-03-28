import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { TypeProps } from '../assets/constatns';

const OptionButton = (props: TypeProps) => {
  const { t } = useTranslation();
  const [rotate, setRotate] = React.useState(0);
  const handlerClick = () => {
    props.yts._innerVideo.pause();

    if (rotate !== 0) {
      setRotate(0);
    } else {
      setRotate(90);
    }
  };

  return (
    <Tooltip title={t('tooltip:setting')} arrow>
      <IconButton
        aria-label="option"
        sx={{
          pointerEvents: 'all',
          position: 'absolute',
          bottom: 9,
          top: 0,
          right: 0,
          left: 55,
          transform: `rotate(${rotate}deg)`,
        }}
        onClick={handlerClick}
      >
        <SettingsIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default OptionButton;
