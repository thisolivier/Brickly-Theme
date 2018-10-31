import React, { Component } from 'react';
import EnquiryForm from './EnquiryForm';
import OutLinks from './OutLinks'

class GenericSidebar extends Component {

    render() {
        return(
            <div>
                <div className="aboutOlivier">
                    <h2>{WORDPRESS.author.title}</h2>
                    {WORDPRESS.author.content.split('/').map(string=>(
                        <p>{string}</p>
                    ))}
                    <OutLinks />
                </div>                
            </div>
        )
    }

}

export default GenericSidebar