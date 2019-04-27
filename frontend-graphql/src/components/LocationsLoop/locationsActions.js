import * as actionTypes from '../../store/actionTypes';
import {ALL_LOCATIONS_QUERY,NEW_LOCATIONS_QUERY} from './queries';

export const locationsStart = () => {
    return {
        type: actionTypes.LOCATIONS_START
    }
}

export const startSubcategoryQuery = () => {
    return {
        type: actionTypes.SUBCATEGORY_START
    }
}

const modifyStateAllPosts = (result , type,pageType) => {
    let posts = result.data.location.edges;
    posts = posts.map(post => {
        const finalLink = `/location/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;

        return modifiedPost;
    });
    return {
        type: type,
        pageType: pageType,
        posts: posts
    }
}


export const allPostsQuery = (client , searchQuery = '' ,  singleLocation = false ) =>{

    let theSearchQuery = searchQuery;
    let currentQuery = ALL_LOCATIONS_QUERY;
     let pageType = theSearchQuery.length > 0 ? ['searchPage'] : ['homepage'];
     let slug = '';
     console.log('aici');
     if(singleLocation){
         console.log('here');
         theSearchQuery = '';
         slug = searchQuery;
         pageType = ['singleLocation']
     }
    
      return async dispatch => {
          try{
          const result = await client.query({
              query: currentQuery,
              variables: { searchQuery: theSearchQuery , slug: slug},
          });
            dispatch(modifyStateAllPosts(result,actionTypes.GET_ALL_LOCATIONS,pageType));
            return;
          }catch(err){
             console.log(err);
          }
      }
  }
  
  export const newLocationsQuery = (client ) =>{
    const now = new Date();
    let currentQuery = NEW_LOCATIONS_QUERY;
     
      return async dispatch => {
          try{
          const result = await client.query({
              query: currentQuery,
              variables: { year: now.getFullYear() , month: now.getMonth() + 1 , day: now.getDate()},
          });
            dispatch(modifyStateAllPosts(result , actionTypes.GET_NEW_LOCATIONS));
            return;
          }catch(err){
             console.log(err);
          }
      }
  }
  
  