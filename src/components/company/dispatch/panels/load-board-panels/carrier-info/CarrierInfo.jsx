import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './CarrierInfo.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import CarrierPopup from './../../../popup/Popup.jsx';
import MaskedInput from 'react-text-mask';
import CarrierModal from './../../../modal/Modal.jsx';
import ReactStars from "react-rating-stars-component";
import CalendarPopup from './../../../calendarPopup/CalendarPopup.jsx';
import accounting from 'accounting';
import {
    setLbCarrierInfoCarriers,
    setSelectedLbCarrierInfoCarrier,    
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoNote,
    setLbCarrierInfoContactSearch,
    setLbCarrierInfoShowingContactList,
    setLbCarrierInfoCarrierSearch,
    setLbCarrierInfoCarrierContacts,
    setLbCarrierInfoContactSearchCarrier,
    setLbCarrierInfoIsEditingContact,
    setSelectedLbCarrierInfoDocument,
    setLbCarrierInfoDrivers,
    setSelectedLbCarrierInfoDriver,
    setLbCarrierInfoEquipments,
    setLbCarrierInfoInsuranceTypes,
    setSelectedLbCarrierInfoEquipment,
    setSelectedLbCarrierInfoInsuranceType,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoFactoringCompanies,
    setLbCarrierInfoCarrierInsurances,
    setSelectedLbCarrierInfoInsurance,
    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setDispatchOpenedPanels
} from '../../../../../../actions';

