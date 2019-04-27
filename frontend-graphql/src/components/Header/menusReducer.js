import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    headerMenu: [],
    footerMenu: [],
    staticInfo: {},
    loading: false
  };
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_MENU:
            return {
                ...state,
                ...action.menus,
                siteSettings : action.siteSettings,
                staticInfo: {
                    ...state.staticInfo,
                    homepage: {...action.menus.homepage}
                },
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
        // case actionTypes.HOMEPAGE_STATIC_INFO:
        //     return{
        //         ...state,
        //         staticInfo: {
        //             ...state.staticInfo,
        //             homepage: {...action.payload}
        //         }
        //     }
    }
}
export default reducer;