import './i18n';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SystemTheme from './components/SystemTheme';
import { useTranslation } from 'react-i18next';
import Defs from './assets/constatns';
import CssBaseline from '@mui/material/CssBaseline';

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ minWidth: 420, userSelect: 'none' }} variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {t('popup:introduction:title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('popup:introduction:subtitle')}
          <br />
          <br />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          🎤 {t('popup:exec:title')}
          <br />❌ New Tab ➡ Youtube ➡ Shorts {t('popup:exec:connect')}
          <br />⭕ New Tab ➡{' '}
          <Link href={Defs.URL_YOUTUBE_SHORTS} target="_blank">
            Youtube-Shorts 접속
          </Link>
          <br />
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          🎤 {t('popup:use:title')}
          <br />
          💁 {t('popup:use:text-1')}
          <br />
          💁 {t('popup:use:text-2')}
          <br />
          💁 {t('popup:use:text-3')}
          <br />
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          🔴 {t('popup:errorResponse:title')}
          <br />
          💁 {t('popup:errorResponse:text-1')}
          <br />
          💁 {t('popup:errorResponse:text-2')}
          <br />
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          🌈 {t('popup:explanation:title')}
          <br />
          🙇 {t('popup:explanation:text-1')}
          <br />⭐ {t('popup:explanation:text-2')}
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
      <CssBaseline />
      <Introduction />
    </SystemTheme>
  );
};

const mountNode = document.getElementById('popup');
ReactDOM.render(<App />, mountNode);
