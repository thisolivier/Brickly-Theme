import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TowerOfBricks extends Component {

    constructor(props){
        super(props)
        this.state = {
            contentCount: props.content.count,
            totalBricksRequired: 10
        }
    }

    render() {
        let bricksToRender = Object.keys(this.props.content).map((slug, index) => 
            <div className="brick real" key={index}>
                <h2><Link to={"/c/"+slug}>{this.props.content[slug].name}</Link></h2>
            </div>
        )
        for (let index=bricksToRender.length - 1; index <= this.state.totalBricksRequired; index+=1) {
           bricksToRender.push(
            <div className="brick" key={index}></div>
           )
        }
        return(
            <div class="towerOfBricksContainer">
                {bricksToRender}
            </div>
        )
    }

}

export default TowerOfBricks