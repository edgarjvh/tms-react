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

// ====================================== ADMIN =========================================

export const setAdminCustomers = customers => {
    return {
        type: customersConstants.SET_ADMIN_CUSTOMERS,
        payload: customers
    }
}
export const setAdminSelectedCustomer = customer => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_CUSTOMER,
        payload: customer
    }
}
export const setAdminCustomerPanels = panels => {
    return {
        type: customersConstants.SET_ADMIN_CUSTOMER_PANELS,
        payload: panels
    }
}
export const setAdminSelectedContact = contact => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_CONTACT,
        payload: contact
    }
}
export const setAdminSelectedNote = note => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_NOTE,
        payload: note
    }
}
export const setAdminSelectedDirection = direction => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_DIRECTION,
        payload: direction
    }
}
export const setAdminContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_ADMIN_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setAdminAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_ADMIN_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setAdminAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_ADMIN_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setAdminAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_ADMIN_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setAdminShowingContactList = show => {
    return {
        type: customersConstants.SET_ADMIN_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setAdminCustomerSearch = customerSearch => {
    return {
        type: customersConstants.SET_ADMIN_CUSTOMER_SEARCH,
        payload: customerSearch
    }
}
export const setAdminCustomerContacts = contacts => {
    return {
        type: customersConstants.SET_ADMIN_CUSTOMER_CONTACTS,
        payload: contacts
    }
}
export const setAdminContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_ADMIN_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setAdminIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_ADMIN_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setAdminSelectedDocument = document => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_DOCUMENT,
        payload: document
    }
}
export const setAdminDocumentTags = tags => {
    return {
        type: customersConstants.SET_ADMIN_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setAdminSelectedDocumentNote = note => {
    return {
        type: customersConstants.SET_ADMIN_SELECTED_DOCUMENT_NOTE,
        payload: note
    }
}

// ====================================== ADMIN =========================================


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

// ===================================== CUSTOMER BILL TO COMPANY ============================================
export const setCustomerBillToCompanies = customers => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANIES,
        payload: customers
    }
}
export const setCustomerSelectedBillToCompanyInfo = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_INFO,
        payload: customer
    }
}
export const setCustomerSelectedBillToCompanyContact = contact => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_CONTACT,
        payload: contact
    }
}
export const setCustomerBillToCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setCustomerSelectedBillToCompanyNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_NOTE,
        payload: note
    }
}
export const setCustomerSelectedBillToCompanyDirection = direction => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setCustomerBillToCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setCustomerBillToCompanyAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setCustomerBillToCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setCustomerBillToCompanyAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setCustomerBillToCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setCustomerBillToCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setCustomerBillToCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setCustomerBillToCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setCustomerSelectedBillToCompanyDocument = document => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setCustomerBillToCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_CUSTOMER_BILL_TO_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setCustomerSelectedBillToCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}


// ===================================== INVOICE BILL TO COMPANY ============================================
export const setInvoiceBillToCompanies = customers => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANIES,
        payload: customers
    }
}
export const setInvoiceSelectedBillToCompanyInfo = customer => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_INFO,
        payload: customer
    }
}
export const setInvoiceSelectedBillToCompanyContact = contact => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_CONTACT,
        payload: contact
    }
}
export const setInvoiceBillToCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setInvoiceSelectedBillToCompanyNote = note => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_NOTE,
        payload: note
    }
}
export const setInvoiceSelectedBillToCompanyDirection = direction => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setInvoiceBillToCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setInvoiceBillToCompanyAutomaticEmailsTo = to => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setInvoiceBillToCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setInvoiceBillToCompanyAutomaticEmailsBcc = bcc => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setInvoiceBillToCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setInvoiceBillToCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setInvoiceBillToCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setInvoiceBillToCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setInvoiceSelectedBillToCompanyDocument = document => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setInvoiceBillToCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_INVOICE_BILL_TO_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setInvoiceSelectedBillToCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE,
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

// ===================================== CUSTOMER SHIPPER COMPANY ============================================
export const setCustomerShipperCompanies = customers => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANIES,
        payload: customers
    }
}
export const setCustomerSelectedShipperCompanyInfo = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_INFO,
        payload: customer
    }
}
export const setCustomerSelectedShipperCompanyContact = contact => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_CONTACT,
        payload: contact
    }
}
export const setCustomerShipperCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setCustomerSelectedShipperCompanyNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_NOTE,
        payload: note
    }
}
export const setCustomerSelectedShipperCompanyDirection = direction => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setCustomerShipperCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setCustomerShipperCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setCustomerShipperCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setCustomerShipperCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setCustomerShipperCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setCustomerShipperCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setCustomerShipperCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setCustomerShipperCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setCustomerSelectedShipperCompanyDocument = document => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setCustomerShipperCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_CUSTOMER_SHIPPER_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setCustomerSelectedShipperCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_SHIPPER_COMPANY_DOCUMENT_NOTE,
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

// ===================================== CUSTOMER CONSIGNEE COMPANY ============================================
export const setCustomerConsigneeCompanies = customers => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANIES,
        payload: customers
    }
}
export const setCustomerSelectedConsigneeCompanyInfo = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_INFO,
        payload: customer
    }
}
export const setCustomerSelectedConsigneeCompanyContact = contact => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_CONTACT,
        payload: contact
    }
}
export const setCustomerConsigneeCompanySearch = customerSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_SEARCH,
        payload: customerSearch
    }
}
export const setCustomerSelectedConsigneeCompanyNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_NOTE,
        payload: note
    }
}
export const setCustomerSelectedConsigneeCompanyDirection = direction => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_DIRECTION,
        payload: direction
    }
}
export const setCustomerConsigneeCompanyContactSearch = contactSearch => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setCustomerConsigneeCompanyAutomaticEmailsBcc = to => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_TO,
        payload: to
    }
}
export const setCustomerConsigneeCompanyAutomaticEmailsCc = cc => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_CC,
        payload: cc
    }
}
export const setCustomerConsigneeCompanyAutomaticEmailsTo = bcc => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_BCC,
        payload: bcc
    }
}
export const setCustomerConsigneeCompanyShowingContactList = show => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setCustomerConsigneeCompanyContacts = contacts => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setCustomerConsigneeCompanyContactSearchCustomer = customer => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_CONTACT_SEARCH_CUSTOMER,
        payload: customer
    }
}
export const setCustomerConsigneeCompanyIsEditingContact = isEditing => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setCustomerSelectedConsigneeCompanyDocument = document => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setCustomerConsigneeCompanyDocumentTags = tags => {
    return {
        type: customersConstants.SET_CUSTOMER_CONSIGNEE_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setCustomerSelectedConsigneeCompanyDocumentNote = note => {
    return {
        type: customersConstants.SET_CUSTOMER_SELECTED_CONSIGNEE_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}

export const setCustomerOpenedPanels = panels => {
    return {
        type: customersConstants.SET_CUSTOMER_OPENED_PANELS,
        payload: panels
    }
}
export const setAdminCustomerOpenedPanels = panels => {
    return {
        type: customersConstants.SET_ADMIN_CUSTOMER_OPENED_PANELS,
        payload: panels
    }
}