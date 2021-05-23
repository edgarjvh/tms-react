import {customersConstants} from './../constants';


// ===================================== CUSTOMERS ============================================
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
export const setSelectedDocument = document => {
    return {
        type: customersConstants.SET_SELECTED_DOCUMENT,
        payload: document
    }
}
export const setDocumentTags = tags => {
    return {
        type: customersConstants.SET_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedDocumentNote = note => {
    return {
        type: customersConstants.SET_SELECTED_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== BILL TO COMPANY ============================================
export const setBillToCompanies = customers => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANIES,
        payload: customers
    }
}
export const setSelectedBillToCompanyInfo = customer => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_INFO,
        payload: customer
    }
}
export const setSelectedBillToCompanyContact = contact => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_CONTACT,
        payload: contact
    }
}
export const setBillToCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setSelectedBillToCompanyNote = note => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedBillToCompanyDirection = direction => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setBillToCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setBillToCompanyAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setBillToCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setBillToCompanyAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setBillToCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setBillToCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setBillToCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setBillToCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedBillToCompanyDocument = document => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setBillToCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_BILL_TO_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedBillToCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== LB BILL TO COMPANY ============================================
export const setLbBillToCompanies = customers => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANIES,
        payload: customers
    }
}
export const setLbSelectedBillToCompanyInfo = customer => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_INFO,
        payload: customer
    }
}
export const setLbSelectedBillToCompanyContact = contact => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_CONTACT,
        payload: contact
    }
}
export const setLbBillToCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setLbSelectedBillToCompanyNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_NOTE,
        payload: note
    }
}
export const setLbSelectedBillToCompanyDirection = direction => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setLbBillToCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setLbBillToCompanyAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setLbBillToCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setLbBillToCompanyAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setLbBillToCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setLbBillToCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setLbBillToCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setLbBillToCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setLbSelectedBillToCompanyDocument = document => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setLbBillToCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_LB_BILL_TO_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setLbSelectedBillToCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== SHIPPER COMPANY ============================================
export const setShipperCompanies = customers => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANIES,
        payload: customers
    }
}
export const setSelectedShipperCompanyInfo = customer => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_INFO,
        payload: customer
    }
}
export const setSelectedShipperCompanyContact = contact => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_CONTACT,
        payload: contact
    }
}
export const setShipperCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setSelectedShipperCompanyNote = note => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedShipperCompanyDirection = direction => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setShipperCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setShipperCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setShipperCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setShipperCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setShipperCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setShipperCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setShipperCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setShipperCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedShipperCompanyDocument = document => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setShipperCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_SHIPPER_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedShipperCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_SELECTED_SHIPPER_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== LB SHIPPER COMPANY ============================================
export const setLbShipperCompanies = customers => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANIES,
        payload: customers
    }
}
export const setLbSelectedShipperCompanyInfo = customer => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_INFO,
        payload: customer
    }
}
export const setLbSelectedShipperCompanyContact = contact => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_CONTACT,
        payload: contact
    }
}
export const setLbShipperCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setLbSelectedShipperCompanyNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_NOTE,
        payload: note
    }
}
export const setLbSelectedShipperCompanyDirection = direction => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setLbShipperCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setLbShipperCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setLbShipperCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setLbShipperCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setLbShipperCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setLbShipperCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setLbShipperCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setLbShipperCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setLbSelectedShipperCompanyDocument = document => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setLbShipperCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_LB_SHIPPER_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setLbSelectedShipperCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== CONSIGNEE COMPANY ============================================
export const setConsigneeCompanies = customers => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANIES,
        payload: customers
    }
}
export const setSelectedConsigneeCompanyInfo = customer => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_INFO,
        payload: customer
    }
}
export const setSelectedConsigneeCompanyContact = contact => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_CONTACT,
        payload: contact
    }
}
export const setConsigneeCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setSelectedConsigneeCompanyNote = note => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedConsigneeCompanyDirection = direction => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setConsigneeCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setConsigneeCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setConsigneeCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setConsigneeCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setConsigneeCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setConsigneeCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setConsigneeCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setConsigneeCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedConsigneeCompanyDocument = document => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setConsigneeCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_CONSIGNEE_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedConsigneeCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== LB CONSIGNEE COMPANY ============================================
export const setLbConsigneeCompanies = customers => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANIES,
        payload: customers
    }
}
export const setLbSelectedConsigneeCompanyInfo = customer => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_INFO,
        payload: customer
    }
}
export const setLbSelectedConsigneeCompanyContact = contact => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_CONTACT,
        payload: contact
    }
}
export const setLbConsigneeCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setLbSelectedConsigneeCompanyNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_NOTE,
        payload: note
    }
}
export const setLbSelectedConsigneeCompanyDirection = direction => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setLbConsigneeCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setLbConsigneeCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setLbConsigneeCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setLbConsigneeCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setLbConsigneeCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setLbConsigneeCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setLbConsigneeCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setLbConsigneeCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setLbSelectedConsigneeCompanyDocument = document => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setLbConsigneeCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_LB_CONSIGNEE_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setLbSelectedConsigneeCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}

export const setCustomerOpenedPanels = panels => {
    return {
        type: customersConstants.SET_CUSTOMER_OPENED_PANELS,
        payload: panels
    }
}