import { dispatchConstants } from './../constants/';
import Documents from './../components/company/dispatch/panels/documents/Documents.jsx';

export const dispatchReducers = (state = {

    carriers: [],
    selectedCarrier: {},
    selectedCarrierContact: {},

    selected_order: { order_number: 0 },

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
    dispatchEventDate: '',
    dispatchEventTime: '',
    dispatchEvents: [],
    hazMat: 0,
    expedited: 0,
    notesForCarrier: [],
    selectedNoteForCarrier: {},
    internalNotes: [],
    selectedInternalNote: {},
    isShowingShipperSecondPage: false,
    isShowingConsigneeSecondPage: false,
    orderSelectedPickup: {},
    isAddingPickup: false,
    isAddingDelivery: false,

    dispatchOpenedPanels: [],

    mileageLoaderVisible: false,

    selectedOrderDocument: {},
    orderDocumentTags: '',
    selectedOrderDocumentNote: {},

    lb_selected_order: { order_number: 0 },
    lb_order_number: '',
    lb_trip_number: '',
    lbMileageLoaderVisible: false,
    showingChangeCarrier: false,
    newCarrier: {},

}, action) => {
    switch (action.type) {
        case dispatchConstants.SET_SELECTED_ORDER:
            state = {
                ...state,
                selected_order: action.payload,
                order_number: action.payload.order_number,
                trip_number: action.payload.trip_number,
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
                division: action.payload,
                selected_order: { ...state.selected_order, division: action.payload.name }
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
        case dispatchConstants.SET_DISPATCH_EVENT_DATE:
            state = {
                ...state,
                dispatchEventDate: action.payload
            }
            break;
        case dispatchConstants.SET_DISPATCH_EVENT_TIME:
            state = {
                ...state,
                dispatchEventTime: action.payload
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

        case dispatchConstants.SET_DISPATCH_OPENED_PANELS:
            state = {
                ...state,
                dispatchOpenedPanels: action.payload
            }
            break;

        case dispatchConstants.SET_ORDER_SELECTED_PICKUP:
            state = {
                ...state,
                orderSelectedPickup: action.payload
            }
            break;

        case dispatchConstants.SET_IS_ADDING_PICKUP:
            state = {
                ...state,
                isAddingPickup: action.payload
            }
            break;

        case dispatchConstants.SET_IS_ADDING_DELIVERY:
            state = {
                ...state,
                isAddingDelivery: action.payload
            }
            break;

        case dispatchConstants.SET_MILEAGE_LOADER_VISIBLE:
            state = {
                ...state,
                mileageLoaderVisible: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_ORDER_DOCUMENT:
            state = {
                ...state,
                selectedOrderDocument: action.payload
            }
            break;
        case dispatchConstants.SET_ORDER_DOCUMENT_TAGS:
            state = {
                ...state,
                orderDocumentTags: action.payload
            }
            break;
        case dispatchConstants.SET_SELECTED_ORDER_DOCUMENT_NOTE:
            state = {
                ...state,
                selectedOrderDocumentNote: action.payload
            }
            break;
        case dispatchConstants.SET_LB_SELECTED_ORDER:
            state = {
                ...state,
                lb_selected_order: action.payload,
                lb_order_number: action.payload.order_number,
                lb_trip_number: action.payload.trip_number,
            }
            break;
        case dispatchConstants.SET_LB_ORDER_NUMBER:
            state = {
                ...state,
                lb_order_number: action.payload
            }
            break;
        case dispatchConstants.SET_LB_TRIP_NUMBER:
            state = {
                ...state,
                lb_trip_number: action.payload
            }
            break;
        case dispatchConstants.SET_LB_MILEAGE_LOADER_VISIBLE:
            state = {
                ...state,
                lbMileageLoaderVisible: action.payload
            }
            break;
        case dispatchConstants.SET_SHOWING_CHANGE_CARRIER:
            state = {
                ...state,
                showingChangeCarrier: action.payload
            }
            break;
        case dispatchConstants.SET_NEW_CARRIER:
            state = {
                ...state,
                newCarrier: action.payload
            }
            break;


        default:
            break;
    }
    return state;
}