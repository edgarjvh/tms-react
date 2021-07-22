import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {    
    setSelectedCustomer,
    setCustomerContacts,
    setSelectedContact,
    setContactSearch,
    setIsEditingContact,
    setShowingContactList,
    setContactSearchCustomer,
    setSelectedDocument,
    setDocumentTags,
    setSelectedDocumentNote,

    setAdminSelectedCustomer,
    setAdminCustomerContacts,
    setAdminSelectedContact,
    setAdminContactSearch,
    setAdminIsEditingContact,
    setAdminShowingContactList,
    setAdminContactSearchCustomer,
    setAdminSelectedDocument,
    setAdminDocumentTags as setAdminSelectedDocumentTags,
    setAdminSelectedDocumentNote,

    setCustomerBillToCompanies,
    setCustomerSelectedBillToCompanyInfo,
    setCustomerBillToCompanySearch,
    setCustomerSelectedBillToCompanyContact,

    setCustomerShipperCompanies,
    setCustomerSelectedShipperCompanyInfo,
    setCustomerShipperCompanySearch,
    setCustomerSelectedShipperCompanyContact,

    setCustomerConsigneeCompanies,
    setCustomerSelectedConsigneeCompanyInfo,
    setCustomerConsigneeCompanySearch,
    setCustomerSelectedConsigneeCompanyContact,

} from '../../../../../actions/customersActions';

import {
    setCustomerSelectedOrder,
    setCustomerOrderNumber,
    setCustomerTripNumber,
    setCustomerDivision,
    setCustomerLoadType,
    setCustomerTemplate,
    setCustomerIsShowingShipperSecondPage,
    setCustomerShipperBolNumber,
    setCustomerShipperPoNumber,
    setCustomerShipperRefNumber,
    setCustomerIsShowingConsigneeSecondPage,
    setCustomerShowingChangeCarrier,
    setCustomerDispatchEvent,
    setCustomerDispatchEventLocation,
    setCustomerDispatchEventNotes,
    setCustomerDispatchEventDate,
    setCustomerDispatchEventTime,
    setCustomerSelectedNoteForCarrier,
    setCustomerSelectedInternalNote,
    setCustomerSelectedOrderDocument,
    setCustomerNewCarrier,
    setCustomerIsSavingOrder,
    setCustomerMileageLoaderVisible
} from '../../../../../actions/dispatchActions';

import {
    setSelectedCustomerCarrierInfoCarrier,
    setSelectedCustomerCarrierInfoContact,
    setSelectedCustomerCarrierInfoDriver,
    setSelectedCustomerCarrierInfoInsurance,
    setSelectedCustomerCarrierInfoDocument,
    setCustomerCarrierInfoDocumentTags as setSelectedCustomerCarrierInfoDocumentTags,
    setSelectedCustomerCarrierInfoDocumentNote,

} from '../../../../../actions/carriersActions';

import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import CustomerSearch from './../../../panels/customer-search/CustomerSearch.jsx';
import ContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import RevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import Documents from './../../../panels/documents/Documents.jsx';
import Contacts from './../../../panels/contacts/Contacts.jsx';
import Dispatch from './../../../dispatch/Dispatch.jsx';

