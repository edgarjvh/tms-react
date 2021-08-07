import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {
    setDispatchOpenedPanels as setOpenedPanels,

    // BILL TO COMPANY INFO
    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setSelectedBillToCompanyNote,
    setSelectedBillToCompanyDirection,
    setBillToCompanyContactSearch,
    setBillToCompanyAutomaticEmailsTo,
    setBillToCompanyAutomaticEmailsCc,
    setBillToCompanyAutomaticEmailsBcc,
    setBillToCompanyShowingContactList,
    setBillToCompanySearch,
    setBillToCompanyContacts,
    setBillToCompanyContactSearchCustomer,
    setBillToCompanyIsEditingContact,
    setSelectedBillToCompanyDocument,
    setSelectedBillToCompanyDocumentNote,
    setBillToCompanyDocumentTags as setSelectedBillToCompanyDocumentTags,

    // SHIPPER COMPANY INFO
    setShipperCompanies,
    setSelectedShipperCompanyInfo,
    setSelectedShipperCompanyContact,
    setSelectedShipperCompanyNote,
    setSelectedShipperCompanyDirection,
    setShipperCompanyContactSearch,
    setShipperCompanyAutomaticEmailsTo,
    setShipperCompanyAutomaticEmailsCc,
    setShipperCompanyAutomaticEmailsBcc,
    setShipperCompanyShowingContactList,
    setShipperCompanySearch,
    setShipperCompanyContacts,
    setShipperCompanyContactSearchCustomer,
    setShipperCompanyIsEditingContact,
    setSelectedShipperCompanyDocument,
    setSelectedShipperCompanyDocumentNote,
    setShipperCompanyDocumentTags as setSelectedShipperCompanyDocumentTags,

    // CONSIGNEE COMPANY INFO
    setConsigneeCompanies,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setSelectedConsigneeCompanyNote,
    setSelectedConsigneeCompanyDirection,
    setConsigneeCompanyContactSearch,
    setConsigneeCompanyAutomaticEmailsTo,
    setConsigneeCompanyAutomaticEmailsCc,
    setConsigneeCompanyAutomaticEmailsBcc,
    setConsigneeCompanyShowingContactList,
    setConsigneeCompanySearch,
    setConsigneeCompanyContacts,
    setConsigneeCompanyContactSearchCustomer,
    setConsigneeCompanyIsEditingContact,
    setSelectedConsigneeCompanyDocument,
    setSelectedConsigneeCompanyDocumentNote,
    setConsigneeCompanyDocumentTags as setSelectedConsigneeCompanyDocumentTags,

    // CARRIER INFO
    setDispatchCarrierInfoCarriers,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoNote,
    setSelectedDispatchCarrierInfoContact,
    setDispatchCarrierInfoCarrierContacts,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoShowingContactList,
    setDispatchCarrierInfoContactSearchCarrier,
    setDispatchCarrierInfoIsEditingContact,
    setSelectedDispatchCarrierInfoDocument,
    setSelectedDispatchCarrierInfoDocumentNote,
    setDispatchCarrierInfoDocumentTags as setSelectedDispatchCarrierInfoDocumentTags,
    setDispatchCarrierInfoEquipmentInformation,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoDrivers,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
    setDispatchCarrierInfoEquipments,
    setDispatchCarrierInfoCarrierInsurances,
    setDispatchCarrierInfoInsuranceTypes,
    setSelectedDispatchCarrierInfoInsuranceType,
    setSelectedDispatchCarrierInfoEquipment,

    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyContact,
    setSelectedDispatchCarrierInfoFactoringCompanyContactSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedDispatchCarrierInfoFactoringCompanyNote,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoices,
    setDispatchCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchCarrierInfoFactoringCompanyContacts,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoice,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setDispatchCarrierInfoFactoringCompanies,
    setSelectedDispatchCarrierInfoFactoringCompanyDocument,
    setSelectedDispatchCarrierInfoFactoringCompanyDocumentNote,
    setDispatchCarrierInfoFactoringCompanyDocumentTags as setSelectedDispatchCarrierInfoFactoringCompanyDocumentTags,

    // LB BILL TO COMPANY INFO
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

    // LB SHIPPER COMPANY INFO
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

    // LB CONSIGNEE COMPANY INFO
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

    // LB CARRIER INFO
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
    setSelectedOrder,
    setMileageLoaderVisible,
    setSelectedOrderDocument,
    setSelectedOrderDocumentNote,
    setOrderDocumentTags as setSelectedOrderDocumentTags,

    setLbSelectedOrder,
    setLbMileageLoaderVisible,

    setNewCarrier,
    setIsSavingOrder,

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

import BillToCompanyInfo from './../../../customers/Customers.jsx';
import BillToCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import BillToCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import BillToCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import BillToCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import BillToCompanyDocuments from './../../../panels/documents/Documents.jsx';
import BillToCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import BillToCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import ShipperCompanyInfo from './../../../customers/Customers.jsx';
import ShipperCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import ShipperCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import ShipperCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import ShipperCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import ShipperCompanyDocuments from './../../../panels/documents/Documents.jsx';
import ShipperCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import ShipperCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import ConsigneeCompanyInfo from './../../../customers/Customers.jsx';
import ConsigneeCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import ConsigneeCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import ConsigneeCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import ConsigneeCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import ConsigneeCompanyDocuments from './../../../panels/documents/Documents.jsx';
import ConsigneeCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import ConsigneeCompanyContacts from './../../../panels/contacts/Contacts.jsx';

import CarrierInfo from './../../../carriers/Carriers.jsx';
import CarrierInfoContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import CarrierInfoContacts from './../../../panels/contacts/Contacts.jsx';
import CarrierInfoSearch from './../../../panels/customer-search/CustomerSearch.jsx';
import CarrierInfoEquipmentInformation from './../../../panels/equipment-information/EquipmentInformation.jsx';
import CarrierInfoRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import CarrierInfoOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import CarrierInfoDocuments from './../../../panels/documents/Documents.jsx';
import CarrierInfoFactoringCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import CarrierInfoFactoringCompany from './../../../panels/factoring-company/FactoringCompany.jsx';
import CarrierInfoFactoringCompanyPanelSearch from './../../../panels/factoring-company-panel-search/FactoringCompanyPanelSearch.jsx';
import CarrierInfoFactoringCompanyContacts from './../../../panels/contacts/Contacts.jsx';
import CarrierInfoFactoringCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import CarrierInfoFactoringCompanyDocuments from './../../../panels/documents/Documents.jsx';
import CarrierInfoFactoringCompanyInvoiceSearch from './../../../panels/factoring-company-invoice-search/FactoringCompanyInvoiceSearch.jsx';

import CarrierInfoSearchChanging from './../../../panels/carrier-info-search-changing/CarrierInfoSearchChanging.jsx';

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

import RatingScreen from './../../../panels/rating-screen/RatingScreen.jsx';
import AdjustRate from './../../../panels/adjust-rate/AdjustRate.jsx';
import Order from './../../../panels/order/Order.jsx';
import LbOrder from './../../../panels/order/Order.jsx';
import LoadBoard from './../../../load-board/LoadBoard.jsx';
import Routing from './../../../panels/routing/Routing.jsx';
import Bol from './../../../panels/bol/Bol.jsx';
import RateConf from './../../../panels/rate-conf/RateConf.jsx';
import Documents from './../../../panels/documents/Documents.jsx';

import LbInvoice from './../../../invoice/Invoice.jsx';
import LbRouting from './../../../panels/routing/Routing.jsx';
import LbRateConf from './../../../panels/rate-conf/RateConf.jsx';

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
            {/* ================================== BILL TO COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('bill-to-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-info')}
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
                        <animated.div className="panel panel-bill-to-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'bill-to-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Bill To Company Info</div><div className="side-title"><div>Bill To Company Info</div></div>

                                <BillToCompanyInfo
                                    pageName={'Bill To Company Info'}
                                    panelName={'bill-to-company-info'}
                                    tabTimes={28000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setBillToCompanies}
                                    setSelectedCustomer={props.setSelectedBillToCompanyInfo}
                                    setCustomerSearch={props.setBillToCompanySearch}
                                    setCustomerContacts={props.setBillToCompanyContacts}
                                    setSelectedContact={props.setSelectedBillToCompanyContact}
                                    setContactSearch={props.setBillToCompanyContactSearch}
                                    setIsEditingContact={props.setBillToCompanyIsEditingContact}
                                    setShowingContactList={props.setBillToCompanyShowingContactList}
                                    setContactSearchCustomer={props.setBillToCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setBillToCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setBillToCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setBillToCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setSelectedBillToCompanyNote}
                                    setSelectedDirection={props.setSelectedBillToCompanyDirection}
                                    setSelectedDocument={props.setSelectedBillToCompanyDocument}

                                    customers={props.billToCompanies}
                                    selectedCustomer={props.selectedBillToCompanyInfo}
                                    customerSearch={props.billToCompanySearch}
                                    contacts={props.billToCompanyContacts}
                                    selectedContact={props.selectedBillToCompanyContact}
                                    contactSearch={props.billToCompanyContactSearch}
                                    showingContactList={props.billToCompanyShowingContactList}
                                    automaticEmailsTo={props.billToCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.billToCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.billToCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedBillToCompanyNote}
                                    selectedDirection={props.selectedBillToCompanyDirection}

                                    customerSearchPanelName='bill-to-company-search'
                                    customerContactsPanelName='bill-to-company-contacts'
                                    customerContactSearchPanelName='bill-to-company-contact-search'
                                    customerRevenueInformationPanelName='bill-to-company-revenue-information'
                                    customerOrderHistoryPanelName='bill-to-company-order-history'
                                    customerLaneHistoryPanelName='bill-to-company-lane-history'
                                    customerDocumentsPanelName='bill-to-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-search')}
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
                        <animated.div className="panel panel-bill-to-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-search'))
                        }}>
                            <BillToCompanySearch
                                title='Bill To Company Search'
                                tabTimes={29000}
                                panelName='bill-to-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedBillToCompanyInfo}
                                setSelectedContact={props.setSelectedBillToCompanyContact}

                                customers={props.billToCompanies}
                                customerSearch={props.billToCompanySearch}

                                isSavingOrder={props.isSavingOrder}
                                setIsSavingOrder={props.setIsSavingOrder}
                                origin='customer'
                                toSaveOrder={true}
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-revenue-information')}
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
                        <animated.div className="panel panel-bill-to-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-revenue-information'))
                        }}>
                            <BillToCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={42000}
                                panelName='bill-to-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-order-history')}
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
                        <animated.div className="panel panel-bill-to-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-order-history'))
                        }}>
                            <BillToCompanyOrderHistory
                                title='Order History'
                                tabTimes={43000}
                                panelName='bill-to-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-lane-history')}
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
                        <animated.div className="panel panel-bill-to-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-lane-history'))
                        }}>
                            <BillToCompanyLaneHistory
                                title='Lane History'
                                tabTimes={44000}
                                panelName='bill-to-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-documents')}
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
                        <animated.div className="panel panel-bill-to-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-documents'))
                        }}>
                            <BillToCompanyDocuments
                                title='Documents'
                                tabTimes={45000}
                                panelName='bill-to-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedBillToCompanyDocument}
                                setSelectedOwner={props.setSelectedBillToCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setSelectedBillToCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedBillToCompanyDocumentNote}

                                selectedOwner={props.selectedBillToCompanyInfo}
                                selectedOwnerDocument={props.selectedBillToCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedBillToCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedBillToCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveCustomerDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-contact-search')}
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
                        <animated.div className="panel panel-bill-to-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-contact-search'))
                        }}>
                            <BillToCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={54000}
                                parentPanelName='bill-to-company-contacts'
                                panelName='bill-to-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedBillToCompanyInfo}
                                setSelectedContact={props.setSelectedBillToCompanyContact}
                                setCustomerContacts={props.setBillToCompanyContacts}
                                setContactSearch={props.setBillToCompanyContactSearch}
                                setShowingContactList={props.setBillToCompanyShowingContactList}
                                setContactSearchCustomer={props.setBillToCompanyContactSearchCustomer}

                                customers={props.billToCompanies}
                                contactSearch={props.billToCompanyContactSearch}
                                contacts={props.billToCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('bill-to-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bill-to-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bill-to-company-contacts')}
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
                        <animated.div className="panel panel-bill-to-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bill-to-company-contacts'))
                        }}>
                            <BillToCompanyContacts
                                title='Contacts'
                                tabTimes={55000}
                                panelName='bill-to-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedBillToCompanyInfo}
                                setSelectedContact={props.setSelectedBillToCompanyContact}
                                setIsEditingContact={props.setBillToCompanyIsEditingContact}
                                setContactSearchCustomer={props.setBillToCompanyContactSearchCustomer}

                                contactSearchCustomer={props.billToCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedBillToCompanyInfo}
                                selectedContact={props.selectedBillToCompanyContact}
                                isEditingContact={props.billToCompanyIsEditingContact}
                                contacts={props.billToCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
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
                                    contacts={props.billToCompanyContacts}
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

                                savingDocumentUrl='/saveCustomerDocument'
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

            {/* ================================== SHIPPER COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('shipper-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-info')}
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
                        <animated.div className="panel panel-shipper-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'shipper-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Shipper Company Info</div><div className="side-title"><div>Shipper Company Info</div></div>

                                <ShipperCompanyInfo
                                    pageName={'Shipper Company Info'}
                                    panelName={'shipper-company-info'}
                                    tabTimes={30000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setShipperCompanies}
                                    setSelectedCustomer={props.setSelectedShipperCompanyInfo}
                                    setCustomerSearch={props.setShipperCompanySearch}
                                    setCustomerContacts={props.setShipperCompanyContacts}
                                    setSelectedContact={props.setSelectedShipperCompanyContact}
                                    setContactSearch={props.setShipperCompanyContactSearch}
                                    setIsEditingContact={props.setShipperCompanyIsEditingContact}
                                    setShowingContactList={props.setShipperCompanyShowingContactList}
                                    setContactSearchCustomer={props.setShipperCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setShipperCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setShipperCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setShipperCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setSelectedShipperCompanyNote}
                                    setSelectedDirection={props.setSelectedShipperCompanyDirection}
                                    setSelectedDocument={props.setSelectedShipperCompanyDocument}

                                    customers={props.shipperCompanies}
                                    selectedCustomer={props.selectedShipperCompanyInfo}
                                    customerSearch={props.shipperCompanySearch}
                                    contacts={props.shipperCompanyContacts}
                                    selectedContact={props.selectedShipperCompanyContact}
                                    contactSearch={props.shipperCompanyContactSearch}
                                    showingContactList={props.shipperCompanyShowingContactList}
                                    automaticEmailsTo={props.shipperCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.shipperCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.shipperCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedShipperCompanyNote}
                                    selectedDirection={props.selectedShipperCompanyDirection}

                                    customerSearchPanelName='shipper-company-search'
                                    customerContactsPanelName='shipper-company-contacts'
                                    customerContactSearchPanelName='shipper-company-contact-search'
                                    customerRevenueInformationPanelName='shipper-company-revenue-information'
                                    customerOrderHistoryPanelName='shipper-company-order-history'
                                    customerLaneHistoryPanelName='shipper-company-lane-history'
                                    customerDocumentsPanelName='shipper-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('shipper-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-search')}
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
                        <animated.div className="panel panel-shipper-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-search'))
                        }}>
                            <ShipperCompanySearch
                                title='Shipper Company Search'
                                tabTimes={31000}
                                panelName='shipper-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedShipperCompanyInfo}
                                setSelectedContact={props.setSelectedShipperCompanyContact}

                                customers={props.shipperCompanies}
                                customerSearch={props.shipperCompanySearch}

                                isSavingOrder={props.isSavingOrder}
                                setIsSavingOrder={props.setIsSavingOrder}
                                origin='customer'
                                toSaveOrder={true}
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-revenue-information')}
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
                        <animated.div className="panel panel-shipper-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-revenue-information'))
                        }}>
                            <ShipperCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={46000}
                                panelName='shipper-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-order-history')}
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
                        <animated.div className="panel panel-shipper-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-order-history'))
                        }}>
                            <ShipperCompanyOrderHistory
                                title='Order History'
                                tabTimes={47000}
                                panelName='shipper-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-lane-history')}
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
                        <animated.div className="panel panel-shipper-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-lane-history'))
                        }}>
                            <ShipperCompanyLaneHistory
                                title='Lane History'
                                tabTimes={48000}
                                panelName='shipper-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-documents')}
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
                        <animated.div className="panel panel-shipper-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-documents'))
                        }}>
                            <ShipperCompanyDocuments
                                title='Documents'
                                tabTimes={49000}
                                panelName='shipper-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedShipperCompanyDocument}
                                setSelectedOwner={props.setSelectedShipperCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setSelectedShipperCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedShipperCompanyDocumentNote}

                                selectedOwner={props.selectedShipperCompanyInfo}
                                selectedOwnerDocument={props.selectedShipperCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedShipperCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedShipperCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveCustomerDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-contact-search')}
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
                        <animated.div className="panel panel-shipper-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-contact-search'))
                        }}>
                            <ShipperCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={56000}
                                parentPanelName='shipper-company-contacts'
                                panelName='shipper-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedShipperCompanyInfo}
                                setSelectedContact={props.setSelectedShipperCompanyContact}
                                setCustomerContacts={props.setShipperCompanyContacts}
                                setContactSearch={props.setShipperCompanyContactSearch}
                                setShowingContactList={props.setShipperCompanyShowingContactList}
                                setContactSearchCustomer={props.setShipperCompanyContactSearchCustomer}

                                customers={props.shipperCompanies}
                                contactSearch={props.shipperCompanyContactSearch}
                                contacts={props.shipperCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('shipper-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('shipper-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('shipper-company-contacts')}
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
                        <animated.div className="panel panel-shipper-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'shipper-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('shipper-company-contacts'))
                        }}>
                            <ShipperCompanyContacts
                                title='Contacts'
                                tabTimes={57000}
                                panelName='shipper-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedShipperCompanyInfo}
                                setSelectedContact={props.setSelectedShipperCompanyContact}
                                setIsEditingContact={props.setShipperCompanyIsEditingContact}
                                setContactSearchCustomer={props.setShipperCompanyContactSearchCustomer}

                                contactSearchCustomer={props.shipperCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedShipperCompanyInfo}
                                selectedContact={props.selectedShipperCompanyContact}
                                isEditingContact={props.shipperCompanyIsEditingContact}
                                contacts={props.shipperCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
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
                                    contacts={props.shipperCompanyContacts}
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

                                savingDocumentUrl='/saveCustomerDocument'
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

            {/* ================================== CONSIGNEE COMPANY INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('consignee-company-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-info')}
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
                        <animated.div className="panel panel-consignee-company-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'consignee-company-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Consignee Company Info</div><div className="side-title"><div>Consignee Company Info</div></div>

                                <ConsigneeCompanyInfo
                                    pageName={'Consignee Company Info'}
                                    panelName={'consignee-company-info'}
                                    tabTimes={30000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCustomers={props.setConsigneeCompanies}
                                    setSelectedCustomer={props.setSelectedConsigneeCompanyInfo}
                                    setCustomerSearch={props.setConsigneeCompanySearch}
                                    setCustomerContacts={props.setConsigneeCompanyContacts}
                                    setSelectedContact={props.setSelectedConsigneeCompanyContact}
                                    setContactSearch={props.setConsigneeCompanyContactSearch}
                                    setIsEditingContact={props.setConsigneeCompanyIsEditingContact}
                                    setShowingContactList={props.setConsigneeCompanyShowingContactList}
                                    setContactSearchCustomer={props.setConsigneeCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setConsigneeCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setConsigneeCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setConsigneeCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setSelectedConsigneeCompanyNote}
                                    setSelectedDirection={props.setSelectedConsigneeCompanyDirection}
                                    setSelectedDocument={props.setSelectedConsigneeCompanyDocument}

                                    customers={props.consigneeCompanies}
                                    selectedCustomer={props.selectedConsigneeCompanyInfo}
                                    customerSearch={props.consigneeCompanySearch}
                                    contacts={props.consigneeCompanyContacts}
                                    selectedContact={props.selectedConsigneeCompanyContact}
                                    contactSearch={props.consigneeCompanyContactSearch}
                                    showingContactList={props.consigneeCompanyShowingContactList}
                                    automaticEmailsTo={props.consigneeCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.consigneeCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.consigneeCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedConsigneeCompanyNote}
                                    selectedDirection={props.selectedConsigneeCompanyDirection}

                                    customerSearchPanelName='consignee-company-search'
                                    customerContactsPanelName='consignee-company-contacts'
                                    customerContactSearchPanelName='consignee-company-contact-search'
                                    customerRevenueInformationPanelName='consignee-company-revenue-information'
                                    customerOrderHistoryPanelName='consignee-company-order-history'
                                    customerLaneHistoryPanelName='consignee-company-lane-history'
                                    customerDocumentsPanelName='consignee-company-documents'
                                />
                            </div>
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
                    zIndex: props.openedPanels.indexOf('consignee-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-search')}
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
                        <animated.div className="panel panel-consignee-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-search'))
                        }}>
                            <ConsigneeCompanySearch
                                title='Consignee Company Search'
                                tabTimes={33000}
                                panelName='consignee-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setSelectedConsigneeCompanyContact}

                                customers={props.consigneeCompanies}
                                customerSearch={props.consigneeCompanySearch}

                                isSavingOrder={props.isSavingOrder}
                                setIsSavingOrder={props.setIsSavingOrder}
                                origin='customer'
                                toSaveOrder={true}
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-revenue-information')}
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
                        <animated.div className="panel panel-consignee-company-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-revenue-information'))
                        }}>
                            <ConsigneeCompanyRevenueInformation
                                title='Revenue Information'
                                tabTimes={50000}
                                panelName='consignee-company-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-order-history')}
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
                        <animated.div className="panel panel-consignee-company-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-order-history'))
                        }}>
                            <ConsigneeCompanyOrderHistory
                                title='Order History'
                                tabTimes={51000}
                                panelName='consignee-company-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-lane-history')}
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
                        <animated.div className="panel panel-consignee-company-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-lane-history'))
                        }}>
                            <ConsigneeCompanyLaneHistory
                                title='Lane History'
                                tabTimes={52000}
                                panelName='consignee-company-lane-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-documents')}
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
                        <animated.div className="panel panel-consignee-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-documents'))
                        }}>
                            <ConsigneeCompanyDocuments
                                title='Documents'
                                tabTimes={53000}
                                panelName='consignee-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedConsigneeCompanyDocument}
                                setSelectedOwner={props.setSelectedConsigneeCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setSelectedConsigneeCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedConsigneeCompanyDocumentNote}

                                selectedOwner={props.selectedConsigneeCompanyInfo}
                                selectedOwnerDocument={props.selectedConsigneeCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedConsigneeCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedConsigneeCompanyDocumentNote}

                                origin='customer'

                                savingDocumentUrl='/saveCustomerDocument'
                                deletingDocumentUrl='/deleteCustomerDocument'
                                savingDocumentNoteUrl='/saveCustomerDocumentNote'
                                serverDocumentsFolder='/customer-documents/'
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-contact-search')}
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
                        <animated.div className="panel panel-consignee-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-contact-search'))
                        }}>
                            <ConsigneeCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={58000}
                                parentPanelName='consignee-company-contacts'
                                panelName='consignee-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setSelectedConsigneeCompanyContact}
                                setCustomerContacts={props.setConsigneeCompanyContacts}
                                setContactSearch={props.setConsigneeCompanyContactSearch}
                                setShowingContactList={props.setConsigneeCompanyShowingContactList}
                                setContactSearchCustomer={props.setConsigneeCompanyContactSearchCustomer}

                                customers={props.consigneeCompanies}
                                contactSearch={props.consigneeCompanyContactSearch}
                                contacts={props.consigneeCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('consignee-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('consignee-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('consignee-company-contacts')}
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
                        <animated.div className="panel panel-consignee-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'consignee-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('consignee-company-contacts'))
                        }}>
                            <ConsigneeCompanyContacts
                                title='Contacts'
                                tabTimes={59000}
                                panelName='consignee-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedConsigneeCompanyInfo}
                                setSelectedContact={props.setSelectedConsigneeCompanyContact}
                                setIsEditingContact={props.setConsigneeCompanyIsEditingContact}
                                setContactSearchCustomer={props.setConsigneeCompanyContactSearchCustomer}

                                contactSearchCustomer={props.consigneeCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedConsigneeCompanyInfo}
                                selectedContact={props.selectedConsigneeCompanyContact}
                                isEditingContact={props.consigneeCompanyIsEditingContact}
                                contacts={props.consigneeCompanyContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
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
                                    contacts={props.consigneeCompanyContacts}
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

                                savingDocumentUrl='/saveCustomerDocument'
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


            {/* ================================== CARRIER INFO =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info')}
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
                        <animated.div className="panel panel-carrier-info" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'carrier-info';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Carrier Info</div><div className="side-title"><div>Carrier Info</div></div>

                                <CarrierInfo
                                    title='Carrier Info'
                                    panelName={'carrier-info'}
                                    tabTimes={35000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setCarriers={props.setDispatchCarrierInfoCarriers}
                                    setSelectedCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                    setSelectedCarrierContact={props.setSelectedDispatchCarrierInfoContact}
                                    setSelectedCarrierNote={props.setSelectedDispatchCarrierInfoNote}
                                    setContactSearch={props.setDispatchCarrierInfoContactSearch}
                                    setShowingCarrierContactList={props.setDispatchCarrierInfoShowingContactList}
                                    setCarrierSearch={props.setDispatchCarrierInfoCarrierSearch}
                                    setCarrierContacts={props.setDispatchCarrierInfoCarrierContacts}
                                    setContactSearchCarrier={props.setDispatchCarrierInfoContactSearchCarrier}
                                    setIsEditingContact={props.setDispatchCarrierInfoIsEditingContact}
                                    setSelectedCarrierDocument={props.setSelectedDispatchCarrierInfoDocument}
                                    setDrivers={props.setDispatchCarrierInfoDrivers}
                                    setSelectedDriver={props.setSelectedDispatchCarrierInfoDriver}
                                    setEquipments={props.setDispatchCarrierInfoEquipments}
                                    setInsuranceTypes={props.setDispatchCarrierInfoInsuranceTypes}
                                    setSelectedEquipment={props.setSelectedDispatchCarrierInfoEquipment}
                                    setSelectedInsuranceType={props.setSelectedDispatchCarrierInfoInsuranceType}
                                    setFactoringCompanySearch={props.setDispatchCarrierInfoFactoringCompanySearch}
                                    setFactoringCompanies={props.setDispatchCarrierInfoFactoringCompanies}
                                    setCarrierInsurances={props.setDispatchCarrierInfoCarrierInsurances}
                                    setSelectedInsurance={props.setSelectedDispatchCarrierInfoInsurance}
                                    setSelectedFactoringCompany={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                    setSelectedFactoringCompanyContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}
                                    setEquipmentInformation={props.setDispatchCarrierInfoEquipmentInformation}

                                    carriers={props.dispatchCarrierInfoCarriers}
                                    contacts={props.dispatchCarrierInfoContacts}
                                    selectedCarrier={props.selectedDispatchCarrierInfoCarrier}
                                    selectedContact={props.selectedDispatchCarrierInfoContact}
                                    selectedNote={props.selectedDispatchCarrierInfoNote}
                                    selectedDirection={props.selectedDispatchCarrierInfoDirection}
                                    contactSearch={props.dispatchCarrierInfoContactSearch}
                                    showingContactList={props.dispatchCarrierInfoShowingContactList}
                                    carrierSearch={props.dispatchCarrierInfoCarrierSearch}
                                    selectedDocument={props.selectedDispatchCarrierInfoDocument}
                                    drivers={props.dispatchCarrierInfoDrivers}
                                    selectedDriver={props.selectedDispatchCarrierInfoDriver}
                                    equipments={props.dispatchCarrierInfoEquipments}
                                    insuranceTypes={props.dispatchCarrierInfoInsuranceTypes}
                                    selectedEquipment={props.selectedDispatchCarrierInfoEquipment}
                                    selectedInsuranceType={props.selectedDispatchCarrierInfoInsuranceType}
                                    factoringCompanySearch={props.dispatchCarrierInfoFactoringCompanySearch}
                                    factoringCompanies={props.dispatchCarrierInfoFactoringCompanies}
                                    carrierInsurances={props.dispatchCarrierInfoCarrierInsurances}
                                    selectedInsurance={props.selectedDispatchCarrierInfoInsurance}
                                    selectedFactoringCompany={props.selectedDispatchCarrierInfoFactoringCompany}
                                    selectedFactoringCompanyContact={props.selectedDispatchCarrierInfoFactoringCompanyContact}
                                    equipmentInformation={props.dispatchCarrierInfoEquipmentInformation}

                                    carrierSearchPanelName='carrier-info-search'
                                    carrierContactSearchPanelName='carrier-info-contact-search'
                                    carrierContactsPanelName='carrier-info-contacts'
                                    carrierDocumentsPanelName='carrier-info-documents'
                                    carrierRevenueInformationPanelName='carrier-info-revenue-information'
                                    carrierOrderHistoryPanelName='carrier-info-order-history'
                                    carrierEquipmentPanelName='carrier-info-equipment-information'
                                    carrierFactoringCompanySearchPanelName='carrier-info-factoring-company-search'
                                    carrierFactoringCompanyPanelSearchPanelName='carrier-info-factoring-company-panel-search'
                                    carrierFactoringCompanyPanelName='carrier-info-factoring-company'
                                    carrierFactoringCompanyContactsPanelName='carrier-info-factoring-company-contacts'
                                    carrierFactoringCompanyContactSearchPanelName='carrier-info-factoring-company-contact-search'
                                    carrierFactoringCompanyInvoiceSearchPanelName='carrier-info-factoring-company-invoice-search'
                                    carrierFactoringCompanyDocumentsPanelName='carrier-info-factoring-company-documents'
                                />

                            </div>
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO =============================== */}

            {/* ================================== CARRIER INFO SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-search')}
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
                        <animated.div className="panel panel-carrier-info-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-search'))
                        }}>
                            <CarrierInfoSearch
                                title='Carrier Search Results'
                                tabTimes={69000}
                                panelName='carrier-info-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoContact}

                                customers={props.dispatchCarrierInfoCarriers}
                                customerSearch={props.dispatchCarrierInfoCarrierSearch}

                                setSelectedDriver={props.setSelectedDispatchCarrierInfoDriver}
                                isSavingOrder={props.isSavingOrder}
                                setIsSavingOrder={props.setIsSavingOrder}
                                origin='carrier'
                                toSaveOrder={true}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO SEARCH =============================== */}

            {/* ================================== CARRIER INFO CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-contact-search')}
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
                        <animated.div className="panel panel-carrier-info-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-contact-search'))
                        }}>
                            <CarrierInfoContactSearch
                                title='Contact Search Results'
                                tabTimes={67000}
                                parentPanelName='carrier-info-contacts'
                                panelName='carrier-info-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoContact}
                                setCustomerContacts={props.setDispatchCarrierInfoCarrierContacts}
                                setContactSearch={props.setDispatchCarrierInfoContactSearch}
                                setShowingContactList={props.setDispatchCarrierInfoShowingContactList}
                                setContactSearchCustomer={props.setDispatchCarrierInfoContactSearchCarrier}

                                customers={props.dispatchCarrierInfoCarriers}
                                contactSearch={props.dispatchCarrierInfoContactSearch}
                                contacts={props.dispatchCarrierInfoContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('carrier-info-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-contacts')}
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
                        <animated.div className="panel panel-carrier-info-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-contacts'))
                        }}>
                            <CarrierInfoContacts
                                title='Contacts'
                                tabTimes={68000}
                                panelName='carrier-info-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoContact}
                                setIsEditingContact={props.setDispatchCarrierInfoIsEditingContact}
                                setContactSearchCustomer={props.setDispatchCarrierInfoContactSearchCarrier}

                                contactSearchCustomer={props.dispatchCarrierInfoContactSearchCarrier}
                                selectedCustomer={props.selectedDispatchCarrierInfoCarrier}
                                selectedContact={props.selectedDispatchCarrierInfoContact}
                                isEditingContact={props.dispatchCarrierInfoIsEditingContact}
                                contacts={props.dispatchCarrierInfoContacts}
                                savingContactUrl='/saveCarrierContact'
                                deletingContactUrl='/deleteCarrierContact'
                                uploadAvatarUrl='/uploadCarrierAvatar'
                                removeAvatarUrl='/removeCarrierAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO CONTACTS =============================== */}

            {/* ================================== CARRIER INFO DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-documents')}
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
                        <animated.div className="panel panel-carrier-info-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-documents'))
                        }}>
                            <CarrierInfoDocuments
                                title='Documents'
                                tabTimes={73000}
                                panelName='carrier-info-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedDispatchCarrierInfoDocument}
                                setSelectedOwner={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedOwnerDocumentTags={props.setSelectedDispatchCarrierInfoDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedDispatchCarrierInfoDocumentNote}

                                selectedOwner={props.selectedDispatchCarrierInfoCarrier}
                                selectedOwnerDocument={props.selectedDispatchCarrierInfoDocument}
                                selectedOwnerDocumentTags={props.selectedDispatchCarrierInfoDocumentTags}
                                selectedOwnerDocumentNote={props.selectedDispatchCarrierInfoDocumentNote}

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
            {/* ================================== CARRIER INFO DOCUMENTS =============================== */}

            {/* ================================== CARRIER INFO REVENUE INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-revenue-information')}
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
                        <animated.div className="panel panel-carrier-info-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-revenue-information'))
                        }}>
                            <CarrierInfoRevenueInformation
                                title='Revenue Information'
                                tabTimes={70000}
                                panelName='carrier-info-revenue-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('carrier-info-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-order-history')}
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
                        <animated.div className="panel panel-carrier-info-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-order-history'))
                        }}>
                            <CarrierInfoOrderHistory
                                title='Order History'
                                tabTimes={72000}
                                panelName='carrier-info-order-history'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO ORDER HISTORY =============================== */}

            {/* ================================== CARRIER INFO EQUIPMENT INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-equipment-information')}
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
                        <animated.div className="panel panel-carrier-info-equipment-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.openedPanels.indexOf('carrier-info-equipment-information'))
                        }}>
                            <CarrierInfoEquipmentInformation
                                title='Equipment Information'
                                tabTimes={71000}
                                panelName='carrier-info-equipment-information'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setEquipmentInformation={props.setDispatchCarrierInfoEquipmentInformation}
                                equipmentInformation={props.dispatchCarrierInfoEquipmentInformation}

                                setSelectedCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                selectedCarrier={props.selectedDispatchCarrierInfoCarrier}
                                setSelectedCarrierContact={props.selectedDispatchCarrierInfoContact}
                                setSelectedDriver={props.setSelectedDispatchCarrierInfoDriver}
                                setSelectedInsurance={props.setSelectedDispatchCarrierInfoInsurance}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO EQUIPMENT INFORMATION =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company'))
                        }}>
                            <CarrierInfoFactoringCompany
                                title='Factoring Company'
                                tabTimes={61000}
                                panelName='carrier-info-factoring-company'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompanyContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}
                                setSelectedFactoringCompanyContactSearch={props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch}
                                setSelectedFactoringCompanyIsShowingContactList={props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList}
                                setSelectedFactoringCompany={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyNote={props.setSelectedDispatchCarrierInfoFactoringCompanyNote}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch}
                                setSelectedFactoringCompanyInvoices={props.setSelectedDispatchCarrierInfoFactoringCompanyInvoices}
                                setFactoringCompanyIsEditingContact={props.setDispatchCarrierInfoFactoringCompanyIsEditingContact}
                                setFactoringCompanyContacts={props.setDispatchCarrierInfoFactoringCompanyContacts}
                                setSelectedFactoringCompanyInvoice={props.setSelectedDispatchCarrierInfoFactoringCompanyInvoice}
                                setSelectedFactoringCompanyIsShowingInvoiceList={props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList}
                                setFactoringCompanySearch={props.setDispatchCarrierInfoFactoringCompanySearch}
                                setFactoringCompanies={props.setDispatchCarrierInfoFactoringCompanies}
                                setSelectedFactoringCompanyDocument={props.setSelectedDispatchCarrierInfoFactoringCompanyDocument}

                                factoringCompanySearch={props.dispatchCarrierInfoFactoringCompanySearch}
                                selectedFactoringCompany={props.selectedDispatchCarrierInfoFactoringCompany}
                                selectedFactoringCompanyContact={props.selectedDispatchCarrierInfoFactoringCompanyContact}
                                selectedFactoringCompanyIsShowingContactList={props.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList}
                                selectedFactoringCompanyNote={props.selectedDispatchCarrierInfoFactoringCompanyNote}
                                selectedFactoringCompanyContactSearch={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch}
                                selectedFactoringCompanyInvoice={props.selectedDispatchCarrierInfoFactoringCompanyInvoice}
                                selectedFactoringCompanyIsShowingInvoiceList={props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList}
                                selectedFactoringCompanyInvoiceSearch={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch}

                                factoringCompanySearchPanelName='carrier-info-factoring-company-search'
                                factoringCompanyPanelSearchPanelName='carrier-info-factoring-company-panel-search'
                                factoringCompanyContactsPanelName='carrier-info-factoring-company-contacts'
                                factoringCompanyContactSearchPanelName='carrier-info-factoring-company-contact-search'
                                factoringCompanyDocumentsPanelName='carrier-info-factoring-company-documents'
                                factoringCompanyInvoiceSearchPanelName='carrier-info-factoring-company-invoice-search'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-search')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-search'))
                        }}>
                            <CarrierInfoFactoringCompanySearch
                                title='Factoring Company Search'
                                tabTimes={60000}
                                panelName='carrier-info-factoring-company-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}

                                customers={props.dispatchCarrierInfoFactoringCompanies}
                                customerSearch={props.dispatchCarrierInfoFactoringCompanySearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-panel-search')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-panel-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-panel-search'))
                        }}>
                            <CarrierInfoFactoringCompanyPanelSearch
                                title='Factoring Company Search'
                                tabTimes={62000}
                                panelName='carrier-info-factoring-company-panel-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setFactoringCompanySearch={props.setDispatchCarrierInfoFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}
                                factoringCompanies={props.dispatchCarrierInfoFactoringCompanies}
                                factoringCompanySearch={props.dispatchCarrierInfoFactoringCompanySearch}
                            />
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
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-contacts')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-contacts'))
                        }}>
                            <CarrierInfoFactoringCompanyContacts
                                title='Contacts'
                                tabTimes={63000}
                                panelName='carrier-info-factoring-company-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}
                                setIsEditingContact={props.setDispatchCarrierInfoFactoringCompanyIsEditingContact}
                                setContactSearchCustomer={props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch}

                                contactSearchCustomer={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch}
                                selectedCustomer={props.selectedDispatchCarrierInfoFactoringCompany}
                                selectedContact={props.selectedDispatchCarrierInfoFactoringCompanyContact}
                                isEditingContact={props.dispatchCarrierInfoFactoringCompanyIsEditingContact}
                                contacts={props.dispatchCarrierInfoFactoringCompanyContacts}
                                savingContactUrl='/saveFactoringCompanyContact'
                                deletingContactUrl='/deleteFactoringCompanyContact'
                                uploadAvatarUrl='/uploadFactoringCompanyAvatar'
                                removeAvatarUrl='/removeFactoringCompanyAvatar'
                            />
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
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-contact-search')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-contact-search'))
                        }}>
                            <CarrierInfoFactoringCompanyContactSearch
                                title='Contact Search Results'
                                tabTimes={64000}
                                parentPanelName='carrier-info-factoring-company-contacts'
                                panelName='carrier-info-factoring-company-contact-search'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedContact={props.setSelectedDispatchCarrierInfoFactoringCompanyContact}
                                setCustomerContacts={props.setDispatchCarrierInfoFactoringCompanyContacts}
                                setContactSearch={props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch}
                                setShowingContactList={props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList}
                                setContactSearchCustomer={props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch}

                                customers={props.dispatchCarrierInfoFactoringCompanies}
                                contactSearch={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch}
                                contacts={props.dispatchCarrierInfoFactoringCompanyContacts}
                            />
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
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-documents')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-documents'))
                        }}>
                            <CarrierInfoFactoringCompanyDocuments
                                title='Documents'
                                tabTimes={65000}
                                panelName='carrier-info-factoring-company-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedDispatchCarrierInfoFactoringCompanyDocument}
                                setSelectedOwner={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedOwnerDocumentTags={props.setSelectedDispatchCarrierInfoFactoringCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedDispatchCarrierInfoFactoringCompanyDocumentNote}

                                selectedOwner={props.selectedDispatchCarrierInfoFactoringCompany}
                                selectedOwnerDocument={props.selectedDispatchCarrierInfoFactoringCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedDispatchCarrierInfoFactoringCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedDispatchCarrierInfoFactoringCompanyDocumentNote}

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
            {/* ================================== CARRIER INFO FACTORING COMPANY DOCUMENTS =============================== */}

            {/* ================================== CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-factoring-company-invoice-search')}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-invoice-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-factoring-company-invoice-search'))
                        }}>
                            <CarrierInfoFactoringCompanyInvoiceSearch
                                title='Invoice Search Results'
                                tabTimes={66000}
                                panelName='carrier-info-factoring-company-invoice-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompany={props.setSelectedDispatchCarrierInfoFactoringCompany}
                                setSelectedFactoringCompanyInvoice={props.setSelectedDispatchCarrierInfoFactoringCompanyInvoice}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch}

                                selectedFactoringCompany={props.selectedDispatchCarrierInfoFactoringCompany}
                                selectedFactoringCompanyInvoiceSearch={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== CARRIER INFO SEARCH CHANGING=============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-info-search-changing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-info-search-changing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-info-search-changing')}
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
                        <animated.div className="panel panel-carrier-info-search-changing" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-search-changing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-search-changing'))
                        }}>
                            <CarrierInfoSearchChanging
                                title='Carrier Search Results'
                                tabTimes={69000}
                                panelName='carrier-info-search-changing'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setNewCarrier={props.setNewCarrier}

                                dispatchCarrierInfoCarriersChanging={props.dispatchCarrierInfoCarriersChanging}
                                dispatchCarrierInfoCarrierSearchChanging={props.dispatchCarrierInfoCarrierSearchChanging}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO SEARCH CHANGING=============================== */}

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


            {/* ================================== RATING SCREEN =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('rating-screen')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('rating-screen')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('rating-screen')}
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
                        <animated.div className="panel panel-rating-screen" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'rating-screen')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('rating-screen'))
                        }}>
                            <RatingScreen
                                title='Rating Screen'
                                tabTimes={34000}
                                panelName='rating-screen'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('adjust-rate')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('adjust-rate')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('adjust-rate')}
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
                        <animated.div className="panel panel-adjust-rate" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'adjust-rate')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('adjust-rate'))
                        }}>
                            <AdjustRate
                                title='Adjust Rate' tabTimes={36000}
                                panelName='adjust-rate'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
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
                    zIndex: props.openedPanels.indexOf('order')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('order')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('order')}
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
                        <animated.div className="panel panel-order" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('order'))
                        }}>
                            <Order title='Order'
                                tabTimes={37000}
                                panelName='order'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                selected_order={props.selected_order}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ORDER =============================== */}

            {/* ================================== ORDER DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('order-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('order-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('order-documents')}
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
                        <animated.div className="panel panel-order-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('order-documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={90000}
                                panelName='order-documents'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedOrderDocument}
                                setSelectedOwner={props.setSelectedOrder}
                                setSelectedOwnerDocumentTags={props.setSelectedOrderDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedOrderDocumentNote}

                                selectedOwner={props.selected_order}
                                selectedOwnerDocument={props.selectedOrderDocument}
                                selectedOwnerDocumentTags={props.selectedOrderDocumentTags}
                                selectedOwnerDocumentNote={props.selectedOrderDocumentNote}

                                origin='dispatch'

                                savingDocumentUrl='/saveOrderDocument'
                                deletingDocumentUrl='/deleteOrderDocument'
                                savingDocumentNoteUrl='/saveOrderDocumentNote'
                                serverDocumentsFolder='/order-documents/'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ORDER DOCUMENTS =============================== */}

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

            {/* ================================== ROUTING =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('routing')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('routing')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('routing')}
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
                        <animated.div className="panel panel-routing" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'routing')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('routing'))
                        }}>
                            <Routing
                                title='Routing'
                                tabTimes={39000}
                                panelName='routing'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOrder={props.setSelectedOrder}
                                setMileageLoaderVisible={props.setMileageLoaderVisible}
                                setSelectedCarrierInfoCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedCarrierInfoContact={props.setSelectedDispatchCarrierInfoContact}
                                setSelectedCarrierInfoDriver={props.setSelectedDispatchCarrierInfoDriver}
                                setSelectedCarrierInfoInsurance={props.setSelectedDispatchCarrierInfoInsurance}

                                selected_order={props.selected_order}
                                order_number={props.order_number}
                                trip_number={props.trip_number}
                                mileageLoaderVisible={props.mileageLoaderVisible}
                                selectedCarrierInfoCarrier={props.selectedDispatchCarrierInfoCarrier}
                                selectedCarrierInfoContact={props.selectedDispatchCarrierInfoContact}
                                selectedCarrierInfoDriver={props.selectedDispatchCarrierInfoDriver}
                                selectedCarrierInfoInsurance={props.selectedDispatchCarrierInfoInsurance}

                                carrierInfoPanelName='carrier-info'
                                rateConfPanelName='rate-conf'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ROUTING =============================== */}

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

            {/* ================================== RATE CONF =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('rate-conf')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('rate-conf')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('rate-conf')}
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
                        <animated.div className="panel panel-rate-conf" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'rate-conf')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('rate-conf'))
                        }}>
                            <RateConf
                                title='Rate Conf'
                                tabTimes={41000}
                                panelName='rate-conf'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                selected_order={props.selected_order}
                                selectedCarrierInfoContact={props.selectedDispatchCarrierInfoContact}
                                selectedCarrierInfo={props.selectedDispatchCarrierInfoCarrier}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== RATE CONF =============================== */}

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

            {/* ================================== BOL =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('bol')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('bol')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('bol')}
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
                        <animated.div className="panel panel-bol" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bol')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('bol'))
                        }}>
                            <Bol
                                title='BOL'
                                tabTimes={40000}
                                panelName='bol'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== BOL =============================== */}

            {/* ================================== LOAD BOARD =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('load-board')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('load-board')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('load-board')}
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
                        <animated.div className="panel panel-load-board" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'load-board')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('load-board'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'load-board';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Load Board</div><div className="side-title"><div>Load Board</div></div>

                                <LoadBoard
                                    title='Load Board'
                                    panelName='load-board'
                                    tabTimes={38000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setLbSelectedOrder={props.setLbSelectedOrder}
                                    setLbInvoiceSelectedOrder={props.setLbInvoiceSelectedOrder}
                                    setLbInvoiceOrderNumber={props.setLbInvoiceOrderNumber}
                                    setLbInvoiceTripNumber={props.setLbInvoiceTripNumber}

                                    setLbSelectedBillToCompanyInfo={props.setLbSelectedBillToCompanyInfo}
                                    setLbSelectedBillToCompanyContact={props.setLbSelectedBillToCompanyContact}
                                    setLbBillToCompanySearch={props.setLbBillToCompanySearch}
                                    setLbSelectedShipperCompanyInfo={props.setLbSelectedShipperCompanyInfo}
                                    setLbSelectedShipperCompanyContact={props.setLbSelectedShipperCompanyContact}
                                    setLbShipperCompanySearch={props.setLbShipperCompanySearch}
                                    setLbSelectedConsigneeCompanyInfo={props.setLbSelectedConsigneeCompanyInfo}
                                    setLbSelectedConsigneeCompanyContact={props.setLbSelectedConsigneeCompanyContact}
                                    setLbConsigneeCompanySearch={props.setLbConsigneeCompanySearch}
                                    setSelectedLbCarrierInfoCarrier={props.setSelectedLbCarrierInfoCarrier}
                                    setSelectedLbCarrierInfoContact={props.setSelectedLbCarrierInfoContact}
                                    setSelectedLbCarrierInfoDriver={props.setSelectedLbCarrierInfoDriver}

                                    selected_order={props.lb_selected_order}
                                    selectedLbBillToCompanyInfo={props.selectedLbBillToCompanyInfo}
                                    selectedLbBillToCompanyContact={props.selectedLbBillToCompanyContact}
                                    lbBillToCompanySearch={props.lbBillToCompanySearch}
                                    selectedLbShipperCompanyInfo={props.selectedLbShipperCompanyInfo}
                                    selectedLbShipperCompanyContact={props.selectedLbShipperCompanyContact}
                                    lbShipperCompanySearch={props.lbShipperCompanySearch}
                                    selectedLbConsigneeCompanyInfo={props.selectedLbConsigneeCompanyInfo}
                                    selectedLbConsigneeCompanyContact={props.selectedLbConsigneeCompanyContact}
                                    lbConsigneeCompanySearch={props.lbConsigneeCompanySearch}
                                    selectedLbCarrierInfoCarrier={props.selectedLbCarrierInfoCarrier}
                                    selectedLbCarrierInfoContact={props.selectedLbCarrierInfoContact}
                                    selectedLbCarrierInfoDriver={props.selectedLbCarrierInfoDriver}

                                    orderPanelName='lb-order'
                                    billToCompanyInfoPanelName='lb-bill-to-company-info'
                                    shipperCompanyInfoPanelName='lb-shipper-company-info'
                                    consigneeCompanyInfoPanelName='lb-consignee-company-info'
                                    carrierInfoPanelName='lb-carrier-info'
                                    routingPanelName='lb-routing'
                                    invoicePanelName='lb-invoice'
                                />
                            </div>
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LOAD BOARD =============================== */}

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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openedPanels: state.dispatchReducers.dispatchOpenedPanels,
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,

        selected_order: state.dispatchReducers.selected_order,
        order_number: state.dispatchReducers.order_number,
        trip_number: state.dispatchReducers.trip_number,
        mileageLoaderVisible: state.dispatchReducers.mileageLoaderVisible,

        lb_selected_order: state.dispatchReducers.lb_selected_order,
        lb_order_number: state.dispatchReducers.lb_order_number,
        lb_trip_number: state.dispatchReducers.lb_trip_number,
        lbMileageLoaderVisible: state.dispatchReducers.lbMileageLoaderVisible,

        selectedOrderDocument: state.dispatchReducers.selectedOrderDocument,
        selectedOrderDocumentNote: state.dispatchReducers.selectedOrderDocumentNote,
        selectedOrderDocumentTags: state.dispatchReducers.orderDocumentTags,
        isSavingOrder: state.dispatchReducers.isSavingOrder,

        //BILL TO COMPANY INFO
        billToCompanies: state.customerReducers.billToCompanies,
        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        billToCompanySearch: state.customerReducers.billToCompanySearch,
        billToCompanyContacts: state.customerReducers.billToCompanyContacts,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
        billToCompanyContactSearch: state.customerReducers.billToCompanyContactSearch,
        billToCompanyShowingContactList: state.customerReducers.billToCompanyShowingContactList,
        billToCompanyAutomaticEmailsTo: state.customerReducers.billToCompanyAutomaticEmailsTo,
        billToCompanyAutomaticEmailsCc: state.customerReducers.billToCompanyAutomaticEmailsCc,
        billToCompanyAutomaticEmailsBcc: state.customerReducers.billToCompanyAutomaticEmailsBcc,
        selectedBillToCompanyNote: state.customerReducers.selectedBillToCompanyNote,
        selectedBillToCompanyDirection: state.customerReducers.selectedBillToCompanyDirection,
        selectedBillToCompanyDocument: state.customerReducers.selectedBillToCompanyDocument,
        selectedBillToCompanyDocumentNote: state.customerReducers.selectedBillToCompanyDocumentNote,
        selectedBillToCompanyDocumentTags: state.customerReducers.BillToCompanyDocumentTags,
        billToCompanyContactSearchCustomer: state.customerReducers.billToCompanyContactSearchCustomer,
        billToCompanyIsEditingContact: state.customerReducers.billToCompanyIsEditingContact,

        //SHIPPER COMPANY INFO
        shipperCompanies: state.customerReducers.shipperCompanies,
        selectedShipperCompanyInfo: state.customerReducers.selectedShipperCompanyInfo,
        shipperCompanySearch: state.customerReducers.shipperCompanySearch,
        shipperCompanyContacts: state.customerReducers.shipperCompanyContacts,
        selectedShipperCompanyContact: state.customerReducers.selectedShipperCompanyContact,
        shipperCompanyContactSearch: state.customerReducers.shipperCompanyContactSearch,
        shipperCompanyShowingContactList: state.customerReducers.shipperCompanyShowingContactList,
        shipperCompanyAutomaticEmailsTo: state.customerReducers.shipperCompanyAutomaticEmailsTo,
        shipperCompanyAutomaticEmailsCc: state.customerReducers.shipperCompanyAutomaticEmailsCc,
        shipperCompanyAutomaticEmailsBcc: state.customerReducers.shipperCompanyAutomaticEmailsBcc,
        selectedShipperCompanyNote: state.customerReducers.selectedShipperCompanyNote,
        selectedShipperCompanyDirection: state.customerReducers.selectedShipperCompanyDirection,
        selectedShipperCompanyDocument: state.customerReducers.selectedShipperCompanyDocument,
        selectedShipperCompanyDocumentNote: state.customerReducers.selectedShipperCompanyDocumentNote,
        selectedShipperCompanyDocumentTags: state.customerReducers.ShipperCompanyDocumentTags,
        shipperCompanyContactSearchCustomer: state.customerReducers.shipperCompanyContactSearchCustomer,
        shipperCompanyIsEditingContact: state.customerReducers.shipperCompanyIsEditingContact,

        //CONSIGNEE COMPANY INFO
        consigneeCompanies: state.customerReducers.consigneeCompanies,
        selectedConsigneeCompanyInfo: state.customerReducers.selectedConsigneeCompanyInfo,
        consigneeCompanySearch: state.customerReducers.consigneeCompanySearch,
        consigneeCompanyContacts: state.customerReducers.consigneeCompanyContacts,
        selectedConsigneeCompanyContact: state.customerReducers.selectedConsigneeCompanyContact,
        consigneeCompanyContactSearch: state.customerReducers.consigneeCompanyContactSearch,
        consigneeCompanyShowingContactList: state.customerReducers.consigneeCompanyShowingContactList,
        consigneeCompanyAutomaticEmailsTo: state.customerReducers.consigneeCompanyAutomaticEmailsTo,
        consigneeCompanyAutomaticEmailsCc: state.customerReducers.consigneeCompanyAutomaticEmailsCc,
        consigneeCompanyAutomaticEmailsBcc: state.customerReducers.consigneeCompanyAutomaticEmailsBcc,
        selectedConsigneeCompanyNote: state.customerReducers.selectedConsigneeCompanyNote,
        selectedConsigneeCompanyDirection: state.customerReducers.selectedConsigneeCompanyDirection,
        selectedConsigneeCompanyDocument: state.customerReducers.selectedConsigneeCompanyDocument,
        selectedConsigneeCompanyDocumentNote: state.customerReducers.selectedConsigneeCompanyDocumentNote,
        selectedConsigneeCompanyDocumentTags: state.customerReducers.ConsigneeCompanyDocumentTags,
        consigneeCompanyContactSearchCustomer: state.customerReducers.consigneeCompanyContactSearchCustomer,
        consigneeCompanyIsEditingContact: state.customerReducers.consigneeCompanyIsEditingContact,

        //CARRIER
        dispatchCarrierInfoCarriers: state.carrierReducers.dispatchCarrierInfoCarriers,
        dispatchCarrierInfoContacts: state.carrierReducers.dispatchCarrierInfoContacts,
        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,
        selectedDispatchCarrierInfoContact: state.carrierReducers.selectedDispatchCarrierInfoContact,
        selectedDispatchCarrierInfoNote: state.carrierReducers.selectedDispatchCarrierInfoNote,
        selectedDispatchCarrierInfoDirection: state.carrierReducers.selectedDispatchCarrierInfoDirection,
        dispatchCarrierInfoContactSearch: state.carrierReducers.dispatchCarrierInfoContactSearch,
        dispatchCarrierInfoContactSearchCarrier: state.carrierReducers.dispatchCarrierInfoContactSearchCarrier,
        dispatchCarrierInfoShowingContactList: state.carrierReducers.dispatchCarrierInfoShowingContactList,
        dispatchCarrierInfoIsEditingContact: state.carrierReducers.dispatchCarrierInfoIsEditingContact,
        dispatchCarrierInfoCarrierSearch: state.carrierReducers.dispatchCarrierInfoCarrierSearch,
        selectedDispatchCarrierInfoDocument: state.carrierReducers.selectedDispatchCarrierInfoDocument,
        selectedDispatchCarrierInfoDocumentNote: state.carrierReducers.selectedDispatchCarrierInfoDocumentNote,
        selectedDispatchCarrierInfoDocumentTags: state.carrierReducers.dispatchCarrierInfoDocumentTags,
        dispatchCarrierInfoDrivers: state.carrierReducers.drivers,
        selectedDispatchCarrierInfoDriver: state.carrierReducers.selectedDispatchCarrierInfoDriver,
        dispatchCarrierInfoEquipments: state.carrierReducers.dispatchCarrierInfoEquipments,
        dispatchCarrierInfoInsuranceTypes: state.carrierReducers.dispatchCarrierInfoInsuranceTypes,
        selectedDispatchCarrierInfoEquipment: state.carrierReducers.selectedDispatchCarrierInfoEquipment,
        selectedDispatchCarrierInfoInsuranceType: state.carrierReducers.selectedDispatchCarrierInfoInsuranceType,
        dispatchCarrierInfoFactoringCompanySearch: state.carrierReducers.dispatchCarrierInfoFactoringCompanySearch,
        dispatchCarrierInfoFactoringCompanies: state.carrierReducers.dispatchCarrierInfoFactoringCompanies,
        dispatchCarrierInfoCarrierInsurances: state.carrierReducers.dispatchCarrierInfoCarrierInsurances,
        selectedDispatchCarrierInfoInsurance: state.carrierReducers.selectedDispatchCarrierInfoInsurance,
        selectedDispatchCarrierInfoFactoringCompany: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompany,
        selectedDispatchCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyContact,
        dispatchCarrierInfoEquipmentInformation: state.carrierReducers.dispatchCarrierInfoEquipmentInformation,
        selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
        selectedDispatchCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyNote,
        selectedDispatchCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyContactSearch,
        selectedDispatchCarrierInfoFactoringCompanyInvoice: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyInvoice,
        selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
        selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
        dispatchCarrierInfoFactoringCompanyIsEditingContact: state.carrierReducers.dispatchCarrierInfoFactoringCompanyIsEditingContact,
        selectedDispatchCarrierInfoFactoringCompanyDocument: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyDocument,
        selectedDispatchCarrierInfoFactoringCompanyDocumentNote: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyDocumentNote,
        selectedDispatchCarrierInfoFactoringCompanyDocumentTags: state.carrierReducers.dispatchCarrierInfoFactoringCompanyDocumentTags,
        dispatchCarrierInfoFactoringCompanyContacts: state.carrierReducers.dispatchCarrierInfoFactoringCompanyContacts,

        dispatchCarrierInfoCarriersChanging: state.carrierReducers.dispatchCarrierInfoCarriersChanging,
        dispatchCarrierInfoCarrierSearchChanging: state.carrierReducers.dispatchCarrierInfoCarrierSearchChanging,

        //LB BILL TO COMPANY INFO
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

        //LB SHIPPER COMPANY INFO
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

        //LB CONSIGNEE COMPANY INFO
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

        //LB CARRIER
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
    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setSelectedBillToCompanyNote,
    setSelectedBillToCompanyDirection,
    setBillToCompanyContactSearch,
    setBillToCompanyAutomaticEmailsTo,
    setBillToCompanyAutomaticEmailsCc,
    setBillToCompanyAutomaticEmailsBcc,
    setBillToCompanyShowingContactList,
    setBillToCompanySearch,
    setBillToCompanyContacts,
    setBillToCompanyContactSearchCustomer,
    setBillToCompanyIsEditingContact,
    setSelectedBillToCompanyDocument,
    setSelectedBillToCompanyDocumentNote,
    setSelectedBillToCompanyDocumentTags,

    // SHIPPER COMPANY INFO
    setShipperCompanies,
    setSelectedShipperCompanyInfo,
    setSelectedShipperCompanyContact,
    setSelectedShipperCompanyNote,
    setSelectedShipperCompanyDirection,
    setShipperCompanyContactSearch,
    setShipperCompanyAutomaticEmailsTo,
    setShipperCompanyAutomaticEmailsCc,
    setShipperCompanyAutomaticEmailsBcc,
    setShipperCompanyShowingContactList,
    setShipperCompanySearch,
    setShipperCompanyContacts,
    setShipperCompanyContactSearchCustomer,
    setShipperCompanyIsEditingContact,
    setSelectedShipperCompanyDocument,
    setSelectedShipperCompanyDocumentNote,
    setSelectedShipperCompanyDocumentTags,

    // CONSIGNEE COMPANY INFO
    setConsigneeCompanies,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setSelectedConsigneeCompanyNote,
    setSelectedConsigneeCompanyDirection,
    setConsigneeCompanyContactSearch,
    setConsigneeCompanyAutomaticEmailsTo,
    setConsigneeCompanyAutomaticEmailsCc,
    setConsigneeCompanyAutomaticEmailsBcc,
    setConsigneeCompanyShowingContactList,
    setConsigneeCompanySearch,
    setConsigneeCompanyContacts,
    setConsigneeCompanyContactSearchCustomer,
    setConsigneeCompanyIsEditingContact,
    setSelectedConsigneeCompanyDocument,
    setSelectedConsigneeCompanyDocumentNote,
    setSelectedConsigneeCompanyDocumentTags,

    // CARRIER INFO
    setDispatchCarrierInfoCarriers,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoNote,
    setSelectedDispatchCarrierInfoContact,
    setDispatchCarrierInfoCarrierContacts,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoShowingContactList,
    setDispatchCarrierInfoContactSearchCarrier,
    setDispatchCarrierInfoIsEditingContact,
    setSelectedDispatchCarrierInfoDocument,
    setSelectedDispatchCarrierInfoDocumentNote,
    setSelectedDispatchCarrierInfoDocumentTags,
    setDispatchCarrierInfoEquipmentInformation,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoDrivers,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
    setDispatchCarrierInfoEquipments,
    setDispatchCarrierInfoCarrierInsurances,
    setDispatchCarrierInfoInsuranceTypes,
    setSelectedDispatchCarrierInfoInsuranceType,
    setSelectedDispatchCarrierInfoEquipment,

    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyContact,
    setSelectedDispatchCarrierInfoFactoringCompanyContactSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedDispatchCarrierInfoFactoringCompanyNote,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoices,
    setDispatchCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchCarrierInfoFactoringCompanyContacts,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoice,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setDispatchCarrierInfoFactoringCompanies,
    setSelectedDispatchCarrierInfoFactoringCompanyDocument,
    setSelectedDispatchCarrierInfoFactoringCompanyDocumentNote,
    setSelectedDispatchCarrierInfoFactoringCompanyDocumentTags,

    // LB BILL TO COMPANY INFO
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

    // LB SHIPPER COMPANY INFO
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

    // LB CONSIGNEE COMPANY INFO
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

    // LB CARRIER INFO
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
    setSelectedOrder,
    setMileageLoaderVisible,
    setSelectedOrderDocument,
    setSelectedOrderDocumentNote,
    setSelectedOrderDocumentTags,

    setLbSelectedOrder,
    setLbMileageLoaderVisible,
    setNewCarrier,
    setIsSavingOrder,

    //INVOICE
    setLbInvoiceSelectedOrder,
    setLbInvoiceOrderNumber,
    setLbInvoiceTripNumber,
    setLbInvoiceInternalNotes,
    setLbInvoiceSelectedInternalNote,
})(PanelContainer)