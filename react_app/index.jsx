import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
require('./index.scss');

render(
    <BrowserRouter>
        <Route path={'/'} component={App}/>
    </BrowserRouter>,
    document.getElementById('page')
);