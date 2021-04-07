import { dispatchConstants } from './../constants/';
import Documents from './../components/company/dispatch/panels/documents/Documents.jsx';

import BillToCompanyInfo from './../components/company/dispatch/panels/bill-to-company-info/BillToCompanyInfo.jsx';
import BillToCompanySearch from './../components/company/dispatch/panels/bill-to-company-search/BillToCompanySearch.jsx';
import BillToCompanyRevenueInformation from './../components/company/dispatch/panels/bill-to-company-revenue-information/BillToCompanyRevenueInformation.jsx';
import BillToCompanyOrderHistory from './../components/company/dispatch/panels/bill-to-company-order-history/BillToCompanyOrderHistory.jsx';
import BillToCompanyLaneHistory from './../components/company/dispatch/panels/bill-to-company-lane-history/BillToCompanyLaneHistory.jsx';
import BillToCompanyDocuments from './../components/company/dispatch/panels/bill-to-company-documents/BillToCompanyDocuments.jsx';
import BillToCompanyContactSearch from './../components/company/dispatch/panels/bill-to-company-contact-search/BillToCompanyContactSearch.jsx';
import BillToCompanyContacts from './../components/company/dispatch/panels/bill-to-company-contacts/BillToCompanyContacts.jsx';

import ShipperCompanyInfo from './../components/company/dispatch/panels/shipper-company-info/ShipperCompanyInfo.jsx';
import ShipperCompanySearch from './../components/company/dispatch/panels/shipper-company-search/ShipperCompanySearch.jsx';
import ShipperCompanyRevenueInformation from './../components/company/dispatch/panels/shipper-company-revenue-information/ShipperCompanyRevenueInformation.jsx';
import ShipperCompanyOrderHistory from './../components/company/dispatch/panels/shipper-company-order-history/ShipperCompanyOrderHistory.jsx';
import ShipperCompanyLaneHistory from './../components/company/dispatch/panels/shipper-company-lane-history/ShipperCompanyLaneHistory.jsx';
import ShipperCompanyDocuments from './../components/company/dispatch/panels/shipper-company-documents/ShipperCompanyDocuments.jsx';
import ShipperCompanyContactSearch from './../components/company/dispatch/panels/shipper-company-contact-search/ShipperCompanyContactSearch.jsx';
import ShipperCompanyContacts from './../components/company/dispatch/panels/shipper-company-contacts/ShipperCompanyContacts.jsx';

import ConsigneeCompanyInfo from './../components/company/dispatch/panels/consignee-company-info/ConsigneeCompanyInfo.jsx';
import ConsigneeCompanySearch from './../components/company/dispatch/panels/consignee-company-search/ConsigneeCompanySearch.jsx';
import ConsigneeCompanyRevenueInformation from './../components/company/dispatch/panels/consignee-company-revenue-information/ConsigneeCompanyRevenueInformation.jsx';
import ConsigneeCompanyOrderHistory from './../components/company/dispatch/panels/consignee-company-order-history/ConsigneeCompanyOrderHistory.jsx';
import ConsigneeCompanyLaneHistory from './../components/company/dispatch/panels/consignee-company-lane-history/ConsigneeCompanyLaneHistory.jsx';
import ConsigneeCompanyDocuments from './../components/company/dispatch/panels/consignee-company-documents/ConsigneeCompanyDocuments.jsx';
import ConsigneeCompanyContactSearch from './../components/company/dispatch/panels/consignee-company-contact-search/ConsigneeCompanyContactSearch.jsx';
import ConsigneeCompanyContacts from './../components/company/dispatch/panels/consignee-company-contacts/ConsigneeCompanyContacts.jsx';

import CarrierInfoFactoringCompanySearch from './../components/company/dispatch/panels/carrier-info-factoring-company-search/CarrierInfoFactoringCompanySearch.jsx';
import CarrierInfoFactoringCompany from './../components/company/dispatch/panels/carrier-info-factoring-company/CarrierInfoFactoringCompany.jsx';
import CarrierInfoFactoringCompanyPanelSearch from './../components/company/dispatch/panels/carrier-info-factoring-company-panel-search/CarrierInfoFactoringCompanyPanelSearch.jsx';
import CarrierInfoFactoringCompanyContacts from './../components/company/dispatch/panels/carrier-info-factoring-company-contacts/CarrierInfoFactoringCompanyContacts.jsx';
import CarrierInfoFactoringCompanyContactSearch from './../components/company/dispatch/panels/carrier-info-factoring-company-contact-search/CarrierInfoFactoringCompanyContactSearch.jsx';
import CarrierInfoFactoringCompanyDocuments from './../components/company/dispatch/panels/carrier-info-factoring-company-documents/CarrierInfoFactoringCompanyDocuments.jsx';
import CarrierInfoFactoringCompanyInvoiceSearch from './../components/company/dispatch/panels/carrier-info-factoring-company-invoice-search/CarrierInfoFactoringCompanyInvoiceSearch.jsx';
import CarrierInfoContactSearch from './../components/company/dispatch/panels/carrier-info-contact-search/CarrierInfoContactSearch.jsx';
import CarrierInfoContacts from './../components/company/dispatch/panels/carrier-info-contacts/CarrierInfoContacts.jsx';
import CarrierInfoSearch from './../components/company/dispatch/panels/carrier-info-search/CarrierInfoSearch.jsx';

