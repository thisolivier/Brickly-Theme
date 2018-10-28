import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TowerOfBricks extends Component {

    render() {
        return(
            <div>
                {WORDPRESS.category.map((nameDescriptionCountId, index) => 
                <div className="brick" key={index}>
                    <h2><Link to={"/c/"+nameDescriptionCountId.slug}>{nameDescriptionCountId.name}</Link></h2>
                </div>
                )}
            </div>
        )
    }

}

export default TowerOfBricks