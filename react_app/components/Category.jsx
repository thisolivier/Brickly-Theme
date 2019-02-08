import React from 'react';
import { Helmet} from 'react-helmet'
import Post from './Post';

class Category extends React.Component {

    constructor(props){
        super(props)
        let categorySlugString = props.match.params['categorySlug']
        let category = WORDPRESS.category[categorySlugString]
        let posts = Object.keys(WORDPRESS.posts).filter(postId => WORDPRESS.posts[postId.toString()].categories.includes(categorySlugString)).map((postId)=><Post postId={postId} key={postId}/>).reverse()
        this.state = {
            category: category,
            posts: posts,
            pageTitle: category.name + " at " + WORDPRESS.site.name,
            pageURL: window.location.host + "/" + window.location.pathname,
        }
        console.log(category, posts)
    }

    render(){
        return (
            <div className="categoryContainer">
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta property="og:description" content={this.state.category.description} />
                    <meta property="og:title" content="Olivier's Portfolio" />
                    <meta property="og:url" content={this.state.pageURL} />
                </Helmet>
                <div className="categoryHeaderContainer">
                    <h1>{this.state.category.name}</h1>
                    <p>{this.state.category.description}</p>
                    <div className="categoryCloud one"></div>
                    <div className="categoryCloud two"></div>
                    <div className="categoryCloud three"></div>
                    <div className="categoryCloud four"></div>
                    <div className="categoryCloud five"></div>
                    <div className="categoryCloud six"></div>
                </div>
                <div className="postsContainer">
                    {this.state.posts}
                </div>
            </div>
        )
    }
}

export default Category