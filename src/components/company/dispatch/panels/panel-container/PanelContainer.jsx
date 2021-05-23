import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import { setDispatchPanels, setDispatchOpenedPanels } from '../../../../../actions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';
import { Rnd } from 'react-rnd';

import BillToCompanyInfo from './../bill-to-company-info/BillToCompanyInfo.jsx';
import BillToCompanySearch from './../bill-to-company-search/BillToCompanySearch.jsx';
import BillToCompanyRevenueInformation from './../bill-to-company-revenue-information/BillToCompanyRevenueInformation.jsx';
import BillToCompanyOrderHistory from './../bill-to-company-order-history/BillToCompanyOrderHistory.jsx';
import BillToCompanyLaneHistory from './../bill-to-company-lane-history/BillToCompanyLaneHistory.jsx';
import BillToCompanyDocuments from './../bill-to-company-documents/BillToCompanyDocuments.jsx';
import BillToCompanyContactSearch from './../bill-to-company-contact-search/BillToCompanyContactSearch.jsx';
import BillToCompanyContacts from './../bill-to-company-contacts/BillToCompanyContacts.jsx';

import LbBillToCompanyInfo from './../load-board-panels/bill-to-company-info/BillToCompanyInfo.jsx';
import LbBillToCompanySearch from './../load-board-panels/bill-to-company-search/BillToCompanySearch.jsx';
import LbBillToCompanyRevenueInformation from './../load-board-panels/bill-to-company-revenue-information/BillToCompanyRevenueInformation.jsx';
import LbBillToCompanyOrderHistory from './../load-board-panels/bill-to-company-order-history/BillToCompanyOrderHistory.jsx';
import LbBillToCompanyLaneHistory from './../load-board-panels/bill-to-company-lane-history/BillToCompanyLaneHistory.jsx';
import LbBillToCompanyDocuments from './../load-board-panels/bill-to-company-documents/BillToCompanyDocuments.jsx';
import LbBillToCompanyContactSearch from './../load-board-panels/bill-to-company-contact-search/BillToCompanyContactSearch.jsx';
import LbBillToCompanyContacts from './../load-board-panels/bill-to-company-contacts/BillToCompanyContacts.jsx';

import ShipperCompanyInfo from './../shipper-company-info/ShipperCompanyInfo.jsx';
import ShipperCompanySearch from './../shipper-company-search/ShipperCompanySearch.jsx';
import ShipperCompanyRevenueInformation from './../shipper-company-revenue-information/ShipperCompanyRevenueInformation.jsx';
import ShipperCompanyOrderHistory from './../shipper-company-order-history/ShipperCompanyOrderHistory.jsx';
import ShipperCompanyLaneHistory from './../shipper-company-lane-history/ShipperCompanyLaneHistory.jsx';
import ShipperCompanyDocuments from './../shipper-company-documents/ShipperCompanyDocuments.jsx';
import ShipperCompanyContactSearch from './../shipper-company-contact-search/ShipperCompanyContactSearch.jsx';
import ShipperCompanyContacts from './../shipper-company-contacts/ShipperCompanyContacts.jsx';

import LbShipperCompanyInfo from './../load-board-panels/shipper-company-info/ShipperCompanyInfo.jsx';
import LbShipperCompanySearch from './../load-board-panels/shipper-company-search/ShipperCompanySearch.jsx';
import LbShipperCompanyRevenueInformation from './../load-board-panels/shipper-company-revenue-information/ShipperCompanyRevenueInformation.jsx';
import LbShipperCompanyOrderHistory from './../load-board-panels/shipper-company-order-history/ShipperCompanyOrderHistory.jsx';
import LbShipperCompanyLaneHistory from './../load-board-panels/shipper-company-lane-history/ShipperCompanyLaneHistory.jsx';
import LbShipperCompanyDocuments from './../load-board-panels/shipper-company-documents/ShipperCompanyDocuments.jsx';
import LbShipperCompanyContactSearch from './../load-board-panels/shipper-company-contact-search/ShipperCompanyContactSearch.jsx';
import LbShipperCompanyContacts from './../load-board-panels/shipper-company-contacts/ShipperCompanyContacts.jsx';

