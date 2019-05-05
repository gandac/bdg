import * as actionTypes from '../../store/actionTypes';

export const startSearchQuery = () => {
    return {
        type: actionTypes.START_SEARCH,
    }
} 
export const setSearchInCategory = (value) => {
    return {
        type: actionTypes.SET_SEARCH_IN_CATEGORY,
        value: value
    }
}
export const setSearchValue = (value) => {
    return {
        type: actionTypes.SET_SEARCH_VALUE,
        searchValue: value
    }
} 
