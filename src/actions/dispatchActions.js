import {dispatchConstants} from './../constants';

export const setDispatchPanels = panels => {
    return {
        type: dispatchConstants.SET_DISPATCH_PANELS,
        payload: panels
    }
}
export const setBillToCompanies = companies => {
    return {
        type: dispatchConstants.SET_BILL_TO_COMPANIES,
        payload: companies
    }
}
export const setSelectedBillToCompanyInfo = company => {
    return {
        type: dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_INFO,
        payload: company
    }
}
export const setSelectedBillToCompanyContact = contact => {
    return {
        type: dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedBillToCompanySearch = search => {
    return {
        type: dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_SEARCH,
        payload: search
    }
}
export const setShipperCompanies = companies => {
    return {
        type: dispatchConstants.SET_SHIPPER_COMPANIES,
        payload: companies
    }
}
export const setSelectedShipperCompanyInfo = company => {
    return {
        type: dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_INFO,
        payload: company
    }
}
export const setSelectedShipperCompanyContact = contact => {
    return {
        type: dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedShipperCompanySearch = search => {
    return {
        type: dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_SEARCH,
        payload: search
    }
}
export const setConsigneeCompanies = companies => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_COMPANIES,
        payload: companies
    }
}
export const setSelectedConsigneeCompanyInfo = company => {
    return {
        type: dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_INFO,
        payload: company
    }
}
export const setSelectedConsigneeCompanyContact = contact => {
    return {
        type: dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_CONTACT,
        payload: contact
    }
}
export const setSelectedConsigneeCompanySearch = search => {
    return {
        type: dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_SEARCH,
        payload: search
    }
}
export const setDispatchCarriers = carriers => {
    return {
        type: dispatchConstants.SET_CARRIERS,
        payload: carriers
    }
}
export const setDispatchSelectedCarrier = carrier => {
    return {
        type: dispatchConstants.SET_SELECTED_CARRIER,
        payload: carrier
    }
}
export const setDispatchSelectedCarrierContact = contact => {
    return {
        type: dispatchConstants.SET_SELECTED_CARRIER_CONTACT,
        payload: contact
    }
}
export const setAeNumber = number => {
    return {
        type: dispatchConstants.SET_AE_NUMBER,
        payload: number
    }
}
export const setOrderNumber = number => {
    return {
        type: dispatchConstants.SET_ORDER_NUMBER,
        payload: number
    }
}
export const setTripNumber = number => {
    return {
        type: dispatchConstants.SET_TRIP_NUMBER,
        payload: number
    }
}
export const setDivision = division => {
    return {
        type: dispatchConstants.SET_DIVISION,
        payload: division
    }
}
export const setLoadType = loadType => {
    return {
        type: dispatchConstants.SET_LOAD_TYPE,
        payload: loadType
    }
}
export const setTemplate = template => {
    return {
        type: dispatchConstants.SET_TEMPLATE,
        payload: template
    }
}
export const setPu1 = pu => {
    return {
        type: dispatchConstants.SET_PU1,
        payload: pu
    }
}
export const setPu2 = pu => {
    return {
        type: dispatchConstants.SET_PU2,
        payload: pu
    }
}
export const setPu3 = pu => {
    return {
        type: dispatchConstants.SET_PU3,
        payload: pu
    }
}
export const setPu4 = pu => {
    return {
        type: dispatchConstants.SET_PU4,
        payload: pu
    }
}
export const setPu5 = pu => {
    return {
        type: dispatchConstants.SET_PU5,
        payload: pu
    }
}
export const setDelivery1 = delivery => {
    return {
        type: dispatchConstants.SET_DELIVERY1,
        payload: delivery
    }
}
export const setDelivery2 = delivery => {
    return {
        type: dispatchConstants.SET_DELIVERY2,
        payload: delivery
    }
}
export const setDelivery3 = delivery => {
    return {
        type: dispatchConstants.SET_DELIVERY3,
        payload: delivery
    }
}
export const setDelivery4 = delivery => {
    return {
        type: dispatchConstants.SET_DELIVERY4,
        payload: delivery
    }
}
export const setDelivery5 = delivery => {
    return {
        type: dispatchConstants.SET_DELIVERY5,
        payload: delivery
    }
}
export const setShipperPuDate1 = puDate => {
    return {
        type: dispatchConstants.SET_SHIPPER_PU_DATE1,
        payload: puDate
    }
}
export const setShipperPuDate2 = puDate => {
    return {
        type: dispatchConstants.SET_SHIPPER_PU_DATE2,
        payload: puDate
    }
}
export const setShipperPuTime1 = puTime => {
    return {
        type: dispatchConstants.SET_SHIPPER_PU_TIME1,
        payload: puTime
    }
}
export const setShipperPuTime2 = puTime => {
    return {
        type: dispatchConstants.SET_SHIPPER_PU_TIME2,
        payload: puTime
    }
}
export const setShipperBolNumber = number => {
    return {
        type: dispatchConstants.SET_SHIPPER_BOL_NUMBER,
        payload: number
    }
}
export const setShipperPoNumber = number => {
    return {
        type: dispatchConstants.SET_SHIPPER_PO_NUMBER,
        payload: number
    }
}
export const setShipperRefNumber = number => {
    return {
        type: dispatchConstants.SET_SHIPPER_REF_NUMBER,
        payload: number
    }
}
export const setShipperSealNumber = number => {
    return {
        type: dispatchConstants.SET_SHIPPER_SEAL_NUMBER,
        payload: number
    }
}
export const setShipperSpecialInstructions = instructions => {
    return {
        type: dispatchConstants.SET_SHIPPER_SPECIAL_INSTRUCTIONS,
        payload: instructions
    }
}
export const setConsigneeDeliveryDate1 = date => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_DELIVERY_DATE1,
        payload: date
    }
}
export const setConsigneeDeliveryDate2 = date => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_DELIVERY_DATE2,
        payload: date
    }
}
export const setConsigneeDeliveryTime1 = time => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_DELIVERY_TIME1,
        payload: time
    }
}
export const setConsigneeDeliveryTime2 = time => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_DELIVERY_TIME2,
        payload: time
    }
}
export const setConsigneeSpecialInstructions = instructions => {
    return {
        type: dispatchConstants.SET_CONSIGNEE_SPECIAL_INSTRUCTIONS,
        payload: instructions
    }
}
export const setDispatchEvent = event => {
    return {
        type: dispatchConstants.SET_DISPATCH_EVENT,
        payload: event
    }
}
export const setDispatchEventLocation = eventLocation => {
    return {
        type: dispatchConstants.SET_DISPATCH_EVENT_LOCATION,
        payload: eventLocation
    }
}
export const setDispatchEventNotes = notes => {
    return {
        type: dispatchConstants.SET_DISPATCH_EVENT_NOTES,
        payload: notes
    }
}

