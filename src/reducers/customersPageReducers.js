import { customerPageConstants } from './../constants';
import CustomerSearchPanel from './../components/company-pages/panels/CustomerSearchPanel';
import CustomerContactSearchPanel from './../components/company-pages/panels/CustomerContactSearchPanel';
import RevenueInformationPanel from './../components/company-pages/panels/RevenueInformationPanel';
import OrderHistoryPanel from './../components/company-pages/panels/OrderHistoryPanel';
import LaneHistoryPanel from './../components/company-pages/panels/LaneHistoryPanel';
import DocumentsPanel from './../components/company-pages/panels/DocumentsPanel';
import CustomerContactsPanel from './../components/company-pages/panels/CustomerContactsPanel';

export const customersPageReducers = (state = {
    customers: [],
    selectedCustomer: {},
    selectedContact: {},
    selectedNote: {},
    selectedDirection: {},
    contactSearch: {},
    automaticEmailsTo: '',
    automaticEmailsCc: '',
    automaticEmailsBcc: '',
    showingContactList: true,
    panels: [
        {
            name: 'customer-search',
            component: <CustomerSearchPanel title='Customer Search Results' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'customer-contacts',
            component: <CustomerContactsPanel title='Contacts' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'customer-contact-search',
            component: <CustomerContactSearchPanel title='Contact Search Results' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'revenue-information',
            component: <RevenueInformationPanel title='Revenue Information' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'order-history',
            component: <OrderHistoryPanel title='Order History' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'lane-history',
            component: <LaneHistoryPanel title='Lane History' />,
            isOpened: false,
            pos: -1
        },
        {
            name: 'documents',
            component: <DocumentsPanel title='Documents' />,
            isOpened: false,
            pos: -1
        }
    ]
}, action) => {
    switch (action.type) {
        case customerPageConstants.SET_CUSTOMERS:
            state = {
                ...state,
                customers: action.payload
            }
            break;
        case customerPageConstants.SET_SELECTED_CUSTOMER:
            state = {
                ...state,
                selectedCustomer: action.payload
            }
            break;
        case customerPageConstants.SET_SELECTED_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload
            }
            break;
        case customerPageConstants.SET_SELECTED_NOTE:
            state = {
                ...state,
                selectedNote: action.payload
            }
            break;
        case customerPageConstants.SET_SELECTED_DIRECTION:
            state = {
                ...state,
                selectedDirection: action.payload
            }
            break;
        case customerPageConstants.SET_CONTACT_SEARCH:
            state = {
                ...state,
                contactSearch: action.payload
            }
            break;
        case customerPageConstants.SET_AUTOMATIC_EMAILS_TO:
            state = {
                ...state,
                automaticEmailsTo: action.payload
            }
            break;
        case customerPageConstants.SET_AUTOMATIC_EMAILS_CC:
            state = {
                ...state,
                automaticEmailsCc: action.payload
            }
            break;
        case customerPageConstants.SET_AUTOMATIC_EMAILS_BCC:
            state = {
                ...state,
                automaticEmailsBcc: action.payload
            }
            break;
        case customerPageConstants.SET_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                showingContactList: action.payload
            }
            break;
        case customerPageConstants.SET_CUSTOMER_PANELS:
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