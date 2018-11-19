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
        this.setState({setupBegun: true})
        let changeId = this.newChangeInitiated()
        // Less efficient to run the in parallel, but keeps it readable
        setTimeout(() => {
                if (this.latestChangeId == changeId) {
                    this.setState({setupEnded: true, layoutBegun: true})
                } else {
                    this.setState({setupEnded: true})
                }
        }, 1400)
        setTimeout(() => {
            if (this.latestChangeId == changeId) {
                this.setState({layoutEnded: true})
            }
        }, 1400 + 1400)
    }

    render() {return(
        <div id="page-inner" className={this.getIndexClassName()}>
            <div className="headerContainer">
                <HeaderCloud />
                <Route exact path="/" component={GenericSidebar} />
            </div>
            <TransitionGroup>
                <TransitionComponent key={this.props.location.pathname}>
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
                </TransitionComponent>
            </TransitionGroup>
        </div>
    )}

    // This function gives a top level transition state to whether the layout of the page
    // is transitioning (usually due to route changes). It returns a classnames that give
    // CSS the capacity to make transitions very rich and adaptive. It provides:
    // 1) is the window a constrained width 
    // 2) which page layout are we in, or moving to (Advice: couple css dissapearences to particular page layouts i.e. if we have "#page-inner .category, #page-inner .layoutBegun" as the parent to ".towerOfBricks", we know we should apply styles to move it away, with optional overrides appropriate to what's there now. This provides rending for adaptive routing, and specific static routes to be optimised for)
    // 3) how far along the transition to a page are we
    // It is should be passed the app 
    // component's state, and the routing information (usually this.props.location)

    // You can trigger transitions to new pages by using newChangeInitiated() and the same 
    // method used in componentDidMount()

    getIndexClassName(state, isRoot) {
        let transitionState = (()=>{
            if (isRoot){
                if (!state.setupBegun) {
                    return " settingUpNotBegun"
                } else if (state.setupBegun && !state.setupEnded) {
                    return " settingUp"
                } else if (!(state.setupBegun && state.setupEnded && (state.layoutBegun || state.layoutEnded))) {
                    return " setupEndedLayoutAbsent"
                }
                return "error"
            }
            return ""
        })()
        
        if (location.pathname === '/') {
            return 'home ' + transitionState
        } else if (location.pathname.startsWith('/c')) {
            return 'category ' + transitionState
        }
    }

    isSiteCompact() {
        return this.state.constrainedWidth ? "compactWidth" : ""
    }

    newChangeInitiated() {
        // using new change flags, we can safely track the appearence 
        // and dissapearence of components over time, even if they 
        // are interupted or overlap
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