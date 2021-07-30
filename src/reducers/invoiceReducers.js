import { invoiceConstants } from './../constants';

export const invoiceReducers = (state = {
    invoiceOpenedPanels: [],
    selected_order: {},
    order_number: '',
    trip_number: '',

    internalNotes: [],
    selectedInternalNote: {},

    lb_selected_order: {},
    lb_order_number: '',
    lb_trip_number: '',

    lbInternalNotes: [],
    lbSelectedInternalNote: {},
}, action) => {
    switch (action.type) {
        case invoiceConstants.SET_SELECTED_DOCUMENT:
            state = {
                ...state,
                selectedDocument: action.payload
            }
            break;
        case invoiceConstants.SET_DOCUMENT_TAGS:
            state = {
                ...state,
                documentTags: action.payload
            }
            break;
        case invoiceConstants.SET_SELECTED_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedDocumentNote: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_OPENED_PANELS:
            state = {
                ...state,
                invoiceOpenedPanels: action.payload
            }
            break;

        case invoiceConstants.SET_INVOICE_SELECTED_ORDER:
            state = {
                ...state,
                selected_order: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_ORDER_NUMBER:
            state = {
                ...state,
                order_number: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_TRIP_NUMBER:
            state = {
                ...state,
                trip_number: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_OPENED_PANELS:
            state = {
                ...state,
                invoiceOpenedPanels: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_INTERNAL_NOTES:
            state = {
                ...state,
                internalNotes: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_SELECTED_INTERNAL_NOTE:
            state = {
                ...state,
                selectedInternalNote: action.payload
            }
            break;

        case invoiceConstants.SET_LB_INVOICE_SELECTED_ORDER:
            state = {
                ...state,
                lb_selected_order: action.payload
            }
            break;
        case invoiceConstants.SET_LB_INVOICE_ORDER_NUMBER:
            state = {
                ...state,
                lb_order_number: action.payload
            }
            break;
        case invoiceConstants.SET_LB_INVOICE_TRIP_NUMBER:
            state = {
                ...state,
                lb_trip_number: action.payload
            }
            break;
        case invoiceConstants.SET_INVOICE_OPENED_PANELS:
            state = {
                ...state,
                invoiceOpenedPanels: action.payload
            }
            break;
        case invoiceConstants.SET_LB_INVOICE_INTERNAL_NOTES:
            state = {
                ...state,
                lbInternalNotes: action.payload
            }
            break;
        case invoiceConstants.SET_LB_INVOICE_SELECTED_INTERNAL_NOTE:
            state = {
                ...state,
                lbSelectedInternalNote: action.payload
            }
            break;

        case invoiceConstants.SET_INVOICE_PANELS:
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