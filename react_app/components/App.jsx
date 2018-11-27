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
        classNames={"launch"}
        mountOnEnter={true}
        unmountOnExit={true}
    />
)

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            constrainedWidth: window.innerWidth < 680,
            showHome: false,
        }
        window.addEventListener('resize', () => { this.setState({constrainedWidth: window.innerWidth < 680}) })
        setTimeout(()=>{this.setState({showHome:true})}, 00)
    }

    render() { return(
        <div id="page-inner" className={this.getLocationClassName(this.props.location) + (this.state.constrainedWidth ? "compactWidth" : "")}>
            <TransitionComponent timeout={200} in={this.state.showHome}>
                <div className="headerContainer">
                    <HeaderCloud />
                    <Route exact path="/" component={GenericSidebar} />
                </div>
            </TransitionComponent>
            <TransitionGroup>
                <TransitionComponent key={this.props.location.pathname} timeout={1000} in={this.state.showHome}>
                    <Route path="/cat/:categorySlug" component={Category} />   
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