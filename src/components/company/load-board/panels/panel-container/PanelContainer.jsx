import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {
    setLoadBoardOpenedPanels as setOpenedPanels,

    // BILL TO COMPANY INFO
    setLbBillToCompanies,
    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbSelectedBillToCompanyNote,
    setLbSelectedBillToCompanyDirection,
    setLbBillToCompanyContactSearch,
    setLbBillToCompanyAutomaticEmailsTo,
    setLbBillToCompanyAutomaticEmailsCc,
    setLbBillToCompanyAutomaticEmailsBcc,
    setLbBillToCompanyShowingContactList,
    setLbBillToCompanySearch,
    setLbBillToCompanyContacts,
    setLbBillToCompanyContactSearchCustomer,
    setLbBillToCompanyIsEditingContact,
    setLbSelectedBillToCompanyDocument,
    setLbSelectedBillToCompanyDocumentNote,
    setLbBillToCompanyDocumentTags as setLbSelectedBillToCompanyDocumentTags,

    // SHIPPER COMPANY INFO
    setLbShipperCompanies,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbSelectedShipperCompanyNote,
    setLbSelectedShipperCompanyDirection,
    setLbShipperCompanyContactSearch,
    setLbShipperCompanyAutomaticEmailsTo,
    setLbShipperCompanyAutomaticEmailsCc,
    setLbShipperCompanyAutomaticEmailsBcc,
    setLbShipperCompanyShowingContactList,
    setLbShipperCompanySearch,
    setLbShipperCompanyContacts,
    setLbShipperCompanyContactSearchCustomer,
    setLbShipperCompanyIsEditingContact,
    setLbSelectedShipperCompanyDocument,
    setLbSelectedShipperCompanyDocumentNote,
    setLbShipperCompanyDocumentTags as setLbSelectedShipperCompanyDocumentTags,

    // CONSIGNEE COMPANY INFO
    setLbConsigneeCompanies,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbSelectedConsigneeCompanyNote,
    setLbSelectedConsigneeCompanyDirection,
    setLbConsigneeCompanyContactSearch,
    setLbConsigneeCompanyAutomaticEmailsTo,
    setLbConsigneeCompanyAutomaticEmailsCc,
    setLbConsigneeCompanyAutomaticEmailsBcc,
    setLbConsigneeCompanyShowingContactList,
    setLbConsigneeCompanySearch,
    setLbConsigneeCompanyContacts,
    setLbConsigneeCompanyContactSearchCustomer,
    setLbConsigneeCompanyIsEditingContact,
    setLbSelectedConsigneeCompanyDocument,
    setLbSelectedConsigneeCompanyDocumentNote,
    setLbConsigneeCompanyDocumentTags as setLbSelectedConsigneeCompanyDocumentTags,

    // CARRIER INFO
    setLbCarrierInfoCarriers,
    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoNote,
    setSelectedLbCarrierInfoContact,
    setLbCarrierInfoCarrierContacts,
    setLbCarrierInfoCarrierSearch,
    setLbCarrierInfoContactSearch,
    setLbCarrierInfoShowingContactList,
    setLbCarrierInfoContactSearchCarrier,
    setLbCarrierInfoIsEditingContact,
    setSelectedLbCarrierInfoDocument,
    setSelectedLbCarrierInfoDocumentNote,
    setLbCarrierInfoDocumentTags as setSelectedLbCarrierInfoDocumentTags,
    setLbCarrierInfoEquipmentInformation,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoDrivers,
    setSelectedLbCarrierInfoDriver,
    setSelectedLbCarrierInfoInsurance,
    setLbCarrierInfoEquipments,
    setLbCarrierInfoCarrierInsurances,
    setLbCarrierInfoInsuranceTypes,
    setSelectedLbCarrierInfoInsuranceType,
    setSelectedLbCarrierInfoEquipment,

    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompanyNote,
    setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedLbCarrierInfoFactoringCompanyInvoices,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setLbCarrierInfoFactoringCompanyContacts,
    setSelectedLbCarrierInfoFactoringCompanyInvoice,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setLbCarrierInfoFactoringCompanies,
    setSelectedLbCarrierInfoFactoringCompanyDocument,
    setSelectedLbCarrierInfoFactoringCompanyDocumentNote,
    setLbCarrierInfoFactoringCompanyDocumentTags as setSelectedLbCarrierInfoFactoringCompanyDocumentTags,

    //DISPATCH

    setLbSelectedOrder,
    setLbMileageLoaderVisible,

    //INVOICE
    setLbInvoiceSelectedOrder,
    setLbInvoiceOrderNumber,
    setLbInvoiceTripNumber,
    setLbInvoiceInternalNotes,
    setLbInvoiceSelectedInternalNote,

} from '../../../../../actions';

import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';
import { Rnd } from 'react-rnd';

import LbBillToCompanyInfo from './../../../customers/Customers.jsx';
import LbBillToCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import LbBillToCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import LbBillToCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LbBillToCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import LbBillToCompanyDocuments from './../../../panels/documents/Documents.jsx';
import LbBillToCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import LbBillToCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import LbShipperCompanyInfo from './../../../customers/Customers.jsx';
import LbShipperCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import LbShipperCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import LbShipperCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LbShipperCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import LbShipperCompanyDocuments from './../../../panels/documents/Documents.jsx';
import LbShipperCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import LbShipperCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import LbConsigneeCompanyInfo from './../../../customers/Customers.jsx';
import LbConsigneeCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import LbConsigneeCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import LbConsigneeCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LbConsigneeCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import LbConsigneeCompanyDocuments from './../../../panels/documents/Documents.jsx';
import LbConsigneeCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import LbConsigneeCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import LbCarrierInfo from './../../../carriers/Carriers.jsx';
import LbCarrierInfoContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import LbCarrierInfoContacts from './../../../panels/contacts/Contacts.jsx';
import LbCarrierInfoSearch from './../../../panels/customer-search/CustomerSearch.jsx';
import LbCarrierInfoEquipmentInformation from './../../../panels/equipment-information/EquipmentInformation.jsx';
import LbCarrierInfoRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import LbCarrierInfoOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LbCarrierInfoDocuments from './../../../panels/documents/Documents.jsx';
import LbCarrierInfoFactoringCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import LbCarrierInfoFactoringCompany from './../../../panels/factoring-company/FactoringCompany.jsx';
import LbCarrierInfoFactoringCompanyPanelSearch from './../../../panels/factoring-company-panel-search/FactoringCompanyPanelSearch.jsx';
import LbCarrierInfoFactoringCompanyContacts from './../../../panels/contacts/Contacts.jsx';
import LbCarrierInfoFactoringCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import LbCarrierInfoFactoringCompanyDocuments from './../../../panels/documents/Documents.jsx';
import LbCarrierInfoFactoringCompanyInvoiceSearch from './../../../panels/factoring-company-invoice-search/FactoringCompanyInvoiceSearch.jsx';

import LbDispatch from './../../../dispatch/Dispatch.jsx';
import LbInvoice from './../../../invoice/Invoice.jsx';

import LbRouting from './../../../panels/routing/Routing.jsx';
import LbRateConf from './../../../panels/rate-conf/RateConf.jsx';
import LbOrder from './../../../panels/order/Order.jsx';

