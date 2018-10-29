import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TowerOfBricks extends Component {

    render() {
        return(
            <div>
                {Object.keys(WORDPRESS.category).map((slug, index) => 
                <div className="brick" key={index}>
                    <h2><Link to={"/c/"+slug}>{WORDPRESS.category[slug].name}</Link></h2>
                </div>
                )}
            </div>
        )
    }

}

export default TowerOfBricks