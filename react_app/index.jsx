import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderCloud from './components/HeaderCloud';
import TowerOfBricks from './components/TowerOfBricks';
import GenericSidebar from './components/GenericSidebar'
import Category from './components/Category'

require('./index.scss');

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contentShouldAppear: false,
            setupBegun: false,
            setupEnded: false,
            constrainedWidth: undefined
        }
        this.handleSetupComplete = this.handleSetupComplete.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.getIndexClassName = this.getIndexClassName.bind(this)
    }

    componentDidMount() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize)
        this.setState({contentShouldAppear: true})
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleSetupComplete() {
        this.setState({settingEnded: false})
    }

    handleResize() {
        this.setState({constrainedWidth: (window.innerWidth < 680)})
    }

    render() {return(
        <Route path="/" render={(props) => (
                    <CSSTransition 
                    timeout={{enter: 1000, exit: 150}}
                    classNames="siteAppearence"
                    in={this.state.contentShouldAppear}
                    >
                    <div id="page-inner" className={this.getIndexClassName(props)}>
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
                </CSSTransition>
        )} />
    )}

    getIndexClassName(props) {
        let pageClassName = undefined
        if (props.location.pathname === '/') {
            pageClassName = 'home'
        } else if (props.location.pathname.startsWith('/c')) {
            pageClassName = 'category'
        }
        if (this.state.constrainedWidth) {
            pageClassName = pageClassName + ' compactWidth'
        }
        return pageClassName
    }

}

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('page')
);