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

    render() { 
        if (this.state.showHome){ return(
            <div id="page-inner" className={this.getLocationClassName(this.props.location) + (this.state.constrainedWidth ? "compactWidth" : "")}>
                <div className="headerContainer">
                    <HeaderCloud />
                    <TransitionGroup>
                        <CSSTransition timeout={200} classNames="sidebar" key={this.props.location.key}>
                            <Switch location={this.props.location}>
                                <Route exact path="/" component={GenericSidebar} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <TransitionGroup>
                    <CSSTransition timeout={400} key={this.props.location.key} classNames="router">
                        <Switch location={this.props.location}>
                            <Route exact path="/" component={TowerOfBricks} />
                            <Route path="/cat/:categorySlug" component={Category} />   
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )} else {
            return <div id="page-inner" className="splashy"></div>
        }
    }
        
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