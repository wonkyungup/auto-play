import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

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
      <label id="auto-play-switch" className="switch">
        <input type="checkbox" checked={isSwitch} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </Tooltip>
  );
};

export default ToggleSwitch;
