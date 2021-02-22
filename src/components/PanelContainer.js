import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './../styles/panelContainer.css';
import Draggable from 'react-draggable';
import { setCustomerPanels } from './../actions/customersPageActions';

function PanelContainer(props) {

    const panelContainerClasses = classnames({
        'main-panel-container': true,
        // 'shown': false,
        // 'hidden': true
        'shown': props.panels.filter(p => p.isOpened).length > 0,
        'hidden': props.panels.filter(p => p.isOpened).length === 0
    })

    const eventControl = (event, info) => {
        if (event.type === 'mouseup') {
            if (info.x > 150) {
                let panelName = info.node.dataset.name;
                let panels = props.panels.map(p => p);
                let index = panels.length - 1;

                panels.map((p, i) => {
                    if (p.name === panelName) {
                        p.isOpened = false;
                    }

                    return p;
                });

                panels.splice(0, 0, panels.splice(index, 1)[0]);
                props.setCustomerPanels(panels);
            }
        }
    }

    return (
        <div className={panelContainerClasses}>
            {
                (props.panels || []).map((panel, index) => {
                    return (
                        <Draggable
                            axis="x"
                            handle=".drag-handler"
                            // onDrag={eventControl}
                            onStart={eventControl}
                            onStop={eventControl}
                            onMouseDown={eventControl}
                            onMouseUp={eventControl}
                            onTouchStart={eventControl}
                            onTouchEnd={eventControl}
                            position={{ x: 0, y: 0 }}
                        >
                            <div className="panel" data-name={panel.name} style={{
                                width: panel.isOpened ? `calc(100% - ${panel.pos * 15}px)` : '100%',
                                left: panel.isOpened ? (panel.pos * 15) + 'px' : '110%'
                            }}>
                                {panel.component}
                            </div>
                        </Draggable>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        panels: state.customersPageReducers.panels
    }
}

export default connect(mapStateToProps, {
    setCustomerPanels
})(PanelContainer)