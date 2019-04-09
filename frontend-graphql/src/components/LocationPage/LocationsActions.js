import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';



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
              const post = result.data.location.edges[0].node;
              return dispatch(modifyStateLocationQuery(post));
        }catch(err){
           console.log(err);
        }
    }
}
