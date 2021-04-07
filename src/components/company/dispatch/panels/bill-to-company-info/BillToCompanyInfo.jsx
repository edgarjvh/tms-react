import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
    setDispatchPanels,

    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setBillToCompanySearch,
    setSelectedBillToCompanyNote,
    setSelectedBillToCompanyDirection,
    setBillToCompanyContactSearch,
    setBillToCompanyAutomaticEmailsTo,
    setBillToCompanyAutomaticEmailsCc,
    setBillToCompanyAutomaticEmailsBcc,
    setBillToCompanyShowingContactList,
    setBillToCompanyContacts,
    setBillToCompanyContactSearchCustomer,
    setBillToCompanyIsEditingContact,
    setSelectedBillToCompanyDocument,
    setBillToCompanyDocumentTags,
    setSelectedBillToCompanyDocumentNote
} from './../../../../../actions';

import CustomerModal from './../../modal/Modal.jsx';
import CustomerPopup from './../../popup/Popup.jsx';

import './BillToCompanyInfo.css';
import classnames from 'classnames';
import $ from 'jquery';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import MaskedInput from 'react-text-mask';

function BillToCompanyInfo(props) {
    const [popupItems, setPopupItems] = useState([]);
    const [isSavingCustomer, setIsSavingCustomer] = useState(false);
    const [automaticEmailsActiveInput, setAutomaticEmailsActiveInput] = useState('');
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const refBillToAutomaticEmailsTo = useRef();
    const refBillToAutomaticEmailsCc = useRef();
    const refBillToAutomaticEmailsBcc = useRef();
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedBillToCompanyNote.id !== undefined || props.selectedBillToCompanyDirection.id !== undefined) ? 1 : 0 });

    const setInitialValues = (clearCode = true) => {
        setIsSavingCustomer(false);
        props.setSelectedBillToCompanyContact({});
        props.setSelectedBillToCompanyNote({});
        props.setSelectedBillToCompanyDirection({});
        props.setBillToCompanyContactSearch({});

        props.setBillToCompanyShowingContactList(true);
        props.setBillToCompanyAutomaticEmailsTo('');
        props.setBillToCompanyAutomaticEmailsCc('');
        props.setBillToCompanyAutomaticEmailsBcc('');
        props.setSelectedBillToCompanyInfo({ id: -1, code: clearCode ? '' : props.selectedBillToCompanyInfo.code });
        setPopupItems([]);
    }

    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'bill-to-company-info') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
    }

    const searchCustomerByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                $.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.customers.length > 0) {
                            await setInitialValues();
                            await props.setSelectedBillToCompanyInfo(res.customers[0]);

                            await res.customers[0].contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedBillToCompanyContact(c);
                                }
                                return true;
                            });

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
    }

    const searchCustomerBtnClick = () => {
        let customerSearch = [
            {
                field: 'Name',
                data: (props.selectedBillToCompanyInfo.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedBillToCompanyInfo.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedBillToCompanyInfo.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedBillToCompanyInfo.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedBillToCompanyInfo.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedBillToCompanyInfo.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedBillToCompanyInfo.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerSearch', { search: customerSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setCustomerSearch(customerSearch);
                await props.setBillToCompanies(res.customers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'bill-to-company-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setDispatchPanels(panels);
            }
        });
    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Customer Id',
                data: props.selectedBillToCompanyInfo.id || 0
            },
            {
                field: 'First Name',
                data: (props.billToCompanyContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.billToCompanyContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.billToCompanyContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.billToCompanyContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.billToCompanyContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.billToCompanyContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.billToCompanyContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.billToCompanyContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, filters: filters });
                await props.setBillToCompanyContacts(res.contacts);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'bill-to-company-contact-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setDispatchPanels(panels);
            }
        });
    }

    const revenueInformationBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'bill-to-company-revenue-information') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setDispatchPanels(panels);
    }

    const orderHistoryBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'bill-to-company-order-history') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setDispatchPanels(panels);
    }

    const laneHistoryBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'bill-to-company-lane-history') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setDispatchPanels(panels);
    }

    const documentsBtnClick = () => {
        if ((props.selectedBillToCompanyInfo.id || 0) > 0) {
            props.setSelectedBillToCompanyDocument({
                id: 0,
                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                date_entered: moment().format('MM-DD-YYYY')
            });

            let index = props.panels.length - 1;
            let panels = props.panels.map((p, i) => {
                if (p.name === 'bill-to-company-documents') {
                    index = i;
                    p.isOpened = true;
                }
                return p;
            });

            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

            props.setDispatchPanels(panels);
        } else {
            window.alert('You must select a customer first!');
        }
    }

    const validateCustomerForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            window.setTimeout(() => {
                let selectedCustomer = props.selectedBillToCompanyInfo;

                if (selectedCustomer.id === undefined || selectedCustomer.id === -1) {
                    selectedCustomer.id = 0;
                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: 0 });
                }

                if (
                    (selectedCustomer.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedCustomer.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedCustomer.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedCustomer.address1 || '').trim() !== "" &&
                    (selectedCustomer.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedCustomer.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let mailingParseCity = (selectedCustomer.mailing_city || '').trim().replace(/\s/g, "").substring(0, 3);

                    if (mailingParseCity.toLowerCase() === "ft.") {
                        mailingParseCity = "FO";
                    }
                    if (mailingParseCity.toLowerCase() === "mt.") {
                        mailingParseCity = "MO";
                    }
                    if (mailingParseCity.toLowerCase() === "st.") {
                        mailingParseCity = "SA";
                    }

                    let newCode = (selectedCustomer.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedCustomer.state || '').trim().replace(/\s/g, "").substring(0, 2);
                    let mailingNewCode = (selectedCustomer.mailing_name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + mailingParseCity.substring(0, 2) + (selectedCustomer.mailing_state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedCustomer.code = newCode.toUpperCase();
                    selectedCustomer.mailing_code = mailingNewCode.toUpperCase();

                    if (!isSavingCustomer) {
                        setIsSavingCustomer(true);

                        $.post(props.serverUrl + '/saveCustomer', selectedCustomer).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedBillToCompanyInfo.id === undefined || (props.selectedBillToCompanyInfo.id || 0) === 0) {
                                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: res.customer.id });

                                    if (res.customer.contacts[0].is_primary === 1) {
                                        await props.setSelectedBillToCompanyContact(res.customer.contacts[0]);
                                    }
                                }
                            }

                            await setIsSavingCustomer(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const remitToAddressBtn = () => {
        if (props.selectedBillToCompanyInfo.id === undefined || props.selectedBillToCompanyInfo.id <= 0) {
            window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedBillToCompanyInfo;

        customer.mailing_code = customer.code;
        customer.mailing_code_number = customer.code_number;
        customer.mailing_name = customer.name;
        customer.mailing_address1 = customer.address1;
        customer.mailing_address2 = customer.address2;
        customer.mailing_city = customer.city;
        customer.mailing_state = customer.state;
        customer.mailing_zip = customer.zip;
        customer.mailing_contact_name = customer.contact_name;
        customer.mailing_contact_phone = customer.contact_phone;
        customer.mailing_ext = customer.ext;
        customer.mailing_email = customer.email;

        props.setSelectedBillToCompanyInfo(customer);

        validateCustomerForSaving({ keyCode: 9 });
    }

    const mailingAddressClearBtn = () => {
        if (props.selectedBillToCompanyInfo.id === undefined || props.selectedBillToCompanyInfo.id <= 0) {
            // window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedBillToCompanyInfo;

        customer.mailing_code = '';
        customer.mailing_code_number = '';
        customer.mailing_name = '';
        customer.mailing_address1 = '';
        customer.mailing_address2 = '';
        customer.mailing_city = '';
        customer.mailing_state = '';
        customer.mailing_zip = '';
        customer.mailing_contact_name = '';
        customer.mailing_contact_phone = '';
        customer.mailing_ext = '';
        customer.mailing_email = '';
        customer.mailing_bill_to = '';

        props.setSelectedBillToCompanyInfo(customer);

        validateCustomerForSaving({ keyCode: 9 });
    }

    const mailingAddressBillToBtn = () => {
        if (props.selectedBillToCompanyInfo.id === undefined || props.selectedBillToCompanyInfo.id <= 0) {
            window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedBillToCompanyInfo;

        if ((customer.mailing_bill_to || '') !== '') {
            customer.mailing_bill_to = '';
        } else {
            if ((customer.mailing_code || '') !== '') {
                customer.mailing_bill_to = customer.mailing_code + ((customer.mailing_code_number || 0) === 0 ? '' : customer.mailing_code_number);
            }
        }

        props.setSelectedBillToCompanyInfo(customer);

        validateCustomerForSaving({ keyCode: 9 });
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, is_primary: e.target.checked ? 1 : 0 });

        if (props.selectedBillToCompanyInfo.id === undefined) {
            return;
        }

        let contact = props.selectedBillToCompanyContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.customer_id === undefined || contact.customer_id === 0) {
            contact.customer_id = props.selectedBillToCompanyInfo.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedBillToCompanyInfo.address1;
            contact.address2 = props.selectedBillToCompanyInfo.address2;
            contact.city = props.selectedBillToCompanyInfo.city;
            contact.state = props.selectedBillToCompanyInfo.state;
            contact.zip_code = props.selectedBillToCompanyInfo.zip;
        }

        $.post(props.serverUrl + '/saveContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedBillToCompanyContact(res.contact);
                await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
            }
        });

    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedBillToCompanyInfo.id === undefined) {
                return;
            }

            let contact = props.selectedBillToCompanyContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedBillToCompanyInfo.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedBillToCompanyInfo.address1;
                contact.address2 = props.selectedBillToCompanyInfo.address2;
                contact.city = props.selectedBillToCompanyInfo.city;
                contact.state = props.selectedBillToCompanyInfo.state;
                contact.zip_code = props.selectedBillToCompanyInfo.zip;
            }

            $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                    await props.setSelectedBillToCompanyContact(res.contact);
                }
            });
        }
    }

    const validateAutomaticEmailsForSaving = () => {
        if ((props.selectedBillToCompanyInfo.id || 0) > 0){
            let automatic_emails = props.selectedBillToCompanyInfo.automatic_emails || {};

            automatic_emails = {...automatic_emails, customer_id: props.selectedBillToCompanyInfo.id};

            $.post(props.serverUrl + '/saveAutomaticEmails', automatic_emails).then(res => {
                if (res.result === 'OK') {
                    console.log(res);
                }
            });
        }
        
    }

    const popupItemClick = async (item) => {
        let automaticEmails = props.selectedBillToCompanyInfo.automatic_emails || { customer_id: props.selectedBillToCompanyInfo.id };

        switch (automaticEmailsActiveInput) {
            case 'to':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                    await props.setBillToCompanyAutomaticEmailsTo('');
                }
                break;
            case 'cc':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                    await props.setBillToCompanyAutomaticEmailsCc('');
                }
                break;
            case 'bcc':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                    await props.setBillToCompanyAutomaticEmailsBcc('');
                }
                break;
            default:
                break;
        }

        await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automaticEmails });

        $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
            if (res.result === 'OK') {
                console.log(res);
            }
        });

        await setPopupItems([]);
    }

    const popupItemKeydown = async (e) => {
        let key = e.keyCode || e.which;
        let selectedIndex = -1;
        let items = popupItems.map((a, b) => {
            if (a.selected) selectedIndex = b;
            return a;
        });

        if (key === 37 || key === 38) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === 0) {
                        if (b === items.length - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                await setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 39 || key === 40) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === items.length - 1) {
                        if (b === 0) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex + 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                await setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 13) {
            let automaticEmails = props.selectedBillToCompanyInfo.automatic_emails || { customer_id: props.selectedBillToCompanyInfo.id };

            await popupItems.map(async (item, index) => {
                if (item.selected) {
                    switch (automaticEmailsActiveInput) {
                        case 'to':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsTo('');
                            }
                            break;
                        case 'cc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsCc('');
                            }
                            break;
                        case 'bcc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsBcc('');
                            }
                            break;
                        default:
                            break;
                    }
                }

                await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automaticEmails });

                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                    if (res.result === 'OK') {
                        console.log(res);
                    }
                });

                return true;
            });

            await setPopupItems([]);
        }
    }

    const automaticEmailsOnKeydown = async (e, name) => {
        let key = e.keyCode || e.which;
        let selectedIndex = -1;
        let items = popupItems.map((a, b) => {
            if (a.selected) selectedIndex = b;
            return a;
        });

        if (key === 37 || key === 38) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === 0) {
                        if (b === items.length - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                await setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 39 || key === 40) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === items.length - 1) {
                        if (b === 0) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex + 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                await setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 13) {
            let automaticEmails = props.selectedBillToCompanyInfo.automatic_emails || { customer_id: props.selectedBillToCompanyInfo.id };

            await popupItems.map(async (item, index) => {
                if (item.selected) {
                    switch (name) {
                        case 'to':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsTo('');
                            }
                            break;
                        case 'cc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsCc('');
                            }
                            break;
                        case 'bcc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                                await props.setBillToCompanyAutomaticEmailsBcc('');
                            }
                            break;
                        default:
                            break;
                    }
                }

                await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automaticEmails });

                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                    if (res.result === 'OK') {
                        console.log(res);
                    }
                });

                return true;
            });

            await setPopupItems([]);
        }

        if (key === 9) {

            if (props.selectedBillToCompanyInfo.id !== undefined) {
                let automaticEmails = props.selectedBillToCompanyInfo.automatic_emails || { customer_id: props.selectedBillToCompanyInfo.id };
                let tabNext = false;

                switch (name) {
                    case 'to':
                        if (props.billToCompanyAutomaticEmailsTo.trim() !== '' && isEmailValid(props.billToCompanyAutomaticEmailsTo.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + props.billToCompanyAutomaticEmailsTo.trim()).trim() };
                            await props.setBillToCompanyAutomaticEmailsTo('');
                        } else {
                            tabNext = props.billToCompanyAutomaticEmailsTo.trim() === '';
                        }
                        break;
                    case 'cc':
                        if (props.billToCompanyAutomaticEmailsCc.trim() !== '' && isEmailValid(props.billToCompanyAutomaticEmailsCc.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + props.billToCompanyAutomaticEmailsCc.trim()).trim() };
                            await props.setBillToCompanyAutomaticEmailsCc('');
                        } else {
                            tabNext = props.billToCompanyAutomaticEmailsCc.trim() === '';
                        }
                        break;
                    case 'bcc':
                        if (props.billToCompanyAutomaticEmailsBcc.trim() !== '' && isEmailValid(props.billToCompanyAutomaticEmailsBcc.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + props.billToCompanyAutomaticEmailsBcc.trim()).trim() };
                            await props.setBillToCompanyAutomaticEmailsBcc('');
                        } else {
                            tabNext = props.billToCompanyAutomaticEmailsBcc.trim() === '';
                        }
                        break;
                    default:
                        break;
                }

                await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automaticEmails });

                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                    if (res.result === 'OK') {
                        console.log(res);
                    }
                });

                if (!tabNext) e.preventDefault();
            } else {
                await props.setBillToCompanyAutomaticEmailsTo('');
                await props.setBillToCompanyAutomaticEmailsCc('');
                await props.setBillToCompanyAutomaticEmailsBcc('');
            }

        }

        if (key === 27) {
            await setPopupItems([]);
        }

    }

    const automaticEmailsOnInput = async (e, name) => {
        window.clearTimeout(delayTimer);
        name === 'to' && props.setBillToCompanyAutomaticEmailsTo(e.target.value);
        name === 'cc' && props.setBillToCompanyAutomaticEmailsCc(e.target.value);
        name === 'bcc' && props.setBillToCompanyAutomaticEmailsBcc(e.target.value);

        setAutomaticEmailsActiveInput(name);

        if (props.selectedBillToCompanyInfo.id !== undefined) {

            if (e.target.value.trim() === '') {
                await setPopupItems([]);
            } else {
                delayTimer = window.setTimeout(() => {
                    $.post(props.serverUrl + '/getContactsByEmailOrName', {
                        email: e.target.value.trim(),
                        customer_id: props.selectedBillToCompanyInfo.id
                    }).then(async res => {
                        const boundsTo = refBillToAutomaticEmailsTo.current.getBoundingClientRect();
                        const boundsCc = refBillToAutomaticEmailsCc.current.getBoundingClientRect();
                        const boundsBcc = refBillToAutomaticEmailsBcc.current.getBoundingClientRect();

                        let popup = refPopup.current;

                        const { innerWidth, innerHeight } = window;
                        let parentWidth = $(popup).parent().width();
                        let parentLeft = $(popup).parent().position().left;

                        const input = name === 'to' ? boundsTo : name === 'cc' ? boundsCc : boundsBcc;

                        let screenWSection = parentWidth / 3;
                        let offset = innerWidth - parentWidth - 45;

                        if (popup) {
                            popup.childNodes[0].className = 'mochi-contextual-popup';
                            popup.childNodes[0].classList.add('vertical');

                            if ((innerHeight - 170 - 30) <= input.top) {
                                popup.childNodes[0].classList.add('above');
                                popup.style.top = (input.top - 175 - input.height) + 'px';
                            } else if ((innerHeight - 170 - 30) > input.top) {
                                popup.childNodes[0].classList.add('below');
                                popup.style.top = (input.top + 10) + 'px';
                            }

                            if ((input.left - offset) <= (screenWSection * 1)) {
                                popup.childNodes[0].classList.add('right');
                                popup.style.left = (input.left - offset) + 'px';

                                if (input.width < 70) {
                                    popup.style.left = ((input.left - offset) - 60 + (input.width / 2)) + 'px';

                                    if (input.left < 30) {
                                        popup.childNodes[0].classList.add('corner');
                                        popup.style.left = ((input.left - offset) + (input.width / 2)) + 'px';
                                    }
                                }
                            } else if ((input.left - offset) <= (screenWSection * 2)) {
                                popup.style.left = ((input.left - offset) - 100) + 'px';
                            } else if ((input.left - offset) > (screenWSection * 2)) {
                                popup.childNodes[0].classList.add('left');
                                popup.style.left = ((input.left - offset) - 200) + 'px';

                                if ((innerWidth - (input.left - offset)) < 100) {
                                    popup.childNodes[0].classList.add('corner');
                                    popup.style.left = ((input.left - offset)) - (300 - (input.width / 2)) + 'px';
                                }
                            }
                        }

                        if (res.result === 'OK') {
                            if (res.contacts.length > 0) {
                                let items = []
                                res.contacts.map((c, i) => {
                                    let emailWork = c.email_work;
                                    let emailPersonal = c.email_personal;
                                    let emailOther = c.email_other;
                                    let firstName = c.first_name;
                                    let lastName = c.last_name;

                                    let name = firstName + ' ' + lastName;

                                    let email = emailWork.indexOf(e.target.value.trim()) > -1 ? emailWork :
                                        emailPersonal.indexOf(e.target.value.trim()) ? emailPersonal : emailOther

                                    if (email === '') {
                                        email = emailWork !== '' ? emailWork :
                                            emailPersonal !== '' ? emailPersonal : emailOther;
                                    }

                                    if (emailWork.trim() !== '' || emailPersonal.trim() !== '' || emailOther !== '') {
                                        items.push({
                                            name: name,
                                            email: email,
                                            selected: i === 0
                                        });
                                    }

                                    return true;
                                });

                                await setPopupItems(e.target.value.trim() === '' ? [] : items);
                            } else {
                                await setPopupItems([]);
                            }
                        }
                    });
                }, 300);
            }
        }
    }

    const isEmailValid = (email) => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(mailformat);
    }

    const validateHoursForSaving = (e, name) => {
        let formatted = getFormattedHours(e.target.value);
        let hours = { ...props.selectedBillToCompanyInfo.hours || {}, customer_id: props.selectedBillToCompanyInfo.id };

        if (name === 'hours open') {
            hours.hours_open = formatted;
        }
        if (name === 'hours close') {
            hours.hours_close = formatted;
        }
        if (name === 'delivery hours open') {
            hours.delivery_hours_open = formatted;
        }
        if (name === 'delivery hours close') {
            hours.delivery_hours_close = formatted;
        }

        $.post(props.serverUrl + '/saveCustomerHours', hours).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, hours: res.customer_hours });
            }
        })
    }

    const getFormattedHours = (hour) => {
        let formattedHour = hour;

        try {

            if (moment(hour.trim(), 'HH:mm').format('HH:mm') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'HH:mm').format('HHmm');
            }

            if (moment(hour.trim(), 'H:mm').format('H:mm') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'H:mm').format('HHmm');
            }

            if (moment(hour.trim(), 'Hmm').format('Hmm') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'Hmm').format('HHmm');
            }

            if (moment(hour.trim(), 'hh:mm a').format('hh:mm a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hh:mm a').format('HHmm');
            }

            if (moment(hour.trim(), 'h:mm a').format('h:mm a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'h:mm a').format('HHmm');
            }

            if (moment(hour.trim(), 'hh:mma').format('hh:mma') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hh:mma').format('HHmm');
            }

            if (moment(hour.trim(), 'h:mma').format('h:mma') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'h:mma').format('HHmm');
            }

            if (moment(hour.trim(), 'hhmm a').format('hhmm a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hhmm a').format('HHmm');
            }

            if (moment(hour.trim(), 'hmm a').format('hmm a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hmm a').format('HHmm');
            }

            if (moment(hour.trim(), 'hhmma').format('hhmma') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hhmma').format('HHmm');
            }

            if (moment(hour.trim(), 'hmma').format('hmma') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hmma').format('HHmm');
            }

            if (moment(hour.trim(), 'H').format('H') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'H').format('HHmm');
            }

            if (moment(hour.trim(), 'HH').format('HH') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'HH').format('HHmm');
            }

            if (moment(hour.trim(), 'h a').format('h a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'h a').format('HHmm');
            }

            if (moment(hour.trim(), 'hh a').format('hh a') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hh a').format('HHmm');
            }

            if (moment(hour.trim(), 'ha').format('ha') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'ha').format('HHmm');
            }

            if (moment(hour.trim(), 'hha').format('hha') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'hha').format('HHmm');
            }
        } catch (e) {
            console.log(e);
        }

        return formattedHour;
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
                                        <div className="mochi-button" onClick={searchCustomerBtnClick}>
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
                                        <input tabIndex={1 + props.tabTimes} type="text" placeholder="Code" maxLength="8" id="txt-customer-code"
                                            onKeyDown={searchCustomerByCode}
                                            onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value })}
                                            value={(props.selectedBillToCompanyInfo.code_number || 0) === 0 ? (props.selectedBillToCompanyInfo.code || '') : props.selectedBillToCompanyInfo.code + props.selectedBillToCompanyInfo.code_number} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input tabIndex={2 + props.tabTimes} type="text" placeholder="Name"
                                            onKeyDown={validateCustomerForSaving}
                                            onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value })}
                                            value={props.selectedBillToCompanyInfo.name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={3 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value })} value={props.selectedBillToCompanyInfo.address1 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={4 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value })} value={props.selectedBillToCompanyInfo.address2 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={5 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value })} value={props.selectedBillToCompanyInfo.city || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-state">
                                        <input tabIndex={6 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value })} value={props.selectedBillToCompanyInfo.state || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-zip-code">
                                        <input tabIndex={7 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value })} value={props.selectedBillToCompanyInfo.zip || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={8 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value })} value={props.selectedBillToCompanyInfo.contact_name || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone">
                                        <MaskedInput
                                            tabIndex={9 + props.tabTimes}
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value })} value={props.selectedBillToCompanyInfo.contact_phone || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone-ext">
                                        <input tabIndex={10 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value })} value={props.selectedBillToCompanyInfo.ext || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={11 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, email: e.target.value })} value={props.selectedBillToCompanyInfo.email || ''} />
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
                                        <div className="mochi-button" onClick={mailingAddressBillToBtn}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Bill to</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="mochi-button" onClick={remitToAddressBtn}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Remit to address is the same</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="mochi-button" onClick={mailingAddressClearBtn}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Clear</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    </div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-row">
                                    <div className="input-box-container input-code">
                                        <input tabIndex={12 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                            onKeyDown={validateCustomerForSaving}
                                            onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_code: e.target.value })}
                                            value={(props.selectedBillToCompanyInfo.mailing_code_number || 0) === 0 ? (props.selectedBillToCompanyInfo.mailing_code || '') : props.selectedBillToCompanyInfo.mailing_code + props.selectedBillToCompanyInfo.mailing_code_number} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input tabIndex={13 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_name: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={14 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_address1: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_address1 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={15 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_address2: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_address2 || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={16 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_city: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_city || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-state">
                                        <input tabIndex={17 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_state: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_state || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-zip-code">
                                        <input tabIndex={18 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_zip: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_zip || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={19 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_contact_name: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_contact_name || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone">
                                        <MaskedInput tabIndex={20 + props.tabTimes}
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_contact_phone: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_contact_phone || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container input-phone-ext">
                                        <input tabIndex={21 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_ext: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_ext || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={22 + props.tabTimes} type="text" placeholder="E-Mail" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_email: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_email || ''} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-borderless-box" style={{ width: '170px', marginLeft: '10px', }}>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={32 + props.tabTimes} type="text" style={{ textTransform: 'uppercase' }} placeholder="Bill To" readOnly={true} onChange={e => props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, mailing_bill_to: e.target.value })} value={props.selectedBillToCompanyInfo.mailing_bill_to || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={33 + props.tabTimes} type="text" placeholder="Division" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={34 + props.tabTimes} type="text" placeholder="Agent Code" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={35 + props.tabTimes} type="text" placeholder="Salesman" readOnly={true} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={36 + props.tabTimes} type="text" placeholder="FID" readOnly={true} />
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
                                        <input tabIndex={37 + props.tabTimes} type="text" placeholder="Invoicing Terms" />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={38 + props.tabTimes} type="text" placeholder="Credit Limit Total" />
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
                                        <div className="mochi-button" onClick={async () => {
                                            if (props.selectedBillToCompanyInfo.id === undefined) {
                                                window.alert('You must select a contact first!');
                                                return;
                                            }

                                            if (props.selectedBillToCompanyContact.id === undefined) {
                                                window.alert('You must select a contact');
                                                return;
                                            }

                                            let index = props.panels.length - 1;
                                            let panels = props.panels.map((p, i) => {
                                                if (p.name === 'bill-to-company-contacts') {
                                                    index = i;
                                                    p.isOpened = true;
                                                }
                                                return p;
                                            });

                                            await props.setBillToCompanyIsEditingContact(false);
                                            await props.setBillToCompanyContactSearchCustomer({ ...props.selectedBillToCompanyInfo, selectedBillToCompanyContact: props.selectedBillToCompanyContact });

                                            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                            props.setDispatchPanels(panels);
                                        }}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">More</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="mochi-button" onClick={() => {
                                            if (props.selectedBillToCompanyInfo.id === undefined) {
                                                window.alert('You must select a customer');
                                                return;
                                            }

                                            let index = props.panels.length - 1;
                                            let panels = props.panels.map((p, i) => {
                                                if (p.name === 'bill-to-company-contacts') {
                                                    index = i;
                                                    p.isOpened = true;
                                                }
                                                return p;
                                            });

                                            props.setBillToCompanyContactSearchCustomer({ ...props.selectedBillToCompanyInfo, selectedBillToCompanyContact: { id: 0, customer_id: props.selectedBillToCompanyInfo.id } });
                                            props.setBillToCompanyIsEditingContact(true);

                                            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                            props.setDispatchPanels(panels);
                                        }}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Add contact</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="mochi-button" onClick={() => props.setSelectedBillToCompanyContact({})}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Clear</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    </div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={23 + props.tabTimes} type="text" placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                            props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: e.target.value })
                                        }} value={props.selectedBillToCompanyContact.first_name || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input tabIndex={24 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, last_name: e.target.value })} value={props.selectedBillToCompanyContact.last_name || ''} />
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container" style={{ width: '50%' }}>
                                        <MaskedInput tabIndex={25 + props.tabTimes}
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, phone_work: e.target.value })} value={props.selectedBillToCompanyContact.phone_work || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="input-box-container input-phone-ext">
                                            <input tabIndex={26 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, phone_ext: e.target.value })} value={props.selectedBillToCompanyContact.phone_ext || ''} />
                                        </div>
                                        <div className="input-toggle-container">
                                            <input type="checkbox" id="cbox-bill-to-company-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedBillToCompanyContact.is_primary || 0) === 1} />
                                            <label htmlFor="cbox-bill-to-company-contacts-primary-btn">
                                                <div className="label-text">Primary</div>
                                                <div className="input-toggle-btn"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-v-sep"></div>
                                <div className="form-row">
                                    <div className="input-box-container grow">
                                        <input tabIndex={27 + props.tabTimes} type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, email_work: e.target.value })} value={props.selectedBillToCompanyContact.email_work || ''} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container grow">
                                        <input tabIndex={28 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, notes: e.target.value })} value={props.selectedBillToCompanyContact.notes || ''} />
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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    let automatic_emails = props.selectedBillToCompanyInfo.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.replace(item.toString(), '').trim();

                                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails });
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
                                        <input tabIndex={29 + props.tabTimes} type="text" placeholder="E-mail To"
                                            ref={refBillToAutomaticEmailsTo}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'to') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'to') }}
                                            // onBlur={validateAutomaticEmailsForSaving}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'to') }}
                                            value={props.billToCompanyAutomaticEmailsTo} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-booked-load-btn"
                                            onChange={e => {
                                                console.log('here');
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_booked_load = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_booked_load || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-booked-load-btn">
                                            <div className="label-text">Booked Load</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-check-calls-btn"
                                            onChange={e => {
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_check_calls = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_check_calls || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-check-calls-btn">
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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    let automatic_emails = props.selectedBillToCompanyInfo.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.replace(item.toString(), '').trim();

                                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails });
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

                                        <input tabIndex={30 + props.tabTimes} type="text" placeholder="E-mail Cc"
                                            ref={refBillToAutomaticEmailsCc}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'cc') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                            // onBlur={validateAutomaticEmailsForSaving}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                            value={props.billToCompanyAutomaticEmailsCc} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-carrier-arrival-shipper-btn"
                                            onChange={e => {
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_carrier_arrival_shipper = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_carrier_arrival_shipper || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-carrier-arrival-shipper-btn">
                                            <div className="label-text">Carrier Arrival Shipper</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-carrier-arrival-consignee-btn"
                                            onChange={e => {
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_carrier_arrival_consignee = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_carrier_arrival_consignee || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-carrier-arrival-consignee-btn">
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
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    let automatic_emails = props.selectedBillToCompanyInfo.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.replace(item.toString(), '').trim();

                                                                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails });
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
                                        <input tabIndex={31 + props.tabTimes} type="text" placeholder="E-mail Bcc"
                                            ref={refBillToAutomaticEmailsBcc}
                                            onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'bcc') }}
                                            onInput={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                            onChange={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                            value={props.billTo} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-loaded-btn"
                                            onChange={e => {
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_loaded = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_loaded || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-loaded-btn">
                                            <div className="label-text">Loaded</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-bill-to-company-automatic-emails-empty-btn"
                                            onChange={e => {
                                                let automatic_emails = (props.selectedBillToCompanyInfo.automatic_emails || {});
                                                automatic_emails.automatic_emails_empty = e.target.checked ? 1 : 0;
                                                props.setSelectedBillToCompanyInfo({
                                                    ...props.selectedBillToCompanyInfo, automatic_emails: automatic_emails
                                                });
                                                validateAutomaticEmailsForSaving();
                                            }}
                                            checked={(props.selectedBillToCompanyInfo.automatic_emails?.automatic_emails_empty || 0) === 1} />
                                        <label htmlFor="cbox-bill-to-company-automatic-emails-empty-btn">
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
                                            props.billToCompanyShowingContactList &&
                                            <div className="mochi-button" onClick={() => props.setBillToCompanyShowingContactList(false)}>
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Search</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }
                                        {
                                            !props.billToCompanyShowingContactList &&
                                            <div className="mochi-button" onClick={() => props.setBillToCompanyShowingContactList(true)}>
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Cancel</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }

                                        {
                                            !props.billToCompanyShowingContactList &&
                                            <div className="mochi-button" onClick={searchContactBtnClick}>
                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                <div className="mochi-button-base">Send</div>
                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                            </div>
                                        }
                                    </div>
                                    <div className="top-border top-border-right"></div>
                                </div>

                                <div className="form-slider">
                                    <div className="form-slider-wrapper" style={{ left: props.billToCompanyShowingContactList ? 0 : '-100%' }}>
                                        <div className="contact-list-box">

                                            {
                                                (props.selectedBillToCompanyInfo.contacts || []).length > 0 &&
                                                <div className="contact-list-header">
                                                    <div className="contact-list-col tcol first-name">First Name</div>
                                                    <div className="contact-list-col tcol last-name">Last Name</div>
                                                    <div className="contact-list-col tcol phone-work">Phone Work</div>
                                                    <div className="contact-list-col tcol email-work">E-Mail Work</div>
                                                    <div className="contact-list-col tcol pri"></div>
                                                </div>
                                            }

                                            <div className="contact-list-wrapper">
                                                {
                                                    (props.selectedBillToCompanyInfo.contacts || []).map((contact, index) => {
                                                        return (
                                                            <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                                let index = props.panels.length - 1;
                                                                let panels = props.panels.map((p, i) => {
                                                                    if (p.name === 'bill-to-company-contacts') {
                                                                        index = i;
                                                                        p.isOpened = true;
                                                                    }
                                                                    return p;
                                                                });

                                                                await props.setBillToCompanyIsEditingContact(false);
                                                                await props.setBillToCompanyContactSearchCustomer({ ...props.selectedBillToCompanyInfo, selectedBillToCompanyContact: contact });

                                                                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                                props.setDispatchPanels(panels);
                                                            }} onClick={() => props.setSelectedBillToCompanyContact(contact)}>
                                                                <div className="contact-list-col tcol first-name">{contact.first_name}</div>
                                                                <div className="contact-list-col tcol last-name">{contact.last_name}</div>
                                                                <div className="contact-list-col tcol phone-work">{contact.phone_work}</div>
                                                                <div className="contact-list-col tcol email-work">{contact.email_work}</div>
                                                                <div className="contact-list-col tcol pri">
                                                                    {
                                                                        (contact.is_primary === 1) &&
                                                                        <span className='fas fa-check'></span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                        <div className="contact-search-box">
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="First Name" onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, first_name: e.target.value })} value={props.billToCompanyContactSearch.first_name || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="Last Name" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, last_name: e.target.value })} value={props.billToCompanyContactSearch.last_name || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="Address 1" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, address1: e.target.value })} value={props.billToCompanyContactSearch.address1 || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="Address 2" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, address2: e.target.value })} value={props.billToCompanyContactSearch.address2 || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="City" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, city: e.target.value })} value={props.billToCompanyContactSearch.city || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container input-state">
                                                    <input type="text" placeholder="State" maxLength="2" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, state: e.target.value })} value={props.billToCompanyContactSearch.state || ''} />
                                                </div>
                                                <div className="form-h-sep"></div>
                                                <div className="input-box-container grow">
                                                    <MaskedInput
                                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                        guide={true}
                                                        type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setBillToCompanyShowingContactList(false) }} onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, phone: e.target.value })} value={props.billToCompanyContactSearch.phone || ''} />
                                                </div>
                                            </div>
                                            <div className="form-v-sep"></div>
                                            <div className="form-row">
                                                <div className="input-box-container grow">
                                                    <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                                        onKeyDown={(e) => {
                                                            e.preventDefault();
                                                            let key = e.keyCode || e.which;

                                                            if (key === 9) {
                                                                let elems = document.getElementsByTagName('input');

                                                                for (var i = elems.length; i--;) {
                                                                    if (elems[i].getAttribute('tabindex') && elems[i].getAttribute('tabindex') === '29') {
                                                                        elems[i].focus();
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        onFocus={() => { props.setBillToCompanyShowingContactList(false) }}
                                                        onChange={e => props.setBillToCompanyContactSearch({ ...props.billToCompanyContactSearch, email: e.target.value })}
                                                        value={props.billToCompanyContactSearch.email || ''} />
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
                                            <input tabIndex={39 + props.tabTimes} type="text" placeholder="Open"
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
                                            <input tabIndex={40 + props.tabTimes} type="text" placeholder="Close"
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
                                            <input tabIndex={41 + props.tabTimes} type="text" placeholder="Open"
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
                                            <input tabIndex={42 + props.tabTimes} type="text" placeholder="Close"
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                    let key = e.keyCode || e.which;

                                                    if (key === 9) {
                                                        let elems = document.getElementsByTagName('input');

                                                        for (var i = elems.length; i--;) {
                                                            if (elems[i].getAttribute('tabindex') && elems[i].getAttribute('tabindex') === (1 + props.tabTimes).toString()) {
                                                                elems[i].focus();
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }}
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
                                        <div className="mochi-button" onClick={() => props.setSelectedBillToCompanyNote({ id: 0, customer_id: props.selectedBillToCompanyInfo.id })}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Add note</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="mochi-button" onClick={() => {
                                            if (props.selectedBillToCompanyInfo.id === undefined || props.selectedBillToCompanyInfo.notes.length === 0) {
                                                window.alert('There is nothing to print!');
                                                return;
                                            }

                                            let html = ``;

                                            props.selectedBillToCompanyInfo.notes.map((note, index) => {
                                                html += `<div><b>${note.user}:${moment(note.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm')}</b> ${note.text}</div>`

                                                return true;
                                            })

                                            printWindow(html);
                                        }}>
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
                                                    <div className="notes-list-item" key={index} onClick={() => props.setSelectedBillToCompanyNote(note)}>
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
                                        <div className="mochi-button" onClick={() => props.setSelectedBillToCompanyDirection({ id: 0, customer_id: props.selectedBillToCompanyInfo.id })}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Add direction</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                        <div className="input-checkbox-container">
                                            <input type="checkbox" id="cbox-directions-print-on-rate" />
                                            <label htmlFor="cbox-directions-print-on-rate">Print directions on rate confirmation</label>
                                        </div>
                                        <div className="mochi-button" onClick={() => {
                                            if (props.selectedBillToCompanyInfo.id === undefined || props.selectedBillToCompanyInfo.directions.length === 0) {
                                                window.alert('There is nothing to print!');
                                                return;
                                            }

                                            let html = ``;

                                            props.selectedBillToCompanyInfo.directions.map((direction, index) => {
                                                html += `<div> ${direction.text}</div>`

                                                return true;
                                            })

                                            printWindow(html);
                                        }}>
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
                                                    <div className="directions-list-item" key={index} onClick={() => props.setSelectedBillToCompanyDirection(direction)}>
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
                    <div className="mochi-button wrap" onClick={revenueInformationBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Revenue Information</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <div className="mochi-button wrap" onClick={orderHistoryBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Order History</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <div className="mochi-button wrap" onClick={laneHistoryBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Lane History</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <div className="mochi-button wrap" onClick={documentsBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Documents</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <div className="mochi-button wrap" onClick={() => {
                        if ((props.selectedBillToCompanyInfo.id || 0) === 0) {
                            window.alert('There is nothing to print!');
                            return;
                        }

                        let customer = { ...props.selectedBillToCompanyInfo };

                        let html = ``;

                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Code</span>: ${customer.code.toUpperCase() + (customer.code_number === 0 ? '' : customer.code_number)}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Name</span>: ${customer.name}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 1</span>: ${customer.address1}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 2</span>: ${customer.address2}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">City</span>: ${customer.city}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">State</span>: ${customer.state.toUpperCase()}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Postal Code</span>: ${customer.zip}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Name</span>: ${customer.contact_name}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone</span>: ${customer.contact_phone}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone Ext</span>: ${customer.ext}</div>`;
                        html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">E-Mail</span>: ${customer.email}</div>`;

                        printWindow(html);
                    }}>
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

            {
                props.selectedBillToCompanyNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CustomerModal
                        selectedData={props.selectedBillToCompanyNote}
                        setSelectedData={props.setSelectedBillToCompanyNote}
                        selectedParent={props.selectedBillToCompanyInfo}
                        setSelectedParent={(notes) => {
                            props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, notes: notes });
                        }}
                        savingDataUrl='/saveCustomerNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedBillToCompanyNote.id === 0}
                    />
                </animated.div>

            }

            {
                props.selectedBillToCompanyDirection.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CustomerModal
                        selectedData={props.selectedBillToCompanyDirection}
                        setSelectedData={props.setSelectedBillToCompanyDirection}
                        selectedParent={props.selectedBillToCompanyInfo}
                        setSelectedParent={(directions) => {
                            props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, directions: directions });
                        }}
                        savingDataUrl='/saveCustomerDirection'
                        deletingDataUrl='/deleteCustomerDirection'
                        type='direction'
                        isEditable={true}
                        isDeletable={true}
                        isAdding={props.selectedBillToCompanyDirection.id === 0} />
                </animated.div>
            }

            <CustomerPopup
                popupRef={refPopup}
                popupClasses={popupContainerClasses}
                popupItems={popupItems}
                popupItemsRef={popupItemsRef}
                popupItemClick={popupItemClick}
                popupItemKeydown={popupItemKeydown}
                setPopupItems={setPopupItems}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,
        scale: state.systemReducers.scale,

        billToCompanies: state.customerReducers.billToCompanies,
        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
        billToCompanySearch: state.customerReducers.billToCompanySearch,
        selectedBillToCompanyNote: state.customerReducers.selectedBillToCompanyNote,
        selectedBillToCompanyDirection: state.customerReducers.selectedBillToCompanyDirection,
        billToCompanyContactSearch: state.customerReducers.billToCompanyContactSearch,
        billToCompanyAutomaticEmailsTo: state.customerReducers.billToCompanyAutomaticEmailsTo,
        billToCompanyAutomaticEmailsCc: state.customerReducers.billToCompanyAutomaticEmailsCc,
        billToCompanyAutomaticEmailsBcc: state.customerReducers.billToCompanyAutomaticEmailsBcc,
        billToCompanyShowingContactList: state.customerReducers.billToCompanyShowingContactList,
        billToCompanyContacts: state.customerReducers.billToCompanyContacts,
        billToCompanyContactSearchCustomer: state.customerReducers.billToCompanyContactSearchCustomer,
        selectedBillToCompanyDocument: state.customerReducers.selectedBillToCompanyDocument,
        billToCompanyDocumentTags: state.customerReducers.billToCompanyDocumentTags,
        selectedBillToCompanyDocumentNote: state.customerReducers.selectedBillToCompanyDocumentNote
    }
}


export default connect(mapStateToProps, {
    setDispatchPanels,

    setDispatchPanels,

    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setBillToCompanySearch,
    setSelectedBillToCompanyNote,
    setSelectedBillToCompanyDirection,
    setBillToCompanyContactSearch,
    setBillToCompanyAutomaticEmailsTo,
    setBillToCompanyAutomaticEmailsCc,
    setBillToCompanyAutomaticEmailsBcc,
    setBillToCompanyShowingContactList,
    setBillToCompanyContacts,
    setBillToCompanyContactSearchCustomer,
    setBillToCompanyIsEditingContact,
    setSelectedBillToCompanyDocument,
    setBillToCompanyDocumentTags,
    setSelectedBillToCompanyDocumentNote
})(BillToCompanyInfo)