import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TowerOfBricks extends Component {

    constructor(props){
        super(props)
        this.state = {
            content: WORDPRESS.category,
            contentCount: WORDPRESS.category.count,
            totalBricksRequired: 10
        }
    }

    render() {
        let bricksToRender = Object.keys(this.state.content).map((slug, index) => 
            <Link key={index} to={"/cat/"+slug} className="brick real">
                <h2>{this.state.content[slug].name}</h2>
            </Link>
        )
        let brickIndex = bricksToRender.length
        const length = bricksToRender.length * 2
        // TODO: Improve these
        for (var index=1; index < length; index+=1, brickIndex+=1) {
            let fakeBrick = <div className="brick fake spacer" key={brickIndex}></div>
            bricksToRender.splice((index), 0, fakeBrick)
            if (index % 2 == 0) {
                index += 2
            }
        }
        for (let index=bricksToRender.length - 1; index <= this.state.totalBricksRequired; index+=1, brickIndex+=1) {
            bricksToRender.push(
                <div className="brick fake" key={brickIndex}></div>
            )
        }
        return(
            <div className={"towerOfBricksContainer"}>
                {bricksToRender}
            </div>
        )
    }

}

export default TowerOfBricks