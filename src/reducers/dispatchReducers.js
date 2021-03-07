import { dispatchConstants } from './../constants/';
import Documents from './../components/company/dispatch/panels/documents/Documents.jsx';
import BillToCompanyInfo from './../components/company/dispatch/panels/bill-to-company-info/BillToCompanyInfo.jsx';
import BillToCompanySearch from './../components/company/dispatch/panels/bill-to-company-search/BillToCompanySearch.jsx';
import ShipperCompanyInfo from './../components/company/dispatch/panels/shipper-company-info/ShipperCompanyInfo.jsx';
import ShipperCompanySearch from './../components/company/dispatch/panels/shipper-company-search/ShipperCompanySearch.jsx';
import ConsigneeCompanyInfo from './../components/company/dispatch/panels/consignee-company-info/ConsigneeCompanyInfo.jsx';
import ConsigneeCompanySearch from './../components/company/dispatch/panels/consignee-company-search/ConsigneeCompanySearch.jsx';
import RatingScreen from './../components/company/dispatch/panels/rating-screen/RatingScreen.jsx';
import CarrierInfo from './../components/company/dispatch/panels/carrier-info/CarrierInfo.jsx';
import AdjustRate from './../components/company/dispatch/panels/adjust-rate/AdjustRate.jsx';
import Order from './../components/company/dispatch/panels/order/Order.jsx';
import LoadBoard from './../components/company/dispatch/panels/load-board/LoadBoard.jsx';
import Routing from './../components/company/dispatch/panels/routing/Routing.jsx';
import Bol from './../components/company/dispatch/panels/bol/Bol.jsx';
import RateConf from './../components/company/dispatch/panels/rate-conf/RateConf.jsx';

