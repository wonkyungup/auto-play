import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { setOptionShowDisLike } from '@/store/Options';
import { onYtsShowDisLike } from '@/store/YoutubeShorts';
import Typography from '@mui/material/Typography';

const ShowDisLike = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.options.dislikeState);
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsShowDisLike(state));
  }, [state]);

  return (
    <MenuItem onClick={() => dispatch(setOptionShowDisLike())}>
      <ListItemIcon>{<ThumbDownIcon fontSize="large" />}</ListItemIcon>
      <ListItemText>{t('options:dislike:title')}</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {t('options:dislike:show')}
      </Typography>
    </MenuItem>
  );
};

export default ShowDisLike;
