import * as actionTypes from '../../store/actionTypes';
import {CATEGORY_QUERY} from './queries';

export const resetCategory = () => {
    return {
        type: actionTypes.RESET_CATEGORY
    }
}
export const startCategoryQuery = () => {
    return {
        type: actionTypes.FETCH_CATEGORY_START
    }
}
export const modifyStateCategoryQuery = (result) => {
    const mainCategory = result.data.location_categories.edges[0].node;
    let posts = result.data.location.edges;
    let pageInfo = result.data.location.pageInfo;
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
        posts: posts,
        pageInfo: pageInfo
    }

}

export const executeCategoryQuery = (client , parent , slug = false , searchQuery = '' , pagination = {} ) =>{

  let filter = parent;
  let catFilter = parent;
  let theSearchQuery = searchQuery;
  let {first, last, before , after } = pagination;
 if(slug){
  filter = slug
 }
 const currentQuery = CATEGORY_QUERY;

    return async dispatch => {
        try{
        const result = await client.query({
            query: currentQuery,
            variables: { filter: filter , 
                        catFilter: catFilter,
                        searchQuery: theSearchQuery,
                        first:first,
                        last:last,
                        before:before,
                        after:after,
                    },
        });
          dispatch(modifyStateCategoryQuery(result));
          
         return;
        }catch(err){
           console.log(err);
        }
    }
}