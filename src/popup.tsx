import './i18n';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SystemTheme from './components/SystemTheme';
import { useTranslation } from 'react-i18next';
import Defs from './assets/constants';

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ minWidth: 420, userSelect: 'none' }} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {t('popup:title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('popup:body1P1')}
          <Link href={Defs.URL_YOUTUBE_SHORTS} target="_blank">
            Youtube Shorts
          </Link>
          <br />
          <br />
          🚀 {t('popup:body1P2')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <br />
          {t('popup:body2P1')}
          <br />
          <br />
          😀 {t('popup:body2P2')}
          <br />
          😀 {t('popup:body2P3')}
          <br />
          😀 {t('popup:body2P4')}
          <br />
          <br />
          ❤️ {t('popup:body2P5')}
          <br />⭐ {t('popup:body2P6')}
          <Link href={Defs.URL_GITHUB} target="_blank">
            Github
          </Link>
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

const App = () => {
  return (
    <SystemTheme>
      <Introduction />
    </SystemTheme>
  );
};

const mountNode = document.getElementById('popup');
ReactDOM.render(<App />, mountNode);
