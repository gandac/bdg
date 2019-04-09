import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    posts: [],
    loading: true
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORY:
            return {
                ...state,
                posts: [ ...action.posts],
                loading: false
            }
        case actionTypes.SUBCATEGORY_START:
            return{
                ...state,
                loading:true
            }
       
        default:
            return state;
    }
}
export default reducer;