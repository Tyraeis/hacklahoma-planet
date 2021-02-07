import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { rust_init, Renderer } from '../pkg';
rust_init();

ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById('ui')
);

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let renderer = new Renderer(canvas);

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