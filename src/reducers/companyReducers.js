import { companyConstants } from '../constants';

export const companyReducers = (state = {
    pages: [
        'dispatch',
        'customer',
        'carrier',
        'load board',
        'invoice'
    ],
    selectedPageIndex: -1,
    mainCompanyScreenFocused: true,
    dispatchScreenFocused: false,
    customerScreenFocused: false,
    carrierScreenFocused: false,
    loadBoardScreenFocused: false,
    invoiceScreenFocused: false,
}, action) => {
    switch (action.type) {
        case companyConstants.SET_PAGES:
            state = {
                ...state,
                pages: action.payload
            }
            break;
        case companyConstants.SET_SELECTED_PAGE_INDEX:
            state = {
                ...state,
                selectedPageIndex: action.payload
            }
            break;

        case companyConstants.SET_MAIN_COMPANY_SCREEN_FOCUSED:
            state = {
                ...state,
                mainCompanyScreenFocused: action.payload,
                dispatchScreenFocused: action.payload ? false : state.dispatchScreenFocused,
                customerScreenFocused: action.payload ? false : state.customerScreenFocused,
                carrierScreenFocused: action.payload ? false : state.carrierScreenFocused,
                loadBoardScreenFocused: action.payload ? false : state.loadBoardScreenFocused,
                invoiceScreenFocused: action.payload ? false : state.invoiceScreenFocused,
            }
            break;
        case companyConstants.SET_DISPATCH_SCREEN_FOCUSED:
            state = {
                ...state,
                dispatchScreenFocused: action.payload,
                mainCompanyScreenFocused: action.payload ? false : state.mainCompanyScreenFocused,
                customerScreenFocused: action.payload ? false : state.customerScreenFocused,
                carrierScreenFocused: action.payload ? false : state.carrierScreenFocused,
                loadBoardScreenFocused: action.payload ? false : state.loadBoardScreenFocused,
                invoiceScreenFocused: action.payload ? false : state.invoiceScreenFocused,
            }
            break;
        case companyConstants.SET_CUSTOMER_SCREEN_FOCUSED:
            state = {
                ...state,
                customerScreenFocused: action.payload,
                mainCompanyScreenFocused: action.payload ? false : state.mainCompanyScreenFocused,
                dispatchScreenFocused: action.payload ? false : state.dispatchScreenFocused,
                carrierScreenFocused: action.payload ? false : state.carrierScreenFocused,
                loadBoardScreenFocused: action.payload ? false : state.loadBoardScreenFocused,
                invoiceScreenFocused: action.payload ? false : state.invoiceScreenFocused,
            }
            break;
        case companyConstants.SET_CARRIER_SCREEN_FOCUSED:
            state = {
                ...state,
                carrierScreenFocused: action.payload,
                mainCompanyScreenFocused: action.payload ? false : state.mainCompanyScreenFocused,
                dispatchScreenFocused: action.payload ? false : state.dispatchScreenFocused,
                customerScreenFocused: action.payload ? false : state.customerScreenFocused,
                loadBoardScreenFocused: action.payload ? false : state.loadBoardScreenFocused,
                invoiceScreenFocused: action.payload ? false : state.invoiceScreenFocused,
            }
            break;
        case companyConstants.SET_LOAD_BOARD_SCREEN_FOCUSED:
            state = {
                ...state,
                loadBoardScreenFocused: action.payload,
                mainCompanyScreenFocused: action.payload ? false : state.mainCompanyScreenFocused,
                dispatchScreenFocused: action.payload ? false : state.dispatchScreenFocused,
                customerScreenFocused: action.payload ? false : state.customerScreenFocused,
                carrierScreenFocused: action.payload ? false : state.carrierScreenFocused,
                invoiceScreenFocused: action.payload ? false : state.invoiceScreenFocused,
            }
            break;
        case companyConstants.SET_INVOICE_SCREEN_FOCUSED:
            state = {
                ...state,
                invoiceScreenFocused: action.payload,
                mainCompanyScreenFocused: action.payload ? false : state.mainCompanyScreenFocused,
                dispatchScreenFocused: action.payload ? false : state.dispatchScreenFocused,
                customerScreenFocused: action.payload ? false : state.customerScreenFocused,
                carrierScreenFocused: action.payload ? false : state.carrierScreenFocused,
                loadBoardScreenFocused: action.payload ? false : state.loadBoardScreenFocused,
            }
            break;
        default:
            break;
    }
    return state;
}