import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';

export const resetCategory = () => {
    return {
        type: actionTypes.RESET_POSTS_CATEGORY
    }
}
export const startPostsQuery = () => {
    return {
        type: actionTypes.FETCH_POSTS_CATEGORY_START
    }
}
export const startPostQuery = () => {
    return {
        type: actionTypes.FETCH_POST_START
    }
}
export const modifyStateCategoryQuery = (result) => {
    console.log(result);
    const category = result.data.categories.edges[0] ? result.data.categories.edges[0].node : false;
    let posts = result.data.posts.edges;
    posts = posts.map(post => {
      const finalLink = `/insiders-post/${post.node.slug}`;
      const modifiedPost = { ...post };
      modifiedPost.node.link = finalLink;
      return modifiedPost;
    });
   
    return {
        type: actionTypes.SET_POSTS_CATEGORY,
        category: category,
        posts: posts
    }

}



export const executePostsQuery = (client , slug = false , allCategories = false ) =>{

    let filter = '';
    if(slug){
        filter = slug
    }
    const CATEGORY_QUERY = gql`
    query CategoryQuery($filter: String) {
        posts(where: { categoryName: $filter }) {
        edges {
            node {
            title
            excerpt
            content
            date
            categories {
                edges {
                  node {
                      name,
                      id
                  }
                }
            }
            featuredImage{
                sourceUrl
                mediaDetails {
                  sizes {
                    file
                    height
                    mimeType
                    name
                    sourceUrl
                    width
                  } 
                }
              }
            slug
            }
        }
        }
        categories(where: { slug: [$filter] }) {
        edges {
            node {
            name
            categoryId
            }
        }
        }
    }
    `;
    
    return async dispatch => {
        try{
        const result = await client.query({
            query: CATEGORY_QUERY,
            variables: { filter: filter},
        });
          dispatch(modifyStateCategoryQuery(result,allCategories));
         return;
        }catch(err){
           console.log(err);
        }
    }
}

  