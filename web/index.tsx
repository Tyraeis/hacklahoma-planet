import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { rust_init, Renderer } from '../pkg';
rust_init();

ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById('ui')
);

let surface_info = (pts: number[][]) => pts.map((pt: number[]) => {
    const x = pt[0], y = pt[1], z = pt[2];
    const r = Math.sqrt(x*x + y*y + z*z);
    const inclination = Math.acos(y / r);
    const azimuth = Math.atan2(x, z);

    const c = azimuth / Math.PI + 0.5

    return {
        height: 1 + 0.2*Math.sin(inclination*8),
        color: [c, 1-c, 0]
    }
})

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let renderer = new Renderer(canvas, 3, surface_info);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.resize();
}

window.addEventListener('resize', resize);
resize();

function render(now: number) {
    requestAnimationFrame(render);
    renderer.render(now / 1000);
}
requestAnimationFrame(render);