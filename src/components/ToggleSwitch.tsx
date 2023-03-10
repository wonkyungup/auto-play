import * as React from 'react';
import Switch from '@mui/material/Switch';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Tooltip from '@mui/material/Tooltip';

const ToggleSwitch = () => {
    const [checked, setChecked] = React.useState<boolean>(false);
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    return (
        <Tooltip
            title={checked ? 'stop autoplay' : 'autoplay settings'}
            arrow
        >
            <Switch
                sx={{ pointerEvents: 'all' }}
                checkedIcon={<PlayCircleFilledIcon fontSize="large" />}
                icon={<PauseCircleFilledIcon fontSize="large" />}
                size="medium"
                checked={checked}
                onChange={handlerChange}
            />
        </Tooltip>
    );
}

export default ToggleSwitch;
