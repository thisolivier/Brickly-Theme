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
        this.readMoreHandler = this.readMoreHandler.bind(this)
        this.postTitle = post.title
        this.postTags = post.tags.map((tag, index)=><li key={index}>{tag}</li>)
        this.postByline = ReactHtmlParser(post.byLine)
        this.postContent = ReactHtmlParser(post.content)
        var arrayOfLinks = [[post.liveSite, "Live Site ↗", "liveSite"],[post.repo, "Repository ↗", "repository"]]
        console.log("the links are", arrayOfLinks)
        this.postLinks = arrayOfLinks.filter((linkTuple)=> (linkTuple[0])).map((linkTuple, indexOfLink)=>{
            return(<a href={linkTuple[0]} key={indexOfLink} className={linkTuple[2]}><span className="linkText">{linkTuple[1]}</span></a>)
        })
        this.backgroundImageStyle = post.image ? {backgroundImage: "url(" + post.image + ")"} : {}
    }

    readMoreHandler(event) {
        if (this.state.showCopy) {
            let newTop = document.getElementById("post" + this.props.postId).getBoundingClientRect().height + 150
            var cleverGirl = () => {
                window.scrollBy({
                    top: newTop * -1,
                    left: 0,
                    behavior: "smooth"
                })
            };           
            window.requestAnimationFrame(cleverGirl);
            console.log(this.props.postId, document.getElementById("post" + this.props.postId).getBoundingClientRect())
        }
        this.setState({showCopy: !this.state.showCopy})
    }

    render() {
        var readMoreText = this.state.showCopy ? "Close ↑": "Read More ↓"
        return (
            <div className="singlePostContainer">
                <div className="imageAndGradientFallback" style={this.backgroundImageStyle}></div>
                <div className="singlePostContent">
                    <section className="info">
                        <div className="widthController">
                            <h2 className="postTitle">{this.postTitle}</h2>
                            <p className="byLine">{this.postByline}</p>
                            <ul className="tags">
                                {this.postTags}
                            </ul>
                            <CSSTransition in={this.state.showCopy} mountOnEnter unmountOnExit timeout={700} classNames="toggle">
                                <section className="postDescription" id={"post" + this.props.postId}>
                                    {this.postContent}
                                </section>
                            </CSSTransition>
                        </div>
                        <a className="readMoreButton footerElement" onClick={this.readMoreHandler}>{readMoreText}</a>
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