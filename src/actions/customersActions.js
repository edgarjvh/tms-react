import {customersConstants} from './../constants';

export const setCustomers = customers => {
    return {
        type: customersConstants.SET_CUSTOMERS,
        payload: customers
    }
}
export const setSelectedCustomer = customer => {
    return {
        type: customersConstants.SET_SELECTED_CUSTOMER,
        payload: customer
    }
}
export const setCustomerPanels = panels => {
    return {
        type: customersConstants.SET_CUSTOMER_PANELS,
        payload: panels
    }
}
export const setSelectedContact = contact => {
    return {
        type: customersConstants.SET_SELECTED_CONTACT,
        payload: contact
    }
}
export const setSelectedNote = note => {
    return {
        type: customersConstants.SET_SELECTED_NOTE,
        payload: note
    }
}
export const setSelectedDirection = direction => {
    return {
        type: customersConstants.SET_SELECTED_DIRECTION,
        payload: direction
    }
}
export const setContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setShowingContactList = show => {
    return {
        type: customersConstants.SET_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setCustomerSearch = customerSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_SEARCH,
        payload: customerSearch
    }
}
export const setCustomerContacts = contacts => {
    return {
        type: customersConstants.SET_CUSTOMER_CONTACTS,
        payload: contacts
    }
}
export const setContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_IS_EDITING_CONTACT,
        payload: isEditing
    }
}