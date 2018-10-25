import React from 'react';
import { Route } from 'react-router-dom';
import GenericSidebar from './GenericSidebar';


const HeaderCloud = () => (

    <header className="sitewide" title="Page Title">
        <div id="theCloud">
            <h1 className="brand">
                <span id="cloudLink">
                    {WORDPRESS.site.name}
                </span>
            </h1>
            <div className="backgroundCloud" aria-hidden="true">
            <div className="ball big">&nbsp;</div>
            <div className="ball small">&nbsp;</div>
            <div className="ball medium">&nbsp;</div>
            </div>
        </div>
        <Route path="/" component={GenericSidebar} />
    </header>
    
);

export default HeaderCloud