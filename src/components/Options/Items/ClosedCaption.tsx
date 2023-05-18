import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionCC } from '../../../store/Options';
import { onYtsCC } from '../../../store/YoutubeShorts';

const OptionCC = () => {
  const dispatch = useDispatch();
  const ccState = useSelector((state: RootState) => state.options.ccState);
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsCC(ccState));
  }, [ccState]);

  return (
    <MenuItem onClick={() => dispatch(setOptionCC())}>
      <ListItemIcon>
        {!ccState && <ClosedCaptionDisabledIcon fontSize="large" />}
        {ccState && <ClosedCaptionIcon fontSize="large" />}
      </ListItemIcon>
      <ListItemText>{t('options:cc:title')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {!ccState ? t('options:cc:disabled') : t('options:cc:enabled')}
      </Typography>
    </MenuItem>
  );
};

export default OptionCC;
