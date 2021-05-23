import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import { setInvoicePanels, setInvoiceOpenedPanels } from '../../../../../actions/invoiceActions';
import { useSpring, config } from 'react-spring';
import { Transition, Spring, animated } from 'react-spring/renderprops';

import Documents from './../documents/Documents.jsx';

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
                let openedPanels = props.invoiceOpenedPanels.filter((item, index) => {
                    return item !== name;
                })

                props.setInvoiceOpenedPanels(openedPanels);
            }
        }
    }

    const onPanelClick = async (e, name) => {
        let openedPanels = props.invoiceOpenedPanels;

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

            await props.setInvoiceOpenedPanels(openedPanels);
        }
    }

    return (
        <div className={panelContainerClasses}>
            {/* ================================== DOCUMENTS =============================== */}
            <Transition
                from={{
                    opacity: 1,
                    right: 0,
                    zIndex: props.invoiceOpenedPanels.indexOf('documents')
                }}
                enter={{
                    opacity: 1,
                    right: window.innerWidth,
                    zIndex: props.invoiceOpenedPanels.indexOf('documents')
                }}
                leave={{
                    opacity: 1,
                    right: 0,
                    zIndex: 0
                }}
                items={props.invoiceOpenedPanels.includes('documents')}
                config={{
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
                        <animated.div className="panel panel-documents" ref={ref => invoiceOpenedPanelsRefs.current.push(ref)} onClick={e => onPanelClick(e, 'documents')} style={{
                            ...styles,
                            width: (window.innerWidth * baseWidth) - (panelGap * props.invoiceOpenedPanels.indexOf('documents'))
                        }}>
                            <Documents title='Documents' tabTimes={42000} />
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
        panels: state.invoiceReducers.panels,
        invoiceOpenedPanels: state.invoiceReducers.invoiceOpenedPanels
    }
}

export default connect(mapStateToProps, {
    setInvoicePanels,
    setInvoiceOpenedPanels
})(PanelContainer)