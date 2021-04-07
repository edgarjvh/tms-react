import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './ShipperCompanyContactSearch.css';
import { 
    setDispatchPanels, 
    setSelectedShipperCompanyInfo, 
    setSelectedShipperCompanyContact, 
    setShipperCompanyContacts,
    setShipperCompanyContactSearch, 
    setShipperCompanyShowingContactList,
    setShipperCompanyContactSearchCustomer
 } from '../../../../../actions';

function ShipperCompanyContactSearch(props) {
    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'shipper-company-contact-search') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
    }

    var clickCount = 0;

    const rowClick = (e, c) => {
        clickCount++;

        window.setTimeout(async () => {
            if (clickCount === 1) {
                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'shipper-company-contacts') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });
                
                let selectedShipperCompanyContact = {};

                c.customer.contacts.map(contact => {
                    if (c.id === contact.id){
                        selectedShipperCompanyContact = contact;
                    }
                });

                await props.setShipperCompanyContactSearchCustomer({...c.customer, selectedShipperCompanyContact: selectedShipperCompanyContact});

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                props.setDispatchPanels(panels);
            } else {
                await props.setSelectedShipperCompanyInfo(c.customer);
                await c.customer.contacts.map(contact => {
                    if (c.id === contact.id) {
                        props.setSelectedShipperCompanyContact(contact);
                    }

                    return true;
                });


                await props.setShipperCompanyContactSearch({});
                await props.setShipperCompanyShowingContactList(true);

                closePanelBtnClick();
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.shipperCompanyContactSearch.filters || []).map((item, index) => {

                        if (index > 0) {
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
                        }

                        return false;
                    })
                }
            </div>

            <div className="tbl">
                <div className="thead">
                    <div className="trow">
                        <div className="tcol first-name">First Name</div>
                        <div className="tcol last-name">Last Name</div>
                        <div className="tcol address1">Address 1</div>
                        <div className="tcol address2">Address 2</div>
                        <div className="tcol city">City</div>
                        <div className="tcol state">State</div>
                        <div className="tcol phone-work">Phone Work</div>
                        <div className="tcol email-work">E-mail Work</div>
                    </div>
                </div>
                <div className="tbody">
                    <div className="tbody-wrapper">
                        {
                            props.shipperCompanyContacts.length > 0
                                ? props.shipperCompanyContacts.map((c, i) => {
                                    return (
                                        <div className="trow" onClick={(e) => { rowClick(e, c) }} key={i}>
                                            <div className="tcol first-name">{c.first_name}</div>
                                            <div className="tcol last-name">{c.last_name}</div>
                                            <div className="tcol address1">{c.address1}</div>
                                            <div className="tcol address2">{c.address2}</div>
                                            <div className="tcol city">{c.city}</div>
                                            <div className="tcol state">{c.state}</div>
                                            <div className="tcol phone-work">{c.phone_work}</div>
                                            <div className="tcol email-work">{c.email_work}</div>
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
        panels: state.dispatchReducers.panels,
        shipperCompanies: state.customerReducers.shipperCompanies,
        shipperCompanyContactSearch: state.customerReducers.shipperCompanyContactSearch,
        shipperCompanyContactSearchCustomer: state.customerReducers.shipperCompanyContactSearchCustomer,
        shipperCompanyContacts: state.customerReducers.shipperCompanyContacts
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedShipperCompanyInfo,
    setSelectedShipperCompanyContact,
    setShipperCompanyContacts,
    setShipperCompanyContactSearch,
    setShipperCompanyShowingContactList,
    setShipperCompanyContactSearchCustomer
})(ShipperCompanyContactSearch)