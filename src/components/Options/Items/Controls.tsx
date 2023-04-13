import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { store } from '../../../store';
import Defs from '../../../assets/constatns';

const OptionControls = () => {
  const { controls } = store.getState().options;
  const { t } = useTranslation();
  const [isControls, setControls] = useState(controls.state);
  const onClickHandler = () => {
    setControls(!isControls);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_CONTROLS,
      isControls: !isControls,
    });
  };

  React.useEffect(() => {
    store.dispatch({
      type: Defs.REDUX_YTS_CONTROLS,
      isControls: isControls,
    });
  }, [isControls]);

  return (
    <MenuItem onClick={onClickHandler}>
      <ListItemIcon>
        {!isControls && <VisibilityOffIcon fontSize="large" />}
        {isControls && <VisibilityIcon fontSize="large" />}
      </ListItemIcon>
      <ListItemText>{t('options:cc')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {!isControls ? t('options:ccDisabled') : t('options:ccEnabled')}
      </Typography>
    </MenuItem>
  );
};

export default OptionControls;
