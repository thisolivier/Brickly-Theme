import React, { Component } from 'react';
import EnquiryForm from './EnquiryForm';
import OutLinks from './OutLinks'

class GenericSidebar extends Component {

    render() {
        return(
            <div>
                <div className="aboutOlivier">
                    <h2>{WORDPRESS.author.title}</h2>
                    <p className="subheading"><span>{WORDPRESS.author.telephone}</span><span>{WORDPRESS.author.email}</span></p>
                    {WORDPRESS.author.content}
                </div>
                <EnquiryForm />
                <OutLinks />
            </div>
        )
    }

}

export default GenericSidebar