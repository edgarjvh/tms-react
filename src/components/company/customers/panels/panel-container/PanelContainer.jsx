import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import { setCustomerPanels, setCustomerOpenedPanels } from '../../../../../actions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import CustomerSearch from './../customer-search/CustomerSearch.jsx';
import ContactSearch from './../contact-search/ContactSearch.jsx';
import RevenueInformation from './../revenue-information/RevenueInformation.jsx';
import OrderHistory from './../order-history/OrderHistory.jsx';
import LaneHistory from './../lane-history/LaneHistory.jsx';
import Documents from './../documents/Documents.jsx';
import Contacts from './../contacts/Contacts.jsx';

function PanelContainer(props) {

    const baseWidth = 0.95;
    const panelGap = 70;

    const panelContainerClasses = classnames({
        'main-panel-container': true
    })

    const customerOpenedPanelsRefs = useRef([]);

    const eventControl = (event, info, name) => {
        if (event.type === 'mouseup') {
            if (info.x > 150) {
                let openedPanels = props.customerOpenedPanels.filter((item, index) => {
                    return item !== name;
                })

                props.setCustomerOpenedPanels(openedPanels);
            }
        }
    }

    const onPanelClick = async (e, name) => {
        let openedPanels = props.customerOpenedPanels;

        if (openedPanels.indexOf(name) < openedPanels.length - 1) {
            openedPanels.push(openedPanels.splice(openedPanels.indexOf(name), 1)[0]);

            openedPanels.map((panel, index) => {
                customerOpenedPanelsRefs.current.map((r, i) => {
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

            await props.setCustomerOpenedPanels(openedPanels);
        }
    }

    return (
        <div className={panelContainerClasses}>
            {/* ================================== CUSTOMER SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.customerOpenedPanels.indexOf('customer-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('customer-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('customer-search')}
                config={{
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
                        <animated.div className="panel panel-customer-search" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('customer-search'))
                        }}>
                            <CustomerSearch title='Customer Search Results' tabTimes={20000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CUSTOMER SEARCH =============================== */}

            {/* ================================== CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.customerOpenedPanels.indexOf('customer-contacts')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('customer-contacts')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('customer-contacts')}
                config={{
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
                        <animated.div className="panel panel-customer-contacts" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-contacts')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('customer-contacts'))
                        }}>
                            <Contacts title='Contacts' tabTimes={21000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CONTACT SEARCH =============================== */}

            {/* ================================== CUSTOMER CONTACT SEARCH =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.customerOpenedPanels.indexOf('customer-contact-search')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('customer-contact-search')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('customer-contact-search')}
                config={{
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
                        <animated.div className="panel panel-customer-contact-search" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'customer-contact-search')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('customer-contact-search'))
                        }}>
                            <ContactSearch title='Contact Search Results' tabTimes={22000} />
                        </animated.div>
                    </Draggable>
                ))}
            </Transition>
            {/* ================================== CUSTOMER CONTACT SEARCH =============================== */}

            {/* ================================== REVENUE INFORMATION =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.customerOpenedPanels.indexOf('revenue-information')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('revenue-information')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('revenue-information')}
                config={{
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
                        <animated.div className="panel panel-revenue-information" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'revenue-information')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('revenue-information'))
                        }}>
                            <RevenueInformation title='Revenue Information' tabTimes={23000} />
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
                    zIndex: props.customerOpenedPanels.indexOf('order-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('order-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('order-history')}
                config={{
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
                        <animated.div className="panel panel-order-history" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'order-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('order-history'))
                        }}>
                            <OrderHistory title='Order History' tabTimes={24000} />
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
                    zIndex: props.customerOpenedPanels.indexOf('lane-history')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('lane-history')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('lane-history')}
                config={{
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
                        <animated.div className="panel panel-lane-history" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'lane-history')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('lane-history'))
                        }}>
                            <LaneHistory title='Lane History' tabTimes={25000} />
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
                    zIndex: props.customerOpenedPanels.indexOf('documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.customerOpenedPanels.indexOf('documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.customerOpenedPanels.includes('documents')}
                config={{
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
                        <animated.div className="panel panel-documents" ref={ref => customerOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.customerOpenedPanels.indexOf('documents'))
                        }}>
                            <Documents title='Documents' tabTimes={26000} />
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
        panels: state.customerReducers.panels,
        customerOpenedPanels: state.customerReducers.customerOpenedPanels,
    }
}

export default connect(mapStateToProps, {
    setCustomerPanels,
    setCustomerOpenedPanels
})(PanelContainer)