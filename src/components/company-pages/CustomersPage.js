import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './../../styles/customersPage.css';

import { setCustomers, setSelectedCustomer } from './../../actions';

import PanelContainer from './../PanelContainer';
import CustomerSearchPanel from './panels/CustomerSearchPanel';

function CustomersPage(props) {
    const [customer, setCustomer] = useState(props.selectedCustomer);
    const [selectedContact, setSelectedContact] = useState({});
    const [selectedNote, setSelectedNote] = useState({});
    const [showingContactList, setShowingContactList] = useState(true);
    const [contactSearch, setContactSearch] = useState({});
    const [automaticEmailsTo, setAutomaticEmailsTo] = useState('');
    const [automaticEmailsCc, setAutomaticEmailsCc] = useState('');
    const [automaticEmailsBcc, setAutomaticEmailsBcc] = useState('');
    const [panels, setPanels] = useState([
        {
            name: 'customer-search',
            component: <CustomerSearchPanel />
        }
    ]);

    const setInitialValues = (clearCode = true) => {
        setSelectedContact({});
        setCustomer({ code: clearCode ? '' : customer.code });
        setSelectedContact({});
        setSelectedNote({});
        setContactSearch({});
        setShowingContactList(true);
        setAutomaticEmailsTo('');
        setAutomaticEmailsCc('');
        setAutomaticEmailsBcc('');

        props.setSelectedCustomer(customer);
    }

    const searchCustomerByCode = (e) => {
        if (e.target.value.trim() !== '') {

            $.post(props.serverUrl + '/customers', {
                code: e.target.value.toLowerCase()
            }).then(res => {
                if (res.result === 'OK') {
                    if (res.customers.length > 0) {
                        props.setSelectedCustomer(res.customers[0]);
                        setCustomer(res.customers[0]);
                    } else {
                        setInitialValues(false);
                    }
                } else {
                    setInitialValues(false);
                }
            });
        } else {
            setInitialValues(false);
        }
    }

    const validateCustomerForSaving = () => {

    }
    const validateContactForSaving = () => { }
    const validateAutomaticEmailsForSaving = () => { }
    const validateHoursForSaving = () => { }
    
    return (
        <div className="customers-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <PanelContainer panels={panels} />
            <div className="fields-container">
                <div className="fields-container-row">
                    <div className="fields-container-col">
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Customer</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button" onClick={() => { }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={setInitialValues}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onBlur={searchCustomerByCode}
                                        onChange={e => setCustomer({ ...customer, code: e.target.value })}
                                        value={(customer.code_number || 0) === 0 ? (customer.code || '') : customer.code + customer.code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, name: e.target.value })} value={customer.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, address1: e.target.value })} value={customer.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, address2: e.target.value })} value={customer.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, city: e.target.value })} value={customer.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" maxLength="2" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, state: e.target.value })} value={customer.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, zip: e.target.value })} value={customer.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, contact_name: e.target.value })} value={customer.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <input type="text" placeholder="Contact Phone" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, contact_phone: e.target.value })} value={customer.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, ext: e.target.value })} value={customer.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, email: e.target.value })} value={customer.email || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col" style={{ display: 'flex' }}>
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Mailing Address</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Bill to</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Remit to address is the same</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onBlur={validateCustomerForSaving}
                                        onChange={e => setCustomer({ ...customer, mailing_code: e.target.value })}
                                        value={(customer.mailing_code_number || 0) === 0 ? (customer.mailing_code || '') : customer.mailing_code + customer.mailing_code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_name: e.target.value })} value={customer.mailing_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_address1: e.target.value })} value={customer.mailing_address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_address2: e.target.value })} value={customer.mailing_address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_city: e.target.value })} value={customer.mailing_city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" maxLength="2" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_state: e.target.value })} value={customer.mailing_state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_zip: e.target.value })} value={customer.mailing_zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_contact_name: e.target.value })} value={customer.mailing_contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <input type="text" placeholder="Contact Phone" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_contact_phone: e.target.value })} value={customer.mailing_contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_ext: e.target.value })} value={customer.mailing_ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" onBlur={validateCustomerForSaving} onChange={e => setCustomer({ ...customer, mailing_email: e.target.value })} value={customer.mailing_email || ''} />
                                </div>
                            </div>
                        </div>

                        <div className="form-borderless-box" style={{ width: '170px', marginLeft: '10px', }}>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Bill To" readOnly={true} onChange={e => setCustomer({ ...customer, mailing_bill_to: e.target.value })} value={customer.mailing_bill_to || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Division" readOnly={true} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Agent Code" readOnly={true} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Salesman" readOnly={true} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="FID" readOnly={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col">
                        <div className="form-bordered-box" style={{ justifyContent: 'space-between' }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Credit</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Invoicing Terms" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Credit Limit Total" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Credit Ordered" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Credit Delivered Not Invoiced" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Available Credit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fields-container-row">
                    <div className="fields-container-col">
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Contacts</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="First Name" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, first_name: e.target.value })} value={selectedContact.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Last Name" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, last_name: e.target.value })} value={selectedContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '50%' }}>
                                    <input type="text" placeholder="Phone" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, phone_work: e.target.value })} value={selectedContact.phone_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input type="text" placeholder="Ext" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, phone_ext: e.target.value })} value={selectedContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-customer-contacts-primary-btn" onChange={e => { setSelectedContact({ ...selectedContact, is_primary: e.target.checked ? 1 : 0 }); validateContactForSaving() }} checked={(selectedContact.is_primary || 0) === 1} />
                                        <label htmlFor="cbox-customer-contacts-primary-btn">
                                            <div className="label-text">Primary</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, email_work: e.target.value })} value={selectedContact.email_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Notes" onBlur={validateContactForSaving} onChange={e => setSelectedContact({ ...selectedContact, notes: e.target.value })} value={selectedContact.notes || ''} />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="fields-container-col">
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Automatic E-Mails</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow" style={{ display: 'flex' }}>
                                    {
                                        (customer.automatic_emails?.automatic_emails_to || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < customer.contacts.length; i++) {
                                                    let contact = customer.contacts[i];

                                                    if (contact.email_work === item || contact.email_personal === item || contact.email_other === item) {
                                                        textToShow = contact.first_name + ' ' + (contact.middle_name === '' ? '' : contact.middle_name + ' ') + contact.last_name;
                                                        break;
                                                    }
                                                }

                                                return (
                                                    <div key={index} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '0.7rem',
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        padding: '2px 10px',
                                                        borderRadius: '10px',
                                                        marginRight: '2px',
                                                        cursor: 'default'
                                                    }} title={item}>
                                                        <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                let automatic_emails = customer.automatic_emails;
                                                                automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.replace(item.toString(), '').trim();

                                                                setCustomer({ ...customer, automatic_emails: automatic_emails });
                                                                validateAutomaticEmailsForSaving();
                                                            }}></span>
                                                        <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                    </div>
                                                )
                                            } else {
                                                return false;
                                            }
                                        })
                                    }
                                    <input type="text" placeholder="E-mail To" onBlur={validateAutomaticEmailsForSaving} onChange={e => setAutomaticEmailsTo(e.target.value)} value={automaticEmailsTo} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-booked-load-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_booked_load = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_booked_load || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-booked-load-btn">
                                        <div className="label-text">Booked Load</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-check-calls-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_check_calls = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_check_calls || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-check-calls-btn">
                                        <div className="label-text">Check Calls</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow" style={{ display: 'flex' }}>
                                    {
                                        (customer.automatic_emails?.automatic_emails_cc || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < customer.contacts.length; i++) {
                                                    let contact = customer.contacts[i];

                                                    if (contact.email_work === item || contact.email_personal === item || contact.email_other === item) {
                                                        textToShow = contact.first_name + ' ' + (contact.middle_name === '' ? '' : contact.middle_name + ' ') + contact.last_name;
                                                        break;
                                                    }
                                                }

                                                return (
                                                    <div key={index} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '0.7rem',
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        padding: '2px 10px',
                                                        borderRadius: '10px',
                                                        marginRight: '2px',
                                                        cursor: 'default'
                                                    }}>
                                                        <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                let automatic_emails = customer.automatic_emails;
                                                                automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.replace(item.toString(), '').trim();

                                                                setCustomer({ ...customer, automatic_emails: automatic_emails });
                                                                validateAutomaticEmailsForSaving();
                                                            }}></span>
                                                        <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                    </div>
                                                )
                                            } else {
                                                return false;
                                            }
                                        })
                                    }

                                    <input type="text" placeholder="E-mail Cc" onBlur={validateAutomaticEmailsForSaving} onChange={e => setAutomaticEmailsCc(e.target.value)} value={automaticEmailsCc} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-carrier-arrival-shipper-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_shipper = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_carrier_arrival_shipper || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-carrier-arrival-shipper-btn">
                                        <div className="label-text">Carrier Arrival Shipper</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-carrier-arrival-consignee-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_consignee = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_carrier_arrival_consignee || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-carrier-arrival-consignee-btn">
                                        <div className="label-text">Carrier Arrival Consignee</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow" style={{ display: 'flex' }}>
                                    {
                                        (customer.automatic_emails?.automatic_emails_bcc || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < customer.contacts.length; i++) {
                                                    let contact = customer.contacts[i];

                                                    if (contact.email_work === item || contact.email_personal === item || contact.email_other === item) {
                                                        textToShow = contact.first_name + ' ' + (contact.middle_name === '' ? '' : contact.middle_name + ' ') + contact.last_name;
                                                        break;
                                                    }
                                                }

                                                return (
                                                    <div key={index} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '0.7rem',
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        padding: '2px 10px',
                                                        borderRadius: '10px',
                                                        marginRight: '2px',
                                                        cursor: 'default'
                                                    }}>
                                                        <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                let automatic_emails = customer.automatic_emails;
                                                                automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.replace(item.toString(), '').trim();

                                                                setCustomer({ ...customer, automatic_emails: automatic_emails });
                                                                validateAutomaticEmailsForSaving();
                                                            }}></span>
                                                        <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                    </div>
                                                )
                                            } else {
                                                return false;
                                            }
                                        })
                                    }
                                    <input type="text" placeholder="E-mail Bcc" onBlur={validateAutomaticEmailsForSaving} onChange={e => setAutomaticEmailsBcc(e.target.value)} value={automaticEmailsBcc} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-loaded-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_loaded = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_loaded || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-loaded-btn">
                                        <div className="label-text">Loaded</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-empty-btn"
                                        onChange={e => {
                                            let automatic_emails = (customer.automatic_emails || {});
                                            automatic_emails.automatic_emails_empty = e.target.checked ? 1 : 0;
                                            setCustomer({
                                                ...customer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(customer.automatic_emails?.automatic_emails_empty || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-empty-btn">
                                        <div className="label-text">Empty</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="fields-container-col">
                        <div className="form-bordered-box" >
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Aditional Documents Required</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-aditional-documents-pod-btn" />
                                    <label htmlFor="cbox-aditional-documents-pod-btn">
                                        <div className="label-text">POD</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="fields-container-row grow" style={{ minHeight: '10.3rem', maxHeight: '10.3rem' }}>
                    <div className="fields-container-col">
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    {
                                        showingContactList &&
                                        <div className="mochi-button" onClick={() => setShowingContactList(false)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !showingContactList &&
                                        <div className="mochi-button" onClick={() => setShowingContactList(true)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    {
                                        !showingContactList &&
                                        <div className="mochi-button">
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Send</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-slider">
                                <div className="form-slider-wrapper" style={{ left: showingContactList ? 0 : '-100%' }}>
                                    <div className="contact-list-box">
                                        <div className="contact-list-wrapper">
                                            {
                                                (customer.contacts || []).map((contact, index) => {
                                                    return (
                                                        <div className="contact-list-item" key={index} onDoubleClick={() => { }} onClick={() => setSelectedContact(contact)}>
                                                            {contact.first_name + (contact.middle_name === '' ? '' : ' ' + contact.middle_name) + ' ' + contact.last_name + ' ' + contact.phone_work + ' ' + contact.email_work}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    <div className="contact-search-box">
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="First Name" onChange={e => setContactSearch({ ...contactSearch, first_name: e.target.value })} value={contactSearch.first_name || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Last Name" onChange={e => setContactSearch({ ...contactSearch, last_name: e.target.value })} value={contactSearch.last_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1" onChange={e => setContactSearch({ ...contactSearch, address1: e.target.value })} value={contactSearch.address1 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2" onChange={e => setContactSearch({ ...contactSearch, address2: e.target.value })} value={contactSearch.address2 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City" onChange={e => setContactSearch({ ...contactSearch, city: e.target.value })} value={contactSearch.city || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2" onChange={e => setContactSearch({ ...contactSearch, state: e.target.value })} value={contactSearch.state || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Phone (Work/Mobile/Fax)" onChange={e => setContactSearch({ ...contactSearch, phone: e.target.value })} value={contactSearch.phone || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onChange={e => setContactSearch({ ...contactSearch, email: e.target.value })} value={contactSearch.email || ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col">
                        <div className="form-bordered-box">
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col">
                        <div className="form-borderless-box" style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                            <div className="form-bordered-box" style={{ maxHeight: 'calc(50% - 5px)', justifyContent: 'space-around' }}>
                                <div className="form-header">
                                    <div className="top-border top-border-left"></div>
                                    <div className="form-title">Hours</div>
                                    <div className="top-border top-border-middle"></div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-row" style={{ justifyContent: 'space-around' }}>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Open" maxLength="4"
                                            onChange={e => {
                                                let hours = (customer.hours || {});
                                                hours.hours_open = e.target.value;
                                                setCustomer({ ...customer, hours: hours });
                                                validateHoursForSaving();
                                            }}
                                            value={(customer.hours?.hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Close" maxLength="4"
                                            onChange={e => {
                                                let hours = (customer.hours || {});
                                                hours.hours_close = e.target.value;
                                                setCustomer({ ...customer, hours: hours });
                                                validateHoursForSaving();
                                            }}
                                            value={(customer.hours?.hours_close || '')} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-bordered-box" style={{ maxHeight: 'calc(50% - 5px)', justifyContent: 'space-around' }}>
                                <div className="form-header">
                                    <div className="top-border top-border-left"></div>
                                    <div className="form-title">Delivery Hours</div>
                                    <div className="top-border top-border-middle"></div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-row" style={{ justifyContent: 'space-around' }}>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Open" maxLength="4"
                                            onChange={e => {
                                                let hours = (customer.hours || {});
                                                hours.delivery_hours_open = e.target.value;
                                                setCustomer({ ...customer, hours: hours });
                                                validateHoursForSaving();
                                            }}
                                            value={(customer.hours?.delivery_hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Close" maxLength="4"
                                            onChange={e => {
                                                let hours = (customer.hours || {});
                                                hours.delivery_hours_close = e.target.value;
                                                setCustomer({ ...customer, hours: hours });
                                                validateHoursForSaving();
                                            }}
                                            value={(customer.hours?.delivery_hours_close || '')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-row grow">
                    <div className="fields-container-col">
                        <div className="form-bordered-box" >
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Notes</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Print</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="notes-list-container">
                                <div className="notes-list-wrapper">
                                    {
                                        (customer.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index}>
                                                    {note.note}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col">
                        <div className="form-bordered-box" >
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Directions</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add direction</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="input-checkbox-container">
                                        <input type="checkbox" id="cbox-directions-print-on-rate" />
                                        <label htmlFor="cbox-directions-print-on-rate">Print directions on rate confirmation</label>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Print</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="directions-list-container">
                                <div className="directions-list-wrapper">
                                    {
                                        (customer.directions || []).map((direction, index) => {
                                            return (
                                                <div className="directions-list-item" key={index}>
                                                    {direction.direction}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Revenue Information</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Order History</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Lane History</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Documents</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Print Customer Information</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">E-Mail Customer</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button wrap">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">CRM</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.companyScreenReducers.scale,
        customers: state.customersPageReducers.customers,
        selectedCustomer: state.customersPageReducers.selectedCustomer,
        serverUrl: state.systemReducers.serverUrl
    }
}

export default connect(mapStateToProps, {
    setCustomers,
    setSelectedCustomer
})(CustomersPage)