export const setDispatchEvents = events => {
    return {
        type: dispatchConstants.SET_DISPATCH_EVENTS,
        payload: events
    }
}
export const setHazMat = bool => {
    return {
        type: dispatchConstants.SET_HAZMAT,
        payload: bool
    }
}
export const setExpedited = bool => {
    return {
        type: dispatchConstants.SET_EXPEDITED,
        payload: bool
    }
}
export const setNotesForCarrier = notes => {
    return {
        type: dispatchConstants.SET_NOTES_FOR_CARRIER,
        payload: notes
    }
}
export const setSelectedNoteForCarrier = note => {
    return {
        type: dispatchConstants.SET_SELECTED_NOTE_FOR_CARRIER,
        payload: note
    }
}
export const setInternalNotes = notes => {
    return {
        type: dispatchConstants.SET_INTERNAL_NOTES,
        payload: notes
    }
}
export const setSelectedInternalNote = note => {
    return {
        type: dispatchConstants.SET_SELECTED_INTERNAL_NOTE,
        payload: note
    }
}
export const setIsShowingShipperSecondPage = bool => {
    return {
        type: dispatchConstants.SET_IS_SHOWING_SHIPPER_SECOND_PAGE,
        payload: bool
    }
}
export const setIsShowingConsigneeSecondPage = bool => {
    return {
        type: dispatchConstants.SET_IS_SHOWING_CONSIGNEE_SECOND_PAGE,
        payload: bool
    }
}