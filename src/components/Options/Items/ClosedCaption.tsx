import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { onYtsCC } from '@/store/YoutubeShorts';

const OptionCC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <MenuItem onClick={() => dispatch(onYtsCC())}>
      <ListItemIcon>{<ClosedCaptionIcon fontSize="large" />}</ListItemIcon>
      <ListItemText>{t('options:cc:title')}</ListItemText>
    </MenuItem>
  );
};

export default OptionCC;
