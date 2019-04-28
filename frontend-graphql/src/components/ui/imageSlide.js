import React from 'react'

const imageSlide = (props) => {
    const postBoxSizeObject = props.image.mediaDetails.sizes ? props.image.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null; 
    const postBoxSizeUrl = postBoxSizeObject[0].sourceUrl;
    return (<div className="imageSlide">
                <img src={postBoxSizeUrl} />
            </div>);
}

export default imageSlide;