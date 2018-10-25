import React from 'react';
import { Route } from 'react-router-dom';
import GenericSidebar from './GenericSidebar';


const HeaderCloud = () => (

    <header class="sitewide" title="Page Title">
        <div id="theCloud">
            <h1 class="brand">
                <span id="cloudLink">
                    {WORDPRESS.site_name}
                </span>
            </h1>
            <div class="backgroundCloud" aria-hidden="true">
            <div class="ball big">&nbsp;</div>
            <div class="ball small">&nbsp;</div>
            <div class="ball medium">&nbsp;</div>
            </div>
        </div>
        <Route path="/" component={GenericSidebar} />
    </header>
    
);

export default HeaderCloud