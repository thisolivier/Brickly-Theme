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
        this.byline = ReactHtmlParser(post.byLine),
        this.content = ReactHtmlParser(post.content)
    }

    render() {
        var readMoreHandler = ()=>{this.setState({showCopy: !this.state.showCopy})}
        var readMoreText = this.state.showCopy ? "Close ↑": "Read More ↓"
        return (
            <div className="singlePostContainer">
                <div class="imageWrapperForGradientFallback">
                    <img className="image" src={this.post.image ? this.post.image : ""}></img>
                </div>
                <div className="singlePostContent">
                    <a className="readMoreButton footerElement" onClick={readMoreHandler}>{readMoreText}</a>
                    <section className="info">
                        <div className="widthController">
                            <h2 className="postTitle">{this.post.title}</h2>
                            <p className="byLine">{this.byline}</p>
                            <ul className="tags">
                                {this.post.tags.map((tag, index)=><li key={index}>{tag}</li>)}
                            </ul>
                            <CSSTransition in={this.state.showCopy} mountOnEnter unmountOnExit timeout={300} classNames="toggle">
                                <section className="postDescription">
                                    {this.content}
                                </section>
                            </CSSTransition>
                        </div>
                    </section>
                    <nav className="postLinks footerElement">
                        <a href={this.post.liveSite}>Live Site ↗</a>
                        <a href={this.post.repo}>Repository ↗</a>
                    </nav>
                </div>
                <div className="decorativeFooter"></div>
            </div>
        )
    }
}

export default Post