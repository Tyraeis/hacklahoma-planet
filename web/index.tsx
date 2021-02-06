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
renderer.render();
/* let i = 0
function render() {
    if (i < 10) requestAnimationFrame(render);
    i += 1;
    renderer.render();
}
render(); */