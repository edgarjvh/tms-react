import { loadBoardConstants } from './../constants';

export const loadBoardReducers = (state = {
    loadBoardOpenedPanels: []
}, action) => {
    switch (action.type) {
        case loadBoardConstants.SET_LOAD_BOARD_OPENED_PANELS:
            state = {
                ...state,
                loadBoardOpenedPanels: action.payload
            }
        break;
    }
    return state;
}