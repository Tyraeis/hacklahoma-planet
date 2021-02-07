import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import SimplexNoise from 'simplex-noise';
import chroma from 'chroma-js';
import { rust_init, Renderer } from '../pkg';
rust_init();

ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById('ui')
);

const simplex = new SimplexNoise();
function noise(
    x: number, y: number, z: number,
    frequency: number, amplitude: number, persistance: number, octaves: number
): number {
    let value = 0;
    for (var i = 0; i < octaves; i++) {
        const freq = frequency * Math.pow(2, i);
        value += simplex.noise3D(x * freq, y * freq, z * freq)
            * (amplitude * Math.pow(persistance, i));
    }
    value = value / (2 - 1 / Math.pow(2, octaves-1))
    return value;
}

const colors: [number, chroma.Color][] = [
    [-0.5, chroma('#1253d3')],
    [0.00, chroma('#1253d3')],
    [0.05, chroma('#eae5ae')],
    [0.10, chroma('#10983b')],
    [0.45, chroma('#10983b')],
    [0.50, chroma('#ffffff')]
]
let surfaceFrequency = 1;
let surfaceAmplitude = 0.125;
let surfacePersistance = 0.5;
let surfaceOctaves = 8;
let heightMin = 0.0;
let heightMax = 0.0;
let surface_info = (pts: number[][]) => pts.map((pt: number[]) => {
    const x = pt[0], y = pt[1], z = pt[2];

    let height = noise(x, y, z, surfaceFrequency, surfaceAmplitude, surfacePersistance, surfaceOctaves);
    const relHeight = Math.max(-1.0, Math.min(1.0, height / surfaceAmplitude));
    if (relHeight > heightMax) heightMax = relHeight;
    if (relHeight < heightMin) heightMin = relHeight;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i][0] >= relHeight) {
            break;
        }
    }
    if (i <= 0) i = 1;
    if (i >= colors.length) i = colors.length-1;
    const left = colors[i-1];
    const right = colors[i];
    const ratio = (relHeight - left[0]) / (right[0] - left[0]);
    const color = chroma.mix(left[1], right[1], ratio).rgb();
    if (height < 0) height = 0;

    return {
        height: 1 + height,
        color: [color[0]/255.0, color[1]/255.0, color[2]/255.0]
    }
})

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let renderer = new Renderer(canvas, 6, surface_info);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.resize();
}

window.addEventListener('resize', resize);
resize();

let x: number | null = null;
function render(now: number) {
    requestAnimationFrame(render);
    /* if (x == null || now - x > 5000) {
        x = now;
        renderer.regenerate_planet();
    } */
    renderer.render(now / 1000);
}
requestAnimationFrame(render);