import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'
import OutLinks from './OutLinks'

class GenericSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = { in: true }
        this.sidebarContent = ReactHtmlParser(WORDPRESS.sidebar.bodyText)
    }

    componentWillUnmount() {
        this.setState({in: false})
    }

    render() {
        return(
            <div className="sidebar">
                <div className="aboutOlivier">
                    <h2>{WORDPRESS.sidebar.title}</h2>
                    {this.sidebarContent}
                    <OutLinks />
                </div>
            </div>
        )
        
    }

}

export default GenericSidebar