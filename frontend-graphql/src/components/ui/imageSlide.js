import React from 'react'

const imageSlide = (props) => {
    const postBoxSizeObject = props.image.mediaDetails ? props.image.mediaDetails.sizes ? props.image.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null : null; 
    const postBoxSizeUrl = postBoxSizeObject ? postBoxSizeObject[0].sourceUrl : null;
    if ( postBoxSizeUrl){
        return (  <div className="imageSlide">
        <img src={postBoxSizeUrl} />
    </div>) 
    }
    return null 
}


export default imageSlide;