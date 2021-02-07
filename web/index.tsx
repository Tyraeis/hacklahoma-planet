import React from 'react';
import ReactDOM from 'react-dom';
import { kelvin, Measure } from 'safe-units';
import App from '../src/components/App';
import { generatePlanetHeightMap } from '../src/noise-generation/noise';

ReactDOM.render(
    <App />,
    document.getElementById('ui')
);