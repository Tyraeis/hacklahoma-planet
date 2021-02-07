import {makeRectangle} from "fractal-noise";
import SimplexNoise from "simplex-noise";

const noiseFunc = new SimplexNoise(Math.random);

const mynoise = (x: number, y: number): number => {
    return noiseFunc.noise2D(x, y);
}

export const generatePlanetHeightMap = (frequency: number, amplitude: number, octaves: number = 8): number[] => {
    return makeRectangle(1024, 256, mynoise, {frequency: frequency, octaves: octaves, amplitude: amplitude});
}