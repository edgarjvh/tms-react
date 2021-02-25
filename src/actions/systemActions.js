import {systemConstants} from './../constants';

export const setMainScreen = screen => {
    return {
        type: systemConstants.SET_MAIN_SCREEN,
        payload: screen
    }
}
