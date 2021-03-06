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
    panels: [
        {
            name: 'customer-search',
            component: <CustomerSearch title='Customer Search Results' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'customer-contacts',
            component: <Contacts title='Contacts' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'customer-contact-search',
            component: <ContactSearch title='Contact Search Results' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'revenue-information',
            component: <RevenueInformation title='Revenue Information' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'order-history',
            component: <OrderHistory title='Order History' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'lane-history',
            component: <LaneHistory title='Lane History' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'documents',
            component: <Documents title='Documents' />,
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
                selectedCustomer: action.payload
            }
            break;
        case customersConstants.SET_SELECTED_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload
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
                selectedDocument: action.payload
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