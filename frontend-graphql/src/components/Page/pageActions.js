import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';


export const startPageQuery = () => {
    return {
        type: actionTypes.FETCH_PAGE_START
    }
}
export const modifyStatePageQuery = (result) => {

    const page = result.data.pageBy;
    return {
        type: actionTypes.SET_PAGE,
        page: page
    }

}

export const executePageQuery = (client  , uri = false ) =>{

let filter = 'homepage';
 if(uri){
  filter = uri;
 }
 
 const PAGE_QUERY = gql`
  query PageQuery($uri: String) {
    pageBy(uri: $uri) {
      title
      content
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
    }
  }
`;


   
    return async dispatch => {
        try{
        const result = await client.query({
            query: PAGE_QUERY,
            variables: { uri: filter },
        });
          dispatch(modifyStatePageQuery(result));
         return;
        }catch(err){
           console.log(err);
        }
    }
}
