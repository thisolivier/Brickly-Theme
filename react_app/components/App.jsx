import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderCloud from './HeaderCloud'
import TowerOfBricks from './TowerOfBricks'
import GenericSidebar from './GenericSidebar'
import Category from './Category'
import EmptyComponent from './EmptyComponent'

const FadeTransition = (props) => (
    <CSSTransition
        {...props}
        enter={true}
        exit={true}
        appear={true}
        unmountOnExit={true}
        onEnter = {()=>{console.log(props.classNames, "onEnter")}}
        onEntering = {()=>{console.log(props.classNames, "Sidebar onEnting")}}
        onEntered = {()=>{console.log(props.classNames, "Sidebar onEnted")}}
        onExit = {()=>{console.log(props.classNames, "Sidebar onExit")}}
        onExiting = {()=>{console.log(props.classNames, "Sidebar onExiting")}}
        onExited = {()=>{console.log(props.classNames, "Sidebar onExited")}}
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
    if (this.state.showHome){ 
        return(
            <div id="page-inner">
                <div className="headerContainer">
                    <HeaderCloud />
                    <TransitionGroup className="sidebar">
                        <FadeTransition timeout={{enter:500, exit:500}} classNames="sidebar" key={this.props.location.key + 1000}>
                            <Switch location={this.props.location}>
                                <Route path="/cat" component={EmptyComponent}/>
                                <Route path="/" exact component={GenericSidebar} />
                            </Switch>
                        </FadeTransition>
                    </TransitionGroup>
                </div>
                <TransitionGroup>
                    <FadeTransition timeout={{enter:400, exit:400}} key={this.props.location.key} classNames="router">
                        <Switch location={this.props.location}>
                            <Route exact path="/" component={TowerOfBricks} />
                            <Route path="/cat/:categorySlug" component={Category} />   
                        </Switch>
                    </FadeTransition>
                </TransitionGroup>
            </div>
        )
        } else {
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

export default withRouter(App)