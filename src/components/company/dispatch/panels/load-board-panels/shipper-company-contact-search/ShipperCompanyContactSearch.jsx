import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './ShipperCompanyContactSearch.css';
import { 
    setDispatchPanels, 
    setLbSelectedShipperCompanyInfo, 
    setLbSelectedShipperCompanyContact, 
    setLbShipperCompanyContacts,
    setLbShipperCompanyContactSearch, 
    setLbShipperCompanyShowingContactList,
    setLbShipperCompanyContactSearchCustomer,
    setDispatchOpenedPanels
 } from '../../../../../../actions';

function ShipperCompanyContactSearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var clickCount = 0;

    const rowClick = (e, c) => {
        clickCount++;

        window.setTimeout(async () => {
            if (clickCount === 1) {                
                let selectedShipperCompanyContact = {};

                c.customer.contacts.map(contact => {
                    if (c.id === contact.id){
                        selectedShipperCompanyContact = contact;
                    }
                });

                await props.setLbShipperCompanyContactSearchCustomer({...c.customer, selectedShipperCompanyContact: selectedShipperCompanyContact});

                if (!props.dispatchOpenedPanels.includes('lb-shipper-company-contacts')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-shipper-company-contacts'])
                }
            } else {
                await props.setLbSelectedShipperCompanyInfo(c.customer);
                await c.customer.contacts.map(contact => {
                    if (c.id === contact.id) {
                        props.setLbSelectedShipperCompanyContact(contact);
                    }

                    return true;
                });


                await props.setLbShipperCompanyContactSearch({});
                await props.setLbShipperCompanyShowingContactList(true);

                closePanelBtnClick(null, 'lb-shipper-company-contact-search');
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-shipper-company-contact-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

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
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        shipperCompanies: state.customerReducers.lbShipperCompanies,
        shipperCompanyContactSearch: state.customerReducers.lbShipperCompanyContactSearch,
        shipperCompanyContactSearchCustomer: state.customerReducers.lbShipperCompanyContactSearchCustomer,
        shipperCompanyContacts: state.customerReducers.lbShipperCompanyContacts
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setLbSelectedShipperCompanyInfo, 
    setLbSelectedShipperCompanyContact, 
    setLbShipperCompanyContacts,
    setLbShipperCompanyContactSearch, 
    setLbShipperCompanyShowingContactList,
    setLbShipperCompanyContactSearchCustomer,
    setDispatchOpenedPanels
})(ShipperCompanyContactSearch)