function PanelContainer(props) {

    useEffect(() => {
        console.log(props)
    }, [])

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
            {/* ================================== CUSTOMER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('customer-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('customer-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('customer-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'customer-search')}
                        onStop={(e, i) => eventControl(e, i, 'customer-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'customer-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'customer-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'customer-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'customer-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-customer-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('customer-search'))
                        }}>
                            <CustomerSearch
                                title='Customer Search Results'
                                tabTimes={20000}
                                panelName='customer-search'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setSelectedCustomer}
                                setSelectedContact={props.setSelectedContact}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                customers={props.customers}
                                customerSearch={props.customerSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CUSTOMER SEARCH =============================== */}

            {/* ================================== CUSTOMER CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('customer-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('customer-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('customer-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'customer-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'customer-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'customer-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'customer-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'customer-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'customer-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-customer-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('customer-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={21000}
                                panelName='customer-contacts'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setSelectedCustomer}
                                setSelectedContact={props.setSelectedContact}
                                setIsEditingContact={props.setIsEditingContact}
                                setContactSearchCustomer={props.setContactSearchCustomer}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                contactSearchCustomer={props.contactSearchCustomer}
                                selectedCustomer={props.selectedCustomer}
                                selectedContact={props.selectedContact}
                                isEditingContact={props.isEditingContact}
                                contacts={props.contacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CUSTOMER CONTACTS =============================== */}

            {/* ================================== CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('customer-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('customer-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('customer-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'customer-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-customer-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('customer-contact-search'))
                        }}>
                            <ContactSearch
                                title='Contact Search Results'
                                tabTimes={22000}
                                parentPanelName='customer-contacts'
                                panelName='customer-contact-search'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setSelectedCustomer}
                                setSelectedContact={props.setSelectedContact}
                                setCustomerContacts={props.setCustomerContacts}
                                setContactSearch={props.setContactSearch}
                                setShowingContactList={props.setShowingContactList}
                                setContactSearchCustomer={props.setContactSearchCustomer}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                customers={props.customers}
                                contactSearch={props.contactSearch}
                                contacts={props.contacts}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONTACT SEARCH =============================== */}

            {/* ================================== REVENUE INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('revenue-information')}
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
                        onStart={(e, i) => eventControl(e, i, 'revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('revenue-information'))
                        }}>
                            <RevenueInformation
                                title='Revenue Information'
                                tabTimes={23000}
                                panelName='revenue-information'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== REVENUE INFORMATION =============================== */}

            {/* ================================== ORDER HISTORY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('order-history')}
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
                        onStart={(e, i) => eventControl(e, i, 'order-history')}
                        onStop={(e, i) => eventControl(e, i, 'order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('order-history'))
                        }}>
                            <OrderHistory
                                title='Order History'
                                tabTimes={24000}
                                panelName='order-history'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ORDER HISTORY =============================== */}

            {/* ================================== LANE HISTORY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('lane-history')}
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
                        onStart={(e, i) => eventControl(e, i, 'lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('lane-history'))
                        }}>
                            <LaneHistory
                                title='Lane History'
                                tabTimes={25000}
                                panelName='lane-history'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== LANE HISTORY =============================== */}

            {/* ================================== DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('documents')}
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
                        onStart={(e, i) => eventControl(e, i, 'documents')}
                        onStop={(e, i) => eventControl(e, i, 'documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={26000}
                                panelName='documents'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedOwnerDocument={props.setSelectedDocument}
                                setSelectedOwner={props.setSelectedCustomer}
                                setSelectedOwnerDocumentTags={props.setDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedDocumentNote}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                selectedOwner={props.selectedCustomer}
                                selectedOwnerDocument={props.selectedDocument}
                                selectedOwnerDocumentTags={props.selectedDocumentTags}
                                selectedOwnerDocumentNote={props.selectedDocumentNote}

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
            {/* ================================== DOCUMENTS =============================== */}

            {/* ================================== DISPATCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('customer-dispatch')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('customer-dispatch')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('customer-dispatch')}
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
                        onStart={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        onStop={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        onMouseDown={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        onMouseUp={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        onTouchStart={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'customer-dispatch')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-customer-dispatch" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-dispatch')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('customer-dispatch'))
                        }}>
                            <div className="panel-content">
                                <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
                                <div className="close-btn" title="Close" onClick={e => {
                                    props.setOpenedPanels(props.openedPanels.filter((item, index) => {
                                        return item !== 'customer-dispatch';
                                    }));

                                }}><span className="fas fa-times"></span></div>
                                <div className="title">Dispatch</div><div className="side-title"><div>Dispatch</div></div>

                                <Dispatch
                                    title='Dispatch'
                                    panelName='customer-dispatch'
                                    tabTimes={10000}
                                    isOnPanel={true}
                                    scale={props.scale}
                                    serverUrl={props.serverUrl}
                                    setOpenedPanels={props.setOpenedPanels}
                                    openedPanels={props.openedPanels}

                                    setNewCarrier={props.setCustomerNewCarrier}
                                    // setDispatchCarrierInfoCarriersChanging={props.Changing}
                                    // setDispatchCarrierInfoCarrierSearchChanging={props.setDispatchCarrierInfoCarrierSearchChanging}
                                    setSelectedOrder={props.setCustomerSelectedOrder}
                                    setOrderNumber={props.setCustomerOrderNumber}
                                    setTripNumber={props.setCustomerTripNumber}
                                    setBillToCompanies={props.setCustomerBillToCompanies}
                                    setSelectedBillToCompanyInfo={props.setCustomerSelectedBillToCompanyInfo}
                                    setBillToCompanySearch={props.setCustomerBillToCompanySearch}
                                    setSelectedBillToCompanyContact={props.setCustomerSelectedBillToCompanyContact}
                                    setShipperCompanies={props.setCustomerShipperCompanies}
                                    setSelectedShipperCompanyInfo={props.setCustomerSelectedShipperCompanyInfo}
                                    setShipperCompanySearch={props.setCustomerShipperCompanySearch}
                                    setSelectedShipperCompanyContact={props.setCustomerSelectedShipperCompanyContact}
                                    setIsShowingShipperSecondPage={props.setCustomerIsShowingShipperSecondPage}
                                    setShipperBolNumber={props.setCustomerShipperBolNumber}
                                    setShipperPoNumber={props.setCustomerShipperPoNumber}
                                    setShipperRefNumber={props.setCustomerShipperRefNumber}
                                    setConsigneeCompanies={props.setCustomerConsigneeCompanies}
                                    setSelectedConsigneeCompanyInfo={props.setCustomerSelectedConsigneeCompanyInfo}
                                    setConsigneeCompanySearch={props.setCustomerConsigneeCompanySearch}
                                    setSelectedConsigneeCompanyContact={props.setCustomerSelectedConsigneeCompanyContact}
                                    setIsShowingConsigneeSecondPage={props.setCustomerIsShowingConsigneeSecondPage}
                                    setSelectedDispatchCarrierInfoCarrier={props.setSelectedCustomerCarrierInfoCarrier}
                                    setSelectedDispatchCarrierInfoContact={props.setSelectedCustomerCarrierInfoContact}
                                    setSelectedDispatchCarrierInfoDriver={props.setSelectedCustomerCarrierInfoDriver}
                                    setSelectedDispatchCarrierInfoInsurance={props.setSelectedCustomerCarrierInfoInsurance}
                                    setDispatchCarrierInfoCarrierSearch={props.setCustomerCarrierInfoCarrierSearch}
                                    setDispatchCarrierInfoCarriers={props.setCustomerCarrierInfoCarriers}
                                    setShowingChangeCarrier={props.setCustomerShowingChangeCarrier}
                                    setDispatchEvent={props.setCustomerDispatchEvent}
                                    setDispatchEventLocation={props.setCustomerDispatchEventLocation}
                                    setDispatchEventNotes={props.setCustomerDispatchEventNotes}
                                    setDispatchEventDate={props.setCustomerDispatchEventDate}
                                    setDispatchEventTime={props.setCustomerDispatchEventTime}
                                    setSelectedNoteForCarrier={props.setCustomerSelectedNoteForCarrier}
                                    setSelectedInternalNote={props.setCustomerSelectedInternalNote}
                                    setMileageLoaderVisible={props.setCustomerMileageLoaderVisible}
                                    setIsSavingOrder={props.setCustomerIsSavingOrder}

                                    newCarrier={props.customerNewCarrier}
                                    selected_order={props.customer_selected_order}
                                    order_number={props.customer_order_number}
                                    trip_number={props.customer_trip_number}
                                    division={props.customerDivision}
                                    load_type={props.customerLoadType}
                                    template={props.customerTemplate}

                                    selectedBillToCompanyInfo={props.selectedCustomerBillToCompanyInfo}
                                    selectedBillToCompanyContact={props.selectedCustomerBillToCompanyContact}
                                    billToCompanySearch={props.customerBillToCompanySearch}

                                    selectedShipperCompanyInfo={props.selectedCustomerShipperCompanyInfo}
                                    selectedShipperCompanyContact={props.selectedCustomerShipperCompanyContact}
                                    shipperCompanySearch={props.customerShipperCompanySearch}

                                    selectedConsigneeCompanyInfo={props.selectedCustomerConsigneeCompanyInfo}
                                    selectedConsigneeCompanyContact={props.selectedCustomerConsigneeCompanyContact}
                                    consigneeCompanySearch={props.customerConsigneeCompanySearch}

                                    dispatchEvent={props.customerDispatchEvent}
                                    dispatchEventLocation={props.customerDispatchEventLocation}
                                    dispatchEventNotes={props.customerDispatchEventNotes}
                                    dispatchEventDate={props.customerDispatchEventDate}
                                    dispatchEventTime={props.customerDispatchEventTime}
                                    dispatchEvents={props.customerDispatchEvents}

                                    selectedNoteForCarrier={props.customerSelectedNoteForCarrier}
                                    selectedInternalNote={props.customerSelectedInternalNote}
                                    isShowingShipperSecondPage={props.customerIsShowingShipperSecondPage}
                                    isShowingConsigneeSecondPage={props.customerIsShowingConsigneeSecondPage}

                                    selectedDispatchCarrierInfoCarrier={props.selectedCustomerCarrierInfoCarrier}
                                    selectedDispatchCarrierInfoContact={props.selectedCustomerCarrierInfoContact}
                                    selectedDispatchCarrierInfoDriver={props.selectedCustomerCarrierInfoDriver}
                                    selectedDispatchCarrierInfoInsurance={props.selectedCustomerCarrierInfoInsurance}

                                    setSelectedOrderDocument={props.customerSelectedOrderDocument}

                                    mileageLoaderVisible={props.customerMileageLoaderVisible}
                                    showingChangeCarrier={props.customerShowingChangeCarrier}

                                    isSavingOrder={props.customerIsSavingOrder}

                                    billToCompanyInfoPanelName='customer-bill-to-company-info'
                                    billToCompanySearchPanelName='customer-bill-to-company-search'
                                    shipperCompanyInfoPanelName='customer-shipper-company-info'
                                    shipperCompanySearchPanelName='customer-shipper-company-search'
                                    consigneeCompanyInfoPanelName='customer-consignee-company-info'
                                    consigneeCompanySearchPanelName='customer-consignee-company-search'
                                    carrierInfoPanelName='customer-carrier-info'
                                    carrierInfoSearchPanelName='customer-carrier-info-search'
                                    routingPanelName='customer-routing'
                                    ratingScreenPanelName='customer-rating-screen'
                                    adjustRatePanelName='customer-adjust-rate'
                                    rateConfPanelName='customer-rate-conf'
                                    orderPanelName='customer-order'
                                    bolPanelName='customer-bol'
                                    orderDocumentsPanelName='customer-order-documents'
                                    loadBoardPanelName='customer-load-board'
                                />
                            </div>
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== DISPATCH =============================== */}


            {/* ================================== ADMIN CUSTOMER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-customer-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-customer-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-customer-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-customer-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-customer-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-customer-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-customer-search'))
                        }}>
                            <CustomerSearch
                                title='Customer Search Results'
                                tabTimes={20000}
                                panelName='admin-customer-search'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setAdminSelectedCustomer}
                                setSelectedContact={props.setAdminSelectedContact}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                customers={props.adminCustomers}
                                customerSearch={props.adminCustomerSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN CUSTOMER SEARCH =============================== */}

            {/* ================================== ADMIN CUSTOMER CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-customer-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-customer-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-customer-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-customer-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-customer-contacts" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-customer-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-customer-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={21000}
                                panelName='admin-customer-contacts'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setAdminSelectedCustomer}
                                setSelectedContact={props.setAdminSelectedContact}
                                setIsEditingContact={props.setAdminIsEditingContact}
                                setContactSearchCustomer={props.setAdminContactSearchCustomer}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                contactSearchCustomer={props.adminContactSearchCustomer}
                                selectedCustomer={props.adminSelectedCustomer}
                                selectedContact={props.adminSelectedContact}
                                isEditingContact={props.adminIsEditingContact}
                                contacts={props.adminContacts}
                                savingContactUrl='/saveContact'
                                deletingContactUrl='/deleteContact'
                                uploadAvatarUrl='/uploadAvatar'
                                removeAvatarUrl='/removeAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN CUSTOMER CONTACTS =============================== */}

            {/* ================================== ADMIN CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-customer-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-customer-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-customer-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-customer-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-customer-contact-search" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-customer-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-customer-contact-search'))
                        }}>
                            <ContactSearch
                                title='Contact Search Results'
                                tabTimes={22000}
                                parentPanelName='customer-contacts'
                                panelName='admin-customer-contact-search'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedCustomer={props.setAdminSelectedCustomer}
                                setSelectedContact={props.setAdminSelectedContact}
                                setCustomerContacts={props.setAdminCustomerContacts}
                                setContactSearch={props.setAdminContactSearch}
                                setShowingContactList={props.setAdminShowingContactList}
                                setContactSearchCustomer={props.setAdminContactSearchCustomer}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                customers={props.adminCustomers}
                                contactSearch={props.adminContactSearch}
                                contacts={props.adminContacts}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN CONTACT SEARCH =============================== */}

            {/* ================================== ADMIN REVENUE INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-revenue-information')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        onStop={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-revenue-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-revenue-information" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-revenue-information'))
                        }}>
                            <RevenueInformation
                                title='Revenue Information'
                                tabTimes={23000}
                                panelName='admin-revenue-information'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN REVENUE INFORMATION =============================== */}

            {/* ================================== ADMIN ORDER HISTORY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-order-history')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-order-history')}
                        onStop={(e, i) => eventControl(e, i, 'admin-order-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-order-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-order-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-order-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-order-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-order-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-order-history'))
                        }}>
                            <OrderHistory
                                title='Order History'
                                tabTimes={24000}
                                panelName='admin-order-history'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN ORDER HISTORY =============================== */}

            {/* ================================== ADMIN LANE HISTORY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-lane-history')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        onStop={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-lane-history')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-lane-history" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-lane-history'))
                        }}>
                            <LaneHistory
                                title='Lane History'
                                tabTimes={25000}
                                panelName='admin-lane-history'

                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN LANE HISTORY =============================== */}

            {/* ================================== ADMIN DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-documents')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-documents')}
                        onStop={(e, i) => eventControl(e, i, 'admin-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-documents" ref={ref => openedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={26000}
                                panelName='admin-documents'

                                setOpenedPanels={props.setOpenedPanels}
                                setSelectedOwnerDocument={props.setAdminSelectedDocument}
                                setSelectedOwner={props.setAdminSelectedCustomer}
                                setSelectedOwnerDocumentTags={props.setAdminDocumentTags}
                                setSelectedOwnerDocumentNote={props.setAdminSelectedDocumentNote}

                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}
                                selectedOwner={props.adminSelectedCustomer}
                                selectedOwnerDocument={props.adminSelectedDocument}
                                selectedOwnerDocumentTags={props.adminSelectedDocumentTags}
                                selectedOwnerDocumentNote={props.adminSelectedDocumentNote}

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
            {/* ================================== ADMIN DOCUMENTS =============================== */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        // openedPanels: state.customerReducers.customerOpenedPanels,
        // openedPanels: state.customerReducers.adminCustomerOpenedPanels,
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,

        customers: state.customerReducers.customers,
        selectedCustomer: state.customerReducers.selectedCustomer,
        customerSearch: state.customerReducers.customerSearch,
        selectedContact: state.customerReducers.selectedContact,
        contacts: state.customerReducers.contacts,
        isEditingContact: state.customerReducers.isEditingContact,
        contactSearch: state.customerReducers.contactSearch,
        contactSearchCustomer: state.customerReducers.contactSearchCustomer,
        selectedDocument: state.customerReducers.selectedDocument,
        selectedDocumentTags: state.customerReducers.selectedDocumentTags,
        selectedDocumentNote: state.customerReducers.selectedDocumentNote,

        adminCustomers: state.customerReducers.adminCustomers,
        adminSelectedCustomer: state.customerReducers.adminSelectedCustomer,
        adminCustomerSearch: state.customerReducers.adminCustomerSearch,
        adminSelectedContact: state.customerReducers.adminSelectedContact,
        adminContacts: state.customerReducers.adminContacts,
        adminIsEditingContact: state.customerReducers.adminIsEditingContact,
        adminContactSearch: state.customerReducers.adminContactSearch,
        adminContactSearchCustomer: state.customerReducers.adminContactSearchCustomer,
        adminSelectedDocument: state.customerReducers.adminSelectedDocument,
        adminSelectedDocumentTags: state.customerReducers.adminSelectedDocumentTags,
        adminSelectedDocumentNote: state.customerReducers.adminSelectedDocumentNote,

        //DISPATCH
        customer_selected_order: state.dispatchReducers.customer_selected_order,
        customer_order_number: state.dispatchReducers.customer_order_number,
        customer_trip_number: state.dispatchReducers.customer_trip_number,
        customer_ae_number: state.dispatchReducers.customer_ae_number,
        customerLoadType: state.dispatchReducers.customerLoadType,
        customerDivision: state.dispatchReducers.customerDivision,
        customerTemplate: state.dispatchReducers.customerTemplate,
        customerShipperBolNumber: state.dispatchReducers.customerShipperBolNumber,
        customerShipperPoNumber: state.dispatchReducers.customerShipperPoNumber,
        customerShipperRefNumber: state.dispatchReducers.customerShipperRefNumber,
        customerDispatchEvent: state.dispatchReducers.customerDispatchEvent,
        customerDispatchEventLocation: state.dispatchReducers.customerDispatchEventLocation,
        customerDispatchEventNotes: state.dispatchReducers.customerDispatchEventNotes,
        customerDispatchEventDate: state.dispatchReducers.customerDispatchEventDate,
        customerDispatchEventTime: state.dispatchReducers.customerDispatchEventTime,
        customerDispatchEvents: state.dispatchReducers.customerDispatchEvents,
        customerSelectedNoteForCarrier: state.dispatchReducers.customerSelectedNoteForCarrier,
        customerSelectedInternalNote: state.dispatchReducers.customerSelectedInternalNote,
        customerIsShowingShipperSecondPage: state.dispatchReducers.customerIsShowingShipperSecondPage,
        customerIsShowingConsigneeSecondPage: state.dispatchReducers.customerIsShowingConsigneeSecondPage,
        customerMileageLoaderVisible: state.dispatchReducers.customerMileageLoaderVisible,
        customerSelectedOrderDocument: state.dispatchReducers.customerSelectedOrderDocument,
        customerOrderDocumentTags: state.dispatchReducers.customerOrderDocumentTags,
        customerSelectedOrderDocumentNote: state.dispatchReducers.customerSelectedOrderDocumentNote,
        customerShowingChangeCarrier: state.dispatchReducers.customerShowingChangeCarrier,
        customerNewCarrier: state.dispatchReducers.customerNewCarrier,
        customerIsSavingOrder: state.dispatchReducers.customerIsSavingOrder,

        //CUSTOMER
        customerBillToCompanies: state.customerReducers.customerBillToCompanies,
        selectedCustomerBillToCompanyInfo: state.customerReducers.selectedCustomerBillToCompanyInfo,
        selectedCustomerBillToCompanyContact: state.customerReducers.selectedCustomerBillToCompanyContact,
        customerBillToCompanySearch: state.customerReducers.customerBillToCompanySearch,
        selectedCustomerBillToCompanyNote: state.customerReducers.selectedCustomerBillToCompanyNote,
        selectedCustomerBillToCompanyDirection: state.customerReducers.selectedCustomerBillToCompanyDirection,
        customerBillToCompanyContactSearch: state.customerReducers.customerBillToCompanyContactSearch,
        customerBillToCompanyAutomaticEmailsTo: state.customerReducers.customerBillToCompanyAutomaticEmailsTo,
        customerBillToCompanyAutomaticEmailsCc: state.customerReducers.customerBillToCompanyAutomaticEmailsCc,
        customerBillToCompanyAutomaticEmailsBcc: state.customerReducers.customerBillToCompanyAutomaticEmailsBcc,
        customerBillToCompanyShowingContactList: state.customerReducers.customerBillToCompanyShowingContactList,
        customerBillToCompanyContacts: state.customerReducers.customerBillToCompanyContacts,
        customerBillToCompanyIsEditingContact: state.customerReducers.customerBillToCompanyIsEditingContact,
        customerBillToCompanyContactSearchCustomer: state.customerReducers.customerBillToCompanyContactSearchCustomer,
        selectedCustomerBillToCompanyDocument: state.customerReducers.selectedCustomerBillToCompanyDocument,
        customerBillToCompanyDocumentTags: state.customerReducers.customerBillToCompanyDocumentTags,
        selectedCustomerBillToCompanyDocumentNote: state.customerReducers.selectedCustomerBillToCompanyDocumentNote,

        customerShipperCompanies: state.customerReducers.customerShipperCompanies,
        selectedCustomerShipperCompanyInfo: state.customerReducers.selectedCustomerShipperCompanyInfo,
        selectedCustomerShipperCompanyContact: state.customerReducers.selectedCustomerShipperCompanyContact,
        customerShipperCompanySearch: state.customerReducers.customerShipperCompanySearch,
        selectedCustomerShipperCompanyNote: state.customerReducers.selectedCustomerShipperCompanyNote,
        selectedCustomerShipperCompanyDirection: state.customerReducers.selectedCustomerShipperCompanyDirection,
        customerShipperCompanyContactSearch: state.customerReducers.customerShipperCompanyContactSearch,
        customerShipperCompanyAutomaticEmailsTo: state.customerReducers.customerShipperCompanyAutomaticEmailsTo,
        customerShipperCompanyAutomaticEmailsCc: state.customerReducers.customerShipperCompanyAutomaticEmailsCc,
        customerShipperCompanyAutomaticEmailsBcc: state.customerReducers.customerShipperCompanyAutomaticEmailsBcc,
        customerShipperCompanyShowingContactList: state.customerReducers.customerShipperCompanyShowingContactList,
        customerShipperCompanyContacts: state.customerReducers.customerShipperCompanyContacts,
        customerShipperCompanyIsEditingContact: state.customerReducers.customerShipperCompanyIsEditingContact,
        customerShipperCompanyContactSearchCustomer: state.customerReducers.customerShipperCompanyContactSearchCustomer,
        selectedCustomerShipperCompanyDocument: state.customerReducers.selectedCustomerShipperCompanyDocument,
        customerShipperCompanyDocumentTags: state.customerReducers.customerShipperCompanyDocumentTags,
        selectedCustomerShipperCompanyDocumentNote: state.customerReducers.selectedCustomerShipperCompanyDocumentNote,

        customerConsigneeCompanies: state.customerReducers.customerConsigneeCompanies,
        selectedCustomerConsigneeCompanyInfo: state.customerReducers.selectedCustomerConsigneeCompanyInfo,
        selectedCustomerConsigneeCompanyContact: state.customerReducers.selectedCustomerConsigneeCompanyContact,
        customerConsigneeCompanySearch: state.customerReducers.customerConsigneeCompanySearch,
        selectedCustomerConsigneeCompanyNote: state.customerReducers.selectedCustomerConsigneeCompanyNote,
        selectedCustomerConsigneeCompanyDirection: state.customerReducers.selectedCustomerConsigneeCompanyDirection,
        customerConsigneeCompanyContactSearch: state.customerReducers.customerConsigneeCompanyContactSearch,
        customerConsigneeCompanyAutomaticEmailsTo: state.customerReducers.customerConsigneeCompanyAutomaticEmailsTo,
        customerConsigneeCompanyAutomaticEmailsCc: state.customerReducers.customerConsigneeCompanyAutomaticEmailsCc,
        customerConsigneeCompanyAutomaticEmailsBcc: state.customerReducers.customerConsigneeCompanyAutomaticEmailsBcc,
        customerConsigneeCompanyShowingContactList: state.customerReducers.customerConsigneeCompanyShowingContactList,
        customerConsigneeCompanyContacts: state.customerReducers.customerConsigneeCompanyContacts,
        customerConsigneeCompanyIsEditingContact: state.customerReducers.customerConsigneeCompanyIsEditingContact,
        customerConsigneeCompanyContactSearchCustomer: state.customerReducers.customerConsigneeCompanyContactSearchCustomer,
        selectedCustomerConsigneeCompanyDocument: state.customerReducers.selectedCustomerConsigneeCompanyDocument,
        customerConsigneeCompanyDocumentTags: state.customerReducers.customerConsigneeCompanyDocumentTags,
        selectedCustomerConsigneeCompanyDocumentNote: state.customerReducers.selectedCustomerConsigneeCompanyDocumentNote,

        //CARRIER
        customerCarrierInfoCarriersChanging: state.carrierReducers.customerCarrierInfoCarriersChanging,
        customerCarrierInfoCarrierSearchChanging: state.carrierReducers.customerCarrierInfoCarrierSearchChanging,
        selectedCustomerCarrierInfoCarrier: state.carrierReducers.selectedCustomerCarrierInfoCarrier,
        selectedCustomerCarrierInfoContact: state.carrierReducers.selectedCustomerCarrierInfoContact,
        selectedCustomerCarrierInfoNote: state.carrierReducers.selectedCustomerCarrierInfoNote,
        selectedCustomerCarrierInfoDirection: state.carrierReducers.selectedCustomerCarrierInfoDirection,
        customerCarrierInfoContactSearch: state.carrierReducers.customerCarrierInfoContactSearch,
        customerCarrierInfoFactoringCompanySearch: state.carrierReducers.customerCarrierInfoFactoringCompanySearch,
        customerCarrierInfoFactoringCompanies: state.carrierReducers.customerCarrierInfoFactoringCompanies,
        customerCarrierInfoFactoringCompanyContacts: state.carrierReducers.customerCarrierInfoFactoringCompanyContacts,
        selectedCustomerCarrierInfoFactoringCompany: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompany,
        selectedCustomerCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyContact,
        selectedCustomerCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyContactSearch,
        selectedCustomerCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyIsShowingContactList,
        selectedCustomerCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyNote,
        customerCarrierInfoFactoringCompanyIsEditingContact: state.carrierReducers.customerCarrierInfoFactoringCompanyIsEditingContact,
        customerCarrierInfoCarrierSearch: state.carrierReducers.customerCarrierInfoCarrierSearch,
        customerCarrierInfoShowingContactList: state.carrierReducers.customerCarrierInfoShowingContactList,
        customerCarrierInfoContacts: state.carrierReducers.customerCarrierInfoContacts,
        customerCarrierInfoIsEditingContact: state.carrierReducers.customerCarrierInfoIsEditingContact,
        customerCarrierInfoContactSearchCarrier: state.carrierReducers.customerCarrierInfoContactSearchCarrier,
        selectedCustomerCarrierInfoDocument: state.carrierReducers.selectedCustomerCarrierInfoDocument,
        selectedCustomerCarrierInfoDocumentNote: state.carrierReducers.selectedCustomerCarrierInfoDocumentNote,
        customerCarrierInfoDocumentTags: state.carrierReducers.customerCarrierInfoDocumentTags,
        selectedCustomerCarrierInfoFactoringCompanyCustomers: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyCustomers,
        selectedCustomerCarrierInfoFactoringCompanyCustomer: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyCustomer,
        selectedCustomerCarrierInfoFactoringCompanyIsShowingCustomerList: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyIsShowingCustomerList,
        selectedCustomerCarrierInfoFactoringCompanyCustomerSearch: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyCustomerSearch,
        selectedCustomerCarrierInfoFactoringCompanyDocument: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyDocument,
        selectedCustomerCarrierInfoFactoringCompanyDocumentNote: state.carrierReducers.selectedCustomerCarrierInfoFactoringCompanyDocumentNote,
        customerCarrierInfoFactoringCompanyDocumentTags: state.carrierReducers.customerCarrierInfoFactoringCompanyDocumentTags,
        customerCarrierInfoDrivers: state.carrierReducers.customerCarrierInfoDrivers,
        selectedCustomerCarrierInfoDriver: state.carrierReducers.selectedCustomerCarrierInfoDriver,
        customerCarrierInfoEquipments: state.carrierReducers.customerCarrierInfoEquipments,
        selectedCustomerCarrierInfoEquipment: state.carrierReducers.selectedCustomerCarrierInfoEquipment,
        customerCarrierInfoInsuranceTypes: state.carrierReducers.customerCarrierInfoInsuranceTypes,
        selectedCustomerCarrierInfoInsuranceType: state.carrierReducers.selectedCustomerCarrierInfoInsuranceType,
        customerCarrierInfoCarrierInsurances: state.carrierReducers.customerCarrierInfoCarrierInsurances,
        selectedCustomerCarrierInfoInsurance: state.carrierReducers.selectedCustomerCarrierInfoInsurance,
        customerCarrierInfoEquipmentInformation: state.carrierReducers.customerCarrierInfoEquipmentInformation,
        customerCarrierInfoRating: state.carrierReducers.customerCarrierInfoRating,
    }
}

