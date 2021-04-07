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


// ============================== DISPATCH CARRIER INFO =================================

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