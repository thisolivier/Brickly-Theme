import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Background from './components/Background';
import Footer from './components/Footer';
import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import GenericSidebar from './components/GenericSidebar'
import Category from './components/Category'

require('./index.scss');


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          settingUp: true,
        }
    }
    
    handleSetupComplete() {
        this.setState({settingUp: false})
    }

    componentDidMount() {
        setInterval(() => this.handleSetupComplete(), 1400);
    }

    render() {
        var pageClassName = this.state.settingUp ? 'intro' : 'home'
        return(
            <div id="page-inner" className={pageClassName}>
                <this.Header settingUp= {this.state.settingUp} />
                {/* <div>
                    <Switch>
                        <Route path="/c/:categorySlug" component={Category} />
                        <Route path="/" component={TowerOfBricks} />
                    </Switch>
                </div>
                <Footer /> */}
                <Background />
            </div>
        )
    }

    // Helper functions

    Header(props) {
        const showsSidebar = props.settingUp ? false : true
        if (showsSidebar) {
            return (
                <div className="headerContainer">
                    <HeaderCloud />
                    <Route path="/" component={GenericSidebar} />
                </div>
            )
        }
        return (
            <div className="headerContainer">
                <HeaderCloud />
            </div>
        )
    }

}

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('page')
);