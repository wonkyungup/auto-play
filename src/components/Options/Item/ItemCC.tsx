import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import { useTranslation } from 'react-i18next';

interface TypeOptionItemCC {
  cc: boolean;
  onClick: () => void;
}

const OptionItemCC = ({ cc, onClick }: TypeOptionItemCC) => {
  const { t } = useTranslation();

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        {!cc && <ClosedCaptionDisabledIcon fontSize="large" />}
        {cc && <ClosedCaptionIcon fontSize="large" />}
      </ListItemIcon>
      <ListItemText>{t('options:cc')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {!cc ? t('options:ccDisabled') : t('options:ccEnabled')}
      </Typography>
    </MenuItem>
  );
};

export default OptionItemCC;
