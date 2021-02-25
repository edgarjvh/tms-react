import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { systemConstants } from '../constants';

export const systemReducers = (state = {
    serverUrl: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRO_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL,
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