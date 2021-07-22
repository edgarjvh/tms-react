import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import {    
    setSelectedCarrier,
    setSelectedCarrierContact,
    setCarrierContacts,
    setContactSearch as setCarrierContactSearch,
    setShowingCarrierContactList,
    setContactSearchCarrier,
    setIsEditingContact as setIsEditingCarrierContact,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyContact,
    setSelectedCarrierDocument,
    setSelectedCarrierDocumentNote,
    setCarrierDocumentTags as setSelectedCarrierDocumentTags,
    setEquipmentInformation,
    setFactoringCompanySearch,
    setSelectedDriver,
    setSelectedInsurance,

    setSelectedFactoringCompanyContactSearch,
    setSelectedFactoringCompanyIsShowingContactList,
    setSelectedFactoringCompanyNote,
    setSelectedFactoringCompanyInvoiceSearch,
    setSelectedFactoringCompanyInvoices,
    setFactoringCompanyIsEditingContact,
    setFactoringCompanyContacts,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyIsShowingInvoiceList,
    setFactoringCompanies,
    setSelectedFactoringCompanyDocument,
    setSelectedFactoringCompanyDocumentNote,
    setFactoringCompanyDocumentTags as setSelectedFactoringCompanyDocumentTags,

    setAdminSelectedCarrier,
    setAdminSelectedCarrierContact,
    setAdminCarrierContacts,
    setAdminContactSearch as setAdminCarrierContactSearch,
    setAdminShowingCarrierContactList,
    setAdminContactSearchCarrier,
    setAdminIsEditingContact as setAdminIsEditingCarrierContact,
    setAdminSelectedFactoringCompany,
    setAdminSelectedFactoringCompanyContact,
    setAdminSelectedCarrierDocument,
    setAdminSelectedCarrierDocumentNote,
    setAdminCarrierDocumentTags as setAdminSelectedCarrierDocumentTags,
    setAdminEquipmentInformation,
    setAdminFactoringCompanySearch,
    setAdminSelectedDriver,
    setAdminSelectedInsurance,

    setAdminSelectedFactoringCompanyContactSearch,
    setAdminSelectedFactoringCompanyIsShowingContactList,
    setAdminSelectedFactoringCompanyNote,
    setAdminSelectedFactoringCompanyInvoiceSearch,
    setAdminSelectedFactoringCompanyInvoices,
    setAdminFactoringCompanyIsEditingContact,
    setAdminFactoringCompanyContacts,
    setAdminSelectedFactoringCompanyInvoice,
    setAdminSelectedFactoringCompanyIsShowingInvoiceList,
    setAdminFactoringCompanies,
    setAdminSelectedFactoringCompanyDocument,
    setAdminSelectedFactoringCompanyDocumentNote,
    setAdminFactoringCompanyDocumentTags as setAdminSelectedFactoringCompanyDocumentTags,

} from '../../../../../actions/carriersActions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import CarrierSearch from './../../../panels/customer-search/CustomerSearch.jsx';
import ContactSearch from './../../../panels/contact-search/ContactSearch.jsx';
import Contacts from './../../../panels/contacts/Contacts.jsx';
import FactoringCompany from './../../../panels/factoring-company/FactoringCompany.jsx';
import Documents from './../../../panels/documents/Documents.jsx';
import RevenueInformation from './../../../panels/revenue-information/RevenueInformation.jsx';
import OrderHistory from './../../../panels/order-history/OrderHistory.jsx';
import EquipmentInformation from './../../../panels/equipment-information/EquipmentInformation.jsx';
import FactoringCompanyPanelSearch from './../../../panels/factoring-company-panel-search/FactoringCompanyPanelSearch.jsx';
import FactoringCompanySearch from './../../../panels/factoring-company-search/FactoringCompanySearch.jsx';
import FactoringCompanyInvoiceSearch from './../../../panels/factoring-company-invoice-search/FactoringCompanyInvoiceSearch.jsx';

