import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './ConsigneeCompanySearch.css';
import {
    setDispatchPanels,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setDispatchOpenedPanels,
    setSelectedOrder,
    setSelectedBillToCompanyInfo
} from '../../../../../actions';

function ConsigneeCompanySearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const rowDoubleClick = (e, customer) => {
        let deliveries = props.selected_order?.deliveries || [];

        if (deliveries.length > 0) {            
            deliveries = deliveries.map((delivery, i) => {
                if (delivery.id === (props.selectedConsigneeCompanyInfo.id || 0)) {
                    delivery = customer;
                }
                return delivery;
            })
        } else {
            deliveries.push(customer);
        }

        props.setSelectedConsigneeCompanyInfo(customer);

        customer.contacts.map(c => {
            if (c.is_primary === 1) {
                props.setSelectedConsigneeCompanyContact(c);
            }
            return true;
        });

        let selected_order = { ...props.selected_order } || { order_number: 0 };

        selected_order.consignee_customer_id = customer.id;
        selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
        selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
        selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
        selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);
        selected_order.deliveries = deliveries;

        if ((selected_order.ae_number || '') === '') {
            selected_order.ae_number = getRandomInt(1, 100);
        }

        $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedOrder(res.order);
            }

            closePanelBtnClick(null, 'consignee-company-search');
        });
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'consignee-company-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.consigneeCompanySearch || []).map((item, index) => {

                        if (item.data.trim() !== '') {
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

                        return false;
                    })
                }
            </div>

            <div className="tbl">
                <div className="thead">
                    <div className="trow">
                        <div className="tcol code">Code</div>
                        <div className="tcol name">Company Name</div>
                        <div className="tcol address1">Address 1</div>
                        <div className="tcol address2">Address 2</div>
                        <div className="tcol city">City</div>
                        <div className="tcol state">State</div>
                        <div className="tcol zip">Postal Code</div>
                        <div className="tcol contact-name">Contact Name</div>
                        <div className="tcol contact-phone">Contact Phone</div>
                        <div className="tcol contact-phone-ext">Ext</div>
                    </div>
                </div>
                <div className="tbody">
                    <div className="tbody-wrapper">
                        {
                            props.consigneeCompanies.length > 0
                                ? props.consigneeCompanies.map((c, i) => {
                                    return (
                                        <div className="trow" key={i} onDoubleClick={(e) => { rowDoubleClick(e, c) }}>
                                            <div className="tcol code">{c.code + (c.code_number === 0 ? '' : c.code_number)}</div>
                                            <div className="tcol name">{c.name}</div>
                                            <div className="tcol address1">{c.address1}</div>
                                            <div className="tcol address2">{c.address2}</div>
                                            <div className="tcol city">{c.city}</div>
                                            <div className="tcol state">{c.state}</div>
                                            <div className="tcol zip">{c.zip}</div>
                                            <div className="tcol contact-name">{c.contact_name}</div>
                                            <div className="tcol contact-phone">{c.contact_phone}</div>
                                            <div className="tcol contact-phone-ext">{c.ext}</div>
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
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        consigneeCompanies: state.customerReducers.consigneeCompanies,
        consigneeCompanySearch: state.customerReducers.consigneeCompanySearch,
        selected_order: state.dispatchReducers.selected_order,
        selectedConsigneeCompanyInfo: state.customerReducers.selectedConsigneeCompanyInfo,
        selectedConsigneeCompanyContact: state.customerReducers.selectedConsigneeCompanyContact,
        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setDispatchOpenedPanels,
    setSelectedOrder,
    setSelectedBillToCompanyInfo
})(ConsigneeCompanySearch)