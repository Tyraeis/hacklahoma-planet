import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { rust_init, Renderer } from '../pkg';
rust_init();

ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById('ui')
);

let freq1 = 8;
let freq2 = 3;
let surface_info = (pts: number[][]) => pts.map((pt: number[]) => {
    const x = pt[0], y = pt[1], z = pt[2];
    const r = Math.sqrt(x*x + y*y + z*z);
    const inclination = Math.acos(y / r);
    const azimuth = Math.atan2(x, z);

    const c = Math.sin(azimuth*freq2);

    return {
        height: 1 + 0.2*Math.sin(inclination*freq1),
        color: [c, 0, 1-c]
    }
})

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let renderer = new Renderer(canvas, 4, surface_info);

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
    if (x == null || now - x > 5000) {
        x = now;
        freq1 = Math.round(Math.random() * 12);
        freq2 = Math.round(Math.random() * 12);
        renderer.regenerate_planet();
        console.log(freq1, freq2)
    }
    renderer.render(now / 1000);
}
requestAnimationFrame(render);