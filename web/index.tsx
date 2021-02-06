import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import {StellarObjects} from './planets/planet';

let ourPlan = new StellarObjects.Planet()
ourPlan.density = StellarObjects.EARTH_DENSITY;
ourPlan.size = StellarObjects.EARTH_RADIUS.scale(2);
console.log("Test Gravity: R = 2, D = 1: " + ourPlan.computePlanetaryGravityFromDensityAndRadius())

ReactDOM.render(
    <App />,
    document.getElementById('ui')
);