function PanelContainer(props) {

    const baseWidth = 0.95;
    const panelGap = 70;

    const panelContainerClasses = classnames({
        'main-panel-container': true
    })

    const openedPanelsRefs = useRef([]);

    const eventControl = (event, info, name) => {
        if (event.type === 'mouseup') {
            if (info.x > 150) {
                let openedPanels = props.openedPanels.filter((item, index) => {
                    return item !== name;
                })

                props.setOpenedPanels(openedPanels);
            }
        }
    }

    const onPanelClick = async (e, name) => {
        let openedPanels = props.openedPanels;

        if (openedPanels.indexOf(name) < openedPanels.length - 1) {
            openedPanels.push(openedPanels.splice(openedPanels.indexOf(name), 1)[0]);

            openedPanels.map((panel, index) => {
                openedPanelsRefs.current.map((r, i) => {
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

            await props.setOpenedPanels(openedPanels);
        }
    }

    return (
        <div className={panelContainerClasses}>
            {/* ================================== LB BILL TO COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-info')}
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
                        <animated.div className="panel panel-lb-bill-to-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-bill-to-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Bill To Company Info</div><div className="side-title"><div>Bill To Company Info</div></div>

                                <LbBillToCompanyInfo
                                    pageName={'Bill To Company Info'}
                                    panelName={'lb-bill-to-company-info'}
                                    tabTimes={28000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setLbBillToCompanies}
                                    setSelectedCustomer={props.setLbSelectedBillToCompanyInfo}
                                    setCustomerSearch={props.setLbBillToCompanySearch}
                                    setCustomerContacts={props.setLbBillToCompanyContacts}
                                    setSelectedContact={props.setLbSelectedBillToCompanyContact}
                                    setContactSearch={props.setLbBillToCompanyContactSearch}
                                    setIsEditingContact={props.setLbBillToCompanyIsEditingContact}
                                    setShowingContactList={props.setLbBillToCompanyShowingContactList}
                                    setContactSearchCustomer={props.setLbBillToCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setLbBillToCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setLbBillToCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setLbBillToCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setLbSelectedBillToCompanyNote}
                                    setSelectedDirection={props.setLbSelectedBillToCompanyDirection}
                                    setSelectedDocument={props.setLbSelectedBillToCompanyDocument}

                                    customers={props.lbBillToCompanies}
                                    selectedCustomer={props.selectedLbBillToCompanyInfo}
                                    customerSearch={props.lbBillToCompanySearch}
                                    contacts={props.BillToCompanyContacts}
                                    selectedContact={props.selectedLbBillToCompanyContact}
                                    contactSearch={props.lbBillToCompanyContactSearch}
                                    showingContactList={props.lbBillToCompanyShowingContactList}
                                    automaticEmailsTo={props.lbBillToCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.lbBillToCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.lbBillToCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedLbBillToCompanyNote}
                                    selectedDirection={props.selectedLbBillToCompanyDirection}

                                    customerSearchPanelName='lb-bill-to-company-search'
                                    customerContactsPanelName='lb-bill-to-company-contacts'
                                    customerContactSearchPanelName='lb-bill-to-company-contact-search'
                                    customerRevenueInformationPanelName='lb-bill-to-company-revenue-information'
                                    customerOrderHistoryPanelName='lb-bill-to-company-order-history'
                                    customerLaneHistoryPanelName='lb-bill-to-company-lane-history'
                                    customerDocumentsPanelName='lb-bill-to-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-search')}
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
                        <animated.div className="panel panel-lb-bill-to-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-search'))
                        }}>
                            <LbBillToCompanySearch
                                title='Bill To Company Search'
                                tabTimes={29000}
                                panelName='lb-bill-to-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedBillToCompanyInfo}
                                setSelectedContact={props.setLbSelectedBillToCompanyContact}

                                customers={props.lbBillToCompanies}
                                customerSearch={props.lbBillToCompanySearch}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-revenue-information')}
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
                        <animated.div className="panel panel-lb-bill-to-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-revenue-information'))
                        }}>
                            <LbBillToCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={42000}
                                panelName='lb-bill-to-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-order-history')}
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
                        <animated.div className="panel panel-lb-bill-to-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-order-history'))
                        }}>
                            <LbBillToCompanyOrderHistory
                                title='Order History'
                                tabTimes={43000}
                                panelName='lb-bill-to-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-lane-history')}
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
                        <animated.div className="panel panel-lb-bill-to-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-lane-history'))
                        }}>
                            <LbBillToCompanyLaneHistory
                                title='Lane History'
                                tabTimes={44000}
                                panelName='lb-bill-to-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-documents')}
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
                        <animated.div className="panel panel-lb-bill-to-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-documents'))
                        }}>
                            <LbBillToCompanyDocuments
                                title='Documents'
                                tabTimes={45000}
                                panelName='lb-bill-to-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setLbSelectedBillToCompanyDocument}
                                setSelectedOwner={props.setLbSelectedBillToCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setLbSelectedBillToCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setLbSelectedBillToCompanyDocumentNote}

                                selectedOwner={props.selectedLbBillToCompanyInfo}
                                selectedOwnerDocument={props.selectedLbBillToCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedLbBillToCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedLbBillToCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-contact-search')}
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
                        <animated.div className="panel panel-lb-bill-to-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-contact-search'))
                        }}>
                            <LbBillToCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={54000}
                                parentPanelName='lb-bill-to-company-contacts'
                                panelName='lb-bill-to-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedBillToCompanyInfo}
                                setSelectedContact={props.setLbSelectedBillToCompanyContact}
                                setCustomerContacts={props.setLbBillToCompanyContacts}
                                setContactSearch={props.setLbBillToCompanyContactSearch}
                                setShowingContactList={props.setLbBillToCompanyShowingContactList}
                                setContactSearchCustomer={props.setLbBillToCompanyContactSearchCustomer}

                                customers={props.lbBillToCompanies}
                                contactSearch={props.lbBillToCompanyContactSearch}
                                contacts={props.lbBillToCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-bill-to-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-bill-to-company-contacts')}
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
                        <animated.div className="panel panel-lb-bill-to-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-bill-to-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-bill-to-company-contacts'))
                        }}>
                            <LbBillToCompanyContacts
                                title='Contacts'
                                tabTimes={55000}
                                panelName='lb-bill-to-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedBillToCompanyInfo}
                                setSelectedContact={props.setLbSelectedBillToCompanyContact}
                                setIsEditingContact={props.setLbBillToCompanyIsEditingContact}
                                setContactSearchCustomer={props.setLbBillToCompanyContactSearchCustomer}

                                contactSearchCustomer={props.lbBillToCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedLbBillToCompanyInfo}
                                selectedContact={props.selectedLbBillToCompanyContact}
                                isEditingContact={props.lbBillToCompanyIsEditingContact}
                                contacts={props.lbBillToCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB BILL TO COMPANY CONTACTS =============================== */}


            {/* ================================== LB SHIPPER COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-info')}
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
                        <animated.div className="panel panel-lb-shipper-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-shipper-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Shipper Company Info</div><div className="side-title"><div>Shipper Company Info</div></div>

                                <LbShipperCompanyInfo
                                    pageName={'Shipper Company Info'}
                                    panelName={'lb-shipper-company-info'}
                                    tabTimes={30000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setLbShipperCompanies}
                                    setSelectedCustomer={props.setLbSelectedShipperCompanyInfo}
                                    setCustomerSearch={props.setLbShipperCompanySearch}
                                    setCustomerContacts={props.setLbShipperCompanyContacts}
                                    setSelectedContact={props.setLbSelectedShipperCompanyContact}
                                    setContactSearch={props.setLbShipperCompanyContactSearch}
                                    setIsEditingContact={props.setLbShipperCompanyIsEditingContact}
                                    setShowingContactList={props.setLbShipperCompanyShowingContactList}
                                    setContactSearchCustomer={props.setLbShipperCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setLbShipperCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setLbShipperCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setLbShipperCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setLbSelectedShipperCompanyNote}
                                    setSelectedDirection={props.setLbSelectedShipperCompanyDirection}
                                    setSelectedDocument={props.setLbSelectedShipperCompanyDocument}

                                    customers={props.lbShipperCompanies}
                                    selectedCustomer={props.selectedLbShipperCompanyInfo}
                                    customerSearch={props.lbShipperCompanySearch}
                                    contacts={props.ShipperCompanyContacts}
                                    selectedContact={props.selectedLbShipperCompanyContact}
                                    contactSearch={props.lbShipperCompanyContactSearch}
                                    showingContactList={props.lbShipperCompanyShowingContactList}
                                    automaticEmailsTo={props.lbShipperCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.lbShipperCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.lbShipperCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedLbShipperCompanyNote}
                                    selectedDirection={props.selectedLbShipperCompanyDirection}

                                    customerSearchPanelName='lb-shipper-company-search'
                                    customerContactsPanelName='lb-shipper-company-contacts'
                                    customerContactSearchPanelName='lb-shipper-company-contact-search'
                                    customerRevenueInformationPanelName='lb-shipper-company-revenue-information'
                                    customerOrderHistoryPanelName='lb-shipper-company-order-history'
                                    customerLaneHistoryPanelName='lb-shipper-company-lane-history'
                                    customerDocumentsPanelName='lb-shipper-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-search')}
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
                        <animated.div className="panel panel-lb-shipper-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-search'))
                        }}>
                            <LbShipperCompanySearch
                                title='Shipper Company Search'
                                tabTimes={31000}
                                panelName='lb-shipper-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedShipperCompanyInfo}
                                setSelectedContact={props.setLbSelectedShipperCompanyContact}

                                customers={props.lbShipperCompanies}
                                customerSearch={props.lbShipperCompanySearch}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-revenue-information')}
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
                        <animated.div className="panel panel-lb-shipper-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-revenue-information'))
                        }}>
                            <LbShipperCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={46000}
                                panelName='lb-shipper-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-order-history')}
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
                        <animated.div className="panel panel-lb-shipper-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-order-history'))
                        }}>
                            <LbShipperCompanyOrderHistory
                                title='Order History'
                                tabTimes={47000}
                                panelName='lb-shipper-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-lane-history')}
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
                        <animated.div className="panel panel-lb-shipper-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-lane-history'))
                        }}>
                            <LbShipperCompanyLaneHistory
                                title='Lane History'
                                tabTimes={48000}
                                panelName='lb-shipper-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-documents')}
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
                        <animated.div className="panel panel-lb-shipper-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-documents'))
                        }}>
                            <LbShipperCompanyDocuments
                                title='Documents'
                                tabTimes={49000}
                                panelName='lb-shipper-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setLbSelectedShipperCompanyDocument}
                                setSelectedOwner={props.setLbSelectedShipperCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setLbSelectedShipperCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setLbSelectedShipperCompanyDocumentNote}

                                selectedOwner={props.selectedLbShipperCompanyInfo}
                                selectedOwnerDocument={props.selectedLbShipperCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedLbShipperCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedLbShipperCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-contact-search')}
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
                        <animated.div className="panel panel-lb-shipper-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-contact-search'))
                        }}>
                            <LbShipperCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={56000}
                                parentPanelName='lb-shipper-company-contacts'
                                panelName='lb-shipper-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedShipperCompanyInfo}
                                setSelectedContact={props.setLbSelectedShipperCompanyContact}
                                setCustomerContacts={props.setLbShipperCompanyContacts}
                                setContactSearch={props.setLbShipperCompanyContactSearch}
                                setShowingContactList={props.setLbShipperCompanyShowingContactList}
                                setContactSearchCustomer={props.setLbShipperCompanyContactSearchCustomer}

                                customers={props.lbShipperCompanies}
                                contactSearch={props.lbShipperCompanyContactSearch}
                                contacts={props.lbShipperCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-shipper-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-shipper-company-contacts')}
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
                        <animated.div className="panel panel-lb-shipper-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-shipper-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-shipper-company-contacts'))
                        }}>
                            <LbShipperCompanyContacts
                                title='Contacts'
                                tabTimes={57000}
                                panelName='lb-shipper-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedShipperCompanyInfo}
                                setSelectedContact={props.setLbSelectedShipperCompanyContact}
                                setIsEditingContact={props.setLbShipperCompanyIsEditingContact}
                                setContactSearchCustomer={props.setLbShipperCompanyContactSearchCustomer}

                                contactSearchCustomer={props.lbShipperCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedLbShipperCompanyInfo}
                                selectedContact={props.selectedLbShipperCompanyContact}
                                isEditingContact={props.lbShipperCompanyIsEditingContact}
                                contacts={props.lbShipperCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB SHIPPER COMPANY CONTACTS =============================== */}


            {/* ================================== LB CONSIGNEE COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-info')}
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
                        <animated.div className="panel panel-lb-consignee-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-consignee-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Consignee Company Info</div><div className="side-title"><div>Consignee Company Info</div></div>

                                <LbConsigneeCompanyInfo
                                    pageName={'Consignee Company Info'}
                                    panelName={'lb-consignee-company-info'}
                                    tabTimes={32000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setLbConsigneeCompanies}
                                    setSelectedCustomer={props.setLbSelectedConsigneeCompanyInfo}
                                    setCustomerSearch={props.setLbConsigneeCompanySearch}
                                    setCustomerContacts={props.setLbConsigneeCompanyContacts}
                                    setSelectedContact={props.setLbSelectedConsigneeCompanyContact}
                                    setContactSearch={props.setLbConsigneeCompanyContactSearch}
                                    setIsEditingContact={props.setLbConsigneeCompanyIsEditingContact}
                                    setShowingContactList={props.setLbConsigneeCompanyShowingContactList}
                                    setContactSearchCustomer={props.setLbConsigneeCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setLbConsigneeCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setLbConsigneeCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setLbConsigneeCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setLbSelectedConsigneeCompanyNote}
                                    setSelectedDirection={props.setLbSelectedConsigneeCompanyDirection}
                                    setSelectedDocument={props.setLbSelectedConsigneeCompanyDocument}

                                    customers={props.lbConsigneeCompanies}
                                    selectedCustomer={props.selectedLbConsigneeCompanyInfo}
                                    customerSearch={props.lbConsigneeCompanySearch}
                                    contacts={props.ConsigneeCompanyContacts}
                                    selectedContact={props.selectedLbConsigneeCompanyContact}
                                    contactSearch={props.lbConsigneeCompanyContactSearch}
                                    showingContactList={props.lbConsigneeCompanyShowingContactList}
                                    automaticEmailsTo={props.lbConsigneeCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.lbConsigneeCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.lbConsigneeCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedLbConsigneeCompanyNote}
                                    selectedDirection={props.selectedLbConsigneeCompanyDirection}

                                    customerSearchPanelName='lb-consignee-company-search'
                                    customerContactsPanelName='lb-consignee-company-contacts'
                                    customerContactSearchPanelName='lb-consignee-company-contact-search'
                                    customerRevenueInformationPanelName='lb-consignee-company-revenue-information'
                                    customerOrderHistoryPanelName='lb-consignee-company-order-history'
                                    customerLaneHistoryPanelName='lb-consignee-company-lane-history'
                                    customerDocumentsPanelName='lb-consignee-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-search')}
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
                        <animated.div className="panel panel-lb-consignee-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-search'))
                        }}>
                            <LbConsigneeCompanySearch
                                title='Consignee Company Search'
                                tabTimes={33000}
                                panelName='lb-consignee-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setLbSelectedConsigneeCompanyContact}

                                customers={props.lbConsigneeCompanies}
                                customerSearch={props.lbConsigneeCompanySearch}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-revenue-information')}
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
                        <animated.div className="panel panel-lb-consignee-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-revenue-information'))
                        }}>
                            <LbConsigneeCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={50000}
                                panelName='lb-consignee-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-order-history')}
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
                        <animated.div className="panel panel-lb-consignee-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-order-history'))
                        }}>
                            <LbConsigneeCompanyOrderHistory
                                title='Order History'
                                tabTimes={51000}
                                panelName='lb-consignee-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-lane-history')}
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
                        <animated.div className="panel panel-lb-consignee-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-lane-history'))
                        }}>
                            <LbConsigneeCompanyLaneHistory
                                title='Lane History'
                                tabTimes={52000}
                                panelName='lb-consignee-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-documents')}
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
                        <animated.div className="panel panel-lb-consignee-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-documents'))
                        }}>
                            <LbConsigneeCompanyDocuments
                                title='Documents'
                                tabTimes={53000}
                                panelName='lb-consignee-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setLbSelectedConsigneeCompanyDocument}
                                setSelectedOwner={props.setLbSelectedConsigneeCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setLbSelectedConsigneeCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setLbSelectedConsigneeCompanyDocumentNote}

                                selectedOwner={props.selectedLbConsigneeCompanyInfo}
                                selectedOwnerDocument={props.selectedLbConsigneeCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedLbConsigneeCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedLbConsigneeCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-contact-search')}
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
                        <animated.div className="panel panel-lb-consignee-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-contact-search'))
                        }}>
                            <LbConsigneeCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={58000}
                                parentPanelName='lb-consignee-company-contacts'
                                panelName='lb-consignee-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setLbSelectedConsigneeCompanyContact}
                                setCustomerContacts={props.setLbConsigneeCompanyContacts}
                                setContactSearch={props.setLbConsigneeCompanyContactSearch}
                                setShowingContactList={props.setLbConsigneeCompanyShowingContactList}
                                setContactSearchCustomer={props.setLbConsigneeCompanyContactSearchCustomer}

                                customers={props.lbConsigneeCompanies}
                                contactSearch={props.lbConsigneeCompanyContactSearch}
                                contacts={props.lbConsigneeCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-consignee-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-consignee-company-contacts')}
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
                        <animated.div className="panel panel-lb-consignee-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-consignee-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-consignee-company-contacts'))
                        }}>
                            <LbConsigneeCompanyContacts
                                title='Contacts'
                                tabTimes={59000}
                                panelName='lb-consignee-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setLbSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setLbSelectedConsigneeCompanyContact}
                                setIsEditingContact={props.setLbConsigneeCompanyIsEditingContact}
                                setContactSearchCustomer={props.setLbConsigneeCompanyContactSearchCustomer}

                                contactSearchCustomer={props.lbConsigneeCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedLbConsigneeCompanyInfo}
                                selectedContact={props.selectedLbConsigneeCompanyContact}
                                isEditingContact={props.lbConsigneeCompanyIsEditingContact}
                                contacts={props.lbConsigneeCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CONSIGNEE COMPANY CONTACTS =============================== */}


            {/* ================================== LB CARRIER INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info')}
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
                        <animated.div className="panel panel-lb-carrier-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-carrier-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Carrier Info</div><div className="side-title"><div>Carrier Info</div></div>

                                <LbCarrierInfo
                                    title='Carrier Info'
                                    panelName={'lb-carrier-info'}
                                    tabTimes={35000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCarriers={props.setLbCarrierInfoCarriers}
                                    setSelectedCarrier={props.setSelectedLbCarrierInfoCarrier}
                                    setSelectedCarrierContact={props.setSelectedLbCarrierInfoContact}
                                    setSelectedCarrierNote={props.setSelectedLbCarrierInfoNote}
                                    setContactSearch={props.setLbCarrierInfoContactSearch}
                                    setShowingCarrierContactList={props.setLbCarrierInfoShowingContactList}
                                    setCarrierSearch={props.setLbCarrierInfoCarrierSearch}
                                    setCarrierContacts={props.setLbCarrierInfoCarrierContacts}
                                    setContactSearchCarrier={props.setLbCarrierInfoContactSearchCarrier}
                                    setIsEditingContact={props.setLbCarrierInfoIsEditingContact}
                                    setSelectedCarrierDocument={props.setSelectedLbCarrierInfoDocument}
                                    setDrivers={props.setLbCarrierInfoDrivers}
                                    setSelectedDriver={props.setSelectedLbCarrierInfoDriver}
                                    setEquipments={props.setLbCarrierInfoEquipments}
                                    setInsuranceTypes={props.setLbCarrierInfoInsuranceTypes}
                                    setSelectedEquipment={props.setSelectedLbCarrierInfoEquipment}
                                    setSelectedInsuranceType={props.setSelectedLbCarrierInfoInsuranceType}
                                    setFactoringCompanySearch={props.setLbCarrierInfoFactoringCompanySearch}
                                    setFactoringCompanies={props.setLbCarrierInfoFactoringCompanies}
                                    setCarrierInsurances={props.setLbCarrierInfoCarrierInsurances}
                                    setSelectedInsurance={props.setSelectedLbCarrierInfoInsurance}
                                    setSelectedFactoringCompany={props.setSelectedLbCarrierInfoFactoringCompany}
                                    setSelectedFactoringCompanyContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}
                                    setEquipmentInformation={props.setLbCarrierInfoEquipmentInformation}

                                    carriers={props.lbCarrierInfoCarriers}
                                    contacts={props.lbCarrierInfoContacts}
                                    selectedCarrier={props.selectedLbCarrierInfoCarrier}
                                    selectedContact={props.selectedLbCarrierInfoContact}
                                    selectedNote={props.selectedLbCarrierInfoNote}
                                    selectedDirection={props.selectedLbCarrierInfoDirection}
                                    contactSearch={props.lbCarrierInfoContactSearch}
                                    showingContactList={props.lbCarrierInfoShowingContactList}
                                    carrierSearch={props.lbCarrierInfoCarrierSearch}
                                    selectedDocument={props.selectedLbCarrierInfoDocument}
                                    drivers={props.lbCarrierInfoDrivers}
                                    selectedDriver={props.selectedLbCarrierInfoDriver}
                                    equipments={props.lbCarrierInfoEquipments}
                                    insuranceTypes={props.lbCarrierInfoInsuranceTypes}
                                    selectedEquipment={props.selectedLbCarrierInfoEquipment}
                                    selectedInsuranceType={props.selectedLbCarrierInfoInsuranceType}
                                    factoringCompanySearch={props.lbCarrierInfoFactoringCompanySearch}
                                    factoringCompanies={props.lbCarrierInfoFactoringCompanies}
                                    carrierInsurances={props.lbCarrierInfoCarrierInsurances}
                                    selectedInsurance={props.selectedLbCarrierInfoInsurance}
                                    selectedFactoringCompany={props.selectedLbCarrierInfoFactoringCompany}
                                    selectedFactoringCompanyContact={props.selectedLbCarrierInfoFactoringCompanyContact}
                                    equipmentInformation={props.lbCarrierInfoEquipmentInformation}

                                    carrierSearchPanelName='lb-carrier-info-search'
                                    carrierContactSearchPanelName='lb-carrier-info-contact-search'
                                    carrierContactsPanelName='lb-carrier-info-contacts'
                                    carrierDocumentsPanelName='lb-carrier-info-documents'
                                    carrierRevenueInformationPanelName='lb-carrier-info-revenue-information'
                                    carrierOrderHistoryPanelName='lb-carrier-info-order-history'
                                    carrierEquipmentPanelName='lb-carrier-info-equipment-information'
                                    carrierFactoringCompanySearchPanelName='lb-carrier-info-factoring-company-search'
                                    carrierFactoringCompanyPanelSearchPanelName='lb-carrier-info-factoring-company-panel-search'
                                    carrierFactoringCompanyPanelName='lb-carrier-info-factoring-company'
                                    carrierFactoringCompanyContactsPanelName='lb-carrier-info-factoring-company-contacts'
                                    carrierFactoringCompanyContactSearchPanelName='lb-carrier-info-factoring-company-contact-search'
                                    carrierFactoringCompanyInvoiceSearchPanelName='lb-carrier-info-factoring-company-invoice-search'
                                    carrierFactoringCompanyDocumentsPanelName='lb-carrier-info-factoring-company-documents'
                                />

                            </div>
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO =============================== */}

            {/* ================================== LB CARRIER INFO SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-search'))
                        }}>
                            <LbCarrierInfoSearch
                                title='Carrier Search Results'
                                tabTimes={69000}
                                panelName='lb-carrier-info-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedLbCarrierInfoContact}

                                customers={props.lbCarrierInfoCarriers}
                                customerSearch={props.lbCarrierInfoCarrierSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-contact-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-contact-search'))
                        }}>
                            <LbCarrierInfoContactSearch
                                title='Contact Search Results'
                                tabTimes={67000}
                                parentPanelName='lb-carrier-info-contacts'
                                panelName='lb-carrier-info-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedLbCarrierInfoContact}
                                setCustomerContacts={props.setLbCarrierInfoCarrierContacts}
                                setContactSearch={props.setLbCarrierInfoContactSearch}
                                setShowingContactList={props.setLbCarrierInfoShowingContactList}
                                setContactSearchCustomer={props.setLbCarrierInfoContactSearchCarrier}

                                customers={props.lbCarrierInfoCarriers}
                                contactSearch={props.lbCarrierInfoContactSearch}
                                contacts={props.lbCarrierInfoContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-contacts')}
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
                        <animated.div className="panel panel-lb-carrier-info-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-contacts'))
                        }}>
                            <LbCarrierInfoContacts
                                title='Contacts'
                                tabTimes={68000}
                                panelName='lb-carrier-info-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedLbCarrierInfoContact}
                                setIsEditingContact={props.setLbCarrierInfoIsEditingContact}
                                setContactSearchCustomer={props.setLbCarrierInfoContactSearchCarrier}

                                contactSearchCustomer={props.lbCarrierInfoContactSearchCarrier}
                                selectedCustomer={props.selectedLbCarrierInfoCarrier}
                                selectedContact={props.selectedLbCarrierInfoContact}
                                isEditingContact={props.lbCarrierInfoIsEditingContact}
                                contacts={props.lbCarrierInfoContacts}
                                savingContactUrl='/saveCarrierContact'
                                deletingContactUrl='/deleteCarrierContact'
                                uploadAvatarUrl='/uploadCarrierAvatar'
                                removeAvatarUrl='/removeCarrierAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO CONTACTS =============================== */}

            {/* ================================== LB CARRIER INFO DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-documents')}
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
                        <animated.div className="panel panel-lb-carrier-info-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-documents'))
                        }}>
                            <LbCarrierInfoDocuments
                                title='Documents'
                                tabTimes={73000}
                                panelName='lb-carrier-info-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedLbCarrierInfoDocument}
                                setSelectedOwner={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedOwnerDocumentTags={props.setSelectedLbCarrierInfoDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedLbCarrierInfoDocumentNote}

                                selectedOwner={props.selectedLbCarrierInfoCarrier}
                                selectedOwnerDocument={props.selectedLbCarrierInfoDocument}
                                selectedOwnerDocumentTags={props.selectedLbCarrierInfoDocumentTags}
                                selectedOwnerDocumentNote={props.selectedLbCarrierInfoDocumentNote}

                                origin='carrier'

                                savingDocumentUrl='/saveCarrierDocument'
                                deletingDocumentUrl='/deleteCarrierDocument'
                                savingDocumentNoteUrl='/saveCarrierDocumentNote'
                                serverDocumentsFolder='/carrier-documents/'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO DOCUMENTS =============================== */}

            {/* ================================== LB CARRIER INFO REVENUE INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-revenue-information')}
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
                        <animated.div className="panel panel-lb-carrier-info-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-revenue-information'))
                        }}>
                            <LbCarrierInfoRevenueInformation
                                title='Revenue Information'
                                tabTimes={70000}
                                panelName='lb-carrier-info-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-order-history')}
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
                        <animated.div className="panel panel-lb-carrier-info-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-order-history'))
                        }}>
                            <LbCarrierInfoOrderHistory
                                title='Order History'
                                tabTimes={72000}
                                panelName='lb-carrier-info-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO ORDER HISTORY =============================== */}

            {/* ================================== LB CARRIER INFO EQUIPMENT INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-equipment-information')}
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
                        <animated.div className="panel panel-lb-carrier-info-equipment-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-equipment-information'))
                        }}>
                            <LbCarrierInfoEquipmentInformation
                                title='Equipment Information'
                                tabTimes={71000}
                                panelName='lb-carrier-info-equipment-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setEquipmentInformation={props.setLbCarrierInfoEquipmentInformation}
                                equipmentInformation={props.lbCarrierInfoEquipmentInformation}

                                setSelectedCarrier={props.setSelectedLbCarrierInfoCarrier}
                                selectedCarrier={props.selectedLbCarrierInfoCarrier}
                                setSelectedCarrierContact={props.selectedLbCarrierInfoContact}
                                setSelectedDriver={props.setSelectedLbCarrierInfoDriver}
                                setSelectedInsurance={props.setSelectedLbCarrierInfoInsurance}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO EQUIPMENT INFORMATION =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company'))
                        }}>
                            <LbCarrierInfoFactoringCompany
                                title='Factoring Company'
                                tabTimes={61000}
                                panelName='lb-carrier-info-factoring-company'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompanyContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}
                                setSelectedFactoringCompanyContactSearch={props.setSelectedLbCarrierInfoFactoringCompanyContactSearch}
                                setSelectedFactoringCompanyIsShowingContactList={props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList}
                                setSelectedFactoringCompany={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyNote={props.setSelectedLbCarrierInfoFactoringCompanyNote}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch}
                                setSelectedFactoringCompanyInvoices={props.setSelectedLbCarrierInfoFactoringCompanyInvoices}
                                setFactoringCompanyIsEditingContact={props.setLbCarrierInfoFactoringCompanyIsEditingContact}
                                setFactoringCompanyContacts={props.setLbCarrierInfoFactoringCompanyContacts}
                                setSelectedFactoringCompanyInvoice={props.setSelectedLbCarrierInfoFactoringCompanyInvoice}
                                setSelectedFactoringCompanyIsShowingInvoiceList={props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList}
                                setFactoringCompanySearch={props.setLbCarrierInfoFactoringCompanySearch}
                                setFactoringCompanies={props.setLbCarrierInfoFactoringCompanies}
                                setSelectedFactoringCompanyDocument={props.setSelectedLbCarrierInfoFactoringCompanyDocument}

                                factoringCompanySearch={props.lbCarrierInfoFactoringCompanySearch}
                                selectedFactoringCompany={props.selectedLbCarrierInfoFactoringCompany}
                                selectedFactoringCompanyContact={props.selectedLbCarrierInfoFactoringCompanyContact}
                                selectedFactoringCompanyIsShowingContactList={props.selectedLbCarrierInfoFactoringCompanyIsShowingContactList}
                                selectedFactoringCompanyNote={props.selectedLbCarrierInfoFactoringCompanyNote}
                                selectedFactoringCompanyContactSearch={props.selectedLbCarrierInfoFactoringCompanyContactSearch}
                                selectedFactoringCompanyInvoice={props.selectedLbCarrierInfoFactoringCompanyInvoice}
                                selectedFactoringCompanyIsShowingInvoiceList={props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList}
                                selectedFactoringCompanyInvoiceSearch={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch}

                                factoringCompanySearchPanelName='lb-carrier-info-factoring-company-search'
                                factoringCompanyPanelSearchPanelName='lb-carrier-info-factoring-company-panel-search'
                                factoringCompanyContactsPanelName='lb-carrier-info-factoring-company-contacts'
                                factoringCompanyContactSearchPanelName='lb-carrier-info-factoring-company-contact-search'
                                factoringCompanyDocumentsPanelName='lb-carrier-info-factoring-company-documents'
                                factoringCompanyInvoiceSearchPanelName='lb-carrier-info-factoring-company-invoice-search'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanySearch
                                title='Factoring Company Search'
                                tabTimes={60000}
                                panelName='lb-carrier-info-factoring-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}

                                customers={props.lbCarrierInfoFactoringCompanies}
                                customerSearch={props.lbCarrierInfoFactoringCompanySearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== LB CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-panel-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-panel-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-panel-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyPanelSearch
                                title='Factoring Company Search'
                                tabTimes={62000}
                                panelName='lb-carrier-info-factoring-company-panel-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setFactoringCompanySearch={props.setLbCarrierInfoFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}
                                factoringCompanies={props.lbCarrierInfoFactoringCompanies}
                                factoringCompanySearch={props.lbCarrierInfoFactoringCompanySearch}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-contacts')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-contacts'))
                        }}>
                            <LbCarrierInfoFactoringCompanyContacts
                                title='Contacts'
                                tabTimes={63000}
                                panelName='lb-carrier-info-factoring-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}
                                setIsEditingContact={props.setLbCarrierInfoFactoringCompanyIsEditingContact}
                                setContactSearchCustomer={props.setSelectedLbCarrierInfoFactoringCompanyContactSearch}

                                contactSearchCustomer={props.selectedLbCarrierInfoFactoringCompanyContactSearch}
                                selectedCustomer={props.selectedLbCarrierInfoFactoringCompany}
                                selectedContact={props.selectedLbCarrierInfoFactoringCompanyContact}
                                isEditingContact={props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                contacts={props.lbCarrierInfoFactoringCompanyContacts}
                                savingContactUrl='/saveFactoringCompanyContact'
                                deletingContactUrl='/deleteFactoringCompanyContact'
                                uploadAvatarUrl='/uploadFactoringCompanyAvatar'
                                removeAvatarUrl='/removeFactoringCompanyAvatar'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-contact-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-contact-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={64000}
                                parentPanelName='lb-carrier-info-factoring-company-contacts'
                                panelName='lb-carrier-info-factoring-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedLbCarrierInfoFactoringCompanyContact}
                                setCustomerContacts={props.setLbCarrierInfoFactoringCompanyContacts}
                                setContactSearch={props.setSelectedLbCarrierInfoFactoringCompanyContactSearch}
                                setShowingContactList={props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList}
                                setContactSearchCustomer={props.setSelectedLbCarrierInfoFactoringCompanyContactSearch}

                                customers={props.lbCarrierInfoFactoringCompanies}
                                contactSearch={props.selectedLbCarrierInfoFactoringCompanyContactSearch}
                                contacts={props.lbCarrierInfoFactoringCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-documents')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-documents'))
                        }}>
                            <LbCarrierInfoFactoringCompanyDocuments
                                title='Documents'
                                tabTimes={65000}
                                panelName='lb-carrier-info-factoring-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedLbCarrierInfoFactoringCompanyDocument}
                                setSelectedOwner={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedOwnerDocumentTags={props.setSelectedLbCarrierInfoFactoringCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedLbCarrierInfoFactoringCompanyDocumentNote}

                                selectedOwner={props.selectedLbCarrierInfoFactoringCompany}
                                selectedOwnerDocument={props.selectedLbCarrierInfoFactoringCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedLbCarrierInfoFactoringCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedLbCarrierInfoFactoringCompanyDocumentNote}

                                origin='factoring-company'

                                savingDocumentUrl='/saveFactoringCompanyDocument'
                                deletingDocumentUrl='/deleteFactoringCompanyDocument'
                                savingDocumentNoteUrl='/saveFactoringCompanyDocumentNote'
                                serverDocumentsFolder='/factoring-company-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-carrier-info-factoring-company-invoice-search')}
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
                        <animated.div className="panel panel-lb-carrier-info-factoring-company-invoice-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-carrier-info-factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-carrier-info-factoring-company-invoice-search'))
                        }}>
                            <LbCarrierInfoFactoringCompanyInvoiceSearch
                                title='Invoice Search Results'
                                tabTimes={66000}
                                panelName='lb-carrier-info-factoring-company-invoice-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompany={props.setSelectedLbCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyInvoice={props.setSelectedLbCarrierInfoFactoringCompanyInvoice}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch}

                                selectedFactoringCompany={props.selectedLbCarrierInfoFactoringCompany}
                                selectedFactoringCompanyInvoiceSearch={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== LB CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== LB DISPATCH =============================== */}
            {/* <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-dispatch')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-dispatch')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-dispatch')}
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
                        onStart={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        onStop={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-dispatch')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-dispatch" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-dispatch')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-dispatch'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-dispatch';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Dispatch</div><div className="side-title"><div>Dispatch</div></div>

                                <LbDispatch
                                    pageName={'Dispatch'}
                                    panelName={'lb-dispatch'}
                                    tabTimes={67000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    //dispatch
                                    setNewCarrier={props.setNewCarrier}
                                    setDispatchCarrierInfoCarriersChanging={props.setLbCarrierInfoCarriersChanging}
                                    setDispatchCarrierInfoCarrierSearchChanging={props.setDispatchCarrierInfoCarrierSearchChanging}
                                    setSelectedOrder={props.setSelectedOrder}
                                    setLbSelectedOrder={props.setLbSelectedOrder}
                                    setOrderNumber={props.setOrderNumber}
                                    setTripNumber={props.setTripNumber}
                                    setDivision={props.setDivision}
                                    setLoadType={props.setLoadType}
                                    setTemplate={props.setTemplate}
                                    setIsShowingShipperSecondPage={props.setIsShowingShipperSecondPage}
                                    setShipperBolNumber={props.setShipperBolNumber}
                                    setShipperPoNumber={props.setShipperPoNumber}
                                    setShipperRefNumber={props.setShipperRefNumber}
                                    setIsShowingConsigneeSecondPage={props.setIsShowingConsigneeSecondPage}
                                    setShowingChangeCarrier={props.setShowingChangeCarrier}
                                    setDispatchEvent={props.setDispatchEvent}
                                    setDispatchEventLocation={props.setDispatchEventLocation}
                                    setDispatchEventNotes={props.setDispatchEventNotes}
                                    setDispatchEventDate={props.setDispatchEventDate}
                                    setDispatchEventTime={props.setDispatchEventTime}
                                    
                                    setSelectedNoteForCarrier={props.setSelectedNoteForCarrier}
                                    setSelectedInternalNote={props.setSelectedInternalNote}
                                    
                                    selected_order={props.selected_order}
                                    order_number={props.order_number}
                                    trip_number={props.trip_number}
                                    division={props.division}
                                    load_type={props.load_type}
                                    template={props.template}
                                    shipperBolNumber={props.shipperBolNumber}
                                    shipperPoNumber={props.shipperPoNumber}
                                    shipperRefNumber={props.shipperRefNumber}
                                    
                                    newCarrier={props.lbDispatchNewCarrier}

                                    dispatchEvent={props.dispatchEvent}
                                    dispatchEventLocation={props.dispatchEventLocation}
                                    dispatchEventNotes={props.dispatchEventNotes}
                                    dispatchEventDate={props.dispatchEventDate}
                                    dispatchEventTime={props.dispatchEventTime}
                                    dispatchEvents={props.dispatchEvents}
                                    selectedNoteForCarrier={props.selectedNoteForCarrier}
                                    selectedInternalNote={props.selectedInternalNote}
                                    isShowingShipperSecondPage={props.isShowingShipperSecondPage}
                                    isShowingConsigneeSecondPage={props.isShowingConsigneeSecondPage}
                                    setSelectedOrderDocument={props.setSelectedOrderDocument}

                                    mileageLoaderVisible={props.mileageLoaderVisible}
                                    showingChangeCarrier={props.showingChangeCarrier}

                                    //customer
                                    setBillToCompanies={props.setBillToCompanies}
                                    setSelectedBillToCompanyInfo={props.setSelectedBillToCompanyInfo}
                                    setBillToCompanySearch={props.setBillToCompanySearch}
                                    setSelectedBillToCompanyContact={props.setSelectedBillToCompanyContact}
                                    setShipperCompanies={props.setShipperCompanies}
                                    setSelectedShipperCompanyInfo={props.setSelectedShipperCompanyInfo}
                                    setShipperCompanySearch={props.setShipperCompanySearch}
                                    setSelectedShipperCompanyContact={props.setSelectedShipperCompanyContact}

                                    setConsigneeCompanies={props.setConsigneeCompanies}
                                    setSelectedConsigneeCompanyInfo={props.setSelectedConsigneeCompanyInfo}
                                    setConsigneeCompanySearch={props.setConsigneeCompanySearch}
                                    setSelectedConsigneeCompanyContact={props.setSelectedConsigneeCompanyContact}

                                    selectedBillToCompanyInfo={props.selectedBillToCompanyInfo}
                                    selectedBillToCompanyContact={props.selectedBillToCompanyContact}
                                    billToCompanySearch={props.billToCompanySearch}
                                    selectedShipperCompanyInfo={props.selectedShipperCompanyInfo}
                                    selectedShipperCompanyContact={props.selectedShipperCompanyContact}
                                    shipperCompanySearch={props.shipperCompanySearch}
                                    selectedConsigneeCompanyInfo={props.selectedConsigneeCompanyInfo}
                                    selectedConsigneeCompanyContact={props.selectedConsigneeCompanyContact}
                                    consigneeCompanySearch={props.consigneeCompanySearch}

                                    //carrier
                                    setSelectedDispatchCarrierInfoCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                    setSelectedDispatchCarrierInfoContact={props.setSelectedDispatchCarrierInfoContact}
                                    setSelectedDispatchCarrierInfoDriver={props.setSelectedDispatchCarrierInfoDriver}
                                    setSelectedDispatchCarrierInfoInsurance={props.setSelectedDispatchCarrierInfoInsurance}
                                    setDispatchCarrierInfoCarrierSearch={props.setDispatchCarrierInfoCarrierSearch}
                                    setDispatchCarrierInfoCarriers={props.setDispatchCarrierInfoCarriers}

                                    selectedDispatchCarrierInfoCarrier={props.selectedDispatchCarrierInfoCarrier}
                                    selectedDispatchCarrierInfoContact={props.selectedDispatchCarrierInfoContact}
                                    selectedDispatchCarrierInfoDriver={props.selectedDispatchCarrierInfoDriver}
                                    selectedDispatchCarrierInfoInsurance={props.selectedDispatchCarrierInfoInsurance}


                                    billToCompanyInfoPanelName='bill-to-company-info'
                                    billToCompanySearchPanelName='bill-to-company-search'
                                    shipperCompanyInfoPanelName='shipper-company-info'
                                    shipperCompanySearchPanelName='shipper-company-search'
                                    consigneeCompanyInfoPanelName='consignee-company-info'
                                    consigneeCompanySearchPanelName='consignee-company-search'
                                    carrierInfoPanelName='carrier-info'
                                    carrierInfoSearchPanelName='carrier-info-search'
                                    routingPanelName='routing'
                                    ratingScreenPanelName='rating-screen'
                                    adjustRatePanelName='adjust-rate'
                                    rateConfPanelName='rate-conf'
                                    orderPanelName='order'
                                    bolPanelName='bol'
                                    orderDocumentsPanelName='order-documents'
                                    loadBoardPanelName='load-board'
                                />
                            </div>
                        </animated.div>
                    </Draggable>

                ))}
            </Transition> */}
            {/* ================================== LB DISPATCH =============================== */}

            {/* ================================== LB INVOICE =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-invoice')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-invoice')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-invoice')}
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
                        onStart={(e, i) => eventControl(e, i, 'lb-invoice')}
                        onStop={(e, i) => eventControl(e, i, 'lb-invoice')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lb-invoice')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lb-invoice')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lb-invoice')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lb-invoice')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lb-invoice" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-invoice')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-invoice'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'lb-invoice';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Invoice</div><div className="side-title"><div>Invoice</div></div>

                                <LbInvoice
                                    pageName={'Invoice Page'}
                                    panelName={'lb-invoice'}
                                    isOnPanel={true}
                                    tabTimes={5000}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setInvoiceSelectedOrder={props.setLbInvoiceSelectedOrder}
                                    setInvoiceOrderNumber={props.setLbInvoiceOrderNumber}
                                    setInvoiceTripNumber={props.setLbInvoiceTripNumber}
                                    setInvoiceInternalNotes={props.setLbInvoiceInternalNotes}
                                    setInvoiceSelectedInternalNote={props.setLbInvoiceSelectedInternalNote}
                                    setInvoiceSelectedBillToCompanyInfo={props.setLbSelectedBillToCompanyInfo}
                                    setInvoiceSelectedBillToCompanyContact={props.setLbSelectedBillToCompanyContact}
                                    setInvoiceSelectedBillToCompanyDocument={props.setLbSelectedBillToCompanyDocument}
                                    setInvoiceSelectedBillToCompanyDocumentTags={props.setLbSelectedBillToCompanyDocumentTags}
                                    setInvoiceSelectedBillToCompanyDocumentNote={props.setLbSelectedBillToCompanyDocumentNote}
                                    setSelectedInvoiceCarrierInfoCarrier={props.setSelectedLbCarrierInfoCarrier}
                                    setSelectedInvoiceCarrierInfoContact={props.setSelectedLbCarrierInfoContact}
                                    setSelectedInvoiceCarrierInfoDriver={props.setSelectedLbCarrierInfoDriver}
                                    setSelectedInvoiceCarrierInfoInsurance={props.setSelectedLbCarrierInfoInsurance}
                                    setSelectedInvoiceCarrierInfoDocument={props.setSelectedLbCarrierInfoDocument}
                                    setSelectedInvoiceCarrierInfoDocumentTags={props.setSelectedLbCarrierInfoDocumentTags}
                                    setSelectedInvoiceCarrierInfoDocumentNote={props.setSelectedLbCarrierInfoDocumentNote}

                                    internalNotes={props.lbInvoiceInternalNotes}
                                    selectedInternalNote={props.lbSelectedInvoiceInternalNote}
                                    selected_order={props.lb_invoice_selected_order}
                                    order_number={props.lb_invoice_order_number}
                                    trip_number={props.lb_invoice_trip_number}
                                    selectedBillToCompanyInfo={props.selectedLbBillToCompanyInfo}
                                    selectedBillToCompanyContact={props.selectedLbBillToCompanyContact}
                                    selectedBillToCompanyDocument={props.selectedLbBillToCompanyDocument}
                                    billToCompanyDocumentTags={props.selectedLbBillToCompanyDocumentTags}
                                    selectedBillToCompanyDocumentNote={props.selectedLbBillToCompanyDocumentNote}
                                    selectedInvoiceCarrierInfoCarrier={props.selectedLbCarrierInfoCarrier}
                                    selectedInvoiceCarrierInfoContact={props.selectedLbCarrierInfoContact}
                                    selectedInvoiceCarrierInfoDriver={props.selectedLbCarrierInfoDriver}
                                    selectedInvoiceCarrierInfoInsurance={props.selectedLbCarrierInfoInsurance}
                                    selectedCarrier={props.selectedLbCarrierInfoCarrier}
                                    selectedDocument={props.selectedLbCarrierInfoDocument}
                                    documentTags={props.selectedLbCarrierInfoDocumentTags}
                                    selectedDocumentNote={props.selectedLbCarrierInfoDocumentNote}

                                    billToCompanyInfoPanelName='lb-bill-to-company-info'
                                    billToCompanyDocumentsPanelName='lb-bill-to-company-documents'
                                    carrierInfoPanelName='lb-carrier-info'
                                    carrierInfoDocumentsPanelName='lb-carrier-info-documents'
                                />
                            </div>
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB INVOICE =============================== */}

            {/* ================================== LB ROUTING =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-routing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-routing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-routing')}
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
                        <animated.div className="panel panel-lb-routing" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-routing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-routing'))
                        }}>
                            <LbRouting
                                title='Routing'
                                tabTimes={39000}
                                panelName='lb-routing'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOrder={props.setLbSelectedOrder}
                                setMileageLoaderVisible={props.setLbMileageLoaderVisible}
                                setSelectedCarrierInfoCarrier={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedCarrierInfoContact={props.setSelectedLbCarrierInfoContact}
                                setSelectedCarrierInfoDriver={props.setSelectedLbCarrierInfoDriver}
                                setSelectedCarrierInfoInsurance={props.setSelectedLbCarrierInfoInsurance}

                                selected_order={props.lb_selected_order}
                                order_number={props.lb_order_number}
                                trip_number={props.lb_trip_number}
                                mileageLoaderVisible={props.lbMileageLoaderVisible}
                                selectedCarrierInfoCarrier={props.selectedLbCarrierInfoCarrier}
                                selectedCarrierInfoContact={props.selectedLbCarrierInfoContact}
                                selectedCarrierInfoDriver={props.selectedLbCarrierInfoDriver}
                                selectedCarrierInfoInsurance={props.selectedLbCarrierInfoInsurance}

                                carrierInfoPanelName='lb-carrier-info'
                                rateConfPanelName='lb-rate-conf'
                            />
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
                    zIndex: props.openedPanels.indexOf('lb-rate-conf')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-rate-conf')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-rate-conf')}
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
                        <animated.div className="panel panel-lb-rate-conf" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-rate-conf')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-rate-conf'))
                        }}>
                            <LbRateConf
                                title='Rate Conf'
                                tabTimes={41000}
                                panelName='lb-rate-conf'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB RATE CONF =============================== */}

            {/* ================================== LB ORDER =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lb-order')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lb-order')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lb-order')}
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
                        <animated.div className="panel panel-lb-order" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lb-order')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lb-order'))
                        }}>
                            <LbOrder title='Order'
                                tabTimes={37000}
                                panelName='lb-order'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                selected_order={props.lb_selected_order}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LB ORDER =============================== */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openedPanels: state.loadBoardReducers.loadBoardOpenedPanels,
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,

        //BILL TO COMPANY INFO
        lbBillToCompanies: state.customerReducers.lbBillToCompanies,
        selectedLbBillToCompanyInfo: state.customerReducers.selectedLbBillToCompanyInfo,
        lbBillToCompanySearch: state.customerReducers.lbBillToCompanySearch,
        lbBillToCompanyContacts: state.customerReducers.lbBillToCompanyContacts,
        selectedLbBillToCompanyContact: state.customerReducers.selectedLbBillToCompanyContact,
        lbBillToCompanyContactSearch: state.customerReducers.lbBillToCompanyContactSearch,
        lbBillToCompanyShowingContactList: state.customerReducers.lbBillToCompanyShowingContactList,
        lbBillToCompanyAutomaticEmailsTo: state.customerReducers.lbBillToCompanyAutomaticEmailsTo,
        lbBillToCompanyAutomaticEmailsCc: state.customerReducers.lbBillToCompanyAutomaticEmailsCc,
        lbBillToCompanyAutomaticEmailsBcc: state.customerReducers.lbBillToCompanyAutomaticEmailsBcc,
        selectedLbBillToCompanyNote: state.customerReducers.selectedLbBillToCompanyNote,
        selectedLbBillToCompanyDirection: state.customerReducers.selectedLbBillToCompanyDirection,
        selectedLbBillToCompanyDocument: state.customerReducers.selectedLbBillToCompanyDocument,
        selectedLbBillToCompanyDocumentNote: state.customerReducers.selectedLbBillToCompanyDocumentNote,
        selectedLbBillToCompanyDocumentTags: state.customerReducers.lbBillToCompanyDocumentTags,
        lbBillToCompanyContactSearchCustomer: state.customerReducers.lbBillToCompanyContactSearchCustomer,
        lbBillToCompanyIsEditingContact: state.customerReducers.lbBillToCompanyIsEditingContact,

        //SHIPPER COMPANY INFO
        lbShipperCompanies: state.customerReducers.lbShipperCompanies,
        selectedLbShipperCompanyInfo: state.customerReducers.selectedLbShipperCompanyInfo,
        lbShipperCompanySearch: state.customerReducers.lbShipperCompanySearch,
        lbShipperCompanyContacts: state.customerReducers.lbShipperCompanyContacts,
        selectedLbShipperCompanyContact: state.customerReducers.selectedLbShipperCompanyContact,
        lbShipperCompanyContactSearch: state.customerReducers.lbShipperCompanyContactSearch,
        lbShipperCompanyShowingContactList: state.customerReducers.lbShipperCompanyShowingContactList,
        lbShipperCompanyAutomaticEmailsTo: state.customerReducers.lbShipperCompanyAutomaticEmailsTo,
        lbShipperCompanyAutomaticEmailsCc: state.customerReducers.lbShipperCompanyAutomaticEmailsCc,
        lbShipperCompanyAutomaticEmailsBcc: state.customerReducers.lbShipperCompanyAutomaticEmailsBcc,
        selectedLbShipperCompanyNote: state.customerReducers.selectedLbShipperCompanyNote,
        selectedLbShipperCompanyDirection: state.customerReducers.selectedLbShipperCompanyDirection,
        selectedLbShipperCompanyDocument: state.customerReducers.selectedLbShipperCompanyDocument,
        selectedLbShipperCompanyDocumentNote: state.customerReducers.selectedLbShipperCompanyDocumentNote,
        selectedLbShipperCompanyDocumentTags: state.customerReducers.lbShipperCompanyDocumentTags,
        lbShipperCompanyContactSearchCustomer: state.customerReducers.lbShipperCompanyContactSearchCustomer,
        lbShipperCompanyIsEditingContact: state.customerReducers.lbShipperCompanyIsEditingContact,

        //CONSIGNEE COMPANY INFO
        lbConsigneeCompanies: state.customerReducers.lbConsigneeCompanies,
        selectedLbConsigneeCompanyInfo: state.customerReducers.selectedLbConsigneeCompanyInfo,
        lbConsigneeCompanySearch: state.customerReducers.lbConsigneeCompanySearch,
        lbConsigneeCompanyContacts: state.customerReducers.lbConsigneeCompanyContacts,
        selectedLbConsigneeCompanyContact: state.customerReducers.selectedLbConsigneeCompanyContact,
        lbConsigneeCompanyContactSearch: state.customerReducers.lbConsigneeCompanyContactSearch,
        lbConsigneeCompanyShowingContactList: state.customerReducers.lbConsigneeCompanyShowingContactList,
        lbConsigneeCompanyAutomaticEmailsTo: state.customerReducers.lbConsigneeCompanyAutomaticEmailsTo,
        lbConsigneeCompanyAutomaticEmailsCc: state.customerReducers.lbConsigneeCompanyAutomaticEmailsCc,
        lbConsigneeCompanyAutomaticEmailsBcc: state.customerReducers.lbConsigneeCompanyAutomaticEmailsBcc,
        selectedLbConsigneeCompanyNote: state.customerReducers.selectedLbConsigneeCompanyNote,
        selectedLbConsigneeCompanyDirection: state.customerReducers.selectedLbConsigneeCompanyDirection,
        selectedLbConsigneeCompanyDocument: state.customerReducers.selectedLbConsigneeCompanyDocument,
        selectedLbConsigneeCompanyDocumentNote: state.customerReducers.selectedLbConsigneeCompanyDocumentNote,
        selectedLbConsigneeCompanyDocumentTags: state.customerReducers.lbConsigneeCompanyDocumentTags,
        lbConsigneeCompanyContactSearchCustomer: state.customerReducers.lbConsigneeCompanyContactSearchCustomer,
        lbConsigneeCompanyIsEditingContact: state.customerReducers.lbConsigneeCompanyIsEditingContact,

        //CARRIER
        lbCarrierInfoCarriers: state.carrierReducers.lbCarrierInfoCarriers,
        lbCarrierInfoContacts: state.carrierReducers.lbCarrierInfoContacts,
        selectedLbCarrierInfoCarrier: state.carrierReducers.selectedLbCarrierInfoCarrier,
        selectedLbCarrierInfoContact: state.carrierReducers.selectedLbCarrierInfoContact,
        selectedLbCarrierInfoNote: state.carrierReducers.selectedLbCarrierInfoNote,
        selectedLbCarrierInfoDirection: state.carrierReducers.selectedLbCarrierInfoDirection,
        lbCarrierInfoContactSearch: state.carrierReducers.lbCarrierInfoContactSearch,
        lbCarrierInfoContactSearchCarrier: state.carrierReducers.lbCarrierInfoContactSearchCarrier,
        lbCarrierInfoShowingContactList: state.carrierReducers.lbCarrierInfoShowingContactList,
        lbCarrierInfoIsEditingContact: state.carrierReducers.lbCarrierInfoIsEditingContact,
        lbCarrierInfoCarrierSearch: state.carrierReducers.lbCarrierInfoCarrierSearch,
        selectedLbCarrierInfoDocument: state.carrierReducers.selectedLbCarrierInfoDocument,
        selectedLbCarrierInfoDocumentNote: state.carrierReducers.selectedLbCarrierInfoDocumentNote,
        selectedLbCarrierInfoDocumentTags: state.carrierReducers.lbCarrierInfoDocumentTags,
        lbCarrierInfoDrivers: state.carrierReducers.drivers,
        selectedLbCarrierInfoDriver: state.carrierReducers.selectedLbCarrierInfoDriver,
        lbCarrierInfoEquipments: state.carrierReducers.lbCarrierInfoEquipments,
        lbCarrierInfoInsuranceTypes: state.carrierReducers.lbCarrierInfoInsuranceTypes,
        selectedLbCarrierInfoEquipment: state.carrierReducers.selectedLbCarrierInfoEquipment,
        selectedLbCarrierInfoInsuranceType: state.carrierReducers.selectedLbCarrierInfoInsuranceType,
        lbCarrierInfoFactoringCompanySearch: state.carrierReducers.lbCarrierInfoFactoringCompanySearch,
        lbCarrierInfoFactoringCompanies: state.carrierReducers.lbCarrierInfoFactoringCompanies,
        lbCarrierInfoCarrierInsurances: state.carrierReducers.lbCarrierInfoCarrierInsurances,
        selectedLbCarrierInfoInsurance: state.carrierReducers.selectedLbCarrierInfoInsurance,
        selectedLbCarrierInfoFactoringCompany: state.carrierReducers.selectedLbCarrierInfoFactoringCompany,
        selectedLbCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContact,
        lbCarrierInfoEquipmentInformation: state.carrierReducers.lbCarrierInfoEquipmentInformation,
        selectedLbCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyIsShowingContactList,
        selectedLbCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyNote,
        selectedLbCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContactSearch,
        selectedLbCarrierInfoFactoringCompanyInvoice: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyInvoice,
        selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
        selectedLbCarrierInfoFactoringCompanyInvoiceSearch: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyInvoiceSearch,
        lbCarrierInfoFactoringCompanyIsEditingContact: state.carrierReducers.lbCarrierInfoFactoringCompanyIsEditingContact,
        selectedLbCarrierInfoFactoringCompanyDocument: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyDocument,
        selectedLbCarrierInfoFactoringCompanyDocumentNote: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyDocumentNote,
        selectedLbCarrierInfoFactoringCompanyDocumentTags: state.carrierReducers.lbCarrierInfoFactoringCompanyDocumentTags,
        lbCarrierInfoFactoringCompanyContacts: state.carrierReducers.lbCarrierInfoFactoringCompanyContacts,

        lb_selected_order: state.dispatchReducers.lb_selected_order,
        lb_order_number: state.dispatchReducers.lb_order_number,
        lb_trip_number: state.dispatchReducers.lb_trip_number,
        lbMileageLoaderVisible: state.dispatchReducers.lbMileageLoaderVisible,

        //INVOICE
        lb_invoice_selected_order: state.invoiceReducers.lb_selected_order,
        lb_invoice_order_number: state.invoiceReducers.lb_order_number,
        lb_invoice_trip_number: state.invoiceReducers.lb_trip_number,
        lbInvoiceInternalNotes: state.invoiceReducers.lbInternalNotes,
        lbSelectedInvoiceInternalNote: state.invoiceReducers.lbSelectedInternalNote,
    }
}

export default connect(mapStateToProps, {
    setOpenedPanels,

    // BILL TO COMPANY INFO
    setLbBillToCompanies,
    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbSelectedBillToCompanyNote,
    setLbSelectedBillToCompanyDirection,
    setLbBillToCompanyContactSearch,
    setLbBillToCompanyAutomaticEmailsTo,
    setLbBillToCompanyAutomaticEmailsCc,
    setLbBillToCompanyAutomaticEmailsBcc,
    setLbBillToCompanyShowingContactList,
    setLbBillToCompanySearch,
    setLbBillToCompanyContacts,
    setLbBillToCompanyContactSearchCustomer,
    setLbBillToCompanyIsEditingContact,
    setLbSelectedBillToCompanyDocument,
    setLbSelectedBillToCompanyDocumentNote,
    setLbSelectedBillToCompanyDocumentTags,

    // SHIPPER COMPANY INFO
    setLbShipperCompanies,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbSelectedShipperCompanyNote,
    setLbSelectedShipperCompanyDirection,
    setLbShipperCompanyContactSearch,
    setLbShipperCompanyAutomaticEmailsTo,
    setLbShipperCompanyAutomaticEmailsCc,
    setLbShipperCompanyAutomaticEmailsBcc,
    setLbShipperCompanyShowingContactList,
    setLbShipperCompanySearch,
    setLbShipperCompanyContacts,
    setLbShipperCompanyContactSearchCustomer,
    setLbShipperCompanyIsEditingContact,
    setLbSelectedShipperCompanyDocument,
    setLbSelectedShipperCompanyDocumentNote,
    setLbSelectedShipperCompanyDocumentTags,

    // CONSIGNEE COMPANY INFO
    setLbConsigneeCompanies,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbSelectedConsigneeCompanyNote,
    setLbSelectedConsigneeCompanyDirection,
    setLbConsigneeCompanyContactSearch,
    setLbConsigneeCompanyAutomaticEmailsTo,
    setLbConsigneeCompanyAutomaticEmailsCc,
    setLbConsigneeCompanyAutomaticEmailsBcc,
    setLbConsigneeCompanyShowingContactList,
    setLbConsigneeCompanySearch,
    setLbConsigneeCompanyContacts,
    setLbConsigneeCompanyContactSearchCustomer,
    setLbConsigneeCompanyIsEditingContact,
    setLbSelectedConsigneeCompanyDocument,
    setLbSelectedConsigneeCompanyDocumentNote,
    setLbSelectedConsigneeCompanyDocumentTags,

    // CARRIER INFO
    setLbCarrierInfoCarriers,
    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoNote,
    setSelectedLbCarrierInfoContact,
    setLbCarrierInfoCarrierContacts,
    setLbCarrierInfoCarrierSearch,
    setLbCarrierInfoContactSearch,
    setLbCarrierInfoShowingContactList,
    setLbCarrierInfoContactSearchCarrier,
    setLbCarrierInfoIsEditingContact,
    setSelectedLbCarrierInfoDocument,
    setSelectedLbCarrierInfoDocumentNote,
    setSelectedLbCarrierInfoDocumentTags,
    setLbCarrierInfoEquipmentInformation,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoDrivers,
    setSelectedLbCarrierInfoDriver,
    setSelectedLbCarrierInfoInsurance,
    setLbCarrierInfoEquipments,
    setLbCarrierInfoCarrierInsurances,
    setLbCarrierInfoInsuranceTypes,
    setSelectedLbCarrierInfoInsuranceType,
    setSelectedLbCarrierInfoEquipment,
    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompanyNote,
    setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedLbCarrierInfoFactoringCompanyInvoices,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setLbCarrierInfoFactoringCompanyContacts,
    setSelectedLbCarrierInfoFactoringCompanyInvoice,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setLbCarrierInfoFactoringCompanies,
    setSelectedLbCarrierInfoFactoringCompanyDocument,
    setSelectedLbCarrierInfoFactoringCompanyDocumentNote,
    setSelectedLbCarrierInfoFactoringCompanyDocumentTags,

    //DISPATCH
    setLbSelectedOrder,
    setLbMileageLoaderVisible,

    //INVOICE
    setLbInvoiceSelectedOrder,
    setLbInvoiceOrderNumber,
    setLbInvoiceTripNumber,
    setLbInvoiceInternalNotes,
    setLbInvoiceSelectedInternalNote,
})(PanelContainer)