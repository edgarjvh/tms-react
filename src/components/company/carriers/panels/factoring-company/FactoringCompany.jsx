import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompany.css';
import { 
    setCarrierPanels, 
    setSelectedCarrier, 
    setSelectedContact, 
    setCarrierContacts, 
    setContactSearch, 
    setShowingContactList,
    setContactSearchCarrier
 } from '../../../../../actions';

function FactoringCompany(props) {
    const closePanelBtnClick = () => {
        console.log('closing')
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'carrier-factoring-company') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setCarrierPanels(panels);
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
        panels: state.carrierReducers.panels,
        carriers: state.carrierReducers.carriers,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels,
    setSelectedCarrier,
    setSelectedContact,
    setCarrierContacts,
    setContactSearch,
    setShowingContactList,
    setContactSearchCarrier
})(FactoringCompany)