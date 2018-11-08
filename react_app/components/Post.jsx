import React from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

class Post extends React.Component {
    render() {
        var post = WORDPRESS.posts[this.props.postId]
        return (
            <div className="singlePostContainer" style={{backgroundImage: "url(" + post.image + ")"}}>
                <div className="singlePostContent">
                    <h2>{post.title}</h2>
                    <section className="info">
                        <p className="byLine">{ReactHtmlParser(post.byLine)}</p>
                        <nav className="postLinks">
                            <a href={post.liveSite}>Live Site</a>
                            <a href={post.repo}>Repository</a>
                        </nav>
                        <ul className="tags">
                            {post.tags.map((tag, index)=><li key={index}>{tag}</li>)}
                        </ul>
                    </section>
                    <section className="postDescription">
                        {/* TODO: Use MD formatting in wordpress and an MD parser with scripting disabled in react */}
                        {ReactHtmlParser(post.content)}
                    </section>
                </div>
            </div>
        )
    }
}

export default Post