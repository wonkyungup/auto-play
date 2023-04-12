import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

interface TypeButton {
  rotate: number;
  onClick: () => void;
}

const Button = ({ rotate, onClick }: TypeButton) => {
  const { t } = useTranslation();

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
          left: 60,
          transform: `rotate(${rotate}deg)`,
          color: '#ffffff',
        }}
        onClick={onClick}
      >
        <SettingsIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
