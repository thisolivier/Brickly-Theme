import React from 'react';

class Post extends React.Component {
    render() {
        var post = WORDPRESS.posts[this.props.postId]
        return (
            <div>
                <img src={post.image} />
                <h1>{post.title}</h1>
                <p>{post.date}</p>
                <p>{post.byLine}</p>
                <ul>
                    {post.tags.map(tag=><li>{tag}</li>)}
                </ul>
                <p>{post.content}</p>
                <ul>
                    <li>{post.repo}</li>
                    <li>{post.liveSite}</li>
                </ul>
            </div>
        )
    }
}

export default Post