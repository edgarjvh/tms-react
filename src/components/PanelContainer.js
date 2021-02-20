import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Resizable, ResizableBox } from 'react-resizable';
import './../styles/panelContainer.css';

function PanelContainer(props) {

    const panelContainerClasses = classnames({
        'main-panel-container': true,
        'shown': props.panels.length > 0,
        'hidden': props.panels.length === 0
    })

    return (
        <div className={panelContainerClasses}>
            {
                (props.panels || []).map((panel, index) => {
                    return panel.component
                })
            }
        </div>
    )
}

export default connect(null, null)(PanelContainer)