import React from 'react';
import {Link} from 'react-router-dom';

const postItem = (props)  => {
    // if(props.post.node){
      const post = props.post.node;
      const mediumImgSize = post.featuredImage ? post.featuredImage.mediaDetails.sizes.filter( (element) => element.name == 'postbox') : null;
    // }
    // const subcategory = post.categories.edges[0] ?
    //                     post.categories.edges[0].node.children.edges[0] ?
    //                     post.categories.edges[0].node.children.edges[0].node.name : null : null;
    
    return (
     
        <div key={post.slug} className="postItemWrapper">
          {/* <Link className="postItem"  to={post.link}>
            { mediumImgSize ?  (<img src={mediumImgSize[0].sourceUrl}/>) : null }
            <h2 className="postBoxTitle">{post.title}</h2>
          </Link> */}
         { mediumImgSize ?  (<img src={mediumImgSize[0].sourceUrl}/>) : null }
         <h2 className="postItemTitle">{post.title}</h2>
         <div className="postItemDetails">date: {post.date} | in - {post.categories.edges[0].node.name}</div>
         <div className="postItemContent" dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
    )
}
export default postItem;