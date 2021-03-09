import {carriersConstants} from './../constants';

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
export const setCarrierPanels = panels => {
    return {
        type: carriersConstants.SET_CARRIER_PANELS,
        payload: panels
    }
}
export const setSelectedContact = contact => {
    return {
        type: carriersConstants.SET_SELECTED_CONTACT,
        payload: contact
    }
}
export const setSelectedNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_NOTE,
        payload: note
    }
}
export const setSelectedDirection = direction => {
    return {
        type: carriersConstants.SET_SELECTED_DIRECTION,
        payload: direction
    }
}
export const setContactSearch = contactSearch => {
    return {
        type: carriersConstants.SET_CONTACT_SEARCH,
        payload: contactSearch
    }
}
export const setShowingContactList = show => {
    return {
        type: carriersConstants.SET_SHOWING_CONTACT_LIST,
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
export const setSelectedDocument = document => {
    return {
        type: carriersConstants.SET_SELECTED_DOCUMENT,
        payload: document
    }
}
export const setDocumentTags = tags => {
    return {
        type: carriersConstants.SET_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedDocumentNote = note => {
    return {
        type: carriersConstants.SET_SELECTED_DOCUMENT_NOTE,
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
