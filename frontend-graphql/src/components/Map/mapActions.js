import * as actionTypes from '../../store/actionTypes';

export const toogleMapActive = () => {
    window.scrollTo(0, 0);
    return {
        type: actionTypes.TOGGLE_MAP,
        active: true
    }
}
export const toogleMapInactive = (event = false) => {
   if(event){
    event.preventDefault();
   }

    return {
        type: actionTypes.TOGGLE_MAP,
        active: false
    }
}