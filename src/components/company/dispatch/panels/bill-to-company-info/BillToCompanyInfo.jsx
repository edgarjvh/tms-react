import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
    setDispatchPanels,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setCustomers,
    setSelectedContact,
    setSelectedNote,
    setSelectedDirection,
    setContactSearch,
    setAutomaticEmailsTo,
    setAutomaticEmailsCc,
    setAutomaticEmailsBcc,
    setShowingContactList,
    setCustomerSearch,
    setCustomerContacts,
    setContactSearchCustomer,
    setIsEditingContact,
    setSelectedDocument
} from './../../../../../actions';
import './BillToCompanyInfo.css';
import classnames from 'classnames';
import $ from 'jquery';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import MaskedInput from 'react-text-mask';

function BillToCompanyInfo(props) {
    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'bill-to-company-info') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
    }

    const [popupItems, setPopupItems] = useState([]);
    const [lastState, setLastState] = useState(0);
    const [automaticEmailsActiveInput, setAutomaticEmailsActiveInput] = useState('');
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const refAutomaticEmailsTo = useRef();
    const refAutomaticEmailsCc = useRef();
    const refAutomaticEmailsBcc = useRef();
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedNote.id !== undefined || props.selectedDirection.id !== undefined) ? 1 : 0 });

    const setInitialValues = (clearCode = true) => {
        props.setSelectedContact({});
        props.setSelectedBillToCompanyInfo({ id: -1, code: clearCode ? '' : props.selectedBillToCompanyInfo.code });
    }

    const searchCustomerByCode = (e) => {

    }

    const searchCustomerBtnClick = () => {

    }

    const searchContactBtnClick = () => {

    }

    const revenueInformationBtnClick = () => {

    }

    const orderHistoryBtnClick = () => {

    }

    const laneHistoryBtnClick = () => {

    }

    const documentsBtnClick = () => {

    }

    const validateCustomerForSaving = (e) => {

    }

    const remitToAddressBtn = () => {

    }

    const mailingAddressClearBtn = () => {

    }

    const mailingAddressBillToBtn = () => {

    }

    const selectedContactIsPrimaryChange = async (e) => {

    }

    const validateContactForSaving = (e) => {

    }

    const validateAutomaticEmailsForSaving = () => {

    }

    const popupItemClick = async (item) => {

    }

    const popupItemKeydown = async (e) => {

    }

    const automaticEmailsOnKeydown = async (e, name) => {

    }

    const automaticEmailsOnInput = async (e, name) => {

    }

    const isEmailValid = (email) => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(mailformat);
    }

    const validateHoursForSaving = (e, name) => {

    }

    const getFormattedHours = (hour) => {

    }

    const printWindow = (data) => {
        let mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="../../css/index.css" type="text/css" media="all" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        setTimeout(function () { mywindow.print(); }, 1000);

        return true;
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="bill-to-company-info">
                <div className="fields-container">
                    <div className="fields-container-row">
                        <div className="fields-container-col">
                            <div className="form-bordered-box">
                                <div className="form-header">
                                    <div className="top-border top-border-left"></div>
                                    <div className="form-title">Customer</div>
                                    <div className="top-border top-border-middle"></div>
                                    <div className="form-buttons">
                                        <div className="mochi-button">
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
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
                                        <input type="text" readOnly={true} placeholder="Code" maxLength="8"
                                            onKeyDown={searchCustomerByCode}
                                            onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value })}
                                            value={(props.selectedBillToCompanyInfo.code_number || 0) === 0 ? (props.selectedBillToCompanyInfo.code || '') : props.selectedBillToCompanyInfo.code + props.selectedBillToCompanyInfo.code_number} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value })} value={props.selectedBillToCompanyInfo.name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value })} value={props.selectedBillToCompanyInfo.address1 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value })} value={props.selectedBillToCompanyInfo.address2 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value })} value={props.selectedBillToCompanyInfo.city || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-state">
                                        <input type="text" readOnly={true} placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value })} value={props.selectedBillToCompanyInfo.state || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-zip-code">
                                        <input type="text" readOnly={true} placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value })} value={props.selectedBillToCompanyInfo.zip || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value })} value={props.selectedBillToCompanyInfo.contact_name || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone">
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value })} value={props.selectedBillToCompanyInfo.contact_phone || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone-ext">
                                        <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value })} value={props.selectedBillToCompanyInfo.ext || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, email: e.target.value })} value={props.selectedBillToCompanyInfo.email || ''} />
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
                                        <input type="text" readOnly={true} placeholder="Code" maxLength="8"
                                            onKeyDown={validateCustomerForSaving}
                                            onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_code: e.target.value })}
                                            value={(props.selectedBillToCompanyInfo.mailing_code_number || 0) === 0 ? (props.selectedBillToCompanyInfo.mailing_code || '') : props.selectedBillToCompanyInfo.mailing_code + props.selectedBillToCompanyInfo.mailing_code_number} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_name: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_address1: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_address1 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_address2: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_address2 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_city: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_city || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-state">
                                        <input type="text" readOnly={true} placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_state: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_state || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-zip-code">
                                        <input type="text" readOnly={true} placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_zip: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_zip || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_contact_name: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_contact_name || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone">
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_contact_phone: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_contact_phone || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone-ext">
                                        <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_ext: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_ext || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="E-Mail" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_email: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_email || ''} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-borderless-box" style={{ width: '170px', marginLeft: '10px', }}>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} style={{ textTransform: 'uppercase' }} placeholder="Bill To" readOnly={true} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_bill_to: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_bill_to || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Division" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Agent Code" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Salesman" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="FID" readOnly={true} />
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
                                        <input type="text" readOnly={true} placeholder="Invoicing Terms" />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Credit Limit Total" />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Credit Ordered" />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Credit Delivered Not Invoiced" />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Available Credit" />
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


                                        <input type="text" readOnly={true} placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                            props.setSelectedContact({ ...props.selectedBillToCompanyContact, first_name: e.target.value })
                                        }} value={props.selectedBillToCompanyContact.first_name || ''} />



                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedBillToCompanyContact, last_name: e.target.value })} value={props.selectedBillToCompanyContact.last_name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container" style={{ width: '50%' }}>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedBillToCompanyContact, phone_work: e.target.value })} value={props.selectedBillToCompanyContact.phone_work || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="input-box-container input-phone-ext">
                                            <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedBillToCompanyContact, phone_ext: e.target.value })} value={props.selectedBillToCompanyContact.phone_ext || ''} />
                                        </div>
                                        <div className="input-toggle-container">
                                            <input type="checkbox" readOnly={true} id="cbox-customer-contacts-primary-btn" checked={(props.selectedBillToCompanyContact.is_primary || 0) === 1} />
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
                                        <input type="text" readOnly={true} placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedBillToCompanyContact, email_work: e.target.value })} value={props.selectedBillToCompanyContact.email_work || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input type="text" readOnly={true} placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedBillToCompanyContact, notes: e.target.value })} value={props.selectedBillToCompanyContact.notes || ''} />
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
                                            (props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_to || '').split(' ').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item;

                                                    for (let i = 0; i < props.selectedBillToCompanyInfo.contacts.length; i++) {
                                                        let contact = props.selectedBillToCompanyInfo.contacts[i];

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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }
                                        <input type="text" readOnly={true} placeholder="E-mail To"
                                            ref={refAutomaticEmailsTo}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'to') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'to') }}
                                            // onBlur={validateAutomaticEmailsForSaving}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'to') }}
                                            value={props.automaticEmailsTo} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-booked-load-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_booked_load || 0) === 1} />
                                        <label htmlFor="cbox-automatic-emails-booked-load-btn">
                                            <div className="label-text">Booked Load</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-check-calls-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_check_calls || 0) === 1} />
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
                                            (props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_cc || '').split(' ').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item;

                                                    for (let i = 0; i < props.selectedBillToCompanyInfo.contacts.length; i++) {
                                                        let contact = props.selectedBillToCompanyInfo.contacts[i];

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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }

                                        <input type="text" readOnly={true} placeholder="E-mail Cc"
                                            ref={refAutomaticEmailsCc}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'cc') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                            // onBlur={validateAutomaticEmailsForSaving}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                            value={props.automaticEmailsCc} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-carrier-arrival-shipper-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_carrier_arrival_shipper || 0) === 1} />
                                        <label htmlFor="cbox-automatic-emails-carrier-arrival-shipper-btn">
                                            <div className="label-text">Carrier Arrival Shipper</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-carrier-arrival-consignee-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_carrier_arrival_consignee || 0) === 1} />
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
                                            (props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_bcc || '').split(' ').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item;

                                                    for (let i = 0; i < props.selectedBillToCompanyInfo.contacts.length; i++) {
                                                        let contact = props.selectedBillToCompanyInfo.contacts[i];

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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{textToShow}</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }
                                        <input type="text" readOnly={true} placeholder="E-mail Bcc"
                                            ref={refAutomaticEmailsBcc}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'bcc') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                            // onBlur={validateAutomaticEmailsForSaving}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                            value={props.automaticEmailsBcc} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-loaded-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_loaded || 0) === 1} />
                                        <label htmlFor="cbox-automatic-emails-loaded-btn">
                                            <div className="label-text">Loaded</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" readOnly={true} id="cbox-automatic-emails-empty-btn" checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_empty || 0) === 1} />
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
                                        <input type="checkbox" readOnly={true} id="cbox-aditional-documents-pod-btn" checked={false} />
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
                                            props.showingContactList &&
                                            <div className="mochi-button">
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Search</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }
                                        {
                                            !props.showingContactList &&
                                            <div className="mochi-button" >
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Cancel</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }

                                        {
                                            !props.showingContactList &&
                                            <div className="mochi-button" >
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Send</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }
                                    </div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-slider">
                                    <div className="form-slider-wrapper" style={{ left: props.showingContactList ? 0 : '-100%' }}>
                                        <div className="contact-list-box">
                                            <div className="contact-list-wrapper">
                                                {
                                                    (props.selectedBillToCompanyInfo.contacts || []).map((contact, index) => {
                                                        return (
                                                            <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                                let index = props.panels.length - 1;
                                                                let panels = props.panels.map((p, i) => {
                                                                    if (p.name === 'customer-contacts') {
                                                                        index = i;
                                                                        p.isOpened = true;
                                                                    }
                                                                    return p;
                                                                });

                                                                await props.setIsEditingContact(false);
                                                                await props.setContactSearchCustomer({ ...props.selectedBillToCompanyInfo, selectedContact: contact });

                                                                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                                props.setDispatchPanels(panels);
                                                            }}>
                                                                <span>
                                                                    {contact.first_name + (contact.middle_name === '' ? '' : ' ' + contact.middle_name) + ' ' + contact.last_name + ' ' + contact.phone_work + ' ' + contact.email_work}
                                                                </span>
                                                                {
                                                                    (contact.is_primary === 1) &&
                                                                    <span className='fas fa-check'></span>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                        <div className="contact-search-box">
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="First Name" onChange={e => props.setContactSearch({ ...props.contactSearch, first_name: e.target.value })} value={props.contactSearch.first_name || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="Last Name" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, last_name: e.target.value })} value={props.contactSearch.last_name || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="Address 1" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address1: e.target.value })} value={props.contactSearch.address1 || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="Address 2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address2: e.target.value })} value={props.contactSearch.address2 || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="City" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, city: e.target.value })} value={props.contactSearch.city || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container input-state">
                                                    <input type="text" readOnly={true} placeholder="State" maxLength="2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, state: e.target.value })} value={props.contactSearch.state || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container grow">
                                                    <MaskedInput
                                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                        guide={true}
                                                        type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, phone: e.target.value })} value={props.contactSearch.phone || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, email: e.target.value })} value={props.contactSearch.email || ''} />
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
                                            <input type="text" readOnly={true} placeholder="Open"
                                                onBlur={(e) => validateHoursForSaving(e, 'hours open')}
                                                onChange={e => {
                                                    let hours = (props.selectedBillToCompanyInfo.hours || {});
                                                    hours.hours_open = e.target.value;
                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, hours: hours });
                                                }}
                                                value={(props.selectedBillToCompanyInfo.hours?.hours_open || '')} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container ">
                                            <input type="text" readOnly={true} placeholder="Close"
                                                onBlur={(e) => validateHoursForSaving(e, 'hours close')}
                                                onChange={e => {
                                                    let hours = (props.selectedBillToCompanyInfo.hours || {});
                                                    hours.hours_close = e.target.value;
                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, hours: hours });
                                                }}
                                                value={(props.selectedBillToCompanyInfo.hours?.hours_close || '')} />
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
                                            <input type="text" readOnly={true} placeholder="Open"
                                                onBlur={(e) => validateHoursForSaving(e, 'delivery hours open')}
                                                onChange={e => {
                                                    let hours = (props.selectedBillToCompanyInfo.hours || {});
                                                    hours.delivery_hours_open = e.target.value;
                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, hours: hours });
                                                }}
                                                value={(props.selectedBillToCompanyInfo.hours?.delivery_hours_open || '')} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container ">
                                            <input type="text" readOnly={true} placeholder="Close"
                                                onBlur={(e) => validateHoursForSaving(e, 'delivery hours close')}
                                                onChange={e => {
                                                    let hours = (props.selectedBillToCompanyInfo.hours || {});
                                                    hours.delivery_hours_close = e.target.value;
                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, hours: hours });
                                                }}
                                                value={(props.selectedBillToCompanyInfo.hours?.delivery_hours_close || '')} />
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
                                        <div className="mochi-button" >
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
                                            (props.selectedBillToCompanyInfo.notes || []).map((note, index) => {
                                                return (
                                                    <div className="notes-list-item" key={index}>
                                                        {note.text}
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
                                            <input type="checkbox" readOnly={true} id="cbox-directions-print-on-rate" checked={false} />
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
                                            (props.selectedBillToCompanyInfo.directions || []).map((direction, index) => {
                                                return (
                                                    <div className="directions-list-item" key={index}>
                                                        {direction.text}
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.systemReducers.scale,
        customers: state.customerReducers.customers,
        contacts: state.customerReducers.contacts,
        selectedBillToCompanyInfo: state.dispatchReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.dispatchReducers.selectedBillToCompanyContact,
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,
        selectedContact: state.customerReducers.selectedContact,
        selectedNote: state.customerReducers.selectedNote,
        selectedDirection: state.customerReducers.selectedDirection,
        contactSearch: state.customerReducers.contactSearch,
        automaticEmailsTo: state.customerReducers.automaticEmailsTo,
        automaticEmailsCc: state.customerReducers.automaticEmailsCc,
        automaticEmailsBcc: state.customerReducers.automaticEmailsBcc,
        showingContactList: state.customerReducers.showingContactList,
        customerSearch: state.customerReducers.customerSearch,
        selectedDocument: state.customerReducers.selectedDocument
    }
}


export default connect(mapStateToProps, {
    setDispatchPanels,
    setCustomers,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setSelectedContact,
    setSelectedNote,
    setSelectedDirection,
    setContactSearch,
    setAutomaticEmailsTo,
    setAutomaticEmailsCc,
    setAutomaticEmailsBcc,
    setShowingContactList,
    setCustomerSearch,
    setCustomerContacts,
    setContactSearchCustomer,
    setIsEditingContact,
    setSelectedDocument
})(BillToCompanyInfo)