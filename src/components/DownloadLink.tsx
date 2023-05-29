import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const DownloadLink = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('tooltip:downloadLinkOpen')} arrow>
      <IconButton
        aria-label="option"
        sx={{
          pointerEvents: 'all',
          position: 'absolute',
          bottom: 9,
          top: 0,
          right: 0,
          left: 72,
          color: '#ffffff',
        }}
        onClick={() => {
          window.open(
            window.location.href.replace('youtube.com', 'ssyoutube.com'),
            '_blank',
            'height=700,width=700',
          );
        }}
      >
        <BrowserUpdatedIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadLink;
