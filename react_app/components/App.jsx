import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderCloud from './HeaderCloud';
import TowerOfBricks from './TowerOfBricks';
import GenericSidebar from './GenericSidebar'
import Category from './Category'

const TransitionComponent = (props) => (
    <CSSTransition 
      {...props}
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
    />
)

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            constrainedWidth: window.innerWidth < 680,
        }
        window.addEventListener('resize', () => { this.setState({constrainedWidth: window.innerWidth < 680}) })
    }

    render() { return(
        <div id="page-inner" className={this.getLocationClassName(this.props.location) + (this.state.constrainedWidth ? "compactWidth" : "")}>
            <div className="headerContainer">
                <HeaderCloud />
                <Route exact path="/" component={GenericSidebar} />
            </div>
            <TransitionGroup>
                <TransitionComponent key={this.props.location.pathname}>
                    <div>
                        <Switch>
                            <Route exact path="/" render={(routeParams) => ( <TowerOfBricks content={WORDPRESS.category} /> )} />
                            <Route path="/cat/:categorySlug" component={Category} />   
                        </Switch>
                    </div>
                </TransitionComponent>
            </TransitionGroup>
        </div>
    )}
        
    getLocationClassName(location) {    
        if (location.pathname === '/') {
            return "home "
        } else if (location.pathname.startsWith('/cat')) {
            return "category "
        } else {
            return ""
        }
    }

}

export default App