import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    title: null,
    slug: null,
    loading:false,
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_LOCATION_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_LOCATION:
            
            return {
                ...state,
                ...action.location,
                loading:false
            }
       
        case actionTypes.FETCH_LOCATION_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
export default reducer;