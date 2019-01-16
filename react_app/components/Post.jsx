import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {CSSTransition} from 'react-transition-group'
import { Link as ScrollLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class Post extends React.Component {

    constructor(props){
        super(props)
        let post = WORDPRESS.posts[this.props.postId]
        this.state = {
            showCopy: false,
        }
        this.readMoreToggleHandler = this.readMoreToggleHandler.bind(this)
        this.postTitle = post.title
        this.postTags = post.tags.map((tag, index)=><li key={index}>{tag}</li>)
        this.postByline = ReactHtmlParser(post.byLine)
        this.postContent = ReactHtmlParser(post.content)
        this.slug = "post" + this.props.postId + "Title"
        var arrayOfLinks = [[post.liveSite, "Live Site ↗", "liveSite"],[post.repo, "Repository ↗", "repository"]]
        console.log("the links are", arrayOfLinks)
        this.postLinks = arrayOfLinks.filter((linkTuple)=> (linkTuple[0])).map((linkTuple, indexOfLink)=>{
            return(<a href={linkTuple[0]} key={indexOfLink} className={linkTuple[2]}><span className="linkText">{linkTuple[1]}</span></a>)
        })
        this.backgroundImageStyle = post.image ? {backgroundImage: "url(" + post.image + ")"} : {}
    }

    readMoreToggleHandler() {
        if (this.state.showCopy) {
            this.setState({showCopy: false})
            let element = window.document.getElementById(this.slug)
            let newTop = document.documentElement.scrollTop + element.getBoundingClientRect().top
            console.log(newTop, "is our top")
            scroll.scrollTo(newTop, {
                smooth: true,
                duration: 500,
                offset: -150,
                isDynamic: true,
            })
        } else {
            this.setState({showCopy: true})
        }   
    }

    render() {
        var readMoreText = this.state.showCopy ? "Close ↑": "Read More ↓"

        return (
            <div className="singlePostContainer">
                <div className="imageAndGradientFallback" style={this.backgroundImageStyle}></div>
                <div className="singlePostContent">
                    <section className="info">
                        <div className="widthController">
                            <h2 className="postTitle" id={this.slug}>{this.postTitle}</h2>
                            <p className="byLine">{this.postByline}</p>
                            <ul className="tags">
                                {this.postTags}
                            </ul>
                            <CSSTransition in={this.state.showCopy} mountOnEnter unmountOnExit timeout={700} classNames="toggle">
                                <section className="postDescription">
                                    {this.postContent}
                                </section>
                            </CSSTransition>
                        </div>
                        <a className="readMoreButton footerElement" onClick={this.readMoreToggleHandler}>{readMoreText}</a>
                    </section>
                    <nav className="postLinks footerElement">
                        { this.postLinks.map((value)=> value) }
                    </nav>
                </div>
                <div className="decorativeFooter"></div>
            </div>
        )
    }
}

export default Post