function CarrierInfo(props) {
    const baseWidth = 0.95;
    const panelGap = 70;
    const [isCalendarShown, setIsCalendarShown] = useState(false);
    const [popupItems, setPopupItems] = useState([]);
    const [lastState, setLastState] = useState(0);
    const [isSavingCarrier, setIsSavingCarrier] = useState(false);
    const [isSavingContact, setIsSavingContact] = useState(false);
    const [isSavingDriver, setIsSavingDriver] = useState(false);
    const [isSavingInsurance, setIsSavingInsurance] = useState(false);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refDispatchCarrierInfoEquipment = useRef();
    const refDispatchCarrierInfoInsuranceType = useRef();
    const refDispatchCarrierInfoInsuranceCompany = useRef();
    const refDispatchCarrierInfoInsuranceExpirationDate = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const refDispatchCarrierCalendarPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const calendarPopupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': isCalendarShown
    });
    const [preSelectedExpirationDate, setPreSelectedExpirationDate] = useState(moment());
    const [driverPendingSave, setDriverPendingSave] = useState(false);
    const [insurancePendingSave, setInsurancePendingSave] = useState(false);
    const [selectedEquipmentIndex, setSelectedLbCarrierInfoEquipmentIndex] = useState(-1);
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedLbCarrierInfoNote.id !== undefined || props.selectedLbCarrierInfoDirection.id !== undefined) ? 1 : 0 });

    useEffect(() => {
        $.post(props.serverUrl + '/getCarrierPopupItems').then(res => {
            if (res.result === 'OK') {
                props.setLbCarrierInfoEquipments(res.equipments.map(e => {
                    e.selected = false;
                    return e;
                }));
                props.setLbCarrierInfoInsuranceTypes(res.insurance_types.map(t => {
                    t.selected = false;
                    return t;
                }));
            }
        })
    }, []);

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const carrierStars = {
        size: 25,
        count: 5,
        isHalf: false,
        value: 0,
        color: "rgba(137,137,137,1)",
        activeColor: "yellow",
        onChange: () => { }
    };

    const setInitialValues = (clearCode = true) => {
        setLastState(-1);
        props.setSelectedLbCarrierInfoContact({});
        props.setSelectedLbCarrierInfoNote({});
        props.setLbCarrierInfoContactSearch({});
        props.setLbCarrierInfoShowingContactList(true);
        props.setSelectedLbCarrierInfoDriver({});
        props.setSelectedLbCarrierInfoCarrier({ id: 0, code: clearCode ? '' : props.selectedLbCarrierInfoCarrier?.code });
        setPopupItems([]);
    }

    const searchCarrierBtnClick = () => {
        let carrierSearch = [
            {
                field: 'Name',
                data: (props.selectedLbCarrierInfoCarrier?.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedLbCarrierInfoCarrier?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedLbCarrierInfoCarrier?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedLbCarrierInfoCarrier?.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedLbCarrierInfoCarrier?.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedLbCarrierInfoCarrier?.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedLbCarrierInfoCarrier?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/carrierSearch', { search: carrierSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setLbCarrierInfoCarrierSearch(carrierSearch);
                await props.setLbCarrierInfoCarriers(res.carriers);

                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-search'])
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
                            await props.setSelectedLbCarrierInfoCarrier(res.carriers[0]);

                            await res.carriers[0].contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedLbCarrierInfoContact(c);
                                }
                                return true;
                            });

                            await props.setSelectedLbCarrierInfoDriver({});
                            await props.setSelectedLbCarrierInfoInsurance({});

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
                let selectedCarrier = props.selectedLbCarrierInfoCarrier;

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

                        $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(res => {
                            if (res.result === 'OK') {

                                if (props.selectedLbCarrierInfoCarrier?.id === undefined && (props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
                                    props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, id: res.carrier.id });
                                }

                                (res.carrier.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedLbCarrierInfoContact(contact);
                                    }

                                    return true;
                                });
                            }

                            setIsSavingCarrier(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedLbCarrierInfoCarrier?.id === undefined) {
                return;
            }

            let contact = props.selectedLbCarrierInfoContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedLbCarrierInfoCarrier?.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedLbCarrierInfoCarrier?.address1;
                contact.address2 = props.selectedLbCarrierInfoCarrier?.address2;
                contact.city = props.selectedLbCarrierInfoCarrier?.city;
                contact.state = props.selectedLbCarrierInfoCarrier?.state;
                contact.zip_code = props.selectedLbCarrierInfoCarrier?.zip;
            }

            if (!isSavingContact) {
                setIsSavingContact(true);

                $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedCarrier, contacts: res.contacts });
                        await props.setSelectedLbCarrierInfoContact(res.contact);
                    }

                    setIsSavingContact(false);
                });
            }
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        console.log(e);
        await props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, is_primary: e.target.checked ? 1 : 0 });

        if (props.selectedLbCarrierInfoCarrier?.id === undefined) {
            return;
        }

        let contact = props.selectedLbCarrierInfoContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.carrier_id === undefined || contact.carrier_id === 0) {
            contact.carrier_id = props.selectedLbCarrierInfoCarrier?.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedLbCarrierInfoCarrier?.address1;
            contact.address2 = props.selectedLbCarrierInfoCarrier?.address2;
            contact.city = props.selectedLbCarrierInfoCarrier?.city;
            contact.state = props.selectedLbCarrierInfoCarrier?.state;
            contact.zip_code = props.selectedLbCarrierInfoCarrier?.zip;
        }

        $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedLbCarrierInfoContact(res.contact);
                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Carrier Id',
                data: props.selectedLbCarrierInfoCarrier?.id || 0
            },
            {
                field: 'First Name',
                data: (props.lbCarrierInfoContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.lbCarrierInfoContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.lbCarrierInfoContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.lbCarrierInfoContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.lbCarrierInfoContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.lbCarrierInfoContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.lbCarrierInfoContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.lbCarrierInfoContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/carrierContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, filters: filters });
                await props.setLbCarrierInfoCarrierContacts(res.contacts);

                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-contact-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-contact-search'])
                }
            }
        });
    }

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'equipment':
                props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, equipment_id: item.id, equipment: item });
                await setPopupItems([]);
                break;
            case 'insurance-type':
                props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, insurance_type_id: item.id, insurance_type: item });
                await setPopupItems([]);
                break;
            case 'insurance-company':
                props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, company: item.name });
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
                    props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, carrier_id: props.selectedLbCarrierInfoCarrier.id, equipment_id: item.id, equipment: item });
                    let driver = { ...props.selectedLbCarrierInfoDriver, carrier_id: props.selectedLbCarrierInfoCarrier.id, equipment_id: item.id, equipment: item };

                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingDriver) {
                            setIsSavingDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedCarrier({ ...props.selectedLbCarrierInfoCarrier, drivers: res.drivers });
                                    await props.setSelectedLbCarrierInfoDriver({ ...res.driver });
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
                if ((props.selectedLbCarrierInfoDriver.equipment_id || 0) === 0) {
                    props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, equipment: {} });
                } else {
                    validateDriverForSaving(e);
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, carrier_id: props.selectedLbCarrierInfoCarrier.id, equipment_id: item.id, equipment: item });
                        let driver = { ...props.selectedLbCarrierInfoDriver, carrier_id: props.selectedLbCarrierInfoCarrier.id, equipment_id: item.id, equipment: item };
                        if ((driver.first_name || '').trim() !== '') {
                            if (!isSavingDriver) {
                                setIsSavingDriver(true);

                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedCarrier({ ...props.selectedLbCarrierInfoCarrier, drivers: res.drivers });
                                        await props.setSelectedLbCarrierInfoDriver({ ...res.driver });
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
        let equipment = props.selectedLbCarrierInfoDriver.equipment || {};
        equipment.name = e.target.value.trim();
        await props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, equipment_id: 0, equipment: equipment });

        setPopupActiveInput('equipment');

        if (props.selectedLbCarrierInfoCarrier?.id !== undefined) {
            if (e.target.value.trim() === '') {
                await setPopupItems([]);
            } else {
                delayTimer = window.setTimeout(() => {
                    $.post(props.serverUrl + '/getEquipments', {
                        name: e.target.value.toLowerCase().trim()
                    }).then(async res => {
                        const input = refDispatchCarrierInfoEquipment.current.getBoundingClientRect();

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
        props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, company: e.target.value.trim() });

        if (e.target.value.trim() === '') {
            setPopupItems([]);
        } else {
            delayTimer = window.setTimeout(() => {
                $.post(props.serverUrl + '/getInsuranceCompanies', { company: e.target.value.trim() }).then(async res => {

                    const input = refDispatchCarrierInfoInsuranceCompany.current.getBoundingClientRect();

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
                            const input = refDispatchCarrierInfoInsuranceCompany.current.getBoundingClientRect();

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
                            props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, company: item.name });
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
        let selectedInsurance = props.selectedLbCarrierInfoInsurance || { id: 0 };
        let selectedIndex = -1;

        const input = refDispatchCarrierInfoInsuranceType.current.getBoundingClientRect();

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
                        props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                    };

                    return true;
                });

                setPopupItems([]);
            }
        } else if (key === 'c' || key === 'l' || key === 'w') {
            setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                type.selected = type.name.substring(0, 1).toLowerCase() === key;

                if (type.selected) {
                    selectedIndex = index;
                    selectedInsurance.insurance_type_id = type.id;
                    selectedInsurance.insurance_type = type;
                    props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                }

                return type;
            }));
        } else if (key === 'tab') {
            setPopupItems([]);


        } else if (key === 'arrowleft' || key === 'arrowup') {
            if (popupItems.length === 0) {
                if ((props.selectedLbCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedLbCarrierInfoInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;

                        console.log(type.selected);

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
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

                setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'arrowright' || key === 'arrowdown') {
            if (popupItems.length === 0) {
                if ((props.selectedLbCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedLbCarrierInfoInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;

                        console.log(type.selected);

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
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

                setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'click') {
            if (popupItems.length === 0) {
                if ((props.selectedLbCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedLbCarrierInfoInsurance.insurance_type.name === type.name) {
                            type.selected = true;
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
                        }

                        return type;
                    }));
                } else {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        type.selected = index === 0;
                        selectedIndex = 0;


                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
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

                setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                    type.selected = index === selectedIndex;

                    if (type.selected) {
                        selectedInsurance.insurance_type_id = type.id;
                        selectedInsurance.insurance_type = type;
                        props.setSelectedLbCarrierInfoInsurance(selectedInsurance);
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
            if ((props.selectedLbCarrierInfoCarrier?.id || 0) > 0) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                    if (mailing_address.id !== undefined) {
                        mailing_address.id = 0;
                    }
                    mailing_address.carrier_id = props.selectedLbCarrierInfoCarrier?.id;

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
                                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: res.mailing_address });
                            }
                        });
                    }
                }, 300);
            }
        }
    }

    const clearMailingAddressBtn = async () => {
        await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: {} });

        if (props.selectedLbCarrierInfoCarrier?.id || 0 > 0) {
            await $.post(props.serverUrl + '/deleteCarrierMailingAddress', { carrier_id: (props.selectedLbCarrierInfoCarrier?.id || 0) }).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: {} });
                }
            });
        }
    }

    const remitToAddressBtn = async (e) => {
        if (props.selectedLbCarrierInfoCarrier?.id === undefined) {
            window.alert('You must select a carrier first!');
            return;
        }

        if (props.selectedLbCarrierInfoCarrier?.id === 0) {
            window.alert('You must save the carrier first!');
            return;
        }

        let mailing_address = {};

        mailing_address.id = -1;
        mailing_address.carrier_id = props.selectedLbCarrierInfoCarrier?.id;
        mailing_address.code = props.selectedLbCarrierInfoCarrier?.code;
        mailing_address.code_number = props.selectedLbCarrierInfoCarrier?.code_number;
        mailing_address.name = props.selectedLbCarrierInfoCarrier?.name;
        mailing_address.address1 = props.selectedLbCarrierInfoCarrier?.address1;
        mailing_address.address2 = props.selectedLbCarrierInfoCarrier?.address2;
        mailing_address.city = props.selectedLbCarrierInfoCarrier?.city;
        mailing_address.state = props.selectedLbCarrierInfoCarrier?.state;
        mailing_address.zip = props.selectedLbCarrierInfoCarrier?.zip;
        mailing_address.contact_name = props.selectedLbCarrierInfoCarrier?.contact_name;
        mailing_address.contact_phone = props.selectedLbCarrierInfoCarrier?.contact_phone;
        mailing_address.ext = props.selectedLbCarrierInfoCarrier?.ext;
        mailing_address.email = props.selectedLbCarrierInfoCarrier?.email;

        await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
        await $.post(props.serverUrl + '/saveCarrierMailingAddress', mailing_address).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: res.mailing_address });
            }
        });
    }

    const validateFactoringCompanyToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedLbCarrierInfoCarrier?.id || 0) > 0) {

                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};

                    if (factoring_company.id !== undefined) {
                        factoring_company.id = 0;
                    }
                    factoring_company.carrier_id = props.selectedLbCarrierInfoCarrier?.id;

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
                                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: res.factoring_company });
                            }
                        });
                    }
                }, 300);
            }
        }
    }

    const searchFactoringCompanyBtnClick = () => {

        if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedLbCarrierInfoCarrier?.factoring_company?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setLbCarrierInfoFactoringCompanySearch(factoringCompanySearch);
                await props.setLbCarrierInfoFactoringCompanies(res.factoring_companies);

                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-search'])
                }
            }
        });
    }

    const moreFactoringCompanyBtnClick = () => {
        if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        if ((props.selectedLbCarrierInfoCarrier?.factoring_company?.id || 0) === 0) {
            window.alert('You must select a factoring company first!');
            return;
        }

        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoCarrier?.factoring_company });

        (props.selectedLbCarrierInfoCarrier.factoring_company.contacts || []).map((contact, index) => {
            if (contact.is_primary === 1) {
                props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...contact });
            }

            return true;
        })

        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company')) {
            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company'])
        }
    }

    const clearFactoringCompanyBtnClick = async () => {
        let selectedCarrier = { ...props.selectedLbCarrierInfoCarrier };
        selectedCarrier.factoring_company_id = 0;
        await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: {} });

        if (props.selectedLbCarrierInfoCarrier?.id || 0 > 0) {
            await $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: {} });
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
            if ((props.selectedLbCarrierInfoCarrier?.id || 0) > 0) {
                let driver = { ...props.selectedLbCarrierInfoDriver, carrier_id: props.selectedLbCarrierInfoCarrier?.id };

                if ((driver.first_name || '').trim() !== '') {
                    if (!isSavingDriver) {
                        setIsSavingDriver(true);

                        $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedLbCarrierInfoDriver.id === undefined || (props.selectedLbCarrierInfoDriver.id || 0) === 0) {
                                    console.log(typeof tabindex, tabindex);
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedLbCarrierInfoDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, id: res.driver.id });
                                    }
                                } else {
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedLbCarrierInfoDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, id: res.driver.id });
                                    }
                                }

                                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, drivers: res.drivers });
                            }

                            await setIsSavingDriver(false);
                        });
                    } else {
                        if (tabindex === (99 + props.tabTimes).toString()) {
                            e.preventDefault();
                            if (isObjectEmpty(props.selectedLbCarrierInfoDriver)) {
                                goToTabindex((43 + props.tabTimes).toString());
                            } else {
                                goToTabindex((92 + props.tabTimes).toString());
                            }
                            props.setSelectedLbCarrierInfoDriver({});
                        }
                    }
                } else {
                    if (tabindex === (99 + props.tabTimes).toString()) {
                        e.preventDefault();
                        if (isObjectEmpty(props.selectedLbCarrierInfoDriver)) {
                            goToTabindex((43 + props.tabTimes).toString());
                        } else {
                            goToTabindex((92 + props.tabTimes).toString());
                        }
                        props.setSelectedLbCarrierInfoDriver({});
                    }
                }
            } else {
                if (tabindex === (99 + props.tabTimes).toString()) {
                    e.preventDefault();
                    if (isObjectEmpty(props.selectedLbCarrierInfoDriver)) {
                        goToTabindex((43 + props.tabTimes).toString());
                    } else {
                        goToTabindex((92 + props.tabTimes).toString());
                    }
                    props.setSelectedLbCarrierInfoDriver({});
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

        if (key === 9 && (props.selectedLbCarrierInfoCarrier?.id || 0) > 0) {
            let insurance = { ...props.selectedLbCarrierInfoInsurance, carrier_id: props.selectedLbCarrierInfoCarrier?.id };

            if ((insurance.insurance_type_id || 0) >= 0 &&
                (insurance.company || '').trim() !== '' &&
                (insurance.expiration_date || '').trim() !== '' &&
                (insurance.amount || '').trim() !== '') {

                insurance.expiration_date = getFormattedDates(insurance.expiration_date);
                insurance.amount = accounting.unformat(insurance.amount);
                insurance.deductible = accounting.unformat(insurance.deductible);

                if (!isSavingInsurance) {
                    setIsSavingInsurance(true);
                    $.post(props.serverUrl + '/saveInsurance', insurance).then(res => {
                        if (res.result === 'OK') {
                            props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, insurances: res.insurances });
                            props.setSelectedLbCarrierInfoInsurance({
                                ...props.selectedLbCarrierInfoInsurance,
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

        let expiration_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedLbCarrierInfoInsurance?.expiration_date || ''), 'MM/DD/YYYY');

        await setPreSelectedExpirationDate(expiration_date);

        if (key === 13) {
            if (isCalendarShown) {
                expiration_date = preSelectedExpirationDate.clone().format('MM/DD/YYYY');

                let insurance = { ...props.selectedLbCarrierInfoInsurance, carrier_id: props.selectedLbCarrierInfoCarrier.id };
                insurance.expiration_date = expiration_date;

                await props.setSelectedLbCarrierInfoInsurance(insurance);

                if ((insurance.insurance_type_id || 0) >= 0 &&
                    (insurance.company || '').trim() !== '' &&
                    (insurance.expiration_date || '').trim() !== '' &&
                    (insurance.amount || '').trim() !== '') {

                    if (!isSavingInsurance) {
                        setIsSavingInsurance(true);
                        $.post(props.serverUrl + '/saveInsurance', insurance).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, insurances: res.insurances });
                                await props.setSelectedLbCarrierInfoInsurance({ ...insurance, id: res.insurance.id });
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

        (props.selectedLbCarrierInfoCarrier?.insurances || []).map((insurance, index) => {
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
        if ((props.selectedLbCarrierInfoCarrier?.id || 0) > 0) {
            props.setSelectedLbCarrierInfoDocument({
                id: 0,
                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                date_entered: moment().format('MM/DD/YYYY')
            });

            if (!props.dispatchOpenedPanels.includes('lb-carrier-info-documents')) {
                props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-documents'])
            }
        } else {
            window.alert('You must select a carrier first!');
        }
    }

    const revenueInformationBtnClick = () => {
        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-revenue-information')) {
            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-revenue-information'])
        }
    }

    const equipmentInformationBtnClick = () => {
        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-equipment-information')) {
            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-equipment-information'])
        }
    }

    const orderHistoryBtnClick = () => {
        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-order-history')) {
            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-order-history'])
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
        <div className="panel-content carrier-info">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-carrier-info')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="carrier-info">
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
                                        onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, code: e.target.value })}
                                        value={(props.selectedLbCarrierInfoCarrier?.code_number || 0) === 0 ? (props.selectedLbCarrierInfoCarrier?.code || '') : props.selectedLbCarrierInfoCarrier?.code + props.selectedLbCarrierInfoCarrier?.code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={44 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, name: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={45 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, address1: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={46 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, address2: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={47 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, city: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={48 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, state: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={49 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, zip: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={50 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, contact_name: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={51 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, contact_phone: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={52 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, ext: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={53 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, email: e.target.value })} value={props.selectedLbCarrierInfoCarrier?.email || ''} />
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
                                    props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, do_not_use: e.target.checked ? 1 : 0 });
                                    // validateCarrierForSaving(e)
                                }} checked={(props.selectedLbCarrierInfoCarrier?.do_not_use || 0) === 1} />
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
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mc_number: e.target.value })
                                    }}
                                    value={props.selectedLbCarrierInfoCarrier?.mc_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={77 + props.tabTimes} type="text" placeholder='DOT Number'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, dot_number: e.target.value })
                                    }}
                                    value={props.selectedLbCarrierInfoCarrier?.dot_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={78 + props.tabTimes} type="text" placeholder='SCAC'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, scac: e.target.value })
                                    }}
                                    value={props.selectedLbCarrierInfoCarrier?.scac || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={79 + props.tabTimes} type="text" placeholder='FID'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, fid: e.target.value })
                                    }}
                                    value={props.selectedLbCarrierInfoCarrier?.fid || ''} />
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
                                        if (props.selectedLbCarrierInfoCarrier?.id === undefined) {
                                            window.alert('You must select a contact first!');
                                            return;
                                        }

                                        if (props.selectedLbCarrierInfoContact.id === undefined) {
                                            window.alert('You must select a contact');
                                            return;
                                        }

                                        await props.setLbCarrierInfoIsEditingContact(false);
                                        await props.setLbCarrierInfoContactSearchCarrier({ ...props.selectedLbCarrierInfoCarrier, selectedContact: props.selectedLbCarrierInfoContact });

                                        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-contacts')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-contacts'])
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedLbCarrierInfoCarrier?.id === undefined || props.selectedLbCarrierInfoCarrier?.id <= 0) {
                                            window.alert('You must select a carrier');
                                            return;
                                        }

                                        props.setLbCarrierInfoContactSearchCarrier({ ...props.selectedLbCarrierInfoCarrier, selectedContact: { id: 0, carrier_id: props.selectedLbCarrierInfoCarrier?.id } });
                                        props.setLbCarrierInfoIsEditingContact(true);

                                        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-contacts')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-contacts'])
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => props.setSelectedLbCarrierInfoContact({})}>
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

                                        props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, first_name: e.target.value })
                                    }} value={props.selectedLbCarrierInfoContact.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={81 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, last_name: e.target.value })} value={props.selectedLbCarrierInfoContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '50%' }}>
                                    <MaskedInput tabIndex={82 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, phone_work: e.target.value })} value={props.selectedLbCarrierInfoContact.phone_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input tabIndex={83 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, phone_ext: e.target.value })} value={props.selectedLbCarrierInfoContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-carrier-info-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedLbCarrierInfoContact.is_primary || 0) === 1} />
                                        <label htmlFor="cbox-carrier-info-contacts-primary-btn">
                                            <div className="label-text">Primary</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={84 + props.tabTimes} type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, email_work: e.target.value })} value={props.selectedLbCarrierInfoContact.email_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={85 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedLbCarrierInfoContact({ ...props.selectedLbCarrierInfoContact, notes: e.target.value })} value={props.selectedLbCarrierInfoContact.notes || ''} />
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
                                        props.lbCarrierInfoShowingContactList &&
                                        <div className="mochi-button" onClick={() => props.setLbCarrierInfoShowingContactList(false)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !props.lbCarrierInfoShowingContactList &&
                                        <div className="mochi-button" onClick={() => props.setLbCarrierInfoShowingContactList(true)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    {
                                        !props.lbCarrierInfoShowingContactList &&
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
                                <div className="form-slider-wrapper" style={{ left: props.lbCarrierInfoShowingContactList ? 0 : '-100%' }}>
                                    <div className="contact-list-box">

                                        {
                                            (props.selectedLbCarrierInfoCarrier?.contacts || []).length > 0 &&
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
                                                (props.selectedLbCarrierInfoCarrier?.contacts || []).map((contact, index) => {
                                                    return (
                                                        <div className="contact-list-item" key={index} onDoubleClick={async () => {
                                                            await props.setLbCarrierInfoIsEditingContact(false);
                                                            await props.setLbCarrierInfoContactSearchCarrier({ ...props.selectedLbCarrierInfoCarrier, selectedContact: contact });

                                                            if (!props.dispatchOpenedPanels.includes('lb-carrier-info-contacts')) {
                                                                props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-contacts'])
                                                            }
                                                        }} onClick={() => props.setSelectedLbCarrierInfoContact(contact)}>
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
                                                <input type="text" placeholder="First Name" onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, first_name: e.target.value })} value={props.lbCarrierInfoContactSearch.first_name || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Last Name" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, last_name: e.target.value })} value={props.lbCarrierInfoContactSearch.last_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, address1: e.target.value })} value={props.lbCarrierInfoContactSearch.address1 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, address2: e.target.value })} value={props.lbCarrierInfoContactSearch.address2 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, city: e.target.value })} value={props.lbCarrierInfoContactSearch.city || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, state: e.target.value })} value={props.lbCarrierInfoContactSearch.state || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, phone: e.target.value })} value={props.lbCarrierInfoContactSearch.phone || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setLbCarrierInfoShowingContactList(false) }} onChange={e => props.setLbCarrierInfoContactSearch({ ...props.lbCarrierInfoContactSearch, email: e.target.value })} value={props.lbCarrierInfoContactSearch.email || ''} />
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
                                        if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
                                            window.alert('You must selecte a carrier first!');
                                            return;
                                        }

                                        if ((props.selectedLbCarrierInfoDriver.id || 0) === 0) {
                                            window.alert('You must selecte a driver first!');
                                            return;
                                        }

                                        if (window.confirm('Are you sure to delete this driver?')) {
                                            $.post(props.serverUrl + '/deleteCarrierDriver', props.selectedLbCarrierInfoDriver).then(res => {
                                                if (res.result === 'OK') {
                                                    console.log(res);
                                                    props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, drivers: res.drivers });
                                                    props.setSelectedLbCarrierInfoDriver({});
                                                }
                                            })
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Delete</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>

                                    <div className="mochi-button" onClick={() => { props.setSelectedLbCarrierInfoDriver({}) }}>
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
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, first_name: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={93 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, last_name: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.last_name || ''} />
                                </div>
                            </div>

                            <div className="form-v-sep"></div>

                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '40%' }}>
                                    <MaskedInput tabIndex={94 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateDriverForSaving} onChange={e => {
                                            props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, phone: e.target.value })
                                        }} value={props.selectedLbCarrierInfoDriver.phone || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container" style={{ flexGrow: 1 }}>
                                    <input tabIndex={95 + props.tabTimes} type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, email: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.email || ''} />
                                </div>

                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow" style={{ position: 'relative' }}>

                                    <input tabIndex={96 + props.tabTimes}
                                        type="text"
                                        placeholder="Equipment"
                                        ref={refDispatchCarrierInfoEquipment}
                                        onKeyDown={equipmentOnKeydown}
                                        onInput={onEquipmentInput}
                                        onChange={onEquipmentInput}
                                        value={props.selectedLbCarrierInfoDriver.equipment?.name || ''} />

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
                                                const panelWidth = (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info'));

                                                const input = refDispatchCarrierInfoEquipment.current.getBoundingClientRect();

                                                let popup = refPopup.current;

                                                const { innerWidth, innerHeight } = window;

                                                let screenWSection = innerWidth / 3;

                                                popup && (popup.childNodes[0].className = 'mochi-contextual-popup');

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
                                                    popup && (popup.style.left = (input.left - 170 - (window.innerWidth - panelWidth)) + 'px');

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
                                                            if (equipment.name === props.selectedLbCarrierInfoDriver.equipment?.name) {
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

                                                refDispatchCarrierInfoEquipment.current.focus();
                                            });
                                        }, 300);
                                    }}></span>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={97 + props.tabTimes} type="text" placeholder="Truck" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, truck: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.truck || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={98 + props.tabTimes} type="text" placeholder="Trailer" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, trailer: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.trailer || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={99 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedLbCarrierInfoDriver({ ...props.selectedLbCarrierInfoDriver, notes: e.target.value })
                                    }} value={props.selectedLbCarrierInfoDriver.notes || ''} />
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
                                        value={props.selectedLbCarrierInfoCarrier?.mailing_address?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input tabIndex={55 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={56 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={57 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={58 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={59 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={60 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={61 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={62 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                            let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                            mailing_address.contact_phone = e.target.value;
                                            props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                        }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={63 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={64 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedLbCarrierInfoCarrier?.mailing_address?.email || ''} />
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
                                if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
                                    window.alert('There is nothing to print!');
                                    return;
                                }

                                let carrier = { ...props.selectedLbCarrierInfoCarrier };

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
                                    <div className="mochi-button" onClick={() => props.setSelectedLbCarrierInfoInsurance({})}>
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
                                        ref={refDispatchCarrierInfoInsuranceType}
                                        onKeyDown={onInsuranceTypeKeydown}
                                        onInput={() => { }}
                                        onChange={() => { }}
                                        value={props.selectedLbCarrierInfoInsurance.insurance_type?.name || ''} />

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
                                                const panelWidth = (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info'));

                                                const input = refDispatchCarrierInfoInsuranceType.current.getBoundingClientRect();

                                                let popup = refPopup.current;

                                                const { innerWidth, innerHeight } = window;

                                                let screenWSection = innerWidth / 3;

                                                popup && (popup.childNodes[0].className = 'mochi-contextual-popup');

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
                                                    popup && (popup.style.left = (input.left - 70 - (window.innerWidth - panelWidth)) + 'px');
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
                                                            if (insurance_type.name === props.selectedLbCarrierInfoInsurance.insurance_type?.name) {
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

                                                refDispatchCarrierInfoInsuranceType.current.focus();
                                            })
                                        }, 300);
                                    }}></span>

                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={87 + props.tabTimes} type="text" placeholder="Company"
                                        ref={refDispatchCarrierInfoInsuranceCompany}
                                        onKeyDown={onInsuranceCompanyKeydown}
                                        onInput={onInsuranceCompanyInput}
                                        // onChange={onInsuranceCompanyInput}
                                        value={props.selectedLbCarrierInfoInsurance.company || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={88 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Expiration Date"
                                        onKeyDown={validateInsuranceForSaving}
                                        onBlur={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, expiration_date: getFormattedDates(props.selectedLbCarrierInfoInsurance?.expiration_date) })}
                                        onChange={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, expiration_date: e.target.value })}
                                        onChange={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, expiration_date: e.target.value })}
                                        value={props.selectedLbCarrierInfoInsurance.expiration_date || ''}
                                        ref={refDispatchCarrierInfoInsuranceExpirationDate} />

                                    <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                        e.stopPropagation();

                                        if (moment((props.selectedLbCarrierInfoInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedLbCarrierInfoInsurance?.expiration_date || '').trim()) {
                                            setPreSelectedExpirationDate(moment(props.selectedLbCarrierInfoInsurance?.expiration_date, 'MM/DD/YYYY'));
                                        } else {
                                            setPreSelectedExpirationDate(moment());
                                        }

                                        const panelWidth = (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('carrier-info'));

                                        const input = refDispatchCarrierInfoInsuranceExpirationDate.current.inputElement.getBoundingClientRect();

                                        let popup = refDispatchCarrierCalendarPopup.current;

                                        const { innerWidth, innerHeight } = window;

                                        let screenWSection = innerWidth / 3;

                                        popup && (popup.childNodes[0].className = 'mochi-contextual-popup');

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
                                            popup && (popup.style.left = (input.left - 70 - (window.innerWidth - panelWidth)) + 'px');
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

                                        refDispatchCarrierInfoInsuranceExpirationDate.current.inputElement.focus();
                                    }}></span>
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <span className="currency-symbol">{(props.selectedLbCarrierInfoInsurance.amount || '') === '' ? '' : '$'}</span>

                                    <input tabIndex={89 + props.tabTimes}
                                        className="currency"
                                        type="text"
                                        placeholder="Amount"
                                        onKeyDown={validateInsuranceForSaving}
                                        onBlur={async (e) => { await props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, amount: accounting.formatNumber(e.target.value, 2, ',', '.') }) }}
                                        onChange={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, amount: e.target.value })}
                                        value={(props.selectedLbCarrierInfoInsurance?.amount || '')} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <span className="currency-symbol">{(props.selectedLbCarrierInfoInsurance.deductible || '') === '' ? '' : '$'}</span>

                                    <input tabIndex={89 + props.tabTimes}
                                        className="currency"
                                        type="text"
                                        placeholder="Amount"
                                        onKeyDown={validateInsuranceForSaving}
                                        onBlur={async (e) => { await props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, deductible: accounting.formatNumber(e.target.value, 2, ',', '.') }) }}
                                        onChange={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, deductible: e.target.value })}
                                        value={(props.selectedLbCarrierInfoInsurance?.deductible || '')} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={91 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, notes: e.target.value })} value={props.selectedLbCarrierInfoInsurance.notes || ''} />
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
                                    (props.selectedLbCarrierInfoCarrier.insurances || []).length > 0 &&
                                    <div className="insurances-list-header">
                                        <div className="contact-list-col tcol type">Type</div>
                                        <div className="contact-list-col tcol company">Company</div>
                                        <div className="contact-list-col tcol expiration-date">Exp. Date</div>
                                        <div className="contact-list-col tcol amount">Amount</div>
                                    </div>
                                }

                                <div className="insurances-list-wrapper">
                                    {
                                        (props.selectedLbCarrierInfoCarrier?.insurances || []).map((insurance, index) => {
                                            const itemClasses = classnames({
                                                'insurances-list-item': true,
                                                'selected': insurance.id === props.selectedLbCarrierInfoInsurance.id
                                            })

                                            return (
                                                <div className={itemClasses} key={index} onClick={() => props.setSelectedLbCarrierInfoInsurance({ ...insurance })}>
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
                                        if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0 || props.selectedLbCarrierInfoCarrier?.drivers.length === 0) {
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

                                        props.selectedLbCarrierInfoCarrier.drivers.map((driver, index) => {
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
                                    (props.selectedLbCarrierInfoCarrier?.drivers || []).length > 0 &&
                                    <div className="drivers-list-header">
                                        <div className="contact-list-col tcol first-name">First Name</div>
                                        <div className="contact-list-col tcol last-name">Last Name</div>
                                        <div className="contact-list-col tcol phone">Phone</div>
                                        <div className="contact-list-col tcol email">E-Mail</div>
                                    </div>
                                }

                                <div className="drivers-list-wrapper">
                                    {
                                        (props.selectedLbCarrierInfoCarrier?.drivers || []).map((driver, index) => {
                                            return (

                                                <div className="drivers-list-item" key={index} onClick={() => {
                                                    props.setSelectedLbCarrierInfoDriver({ ...driver });
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
                                        value={props.selectedLbCarrierInfoCarrier?.factoring_company?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input tabIndex={66 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.name = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={67 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.address1 = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={68 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.address2 = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={69 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.city = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={70 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.state = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={71 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.zip = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={72 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.contact_name = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={73 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                            let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                            factoring_company.contact_phone = e.target.value;
                                            props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                        }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={74 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.ext = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={75 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedLbCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.email = e.target.value;
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedLbCarrierInfoCarrier?.factoring_company?.email || ''} />
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
                                        if ((props.selectedLbCarrierInfoCarrier?.id || 0) === 0) {
                                            window.alert('You must select a carrier first!');
                                            return;
                                        }

                                        props.setSelectedLbCarrierInfoNote({ id: 0, carrier_id: props.selectedLbCarrierInfoCarrier?.id })
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedLbCarrierInfoCarrier?.id === undefined || props.selectedLbCarrierInfoCarrier?.notes.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedLbCarrierInfoCarrier?.notes.map((note, index) => {
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
                                        (props.selectedLbCarrierInfoCarrier?.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index} onClick={() => props.setSelectedLbCarrierInfoNote(note)}>
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
                                        if (props.selectedLbCarrierInfoCarrier?.id === undefined || (props.selectedLbCarrierInfoCarrier?.past_orders || []).length === 0) {
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
            </div>

            {
                props.selectedLbCarrierInfoNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CarrierModal
                        selectedData={props.selectedLbCarrierInfoNote}
                        setSelectedData={props.setSelectedLbCarrierInfoNote}
                        selectedParent={props.selectedLbCarrierInfoCarrier}
                        setSelectedParent={(notes) => {
                            props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, notes: notes });
                        }}
                        savingDataUrl='/saveCarrierNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={true}
                        isAdding={props.selectedLbCarrierInfoNote.id === 0}
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
                popupRef={refDispatchCarrierCalendarPopup}
                popupClasses={calendarPopupContainerClasses}
                popupGetter={moment((props.selectedLbCarrierInfoInsurance?.expiration_date || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedLbCarrierInfoInsurance?.expiration_date || '').trim()
                    ? moment(props.selectedLbCarrierInfoInsurance?.expiration_date, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={(day) => {
                    props.setSelectedLbCarrierInfoInsurance({ ...props.selectedLbCarrierInfoInsurance, expiration_date: day.format('MM/DD/YYYY') })
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
        serverUrl: state.systemReducers.serverUrl,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,

        lbCarrierInfoCarriers: state.carrierReducers.lbCarrierInfoCarriers,
        lbCarrierInfoContacts: state.carrierReducers.lbCarrierInfoContacts,
        selectedLbCarrierInfoCarrier: state.carrierReducers.selectedLbCarrierInfoCarrier,
        selectedLbCarrierInfoContact: state.carrierReducers.selectedLbCarrierInfoContact,
        selectedLbCarrierInfoNote: state.carrierReducers.selectedLbCarrierInfoNote,
        selectedLbCarrierInfoDirection: state.carrierReducers.selectedLbCarrierInfoDirection,
        lbCarrierInfoContactSearch: state.carrierReducers.lbCarrierInfoContactSearch,
        lbCarrierInfoShowingContactList: state.carrierReducers.lbCarrierInfoShowingContactList,
        selectedLbCarrierInfoDriver: state.carrierReducers.selectedLbCarrierInfoDriver,
        selectedLbCarrierInfoInsurance: state.carrierReducers.selectedLbCarrierInfoInsurance
    }
}

export default connect(mapStateToProps, {
    setLbCarrierInfoCarriers,
    setSelectedLbCarrierInfoCarrier,    
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoNote,
    setLbCarrierInfoContactSearch,
    setLbCarrierInfoShowingContactList,
    setLbCarrierInfoCarrierSearch,
    setLbCarrierInfoCarrierContacts,
    setLbCarrierInfoContactSearchCarrier,
    setLbCarrierInfoIsEditingContact,
    setSelectedLbCarrierInfoDocument,
    setLbCarrierInfoDrivers,
    setSelectedLbCarrierInfoDriver,
    setLbCarrierInfoEquipments,
    setLbCarrierInfoInsuranceTypes,
    setSelectedLbCarrierInfoEquipment,
    setSelectedLbCarrierInfoInsuranceType,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoFactoringCompanies,
    setLbCarrierInfoCarrierInsurances,
    setSelectedLbCarrierInfoInsurance,
    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setDispatchOpenedPanels
})(CarrierInfo)