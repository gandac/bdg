import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    items: [],
    loading: true
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.GET_ALL_EVENTS:
            return{
                ...state,
                items: [...action.items],
                loading: false
            }
       
        default:
            return state;
    }
}
export default reducer;