import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompanyInvoiceSearch.css';
import { 
    setCarrierPanels, 
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyInvoiceSearch,
    setCarrierOpenedPanels
 } from '../../../../../actions';

function FactoringCompanyInvoiceSearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setCarrierOpenedPanels(props.carrierOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var clickCount = 0;

    const rowClick = (e, f) => {        
        
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'factoring-company-invoice-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.selectedFactoringCompanyInvoiceSearch.filters || []).map((item, index) => {

                        if (index > 0) {
                            if (item.data !== '') {
                                return (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '0.7rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        padding: '2px 10px',
                                        borderRadius: '10px',
                                        marginRight: '10px',
                                        cursor: 'default'
                                    }} title={item}>
                                        <span style={{ fontWeight: 'bold', marginRight: 5 }}>{item.field}: </span>
                                        <span style={{ whiteSpace: 'nowrap' }}>{item.data}</span>
                                    </div>
                                )
                            }
                        }

                        return false;
                    })
                }
            </div>

            <div className="tbl">
                <div className="thead">
                    <div className="trow">
                        <div className="tcol date">Invoice Date</div>
                        <div className="tcol number">Invoice Number</div>
                        <div className="tcol amount">Invoice Amount</div>
                        <div className="tcol order">Order Number</div>
                        <div className="tcol trip">Trip Number</div>
                        <div className="tcol pickup">Pick Up Location</div>
                        <div className="tcol delivery">Delivery Location</div>
                        <div className="tcol customer">Customer</div>
                        <div className="tcol carrier">Carrier</div>
                    </div>
                </div>
                <div className="tbody">
                    <div className="tbody-wrapper">
                        {
                            (props.selectedFactoringCompany.invoices || []).length > 0
                                ? props.selectedFactoringCompany.invoices.map((f, i) => {
                                    return (
                                        <div className="trow" onClick={(e) => { rowClick(e, {...f}) }} key={i}>
                                            <div className="tcol code">{f.code + (f.code_number === 0 ? '' : f.code_number)}</div>
                                            <div className="tcol name">{f.name}</div>
                                            <div className="tcol address1">{f.address1}</div>
                                            <div className="tcol address2">{f.address2}</div>
                                            <div className="tcol city">{f.city}</div>
                                            <div className="tcol state">{f.state}</div>
                                            <div className="tcol zip">{f.zip}</div>
                                        </div>
                                    )
                                })
                                : <div className="trow"><div className="tcol empty">Nothing to show!</div></div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        panels: state.carrierReducers.panels,
        carrierOpenedPanels: state.carrierReducers.carrierOpenedPanels,
        carriers: state.carrierReducers.carriers,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        selectedFactoringCompany: state.carrierReducers.selectedFactoringCompany,
        selectedFactoringCompanyInvoiceSearch: state.carrierReducers.selectedFactoringCompanyInvoiceSearch,
        selectedCarrier: state.carrierReducers.selectedCarrier
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels, 
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyInvoiceSearch,
    setCarrierOpenedPanels
})(FactoringCompanyInvoiceSearch)