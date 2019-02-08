import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { animateScroll as scroll } from 'react-scroll'
import { Helmet } from 'react-helmet'

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
        mountOnEnter={true}
        unmountOnExit={true}
    />
)

class App extends React.Component {

    constructor(props) {
        super(props)
        const constrainedWidthPixels = 770
        this.previouslyVisited = ""
        this.state = {
            constrainedWidth: window.innerWidth < constrainedWidthPixels,
            showContent: false,
        }
        window.addEventListener('resize', () => { this.setState({constrainedWidth: window.innerWidth < constrainedWidthPixels}) })
    }

    componentDidMount(){
        this.lastPage = "empty"
        this.currentPage = this.getLocationClassName(this.props.location)
        setTimeout(()=>{this.setState({showContent:true})}, 800)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location && this.props.location.pathname.includes('cat')) {
            scroll.scrollToTop({smooth: true, duration: 500})
            console.log("Normally I'd scroll to the top, but we stopped doong that 🤷 (ツ)_/¯")
        }
    }
    

    render() { 
        const currentPage = this.getLocationClassName(this.props.location)
        if (this.currentPage != currentPage ) {
            this.lastPage = this.currentPage
            this.currentPage = currentPage
        }
        if (this.state.showContent){ 
            return(
                <div id="page-inner" className={this.lastPage + currentPage + " " + currentPage + (this.state.constrainedWidth ? " compactWidth" : "")}>
                    <Helmet>
                        <title>{WORDPRESS.site.name}</title>
                        <meta name="description" content="Talented software engineer with recent good references looking for short and medium term contracts. Proficient in building Swift, Python (Flask or Django), Javascript (Node, React), and Wordpress projects." />
                        <meta property="og:image" content={WORDPRESS.site.url.root + "images/siteshare.gif"} />
                    </Helmet>
                    <div className="headerContainer">
                        <HeaderCloud routingAtIndex={currentPage == "home"}/>
                        <TransitionGroup>
                            <FadeTransition timeout={{enter:1000, exit:400}} classNames="sidebar" key={this.props.location.key + 1000}>
                                <Switch location={this.props.location}>
                                    <Route path="/cat" component={EmptyComponent}/>
                                    <Route path="/" exact component={GenericSidebar} />
                                </Switch>
                            </FadeTransition>
                        </TransitionGroup>
                    </div>
                    <TransitionGroup className="transitionContainer">
                        <FadeTransition timeout={{enter:2500, exit:400}} key={this.props.location.key} classNames="router">
                            <Switch location={this.props.location}>
                                <Route path="/cat/:categorySlug" component={Category} />
                                <Route exact path="/" component={TowerOfBricks} />   
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
            return "home"
        } else if (location.pathname.startsWith('/cat')) {
            return "category"
        }
    }

}

export default App