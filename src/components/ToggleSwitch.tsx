import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

const ToggleSwitch = ({
  isSwitch,
  onChange,
}: {
  isSwitch: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        isSwitch ? t('tooltip:enableAutoPlay') : t('tooltip:disableAutoPlay')
      }
      arrow
    >
      <Switch
        sx={{ pointerEvents: 'all', bottom: 5 }}
        checkedIcon={<PlayCircleFilledIcon fontSize="large" />}
        icon={<PauseCircleFilledIcon fontSize="large" />}
        checked={isSwitch}
        onChange={onChange}
      />
    </Tooltip>
  );
};

export default ToggleSwitch;
