import React from 'react';
import {Link} from 'react-router-dom';
import Post from '../Post';

const PostBox = (props)  => {
    const post = props.post.node
    
    const mediumImgSize = post.featuredImage ? post.featuredImage.mediaDetails.sizes.filter( (element) => element.name == 'thumbnail') : null;
    return (
        <div key={post.slug}>
          <span className="gray">{props.index + 1}.</span>
          <Link to={post.link} className="ml1 black">
            { mediumImgSize ?  (<img src={mediumImgSize[0].sourceUrl}/>) : null }
            {post.title}
          </Link>
        </div>
    )
}
export default PostBox;