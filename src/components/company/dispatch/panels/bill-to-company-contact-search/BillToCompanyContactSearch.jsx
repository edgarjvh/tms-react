import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './BillToCompanyContactSearch.css';
import { 
    setDispatchPanels, 
    setSelectedBillToCompanyInfo, 
    setSelectedBillToCompanyContact, 
    setBillToCompanyContacts,
    setBillToCompanyContactSearch, 
    setBillToCompanyShowingContactList,
    setBillToCompanyContactSearchCustomer,
    setDispatchOpenedPanels
 } from '../../../../../actions';

function BillToCompanyContactSearch(props) {
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
                let selectedBillToCompanyContact = {};

                c.customer.contacts.map(contact => {
                    if (c.id === contact.id){
                        selectedBillToCompanyContact = contact;
                    }
                });

                await props.setBillToCompanyContactSearchCustomer({...c.customer, selectedBillToCompanyContact: selectedBillToCompanyContact});

                if (!props.dispatchOpenedPanels.includes('bill-to-company-contacts')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'bill-to-company-contacts'])
                }
            } else {
                await props.setSelectedBillToCompanyInfo(c.customer);
                await c.customer.contacts.map(contact => {
                    if (c.id === contact.id) {
                        props.setSelectedBillToCompanyContact(contact);
                    }

                    return true;
                });


                await props.setBillToCompanyContactSearch({});
                await props.setBillToCompanyShowingContactList(true);

                closePanelBtnClick();
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'bill-to-company-contact-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.billToCompanyContactSearch.filters || []).map((item, index) => {

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
                            props.billToCompanyContacts.length > 0
                                ? props.billToCompanyContacts.map((c, i) => {
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
        billToCompanies: state.customerReducers.billToCompanies,
        billToCompanyContactSearch: state.customerReducers.billToCompanyContactSearch,
        billToCompanyContactSearchCustomer: state.customerReducers.billToCompanyContactSearchCustomer,
        billToCompanyContacts: state.customerReducers.billToCompanyContacts
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setBillToCompanyContacts,
    setBillToCompanyContactSearch,
    setBillToCompanyShowingContactList,
    setBillToCompanyContactSearchCustomer,
    setDispatchOpenedPanels
})(BillToCompanyContactSearch)