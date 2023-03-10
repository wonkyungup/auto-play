import * as React from 'react';
import * as ReactDOM from "react-dom";
import SystemTheme from './components/SystemTheme';
import ToggleSwitch from "./components/ToggleSwitch";
import Browser from "webextension-polyfill";
import YoutubeShorts from "./assets/youtubeShorts";

const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');

window.onload = async () => {
    await Browser.runtime.sendMessage('URL: Detection');
}

const App = () => {
    React.useEffect(() => {
        console.log(youtubeShorts._innerContainer);
    }, [])

    return (
        <SystemTheme>
            <ToggleSwitch />
        </SystemTheme>
    )
}


Browser.runtime.onMessage.addListener((request) => {
    if (request === 'URL: Detection') {
        setTimeout(async () => {
            await youtubeShorts.setCurPlayVideo();

            const actions = youtubeShorts._innerContainer?.querySelector('ytd-shorts-player-controls');
            if (actions?.querySelector('#auto-youtube-shorts-scroll-down') === null) {
                const div = document.createElement('div');
                div.id = 'auto-youtube-shorts-scroll-down';
                div.style.position = 'absolute';
                div.style.top = '10.5%';
                div.style.right = '10%';

                actions?.append(div);
            }

            const autoYoutubeShortsScrollDown = actions?.querySelector('#auto-youtube-shorts-scroll-down');
            if (autoYoutubeShortsScrollDown) {
                ReactDOM.render(
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>,
                    autoYoutubeShortsScrollDown
                )
            }
        }, 500);
    }
})
