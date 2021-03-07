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
