import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {
    setInvoiceOpenedPanels as setOpenedPanels,

    // BILL TO COMPANY INFO
    setInvoiceBillToCompanies,
    setInvoiceSelectedBillToCompanyInfo,
    setInvoiceSelectedBillToCompanyContact,
    setInvoiceSelectedBillToCompanyNote,
    setInvoiceSelectedBillToCompanyDirection,
    setInvoiceBillToCompanyContactSearch,
    setInvoiceBillToCompanyAutomaticEmailsTo,
    setInvoiceBillToCompanyAutomaticEmailsCc,
    setInvoiceBillToCompanyAutomaticEmailsBcc,
    setInvoiceBillToCompanyShowingContactList,
    setInvoiceBillToCompanySearch,
    setInvoiceBillToCompanyContacts,
    setInvoiceBillToCompanyContactSearchCustomer,
    setInvoiceBillToCompanyIsEditingContact,
    setInvoiceSelectedBillToCompanyDocument,
    setInvoiceSelectedBillToCompanyDocumentNote,
    setInvoiceBillToCompanyDocumentTags as setInvoiceSelectedBillToCompanyDocumentTags,

    // CARRIER INFO
    setInvoiceCarrierInfoCarriers,
    setSelectedInvoiceCarrierInfoCarrier,
    setSelectedInvoiceCarrierInfoNote,
    setSelectedInvoiceCarrierInfoContact,
    setInvoiceCarrierInfoCarrierContacts,
    setInvoiceCarrierInfoCarrierSearch,
    setInvoiceCarrierInfoContactSearch,
    setInvoiceCarrierInfoShowingContactList,
    setInvoiceCarrierInfoContactSearchCarrier,
    setInvoiceCarrierInfoIsEditingContact,
    setSelectedInvoiceCarrierInfoDocument,
    setSelectedInvoiceCarrierInfoDocumentNote,
    setInvoiceCarrierInfoDocumentTags as setSelectedInvoiceCarrierInfoDocumentTags,
    setInvoiceCarrierInfoEquipmentInformation,
    setInvoiceCarrierInfoFactoringCompanySearch,
    setInvoiceCarrierInfoDrivers,
    setSelectedInvoiceCarrierInfoDriver,
    setSelectedInvoiceCarrierInfoInsurance,
    setInvoiceCarrierInfoEquipments,
    setInvoiceCarrierInfoCarrierInsurances,
    setInvoiceCarrierInfoInsuranceTypes,
    setSelectedInvoiceCarrierInfoInsuranceType,
    setSelectedInvoiceCarrierInfoEquipment,

    setSelectedInvoiceCarrierInfoFactoringCompany,
    setSelectedInvoiceCarrierInfoFactoringCompanyContact,
    setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch,
    setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedInvoiceCarrierInfoFactoringCompanyNote,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoices,
    setInvoiceCarrierInfoFactoringCompanyIsEditingContact,
    setInvoiceCarrierInfoFactoringCompanyContacts,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoice,
    setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setInvoiceCarrierInfoFactoringCompanies,
    setSelectedInvoiceCarrierInfoFactoringCompanyDocument,
    setSelectedInvoiceCarrierInfoFactoringCompanyDocumentNote,
    setInvoiceCarrierInfoFactoringCompanyDocumentTags as setSelectedInvoiceCarrierInfoFactoringCompanyDocumentTags,

} from '../../../../../actions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import BillToCompanyInfo from './../../../customers/Customers.jsx';
import BillToCompanySearch from './../../../panels/customer-search/CustomerSearch.jsx';
import BillToCompanyRevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import BillToCompanyOrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import BillToCompanyLaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import BillToCompanyDocuments from './../../../panels/documents/Documents.jsx';
import BillToCompanyContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import BillToCompanyContacts from './../../../panels/contacts/Contacts.jsx';

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

