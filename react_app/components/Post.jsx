import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {CSSTransition} from 'react-transition-group'

class Post extends React.Component {

    constructor(props){
        super(props)
        let post = WORDPRESS.posts[this.props.postId]
        this.state = {
            showCopy: false,
        }
        this.post = post
        this.byline = ReactHtmlParser(post.byLine)
        this.content = ReactHtmlParser(post.content)
        var arrayOfLinks = [[this.post.liveSite, "Live Site ↗", "images/icon_github_002.svg"],
        [this.post.repo, "Repository ↗", "./images/icon_github_002.svg"]]
        console.log("the links are", arrayOfLinks)
        this.links = arrayOfLinks.filter((linkTuple)=> (linkTuple[0])).map((linkTuple, indexOfLink)=>{
            return(<a href={linkTuple[0]} key={indexOfLink}><span className="linkText">{linkTuple[1]}</span><img className="linkIcon" src={linkTuple[2]}/></a>)
        })
    }

    render() {
        var readMoreHandler = ()=>{this.setState({showCopy: !this.state.showCopy})}
        var readMoreText = this.state.showCopy ? "Close ↑": "Read More ↓"
        return (
            <div className="singlePostContainer">
                <div className="imageWrapperForGradientFallback">
                    <img className="image" src={this.post.image ? this.post.image : ""}></img>
                </div>
                <div className="singlePostContent">
                    <section className="info">
                        <div className="widthController">
                            <h2 className="postTitle">{this.post.title}</h2>
                            <p className="byLine">{this.byline}</p>
                            <ul className="tags">
                                {this.post.tags.map((tag, index)=><li key={index}>{tag}</li>)}
                            </ul>
                            <CSSTransition in={this.state.showCopy} mountOnEnter unmountOnExit timeout={700} classNames="toggle">
                                <section className="postDescription">
                                    {this.content}
                                </section>
                            </CSSTransition>
                        </div>
                        <a className="readMoreButton footerElement" onClick={readMoreHandler}>{readMoreText}</a>
                    </section>
                    <nav className="postLinks footerElement">
                        { this.links.map((value)=> value) }
                    </nav>
                </div>
                <div className="decorativeFooter"></div>
            </div>
        )
    }
}

export default Post