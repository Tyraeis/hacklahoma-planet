import React from 'react';
import ReactDOM from 'react-dom';
import { kelvin, Measure } from 'safe-units';
import App from '../src/components/App';
import {StellarObjects} from './planets/planet';

let ourPlan: StellarObjects.Planet
ourPlan = StellarObjects.setPlanetDensity(ourPlan, StellarObjects.EARTH_DENSITY);
ourPlan = StellarObjects.setPlanetRadius(ourPlan, StellarObjects.EARTH_RADIUS.scale(2));
ourPlan.gravity = StellarObjects.computePlanetaryGravityFromDensityAndRadius(ourPlan);
ourPlan.mass = StellarObjects.computeMassFromDensityAndRadius(ourPlan);
ourPlan.averageTemperature = Measure.of(288.15, kelvin)
//console.log("Test Gravity: R = 2, D = 1: " + StellarObjects.computePlanetaryGravityFromDensityAndRadius(ourPlan))
console.log("Display Test: ")
console.log("Grav: " + StellarObjects.getDisplayGravity(ourPlan))
console.log("Radius: " + StellarObjects.getDisplayRadius(ourPlan))
console.log("Mass: " + StellarObjects.getDisplayMass(ourPlan))
console.log("Density: " + StellarObjects.getDisplayDensity(ourPlan))
console.log("Temperature: " + StellarObjects.getDisplayTemperature(ourPlan))

ReactDOM.render(
    <App />,
    document.getElementById('ui')
);