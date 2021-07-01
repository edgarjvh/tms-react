import {loadBoardConstants} from './../constants';

export const setLoadBoardOpenedPanels = panels => {
    return {
        type: loadBoardConstants.SET_LOAD_BOARD_OPENED_PANELS,
        payload: panels
    }
}