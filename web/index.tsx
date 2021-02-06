import React from 'react';
import ReactDOM from 'react-dom';
import { add } from '../pkg';

ReactDOM.render(
    <div>{add(2, 3)}</div>,
    document.getElementById('ui')
);