import React from 'react';

const HeaderCloud = () => (

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
    
);

export default HeaderCloud