import * as React from "react";
import * as ReactDOM from "react-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';

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
                    you need to open the <Link href="https://www.youtube.com/shorts" target="_blank">Youtube Shorts</Link> home page.

                    <br />
                    <br />

                    🚀 A box will display at the top right corner of your screen with a 'PLAY' button.<br />
                    🚀 Click PLAY to start Video Scroll Down.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This extension allows you to automatically scroll down YouTube shorts.
                    <br />
                    <br />

                    😀 play button, it means not using it.
                    <br />
                    😀 pause button, it means you're using it.
                    <br />
                    <br />

                    ❤️ If you come in, please press a star. Thank you.
                    <br />
                    ⭐ Project home page and source code: <Link href="https://github.com/wonkyungup/auto-youtube-shorts-scroll-down" target="_blank">Github</Link>
                    <br />
                </Typography>
            </CardContent>
        </Card>
    );
}

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Introduction />
        </ThemeProvider>
    );
}

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
