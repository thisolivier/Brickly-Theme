import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TowerOfBricks extends Component {

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            content: props.content,
            settingUp: props.settingUp
        }
    }

    render() {
        return(
            <div>
                {Object.keys(this.state.content).map((slug, index) => 
                <div className="brick" key={index}>
                    <h2><Link to={"/c/"+slug}>{this.state.content[slug].name}</Link></h2>
                </div>
                )}
            </div>
        )
    }

}

export default TowerOfBricks