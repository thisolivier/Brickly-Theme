import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { stringify } from 'querystring';

class Category extends React.Component {


    render(){
        var currentCategory = WORDPRESS.category.find((thing)=>(
            thing['slug'] == this.props.match.params['categorySlug'])
        )
        return (
            <div>
                <h1>{currentCategory.name}</h1>
                <p>{currentCategory.description}</p>
            </div>
        )
    }
}

export default Category