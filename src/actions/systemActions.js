import {systemConstants} from './../constants';

export const setMainScreen = screen => {
    return {
        type: systemConstants.SET_MAIN_SCREEN,
        payload: screen
    }
}

export const setScale = scale => {
    return {
        type: systemConstants.SET_SCALE,
        payload: scale
    }
}
