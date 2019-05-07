import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    posts: [],
    pageType: [],
    pageInfo: {},
    newPosts: [],
    loading: true
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CATEGORY:
            return {
                ...state,
                posts: [ ...action.posts],
                pageType: ['category'],
                pageInfo: action.pageInfo,
                loading: false
            }
        case actionTypes.SUBCATEGORY_START:
            return{
                ...state,
                pageType: ['category' , 'subcategory'],
                loading:true
            }
        case actionTypes.LOCATIONS_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.GET_ALL_LOCATIONS:
            return{
                ...state,
                posts: [...action.posts],
                pageType: action.pageType,
                pageInfo: action.pageInfo,
                loading: false
            }
        case actionTypes.GET_NEW_LOCATIONS:
            return{
                ...state,
                newPosts: [...action.posts],
                loading: false
            }
       
        default:
            return state;
    }
}
export default reducer;