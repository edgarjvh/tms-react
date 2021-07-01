import { carriersConstants } from '../constants';

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

    carrierOpenedPanels: [],

    // =============================== dispatch carrier info ===================================

    dispatchCarrierInfoCarriersChanging: [],
    dispatchCarrierInfoCarrierSearchChanging: [],

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

    // =============================== invoice carrier info ===================================

    invoiceCarrierInfoCarriersChanging: [],
    invoiceCarrierInfoCarrierSearchChanging: [],

    selectedInvoiceCarrierInfoCarrier: {},
    selectedInvoiceCarrierInfoContact: {},
    selectedInvoiceCarrierInfoNote: {},
    selectedInvoiceCarrierInfoDirection: {},
    invoiceCarrierInfoContactSearch: {},
    invoiceCarrierInfoFactoringCompanySearch: [],
    invoiceCarrierInfoFactoringCompanies: [],
    invoiceCarrierInfoFactoringCompanyContacts: [],
    selectedInvoiceCarrierInfoFactoringCompany: {},
    selectedInvoiceCarrierInfoFactoringCompanyContact: {},
    selectedInvoiceCarrierInfoFactoringCompanyContactSearch: { selectedInvoiceCarrierInfoContact: {} },
    selectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList: true,
    selectedInvoiceCarrierInfoFactoringCompanyNote: {},
    invoiceCarrierInfoFactoringCompanyIsEditingContact: false,
    invoiceCarrierInfoCarrierSearch: [],
    invoiceCarrierInfoShowingContactList: true,
    invoiceCarrierInfoContacts: [],
    invoiceCarrierInfoIsEditingContact: false,
    invoiceCarrierInfoContactSearchCarrier: { selectedInvoiceCarrierInfoContact: {} },
    selectedInvoiceCarrierInfoDocument: {},
    selectedInvoiceCarrierInfoDocumentNote: {},
    invoiceCarrierInfoDocumentTags: '',

    selectedInvoiceCarrierInfoFactoringCompanyInvoices: [],
    selectedInvoiceCarrierInfoFactoringCompanyInvoice: {},
    selectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList: true,
    selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch: { selectedInvoiceCarrierInfoFactoringCompanyInvoice: {} },

    selectedInvoiceCarrierInfoFactoringCompanyDocument: {},
    selectedInvoiceCarrierInfoFactoringCompanyDocumentNote: {},
    invoiceCarrierInfoFactoringCompanyDocumentTags: '',

    invoiceCarrierInfoDrivers: [],
    selectedInvoiceCarrierInfoDriver: {},
    invoiceCarrierInfoEquipments: [],
    selectedInvoiceCarrierInfoEquipment: {},
    invoiceCarrierInfoInsuranceTypes: [],
    selectedInvoiceCarrierInfoInsuranceType: {},
    invoiceCarrierInfoCarrierInsurances: [],
    selectedInvoiceCarrierInfoInsurance: {},
    invoiceCarrierInfoEquipmentInformation: {},

    // =============================== load board carrier info ===================================

    lbCarrierInfoCarriers: [],
    selectedLbCarrierInfoCarrier: {},
    selectedLbCarrierInfoContact: {},
    selectedLbCarrierInfoNote: {},
    selectedLbCarrierInfoDirection: {},
    lbCarrierInfoContactSearch: {},
    lbCarrierInfoFactoringCompanySearch: [],
    lbCarrierInfoFactoringCompanies: [],
    lbCarrierInfoFactoringCompanyContacts: [],
    selectedLbCarrierInfoFactoringCompany: {},
    selectedLbCarrierInfoFactoringCompanyContact: {},
    selectedLbCarrierInfoFactoringCompanyContactSearch: { selectedLbCarrierInfoContact: {} },
    selectedLbCarrierInfoFactoringCompanyIsShowingContactList: true,
    selectedLbCarrierInfoFactoringCompanyNote: {},
    lbCarrierInfoFactoringCompanyIsEditingContact: false,
    lbCarrierInfoCarrierSearch: [],
    lbCarrierInfoShowingContactList: true,
    lbCarrierInfoContacts: [],
    lbCarrierInfoIsEditingContact: false,
    lbCarrierInfoContactSearchCarrier: { selectedLbCarrierInfoContact: {} },
    selectedLbCarrierInfoDocument: {},
    selectedLbCarrierInfoDocumentNote: {},
    lbCarrierInfoDocumentTags: '',

    selectedLbCarrierInfoFactoringCompanyInvoices: [],
    selectedLbCarrierInfoFactoringCompanyInvoice: {},
    selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList: true,
    selectedLbCarrierInfoFactoringCompanyInvoiceSearch: { selectedLbCarrierInfoFactoringCompanyInvoice: {} },

    selectedLbCarrierInfoFactoringCompanyDocument: {},
    selectedLbCarrierInfoFactoringCompanyDocumentNote: {},
    lbCarrierInfoFactoringCompanyDocumentTags: '',

    lbCarrierInfoDrivers: [],
    selectedLbCarrierInfoDriver: {},
    lbCarrierInfoEquipments: [],
    selectedLbCarrierInfoEquipment: {},
    lbCarrierInfoInsuranceTypes: [],
    selectedLbCarrierInfoInsuranceType: {},
    lbCarrierInfoCarrierInsurances: [],
    selectedLbCarrierInfoInsurance: {},
    lbCarrierInfoEquipmentInformation: {},


    panels: []
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
                selectedLbCarrierInfoCarrier: (state.selectedLbCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoCarrier,
                selectedInvoiceCarrierInfoCarrier: (state.selectedInvoiceCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_CARRIER_CONTACT:
            state = {
                ...state,
                selectedContact: action.payload,
                selectedDispatchCarrierInfoContact: (state.selectedDispatchCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoContact,
                selectedLbCarrierInfoContact: (state.selectedLbCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoContact,
                selectedInvoiceCarrierInfoContact: (state.selectedInvoiceCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoContact,
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
                selectedLbCarrierInfoDriver: (state.selectedLbCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoDriver,
                selectedInvoiceCarrierInfoDriver: (state.selectedInvoiceCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoDriver,
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
                selectedLbCarrierInfoFactoringCompany: (state.selectedLbCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompany,
                selectedInvoiceCarrierInfoFactoringCompany: (state.selectedInvoiceCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompany,
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
                selectedLbCarrierInfoFactoringCompanyContact: (state.selectedLbCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompanyContact,
                selectedInvoiceCarrierInfoFactoringCompanyContact: (state.selectedInvoiceCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompanyContact,
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
                selectedLbCarrierInfoInsurance: (state.selectedLbCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoInsurance,
                selectedInvoiceCarrierInfoInsurance: (state.selectedInvoiceCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoInsurance,
            }
            break;

        case carriersConstants.SET_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                equipmentInformation: action.payload
            }
            break;



        // ======================= DISPATCH CARRIER INFO =========================
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIERS_CHANGING:
            state = {
                ...state,
                dispatchCarrierInfoCarriersChanging: action.payload
            }
            break;
        case carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_SEARCH_CHANGING:
            state = {
                ...state,
                dispatchCarrierInfoCarrierSearchChanging: action.payload
            }
            break;



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
                selectedLbCarrierInfoCarrier: (state.selectedLbCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoCarrier,
                selectedInvoiceCarrierInfoCarrier: (state.selectedInvoiceCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_CONTACT:
            state = {
                ...state,
                selectedDispatchCarrierInfoContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedLbCarrierInfoContact: (state.selectedLbCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoContact,
                selectedInvoiceCarrierInfoContact: (state.selectedInvoiceCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoContact,
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
                selectedLbCarrierInfoDriver: (state.selectedLbCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoDriver,
                selectedInvoiceCarrierInfoDriver: (state.selectedInvoiceCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoDriver,
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
                selectedLbCarrierInfoFactoringCompany: (state.selectedLbCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompany,
                selectedInvoiceCarrierInfoFactoringCompany: (state.selectedInvoiceCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompany,
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
                selectedLbCarrierInfoFactoringCompanyContact: (state.selectedLbCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompanyContact,
                selectedInvoiceCarrierInfoFactoringCompanyContact: (state.selectedInvoiceCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompanyContact,
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
                selectedLbCarrierInfoInsurance: (state.selectedLbCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoInsurance,
                selectedInvoiceCarrierInfoInsurance: (state.selectedInvoiceCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoInsurance,
            }
            break;

        case carriersConstants.SET_CARRIER_OPENED_PANELS:
            state = {
                ...state,
                carrierOpenedPanels: action.payload
            }
            break;

        case carriersConstants.SET_DISPATCH_CARRIER_INFO_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                dispatchCarrierInfoEquipmentInformation: action.payload
            }
            break;


        // ======================= INVOICE CARRIER INFO =========================
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIERS:
            state = {
                ...state,
                invoiceCarrierInfoCarriers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_CARRIER:
            state = {
                ...state,
                selectedInvoiceCarrierInfoCarrier: action.payload,
                selectedCarrier: (state.selectedCarrier.id || 0) === action.payload.id ? action.payload : state.selectedCarrier,
                selectedLbCarrierInfoCarrier: (state.selectedLbCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoCarrier,
                selectedDispatchCarrierInfoCarrier: (state.selectedDispatchCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_CONTACT:
            state = {
                ...state,
                selectedInvoiceCarrierInfoContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedLbCarrierInfoContact: (state.selectedLbCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoContact,
                selectedDispatchCarrierInfoContact: (state.selectedDispatchCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoContact,
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_NOTE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DIRECTION:
            state = {
                ...state,
                selectedInvoiceCarrierInfoDirection: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CONTACT_SEARCH:
            state = {
                ...state,
                invoiceCarrierInfoContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_SEARCH:
            state = {
                ...state,
                invoiceCarrierInfoCarrierSearch: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                invoiceCarrierInfoShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_CONTACTS:
            state = {
                ...state,
                invoiceCarrierInfoContacts: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_IS_EDITING_CONTACT:
            state = {
                ...state,
                invoiceCarrierInfoIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CONTACT_SEARCH_CARRIER:
            state = {
                ...state,
                invoiceCarrierInfoContactSearchCarrier: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DOCUMENT:
            state = {
                ...state,
                selectedInvoiceCarrierInfoDocument: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_DOCUMENT_TAGS:
            state = {
                ...state,
                invoiceCarrierInfoDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyDocument: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                invoiceCarrierInfoFactoringCompanyDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_DRIVERS:
            state = {
                ...state,
                invoiceCarrierInfoDrivers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DRIVER:
            state = {
                ...state,
                selectedInvoiceCarrierInfoDriver: action.payload,
                selectedDriver: (state.selectedDriver.id || 0) === action.payload.id ? action.payload : state.selectedDriver,
                selectedLbCarrierInfoDriver: (state.selectedLbCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoDriver,
                selectedDispatchCarrierInfoDriver: (state.selectedDispatchCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoDriver,
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_EQUIPMENTS:
            state = {
                ...state,
                invoiceCarrierInfoEquipments: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_INSURANCE_TYPES:
            state = {
                ...state,
                invoiceCarrierInfoInsuranceTypes: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_EQUIPMENT:
            state = {
                ...state,
                selectedInvoiceCarrierInfoEquipment: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_INSURANCE_TYPE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoInsuranceType: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_SEARCH:
            state = {
                ...state,
                invoiceCarrierInfoFactoringCompanySearch: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANIES:
            state = {
                ...state,
                invoiceCarrierInfoFactoringCompanies: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompany: action.payload,
                selectedFactoringCompany: (state.selectedFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompany,
                selectedLbCarrierInfoFactoringCompany: (state.selectedLbCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompany,
                selectedDispatchCarrierInfoFactoringCompany: (state.selectedDispatchCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompany,
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACTS:
            state = {
                ...state,
                invoiceCarrierInfoFactoringCompanyContacts: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACT:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyContact: action.payload,
                selectedFactoringCompanyContact: (state.selectedFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompanyContact,
                selectedLbCarrierInfoFactoringCompanyContact: (state.selectedLbCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoFactoringCompanyContact,
                selectedDispatchCarrierInfoFactoringCompanyContact: (state.selectedDispatchCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompanyContact,
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                invoiceCarrierInfoFactoringCompanyIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_NOTE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH:

            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICES:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyInvoices: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyInvoice: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST:
            state = {
                ...state,
                selectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList: action.payload,
                selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch: action.payload ? { selectedInvoiceCarrierInfoInvoice: {} } : state.selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch,
            }
            break;
        case carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_INSURANCES:
            state = {
                ...state,
                invoiceCarrierInfoCarrierInsurances: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_INSURANCE:
            state = {
                ...state,
                selectedInvoiceCarrierInfoInsurance: action.payload,
                selectedInsurance: (state.selectedInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInsurance,
                selectedLbCarrierInfoInsurance: (state.selectedLbCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedLbCarrierInfoInsurance,
                selectedDispatchCarrierInfoInsurance: (state.selectedDispatchCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoInsurance,
            }
            break;

        case carriersConstants.SET_CARRIER_OPENED_PANELS:
            state = {
                ...state,
                carrierOpenedPanels: action.payload
            }
            break;

        case carriersConstants.SET_INVOICE_CARRIER_INFO_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                invoiceCarrierInfoEquipmentInformation: action.payload
            }
            break;

        // ======================= LOAD BOARD CARRIER INFO =========================

        case carriersConstants.SET_LB_CARRIER_INFO_CARRIERS:
            state = {
                ...state,
                lbCarrierInfoCarriers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_CARRIER:
            state = {
                ...state,
                selectedLbCarrierInfoCarrier: action.payload,
                selectedCarrier: (state.selectedCarrier.id || 0) === action.payload.id ? action.payload : state.selectedCarrier,
                selectedDispatchCarrierInfoCarrier: (state.selectedDispatchCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoCarrier,
                selectedInvoiceCarrierInfoCarrier: (state.selectedInvoiceCarrierInfoCarrier.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoCarrier,
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_CONTACT:
            state = {
                ...state,
                selectedLbCarrierInfoContact: action.payload,
                selectedContact: (state.selectedContact.id || 0) === action.payload.id ? action.payload : state.selectedContact,
                selectedDispatchCarrierInfoContact: (state.selectedDispatchCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoContact,
                selectedInvoiceCarrierInfoContact: (state.selectedInvoiceCarrierInfoContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoContact,
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_NOTE:
            state = {
                ...state,
                selectedLbCarrierInfoNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DIRECTION:
            state = {
                ...state,
                selectedLbCarrierInfoDirection: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_CONTACT_SEARCH:
            state = {
                ...state,
                lbCarrierInfoContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_CARRIER_SEARCH:
            state = {
                ...state,
                lbCarrierInfoCarrierSearch: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                lbCarrierInfoShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_CARRIER_CONTACTS:
            state = {
                ...state,
                lbCarrierInfoContacts: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_IS_EDITING_CONTACT:
            state = {
                ...state,
                lbCarrierInfoIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_CONTACT_SEARCH_CARRIER:
            state = {
                ...state,
                lbCarrierInfoContactSearchCarrier: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DOCUMENT:
            state = {
                ...state,
                selectedLbCarrierInfoDocument: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_DOCUMENT_TAGS:
            state = {
                ...state,
                lbCarrierInfoDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedLbCarrierInfoDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyDocument: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS:
            state = {
                ...state,
                lbCarrierInfoFactoringCompanyDocumentTags: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyDocumentNote: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_DRIVERS:
            state = {
                ...state,
                lbCarrierInfoDrivers: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DRIVER:
            state = {
                ...state,
                selectedLbCarrierInfoDriver: action.payload,
                selectedDriver: (state.selectedDriver.id || 0) === action.payload.id ? action.payload : state.selectedDriver,
                selectedDispatchCarrierInfoDriver: (state.selectedDispatchCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoDriver,
                selectedInvoiceCarrierInfoDriver: (state.selectedInvoiceCarrierInfoDriver.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoDriver,
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_EQUIPMENTS:
            state = {
                ...state,
                lbCarrierInfoEquipments: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_INSURANCE_TYPES:
            state = {
                ...state,
                lbCarrierInfoInsuranceTypes: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_EQUIPMENT:
            state = {
                ...state,
                selectedLbCarrierInfoEquipment: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_INSURANCE_TYPE:
            state = {
                ...state,
                selectedLbCarrierInfoInsuranceType: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_SEARCH:
            state = {
                ...state,
                lbCarrierInfoFactoringCompanySearch: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANIES:
            state = {
                ...state,
                lbCarrierInfoFactoringCompanies: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompany: action.payload,
                selectedFactoringCompany: (state.selectedFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompany,
                selectedDispatchCarrierInfoFactoringCompany: (state.selectedDispatchCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompany,
                selectedInvoiceCarrierInfoFactoringCompany: (state.selectedInvoiceCarrierInfoFactoringCompany.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompany,
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACTS:
            state = {
                ...state,
                lbCarrierInfoFactoringCompanyContacts: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACT:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyContact: action.payload,
                selectedFactoringCompanyContact: (state.selectedFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedFactoringCompanyContact,
                selectedDispatchCarrierInfoFactoringCompanyContact: (state.selectedDispatchCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoFactoringCompanyContact,
                selectedInvoiceCarrierInfoFactoringCompanyContact: (state.selectedInvoiceCarrierInfoFactoringCompanyContact.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoFactoringCompanyContact,
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyContactSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyIsShowingContactList: action.payload
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT:
            state = {
                ...state,
                lbCarrierInfoFactoringCompanyIsEditingContact: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_NOTE:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyNote: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH:

            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyInvoiceSearch: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICES:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyInvoices: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICE:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyInvoice: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST:
            state = {
                ...state,
                selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList: action.payload,
                selectedLbCarrierInfoFactoringCompanyInvoiceSearch: action.payload ? { selectedLbCarrierInfoInvoice: {} } : state.selectedLbCarrierInfoFactoringCompanyInvoiceSearch,
            }
            break;
        case carriersConstants.SET_LB_CARRIER_INFO_CARRIER_INSURANCES:
            state = {
                ...state,
                lbCarrierInfoCarrierInsurances: action.payload
            }
            break;
        case carriersConstants.SET_SELECTED_LB_CARRIER_INFO_INSURANCE:
            state = {
                ...state,
                selectedLbCarrierInfoInsurance: action.payload,
                selectedInsurance: (state.selectedInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInsurance,
                selectedDispatchCarrierInfoInsurance: (state.selectedDispatchCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedDispatchCarrierInfoInsurance,
                selectedInvoiceCarrierInfoInsurance: (state.selectedInvoiceCarrierInfoInsurance.id || 0) === action.payload.id ? action.payload : state.selectedInvoiceCarrierInfoInsurance,
            }
            break;

        case carriersConstants.SET_LB_CARRIER_INFO_EQUIPMENT_INFORMATION:
            state = {
                ...state,
                lbCarrierInfoEquipmentInformation: action.payload
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