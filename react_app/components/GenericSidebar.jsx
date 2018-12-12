import React, { Component } from 'react';
import OutLinks from './OutLinks'

class GenericSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = { in: true }
    }

    componentWillUnmount() {
        console.log("UNMOUNTING SIDEBAR")
        this.setState({in: false})
    }

    render() {
        return(
            <div className="sidebar">
                <div className="aboutOlivier">
                    <h2>{WORDPRESS.sidebar.title}</h2>
                    {WORDPRESS.sidebar.bodyText.split('/').map((string, key)=>(
                        <p key={key}>{String(string)}</p>
                    ))}
                    <OutLinks />
                </div>
            </div>
        )
        
    }

}

export default GenericSidebar