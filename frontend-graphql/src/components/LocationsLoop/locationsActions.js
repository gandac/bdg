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
    let pageInfo = result.data.location.pageInfo;
    posts = posts.map(post => {
        const finalLink = `/location/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;

        return modifiedPost;
    });
    return {
        type: type,
        pageType: pageType,
        pageInfo: pageInfo,
        posts: posts
    }
}


export const allPostsQuery = (client , searchQuery = '' ,  singleLocation = false , pagination = {}) =>{

    let theSearchQuery = searchQuery;
    let currentQuery = ALL_LOCATIONS_QUERY;
     let pageType = theSearchQuery.length > 0 ? ['searchPage'] : ['homepage'];
     let slug = '';

     if(singleLocation){
         theSearchQuery = '';
         slug = searchQuery;
         pageType = ['singleLocation']
     }
     let {first, last, before , after } = pagination;
    
      return async dispatch => {
          try{
          const result = await client.query({
              query: currentQuery,
              first: 10,
              variables: { 
                            searchQuery: theSearchQuery , 
                            slug: slug ,
                            first:first,
                            last:last,
                            before:before,
                            after:after,
                        },
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
              variables: { year: now.getFullYear() , month: now.getMonth() - 1 , day: now.getDate()},
          });
            dispatch(modifyStateAllPosts(result , actionTypes.GET_NEW_LOCATIONS));
            return;
          }catch(err){
             console.log(err);
          }
      }
  }
  
  