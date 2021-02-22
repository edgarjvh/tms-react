import {customerPageConstants} from './../constants';
import axios from 'axios';

export const setCustomers = customers => {
    return {
        type: customerPageConstants.SET_CUSTOMERS,
        payload: customers
    }
}
export const setSelectedCustomer = customer => {
    return {
        type: customerPageConstants.SET_SELECTED_CUSTOMER,
        payload: customer
    }
}
export const setCustomerPanels = panels => {
    return {
        type: customerPageConstants.SET_CUSTOMER_PANELS,
        payload: panels
    }
}
export const setSelectedContact = contact => {
    return {
        type: customerPageConstants.SET_SELECTED_CONTACT,
        payload: contact
    }
}
export const setSelectedNote = note => {
    return {
        type: customerPageConstants.SET_SELECTED_NOTE,
        payload: note
    }
}
export const setSelectedDirection = direction => {
    return {
        type: customerPageConstants.SET_SELECTED_DIRECTION,
        payload: direction
    }
}
export const setContactSearch = contactSearch => {
    return {
        type: customerPageConstants.SET_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setAutomaticEmailsTo = to => {
    return {
        type: customerPageConstants.SET_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setAutomaticEmailsCc = cc => {
    return {
        type: customerPageConstants.SET_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setAutomaticEmailsBcc = bcc => {
    return {
        type: customerPageConstants.SET_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setShowingContactList = show => {
    return {
        type: customerPageConstants.SET_SHOWING_CONTACT_LIST,
        payload: show
    }
}