import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    headerMenu: [],
    footerMenu: [],
    staticInfo: false,
    loading: false
  };
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_MENU:
            return {
                ...state,
                ...action.menus,
                siteSettings : action.siteSettings,
                loading: false
            }
        case actionTypes.START_MENU_QUERY:
            return{
                ...state,
                ...initialState,
                loading:true
            }
        default:
            return state;
    }
}
export default reducer;