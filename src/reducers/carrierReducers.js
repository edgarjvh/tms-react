import { carriersConstants } from '../constants';
import CarrierSearch from './../components/company/carriers/panels/carrier-search/CarrierSearch.jsx';
import ContactSearch from './../components/company/carriers/panels/contact-search/ContactSearch.jsx';
import Contacts from './../components/company/carriers/panels/contacts/Contacts.jsx';
import FactoringCompanySearch from './../components/company/carriers/panels/factoring-company-search/FactoringCompanySearch.jsx';
import FactoringCompany from './../components/company/carriers/panels/factoring-company/FactoringCompany.jsx';
import Documents from './../components/company/carriers/panels/documents/Documents.jsx';
import RevenueInformation from './../components/company/carriers/panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from './../components/company/carriers/panels/order-history/OrderHistory.jsx';
import EquipmentInformation from './../components/company/carriers/panels/equipment-information/EquipmentInformation.jsx';

export const carrierReducers = (state = {
    carriers: [],
    selectedCarrier: {},
    selectedContact: {},
    selectedNote: {},
    selectedDirection: {},
    contactSearch: {},
    factoringCompanySearch: [],
    factoringCompanies: [],
    carrierSearch: [],
    showingContactList: true,
    contacts: [],
    isEditingContact: false,
    contactSearchCarrier: { selectedContact: {} },
    selectedDocument: {},
    documentTags: '',
    selectedDocumentNote: {},
    drivers: [],
    selectedDriver: {},
    equipments: [],
    selectedEquipment: {},
    insuranceTypes: [],
    selectedInsuranceType: {},
    carrierInsurances: [],
    selectedInsurance: {},
    selectedDocument: {},
    documentTags: '',
    selectedDocumentNote: {},
    equipmentInformation: {},
    panels: [
        {
            name: 'carrier-search',
            component: <CarrierSearch title='Carrier Search Results' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-contact-search',
            component: <ContactSearch title='Contact Search Results' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-contacts',
            component: <Contacts title='Contacts' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-factoring-company-search',
            component: <FactoringCompanySearch title='Factoring Company Search Results' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-factoring-company',
            component: <FactoringCompany title='Factoring Company' />,
            isOpened: false,
            pos: -1,
            maxWidth: 75
        },
        {
            name: 'documents',
            component: <Documents title='Documents' />,
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
            name: 'equipment-information',
            component: <EquipmentInformation title='Equipment Information' />,
            isOpened: false,
            pos: -1,
            maxWidth: 45
        }
    ]
}, action) => {
    switch (action.type) {
        case carriersConstants.SET_CARRIERS:
            state = {
                ...state,
                carriers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER:
            state = {
                ...state,
                selectedCarrier: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_NOTE:
            state = {
                ...state,
                selectedNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DIRECTION:
            state = {
                ...state,
                selectedDirection: action.payload
            }
            break;
        case carriersConstants.SET_CONTACT_SEARCH:
            state = {
                ...state,
                contactSearch: action.payload
            }
            break;
        case carriersConstants.SET_CARRIER_SEARCH:
            state = {
                ...state,
                carrierSearch: action.payload
            }
            break;
        case carriersConstants.SET_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                showingContactList: action.payload
            }
            break;
        case carriersConstants.SET_CARRIER_CONTACTS:
            state = {
                ...state,
                contacts: action.payload
            }
            break;
        case carriersConstants.SET_IS_EDITING_CONTACT:
            state = {
                ...state,
                isEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_CONTACT_SEARCH_CARRIER:
            state = {
                ...state,
                contactSearchCarrier: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DOCUMENT:
            state = {
                ...state,
                selectedDocument: action.payload
            }
            break;
        case carriersConstants.SET_DOCUMENT_TAGS:
            state = {
                ...state,
                documentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_DRIVERS:
            state = {
                ...state,
                drivers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DRIVER:
            state = {
                ...state,
                selectedDriver: action.payload
            }
            break;
        case carriersConstants.SET_EQUIPMENTS:
            state = {
                ...state,
                equipments: action.payload
            }
            break;
        case carriersConstants.SET_INSURANCE_TYPES:
            state = {
                ...state,
                insuranceTypes: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_EQUIPMENT:
            state = {
                ...state,
                selectedEquipment: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INSURANCE_TYPE:
            state = {
                ...state,
                selectedInsuranceType: action.payload
            }
            break;
        case carriersConstants.SET_FACTORING_COMPANY_SEARCH:
            state = {
                ...state,
                factoringCompanySearch: action.payload
            }
            break;
        case carriersConstants.SET_FACTORING_COMPANIES:
            state = {
                ...state,
                factoringCompanies: action.payload
            }
            break;
        case carriersConstants.SET_CARRIER_INSURANCES:
            state = {
                ...state,
                carrierInsurances: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INSURANCE:
            state = {
                ...state,
                selectedInsurance: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DOCUMENT:
            state = {
                ...state,
                selectedDocument: action.payload
            }
            break;
        case carriersConstants.SET_DOCUMENT_TAGS:
            state = {
                ...state,
                documentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                equipmentInformation: action.payload
            }
            break;
        case carriersConstants.SET_CARRIER_PANELS:
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