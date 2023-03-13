import * as React from 'react';
import Switch from '@mui/material/Switch';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Tooltip from '@mui/material/Tooltip';

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Tooltip title={checked ? 'stop autoplay' : 'autoplay settings'} arrow>
      <Switch
        id="auto-youtube-shorts-player"
        sx={{ pointerEvents: 'all' }}
        checkedIcon={<PlayCircleFilledIcon fontSize="large" />}
        icon={<PauseCircleFilledIcon fontSize="large" />}
        size="medium"
        checked={checked}
        onChange={onChange}
      />
    </Tooltip>
  );
};

export default ToggleSwitch;
