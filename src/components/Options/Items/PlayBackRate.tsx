import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TimesOneMobiledataIcon from '@mui/icons-material/TimesOneMobiledata';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionPlaybackRate } from '../../../store/Options';
import { onYtsPlayBackRate } from '../../../store/YoutubeShorts';

const OptionPlayBackRate = () => {
  const dispatch = useDispatch();
  const playBackRate = useSelector(
    (state: RootState) => state.options.playBackRate,
  );
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsPlayBackRate(playBackRate));
  }, [playBackRate]);

  return (
    <MenuItem sx={{ padding: 0 }}>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <TimesOneMobiledataIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>{t('options:playBackRate:title')}</ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="text.secondary">
            <Box sx={{ width: 160 }}>
              <Slider
                size="small"
                aria-label="play-back-rate"
                defaultValue={playBackRate}
                onChange={(event: Event, newValue: number | number[]) =>
                  dispatch(setOptionPlaybackRate(newValue as number))
                }
                step={0.25}
                min={0.25}
                max={2.0}
              />
            </Box>
          </Typography>
        </ListItem>
      </List>
    </MenuItem>
  );
};

export default OptionPlayBackRate;
