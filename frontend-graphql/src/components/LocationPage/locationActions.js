import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';


export const startLocationQuery = () => {
    return {
        type: actionTypes.FETCH_LOCATION_START
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
          slug
          content
          lat
          lng
          id
          address
          fbLink
          inLink
          fbLink
          inLink
          gallery{
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
                thecolor
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
    const filter = slug;

    return async dispatch => {
        try{
            const result = await client.query({
                query: LOCATION_QUERY,
                variables: { filter },
              });
              const post = result.data.location.edges[0].node;
              return dispatch(modifyStateLocationQuery(post));
        }catch(err){
           console.log(err);
        }
    }
}
