
  import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    category: {
        name: '',
    },
    posts: [],
    currentPost: false,
    loading: false
 }

 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_POSTS_CATEGORY:
            return {
                ...state,
                category: {...action.category},
                posts: [...action.posts],
                loading: false
            }
        case actionTypes.FETCH_POSTS_CATEGORY_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.RESET_POSTS_CATEGORY:
            return{
                ...state,
                category: initialState.category,
                posts:initialState.posts,
                loading:false,
            }
        default:
            return state;
    }
}
export default reducer;