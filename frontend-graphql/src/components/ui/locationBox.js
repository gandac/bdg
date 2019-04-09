import React from 'react';
import {Link} from 'react-router-dom';

const locationBox = (props)  => {
    // if(props.post.node){
      const location = props.post.node;
      const mediumImgSize = location.featuredImage ? location.featuredImage.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null;
    // }
    const subcategory = location.location_categories.edges[0] ?
                        location.location_categories.edges[0].node.children.edges[0] ?
                        location.location_categories.edges[0].node.children.edges[0].node.name : null : null;
    
    return (
     
        <div key={location.slug} className="locationBoxWrapper">
          <Link className="locationBox"  to={location.link}>
            { mediumImgSize ?  (<img src={mediumImgSize[0].sourceUrl}/>) : null }
            <h2 className="locationBoxTitle">{location.title}</h2>
            <span className="locationBoxCategory">{subcategory ? subcategory : null}</span>
          </Link>
       
        </div>
    )
}
export default locationBox;