export default connect(mapStateToProps, {
    // CUSTOMER    
    setSelectedCustomer,
    setCustomerContacts,
    setSelectedContact,
    setContactSearch,
    setIsEditingContact,
    setShowingContactList,
    setContactSearchCustomer,
    setSelectedDocument,
    setDocumentTags,
    setSelectedDocumentNote,

    setAdminSelectedCustomer,
    setAdminCustomerContacts,
    setAdminSelectedContact,
    setAdminContactSearch,
    setAdminIsEditingContact,
    setAdminShowingContactList,
    setAdminContactSearchCustomer,
    setAdminSelectedDocument,
    setAdminSelectedDocumentTags,
    setAdminSelectedDocumentNote,

    setCustomerBillToCompanies,
    setCustomerSelectedBillToCompanyInfo,
    setCustomerBillToCompanySearch,
    setCustomerSelectedBillToCompanyContact,
    setCustomerShipperCompanies,
    setCustomerSelectedShipperCompanyInfo,
    setCustomerShipperCompanySearch,
    setCustomerSelectedShipperCompanyContact,
    setCustomerConsigneeCompanies,
    setCustomerSelectedConsigneeCompanyInfo,
    setCustomerConsigneeCompanySearch,
    setCustomerSelectedConsigneeCompanyContact,

    // DISPATCH    
    setCustomerSelectedOrder,
    setCustomerOrderNumber,
    setCustomerTripNumber,
    setCustomerDivision,
    setCustomerLoadType,
    setCustomerTemplate,
    setCustomerIsShowingShipperSecondPage,
    setCustomerShipperBolNumber,
    setCustomerShipperPoNumber,
    setCustomerShipperRefNumber,
    setCustomerIsShowingConsigneeSecondPage,
    setCustomerShowingChangeCarrier,
    setCustomerDispatchEvent,
    setCustomerDispatchEventLocation,
    setCustomerDispatchEventNotes,
    setCustomerDispatchEventDate,
    setCustomerDispatchEventTime,
    setCustomerSelectedNoteForCarrier,
    setCustomerSelectedInternalNote,
    setCustomerSelectedOrderDocument,
    setCustomerNewCarrier,
    setCustomerIsSavingOrder,
    setCustomerMileageLoaderVisible,

    // CARRIER
    setSelectedCustomerCarrierInfoCarrier,
    setSelectedCustomerCarrierInfoContact,
    setSelectedCustomerCarrierInfoDriver,
    setSelectedCustomerCarrierInfoInsurance,
    setSelectedCustomerCarrierInfoDocument,
    setSelectedCustomerCarrierInfoDocumentTags,
    setSelectedCustomerCarrierInfoDocumentNote,
})(PanelContainer)