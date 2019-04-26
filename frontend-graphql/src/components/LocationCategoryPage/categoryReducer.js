import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    name: '',
    posts: [],
    loading: true
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORY:
            const category = {
                ...action,
                // posts: [...action.posts ]
            }
            return {
                ...state,
                ...category,
                loading: false
            }
        case actionTypes.FETCH_CATEGORY_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.RESET_CATEGORY:
            return{
                ...initialState
            }
        default:
            return state;
    }
}
export default reducer;