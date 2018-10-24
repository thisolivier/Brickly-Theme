import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Background from './coBackground';
import Footer from './coFooter';
import HeaderCloud from './coHeaderCloud';
import TowerOfBricks from './coTowerOfBricks';
import Post from './coPost'
import Page from './coPage'


class App extends Component {

    // componentDidMount() {
    //     this.setState({
    //         dataPayload: "Beans"
    //     })
    //     let dataURL = WORDPRESS.url.api + "/posts";
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