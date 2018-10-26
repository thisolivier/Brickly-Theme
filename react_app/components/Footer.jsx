import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return(
            <footer role="complementary">
            <div className="homeLink">
                <a href="/" title="Home" className="closePost">
                    <img src="/react_app_built/images/icon-house.png" alt="Home" />
                </a>
            </div>            
        </footer>
        )
    }
}

export default Footer