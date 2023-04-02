import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import Defs, { TypeProps } from '../assets/constatns';
import { store } from '../store';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';

const Options = (props: TypeProps) => {
  const { t } = useTranslation();
  const [rotate, setRotate] = useState(store.getState().options.rotate);
  const [cardOpen, setCardOpen] = useState(false);
  const [cc, setCC] = useState(store.getState().options.isCC);

  const handleButtonClick = () => {
    setCardOpen(!cardOpen);
  };

  const onHandlerCC = () => {
    setCC(!cc);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_CC,
      cc: !cc,
    });
  };

  React.useEffect(() => {
    setRotate(cardOpen ? 90 : 0);
    store.dispatch({
      type: Defs.REDUX_OPTIONS_ROTATE,
      rotate: cardOpen ? 90 : 0,
    });
  }, [cardOpen]);

  React.useEffect(() => {
    if (cc) props.yts.showVideoCC();
    else props.yts.hiddenVideoCC();
  }, [cc]);

  return (
    <div>
      <Tooltip title={t('tooltip:setting')} arrow>
        <IconButton
          aria-label="option"
          sx={{
            pointerEvents: 'all',
            position: 'absolute',
            bottom: 9,
            top: 0,
            right: 0,
            left: 60,
            transform: `rotate(${rotate}deg)`,
            color: '#ffffff',
          }}
          onClick={handleButtonClick}
        >
          <SettingsIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
      {cardOpen && (
        <Card
          sx={{
            position: 'absolute',
            pointerEvents: 'all',
            width: 200,
            left: 50,
            top: 33,
            opacity: 0.8,
          }}
        >
          <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
              <MenuItem onClick={onHandlerCC}>
                <ListItemIcon>
                  {!cc && <ClosedCaptionDisabledIcon fontSize="large" />}
                  {cc && <ClosedCaptionIcon fontSize="large" />}
                </ListItemIcon>
                <ListItemText>{t('options:cc')}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {!cc ? t('options:ccDisabled') : t('options:ccEnabled')}
                </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </Card>
      )}
    </div>
  );
};

export default Options;
