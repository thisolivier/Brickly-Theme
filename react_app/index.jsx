import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Background from './components/Background';
import Footer from './components/Footer';
import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import GenericSidebar from './components/GenericSidebar'
import Category from './components/Category'

require('./index.scss');


class App extends Component {

    render() {
        return(
            <div id="page-inner">
                <div className="headerContainer">
                    <HeaderCloud />
                    <Route path="/" component={GenericSidebar} />
                </div>
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

}

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('page')
);