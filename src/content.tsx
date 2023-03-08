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
import YoutubeShorts from './assets/youtubeShorts';

export default function MediaControlCard() {
    const theme = useTheme();
    const [curVideo, setCurVideo] = React.useState('');

    React.useEffect(() => {
        setTimeout(() => {
            console.log(document.getElementById('avatar'));
        }, 1000);
    }, [])

    return (
        <Card sx={{ display: 'flex', maxHeight: 150, maxWidth: 130, right: 0, position: 'absolute', zIndex: 9999 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    sx={{ width: 151 }}*/}
                {/*    image="48x48.png"*/}
                {/*    alt="Live from space album cover"*/}
                {/*/>*/}
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

const mountNode = document.getElementById("page-manager");
ReactDOM.render(<MediaControlCard />, mountNode);

// import Defs from './constants';
// import YoutubeShorts from './youtubeShorts';
// import Browser from 'webextension-polyfill';
// import $ from "jquery";
//
// const mediaPlayerElement = `
//     <span style='position: fixed; right: 0; display: inline-block; background: #888;
//      color: white; padding: 8px; font-size: 16px; border-radius: 4px; text-align: center; font-weight: bold; z-index: 9999;' id='AutoMediaPlayer'>
//         <a href='https://github.com/wonkyungup/auto-youtube-shorts-scroll-down' target=_blank>Auto Youtube Shorts Scroll Down v0.0.3</a>
//         <br />
//         <span style='font-size: 16px;'>
//             <buttom style='border: 1px solid #CCC; padding: 4px; margin: 6px; background: #FFF; border-radius: 4px; color:black;'>
//                 ▶️ START
//             </buttom>
//         </span>
//     </span>
// `
//
// $("#page-manager").append(mediaPlayerElement);

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
