import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    searchValue : '',
    searchInAllCategories: false,
    // loading:false,
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.START_SEARCH:
            return {
                ...state,
            //    loading:true,
            }
        case actionTypes.SET_SEARCH_IN_CATEGORY:
            return {
                ...state,
                searchInAllCategories: action.value
            }
        case actionTypes.SET_SEARCH_VALUE:
            return {
                ...state,
               searchValue: action.searchValue,
            //    loading:false
            }
       
        default:
            return state;
    }
}
export default reducer;