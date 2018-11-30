import React from 'react';
import {Link} from 'react-router-dom'

const HeaderCloud = (props) => (
    <div className="theCloud">
        <h1 className="brand">
            <span id="cloudLink">
                {props.routingAtIndex ? WORDPRESS.site.name :  <Link to={'/'} activeClassName="disable">{WORDPRESS.site.name}</Link>}
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