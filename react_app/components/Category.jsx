import React from 'react';
import Post from './Post';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { stringify } from 'querystring';

class Category extends React.Component {

    render(){
        let categorySlug = this.props.match.params['categorySlug']
        var currentCategory = WORDPRESS.category[categorySlug]
        var categoriesPosts = Object.keys(WORDPRESS.posts).filter(postId => WORDPRESS.posts[postId.toString()].categories.includes(categorySlug))
        return (
            <div className="categoryContainer">
                <h1>{currentCategory.name}</h1>
                <p>{currentCategory.description}</p>
                <ol>
                    {categoriesPosts.map((postId)=>
                        <Post postId={postId} key={postId}/>
                    )}
                </ol>
            </div>
        )
    }
}

export default Category