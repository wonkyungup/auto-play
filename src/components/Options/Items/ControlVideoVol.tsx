import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import store from '../../../store';
import Defs from '../../../assets/constatns';

const OptionControlVideoVol = () => {
  const { innerVideo } = store.getState().yts;
  const { videoVol } = store.getState().options;
  const { t } = useTranslation();
  const [value, setValue] = React.useState(videoVol.value);
  const onHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    store.dispatch({
      type: Defs.REDUX_OPTION_CONTROL_VIDEO_VOL,
      vol: newValue,
    });
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_CONTROL_VIDEO_VOL,
      vol: value,
    });
  }, [value]);

  return (
    <MenuItem sx={{ padding: 0 }} disabled={innerVideo.muted}>
      <List dense>
        <ListItem>
          <ListItemIcon>
            {innerVideo.muted && <VolumeOffIcon fontSize="large" />}
            {!innerVideo.muted && value <= 0 && (
              <VolumeMuteIcon fontSize="large" />
            )}
            {!innerVideo.muted && value <= 0.5 && value > 0 && (
              <VolumeDownIcon fontSize="large" />
            )}
            {!innerVideo.muted && value > 0.5 && (
              <VolumeUpIcon fontSize="large" />
            )}
          </ListItemIcon>
          <ListItemText>{t('options:videoVol:title')}</ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="text.secondary">
            <Box sx={{ width: 160 }}>
              <Slider
                size="small"
                aria-label="controls-video-vol"
                defaultValue={value}
                onChange={onHandler}
                step={0.1}
                min={0}
                max={1.0}
              />
            </Box>
          </Typography>
        </ListItem>
      </List>
    </MenuItem>
  );
};

export default OptionControlVideoVol;
