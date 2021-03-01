import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './Customers.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import CustomerPopup from './popup/Popup.jsx';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import CustomerModal from './modal/Modal.jsx';
import {
    setCustomers,
    setSelectedCustomer,
    setCustomerPanels,
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
} from '../../../actions';

function Customers(props) {
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
        setLastState(-1);
        props.setSelectedContact({});
        props.setSelectedNote({});
        props.setContactSearch({});
        props.setShowingContactList(true);
        props.setAutomaticEmailsTo('');
        props.setAutomaticEmailsCc('');
        props.setAutomaticEmailsBcc('');
        props.setSelectedCustomer({ id: -1, code: clearCode ? '' : props.selectedCustomer.code });
        setPopupItems([]);
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
                            await props.setSelectedCustomer(res.customers[0]);

                            await res.customers[0].contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedContact(c);
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
                data: (props.selectedCustomer.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedCustomer.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedCustomer.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedCustomer.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedCustomer.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedCustomer.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedCustomer.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerSearch', { search: customerSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setCustomerSearch(customerSearch);
                await props.setCustomers(res.customers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'customer-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setCustomerPanels(panels);
            }
        });
    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Customer Id',
                data: props.selectedCustomer.id || 0
            },
            {
                field: 'First Name',
                data: (props.contactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.contactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.contactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.contactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.contactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.contactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.contactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.contactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setContactSearch({ ...props.contactSearch, filters: filters });
                await props.setCustomerContacts(res.contacts);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'customer-contact-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setCustomerPanels(panels);
            }
        });
    }

    const revenueInformationBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'revenue-information') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setCustomerPanels(panels);
    }

    const orderHistoryBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'order-history') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setCustomerPanels(panels);
    }

    const laneHistoryBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'lane-history') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setCustomerPanels(panels);
    }

    const documentsBtnClick = () => {
        if ((props.selectedCustomer.id || 0) > 0) {
            props.setSelectedDocument({
                id: 0,
                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                date_entered: moment().format('MM-DD-YYYY')
            });

            let index = props.panels.length - 1;
            let panels = props.panels.map((p, i) => {
                if (p.name === 'documents') {
                    index = i;
                    p.isOpened = true;
                }
                return p;
            });

            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

            props.setCustomerPanels(panels);
        } else {
            window.alert('You must select a customer first!');
        }
    }

    const validateCustomerForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            window.setTimeout(() => {
                let selectedCustomer = props.selectedCustomer;

                if (selectedCustomer.id === undefined || selectedCustomer.id === -1) {
                    selectedCustomer.id = 0;
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

                    selectedCustomer.code = newCode;
                    selectedCustomer.mailing_code = mailingNewCode;

                    $.post(props.serverUrl + '/saveCustomer', selectedCustomer).then(res => {
                        if (props.selectedCustomer.id !== undefined && props.selectedCustomer.id >= 0) {
                            if (lastState >= 0) {
                                props.setSelectedCustomer(res.customer);
                                if (res.customer.contacts.length === 1) {
                                    if (res.customer.contacts[0].is_primary === 1) {
                                        props.setSelectedContact(res.customer.contacts[0]);
                                    }
                                }
                            } else {
                                setLastState(0);
                            }
                        }
                    });
                }
            }, 300);
        }
    }

    const remitToAddressBtn = () => {
        if (props.selectedCustomer.id === undefined || props.selectedCustomer.id <= 0) {
            window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedCustomer;

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

        props.setSelectedCustomer(customer);

        validateCustomerForSaving();
    }

    const mailingAddressClearBtn = () => {
        if (props.selectedCustomer.id === undefined || props.selectedCustomer.id <= 0) {
            // window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedCustomer;

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

        props.setSelectedCustomer(customer);

        validateCustomerForSaving();
    }

    const mailingAddressBillToBtn = () => {
        if (props.selectedCustomer.id === undefined || props.selectedCustomer.id <= 0) {
            window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedCustomer;

        if ((customer.mailing_bill_to || '') !== '') {
            customer.mailing_bill_to = '';
        } else {
            if ((customer.mailing_code || '') !== '') {
                customer.mailing_bill_to = customer.mailing_code + ((customer.mailing_code_number || 0) === 0 ? '' : customer.mailing_code_number);
            }
        }

        props.setSelectedCustomer(customer);

        validateCustomerForSaving();
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedContact({ ...props.selectedContact, is_primary: e.target.checked ? 1 : 0 });

        if (props.selectedCustomer.id === undefined) {
            return;
        }

        let contact = props.selectedContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.customer_id === undefined || contact.customer_id === 0) {
            contact.customer_id = props.selectedCustomer.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedCustomer.address1;
            contact.address2 = props.selectedCustomer.address2;
            contact.city = props.selectedCustomer.city;
            contact.state = props.selectedCustomer.state;
            contact.zip_code = props.selectedCustomer.zip;
        }

        $.post(props.serverUrl + '/saveContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedContact(res.contact);
                await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.contacts });
            }
        });

    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedCustomer.id === undefined) {
                return;
            }

            let contact = props.selectedContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedCustomer.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedCustomer.address1;
                contact.address2 = props.selectedCustomer.address2;
                contact.city = props.selectedCustomer.city;
                contact.state = props.selectedCustomer.state;
                contact.zip_code = props.selectedCustomer.zip;
            }

            $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.contacts });
                    await props.setSelectedContact(res.contact);
                }
            });
        }
    }

    const validateAutomaticEmailsForSaving = () => {
        $.post(props.serverUrl + '/saveAutomaticEmails', props.selectedCustomer.automatic_emails).then(res => {
            if (res.result === 'OK') {
                console.log(res);
            }
        });
    }

    const popupItemClick = async (item) => {
        let automaticEmails = props.selectedCustomer.automatic_emails || { customer_id: props.selectedCustomer.id };

        switch (automaticEmailsActiveInput) {
            case 'to':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                    await props.setAutomaticEmailsTo('');
                }
                break;
            case 'cc':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                    await props.setAutomaticEmailsCc('');
                }
                break;
            case 'bcc':
                if (item.email !== '' && isEmailValid(item.email)) {
                    automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                    await props.setAutomaticEmailsBcc('');
                }
                break;
            default:
                break;
        }

        await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

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
            let automaticEmails = props.selectedCustomer.automatic_emails || { customer_id: props.selectedCustomer.id };

            await popupItems.map(async (item, index) => {
                if (item.selected) {
                    switch (automaticEmailsActiveInput) {
                        case 'to':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsTo('');
                            }
                            break;
                        case 'cc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsCc('');
                            }
                            break;
                        case 'bcc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsBcc('');
                            }
                            break;
                        default:
                            break;
                    }
                }

                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

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
            let automaticEmails = props.selectedCustomer.automatic_emails || { customer_id: props.selectedCustomer.id };

            await popupItems.map(async (item, index) => {
                if (item.selected) {
                    switch (name) {
                        case 'to':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsTo('');
                            }
                            break;
                        case 'cc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsCc('');
                            }
                            break;
                        case 'bcc':
                            if (item.email !== '' && isEmailValid(item.email)) {
                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + item.email).trim() };
                                await props.setAutomaticEmailsBcc('');
                            }
                            break;
                        default:
                            break;
                    }
                }

                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

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

            if (props.selectedCustomer.id !== undefined) {
                let automaticEmails = props.selectedCustomer.automatic_emails || { customer_id: props.selectedCustomer.id };
                let tabNext = false;

                switch (name) {
                    case 'to':
                        if (props.automaticEmailsTo.trim() !== '' && isEmailValid(props.automaticEmailsTo.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ' ' + props.automaticEmailsTo.trim()).trim() };
                            await props.setAutomaticEmailsTo('');
                        } else {
                            tabNext = props.automaticEmailsTo.trim() === '';
                        }
                        break;
                    case 'cc':
                        if (props.automaticEmailsCc.trim() !== '' && isEmailValid(props.automaticEmailsCc.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ' ' + props.automaticEmailsCc.trim()).trim() };
                            await props.setAutomaticEmailsCc('');
                        } else {
                            tabNext = props.automaticEmailsCc.trim() === '';
                        }
                        break;
                    case 'bcc':
                        if (props.automaticEmailsBcc.trim() !== '' && isEmailValid(props.automaticEmailsBcc.trim())) {
                            automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ' ' + props.automaticEmailsBcc.trim()).trim() };
                            await props.setAutomaticEmailsBcc('');
                        } else {
                            tabNext = props.automaticEmailsBcc.trim() === '';
                        }
                        break;
                    default:
                        break;
                }

                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                    if (res.result === 'OK') {
                        console.log(res);
                    }
                });

                if (!tabNext) e.preventDefault();
            } else {
                await props.setAutomaticEmailsTo('');
                await props.setAutomaticEmailsCc('');
                await props.setAutomaticEmailsBcc('');
            }

        }

        if (key === 27) {
            await setPopupItems([]);
        }

    }

    const automaticEmailsOnInput = async (e, name) => {
        window.clearTimeout(delayTimer);
        name === 'to' && props.setAutomaticEmailsTo(e.target.value);
        name === 'cc' && props.setAutomaticEmailsCc(e.target.value);
        name === 'bcc' && props.setAutomaticEmailsBcc(e.target.value);

        setAutomaticEmailsActiveInput(name);

        if (props.selectedCustomer.id !== undefined) {

            if (e.target.value.trim() === '') {
                await setPopupItems([]);
            } else {
                delayTimer = window.setTimeout(() => {
                    $.post(props.serverUrl + '/getContactsByEmailOrName', {
                        email: e.target.value.trim(),
                        customer_id: props.selectedCustomer.id
                    }).then(async res => {
                        const boundsTo = refAutomaticEmailsTo.current.getBoundingClientRect();
                        const boundsCc = refAutomaticEmailsCc.current.getBoundingClientRect();
                        const boundsBcc = refAutomaticEmailsBcc.current.getBoundingClientRect();

                        const input = name === 'to' ? boundsTo : name === 'cc' ? boundsCc : boundsBcc;

                        let popup = refPopup.current;

                        const { innerWidth, innerHeight } = window;

                        let screenWSection = innerWidth / 3;

                        popup && popup.childNodes[0].classList.add('vertical');

                        if ((innerHeight - 170 - 30) <= input.top) {
                            popup && popup.childNodes[0].classList.add('above');
                        }

                        if ((innerHeight - 170 - 30) > input.top) {
                            popup && popup.childNodes[0].classList.add('below');
                            popup && (popup.style.top = (input.top + 10) + 'px');
                        }

                        if (input.left <= (screenWSection * 1)) {
                            popup && popup.childNodes[0].classList.add('right');
                            popup && (popup.style.left = input.left + 'px');

                            if (input.width < 70) {
                                popup && (popup.style.left = (input.left - 60 + (input.width / 2)) + 'px');

                                if (input.left < 30) {
                                    popup && popup.childNodes[0].classList.add('corner');
                                    popup && (popup.style.left = (input.left + (input.width / 2)) + 'px');
                                }
                            }
                        }

                        if (input.left <= (screenWSection * 2)) {
                            popup && (popup.style.left = (input.left - 100) + 'px');
                        }

                        if (input.left > (screenWSection * 2)) {
                            popup && popup.childNodes[0].classList.add('left');
                            popup && (popup.style.left = (input.left - 200) + 'px');

                            if ((innerWidth - input.left) < 100) {
                                popup && popup.childNodes[0].classList.add('corner');
                                popup && (popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px');
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
        let hours = { ...props.selectedCustomer.hours || {}, customer_id: props.selectedCustomer.id };

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
                await props.setSelectedCustomer({ ...props.selectedCustomer, hours: res.customer_hours });
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
        <div className="customers-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <PanelContainer panels={props.panels} />
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
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={searchCustomerByCode}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, code: e.target.value })}
                                        value={(props.selectedCustomer.code_number || 0) === 0 ? (props.selectedCustomer.code || '') : props.selectedCustomer.code + props.selectedCustomer.code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, name: e.target.value })} value={props.selectedCustomer.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, address1: e.target.value })} value={props.selectedCustomer.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, address2: e.target.value })} value={props.selectedCustomer.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, city: e.target.value })} value={props.selectedCustomer.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, state: e.target.value })} value={props.selectedCustomer.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, zip: e.target.value })} value={props.selectedCustomer.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, contact_name: e.target.value })} value={props.selectedCustomer.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, contact_phone: e.target.value })} value={props.selectedCustomer.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, ext: e.target.value })} value={props.selectedCustomer.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, email: e.target.value })} value={props.selectedCustomer.email || ''} />
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
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_code: e.target.value })}
                                        value={(props.selectedCustomer.mailing_code_number || 0) === 0 ? (props.selectedCustomer.mailing_code || '') : props.selectedCustomer.mailing_code + props.selectedCustomer.mailing_code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_name: e.target.value })} value={props.selectedCustomer.mailing_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_address1: e.target.value })} value={props.selectedCustomer.mailing_address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_address2: e.target.value })} value={props.selectedCustomer.mailing_address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_city: e.target.value })} value={props.selectedCustomer.mailing_city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" maxLength="2" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_state: e.target.value })} value={props.selectedCustomer.mailing_state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_zip: e.target.value })} value={props.selectedCustomer.mailing_zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_contact_name: e.target.value })} value={props.selectedCustomer.mailing_contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_contact_phone: e.target.value })} value={props.selectedCustomer.mailing_contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_ext: e.target.value })} value={props.selectedCustomer.mailing_ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_email: e.target.value })} value={props.selectedCustomer.mailing_email || ''} />
                                </div>
                            </div>
                        </div>

                        <div className="form-borderless-box" style={{ width: '170px', marginLeft: '10px', }}>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" style={{ textTransform: 'uppercase' }} placeholder="Bill To" readOnly={true} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_bill_to: e.target.value })} value={props.selectedCustomer.mailing_bill_to || ''} />
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
                                    <div className="mochi-button" onClick={async () => {
                                        if (props.selectedCustomer.id === undefined) {
                                            window.alert('You must select a contact first!');
                                            return;
                                        }

                                        if (props.selectedContact.id === undefined) {
                                            window.alert('You must select a contact');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'customer-contacts') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        await props.setIsEditingContact(false);
                                        await props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: props.selectedContact });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setCustomerPanels(panels);
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer.id === undefined) {
                                            window.alert('You must select a customer');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'customer-contacts') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: { id: 0, customer_id: props.selectedCustomer.id } });
                                        props.setIsEditingContact(true);

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setCustomerPanels(panels);
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => props.setSelectedContact({})}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">


                                    <input type="text" placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                        props.setSelectedContact({ ...props.selectedContact, first_name: e.target.value })
                                    }} value={props.selectedContact.first_name || ''} />



                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, last_name: e.target.value })} value={props.selectedContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '50%' }}>
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, phone_work: e.target.value })} value={props.selectedContact.phone_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, phone_ext: e.target.value })} value={props.selectedContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-customer-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedContact.is_primary || 0) === 1} />
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
                                    <input type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
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
                                        (props.selectedCustomer.automatic_emails?.automatic_emails_to || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < props.selectedCustomer.contacts.length; i++) {
                                                    let contact = props.selectedCustomer.contacts[i];

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
                                                                let automatic_emails = props.selectedCustomer.automatic_emails || {};
                                                                automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.replace(item.toString(), '').trim();

                                                                props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
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
                                    <input type="text" placeholder="E-mail To"
                                        ref={refAutomaticEmailsTo}
                                        onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'to') }}
                                        onInput={(e) => { automaticEmailsOnInput(e, 'to') }}
                                        // onBlur={validateAutomaticEmailsForSaving}
                                        onChange={(e) => { automaticEmailsOnInput(e, 'to') }}
                                        value={props.automaticEmailsTo} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-booked-load-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_booked_load = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_booked_load || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-booked-load-btn">
                                        <div className="label-text">Booked Load</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-check-calls-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_check_calls = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_check_calls || 0) === 1} />
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
                                        (props.selectedCustomer.automatic_emails?.automatic_emails_cc || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < props.selectedCustomer.contacts.length; i++) {
                                                    let contact = props.selectedCustomer.contacts[i];

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
                                                                let automatic_emails = props.selectedCustomer.automatic_emails || {};
                                                                automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.replace(item.toString(), '').trim();

                                                                props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
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

                                    <input type="text" placeholder="E-mail Cc"
                                        ref={refAutomaticEmailsCc}
                                        onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'cc') }}
                                        onInput={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                        // onBlur={validateAutomaticEmailsForSaving}
                                        onChange={(e) => { automaticEmailsOnInput(e, 'cc') }}
                                        value={props.automaticEmailsCc} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-carrier-arrival-shipper-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_shipper = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_carrier_arrival_shipper || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-carrier-arrival-shipper-btn">
                                        <div className="label-text">Carrier Arrival Shipper</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-carrier-arrival-consignee-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_consignee = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_carrier_arrival_consignee || 0) === 1} />
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
                                        (props.selectedCustomer.automatic_emails?.automatic_emails_bcc || '').split(' ').map((item, index) => {
                                            if (item.trim() !== '') {
                                                let textToShow = item;

                                                for (let i = 0; i < props.selectedCustomer.contacts.length; i++) {
                                                    let contact = props.selectedCustomer.contacts[i];

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
                                                                let automatic_emails = props.selectedCustomer.automatic_emails || {};
                                                                automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.replace(item.toString(), '').trim();

                                                                props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
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
                                    <input type="text" placeholder="E-mail Bcc"
                                        ref={refAutomaticEmailsBcc}
                                        onKeyDown={(e) => { automaticEmailsOnKeydown(e, 'bcc') }}
                                        onInput={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                        // onBlur={validateAutomaticEmailsForSaving}
                                        onChange={(e) => { automaticEmailsOnInput(e, 'bcc') }}
                                        value={props.automaticEmailsBcc} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-loaded-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_loaded = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_loaded || 0) === 1} />
                                    <label htmlFor="cbox-automatic-emails-loaded-btn">
                                        <div className="label-text">Loaded</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-automatic-emails-empty-btn"
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer.automatic_emails || {});
                                            automatic_emails.automatic_emails_empty = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer.automatic_emails?.automatic_emails_empty || 0) === 1} />
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
                                        props.showingContactList &&
                                        <div className="mochi-button" onClick={() => props.setShowingContactList(false)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !props.showingContactList &&
                                        <div className="mochi-button" onClick={() => props.setShowingContactList(true)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    {
                                        !props.showingContactList &&
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
                                <div className="form-slider-wrapper" style={{ left: props.showingContactList ? 0 : '-100%' }}>
                                    <div className="contact-list-box">
                                        <div className="contact-list-wrapper">
                                            {
                                                (props.selectedCustomer.contacts || []).map((contact, index) => {
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
                                                            await props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: contact });

                                                            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                            props.setCustomerPanels(panels);
                                                        }} onClick={() => props.setSelectedContact(contact)}>
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
                                                <input type="text" placeholder="First Name" onChange={e => props.setContactSearch({ ...props.contactSearch, first_name: e.target.value })} value={props.contactSearch.first_name || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Last Name" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, last_name: e.target.value })} value={props.contactSearch.last_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address1: e.target.value })} value={props.contactSearch.address1 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address2: e.target.value })} value={props.contactSearch.address2 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, city: e.target.value })} value={props.contactSearch.city || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, state: e.target.value })} value={props.contactSearch.state || ''} />
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
                                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, email: e.target.value })} value={props.contactSearch.email || ''} />
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
                                        <input type="text" placeholder="Open"
                                            onBlur={(e) => validateHoursForSaving(e, 'hours open')}
                                            onChange={e => {
                                                let hours = (props.selectedCustomer.hours || {});
                                                hours.hours_open = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer.hours?.hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Close"
                                            onBlur={(e) => validateHoursForSaving(e, 'hours close')}
                                            onChange={e => {
                                                let hours = (props.selectedCustomer.hours || {});
                                                hours.hours_close = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer.hours?.hours_close || '')} />
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
                                        <input type="text" placeholder="Open"
                                            onBlur={(e) => validateHoursForSaving(e, 'delivery hours open')}
                                            onChange={e => {
                                                let hours = (props.selectedCustomer.hours || {});
                                                hours.delivery_hours_open = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer.hours?.delivery_hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input type="text" placeholder="Close"
                                            onBlur={(e) => validateHoursForSaving(e, 'delivery hours close')}
                                            onChange={e => {
                                                let hours = (props.selectedCustomer.hours || {});
                                                hours.delivery_hours_close = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer.hours?.delivery_hours_close || '')} />
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
                                    <div className="mochi-button" onClick={() => props.setSelectedNote({ id: 0, customer_id: props.selectedCustomer.id })}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer.id === undefined || props.selectedCustomer.notes.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedCustomer.notes.map((note, index) => {
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
                                        (props.selectedCustomer.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index} onClick={() => props.setSelectedNote(note)}>
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
                                    <div className="mochi-button" onClick={() => props.setSelectedDirection({ id: 0, customer_id: props.selectedCustomer.id })}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add direction</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="input-checkbox-container">
                                        <input type="checkbox" id="cbox-directions-print-on-rate" />
                                        <label htmlFor="cbox-directions-print-on-rate">Print directions on rate confirmation</label>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer.id === undefined || props.selectedCustomer.directions.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedCustomer.directions.map((direction, index) => {
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
                                        (props.selectedCustomer.directions || []).map((direction, index) => {
                                            return (
                                                <div className="directions-list-item" key={index} onClick={() => props.setSelectedDirection(direction)}>
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

            {
                props.selectedNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CustomerModal
                        selectedData={props.selectedNote}
                        setSelectedData={props.setSelectedNote}                        
                        selectedParent={props.selectedCustomer}
                        setSelectedParent={(notes) => {
                            props.setSelectedCustomer({ ...props.selectedCustomer, notes: notes });
                        }}
                        savingDataUrl='/saveCustomerNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedNote.id === 0}
                    />
                </animated.div>

            }

            {
                props.selectedDirection.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CustomerModal
                        selectedData={props.selectedDirection}
                        setSelectedData={props.setSelectedDirection}                        
                        selectedParent={props.selectedCustomer}
                        setSelectedParent={(directions) => {
                            props.setSelectedCustomer({ ...props.selectedCustomer, directions: directions });
                        }}
                        savingDataUrl='/saveCustomerDirection'
                        deletingDataUrl='/deleteCustomerDirection'
                        type='direction'
                        isEditable={true}
                        isDeletable={true}
                        isAdding={props.selectedDirection.id === 0} />
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
        scale: state.systemReducers.scale,
        customers: state.customerReducers.customers,
        contacts: state.customerReducers.contacts,
        selectedCustomer: state.customerReducers.selectedCustomer,
        serverUrl: state.systemReducers.serverUrl,
        panels: state.customerReducers.panels,
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
    setCustomers,
    setSelectedCustomer,
    setCustomerPanels,
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
})(Customers)