import ConsigneeCompanyInfo from './../consignee-company-info/ConsigneeCompanyInfo.jsx';
import ConsigneeCompanySearch from './../consignee-company-search/ConsigneeCompanySearch.jsx';
import ConsigneeCompanyRevenueInformation from './../consignee-company-revenue-information/ConsigneeCompanyRevenueInformation.jsx';
import ConsigneeCompanyOrderHistory from './../consignee-company-order-history/ConsigneeCompanyOrderHistory.jsx';
import ConsigneeCompanyLaneHistory from './../consignee-company-lane-history/ConsigneeCompanyLaneHistory.jsx';
import ConsigneeCompanyDocuments from './../consignee-company-documents/ConsigneeCompanyDocuments.jsx';
import ConsigneeCompanyContactSearch from './../consignee-company-contact-search/ConsigneeCompanyContactSearch.jsx';
import ConsigneeCompanyContacts from './../consignee-company-contacts/ConsigneeCompanyContacts.jsx';

import LbConsigneeCompanyInfo from './../load-board-panels/consignee-company-info/ConsigneeCompanyInfo.jsx';
import LbConsigneeCompanySearch from './../load-board-panels/consignee-company-search/ConsigneeCompanySearch.jsx';
import LbConsigneeCompanyRevenueInformation from './../load-board-panels/consignee-company-revenue-information/ConsigneeCompanyRevenueInformation.jsx';
import LbConsigneeCompanyOrderHistory from './../load-board-panels/consignee-company-order-history/ConsigneeCompanyOrderHistory.jsx';
import LbConsigneeCompanyLaneHistory from './../load-board-panels/consignee-company-lane-history/ConsigneeCompanyLaneHistory.jsx';
import LbConsigneeCompanyDocuments from './../load-board-panels/consignee-company-documents/ConsigneeCompanyDocuments.jsx';
import LbConsigneeCompanyContactSearch from './../load-board-panels/consignee-company-contact-search/ConsigneeCompanyContactSearch.jsx';
import LbConsigneeCompanyContacts from './../load-board-panels/consignee-company-contacts/ConsigneeCompanyContacts.jsx';

import CarrierInfo from './../carrier-info/CarrierInfo.jsx';
import CarrierInfoFactoringCompanySearch from './../carrier-info-factoring-company-search/CarrierInfoFactoringCompanySearch.jsx';
import CarrierInfoFactoringCompany from './../carrier-info-factoring-company/CarrierInfoFactoringCompany.jsx';
import CarrierInfoFactoringCompanyPanelSearch from './../carrier-info-factoring-company-panel-search/CarrierInfoFactoringCompanyPanelSearch.jsx';
import CarrierInfoFactoringCompanyContacts from './../carrier-info-factoring-company-contacts/CarrierInfoFactoringCompanyContacts.jsx';
import CarrierInfoFactoringCompanyContactSearch from './../carrier-info-factoring-company-contact-search/CarrierInfoFactoringCompanyContactSearch.jsx';
import CarrierInfoFactoringCompanyDocuments from './../carrier-info-factoring-company-documents/CarrierInfoFactoringCompanyDocuments.jsx';
import CarrierInfoFactoringCompanyInvoiceSearch from './../carrier-info-factoring-company-invoice-search/CarrierInfoFactoringCompanyInvoiceSearch.jsx';
import CarrierInfoContactSearch from './../carrier-info-contact-search/CarrierInfoContactSearch.jsx';
import CarrierInfoContacts from './../carrier-info-contacts/CarrierInfoContacts.jsx';
import CarrierInfoSearch from './../carrier-info-search/CarrierInfoSearch.jsx';
import CarrierInfoSearchChanging from './../carrier-info-search-changing/CarrierInfoSearchChanging.jsx';
import CarrierInfoEquipmentInformation from './../carrier-info-equipment-information/CarrierInfoEquipmentInformation.jsx';
import CarrierInfoRevenueInformation from './../carrier-info-revenue-information/CarrierInfoRevenueInformation.jsx';
import CarrierInfoOrderHistory from './../carrier-info-order-history/CarrierInfoOrderHistory.jsx';
import CarrierInfoDocuments from './../carrier-info-documents/CarrierInfoDocuments.jsx';

