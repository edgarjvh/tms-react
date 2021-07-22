import {carriersConstants} from './../constants';

export const setCarrierPanels = panels => {
    return {
        type: carriersConstants.SET_CARRIER_PANELS,
        payload: panels
    }
}
export const setCarriers = carriers => {
    return {
        type: carriersConstants.SET_CARRIERS,
        payload: carriers
    }
}
export const setSelectedCarrier = carrier => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER,
        payload: carrier
    }
}
export const setSelectedCarrierContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER_CONTACT,
        payload: contact
    }
}
export const setSelectedCarrierNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER_NOTE,
        payload: note
    }
}
export const setSelectedCarrierDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER_DIRECTION,
        payload: direction
    }
}
export const setContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setShowingCarrierContactList = show => {
    return {
        type: carriersConstants.SET_SHOWING_CARRIER_CONTACT_LIST,
        payload: show
    }
}
export const setCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedCarrierDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER_DOCUMENT,
        payload: document
    }
}
export const setCarrierDocumentTags = tags => {
    return {
        type: carriersConstants.SET_CARRIER_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedCarrierDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CARRIER_DOCUMENT_NOTE,
        payload: note
    }
}
export const setSelectedFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setDrivers = drivers => {
    return {
        type: carriersConstants.SET_DRIVERS,
        payload: drivers
    }
}
export const setSelectedDriver = driver => {
    return {
        type: carriersConstants.SET_SELECTED_DRIVER,
        payload: driver
    }
}
export const setEquipments = equipments => {
    return {
        type: carriersConstants.SET_EQUIPMENTS,
        payload: equipments
    }
}
export const setInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setSelectedEquipment = equipment => {
    return {
        type: carriersConstants.SET_SELECTED_EQUIPMENT,
        payload: equipment
    }
}
export const setSelectedInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_SELECTED_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setSelectedFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setSelectedFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setSelectedFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setSelectedFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedFactoringCompanyInvoiceSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICE_SEARCH,
        payload: search
    }
}
export const setSelectedFactoringCompanyInvoices = invoices => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICES,
        payload: invoices
    }
}
export const setSelectedFactoringCompanyInvoice = invoice => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_INVOICE,
        payload: invoice
    }
}
export const setSelectedFactoringCompanyIsShowingInvoiceList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST,
        payload: bool
    }
}
export const setCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setSelectedInsurance = insurance => {
    return {
        type: carriersConstants.SET_SELECTED_INSURANCE,
        payload: insurance
    }
}
export const setEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_EQUIPMENT_INFORMATION,
        payload: info
    }
}


// ================================= ADMIN ====================================

export const setAdminCarrierPanels = panels => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_PANELS,
        payload: panels
    }
}
export const setAdminCarriers = carriers => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIERS,
        payload: carriers
    }
}
export const setAdminSelectedCarrier = carrier => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER,
        payload: carrier
    }
}
export const setAdminSelectedCarrierContact = contact => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER_CONTACT,
        payload: contact
    }
}
export const setAdminSelectedCarrierNote = note => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER_NOTE,
        payload: note
    }
}
export const setAdminSelectedCarrierDirection = direction => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER_DIRECTION,
        payload: direction
    }
}
export const setAdminContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_ADMIN_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setAdminShowingCarrierContactList = show => {
    return {
        type: carriersConstants.SET_ADMIN_SHOWING_CARRIER_CONTACT_LIST,
        payload: show
    }
}
export const setAdminCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setAdminCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setAdminContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_ADMIN_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setAdminIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_ADMIN_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setAdminSelectedCarrierDocument = document => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER_DOCUMENT,
        payload: document
    }
}
export const setAdminCarrierDocumentTags = tags => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setAdminSelectedCarrierDocumentNote = note => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_CARRIER_DOCUMENT_NOTE,
        payload: note
    }
}
export const setAdminSelectedFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setAdminFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_ADMIN_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setAdminSelectedFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setAdminDrivers = drivers => {
    return {
        type: carriersConstants.SET_ADMIN_DRIVERS,
        payload: drivers
    }
}
export const setAdminSelectedDriver = driver => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_DRIVER,
        payload: driver
    }
}
export const setAdminEquipments = equipments => {
    return {
        type: carriersConstants.SET_ADMIN_EQUIPMENTS,
        payload: equipments
    }
}
export const setAdminInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_ADMIN_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setAdminSelectedEquipment = equipment => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_EQUIPMENT,
        payload: equipment
    }
}
export const setAdminSelectedInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setAdminFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_ADMIN_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setAdminFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_ADMIN_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setAdminSelectedFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setAdminSelectedFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setAdminSelectedFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setAdminSelectedFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setAdminFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_ADMIN_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setAdminFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_ADMIN_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setAdminSelectedFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setAdminSelectedFactoringCompanyInvoiceSearch = search => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_INVOICE_SEARCH,
        payload: search
    }
}
export const setAdminSelectedFactoringCompanyInvoices = invoices => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_INVOICES,
        payload: invoices
    }
}
export const setAdminSelectedFactoringCompanyInvoice = invoice => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_INVOICE,
        payload: invoice
    }
}
export const setAdminSelectedFactoringCompanyIsShowingInvoiceList = bool => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST,
        payload: bool
    }
}
export const setAdminCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setAdminSelectedInsurance = insurance => {
    return {
        type: carriersConstants.SET_ADMIN_SELECTED_INSURANCE,
        payload: insurance
    }
}
export const setAdminEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_ADMIN_EQUIPMENT_INFORMATION,
        payload: info
    }
}

