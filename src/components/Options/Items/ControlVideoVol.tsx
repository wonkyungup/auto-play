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
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionVolume } from '../../../store/Options';
import { onYtsVolume } from '../../../store/YoutubeShorts';

const OptionControlVideoVol = () => {
  const dispatch = useDispatch();
  const video = useSelector((state: RootState) => state.yts.innerVideo);
  const volume = useSelector((state: RootState) => state.options.volume);
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsVolume(volume));
  }, [volume]);

  return (
    <MenuItem sx={{ padding: 0 }} disabled={video.muted}>
      <List dense>
        <ListItem>
          <ListItemIcon>
            {video.muted && <VolumeOffIcon fontSize="large" />}
            {!video.muted && volume <= 0 && <VolumeMuteIcon fontSize="large" />}
            {!video.muted && volume <= 0.5 && volume > 0 && (
              <VolumeDownIcon fontSize="large" />
            )}
            {!video.muted && volume > 0.5 && <VolumeUpIcon fontSize="large" />}
          </ListItemIcon>
          <ListItemText>{t('options:videoVol:title')}</ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="text.secondary">
            <Box sx={{ width: 160 }}>
              <Slider
                size="small"
                aria-label="controls-video-vol"
                defaultValue={volume}
                onChange={(event: Event, newValue: number | number[]) =>
                  dispatch(setOptionVolume(newValue as number))
                }
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
