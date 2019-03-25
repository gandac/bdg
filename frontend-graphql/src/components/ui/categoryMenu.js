import React from 'react';
import { Link } from 'react-router-dom';
//import { compose } from 'recompose';



const categoryMenu = (props) => {
    
    const categories = props.categories.map( category => {
        // $catElement = category.node;
        return (<Link key={category.node.name} to={'/location_category/' + props.parent.slug + '/' + category.node.slug} className="ml1 no-underline black categoryLink">
        {category.node.name}
      </Link>);
    });

    return (
    <div className="categoryItem">
        {props.children ? props.children : null}
        <div>{categories}</div>
    </div>
    );
}

export default categoryMenu;