import {systemConstants} from './../constants';
import axios from 'axios';

export const setMainScreen = screen => {
    return {
        type: systemConstants.SET_MAIN_SCREEN,
        payload: screen
    }
}