export const dispatchReducers = (state = {
    billToCompanies: [],
    selectedBillToCompanyInfo: {},
    selectedBillToCompanyContact: {},
    selectedBillToCompanySearch: [],
    carriers: [],
    selectedCarrier: {},
    selectedCarrierContact: {},
    shipperCompanies: [],
    selectedShipperCompanyInfo: {},
    selectedShipperCompanyContact: {},
    selectedShipperCompanySearch: [],
    consigneeCompanies: [],
    selectedConsigneeCompanyInfo: {},
    selectedConsigneeCompanyContact: {},
    selectedConsigneeCompanySearch: [],
    ae_number: '',
    order_number: '',
    trip_number: '',
    division: {},
    load_type: {},
    template: {},
    pu1: '',
    pu2: '',
    pu3: '',
    pu4: '',
    pu5: '',
    delivery1: '',
    delivery2: '',
    delivery3: '',
    delivery4: '',
    delivery5: '',
    shipperPuDate1: '',
    shipperPuDate2: '',
    shipperPuTime1: '',
    shipperPuTime2: '',
    shipperBolNumber: '',
    shipperPoNumber: '',
    shipperRefNumber: '',
    shipperSealNumber: '',
    shipperSpecialInstructions: '',
    consigneeDeliveryDate1: '',
    consigneeDeliveryDate2: '',
    consigneeDeliveryTime1: '',
    consigneeDeliveryTime2: '',
    consigneeSpecialInstructions: '',
    dispatchEvent: {},
    dispatchEventLocation: '',
    dispatchEventNotes: '',
    dispatchEvents: [],
    hazMat: 0,
    expedited: 0,
    notesForCarrier: [],
    selectedNoteForCarrier: {},
    internalNotes: [],
    selectedInternalNote: {},
    isShowingShipperSecondPage: false,
    isShowingConsigneeSecondPage: false,
    panels: [
        {
            name: 'documents',
            component: <Documents title='Documents' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-info',
            component: <BillToCompanyInfo title='Bill To Company Info' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-search',
            component: <BillToCompanySearch title='Bill To Company Search' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-info',
            component: <ShipperCompanyInfo title='Shipper Company Info' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-search',
            component: <ShipperCompanySearch title='Shipper Company Search' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-info',
            component: <ConsigneeCompanyInfo title='Consignee Company Info' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-search',
            component: <ConsigneeCompanySearch title='Consignee Company Search' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'rating-screen',
            component: <RatingScreen title='Rating Screen' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info',
            component: <CarrierInfo title='Carrier Info' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'adjust-rate',
            component: <AdjustRate title='Adjust Rate' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'order',
            component: <Order title='Order' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'load-board',
            component: <LoadBoard title='Load Board' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'routing',
            component: <Routing title='Routing' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bol',
            component: <Bol title='BOL' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'rate-conf',
            component: <RateConf title='Rate Conf' />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        }
    ]
}, action) => {
    switch (action.type) {
        case dispatchConstants.SET_BILL_TO_COMPANIES:
            state = {
                ...state,
                billToCompanies: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_INFO:
            state = {
                ...state,
                selectedBillToCompanyInfo: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_CONTACT:
            state = {
                ...state,
                selectedBillToCompanyContact: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_BILL_TO_COMPANY_SEARCH:
            state = {
                ...state,
                selectedBillToCompanySearch: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_COMPANIES:
            state = {
                ...state,
                shipperCompanies: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_INFO:
            state = {
                ...state,
                selectedShipperCompanyInfo: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_CONTACT:
            state = {
                ...state,
                selectedShipperCompanyContact: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_SHIPPER_COMPANY_SEARCH:
            state = {
                ...state,
                selectedShipperCompanySearch: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_COMPANIES:
            state = {
                ...state,
                consigneeCompanies: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_INFO:
            state = {
                ...state,
                selectedConsigneeCompanyInfo: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_CONTACT:
            state = {
                ...state,
                selectedConsigneeCompanyContact: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_CONSIGNEE_COMPANY_SEARCH:
            state = {
                ...state,
                selectedConsigneeCompanySearch: action.payload
            }
            break;
        case dispatchConstants.SET_CARRIERS:
            state = {
                ...state,
                carriers: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_CARRIER_CONTACT:
            state = {
                ...state,
                selectedCarrierContact: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_CARRIER:
            state = {
                ...state,
                selectedCarrier: action.payload
            }
            break;
        case dispatchConstants.SET_AE_NUMBER:
            state = {
                ...state,
                ae_number: action.payload
            }
            break;
        case dispatchConstants.SET_ORDER_NUMBER:
            state = {
                ...state,
                order_number: action.payload
            }
            break;
        case dispatchConstants.SET_TRIP_NUMBER:
            state = {
                ...state,
                trip_number: action.payload
            }
            break;
        case dispatchConstants.SET_DIVISION:
            state = {
                ...state,
                division: action.payload
            }
            break;
        case dispatchConstants.SET_LOAD_TYPE:
            state = {
                ...state,
                load_type: action.payload
            }
            break;
        case dispatchConstants.SET_TEMPLATE:
            state = {
                ...state,
                template: action.payload
            }
            break;
        case dispatchConstants.SET_PU1:
            state = {
                ...state,
                pu1: action.payload
            }
            break;
        case dispatchConstants.SET_PU2:
            state = {
                ...state,
                pu2: action.payload
            }
            break;
        case dispatchConstants.SET_PU3:
            state = {
                ...state,
                pu3: action.payload
            }
            break;
        case dispatchConstants.SET_PU4:
            state = {
                ...state,
                pu4: action.payload
            }
            break;
        case dispatchConstants.SET_PU5:
            state = {
                ...state,
                pu5: action.payload
            }
            break;
        case dispatchConstants.SET_DELIVERY1:
            state = {
                ...state,
                delivery1: action.payload
            }
            break;
        case dispatchConstants.SET_DELIVERY2:
            state = {
                ...state,
                delivery2: action.payload
            }
            break;
        case dispatchConstants.SET_DELIVERY3:
            state = {
                ...state,
                delivery3: action.payload
            }
            break;
        case dispatchConstants.SET_DELIVERY4:
            state = {
                ...state,
                delivery4: action.payload
            }
            break;
        case dispatchConstants.SET_DELIVERY5:
            state = {
                ...state,
                delivery5: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_PU_DATE1:
            state = {
                ...state,
                shipperPuDate1: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_PU_DATE2:
            state = {
                ...state,
                shipperPuDate2: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_PU_TIME1:
            state = {
                ...state,
                shipperPuTime1: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_PU_TIME2:
            state = {
                ...state,
                shipperPuTime2: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_BOL_NUMBER:
            state = {
                ...state,
                shipperBolNumber: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_PO_NUMBER:
            state = {
                ...state,
                shipperPoNumber: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_REF_NUMBER:
            state = {
                ...state,
                shipperRefNumber: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_SEAL_NUMBER:
            state = {
                ...state,
                shipperSealNumber: action.payload
            }
            break;
        case dispatchConstants.SET_SHIPPER_SPECIAL_INSTRUCTIONS:
            state = {
                ...state,
                shipperSpecialInstructions: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_DELIVERY_DATE1:
            state = {
                ...state,
                consigneeDeliveryDate1: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_DELIVERY_DATE2:
            state = {
                ...state,
                consigneeDeliveryDate2: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_DELIVERY_TIME1:
            state = {
                ...state,
                consigneeDeliveryTime1: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_DELIVERY_TIME2:
            state = {
                ...state,
                consigneeDeliveryTime2: action.payload
            }
            break;
        case dispatchConstants.SET_CONSIGNEE_SPECIAL_INSTRUCTIONS:
            state = {
                ...state,
                consigneeSpecialInstructions: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_EVENT:
            state = {
                ...state,
                dispatchEvent: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_EVENT_LOCATION:
            state = {
                ...state,
                dispatchEventLocation: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_EVENT_NOTES:
            state = {
                ...state,
                dispatchEventNotes: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_EVENTS:
            state = {
                ...state,
                dispatchEvents: action.payload
            }
            break;
        case dispatchConstants.SET_HAZMAT:
            state = {
                ...state,
                hazMat: action.payload
            }
            break;
        case dispatchConstants.SET_EXPEDITED:
            state = {
                ...state,
                expedited: action.payload
            }
            break;
        case dispatchConstants.SET_NOTES_FOR_CARRIER:
            state = {
                ...state,
                notesForCarrier: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_NOTE_FOR_CARRIER:
            state = {
                ...state,
                selectedNoteForCarrier: action.payload
            }
            break;
        case dispatchConstants.SET_INTERNAL_NOTES:
            state = {
                ...state,
                internalNotes: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_INTERNAL_NOTE:
            state = {
                ...state,
                selectedInternalNote: action.payload
            }
            break;
        case dispatchConstants.SET_IS_SHOWING_SHIPPER_SECOND_PAGE:
            state = {
                ...state,
                isShowingShipperSecondPage: action.payload
            }
            break;
        case dispatchConstants.SET_IS_SHOWING_CONSIGNEE_SECOND_PAGE:
            state = {
                ...state,
                isShowingConsigneeSecondPage: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_PANELS:
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