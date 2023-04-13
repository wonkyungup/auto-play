import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { store } from '../../../store';
import Defs from '../../../assets/constatns';

const OptionCC = () => {
  const { closedCaption } = store.getState().options;
  const { t } = useTranslation();
  const [cc, setCC] = useState(closedCaption.state);
  const onClickHandler = () => {
    setCC(!cc);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_CC,
      cc: !cc,
    });
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_CC,
      cc: cc,
    });
  }, [cc]);

  return (
    <MenuItem onClick={onClickHandler}>
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

export default OptionCC;
