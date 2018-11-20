import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import GenericSidebar from './components/GenericSidebar'
import Category from './components/Category'

require('./index.scss');

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
        this.latestChangeId = 0
        this.newChangeInitiated = this.newChangeInitiated.bind(this)
        this.getSiteWidthClassName = this.getSiteWidthClassName.bind(this)
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
        this.startWelcomeAnimationTimeline(this.props.location === "/")
    }

    render() {return(
        <div id="page-inner" className={this.getSiteWidthClassName() + " " + getLocationClassName(this.props.location)}>
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
                                settingUp={this.state.settingUp}
                                constrainedWidth={this.state.constrainedWidth} 
                                content={WORDPRESS.category} 
                                />
                            )} />
                        </Switch>
                    </div>
                </TransitionComponent>
            </TransitionGroup>
        </div>
    )}

    // TODO: Prevent interaction during the root specific animation timeperiod
    startWelcomeAnimationTimeline(routeIsRoot) {
        let setupDelay = 1400
        if (routeIsRoot) {
            this.setState({setupBegun: true})
            setTimeout(() => {
                this.setState({setupEnded: true, layoutBegun: true})
            }, setupDelay)
        } else {
            // The site has been loaded not at the root, so don't do the initial animation
            setupDelay = 0
            this.setState({setupBegun: true, setupEnded: true, layoutBegun: true})
        }

        setTimeout(() => {
            if (this.latestChangeId == changeId) {
                this.setState({layoutEnded: true})
            }
        }, 1400 + setupDelay)
    }

    getHomeLayoutClassName(state) {
        if (!state.setupBegun) {
            return " homeSettingUpNotBegun"
        } else if (state.setupBegun && !state.setupEnded) {
            return " homeSettingUp"
        } else if (!(state.setupBegun && state.setupEnded && (state.layoutBegun || state.layoutEnded))) {
            return " homeSetupEndedLayoutAbsent"
        } else {
            return ""
        }
    }
        
    getLocationClassName(location) {    
        if (location.pathname === '/') {
            return 'home ' + transitionState
        } else if (location.pathname.startsWith('/c')) {
            return 'category ' + transitionState
        } else {
            return ""
        }
    }

    getSiteWidthClassName() {
        return this.state.constrainedWidth ? "compactWidth" : ""
    }

    newChangeInitiated() {
        let changeId = this.latestChangeId + 1
        this.latestChangeId = changeId
        return changeId
    }

}

render(
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>,
    document.getElementById('page')
);