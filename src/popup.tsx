import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SystemTheme from './components/SystemTheme';
import Defs from './assets/constatns'

const Introduction = () => {
    return (
        <Card
            sx={{ minWidth: 420 }}
            variant="outlined"
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Auto Youtube Shorts Scroll Down
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    To start using this extension, <br />
                    you need to open the <Link href={Defs.URL_YOUTUBE_SHORTS} target="_blank">Youtube Shorts</Link> home page.

                    <br />
                    <br />

                    🚀 A switch is created at the top of the video.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This extension allows you to automatically scroll down YouTube shorts.
                    <br />
                    <br />

                    😀 Autoplay starts when you turn on the switch.
                    <br />
                    😀 Autoplay is canceled when the switch is turned off.
                    <br />
                    😀 Sometimes I can't create a switch, the solution is to refresh the page.
                    <br />
                    <br />

                    ❤️ If you come in, please press a star. Thank you.
                    <br />
                    ⭐ Project home page and source code: <Link href={Defs.URL_GITHUB} target="_blank">Github</Link>
                    <br />
                </Typography>
            </CardContent>
        </Card>
    );
}

const App = () => {
    return (
        <SystemTheme>
            <Introduction />
        </SystemTheme>
    )
}

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
