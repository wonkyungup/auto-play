import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SpeedIcon from '@mui/icons-material/Speed';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { store } from '../../../store';
import Defs from '../../../assets/constatns';

const OptionItemPlayBackRate = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(
    store.getState().options.nPlayBackRate,
  );
  const valueTextHandler = (value: number) => {
    setValue(value);
    store.dispatch({
      type: Defs.REDUX_OPTION_PLAY_BACK_RATE,
      nPlayBackRate: value,
    });

    return `${value}`;
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_PLAY_BACK_RATE,
      nPlayBackRate: value,
    });
  }, [value]);

  return (
    <MenuItem>
      <ListItemIcon>
        <SpeedIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText>{t('options:PBR')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        <Box sx={{ width: 70 }}>
          <Slider
            size="small"
            aria-label="play-back-rate"
            defaultValue={value}
            getAriaValueText={valueTextHandler}
            step={0.5}
            min={0.5}
            max={1.5}
            valueLabelDisplay="auto"
          />
        </Box>
      </Typography>
    </MenuItem>
  );
};

export default OptionItemPlayBackRate;
