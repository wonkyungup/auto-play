import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionOverlay } from '../../../store/Options';
import { onYtsOverlay } from '../../../store/YoutubeShorts';

const OptionWindowOverlay = () => {
  const dispatch = useDispatch();
  const overlayState = useSelector(
    (state: RootState) => state.options.overlayState,
  );
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsOverlay(overlayState));
  }, [overlayState]);

  return (
    <MenuItem onClick={() => dispatch(setOptionOverlay())}>
      <ListItemIcon>
        {overlayState && <LayersClearIcon fontSize="large" />}
        {!overlayState && <LayersIcon fontSize="large" />}
      </ListItemIcon>
      <ListItemText>{t('options:windowOverlay:title')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {!overlayState
          ? t('options:windowOverlay:show')
          : t('options:windowOverlay:hide')}
      </Typography>
    </MenuItem>
  );
};

export default OptionWindowOverlay;
