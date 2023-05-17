import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import store from '../../../store';
import Defs from '../../../assets/constatns';

const OptionCC = () => {
  const { closedCaption } = store.getState().options;
  const { t } = useTranslation();
  const [state, setState] = useState(closedCaption.state);
  const onClickHandler = () => {
    setState(!state);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_CC,
      cc: !state,
    });
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_CC,
      cc: state,
    });
  }, [state]);

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        {!state && <ClosedCaptionDisabledIcon fontSize="large" />}
        {state && <ClosedCaptionIcon fontSize="large" />}
      </ListItemIcon>
      <ListItemText>{t('options:cc:title')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {!state ? t('options:cc:disabled') : t('options:cc:enabled')}
      </Typography>
    </MenuItem>
  );
};

export default OptionCC;
