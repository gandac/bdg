import React from 'react';
import { NavLink } from 'react-router-dom';
//import { compose } from 'recompose';

//  accepts parent = parent category object
// category = current category objcet

const categoryMenu = (props) => {
    
    const categories = props.categories.map( category => {
        // $catElement = category.node;
        return (<NavLink exact key={category.node.name} to={'/location_category/' + props.parent.slug + '/' + category.node.slug} className="no-underline categoryLink">
        {category.node.name}
      </NavLink>);
    });

    return (
    <div className="categoryMenuWrapper">
        {props.children ? props.children : null}
        <div className="mainCategoryAction">
           { props.categories.length ?  <NavLink exact to={'/location_category/' + props.parent.slug } className="categoryLink" >Show all</NavLink>  :null }
        </div>
        <div>{categories}</div>
    </div>
    );
}

export default categoryMenu;