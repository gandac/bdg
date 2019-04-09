import * as actionTypes from '../../store/actionTypes';

 const initialState = {
    active : false
 }
 const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_MAP:
            return {
                ...state,
                active: action.active
            }
        default:
            return state;
    }
}
export default reducer;