import {companyConstants} from './../constants';
import axios from 'axios';

export const setPages = pages => {
    return {
        type: companyConstants.SET_PAGES,
        payload: pages
    }
}

export const setSelectedPageIndex = index => {
    return {
        type: companyConstants.SET_SELECTED_PAGE_INDEX,
        payload: index
    }
}

export const setScale = scale => {
    return {
        type: companyConstants.SET_SCALE,
        payload: scale
    }
}