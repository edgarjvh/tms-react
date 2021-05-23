import {invoiceConstants} from './../constants';

export const setInvoicePanels = panels => {
    return {
        type: invoiceConstants.SET_INVOICE_PANELS,
        payload: panels
    }
}
export const setSelectedDocument = document => {
    return {
        type: invoiceConstants.SET_SELECTED_DOCUMENT,
        payload: document
    }
}
export const setDocumentTags = tags => {
    return {
        type: invoiceConstants.SET_DOCUMENT_TAGS,
        payload: tags
    }
}
export const setSelectedDocumentNote = note => {
    return {
        type: invoiceConstants.SET_SELECTED_DOCUMENT_NOTE,
        payload: note
    }
}
export const setInvoiceOpenedPanels = panels => {
    return {
        type: invoiceConstants.SET_INVOICE_OPENED_PANELS,
        payload: panels
    }
}