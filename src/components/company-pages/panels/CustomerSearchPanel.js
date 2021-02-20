import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './../../../styles/panels/customerSearchPanel.css';

function CustomerSearchPanel(props) {
    const onStartDragging = (e) => {
        console.log('start', e);
    }

    const onWhileDragging = (e) => {
        console.log('while', e);
    }

    const onStopDragging = (e) => {
        console.log('stop', e);
    }

    return (
        <Draggable
            axis="x"
            handle=".drag-handler"
            onStart={onStartDragging}     
            onStop={onStopDragging}   
            position={null}      
        >
            <div className="panel">
                <div className="drag-handler"></div>
                <div className="close-btn" title="Close"><span className="fas fa-times"></span></div>
                <div className="title">Customer Search Results</div>

            </div>

        </Draggable>
    )
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, null)(CustomerSearchPanel)