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
            constrainedWidth: undefined
        }
        this.handleSetupComplete = this.handleSetupComplete.bind(this)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize)
        setTimeout(this.handleSetupComplete, 1600)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    // Excuse this fugly signature, I wanted access to the route
    render() {return(<Route render={(props) => {
        let pageClassName = undefined
        let showsSidebar = false
        if (props.location.pathname === '/') {
            pageClassName = this.state.settingUp ? 'intro' : 'home'
            showsSidebar = !this.state.settingUp
        } else if (props.location.pathname.startsWith('/c')) {
            pageClassName = 'category'
        }
        return(
            <div id="page-inner" className={pageClassName}>
                <div className="headerContainer">
                    <HeaderCloud />
                    {showsSidebar ? (<Route exact path="/" component={GenericSidebar} />) : null}
                </div>
                <div>
                    <Switch>
                        <Route path="/c/:categorySlug" component={Category} />
                        <Route path="/" render={(routeParams) => (
                            <TowerOfBricks 
                            settingUp={this.state.settingUp}
                            constrainedWidth={this.state.constrainedWidth} 
                            content={WORDPRESS.category} 
                            />
                        )} />
                    </Switch>
                </div>
            </div>
        )
    }}/>)}

    handleSetupComplete() {
        this.setState({settingUp: false})
    }

    handleResize() {
        this.setState({constrainedWidth: (window.innerWidth < 600)})
    }

}

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('page')
);