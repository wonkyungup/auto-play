import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const OptionButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('tooltip:setting')} arrow>
      <IconButton
        aria-label="option"
        sx={{ pointerEvents: 'all' }}
        onClick={onClick}
      >
        <SettingsIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default OptionButton;
