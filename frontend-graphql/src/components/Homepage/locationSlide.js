import React from 'react';
import {Link} from 'react-router-dom';
import colorsJson from '../../static/color-configuration.json';

const locationSlide = (props)  => {
    // if(props.post.node){colorJson.
    
      const location = props.location.node;
      const mediumImgSize = location.featuredImage ? location.featuredImage.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null;
    // }
    const subcategory = location.location_categories.edges[0] ?
                        location.location_categories.edges[0].node.children.edges[0] ?
                        location.location_categories.edges[0].node.children.edges[0].node.name : null : null;
     const categoryColor = colorsJson[location.location_categories.edges[0].node.thecolor].layoutColors;

    return (
     
        <div key={location.slug} className="locationSlideWrapper">
          <Link className="locationSlide" to={location.link}>
           { mediumImgSize ?  (<img src={mediumImgSize[0].sourceUrl}/>) : null }
           <div className="locationSlideDesc" style={{backgroundColor: categoryColor.secondary,color:categoryColor.primary}}>
                <h2 className="locationSlideTitle">{location.title}</h2>
                <span className="locationSlideCategory">{subcategory ? subcategory : null}</span>
            </div>
          </Link>
       
        </div>
    )
}
export default locationSlide;