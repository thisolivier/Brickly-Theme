import React from 'react';
import Outlinks from './OutLinks';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Post extends React.Component {
    render() {
        var post = WORDPRESS.posts[this.props.postId]
        return (
            <div className="post">
                <h2>{post.title}</h2>
                <section className="info">
                    <p>{post.date}</p>
                    <p>{post.byLine}</p>
                    <ul className="tags">
                        {post.tags.map((tag, index)=><li key={index}>{tag}</li>)}
                    </ul>
                </section>
                <section>
                    {ReactHtmlParser(post.content)}
                </section>
                <section className="outLinks">
                    <li>{post.repo}</li>
                    <li>{post.liveSite}</li>
                    <Outlinks />
                </section>
                <img className="backgroundImage" src={post.image} />
            </div>
        )
    }
}

export default Post