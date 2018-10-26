import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Background from './components/Background';
import Footer from './components/Footer';
import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import Post from './components/Post'
import Page from './components/Page'
import OutLinks from './components/OutLinks'


class App extends Component {

    // componentDidMount() {
    //     this.setState({
    //         dataPayload: "Beans"
    //     })
    //     let dataURL = WORDPRESS.site.url.api + "/posts";
    //     fetch(dataURL)
    //     .then(res => res.json())
    //     .then(res => {
    //         this.setState({
    //             dataPayload: res
    //         })
    //     })
    // }

    render() {
        return(
            <div id="page-inner">
                <HeaderCloud />
                <OutLinks />
                <div>
                    <Switch>
                        <Route path="/page/:pageTitle" component={Page} />
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