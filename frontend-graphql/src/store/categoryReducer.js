import * as actionTypes from './actionTypes';

 const initialState = {
    name: '',
    posts: [],
    loading: false
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORY:
            const category = {
                name: action.name,
                posts: [...action.posts ]
            }
            return {
                ...state,
                ...category,
                loading: false
            }
        case actionTypes.FETCH_CATEGORY_START:
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