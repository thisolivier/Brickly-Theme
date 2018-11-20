import React, { Component } from 'react';
import OutLinks from './OutLinks'

class GenericSidebar extends Component {

    render() {
        return(
            <div className="sidebar">
                <div className="aboutOlivier">
                    <h2>{WORDPRESS.author.title}</h2>
                    {WORDPRESS.author.content.split('/').map((string, key)=>(
                        <p key={key}>{string}</p>
                    ))}
                    <OutLinks />
                </div>
            </div>
        )
    }

}

export default GenericSidebar