import LbCarrierInfo from './../load-board-panels/carrier-info/CarrierInfo.jsx';
import LbCarrierInfoFactoringCompanySearch from './../load-board-panels/carrier-info-factoring-company-search/CarrierInfoFactoringCompanySearch.jsx';
import LbCarrierInfoFactoringCompany from './../load-board-panels/carrier-info-factoring-company/CarrierInfoFactoringCompany.jsx';
import LbCarrierInfoFactoringCompanyPanelSearch from './../load-board-panels/carrier-info-factoring-company-panel-search/CarrierInfoFactoringCompanyPanelSearch.jsx';
import LbCarrierInfoFactoringCompanyContacts from './../load-board-panels/carrier-info-factoring-company-contacts/CarrierInfoFactoringCompanyContacts.jsx';
import LbCarrierInfoFactoringCompanyContactSearch from './../load-board-panels/carrier-info-factoring-company-contact-search/CarrierInfoFactoringCompanyContactSearch.jsx';
import LbCarrierInfoFactoringCompanyDocuments from './../load-board-panels/carrier-info-factoring-company-documents/CarrierInfoFactoringCompanyDocuments.jsx';
import LbCarrierInfoFactoringCompanyInvoiceSearch from './../load-board-panels/carrier-info-factoring-company-invoice-search/CarrierInfoFactoringCompanyInvoiceSearch.jsx';
import LbCarrierInfoContactSearch from './../load-board-panels/carrier-info-contact-search/CarrierInfoContactSearch.jsx';
import LbCarrierInfoContacts from './../load-board-panels/carrier-info-contacts/CarrierInfoContacts.jsx';
import LbCarrierInfoSearch from './../load-board-panels/carrier-info-search/CarrierInfoSearch.jsx';
import LbCarrierInfoEquipmentInformation from './../load-board-panels/carrier-info-equipment-information/CarrierInfoEquipmentInformation.jsx';
import LbCarrierInfoRevenueInformation from './../load-board-panels/carrier-info-revenue-information/CarrierInfoRevenueInformation.jsx';
import LbCarrierInfoOrderHistory from './../load-board-panels/carrier-info-order-history/CarrierInfoOrderHistory.jsx';
import LbCarrierInfoDocuments from './../load-board-panels/carrier-info-documents/CarrierInfoDocuments.jsx';

import RatingScreen from './../rating-screen/RatingScreen.jsx';
import AdjustRate from './../adjust-rate/AdjustRate.jsx';
import Order from './../order/Order.jsx';
import LbOrder from './../load-board-panels/order/Order.jsx';
import LoadBoard from './../load-board/LoadBoard.jsx';
import Routing from './../routing/Routing.jsx';
import Bol from './../bol/Bol.jsx';
import RateConf from './../rate-conf/RateConf.jsx';
import Documents from './../documents/Documents.jsx';

import LbRouting from './../load-board-panels/routing/Routing.jsx';
import LbRateConf from './../load-board-panels/rate-conf/RateConf.jsx';

