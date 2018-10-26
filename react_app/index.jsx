import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Background from './components/Background';
import Footer from './components/Footer';
import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import GenericSidebar from './components/GenericSidebar'
import Post from './components/Post'
import Category from './components/Category'

require('./style.scss');


class App extends Component {

    render() {
        return(
            <div id="page-inner">
                <HeaderCloud />
                <Route path="/" componet={GenericSidebar} />
                <div>
                    <Switch>
                        <Route path="/c/:pageTitle" component={Category} />
                        <Route path="/post/:id" component={Post} />
                        <Route path="/" component={TowerOfBricks} />
                    </Switch>
                </div>
                <Footer />
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