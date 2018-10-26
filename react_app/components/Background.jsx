
import React, { Component } from 'react';

class Background extends Component {

    render() {
        
        return(
            <div className="siteBackground">
                <canvas id="backgroundPost" aria-hidden="true"></canvas>
                <div className="backgroundLanscape hidden" aria-hidden="true">
                    <img src="/react_app_built/images/sky-holding.gif" alt="" className="sky"/>
                    <img src="/react_app_built/images/city-holding.gif" alt="" className="land"/>
                </div>
            </div>
        )
    }

}

export default Background