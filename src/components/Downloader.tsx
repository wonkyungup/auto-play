import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import Defs from '../assets/constatns';
import { store } from '../store';

const DownloaderApp = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('downloader:title')} arrow>
      <IconButton
        aria-label="downloader"
        sx={{
          pointerEvents: 'all',
          position: 'absolute',
          bottom: 9,
          top: 0,
          right: 0,
          left: 65,
          color: '#ffffff',
        }}
        onClick={() =>
          store.dispatch({
            type: Defs.REDUX_DOWNLOADER,
            href: window.location.href,
          })
        }
      >
        <DownloadIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default DownloaderApp;
