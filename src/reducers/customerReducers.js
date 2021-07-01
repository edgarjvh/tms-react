import { customersConstants } from '../constants';

export const customerReducers = (state = {
    customers: [],
    selectedCustomer: {},
    selectedContact: {},
    selectedNote: {},
    selectedDirection: {},
    contactSearch: {},
    customerSearch: [],
    automaticEmailsTo: '',
    automaticEmailsCc: '',
    automaticEmailsBcc: '',
    showingContactList: true,
    contacts: [],
    isEditingContact: false,
    contactSearchCustomer: { selectedContact: {} },
    selectedDocument: {},
    documentTags: '',
    selectedDocumentNote: {},

    billToCompanies: [],
    selectedBillToCompanyInfo: {},
    selectedBillToCompanyContact: {},
    billToCompanySearch: [],
    selectedBillToCompanyNote: {},
    selectedBillToCompanyDirection: {},
    billToCompanyContactSearch: {},
    billToCompanyAutomaticEmailsTo: '',
    billToCompanyAutomaticEmailsCc: '',
    billToCompanyAutomaticEmailsBcc: '',
    billToCompanyShowingContactList: true,
    billToCompanyContacts: [],
    billToCompanyIsEditingContact: false,
    billToCompanyContactSearchCustomer: { selectedBillToCompanyContact: {} },
    selectedBillToCompanyDocument: {},
    billToCompanyDocumentTags: '',
    selectedBillToCompanyDocumentNote: {},

    lbBillToCompanies: [],
    selectedLbBillToCompanyInfo: {},
    selectedLbBillToCompanyContact: {},
    lbBillToCompanySearch: [],
    selectedLbBillToCompanyNote: {},
    selectedLbBillToCompanyDirection: {},
    lbBillToCompanyContactSearch: {},
    lbBillToCompanyAutomaticEmailsTo: '',
    lbBillToCompanyAutomaticEmailsCc: '',
    lbBillToCompanyAutomaticEmailsBcc: '',
    lbBillToCompanyShowingContactList: true,
    lbBillToCompanyContacts: [],
    lbBillToCompanyIsEditingContact: false,
    lbBillToCompanyContactSearchCustomer: { selectedLbBillToCompanyContact: {} },
    selectedLbBillToCompanyDocument: {},
    lbBillToCompanyDocumentTags: '',
    selectedLbBillToCompanyDocumentNote: {},

    invoiceBillToCompanies: [],
    selectedInvoiceBillToCompanyInfo: {},
    selectedInvoiceBillToCompanyContact: {},
    invoiceBillToCompanySearch: [],
    selectedInvoiceBillToCompanyNote: {},
    selectedInvoiceBillToCompanyDirection: {},
    invoiceBillToCompanyContactSearch: {},
    invoiceBillToCompanyAutomaticEmailsTo: '',
    invoiceBillToCompanyAutomaticEmailsCc: '',
    invoiceBillToCompanyAutomaticEmailsBcc: '',
    invoiceBillToCompanyShowingContactList: true,
    invoiceBillToCompanyContacts: [],
    invoiceBillToCompanyIsEditingContact: false,
    invoiceBillToCompanyContactSearchCustomer: { selectedInvoiceBillToCompanyContact: {} },
    selectedInvoiceBillToCompanyDocument: {},
    invoiceBillToCompanyDocumentTags: '',
    selectedInvoiceBillToCompanyDocumentNote: {},

    shipperCompanies: [],
    selectedShipperCompanyInfo: {},
    selectedShipperCompanyContact: {},
    shipperCompanySearch: [],
    selectedShipperCompanyNote: {},
    selectedShipperCompanyDirection: {},
    shipperCompanyContactSearch: {},
    shipperCompanyAutomaticEmailsTo: '',
    shipperCompanyAutomaticEmailsCc: '',
    shipperCompanyAutomaticEmailsBcc: '',
    shipperCompanyShowingContactList: true,
    shipperCompanyContacts: [],
    shipperCompanyIsEditingContact: false,
    shipperCompanyContactSearchCustomer: { selectedShipperCompanyContact: {} },
    selectedShipperCompanyDocument: {},
    shipperCompanyDocumentTags: '',
    selectedShipperCompanyDocumentNote: {},

    lbShipperCompanies: [],
    selectedLbShipperCompanyInfo: {},
    selectedLbShipperCompanyContact: {},
    lbShipperCompanySearch: [],
    selectedLbShipperCompanyNote: {},
    selectedLbShipperCompanyDirection: {},
    lbShipperCompanyContactSearch: {},
    lbShipperCompanyAutomaticEmailsTo: '',
    lbShipperCompanyAutomaticEmailsCc: '',
    lbShipperCompanyAutomaticEmailsBcc: '',
    lbShipperCompanyShowingContactList: true,
    lbShipperCompanyContacts: [],
    lbShipperCompanyIsEditingContact: false,
    lbShipperCompanyContactSearchCustomer: { selectedLbShipperCompanyContact: {} },
    selectedLbShipperCompanyDocument: {},
    lbShipperCompanyDocumentTags: '',
    selectedLbShipperCompanyDocumentNote: {},

    consigneeCompanies: [],
    selectedConsigneeCompanyInfo: {},
    selectedConsigneeCompanyContact: {},
    consigneeCompanySearch: [],
    selectedConsigneeCompanyNote: {},
    selectedConsigneeCompanyDirection: {},
    consigneeCompanyContactSearch: {},
    consigneeCompanyAutomaticEmailsTo: '',
    consigneeCompanyAutomaticEmailsCc: '',
    consigneeCompanyAutomaticEmailsBcc: '',
    consigneeCompanyShowingContactList: true,
    consigneeCompanyContacts: [],
    consigneeCompanyIsEditingContact: false,
    consigneeCompanyContactSearchCustomer: { selectedConsigneeCompanyContact: {} },
    selectedConsigneeCompanyDocument: {},
    consigneeCompanyDocumentTags: '',
    selectedConsigneeCompanyDocumentNote: {},

    lbConsigneeCompanies: [],
    selectedLbConsigneeCompanyInfo: {},
    selectedLbConsigneeCompanyContact: {},
    lbConsigneeCompanySearch: [],
    selectedLbConsigneeCompanyNote: {},
    selectedLbConsigneeCompanyDirection: {},
    lbConsigneeCompanyContactSearch: {},
    lbConsigneeCompanyAutomaticEmailsTo: '',
    lbConsigneeCompanyAutomaticEmailsCc: '',
    lbConsigneeCompanyAutomaticEmailsBcc: '',
    lbConsigneeCompanyShowingContactList: true,
    lbConsigneeCompanyContacts: [],
    lbConsigneeCompanyIsEditingContact: false,
    lbConsigneeCompanyContactSearchCustomer: { selectedLbConsigneeCompanyContact: {} },
    selectedLbConsigneeCompanyDocument: {},
    lbConsigneeCompanyDocumentTags: '',
    selectedLbConsigneeCompanyDocumentNote: {},

    customerOpenedPanels: [],    


    panels: []
}, action) => {
    switch (action.type) {
        case customersConstants.SET_CUSTOMERS:
            state = {
                ...state,
                customers: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CUSTOMER:
            state = {
                ...state,
                selectedCustomer: action.payload,
                selectedBillToCompanyInfo: ((state.selectedBillToCompanyInfo.id || 0) > 0 && state.selectedBillToCompanyInfo.id === action.payload.id) ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: ((state.selectedLbBillToCompanyInfo.id || 0) > 0 && state.selectedLbBillToCompanyInfo.id === action.payload.id) ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: ((state.selectedInvoiceBillToCompanyInfo.id || 0) > 0 && state.selectedInvoiceBillToCompanyInfo.id === action.payload.id) ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedShipperCompanyInfo: ((state.selectedShipperCompanyInfo.id || 0) > 0 && state.selectedShipperCompanyInfo.id === action.payload.id) ? action.payload : state.selectedShipperCompanyInfo,
                selectedLbShipperCompanyInfo: ((state.selectedLbShipperCompanyInfo.id || 0) > 0 && state.selectedLbShipperCompanyInfo.id === action.payload.id) ? action.payload : state.selectedLbShipperCompanyInfo,
                selectedConsigneeCompanyInfo: ((state.selectedConsigneeCompanyInfo.id || 0) > 0 && state.selectedConsigneeCompanyInfo.id === action.payload.id) ? action.payload : state.selectedConsigneeCompanyInfo,
                selectedLbConsigneeCompanyInfo: ((state.selectedLbConsigneeCompanyInfo.id || 0) > 0 && state.selectedLbConsigneeCompanyInfo.id === action.payload.id) ? action.payload : state.selectedLbConsigneeCompanyInfo,
            }
            break;
        case customersConstants.SET_SELECTED_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_SELECTED_NOTE:
            state = {
                ...state,
                selectedNote: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_DIRECTION:
            state = {
                ...state,
                selectedDirection: action.payload
            }
            break;
        case customersConstants.SET_CONTACT_SEARCH:
            state = {
                ...state,
                contactSearch: action.payload
            }
            break;
        case customersConstants.SET_CUSTOMER_SEARCH:
            state = {
                ...state,
                customerSearch: action.payload
            }
            break;
        case customersConstants.SET_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                automaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                automaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                automaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                showingContactList: action.payload
            }
            break;
        case customersConstants.SET_CUSTOMER_CONTACTS:
            state = {
                ...state,
                contacts: action.payload
            }
            break;
        case customersConstants.SET_IS_EDITING_CONTACT:
            state = {
                ...state,
                isEditingContact: action.payload
            }
            break;
        case customersConstants.SET_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                contactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_DOCUMENT:
            state = {
                ...state,
                selectedDocument: action.payload,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_DOCUMENT_TAGS:
            state = {
                ...state,
                documentTags: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDocumentNote: action.payload
            }
            break;


        // ==================================== BILL TO COMPANY ===================================

        case customersConstants.SET_BILL_TO_COMPANIES:
            state = {
                ...state,
                billToCompanies: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_INFO:
            state = {
                ...state,
                selectedBillToCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo,
                selectedLbShipperCompanyInfo: (state.selectedLbShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyInfo,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo,
                selectedLbConsigneeCompanyInfo: (state.selectedLbConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyInfo,
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_CONTACT:
            state = {
                ...state,
                selectedBillToCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_SEARCH:
            state = {
                ...state,
                billToCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_NOTE:
            state = {
                ...state,
                selectedBillToCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedBillToCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                billToCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                billToCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                billToCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                billToCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                billToCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_CONTACTS:
            state = {
                ...state,
                billToCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                billToCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                billToCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedBillToCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_BILL_TO_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                billToCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedBillToCompanyDocumentNote: action.payload
            }
            break;


        // ==================================== LB BILL TO COMPANY ===================================

        case customersConstants.SET_LB_BILL_TO_COMPANIES:
            state = {
                ...state,
                lbBillToCompanies: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_INFO:
            state = {
                ...state,
                selectedLbBillToCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedShipperCompanyDirection: (state.selectedShipperCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDirection,
                selectedLbShipperCompanyDirection: (state.selectedLbShipperCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDirection,
                selectedConsigneeCompanyDirection: (state.selectedConsigneeCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDirection,
                selectedLbConsigneeCompanyDirection: (state.selectedLbConsigneeCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDirection,
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_CONTACT:
            state = {
                ...state,
                selectedLbBillToCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_SEARCH:
            state = {
                ...state,
                lbBillToCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_NOTE:
            state = {
                ...state,
                selectedLbBillToCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedLbBillToCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                lbBillToCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                lbBillToCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                lbBillToCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                lbBillToCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                lbBillToCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_CONTACTS:
            state = {
                ...state,
                lbBillToCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                lbBillToCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                lbBillToCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedLbBillToCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_LB_BILL_TO_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                lbBillToCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedLbBillToCompanyDocumentNote: action.payload
            }
            break;


        // ==================================== INVOICE BILL TO COMPANY ===================================

        case customersConstants.SET_INVOICE_BILL_TO_COMPANIES:
            state = {
                ...state,
                invoiceBillToCompanies: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_INFO:
            state = {
                ...state,
                selectedInvoiceBillToCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedShipperCompanyDirection: (state.selectedShipperCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDirection,
                selectedLbShipperCompanyDirection: (state.selectedLbShipperCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDirection,
                selectedConsigneeCompanyDirection: (state.selectedConsigneeCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDirection,
                selectedLbConsigneeCompanyDirection: (state.selectedLbConsigneeCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDirection,
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_CONTACT:
            state = {
                ...state,
                selectedInvoiceBillToCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_SEARCH:
            state = {
                ...state,
                invoiceBillToCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_NOTE:
            state = {
                ...state,
                selectedInvoiceBillToCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedInvoiceBillToCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                invoiceBillToCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                invoiceBillToCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                invoiceBillToCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                invoiceBillToCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                invoiceBillToCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACTS:
            state = {
                ...state,
                invoiceBillToCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                invoiceBillToCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                invoiceBillToCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedInvoiceBillToCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_INVOICE_BILL_TO_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                invoiceBillToCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_INVOICE_SELECTED_BILL_TO_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedInvoiceBillToCompanyDocumentNote: action.payload
            }
            break;


        // ==================================== SHIPPER COMPANY ===================================

        case customersConstants.SET_SHIPPER_COMPANIES:
            state = {
                ...state,
                shipperCompanies: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_INFO:
            state = {
                ...state,
                selectedShipperCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedLbShipperCompanyInfo: (state.selectedLbShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyInfo,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo,
                selectedLbConsigneeCompanyInfo: (state.selectedLbConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyInfo,
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_CONTACT:
            state = {
                ...state,
                selectedShipperCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_SEARCH:
            state = {
                ...state,
                shipperCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_NOTE:
            state = {
                ...state,
                selectedShipperCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedShipperCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                shipperCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                shipperCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                shipperCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                shipperCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                shipperCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_CONTACTS:
            state = {
                ...state,
                shipperCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                shipperCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                shipperCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedShipperCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_SHIPPER_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                shipperCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedShipperCompanyDocumentNote: action.payload
            }
            break;


        // ==================================== LB SHIPPER COMPANY ===================================

        case customersConstants.SET_LB_SHIPPER_COMPANIES:
            state = {
                ...state,
                lbShipperCompanies: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_INFO:
            state = {
                ...state,
                selectedLbShipperCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo,
                selectedLbConsigneeCompanyInfo: (state.selectedLbConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyInfo,
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_CONTACT:
            state = {
                ...state,
                selectedLbShipperCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_SEARCH:
            state = {
                ...state,
                lbShipperCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_NOTE:
            state = {
                ...state,
                selectedLbShipperCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedLbShipperCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                lbShipperCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                lbShipperCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                lbShipperCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                lbShipperCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                lbShipperCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_CONTACTS:
            state = {
                ...state,
                lbShipperCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                lbShipperCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                lbShipperCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedLbShipperCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
            }
            break;
        case customersConstants.SET_LB_SHIPPER_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                lbShipperCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_SHIPPER_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedLbShipperCompanyDocumentNote: action.payload
            }
            break;


        // ==================================== CONSIGNEE COMPANY ===================================

        case customersConstants.SET_CONSIGNEE_COMPANIES:
            state = {
                ...state,
                consigneeCompanies: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_INFO:
            state = {
                ...state,
                selectedConsigneeCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedLbConsigneeCompanyInfo: (state.selectedLbConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyInfo,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo,
                selectedLbShipperCompanyInfo: (state.selectedLbShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyInfo,
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_CONTACT:
            state = {
                ...state,
                selectedConsigneeCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedLbConsigneeCompanyContact: (state.selectedLbConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_SEARCH:
            state = {
                ...state,
                consigneeCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_NOTE:
            state = {
                ...state,
                selectedConsigneeCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedConsigneeCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                consigneeCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                consigneeCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                consigneeCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                consigneeCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                consigneeCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_CONTACTS:
            state = {
                ...state,
                consigneeCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                consigneeCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                consigneeCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedConsigneeCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedLbConsigneeCompanyDocument: (state.selectedLbConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbConsigneeCompanyDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
            }
            break;
        case customersConstants.SET_CONSIGNEE_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                consigneeCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedConsigneeCompanyDocumentNote: action.payload
            }
            break;

        case customersConstants.SET_CUSTOMER_OPENED_PANELS:
            state = {
                ...state,
                customerOpenedPanels: action.payload
            }
            break;


        // ==================================== LB CONSIGNEE COMPANY ===================================

        case customersConstants.SET_LB_CONSIGNEE_COMPANIES:
            state = {
                ...state,
                lbConsigneeCompanies: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_INFO:
            state = {
                ...state,
                selectedLbConsigneeCompanyInfo: action.payload,
                selectedCustomer: (state.selectedCustomer.id || 0) === action.payload.id ? action.payload : state.selectedCustomer,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo,
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedLbBillToCompanyInfo: (state.selectedLbBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyInfo,
                selectedInvoiceBillToCompanyInfo: (state.selectedInvoiceBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyInfo,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo,
                selectedLbShipperCompanyInfo: (state.selectedLbShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyInfo,
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_CONTACT:
            state = {
                ...state,
                selectedLbConsigneeCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedLbBillToCompanyContact: (state.selectedLbBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyContact,
                selectedInvoiceBillToCompanyContact: (state.selectedInvoiceBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedLbShipperCompanyContact: (state.selectedLbShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyContact,
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_SEARCH:
            state = {
                ...state,
                lbConsigneeCompanySearch: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_NOTE:
            state = {
                ...state,
                selectedLbConsigneeCompanyNote: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DIRECTION:
            state = {
                ...state,
                selectedLbConsigneeCompanyDirection: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                lbConsigneeCompanyContactSearch: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                lbConsigneeCompanyAutomaticEmailsTo: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                lbConsigneeCompanyAutomaticEmailsCc: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                lbConsigneeCompanyAutomaticEmailsBcc: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                lbConsigneeCompanyShowingContactList: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACTS:
            state = {
                ...state,
                lbConsigneeCompanyContacts: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_CONTACT_SEARCH_CUSTOMER:
            state = {
                ...state,
                lbConsigneeCompanyContactSearchCustomer: action.payload
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                lbConsigneeCompanyIsEditingContact: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedLbConsigneeCompanyDocument: action.payload,
                selectedDocument: (state.selectedDocument.id || 0) === action.payload.id ? action.payload : state.selectedDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument,
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedLbBillToCompanyDocument: (state.selectedLbBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbBillToCompanyDocument,
                selectedInvoiceBillToCompanyDocument: (state.selectedInvoiceBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedLbShipperCompanyDocument: (state.selectedLbShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedLbShipperCompanyDocument,
            }
            break;
        case customersConstants.SET_LB_CONSIGNEE_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                lbConsigneeCompanyDocumentTags: action.payload
            }
            break;
        case customersConstants.SET_LB_SELECTED_CONSIGNEE_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedLbConsigneeCompanyDocumentNote: action.payload
            }
            break;

        case customersConstants.SET_LB_CUSTOMER_OPENED_PANELS:
            state = {
                ...state,
                customerOpenedPanels: action.payload
            }
            break;


        // ==================================== PANELS ===================================

        case customersConstants.SET_CUSTOMER_PANELS:
            let count = -1;

            state = {
                ...state,
                panels: action.payload.map((p, i) => {
                    if (p.isOpened) {
                        count++;
                        p.pos = count;
                    } else {
                        p.pos = -1;
                    }
                    return p;
                })
            }
            break;
        default:
            break;
    }
    return state;
}