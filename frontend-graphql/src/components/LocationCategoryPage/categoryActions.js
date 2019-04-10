import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';
import {CATEGORY_QUERY} from './queries';
export const startCategoryQuery = () => {
    return {
        type: actionTypes.FETCH_CATEGORY_START
    }
}
export const modifyStateCategoryQuery = (result) => {
    const mainCategory = result.data.location_categories.edges[0].node;
    let posts = result.data.location.edges;
    // assoc_categories = result.data.location.edges.reduce(cat => {

    // });
    posts = posts.map(post => {
        const finalLink = `/location/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;

        return modifiedPost;
    });

    return {
        type: actionTypes.SET_CATEGORY,
        ...mainCategory,
        posts: posts
    }

}

export const executeCategoryQuery = (client , parent , slug = false , searchQuery = '' , allCategories = false ) =>{

  let filter = parent;
  let catFilter = parent;
  let theSearchQuery = searchQuery;
 if(slug){
  filter = slug
 }
 const currentQuery = CATEGORY_QUERY;
 if(allCategories === true){
//   currentQuery = ALL_CATEGORIES_QUERY;
 }

    /**
 * GraphQL category query that takes a category slug as a filter
 * Returns the posts belonging to the category and the category name and ID
 */

   
    return async dispatch => {
        try{
        const result = await client.query({
            query: currentQuery,
            variables: { filter: filter , catFilter: catFilter,searchQuery: theSearchQuery},
        });
          dispatch(modifyStateCategoryQuery(result));
          //dispatch(colorActions.setColors(result.data.location_categories.edges[0].node.thecolor));
         return;
        }catch(err){
           console.log(err);
        }
    }
}

  