import { companyScreenConstants } from './../constants';

export const companyScreenReducers = (state = {
    pages: [],
    selectedPageIndex: -1,
    scale: 1
}, action) => {
    switch (action.type) {
        case companyScreenConstants.SET_PAGES:
            state = {
                ...state,
                pages: action.payload
            }
            break;
        case companyScreenConstants.SET_SELECTED_PAGE_INDEX:
            state = {
                ...state,
                selectedPageIndex: action.payload
            }
            break;
        case companyScreenConstants.SET_SCALE:
            state = {
                ...state,
                scale: action.payload
            }
            break;
        default:
            break;
    }
    return state;
}