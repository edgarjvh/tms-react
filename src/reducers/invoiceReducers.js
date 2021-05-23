import { invoiceConstants } from './../constants';
import Documents from './../components/company/invoice/panels/documents/Documents.jsx';

export const invoiceReducers = (state = {
    invoiceOpenedPanels: [],
    panels: [
        {
            name: 'documents',
            component: <Documents title='Documents' tabTimes={42000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        }
    ]
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