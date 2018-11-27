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
        setTimeout(()=>{this.setState({showHome:true})}, 800)
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
                <TransitionComponent timeout={1000} in={this.state.showHome}>
                    <Switch>
                        <Route path="/cat/:categorySlug" component={Category} /> 
                        <Route exact path="/" render={(routeParams) => ( <TowerOfBricks content={WORDPRESS.category} /> )} />  
                    </Switch>
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