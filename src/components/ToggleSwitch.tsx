import * as React from 'react';
import Switch from '@mui/material/Switch';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Tooltip from '@mui/material/Tooltip';

const ToggleSwitch = (props: { checked: boolean | undefined; onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined; }) => {
    return (
        <Tooltip
            title={props.checked ? 'stop autoplay' : 'autoplay settings'}
            arrow
        >
            <Switch
                id="auto-youtube-shorts-player"
                sx={{ pointerEvents: 'all' }}
                checkedIcon={<PlayCircleFilledIcon fontSize="large" />}
                icon={<PauseCircleFilledIcon fontSize="large" />}
                size="medium"
                checked={props.checked}
                onChange={props.onChange}
            />
        </Tooltip>
    );
}

export default ToggleSwitch;
