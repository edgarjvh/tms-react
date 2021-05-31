import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoSearch.css';
import moment from 'moment';
import {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setDispatchOpenedPanels,
    setSelectedOrder
} from '../../../../../actions';

function CarrierInfoSearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const rowDoubleClick = async (e, c) => {
        let selected_order = { ...props.selected_order } || { order_number: 0 };

        await props.setSelectedDispatchCarrierInfoCarrier(c);
        await c.contacts.map(async contact => {
            if (contact.is_primary === 1) {
                await props.setSelectedDispatchCarrierInfoContact(contact);
            }
            return true;
        });

        if (c.drivers.length > 0) {
            await props.setSelectedDispatchCarrierInfoDriver(c.drivers[0]);
            selected_order.carrier_driver_id = c.drivers[0].id;
        }


        selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
        selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
        selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
        selected_order.carrier_id = c.id;
        
        if ((selected_order.ae_number || '') === '') {
            selected_order.ae_number = getRandomInt(1, 100);
        }

        if ((selected_order.events || []).find(el => el.event_type === 'carrier asigned') === undefined) {
            let event_parameters = {
                order_id: selected_order.id,
                event_time: moment().format('HHmm'),
                event_date: moment().format('MM/DD/YYYY'),
                user_id: selected_order.ae_number,
                event_location: '',
                event_notes: 'Assigned Carrier ' + c.code + (c.code_number === 0 ? '' : c.code_number) + ' - ' + c.name,
                event_type: 'carrier assigned',
                new_carrier_id: c.id
            }

            $.post(props.serverUrl + '/saveOrderEvent', event_parameters).then(async res => {
                if (res.result === 'OK') {
                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);
                        }

                        closePanelBtnClick(null, 'carrier-info-search');
                    }).catch(e => {
                        console.log('error saving order', e);                            
                    });
                } else if (res.result === 'ORDER ID NOT VALID') {
                    window.alert('The order number is not valid!');                        
                }
            }).catch(e => {
                console.log('error saving order event', e);
            })

        } else {
            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedOrder(res.order);
                }

                closePanelBtnClick(null, 'carrier-info-search');
            }).catch(e => {
                console.log('error saving order', e);                
            });
        }        
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'carrier-info-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.dispatchCarrierInfoCarrierSearch || []).map((item, index) => {

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
                            props.dispatchCarrierInfoCarriers.length > 0
                                ? props.dispatchCarrierInfoCarriers.map((c, i) => {
                                    return (
                                        <div key={i} className="trow" onDoubleClick={(e) => { rowDoubleClick(e, c) }}>
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
        selected_order: state.dispatchReducers.selected_order,
        dispatchCarrierInfoCarriers: state.carrierReducers.dispatchCarrierInfoCarriers,
        dispatchCarrierInfoCarrierSearch: state.carrierReducers.dispatchCarrierInfoCarrierSearch,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setDispatchOpenedPanels,
    setSelectedOrder
})(CarrierInfoSearch)