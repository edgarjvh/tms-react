import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './PanelContainer.css';
import Draggable from 'react-draggable';
import { setDispatchPanels } from '../../../../../actions';

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
                let index = props.panels.length - 1;

                let panels = props.panels.map((panel, i) => {
                    if (panel.name === panelName) {
                        index = i;
                        panel.isOpened = false;
                    }

                    return panel;
                });

                panels.splice(0, 0, panels.splice(index, 1)[0]);
                props.setDispatchPanels(panels);
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
                            key={index}
                        >
                            <div className="panel"
                                id={'panel-' + panel.name}
                                data-name={panel.name}
                                ref={ref => props.panelRefs.current.push(ref)}
                                onClick={() => {
                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === panel.name) {
                                            index = i;                                           
                                        }
                                        return p;
                                    });

                                    if (index < props.panels.length -1){
                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setDispatchPanels(panels);
                                    }                                    
                                }}
                                style={{
                                    width: panel.isOpened ? `calc(${panel.maxWidth}% - ${panel.pos * 1}in)` : panel.maxWidth + '%',
                                    left: panel.isOpened ? `calc(${100 - panel.maxWidth}% + ${(panel.pos * 1)}in` : '110%'
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
        panels: state.dispatchReducers.panels
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels
})(PanelContainer)