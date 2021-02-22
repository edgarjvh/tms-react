import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './../../../styles/panels/customerContactSearchPanel.css';
import { setCustomerPanels } from './../../../actions/customersPageActions';

function CustomerContactSearchPanel(props) {
    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'customer-contact-search') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setCustomerPanels(panels);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>
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
})(CustomerContactSearchPanel)