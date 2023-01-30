import "./assets/style/App.css";
import * as React from 'react';
import { useChromeStorageSync } from 'use-chrome-storage';
import AppTheme from './components/AppTheme'
import AppCard from "./components/Card";
import ToggleSwitch from "./components/ToggleSwitch";
import {
    AppTypographyTitle,
    AppTypographyProducer,
    AppTypographyDescription
} from './components/Typegraphy';

const App = () => {
    const [state, setState] = useChromeStorageSync('state', false);

    return (
        <AppTheme
            card={
                <AppCard
                    title={<AppTypographyTitle />}
                    producer={<AppTypographyProducer />}
                    description={<AppTypographyDescription />}
                    switch={
                        <ToggleSwitch
                            state={state}
                            onChange={setState}
                        />
                    }
                />
            }
        />
    );
};

export default App;
