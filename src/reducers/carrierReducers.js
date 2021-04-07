import { carriersConstants } from '../constants';
import CarrierSearch from './../components/company/carriers/panels/carrier-search/CarrierSearch.jsx';
import ContactSearch from './../components/company/carriers/panels/contact-search/ContactSearch.jsx';
import Contacts from './../components/company/carriers/panels/contacts/Contacts.jsx';
import FactoringCompanySearch from './../components/company/carriers/panels/factoring-company-search/FactoringCompanySearch.jsx';
import FactoringCompanyPanelSearch from './../components/company/carriers/panels/factoring-company-panel-search/FactoringCompanyPanelSearch.jsx';
import FactoringCompany from './../components/company/carriers/panels/factoring-company/FactoringCompany.jsx';
import Documents from './../components/company/carriers/panels/documents/Documents.jsx';
import RevenueInformation from './../components/company/carriers/panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from './../components/company/carriers/panels/order-history/OrderHistory.jsx';
import EquipmentInformation from './../components/company/carriers/panels/equipment-information/EquipmentInformation.jsx';
import FactoringCompanyContacts from './../components/company/carriers/panels/factoring-company-contacts/FactoringCompanyContacts.jsx';
import FactoringCompanyContactSearch from './../components/company/carriers/panels/factoring-company-contact-search/FactoringCompanyContactSearch.jsx';
import FactoringCompanyInvoiceSearch from './../components/company/carriers/panels/factoring-company-invoice-search/FactoringCompanyInvoiceSearch.jsx';
import FactoringCompanyDocuments from './../components/company/carriers/panels/factoring-company-documents/FactoringCompanyDocuments.jsx';

