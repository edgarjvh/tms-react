import React, { useState, useRef, useEffect } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import Highlighter from "react-highlight-words";
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Customers(props) {
    const refCustomerCode = useRef(null);
    const refCustomerMailingCode = useRef();
    const refCustomerContactFirstName = useRef();
    const [isSavingCustomer, setIsSavingCustomer] = useState(false);
    const [isSavingContact, setIsSavingContact] = useState(false);
    const [isSavingMailingAddress, setIsSavingMailingAddress] = useState(false);

    const refCustomerContactPhone = useRef();

    const [customerContactPhoneItems, setCustomerContactPhoneItems] = useState([]);
    const [showCustomerContactPhones, setShowCustomerContactPhones] = useState(false);
    const refCustomerContactPhoneDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowCustomerContactPhones(false) } });
    const refCustomerContactPhonePopupItems = useRef([]);

    const refCustomerContactEmail = useRef();
    const [customerContactEmailItems, setCustomerContactEmailItems] = useState([]);
    const [showCustomerContactEmails, setShowCustomerContactEmails] = useState(false);
    const refCustomerContactEmailDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowCustomerContactEmails(false) } });
    const refCustomerContactEmailPopupItems = useRef([]);

    const refMailingContactName = useRef();
    const [mailingContactNameItems, setMailingContactNameItems] = useState([]);
    const [showMailingContactNames, setShowMailingContactNames] = useState(false);
    const refMailingContactNameDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowMailingContactNames(false) } });
    const refMailingContactNamePopupItems = useRef([]);

    const refMailingContactPhone = useRef();
    const [mailingContactPhoneItems, setMailingContactPhoneItems] = useState([]);
    const [showMailingContactPhones, setShowMailingContactPhones] = useState(false);
    const refMailingContactPhoneDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowMailingContactPhones(false) } });
    const refMailingContactPhonePopupItems = useRef([]);

    const refMailingContactEmail = useRef();
    const [mailingContactEmailItems, setMailingContactEmailItems] = useState([]);
    const [showMailingContactEmails, setShowMailingContactEmails] = useState(false);
    const refMailingContactEmailDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowMailingContactEmails(false) } });
    const refMailingContactEmailPopupItems = useRef([]);

    const [emailToDropdownItems, setEmailToDropdownItems] = useState([]);
    const refEmailToDropDown = useDetectClickOutside({ onTriggered: async () => { await setEmailToDropdownItems([]) } });
    const refEmailToPopupItems = useRef([]);

    const [emailCcDropdownItems, setEmailCcDropdownItems] = useState([]);
    const refEmailCcDropDown = useDetectClickOutside({ onTriggered: async () => { await setEmailCcDropdownItems([]) } });
    const refEmailCcPopupItems = useRef([]);

    const [emailBccDropdownItems, setEmailBccDropdownItems] = useState([]);
    const refEmailBccDropDown = useDetectClickOutside({ onTriggered: async () => { await setEmailBccDropdownItems([]) } });
    const refEmailBccPopupItems = useRef([]);

    const refAutomaticEmailsTo = useRef();
    const refAutomaticEmailsCc = useRef();
    const refAutomaticEmailsBcc = useRef();
    var delayTimer;
    const modalTransitionProps = useSpring({ opacity: (props.selectedNote?.id !== undefined || props.selectedDirection?.id !== undefined) ? 1 : 0 });

    useEffect(() => {
        if (isSavingCustomer) {
            let selectedCustomer = { ...props.selectedCustomer };

            if (selectedCustomer.id === undefined || selectedCustomer.id === -1) {
                selectedCustomer.id = 0;
                props.setSelectedCustomer({ ...props.selectedCustomer, id: 0 });
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

                let newCode = (selectedCustomer.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedCustomer.state || '').trim().replace(/\s/g, "").substring(0, 2);

                selectedCustomer.code = newCode.toUpperCase();

                $.post(props.serverUrl + '/saveCustomer', selectedCustomer).then(async res => {
                    if (res.result === 'OK') {
                        let customer = JSON.parse(JSON.stringify(res.customer));
                        if ((props.selectedCustomer?.id || 0) === 0) {
                            await props.setSelectedCustomer({
                                ...props.selectedCustomer,
                                id: customer.id,
                                code: customer.code,
                                code_number: customer.code_number,
                                contacts: customer.contacts || []
                            });
                        } else {
                            await props.setSelectedCustomer({
                                ...props.selectedCustomer,
                                contacts: customer.contacts || []
                            });
                        }

                        (res.customer.contacts || []).map(async (contact, index) => {
                            if (contact.is_primary === 1) {
                                if ((props.selectedContact?.id || 0) === 0 || props.selectedContact?.id === contact.id) {
                                    await props.setSelectedContact(contact);
                                }
                            }
                            return true;
                        });

                        // if ((selectedCustomer.contacts || []).length === 0 && (res.customer.contacts || []).length === 1) {
                        //     goToTabindex((17 + props.tabTimes).toString());
                        // }
                    }

                    await setIsSavingCustomer(false);
                }).catch(e => {
                    setIsSavingCustomer(false);
                });
            } else {
                setIsSavingCustomer(false);
            }
        }
    }, [isSavingCustomer])

    useEffect(() => {
        if (isSavingContact) {
            if (props.selectedCustomer?.id === undefined) {
                return;
            }

            let contact = props.selectedContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedCustomer.id;
            }

            if ((contact.first_name || '').trim() === '' ||
                (contact.last_name || '').trim() === '' ||
                ((contact.phone_work || '').trim() === '' &&
                    (contact.phone_work_fax || '').trim() === '' &&
                    (contact.phone_mobile || '').trim() === '' &&
                    (contact.phone_direct || '').trim() === '' &&
                    (contact.phone_other || '').trim() === '')) {
                setIsSavingContact(false);
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedCustomer?.address1;
                contact.address2 = props.selectedCustomer?.address2;
                contact.city = props.selectedCustomer?.city;
                contact.state = props.selectedCustomer?.state;
                contact.zip_code = props.selectedCustomer?.zip;
            }

            $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.contacts });
                    await props.setSelectedContact(res.contact);
                }

                setIsSavingContact(false);
            }).catch(e => {
                console.log('error saving customer contact', e);
                setIsSavingContact(false);
            });
        }
    }, [isSavingContact])

    useEffect(() => {
        if (isSavingMailingAddress) {
            if ((props.selectedCustomer.id || 0) > 0) {
                let mailing_address = props.selectedCustomer.mailing_address || {};

                if (mailing_address.id === undefined) {
                    mailing_address.id = 0;
                }
                mailing_address.customer_id = props.selectedCustomer.id;

                if (
                    (mailing_address.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (mailing_address.city || '').trim().replace(/\s/g, "") !== "" &&
                    (mailing_address.state || '').trim().replace(/\s/g, "") !== "" &&
                    (mailing_address.address1 || '').trim() !== "" &&
                    (mailing_address.zip || '').trim() !== ""
                ) {
                    let parseCity = mailing_address.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let newCode = (mailing_address.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (mailing_address.state || '').trim().replace(/\s/g, "").substring(0, 2);

                    mailing_address.code = newCode.toUpperCase();

                    $.post(props.serverUrl + '/saveCustomerMailingAddress', mailing_address).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedCustomer({ ...props.selectedCustomer, mailing_address: res.mailing_address });
                        }

                        await setIsSavingMailingAddress(false);
                    }).catch(e => {
                        console.log('error on saving customer mailing address', e);
                        setIsSavingMailingAddress(false);
                    });
                } else {
                    setIsSavingMailingAddress(false);
                }
            }
        }
    }, [isSavingMailingAddress]);

    useEffect(() => {
        refCustomerCode.current.focus({
            preventScroll: true
        });
    }, [])

    useEffect(() => {
        if (props.screenFocused) {
            refCustomerCode.current.focus({
                preventScroll: true
            });
        }
    }, [props.screenFocused])

    useEffect(async () => {
        let phones = [];
        (props.selectedContact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedContact.phone_work });
        (props.selectedContact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedContact.phone_work_fax });
        (props.selectedContact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedContact.phone_mobile });
        (props.selectedContact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedContact.phone_direct });
        (props.selectedContact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedContact.phone_other });

        await setCustomerContactPhoneItems(phones);
    }, [
        props.selectedContact?.phone_work,
        props.selectedContact?.phone_work_fax,
        props.selectedContact?.phone_mobile,
        props.selectedContact?.phone_direct,
        props.selectedContact?.phone_other,
        props.selectedContact?.primary_phone
    ]);

    useEffect(async () => {
        let emails = [];
        (props.selectedContact?.email_work || '') !== '' && emails.push({ id: 1, type: 'work', email: props.selectedContact.email_work });
        (props.selectedContact?.email_personal || '') !== '' && emails.push({ id: 2, type: 'personal', email: props.selectedContact.email_personal });
        (props.selectedContact?.email_other || '') !== '' && emails.push({ id: 3, type: 'other', email: props.selectedContact.email_other });

        await setCustomerContactEmailItems(emails);
    }, [
        props.selectedContact?.email_work,
        props.selectedContact?.email_personal,
        props.selectedContact?.email_other,
        props.selectedContact?.primary_email
    ]);

    useEffect(async () => {
        let phones = [];
        (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedCustomer?.mailing_address?.mailing_contact.phone_work });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedCustomer?.mailing_address?.mailing_contact.phone_work_fax });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedCustomer?.mailing_address?.mailing_contact.phone_mobile });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedCustomer?.mailing_address?.mailing_contact.phone_direct });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedCustomer?.mailing_address?.mailing_contact.phone_other });

        await setMailingContactPhoneItems(phones);
    }, [
        props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work,
        props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work_fax,
        props.selectedCustomer?.mailing_address?.mailing_contact?.phone_mobile,
        props.selectedCustomer?.mailing_address?.mailing_contact?.phone_direct,
        props.selectedCustomer?.mailing_address?.mailing_contact?.phone_other,
        props.selectedCustomer?.mailing_address?.mailing_contact?.primary_phone
    ]);

    useEffect(async () => {
        let emails = [];
        (props.selectedCustomer?.mailing_address?.mailing_contact?.email_work || '') !== '' && emails.push({ id: 1, type: 'work', email: props.selectedCustomer?.mailing_address?.mailing_contact.email_work });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.email_personal || '') !== '' && emails.push({ id: 2, type: 'personal', email: props.selectedCustomer?.mailing_address?.mailing_contact.email_personal });
        (props.selectedCustomer?.mailing_address?.mailing_contact?.email_other || '') !== '' && emails.push({ id: 3, type: 'other', email: props.selectedCustomer?.mailing_address?.mailing_contact.email_other });

        await setMailingContactEmailItems(emails);
    }, [
        props.selectedCustomer?.mailing_address?.mailing_contact?.email_work,
        props.selectedCustomer?.mailing_address?.mailing_contact?.email_personal,
        props.selectedCustomer?.mailing_address?.mailing_contact?.email_other,
        props.selectedCustomer?.mailing_address?.mailing_contact?.primary_email
    ]);


    const setInitialValues = (clearCode = true) => {
        setIsSavingCustomer(false);
        props.setSelectedContact({});
        props.setSelectedNote({});
        props.setSelectedDirection({});
        props.setContactSearch({});

        props.setShowingContactList(true);
        props.setAutomaticEmailsTo('');
        props.setAutomaticEmailsCc('');
        props.setAutomaticEmailsBcc('');
        props.setSelectedCustomer({ id: 0, code: clearCode ? '' : props.selectedCustomer?.code });
        refCustomerCode.current.focus();
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
                data: (props.selectedCustomer?.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedCustomer?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedCustomer?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedCustomer?.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedCustomer?.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedCustomer?.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedCustomer?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerSearch', { search: customerSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setCustomerSearch(customerSearch);
                await props.setCustomers(res.customers);

                if (!props.openedPanels.includes(props.customerSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.customerSearchPanelName]);
                }
            }
        });
    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Customer Id',
                data: props.selectedCustomer?.id || 0
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

                if (!props.openedPanels.includes(props.customerContactSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.customerContactSearchPanelName]);
                }
            }
        });
    }

    const revenueInformationBtnClick = () => {
        if (!props.openedPanels.includes(props.customerRevenueInformationPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.customerRevenueInformationPanelName]);
        }
    }

    const orderHistoryBtnClick = () => {
        if (!props.openedPanels.includes(props.customerOrderHistoryPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.customerOrderHistoryPanelName]);
        }
    }

    const laneHistoryBtnClick = () => {
        if (!props.openedPanels.includes(props.customerLaneHistoryPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.customerLaneHistoryPanelName]);
        }
    }

    const documentsBtnClick = () => {
        if ((props.selectedCustomer?.id || 0) > 0) {
            props.setSelectedDocument({
                id: 0,
                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                date_entered: moment().format('MM/DD/YYYY')
            });

            if (!props.openedPanels.includes(props.customerDocumentsPanelName)) {
                props.setOpenedPanels([...props.openedPanels, props.customerDocumentsPanelName]);
            }
        } else {
            window.alert('You must select a customer first!');
        }
    }

    const validateCustomerForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingCustomer) {
                setIsSavingCustomer(true);
            }
        }
    }

    const validateMailingAddressForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingMailingAddress) {
                setIsSavingMailingAddress(true);
            }
        }
    }

    const remitToAddressBtn = () => {
        if ((props.selectedCustomer?.id || 0) === 0) {
            window.alert('You must select a customer first');
            return;
        }

        let mailing_address = {};

        mailing_address.id = -1;
        mailing_address.customer_id = props.selectedCustomer.id;
        mailing_address.code = props.selectedCustomer.code;
        mailing_address.code_number = props.selectedCustomer.code_number;
        mailing_address.name = props.selectedCustomer.name;
        mailing_address.address1 = props.selectedCustomer.address1;
        mailing_address.address2 = props.selectedCustomer.address2;
        mailing_address.city = props.selectedCustomer.city;
        mailing_address.state = props.selectedCustomer.state;
        mailing_address.zip = props.selectedCustomer.zip;
        mailing_address.contact_name = props.selectedCustomer.contact_name;
        mailing_address.contact_phone = props.selectedCustomer.contact_phone;
        mailing_address.ext = props.selectedCustomer.ext;
        mailing_address.email = props.selectedCustomer.email;

        if ((props.selectedContact?.id || 0) > 0) {
            mailing_address.mailing_contact_id = props.selectedContact.id;
            mailing_address.mailing_contact = props.selectedContact;

            mailing_address.mailing_contact_primary_phone = props.selectedContact.phone_work !== ''
                ? 'work'
                : props.selectedContact.phone_work_fax !== ''
                    ? 'fax'
                    : props.selectedContact.phone_mobile !== ''
                        ? 'mobile'
                        : props.selectedContact.phone_direct !== ''
                            ? 'direct'
                            : props.selectedContact.phone_other !== ''
                                ? 'other' : 'work';

            mailing_address.mailing_contact_primary_email = props.selectedContact.email_work !== ''
                ? 'work'
                : props.selectedContact.email_personal !== ''
                    ? 'personal'
                    : props.selectedContact.email_other !== ''
                        ? 'other' : 'work';

        } else if (props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1) > -1) {
            mailing_address.mailing_contact_id = props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].id;
            mailing_address.mailing_contact = props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)];

            mailing_address.mailing_contact_primary_phone = props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].phone_work !== ''
                ? 'work'
                : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].phone_work_fax !== ''
                    ? 'fax'
                    : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].phone_mobile !== ''
                        ? 'mobile'
                        : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].phone_direct !== ''
                            ? 'direct'
                            : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].phone_other !== ''
                                ? 'other' : 'work';

            mailing_address.mailing_contact_primary_email = props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].email_work !== ''
                ? 'work'
                : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].email_personal !== ''
                    ? 'personal'
                    : props.selectedCustomer.contacts[props.selectedCustomer.contacts.findIndex(x => x.is_primary === 1)].email_other !== ''
                        ? 'other' : 'work';

        } else if (props.selectedCustomer.contacts.length > 0) {
            mailing_address.mailing_contact_id = props.selectedCustomer.contacts[0].id;
            mailing_address.mailing_contact = props.selectedCustomer.contacts[0];

            mailing_address.mailing_contact_primary_phone = props.selectedCustomer.contacts[0].phone_work !== ''
                ? 'work'
                : props.selectedCustomer.contacts[0].phone_work_fax !== ''
                    ? 'fax'
                    : props.selectedCustomer.contacts[0].phone_mobile !== ''
                        ? 'mobile'
                        : props.selectedCustomer.contacts[0].phone_direct !== ''
                            ? 'direct'
                            : props.selectedCustomer.contacts[0].phone_other !== ''
                                ? 'other' : 'work';

            mailing_address.mailing_contact_primary_email = props.selectedCustomer.contacts[0].email_work !== ''
                ? 'work'
                : props.selectedCustomer.contacts[0].email_personal !== ''
                    ? 'personal'
                    : props.selectedCustomer.contacts[0].email_other !== ''
                        ? 'other' : 'work';

        } else {
            mailing_address.mailing_contact_id = 0;
            mailing_address.mailing_contact = {};
            mailing_address.mailing_contact_primary_phone = 'work';
            mailing_address.mailing_contact_primary_email = 'work';
        }

        props.setSelectedCustomer({ ...props.selectedCustomer, mailing_address: mailing_address });

        validateMailingAddressForSaving({ keyCode: 9 });
    }

    const mailingAddressClearBtn = () => {
        props.setSelectedCustomer({
            ...props.selectedCustomer,
            mailing_address: {}
        });

        validateCustomerForSaving({ keyCode: 9 });
        refCustomerMailingCode.current.focus();
    }

    const mailingAddressBillToBtn = () => {
        if ((props.selectedCustomer?.id || 0) === 0) {
            window.alert('You must select a customer first');
            return;
        }

        let customer = props.selectedCustomer || {};

        if ((customer.mailing_address?.bill_to_code || '') !== '') {
            customer.mailing_address = {
                ...customer.mailing_address,
                bill_to_code: '',
                bill_to_code_number: 0,
            }
        } else {
            if ((customer.mailing_address?.code || '') !== '') {
                customer.mailing_address = {
                    ...customer.mailing_address,
                    bill_to_code: (customer.mailing_address?.code || ''),
                    bill_to_code_number: (customer.mailing_address?.code_number || 0)
                }
            }
        }

        props.setSelectedCustomer(customer);

        validateMailingAddressForSaving({ keyCode: 9 });
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingContact) {
                setIsSavingContact(true);
            }
        }
    }

    const validateAutomaticEmailsForSaving = () => {
        if ((props.selectedCustomer?.id || 0) > 0) {
            let automatic_emails = props.selectedCustomer?.automatic_emails || {};

            automatic_emails = { ...automatic_emails, customer_id: props.selectedCustomer?.id };

            $.post(props.serverUrl + '/saveAutomaticEmails', automatic_emails).then(res => {
                if (res.result === 'OK') {
                    console.log(res);
                }
            });
        }
    }

    const isEmailValid = (email) => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(mailformat);
    }

    const validateHoursForSaving = (e, name) => {
        let formatted = getFormattedHours(e.target.value);
        let hours = { ...props.selectedCustomer?.hours || {}, customer_id: props.selectedCustomer?.id };

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

            if (moment(hour.trim(), 'h:ma').format('h:ma') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'h:ma').format('HHmm');
            }

            if (moment(hour.trim(), 'H:m').format('H:m') === hour.trim()) {
                formattedHour = moment(hour.trim(), 'H:m').format('HHmm');
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
            borderRadius: props.scale === 1 ? 0 : '20px',
            background: props.isOnPanel ? 'transparent' : 'rgb(250, 250, 250)',
            background: props.isOnPanel ? 'transparent' : '-moz-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : '-webkit-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : 'radial-gradient(ellipse at center, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            padding: props.isOnPanel ? '10px 0' : 10
        }}>
            <PanelContainer />
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
                                        ref={refCustomerCode}
                                        onKeyDown={searchCustomerByCode}
                                        onChange={e => { props.setSelectedCustomer({ ...props.selectedCustomer, code: e.target.value }) }}
                                        value={(props.selectedCustomer?.code || '') + ((props.selectedCustomer?.code_number || 0) === 0 ? '' : props.selectedCustomer.code_number)} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={2 + props.tabTimes} type="text" placeholder="Name"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, name: e.target.value })}
                                        value={props.selectedCustomer?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={3 + props.tabTimes} type="text" placeholder="Address 1"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, address1: e.target.value })}
                                        value={props.selectedCustomer?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={4 + props.tabTimes} type="text" placeholder="Address 2"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, address2: e.target.value })}
                                        value={props.selectedCustomer?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={5 + props.tabTimes} type="text" placeholder="City"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, city: e.target.value })}
                                        value={props.selectedCustomer?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={6 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, state: e.target.value })}
                                        value={props.selectedCustomer?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={7 + props.tabTimes} type="text" placeholder="Postal Code"
                                        onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, zip: e.target.value })}
                                        value={props.selectedCustomer?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={8 + props.tabTimes} type="text" placeholder="Contact Name"
                                        // onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, contact_name: e.target.value })}
                                        value={props.selectedCustomer?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        tabIndex={9 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, contact_phone: e.target.value })}
                                        value={props.selectedCustomer?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={10 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, ext: e.target.value })}
                                        value={props.selectedCustomer?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={11 + props.tabTimes}
                                        type="text"
                                        placeholder="E-Mail"
                                        style={{ textTransform: 'lowercase' }}
                                        onKeyDown={validateCustomerForSaving}
                                        onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, email: e.target.value })}
                                        value={props.selectedCustomer?.email || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col" style={{ display: 'flex', flexDirection: 'row' }}>
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
                                    <input tabIndex={18 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        ref={refCustomerMailingCode}
                                        readOnly={true}
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    code: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    code: e.target.value
                                                }
                                            })
                                        }}
                                        value={(props.selectedCustomer?.mailing_address?.code || '') + ((props.selectedCustomer?.mailing_address?.code_number || 0) === 0 ? '' : props.selectedCustomer?.mailing_address?.code_number)} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={19 + props.tabTimes} type="text" placeholder="Name"
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    name: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    name: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={20 + props.tabTimes} type="text" placeholder="Address 1"
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    address1: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    address1: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={21 + props.tabTimes} type="text" placeholder="Address 2"
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    address2: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    address2: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={22 + props.tabTimes} type="text" placeholder="City"
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    city: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    city: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={23 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    state: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    state: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={24 + props.tabTimes} type="text" placeholder="Postal Code"
                                        onKeyDown={validateMailingAddressForSaving}
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    zip: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    zip: e.target.value
                                                }
                                            })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        <input
                                            tabIndex={25 + props.tabTimes}
                                            type="text"
                                            placeholder="Contact Name"
                                            ref={refMailingContactName}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (showMailingContactNames) {
                                                            let selectedIndex = mailingContactNameItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactNameItems(mailingContactNameItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactNameItems(mailingContactNameItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (mailingContactNameItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactNamePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactNameItems.length > 1) {
                                                                await setMailingContactNameItems((props.selectedCustomer?.contacts || []).map((item, index) => {
                                                                    item.selected = index === 0
                                                                    return item;
                                                                }))

                                                                setShowMailingContactNames(true);

                                                                refMailingContactNamePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (showMailingContactNames) {
                                                            let selectedIndex = mailingContactNameItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactNameItems(mailingContactNameItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactNameItems(mailingContactNameItems.map((item, index) => {
                                                                    if (selectedIndex === (mailingContactNameItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactNamePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactNameItems.length > 1) {
                                                                await setMailingContactNameItems((props.selectedCustomer?.contacts || []).map((item, index) => {
                                                                    item.selected = index === 0
                                                                    return item;
                                                                }))

                                                                setShowMailingContactNames(true);

                                                                refMailingContactNamePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setShowMailingContactNames(false);
                                                        break;

                                                    case 13: // enter
                                                        if (showMailingContactNames && mailingContactNameItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer?.mailing_address,
                                                                    mailing_contact: mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)],
                                                                    mailing_contact_id: mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].id,
                                                                    mailing_contact_primary_phone: (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_work || '') !== ''
                                                                        ? 'work'
                                                                        : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_work_fax || '') !== ''
                                                                            ? 'fax'
                                                                            : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_mobile || '') !== ''
                                                                                ? 'mobile'
                                                                                : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_direct || '') !== ''
                                                                                    ? 'direct'
                                                                                    : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_other || '') !== ''
                                                                                        ? 'other' :
                                                                                        ''
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactNames(false);
                                                            refMailingContactName.current.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (showMailingContactNames) {
                                                            e.preventDefault();
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer?.mailing_address,
                                                                    mailing_contact: mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)],
                                                                    mailing_contact_id: mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].id,
                                                                    mailing_contact_primary_phone: (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_work || '') !== ''
                                                                        ? 'work'
                                                                        : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_work_fax || '') !== ''
                                                                            ? 'fax'
                                                                            : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_mobile || '') !== ''
                                                                                ? 'mobile'
                                                                                : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_direct || '') !== ''
                                                                                    ? 'direct'
                                                                                    : (mailingContactNameItems[mailingContactNameItems.findIndex(item => item.selected)].phone_other || '') !== ''
                                                                                        ? 'other' :
                                                                                        ''
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactNames(false);
                                                            refMailingContactName.current.focus();
                                                        } else {
                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={(e) => {
                                                // props.setSelectedCustomer({
                                                //     ...props.selectedCustomer,
                                                //     mailing_contact_name: e.target.value
                                                // })
                                            }}
                                            onChange={(e) => {
                                                // props.setSelectedCustomer({
                                                //     ...props.selectedCustomer,
                                                //     mailing_contact_name: e.target.value
                                                // })
                                            }}
                                            value={
                                                (props.selectedCustomer?.mailing_address?.mailing_contact?.first_name || '') +
                                                ((props.selectedCustomer?.mailing_address?.mailing_contact?.last_name || '') === ''
                                                    ? ''
                                                    : ' ' + props.selectedCustomer?.mailing_address?.mailing_contact?.last_name)
                                            }
                                        />

                                        {
                                            ((props.selectedCustomer?.contacts || []).length > 1 && (props.selectedCustomer?.mailing_address?.code || '') !== '') &&
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                                if (showMailingContactNames) {
                                                    setShowMailingContactNames(false);
                                                } else {
                                                    if ((props.selectedCustomer?.contacts || []).length > 1) {
                                                        await setMailingContactNameItems((props.selectedCustomer?.contacts || []).map((item, index) => {
                                                            item.selected = index === 0
                                                            return item;
                                                        }))

                                                        window.setTimeout(async () => {
                                                            await setShowMailingContactNames(true);

                                                            refMailingContactNamePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }, 0)
                                                    }
                                                }

                                                refMailingContactName.current.focus();
                                            }} />
                                        }
                                    </div>
                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={showMailingContactNames}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-contact-names"
                                                style={{
                                                    ...styles,
                                                    left: '0',
                                                    display: 'block'
                                                }}
                                                ref={refMailingContactNameDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                mailingContactNameItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedCustomer({
                                                                                    ...props.selectedCustomer,
                                                                                    mailing_address: {
                                                                                        ...props.selectedCustomer?.mailing_address,
                                                                                        mailing_contact: item,
                                                                                        mailing_contact_id: item.id,
                                                                                        mailing_contact_primary_phone: (item.phone_work || '') !== ''
                                                                                            ? 'work'
                                                                                            : (item.phone_work_fax || '') !== ''
                                                                                                ? 'fax'
                                                                                                : (item.phone_mobile || '') !== ''
                                                                                                    ? 'mobile'
                                                                                                    : (item.phone_direct || '') !== ''
                                                                                                        ? 'direct'
                                                                                                        : (item.phone_other || '') !== ''
                                                                                                            ? 'other' :
                                                                                                            ''
                                                                                    }
                                                                                });

                                                                                validateMailingAddressForSaving({ keyCode: 9 });
                                                                                setShowMailingContactNames(false);
                                                                                refMailingContactName.current.focus();
                                                                            }}
                                                                            ref={ref => refMailingContactNamePopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                item.first_name + ((item.last_name || '') === '' ? '' : ' ' + item.last_name)
                                                                            }

                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>

                                {/* <div className="input-box-container grow">
                                    <input tabIndex={25 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_contact_name: e.target.value })} value={props.selectedCustomer?.mailing_contact_name || ''} />
                                </div> */}
                                <div className="form-h-sep"></div>
                                <div className="select-box-container input-phone">
                                    <div className="select-box-wrapper">
                                        <MaskedInput tabIndex={26 + props.tabTimes}
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text"
                                            placeholder="Contact Phone"
                                            ref={refMailingContactPhone}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (showMailingContactPhones) {
                                                            let selectedIndex = mailingContactPhoneItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (mailingContactPhoneItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactPhoneItems.length > 1) {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                setShowMailingContactPhones(true);

                                                                refMailingContactPhonePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (showMailingContactPhones) {
                                                            let selectedIndex = mailingContactPhoneItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    if (selectedIndex === (mailingContactPhoneItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactPhoneItems.length > 1) {
                                                                await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                setShowMailingContactPhones(true);

                                                                refMailingContactPhonePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setShowMailingContactPhones(false);
                                                        break;

                                                    case 13: // enter
                                                        if (showMailingContactPhones && mailingContactPhoneItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer.mailing_address,
                                                                    mailing_contact_primary_phone: mailingContactPhoneItems[mailingContactPhoneItems.findIndex(item => item.selected)].type
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactPhones(false);
                                                            refMailingContactPhone.current.inputElement.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (showMailingContactPhones) {
                                                            e.preventDefault();
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer.mailing_address,
                                                                    mailing_contact_primary_phone: mailingContactPhoneItems[mailingContactPhoneItems.findIndex(item => item.selected)].type
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactPhones(false);
                                                            refMailingContactPhone.current.inputElement.focus();
                                                        } else {
                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={(e) => {
                                                // props.setSelectedCustomer({
                                                //     ...props.selectedCustomer,
                                                //     mailing_contact_phone: e.target.value
                                                // });
                                            }}
                                            onChange={(e) => {
                                                // props.setSelectedCustomer({
                                                //     ...props.selectedCustomer,
                                                //     mailing_contact_phone: e.target.value
                                                // });
                                            }}
                                            value={
                                                (props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                                    ? (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work || '')
                                                    : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                                        ? (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                                        : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                            ? (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                            : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                                ? (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_direct || '')
                                                                : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                                    ? (props.selectedCustomer?.mailing_address?.mailing_contact?.phone_other || '')
                                                                    : ''
                                            }
                                        />

                                        {
                                            ((props.selectedCustomer?.id || 0) > 0 && (props.selectedCustomer?.mailing_address?.code || '') !== '') &&
                                            <div
                                                className={classnames({
                                                    'selected-mailing-contact-primary-phone': true,
                                                    'pushed': (mailingContactPhoneItems.length > 1)
                                                })}>
                                                {props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || ''}
                                            </div>
                                        }

                                        {
                                            mailingContactPhoneItems.length > 1 &&
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                                if (showMailingContactPhones) {
                                                    setShowMailingContactPhones(false);
                                                } else {
                                                    if (mailingContactPhoneItems.length > 1) {
                                                        await setMailingContactPhoneItems(mailingContactPhoneItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))

                                                        window.setTimeout(async () => {
                                                            await setShowMailingContactPhones(true);

                                                            refMailingContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }, 0)
                                                    }
                                                }

                                                refMailingContactPhone.current.inputElement.focus();
                                            }} />
                                        }
                                    </div>
                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={showMailingContactPhones}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-contact-phone"
                                                style={{
                                                    ...styles,
                                                    left: '0',
                                                    display: 'block'
                                                }}
                                                ref={refMailingContactPhoneDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                mailingContactPhoneItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedCustomer({
                                                                                    ...props.selectedCustomer,
                                                                                    mailing_address: {
                                                                                        ...props.selectedCustomer?.mailing_address,
                                                                                        mailing_contact_primary_phone: item.type
                                                                                    }
                                                                                });

                                                                                validateMailingAddressForSaving({ keyCode: 9 });
                                                                                setShowMailingContactPhones(false);
                                                                                refMailingContactPhone.current.inputElement.focus();
                                                                            }}
                                                                            ref={ref => refMailingContactPhonePopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                item.type === 'work' ? `Phone Work `
                                                                                    : item.type === 'fax' ? `Phone Work Fax `
                                                                                        : item.type === 'mobile' ? `Phone Mobile `
                                                                                            : item.type === 'direct' ? `Phone Direct `
                                                                                                : item.type === 'other' ? `Phone Other ` : ''
                                                                            }

                                                                            (<b>
                                                                                {
                                                                                    item.type === 'work' ? item.phone
                                                                                        : item.type === 'fax' ? item.phone
                                                                                            : item.type === 'mobile' ? item.phone
                                                                                                : item.type === 'direct' ? item.phone
                                                                                                    : item.type === 'other' ? item.phone : ''
                                                                                }
                                                                            </b>)

                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>

                                {/* <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={26 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCustomerForSaving} onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_contact_phone: e.target.value })} value={props.selectedCustomer?.mailing_contact_phone || ''} />
                                </div> */}
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={27 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateMailingAddressForSaving}
                                        onChange={e => {
                                            // props.setSelectedCustomer({ ...props.selectedCustomer, mailing_ext: e.target.value })
                                        }}
                                        value={props.selectedCustomer?.mailing_address?.mailing_contact?.phone_ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        <input tabIndex={28 + props.tabTimes} type="text" placeholder="E-Mail"
                                            ref={refMailingContactEmail}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (showMailingContactEmails) {
                                                            let selectedIndex = mailingContactEmailItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (mailingContactEmailItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactEmailItems.length > 1) {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                setShowMailingContactEmails(true);

                                                                refMailingContactEmailPopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (showMailingContactEmails) {
                                                            let selectedIndex = mailingContactEmailItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    if (selectedIndex === (mailingContactEmailItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refMailingContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (mailingContactEmailItems.length > 1) {
                                                                await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                setShowMailingContactEmails(true);

                                                                refMailingContactEmailPopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setShowMailingContactEmails(false);
                                                        break;

                                                    case 13: // enter
                                                        if (showMailingContactEmails && mailingContactEmailItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer?.mailing_address,
                                                                    mailing_contact_primary_email: mailingContactEmailItems[mailingContactEmailItems.findIndex(item => item.selected)].type
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactEmails(false);
                                                            refMailingContactEmail.current.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (showMailingContactEmails) {
                                                            e.preventDefault();
                                                            await props.setSelectedCustomer({
                                                                ...props.selectedCustomer,
                                                                mailing_address: {
                                                                    ...props.selectedCustomer?.mailing_address,
                                                                    mailing_contact_primary_email: mailingContactEmailItems[mailingContactEmailItems.findIndex(item => item.selected)].type
                                                                }
                                                            });

                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                            setShowMailingContactEmails(false);
                                                            refMailingContactEmail.current.focus();
                                                        } else {
                                                            validateMailingAddressForSaving({ keyCode: 9 });
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            // onChange={e => props.setSelectedCustomer({ ...props.selectedCustomer, mailing_email: e.target.value })}
                                            value={
                                                (props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                                    ? (props.selectedCustomer?.mailing_address?.mailing_contact?.email_work || '')
                                                    : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                                        ? (props.selectedCustomer?.mailing_address?.mailing_contact?.email_personal || '')
                                                        : (props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                                            ? (props.selectedCustomer?.mailing_address?.mailing_contact?.email_other || '')
                                                            : ''
                                            }
                                        />

                                        {
                                            ((props.selectedCustomer?.id || 0) > 0 && (props.selectedCustomer?.mailing_address?.code || '') !== '') &&
                                            <div
                                                className={classnames({
                                                    'selected-mailing-contact-primary-email': true,
                                                    'pushed': (mailingContactEmailItems.length > 1)
                                                })}>
                                                {props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || ''}
                                            </div>
                                        }

                                        {
                                            mailingContactEmailItems.length > 1 &&
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                                if (showMailingContactEmails) {
                                                    setShowMailingContactEmails(false);
                                                } else {
                                                    if (mailingContactEmailItems.length > 1) {
                                                        await setMailingContactEmailItems(mailingContactEmailItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))

                                                        window.setTimeout(async () => {
                                                            await setShowMailingContactEmails(true);

                                                            refMailingContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }, 0)
                                                    }
                                                }

                                                refMailingContactEmail.current.focus();
                                            }} />
                                        }
                                    </div>
                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={showMailingContactEmails}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-contact-email"
                                                style={{
                                                    ...styles,
                                                    left: '0',
                                                    display: 'block'
                                                }}
                                                ref={refMailingContactEmailDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                mailingContactEmailItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedCustomer({
                                                                                    ...props.selectedCustomer,
                                                                                    mailing_address: {
                                                                                        ...props.selectedCustomer?.mailing_address,
                                                                                        mailing_contact_primary_email: item.type
                                                                                    }
                                                                                });

                                                                                validateMailingAddressForSaving({ keyCode: 9 });
                                                                                setShowMailingContactEmails(false);
                                                                                refMailingContactEmail.current.focus();
                                                                            }}
                                                                            ref={ref => refMailingContactEmailPopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                item.type === 'work' ? `Email Work `
                                                                                    : item.type === 'personal' ? `Email Personal `
                                                                                        : item.type === 'other' ? `Email Other ` : ''
                                                                            }

                                                                            (<b>
                                                                                {
                                                                                    item.type === 'work' ? item.email
                                                                                        : item.type === 'personal' ? item.email
                                                                                            : item.type === 'other' ? item.email : ''
                                                                                }
                                                                            </b>)

                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                            </div>
                        </div>

                        <div className="form-borderless-box" style={{ width: '170px', marginLeft: '10px', }}>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={32 + props.tabTimes} type="text" style={{ textTransform: 'uppercase' }} placeholder="Bill To"
                                        readOnly={false}
                                        onInput={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    bill_to_code: e.target.value
                                                }
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer,
                                                mailing_address: {
                                                    ...props.selectedCustomer?.mailing_address,
                                                    bill_to_code: e.target.value
                                                }
                                            })
                                        }}
                                        value={(props.selectedCustomer?.mailing_address?.bill_to_code || '') + ((props.selectedCustomer?.mailing_address?.bill_to_code_number || 0) === 0 ? '' : props.selectedCustomer?.mailing_address?.bill_to_code_number)} />
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
                                        if (props.selectedCustomer?.id === undefined) {
                                            window.alert('You must select a contact first!');
                                            return;
                                        }

                                        if (props.selectedContact.id === undefined) {
                                            window.alert('You must select a contact');
                                            return;
                                        }

                                        await props.setIsEditingContact(false);
                                        await props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: props.selectedContact });

                                        if (!props.openedPanels.includes(props.customerContactsPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.customerContactsPanelName]);
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer?.id === undefined) {
                                            window.alert('You must select a customer');
                                            return;
                                        }

                                        props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: { id: 0, customer_id: props.selectedCustomer?.id } });
                                        props.setIsEditingContact(true);

                                        if (!props.openedPanels.includes(props.customerContactsPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.customerContactsPanelName]);
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        props.setSelectedContact({});
                                        refCustomerContactFirstName.current.focus();
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={12 + props.tabTimes} type="text" placeholder="First Name"
                                        ref={refCustomerContactFirstName}
                                        // onKeyDown={validateContactForSaving} 
                                        onChange={e => {
                                            props.setSelectedContact({ ...props.selectedContact, first_name: e.target.value })
                                        }}
                                        value={props.selectedContact.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={13 + props.tabTimes} type="text" placeholder="Last Name"
                                        // onKeyDown={validateContactForSaving} 
                                        onChange={e => props.setSelectedContact({ ...props.selectedContact, last_name: e.target.value })}
                                        value={props.selectedContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ width: '50%' }}>
                                    <div className="select-box-wrapper">
                                        <MaskedInput tabIndex={14 + props.tabTimes}
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text"
                                            placeholder="Phone"
                                            ref={refCustomerContactPhone}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (showCustomerContactPhones) {
                                                            let selectedIndex = customerContactPhoneItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (customerContactPhoneItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refCustomerContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (customerContactPhoneItems.length > 1) {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                                    return item;
                                                                }))

                                                                setShowCustomerContactPhones(true);

                                                                refCustomerContactPhonePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (showCustomerContactPhones) {
                                                            let selectedIndex = customerContactPhoneItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    if (selectedIndex === (customerContactPhoneItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refCustomerContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (customerContactPhoneItems.length > 1) {
                                                                await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                                    item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                                    return item;
                                                                }))

                                                                setShowCustomerContactPhones(true);

                                                                refCustomerContactPhonePopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setShowCustomerContactPhones(false);
                                                        break;

                                                    case 13: // enter
                                                        if (showCustomerContactPhones && customerContactPhoneItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedContact({
                                                                ...props.selectedContact,
                                                                primary_phone: customerContactPhoneItems[customerContactPhoneItems.findIndex(item => item.selected)].type
                                                            });

                                                            validateContactForSaving({ keyCode: 9 });
                                                            setShowCustomerContactPhones(false);
                                                            refCustomerContactPhone.current.inputElement.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (showCustomerContactPhones) {
                                                            e.preventDefault();
                                                            await props.setSelectedContact({
                                                                ...props.selectedContact,
                                                                primary_phone: customerContactPhoneItems[customerContactPhoneItems.findIndex(item => item.selected)].type
                                                            });

                                                            validateContactForSaving({ keyCode: 9 });
                                                            setShowCustomerContactPhones(false);
                                                            refCustomerContactPhone.current.inputElement.focus();
                                                        } else {
                                                            validateContactForSaving({ keyCode: 9 });
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={(e) => {
                                                if ((props.selectedContact?.id || 0) === 0) {
                                                    props.setSelectedContact({
                                                        ...props.selectedContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    if ((props.selectedContact?.primary_phone || '') === '') {
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            phone_work: e.target.value,
                                                            primary_phone: 'work'
                                                        });
                                                    } else {
                                                        switch (props.selectedContact?.primary_phone) {
                                                            case 'work':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_work: e.target.value
                                                                });
                                                                break;
                                                            case 'fax':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_work_fax: e.target.value
                                                                });
                                                                break;
                                                            case 'mobile':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_mobile: e.target.value
                                                                });
                                                                break;
                                                            case 'direct':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_direct: e.target.value
                                                                });
                                                                break;
                                                            case 'other':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_other: e.target.value
                                                                });
                                                                break;
                                                        }
                                                    }
                                                }
                                            }}
                                            onChange={(e) => {
                                                if ((props.selectedContact?.id || 0) === 0) {
                                                    props.setSelectedContact({
                                                        ...props.selectedContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    if ((props.selectedContact?.primary_phone || '') === '') {
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            phone_work: e.target.value,
                                                            primary_phone: 'work'
                                                        });
                                                    } else {
                                                        switch (props.selectedContact?.primary_phone) {
                                                            case 'work':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_work: e.target.value
                                                                });
                                                                break;
                                                            case 'fax':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_work_fax: e.target.value
                                                                });
                                                                break;
                                                            case 'mobile':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_mobile: e.target.value
                                                                });
                                                                break;
                                                            case 'direct':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_direct: e.target.value
                                                                });
                                                                break;
                                                            case 'other':
                                                                props.setSelectedContact({
                                                                    ...props.selectedContact,
                                                                    phone_other: e.target.value
                                                                });
                                                                break;
                                                        }
                                                    }
                                                }
                                            }}
                                            value={
                                                (props.selectedContact?.primary_phone || '') === 'work'
                                                    ? (props.selectedContact?.phone_work || '')
                                                    : (props.selectedContact?.primary_phone || '') === 'fax'
                                                        ? (props.selectedContact?.phone_work_fax || '')
                                                        : (props.selectedContact?.primary_phone || '') === 'mobile'
                                                            ? (props.selectedContact?.phone_mobile || '')
                                                            : (props.selectedContact?.primary_phone || '') === 'direct'
                                                                ? (props.selectedContact?.phone_direct || '')
                                                                : (props.selectedContact?.primary_phone || '') === 'other'
                                                                    ? (props.selectedContact?.phone_other || '')
                                                                    : ''
                                            }
                                        />

                                        {
                                            (props.selectedContact?.id || 0) > 0 &&
                                            <div
                                                className={classnames({
                                                    'selected-customer-contact-primary-phone': true,
                                                    'pushed': (customerContactPhoneItems.length > 1)
                                                })}>
                                                {props.selectedContact?.primary_phone || ''}
                                            </div>
                                        }

                                        {
                                            customerContactPhoneItems.length > 1 &&
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                                if (showCustomerContactPhones) {
                                                    setShowCustomerContactPhones(false);
                                                } else {
                                                    if (customerContactPhoneItems.length > 1) {
                                                        await setCustomerContactPhoneItems(customerContactPhoneItems.map((item, index) => {
                                                            item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                            return item;
                                                        }))

                                                        window.setTimeout(async () => {
                                                            await setShowCustomerContactPhones(true);

                                                            refCustomerContactPhonePopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }, 0)
                                                    }
                                                }

                                                refCustomerContactPhone.current.inputElement.focus();
                                            }} />
                                        }
                                    </div>
                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={showCustomerContactPhones}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-contact-phone"
                                                style={{
                                                    ...styles,
                                                    left: '0',
                                                    display: 'block'
                                                }}
                                                ref={refCustomerContactPhoneDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                customerContactPhoneItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedContact({
                                                                                    ...props.selectedContact,
                                                                                    primary_phone: item.type
                                                                                });

                                                                                validateContactForSaving({ keyCode: 9 });
                                                                                setShowCustomerContactPhones(false);
                                                                                refCustomerContactPhone.current.inputElement.focus();
                                                                            }}
                                                                            ref={ref => refCustomerContactPhonePopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                item.type === 'work' ? `Phone Work `
                                                                                    : item.type === 'fax' ? `Phone Work Fax `
                                                                                        : item.type === 'mobile' ? `Phone Mobile `
                                                                                            : item.type === 'direct' ? `Phone Direct `
                                                                                                : item.type === 'other' ? `Phone Other ` : ''
                                                                            }

                                                                            (<b>
                                                                                {
                                                                                    item.type === 'work' ? item.phone
                                                                                        : item.type === 'fax' ? item.phone
                                                                                            : item.type === 'mobile' ? item.phone
                                                                                                : item.type === 'direct' ? item.phone
                                                                                                    : item.type === 'other' ? item.phone : ''
                                                                                }
                                                                            </b>)

                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input tabIndex={15 + props.tabTimes} type="text" placeholder="Ext"
                                            onKeyDown={validateContactForSaving}
                                            onChange={e => props.setSelectedContact({ ...props.selectedContact, phone_ext: e.target.value })}
                                            value={props.selectedContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id={props.panelName + '-cbox-customer-contacts-primary-btn'}
                                            onChange={(e) => {
                                                props.setSelectedContact({ ...props.selectedContact, is_primary: e.target.checked ? 1 : 0 });
                                                validateContactForSaving({ keyCode: 9 });
                                            }}
                                            checked={(props.selectedContact.is_primary || 0) === 1} />
                                        <label htmlFor={props.panelName + '-cbox-customer-contacts-primary-btn'}>
                                            <div className="label-text">Primary</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        <input
                                            style={{
                                                width: 'calc(100% - 25px)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                            tabIndex={16 + props.tabTimes}
                                            type="text"
                                            placeholder="E-Mail"
                                            ref={refCustomerContactEmail}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (showCustomerContactEmails) {
                                                            let selectedIndex = customerContactEmailItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (customerContactEmailItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refCustomerContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (customerContactEmailItems.length > 1) {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                                    return item;
                                                                }))

                                                                setShowCustomerContactEmails(true);

                                                                refCustomerContactEmailPopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (showCustomerContactEmails) {
                                                            let selectedIndex = customerContactEmailItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    if (selectedIndex === (customerContactEmailItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refCustomerContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        } else {
                                                            if (customerContactEmailItems.length > 1) {
                                                                await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                                    item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                                    return item;
                                                                }))

                                                                setShowCustomerContactEmails(true);

                                                                refCustomerContactEmailPopupItems.current.map((r, i) => {
                                                                    if (r && r.classList.contains('selected')) {
                                                                        r.scrollIntoView({
                                                                            behavior: 'auto',
                                                                            block: 'center',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }
                                                                    return true;
                                                                });
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setShowCustomerContactEmails(false);
                                                        break;

                                                    case 13: // enter
                                                        if (showCustomerContactEmails && customerContactEmailItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedContact({
                                                                ...props.selectedContact,
                                                                primary_email: customerContactEmailItems[customerContactEmailItems.findIndex(item => item.selected)].type
                                                            });

                                                            validateContactForSaving({ keyCode: 9 });
                                                            setShowCustomerContactEmails(false);
                                                            refCustomerContactEmail.current.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (showCustomerContactEmails) {
                                                            e.preventDefault();
                                                            await props.setSelectedContact({
                                                                ...props.selectedContact,
                                                                primary_email: customerContactEmailItems[customerContactEmailItems.findIndex(item => item.selected)].type
                                                            });

                                                            validateContactForSaving({ keyCode: 9 });
                                                            setShowCustomerContactEmails(false);
                                                            refCustomerContactEmail.current.focus();
                                                        } else {
                                                            validateContactForSaving({ keyCode: 9 });
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={(e) => {
                                                switch (props.selectedContact?.primary_email) {
                                                    case 'work':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_work: e.target.value
                                                        });
                                                        break;
                                                    case 'personal':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_personal: e.target.value
                                                        });
                                                        break;
                                                    case 'other':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_other: e.target.value
                                                        });
                                                        break;
                                                }
                                            }}
                                            onChange={(e) => {
                                                switch (props.selectedContact?.primary_email) {
                                                    case 'work':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_work: e.target.value
                                                        });
                                                        break;
                                                    case 'personal':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_personal: e.target.value
                                                        });
                                                        break;
                                                    case 'other':
                                                        props.setSelectedContact({
                                                            ...props.selectedContact,
                                                            email_other: e.target.value
                                                        });
                                                        break;
                                                }
                                            }}
                                            value={
                                                (props.selectedContact?.primary_email || '') === 'work'
                                                    ? (props.selectedContact?.email_work || '')
                                                    : (props.selectedContact?.primary_email || '') === 'personal'
                                                        ? (props.selectedContact?.email_personal || '')
                                                        : (props.selectedContact?.primary_email || '') === 'other'
                                                            ? (props.selectedContact?.email_other || '')
                                                            : ''
                                            }
                                        />

                                        {
                                            (props.selectedContact?.id || 0) > 0 &&
                                            <div
                                                className={classnames({
                                                    'selected-customer-contact-primary-email': true,
                                                    'pushed': (customerContactEmailItems.length > 1)
                                                })}>
                                                {props.selectedContact?.primary_email || ''}
                                            </div>
                                        }

                                        {
                                            customerContactEmailItems.length > 1 &&
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                                if (showCustomerContactEmails) {
                                                    setShowCustomerContactEmails(false);
                                                } else {
                                                    if (customerContactEmailItems.length > 1) {
                                                        await setCustomerContactEmailItems(customerContactEmailItems.map((item, index) => {
                                                            item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                            return item;
                                                        }))

                                                        window.setTimeout(async () => {
                                                            await setShowCustomerContactEmails(true);

                                                            refCustomerContactEmailPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }, 0)
                                                    }
                                                }

                                                refCustomerContactEmail.current.focus();
                                            }} />
                                        }
                                    </div>
                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={showCustomerContactEmails}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-contact-email"
                                                style={{
                                                    ...styles,
                                                    left: '0',
                                                    display: 'block'
                                                }}
                                                ref={refCustomerContactEmailDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                customerContactEmailItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedContact({
                                                                                    ...props.selectedContact,
                                                                                    primary_email: item.type
                                                                                });

                                                                                validateContactForSaving({ keyCode: 9 });
                                                                                setShowCustomerContactEmails(false);
                                                                                refCustomerContactEmail.current.focus();
                                                                            }}
                                                                            ref={ref => refCustomerContactEmailPopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                item.type === 'work' ? `Email Work `
                                                                                    : item.type === 'personal' ? `Email Personal `
                                                                                        : item.type === 'other' ? `Email Other ` : ''
                                                                            }

                                                                            (<b>
                                                                                {
                                                                                    item.type === 'work' ? item.email
                                                                                        : item.type === 'personal' ? item.email
                                                                                            : item.type === 'other' ? item.email : ''
                                                                                }
                                                                            </b>)

                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={17 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
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
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        {
                                            (props.selectedCustomer?.automatic_emails?.automatic_emails_to || '').split(';').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item.split('|');

                                                    return (
                                                        <div key={index} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: '0.7rem',
                                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                                            padding: '2px 10px',
                                                            borderRadius: '10px',
                                                            marginRight: '2px',
                                                            cursor: 'default',
                                                            width: 'auto'
                                                        }} title={item}>
                                                            <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    let automatic_emails = props.selectedCustomer?.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.replace(item.toString(), '').trim();
                                                                    automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.replace(';;', ';').trim();

                                                                    let checkingStart = true;
                                                                    let checkingEnd = true;

                                                                    while (checkingStart) {
                                                                        if (automatic_emails.automatic_emails_to.substr(0, 1) === ';') {
                                                                            automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.slice(1);
                                                                        } else {
                                                                            checkingStart = false;
                                                                        }
                                                                    }

                                                                    while (checkingEnd) {
                                                                        if (automatic_emails.automatic_emails_to.substr(-1) === ';') {
                                                                            automatic_emails.automatic_emails_to = automatic_emails.automatic_emails_to.slice(0, -1);
                                                                        } else {
                                                                            checkingEnd = false;
                                                                        }
                                                                    }

                                                                    props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
                                                                    validateAutomaticEmailsForSaving();
                                                                }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{
                                                                textToShow.length > 0
                                                                    ? textToShow[1] !== ''
                                                                        ? textToShow[1] // name
                                                                        : textToShow[0] // email
                                                                    : textToShow[0] // email or blank
                                                            }</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }
                                        <input type="text"
                                            tabIndex={29 + props.tabTimes}
                                            placeholder="E-mail To"
                                            ref={refAutomaticEmailsTo}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;
                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };
                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (emailToDropdownItems.length > 0) {
                                                            let selectedIndex = emailToDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailToDropdownItems(emailToDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailToDropdownItems(emailToDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (emailToDropdownItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailToPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (emailToDropdownItems.length > 0) {
                                                            let selectedIndex = emailToDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailToDropdownItems(emailToDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailToDropdownItems(emailToDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === (emailToDropdownItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailToPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setEmailToDropdownItems([]);
                                                        break;

                                                    case 13: // enter
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailToDropdownItems.length > 0 && emailToDropdownItems.findIndex(item => item.selected) > -1) {
                                                            let item = emailToDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailToDropdownItems([]);
                                                                refAutomaticEmailsTo.current.focus();
                                                            }
                                                        } else if (emailToDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsTo || ''))) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ';' + (props.automaticEmailsTo + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailToDropdownItems([]);
                                                                refAutomaticEmailsTo.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailToDropdownItems.length > 0) {
                                                            let item = emailToDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailToDropdownItems([]);
                                                                refAutomaticEmailsTo.current.focus();
                                                            }
                                                        } else if (emailToDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsTo || ''))) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ';' + (props.automaticEmailsTo + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailToDropdownItems([]);
                                                                refAutomaticEmailsTo.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={async (e) => {
                                                await props.setAutomaticEmailsTo(e.target.value);

                                                if ((props.selectedCustomer?.id || 0) > 0) {
                                                    if (e.target.value.trim() === '') {
                                                        setEmailToDropdownItems([]);
                                                    } else {
                                                        $.post(props.serverUrl + '/getContactsByEmailOrName', {
                                                            email: e.target.value.trim(),
                                                            customer_id: props.selectedCustomer?.id
                                                        }).then(async res => {
                                                            if (res.result === 'OK') {
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


                                                                await setEmailToDropdownItems(e.target.value.trim() === '' ? [] : items);
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting emails', e);
                                                        })
                                                    }
                                                }
                                            }}
                                            onChange={async (e) => { await props.setAutomaticEmailsTo(e.target.value) }}
                                            value={props.automaticEmailsTo || ''}
                                        />
                                    </div>

                                    <Transition
                                        from={{ opacity: 0, top: 0, }}
                                        enter={{ opacity: 1, top: 5, }}
                                        leave={{ opacity: 0, top: 0, }}
                                        items={emailToDropdownItems.length > 0}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-email-to"
                                                style={{
                                                    ...styles,
                                                    left: 'calc(100%)',
                                                    display: 'block'
                                                }}
                                                ref={refEmailToDropDown}
                                            >
                                                <div className="mochi-contextual-popup left high corner" style={{ height: 200 }}>
                                                    <div className="mochi-contextual-popup-content"  >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                emailToDropdownItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = props.automaticEmailsTo || '';

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                                                if (item.email !== '' && isEmailValid(item.email)) {
                                                                                    automaticEmails = { ...automaticEmails, automatic_emails_to: ((automaticEmails.automatic_emails_to || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                                    await props.setAutomaticEmailsTo('');

                                                                                    await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                                    $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                                        if (res.result === 'OK') {
                                                                                            console.log(res);
                                                                                        }
                                                                                    });

                                                                                    setEmailToDropdownItems([]);
                                                                                    refAutomaticEmailsTo.current.focus();
                                                                                }
                                                                            }}
                                                                            ref={ref => refEmailToPopupItems.current.push(ref)}
                                                                        >
                                                                            {item.name} (<b>{item.email}</b>)
                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-booked-load-btn'}
                                        onChange={e => {
                                            console.log('here');
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_booked_load = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_booked_load || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-booked-load-btn'}>
                                        <div className="label-text">Booked Load</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-check-calls-btn'}
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_check_calls = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_check_calls || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-check-calls-btn'}>
                                        <div className="label-text">Check Calls</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        {
                                            (props.selectedCustomer?.automatic_emails?.automatic_emails_cc || '').split(';').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item.split('|');

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
                                                                    let automatic_emails = props.selectedCustomer?.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.replace(item.toString(), '').trim();

                                                                    automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.replace(';;', ';').trim();

                                                                    let checkingStart = true;
                                                                    let checkingEnd = true;

                                                                    while (checkingStart) {
                                                                        if (automatic_emails.automatic_emails_cc.substr(0, 1) === ';') {
                                                                            automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.slice(1);
                                                                        } else {
                                                                            checkingStart = false;
                                                                        }
                                                                    }

                                                                    while (checkingEnd) {
                                                                        if (automatic_emails.automatic_emails_cc.substr(-1) === ';') {
                                                                            automatic_emails.automatic_emails_cc = automatic_emails.automatic_emails_cc.slice(0, -1);
                                                                        } else {
                                                                            checkingEnd = false;
                                                                        }
                                                                    }

                                                                    props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
                                                                    validateAutomaticEmailsForSaving();
                                                                }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{
                                                                textToShow.length > 0
                                                                    ? textToShow[1] !== ''
                                                                        ? textToShow[1] // name
                                                                        : textToShow[0] // email
                                                                    : textToShow[0] // email or blank
                                                            }</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }
                                        <input type="text"
                                            tabIndex={30 + props.tabTimes}
                                            placeholder="E-mail Cc"
                                            ref={refAutomaticEmailsCc}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;
                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };
                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (emailCcDropdownItems.length > 0) {
                                                            let selectedIndex = emailCcDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailCcDropdownItems(emailCcDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailCcDropdownItems(emailCcDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (emailCcDropdownItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailCcPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (emailCcDropdownItems.length > 0) {
                                                            let selectedIndex = emailCcDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailCcDropdownItems(emailCcDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailCcDropdownItems(emailCcDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === (emailCcDropdownItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailCcPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setEmailCcDropdownItems([]);
                                                        break;

                                                    case 13: // enter
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailCcDropdownItems.length > 0 && emailCcDropdownItems.findIndex(item => item.selected) > -1) {
                                                            let item = emailCcDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsCc('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailCcDropdownItems([]);
                                                                refAutomaticEmailsCc.current.focus();
                                                            }
                                                        } else if (emailToDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsCc || ''))) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ';' + (props.automaticEmailsCc + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailCcDropdownItems([]);
                                                                refAutomaticEmailsCc.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailCcDropdownItems.length > 0) {
                                                            let item = emailCcDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsCc('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailCcDropdownItems([]);
                                                                refAutomaticEmailsCc.current.focus();
                                                            }
                                                        } else if (emailToDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsCc || ''))) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ';' + (props.automaticEmailsCc + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailCcDropdownItems([]);
                                                                refAutomaticEmailsCc.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={async (e) => {
                                                await props.setAutomaticEmailsCc(e.target.value);

                                                if ((props.selectedCustomer?.id || 0) > 0) {
                                                    if (e.target.value.trim() === '') {
                                                        setEmailCcDropdownItems([]);
                                                    } else {
                                                        $.post(props.serverUrl + '/getContactsByEmailOrName', {
                                                            email: e.target.value.trim(),
                                                            customer_id: props.selectedCustomer?.id
                                                        }).then(async res => {
                                                            if (res.result === 'OK') {
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


                                                                await setEmailCcDropdownItems(e.target.value.trim() === '' ? [] : items);
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting emails', e);
                                                        })
                                                    }
                                                }
                                            }}
                                            onChange={async (e) => { await props.setAutomaticEmailsCc(e.target.value) }}
                                            value={props.automaticEmailsCc || ''}
                                        />
                                    </div>

                                    <Transition
                                        from={{ opacity: 0, top: 0, }}
                                        enter={{ opacity: 1, top: 5, }}
                                        leave={{ opacity: 0, top: 0, }}
                                        items={emailCcDropdownItems.length > 0}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-email-cc"
                                                style={{
                                                    ...styles,
                                                    left: 'calc(100%)',
                                                    display: 'block'
                                                }}
                                                ref={refEmailCcDropDown}
                                            >
                                                <div className="mochi-contextual-popup left high corner" style={{ height: 200 }}>
                                                    <div className="mochi-contextual-popup-content"  >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                emailCcDropdownItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = props.automaticEmailsCc || '';

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                                                if (item.email !== '' && isEmailValid(item.email)) {
                                                                                    automaticEmails = { ...automaticEmails, automatic_emails_cc: ((automaticEmails.automatic_emails_cc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                                    await props.setAutomaticEmailsCc('');

                                                                                    await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                                    $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                                        if (res.result === 'OK') {
                                                                                            console.log(res);
                                                                                        }
                                                                                    });

                                                                                    setEmailCcDropdownItems([]);
                                                                                    refAutomaticEmailsCc.current.focus();
                                                                                }
                                                                            }}
                                                                            ref={ref => refEmailCcPopupItems.current.push(ref)}
                                                                        >
                                                                            {item.name} (<b>{item.email}</b>)
                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-carrier-arrival-shipper-btn'}
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_shipper = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_carrier_arrival_shipper || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-carrier-arrival-shipper-btn'}>
                                        <div className="label-text">Carrier Arrival Shipper</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-carrier-arrival-consignee-btn'}
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_carrier_arrival_consignee = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_carrier_arrival_consignee || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-carrier-arrival-consignee-btn'}>
                                        <div className="label-text">Carrier Arrival Consignee</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="select-box-container" style={{ flexGrow: 1 }}>
                                    <div className="select-box-wrapper">
                                        {
                                            (props.selectedCustomer?.automatic_emails?.automatic_emails_bcc || '').split(';').map((item, index) => {
                                                if (item.trim() !== '') {
                                                    let textToShow = item.split('|');

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
                                                                    let automatic_emails = props.selectedCustomer?.automatic_emails || {};
                                                                    automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.replace(item.toString(), '').trim();
                                                                    automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.replace(';;', ';').trim();

                                                                    let checkingStart = true;
                                                                    let checkingEnd = true;

                                                                    while (checkingStart) {
                                                                        if (automatic_emails.automatic_emails_bcc.substr(0, 1) === ';') {
                                                                            automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.slice(1);
                                                                        } else {
                                                                            checkingStart = false;
                                                                        }
                                                                    }

                                                                    while (checkingEnd) {
                                                                        if (automatic_emails.automatic_emails_bcc.substr(-1) === ';') {
                                                                            automatic_emails.automatic_emails_bcc = automatic_emails.automatic_emails_bcc.slice(0, -1);
                                                                        } else {
                                                                            checkingEnd = false;
                                                                        }
                                                                    }

                                                                    props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automatic_emails });
                                                                    validateAutomaticEmailsForSaving();
                                                                }}></span>
                                                            <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{
                                                                textToShow.length > 0
                                                                    ? textToShow[1] !== ''
                                                                        ? textToShow[1] // name
                                                                        : textToShow[0] // email
                                                                    : textToShow[0] // email or blank
                                                            }</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return false;
                                                }
                                            })
                                        }
                                        <input type="text"
                                            tabIndex={31 + props.tabTimes}
                                            placeholder="E-mail Bcc"
                                            ref={refAutomaticEmailsBcc}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;
                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };
                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (emailBccDropdownItems.length > 0) {
                                                            let selectedIndex = emailBccDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailBccDropdownItems(emailBccDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailBccDropdownItems(emailBccDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (emailBccDropdownItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailBccPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (emailBccDropdownItems.length > 0) {
                                                            let selectedIndex = emailBccDropdownItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEmailBccDropdownItems(emailBccDropdownItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEmailBccDropdownItems(emailBccDropdownItems.map((item, index) => {
                                                                    if (selectedIndex === (emailBccDropdownItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEmailBccPopupItems.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView({
                                                                        behavior: 'auto',
                                                                        block: 'center',
                                                                        inline: 'nearest'
                                                                    })
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setEmailBccDropdownItems([]);
                                                        break;

                                                    case 13: // enter
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailBccDropdownItems.length > 0 && emailBccDropdownItems.findIndex(item => item.selected) > -1) {
                                                            let item = emailBccDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsBcc('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailBccDropdownItems([]);
                                                                refAutomaticEmailsBcc.current.focus();
                                                            }
                                                        } else if (emailBccDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsBcc || ''))) {
                                                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ';' + (props.automaticEmailsBcc + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailBccDropdownItems([]);
                                                                refAutomaticEmailsBcc.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                        if (emailBccDropdownItems.length > 0) {
                                                            let item = emailBccDropdownItems.find(el => el.selected);

                                                            if (item.email !== '' && isEmailValid(item.email)) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                await props.setAutomaticEmailsBcc('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailBccDropdownItems([]);
                                                                refAutomaticEmailsBcc.current.focus();
                                                            }
                                                        } else if (emailBccDropdownItems.length === 0) {
                                                            if (isEmailValid((props.automaticEmailsBcc || ''))) {
                                                                e.preventDefault();

                                                                automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ';' + (props.automaticEmailsBcc + '|')).trim() };
                                                                await props.setAutomaticEmailsTo('');

                                                                await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                    if (res.result === 'OK') {
                                                                        console.log(res);
                                                                    }
                                                                });

                                                                setEmailBccDropdownItems([]);
                                                                refAutomaticEmailsBcc.current.focus();
                                                            }
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onInput={async (e) => {
                                                await props.setAutomaticEmailsBcc(e.target.value);

                                                if ((props.selectedCustomer?.id || 0) > 0) {
                                                    if (e.target.value.trim() === '') {
                                                        setEmailBccDropdownItems([]);
                                                    } else {
                                                        $.post(props.serverUrl + '/getContactsByEmailOrName', {
                                                            email: e.target.value.trim(),
                                                            customer_id: props.selectedCustomer?.id
                                                        }).then(async res => {
                                                            if (res.result === 'OK') {
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


                                                                await setEmailBccDropdownItems(e.target.value.trim() === '' ? [] : items);
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting emails', e);
                                                        })
                                                    }
                                                }
                                            }}
                                            onChange={async (e) => { await props.setAutomaticEmailsBcc(e.target.value) }}
                                            value={props.automaticEmailsBcc || ''}
                                        />
                                    </div>

                                    <Transition
                                        from={{ opacity: 0, top: 0, }}
                                        enter={{ opacity: 1, top: 5, }}
                                        leave={{ opacity: 0, top: 0, }}
                                        items={emailBccDropdownItems.length > 0}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-email-bcc"
                                                style={{
                                                    ...styles,
                                                    left: 'calc(100%)',
                                                    display: 'block'
                                                }}
                                                ref={refEmailBccDropDown}
                                            >
                                                <div className="mochi-contextual-popup left high corner" style={{ height: 200 }}>
                                                    <div className="mochi-contextual-popup-content"  >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                emailBccDropdownItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = props.automaticEmailsBcc || '';

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                let automaticEmails = props.selectedCustomer?.automatic_emails || { customer_id: props.selectedCustomer?.id };

                                                                                if (item.email !== '' && isEmailValid(item.email)) {
                                                                                    automaticEmails = { ...automaticEmails, automatic_emails_bcc: ((automaticEmails.automatic_emails_bcc || '') + ';' + (item.email + '|' + item.name)).trim() };
                                                                                    await props.setAutomaticEmailsBcc('');

                                                                                    await props.setSelectedCustomer({ ...props.selectedCustomer, automatic_emails: automaticEmails });

                                                                                    $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
                                                                                        if (res.result === 'OK') {
                                                                                            console.log(res);
                                                                                        }
                                                                                    });

                                                                                    setEmailBccDropdownItems([]);
                                                                                    refAutomaticEmailsBcc.current.focus();
                                                                                }
                                                                            }}
                                                                            ref={ref => refEmailBccPopupItems.current.push(ref)}
                                                                        >
                                                                            {item.name} (<b>{item.email}</b>)
                                                                            {
                                                                                item.selected &&
                                                                                <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Transition>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-loaded-btn'}
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_loaded = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_loaded || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-loaded-btn'}>
                                        <div className="label-text">Loaded</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + '-cbox-automatic-emails-empty-btn'}
                                        onChange={e => {
                                            let automatic_emails = (props.selectedCustomer?.automatic_emails || {});
                                            automatic_emails.automatic_emails_empty = e.target.checked ? 1 : 0;
                                            props.setSelectedCustomer({
                                                ...props.selectedCustomer, automatic_emails: automatic_emails
                                            });
                                            validateAutomaticEmailsForSaving();
                                        }}
                                        checked={(props.selectedCustomer?.automatic_emails?.automatic_emails_empty || 0) === 1} />
                                    <label htmlFor={props.panelName + '-cbox-automatic-emails-empty-btn'}>
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
                                        {
                                            (props.selectedCustomer?.contacts || []).length > 0 &&
                                            <div className="contact-list-header">
                                                <div className="contact-list-col tcol first-name">First Name</div>
                                                <div className="contact-list-col tcol last-name">Last Name</div>
                                                <div className="contact-list-col tcol phone-work">Phone</div>
                                                <div className="contact-list-col tcol email-work">E-Mail</div>
                                                <div className="contact-list-col tcol contact-selected"></div>
                                                <div className="contact-list-col tcol pri"></div>
                                            </div>
                                        }

                                        <div className="contact-list-wrapper">
                                            {
                                                (props.selectedCustomer?.contacts || []).map((contact, index) => {
                                                    return (
                                                        <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                            await props.setIsEditingContact(false);
                                                            await props.setContactSearchCustomer({ ...props.selectedCustomer, selectedContact: contact });

                                                            if (!props.openedPanels.includes(props.customerContactsPanelName)) {
                                                                props.setOpenedPanels([...props.openedPanels, props.customerContactsPanelName]);
                                                            }
                                                        }} onClick={() => props.setSelectedContact(contact)}>
                                                            <div className="contact-list-col tcol first-name">{contact.first_name}</div>
                                                            <div className="contact-list-col tcol last-name">{contact.last_name}</div>
                                                            <div className="contact-list-col tcol phone-work">{
                                                                contact.primary_phone === 'work' ? contact.phone_work
                                                                    : contact.primary_phone === 'fax' ? contact.phone_work_fax
                                                                        : contact.primary_phone === 'mobile' ? contact.phone_mobile
                                                                            : contact.primary_phone === 'direct' ? contact.phone_direct
                                                                                : contact.primary_phone === 'other' ? contact.phone_other
                                                                                    : ''
                                                            }</div>
                                                            <div className="contact-list-col tcol email-work">{
                                                                contact.primary_email === 'work' ? contact.email_work
                                                                    : contact.primary_email === 'personal' ? contact.email_personal
                                                                        : contact.primary_email === 'other' ? contact.email_other
                                                                            : ''
                                                            }</div>
                                                            {
                                                                (contact.id === (props.selectedContact?.id || 0)) &&
                                                                <div className="contact-list-col tcol contact-selected">
                                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                                </div>
                                                            }
                                                            {
                                                                (contact.is_primary === 1) &&
                                                                <div className="contact-list-col tcol pri">
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
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
                                                    onFocus={() => { props.setShowingContactList(false) }}
                                                    onChange={e => props.setContactSearch({ ...props.contactSearch, email: e.target.value })}
                                                    value={props.contactSearch.email || ''} />
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
                        <div className="form-borderless-box" style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', flexGrow: 1 }}>
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
                                                let hours = (props.selectedCustomer?.hours || {});
                                                hours.hours_open = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer?.hours?.hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input tabIndex={40 + props.tabTimes} type="text" placeholder="Close"
                                            onBlur={(e) => validateHoursForSaving(e, 'hours close')}
                                            onChange={e => {
                                                let hours = (props.selectedCustomer?.hours || {});
                                                hours.hours_close = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer?.hours?.hours_close || '')} />
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
                                                let hours = (props.selectedCustomer?.hours || {});
                                                hours.delivery_hours_open = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer?.hours?.delivery_hours_open || '')} />
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="input-box-container ">
                                        <input tabIndex={42 + props.tabTimes} type="text" placeholder="Close"
                                            onKeyDown={(e) => {

                                                let key = e.keyCode || e.which;

                                                if (key === 9) {
                                                    e.preventDefault();
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
                                                let hours = (props.selectedCustomer?.hours || {});
                                                hours.delivery_hours_close = e.target.value;
                                                props.setSelectedCustomer({ ...props.selectedCustomer, hours: hours });
                                            }}
                                            value={(props.selectedCustomer?.hours?.delivery_hours_close || '')} />
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
                                    <div className="mochi-button" onClick={() => props.setSelectedNote({ id: 0, customer_id: props.selectedCustomer?.id })}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer?.id === undefined || props.selectedCustomer?.notes.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedCustomer?.notes.map((note, index) => {
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
                                        (props.selectedCustomer?.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index} onClick={() => props.setSelectedNote(note)}>
                                                    <div className="notes-list-col tcol note-text">{note.text}</div>
                                                    {
                                                        (note.id === (props.selectedNote?.id || 0)) &&
                                                        <div className="notes-list-col tcol notes-selected">
                                                            <FontAwesomeIcon icon={faPencilAlt} />
                                                        </div>
                                                    }
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
                                    <div className="mochi-button" onClick={() => props.setSelectedDirection({ id: 0, customer_id: props.selectedCustomer?.id })}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add direction</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>

                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedCustomer?.id === undefined || props.selectedCustomer?.directions.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedCustomer?.directions.map((direction, index) => {
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
                                        (props.selectedCustomer?.directions || []).map((direction, index) => {
                                            return (
                                                <div className="directions-list-item" key={index} onClick={() => props.setSelectedDirection(direction)}>
                                                    <div className="directions-list-col tcol note-text">{direction.text}</div>
                                                    {
                                                        (direction.id === (props.selectedDirection?.id || 0)) &&
                                                        <div className="directions-list-col tcol directions-selected">
                                                            <FontAwesomeIcon icon={faPencilAlt} />
                                                        </div>
                                                    }
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
                                <div className="form-title">Past Orders</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="orders-list-container">
                                <div className="orders-list-wrapper">
                                    {
                                        (props.selectedCustomer?.orders || []).map((order, index) => {
                                            return (
                                                <div className="orders-list-item" key={index} onClick={() => {

                                                    $.post(props.serverUrl + '/getOrderByOrderNumber', { order_number: order.order_number }).then(async res => {
                                                        if (res.result === 'OK') {
                                                            await props.setCustomerSelectedOrder({});
                                                            await props.setCustomerSelectedOrder(res.order);
                                                            await props.setCustomerOrderNumber(res.order.order_number);
                                                            await props.setCustomerTripNumber(res.order.trip_number === 0 ? '' : res.order.trip_number);
                                                            await props.setCustomerSelectedBillToCompanyInfo(res.order.bill_to_company || {});

                                                            if (res.order.bill_to_company) {
                                                                (res.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        await props.setCustomerSelectedBillToCompanyContact(contact);
                                                                    }
                                                                    return true;
                                                                })
                                                            }

                                                            await props.setCustomerSelectedShipperCompanyInfo(res.order.pickups.length > 0
                                                                ? {
                                                                    ...res.order.pickups[0].customer,
                                                                    pickup_id: res.order.pickups[0].id,
                                                                    pu_date1: res.order.pickups[0].pu_date1,
                                                                    pu_date2: res.order.pickups[0].pu_date2,
                                                                    pu_time1: res.order.pickups[0].pu_time1,
                                                                    pu_time2: res.order.pickups[0].pu_time2,
                                                                    bol_numbers: res.order.pickups[0].bol_numbers,
                                                                    po_numbers: res.order.pickups[0].po_numbers,
                                                                    ref_numbers: res.order.pickups[0].ref_numbers,
                                                                    seal_number: res.order.pickups[0].seal_number,
                                                                    special_instructions: res.order.pickups[0].special_instructions,
                                                                    type: res.order.pickups[0].type,
                                                                }
                                                                : {});

                                                            if (res.order.pickups.length > 0) {
                                                                (res.order.pickups[0].customer?.contacts || []).map(async (contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        await props.setCustomerSelectedShipperCompanyContact(contact);
                                                                    }
                                                                    return true;
                                                                })
                                                            }

                                                            await props.setCustomerSelectedConsigneeCompanyInfo(res.order.deliveries.length > 0
                                                                ? {
                                                                    ...res.order.deliveries[0].customer,
                                                                    delivery_id: res.order.deliveries[0].id,
                                                                    delivery_date1: res.order.deliveries[0].delivery_date1,
                                                                    delivery_date2: res.order.deliveries[0].delivery_date2,
                                                                    delivery_time1: res.order.deliveries[0].delivery_time1,
                                                                    delivery_time2: res.order.deliveries[0].delivery_time2,
                                                                    special_instructions: res.order.deliveries[0].special_instructions,
                                                                    type: res.order.deliveries[0].type,
                                                                }
                                                                : {});

                                                            if (res.order.deliveries.length > 0) {
                                                                (res.order.deliveries[0].customer?.contacts || []).map(async (contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        await props.setCustomerSelectedConsigneeCompanyContact(contact);
                                                                    }
                                                                    return true;
                                                                })
                                                            }

                                                            await props.setSelectedCustomerCarrierInfoCarrier(res.order.carrier || {});

                                                            if (res.order.carrier) {
                                                                (res.order.carrier?.contacts || []).map(async (contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        await props.setSelectedCustomerCarrierInfoContact(contact);
                                                                    }
                                                                    return true;
                                                                })
                                                            }

                                                            await props.setSelectedCustomerCarrierInfoDriver(res.order.driver || {});

                                                            await props.setCustomerDivision({ name: res.order.division });
                                                            await props.setCustomerLoadType({ name: res.order.load_type });
                                                            await props.setCustomerTemplate({ name: res.order.template });

                                                            console.log(props.openedPanels);

                                                            if (!props.openedPanels.includes(props.customerDispatchPanelName)) {
                                                                props.setOpenedPanels([...props.openedPanels, props.customerDispatchPanelName]);
                                                            }
                                                        } else {
                                                            props.setCustomerOrderNumber(props.selected_order?.order_number || '');
                                                        }
                                                    });
                                                }}>
                                                    {order.order_number} {order.pickups.length > 0 ? (order.pickups[0].customer?.city || '') + '/' + (order.pickups[0].customer?.state || '') : ''}-{order.deliveries.length > 0 ? (order.deliveries[order.deliveries.length - 1].customer?.city || '') + '/' + (order.deliveries[order.deliveries.length - 1].customer?.state || '') : ''}
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
                    if ((props.selectedCustomer?.id || 0) === 0) {
                        window.alert('There is nothing to print!');
                        return;
                    }

                    let customer = { ...props.selectedCustomer };

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

            {/* <CustomerPopup
                popupRef={refPopup}
                popupClasses={popupContainerClasses}
                popupItems={popupItems}
                popupItemsRef={popupItemsRef}
                popupItemClick={popupItemClick}
                popupItemKeydown={popupItemKeydown}
                setPopupItems={setPopupItems}
            /> */}

        </div>
    )
}

export default connect(null, null)(Customers)