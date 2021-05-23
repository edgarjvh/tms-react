import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoFactoringCompanyContactSearch.css';
import {      
    setSelectedLbCarrierInfoFactoringCompany, 
    setSelectedLbCarrierInfoFactoringCompanyContact, 
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setDispatchOpenedPanels
 } from '../../../../../../actions';

function CarrierInfoFactoringCompanyContactSearch(props) {
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
                let selectedContact = {};

                c.factoring_company.contacts.map(contact => {
                    if (c.id === contact.id){
                        selectedContact = contact;
                    }
                });

                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({...c.factoring_company, selectedContact: selectedContact});

                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contacts')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-contacts'])
                }
            } else {
                await props.setSelectedLbCarrierInfoFactoringCompany(c.factoring_company);
                await c.factoring_company.contacts.map(contact => {
                    if (c.id === contact.id) {
                        props.setSelectedLbCarrierInfoFactoringCompanyContact(contact);
                    }

                    return true;
                });


                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({selectedContact: {}});
                await props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(true);

                closePanelBtnClick(null, 'lb-carrier-info-factoring-company-contact-search');
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-carrier-info-factoring-company-contact-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.selectedLbCarrierInfoFactoringCompanyContactSearch.filters || []).map((item, index) => {

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
                            props.lbCarrierInfoFactoringCompanyContacts.length > 0
                                ? props.lbCarrierInfoFactoringCompanyContacts.map((c, i) => {
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
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        selectedLbCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContactSearch,
        lbCarrierInfoFactoringCompanyContacts: state.carrierReducers.lbCarrierInfoFactoringCompanyContacts
    }
}

export default connect(mapStateToProps, {     
    setSelectedLbCarrierInfoFactoringCompany, 
    setSelectedLbCarrierInfoFactoringCompanyContact, 
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setDispatchOpenedPanels
})(CarrierInfoFactoringCompanyContactSearch)