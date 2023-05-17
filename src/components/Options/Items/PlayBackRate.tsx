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
import store from '../../../store';
import Defs from '../../../assets/constatns';

const OptionPlayBackRate = () => {
  const { playBackRate } = store.getState().options;
  const { t } = useTranslation();
  const [value, setValue] = React.useState(playBackRate.speed);
  const onHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    store.dispatch({
      type: Defs.REDUX_OPTION_PLAY_BACK_RATE,
      speed: newValue,
    });
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_PLAY_BACK_RATE,
      speed: value,
    });
  }, [value]);

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
                defaultValue={value}
                onChange={onHandler}
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
