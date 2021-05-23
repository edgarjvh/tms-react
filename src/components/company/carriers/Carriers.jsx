import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './Carriers.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import CarrierPopup from './popup/Popup.jsx';
import CalendarPopup from './calendarPopup/CalendarPopup.jsx';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import CarrierModal from './modal/Modal.jsx';
import ReactStars from "react-rating-stars-component";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import accounting from 'accounting';
import {
    setCarriers,
    setSelectedCarrier,
    setCarrierPanels,
    setSelectedCarrierContact,
    setSelectedCarrierNote,
    setContactSearch,
    setShowingCarrierContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedCarrierDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance,
    setSelectedFactoringCompany,
    setCarrierOpenedPanels
} from '../../../actions';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Carriers(props) {
    const [isCalendarShown, setIsCalendarShown] = useState(false);
    const [preSelectedExpirationDate, setPreSelectedExpirationDate] = useState(moment());
    const [popupItems, setPopupItems] = useState([]);
    const [isSavingCarrier, setIsSavingCarrier] = useState(false);
    const [isSavingContact, setIsSavingContact] = useState(false);
    const [isSavingDriver, setIsSavingDriver] = useState(false);
    const [isSavingInsurance, setIsSavingInsurance] = useState(false);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refEquipment = useRef();
    const refInsuranceType = useRef();
    const refExpirationDate = useRef();
    const refInsuranceCompany = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const refCalendarPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });

    const calendarPopupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': isCalendarShown
    });

    const currencyMask = createNumberMask({
        prefix: '',
        suffix: '',
        allowDecimal: true,
    })

    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(-1);
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedNote.id !== undefined || props.selectedDirection.id !== undefined) ? 1 : 0 });

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

    const carrierStars = {
        size: 30,
        count: 5,
        isHalf: false,
        value: 0,
        color: "rgba(137,137,137,1)",
        activeColor: "yellow",
        onChange: () => { }
    };

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

                if (!props.carrierOpenedPanels.includes('carrier-search')) {
                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-search']);
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

        if (keyCode === 9 || e.target.id === 'cbox-carrier-do-not-use-btn') {
            window.clearTimeout(delayTimer);

            window.setTimeout(() => {
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

                    if (!isSavingCarrier) {
                        setIsSavingCarrier(true);

                        $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedCarrier.id === undefined && (props.selectedCarrier.id || 0) === 0) {
                                    await props.setSelectedCarrier({ ...props.selectedCarrier, id: res.carrier.id });
                                }

                                (res.carrier.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedCarrierContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingCarrier(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedCarrier.id === undefined) {
                return;
            }

            let contact = props.selectedContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedCarrier.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedCarrier.address1;
                contact.address2 = props.selectedCarrier.address2;
                contact.city = props.selectedCarrier.city;
                contact.state = props.selectedCarrier.state;
                contact.zip_code = props.selectedCarrier.zip;
            }

            if (!isSavingContact) {
                setIsSavingContact(true);

                $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedCarrier({ ...props.selectedCarrier, contacts: res.contacts });
                        await props.setSelectedCarrierContact(res.contact);
                    }

                    setIsSavingContact(false);
                });
            }
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        console.log(e);
        await props.setSelectedCarrierContact({ ...props.selectedContact, is_primary: e.target.checked ? 1 : 0 });

        if (props.selectedCarrier.id === undefined) {
            return;
        }

        let contact = props.selectedContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.carrier_id === undefined || contact.carrier_id === 0) {
            contact.carrier_id = props.selectedCarrier.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
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
                await props.setSelectedCarrierContact(res.contact);
                await props.setSelectedCarrier({ ...props.selectedCarrier, contacts: res.contacts });
            }
        });

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
                await props.setCarrierContacts(res.contacts);

                if (!props.carrierOpenedPanels.includes('carrier-contact-search')) {
                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-contact-search']);
                }
            }
        });
    }

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'equipment':
                await props.setSelectedDriver({
                    ...props.selectedDriver,
                    equipment: item,
                    equipment_id: item.id,
                    carrier_id: props.selectedCarrier.id || 0
                });

                if ((props.selectedCarrier?.id || 0) > 0) {
                    let driver = {
                        ...props.selectedDriver,
                        id: (props.selectedDriver?.id || 0),
                        carrier_id: props.selectedCarrier.id || 0,
                        equipment: item,
                        equipment_id: item.id
                    };

                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingDriver) {
                            setIsSavingDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                    await props.setSelectedDriver({ ...driver, id: res.driver.id });
                                }

                                await setIsSavingDriver(false);
                            });
                        }
                    }
                }
                setPopupItems([]);
                break;
            case 'insurance-type':
                props.setSelectedInsurance({ ...props.selectedInsurance, insurance_type_id: item.id, insurance_type: item });

                let insurance = {
                    ...props.selectedInsurance,
                    carrier_id: props.selectedCarrier.id,
                    insurance_type_id: item.id,
                    insurance_type: item
                };

                if ((insurance.insurance_type_id || 0) >= 0 &&
                    (insurance.company || '').trim() !== '' &&
                    (insurance.expiration_date || '').trim() !== '' &&
                    (insurance.amount || '').trim() !== '') {

                    insurance.expiration_date = getFormattedDates(insurance.expiration_date);

                    if (!isSavingInsurance) {
                        setIsSavingInsurance(true);
                        $.post(props.serverUrl + '/saveInsurance', insurance).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedCarrier({ ...props.selectedCarrier, insurances: res.insurances });
                                await props.setSelectedInsurance({ ...insurance, id: res.insurance.id });
                            }
                            setIsSavingInsurance(false);
                        });
                    }
                }

                setPopupItems([]);
                break;
            case 'insurance-company':
                props.setSelectedInsurance({ ...props.selectedInsurance, company: item.name });
                await setPopupItems([]);
                break;
            default:

                break;
        }
    }

    const equipmentOnKeydown = (e) => {
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

                setPopupItems(items);

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

                setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 13) {
            popupItems.map((item, index) => {
                if (item.selected) {
                    props.setSelectedDriver({ ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item });
                    let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item };

                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingDriver) {
                            setIsSavingDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                    await props.setSelectedDriver({ ...res.driver });
                                }
                                setIsSavingDriver(false);
                            });
                        }
                    }
                }

                return true;
            });

            setPopupItems([]);
        }

        if (key === 9) {
            if (popupItems.length === 0) {
                if ((props.selectedDriver.equipment_id || 0) === 0) {
                    props.setSelectedDriver({ ...props.selectedDriver, equipment: {} });
                } else {
                    validateDriverForSaving(e);
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedDriver({ ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item });
                        let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item };
                        if ((driver.first_name || '').trim() !== '') {
                            if (!isSavingDriver) {
                                setIsSavingDriver(true);

                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                        await props.setSelectedDriver({ ...res.driver });
                                    }
                                    setIsSavingDriver(false);
                                });
                            }
                        }
                    }

                    return true;
                });

                validateDriverForSaving(e);
                setPopupItems([]);
            }
        }
    }



    const onEquipmentInput = async (e) => {

        window.clearTimeout(delayTimer);
        let equipment = props.selectedDriver.equipment || {};
        equipment.name = e.target.value.trim();
        await props.setSelectedDriver({ ...props.selectedDriver, equipment_id: 0, equipment: equipment });

        setPopupActiveInput('equipment');

        if (props.selectedCarrier.id !== undefined) {
            if (e.target.value.trim() === '') {
                await setPopupItems([]);
            } else {
                delayTimer = window.setTimeout(() => {
                    $.post(props.serverUrl + '/getEquipments', {
                        name: e.target.value.toLowerCase().trim()
                    }).then(async res => {
                        const input = refEquipment.current.getBoundingClientRect();

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
                            if (res.equipments.length > 0) {
                                let items = res.equipments.map((equipment, i) => {
                                    equipment.selected = i === 0;
                                    return equipment;
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

    const onInsuranceCompanyInput = (e) => {
        window.clearTimeout(delayTimer);
        setPopupActiveInput('insurance-company');
        props.setSelectedInsurance({ ...props.selectedInsurance, company: e.target.value.trim() });

        if (e.target.value.trim() === '') {
            setPopupItems([]);
        } else {
            delayTimer = window.setTimeout(() => {
                $.post(props.serverUrl + '/getInsuranceCompanies', { company: e.target.value.trim() }).then(async res => {

                    const input = refInsuranceCompany.current.getBoundingClientRect();

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
                        if (res.companies.length > 0) {
                            let items = res.companies.map((company, i) => {
                                company.name = company.company;
                                company.selected = i === 0;
                                return company;
                            });

                            await setPopupItems(e.target.value.trim() === '' ? [] : items);
                        } else {
                            await setPopupItems([]);
                        }
                    }
                })
            }, 300)
        }
    }

    const onInsuranceCompanyKeydown = (e) => {

        let key = e.keyCode || e.which;
        setPopupActiveInput('insurance-company');

        if (e.target.value.trim() !== '') {
            if (popupItems.length === 0) {
                if (key === 38 || key === 40) { // arrow keys pressed
                    e.preventDefault();
                    delayTimer = window.setTimeout(() => {
                        $.post(props.serverUrl + '/getInsuranceCompanies', { company: e.target.value.trim() }).then(async res => {
                            const input = refInsuranceCompany.current.getBoundingClientRect();

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
                                if (res.companies.length > 0) {
                                    let items = res.companies.map((company, i) => {
                                        company.name = company.company;
                                        company.selected = i === 0;
                                        return company;
                                    });

                                    await setPopupItems(e.target.value.trim() === '' ? [] : items);
                                } else {
                                    await setPopupItems([]);
                                }
                            }
                        })
                    }, 100)
                }
            } else {
                if (key === 38) { // arrow up
                    e.preventDefault();
                    let selectedIndex = -1;

                    popupItems.map((item, index) => {
                        if (item.selected) {
                            selectedIndex = index;
                        }
                        return true;
                    });

                    if (selectedIndex === -1) {
                        selectedIndex = 0;
                    } else {
                        if (selectedIndex === 0) {
                            selectedIndex = popupItems.length - 1;
                        } else {
                            selectedIndex -= 1;
                        }
                    }

                    setPopupItems(popupItems.map((item, index) => {
                        item.selected = index === selectedIndex;
                        return item;
                    }));
                }

                if (key === 40) { // arrow down
                    e.preventDefault();
                    let selectedIndex = -1;

                    popupItems.map((item, index) => {
                        if (item.selected) {
                            selectedIndex = index;
                        }
                        return true;
                    });

                    if (selectedIndex === -1) {
                        selectedIndex = 0;
                    } else {
                        if (selectedIndex === popupItems.length - 1) {
                            selectedIndex = 0;
                        } else {
                            selectedIndex += 1;
                        }
                    }

                    setPopupItems(popupItems.map((item, index) => {
                        item.selected = index === selectedIndex;
                        return item;
                    }));
                }

                if (key === 13 || key === 9) { // enter key                    
                    popupItems.map(item => {
                        if (item.selected) {
                            props.setSelectedInsurance({ ...props.selectedInsurance, company: item.name });
                        }
                        return true;
                    });

                    setPopupItems([]);
                }
            }
        }
    }

    const onInsuranceTypeKeydown = (e) => {

        let key = e.key.toLowerCase();
        setPopupActiveInput('insurance-type');
        let selectedInsurance = props.selectedInsurance || { id: 0 };
        let selectedIndex = -1;

        const input = refInsuranceType.current.getBoundingClientRect();

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

        if (key === 'enter') {
            if (popupItems.length > 0) {
                popupItems.map((type, index) => {

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedInsurance(selectedInsurance);
                    };

                    return true;
                });

                setPopupItems([]);
            }
        } else if (key === 'c' || key === 'l' || key === 'w') {
            setPopupItems(props.insuranceTypes.map((type, index) => {
                type.selected = type.name.substring(0, 1).toLowerCase() === key;

                if (type.selected) {
                    selectedIndex = index;
                    selectedInsurance.insurance_type_id = type.id;
                    selectedInsurance.insurance_type = type;
                    props.setSelectedInsurance(selectedInsurance);
                }

                return type;
            }));
        } else if (key === 'tab') {
            setPopupItems([]);


        } else if (key === 'arrowleft' || key === 'arrowup') {
            if (popupItems.length === 0) {
                if ((props.selectedInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        if (props.selectedInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;

                        console.log(type.selected);

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                }
            } else {
                popupItems.map((type, index) => {
                    if (type.selected) selectedIndex = index;
                    return true;
                });

                if (selectedIndex === -1) {
                    selectedIndex = 0;
                } else {
                    if (selectedIndex === 0) {
                        selectedIndex = popupItems.length - 1;
                    } else {
                        selectedIndex = selectedIndex - 1;
                    }
                }

                setPopupItems(props.insuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'arrowright' || key === 'arrowdown') {
            if (popupItems.length === 0) {
                if ((props.selectedInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        if (props.selectedInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;

                        console.log(type.selected);

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                }
            } else {
                popupItems.map((type, index) => {
                    if (type.selected) selectedIndex = index;
                    return true;
                });

                if (selectedIndex === -1) {
                    selectedIndex = 0;
                } else {
                    if (selectedIndex === popupItems.length - 1) {
                        selectedIndex = 0;
                    } else {
                        selectedIndex = selectedIndex + 1;
                    }
                }

                setPopupItems(props.insuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'click') {
            if (popupItems.length === 0) {
                if ((props.selectedInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        if (props.selectedInsurance.insurance_type.name === type.name) {
                            type.selected = true;
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.insuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;


                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                }
            } else {
                popupItems.map((type, index) => {
                    if (type.selected) selectedIndex = index;
                    return true;
                });

                if (selectedIndex === -1) {
                    selectedIndex = 0;
                } else {
                    if (selectedIndex === popupItems.length - 1) {
                        selectedIndex = 0;
                    } else {
                        selectedIndex = selectedIndex + 1;
                    }
                }

                setPopupItems(props.insuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const validateMailingAddressToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedCarrier.id || 0) > 0) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedCarrier.mailing_address || {};
                    if (mailing_address.id !== undefined) {
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

                        mailing_address.code = newCode;


                        $.post(props.serverUrl + '/saveCarrierMailingAddress', mailing_address).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: res.mailing_address });
                            }
                        });
                    }
                }, 300);
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

    const remitToAddressBtn = async (e) => {
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

        await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
        await $.post(props.serverUrl + '/saveCarrierMailingAddress', mailing_address).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: res.mailing_address });
            }
        });
    }

    const validateFactoringCompanyToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedCarrier.id || 0) > 0) {

                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let factoring_company = props.selectedCarrier.factoring_company || {};

                    if (factoring_company.id !== undefined) {
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

                        factoring_company.code = newCode;

                        $.post(props.serverUrl + '/saveCarrierFactoringCompany', factoring_company).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: res.factoring_company });
                            }
                        });
                    }
                }, 300);
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

                if (!props.carrierOpenedPanels.includes('carrier-factoring-company-search')) {
                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-factoring-company-search']);
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

        if (!props.carrierOpenedPanels.includes('carrier-factoring-company')) {
            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-factoring-company']);
        }
    }

    const clearFactoringCompanyBtnClick = async () => {
        let selectedCarrier = { ...props.selectedCarrier };
        selectedCarrier.factoring_company_id = 0;
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


    const validateDriverForSaving = (e) => {
        let key = e.keyCode || e.which;
        let tabindex = e.target.getAttribute('tabindex');

        if (key === 9) {
            if ((props.selectedCarrier.id || 0) > 0) {
                let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id };

                if ((driver.first_name || '').trim() !== '') {
                    if (!isSavingDriver) {
                        setIsSavingDriver(true);

                        $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedDriver.id === undefined || (props.selectedDriver.id || 0) === 0) {
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedDriver({ ...props.selectedDriver, id: res.driver.id });
                                    }
                                } else {
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedDriver({ ...props.selectedDriver, id: res.driver.id });
                                    }
                                }

                                await props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                            }

                            await setIsSavingDriver(false);
                        });
                    } else {
                        if (tabindex === (99 + props.tabTimes).toString()) {
                            e.preventDefault();
                            if (isObjectEmpty(props.selectedDriver)) {
                                goToTabindex((43 + props.tabTimes).toString());
                            } else {
                                goToTabindex((92 + props.tabTimes).toString());
                            }
                            props.setSelectedDriver({});
                        }
                    }
                } else {
                    if (tabindex === (99 + props.tabTimes).toString()) {
                        e.preventDefault();
                        if (isObjectEmpty(props.selectedDriver)) {
                            goToTabindex((43 + props.tabTimes).toString());
                        } else {
                            goToTabindex((92 + props.tabTimes).toString());
                        }
                        props.setSelectedDriver({});
                    }
                }
            } else {
                if (tabindex === (99 + props.tabTimes).toString()) {
                    e.preventDefault();
                    if (isObjectEmpty(props.selectedDriver)) {
                        goToTabindex((43 + props.tabTimes).toString());
                    } else {
                        goToTabindex((92 + props.tabTimes).toString());
                    }
                    props.setSelectedDriver({});
                }
            }
        }
    }

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
                return false;
            }
        }

        return true;
    }

    const validateInsuranceForSaving = async (e) => {
        let key = e.keyCode || e.which;

        if (key === 9 && (props.selectedCarrier.id || 0) > 0) {
            let insurance = { ...props.selectedInsurance, carrier_id: props.selectedCarrier.id };

            if ((insurance.insurance_type_id || 0) >= 0 &&
                (insurance.company || '') !== '' &&
                (insurance.expiration_date || '') !== '' &&
                (insurance.amount || '') !== '') {

                insurance.expiration_date = getFormattedDates(insurance.expiration_date);
                insurance.amount = accounting.unformat(insurance.amount);
                insurance.deductible = accounting.unformat(insurance.deductible);

                if (!isSavingInsurance) {
                    setIsSavingInsurance(true);
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
                        setIsSavingInsurance(false);
                    });
                }
            }
        }

        let expiration_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedInsurance?.expiration_date || ''), 'MM/DD/YYYY');

        await setPreSelectedExpirationDate(expiration_date);

        if (key === 13) {
            if (isCalendarShown) {
                expiration_date = preSelectedExpirationDate.clone().format('MM/DD/YYYY');

                let insurance = { ...props.selectedInsurance, carrier_id: props.selectedCarrier.id };
                insurance.expiration_date = expiration_date;

                await props.setSelectedInsurance(insurance);

                if ((insurance.insurance_type_id || 0) >= 0 &&
                    (insurance.company || '').trim() !== '' &&
                    (insurance.expiration_date || '').trim() !== '' &&
                    (insurance.amount || '').trim() !== '') {

                    if (!isSavingInsurance) {
                        setIsSavingInsurance(true);
                        $.post(props.serverUrl + '/saveInsurance', insurance).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedCarrier({ ...props.selectedCarrier, insurances: res.insurances });
                                await props.setSelectedInsurance({ ...insurance, id: res.insurance.id });
                            }
                            setIsSavingInsurance(false);
                        });
                    }
                }

                await setIsCalendarShown(false);
            }
        }

        if (key >= 37 && key <= 40) {
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

            if (!props.carrierOpenedPanels.includes('documents')) {
                props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'documents']);
            }
        } else {
            window.alert('You must select a carrier first!');
        }
    }

    const revenueInformationBtnClick = () => {
        if (!props.carrierOpenedPanels.includes('revenue-information')) {
            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'revenue-information']);
        }
    }

    const equipmentInformationBtnClick = () => {
        if (!props.carrierOpenedPanels.includes('equipment-information')) {
            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'equipment-information']);
        }
    }

    const orderHistoryBtnClick = () => {
        if (!props.carrierOpenedPanels.includes('order-history')) {
            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'order-history']);
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
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>

            <PanelContainer panels={props.panels} />

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
                                    onKeyDown={searchCarrierByCode}
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, code: e.target.value })}
                                    value={(props.selectedCarrier.code_number || 0) === 0 ? (props.selectedCarrier.code || '') : props.selectedCarrier.code + props.selectedCarrier.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={44 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, name: e.target.value })} value={props.selectedCarrier.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={45 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address1: e.target.value })} value={props.selectedCarrier.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={46 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address2: e.target.value })} value={props.selectedCarrier.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={47 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, city: e.target.value })} value={props.selectedCarrier.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={48 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, state: e.target.value })} value={props.selectedCarrier.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={49 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, zip: e.target.value })} value={props.selectedCarrier.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={50 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })} value={props.selectedCarrier.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={51 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })} value={props.selectedCarrier.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={52 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })} value={props.selectedCarrier.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={53 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })} value={props.selectedCarrier.email || ''} />
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
                            <input type="checkbox" id="cbox-carrier-do-not-use-btn" onChange={(e) => {
                                props.setSelectedCarrier({ ...props.selectedCarrier, do_not_use: e.target.checked ? 1 : 0 });
                                // validateCarrierForSaving(e)
                            }} checked={(props.selectedCarrier.do_not_use || 0) === 1} />
                            <label htmlFor="cbox-carrier-do-not-use-btn">
                                <div className="label-text">DO NOT USE</div>
                                <div className="input-toggle-btn"></div>
                            </label>
                        </div>

                        <ReactStars {...carrierStars} />

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

                                    if (!props.carrierOpenedPanels.includes('carrier-contacts')) {
                                        props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-contacts']);
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

                                    if (!props.carrierOpenedPanels.includes('carrier-contacts')) {
                                        props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-contacts']);
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
                                <input tabIndex={80 + props.tabTimes} type="text" placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                    props.setSelectedCarrierContact({ ...props.selectedContact, first_name: e.target.value })
                                }} value={props.selectedContact.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={81 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, last_name: e.target.value })} value={props.selectedContact.last_name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '50%' }}>
                                <MaskedInput tabIndex={82 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, phone_work: e.target.value })} value={props.selectedContact.phone_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={83 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, phone_ext: e.target.value })} value={props.selectedContact.phone_ext || ''} />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-carrier-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedContact.is_primary || 0) === 1} />
                                    <label htmlFor="cbox-carrier-contacts-primary-btn">
                                        <div className="label-text">Primary</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={84 + props.tabTimes} type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedCarrierContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
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
                                            <div className="contact-list-col tcol phone-work">Phone Work</div>
                                            <div className="contact-list-col tcol email-work">E-Mail Work</div>
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

                                                        if (!props.carrierOpenedPanels.includes('carrier-contacts')) {
                                                            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-contacts']);
                                                        }
                                                    }} onClick={() => props.setSelectedCarrierContact(contact)}>
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

                                    if ((props.selectedDriver.id || 0) === 0) {
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

                                <div className="mochi-button" onClick={() => { props.setSelectedDriver({}) }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={92 + props.tabTimes} type="text" placeholder="First Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                }} value={props.selectedDriver.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={93 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                }} value={props.selectedDriver.last_name || ''} />
                            </div>
                        </div>

                        <div className="form-v-sep"></div>

                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '40%' }}>
                                <MaskedInput tabIndex={94 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                    }} value={props.selectedDriver.phone || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container" style={{ flexGrow: 1 }}>
                                <input tabIndex={95 + props.tabTimes} type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                }} value={props.selectedDriver.email || ''} />
                            </div>

                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow" style={{ position: 'relative' }}>

                                <input tabIndex={96 + props.tabTimes}
                                    type="text"
                                    placeholder="Equipment"
                                    ref={refEquipment}
                                    onKeyDown={equipmentOnKeydown}
                                    onInput={onEquipmentInput}
                                    onChange={onEquipmentInput}
                                    value={props.selectedDriver.equipment?.name || ''} />

                                <span className="fas fa-caret-down" style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: `translateY(-50%)`,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer'
                                }} onClick={() => {
                                    delayTimer = window.setTimeout(() => {
                                        setPopupActiveInput('equipment');
                                        $.post(props.serverUrl + '/getEquipments', {
                                            name: ""
                                        }).then(async res => {
                                            const input = refEquipment.current.getBoundingClientRect();

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
                                                if (res.equipments.length > 0) {
                                                    let items = [];
                                                    let matched = false;

                                                    items = res.equipments.map((equipment, i) => {
                                                        if (equipment.name === props.selectedDriver.equipment?.name) {
                                                            equipment.selected = true;
                                                            matched = true;
                                                        } else {
                                                            equipment.selected = false;
                                                        }

                                                        return equipment;
                                                    });

                                                    if (!matched) {
                                                        items = res.equipments.map((equipment, i) => {
                                                            equipment.selected = i === 0;
                                                            return equipment;
                                                        });
                                                    }

                                                    await setPopupItems(items);

                                                    popupItemsRef.current.map((r, i) => {
                                                        if (r && r.classList.contains('selected')) {
                                                            r.scrollIntoView()
                                                        }
                                                        return true;
                                                    });
                                                } else {
                                                    await setPopupItems([]);
                                                }
                                            }

                                            refEquipment.current.focus();
                                        });
                                    }, 300);
                                }}></span>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={97 + props.tabTimes} type="text" placeholder="Truck" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                }} value={props.selectedDriver.truck || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={98 + props.tabTimes} type="text" placeholder="Trailer" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                }} value={props.selectedDriver.trailer || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={99 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, notes: e.target.value })
                                }} value={props.selectedDriver.notes || ''} />
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
                                <input tabIndex={55 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={56 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={57 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={58 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={59 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.state = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={60 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={61 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={62 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.contact_phone = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={63 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={64 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.email = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.email || ''} />
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
                                <div className="mochi-button" onClick={() => props.setSelectedInsurance({})}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container" style={{ position: 'relative', width: '10rem' }}>
                                <input tabIndex={86 + props.tabTimes} type="text" placeholder="Type"
                                    ref={refInsuranceType}
                                    onKeyDown={onInsuranceTypeKeydown}
                                    onInput={() => { }}
                                    onChange={() => { }}
                                    value={props.selectedInsurance.insurance_type?.name || ''} />

                                <span className="fas fa-caret-down" style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: `translateY(-50%)`,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer'
                                }} onClick={() => {
                                    delayTimer = window.setTimeout(async () => {
                                        setPopupActiveInput('insurance-type');

                                        $.post(props.serverUrl + '/getInsuranceTypes').then(async res => {
                                            const input = refInsuranceType.current.getBoundingClientRect();

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
                                                if (res.types.length > 0) {
                                                    let items = [];
                                                    let matched = false;

                                                    items = res.types.map((insurance_type, i) => {
                                                        if (insurance_type.name === props.selectedInsurance.insurance_type?.name) {
                                                            insurance_type.selected = true;
                                                            matched = true;
                                                        } else {
                                                            insurance_type.selected = false;
                                                        }

                                                        return insurance_type;
                                                    });

                                                    if (!matched) {
                                                        items = res.types.map((insurance_type, i) => {
                                                            insurance_type.selected = i === 0;
                                                            return insurance_type;
                                                        });
                                                    }

                                                    await setPopupItems(items);

                                                    popupItemsRef.current.map((r, i) => {
                                                        if (r && r.classList.contains('selected')) {
                                                            r.scrollIntoView()
                                                        }
                                                        return true;
                                                    });
                                                } else {
                                                    await setPopupItems([]);
                                                }
                                            }



                                            refInsuranceType.current.focus();
                                        })
                                    }, 300);
                                }}></span>

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={87 + props.tabTimes} type="text" placeholder="Company"
                                    ref={refInsuranceCompany}
                                    onKeyDown={onInsuranceCompanyKeydown}
                                    onInput={onInsuranceCompanyInput}
                                    // onChange={onInsuranceCompanyInput}
                                    value={props.selectedInsurance.company || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
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

                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                    e.stopPropagation();

                                    if (moment((props.selectedInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedInsurance?.expiration_date || '').trim()) {
                                        setPreSelectedExpirationDate(moment(props.selectedInsurance?.expiration_date, 'MM/DD/YYYY'));
                                    } else {
                                        setPreSelectedExpirationDate(moment());
                                    }

                                    const input = refExpirationDate.current.inputElement.getBoundingClientRect();

                                    let popup = refCalendarPopup.current;

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

                                    setIsCalendarShown(true)

                                    refExpirationDate.current.inputElement.focus();
                                }}></span>
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
                                <input tabIndex={91 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, notes: e.target.value })} value={props.selectedInsurance.notes || ''} />
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
                                <div className="insurances-list-header">
                                    <div className="contact-list-col tcol type">Type</div>
                                    <div className="contact-list-col tcol company">Company</div>
                                    <div className="contact-list-col tcol expiration-date">Exp. Date</div>
                                    <div className="contact-list-col tcol amount">Amount</div>
                                </div>
                            }

                            <div className="insurances-list-wrapper">
                                {
                                    (props.selectedCarrier.insurances || []).map((insurance, index) => {
                                        const itemClasses = classnames({
                                            'insurances-list-item': true,
                                            'selected': insurance.id === props.selectedInsurance.id
                                        })
                                        return (
                                            <div className={itemClasses} key={index} onClick={() => props.setSelectedInsurance({ ...insurance })}>
                                                <div className="contact-list-col tcol type">{insurance.insurance_type.name}</div>
                                                <div className="contact-list-col tcol company">{insurance.company}</div>
                                                <div className="contact-list-col tcol expiration-date">{insurance.expiration_date}</div>
                                                <div className="contact-list-col tcol amount">{accounting.formatMoney(insurance.amount)}</div>
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
                                    <div className="contact-list-col tcol first-name">First Name</div>
                                    <div className="contact-list-col tcol last-name">Last Name</div>
                                    <div className="contact-list-col tcol phone">Phone</div>
                                    <div className="contact-list-col tcol email">E-Mail</div>
                                </div>
                            }

                            <div className="drivers-list-wrapper">
                                {
                                    (props.selectedCarrier.drivers || []).map((driver, index) => {
                                        return (
                                            <div className="drivers-list-item" key={index} onClick={() => {
                                                props.setSelectedDriver({ ...driver });
                                            }}>
                                                <div className="contact-list-col tcol first-name">{driver.first_name}</div>
                                                <div className="contact-list-col tcol last-name">{driver.last_name}</div>
                                                <div className="contact-list-col tcol phone">{driver.phone}</div>
                                                <div className="contact-list-col tcol email">{driver.email}</div>
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
                                    value={props.selectedCarrier.factoring_company?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input tabIndex={66 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={67 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={68 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={69 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={70 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
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
                                <input tabIndex={72 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={73 + props.tabTimes}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.contact_phone = e.target.value;
                                        props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={74 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={75 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.email = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.email || ''} />
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
                                                {note.text}
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

            <CarrierPopup
                popupRef={refPopup}
                popupClasses={popupContainerClasses}
                popupItems={popupItems}
                popupItemsRef={popupItemsRef}
                popupItemClick={popupItemClick}
                popupItemKeydown={() => { }}
                setPopupItems={setPopupItems}
            />

            <CalendarPopup
                popupRef={refCalendarPopup}
                popupClasses={calendarPopupContainerClasses}
                popupGetter={moment((props.selectedInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedInsurance?.expiration_date || '').trim()
                    ? moment(props.selectedInsurance?.expiration_date, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={(day) => {
                    props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: day.format('MM/DD/YYYY') })
                }}
                closeCalendar={() => { setIsCalendarShown(false); }}
                preDay={preSelectedExpirationDate}
            />

        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.systemReducers.scale,
        carriers: state.carrierReducers.carriers,
        contacts: state.carrierReducers.contacts,
        selectedCarrier: state.carrierReducers.selectedCarrier,
        serverUrl: state.systemReducers.serverUrl,
        panels: state.carrierReducers.panels,
        carrierOpenedPanels: state.carrierReducers.carrierOpenedPanels,
        selectedContact: state.carrierReducers.selectedContact,
        selectedNote: state.carrierReducers.selectedNote,
        selectedDirection: state.carrierReducers.selectedDirection,
        contactSearch: state.carrierReducers.contactSearch,
        automaticEmailsTo: state.carrierReducers.automaticEmailsTo,
        automaticEmailsCc: state.carrierReducers.automaticEmailsCc,
        automaticEmailsBcc: state.carrierReducers.automaticEmailsBcc,
        showingContactList: state.carrierReducers.showingContactList,
        carrierSearch: state.carrierReducers.carrierSearch,
        selectedDocument: state.carrierReducers.selectedDocument,
        drivers: state.carrierReducers.drivers,
        selectedDriver: state.carrierReducers.selectedDriver,
        equipments: state.carrierReducers.equipments,
        insuranceTypes: state.carrierReducers.insuranceTypes,
        selectedEquipment: state.carrierReducers.selectedEquipment,
        selectedInsuranceType: state.carrierReducers.selectedInsuranceType,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        carrierInsurances: state.carrierReducers.carrierInsurances,
        selectedInsurance: state.carrierReducers.selectedInsurance,
        selectedFactoringCompany: state.carrierReducers.selectedFactoringCompany
    }
}

export default connect(mapStateToProps, {
    setCarriers,
    setSelectedCarrier,
    setCarrierPanels,
    setSelectedCarrierContact,
    setSelectedCarrierNote,
    setContactSearch,
    setShowingCarrierContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedCarrierDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance,
    setSelectedFactoringCompany,
    setCarrierOpenedPanels
})(Carriers)