function PanelContainer(props) {
    const baseWidth = 0.95;
    const panelGap = 70;

    const panelContainerClasses = classnames({
        'main-panel-container': true
    })

    const carrierOpenedPanelsRefs = useRef([]);

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
                carrierOpenedPanelsRefs.current.map((r, i) => {
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
            {/* ================================== CARRIER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-search'))
                        }}>
                            <CarrierSearch
                                title='Carrier Search Results'
                                tabTimes={6000}
                                panelName='carrier-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedCarrier}
                                setSelectedContact={props.setSelectedCarrierContact}

                                customers={props.carriers}
                                customerSearch={props.carrierSearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CARRIER SEARCH =============================== */}

            {/* ================================== CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-contact-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-contact-search'))
                        }}>
                            <ContactSearch
                                title='Contact Search Results'
                                tabTimes={7000}
                                parentPanelName='carrier-contacts'
                                panelName='carrier-contact-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedCarrier}
                                setSelectedContact={props.setSelectedCarrierContact}
                                setCustomerContacts={props.setCarrierContacts}
                                setContactSearch={props.setCarrierContactSearch}
                                setShowingContactList={props.setShowingCarrierContactList}
                                setContactSearchCustomer={props.setContactSearchCarrier}

                                customers={props.carriers}
                                contactSearch={props.carrierContactSearch}
                                contacts={props.carrierContacts}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CONTACT SEARCH =============================== */}

            {/* ================================== CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-contacts" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={8000}
                                panelName='carrier-contacts'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedCarrier}
                                setSelectedContact={props.setSelectedCarrierContact}
                                setIsEditingContact={props.setIsEditingCarrierContact}
                                setContactSearchCustomer={props.setContactSearchCarrier}

                                contactSearchCustomer={props.contactSearchCarrier}
                                selectedCustomer={props.selectedCarrier}
                                selectedContact={props.selectedCarrierContact}
                                isEditingContact={props.isEditingCarrierContact}
                                contacts={props.carrierContacts}
                                savingContactUrl='/saveCarrierContact'
                                deletingContactUrl='/deleteCarrierContact'
                                uploadAvatarUrl='/uploadCarrierAvatar'
                                removeAvatarUrl='/removeCarrierAvatar'
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CONTACTS =============================== */}

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
                        <animated.div className="panel panel-documents" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={12000}
                                panelName='documents'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedCarrierDocument}
                                setSelectedOwner={props.setSelectedCarrier}
                                setSelectedOwnerDocumentTags={props.setSelectedCarrierDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedCarrierDocumentNote}

                                selectedOwner={props.selectedCarrier}
                                selectedOwnerDocument={props.selectedCarrierDocument}
                                selectedOwnerDocumentTags={props.selectedCarrierDocumentTags}
                                selectedOwnerDocumentNote={props.selectedCarrierDocumentNote}

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
            {/* ================================== DOCUMENTS =============================== */}

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
                        <animated.div className="panel panel-revenue-information" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('revenue-information'))
                        }}>
                            <RevenueInformation
                                title='Revenue Information'
                                tabTimes={13000}
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
                        <animated.div className="panel panel-order-history" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('order-history'))
                        }}>
                            <OrderHistory
                                title='Order History'
                                tabTimes={14000}
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

            {/* ================================== EQUIPMENT INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('equipment-information')}
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
                        onStart={(e, i) => eventControl(e, i, 'equipment-information')}
                        onStop={(e, i) => eventControl(e, i, 'equipment-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'equipment-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'equipment-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'equipment-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'equipment-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-equipment-information" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.openedPanels.indexOf('equipment-information'))
                        }}>
                            <EquipmentInformation
                                title='Equipment Information'
                                tabTimes={15000}
                                panelName='equipment-information'
                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}

                                setEquipmentInformation={props.setEquipmentInformation}
                                equipmentInformation={props.equipmentInformation}

                                setSelectedCarrier={props.setSelectedCarrier}
                                selectedCarrier={props.selectedCarrier}
                                setSelectedCarrierContact={props.setSelectedCarrierContact}
                                setSelectedDriver={props.setSelectedDriver}
                                setSelectedInsurance={props.setSelectedInsurance}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== EQUIPMENT INFORMATION =============================== */}

            {/* ================================== FACTORING COMPANY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-factoring-company')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-factoring-company')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-factoring-company" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.openedPanels.indexOf('carrier-factoring-company'))
                        }}>
                            <FactoringCompany
                                title='Factoring Company'
                                tabTimes={11000}
                                panelName='carrier-factoring-company'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompanyContact={props.setSelectedFactoringCompanyContact}
                                setSelectedFactoringCompanyContactSearch={props.setSelectedFactoringCompanyContactSearch}
                                setSelectedFactoringCompanyIsShowingContactList={props.setSelectedFactoringCompanyIsShowingContactList}
                                setSelectedFactoringCompany={props.setSelectedFactoringCompany}
                                setSelectedFactoringCompanyNote={props.setSelectedFactoringCompanyNote}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedFactoringCompanyInvoiceSearch}
                                setSelectedFactoringCompanyInvoices={props.setSelectedFactoringCompanyInvoices}
                                setFactoringCompanyIsEditingContact={props.setFactoringCompanyIsEditingContact}
                                setFactoringCompanyContacts={props.setFactoringCompanyContacts}
                                setSelectedFactoringCompanyInvoice={props.setSelectedFactoringCompanyInvoice}
                                setSelectedFactoringCompanyIsShowingInvoiceList={props.setSelectedFactoringCompanyIsShowingInvoiceList}
                                setFactoringCompanySearch={props.setFactoringCompanySearch}
                                setFactoringCompanies={props.setFactoringCompanies}
                                setSelectedFactoringCompanyDocument={props.setSelectedFactoringCompanyDocument}
                                setSelectedCarrier={props.setSelectedCarrier}

                                factoringCompanySearch={props.factoringCompanySearch}
                                selectedFactoringCompany={props.selectedFactoringCompany}
                                selectedFactoringCompanyContact={props.selectedFactoringCompanyContact}
                                selectedFactoringCompanyIsShowingContactList={props.selectedFactoringCompanyIsShowingContactList}
                                selectedFactoringCompanyNote={props.selectedFactoringCompanyNote}
                                selectedFactoringCompanyContactSearch={props.selectedFactoringCompanyContactSearch}
                                selectedFactoringCompanyInvoice={props.selectedFactoringCompanyInvoice}
                                selectedFactoringCompanyIsShowingInvoiceList={props.selectedFactoringCompanyIsShowingInvoiceList}
                                selectedFactoringCompanyInvoiceSearch={props.selectedFactoringCompanyInvoiceSearch}
                                selectedCarrier={props.selectedCarrier}

                                factoringCompanySearchPanelName='carrier-factoring-company-search'
                                factoringCompanyPanelSearchPanelName='carrier-factoring-company-panel-search'
                                factoringCompanyContactsPanelName='factoring-company-contacts'
                                factoringCompanyContactSearchPanelName='factoring-company-contact-search'
                                factoringCompanyDocumentsPanelName='factoring-company-documents'
                                factoringCompanyInvoiceSearchPanelName='factoring-company-invoice-search'
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY =============================== */}

            {/* ================================== FACTORING COMPANY SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-factoring-company-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-factoring-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-factoring-company-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-factoring-company-search'))
                        }}>
                            <FactoringCompanySearch
                                title='Factoring Company Search Results'
                                tabTimes={9000}
                                parentPanelName='carrier-factoring-company'
                                panelName='carrier-factoring-company-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCarrier={props.setSelectedCarrier}
                                setSelectedCarrierContact={props.setSelectedCarrierContact}
                                setFactoringCompanySearch={props.setFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setSelectedFactoringCompany}

                                factoringCompanySearch={props.factoringCompanySearch}
                                factoringCompanies={props.factoringCompanies}
                                selectedCarrier={props.selectedCarrier}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('carrier-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('carrier-factoring-company-panel-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        onStop={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'carrier-factoring-company-panel-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-carrier-factoring-company-panel-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'carrier-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('carrier-factoring-company-panel-search'))
                        }}>
                            <FactoringCompanyPanelSearch
                                title='Factoring Company Search Results'
                                tabTimes={10000}
                                panelName='carrier-factoring-company-panel-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setFactoringCompanySearch={props.setFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setSelectedFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setSelectedFactoringCompanyContact}
                                factoringCompanies={props.factoringCompanies}
                                factoringCompanySearch={props.factoringCompanySearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY PANEL SEARCH =============================== */}

            {/* ================================== FACTORING COMPANY CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('factoring-company-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'factoring-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-factoring-company-contacts" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('factoring-company-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={16000}
                                panelName='factoring-company-contacts'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedFactoringCompany}
                                setSelectedContact={props.setSelectedFactoringCompanyContact}
                                setIsEditingContact={props.setFactoringCompanyIsEditingContact}
                                setContactSearchCustomer={props.setSelectedFactoringCompanyContactSearch}

                                contactSearchCustomer={props.selectedFactoringCompanyContactSearch}
                                selectedCustomer={props.selectedFactoringCompany}
                                selectedContact={props.selectedFactoringCompanyContact}
                                isEditingContact={props.factoringCompanyIsEditingContact}
                                contacts={props.factoringCompanyContacts}
                                savingContactUrl='/saveFactoringCompanyContact'
                                deletingContactUrl='/deleteFactoringCompanyContact'
                                uploadAvatarUrl='/uploadFactoringCompanyAvatar'
                                removeAvatarUrl='/removeFactoringCompanyAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY CONTACTS =============================== */}

            {/* ================================== FACTORING COMPANY CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('factoring-company-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'factoring-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-factoring-company-contact-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('factoring-company-contact-search'))
                        }}>
                            <ContactSearch
                                title='Factoring Company Contact Search Results'
                                tabTimes={17000}
                                parentPanelName='factoring-company-contacts'
                                panelName='factoring-company-contact-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setSelectedFactoringCompany}
                                setSelectedContact={props.setSelectedFactoringCompanyContact}
                                setCustomerContacts={props.setFactoringCompanyContacts}
                                setContactSearch={props.setSelectedFactoringCompanyContactSearch}
                                setShowingContactList={props.setSelectedFactoringCompanyIsShowingContactList}
                                setContactSearchCustomer={props.setSelectedFactoringCompanyContactSearch}

                                customers={props.factoringCompanies}
                                contactSearch={props.selectedFactoringCompanyContactSearch}
                                contacts={props.factoringCompanyContacts}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== FACTORING COMPANY INVOICE SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('factoring-company-invoice-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        onStop={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'factoring-company-invoice-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-factoring-company-invoice-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('factoring-company-invoice-search'))
                        }}>
                            <FactoringCompanyInvoiceSearch
                                title='Factoring Company Invoice Search Results'
                                tabTimes={18000}
                                panelName='factoring-company-invoice-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompany={props.setSelectedFactoringCompany}
                                setSelectedFactoringCompanyInvoice={props.setSelectedFactoringCompanyInvoice}
                                setSelectedFactoringCompanyInvoiceSearch={props.setSelectedFactoringCompanyInvoiceSearch}

                                selectedFactoringCompany={props.selectedFactoringCompany}
                                selectedFactoringCompanyInvoiceSearch={props.selectedFactoringCompanyInvoiceSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== FACTORING COMPANY DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('factoring-company-documents')}
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
                        onStart={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'factoring-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-factoring-company-documents" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('factoring-company-documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={19000}
                                panelName='factoring-company-documents'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setSelectedFactoringCompanyDocument}
                                setSelectedOwner={props.setSelectedFactoringCompany}
                                setSelectedOwnerDocumentTags={props.setSelectedFactoringCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setSelectedFactoringCompanyDocumentNote}

                                selectedOwner={props.selectedFactoringCompany}
                                selectedOwnerDocument={props.selectedFactoringCompanyDocument}
                                selectedOwnerDocumentTags={props.selectedFactoringCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.selectedFactoringCompanyDocumentNote}

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
            {/* ================================== FACTORING COMPANY DOCUMENTS =============================== */}


            {/* ================================== ADMIN CARRIER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-carrier-search'))
                        }}>
                            <CarrierSearch
                                title='Carrier Search Results'
                                tabTimes={6000}
                                panelName='admin-carrier-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setAdminSelectedCarrier}
                                setSelectedContact={props.setAdminSelectedCarrierContact}

                                customers={props.adminCarriers}
                                customerSearch={props.adminCarrierSearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ADMIN CARRIER SEARCH =============================== */}

            {/* ================================== ADMIN CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-contact-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-carrier-contact-search'))
                        }}>
                            <ContactSearch
                                title='Contact Search Results'
                                tabTimes={7000}
                                parentPanelName='carrier-contacts'
                                panelName='admin-carrier-contact-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setAdminSelectedCarrier}
                                setSelectedContact={props.setAdminSelectedCarrierContact}
                                setCustomerContacts={props.setAdminCarrierContacts}
                                setContactSearch={props.setAdminCarrierContactSearch}
                                setShowingContactList={props.setAdminShowingCarrierContactList}
                                setContactSearchCustomer={props.setAdminContactSearchCarrier}

                                customers={props.adminCarriers}
                                contactSearch={props.adminCarrierContactSearch}
                                contacts={props.adminCarrierContacts}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ADMIN CONTACT SEARCH =============================== */}

            {/* ================================== ADMIN CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-contacts" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-carrier-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={8000}
                                panelName='admin-carrier-contacts'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setAdminSelectedCarrier}
                                setSelectedContact={props.setAdminSelectedCarrierContact}
                                setIsEditingContact={props.setAdminIsEditingCarrierContact}
                                setContactSearchCustomer={props.setAdminContactSearchCarrier}

                                contactSearchCustomer={props.adminContactSearchCarrier}
                                selectedCustomer={props.adminSelectedCarrier}
                                selectedContact={props.adminSelectedCarrierContact}
                                isEditingContact={props.adminIsEditingCarrierContact}
                                contacts={props.adminCarrierContacts}
                                savingContactUrl='/saveCarrierContact'
                                deletingContactUrl='/deleteCarrierContact'
                                uploadAvatarUrl='/uploadCarrierAvatar'
                                removeAvatarUrl='/removeCarrierAvatar'
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ADMIN CONTACTS =============================== */}

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
                        <animated.div className="panel panel-admin-documents" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={12000}
                                panelName='admin-documents'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setAdminSelectedCarrierDocument}
                                setSelectedOwner={props.setAdminSelectedCarrier}
                                setSelectedOwnerDocumentTags={props.setAdminSelectedCarrierDocumentTags}
                                setSelectedOwnerDocumentNote={props.setAdminSelectedCarrierDocumentNote}

                                selectedOwner={props.adminSelectedCarrier}
                                selectedOwnerDocument={props.adminSelectedCarrierDocument}
                                selectedOwnerDocumentTags={props.adminSelectedCarrierDocumentTags}
                                selectedOwnerDocumentNote={props.adminSelectedCarrierDocumentNote}

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
            {/* ================================== ADMIN DOCUMENTS =============================== */}

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
                        <animated.div className="panel panel-admin-revenue-information" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-revenue-information'))
                        }}>
                            <RevenueInformation
                                title='Revenue Information'
                                tabTimes={13000}
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
                        <animated.div className="panel panel-admin-order-history" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-order-history'))
                        }}>
                            <OrderHistory
                                title='Order History'
                                tabTimes={14000}
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

            {/* ================================== ADMIN EQUIPMENT INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-equipment-information')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        onStop={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-equipment-information')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-equipment-information" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-equipment-information')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.openedPanels.indexOf('admin-equipment-information'))
                        }}>
                            <EquipmentInformation
                                title='Equipment Information'
                                tabTimes={15000}
                                panelName='admin-equipment-information'
                                setOpenedPanels={props.setOpenedPanels}
                                serverUrl={props.serverUrl}
                                openedPanels={props.openedPanels}

                                setEquipmentInformation={props.setAdminEquipmentInformation}
                                equipmentInformation={props.adminEquipmentInformation}

                                setSelectedCarrier={props.setAdminSelectedCarrier}
                                selectedCarrier={props.adminSelectedCarrier}
                                setSelectedCarrierContact={props.setAdminSelectedCarrierContact}
                                setSelectedDriver={props.setAdminSelectedDriver}
                                setSelectedInsurance={props.setAdminSelectedInsurance}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN EQUIPMENT INFORMATION =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-factoring-company')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-factoring-company" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-factoring-company')} style={{
                            ...styles,
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.openedPanels.indexOf('admin-carrier-factoring-company'))
                        }}>
                            <FactoringCompany
                                title='Factoring Company'
                                tabTimes={11000}
                                panelName='admin-carrier-factoring-company'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompanyContact={props.setAdminSelectedFactoringCompanyContact}
                                setSelectedFactoringCompanyContactSearch={props.setAdminSelectedFactoringCompanyContactSearch}
                                setSelectedFactoringCompanyIsShowingContactList={props.setAdminSelectedFactoringCompanyIsShowingContactList}
                                setSelectedFactoringCompany={props.setAdminSelectedFactoringCompany}
                                setSelectedFactoringCompanyNote={props.setAdminSelectedFactoringCompanyNote}
                                setSelectedFactoringCompanyInvoiceSearch={props.setAdminSelectedFactoringCompanyInvoiceSearch}
                                setSelectedFactoringCompanyInvoices={props.setAdminSelectedFactoringCompanyInvoices}
                                setFactoringCompanyIsEditingContact={props.setAdminFactoringCompanyIsEditingContact}
                                setFactoringCompanyContacts={props.setAdminFactoringCompanyContacts}
                                setSelectedFactoringCompanyInvoice={props.setAdminSelectedFactoringCompanyInvoice}
                                setSelectedFactoringCompanyIsShowingInvoiceList={props.setAdminSelectedFactoringCompanyIsShowingInvoiceList}
                                setFactoringCompanySearch={props.setAdminFactoringCompanySearch}
                                setFactoringCompanies={props.setAdminFactoringCompanies}
                                setSelectedFactoringCompanyDocument={props.setAdminSelectedFactoringCompanyDocument}
                                setSelectedCarrier={props.setAdminSelectedCarrier}

                                factoringCompanySearch={props.adminFactoringCompanySearch}
                                selectedFactoringCompany={props.adminSelectedFactoringCompany}
                                selectedFactoringCompanyContact={props.adminSelectedFactoringCompanyContact}
                                selectedFactoringCompanyIsShowingContactList={props.adminSelectedFactoringCompanyIsShowingContactList}
                                selectedFactoringCompanyNote={props.adminSelectedFactoringCompanyNote}
                                selectedFactoringCompanyContactSearch={props.adminSelectedFactoringCompanyContactSearch}
                                selectedFactoringCompanyInvoice={props.adminSelectedFactoringCompanyInvoice}
                                selectedFactoringCompanyIsShowingInvoiceList={props.adminSelectedFactoringCompanyIsShowingInvoiceList}
                                selectedFactoringCompanyInvoiceSearch={props.adminSelectedFactoringCompanyInvoiceSearch}
                                selectedCarrier={props.adminSelectedCarrier}

                                factoringCompanySearchPanelName='admin-carrier-factoring-company-search'
                                factoringCompanyPanelSearchPanelName='admin-carrier-factoring-company-panel-search'
                                factoringCompanyContactsPanelName='admin-factoring-company-contacts'
                                factoringCompanyContactSearchPanelName='admin-factoring-company-contact-search'
                                factoringCompanyDocumentsPanelName='admin-factoring-company-documents'
                                factoringCompanyInvoiceSearchPanelName='admin-factoring-company-invoice-search'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-factoring-company-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-factoring-company-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-factoring-company-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-carrier-factoring-company-search'))
                        }}>
                            <FactoringCompanySearch
                                title='Factoring Company Search Results'
                                tabTimes={9000}
                                parentPanelName='admin-carrier-factoring-company'
                                panelName='admin-carrier-factoring-company-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCarrier={props.setAdminSelectedCarrier}
                                setSelectedCarrierContact={props.setAdminSelectedCarrierContact}
                                setFactoringCompanySearch={props.setAdminFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setAdminSelectedFactoringCompany}

                                factoringCompanySearch={props.adminFactoringCompanySearch}
                                factoringCompanies={props.adminFactoringCompanies}
                                selectedCarrier={props.adminSelectedCarrier}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY SEARCH =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY PANEL SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-carrier-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-carrier-factoring-company-panel-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-carrier-factoring-company-panel-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-carrier-factoring-company-panel-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-carrier-factoring-company-panel-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-carrier-factoring-company-panel-search'))
                        }}>
                            <FactoringCompanyPanelSearch
                                title='Factoring Company Search Results'
                                tabTimes={10000}
                                panelName='admin-carrier-factoring-company-panel-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setFactoringCompanySearch={props.setAdminFactoringCompanySearch}
                                setSelectedFactoringCompany={props.setAdminSelectedFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setAdminSelectedFactoringCompanyContact}
                                factoringCompanies={props.adminFactoringCompanies}
                                factoringCompanySearch={props.adminFactoringCompanySearch}
                            />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY PANEL SEARCH =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-factoring-company-contacts')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        onStop={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-factoring-company-contacts')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-factoring-company-contacts" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-factoring-company-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-factoring-company-contacts'))
                        }}>
                            <Contacts
                                title='Contacts'
                                tabTimes={16000}
                                panelName='admin-factoring-company-contacts'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setAdminSelectedFactoringCompany}
                                setSelectedContact={props.setAdminSelectedFactoringCompanyContact}
                                setIsEditingContact={props.setAdminFactoringCompanyIsEditingContact}
                                setContactSearchCustomer={props.setAdminSelectedFactoringCompanyContactSearch}

                                contactSearchCustomer={props.adminSelectedFactoringCompanyContactSearch}
                                selectedCustomer={props.adminSelectedFactoringCompany}
                                selectedContact={props.adminSelectedFactoringCompanyContact}
                                isEditingContact={props.adminFactoringCompanyIsEditingContact}
                                contacts={props.adminFactoringCompanyContacts}
                                savingContactUrl='/saveFactoringCompanyContact'
                                deletingContactUrl='/deleteFactoringCompanyContact'
                                uploadAvatarUrl='/uploadFactoringCompanyAvatar'
                                removeAvatarUrl='/removeFactoringCompanyAvatar'
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY CONTACTS =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-factoring-company-contact-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-factoring-company-contact-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-factoring-company-contact-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-factoring-company-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-factoring-company-contact-search'))
                        }}>
                            <ContactSearch
                                title='Factoring Company Contact Search Results'
                                tabTimes={17000}
                                parentPanelName='admin-factoring-company-contacts'
                                panelName='admin-factoring-company-contact-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedCustomer={props.setAdminSelectedFactoringCompany}
                                setSelectedContact={props.setAdminSelectedFactoringCompanyContact}
                                setCustomerContacts={props.setAdminFactoringCompanyContacts}
                                setContactSearch={props.setAdminSelectedFactoringCompanyContactSearch}
                                setShowingContactList={props.setAdminSelectedFactoringCompanyIsShowingContactList}
                                setContactSearchCustomer={props.setAdminSelectedFactoringCompanyContactSearch}

                                customers={props.adminFactoringCompanies}
                                contactSearch={props.adminSelectedFactoringCompanyContactSearch}
                                contacts={props.adminFactoringCompanyContacts}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY CONTACT SEARCH =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY INVOICE SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-factoring-company-invoice-search')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        onStop={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-factoring-company-invoice-search')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-factoring-company-invoice-search" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-factoring-company-invoice-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-factoring-company-invoice-search'))
                        }}>
                            <FactoringCompanyInvoiceSearch
                                title='Factoring Company Invoice Search Results'
                                tabTimes={18000}
                                panelName='admin-factoring-company-invoice-search'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedFactoringCompany={props.setAdminSelectedFactoringCompany}
                                setSelectedFactoringCompanyInvoice={props.setAdminSelectedFactoringCompanyInvoice}
                                setSelectedFactoringCompanyInvoiceSearch={props.setAdminSelectedFactoringCompanyInvoiceSearch}

                                selectedFactoringCompany={props.adminSelectedFactoringCompany}
                                selectedFactoringCompanyInvoiceSearch={props.adminSelectedFactoringCompanyInvoiceSearch}
                            />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== ADMIN FACTORING COMPANY INVOICE SEARCH =============================== */}

            {/* ================================== ADMIN FACTORING COMPANY DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.openedPanels.indexOf('admin-factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.openedPanels.includes('admin-factoring-company-documents')}
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
                        onStart={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        onStop={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        onMouseDown={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        onMouseUp={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        onTouchStart={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        onTouchEnd={(e, i) => eventControl(e, i, 'admin-factoring-company-documents')}
                        position={{ x: 0, y: 0 }}
                    >
                        <animated.div className="panel panel-admin-factoring-company-documents" ref={ref => carrierOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'admin-factoring-company-documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.openedPanels.indexOf('admin-factoring-company-documents'))
                        }}>
                            <Documents
                                title='Documents'
                                tabTimes={19000}
                                panelName='admin-factoring-company-documents'
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setOpenedPanels}
                                openedPanels={props.openedPanels}

                                setSelectedOwnerDocument={props.setAdminSelectedFactoringCompanyDocument}
                                setSelectedOwner={props.setAdminSelectedFactoringCompany}
                                setSelectedOwnerDocumentTags={props.setAdminSelectedFactoringCompanyDocumentTags}
                                setSelectedOwnerDocumentNote={props.setAdminSelectedFactoringCompanyDocumentNote}

                                selectedOwner={props.adminSelectedFactoringCompany}
                                selectedOwnerDocument={props.adminSelectedFactoringCompanyDocument}
                                selectedOwnerDocumentTags={props.adminSelectedFactoringCompanyDocumentTags}
                                selectedOwnerDocumentNote={props.adminSelectedFactoringCompanyDocumentNote}

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
            {/* ================================== ADMIN FACTORING COMPANY DOCUMENTS =============================== */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,

        carriers: state.carrierReducers.carriers,
        selectedCarrier: state.carrierReducers.selectedCarrier,
        carrierSearch: state.carrierReducers.carrierSearch,
        selectedCarrierContact: state.carrierReducers.selectedContact,
        carrierContacts: state.carrierReducers.contacts,
        isEditingCarrierContact: state.carrierReducers.isEditingContact,
        carrierContactSearch: state.carrierReducers.contactSearch,
        contactSearchCarrier: state.carrierReducers.contactSearchCarrier,
        selectedCarrierDocument: state.carrierReducers.selectedDocument,
        selectedCarrierDocumentTags: state.carrierReducers.documentTags,
        selectedCarrierDocumentNote: state.carrierReducers.selectedDocumentNote,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        selectedCarrierDocument: state.carrierReducers.selectedDocument,
        selectedCarrierDocumentTags: state.carrierReducers.documentTags,
        selectedCarrierDocumentNote: state.carrierReducers.selectedDocumentNote,
        equipmentInformation: state.carrierReducers.equipmentInformation,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        selectedCarrier: state.carrierReducers.selectedCarrier,

        selectedFactoringCompany: state.carrierReducers.selectedFactoringCompany,
        selectedFactoringCompanyContact: state.carrierReducers.selectedFactoringCompanyContact,
        selectedFactoringCompanyIsShowingContactList: state.carrierReducers.selectedFactoringCompanyIsShowingContactList,
        selectedFactoringCompanyNote: state.carrierReducers.selectedFactoringCompanyNote,
        selectedFactoringCompanyContactSearch: state.carrierReducers.selectedFactoringCompanyContactSearch,
        selectedFactoringCompanyInvoice: state.carrierReducers.selectedFactoringCompanyInvoice,
        selectedFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedFactoringCompanyIsShowingInvoiceList,
        selectedFactoringCompanyInvoiceSearch: state.carrierReducers.selectedFactoringCompanyInvoiceSearch,
        factoringCompanyIsEditingContact: state.carrierReducers.factoringCompanyIsEditingContact,
        factoringCompanyContacts: state.carrierReducers.factoringCompanyContacts,

        selectedFactoringCompanyDocument: state.carrierReducers.selectedFactoringCompanyDocument,
        selectedFactoringCompanyDocumentTags: state.carrierReducers.factoringCompanyDocumentTags,
        selectedFactoringCompanyDocumentNote: state.carrierReducers.selectedFactoringCompanyDocumentNote,

        // ============================== admin ==============================

        adminCarriers: state.carrierReducers.adminCarriers,
        adminSelectedCarrier: state.carrierReducers.adminSelectedCarrier,
        adminCarrierSearch: state.carrierReducers.adminCarrierSearch,
        adminSelectedCarrierContact: state.carrierReducers.adminSelectedContact,
        adminCarrierContacts: state.carrierReducers.adminContacts,
        adminIsEditingCarrierContact: state.carrierReducers.adminIsEditingContact,
        adminCarrierContactSearch: state.carrierReducers.adminContactSearch,
        adminContactSearchCarrier: state.carrierReducers.adminContactSearchCarrier,
        adminSelectedCarrierDocument: state.carrierReducers.adminSelectedDocument,
        adminSelectedCarrierDocumentTags: state.carrierReducers.documentTags,
        adminSelectedCarrierDocumentNote: state.carrierReducers.adminSelectedDocumentNote,
        adminFactoringCompanies: state.carrierReducers.factoringCompanies,
        adminFactoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        adminSelectedCarrierDocument: state.carrierReducers.adminSelectedDocument,
        adminSelectedCarrierDocumentTags: state.carrierReducers.adminDocumentTags,
        adminSelectedCarrierDocumentNote: state.carrierReducers.adminSelectedDocumentNote,
        adminEquipmentInformation: state.carrierReducers.adminEquipmentInformation,
        adminFactoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        adminFactoringCompanies: state.carrierReducers.factoringCompanies,
        adminSelectedCarrier: state.carrierReducers.adminSelectedCarrier,

        adminSelectedFactoringCompany: state.carrierReducers.adminSelectedFactoringCompany,
        adminSelectedFactoringCompanyContact: state.carrierReducers.adminSelectedFactoringCompanyContact,
        adminSelectedFactoringCompanyIsShowingContactList: state.carrierReducers.adminSelectedFactoringCompanyIsShowingContactList,
        adminSelectedFactoringCompanyNote: state.carrierReducers.adminSelectedFactoringCompanyNote,
        adminSelectedFactoringCompanyContactSearch: state.carrierReducers.adminSelectedFactoringCompanyContactSearch,
        adminSelectedFactoringCompanyInvoice: state.carrierReducers.adminSelectedFactoringCompanyInvoice,
        adminSelectedFactoringCompanyIsShowingInvoiceList: state.carrierReducers.adminSelectedFactoringCompanyIsShowingInvoiceList,
        adminSelectedFactoringCompanyInvoiceSearch: state.carrierReducers.adminSelectedFactoringCompanyInvoiceSearch,
        adminFactoringCompanyIsEditingContact: state.carrierReducers.adminFactoringCompanyIsEditingContact,
        adminFactoringCompanyContacts: state.carrierReducers.adminFactoringCompanyContacts,

        adminSelectedFactoringCompanyDocument: state.carrierReducers.adminSelectedFactoringCompanyDocument,
        adminSelectedFactoringCompanyDocumentTags: state.carrierReducers.adminFactoringCompanyDocumentTags,
        adminSelectedFactoringCompanyDocumentNote: state.carrierReducers.adminSelectedFactoringCompanyDocumentNote
    }
}