// ================================= ADMIN ====================================


// ============================== DISPATCH CARRIER INFO =================================
export const setDispatchCarrierInfoCarriersChanging = carriers => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIERS_CHANGING,
        payload: carriers
    }
}
export const setDispatchCarrierInfoCarrierSearchChanging = carrierSearch => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_SEARCH_CHANGING,
        payload: carrierSearch
    }
}


export const setDispatchCarrierInfoCarriers = carriers => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIERS,
        payload: carriers
    }
}
export const setSelectedDispatchCarrierInfoCarrier = carrier => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_CARRIER,
        payload: carrier
    }
}
export const setSelectedDispatchCarrierInfoContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_CONTACT,
        payload: contact
    }
}
export const setSelectedDispatchCarrierInfoNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_NOTE,
        payload: note
    }
}
export const setSelectedDispatchCarrierInfoDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DIRECTION,
        payload: direction
    }
}
export const setDispatchCarrierInfoContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setDispatchCarrierInfoShowingContactList = show => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setDispatchCarrierInfoCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setDispatchCarrierInfoCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setDispatchCarrierInfoContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setDispatchCarrierInfoIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedDispatchCarrierInfoDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DOCUMENT,
        payload: document
    }
}
export const setDispatchCarrierInfoDocumentTags = tags => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedDispatchCarrierInfoDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DOCUMENT_NOTE,
        payload: note
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setDispatchCarrierInfoFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setDispatchCarrierInfoDrivers = drivers => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_DRIVERS,
        payload: drivers
    }
}
export const setSelectedDispatchCarrierInfoDriver = driver => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_DRIVER,
        payload: driver
    }
}
export const setDispatchCarrierInfoEquipments = equipments => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_EQUIPMENTS,
        payload: equipments
    }
}
export const setDispatchCarrierInfoInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setSelectedDispatchCarrierInfoEquipment = equipment => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_EQUIPMENT,
        payload: equipment
    }
}
export const setSelectedDispatchCarrierInfoInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setDispatchCarrierInfoFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setDispatchCarrierInfoFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setDispatchCarrierInfoFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setDispatchCarrierInfoFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH,
        payload: search
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyInvoices = invoices => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICES,
        payload: invoices
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyInvoice = invoice => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_INVOICE,
        payload: invoice
    }
}
export const setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST,
        payload: bool
    }
}
export const setDispatchCarrierInfoCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setSelectedDispatchCarrierInfoInsurance = insurance => {
    return {
        type: carriersConstants.SET_SELECTED_DISPATCH_CARRIER_INFO_INSURANCE,
        payload: insurance
    }
}
export const setDispatchCarrierInfoEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_DISPATCH_CARRIER_INFO_EQUIPMENT_INFORMATION,
        payload: info
    }
}


// ============================== INVOICE CARRIER INFO =================================

