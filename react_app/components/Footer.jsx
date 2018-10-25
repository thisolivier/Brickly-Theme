import React, {Component} from 'react';
import EnquiryForm from './EnquiryForm';

class Footer extends Component {
    render() {
        return(
            <footer role="complementary" title="About Olivier, enquiry form, and various links">
            <div className="homeLink">
                <a href="/" title="Home" className="closePost">
                    <img src="/react_app_built/images/icon-house.png" alt="Home" />
                </a>
            </div>
            <div className="content">
                {WORDPRESS.author.content}
                
            </div>
            <EnquiryForm />
        </footer>
        )
    }
}

export default Footer