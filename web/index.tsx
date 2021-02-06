import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import {StellarObjects} from './planets/planet';

let ourPlan: StellarObjects.Planet
ourPlan = StellarObjects.setPlanetDensity(ourPlan, StellarObjects.EARTH_DENSITY);
ourPlan = StellarObjects.setPlanetRadius(ourPlan, StellarObjects.EARTH_RADIUS.scale(2));
console.log("Test Gravity: R = 2, D = 1: " + StellarObjects.computePlanetaryGravityFromDensityAndRadius(ourPlan))

ReactDOM.render(
    <App />,
    document.getElementById('ui')
);