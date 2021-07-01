import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {
    setCustomerOpenedPanels as setOpenedPanels,
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

} from '../../../../../actions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import CustomerSearch from './../../../panels/customer-search/CustomerSearch.jsx';
import ContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import RevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import LaneHistory from './../../../panels/lane-history/LaneHistory.jsx';
import Documents from './../../../panels/documents/Documents.jsx';
import Contacts from './../../../panels/contacts/Contacts.jsx';

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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openedPanels: state.customerReducers.customerOpenedPanels,
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
    }
}

export default connect(mapStateToProps, {
    setOpenedPanels,
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
})(PanelContainer)