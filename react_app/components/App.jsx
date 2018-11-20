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
      classNames="componentDoes"
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
    />
)

class App extends React.Component {

    constructor(props) {
        super(props)
        this.startWelcomeAnimationTimeline = this.startWelcomeAnimationTimeline.bind(this)
        this.state = {
            setupBegun: false,
            setupEnded: false,
            layoutBegun: false,
            layoutEnded: false,
            constrainedWidth: window.innerWidth < 680,
        }
        window.addEventListener('resize', () => { this.setState({constrainedWidth: window.innerWidth < 680}) })
    }

    componentDidMount() {
        this.startWelcomeAnimationTimeline(this.props.location.pathname === "/")
    }

    render() {
        let pageInnerClassName = this.getLocationClassName(this.props.location) + (this.state.constrainedWidth ? "compactWidth" : "")
        return(
            <div id="page-inner" className={pageInnerClassName}>
                <div className="headerContainer">
                    <HeaderCloud layoutClassName={this.getHomeLayoutClassName(this.state)}/>
                    <Route exact path="/" component={GenericSidebar} />
                </div>
                <TransitionGroup>
                    <TransitionComponent key={this.props.location.pathname}>
                        <div>
                            <Switch>
                                <Route path="/cat/:categorySlug" component={Category} />
                                <Route path="/" render={(routeParams) => (
                                    <TowerOfBricks 
                                    layoutClassName={this.getHomeLayoutClassName(this.state)}
                                    content={WORDPRESS.category} 
                                    />
                                )} />
                            </Switch>
                        </div>
                    </TransitionComponent>
                </TransitionGroup>
            </div>
        )
    }

    // TODO: Prevent interaction during the root specific animation timeperiod
    startWelcomeAnimationTimeline(routeIsRoot) {
        let setupDelay = 1400
        const isRoot = routeIsRoot
        if (isRoot) {
            this.setState({setupBegun: true})
            setTimeout(() => {
                this.setState({setupEnded: true, layoutBegun: true})
            }, setupDelay)
        } else { // The site has been loaded not at the root, so don't do the initial animation
            setupDelay = 0
            this.setState({setupBegun: true, setupEnded: true, layoutBegun: true})
        }
        setTimeout(() => {this.setState({layoutEnded: true})}, 1400 + setupDelay)
    }

    getHomeLayoutClassName(state) { 
        if (!state.setupBegun) {
            return "homeSettingUpNotBegun"
        } else if (!state.setupEnded) {
            return "homeSettingUp"
        } else if (!state.layoutBegun) {
            return "homeSetupComplete homeLayoutNotBegun"
        } else if (!state.layoutEnded) {
            return "homeSetupComplete homeLayoutBegun"
        } else {
            return "homeSetupComplete homeLayoutComplete"
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