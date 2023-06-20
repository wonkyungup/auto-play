import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { setOptionShowDisLike } from '@/store/Options';
import { onYtsShowDisLike } from '@/store/YoutubeShorts';

const ShowDisLike = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.options.dislikeState);
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(onYtsShowDisLike(state));
  }, [state]);

  return (
    <MenuItem onClick={() => dispatch(setOptionShowDisLike())}>
      {state && (
        <>
          <ListItemIcon>{<ThumbDownIcon fontSize="large" />}</ListItemIcon>
          <ListItemText>보이기</ListItemText>
        </>
      )}
      {!state && (
        <>
          <ListItemIcon>
            {<ThumbDownOffAltIcon fontSize="large" />}
          </ListItemIcon>
          <ListItemText>숨기기</ListItemText>
        </>
      )}
    </MenuItem>
  );
};

export default ShowDisLike;
