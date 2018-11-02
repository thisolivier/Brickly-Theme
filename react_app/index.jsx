import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
        this.handleSetupComplete = this.handleSetupComplete.bind(this)
    }
    
    handleSetupComplete() {
        this.setState({settingUp: false})
    }

    render() {
        const pageClassName = this.state.settingUp ? 'intro' : 'home'
        const showsSidebar = this.state.settingUp ? false : true
        return(
            <div id="page-inner" className={pageClassName}>
                <button onClick={this.handleSetupComplete}>End setup</button>
                <div className="headerContainer">
                    <HeaderCloud />
                    {showsSidebar ? (<Route path="/" component={GenericSidebar} />) : null}
                </div>
                <div>
                    <Switch>
                        <Route path="/c/:categorySlug" component={Category} />
                        <Route path="/" render={(routeParams) => (
                            <TowerOfBricks settingUp={this.state.settingUp} content={WORDPRESS.category}/>
                        )} />
                    </Switch>
                </div>
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