function PanelContainer(props) {

    const baseWidth = 0.95;
    const panelGap = 70;

    const panelContainerClasses = classnames({
        'main-panel-container': true
    })

    const dispatchOpenedPanelsRefs = useRef([]);

    const eventControl = (event, info, name) => {
        if (event.type === 'mouseup') {
            if (info.x > 150) {
                let openedPanels = props.dispatchOpenedPanels.filter((item, index) => {
                    return item !== name;
                })

                props.setDispatchOpenedPanels(openedPanels);
            }
        }
    }

    const onPanelClick = async (e, name) => {
        let openedPanels = props.dispatchOpenedPanels;

        if (openedPanels.indexOf(name) < openedPanels.length - 1) {
            openedPanels.push(openedPanels.splice(openedPanels.indexOf(name), 1)[0]);

            openedPanels.map((panel, index) => {
                dispatchOpenedPanelsRefs.current.map((r, i) => {
                    if (r && r.classList.contains('panel-' + panel)) {
                        $(r)
                            .css('z-index', index)
                            .animate({
                                width: (window.innerWidth * baseWidth) - (panelGap * index)
                            }, 'fast')
                    }
                    return true;
                })

                return true;
            })

            await props.setDispatchOpenedPanels(openedPanels);
        }
    }

    return (
        <div className={panelContainerClasses}>
            {/* ================================== BILL TO COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-info'))
                        }}>
                            <BillToCompanyInfo title='Bill To Company Info' tabTimes={28000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY INFO =============================== */}

            {/* ================================== BILL TO COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-search'))
                        }}>
                            <BillToCompanySearch title='Bill To Company Search' tabTimes={29000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY SEARCH =============================== */}

            {/* ================================== BILL TO COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-revenue-information'))
                        }}>
                            <BillToCompanyRevenueInformation title='Revenue Information' tabTimes={42000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== BILL TO COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-order-history'))
                        }}>
                            <BillToCompanyOrderHistory title='Order History' tabTimes={43000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY ORDER HISTORY =============================== */}

            {/* ================================== BILL TO COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-lane-history'))
                        }}>
                            <BillToCompanyLaneHistory title='Lane History' tabTimes={44000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY LANE HISTORY =============================== */}

            {/* ================================== BILL TO COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-documents'))
                        }}>
                            <BillToCompanyDocuments title='Documents' tabTimes={45000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY DOCUMENTS =============================== */}

            {/* ================================== BILL TO COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-contact-search'))
                        }}>
                            <BillToCompanyContactSearch title='Contact Search Results' tabTimes={54000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== BILL TO COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bill-to-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bill-to-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bill-to-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bill-to-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-contacts'))
                        }}>
                            <BillToCompanyContacts title='Contacts' tabTimes={55000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== BILL TO COMPANY CONTACTS =============================== */}

            {/* ================================== LB BILL TO COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-info'))
                        }}>
                            <LbBillToCompanyInfo title='Bill To Company Info' tabTimes={28000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY INFO =============================== */}

            {/* ================================== LB BILL TO COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-search'))
                        }}>
                            <LbBillToCompanySearch title='Bill To Company Search' tabTimes={29000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY SEARCH =============================== */}

            {/* ================================== LB BILL TO COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-revenue-information'))
                        }}>
                            <LbBillToCompanyRevenueInformation title='Revenue Information' tabTimes={42000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== LB BILL TO COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-order-history'))
                        }}>
                            <LbBillToCompanyOrderHistory title='Order History' tabTimes={43000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY ORDER HISTORY =============================== */}

            {/* ================================== LB BILL TO COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-lane-history'))
                        }}>
                            <LbBillToCompanyLaneHistory title='Lane History' tabTimes={44000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY LANE HISTORY =============================== */}

            {/* ================================== LB BILL TO COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-documents'))
                        }}>
                            <LbBillToCompanyDocuments title='Documents' tabTimes={45000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY DOCUMENTS =============================== */}

            {/* ================================== LB BILL TO COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contact-search'))
                        }}>
                            <LbBillToCompanyContactSearch title='Contact Search Results' tabTimes={54000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== LB BILL TO COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-bill-to-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-bill-to-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-bill-to-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-bill-to-company-contacts'))
                        }}>
                            <LbBillToCompanyContacts title='Contacts' tabTimes={55000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY CONTACTS =============================== */}

            {/* ================================== SHIPPER COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-info'))
                        }}>
                            <ShipperCompanyInfo title='Shipper Company Info' tabTimes={30000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY INFO =============================== */}

            {/* ================================== SHIPPER COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-search'))
                        }}>
                            <ShipperCompanySearch title='Shipper Company Search' tabTimes={31000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY SEARCH =============================== */}

            {/* ================================== SHIPPER COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-revenue-information'))
                        }}>
                            <ShipperCompanyRevenueInformation title='Revenue Information' tabTimes={46000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== SHIPPER COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-order-history'))
                        }}>
                            <ShipperCompanyOrderHistory title='Order History' tabTimes={47000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY ORDER HISTORY =============================== */}

            {/* ================================== SHIPPER COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-lane-history'))
                        }}>
                            <ShipperCompanyLaneHistory title='Lane History' tabTimes={48000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY LANE HISTORY =============================== */}

            {/* ================================== SHIPPER COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-documents'))
                        }}>
                            <ShipperCompanyDocuments title='Documents' tabTimes={49000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY DOCUMENTS =============================== */}

            {/* ================================== SHIPPER COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-contact-search'))
                        }}>
                            <ShipperCompanyContactSearch title='Contact Search Results' tabTimes={56000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== SHIPPER COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('shipper-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('shipper-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'shipper-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-shipper-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('shipper-company-contacts'))
                        }}>
                            <ShipperCompanyContacts title='Contacts' tabTimes={57000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== SHIPPER COMPANY CONTACTS =============================== */}

            {/* ================================== LB SHIPPER COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-info'))
                        }}>
                            <LbShipperCompanyInfo title='Shipper Company Info' tabTimes={30000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY INFO =============================== */}

            {/* ================================== LB SHIPPER COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-search'))
                        }}>
                            <LbShipperCompanySearch title='Shipper Company Search' tabTimes={31000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY SEARCH =============================== */}

            {/* ================================== LB SHIPPER COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-revenue-information'))
                        }}>
                            <LbShipperCompanyRevenueInformation title='Revenue Information' tabTimes={46000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== LB SHIPPER COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-order-history'))
                        }}>
                            <LbShipperCompanyOrderHistory title='Order History' tabTimes={47000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY ORDER HISTORY =============================== */}

            {/* ================================== LB SHIPPER COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-lane-history'))
                        }}>
                            <LbShipperCompanyLaneHistory title='Lane History' tabTimes={48000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY LANE HISTORY =============================== */}

            {/* ================================== LB SHIPPER COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-documents'))
                        }}>
                            <LbShipperCompanyDocuments title='Documents' tabTimes={49000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY DOCUMENTS =============================== */}

            {/* ================================== LB SHIPPER COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-contact-search'))
                        }}>
                            <LbShipperCompanyContactSearch title='Contact Search Results' tabTimes={56000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== LB SHIPPER COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-shipper-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-shipper-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-shipper-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-shipper-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-shipper-company-contacts'))
                        }}>
                            <LbShipperCompanyContacts title='Contacts' tabTimes={57000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY CONTACTS =============================== */}

            {/* ================================== CONSIGNEE COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-info'))
                        }}>
                            <ConsigneeCompanyInfo title='Consignee Company Info' tabTimes={32000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY INFO =============================== */}

            {/* ================================== CONSIGNEE COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-search'))
                        }}>
                            <ConsigneeCompanySearch title='Consignee Company Search' tabTimes={33000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY SEARCH =============================== */}

            {/* ================================== CONSIGNEE COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-revenue-information'))
                        }}>
                            <ConsigneeCompanyRevenueInformation title='Revenue Information' tabTimes={50000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== CONSIGNEE COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-order-history'))
                        }}>
                            <ConsigneeCompanyOrderHistory title='Order History' tabTimes={51000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY ORDER HISTORY =============================== */}

            {/* ================================== CONSIGNEE COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-lane-history'))
                        }}>
                            <ConsigneeCompanyLaneHistory title='Lane History' tabTimes={52000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY LANE HISTORY =============================== */}

            {/* ================================== CONSIGNEE COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-documents'))
                        }}>
                            <ConsigneeCompanyDocuments title='Documents' tabTimes={53000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY DOCUMENTS =============================== */}

            {/* ================================== CONSIGNEE COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-contact-search'))
                        }}>
                            <ConsigneeCompanyContactSearch title='Contact Search Results' tabTimes={58000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== CONSIGNEE COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('consignee-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('consignee-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'consignee-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-consignee-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('consignee-company-contacts'))
                        }}>
                            <ConsigneeCompanyContacts title='Contacts' tabTimes={59000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONSIGNEE COMPANY CONTACTS =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-info')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-info'))
                        }}>
                            <LbConsigneeCompanyInfo title='Consignee Company Info' tabTimes={32000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY INFO =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-search'))
                        }}>
                            <LbConsigneeCompanySearch title='Consignee Company Search' tabTimes={33000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY SEARCH =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-revenue-information'))
                        }}>
                            <LbConsigneeCompanyRevenueInformation title='Revenue Information' tabTimes={50000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY REVENUE INFORMATION =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-order-history'))
                        }}>
                            <LbConsigneeCompanyOrderHistory title='Order History' tabTimes={51000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY ORDER HISTORY =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY LANE HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-lane-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-lane-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-lane-history'))
                        }}>
                            <LbConsigneeCompanyLaneHistory title='Lane History' tabTimes={52000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY LANE HISTORY =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-documents'))
                        }}>
                            <LbConsigneeCompanyDocuments title='Documents' tabTimes={53000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY DOCUMENTS =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-contact-search'))
                        }}>
                            <LbConsigneeCompanyContactSearch title='Contact Search Results' tabTimes={58000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== LB CONSIGNEE COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-consignee-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-consignee-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-consignee-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-consignee-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-consignee-company-contacts'))
                        }}>
                            <LbConsigneeCompanyContacts title='Contacts' tabTimes={59000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY CONTACTS =============================== */}

            {/* ================================== CARRIER INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
                reset={true}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info'))
                        }}>
                            <CarrierInfo title='Carrier Info' tabTimes={35000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-search'))
                        }}>
                            <CarrierInfoFactoringCompanySearch title='Factoring Company Search' tabTimes={60000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company'))
                        }}>
                            <CarrierInfoFactoringCompany title='Factoring Company' tabTimes={61000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-panel-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-panel-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-panel-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-panel-search'))
                        }}>
                            <CarrierInfoFactoringCompanyPanelSearch title='Factoring Company Search' tabTimes={62000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contacts'))
                        }}>
                            <CarrierInfoFactoringCompanyContacts title='Contacts' tabTimes={63000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY CONTACTS =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-contact-search'))
                        }}>
                            <CarrierInfoFactoringCompanyContactSearch title='Contact Search Results' tabTimes={64000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-documents'))
                        }}>
                            <CarrierInfoFactoringCompanyDocuments title='Documents' tabTimes={65000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY DOCUMENTS =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-factoring-company-invoice-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-factoring-company-invoice-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-factoring-company-invoice-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-factoring-company-invoice-search'))
                        }}>
                            <CarrierInfoFactoringCompanyInvoiceSearch title='Invoice Search Results' tabTimes={66000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== CARRIER INFO CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-contact-search'))
                        }}>
                            <CarrierInfoContactSearch title='Contact Search Results' tabTimes={67000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO CONTACT SEARCH =============================== */}

            {/* ================================== CARRIER INFO CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-contacts'))
                        }}>
                            <CarrierInfoContacts title='Contacts' tabTimes={68000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO CONTACTS =============================== */}

            {/* ================================== CARRIER INFO SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-search'))
                        }}>
                            <CarrierInfoSearch title='Carrier Search Results' tabTimes={69000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO SEARCH =============================== */}

            {/* ================================== CARRIER INFO SEARCH CHANGING =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-search-changing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-search-changing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-search-changing')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-search-changing')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-search-changing" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-search-changing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-search-changing'))
                        }}>
                            <CarrierInfoSearchChanging title='Carrier Search Results' tabTimes={69000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO SEARCH CHANGING =============================== */}

            {/* ================================== CARRIER INFO EQUIPMENT INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-equipment-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-equipment-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-equipment-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-equipment-information'))
                        }}>
                            <CarrierInfoEquipmentInformation title='Equipment Information' tabTimes={71000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO EQUIPMENT INFORMATION =============================== */}

            {/* ================================== CARRIER INFO REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-revenue-information'))
                        }}>
                            <CarrierInfoRevenueInformation title='Revenue Information' tabTimes={70000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO REVENUE INFORMATION =============================== */}

            {/* ================================== CARRIER INFO ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-order-history'))
                        }}>
                            <CarrierInfoOrderHistory title='Order History' tabTimes={72000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO ORDER HISTORY =============================== */}

            {/* ================================== CARRIER INFO DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('carrier-info-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('carrier-info-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-info-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-info-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info-documents'))
                        }}>
                            <CarrierInfoDocuments title='Documents' tabTimes={73000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO DOCUMENTS =============================== */}

            {/* ================================== LB CARRIER INFO =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
                reset={true}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info'))
                        }}>
                            <LbCarrierInfo title='Carrier Info' tabTimes={35000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanySearch title='Factoring Company Search' tabTimes={60000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company'))
                        }}>
                            <LbCarrierInfoFactoringCompany title='Factoring Company' tabTimes={61000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-panel-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-panel-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-panel-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-panel-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyPanelSearch title='Factoring Company Search' tabTimes={62000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contacts'))
                        }}>
                            <LbCarrierInfoFactoringCompanyContacts title='Contacts' tabTimes={63000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY CONTACTS =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-contact-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyContactSearch title='Contact Search Results' tabTimes={64000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-documents'))
                        }}>
                            <LbCarrierInfoFactoringCompanyDocuments title='Documents' tabTimes={65000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY DOCUMENTS =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-invoice-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-factoring-company-invoice-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-invoice-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyInvoiceSearch title='Invoice Search Results' tabTimes={66000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO CONTACT SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-contact-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-contact-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-contact-search'))
                        }}>
                            <LbCarrierInfoContactSearch title='Contact Search Results' tabTimes={67000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO CONTACT SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO CONTACTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-contacts')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-contacts" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-contacts'))
                        }}>
                            <LbCarrierInfoContacts title='Contacts' tabTimes={68000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO CONTACTS =============================== */}

            {/* ================================== LB CARRIER INFO SEARCH =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-search')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-search" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-search'))
                        }}>
                            <LbCarrierInfoSearch title='Carrier Search Results' tabTimes={69000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO EQUIPMENT INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-equipment-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-equipment-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-equipment-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-equipment-information'))
                        }}>
                            <LbCarrierInfoEquipmentInformation title='Equipment Information' tabTimes={71000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO EQUIPMENT INFORMATION =============================== */}

            {/* ================================== LB CARRIER INFO REVENUE INFORMATION =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-revenue-information')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-revenue-information" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-revenue-information'))
                        }}>
                            <LbCarrierInfoRevenueInformation title='Revenue Information' tabTimes={70000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO REVENUE INFORMATION =============================== */}

            {/* ================================== LB CARRIER INFO ORDER HISTORY =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-order-history')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-order-history" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-order-history'))
                        }}>
                            <LbCarrierInfoOrderHistory title='Order History' tabTimes={72000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO ORDER HISTORY =============================== */}

            {/* ================================== LB CARRIER INFO DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-carrier-info-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-carrier-info-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        onStop={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-carrier-info-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-carrier-info-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-carrier-info-documents'))
                        }}>
                            <LbCarrierInfoDocuments title='Documents' tabTimes={73000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO DOCUMENTS =============================== */}

            {/* ================================== RATING SCREEN =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('rating-screen')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('rating-screen')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('rating-screen')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
                reset={true}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'rating-screen')}
                        onStop={(e, i) => eventControl(e, i, 'rating-screen')}
                        onMouseDown={(e, i) => eventControl(e, i, 'rating-screen')}
                        onMouseUp={(e, i) => eventControl(e, i, 'rating-screen')}
                        onTouchStart={(e, i) => eventControl(e, i, 'rating-screen')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'rating-screen')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-rating-screen" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'rating-screen')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('rating-screen'))
                        }}>
                            <RatingScreen title='Rating Screen' tabTimes={34000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== RATING SCREEN =============================== */}

            {/* ================================== ADJUST RATE =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('adjust-rate')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('adjust-rate')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('adjust-rate')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'adjust-rate')}
                        onStop={(e, i) => eventControl(e, i, 'adjust-rate')}
                        onMouseDown={(e, i) => eventControl(e, i, 'adjust-rate')}
                        onMouseUp={(e, i) => eventControl(e, i, 'adjust-rate')}
                        onTouchStart={(e, i) => eventControl(e, i, 'adjust-rate')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'adjust-rate')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-adjust-rate" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'adjust-rate')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('adjust-rate'))
                        }}>
                            <AdjustRate title='Adjust Rate' tabTimes={36000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADJUST RATE =============================== */}

            {/* ================================== ORDER =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('order')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('order')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('order')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'order')}
                        onStop={(e, i) => eventControl(e, i, 'order')}
                        onMouseDown={(e, i) => eventControl(e, i, 'order')}
                        onMouseUp={(e, i) => eventControl(e, i, 'order')}
                        onTouchStart={(e, i) => eventControl(e, i, 'order')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'order')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-order" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('order'))
                        }}>
                            <Order title='Order' tabTimes={37000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ORDER =============================== */}

            {/* ================================== LB ORDER =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-order')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-order')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-order')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-order')}
                        onStop={(e, i) => eventControl(e, i, 'lb-order')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-order')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-order')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-order')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-order')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-order" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-order')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-order'))
                        }}>
                            <LbOrder title='Order' tabTimes={37000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB ORDER =============================== */}

            {/* ================================== LOAD BOARD =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('load-board')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('load-board')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('load-board')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'load-board')}
                        onStop={(e, i) => eventControl(e, i, 'load-board')}
                        onMouseDown={(e, i) => eventControl(e, i, 'load-board')}
                        onMouseUp={(e, i) => eventControl(e, i, 'load-board')}
                        onTouchStart={(e, i) => eventControl(e, i, 'load-board')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'load-board')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-load-board" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'load-board')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('load-board'))
                        }}>
                            <LoadBoard title='Load Board' tabTimes={38000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LOAD BOARD =============================== */}

            {/* ================================== ROUTING =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('routing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('routing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('routing')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'routing')}
                        onStop={(e, i) => eventControl(e, i, 'routing')}
                        onMouseDown={(e, i) => eventControl(e, i, 'routing')}
                        onMouseUp={(e, i) => eventControl(e, i, 'routing')}
                        onTouchStart={(e, i) => eventControl(e, i, 'routing')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'routing')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-routing" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'routing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('routing'))
                        }}>
                            <Routing title='Routing' tabTimes={39000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ROUTING =============================== */}

            {/* ================================== BOL =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('bol')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('bol')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('bol')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'bol')}
                        onStop={(e, i) => eventControl(e, i, 'bol')}
                        onMouseDown={(e, i) => eventControl(e, i, 'bol')}
                        onMouseUp={(e, i) => eventControl(e, i, 'bol')}
                        onTouchStart={(e, i) => eventControl(e, i, 'bol')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'bol')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-bol" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bol')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bol'))
                        }}>
                            <Bol title='BOL' tabTimes={40000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== BOL =============================== */}

            {/* ================================== RATE CONF =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('rate-conf')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('rate-conf')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('rate-conf')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'rate-conf')}
                        onStop={(e, i) => eventControl(e, i, 'rate-conf')}
                        onMouseDown={(e, i) => eventControl(e, i, 'rate-conf')}
                        onMouseUp={(e, i) => eventControl(e, i, 'rate-conf')}
                        onTouchStart={(e, i) => eventControl(e, i, 'rate-conf')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'rate-conf')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-rate-conf" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'rate-conf')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('rate-conf'))
                        }}>
                            <RateConf title='Rate Conf' tabTimes={41000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== RATE CONF =============================== */}

            {/* ================================== ORDER DOCUMENTS =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('order-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('order-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('order-documents')}
                config={{
                    delay: 0,
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}
            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'order-documents')}
                        onStop={(e, i) => eventControl(e, i, 'order-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'order-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'order-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'order-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'order-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-order-documents" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('order-documents'))
                        }}>
                            <Documents title='Documents' tabTimes={90000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ORDER DOCUMENTS =============================== */}

            {/* ================================== LB ROUTING =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-routing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-routing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-routing')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-routing')}
                        onStop={(e, i) => eventControl(e, i, 'lb-routing')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-routing')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-routing')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-routing')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-routing')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-routing" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-routing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-routing'))
                        }}>
                            <LbRouting title='Routing' tabTimes={39000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB ROUTING =============================== */}

            {/* ================================== LB RATE CONF =============================== */}
            <Transition

                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-rate-conf')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.dispatchOpenedPanels.indexOf('lb-rate-conf')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.dispatchOpenedPanels.includes('lb-rate-conf')}
                config={{
                    duration: 200,
                    mass: 1, tension: 120, friction: 14
                }}

            >
                {show => show && (styles => (
                    <Draggable
                        axis="x"
                        handle=".drag-handler"
                        onStart={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        onStop={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-rate-conf')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-rate-conf" ref={ref => dispatchOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-rate-conf')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('lb-rate-conf'))
                        }}>
                            <LbRateConf title='Rate Conf' tabTimes={41000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB RATE CONF =============================== */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        panels: state.dispatchReducers.panels,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setDispatchOpenedPanels
})(PanelContainer)