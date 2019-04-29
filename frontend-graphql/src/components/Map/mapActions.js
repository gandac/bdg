import * as actionTypes from '../../store/actionTypes';

export const toogleMapActive = () => {
    window.scrollTo(0, 0);
    window.location.hash = 'mapView';
    return {
        type: actionTypes.TOGGLE_MAP,
        active: true
    }
}

export const toogleMapInactive = (event = false) => {
    window.history.replaceState(null, null, ' ');
    if(event){
    event.preventDefault();
   }

    return {
        type: actionTypes.TOGGLE_MAP,
        active: false
    }
}
