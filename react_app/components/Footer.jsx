import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return(
            <footer role="complementary">
                <Link to="/" title="Home" className="closePost">
                    <img src="/react_app_built/images/icon-house.png" alt="Home" />
                </Link>       
            </footer>
        )
    }
}

export default Footer