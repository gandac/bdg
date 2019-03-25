import * as actionTypes from './actionTypes';
import gql from 'graphql-tag';

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

export const executeCategoryQuery = (client , parent , slug = false) =>{
  console.log("slug filtru",parent);
  let childrenSlug = false;
  let filter = parent;
  let catFilter = parent;
 if(slug){
  // console.log(parent);
  filter = slug
 }
    /**
 * GraphQL category query that takes a category slug as a filter
 * Returns the posts belonging to the category and the category name and ID
 */
const CATEGORY_QUERY = gql`
query CategoryQuery($filter: String , $catFilter: String!) {

    location_categories(where: { slug: [$catFilter] , shouldOnlyIncludeConnectedItems: false , shouldOutputInFlatList: false}){
    edges{
      node{
        name
        slug
        termTaxonomyId
      	location_categoryId
        children (where: {  shouldOnlyIncludeConnectedItems: false , shouldOutputInFlatList: false} ){
          edges {
            node {
              name
              link
              slug
              termTaxonomyId
            }
          }
        }
      }
    }
  }

  location( where: {
      taxQuery: {
        relation: AND,
        taxArray: [
          {
            terms: [$filter],
            taxonomy: LOCATION_CATEGORY,
            operator: IN,
            field: SLUG
          },{
            terms: ["uncategorized"],
            taxonomy: CATEGORY,
            operator: NOT_IN,
            field: SLUG
          }
        ]
      }} ){
    edges {
      node {
        title
        slug
        lat
        lng
        id
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
        location_categories {
          edges {
            node {
              location_categoryId
              name
              link
              children {
                edges {
                  node {
                    name
                    link
                    slug
                    termTaxonomyId
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}


`;    

//console.log(CATEGORY_QUERY);


    return async dispatch => {
        try{
        const result = await client.query({
            query: CATEGORY_QUERY,
            variables: { filter: filter , catFilter: catFilter},
        });
        return dispatch(modifyStateCategoryQuery(result));
        }catch(err){
           console.log(err);
           //change locationcategory state to show misscomunication with the server
        }
    }
}



export const modifyStateLocationQuery = (post) => {


    return {
        type: actionTypes.SET_LOCATION,
        location: post,
    }

}


export const executeLocationQuery = (client , slug) =>{

const LOCATION_QUERY = gql `
    query LOCATION_QUERY($filter: String!) {
    location( where: { name : $filter  } ){
        edges {
        node {
            title
            content
            slug
        }
        }
    }
    
    }
    `;
    const filter = slug;

    return async dispatch => {
        try{
            const result = await client.query({
                query: LOCATION_QUERY,
                variables: { filter },
              });
              console.log(result);
              const post = result.data.location.edges[0].node;
              return dispatch(modifyStateLocationQuery(post));
        }catch(err){
           console.log(err);
           //change locationcategory state to show misscomunication with the server
        }
    }
}
