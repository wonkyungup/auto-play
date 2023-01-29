import "./App.css";
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ToggleSwitch from "./components/ToggleSwitch";
import { useChromeStorageSync } from 'use-chrome-storage';

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
    const [isSwitchState, setIsSwitchState] = useChromeStorageSync('isSwitchState', false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 275,
                textAlign: 'center',
                alignItems: 'center'
            }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Auto Play
                    </Typography>
                    <Typography
                        sx={{ mb: 1.5, fontSize: 10 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        wonko93@naver.com
                    </Typography>
                    <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                    >
                        {"It is made to automatically skip videos like YouTube Shorts or TikTok."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ToggleSwitch
                        state={isSwitchState}
                        onChange={setIsSwitchState}
                    />
                </CardActions>
            </Card>
        </ThemeProvider>
    );
};

export default App;
