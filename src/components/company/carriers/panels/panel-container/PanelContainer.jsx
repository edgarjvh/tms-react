import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import { setCarrierPanels, setCarrierOpenedPanels } from '../../../../../actions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import CarrierSearch from './../carrier-search/CarrierSearch.jsx';
import ContactSearch from './../contact-search/ContactSearch.jsx';
import Contacts from './../contacts/Contacts.jsx';
import FactoringCompanySearch from './../factoring-company-search/FactoringCompanySearch.jsx';
import FactoringCompanyPanelSearch from './../factoring-company-panel-search/FactoringCompanyPanelSearch.jsx';
import FactoringCompany from './../factoring-company/FactoringCompany.jsx';
import Documents from './../documents/Documents.jsx';
import RevenueInformation from './../revenue-information/RevenueInformation.jsx';
import OrderHistory from './../order-history/OrderHistory.jsx';
import EquipmentInformation from './../equipment-information/EquipmentInformation.jsx';
import FactoringCompanyContacts from './../factoring-company-contacts/FactoringCompanyContacts.jsx';
import FactoringCompanyContactSearch from './../factoring-company-contact-search/FactoringCompanyContactSearch.jsx';
import FactoringCompanyInvoiceSearch from './../factoring-company-invoice-search/FactoringCompanyInvoiceSearch.jsx';
import FactoringCompanyDocuments from './../factoring-company-documents/FactoringCompanyDocuments.jsx';

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
                let openedPanels = props.carrierOpenedPanels.filter((item, index) => {
                    return item !== name;
                })

                props.setCarrierOpenedPanels(openedPanels);
            }
        }
    }

    const onPanelClick = async (e, name) => {
        let openedPanels = props.carrierOpenedPanels;

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

            await props.setCarrierOpenedPanels(openedPanels);
        }
    }

    return (
        <div className={panelContainerClasses}>
            {/* ================================== CARRIER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-search'))
                        }}>
                            <CarrierSearch title='Carrier Search Results' tabTimes={6000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-contact-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-contact-search'))
                        }}>
                            <ContactSearch title='Contact Search Results' tabTimes={7000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-contacts')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-contacts'))
                        }}>
                            <Contacts title='Contacts' tabTimes={8000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== CONTACTS =============================== */}

            {/* ================================== FACTORING COMPANY SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-factoring-company-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-factoring-company-search'))
                        }}>
                            <FactoringCompanySearch title='Factoring Company Search Results' tabTimes={9000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company-panel-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company-panel-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-factoring-company-panel-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-factoring-company-panel-search'))
                        }}>
                            <FactoringCompanyPanelSearch title='Factoring Company Search Results' tabTimes={10000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY PANEL SEARCH =============================== */}

            {/* ================================== FACTORING COMPANY =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('carrier-factoring-company')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('carrier-factoring-company')}
                config={{
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
                            width: ((window.innerWidth * baseWidth) * 0.75) - (panelGap * props.carrierOpenedPanels.indexOf('carrier-factoring-company'))
                        }}>
                            <FactoringCompany title='Factoring Company' tabTimes={11000} />
                        </animated.div>
                    </Draggable>

                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY =============================== */}

            {/* ================================== DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.carrierOpenedPanels.indexOf('documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('documents')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('documents'))
                        }}>
                            <Documents title='Documents' tabTimes={12000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('revenue-information')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('revenue-information'))
                        }}>
                            <RevenueInformation title='Revenue Information' tabTimes={13000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('order-history')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('order-history'))
                        }}>
                            <OrderHistory title='Order History' tabTimes={14000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('equipment-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('equipment-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('equipment-information')}
                config={{
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
                            width: ((window.innerWidth * baseWidth) * 0.45) - (panelGap * props.carrierOpenedPanels.indexOf('equipment-information'))
                        }}>
                            <EquipmentInformation title='Equipment Information' tabTimes={15000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== EQUIPMENT INFORMATION =============================== */}

            {/* ================================== FACTORING COMPANY CONTACTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('factoring-company-contacts')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('factoring-company-contacts'))
                        }}>
                            <FactoringCompanyContacts title='Contacts' tabTimes={16000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('factoring-company-contact-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('factoring-company-contact-search'))
                        }}>
                            <FactoringCompanyContactSearch title='Factoring Company Contact Search Results' tabTimes={17000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-invoice-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-invoice-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('factoring-company-invoice-search')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('factoring-company-invoice-search'))
                        }}>
                            <FactoringCompanyInvoiceSearch title='Factoring Company Invoice Search Results' tabTimes={18000} />
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
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.carrierOpenedPanels.indexOf('factoring-company-documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.carrierOpenedPanels.includes('factoring-company-documents')}
                config={{
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
                            width: (window.innerWidth * baseWidth) - (panelGap * props.carrierOpenedPanels.indexOf('factoring-company-documents'))
                        }}>
                            <FactoringCompanyDocuments title='Documents' tabTimes={19000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== FACTORING COMPANY DOCUMENTS =============================== */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        panels: state.carrierReducers.panels,
        carrierOpenedPanels: state.carrierReducers.carrierOpenedPanels,
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels,
    setCarrierOpenedPanels
})(PanelContainer)