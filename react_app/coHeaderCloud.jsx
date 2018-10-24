import React from 'react';

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
    </header>
    
);

export default HeaderCloud