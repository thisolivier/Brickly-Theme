import React, { Component } from 'react';
import { render } from 'react-dom'; // importing render from ReactDOM
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {
          dataPayload: ""
        }
      }

    componentDidMount() {
        this.setState({
            dataPayload: "Beans"
        })
        let dataURL = "http://olivier.test/wp-json/wp/v2/posts";
        fetch(dataURL)
        .then(res => res.json())
        .then(res => {
            this.setState({
                dataPayload: res
            })
        })
    }

    render() {

        let payload = this.state.dataPayload

        return(
            <div id="page-inner">
                <h1>Boo</h1>
                <div id="content">
                    <Console name="payload"/>
                </div>
            </div>
        )
    }

}

class Console extends Component {

    render() {
        return(
            <div className="console">I am a console called... {this.props.name}
            </div>
        )
    }

}


// React Router

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    el
);