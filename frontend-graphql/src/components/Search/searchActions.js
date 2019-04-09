import * as actionTypes from '../../store/actionTypes';


export const setSearchValue = (value) => {
    return {
        type: actionTypes.SET_SEARCH_VALUE,
        searchValue: value
    }
} 
