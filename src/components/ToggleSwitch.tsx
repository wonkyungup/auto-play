import * as React from 'react';
import Switch from '@mui/material/Switch';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        checked ? t('tooltip:disableAutoPlay') : t('tooltip:enableAutoPlay')
      }
      arrow
    >
      <Switch
        id="auto-youtube-shorts-player"
        sx={{ pointerEvents: 'all' }}
        checkedIcon={<PlayCircleFilledIcon fontSize="large" />}
        icon={<PauseCircleFilledIcon fontSize="large" />}
        checked={checked}
        onChange={onChange}
      />
    </Tooltip>
  );
};

export default ToggleSwitch;
