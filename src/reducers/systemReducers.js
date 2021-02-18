import { systemConstants } from './../constants';

export const systemReducers = (state = {
    serverUrl: 'http://localhost:8000',
    // serverUrl: 'http://tmsserver.ddns.net',
    mainScreen: 'company',

}, action) => {
    switch (action.type) {
        case systemConstants.SET_MAIN_SCREEN:
            state = {
                ...state,
                mainScreen: action.payload
            }
            break;
        default:
            break;
    }
    return state;
}