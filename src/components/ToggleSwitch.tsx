import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { onYtsLoopVideo, onYtsNextVideo } from '../store/YoutubeShorts';
import { setAutoPlay } from '../store/ToggleSwitch';

const ToggleSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checked = useSelector((state: RootState) => state.toggleSwitch.status);

  React.useEffect(() => {
    if (checked) {
      dispatch(onYtsNextVideo());
    } else {
      dispatch(onYtsLoopVideo());
    }
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setAutoPlay(event.target.checked))
        }
      />
    </Tooltip>
  );
};

export default ToggleSwitch;