export const setInvoiceCarrierInfoCarriers = carriers => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIERS,
        payload: carriers
    }
}
export const setSelectedInvoiceCarrierInfoCarrier = carrier => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_CARRIER,
        payload: carrier
    }
}
export const setSelectedInvoiceCarrierInfoContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_CONTACT,
        payload: contact
    }
}
export const setSelectedInvoiceCarrierInfoNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_NOTE,
        payload: note
    }
}
export const setSelectedInvoiceCarrierInfoDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DIRECTION,
        payload: direction
    }
}
export const setInvoiceCarrierInfoContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setInvoiceCarrierInfoShowingContactList = show => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setInvoiceCarrierInfoCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setInvoiceCarrierInfoCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setInvoiceCarrierInfoContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setInvoiceCarrierInfoIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedInvoiceCarrierInfoDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DOCUMENT,
        payload: document
    }
}
export const setInvoiceCarrierInfoDocumentTags = tags => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedInvoiceCarrierInfoDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DOCUMENT_NOTE,
        payload: note
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setInvoiceCarrierInfoFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setInvoiceCarrierInfoDrivers = drivers => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_DRIVERS,
        payload: drivers
    }
}
export const setSelectedInvoiceCarrierInfoDriver = driver => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_DRIVER,
        payload: driver
    }
}
export const setInvoiceCarrierInfoEquipments = equipments => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_EQUIPMENTS,
        payload: equipments
    }
}
export const setInvoiceCarrierInfoInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setSelectedInvoiceCarrierInfoEquipment = equipment => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_EQUIPMENT,
        payload: equipment
    }
}
export const setSelectedInvoiceCarrierInfoInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setInvoiceCarrierInfoFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setInvoiceCarrierInfoFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setInvoiceCarrierInfoFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setInvoiceCarrierInfoFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH,
        payload: search
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyInvoices = invoices => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICES,
        payload: invoices
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyInvoice = invoice => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_INVOICE,
        payload: invoice
    }
}
export const setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST,
        payload: bool
    }
}
export const setInvoiceCarrierInfoCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setSelectedInvoiceCarrierInfoInsurance = insurance => {
    return {
        type: carriersConstants.SET_SELECTED_INVOICE_CARRIER_INFO_INSURANCE,
        payload: insurance
    }
}
export const setInvoiceCarrierInfoEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_INVOICE_CARRIER_INFO_EQUIPMENT_INFORMATION,
        payload: info
    }
}

// ============================== CUSTOMER CARRIER INFO =================================

export const setCustomerCarrierInfoCarriers = carriers => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CARRIERS,
        payload: carriers
    }
}
export const setSelectedCustomerCarrierInfoCarrier = carrier => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_CARRIER,
        payload: carrier
    }
}
export const setSelectedCustomerCarrierInfoContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_CONTACT,
        payload: contact
    }
}
export const setSelectedCustomerCarrierInfoNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_NOTE,
        payload: note
    }
}
export const setSelectedCustomerCarrierInfoDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_DIRECTION,
        payload: direction
    }
}
export const setCustomerCarrierInfoContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setCustomerCarrierInfoShowingContactList = show => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setCustomerCarrierInfoCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setCustomerCarrierInfoCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setCustomerCarrierInfoContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setCustomerCarrierInfoIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedCustomerCarrierInfoDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_DOCUMENT,
        payload: document
    }
}
export const setCustomerCarrierInfoDocumentTags = tags => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedCustomerCarrierInfoDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_DOCUMENT_NOTE,
        payload: note
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setCustomerCarrierInfoFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setCustomerCarrierInfoDrivers = drivers => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_DRIVERS,
        payload: drivers
    }
}
export const setSelectedCustomerCarrierInfoDriver = driver => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_DRIVER,
        payload: driver
    }
}
export const setCustomerCarrierInfoEquipments = equipments => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_EQUIPMENTS,
        payload: equipments
    }
}
export const setCustomerCarrierInfoInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setSelectedCustomerCarrierInfoEquipment = equipment => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_EQUIPMENT,
        payload: equipment
    }
}
export const setSelectedCustomerCarrierInfoInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setCustomerCarrierInfoFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setCustomerCarrierInfoFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setCustomerCarrierInfoFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setCustomerCarrierInfoFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyCustomerSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CUSTOMER_SEARCH,
        payload: search
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyCustomers = invoices => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CUSTOMERS,
        payload: invoices
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyCustomer = invoice => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_CUSTOMER,
        payload: invoice
    }
}
export const setSelectedCustomerCarrierInfoFactoringCompanyIsShowingCustomerList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CUSTOMER_LIST,
        payload: bool
    }
}
export const setCustomerCarrierInfoCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setSelectedCustomerCarrierInfoInsurance = insurance => {
    return {
        type: carriersConstants.SET_SELECTED_CUSTOMER_CARRIER_INFO_INSURANCE,
        payload: insurance
    }
}
export const setCustomerCarrierInfoEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_CUSTOMER_CARRIER_INFO_EQUIPMENT_INFORMATION,
        payload: info
    }
}

// ============================== LOAD BOARD CARRIER INFO =================================

