import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    page: {
        title: '',
        content: '',
    },
    loading: false
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_PAGE:
            return {
                ...state,
               page: action.page,
               loading: false,
            }
        case actionTypes.FETCH_PAGE_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
export default reducer;