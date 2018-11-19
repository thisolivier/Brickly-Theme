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
        <div id="page-inner" className={this.getIndexClassName(this.state, this.props.location)}>
            <div className="headerContainer">
                <HeaderCloud />
                <Route exact path="/" component={GenericSidebar} />
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
    )}

    getIndexClassName(state, location) {
        let pageClassName = undefined
        //     setupBegun: false,
        //     setupEnded: false,
        //     layoutBegun: false,
        //     layoutEnded: false,
        let transitionState = (()=>{
            if (location.pathname === "/"){
                if (!state.setupBegun) {
                    return " settingUpNotBegun"
                } else if (state.setupBegun && !state.setupEnded) {
                    return " settingUp"
                } else if (!(state.setupBegun && state.setupEnded && (state.layoutBegun || state.layoutEnded))) {
                    return " setupEndedLayoutAbsent"
                }
            }
            if (!state.layoutBegun) {
                return " layoutNotBegun"
            } else if (state.layoutBegun && !state.layoutEnded) {
                return " layoutBegun"
            } else if (state.layoutBegun && state.layoutEnded) {
                return " layoutDone"
            } else {
                return " madness"
            }
            
        })()
        if (location.pathname === '/') {
            pageClassName = 'home'+transitionState
        } else if (location.pathname.startsWith('/c')) {
            pageClassName = 'category'+transitionState
        }
        return pageClassName
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