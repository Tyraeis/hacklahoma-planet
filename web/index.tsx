import React from 'react';
import ReactDOM from 'react-dom';
import { rust_init, Renderer } from '../pkg';
rust_init();

ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById('ui')
);

let canvas = document.getElementById('canvas');
let renderer = new Renderer(canvas as HTMLCanvasElement);

function render(now: number) {
    requestAnimationFrame(render);
    renderer.render(now / 1000);
}
requestAnimationFrame(render);