export const setLbCarrierInfoCarriers = carriers => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CARRIERS,
        payload: carriers
    }
}
export const setSelectedLbCarrierInfoCarrier = carrier => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_CARRIER,
        payload: carrier
    }
}
export const setSelectedLbCarrierInfoContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_CONTACT,
        payload: contact
    }
}
export const setSelectedLbCarrierInfoNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_NOTE,
        payload: note
    }
}
export const setSelectedLbCarrierInfoDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DIRECTION,
        payload: direction
    }
}
export const setLbCarrierInfoContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setLbCarrierInfoShowingContactList = show => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_SHOWING_CONTACT_LIST,
        payload: show
    }
}
export const setLbCarrierInfoCarrierSearch = carrierSearch => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CARRIER_SEARCH,
        payload: carrierSearch
    }
}
export const setLbCarrierInfoCarrierContacts = contacts => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CARRIER_CONTACTS,
        payload: contacts
    }
}
export const setLbCarrierInfoContactSearchCarrier = carrier => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CONTACT_SEARCH_CARRIER,
        payload: carrier
    }
}
export const setLbCarrierInfoIsEditingContact = isEditing => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_IS_EDITING_CONTACT,
        payload: isEditing
    }
}
export const setSelectedLbCarrierInfoDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DOCUMENT,
        payload: document
    }
}
export const setLbCarrierInfoDocumentTags = tags => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedLbCarrierInfoDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DOCUMENT_NOTE,
        payload: note
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT,
        payload: document
    }
}
export const setLbCarrierInfoFactoringCompanyDocumentTags = tags => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_DOCUMENT_NOTE,
        payload: note
    }
}
export const setLbCarrierInfoDrivers = drivers => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_DRIVERS,
        payload: drivers
    }
}
export const setSelectedLbCarrierInfoDriver = driver => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_DRIVER,
        payload: driver
    }
}
export const setLbCarrierInfoEquipments = equipments => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_EQUIPMENTS,
        payload: equipments
    }
}
export const setLbCarrierInfoInsuranceTypes = insuranceTypes => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_INSURANCE_TYPES,
        payload: insuranceTypes
    }
}
export const setSelectedLbCarrierInfoEquipment = equipment => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_EQUIPMENT,
        payload: equipment
    }
}
export const setSelectedLbCarrierInfoInsuranceType = insuranceType => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_INSURANCE_TYPE,
        payload: insuranceType
    }
}
export const setLbCarrierInfoFactoringCompanySearch = factoringCompanySearch => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_SEARCH,
        payload: factoringCompanySearch
    }
}
export const setLbCarrierInfoFactoringCompanies = factoringCompanies => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANIES,
        payload: factoringCompanies
    }
}
export const setSelectedLbCarrierInfoFactoringCompany = factoringCompany => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY,
        payload: factoringCompany
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyContactSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACT_SEARCH,
        payload: search
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_CONTACT_LIST,
        payload: bool
    }
}
export const setLbCarrierInfoFactoringCompanyContacts = contacts => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_CONTACTS,
        payload: contacts
    }
}
export const setLbCarrierInfoFactoringCompanyIsEditingContact = bool => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_FACTORING_COMPANY_IS_EDITING_CONTACT,
        payload: bool
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_NOTE,
        payload: note
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch = search => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICE_SEARCH,
        payload: search
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyInvoices = invoices => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICES,
        payload: invoices
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyInvoice = invoice => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_INVOICE,
        payload: invoice
    }
}
export const setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList = bool => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_FACTORING_COMPANY_IS_SHOWING_INVOICE_LIST,
        payload: bool
    }
}
export const setLbCarrierInfoCarrierInsurances = insurances => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_CARRIER_INSURANCES,
        payload: insurances
    }
}
export const setSelectedLbCarrierInfoInsurance = insurance => {
    return {
        type: carriersConstants.SET_SELECTED_LB_CARRIER_INFO_INSURANCE,
        payload: insurance
    }
}
export const setLbCarrierInfoEquipmentInformation = info => {
    return {
        type: carriersConstants.SET_LB_CARRIER_INFO_EQUIPMENT_INFORMATION,
        payload: info
    }
}
export const setCarrierOpenedPanels = panels => {
    return {
        type: carriersConstants.SET_CARRIER_OPENED_PANELS,
        payload: panels
    }
}
export const setAdminCarrierOpenedPanels = panels => {
    return {
        type: carriersConstants.SET_ADMIN_CARRIER_OPENED_PANELS,
        payload: panels
    }
}