export default connect(mapStateToProps, {    
    setSelectedCarrier,
    setSelectedCarrierContact,
    setCarrierContacts,
    setCarrierContactSearch,
    setShowingCarrierContactList,
    setContactSearchCarrier,
    setIsEditingCarrierContact,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyContact,
    setSelectedCarrierDocument,
    setSelectedCarrierDocumentNote,
    setSelectedCarrierDocumentTags,
    setEquipmentInformation,
    setFactoringCompanySearch,
    setSelectedFactoringCompanyContactSearch,
    setSelectedFactoringCompanyIsShowingContactList,
    setSelectedFactoringCompanyNote,
    setSelectedFactoringCompanyInvoiceSearch,
    setSelectedFactoringCompanyInvoices,
    setFactoringCompanyIsEditingContact,
    setFactoringCompanyContacts,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyIsShowingInvoiceList,
    setFactoringCompanies,
    setSelectedFactoringCompanyDocument,
    setSelectedFactoringCompanyDocumentNote,
    setSelectedFactoringCompanyDocumentTags,
    setSelectedDriver,
    setSelectedInsurance,

    setAdminSelectedCarrier,
    setAdminSelectedCarrierContact,
    setAdminCarrierContacts,
    setAdminCarrierContactSearch,
    setAdminShowingCarrierContactList,
    setAdminContactSearchCarrier,
    setAdminIsEditingCarrierContact,
    setAdminSelectedFactoringCompany,
    setAdminSelectedFactoringCompanyContact,
    setAdminSelectedCarrierDocument,
    setAdminSelectedCarrierDocumentNote,
    setAdminSelectedCarrierDocumentTags,
    setAdminEquipmentInformation,
    setAdminFactoringCompanySearch,
    setAdminSelectedDriver,
    setAdminSelectedInsurance,

    setAdminSelectedFactoringCompanyContactSearch,
    setAdminSelectedFactoringCompanyIsShowingContactList,
    setAdminSelectedFactoringCompanyNote,
    setAdminSelectedFactoringCompanyInvoiceSearch,
    setAdminSelectedFactoringCompanyInvoices,
    setAdminFactoringCompanyIsEditingContact,
    setAdminFactoringCompanyContacts,
    setAdminSelectedFactoringCompanyInvoice,
    setAdminSelectedFactoringCompanyIsShowingInvoiceList,
    setAdminFactoringCompanies,
    setAdminSelectedFactoringCompanyDocument,
    setAdminSelectedFactoringCompanyDocumentNote,
    setAdminSelectedFactoringCompanyDocumentTags,
})(PanelContainer)