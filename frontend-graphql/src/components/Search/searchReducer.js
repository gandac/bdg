import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    searchValue : '',
    searchInAllCategories: false
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SEARCH_VALUE:
            return {
                ...state,
               searchValue: action.searchValue,
            }
       
        default:
            return state;
    }
}
export default reducer;