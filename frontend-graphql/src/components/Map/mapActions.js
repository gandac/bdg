import * as actionTypes from '../../store/actionTypes';

export const toogleMapActive = () => {
    return {
        type: actionTypes.TOGGLE_MAP,
        active: true
    }
}
export const toogleMapInactive = (event) => {
    event.preventDefault();
    return {
        type: actionTypes.TOGGLE_MAP,
        active: false
    }
}