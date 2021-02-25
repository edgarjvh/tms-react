import { companyConstants } from '../constants';

export const companyReducers = (state = {
    pages: [],
    selectedPageIndex: -1,
    scale: 1
}, action) => {
    switch (action.type) {
        case companyConstants.SET_PAGES:
            state = {
                ...state,
                pages: action.payload
            }
            break;
        case companyConstants.SET_SELECTED_PAGE_INDEX:
            state = {
                ...state,
                selectedPageIndex: action.payload
            }
            break;
        case companyConstants.SET_SCALE:
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