import * as React from 'react';
import * as ReactDOM from "react-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SystemTheme from './components/SystemTheme';
import Browser from "webextension-polyfill";
import YoutubeShorts from "./assets/youtubeShorts";

const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
setTimeout(async () => {
    await youtubeShorts.setCurPlayVideo();

    const actions = youtubeShorts._innerContainer?.querySelector('#actions');
    const div = document.createElement('div');
    div.id = 'auto-play';
    actions?.append(div);

    const autoPlay = document.getElementById('auto-play');
    if (autoPlay) {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            autoPlay
        )
    }
}, 300);

const MediaControlCard = () => {
    const theme = useTheme();
    const [profile, setProfile] = React.useState();
    const initVideoProfile = async () => {
        setTimeout(async () => {
            // @ts-ignore
            setProfile(await youtubeShorts.getCurPlayVideoProfile());
        }, 200);
    }

    React.useEffect(() => {
        (async () => await initVideoProfile())();
        Browser.runtime.onMessage.addListener(async message => {
            if (message === `URL: Detection`) {
                await initVideoProfile();
            }
        })
    }, [])

    return (
        <Card sx={{ display: 'flex', right: 0, position: 'absolute', top: 0 }}>
            <CardMedia
                component="img"
                sx={{ width: 48, height: 48 }}
                image={profile}
                alt="load"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="previous" sx={{ display: 'none' }}>
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ width: 32, height: 32 }}/>
                </IconButton>
                <IconButton aria-label="next" sx={{ display: 'none' }}>
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
            </Box>
        </Card>
    );
}

const App = () => {
    return (
        <SystemTheme>
            <MediaControlCard />
        </SystemTheme>
    )
}
