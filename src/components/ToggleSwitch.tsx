import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Defs, { TypeProps } from '../assets/constatns';
import { store } from '../store';

const ToggleSwitch = (props: TypeProps) => {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState<boolean>(
    store.getState().toggleSwitch.status,
  );

  React.useEffect(() => {
    if (checked) props.yts.doesNextVideo();
    else props.yts.doesLoopVideo();
  }, [checked]);

  return (
    <Tooltip
      title={
        checked ? t('tooltip:enableAutoPlay') : t('tooltip:disableAutoPlay')
      }
      arrow
    >
      <Switch
        sx={{
          pointerEvents: 'all',
          bottom: 5,
        }}
        checkedIcon={
          <PlayCircleFilledIcon fontSize="large" sx={{ color: '#ffffff' }} />
        }
        icon={
          <PauseCircleFilledIcon fontSize="large" sx={{ color: '#ffffff' }} />
        }
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setChecked(event.target.checked);
          store.dispatch({
            type: Defs.REDUX_TOGGLE_SWITCH_CHANGE,
            value: event.target.checked,
          });
        }}
      />
    </Tooltip>
  );
};

export default ToggleSwitch;
