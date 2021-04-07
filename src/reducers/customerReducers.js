import { customersConstants } from '../constants';
import CustomerSearch from '../components/company/customers/panels/customer-search/CustomerSearch.jsx';
import ContactSearch from '../components/company/customers/panels/contact-search/ContactSearch.jsx';
import RevenueInformation from '../components/company/customers/panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from '../components/company/customers/panels/order-history/OrderHistory.jsx';
import LaneHistory from '../components/company/customers/panels/lane-history/LaneHistory.jsx';
import Documents from '../components/company/customers/panels/documents/Documents.jsx';
import Contacts from '../components/company/customers/panels/contacts/Contacts.jsx';

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


    panels: [
        {
            name: 'customer-search',
            component: <CustomerSearch title='Customer Search Results' tabTimes={20000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'customer-contacts',
            component: <Contacts title='Contacts' tabTimes={21000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'customer-contact-search',
            component: <ContactSearch title='Contact Search Results' tabTimes={22000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'revenue-information',
            component: <RevenueInformation title='Revenue Information' tabTimes={23000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'order-history',
            component: <OrderHistory title='Order History' tabTimes={24000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'lane-history',
            component: <LaneHistory title='Lane History' tabTimes={25000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'documents',
            component: <Documents title='Documents' tabTimes={26000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        }
    ]
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
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo
            }
            break;
        case customersConstants.SET_SELECTED_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact
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
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument
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
                selectedShipperCompanyDirection: (state.selectedShipperCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDirection,
                selectedConsigneeCompanyDirection: (state.selectedConsigneeCompanyDirection.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDirection
            }
            break;
        case customersConstants.SET_SELECTED_BILL_TO_COMPANY_CONTACT:
            state = {
                ...state,
                selectedBillToCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact
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
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument
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
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedConsigneeCompanyInfo: (state.selectedConsigneeCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyInfo
            }
            break;
        case customersConstants.SET_SELECTED_SHIPPER_COMPANY_CONTACT:
            state = {
                ...state,
                selectedShipperCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedConsigneeCompanyContact: (state.selectedConsigneeCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyContact
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
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedConsigneeCompanyDocument: (state.selectedConsigneeCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedConsigneeCompanyDocument
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
                selectedBillToCompanyInfo: (state.selectedBillToCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyInfo,
                selectedShipperCompanyInfo: (state.selectedShipperCompanyInfo.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyInfo
            }
            break;
        case customersConstants.SET_SELECTED_CONSIGNEE_COMPANY_CONTACT:
            state = {
                ...state,
                selectedConsigneeCompanyContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedBillToCompanyContact: (state.selectedBillToCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyContact,
                selectedShipperCompanyContact: (state.selectedShipperCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyContact
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
                selectedBillToCompanyDocument: (state.selectedBillToCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedBillToCompanyDocument,
                selectedShipperCompanyDocument: (state.selectedShipperCompanyDocument.id || 0) === action.payload.id ? action.payload : state.selectedShipperCompanyDocument
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