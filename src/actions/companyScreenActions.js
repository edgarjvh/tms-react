import {companyScreenConstants} from './../constants';
import axios from 'axios';

export const setPages = pages => {
    return {
        type: companyScreenConstants.SET_PAGES,
        payload: pages
    }
}

export const setSelectedPageIndex = index => {
    return {
        type: companyScreenConstants.SET_SELECTED_PAGE_INDEX,
        payload: index
    }
}

export const setScale = scale => {
    return {
        type: companyScreenConstants.SET_SCALE,
        payload: scale
    }
}