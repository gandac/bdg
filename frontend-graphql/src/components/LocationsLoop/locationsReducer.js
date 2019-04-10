import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    posts: [],
    pageType: [],
    loading: true
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORY:
            return {
                ...state,
                posts: [ ...action.posts],
                pageType: ['category'],
                loading: false
            }
        case actionTypes.SUBCATEGORY_START:
            return{
                ...state,
                pageType: ['category' , 'subcategory'],
                loading:true
            }
        case actionTypes.GET_ALL_POSTS:
            return{
                ...state,
                posts: [...action.posts],
                pageType: ['homepage'],
                loading: false
            }
       
        default:
            return state;
    }
}
export default reducer;