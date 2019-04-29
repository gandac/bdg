import React from 'react';
import {Link} from 'react-router-dom';

const breadcrumbs = (props) => {
    console.log('breadcrumbs' , props.location);
    const mainCategory = props.location.location_categories ? props.location.location_categories.edges[0].node : null;
    // const mainCategoryLink = mainCategory ? props.location.location_categories.edges[0].node.link;

     const subCategory = mainCategory ? 
                        props.location.location_categories.edges[0] ? 
                        props.location.location_categories.edges[0].node.children.edges[0] ?
                         props.location.location_categories.edges[0].node.children.edges[0].node 
                         :null
                         :null
                         :null;
    // const subCategoryLink = subCategory ? props.location.location_categories.edges[0].node.children.edges[0].node.link : null;
    return (
        <div className="breadcrumbsWrapper">
            {mainCategory ? (<span><Link className="breadcrumbsItem" to={mainCategory.link}>{mainCategory.name}</Link><span className="breadcrumbsSeparator"> / </span></span>) : null } 
            {subCategory ?  (<span><Link className="breadcrumbsItem" to={subCategory.link}>{subCategory.name}</Link>  <span className="breadcrumbsSeparator"> / </span></span>) : null }
            {props.location.title}
        </div>
    )
    // return (<div></div>);
}
export default breadcrumbs;