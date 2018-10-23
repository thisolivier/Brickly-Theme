import React, { Component } from 'react';
import { render } from 'react-dom'; // importing render from ReactDOM
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
    render() {
        return(
            <div id="page-inner">
                <h1>Boo</h1>
                <div id="content">
                    <Console name="Jim"/>
                </div>
            </div>
        )
    }
}

class Console extends Component {
    render() {
        return(
            <div className="console">I am a console called {this.props.name}</div>
        )
    }
}


// React Router

const routes = (

   <BrowserRouter>

       <Route path="/" component={App} />

   </BrowserRouter>

);

render( // Replaces DOM #page element with the root React component

   (routes), document.getElementById('page') // rendering the route

);