import RatingScreen from './../components/company/dispatch/panels/rating-screen/RatingScreen.jsx';
import CarrierInfo from './../components/company/dispatch/panels/carrier-info/CarrierInfo.jsx';
import AdjustRate from './../components/company/dispatch/panels/adjust-rate/AdjustRate.jsx';
import Order from './../components/company/dispatch/panels/order/Order.jsx';
import LoadBoard from './../components/company/dispatch/panels/load-board/LoadBoard.jsx';
import Routing from './../components/company/dispatch/panels/routing/Routing.jsx';
import Bol from './../components/company/dispatch/panels/bol/Bol.jsx';
import RateConf from './../components/company/dispatch/panels/rate-conf/RateConf.jsx';

export const dispatchReducers = (state = {

    carriers: [],
    selectedCarrier: {},
    selectedCarrierContact: {},

    selected_order: {order_number: 0},
    

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
            component: <Documents title='Documents' tabTimes={27000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-info',
            component: <BillToCompanyInfo title='Bill To Company Info' tabTimes={28000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-search',
            component: <BillToCompanySearch title='Bill To Company Search' tabTimes={29000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },        
        {
            name: 'shipper-company-info',
            component: <ShipperCompanyInfo title='Shipper Company Info' tabTimes={30000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-search',
            component: <ShipperCompanySearch title='Shipper Company Search' tabTimes={31000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-info',
            component: <ConsigneeCompanyInfo title='Consignee Company Info' tabTimes={32000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-search',
            component: <ConsigneeCompanySearch title='Consignee Company Search' tabTimes={33000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'rating-screen',
            component: <RatingScreen title='Rating Screen' tabTimes={34000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info',
            component: <CarrierInfo title='Carrier Info' tabTimes={35000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'adjust-rate',
            component: <AdjustRate title='Adjust Rate' tabTimes={36000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'order',
            component: <Order title='Order' tabTimes={37000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'load-board',
            component: <LoadBoard title='Load Board' tabTimes={38000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'routing',
            component: <Routing title='Routing' tabTimes={39000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bol',
            component: <Bol title='BOL' tabTimes={40000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'rate-conf',
            component: <RateConf title='Rate Conf' tabTimes={41000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-revenue-information',
            component: <BillToCompanyRevenueInformation title='Revenue Information' tabTimes={42000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-order-history',
            component: <BillToCompanyOrderHistory title='Order History' tabTimes={43000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-lane-history',
            component: <BillToCompanyLaneHistory title='Lane History' tabTimes={44000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-documents',
            component: <BillToCompanyDocuments title='Documents' tabTimes={45000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-revenue-information',
            component: <ShipperCompanyRevenueInformation title='Revenue Information' tabTimes={46000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-order-history',
            component: <ShipperCompanyOrderHistory title='Order History' tabTimes={47000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-lane-history',
            component: <ShipperCompanyLaneHistory title='Lane History' tabTimes={48000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-documents',
            component: <ShipperCompanyDocuments title='Documents' tabTimes={49000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-revenue-information',
            component: <ConsigneeCompanyRevenueInformation title='Revenue Information' tabTimes={50000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-order-history',
            component: <ConsigneeCompanyOrderHistory title='Order History' tabTimes={51000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-lane-history',
            component: <ConsigneeCompanyLaneHistory title='Lane History' tabTimes={52000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-documents',
            component: <ConsigneeCompanyDocuments title='Documents' tabTimes={53000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-contact-search',
            component: <BillToCompanyContactSearch title='Contact Search Results' tabTimes={54000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'bill-to-company-contacts',
            component: <BillToCompanyContacts title='Contacts' tabTimes={55000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-contact-search',
            component: <ShipperCompanyContactSearch title='Contact Search Results' tabTimes={56000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'shipper-company-contacts',
            component: <ShipperCompanyContacts title='Contacts' tabTimes={57000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-contact-search',
            component: <ConsigneeCompanyContactSearch title='Contact Search Results' tabTimes={58000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'consignee-company-contacts',
            component: <ConsigneeCompanyContacts title='Contacts' tabTimes={59000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company-search',
            component: <CarrierInfoFactoringCompanySearch title='Factoring Company Search' tabTimes={60000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company',
            component: <CarrierInfoFactoringCompany title='Factoring Company' tabTimes={61000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 75
        },
        {
            name: 'carrier-info-factoring-company-panel-search',
            component: <CarrierInfoFactoringCompanyPanelSearch title='Factoring Company Search' tabTimes={62000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company-contacts',
            component: <CarrierInfoFactoringCompanyContacts title='Contacts' tabTimes={63000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company-contact-search',
            component: <CarrierInfoFactoringCompanyContactSearch title='Contact Search Results' tabTimes={64000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company-documents',
            component: <CarrierInfoFactoringCompanyDocuments title='Documents' tabTimes={65000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-factoring-company-invoice-search',
            component: <CarrierInfoFactoringCompanyInvoiceSearch title='Invoice Search Results' tabTimes={66000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-contact-search',
            component: <CarrierInfoContactSearch title='Contact Search Results' tabTimes={67000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-contacts',
            component: <CarrierInfoContacts title='Contacts' tabTimes={68000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
        {
            name: 'carrier-info-search',
            component: <CarrierInfoSearch title='Carrier Search Results' tabTimes={69000} />,
            isOpened: false,
            pos: -1,
            maxWidth: 100
        },
    ]
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
                selected_order: {...state.selected_order, division: action.payload.name}
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