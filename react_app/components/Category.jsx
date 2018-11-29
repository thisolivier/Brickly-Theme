import React from 'react';
import Post from './Post';

class Category extends React.Component {

    render(){
        let categorySlug = this.props.match.params['categorySlug']
        var currentCategory = WORDPRESS.category[categorySlug]
        var categoriesPosts = Object.keys(WORDPRESS.posts).filter(postId => WORDPRESS.posts[postId.toString()].categories.includes(categorySlug))
        return (
            <div className="categoryContainer">
                <div className="categoryHeaderContainer">
                    <h1>{currentCategory.name}</h1>
                    <p className="categoryDescription">{currentCategory.description}</p>
                </div>
                <div className="postsContainer">
                    {categoriesPosts.map((postId)=>
                        <Post postId={postId} key={postId}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Category