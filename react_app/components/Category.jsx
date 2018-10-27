import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { stringify } from 'querystring';

class Category extends React.Component {


    render(){
        var currentCategory = WORDPRESS.category.find((thing)=>(
            thing['slug'] == this.props.match.params['categorySlug'])
        )
        var message = ""
        // for (property in currentCategory) {
        //         message += String(property)
        // }
        return (
            <div>
                <h1>{message}</h1>
                <p>{stringify(currentCategory)}</p>
            </div>
        )
    }
}

export default Category