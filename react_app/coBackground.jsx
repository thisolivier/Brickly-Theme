import React, { Component } from 'react';
import { render } from 'react-dom';

class Background extends Component {

    render() {
        let base = WORDPRESS.url.api
        return(
            <div className="siteBackground">
                <h1>{base}</h1>
                <canvas id="backgroundPost" aria-hidden="true"></canvas>
                <div className="backgroundLanscape hidden" aria-hidden="true">
                    <img src="/dist/images/sky-holding.gif" alt="" className="sky"/>
                    <img src="/dist/images/city-holding.gif" alt="" className="land"/>
                </div>
            </div>
        )
    }

}

export default Background