function PanelContainer(props) {

    const baseWidth = 0.95;
    const panelGap = 70;

    const panelContainerClasses = classnames({
        'main-panel-container': true
    })

    const invoiceOpenedPanelsRefs = useRef([]);

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
                invoiceOpenedPanelsRefs.current.map((r, i) => {
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
                        <animated.div className="panel panel-bill-to-company-info" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-info')} style={{
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

                                    setCustomers={props.setInvoiceBillToCompanies}
                                    setSelectedCustomer={props.setInvoiceSelectedBillToCompanyInfo}
                                    setCustomerSearch={props.setInvoiceBillToCompanySearch}
                                    setCustomerContacts={props.setInvoiceBillToCompanyContacts}
                                    setSelectedContact={props.setInvoiceSelectedBillToCompanyContact}
                                    setContactSearch={props.setInvoiceBillToCompanyContactSearch}
                                    setIsEditingContact={props.setInvoiceBillToCompanyIsEditingContact}
                                    setShowingContactList={props.setInvoiceBillToCompanyShowingContactList}
                                    setContactSearchCustomer={props.setInvoiceBillToCompanyContactSearchCustomer}
                                    setAutomaticEmailsTo={props.setInvoiceBillToCompanyAutomaticEmailsTo}
                                    setAutomaticEmailsCc={props.setInvoiceBillToCompanyAutomaticEmailsCc}
                                    setAutomaticEmailsBcc={props.setInvoiceBillToCompanyAutomaticEmailsBcc}
                                    setSelectedNote={props.setInvoiceSelectedBillToCompanyNote}
                                    setSelectedDirection={props.setInvoiceSelectedBillToCompanyDirection}
                                    setSelectedDocument={props.setInvoiceSelectedBillToCompanyDocument}

                                    customers={props.invoiceBillToCompanies}
                                    selectedCustomer={props.selectedInvoiceBillToCompanyInfo}
                                    customerSearch={props.invoiceBillToCompanySearch}
                                    contacts={props.BillToCompanyContacts}
                                    selectedContact={props.selectedInvoiceBillToCompanyContact}
                                    contactSearch={props.invoiceBillToCompanyContactSearch}
                                    showingContactList={props.invoiceBillToCompanyShowingContactList}
                                    automaticEmailsTo={props.invoiceBillToCompanyAutomaticEmailsTo}
                                    automaticEmailsCc={props.invoiceBillToCompanyAutomaticEmailsCc}
                                    automaticEmailsBcc={props.invoiceBillToCompanyAutomaticEmailsBcc}
                                    selectedNote={props.selectedInvoiceBillToCompanyNote}
                                    selectedDirection={props.selectedInvoiceBillToCompanyDirection}

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
                        <animated.div className="panel panel-bill-to-company-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-search')} style={{
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

                                setSelectedCustomer={props.setInvoiceSelectedBillToCompanyInfo}
                                setSelectedContact={props.setInvoiceSelectedBillToCompanyContact}

                                customers={props.invoiceBillToCompanies}
                                customerSearch={props.invoiceBillToCompanySearch}
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
                        <animated.div className="panel panel-bill-to-company-revenue-information" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-revenue-information')} style={{
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
                        <animated.div className="panel panel-bill-to-company-order-history" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-order-history')} style={{
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
                        <animated.div className="panel panel-bill-to-company-lane-history" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-lane-history')} style={{
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
                        <animated.div className="panel panel-bill-to-company-documents" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-documents')} style={{
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

                                setSelectedOwnerDocument={props.setInvoiceSelectedBillToCompanyDocument}
                                setSelectedOwner={props.setInvoiceSelectedBillToCompanyInfo}
                                setSelectedOwnerDocumentTags={props.setInvoiceSelectedBillToCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setInvoiceSelectedBillToCompanyDocumentNote}

                                selectedOwner={props.selectedInvoiceBillToCompanyInfo}
                                selectedOwnerDocument={props.selectedInvoiceBillToCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedInvoiceBillToCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedInvoiceBillToCompanyDocumentNote}

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
                        <animated.div className="panel panel-bill-to-company-contact-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contact-search')} style={{
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

                                setSelectedCustomer={props.setInvoiceSelectedBillToCompanyInfo}
                                setSelectedContact={props.setInvoiceSelectedBillToCompanyContact}
                                setCustomerContacts={props.setInvoiceBillToCompanyContacts}
                                setContactSearch={props.setInvoiceBillToCompanyContactSearch}
                                setShowingContactList={props.setInvoiceBillToCompanyShowingContactList}
                                setContactSearchCustomer={props.setInvoiceBillToCompanyContactSearchCustomer}

                                customers={props.invoiceBillToCompanies}
                                contactSearch={props.invoiceBillToCompanyContactSearch}
                                contacts={props.invoiceBillToCompanyContacts}
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
                        <animated.div className="panel panel-bill-to-company-contacts" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'bill-to-company-contacts')} style={{
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

                                setSelectedCustomer={props.setInvoiceSelectedBillToCompanyInfo}
                                setSelectedContact={props.setInvoiceSelectedBillToCompanyContact}
                                setIsEditingContact={props.setInvoiceBillToCompanyIsEditingContact}
                                setContactSearchCustomer={props.setInvoiceBillToCompanyContactSearchCustomer}

                                contactSearchCustomer={props.invoiceBillToCompanyContactSearchCustomer}
                                selectedCustomer={props.selectedInvoiceBillToCompanyInfo}
                                selectedContact={props.selectedInvoiceBillToCompanyContact}
                                isEditingContact={props.invoiceBillToCompanyIsEditingContact}
                                contacts={props.invoiceBillToCompanyContacts}
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
                        <animated.div className="panel panel-carrier-info" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info')} style={{
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

                                    setCarriers={props.setInvoiceCarrierInfoCarriers}
                                    setSelectedCarrier={props.setSelectedInvoiceCarrierInfoCarrier}
                                    setSelectedCarrierContact={props.setSelectedInvoiceCarrierInfoContact}
                                    setSelectedCarrierNote={props.setSelectedInvoiceCarrierInfoNote}
                                    setContactSearch={props.setInvoiceCarrierInfoContactSearch}
                                    setShowingCarrierContactList={props.setInvoiceCarrierInfoShowingContactList}
                                    setCarrierSearch={props.setInvoiceCarrierInfoCarrierSearch}
                                    setCarrierContacts={props.setInvoiceCarrierInfoCarrierContacts}
                                    setContactSearchCarrier={props.setInvoiceCarrierInfoContactSearchCarrier}
                                    setIsEditingContact={props.setInvoiceCarrierInfoIsEditingContact}
                                    setSelectedCarrierDocument={props.setSelectedInvoiceCarrierInfoDocument}
                                    setDrivers={props.setInvoiceCarrierInfoDrivers}
                                    setSelectedDriver={props.setSelectedInvoiceCarrierInfoDriver}
                                    setEquipments={props.setInvoiceCarrierInfoEquipments}
                                    setInsuranceTypes={props.setInvoiceCarrierInfoInsuranceTypes}
                                    setSelectedEquipment={props.setSelectedInvoiceCarrierInfoEquipment}
                                    setSelectedInsuranceType={props.setSelectedInvoiceCarrierInfoInsuranceType}
                                    setFactoringCompanySearch={props.setInvoiceCarrierInfoFactoringCompanySearch}
                                    setFactoringCompanies={props.setInvoiceCarrierInfoFactoringCompanies}
                                    setCarrierInsurances={props.setInvoiceCarrierInfoCarrierInsurances}
                                    setSelectedInsurance={props.setSelectedInvoiceCarrierInfoInsurance}
                                    setSelectedFactoringCompany={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                                    setSelectedFactoringCompanyContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}
                                    setEquipmentInformation={props.setInvoiceCarrierInfoEquipmentInformation}

                                    carriers={props.invoiceCarrierInfoCarriers}
                                    contacts={props.invoiceCarrierInfoContacts}
                                    selectedCarrier={props.selectedInvoiceCarrierInfoCarrier}
                                    selectedContact={props.selectedInvoiceCarrierInfoContact}
                                    selectedNote={props.selectedInvoiceCarrierInfoNote}
                                    selectedDirection={props.selectedInvoiceCarrierInfoDirection}
                                    contactSearch={props.invoiceCarrierInfoContactSearch}
                                    showingContactList={props.invoiceCarrierInfoShowingContactList}
                                    carrierSearch={props.invoiceCarrierInfoCarrierSearch}
                                    selectedDocument={props.selectedInvoiceCarrierInfoDocument}
                                    drivers={props.invoiceCarrierInfoDrivers}
                                    selectedDriver={props.selectedInvoiceCarrierInfoDriver}
                                    equipments={props.invoiceCarrierInfoEquipments}
                                    insuranceTypes={props.invoiceCarrierInfoInsuranceTypes}
                                    selectedEquipment={props.selectedInvoiceCarrierInfoEquipment}
                                    selectedInsuranceType={props.selectedInvoiceCarrierInfoInsuranceType}
                                    factoringCompanySearch={props.invoiceCarrierInfoFactoringCompanySearch}
                                    factoringCompanies={props.invoiceCarrierInfoFactoringCompanies}
                                    carrierInsurances={props.invoiceCarrierInfoCarrierInsurances}
                                    selectedInsurance={props.selectedInvoiceCarrierInfoInsurance}
                                    selectedFactoringCompany={props.selectedInvoiceCarrierInfoFactoringCompany}
                                    selectedFactoringCompanyContact={props.selectedInvoiceCarrierInfoFactoringCompanyContact}
                                    equipmentInformation={props.invoiceCarrierInfoEquipmentInformation}

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
                        <animated.div className="panel panel-carrier-info-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-search')} style={{
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

                                setSelectedCustomer={props.setSelectedInvoiceCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedInvoiceCarrierInfoContact}

                                customers={props.invoiceCarrierInfoCarriers}
                                customerSearch={props.invoiceCarrierInfoCarrierSearch}
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
                        <animated.div className="panel panel-carrier-info-contact-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contact-search')} style={{
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

                                setSelectedCustomer={props.setSelectedInvoiceCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedInvoiceCarrierInfoContact}
                                setCustomerContacts={props.setInvoiceCarrierInfoCarrierContacts}
                                setContactSearch={props.setInvoiceCarrierInfoContactSearch}
                                setShowingContactList={props.setInvoiceCarrierInfoShowingContactList}
                                setContactSearchCustomer={props.setInvoiceCarrierInfoContactSearchCarrier}

                                customers={props.invoiceCarrierInfoCarriers}
                                contactSearch={props.invoiceCarrierInfoContactSearch}
                                contacts={props.invoiceCarrierInfoContacts}
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
                        <animated.div className="panel panel-carrier-info-contacts" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-info-contacts'))
                        }}>
                            <CarrierInfoContacts title='Contacts'
                                tabTimes={68000}
                                panelName='carrier-info-contacts'

                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedInvoiceCarrierInfoCarrier}
                                setSelectedContact={props.setSelectedInvoiceCarrierInfoContact}
                                setIsEditingContact={props.setInvoiceCarrierInfoIsEditingContact}
                                setContactSearchCustomer={props.setInvoiceCarrierInfoContactSearchCarrier}

                                contactSearchCustomer={props.invoiceCarrierInfoContactSearchCarrier}
                                selectedCustomer={props.selectedInvoiceCarrierInfoCarrier}
                                selectedContact={props.selectedInvoiceCarrierInfoContact}
                                isEditingContact={props.invoiceCarrierInfoIsEditingContact}
                                contacts={props.invoiceCarrierInfoContacts}
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
                        <animated.div className="panel panel-carrier-info-equipment-information" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-equipment-information')} style={{
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

                                setEquipmentInformation={props.setInvoiceCarrierInfoEquipmentInformation}
                                equipmentInformation={props.invoiceCarrierInfoEquipmentInformation}

                                setSelectedCarrier={props.setSelectedInvoiceCarrierInfoCarrier}
                                selectedCarrier={props.selectedInvoiceCarrierInfoCarrier}
                                setSelectedCarrierContact={props.selectedInvoiceCarrierInfoContact}
                                setSelectedDriver={props.setSelectedInvoiceCarrierInfoDriver}
                                setSelectedInsurance={props.setSelectedInvoiceCarrierInfoInsurance}
                            />
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
                        <animated.div className="panel panel-carrier-info-revenue-information" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-revenue-information')} style={{
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
                        <animated.div className="panel panel-carrier-info-order-history" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-order-history')} style={{
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
                        <animated.div className="panel panel-carrier-info-documents" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-documents')} style={{
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

                            setSelectedOwnerDocument={props.setSelectedInvoiceCarrierInfoDocument}
                            setSelectedOwner={props.setSelectedInvoiceCarrierInfoCarrier}
                            setSelectedOwnerDocumentTags={props.setSelectedInvoiceCarrierInfoDocumentTags}
                            setSelectedOwnerDocumentNote={props.setSelectedInvoiceCarrierInfoDocumentNote}

                            selectedOwner={props.selectedInvoiceCarrierInfoCarrier}
                            selectedOwnerDocument={props.selectedInvoiceCarrierInfoDocument}
                            selectedOwnerDocumentTags={props.selectedInvoiceCarrierInfoDocumentTags}
                            selectedOwnerDocumentNote={props.selectedInvoiceCarrierInfoDocumentNote}

                            origin='dispatch'
                            
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
                        <animated.div className="panel panel-carrier-info-factoring-company-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-search')} style={{
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

                            setSelectedCustomer={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}

                            customers={props.invoiceCarrierInfoFactoringCompanies}
                            customerSearch={props.invoiceCarrierInfoFactoringCompanySearch}
                            />
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
                        <animated.div className="panel panel-carrier-info-factoring-company" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company')} style={{
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

                            setSelectedFactoringCompanyContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}
                            setSelectedFactoringCompanyContactSearch={props.setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch}
                            setSelectedFactoringCompanyIsShowingContactList={props.setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList}
                            setSelectedFactoringCompany={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedFactoringCompanyNote={props.setSelectedInvoiceCarrierInfoFactoringCompanyNote}
                            setSelectedFactoringCompanyInvoiceSearch={props.setSelectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch}
                            setSelectedFactoringCompanyInvoices={props.setSelectedInvoiceCarrierInfoFactoringCompanyInvoices}
                            setFactoringCompanyIsEditingContact={props.setInvoiceCarrierInfoFactoringCompanyIsEditingContact}
                            setFactoringCompanyContacts={props.setInvoiceCarrierInfoFactoringCompanyContacts}
                            setSelectedFactoringCompanyInvoice={props.setSelectedInvoiceCarrierInfoFactoringCompanyInvoice}
                            setSelectedFactoringCompanyIsShowingInvoiceList={props.setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList}
                            setFactoringCompanySearch={props.setInvoiceCarrierInfoFactoringCompanySearch}
                            setFactoringCompanies={props.setInvoiceCarrierInfoFactoringCompanies}
                            setSelectedFactoringCompanyDocument={props.setSelectedInvoiceCarrierInfoFactoringCompanyDocument}

                            factoringCompanySearch={props.invoiceCarrierInfoFactoringCompanySearch}
                            selectedFactoringCompany={props.selectedInvoiceCarrierInfoFactoringCompany}
                            selectedFactoringCompanyContact={props.selectedInvoiceCarrierInfoFactoringCompanyContact}
                            selectedFactoringCompanyIsShowingContactList={props.selectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList}
                            selectedFactoringCompanyNote={props.selectedInvoiceCarrierInfoFactoringCompanyNote}
                            selectedFactoringCompanyContactSearch={props.selectedInvoiceCarrierInfoFactoringCompanyContactSearch}
                            selectedFactoringCompanyInvoice={props.selectedInvoiceCarrierInfoFactoringCompanyInvoice}
                            selectedFactoringCompanyIsShowingInvoiceList={props.selectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList}
                            selectedFactoringCompanyInvoiceSearch={props.selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch}

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
                        <animated.div className="panel panel-carrier-info-factoring-company-panel-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-panel-search')} style={{
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

                            setFactoringCompanySearch={props.setInvoiceCarrierInfoFactoringCompanySearch}
                            setSelectedFactoringCompany={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedFactoringCompanyContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}
                            factoringCompanies={props.invoiceCarrierInfoFactoringCompanies}
                            factoringCompanySearch={props.invoiceCarrierInfoFactoringCompanySearch}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-contacts" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contacts')} style={{
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

                            setSelectedCustomer={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}
                            setIsEditingContact={props.setInvoiceCarrierInfoFactoringCompanyIsEditingContact}
                            setContactSearchCustomer={props.setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch}

                            contactSearchCustomer={props.selectedInvoiceCarrierInfoFactoringCompanyContactSearch}
                            selectedCustomer={props.selectedInvoiceCarrierInfoFactoringCompany}
                            selectedContact={props.selectedInvoiceCarrierInfoFactoringCompanyContact}
                            isEditingContact={props.invoiceCarrierInfoFactoringCompanyIsEditingContact}
                            contacts={props.invoiceCarrierInfoFactoringCompanyContacts}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-contact-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-contact-search')} style={{
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

                            setSelectedCustomer={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedContact={props.setSelectedInvoiceCarrierInfoFactoringCompanyContact}
                            setCustomerContacts={props.setInvoiceCarrierInfoFactoringCompanyContacts}
                            setContactSearch={props.setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch}
                            setShowingContactList={props.setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList}
                            setContactSearchCustomer={props.setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch}

                            customers={props.invoiceCarrierInfoFactoringCompanies}
                            contactSearch={props.selectedInvoiceCarrierInfoFactoringCompanyContactSearch}
                            contacts={props.invoiceCarrierInfoFactoringCompanyContacts}
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
                        <animated.div className="panel panel-carrier-info-factoring-company-documents" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-documents')} style={{
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

                            setSelectedOwnerDocument={props.setSelectedInvoiceCarrierInfoFactoringCompanyDocument}
                            setSelectedOwner={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedOwnerDocumentTags={props.setSelectedInvoiceCarrierInfoFactoringCompanyDocumentTags}
                            setSelectedOwnerDocumentNote={props.setSelectedInvoiceCarrierInfoFactoringCompanyDocumentNote}

                            selectedOwner={props.selectedInvoiceCarrierInfoFactoringCompany}
                            selectedOwnerDocument={props.selectedInvoiceCarrierInfoFactoringCompanyDocument}
                            selectedOwnerDocumentTags={props.selectedInvoiceCarrierInfoFactoringCompanyDocumentTags}
                            selectedOwnerDocumentNote={props.selectedInvoiceCarrierInfoFactoringCompanyDocumentNote}

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
                        <animated.div className="panel panel-carrier-info-factoring-company-invoice-search" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-info-factoring-company-invoice-search')} style={{
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

                            setSelectedFactoringCompany={props.setSelectedInvoiceCarrierInfoFactoringCompany}
                            setSelectedFactoringCompanyInvoice={props.setSelectedInvoiceCarrierInfoFactoringCompanyInvoice}
                            setSelectedFactoringCompanyInvoiceSearch={props.setSelectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch}

                            selectedFactoringCompany={props.selectedInvoiceCarrierInfoFactoringCompany}
                            selectedFactoringCompanyInvoiceSearch={props.selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CARRIER INFO FACTORING COMPANY INVOICE SEARCH =============================== */}            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openedPanels: state.invoiceReducers.invoiceOpenedPanels,
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,

        //BILL TO COMPANY INFO
        invoiceBillToCompanies: state.customerReducers.invoiceBillToCompanies,
        selectedInvoiceBillToCompanyInfo: state.customerReducers.selectedInvoiceBillToCompanyInfo,
        invoiceBillToCompanySearch: state.customerReducers.invoiceBillToCompanySearch,
        invoiceBillToCompanyContacts: state.customerReducers.invoiceBillToCompanyContacts,
        selectedInvoiceBillToCompanyContact: state.customerReducers.selectedInvoiceBillToCompanyContact,
        invoiceBillToCompanyContactSearch: state.customerReducers.invoiceBillToCompanyContactSearch,
        invoiceBillToCompanyShowingContactList: state.customerReducers.invoiceBillToCompanyShowingContactList,
        invoiceBillToCompanyAutomaticEmailsTo: state.customerReducers.invoiceBillToCompanyAutomaticEmailsTo,
        invoiceBillToCompanyAutomaticEmailsCc: state.customerReducers.invoiceBillToCompanyAutomaticEmailsCc,
        invoiceBillToCompanyAutomaticEmailsBcc: state.customerReducers.invoiceBillToCompanyAutomaticEmailsBcc,
        selectedInvoiceBillToCompanyNote: state.customerReducers.selectedInvoiceBillToCompanyNote,
        selectedInvoiceBillToCompanyDirection: state.customerReducers.selectedInvoiceBillToCompanyDirection,
        selectedInvoiceBillToCompanyDocument: state.customerReducers.selectedInvoiceBillToCompanyDocument,
        selectedInvoiceBillToCompanyDocumentNote: state.customerReducers.selectedInvoiceBillToCompanyDocumentNote,
        selectedInvoiceBillToCompanyDocumentTags: state.customerReducers.invoiceBillToCompanyDocumentTags,
        invoiceBillToCompanyContactSearchCustomer: state.customerReducers.invoiceBillToCompanyContactSearchCustomer,
        invoiceBillToCompanyIsEditingContact: state.customerReducers.invoiceBillToCompanyIsEditingContact,

        //CARRIER
        invoiceCarrierInfoCarriers: state.carrierReducers.invoiceCarrierInfoCarriers,
        invoiceCarrierInfoContacts: state.carrierReducers.invoiceCarrierInfoContacts,
        selectedInvoiceCarrierInfoCarrier: state.carrierReducers.selectedInvoiceCarrierInfoCarrier,
        selectedInvoiceCarrierInfoContact: state.carrierReducers.selectedInvoiceCarrierInfoContact,
        selectedInvoiceCarrierInfoNote: state.carrierReducers.selectedInvoiceCarrierInfoNote,
        selectedInvoiceCarrierInfoDirection: state.carrierReducers.selectedInvoiceCarrierInfoDirection,
        invoiceCarrierInfoContactSearch: state.carrierReducers.invoiceCarrierInfoContactSearch,
        invoiceCarrierInfoContactSearchCarrier: state.carrierReducers.invoiceCarrierInfoContactSearchCarrier,
        invoiceCarrierInfoShowingContactList: state.carrierReducers.invoiceCarrierInfoShowingContactList,
        invoiceCarrierInfoIsEditingContact: state.carrierReducers.invoiceCarrierInfoIsEditingContact,
        invoiceCarrierInfoCarrierSearch: state.carrierReducers.invoiceCarrierInfoCarrierSearch,
        selectedInvoiceCarrierInfoDocument: state.carrierReducers.selectedInvoiceCarrierInfoDocument,
        selectedInvoiceCarrierInfoDocumentNote: state.carrierReducers.selectedInvoiceCarrierInfoDocumentNote,
        selectedInvoiceCarrierInfoDocumentTags: state.carrierReducers.invoiceCarrierInfoDocumentTags,
        invoiceCarrierInfoDrivers: state.carrierReducers.drivers,
        selectedInvoiceCarrierInfoDriver: state.carrierReducers.selectedInvoiceCarrierInfoDriver,
        invoiceCarrierInfoEquipments: state.carrierReducers.invoiceCarrierInfoEquipments,
        invoiceCarrierInfoInsuranceTypes: state.carrierReducers.invoiceCarrierInfoInsuranceTypes,
        selectedInvoiceCarrierInfoEquipment: state.carrierReducers.selectedInvoiceCarrierInfoEquipment,
        selectedInvoiceCarrierInfoInsuranceType: state.carrierReducers.selectedInvoiceCarrierInfoInsuranceType,
        invoiceCarrierInfoFactoringCompanySearch: state.carrierReducers.invoiceCarrierInfoFactoringCompanySearch,
        invoiceCarrierInfoFactoringCompanies: state.carrierReducers.invoiceCarrierInfoFactoringCompanies,
        invoiceCarrierInfoCarrierInsurances: state.carrierReducers.invoiceCarrierInfoCarrierInsurances,
        selectedInvoiceCarrierInfoInsurance: state.carrierReducers.selectedInvoiceCarrierInfoInsurance,
        selectedInvoiceCarrierInfoFactoringCompany: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompany,
        selectedInvoiceCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyContact,
        invoiceCarrierInfoEquipmentInformation: state.carrierReducers.invoiceCarrierInfoEquipmentInformation,
        selectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList,
        selectedInvoiceCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyNote,
        selectedInvoiceCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyContactSearch,
        selectedInvoiceCarrierInfoFactoringCompanyInvoice: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyInvoice,
        selectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList,
        selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch,
        invoiceCarrierInfoFactoringCompanyIsEditingContact: state.carrierReducers.invoiceCarrierInfoFactoringCompanyIsEditingContact,
        selectedInvoiceCarrierInfoFactoringCompanyDocument: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyDocument,
        selectedInvoiceCarrierInfoFactoringCompanyDocumentNote: state.carrierReducers.selectedInvoiceCarrierInfoFactoringCompanyDocumentNote,
        selectedInvoiceCarrierInfoFactoringCompanyDocumentTags: state.carrierReducers.invoiceCarrierInfoFactoringCompanyDocumentTags,
        invoiceCarrierInfoFactoringCompanyContacts: state.carrierReducers.invoiceCarrierInfoFactoringCompanyContacts,
    }
}

export default connect(mapStateToProps, {
    setOpenedPanels,

    // BILL TO COMPANY INFO
    setInvoiceBillToCompanies,
    setInvoiceSelectedBillToCompanyInfo,
    setInvoiceSelectedBillToCompanyContact,
    setInvoiceSelectedBillToCompanyNote,
    setInvoiceSelectedBillToCompanyDirection,
    setInvoiceBillToCompanyContactSearch,
    setInvoiceBillToCompanyAutomaticEmailsTo,
    setInvoiceBillToCompanyAutomaticEmailsCc,
    setInvoiceBillToCompanyAutomaticEmailsBcc,
    setInvoiceBillToCompanyShowingContactList,
    setInvoiceBillToCompanySearch,
    setInvoiceBillToCompanyContacts,
    setInvoiceBillToCompanyContactSearchCustomer,
    setInvoiceBillToCompanyIsEditingContact,
    setInvoiceSelectedBillToCompanyDocument,
    setInvoiceSelectedBillToCompanyDocumentNote,
    setInvoiceSelectedBillToCompanyDocumentTags,

    // CARRIER INFO
    setInvoiceCarrierInfoCarriers,
    setSelectedInvoiceCarrierInfoCarrier,
    setSelectedInvoiceCarrierInfoNote,
    setSelectedInvoiceCarrierInfoContact,
    setInvoiceCarrierInfoCarrierContacts,
    setInvoiceCarrierInfoCarrierSearch,
    setInvoiceCarrierInfoContactSearch,
    setInvoiceCarrierInfoShowingContactList,
    setInvoiceCarrierInfoContactSearchCarrier,
    setInvoiceCarrierInfoIsEditingContact,
    setSelectedInvoiceCarrierInfoDocument,
    setSelectedInvoiceCarrierInfoDocumentNote,
    setSelectedInvoiceCarrierInfoDocumentTags,
    setInvoiceCarrierInfoEquipmentInformation,
    setInvoiceCarrierInfoFactoringCompanySearch,
    setInvoiceCarrierInfoDrivers,
    setSelectedInvoiceCarrierInfoDriver,
    setSelectedInvoiceCarrierInfoInsurance,
    setInvoiceCarrierInfoEquipments,
    setInvoiceCarrierInfoCarrierInsurances,
    setInvoiceCarrierInfoInsuranceTypes,
    setSelectedInvoiceCarrierInfoInsuranceType,
    setSelectedInvoiceCarrierInfoEquipment,

    setSelectedInvoiceCarrierInfoFactoringCompany,
    setSelectedInvoiceCarrierInfoFactoringCompanyContact,
    setSelectedInvoiceCarrierInfoFactoringCompanyContactSearch,
    setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedInvoiceCarrierInfoFactoringCompanyNote,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoices,
    setInvoiceCarrierInfoFactoringCompanyIsEditingContact,
    setInvoiceCarrierInfoFactoringCompanyContacts,
    setSelectedInvoiceCarrierInfoFactoringCompanyInvoice,
    setSelectedInvoiceCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setInvoiceCarrierInfoFactoringCompanies,
    setSelectedInvoiceCarrierInfoFactoringCompanyDocument,
    setSelectedInvoiceCarrierInfoFactoringCompanyDocumentNote,
    setSelectedInvoiceCarrierInfoFactoringCompanyDocumentTags,

})(PanelContainer)