import React, { Component } from 'react';

class TowerOfBricks extends Component {

    render() {
        return(
            <div>
                {WORDPRESS.category.map((nameDescriptionCountId, index) => 
                <div className="brick" key={index}>
                    <h2><a href={"/c/"+nameDescriptionCountId.slug}>{nameDescriptionCountId.name}</a></h2>
                </div>
                )}
            </div>
        )
    }

}

export default TowerOfBricks