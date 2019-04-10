import * as actionTypes from '../../store/actionTypes';
import {ALL_LOCATIONS_QUERY} from './queries';


export const startSubcategoryQuery = () => {
    return {
        type: actionTypes.SUBCATEGORY_START
    }
}

const modifyStateAllPosts = (result) => {
    let posts = result.data.location.edges;
    posts = posts.map(post => {
        const finalLink = `/location/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;

        return modifiedPost;
    });
    return {
        type: actionTypes.GET_ALL_POSTS,
        posts: posts
    }
}

export const allPostsQuery = (client , searchQuery = '' , allCategories = false ) =>{

    let theSearchQuery = searchQuery;
    let currentQuery = ALL_LOCATIONS_QUERY;
     
      return async dispatch => {
          try{
          const result = await client.query({
              query: currentQuery,
              variables: { searchQuery: theSearchQuery},
          });
            dispatch(modifyStateAllPosts(result));
            return;
          }catch(err){
             console.log(err);
          }
      }
  }
  
  
  