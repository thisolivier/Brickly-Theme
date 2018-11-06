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
            <section className="brick real" key={index}>
                <h2><Link to={"/c/"+slug}>{this.props.content[slug].name}</Link></h2>
            </section>
        )
        let brickIndex = bricksToRender.length
        if (!this.props.constrainedWidth) {
            const length = bricksToRender.length * 2
            for (var index=1; index < length; index+=1, brickIndex+=1) {
                let fakeBrick = <div className="brick fake spacer" key={brickIndex}></div>
                bricksToRender.splice((index), 0, fakeBrick)
                if (index % 2 == 0) {
                    index += 2
                }
            }
        }
        for (let index=bricksToRender.length - 1; index <= this.state.totalBricksRequired; index+=1, brickIndex+=1) {
            bricksToRender.push(
                <div className="brick fake" key={brickIndex}></div>
            )
        }
        return(
            <div className="towerOfBricksContainer">
                {bricksToRender}
            </div>
        )
    }

}

export default TowerOfBricks