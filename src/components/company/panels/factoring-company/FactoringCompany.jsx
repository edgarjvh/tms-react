import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompany.css';
import MaskedInput from 'react-text-mask';
import FactoringCompanyModal from './../modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";

function FactoringCompany(props) {

    var delayTimer;
    const modalTransitionProps = useSpring({ opacity: (props.selectedFactoringCompanyNote.id !== undefined) ? 1 : 0 });

    const refFactoringCompanyContactPhone = useRef();
    const [carrierContactPhoneItems, setFactoringCompanyContactPhoneItems] = useState([]);
    const [showFactoringCompanyContactPhones, setShowFactoringCompanyContactPhones] = useState(false);
    const refFactoringCompanyContactPhoneDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowFactoringCompanyContactPhones(false) } });
    const refFactoringCompanyContactPhonePopupItems = useRef([]);

    const refFactoringCompanyContactEmail = useRef();
    const [carrierContactEmailItems, setFactoringCompanyContactEmailItems] = useState([]);
    const [showFactoringCompanyContactEmails, setShowFactoringCompanyContactEmails] = useState(false);
    const refFactoringCompanyContactEmailDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowFactoringCompanyContactEmails(false) } });
    const refFactoringCompanyContactEmailPopupItems = useRef([]);

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

    const [isSavingFactoringCompany, setIsSavingFactoringCompany] = useState(false);
    const [isSavingFactoringCompanyContact, setIsSavingFactoringCompanyContact] = useState(false);
    const [isSavingFactoringCompanyMailingAddress, setIsSavingFactoringCompanyMailingAddress] = useState(false);

    useEffect(() => {
        if (isSavingFactoringCompany) {
            let company = props.selectedFactoringCompany || {};

            if (company.id === undefined) {
                company.id = 0;
            }

            if ((company.name || '').trim() !== '' &&
                (company.address1 || '').trim() !== '' &&
                (company.city || '').trim() !== '' &&
                (company.state || '').trim() !== '' &&
                (company.zip || '').trim() !== '') {

                let parseCity = company.city.trim().replace(/\s/g, "").substring(0, 3);

                if (parseCity.toLowerCase() === "ft.") {
                    parseCity = "FO";
                }
                if (parseCity.toLowerCase() === "mt.") {
                    parseCity = "MO";
                }
                if (parseCity.toLowerCase() === "st.") {
                    parseCity = "SA";
                }

                let newCode = (company.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (company.state || '').trim().replace(/\s/g, "").substring(0, 2);

                company.code = newCode.toUpperCase();

                $.post(props.serverUrl + '/saveFactoringCompany', company).then(res => {
                    if (res.result === 'OK') {
                        let factoring_company = JSON.parse(JSON.stringify(res.factoring_company));

                        if (props.selectedFactoringCompany?.id === undefined || (props.selectedFactoringCompany?.id || 0) === 0) {
                            props.setSelectedFactoringCompany({
                                ...props.selectedFactoringCompany,
                                id: factoring_company.id,
                                code: factoring_company.code,
                                code_number: factoring_company.code_number,
                                contacts: factoring_company.contacts || []
                            });
                        } else {
                            props.setSelectedFactoringCompany({
                                ...props.selectedFactoringCompany,
                                contacts: factoring_company.contacts || []
                            });
                        }

                        (res.factoring_company.contacts || []).map(async (contact, index) => {
                            if (contact.is_primary === 1) {
                                if ((props.selectedFactoringCompanyContact?.id || 0) === 0 || props.selectedFactoringCompanyContact?.id === contact.id) {
                                    await props.setSelectedFactoringCompanyContact(contact);
                                }
                            }
                            return true;
                        });

                        if ((props.selectedCarrier?.factoring_company?.id || 0) === res.factoring_company.id) {
                            props.setSelectedCarrier({
                                ...props.selectedCarrier,
                                factoring_company: res.factoring_company
                            });
                        }
                    }

                    setIsSavingFactoringCompany(false);
                }).catch(e => {
                    console.log('error on saving factoring company', e);
                    setIsSavingFactoringCompany(false);
                });
            } else {
                setIsSavingFactoringCompany(false);
            }
        }
    }, [isSavingFactoringCompany]);

    useEffect(() => {
        if (isSavingFactoringCompanyContact) {
            if ((props.selectedFactoringCompany.id || 0) === 0) {
                setIsSavingFactoringCompanyContact(false);
                return;
            }

            let contact = props.selectedFactoringCompanyContact;

            if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
                contact.factoring_company_id = props.selectedFactoringCompany.id;
            }

            if ((contact.first_name || '').trim() === '' ||
                (contact.last_name || '').trim() === '' ||
                ((contact.phone_work || '').trim() === '' &&
                    (contact.phone_work_fax || '').trim() === '' &&
                    (contact.phone_mobile || '').trim() === '' &&
                    (contact.phone_direct || '').trim() === '' &&
                    (contact.phone_other || '').trim() === '')) {
                setIsSavingFactoringCompanyContact(false);
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedFactoringCompany.address1;
                contact.address2 = props.selectedFactoringCompany.address2;
                contact.city = props.selectedFactoringCompany.city;
                contact.state = props.selectedFactoringCompany.state;
                contact.zip_code = props.selectedFactoringCompany.zip;
            }

            $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contacts: res.contacts });
                    await props.setSelectedFactoringCompanyContact(res.contact);
                }
                setIsSavingFactoringCompanyContact(false);
            }).catch(e => {
                console.log('error on saving factoring company contact', e);
                setIsSavingFactoringCompanyContact(false);
            });
        }
    }, [isSavingFactoringCompanyContact]);

    useEffect(() => {
        if (isSavingFactoringCompanyMailingAddress) {
            if ((props.selectedFactoringCompany.id || 0) > 0) {
                let mailing_address = props.selectedFactoringCompany.mailing_address || {};

                if (mailing_address.id === undefined) {
                    mailing_address.id = 0;
                }
                mailing_address.factoring_company_id = props.selectedFactoringCompany.id;

                if ((mailing_address.name || '').trim() !== '' &&
                    (mailing_address.address1 || '').trim() !== '' &&
                    (mailing_address.city || '').trim() !== '' &&
                    (mailing_address.state || '').trim() !== '' &&
                    (mailing_address.zip || '').trim() !== '') {

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

                    $.post(props.serverUrl + '/saveFactoringCompanyMailingAddress', mailing_address).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: res.mailing_address });

                            if ((props.selectedCarrier?.factoring_company?.id || 0) === props.selectedFactoringCompany.id) {
                                props.setSelectedCarrier({
                                    ...props.selectedCarrier,
                                    factoring_company: {
                                        ...props.selectedCarrier.factoring_company,
                                        mailing_address: res.mailing_address
                                    }
                                })
                            }
                        }
                        setIsSavingFactoringCompanyMailingAddress(false);
                    }).catch(e => {
                        console.log('error on saving factoring company mailing address', e);
                        setIsSavingFactoringCompanyMailingAddress(false);
                    });
                } else {
                    setIsSavingFactoringCompanyMailingAddress(false);
                }
            } else {
                setIsSavingFactoringCompanyMailingAddress(false);
            }
        }
    }, [isSavingFactoringCompanyMailingAddress]);

    useEffect(async () => {
        let emails = [];
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_work || '') !== '' && emails.push({ id: 1, type: 'work', email: props.selectedFactoringCompany?.mailing_address?.mailing_contact.email_work });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_personal || '') !== '' && emails.push({ id: 2, type: 'personal', email: props.selectedFactoringCompany?.mailing_address?.mailing_contact.email_personal });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_other || '') !== '' && emails.push({ id: 3, type: 'other', email: props.selectedFactoringCompany?.mailing_address?.mailing_contact.email_other });

        await setMailingContactEmailItems(emails);
    }, [
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_work,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_personal,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_other,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.primary_email
    ]);

    useEffect(async () => {
        let phones = [];
        (props.selectedFactoringCompanyContact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedFactoringCompanyContact.phone_work });
        (props.selectedFactoringCompanyContact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedFactoringCompanyContact.phone_work_fax });
        (props.selectedFactoringCompanyContact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedFactoringCompanyContact.phone_mobile });
        (props.selectedFactoringCompanyContact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedFactoringCompanyContact.phone_direct });
        (props.selectedFactoringCompanyContact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedFactoringCompanyContact.phone_other });

        await setFactoringCompanyContactPhoneItems(phones);
    }, [
        props.selectedFactoringCompanyContact?.phone_work,
        props.selectedFactoringCompanyContact?.phone_work_fax,
        props.selectedFactoringCompanyContact?.phone_mobile,
        props.selectedFactoringCompanyContact?.phone_direct,
        props.selectedFactoringCompanyContact?.phone_other,
        props.selectedFactoringCompanyContact?.primary_phone
    ]);

    useEffect(async () => {
        let emails = [];
        (props.selectedFactoringCompanyContact?.email_work || '') !== '' && emails.push({ id: 1, type: 'work', email: props.selectedFactoringCompanyContact.email_work });
        (props.selectedFactoringCompanyContact?.email_personal || '') !== '' && emails.push({ id: 2, type: 'personal', email: props.selectedFactoringCompanyContact.email_personal });
        (props.selectedFactoringCompanyContact?.email_other || '') !== '' && emails.push({ id: 3, type: 'other', email: props.selectedFactoringCompanyContact.email_other });

        await setFactoringCompanyContactEmailItems(emails);
    }, [
        props.selectedFactoringCompanyContact?.email_work,
        props.selectedFactoringCompanyContact?.email_personal,
        props.selectedFactoringCompanyContact?.email_other,
        props.selectedFactoringCompanyContact?.primary_email
    ]);

    useEffect(async () => {
        let phones = [];
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedFactoringCompany?.mailing_address?.mailing_contact.phone_work });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedFactoringCompany?.mailing_address?.mailing_contact.phone_work_fax });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedFactoringCompany?.mailing_address?.mailing_contact.phone_mobile });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedFactoringCompany?.mailing_address?.mailing_contact.phone_direct });
        (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedFactoringCompany?.mailing_address?.mailing_contact.phone_other });

        await setMailingContactPhoneItems(phones);
    }, [
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work_fax,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_mobile,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_direct,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_other,
        props.selectedFactoringCompany?.mailing_address?.mailing_contact?.primary_phone
    ]);


    const setInitialValues = (clearCode = true) => {
        props.setSelectedFactoringCompany({ id: 0, code: clearCode ? '' : props.selectedFactoringCompany.code });
        props.setSelectedFactoringCompanyContact({});
        props.setSelectedFactoringCompanyIsShowingContactList(true);
        props.setSelectedFactoringCompanyNote({});
        props.setSelectedFactoringCompanyInvoices([]);
        props.setSelectedFactoringCompanyInvoiceSearch([]);
    }

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const searchFactoringCompanyBtnClick = () => {

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedFactoringCompany.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedFactoringCompany.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedFactoringCompany.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedFactoringCompany.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedFactoringCompany.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedFactoringCompany.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedFactoringCompany.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setFactoringCompanySearch(factoringCompanySearch);
                await props.setFactoringCompanies(res.factoring_companies);

                if (!props.openedPanels.includes(props.factoringCompanyPanelSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.factoringCompanyPanelSearchPanelName]);
                }
            }
        });
    }

    const getFactoringCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value.trim() === '') {
                setInitialValues();
            } else {
                $.post(props.serverUrl + '/getFactoringCompanies', { code: e.target.value.trim().toLowerCase() }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.factoring_companies.length > 0) {
                            props.setSelectedFactoringCompany(res.factoring_companies[0]);

                            if (res.factoring_companies[0].contacts.length > 0) {
                                res.factoring_companies[0].contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedFactoringCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }
                        } else {
                            setInitialValues(false);
                        }
                    }
                });
            }
        }
    }

    const validateFactoringCompanyToSave = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingFactoringCompany) {
                setIsSavingFactoringCompany(true);
            }
        }
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingFactoringCompanyContact) {
                setIsSavingFactoringCompanyContact(true);
            }
        }
    }

    const validateMailingAddressToSave = (e) => {
        let key = e.keyCode || e.which;

        if ((props.selectedFactoringCompany.id || 0) > 0) {
            if (key === 9) {
                if (!isSavingFactoringCompanyMailingAddress) {
                    setIsSavingFactoringCompanyMailingAddress(true);
                }
            }
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, is_primary: e.target.checked ? 1 : 0 });

        if ((props.selectedFactoringCompany.id || 0) === 0) {
            return;
        }

        let contact = props.selectedFactoringCompanyContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
            contact.factoring_company_id = props.selectedFactoringCompany.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedFactoringCompany.address1;
            contact.address2 = props.selectedFactoringCompany.address2;
            contact.city = props.selectedFactoringCompany.city;
            contact.state = props.selectedFactoringCompany.state;
            contact.zip_code = props.selectedFactoringCompany.zip;
        }

        $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedFactoringCompanyContact(res.contact);
                await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedFactoringCompany.id || 0
            },
            {
                field: 'First Name',
                data: (props.selectedFactoringCompanyContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.selectedFactoringCompanyContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedFactoringCompanyContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedFactoringCompanyContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedFactoringCompanyContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedFactoringCompanyContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.selectedFactoringCompanyContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedFactoringCompanyContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanyContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, filters: filters });
                await props.setFactoringCompanyContacts(res.contacts);

                if (!props.openedPanels.includes(props.factoringCompanyContactSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.factoringCompanyContactSearchPanelName]);
                }
            }
        });
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

    const searchInvoiceBtnClick = async () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedFactoringCompany.id || 0
            },
            {
                field: 'Invoice Date',
                data: (props.selectedFactoringCompanyInvoiceSearch.invoice_date || '').toLowerCase()
            },
            {
                field: 'Pick Up Location',
                data: (props.selectedFactoringCompanyInvoiceSearch.pickup_location || '').toLowerCase()
            },
            {
                field: 'Delivery Location',
                data: (props.selectedFactoringCompanyInvoiceSearch.delivery_location || '').toLowerCase()
            },
            {
                field: 'Invoice Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.invoice_number || '').toLowerCase()
            },
            {
                field: 'Order Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.order_number || '').toLowerCase()
            },
            {
                field: 'Trip Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.trip_number || '').toLowerCase()
            },
            {
                field: 'Invoice Amount',
                data: props.selectedFactoringCompanyInvoiceSearch.invoice_amount || ''
            },
            {
                field: 'Customer Code',
                data: (props.selectedFactoringCompanyInvoiceSearch.customer_code || '').toLowerCase()
            },
            {
                field: 'Customer Name',
                data: (props.selectedFactoringCompanyInvoiceSearch.customer_name || '').toLowerCase()
            }
            ,
            {
                field: 'Carrier Code',
                data: (props.selectedFactoringCompanyInvoiceSearch.carrier_code || '').toLowerCase()
            },
            {
                field: 'Carrier Name',
                data: (props.selectedFactoringCompanyInvoiceSearch.carrier_name || '').toLowerCase()
            }
        ]

        await props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, filters: filters })

        if (!props.openedPanels.includes(props.factoringCompanyInvoiceSearchPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.factoringCompanyInvoiceSearchPanelName]);
        }

        // $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
        //     if (res.result === 'OK') {
        //         await props.setContactSearch({ ...props.selectedFactoringCompanyInvoiceSearch, filters: filters });
        //         await props.setCustomerContacts(res.contacts);

        //         let index = props.panels.length - 1;
        //         let panels = props.panels.map((p, i) => {
        //             if (p.name === 'customer-contact-search') {
        //                 index = i;
        //                 p.isOpened = true;
        //             }
        //             return p;
        //         });

        //         panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
        //         await props.setCustomerPanels(panels);
        //     }
        // });
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="factoring-company-container">
                <div className="fields-container-col" style={{ marginRight: 10 }}>
                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Customers</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={searchFactoringCompanyBtnClick}>
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
                                <input type="text" placeholder="Code" maxLength="8" style={{ textTransform: 'uppercase' }}
                                    onKeyDown={getFactoringCompanyByCode}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, code: e.target.value })}
                                    value={(props.selectedFactoringCompany.code_number || 0) === 0 ? (props.selectedFactoringCompany.code || '') : props.selectedFactoringCompany.code + props.selectedFactoringCompany.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, name: e.target.value })}
                                    value={props.selectedFactoringCompany.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, address1: e.target.value })}
                                    value={props.selectedFactoringCompany.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, address2: e.target.value })}
                                    value={props.selectedFactoringCompany.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, city: e.target.value })}
                                    value={props.selectedFactoringCompany.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, state: e.target.value })}
                                    value={props.selectedFactoringCompany.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, zip: e.target.value })}
                                    value={props.selectedFactoringCompany.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contact_name: e.target.value })}
                                    value={props.selectedFactoringCompany.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contact_phone: e.target.value })}
                                    value={props.selectedFactoringCompany.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    // onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, ext: e.target.value })} value={props.selectedFactoringCompany.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, email: e.target.value })}
                                    value={props.selectedFactoringCompany.email || ''} />
                            </div>
                        </div>
                    </div>

                    {/* ================================================================================================ */}

                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Mailing Address</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={async () => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    let mailing_address = {};

                                    mailing_address.id = 0;
                                    mailing_address.factoring_company_id = props.selectedFactoringCompany.id;
                                    mailing_address.code = props.selectedFactoringCompany.code;
                                    mailing_address.code_number = props.selectedFactoringCompany.code_number;
                                    mailing_address.name = props.selectedFactoringCompany.name;
                                    mailing_address.address1 = props.selectedFactoringCompany.address1;
                                    mailing_address.address2 = props.selectedFactoringCompany.address2;
                                    mailing_address.city = props.selectedFactoringCompany.city;
                                    mailing_address.state = props.selectedFactoringCompany.state;
                                    mailing_address.zip = props.selectedFactoringCompany.zip;
                                    mailing_address.contact_name = props.selectedFactoringCompany.contact_name;
                                    mailing_address.contact_phone = props.selectedFactoringCompany.contact_phone;
                                    mailing_address.ext = props.selectedFactoringCompany.ext;
                                    mailing_address.email = props.selectedFactoringCompany.email;

                                    if ((props.selectedFactoringCompanyContact?.id || 0) > 0) {
                                        mailing_address.mailing_contact_id = props.selectedFactoringCompanyContact.id;
                                        mailing_address.mailing_contact = props.selectedFactoringCompanyContact;

                                        mailing_address.mailing_contact_primary_phone = props.selectedFactoringCompanyContact.phone_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompanyContact.phone_work_fax !== ''
                                                ? 'fax'
                                                : props.selectedFactoringCompanyContact.phone_mobile !== ''
                                                    ? 'mobile'
                                                    : props.selectedFactoringCompanyContact.phone_direct !== ''
                                                        ? 'direct'
                                                        : props.selectedFactoringCompanyContact.phone_other !== ''
                                                            ? 'other' : 'work';

                                        mailing_address.mailing_contact_primary_email = props.selectedFactoringCompanyContact.email_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompanyContact.email_personal !== ''
                                                ? 'personal'
                                                : props.selectedFactoringCompanyContact.email_other !== ''
                                                    ? 'other' : 'work';

                                    } else if (props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1) > -1) {
                                        mailing_address.mailing_contact_id = props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].id;
                                        mailing_address.mailing_contact = props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)];

                                        mailing_address.mailing_contact_primary_phone = props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].phone_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].phone_work_fax !== ''
                                                ? 'fax'
                                                : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].phone_mobile !== ''
                                                    ? 'mobile'
                                                    : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].phone_direct !== ''
                                                        ? 'direct'
                                                        : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].phone_other !== ''
                                                            ? 'other' : 'work';

                                        mailing_address.mailing_contact_primary_email = props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].email_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].email_personal !== ''
                                                ? 'personal'
                                                : props.selectedFactoringCompany.contacts[props.selectedFactoringCompany.contacts.findIndex(x => x.is_primary === 1)].email_other !== ''
                                                    ? 'other' : 'work';

                                    } else if (props.selectedFactoringCompany.contacts.length > 0) {
                                        mailing_address.mailing_contact_id = props.selectedFactoringCompany.contacts[0].id;
                                        mailing_address.mailing_contact = props.selectedFactoringCompany.contacts[0];

                                        mailing_address.mailing_contact_primary_phone = props.selectedFactoringCompany.contacts[0].phone_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompany.contacts[0].phone_work_fax !== ''
                                                ? 'fax'
                                                : props.selectedFactoringCompany.contacts[0].phone_mobile !== ''
                                                    ? 'mobile'
                                                    : props.selectedFactoringCompany.contacts[0].phone_direct !== ''
                                                        ? 'direct'
                                                        : props.selectedFactoringCompany.contacts[0].phone_other !== ''
                                                            ? 'other' : 'work';

                                        mailing_address.mailing_contact_primary_email = props.selectedFactoringCompany.contacts[0].email_work !== ''
                                            ? 'work'
                                            : props.selectedFactoringCompany.contacts[0].email_personal !== ''
                                                ? 'personal'
                                                : props.selectedFactoringCompany.contacts[0].email_other !== ''
                                                    ? 'other' : 'work';

                                    } else {
                                        mailing_address.mailing_contact_id = 0;
                                        mailing_address.mailing_contact = {};
                                        mailing_address.mailing_contact_primary_phone = 'work';
                                        mailing_address.mailing_contact_primary_email = 'work';
                                    }

                                    await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });

                                    validateMailingAddressToSave({ keyCode: 9 });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Remit to address is the same</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        return;
                                    }

                                    props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: {} })

                                    $.post(props.serverUrl + '/deleteFactoringCompanyMailingAddress', { factoring_company_id: props.selectedFactoringCompany.id }).then(res => {
                                        if (res.result === 'OK') {
                                            console.log(res.mailing_address);
                                        }
                                    });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input type="text" placeholder="Code" maxLength="8" readOnly={true} style={{ textTransform: 'uppercase' }}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.code = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.code || '') + ((props.selectedFactoringCompany.mailing_address?.code_number || 0) === 0 ? '' : props.selectedFactoringCompany.mailing_address.code_number)} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.name || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.address1 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.address2 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.city || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.state || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.zip || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text" placeholder="Contact Name"
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
                                                            await setMailingContactNameItems((props.selectedFactoringCompany?.contacts || []).map((item, index) => {
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
                                                            await setMailingContactNameItems((props.selectedFactoringCompany?.contacts || []).map((item, index) => {
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
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
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

                                                        // validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactNames(false);
                                                        refMailingContactName.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showMailingContactNames) {
                                                        e.preventDefault();
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
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

                                                        // validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactNames(false);
                                                        refMailingContactName.current.focus();
                                                    } else {
                                                        // validateMailingAddressToSave({ keyCode: 9 });
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={e => {

                                        }}
                                        onChange={e => {

                                        }}
                                        value={
                                            (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.first_name || '') +
                                            ((props.selectedFactoringCompany?.mailing_address?.mailing_contact?.last_name || '') === ''
                                                ? ''
                                                : ' ' + props.selectedFactoringCompany?.mailing_address?.mailing_contact?.last_name)
                                        }
                                    />

                                    {
                                        ((props.selectedFactoringCompany?.contacts || []).length > 1 && (props.selectedFactoringCompany?.mailing_address?.id !== undefined)) &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showMailingContactNames) {
                                                setShowMailingContactNames(false);
                                            } else {
                                                if ((props.selectedFactoringCompany?.contacts || []).length > 1) {
                                                    await setMailingContactNameItems((props.selectedFactoringCompany?.contacts || []).map((item, index) => {
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
                                                                            await props.setSelectedFactoringCompany({
                                                                                ...props.selectedFactoringCompany,
                                                                                mailing_address: {
                                                                                    ...props.selectedFactoringCompany.mailing_address,
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

                                                                            // validateMailingAddressToSave({ keyCode: 9 });
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
                            <div className="form-h-sep"></div>
                            <div className="select-box-container input-phone">
                                <div className="select-box-wrapper">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
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
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
                                                                mailing_contact_primary_phone: mailingContactPhoneItems[mailingContactPhoneItems.findIndex(item => item.selected)].type
                                                            }
                                                        });

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactPhones(false);
                                                        refMailingContactPhone.current.inputElement.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showMailingContactPhones) {
                                                        e.preventDefault();
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
                                                                mailing_contact_primary_phone: mailingContactPhoneItems[mailingContactPhoneItems.findIndex(item => item.selected)].type
                                                            }
                                                        });

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactPhones(false);
                                                        refMailingContactPhone.current.inputElement.focus();
                                                    } else {
                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                    }
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={(e) => {

                                        }}
                                        onChange={(e) => {

                                        }}
                                        value={
                                            (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                                ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work || '')
                                                : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                                    ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                                    : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                        ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                        : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                            ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_direct || '')
                                                            : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                                ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_other || '')
                                                                : ''
                                        }
                                    />

                                    {
                                        ((props.selectedFactoringCompany?.id || 0) > 0 && (props.selectedFactoringCompany?.mailing_address?.id !== undefined)) &&
                                        <div
                                            className={classnames({
                                                'selected-mailing-contact-primary-phone': true,
                                                'pushed': (mailingContactPhoneItems.length > 1)
                                            })}>
                                            {props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_phone || ''}
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
                                                                            await props.setSelectedFactoringCompany({
                                                                                ...props.selectedFactoringCompany,
                                                                                mailing_address: {
                                                                                    ...props.selectedFactoringCompany.mailing_address,
                                                                                    mailing_contact_primary_phone: item.type
                                                                                }
                                                                            });

                                                                            validateMailingAddressToSave({ keyCode: 9 });
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
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    // onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        // let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        // mailing_address.ext = e.target.value;
                                        // props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedFactoringCompany?.mailing_address?.mailing_contact?.phone_ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text" placeholder="E-Mail"
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
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
                                                                mailing_contact_primary_email: mailingContactEmailItems[mailingContactEmailItems.findIndex(item => item.selected)].type
                                                            }
                                                        });

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactEmails(false);
                                                        refMailingContactEmail.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showMailingContactEmails) {
                                                        e.preventDefault();
                                                        await props.setSelectedFactoringCompany({
                                                            ...props.selectedFactoringCompany,
                                                            mailing_address: {
                                                                ...props.selectedFactoringCompany.mailing_address,
                                                                mailing_contact_primary_email: mailingContactEmailItems[mailingContactEmailItems.findIndex(item => item.selected)].type
                                                            }
                                                        });

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactEmails(false);
                                                        refMailingContactEmail.current.focus();
                                                    } else {
                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onChange={e => {

                                        }}
                                        value={
                                            (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                                ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_work || '')
                                                : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                                    ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_personal || '')
                                                    : (props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                                        ? (props.selectedFactoringCompany?.mailing_address?.mailing_contact?.email_other || '')
                                                        : ''
                                        }
                                    />

                                    {
                                        ((props.selectedFactoringCompany?.id || 0) > 0 && (props.selectedFactoringCompany?.mailing_address?.id !== undefined)) &&
                                        <div
                                            className={classnames({
                                                'selected-mailing-contact-primary-email': true,
                                                'pushed': (mailingContactEmailItems.length > 1)
                                            })}>
                                            {props.selectedFactoringCompany?.mailing_address?.mailing_contact_primary_email || ''}
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
                                                                            await props.setSelectedFactoringCompany({
                                                                                ...props.selectedFactoringCompany,
                                                                                mailing_address: {
                                                                                    ...props.selectedFactoringCompany.mailing_address,
                                                                                    mailing_contact_primary_email: item.type
                                                                                }
                                                                            });

                                                                            validateMailingAddressToSave({ keyCode: 9 });
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

                    {/* ======================================================================================= */}

                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Contacts</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={async () => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    if (props.selectedFactoringCompanyContact.id === undefined) {
                                        window.alert('You must select a contact');
                                        return;
                                    }

                                    await props.setFactoringCompanyIsEditingContact(false);
                                    await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: props.selectedFactoringCompanyContact });

                                    if (!props.openedPanels.includes(props.factoringCompanyContactsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.factoringCompanyContactsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: { id: 0, factoring_company_id: props.selectedFactoringCompany.id } });
                                    props.setFactoringCompanyIsEditingContact(true);

                                    if (!props.openedPanels.includes(props.factoringCompanyContactsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.factoringCompanyContactsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add contact</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyContact({})}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="First Name"
                                    // onKeyDown={validateContactForSaving}
                                    onChange={e => {
                                        props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, first_name: e.target.value })
                                    }}
                                    value={props.selectedFactoringCompanyContact.first_name || ''} />

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Last Name"
                                    // onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, last_name: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.last_name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ width: '50%' }}>
                                <div className="select-box-wrapper">
                                    <MaskedInput
                                        ref={refFactoringCompanyContactPhone}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone"
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (showFactoringCompanyContactPhones) {
                                                        let selectedIndex = carrierContactPhoneItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (carrierContactPhoneItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refFactoringCompanyContactPhonePopupItems.current.map((r, i) => {
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
                                                        if (carrierContactPhoneItems.length > 1) {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_phone || '')
                                                                return item;
                                                            }))

                                                            setShowFactoringCompanyContactPhones(true);

                                                            refFactoringCompanyContactPhonePopupItems.current.map((r, i) => {
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
                                                    if (showFactoringCompanyContactPhones) {
                                                        let selectedIndex = carrierContactPhoneItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                if (selectedIndex === (carrierContactPhoneItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refFactoringCompanyContactPhonePopupItems.current.map((r, i) => {
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
                                                        if (carrierContactPhoneItems.length > 1) {
                                                            await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_phone || '')
                                                                return item;
                                                            }))

                                                            setShowFactoringCompanyContactPhones(true);

                                                            refFactoringCompanyContactPhonePopupItems.current.map((r, i) => {
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
                                                    setShowFactoringCompanyContactPhones(false);
                                                    break;

                                                case 13: // enter
                                                    if (showFactoringCompanyContactPhones && carrierContactPhoneItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedFactoringCompanyContact({
                                                            ...props.selectedFactoringCompanyContact,
                                                            primary_phone: carrierContactPhoneItems[carrierContactPhoneItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowFactoringCompanyContactPhones(false);
                                                        refFactoringCompanyContactPhone.current.inputElement.focus();
                                                    }
                                                    break;
                                                case 9: // tab
                                                    if (showFactoringCompanyContactPhones) {
                                                        e.preventDefault();
                                                        await props.setSelectedFactoringCompanyContact({
                                                            ...props.selectedFactoringCompanyContact,
                                                            primary_phone: carrierContactPhoneItems[carrierContactPhoneItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowFactoringCompanyContactPhones(false);
                                                        refFactoringCompanyContactPhone.current.inputElement.focus();
                                                    } else {
                                                        validateContactForSaving({ keyCode: 9 });
                                                    }
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={(e) => {
                                            if ((props.selectedFactoringCompanyContact?.id || 0) === 0) {
                                                props.setSelectedFactoringCompanyContact({
                                                    ...props.selectedFactoringCompanyContact,
                                                    phone_work: e.target.value,
                                                    primary_phone: 'work'
                                                });
                                            } else {
                                                if ((props.selectedFactoringCompanyContact?.primary_phone || '') === '') {
                                                    props.setSelectedFactoringCompanyContact({
                                                        ...props.selectedFactoringCompanyContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedFactoringCompanyContact?.primary_phone) {
                                                        case 'work':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_work: e.target.value
                                                            });
                                                            break;
                                                        case 'fax':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_work_fax: e.target.value
                                                            });
                                                            break;
                                                        case 'mobile':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_mobile: e.target.value
                                                            });
                                                            break;
                                                        case 'direct':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_direct: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_other: e.target.value
                                                            });
                                                            break;
                                                    }
                                                }
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedFactoringCompanyContact?.id || 0) === 0) {
                                                props.setSelectedFactoringCompanyContact({
                                                    ...props.selectedFactoringCompanyContact,
                                                    phone_work: e.target.value,
                                                    primary_phone: 'work'
                                                });
                                            } else {
                                                if ((props.selectedFactoringCompanyContact?.primary_phone || '') === '') {
                                                    props.setSelectedFactoringCompanyContact({
                                                        ...props.selectedFactoringCompanyContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedFactoringCompanyContact?.primary_phone) {
                                                        case 'work':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_work: e.target.value
                                                            });
                                                            break;
                                                        case 'fax':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_work_fax: e.target.value
                                                            });
                                                            break;
                                                        case 'mobile':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_mobile: e.target.value
                                                            });
                                                            break;
                                                        case 'direct':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_direct: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                phone_other: e.target.value
                                                            });
                                                            break;
                                                    }
                                                }
                                            }
                                        }}
                                        value={
                                            (props.selectedFactoringCompanyContact?.primary_phone || '') === 'work'
                                                ? (props.selectedFactoringCompanyContact?.phone_work || '')
                                                : (props.selectedFactoringCompanyContact?.primary_phone || '') === 'fax'
                                                    ? (props.selectedFactoringCompanyContact?.phone_work_fax || '')
                                                    : (props.selectedFactoringCompanyContact?.primary_phone || '') === 'mobile'
                                                        ? (props.selectedFactoringCompanyContact?.phone_mobile || '')
                                                        : (props.selectedFactoringCompanyContact?.primary_phone || '') === 'direct'
                                                            ? (props.selectedFactoringCompanyContact?.phone_direct || '')
                                                            : (props.selectedFactoringCompanyContact?.primary_phone || '') === 'other'
                                                                ? (props.selectedFactoringCompanyContact?.phone_other || '')
                                                                : ''
                                        }
                                    />

                                    {
                                        (props.selectedFactoringCompanyContact?.id || 0) > 0 &&
                                        <div
                                            className={classnames({
                                                'selected-carrier-contact-primary-phone': true,
                                                'pushed': (carrierContactPhoneItems.length > 1)
                                            })}>
                                            {props.selectedFactoringCompanyContact?.primary_phone || ''}
                                        </div>
                                    }

                                    {
                                        carrierContactPhoneItems.length > 1 &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showFactoringCompanyContactPhones) {
                                                setShowFactoringCompanyContactPhones(false);
                                            } else {
                                                if (carrierContactPhoneItems.length > 1) {
                                                    await setFactoringCompanyContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                        item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_phone || '')
                                                        return item;
                                                    }))

                                                    window.setTimeout(async () => {
                                                        await setShowFactoringCompanyContactPhones(true);

                                                        refFactoringCompanyContactPhonePopupItems.current.map((r, i) => {
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

                                            refFactoringCompanyContactPhone.current.inputElement.focus();
                                        }} />
                                    }
                                </div>
                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={showFactoringCompanyContactPhones}
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
                                            ref={refFactoringCompanyContactPhoneDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            carrierContactPhoneItems.map((item, index) => {
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
                                                                            await props.setSelectedFactoringCompanyContact({
                                                                                ...props.selectedFactoringCompanyContact,
                                                                                primary_phone: item.type
                                                                            });

                                                                            // validateContactForSaving({ keyCode: 9 });
                                                                            setShowFactoringCompanyContactPhones(false);
                                                                            refFactoringCompanyContactPhone.current.inputElement.focus();
                                                                        }}
                                                                        ref={ref => refFactoringCompanyContactPhonePopupItems.current.push(ref)}
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
                                    <input type="text" placeholder="Ext"
                                        // onKeyDown={validateContactForSaving}
                                        onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, phone_ext: e.target.value })}
                                        value={props.selectedFactoringCompanyContact.phone_ext || ''} />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + 'cbox-factoring-company-contacts-primary-btn'}
                                        onChange={selectedContactIsPrimaryChange}
                                        checked={(props.selectedFactoringCompanyContact.is_primary || 0) === 1} />
                                    <label htmlFor={props.panelName + 'cbox-factoring-company-contacts-primary-btn'}>
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
                                        ref={refFactoringCompanyContactEmail}
                                        type="text"
                                        placeholder="E-Mail"
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (showFactoringCompanyContactEmails) {
                                                        let selectedIndex = carrierContactEmailItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (carrierContactEmailItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refFactoringCompanyContactEmailPopupItems.current.map((r, i) => {
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
                                                        if (carrierContactEmailItems.length > 1) {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_email || '')
                                                                return item;
                                                            }))

                                                            setShowFactoringCompanyContactEmails(true);

                                                            refFactoringCompanyContactEmailPopupItems.current.map((r, i) => {
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
                                                    if (showFactoringCompanyContactEmails) {
                                                        let selectedIndex = carrierContactEmailItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                if (selectedIndex === (carrierContactEmailItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refFactoringCompanyContactEmailPopupItems.current.map((r, i) => {
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
                                                        if (carrierContactEmailItems.length > 1) {
                                                            await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_email || '')
                                                                return item;
                                                            }))

                                                            setShowFactoringCompanyContactEmails(true);

                                                            refFactoringCompanyContactEmailPopupItems.current.map((r, i) => {
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
                                                    setShowFactoringCompanyContactEmails(false);
                                                    break;

                                                case 13: // enter
                                                    if (showFactoringCompanyContactEmails && carrierContactEmailItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedFactoringCompanyContact({
                                                            ...props.selectedFactoringCompanyContact,
                                                            primary_email: carrierContactEmailItems[carrierContactEmailItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowFactoringCompanyContactEmails(false);
                                                        refFactoringCompanyContactEmail.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showFactoringCompanyContactEmails) {
                                                        e.preventDefault();
                                                        await props.setSelectedFactoringCompanyContact({
                                                            ...props.selectedFactoringCompanyContact,
                                                            primary_email: carrierContactEmailItems[carrierContactEmailItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowFactoringCompanyContactEmails(false);
                                                        refFactoringCompanyContactEmail.current.focus();
                                                    } else {
                                                        validateContactForSaving({ keyCode: 9 });
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={(e) => {
                                            if ((props.selectedFactoringCompanyContact?.id || 0) === 0) {
                                                props.setSelectedFactoringCompanyContact({
                                                    ...props.selectedFactoringCompanyContact,
                                                    email_work: e.target.value,
                                                    primary_email: 'work'
                                                });
                                            } else {
                                                if ((props.selectedFactoringCompanyContact?.primary_email || '') === '') {
                                                    props.setSelectedFactoringCompanyContact({
                                                        ...props.selectedFactoringCompanyContact,
                                                        email_work: e.target.value,
                                                        primary_email: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedFactoringCompanyContact?.primary_email) {
                                                        case 'work':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_work: e.target.value
                                                            });
                                                            break;
                                                        case 'personal':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_personal: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_other: e.target.value
                                                            });
                                                            break;
                                                    }
                                                }
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedFactoringCompanyContact?.id || 0) === 0) {
                                                props.setSelectedFactoringCompanyContact({
                                                    ...props.selectedFactoringCompanyContact,
                                                    email_work: e.target.value,
                                                    primary_email: 'work'
                                                });
                                            } else {
                                                if ((props.selectedFactoringCompanyContact?.primary_email || '') === '') {
                                                    props.setSelectedFactoringCompanyContact({
                                                        ...props.selectedFactoringCompanyContact,
                                                        email_work: e.target.value,
                                                        primary_email: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedFactoringCompanyContact?.primary_email) {
                                                        case 'work':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_work: e.target.value
                                                            });
                                                            break;
                                                        case 'personal':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_personal: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedFactoringCompanyContact({
                                                                ...props.selectedFactoringCompanyContact,
                                                                email_other: e.target.value
                                                            });
                                                            break;
                                                    }
                                                }
                                            }
                                        }}
                                        value={
                                            (props.selectedFactoringCompanyContact?.primary_email || '') === 'work'
                                                ? (props.selectedFactoringCompanyContact?.email_work || '')
                                                : (props.selectedFactoringCompanyContact?.primary_email || '') === 'personal'
                                                    ? (props.selectedFactoringCompanyContact?.email_personal || '')
                                                    : (props.selectedFactoringCompanyContact?.primary_email || '') === 'other'
                                                        ? (props.selectedFactoringCompanyContact?.email_other || '')
                                                        : ''
                                        }
                                    />

                                    {
                                        (props.selectedFactoringCompanyContact?.id || 0) > 0 &&
                                        <div
                                            className={classnames({
                                                'selected-carrier-contact-primary-email': true,
                                                'pushed': (carrierContactEmailItems.length > 1)
                                            })}>
                                            {props.selectedFactoringCompanyContact?.primary_email || ''}
                                        </div>
                                    }

                                    {
                                        carrierContactEmailItems.length > 1 &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showFactoringCompanyContactEmails) {
                                                setShowFactoringCompanyContactEmails(false);
                                            } else {
                                                if (carrierContactEmailItems.length > 1) {
                                                    await setFactoringCompanyContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                        item.selected = item.type === (props.selectedFactoringCompanyContact?.primary_email || '')
                                                        return item;
                                                    }))

                                                    window.setTimeout(async () => {
                                                        await setShowFactoringCompanyContactEmails(true);

                                                        refFactoringCompanyContactEmailPopupItems.current.map((r, i) => {
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

                                            refFactoringCompanyContactEmail.current.focus();
                                        }} />
                                    }
                                </div>
                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={showFactoringCompanyContactEmails}
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
                                            ref={refFactoringCompanyContactEmailDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            carrierContactEmailItems.map((item, index) => {
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
                                                                            await props.setSelectedFactoringCompanyContact({
                                                                                ...props.selectedFactoringCompanyContact,
                                                                                primary_email: item.type
                                                                            });

                                                                            validateContactForSaving({ keyCode: 9 });
                                                                            setShowFactoringCompanyContactEmails(false);
                                                                            refFactoringCompanyContactEmail.current.focus();
                                                                        }}
                                                                        ref={ref => refFactoringCompanyContactEmailPopupItems.current.push(ref)}
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
                                <input type="text" placeholder="Notes"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, notes: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.notes || ''} />
                            </div>
                        </div>
                    </div>

                    {/* ================================================================================= */}

                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                {
                                    props.selectedFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyIsShowingContactList(false)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyIsShowingContactList(true)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Cancel</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }

                                {
                                    !props.selectedFactoringCompanyIsShowingContactList &&
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
                            <div className="form-slider-wrapper" style={{ left: props.selectedFactoringCompanyIsShowingContactList ? 0 : '-100%' }}>
                                <div className="contact-list-box">
                                    {
                                        (props.selectedFactoringCompany.contacts || []).length > 0 &&
                                        <div className="contact-list-header">
                                            <div className="contact-list-col tcol first-name">First Name</div>
                                            <div className="contact-list-col tcol last-name">Last Name</div>
                                            <div className="contact-list-col tcol phone-work">Phone</div>
                                            <div className="contact-list-col tcol email-work">E-Mail</div>
                                            <div className="contact-list-col tcol pri"></div>
                                        </div>
                                    }
                                    <div className="contact-list-wrapper">

                                        {
                                            (props.selectedFactoringCompany.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {
                                                        await props.setFactoringCompanyIsEditingContact(false);
                                                        await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: contact });

                                                        if (!props.openedPanels.includes(props.factoringCompanyContactsPanelName)) {
                                                            props.setOpenedPanels([...props.openedPanels, props.factoringCompanyContactsPanelName]);
                                                        }
                                                    }} onClick={() => props.setSelectedFactoringCompanyContact(contact)}>
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
                                                            (contact.id === (props.selectedFactoringCompanyContact?.id || 0)) &&
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
                                            <input type="text" placeholder="First Name"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, first_name: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.first_name || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Last Name"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, last_name: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.last_name || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 1"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, address1: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.address1 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 2"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, address2: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.address2 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="City"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, city: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.city || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container input-state">
                                            <input type="text" placeholder="State" maxLength="2"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, state: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.state || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <MaskedInput
                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                guide={true}
                                                type="text" placeholder="Phone (Work/Mobile/Fax)"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, phone: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.phone || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, email: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.email || ''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col">

                    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <div className='mochi-button' onClick={() => {
                            if ((props.selectedFactoringCompany.id || 0) > 0) {
                                props.setSelectedFactoringCompanyDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY')
                                });

                                if (!props.openedPanels.includes(props.factoringCompanyDocumentsPanelName)) {
                                    props.setOpenedPanels([...props.openedPanels, props.factoringCompanyDocumentsPanelName]);
                                }
                            } else {
                                window.alert('You must select a factoring company first!');
                            }
                        }}>
                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                            <div className='mochi-button-base'>Documents</div>
                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                        </div>

                        <div className='mochi-button' onClick={() => {
                            if ((props.selectedFactoringCompany.id || 0) === 0) {
                                window.alert('There is nothing to print!');
                                return;
                            }

                            let factoringCompany = { ...props.selectedFactoringCompany };

                            let html = ``;

                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Code</span>: ${factoringCompany.code.toUpperCase() + (factoringCompany.code_number === 0 ? '' : factoringCompany.code_number)}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Name</span>: ${factoringCompany.name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 1</span>: ${factoringCompany.address1}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 2</span>: ${factoringCompany.address2}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">City</span>: ${factoringCompany.city}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">State</span>: ${factoringCompany.state.toUpperCase()}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Postal Code</span>: ${factoringCompany.zip}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Name</span>: ${factoringCompany.contact_name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone</span>: ${factoringCompany.contact_phone}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone Ext</span>: ${factoringCompany.ext}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">E-Mail</span>: ${factoringCompany.email}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">MC Number</span>: ${factoringCompany.mc_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">DOT Number</span>: ${factoringCompany.dot_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">SCAC</span>: ${factoringCompany.scac}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">FID</span>: ${factoringCompany.fid}</div>`;

                            printWindow(html);
                        }}>
                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                            <div className='mochi-button-base'>Print Company Information</div>
                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                        </div>
                    </div>

                    <div className='form-bordered-box' style={{ marginBottom: 10 }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Notes</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedFactoringCompanyNote({ id: 0, factoring_company_id: props.selectedFactoringCompany.id })
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Add note</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' onClick={() => {
                                    if (props.selectedFactoringCompany.id === undefined || (props.selectedFactoringCompany.notes || []).length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = ``;

                                    props.selectedFactoringCompany.notes.map((note, index) => {
                                        html += `<div><b>${note.user}:${moment(note.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm')}</b> ${note.text}</div>`

                                        return true;
                                    })

                                    printWindow(html);
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Print</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="factoring-company-list-container">
                            <div className="factoring-company-list-wrapper">
                                {
                                    (props.selectedFactoringCompany.notes || []).map((note, index) => {
                                        return (
                                            <div className="factoring-company-list-item" key={index} onClick={() => props.setSelectedFactoringCompanyNote(note)}>
                                                <div className="factoring-company-list-col tcol note-text">{note.text}</div>
                                                {
                                                    (note.id === (props.selectedFactoringCompanyNote?.id || 0)) &&
                                                    <div className="factoring-company-list-col tcol factoring-company-selected">
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

                    <div className='form-bordered-box'>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Outstanding Invoices</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                {
                                    props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => {
                                        let html = `<h2>Factoring Company Invoices</h2></br></br>`;
                                        html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Invoice Date</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Invoice Number</div>
                                            <div style="min-width:25%;max-width:25%;flex-grow:1;text-decoration:underline">Order Number</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline;text-align:right">Amount</div>
                                        </div>
                                        `;

                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:25%;max-width:25%">03/09/2021</div>
                                            <div style="min-width:25%;max-width:25%">12345</div>
                                            <div style="min-width:25%;max-width:25%;flex-grow:1">54321</div>
                                            <div style="min-width:25%;max-width:25%;text-align:right">$25,000.00</div>
                                        </div>
                                        `;

                                        printWindow(html);

                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Print</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(true) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Cancel</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={searchInvoiceBtnClick}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Send</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }

                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="form-slider">
                            <div className="form-slider-wrapper" style={{ left: props.selectedFactoringCompanyIsShowingInvoiceList ? 0 : '-100%' }}>
                                <div className="factoring-company-invoice-list-container" style={{ width: '50%' }}>
                                    <div className="factoring-company-invoice-list-wrapper">
                                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: 5, color: 'rgba(0,0,0,0.8)' }}>
                                            <div style={{ width: '6rem', textDecoration: 'underline' }}>Invoice Date</div>
                                            <div style={{ width: '6rem', textDecoration: 'underline' }}>Invoice Number</div>
                                            <div style={{ flexGrow: 1, textDecoration: 'underline' }}>Order Number</div>
                                            <div style={{ width: '6rem', textAlign: 'right', textDecoration: 'underline' }}>Amount</div>
                                        </div>
                                        <div className="factoring-company-invoice-list-item" onClick={() => { }}>
                                            <div style={{ width: '6rem' }}>03/09/2021</div>
                                            <div style={{ width: '6rem' }}>12345</div>
                                            <div style={{ flexGrow: 1 }}>54321</div>
                                            <div style={{ width: '6rem', textAlign: 'right' }}>$25,000.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: '50%', flexGrow: 1 }}>
                                    <div className="form-borderless-box">
                                        <div className="form-row">
                                            <div className="input-box-container" style={{ width: '7.7rem' }}>
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Date (MM/DD/YYYY)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_date: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_date || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Pick Up Location (City / State)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, pickup_location: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.pickup_location || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Delivery Location (City / State)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, delivery_location: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.delivery_location || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Invoice Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Order Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, order_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.order_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Trip Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, trip_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.trip_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Amount"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_amount: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_amount || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Customer Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, customer_code: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.customer_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Customer Name"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, customer_name: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.customer_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Carrier Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, carrier_code: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.carrier_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Carrier Name"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, carrier_name: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.carrier_name || ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {
                props.selectedFactoringCompanyNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <FactoringCompanyModal
                        selectedData={props.selectedFactoringCompanyNote}
                        setSelectedData={props.setSelectedFactoringCompanyNote}
                        selectedParent={props.selectedFactoringCompany}
                        setSelectedParent={(notes) => {
                            props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, notes: notes });
                            if ((props.selectedCarrier?.id || 0) > 0 && props.selectedCarrier?.factoring_company?.id === props.selectedFactoringCompany?.id) {
                                props.setSelectedCarrier({
                                    ...props.selectedCarrier,
                                    factoring_company: {
                                        ...props.selectedFactoringCompany,
                                        notes: notes
                                    }
                                });
                            }
                        }}
                        savingDataUrl='/saveFactoringCompanyNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={false}
                        isAdding={props.selectedFactoringCompanyNote.id === 0}
                    />
                </animated.div>

            }
        </div>

    )
}

export default connect(null, null)(FactoringCompany)