import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './Carriers.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import CarrierModal from './modal/Modal.jsx';
import accounting from 'accounting';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faPencilAlt, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import Highlighter from "react-highlight-words";
import Calendar from './calendar/Calendar.jsx';
import "react-datepicker/dist/react-datepicker.css";
import Rating from '@material-ui/lab/Rating';

function Carriers(props) {
    const refCarrierCode = useRef(null);
    const refCarrierContactPhone = useRef();
    const refCarrierContactFirstName = useRef();
    const refCarrierDriverFirstName = useRef();
    const refInsurancesListWrapper = useRef();
    const [insurancesScrollBarVisible, setInsurancesScrollBarVisible] = useState(false);
    const [carrierContactPhoneItems, setCarrierContactPhoneItems] = useState([]);
    const [showCarrierContactPhones, setShowCarrierContactPhones] = useState(false);
    const refCarrierContactPhoneDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowCarrierContactPhones(false) } });
    const refCarrierContactPhonePopupItems = useRef([]);

    const refCarrierContactEmail = useRef();
    const [carrierContactEmailItems, setCarrierContactEmailItems] = useState([]);
    const [showCarrierContactEmails, setShowCarrierContactEmails] = useState(false);
    const refCarrierContactEmailDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowCarrierContactEmails(false) } });
    const refCarrierContactEmailPopupItems = useRef([]);

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

    const [preSelectedExpirationDate, setPreSelectedExpirationDate] = useState(moment());
    const [popupItems, setPopupItems] = useState([]);

    const [insuranceTypeDropdownItems, setInsuranceTypeDropdownItems] = useState([]);
    const refInsuranceTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setInsuranceTypeDropdownItems([]) } });
    const refInsuranceTypePopupItems = useRef([]);

    const [insuranceCompanyDropdownItems, setInsuranceCompanyDropdownItems] = useState([]);
    const refInsuranceCompanyDropDown = useDetectClickOutside({ onTriggered: async () => { await setInsuranceCompanyDropdownItems([]) } });
    const refInsuranceCompanyPopupItems = useRef([]);

    const [driverEquipmentDropdownItems, setDriverEquipmentDropdownItems] = useState([]);
    const refDriverEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setDriverEquipmentDropdownItems([]) } });
    const refDriverEquipmentPopupItems = useRef([]);

    const [isCalendarShown, setIsCalendarShown] = useState(false);
    const refInsuranceCalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsCalendarShown(false) } });

    const [ratingValue, setRatingValue] = useState(3);
    const [isSavingCarrier, setIsSavingCarrier] = useState(false);
    const [isSavingContact, setIsSavingContact] = useState(false);
    const [isSavingMailingAddress, setIsSavingMailingAddress] = useState(false);
    const [isSavingFactoringCompany, setIsSavingFactoringCompany] = useState(false);
    const [isSavingDriver, setIsSavingDriver] = useState(false);
    const [isSavingInsurance, setIsSavingInsurance] = useState(false);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refEquipment = useRef();
    const refInsuranceType = useRef();
    const refExpirationDate = useRef();
    const refInsuranceCompany = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const modalTransitionProps = useSpring({ opacity: (props.selectedNote.id !== undefined || props.selectedDirection.id !== undefined) ? 1 : 0 });

    var delayTimer;

    useEffect(() => {
        setInsurancesScrollBarVisible($(`#${props.panelName}-insurances-list-wrapper`).hasScrollBar());
    }, [props.selectedCarrier?.insurances?.length])

    useEffect(() => {
        if (isSavingCarrier) {
            let selectedCarrier = props.selectedCarrier;

            if (selectedCarrier.id === undefined || selectedCarrier.id === -1) {
                selectedCarrier.id = 0;
            }

            if (
                (selectedCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                (selectedCarrier.city || '').trim().replace(/\s/g, "") !== "" &&
                (selectedCarrier.state || '').trim().replace(/\s/g, "") !== "" &&
                (selectedCarrier.address1 || '').trim() !== "" &&
                (selectedCarrier.zip || '').trim() !== ""
            ) {
                let parseCity = selectedCarrier.city.trim().replace(/\s/g, "").substring(0, 3);

                if (parseCity.toLowerCase() === "ft.") {
                    parseCity = "FO";
                }
                if (parseCity.toLowerCase() === "mt.") {
                    parseCity = "MO";
                }
                if (parseCity.toLowerCase() === "st.") {
                    parseCity = "SA";
                }

                let newCode = (selectedCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedCarrier.state || '').trim().replace(/\s/g, "").substring(0, 2);

                selectedCarrier.code = newCode.toUpperCase();

                $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                    if (res.result === 'OK') {
                        let carrier = JSON.parse(JSON.stringify(res.carrier));

                        if (props.selectedCarrier.id === undefined && (props.selectedCarrier.id || 0) === 0) {
                            await props.setSelectedCarrier({
                                ...props.selectedCarrier,
                                id: carrier.id,
                                code: carrier.code,
                                code_number: carrier.code_number,
                                contacts: carrier.contacts || []
                            });
                        } else {
                            await props.setSelectedCarrier({
                                ...props.selectedCarrier,
                                contacts: carrier.contacts || []
                            });
                        }

                        (res.carrier.contacts || []).map(async (contact, index) => {

                            if (contact.is_primary === 1) {
                                if ((props.selectedContact?.id || 0) === 0 || props.selectedContact?.id === contact.id) {
                                    await props.setSelectedCarrierContact(contact);
                                }
                            }

                            return true;
                        });
                    }

                    await setIsSavingCarrier(false);
                }).catch(e => {
                    console.log('error on saving carrier', e);
                    setIsSavingCarrier(false);
                });
            } else {
                setIsSavingCarrier(false);
            }
        }
    }, [isSavingCarrier]);

    useEffect(() => {
        if (isSavingContact) {
            if (props.selectedCarrier.id === undefined) {
                setIsSavingContact(false);
                return;
            }

            let contact = props.selectedContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedCarrier.id;
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
                contact.address1 = props.selectedCarrier.address1;
                contact.address2 = props.selectedCarrier.address2;
                contact.city = props.selectedCarrier.city;
                contact.state = props.selectedCarrier.state;
                contact.zip_code = props.selectedCarrier.zip;
            }

            $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCarrier({ ...props.selectedCarrier, contacts: res.contacts });
                    await props.setSelectedCarrierContact(res.contact);
                }

                setIsSavingContact(false);
            }).catch(e => {
                console.log('error on saving carrier contact', e);
                setIsSavingContact(false);
            });
        }
    }, [isSavingContact]);

    useEffect(() => {
        if (isSavingMailingAddress) {
            if ((props.selectedCarrier.id || 0) > 0) {
                let mailing_address = props.selectedCarrier.mailing_address || {};

                if (mailing_address.id === undefined) {
                    mailing_address.id = 0;
                }
                mailing_address.carrier_id = props.selectedCarrier.id;

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

                    $.post(props.serverUrl + '/saveCarrierMailingAddress', mailing_address).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: res.mailing_address });
                        }

                        await setIsSavingMailingAddress(false);
                    }).catch(e => {
                        console.log('error on saving carrier mailing address', e);
                        setIsSavingMailingAddress(false);
                    });
                } else {
                    setIsSavingMailingAddress(false);
                }
            }
        }
    }, [isSavingMailingAddress]);

    useEffect(() => {
        if (isSavingFactoringCompany) {
            let factoring_company = props.selectedCarrier?.factoring_company || {};

            if (factoring_company.id === undefined) {
                factoring_company.id = 0;
            }

            factoring_company.carrier_id = props.selectedCarrier.id;

            if (
                (factoring_company.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                (factoring_company.city || '').trim().replace(/\s/g, "") !== "" &&
                (factoring_company.state || '').trim().replace(/\s/g, "") !== "" &&
                (factoring_company.address1 || '').trim() !== "" &&
                (factoring_company.zip || '').trim() !== ""
            ) {
                let parseCity = factoring_company.city.trim().replace(/\s/g, "").substring(0, 3);

                if (parseCity.toLowerCase() === "ft.") {
                    parseCity = "FO";
                }
                if (parseCity.toLowerCase() === "mt.") {
                    parseCity = "MO";
                }
                if (parseCity.toLowerCase() === "st.") {
                    parseCity = "SA";
                }

                let newCode = (factoring_company.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (factoring_company.state || '').trim().replace(/\s/g, "").substring(0, 2);

                factoring_company.code = newCode.toUpperCase();

                $.post(props.serverUrl + '/saveFactoringCompany', factoring_company).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: res.factoring_company });
                    }
                    setIsSavingFactoringCompany(false);
                }).catch(async e => {
                    console.log('error saving factoring company on carrier', e);
                    setIsSavingFactoringCompany(false);
                });
            } else {
                setIsSavingFactoringCompany(false);
            }
        }
    }, [isSavingFactoringCompany]);

    useEffect(() => {
        refCarrierCode.current.focus({
            preventScroll: true
        });
    }, [])

    useEffect(() => {
        if (props.screenFocused) {
            refCarrierCode.current.focus({
                preventScroll: true
            });
        }
    }, [props.screenFocused])

    useEffect(() => {
        $.post(props.serverUrl + '/getCarrierPopupItems').then(res => {
            if (res.result === 'OK') {
                props.setEquipments(res.equipments.map(e => {
                    e.selected = false;
                    return e;
                }));
                props.setInsuranceTypes(res.insurance_types.map(t => {
                    t.selected = false;
                    return t;
                }));
            }
        })
    }, []);

    useEffect(() => {
        if (isCalendarShown) {
            setInsuranceCompanyDropdownItems([]);
            setDriverEquipmentDropdownItems([]);
        }
    }, [isCalendarShown])

    useEffect(async () => {
        let emails = [];
        (props.selectedCarrier?.mailing_address?.mailing_contact?.email_work || '') !== '' && emails.push({ id: 1, type: 'work', email: props.selectedCarrier?.mailing_address?.mailing_contact.email_work });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.email_personal || '') !== '' && emails.push({ id: 2, type: 'personal', email: props.selectedCarrier?.mailing_address?.mailing_contact.email_personal });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.email_other || '') !== '' && emails.push({ id: 3, type: 'other', email: props.selectedCarrier?.mailing_address?.mailing_contact.email_other });

        await setMailingContactEmailItems(emails);
    }, [
        props.selectedCarrier?.mailing_address?.mailing_contact?.email_work,
        props.selectedCarrier?.mailing_address?.mailing_contact?.email_personal,
        props.selectedCarrier?.mailing_address?.mailing_contact?.email_other,
        props.selectedCarrier?.mailing_address?.mailing_contact?.primary_email
    ]);

    useEffect(async () => {
        let phones = [];
        (props.selectedContact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedContact.phone_work });
        (props.selectedContact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedContact.phone_work_fax });
        (props.selectedContact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedContact.phone_mobile });
        (props.selectedContact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedContact.phone_direct });
        (props.selectedContact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedContact.phone_other });

        await setCarrierContactPhoneItems(phones);
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

        await setCarrierContactEmailItems(emails);
    }, [
        props.selectedContact?.email_work,
        props.selectedContact?.email_personal,
        props.selectedContact?.email_other,
        props.selectedContact?.primary_email
    ]);

    useEffect(async () => {
        let phones = [];
        (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work || '') !== '' && phones.push({ id: 1, type: 'work', phone: props.selectedCarrier?.mailing_address?.mailing_contact.phone_work });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work_fax || '') !== '' && phones.push({ id: 2, type: 'fax', phone: props.selectedCarrier?.mailing_address?.mailing_contact.phone_work_fax });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_mobile || '') !== '' && phones.push({ id: 3, type: 'mobile', phone: props.selectedCarrier?.mailing_address?.mailing_contact.phone_mobile });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_direct || '') !== '' && phones.push({ id: 4, type: 'direct', phone: props.selectedCarrier?.mailing_address?.mailing_contact.phone_direct });
        (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_other || '') !== '' && phones.push({ id: 5, type: 'other', phone: props.selectedCarrier?.mailing_address?.mailing_contact.phone_other });

        await setMailingContactPhoneItems(phones);
    }, [
        props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work,
        props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work_fax,
        props.selectedCarrier?.mailing_address?.mailing_contact?.phone_mobile,
        props.selectedCarrier?.mailing_address?.mailing_contact?.phone_direct,
        props.selectedCarrier?.mailing_address?.mailing_contact?.phone_other,
        props.selectedCarrier?.mailing_address?.mailing_contact?.primary_phone
    ]);

    const setInitialValues = (clearCode = true) => {
        setIsSavingCarrier(false);
        setIsSavingDriver(false);
        props.setSelectedCarrierContact({});
        props.setSelectedCarrierNote({});
        props.setContactSearch({});
        props.setShowingCarrierContactList(true);
        props.setSelectedDriver({});
        props.setSelectedInsurance({})
        props.setSelectedCarrier({ id: 0, code: clearCode ? '' : props.selectedCarrier.code });
        setPopupItems([]);

        refCarrierCode.current.focus();
    }

    const searchCarrierBtnClick = () => {
        let carrierSearch = [
            {
                field: 'Name',
                data: (props.selectedCarrier.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedCarrier.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedCarrier.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedCarrier.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedCarrier.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedCarrier.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedCarrier.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/carrierSearch', { search: carrierSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setCarrierSearch(carrierSearch);
                await props.setCarriers(res.carriers);

                if (!props.openedPanels.includes(props.carrierSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.carrierSearchPanelName]);
                }
            }
        });
    }

    const searchCarrierByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                $.post(props.serverUrl + '/carriers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.carriers.length > 0) {
                            await setInitialValues();
                            await props.setSelectedCarrier(res.carriers[0]);

                            await res.carriers[0].contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedCarrierContact(c);
                                }
                                return true;
                            });

                            await props.setSelectedDriver({});
                            await props.setSelectedInsurance({});

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

    const validateCarrierForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingCarrier) {
                setIsSavingCarrier(true);
            }
        }
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingContact) {
                setIsSavingContact(true);
            }
        }
    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Carrier Id',
                data: props.selectedCarrier.id || 0
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

        $.post(props.serverUrl + '/carrierContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setContactSearch({ ...props.contactSearch, filters: filters });
                await props.setCarrierContacts(res.contacts.map((contact, index) => {
                    contact.customer = contact.carrier;
                    return contact;
                }))

                if (!props.openedPanels.includes(props.carrierContactSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.carrierContactSearchPanelName]);
                }
            }
        });
    }

    const validateMailingAddressToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingMailingAddress) {
                setIsSavingMailingAddress(true);
            }
        }
    }

    const clearMailingAddressBtn = async () => {
        await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: {} });

        if (props.selectedCarrier.id || 0 > 0) {
            await $.post(props.serverUrl + '/deleteCarrierMailingAddress', { carrier_id: (props.selectedCarrier.id || 0) }).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: {} });
                }
            });
        }
    }

    const remitToAddressBtn = (e) => {
        if (props.selectedCarrier.id === undefined) {
            window.alert('You must select a carrier first!');
            return;
        }

        if (props.selectedCarrier.id === 0) {
            window.alert('You must save the carrier first!');
            return;
        }

        let mailing_address = {};

        mailing_address.id = -1;
        mailing_address.carrier_id = props.selectedCarrier.id;
        mailing_address.code = props.selectedCarrier.code;
        mailing_address.code_number = props.selectedCarrier.code_number;
        mailing_address.name = props.selectedCarrier.name;
        mailing_address.address1 = props.selectedCarrier.address1;
        mailing_address.address2 = props.selectedCarrier.address2;
        mailing_address.city = props.selectedCarrier.city;
        mailing_address.state = props.selectedCarrier.state;
        mailing_address.zip = props.selectedCarrier.zip;
        mailing_address.contact_name = props.selectedCarrier.contact_name;
        mailing_address.contact_phone = props.selectedCarrier.contact_phone;
        mailing_address.ext = props.selectedCarrier.ext;
        mailing_address.email = props.selectedCarrier.email;

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

        } else if (props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1) > -1) {
            mailing_address.mailing_contact_id = props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].id;
            mailing_address.mailing_contact = props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)];

            mailing_address.mailing_contact_primary_phone = props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].phone_work !== ''
                ? 'work'
                : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].phone_work_fax !== ''
                    ? 'fax'
                    : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].phone_mobile !== ''
                        ? 'mobile'
                        : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].phone_direct !== ''
                            ? 'direct'
                            : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].phone_other !== ''
                                ? 'other' : 'work';

            mailing_address.mailing_contact_primary_email = props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].email_work !== ''
                ? 'work'
                : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].email_personal !== ''
                    ? 'personal'
                    : props.selectedCarrier.contacts[props.selectedCarrier.contacts.findIndex(x => x.is_primary === 1)].email_other !== ''
                        ? 'other' : 'work';

        } else if (props.selectedCarrier.contacts.length > 0) {
            mailing_address.mailing_contact_id = props.selectedCarrier.contacts[0].id;
            mailing_address.mailing_contact = props.selectedCarrier.contacts[0];

            mailing_address.mailing_contact_primary_phone = props.selectedCarrier.contacts[0].phone_work !== ''
                ? 'work'
                : props.selectedCarrier.contacts[0].phone_work_fax !== ''
                    ? 'fax'
                    : props.selectedCarrier.contacts[0].phone_mobile !== ''
                        ? 'mobile'
                        : props.selectedCarrier.contacts[0].phone_direct !== ''
                            ? 'direct'
                            : props.selectedCarrier.contacts[0].phone_other !== ''
                                ? 'other' : 'work';

            mailing_address.mailing_contact_primary_email = props.selectedCarrier.contacts[0].email_work !== ''
                ? 'work'
                : props.selectedCarrier.contacts[0].email_personal !== ''
                    ? 'personal'
                    : props.selectedCarrier.contacts[0].email_other !== ''
                        ? 'other' : 'work';

        } else {
            mailing_address.mailing_contact_id = 0;
            mailing_address.mailing_contact = {};
            mailing_address.mailing_contact_primary_phone = 'work';
            mailing_address.mailing_contact_primary_email = 'work';
        }

        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });

        validateMailingAddressToSave({ keyCode: 9 });
    }

    const validateFactoringCompanyToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedCarrier.id || 0) > 0) {
                if (!isSavingFactoringCompany) {
                    setIsSavingFactoringCompany(true);
                }
            }
        }
    }

    const searchFactoringCompanyBtnClick = () => {

        if ((props.selectedCarrier.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedCarrier.factoring_company?.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedCarrier.factoring_company?.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedCarrier.factoring_company?.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedCarrier.factoring_company?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedCarrier.factoring_company?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedCarrier.factoring_company?.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedCarrier.factoring_company?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setFactoringCompanySearch(factoringCompanySearch);
                await props.setFactoringCompanies(res.factoring_companies);

                if (!props.openedPanels.includes(props.carrierFactoringCompanySearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.carrierFactoringCompanySearchPanelName]);
                }
            }
        });
    }

    const moreFactoringCompanyBtnClick = () => {
        if ((props.selectedCarrier.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        if ((props.selectedCarrier.factoring_company?.id || 0) === 0) {
            window.alert('You must select a factoring company first!');
            return;
        }

        props.setSelectedFactoringCompany({ ...props.selectedCarrier.factoring_company });

        (props.selectedCarrier?.factoring_company?.contacts || []).map(async c => {
            if (c.is_primary === 1) {
                props.setSelectedFactoringCompanyContact(c);
            }
            return true;
        });

        if (!props.openedPanels.includes(props.carrierFactoringCompanyPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.carrierFactoringCompanyPanelName]);
        }
    }

    const clearFactoringCompanyBtnClick = async () => {
        let selectedCarrier = { ...props.selectedCarrier };
        selectedCarrier.factoring_company_id = null;
        await props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: {} });

        if (props.selectedCarrier.id || 0 > 0) {
            await $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: {} });
                }
            });
        }
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

    useEffect(() => {
        if (isSavingDriver) {
            if ((props.selectedCarrier?.id || 0) > 0) {
                let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id };

                if ((driver?.first_name || '').trim() !== '') {

                    $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                        if (res.result === 'OK') {
                            props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                            props.setSelectedDriver({ ...props.selectedDriver, id: res.driver.id });
                        }

                        setIsSavingDriver(false);
                    }).catch(e => {
                        console.log('error on saving carrier driver', e);
                        setIsSavingDriver(false);
                    });
                } else {
                    setIsSavingDriver(false);
                }
            }
        }
    }, [isSavingDriver])

    const validateDriverForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingDriver) {
                setIsSavingDriver(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingInsurance) {
            let insurance = { ...props.selectedInsurance, carrier_id: (props.selectedCarrier?.id || 0) };

            if ((insurance.insurance_type_id || 0) > 0 &&
                (insurance.company || '') !== '' &&
                (insurance.expiration_date || '') !== '' &&
                (insurance.amount || '') !== '') {

                insurance.expiration_date = getFormattedDates(insurance.expiration_date);
                insurance.amount = accounting.unformat(insurance.amount);
                insurance.deductible = accounting.unformat(insurance.deductible);

                $.post(props.serverUrl + '/saveInsurance', insurance).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedCarrier({ ...props.selectedCarrier, insurances: res.insurances });
                        await props.setSelectedInsurance({
                            ...insurance,
                            id: res.insurance.id,
                            amount: res.insurance.amount ? accounting.formatNumber(res.insurance.amount, 2, ',', '.') : res.insurance.amount,
                            deductible: res.insurance.deductible ? accounting.formatNumber(res.insurance.deductible, 2, ',', '.') : res.insurance.deductible
                        });
                    }
                    setIsSavingInsurance(false);
                }).catch(e => {
                    console.log('error on saving carrier insurance', e);
                    setIsSavingInsurance(false);
                });
            } else {
                setIsSavingInsurance(false);
            }
        }
    }, [isSavingInsurance])

    const validateInsuranceForSaving = async (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingInsurance) {
                setIsSavingInsurance(true);
            }
        }

        if (key === 13) {
            let expiration_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedInsurance?.expiration_date || ''), 'MM/DD/YYYY');
            await setPreSelectedExpirationDate(expiration_date);

            if (isCalendarShown) {
                expiration_date = preSelectedExpirationDate.clone().format('MM/DD/YYYY');

                let insurance = { ...props.selectedInsurance, carrier_id: props.selectedCarrier.id };
                insurance.expiration_date = expiration_date;

                await props.setSelectedInsurance(insurance);

                if (!isSavingInsurance) {
                    setIsSavingInsurance(true);
                }
                await setIsCalendarShown(false);
            }
        }

        if (key >= 37 && key <= 40) {
            let expiration_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedInsurance?.expiration_date || ''), 'MM/DD/YYYY');
            await setPreSelectedExpirationDate(expiration_date);

            if (isCalendarShown) {
                e.preventDefault();

                if (key === 37) { // left - minus 1
                    setPreSelectedExpirationDate(preSelectedExpirationDate.clone().subtract(1, 'day'));
                }

                if (key === 38) { // up - minus 7
                    setPreSelectedExpirationDate(preSelectedExpirationDate.clone().subtract(7, 'day'));
                }

                if (key === 39) { // right - plus 1
                    setPreSelectedExpirationDate(preSelectedExpirationDate.clone().add(1, 'day'));
                }

                if (key === 40) { // down - plus 7
                    setPreSelectedExpirationDate(preSelectedExpirationDate.clone().add(7, 'day'));
                }
            }
        }
    }

    const insuranceStatusClasses = () => {
        let classes = 'input-box-container insurance-status';
        let curDate = moment().startOf('day');
        let curDate2 = moment();
        let futureMonth = curDate2.add(1, 'M');
        let statusClass = '';

        (props.selectedCarrier.insurances || []).map((insurance, index) => {
            let expDate = moment(insurance.expiration_date, 'MM/DD/YYYY');

            if (expDate < curDate) {
                statusClass = 'expired';
            } else if (expDate >= curDate && expDate <= futureMonth) {
                if (statusClass !== 'expired') {
                    statusClass = 'warning';
                }
            } else {
                if (statusClass !== 'expired' && statusClass !== 'warning') {
                    statusClass = 'active';
                }
            }
        })

        return classes + ' ' + statusClass;
    }

    const documentsBtnClick = () => {
        if ((props.selectedCarrier.id || 0) > 0) {
            props.setSelectedCarrierDocument({
                id: 0,
                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                date_entered: moment().format('MM/DD/YYYY')
            });

            if (!props.openedPanels.includes(props.carrierDocumentsPanelName)) {
                props.setOpenedPanels([...props.openedPanels, props.carrierDocumentsPanelName]);
            }
        } else {
            window.alert('You must select a carrier first!');
        }
    }

    const revenueInformationBtnClick = () => {
        if (!props.openedPanels.includes(props.carrierRevenueInformationPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.carrierRevenueInformationPanelName]);
        }
    }

    const equipmentInformationBtnClick = () => {
        if ((props.selectedCarrier?.id || 0) > 0) {
            props.setEquipmentInformation({ carrier: props.selectedCarrier });
        }

        if (!props.openedPanels.includes(props.carrierEquipmentPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.carrierEquipmentPanelName]);
        }
    }

    const orderHistoryBtnClick = () => {
        if (!props.openedPanels.includes(props.carrierOrderHistoryPanelName)) {
            props.setOpenedPanels([...props.openedPanels, props.carrierOrderHistoryPanelName]);
        }
    }

    const goToTabindex = (index) => {
        let elems = document.getElementsByTagName('input');

        for (var i = elems.length; i--;) {
            if (elems[i].getAttribute('tabindex') && elems[i].getAttribute('tabindex') === index) {
                elems[i].focus();
                break;
            }
        }
    }

    const getFormattedDates = (date) => {
        let formattedDate = date;

        try {
            if (moment(date.trim(), 'MM/DD/YY').format('MM/DD/YY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/YY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/').format('MM/DD/') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD').format('MM/DD') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/').format('MM/') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM').format('MM') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/Y').format('M/D/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D/Y').format('MM/D/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/Y').format('MM/DD/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/DD/Y').format('M/DD/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/DD/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/YY').format('M/D/YY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/YY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/YYYY').format('M/D/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D/YYYY').format('MM/D/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/DD/YYYY').format('M/DD/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/DD/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/').format('M/D/') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D').format('M/D') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D').format('MM/D') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M').format('M') === date.trim()) {
                formattedDate = moment(date.trim(), 'M').format('MM/DD/YYYY');
            }
        } catch (e) {
            console.log(e);
        }

        return formattedDate;
    }

    return (
        <div className="carriers-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px',
            background: props.isOnPanel ? 'transparent' : 'rgb(250, 250, 250)',
            background: props.isOnPanel ? 'transparent' : '-moz-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : '-webkit-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : 'radial-gradient(ellipse at center, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            padding: props.isOnPanel ? '10px 0' : 10
        }}>

            {!props.isOnPanel && <PanelContainer setOpenedPanels={props.setOpenedPanels} openedPanels={props.openedPanels} />}

            <div className="fields-container-row">
                <div className="fields-container-col">
                    <div className="form-bordered-box" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '15px 10px'
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Carrier</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={searchCarrierBtnClick}>
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
                                <input tabIndex={43 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                    ref={refCarrierCode}
                                    onKeyDown={searchCarrierByCode}
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, code: e.target.value })}
                                    value={(props.selectedCarrier.code_number || 0) === 0 ? (props.selectedCarrier.code || '') : props.selectedCarrier.code + props.selectedCarrier.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={44 + props.tabTimes} type="text" placeholder="Name"
                                    // onKeyDown={validateCarrierForSaving} 
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, name: e.target.value })}
                                    value={props.selectedCarrier.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={45 + props.tabTimes} type="text" placeholder="Address 1"
                                    // onKeyDown={validateCarrierForSaving} 
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address1: e.target.value })}
                                    value={props.selectedCarrier.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={46 + props.tabTimes} type="text" placeholder="Address 2"
                                    // onKeyDown={validateCarrierForSaving} 
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address2: e.target.value })}
                                    value={props.selectedCarrier.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={47 + props.tabTimes} type="text" placeholder="City"
                                    // onKeyDown={validateCarrierForSaving} 
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, city: e.target.value })}
                                    value={props.selectedCarrier.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={48 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                    // onKeyDown={validateCarrierForSaving} 
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, state: e.target.value })}
                                    value={props.selectedCarrier.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={49 + props.tabTimes} type="text" placeholder="Postal Code"
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, zip: e.target.value })}
                                    value={props.selectedCarrier.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={50 + props.tabTimes} type="text" placeholder="Contact Name"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.contact_name || '')
                                            : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedCarrier?.contacts.find(c => c.is_primary === 1).last_name
                                    }
                                />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone" style={{ position: 'relative' }}>
                                <MaskedInput tabIndex={51 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.contact_phone || '')
                                            : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work
                                                : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }
                                />

                                {
                                    ((props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                    <div
                                        className={classnames({
                                            'selected-carrier-contact-primary-phone': true,
                                            'pushed': false
                                        })}>
                                        {props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone}
                                    </div>
                                }
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={52 + props.tabTimes} type="text" placeholder="Ext"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.ext || '')
                                            : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_ext
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container" style={{position: 'relative', flexGrow: 1}}>
                                <input tabIndex={53 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateCarrierForSaving}
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.email || '')
                                            : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                                ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_work
                                                : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                    ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_personal
                                                    : props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                        ? props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_other
                                                        : ''
                                    }
                                />
                                {
                                    ((props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                    <div
                                        className={classnames({
                                            'selected-carrier-contact-primary-email': true,
                                            'pushed': false
                                        })}>
                                        {props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col grow">
                    <div className="form-borderless-box" style={{
                        alignItems: 'center',
                        padding: '15px 5px'
                    }}>
                        <div className="input-toggle-container">
                            <input type="checkbox" id={props.panelName + 'cbox-carrier-do-not-use-btn'} onChange={(e) => {
                                props.setSelectedCarrier({ ...props.selectedCarrier, do_not_use: e.target.checked ? 1 : 0 });
                                validateCarrierForSaving({ keyCode: 9 });
                            }} checked={(props.selectedCarrier.do_not_use || 0) === 1} />
                            <label htmlFor={props.panelName + 'cbox-carrier-do-not-use-btn'}>
                                <div className="label-text">DO NOT USE</div>
                                <div className="input-toggle-btn"></div>
                            </label>
                        </div>

                        {/* <ReactStars {...carrierStars} /> */}
                        <Rating
                            name="simple-controlled"
                            value={props.selectedCarrier?.rating || 0}
                            onChange={(e, newValue) => {
                                props.setSelectedCarrier({
                                    ...props.selectedCarrier,
                                    rating: newValue
                                });

                                validateCarrierForSaving({ keyCode: 9 });
                            }}
                        />

                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={76 + props.tabTimes} type="text" placeholder='MC Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mc_number: e.target.value })
                                }}
                                value={props.selectedCarrier.mc_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={77 + props.tabTimes} type="text" placeholder='DOT Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, dot_number: e.target.value })
                                }}
                                value={props.selectedCarrier.dot_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={78 + props.tabTimes} type="text" placeholder='SCAC'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, scac: e.target.value })
                                }}
                                value={props.selectedCarrier.scac || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={79 + props.tabTimes} type="text" placeholder='FID'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, fid: e.target.value })
                                }}
                                value={props.selectedCarrier.fid || ''} />
                        </div>
                        <div className={insuranceStatusClasses()} style={{ width: '100%' }}>
                            <input type="text" placeholder='Insurance' readOnly={true} />
                        </div>
                    </div>
                </div>

                <div className="fields-container-col" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    <div className="form-bordered-box" style={{
                        flexGrow: 0,
                        marginBottom: 10
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Contacts</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={async () => {
                                    if (props.selectedCarrier.id === undefined) {
                                        window.alert('You must select a contact first!');
                                        return;
                                    }

                                    if (props.selectedContact.id === undefined) {
                                        window.alert('You must select a contact');
                                        return;
                                    }

                                    await props.setIsEditingContact(false);
                                    await props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: props.selectedContact });

                                    if (!props.openedPanels.includes(props.carrierContactsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.carrierContactsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if (props.selectedCarrier.id === undefined || props.selectedCarrier.id <= 0) {
                                        window.alert('You must select a carrier');
                                        return;
                                    }

                                    props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: { id: 0, carrier_id: props.selectedCarrier.id } });
                                    props.setIsEditingContact(true);

                                    if (!props.openedPanels.includes(props.carrierContactsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.carrierContactsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add contact</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => props.setSelectedCarrierContact({})}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={80 + props.tabTimes} type="text" placeholder="First Name"
                                    ref={refCarrierContactFirstName}
                                    // onKeyDown={validateContactForSaving} 
                                    onChange={e => { props.setSelectedCarrierContact({ ...props.selectedContact, first_name: e.target.value }) }}
                                    value={props.selectedContact.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={81 + props.tabTimes} type="text" placeholder="Last Name"
                                    // onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, last_name: e.target.value })}
                                    value={props.selectedContact.last_name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ width: '50%' }}>
                                <div className="select-box-wrapper">
                                    <MaskedInput tabIndex={82 + props.tabTimes}
                                        ref={refCarrierContactPhone}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone"
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (showCarrierContactPhones) {
                                                        let selectedIndex = carrierContactPhoneItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (carrierContactPhoneItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierContactPhonePopupItems.current.map((r, i) => {
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
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                                return item;
                                                            }))

                                                            setShowCarrierContactPhones(true);

                                                            refCarrierContactPhonePopupItems.current.map((r, i) => {
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
                                                    if (showCarrierContactPhones) {
                                                        let selectedIndex = carrierContactPhoneItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                if (selectedIndex === (carrierContactPhoneItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierContactPhonePopupItems.current.map((r, i) => {
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
                                                            await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                                return item;
                                                            }))

                                                            setShowCarrierContactPhones(true);

                                                            refCarrierContactPhonePopupItems.current.map((r, i) => {
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
                                                    setShowCarrierContactPhones(false);
                                                    break;

                                                case 13: // enter
                                                    if (showCarrierContactPhones && carrierContactPhoneItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedCarrierContact({
                                                            ...props.selectedContact,
                                                            primary_phone: carrierContactPhoneItems[carrierContactPhoneItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowCarrierContactPhones(false);
                                                        refCarrierContactPhone.current.inputElement.focus();
                                                    }
                                                    break;
                                                case 9: // tab
                                                    if (showCarrierContactPhones) {
                                                        e.preventDefault();
                                                        await props.setSelectedCarrierContact({
                                                            ...props.selectedContact,
                                                            primary_phone: carrierContactPhoneItems[carrierContactPhoneItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowCarrierContactPhones(false);
                                                        refCarrierContactPhone.current.inputElement.focus();
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
                                                props.setSelectedCarrierContact({
                                                    ...props.selectedContact,
                                                    phone_work: e.target.value,
                                                    primary_phone: 'work'
                                                });
                                            } else {
                                                if ((props.selectedContact?.primary_phone || '') === '') {
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedContact?.primary_phone) {
                                                        case 'work':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_work: e.target.value
                                                            });
                                                            break;
                                                        case 'fax':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_work_fax: e.target.value
                                                            });
                                                            break;
                                                        case 'mobile':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_mobile: e.target.value
                                                            });
                                                            break;
                                                        case 'direct':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_direct: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedCarrierContact({
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
                                                props.setSelectedCarrierContact({
                                                    ...props.selectedContact,
                                                    phone_work: e.target.value,
                                                    primary_phone: 'work'
                                                });
                                            } else {
                                                if ((props.selectedContact?.primary_phone || '') === '') {
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        phone_work: e.target.value,
                                                        primary_phone: 'work'
                                                    });
                                                } else {
                                                    switch (props.selectedContact?.primary_phone) {
                                                        case 'work':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_work: e.target.value
                                                            });
                                                            break;
                                                        case 'fax':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_work_fax: e.target.value
                                                            });
                                                            break;
                                                        case 'mobile':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_mobile: e.target.value
                                                            });
                                                            break;
                                                        case 'direct':
                                                            props.setSelectedCarrierContact({
                                                                ...props.selectedContact,
                                                                phone_direct: e.target.value
                                                            });
                                                            break;
                                                        case 'other':
                                                            props.setSelectedCarrierContact({
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
                                                'selected-carrier-contact-primary-phone': true,
                                                'pushed': (carrierContactPhoneItems.length > 1)
                                            })}>
                                            {props.selectedContact?.primary_phone || ''}
                                        </div>
                                    }

                                    {
                                        carrierContactPhoneItems.length > 1 &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showCarrierContactPhones) {
                                                setShowCarrierContactPhones(false);
                                            } else {
                                                if (carrierContactPhoneItems.length > 1) {
                                                    await setCarrierContactPhoneItems(carrierContactPhoneItems.map((item, index) => {
                                                        item.selected = item.type === (props.selectedContact?.primary_phone || '')
                                                        return item;
                                                    }))

                                                    window.setTimeout(async () => {
                                                        await setShowCarrierContactPhones(true);

                                                        refCarrierContactPhonePopupItems.current.map((r, i) => {
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

                                            refCarrierContactPhone.current.inputElement.focus();
                                        }} />
                                    }
                                </div>

                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={showCarrierContactPhones}
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
                                            ref={refCarrierContactPhoneDropDown}
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
                                                                            await props.setSelectedCarrierContact({
                                                                                ...props.selectedContact,
                                                                                primary_phone: item.type
                                                                            });

                                                                            validateContactForSaving({ keyCode: 9 });
                                                                            setShowCarrierContactPhones(false);
                                                                            refCarrierContactPhone.current.inputElement.focus();
                                                                        }}
                                                                        ref={ref => refCarrierContactPhonePopupItems.current.push(ref)}
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
                                    <input tabIndex={83 + props.tabTimes} type="text" placeholder="Ext"
                                        // onKeyDown={validateContactForSaving}
                                        onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, phone_ext: e.target.value })}
                                        value={props.selectedContact.phone_ext || ''}
                                    />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id={props.panelName + 'cbox-carrier-contacts-primary-btn'}
                                        onChange={(e) => {
                                            props.setSelectedCarrierContact({ ...props.selectedContact, is_primary: e.target.checked ? 1 : 0 });
                                            validateContactForSaving({ keyCode: 9 });
                                        }}
                                        checked={(props.selectedContact.is_primary || 0) === 1} />
                                    <label htmlFor={props.panelName + 'cbox-carrier-contacts-primary-btn'}>
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
                                    <input tabIndex={84 + props.tabTimes} type="text" placeholder="E-Mail"
                                        style={{
                                            width: 'calc(100% - 25px)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                        ref={refCarrierContactEmail}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (showCarrierContactEmails) {
                                                        let selectedIndex = carrierContactEmailItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (carrierContactEmailItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierContactEmailPopupItems.current.map((r, i) => {
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
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                                return item;
                                                            }))

                                                            setShowCarrierContactEmails(true);

                                                            refCarrierContactEmailPopupItems.current.map((r, i) => {
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
                                                    if (showCarrierContactEmails) {
                                                        let selectedIndex = carrierContactEmailItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                if (selectedIndex === (carrierContactEmailItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierContactEmailPopupItems.current.map((r, i) => {
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
                                                            await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                                item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                                return item;
                                                            }))

                                                            setShowCarrierContactEmails(true);

                                                            refCarrierContactEmailPopupItems.current.map((r, i) => {
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
                                                    setShowCarrierContactEmails(false);
                                                    break;

                                                case 13: // enter
                                                    if (showCarrierContactEmails && carrierContactEmailItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedCarrierContact({
                                                            ...props.selectedContact,
                                                            primary_email: carrierContactEmailItems[carrierContactEmailItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowCarrierContactEmails(false);
                                                        refCarrierContactEmail.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showCarrierContactEmails) {
                                                        e.preventDefault();
                                                        await props.setSelectedCarrierContact({
                                                            ...props.selectedContact,
                                                            primary_email: carrierContactEmailItems[carrierContactEmailItems.findIndex(item => item.selected)].type
                                                        });

                                                        validateContactForSaving({ keyCode: 9 });
                                                        setShowCarrierContactEmails(false);
                                                        refCarrierContactEmail.current.focus();
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
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        email_work: e.target.value
                                                    });
                                                    break;
                                                case 'personal':
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        email_personal: e.target.value
                                                    });
                                                    break;
                                                case 'other':
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        email_other: e.target.value
                                                    });
                                                    break;
                                            }
                                        }}
                                        onChange={(e) => {
                                            switch (props.selectedContact?.primary_email) {
                                                case 'work':
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        email_work: e.target.value
                                                    });
                                                    break;
                                                case 'personal':
                                                    props.setSelectedCarrierContact({
                                                        ...props.selectedContact,
                                                        email_personal: e.target.value
                                                    });
                                                    break;
                                                case 'other':
                                                    props.setSelectedCarrierContact({
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
                                                'selected-carrier-contact-primary-email': true,
                                                'pushed': (carrierContactEmailItems.length > 1)
                                            })}>
                                            {props.selectedContact?.primary_email || ''}
                                        </div>
                                    }

                                    {
                                        carrierContactEmailItems.length > 1 &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showCarrierContactEmails) {
                                                setShowCarrierContactEmails(false);
                                            } else {
                                                if (carrierContactEmailItems.length > 1) {
                                                    await setCarrierContactEmailItems(carrierContactEmailItems.map((item, index) => {
                                                        item.selected = item.type === (props.selectedContact?.primary_email || '')
                                                        return item;
                                                    }))

                                                    window.setTimeout(async () => {
                                                        await setShowCarrierContactEmails(true);

                                                        refCarrierContactEmailPopupItems.current.map((r, i) => {
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

                                            refCarrierContactEmail.current.focus();
                                        }} />
                                    }
                                </div>
                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={showCarrierContactEmails}
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
                                            ref={refCarrierContactEmailDropDown}
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
                                                                            await props.setSelectedCarrierContact({
                                                                                ...props.selectedContact,
                                                                                primary_email: item.type
                                                                            });

                                                                            validateContactForSaving({ keyCode: 9 });
                                                                            setShowCarrierContactEmails(false);
                                                                            refCarrierContactEmail.current.focus();
                                                                        }}
                                                                        ref={ref => refCarrierContactEmailPopupItems.current.push(ref)}
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
                                <input tabIndex={85 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
                            </div>
                        </div>
                    </div>

                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                {
                                    props.showingContactList &&
                                    <div className="mochi-button" onClick={() => props.setShowingCarrierContactList(false)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                                {
                                    !props.showingContactList &&
                                    <div className="mochi-button" onClick={() => props.setShowingCarrierContactList(true)}>
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
                                        (props.selectedCarrier.contacts || []).length > 0 &&
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
                                            (props.selectedCarrier.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {
                                                        await props.setIsEditingContact(false);
                                                        await props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: contact });

                                                        if (!props.openedPanels.includes(props.carrierContactsPanelName)) {
                                                            props.setOpenedPanels([...props.openedPanels, props.carrierContactsPanelName]);
                                                        }
                                                    }} onClick={() => {
                                                        props.setSelectedCarrierContact(contact);
                                                        refCarrierContactFirstName.current.focus();
                                                    }}>
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
                                            <input type="text" placeholder="Last Name" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, last_name: e.target.value })} value={props.contactSearch.last_name || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 1" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address1: e.target.value })} value={props.contactSearch.address1 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 2" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address2: e.target.value })} value={props.contactSearch.address2 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="City" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, city: e.target.value })} value={props.contactSearch.city || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container input-state">
                                            <input type="text" placeholder="State" maxLength="2" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, state: e.target.value })} value={props.contactSearch.state || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <MaskedInput
                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                guide={true}
                                                type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, phone: e.target.value })} value={props.contactSearch.phone || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setShowingCarrierContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, email: e.target.value })} value={props.contactSearch.email || ''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col" style={{ minWidth: '28%', maxWidth: '28%' }}>
                    <div className="form-bordered-box">
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Driver Information</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedCarrier.id || 0) === 0) {
                                        window.alert('You must selecte a carrier first!');
                                        return;
                                    }

                                    if ((props.selectedDriver?.id || 0) === 0) {
                                        window.alert('You must selecte a driver first!');
                                        return;
                                    }

                                    if (window.confirm('Are you sure to delete this driver?')) {
                                        $.post(props.serverUrl + '/deleteCarrierDriver', props.selectedDriver).then(res => {
                                            if (res.result === 'OK') {
                                                console.log(res);
                                                props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                                props.setSelectedDriver({});
                                            }
                                        })
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>

                                <div className="mochi-button" onClick={() => {
                                    props.setSelectedDriver({});
                                    refCarrierDriverFirstName.current.focus();
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
                                <input tabIndex={92 + props.tabTimes} type="text" placeholder="First Name"
                                    ref={refCarrierDriverFirstName}
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                    }}
                                    value={props.selectedDriver?.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={93 + props.tabTimes} type="text" placeholder="Last Name"
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                    }}
                                    value={props.selectedDriver?.last_name || ''} />
                            </div>
                        </div>

                        <div className="form-v-sep"></div>

                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '40%' }}>
                                <MaskedInput tabIndex={94 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone"
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                    }}
                                    value={props.selectedDriver?.phone || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container" style={{ flexGrow: 1 }}>
                                <input tabIndex={95 + props.tabTimes} type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                    }}
                                    value={props.selectedDriver?.email || ''} />
                            </div>

                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text"
                                        tabIndex={96 + props.tabTimes}
                                        placeholder="Equipment"
                                        ref={refEquipment}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (driverEquipmentDropdownItems.length > 0) {
                                                        let selectedIndex = driverEquipmentDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setDriverEquipmentDropdownItems(driverEquipmentDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setDriverEquipmentDropdownItems(driverEquipmentDropdownItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (driverEquipmentDropdownItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setDriverEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                                    item.selected = (props.selectedDriver?.equipment?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selectedDriver?.equipment.id
                                                                    return item;
                                                                }))

                                                                refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting driver equipments', e);
                                                        })
                                                    }
                                                    break;

                                                case 39: case 40: // arrow right | arrow down
                                                    e.preventDefault();
                                                    if (driverEquipmentDropdownItems.length > 0) {
                                                        let selectedIndex = driverEquipmentDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setDriverEquipmentDropdownItems(driverEquipmentDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setDriverEquipmentDropdownItems(driverEquipmentDropdownItems.map((item, index) => {
                                                                if (selectedIndex === (driverEquipmentDropdownItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setDriverEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                                    item.selected = (props.selectedDriver?.equipment?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selectedDriver?.equipment.id
                                                                    return item;
                                                                }))

                                                                refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting driver equipments', e);
                                                        })
                                                    }
                                                    break;

                                                case 27: // escape
                                                    setDriverEquipmentDropdownItems([]);
                                                    break;

                                                case 13: // enter
                                                    if (driverEquipmentDropdownItems.length > 0 && driverEquipmentDropdownItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedDriver({
                                                            ...props.selectedDriver,
                                                            equipment: driverEquipmentDropdownItems[driverEquipmentDropdownItems.findIndex(item => item.selected)],
                                                            equipment_id: driverEquipmentDropdownItems[driverEquipmentDropdownItems.findIndex(item => item.selected)].id
                                                        });
                                                        validateDriverForSaving({ keyCode: 9 });
                                                        setDriverEquipmentDropdownItems([]);
                                                        refEquipment.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (driverEquipmentDropdownItems.length > 0) {
                                                        e.preventDefault();
                                                        await props.setSelectedDriver({
                                                            ...props.selectedDriver,
                                                            equipment: driverEquipmentDropdownItems[driverEquipmentDropdownItems.findIndex(item => item.selected)],
                                                            equipment_id: driverEquipmentDropdownItems[driverEquipmentDropdownItems.findIndex(item => item.selected)].id
                                                        });
                                                        validateDriverForSaving({ keyCode: 9 });
                                                        setDriverEquipmentDropdownItems([]);
                                                        refEquipment.current.focus();
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onBlur={async () => {
                                            if ((props.selectedDriver?.equipment?.id || 0) === 0) {
                                                await props.setSelectedDriver({ ...props.selectedDriver, equipment: {} });
                                            }
                                        }}
                                        onInput={async (e) => {
                                            let equipment = props.selectedDriver?.equipment || {};
                                            equipment.id = 0;
                                            equipment.name = e.target.value;
                                            await props.setSelectedDriver({ ...props.selectedDriver, equipment: equipment });

                                            if (e.target.value.trim() === '') {
                                                setDriverEquipmentDropdownItems([]);
                                            } else {
                                                $.post(props.serverUrl + '/getEquipments', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setDriverEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                            item.selected = (props.selectedDriver?.equipment?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedDriver?.equipment.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting driver equipments', e);
                                                })
                                            }
                                        }}
                                        onChange={async (e) => {
                                            let equipment = props.selectedDriver?.equipment || {};
                                            equipment.id = 0;
                                            equipment.name = e.target.value;
                                            await props.setSelectedDriver({ ...props.selectedDriver, equipment: equipment });
                                        }}
                                        value={props.selectedDriver?.equipment?.name || ''}
                                    />
                                    <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                        if (driverEquipmentDropdownItems.length > 0) {
                                            setDriverEquipmentDropdownItems([]);
                                        } else {
                                            if ((props.selectedDriver?.equipment?.id || 0) === 0 && (props.selectedDriver?.equipment?.name || '') !== '') {
                                                $.post(props.serverUrl + '/getEquipments', {
                                                    name: props.selectedDriver?.equipment.name
                                                }).then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setDriverEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                            item.selected = (props.selectedDriver?.equipment?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedDriver?.equipment.id
                                                            return item;
                                                        }))

                                                        refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                }).catch(async e => {
                                                    console.log('error getting driver equipments', e);
                                                })
                                            } else {
                                                $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setDriverEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                            item.selected = (props.selectedDriver?.equipment?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedDriver?.equipment.id
                                                            return item;
                                                        }))

                                                        refDriverEquipmentPopupItems.current.map((r, i) => {
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
                                                }).catch(async e => {
                                                    console.log('error getting driver equipments', e);
                                                })
                                            }
                                        }

                                        refEquipment.current.focus();
                                    }} />
                                </div>

                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={driverEquipmentDropdownItems.length > 0}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-driver-equipment"
                                            style={{
                                                ...styles,
                                                left: '-50%',
                                                display: 'block'
                                            }}
                                            ref={refDriverEquipmentDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below left">
                                                <div className="mochi-contextual-popup-content">
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            driverEquipmentDropdownItems.map((item, index) => {
                                                                const mochiItemClasses = classnames({
                                                                    'mochi-item': true,
                                                                    'selected': item.selected
                                                                });

                                                                const searchValue = (props.selectedDriver?.equipment?.id || 0) === 0 && (props.selectedDriver?.equipment?.name || '') !== ''
                                                                    ? props.selectedDriver?.equipment?.name : undefined;

                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={mochiItemClasses}
                                                                        id={item.id}
                                                                        onClick={async () => {
                                                                            await props.setSelectedDriver({
                                                                                ...props.selectedDriver,
                                                                                equipment: item,
                                                                                equipment_id: item.id
                                                                            });
                                                                            validateDriverForSaving({ keyCode: 9 });
                                                                            setDriverEquipmentDropdownItems([]);
                                                                            refEquipment.current.focus();
                                                                        }}
                                                                        ref={ref => refDriverEquipmentPopupItems.current.push(ref)}
                                                                    >
                                                                        {
                                                                            searchValue === undefined
                                                                                ? item.name
                                                                                : <Highlighter
                                                                                    highlightClassName="mochi-item-highlight-text"
                                                                                    searchWords={[searchValue]}
                                                                                    autoEscape={true}
                                                                                    textToHighlight={item.name}
                                                                                />
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
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={97 + props.tabTimes} type="text" placeholder="Truck"
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                    }}
                                    value={props.selectedDriver?.truck || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={98 + props.tabTimes} type="text" placeholder="Trailer"
                                    onKeyDown={validateDriverForSaving}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                    }}
                                    value={props.selectedDriver?.trailer || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={99 + props.tabTimes} type="text" placeholder="Notes"
                                    onKeyDown={(e) => {
                                        let key = e.keyCode || e.which;

                                        if (key === 9) {
                                            if (props.selectedCarrier?.id || 0 > 0) {
                                                let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id };

                                                if ((driver.first_name || '').trim() !== '') {
                                                    e.preventDefault();

                                                    $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                                        if (res.result === 'OK') {
                                                            props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                                            props.setSelectedDriver({});

                                                            refCarrierDriverFirstName.current.focus();
                                                        }

                                                        await setIsSavingDriver(false);
                                                    }).catch(e => {
                                                        console.log('error on saving carrier driver', e);
                                                        setIsSavingDriver(false);
                                                    });
                                                } else {
                                                    e.preventDefault();
                                                    setIsSavingDriver(false);
                                                    refCarrierCode.current.focus();
                                                }
                                            } else {
                                                e.preventDefault();
                                                setIsSavingDriver(false);
                                                refCarrierCode.current.focus();
                                            }
                                        }
                                    }}
                                    onInput={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, notes: e.target.value })
                                    }}
                                    onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, notes: e.target.value })
                                    }}
                                    value={props.selectedDriver?.notes || ''} />
                            </div>
                        </div>

                        <div className="form-row" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            flexGrow: 1,
                            paddingBottom: 10
                        }}>
                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">E-mail Driver</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fields-container-row" style={{ marginTop: 10 }}>
                <div className="fields-container-col">
                    <div className="form-bordered-box" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '15px 10px'
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Mailing Address</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={remitToAddressBtn}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Remit to address is the same</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={clearMailingAddressBtn}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input tabIndex={54 + props.tabTimes} type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={props.selectedCarrier.mailing_address?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input tabIndex={55 + props.tabTimes} type="text" placeholder="Name"
                                    // onKeyDown={validateMailingAddressToSave} 
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={56 + props.tabTimes} type="text" placeholder="Address 1"
                                    // onKeyDown={validateMailingAddressToSave} 
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={57 + props.tabTimes} type="text" placeholder="Address 2"
                                    // onKeyDown={validateMailingAddressToSave} 
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={58 + props.tabTimes} type="text" placeholder="City"
                                    // onKeyDown={validateMailingAddressToSave} 
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={59 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                    // onKeyDown={validateMailingAddressToSave} 
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={60 + props.tabTimes} type="text" placeholder="Postal Code"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier.mailing_address?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input
                                        tabIndex={61 + props.tabTimes}
                                        type="text" placeholder="Contact Name"
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
                                                            await setMailingContactNameItems((props.selectedCarrier?.contacts || []).map((item, index) => {
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
                                                            await setMailingContactNameItems((props.selectedCarrier?.contacts || []).map((item, index) => {
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
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactNames(false);
                                                        refMailingContactName.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (showMailingContactNames) {
                                                        e.preventDefault();
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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

                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                        setShowMailingContactNames(false);
                                                        refMailingContactName.current.focus();
                                                    } else {
                                                        validateMailingAddressToSave({ keyCode: 9 });
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={e => {
                                            // let mailing_address = props.selectedCarrier.mailing_address || {};
                                            // mailing_address.contact_name = e.target.value;
                                            // props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                        }}
                                        onChange={e => {
                                            // let mailing_address = props.selectedCarrier.mailing_address || {};
                                            // mailing_address.contact_name = e.target.value;
                                            // props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                        }}
                                        value={
                                            (props.selectedCarrier?.mailing_address?.mailing_contact?.first_name || '') +
                                            ((props.selectedCarrier?.mailing_address?.mailing_contact?.last_name || '') === ''
                                                ? ''
                                                : ' ' + props.selectedCarrier?.mailing_address?.mailing_contact?.last_name)
                                        }
                                    />

                                    {
                                        ((props.selectedCarrier?.contacts || []).length > 1 && (props.selectedCarrier?.mailing_address?.id !== undefined)) &&
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                            if (showMailingContactNames) {
                                                setShowMailingContactNames(false);
                                            } else {
                                                if ((props.selectedCarrier?.contacts || []).length > 1) {
                                                    await setMailingContactNameItems((props.selectedCarrier?.contacts || []).map((item, index) => {
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
                                                                            await props.setSelectedCarrier({
                                                                                ...props.selectedCarrier,
                                                                                mailing_address: {
                                                                                    ...props.selectedCarrier.mailing_address,
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

                                                                            validateMailingAddressToSave({ keyCode: 9 });
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
                                    <MaskedInput tabIndex={62 + props.tabTimes}
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
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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
                                            (props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                                ? (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work || '')
                                                : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                                    ? (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                                    : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                        ? (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                        : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                            ? (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_direct || '')
                                                            : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                                ? (props.selectedCarrier?.mailing_address?.mailing_contact?.phone_other || '')
                                                                : ''
                                        }
                                    />

                                    {
                                        ((props.selectedCarrier?.id || 0) > 0 && (props.selectedCarrier?.mailing_address?.id !== undefined)) &&
                                        <div
                                            className={classnames({
                                                'selected-mailing-contact-primary-phone': true,
                                                'pushed': (mailingContactPhoneItems.length > 1)
                                            })}>
                                            {props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || ''}
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
                                                                            await props.setSelectedCarrier({
                                                                                ...props.selectedCarrier,
                                                                                mailing_address: {
                                                                                    ...props.selectedCarrier.mailing_address,
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
                                <input tabIndex={63 + props.tabTimes} type="text" placeholder="Ext"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        // let mailing_address = props.selectedCarrier.mailing_address || {};
                                        // mailing_address.ext = e.target.value;
                                        // props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }}
                                    value={props.selectedCarrier?.mailing_address?.mailing_contact?.phone_ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input tabIndex={64 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
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
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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
                                                        await props.setSelectedCarrier({
                                                            ...props.selectedCarrier,
                                                            mailing_address: {
                                                                ...props.selectedCarrier.mailing_address,
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
                                            // let mailing_address = props.selectedCarrier.mailing_address || {};
                                            // mailing_address.email = e.target.value;
                                            // props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                        }}
                                        value={
                                            (props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                                ? (props.selectedCarrier?.mailing_address?.mailing_contact?.email_work || '')
                                                : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                                    ? (props.selectedCarrier?.mailing_address?.mailing_contact?.email_personal || '')
                                                    : (props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                                        ? (props.selectedCarrier?.mailing_address?.mailing_contact?.email_other || '')
                                                        : ''
                                        }
                                    />

                                    {
                                        ((props.selectedCarrier?.id || 0) > 0 && (props.selectedCarrier?.mailing_address?.id !== undefined)) &&
                                        <div
                                            className={classnames({
                                                'selected-mailing-contact-primary-email': true,
                                                'pushed': (mailingContactEmailItems.length > 1)
                                            })}>
                                            {props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || ''}
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
                                                                            await props.setSelectedCarrier({
                                                                                ...props.selectedCarrier,
                                                                                mailing_address: {
                                                                                    ...props.selectedCarrier.mailing_address,
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
                </div>

                <div className="fields-container-col grow">
                    <div className="form-borderless-box" style={{
                        alignItems: 'center',
                        padding: '15px 5px'
                    }}>
                        <div className="mochi-button" onClick={() => {
                            if ((props.selectedCarrier.id || 0) === 0) {
                                window.alert('There is nothing to print!');
                                return;
                            }

                            let carrier = { ...props.selectedCarrier };

                            let html = ``;

                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Code</span>: ${carrier.code.toUpperCase() + (carrier.code_number === 0 ? '' : carrier.code_number)}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Name</span>: ${carrier.name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 1</span>: ${carrier.address1}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 2</span>: ${carrier.address2}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">City</span>: ${carrier.city}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">State</span>: ${carrier.state.toUpperCase()}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Postal Code</span>: ${carrier.zip}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Name</span>: ${carrier.contact_name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone</span>: ${carrier.contact_phone}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone Ext</span>: ${carrier.ext}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">E-Mail</span>: ${carrier.email}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">MC Number</span>: ${carrier.mc_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">DOT Number</span>: ${carrier.dot_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">SCAC</span>: ${carrier.scac}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">FID</span>: ${carrier.fid}</div>`;

                            printWindow(html);
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Print Carrier Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button" onClick={equipmentInformationBtnClick}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Equipment Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button" onClick={revenueInformationBtnClick}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Revenue Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button" onClick={orderHistoryBtnClick}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Order History</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button" onClick={documentsBtnClick}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Documents</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    <div className="form-bordered-box" style={{
                        flexGrow: 0,
                        marginBottom: 10
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Insurances</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    props.setSelectedInsurance({});
                                    refInsuranceType.current.focus();
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="select-box-container" style={{ width: '10rem' }}>
                                <div className="select-box-wrapper">
                                    <input type="text"
                                        tabIndex={86 + props.tabTimes}
                                        placeholder="Type"
                                        ref={refInsuranceType}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (insuranceTypeDropdownItems.length > 0) {
                                                        let selectedIndex = insuranceTypeDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setInsuranceTypeDropdownItems(insuranceTypeDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setInsuranceTypeDropdownItems(insuranceTypeDropdownItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (insuranceTypeDropdownItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getInsuranceTypes').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setInsuranceTypeDropdownItems(res.types.map((item, index) => {
                                                                    item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selectedInsurance.insurance_type.id
                                                                    return item;
                                                                }))

                                                                refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting insurance types', e);
                                                        })
                                                    }
                                                    break;

                                                case 39: case 40: // arrow right | arrow down
                                                    e.preventDefault();
                                                    if (insuranceTypeDropdownItems.length > 0) {
                                                        let selectedIndex = insuranceTypeDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setInsuranceTypeDropdownItems(insuranceTypeDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setInsuranceTypeDropdownItems(insuranceTypeDropdownItems.map((item, index) => {
                                                                if (selectedIndex === (insuranceTypeDropdownItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getInsuranceTypes').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setInsuranceTypeDropdownItems(res.types.map((item, index) => {
                                                                    item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selectedInsurance.insurance_type.id
                                                                    return item;
                                                                }))

                                                                refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting insurance types', e);
                                                        })
                                                    }
                                                    break;

                                                case 27: // escape
                                                    setInsuranceTypeDropdownItems([]);
                                                    break;

                                                case 13: // enter
                                                    if (insuranceTypeDropdownItems.length > 0 && insuranceTypeDropdownItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedInsurance({
                                                            ...props.selectedInsurance,
                                                            insurance_type: insuranceTypeDropdownItems[insuranceTypeDropdownItems.findIndex(item => item.selected)],
                                                            insurance_type_id: insuranceTypeDropdownItems[insuranceTypeDropdownItems.findIndex(item => item.selected)].id
                                                        });
                                                        validateInsuranceForSaving({ keyCode: 9 });
                                                        setInsuranceTypeDropdownItems([]);
                                                        refInsuranceType.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (insuranceTypeDropdownItems.length > 0) {
                                                        e.preventDefault();
                                                        await props.setSelectedInsurance({
                                                            ...props.selectedInsurance,
                                                            insurance_type: insuranceTypeDropdownItems[insuranceTypeDropdownItems.findIndex(item => item.selected)],
                                                            insurance_type_id: insuranceTypeDropdownItems[insuranceTypeDropdownItems.findIndex(item => item.selected)].id
                                                        });
                                                        validateInsuranceForSaving({ keyCode: 9 });
                                                        setInsuranceTypeDropdownItems([]);
                                                        refInsuranceType.current.focus();
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onBlur={async () => {
                                            if ((props.selectedInsurance?.insurance_type?.id || 0) === 0) {
                                                await props.setSelectedInsurance({ ...props.selectedInsurance, insurance_type: {} });
                                            }
                                        }}
                                        onInput={async (e) => {
                                            let insurance_type = props.selectedInsurance?.insurance_type || {};
                                            insurance_type.id = 0;
                                            insurance_type.name = e.target.value;
                                            await props.setSelectedInsurance({ ...props.selectedInsurance, insurance_type: insurance_type });

                                            if (e.target.value.trim() === '') {
                                                setInsuranceTypeDropdownItems([]);
                                            } else {
                                                $.post(props.serverUrl + '/getInsuranceTypes', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setInsuranceTypeDropdownItems(res.types.map((item, index) => {
                                                            item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedInsurance.insurance_type.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting insurance types', e);
                                                })
                                            }
                                        }}
                                        onChange={async (e) => {
                                            let insurance_type = props.selectedInsurance?.insurance_type || {};
                                            insurance_type.id = 0;
                                            insurance_type.name = e.target.value;
                                            await props.setSelectedInsurance({ ...props.selectedInsurance, insurance_type: insurance_type });
                                        }}
                                        value={props.selectedInsurance?.insurance_type?.name || ''}
                                    />
                                    <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                        if (insuranceTypeDropdownItems.length > 0) {
                                            setInsuranceTypeDropdownItems([]);
                                        } else {
                                            if ((props.selectedInsurance?.insurance_type?.id || 0) === 0 && (props.selectedInsurance?.insurance_type?.name || '') !== '') {
                                                $.post(props.serverUrl + '/getInsuranceTypes', {
                                                    name: props.selectedInsurance?.insurance_type.name
                                                }).then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setInsuranceTypeDropdownItems(res.types.map((item, index) => {
                                                            item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedInsurance.insurance_type.id
                                                            return item;
                                                        }))

                                                        refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                }).catch(async e => {
                                                    console.log('error getting insurance types', e);
                                                })
                                            } else {
                                                $.post(props.serverUrl + '/getInsuranceTypes').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setInsuranceTypeDropdownItems(res.types.map((item, index) => {
                                                            item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.selectedInsurance.insurance_type.id
                                                            return item;
                                                        }))

                                                        refInsuranceTypePopupItems.current.map((r, i) => {
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
                                                }).catch(async e => {
                                                    console.log('error getting insurance types', e);
                                                })
                                            }
                                        }

                                        refInsuranceType.current.focus();
                                    }} />
                                </div>

                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={insuranceTypeDropdownItems.length > 0}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-insurance-type"
                                            style={{
                                                ...styles,
                                                left: '-50%',
                                                display: 'block'
                                            }}
                                            ref={refInsuranceTypeDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            insuranceTypeDropdownItems.map((item, index) => {
                                                                const mochiItemClasses = classnames({
                                                                    'mochi-item': true,
                                                                    'selected': item.selected
                                                                });

                                                                const searchValue = (props.selectedInsurance?.insurance_type?.id || 0) === 0 && (props.selectedInsurance?.insurance_type?.name || '') !== ''
                                                                    ? props.selectedInsurance?.insurance_type?.name : undefined;

                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={mochiItemClasses}
                                                                        id={item.id}
                                                                        onClick={async () => {
                                                                            await props.setSelectedInsurance({
                                                                                ...props.selectedInsurance,
                                                                                insurance_type: item,
                                                                                insurance_type_id: item.id
                                                                            });
                                                                            validateInsuranceForSaving({ keyCode: 9 });
                                                                            setInsuranceTypeDropdownItems([]);
                                                                            refInsuranceType.current.focus();
                                                                        }}
                                                                        ref={ref => refInsuranceTypePopupItems.current.push(ref)}
                                                                    >
                                                                        {
                                                                            searchValue === undefined
                                                                                ? item.name
                                                                                : <Highlighter
                                                                                    highlightClassName="mochi-item-highlight-text"
                                                                                    searchWords={[searchValue]}
                                                                                    autoEscape={true}
                                                                                    textToHighlight={item.name}
                                                                                />
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
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text"
                                        tabIndex={87 + props.tabTimes}
                                        placeholder="Company"
                                        ref={refInsuranceCompany}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (insuranceCompanyDropdownItems.length > 0) {
                                                        let selectedIndex = insuranceCompanyDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setInsuranceCompanyDropdownItems(insuranceCompanyDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setInsuranceCompanyDropdownItems(insuranceCompanyDropdownItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (insuranceCompanyDropdownItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refInsuranceCompanyPopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getInsuranceCompanies').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setInsuranceCompanyDropdownItems(res.companies.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                refInsuranceCompanyPopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting insurance companies', e);
                                                        })
                                                    }
                                                    break;

                                                case 39: case 40: // arrow right | arrow down
                                                    e.preventDefault();
                                                    if (insuranceCompanyDropdownItems.length > 0) {
                                                        let selectedIndex = insuranceCompanyDropdownItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setInsuranceCompanyDropdownItems(insuranceCompanyDropdownItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setInsuranceCompanyDropdownItems(insuranceCompanyDropdownItems.map((item, index) => {
                                                                if (selectedIndex === (insuranceCompanyDropdownItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refInsuranceCompanyPopupItems.current.map((r, i) => {
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
                                                        $.post(props.serverUrl + '/getInsuranceCompanies').then(async res => {
                                                            if (res.result === 'OK') {
                                                                await setInsuranceCompanyDropdownItems(res.companies.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))

                                                                refInsuranceCompanyPopupItems.current.map((r, i) => {
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
                                                        }).catch(async e => {
                                                            console.log('error getting insurance companies', e);
                                                        })
                                                    }
                                                    break;

                                                case 27: // escape
                                                    setInsuranceCompanyDropdownItems([]);
                                                    break;

                                                case 13: // enter
                                                    if (insuranceCompanyDropdownItems.length > 0 && insuranceCompanyDropdownItems.findIndex(item => item.selected) > -1) {
                                                        await props.setSelectedInsurance({
                                                            ...props.selectedInsurance,
                                                            company: insuranceCompanyDropdownItems[insuranceCompanyDropdownItems.findIndex(item => item.selected)].company
                                                        });
                                                        validateInsuranceForSaving({ keyCode: 9 });
                                                        setInsuranceCompanyDropdownItems([]);
                                                        refInsuranceCompany.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (insuranceCompanyDropdownItems.length > 0) {
                                                        e.preventDefault();
                                                        await props.setSelectedInsurance({
                                                            ...props.selectedInsurance,
                                                            company: insuranceCompanyDropdownItems[insuranceCompanyDropdownItems.findIndex(item => item.selected)].company
                                                        });
                                                        validateInsuranceForSaving({ keyCode: 9 });
                                                        setInsuranceCompanyDropdownItems([]);
                                                        refInsuranceCompany.current.focus();
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onInput={async (e) => {
                                            await props.setSelectedInsurance({ ...props.selectedInsurance, company: e.target.value });

                                            if (e.target.value.trim() === '') {
                                                setInsuranceCompanyDropdownItems([]);
                                            } else {
                                                $.post(props.serverUrl + '/getInsuranceCompanies', {
                                                    company: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setInsuranceCompanyDropdownItems(res.companies.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting insurance companies', e);
                                                })
                                            }
                                        }}
                                        onChange={async (e) => {
                                            await props.setSelectedInsurance({ ...props.selectedInsurance, company: e.target.value });
                                        }}
                                        value={props.selectedInsurance?.company || ''}
                                    />
                                </div>

                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={insuranceCompanyDropdownItems.length > 0}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-insurance-company"
                                            style={{
                                                ...styles,
                                                left: '-50%',
                                                display: 'block'
                                            }}
                                            ref={refInsuranceCompanyDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content"  >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            insuranceCompanyDropdownItems.map((item, index) => {
                                                                const mochiItemClasses = classnames({
                                                                    'mochi-item': true,
                                                                    'selected': item.selected
                                                                });

                                                                const searchValue = (props.selectedInsurance?.company || '') !== ''
                                                                    ? props.selectedInsurance?.company : undefined;

                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={mochiItemClasses}
                                                                        id={item.id}
                                                                        onClick={async () => {
                                                                            await props.setSelectedInsurance({ ...props.selectedInsurance, company: item.company });
                                                                            validateInsuranceForSaving({ keyCode: 9 });
                                                                            setInsuranceCompanyDropdownItems([]);
                                                                            refInsuranceCompany.current.focus();
                                                                        }}
                                                                        ref={ref => refInsuranceCompanyPopupItems.current.push(ref)}
                                                                    >
                                                                        {
                                                                            searchValue === undefined
                                                                                ? item.company
                                                                                : <Highlighter
                                                                                    highlightClassName="mochi-item-highlight-text"
                                                                                    searchWords={[searchValue]}
                                                                                    autoEscape={true}
                                                                                    textToHighlight={item.company}
                                                                                />
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
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="select-box-container" style={{ width: '8rem' }}>
                                <div className="select-box-wrapper">
                                    <MaskedInput tabIndex={88 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        guide={false}
                                        type="text" placeholder="Expiration Date"
                                        onKeyDown={validateInsuranceForSaving}
                                        onBlur={e => props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: getFormattedDates(props.selectedInsurance?.expiration_date) })}
                                        onInput={e => props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: e.target.value })}
                                        onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: e.target.value })}
                                        value={props.selectedInsurance.expiration_date || ''}
                                        ref={refExpirationDate}
                                    />

                                    <FontAwesomeIcon className="dropdown-button calendar" icon={faCalendarAlt} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsCalendarShown(true)

                                        if (moment((props.selectedInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedInsurance?.expiration_date || '').trim()) {
                                            setPreSelectedExpirationDate(moment(props.selectedInsurance?.expiration_date, 'MM/DD/YYYY'));
                                        } else {
                                            setPreSelectedExpirationDate(moment());
                                        }

                                        refExpirationDate.current.inputElement.focus();
                                    }} />
                                </div>

                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={isCalendarShown}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-insurance-expiration-date"
                                            style={{
                                                ...styles,
                                                left: '-100px',
                                                display: 'block'
                                            }}
                                            ref={refInsuranceCalendarDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below" style={{ height: 275 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        <Calendar
                                                            value={moment((props.selectedInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedInsurance?.expiration_date || '').trim()
                                                                ? moment(props.selectedInsurance?.expiration_date, 'MM/DD/YYYY')
                                                                : moment()}
                                                            onChange={(day) => {
                                                                props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: day.format('MM/DD/YYYY') });
                                                                validateInsuranceForSaving({ keyCode: 9 });
                                                            }}
                                                            closeCalendar={() => { setIsCalendarShown(false); }}
                                                            preDay={preSelectedExpirationDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Transition>
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <span className="currency-symbol">{(props.selectedInsurance.amount || '') === '' ? '' : '$'}</span>

                                <input tabIndex={89 + props.tabTimes}
                                    className="currency"
                                    type="text"
                                    placeholder="Amount"
                                    onKeyDown={validateInsuranceForSaving}
                                    onBlur={async (e) => { await props.setSelectedInsurance({ ...props.selectedInsurance, amount: accounting.formatNumber(e.target.value, 2, ',', '.') }) }}
                                    onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, amount: e.target.value })}
                                    value={(props.selectedInsurance?.amount || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <span className="currency-symbol">{(props.selectedInsurance.deductible || '') === '' ? '' : '$'}</span>

                                <input tabIndex={90 + props.tabTimes}
                                    className="currency"
                                    type="text"
                                    placeholder="Deductible"
                                    onKeyDown={validateInsuranceForSaving}
                                    onBlur={async (e) => { await props.setSelectedInsurance({ ...props.selectedInsurance, deductible: accounting.formatNumber(e.target.value, 2, ',', '.') }) }}
                                    onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, deductible: e.target.value })}
                                    value={(props.selectedInsurance?.deductible || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={91 + props.tabTimes} type="text" placeholder="Notes"
                                    onKeyDown={(e) => {
                                        let key = e.keyCode || e.which;

                                        if (key === 9) {
                                            let insurance = { ...props.selectedInsurance, carrier_id: (props.selectedCarrier?.id || 0) };

                                            if ((insurance.insurance_type_id || 0) > 0 &&
                                                (insurance.company || '') !== '' &&
                                                (insurance.expiration_date || '') !== '' &&
                                                (insurance.amount || '') !== '') {

                                                insurance.expiration_date = getFormattedDates(insurance.expiration_date);
                                                insurance.amount = accounting.unformat(insurance.amount);
                                                insurance.deductible = accounting.unformat(insurance.deductible);

                                                e.preventDefault();

                                                $.post(props.serverUrl + '/saveInsurance', insurance).then(res => {
                                                    if (res.result === 'OK') {
                                                        props.setSelectedCarrier({ ...props.selectedCarrier, insurances: res.insurances });

                                                        props.setSelectedInsurance({});
                                                        refInsuranceType.current.focus();
                                                    } else {
                                                        console.log(res.result);
                                                    }

                                                    setIsSavingInsurance(false);
                                                }).catch(e => {
                                                    console.log('error on saving carrier insurance', e);
                                                    setIsSavingInsurance(false);
                                                });
                                            } else {
                                                setIsSavingInsurance(false);
                                            }
                                        }
                                    }}
                                    onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, notes: e.target.value })}
                                    value={props.selectedInsurance.notes || ''} />
                            </div>
                        </div>
                    </div>

                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="top-border top-border-middle"></div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="insurances-list-container">
                            {
                                (props.selectedCarrier.insurances || []).length > 0 &&
                                <div className={`insurances-list-header ${insurancesScrollBarVisible ? 'scrolling' : ''}`}>
                                    <div className="contact-list-col tcol type">Type</div>
                                    <div className="contact-list-col tcol company">Company</div>
                                    <div className="contact-list-col tcol expiration-date">Exp. Date</div>
                                    <div className="contact-list-col tcol amount">Amount</div>
                                </div>
                            }

                            <div className="insurances-list-wrapper" id={props.panelName + '-insurances-list-wrapper'} ref={refInsurancesListWrapper}>
                                {
                                    (props.selectedCarrier.insurances || []).map((insurance, index) => {
                                        const itemClasses = classnames({
                                            'insurances-list-item': true,
                                            'selected': insurance.id === props.selectedInsurance.id
                                        })
                                        return (
                                            <div className={itemClasses} key={index} onClick={() => {
                                                props.setSelectedInsurance({ ...insurance });
                                            }}>
                                                <div className="insurances-list-col tcol type">{insurance.insurance_type.name}</div>
                                                <div className="insurances-list-col tcol company">{insurance.company}</div>
                                                <div className="insurances-list-col tcol expiration-date">{insurance.expiration_date}</div>
                                                <div className="insurances-list-col tcol amount">{accounting.formatMoney(insurance.amount)}</div>
                                                {
                                                    (insurance.id === (props.selectedInsurance?.id || 0)) &&
                                                    <div className="insurances-list-col tcol insurances-selected">
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

                <div className="fields-container-col" style={{ minWidth: '28%', maxWidth: '28%' }}>
                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Drivers</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedCarrier.id || 0) === 0 || props.selectedCarrier.drivers.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = `<h2>Carrier Drivers</h2></br></br>`;

                                    html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">First Name</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Last Name</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Phone</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">E-Mail</div>
                                        </div>
                                        `;

                                    props.selectedCarrier.drivers.map((driver, index) => {
                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:25%;max-width:25%">${driver.first_name}</div>
                                            <div style="min-width:25%;max-width:25%">${driver.last_name}</div>
                                            <div style="min-width:25%;max-width:25%">${driver.phone}</div>
                                            <div style="min-width:25%;max-width:25%">${driver.email}</div>
                                        </div>
                                        `;
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

                        <div className="drivers-list-container">
                            {
                                (props.selectedCarrier.drivers || []).length > 0 &&
                                <div className="drivers-list-header">
                                    <div className="driver-list-col tcol first-name">First Name</div>
                                    <div className="driver-list-col tcol last-name">Last Name</div>
                                    <div className="driver-list-col tcol phone">Phone</div>
                                    <div className="driver-list-col tcol email">E-Mail</div>
                                </div>
                            }

                            <div className="drivers-list-wrapper">
                                {
                                    (props.selectedCarrier.drivers || []).map((driver, index) => {
                                        return (
                                            <div className="drivers-list-item" key={index} onClick={() => {
                                                props.setSelectedDriver({ ...driver });
                                                refCarrierDriverFirstName.current.focus();
                                            }}>
                                                <div className="driver-list-col tcol first-name">{driver.first_name}</div>
                                                <div className="driver-list-col tcol last-name">{driver.last_name}</div>
                                                <div className="driver-list-col tcol phone">{driver.phone}</div>
                                                <div className="driver-list-col tcol email">{driver.email}</div>
                                                {
                                                    (driver.id === (props.selectedDriver?.id || 0)) &&
                                                    <div className="driver-list-col tcol driver-selected">
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
            </div>


            <div className="fields-container-row" style={{ marginTop: 10 }}>
                <div className="fields-container-col">
                    <div className="form-bordered-box" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '15px 10px'
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Factoring Company</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={searchFactoringCompanyBtnClick}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Search</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={moreFactoringCompanyBtnClick}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={clearFactoringCompanyBtnClick}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input tabIndex={65 + props.tabTimes} type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={(props.selectedCarrier?.factoring_company?.code || '') + ((props.selectedCarrier?.factoring_company?.code_number || 0) === 0 ? '' : props.selectedCarrier?.factoring_company?.code_number)} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input tabIndex={66 + props.tabTimes} type="text" placeholder="Name"
                                    // onKeyDown={validateFactoringCompanyToSave} 
                                    onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.name = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={67 + props.tabTimes} type="text" placeholder="Address 1"
                                    // onKeyDown={validateFactoringCompanyToSave} 
                                    onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.address1 = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={68 + props.tabTimes} type="text" placeholder="Address 2"
                                    // onKeyDown={validateFactoringCompanyToSave} 
                                    onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.address2 = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={69 + props.tabTimes} type="text" placeholder="City"
                                    // onKeyDown={validateFactoringCompanyToSave} 
                                    onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.city = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={70 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                    // onKeyDown={validateFactoringCompanyToSave} 
                                    onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.state = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={71 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={72 + props.tabTimes} type="text" placeholder="Contact Name"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    contact_name: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    contact_name: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.factoring_company?.contact_name || '')
                                            : props.selectedCarrier?.factoring_company.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedCarrier?.factoring_company.contacts.find(c => c.is_primary === 1).last_name
                                    }
                                />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone" style={{ position: 'relative' }}>
                                <MaskedInput tabIndex={73 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    contact_phone: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    contact_phone: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.factoring_company?.contact_phone || '')
                                            : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).phone_work
                                                : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }
                                />

                                {
                                    ((props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                    <div
                                        className={classnames({
                                            'selected-factoring-company-contact-primary-phone': true,
                                            'pushed': false
                                        })}>
                                        {props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone}
                                    </div>
                                }
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={74 + props.tabTimes} type="text" placeholder="Ext"
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    ext: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    ext: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.factoring_company?.ext || '')
                                            : props.selectedCarrier?.factoring_company.contacts.find(c => c.is_primary === 1).phone_ext
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container" style={{position: 'relative', flexGrow: 1}}>
                                <input tabIndex={75 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onInput={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    email: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    onChange={(e) => {
                                        if ((props.selectedCarrier?.factoring_company?.contacts || []).length === 0) {
                                            props.setSelectedCarrier({
                                                ...props.selectedCarrier,
                                                factoring_company: {
                                                    ...props.selectedCarrier?.factoring_company || {},
                                                    email: e.target.value
                                                }
                                            })
                                        }
                                    }}
                                    value={
                                        (props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (props.selectedCarrier?.factoring_company?.email || '')
                                            : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                                ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).email_work
                                                : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                    ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).email_personal
                                                    : props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                        ? props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).email_other
                                                        : ''
                                    }
                                />

                                {
                                    ((props.selectedCarrier?.factoring_company?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                    <div
                                        className={classnames({
                                            'selected-factoring-company-contact-primary-email': true,
                                            'pushed': false
                                        })}>
                                        {props.selectedCarrier?.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fields-container-col grow">

                </div>
                <div className="fields-container-col">
                    <div className="form-bordered-box" >
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Notes</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedCarrier.id || 0) === 0) {
                                        window.alert('You must select a carrier first!');
                                        return;
                                    }

                                    props.setSelectedCarrierNote({ id: 0, carrier_id: props.selectedCarrier.id })
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add note</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if (props.selectedCarrier.id === undefined || props.selectedCarrier.notes.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = ``;

                                    props.selectedCarrier.notes.map((note, index) => {
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
                                    (props.selectedCarrier.notes || []).map((note, index) => {
                                        return (
                                            <div className="notes-list-item" key={index} onClick={() => props.setSelectedCarrierNote(note)}>
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
                <div className="fields-container-col" style={{ minWidth: '28%', maxWidth: '28%' }}>
                    <div className="form-bordered-box" >
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Past Orders</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Search</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if (props.selectedCarrier.id === undefined || (props.selectedCarrier.past_orders || []).length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Print</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>


                    </div>
                </div>
            </div>

            {
                props.selectedNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CarrierModal
                        selectedData={props.selectedNote}
                        setSelectedData={props.setSelectedCarrierNote}
                        selectedParent={props.selectedCarrier}
                        setSelectedParent={(notes) => {
                            props.setSelectedCarrier({ ...props.selectedCarrier, notes: notes });
                        }}
                        savingDataUrl='/saveCarrierNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={true}
                        isAdding={props.selectedNote.id === 0}
                    />
                </animated.div>

            }
        </div>
    )
}

export default connect(null, null)(Carriers)