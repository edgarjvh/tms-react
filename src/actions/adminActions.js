import {adminConstants} from './../constants';
import axios from 'axios';

export const setPages = pages => {
    return {
        type: adminConstants.SET_PAGES,
        payload: pages
    }
}

export const setSelectedPageIndex = index => {
    return {
        type: adminConstants.SET_SELECTED_PAGE_INDEX,
        payload: index
    }
}

export const setMainAdminScreenFocused = bool => {
    return {
        type: adminConstants.SET_MAIN_ADMIN_SCREEN_FOCUSED,
        payload: bool
    }
}

export const setCustomerScreenFocused = bool => {
    return {
        type: adminConstants.SET_CUSTOMER_SCREEN_FOCUSED,
        payload: bool
    }
}

export const setCarrierScreenFocused = bool => {
    return {
        type: adminConstants.SET_CARRIER_SCREEN_FOCUSED,
        payload: bool
    }
}

export const setReportsScreenFocused = bool => {
    return {
        type: adminConstants.SET_REPORTS_SCREEN_FOCUSED,
        payload: bool
    }
}

export const setSetupCompanyScreenFocused = bool => {
    return {
        type: adminConstants.SET_SETUP_COMPANY_SCREEN_FOCUSED,
        payload: bool
    }
}