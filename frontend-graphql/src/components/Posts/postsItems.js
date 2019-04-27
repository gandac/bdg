import React from 'react';
import PostItem from './postItem';
import Preloader from '../ui/svg/preloader';

//...props
const postsItems = (props)  => {
    let posts = (<Preloader color={props.colorStyles}/>);
    if(props.posts){
        posts = props.posts.map((post, index) => (
            <PostItem post={post} index={index} key={index} ></PostItem>
          ));  
    }
       return (<div className={"PostsGrid"}>
           {posts}
       </div>
    )
}
export default postsItems;