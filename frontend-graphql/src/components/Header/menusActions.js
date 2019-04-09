import * as actionTypes from '../../store/actionTypes';
import gql from 'graphql-tag';  

export const startMenuQuery = () => {
    return {
        type: actionTypes.START_MENU_QUERY
    }
} 

export const fetchMenu = (menus) => {
    return {
        type: actionTypes.SET_MENU,
        menus: menus
    }
}

export const getMenu = (client) => {

const MENU_QUERY = gql`
  query MenuQuery {
    bdgSettings{
        facebookUrl
        instaUrl
        footerDescription
        copyrightDescription
      }
    headerMenu {
      url
      label
      type
    }
    footerMenu {
        url
        label
        type
    }

  }
`;

 return async dispatch => {
    try{
        const result = await client.query({
            query: MENU_QUERY,
        });
        
        const menus = { 
            headerMenu:  result.data.headerMenu,
            footerMenu: result.data.footerMenu,
            settings: result.data.bdgSettings
        }
        return dispatch(fetchMenu(menus));
      
    }catch(err){
        console.log(err);
        //change locationcategory state to show misscomunication with the server
    }
 }
}