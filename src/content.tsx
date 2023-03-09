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

const youtubeShorts = new YoutubeShorts();
const MediaControlCard = () => {
    const theme = useTheme();
    const [profile, setProfile] = React.useState();
    const [curVideo, setCurVideo] = React.useState();

    React.useEffect(() => {
        setTimeout(async () => {
            setProfile(await youtubeShorts.getMediaPlayProfile());
            console.log(chrome);
            console.log(chrome.tabs);
        }, 500);
    }, [])

    return (
        <Card sx={{ display: 'flex', right: 0, position: 'absolute', zIndex: 9999, top: '30%' }}>
            <CardMedia
                component="img"
                sx={{ width: 48, height: 48 }}
                image={profile}
                alt="Refresh page."
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon />
                </IconButton>
                <IconButton aria-label="next">
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

const mountNode = document.getElementById("page-manager");
ReactDOM.render(<App />, mountNode);

// window.onload = async () => {
//     return await Browser.runtime.sendMessage(Defs.STR_ERROR);
// }
//
// Browser.runtime.onMessage.addListener(async (message) => {
//     switch (message) {
//         case Defs.STR_YOUTUBE_SHORTS:
//             const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
//             return await youtubeShorts.onExecution();
//         case Defs.URI_ERROR:
//         default:
//             return await Browser.runtime.sendMessage(Defs.STR_ERROR);
//     }
// })
