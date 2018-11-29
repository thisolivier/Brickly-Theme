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
    }

    componentDidMount(){
        this.lastPage = "empty"
        this.currentPage = this.getLocationClassName(this.props.location)
        setTimeout(()=>{this.setState({showHome:true})}, 800)
    }

    render() { 
        const currentPage = this.getLocationClassName(this.props.location)
        if (this.currentPage != currentPage ) {
            console.log("mismatch between old : new, ", this.currentPage, " : ", currentPage)
            this.lastPage = this.currentPage
            this.currentPage = currentPage
        }
        if (this.state.showHome){ 
            return(
                <div id="page-inner" className={this.lastPage + currentPage + " " + currentPage + (this.state.constrainedWidth ? " compactWidth" : "")}>
                    <div className="headerContainer">
                        <HeaderCloud />
                        <TransitionGroup>
                            <FadeTransition timeout={{enter:20000, exit:500}} classNames="sidebar" key={this.props.location.key + 1000}>
                                <Switch location={this.props.location}>
                                    <Route path="/cat" component={EmptyComponent}/>
                                    <Route path="/" exact component={GenericSidebar} />
                                </Switch>
                            </FadeTransition>
                        </TransitionGroup>
                    </div>
                    <TransitionGroup>
                        <FadeTransition timeout={{enter:2500, exit:400}} key={this.props.location.key} classNames="router">
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
        var className = ""
        if (location.pathname === '/') {
            className += "home"
        } else if (location.pathname.startsWith('/cat')) {
            className += "category"
        }
        return className
    }

}

export default withRouter(App)