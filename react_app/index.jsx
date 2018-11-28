import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
require('./index.scss');

render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('page')
);