export const carrierReducers = (state = {
    carriers: [],
    selectedCarrier: {},
    selectedContact: {},
    selectedNote: {},
    selectedDirection: {},
    contactSearch: {},
    factoringCompanySearch: [],
    factoringCompanies: [],
    factoringCompanyContacts: [],
    selectedFactoringCompany: {},
    selectedFactoringCompanyContact: {},
    selectedFactoringCompanyContactSearch: { selectedContact: {} },
    selectedFactoringCompanyIsShowingContactList: true,
    selectedFactoringCompanyNote: {},
    factoringCompanyIsEditingContact: false,
    carrierSearch: [],
    showingContactList: true,
    contacts: [],
    isEditingContact: false,
    contactSearchCarrier: { selectedContact: {} },
    selectedDocument: {},
    selectedDocumentNote: {},
    documentTags: '',

    selectedFactoringCompanyInvoices: [],
    selectedFactoringCompanyInvoice: {},
    selectedFactoringCompanyIsShowingInvoiceList: true,
    selectedFactoringCompanyInvoiceSearch: { selectedInvoice: {} },

    selectedFactoringCompanyDocument: {},
    selectedFactoringCompanyDocumentNote: {},
    factoringCompanyDocumentTags: '',

    drivers: [],
    selectedDriver: {},
    equipments: [],
    selectedEquipment: {},
    insuranceTypes: [],
    selectedInsuranceType: {},
    carrierInsurances: [],
    selectedInsurance: {},
    equipmentInformation: {},

    // =============================== dispatch carrier info ===================================

    dispatchCarrierInfoCarriers: [],
    selectedDispatchCarrierInfoCarrier: {},
    selectedDispatchCarrierInfoContact: {},
    selectedDispatchCarrierInfoNote: {},
    selectedDispatchCarrierInfoDirection: {},
    dispatchCarrierInfoContactSearch: {},
    dispatchCarrierInfoFactoringCompanySearch: [],
    dispatchCarrierInfoFactoringCompanies: [],
    dispatchCarrierInfoFactoringCompanyContacts: [],
    selectedDispatchCarrierInfoFactoringCompany: {},
    selectedDispatchCarrierInfoFactoringCompanyContact: {},
    selectedDispatchCarrierInfoFactoringCompanyContactSearch: { selectedDispatchCarrierInfoContact: {} },
    selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList: true,
    selectedDispatchCarrierInfoFactoringCompanyNote: {},
    dispatchCarrierInfoFactoringCompanyIsEditingContact: false,
    dispatchCarrierInfoCarrierSearch: [],
    dispatchCarrierInfoShowingContactList: true,
    dispatchCarrierInfoContacts: [],
    dispatchCarrierInfoIsEditingContact: false,
    dispatchCarrierInfoContactSearchCarrier: { selectedDispatchCarrierInfoContact: {} },
    selectedDispatchCarrierInfoDocument: {},
    selectedDispatchCarrierInfoDocumentNote: {},
    dispatchCarrierInfoDocumentTags: '',

    selectedDispatchCarrierInfoFactoringCompanyInvoices: [],
    selectedDispatchCarrierInfoFactoringCompanyInvoice: {},
    selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList: true,
    selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch: { selectedDispatchCarrierInfoFactoringCompanyInvoice: {} },

    selectedDispatchCarrierInfoFactoringCompanyDocument: {},
    selectedDispatchCarrierInfoFactoringCompanyDocumentNote: {},
    dispatchCarrierInfoFactoringCompanyDocumentTags: '',

    dispatchCarrierInfoDrivers: [],
    selectedDispatchCarrierInfoDriver: {},
    dispatchCarrierInfoEquipments: [],
    selectedDispatchCarrierInfoEquipment: {},
    dispatchCarrierInfoInsuranceTypes: [],
    selectedDispatchCarrierInfoInsuranceType: {},
    dispatchCarrierInfoCarrierInsurances: [],
    selectedDispatchCarrierInfoInsurance: {},
    dispatchCarrierInfoEquipmentInformation: {},

    panels: [
        {
            name: 'carrier-search',
            component: <CarrierSearch title='Carrier Search Results' tabTimes={6000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-contact-search',
            component: <ContactSearch title='Contact Search Results' tabTimes={7000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-contacts',
            component: <Contacts title='Contacts' tabTimes={8000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-factoring-company-search',
            component: <FactoringCompanySearch title='Factoring Company Search Results' tabTimes={9000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-factoring-company-panel-search',
            component: <FactoringCompanyPanelSearch title='Factoring Company Search Results' tabTimes={10000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-factoring-company',
            component: <FactoringCompany title='Factoring Company' tabTimes={11000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 75
        },
        {
            name: 'documents',
            component: <Documents title='Documents' tabTimes={12000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'revenue-information',
            component: <RevenueInformation title='Revenue Information' tabTimes={13000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'order-history',
            component: <OrderHistory title='Order History' tabTimes={14000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'equipment-information',
            component: <EquipmentInformation title='Equipment Information' tabTimes={15000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 45
        },
        {
            name: 'factoring-company-contacts',
            component: <FactoringCompanyContacts title='Contacts' tabTimes={16000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'factoring-company-contact-search',
            component: <FactoringCompanyContactSearch title='Factoring Company Contact Search Results' tabTimes={17000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'factoring-company-invoice-search',
            component: <FactoringCompanyInvoiceSearch title='Factoring Company Invoice Search Results' tabTimes={18000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'factoring-company-documents',
            component: <FactoringCompanyDocuments title='Documents' tabTimes={19000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
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
                selectedCarrier: action.payload,
                selectedDispatchCarrierInfoCarrier: (state.selectedDispatchCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload,
                selectedDispatchCarrierInfoContact: (state.selectedDispatchCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoContact,
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER_NOTE:
            state = {
                ...state,
                selectedNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER_DIRECTION:
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
        case carriersConstants.SET_SHOWING_CARRIER_CONTACT_LIST:
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
        case carriersConstants.SET_SELECTED_CARRIER_DOCUMENT:
            state = {
                ...state,
                selectedDocument: action.payload
            }
            break;
        case carriersConstants.SET_CARRIER_DOCUMENT_TAGS:
            state = {
                ...state,
                documentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedFactoringCompanyDocument: action.payload
            }
            break;
        case carriersConstants.SET_FACTORING_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                factoringCompanyDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedFactoringCompanyDocumentNote: action.payload
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
                selectedDriver: action.payload,
                selectedDispatchCarrierInfoDriver: (state.selectedDispatchCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoDriver,
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
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY:
            state = {
                ...state,
                selectedFactoringCompany: action.payload,
                selectedDispatchCarrierInfoFactoringCompany: (state.selectedDispatchCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompany,
            }
            break;
        case carriersConstants.SET_FACTORING_COMPANY_CONTACTS:
            state = {
                ...state,
                factoringCompanyContacts: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_CONTACT:
            state = {
                ...state,
                selectedFactoringCompanyContact: action.payload,
                selectedDispatchCarrierInfoFactoringCompanyContact: (state.selectedDispatchCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompanyContact,
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                selectedFactoringCompanyContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                selectedFactoringCompanyIsShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_FACTORING_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                factoringCompanyIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_NOTE:
            state = {
                ...state,
                selectedFactoringCompanyNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICE_SEARCH:

            state = {
                ...state,
                selectedFactoringCompanyInvoiceSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICES:
            state = {
                ...state,
                selectedFactoringCompanyInvoices: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICE:
            state = {
                ...state,
                selectedFactoringCompanyInvoice: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST:
            state = {
                ...state,
                selectedFactoringCompanyIsShowingInvoiceList: action.payload,
                selectedFactoringCompanyInvoiceSearch: action.payload ? { selectedInvoice: {} } : state.selectedFactoringCompanyInvoiceSearch,
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
                selectedInsurance: action.payload,
                selectedDispatchCarrierInfoInsurance: (state.selectedDispatchCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoInsurance,
            }
            break;

        case carriersConstants.SET_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                equipmentInformation: action.payload
            }
            break;



        // ======================= DISPATCH CARRIER INFO =========================

        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIERS:
            state = {
                ...state,
                dispatchCarrierInfoCarriers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_CARRIER:
            state = {
                ...state,
                selectedDispatchCarrierInfoCarrier: action.payload,
                selectedCarrier: (state.selectedCarrier.id || 0) === action.payload.id ? action.payload : state.selectedCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_CONTACT:
            state = {
                ...state,
                selectedDispatchCarrierInfoContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_NOTE:
            state = {
                ...state,
                selectedDispatchCarrierInfoNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DIRECTION:
            state = {
                ...state,
                selectedDispatchCarrierInfoDirection: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CONTACT_SEARCH:
            state = {
                ...state,
                dispatchCarrierInfoContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_SEARCH:
            state = {
                ...state,
                dispatchCarrierInfoCarrierSearch: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                dispatchCarrierInfoShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_CONTACTS:
            state = {
                ...state,
                dispatchCarrierInfoContacts: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_IS_EDITING_CONTACT:
            state = {
                ...state,
                dispatchCarrierInfoIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CONTACT_SEARCH_CARRIER:
            state = {
                ...state,
                dispatchCarrierInfoContactSearchCarrier: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DOCUMENT:
            state = {
                ...state,
                selectedDispatchCarrierInfoDocument: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_DOCUMENT_TAGS:
            state = {
                ...state,
                dispatchCarrierInfoDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDispatchCarrierInfoDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyDocument: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                dispatchCarrierInfoFactoringCompanyDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_DRIVERS:
            state = {
                ...state,
                dispatchCarrierInfoDrivers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DRIVER:
            state = {
                ...state,
                selectedDispatchCarrierInfoDriver: action.payload,
                selectedDriver: (state.selectedDriver.id || 0) === action.payload.id ? action.payload : state.selectedDriver,
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_EQUIPMENTS:
            state = {
                ...state,
                dispatchCarrierInfoEquipments: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_INSURANCE_TYPES:
            state = {
                ...state,
                dispatchCarrierInfoInsuranceTypes: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_EQUIPMENT:
            state = {
                ...state,
                selectedDispatchCarrierInfoEquipment: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_INSURANCE_TYPE:
            state = {
                ...state,
                selectedDispatchCarrierInfoInsuranceType: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_SEARCH:
            state = {
                ...state,
                dispatchCarrierInfoFactoringCompanySearch: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANIES:
            state = {
                ...state,
                dispatchCarrierInfoFactoringCompanies: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompany: action.payload,
                selectedFactoringCompany: (state.selectedFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompany,
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACTS:
            state = {
                ...state,
                dispatchCarrierInfoFactoringCompanyContacts: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACT:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyContact: action.payload,
                selectedFactoringCompanyContact: (state.selectedFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompanyContact,
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                dispatchCarrierInfoFactoringCompanyIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_NOTE:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH:

            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICES:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyInvoices: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICE:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyInvoice: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST:
            state = {
                ...state,
                selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList: action.payload,
                selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch: action.payload ? { selectedDispatchCarrierInfoInvoice: {} } : state.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_INSURANCES:
            state = {
                ...state,
                dispatchCarrierInfoCarrierInsurances: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_INSURANCE:
            state = {
                ...state,
                selectedDispatchCarrierInfoInsurance: action.payload,
                selectedInsurance: (state.selectedInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInsurance,
            }
            break;

        case carriersConstants.SET_DISPATCH_CARRIER_INFO_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                dispatchCarrierInfoEquipmentInformation: action.payload
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