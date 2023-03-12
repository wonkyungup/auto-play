import * as React from 'react';
import * as ReactDOM from "react-dom";
import SystemTheme from "./components/SystemTheme";
import ToggleSwitch from "./components/ToggleSwitch";
import Browser from "webextension-polyfill";
import YoutubeShorts from "./assets/youtubeShorts";

let isAutoPlay: boolean = false;
const youtubeShorts = new YoutubeShorts('shorts-container', 'shorts-inner-container');
const App = () => {
    const [checked, setChecked] = React.useState(isAutoPlay);
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        isAutoPlay = event.target.checked;
        setChecked(isAutoPlay);
    }

    React.useEffect(() => {
        if (checked) {
            youtubeShorts.doesNextVideo();
        } else {
            youtubeShorts.doesLoopVideo();
        }
    }, [checked]);

    return (
        <SystemTheme>
            <ToggleSwitch
                checked={checked}
                onChange={(event) => handlerChange(event)}
            />
        </SystemTheme>
    )
}

window.onload = async () => {
    await Browser.runtime.sendMessage('URL: Detection');
}

Browser.runtime.onMessage.addListener((request) => {
    if (request === 'URL: Detection') {
        setTimeout(async () => {
            await youtubeShorts.setCurPlayVideo();

            const actions = youtubeShorts._innerContainer?.querySelector('ytd-shorts-player-controls');
            const autoYoutubeShortsScrollDown = document.getElementById('auto-youtube-shorts-scroll-down');
            if (autoYoutubeShortsScrollDown) { /* ....? */
                autoYoutubeShortsScrollDown.remove();
            }

            const div = document.createElement('div');
            div.id = 'auto-youtube-shorts-scroll-down';
            div.style.position = 'absolute';
            div.style.top = '10.5%';
            div.style.right = '10%';

            actions?.append(div);
            ReactDOM.render(<App />, document.getElementById('auto-youtube-shorts-scroll-down'))
        }, 500);
    }
})
