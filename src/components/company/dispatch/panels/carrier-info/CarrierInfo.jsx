import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './CarrierInfo.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import CarrierPopup from './../../popup/Popup.jsx';
import MaskedInput from 'react-text-mask';
import CarrierModal from './../../modal/Modal.jsx';
import ReactStars from "react-rating-stars-component";
import {
    setDispatchCarrierInfoCarriers,
    setSelectedDispatchCarrierInfoCarrier,
    setDispatchPanels,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoNote,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoShowingContactList,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarrierContacts,
    setDispatchCarrierInfoContactSearchCarrier,
    setDispatchCarrierInfoIsEditingContact,
    setSelectedDispatchCarrierInfoDocument,
    setDispatchCarrierInfoDrivers,
    setSelectedDispatchCarrierInfoDriver,
    setDispatchCarrierInfoEquipments,
    setDispatchCarrierInfoInsuranceTypes,
    setSelectedDispatchCarrierInfoEquipment,
    setSelectedDispatchCarrierInfoInsuranceType,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoFactoringCompanies,
    setDispatchCarrierInfoCarrierInsurances,
    setSelectedDispatchCarrierInfoInsurance,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyContact
} from '../../../../../actions';

function CarrierInfo(props) {
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
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const [driverPendingSave, setDriverPendingSave] = useState(false);
    const [insurancePendingSave, setInsurancePendingSave] = useState(false);
    const [selectedEquipmentIndex, setSelectedDispatchCarrierInfoEquipmentIndex] = useState(-1);
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedDispatchCarrierInfoNote.id !== undefined || props.selectedDispatchCarrierInfoDirection.id !== undefined) ? 1 : 0 });

    useEffect(() => {
        $.post(props.serverUrl + '/getCarrierPopupItems').then(res => {
            if (res.result === 'OK') {
                props.setDispatchCarrierInfoEquipments(res.equipments.map(e => {
                    e.selected = false;
                    return e;
                }));
                props.setDispatchCarrierInfoInsuranceTypes(res.insurance_types.map(t => {
                    t.selected = false;
                    return t;
                }));
            }
        })
    }, []);

    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'carrier-info') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
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
        props.setSelectedDispatchCarrierInfoContact({});
        props.setSelectedDispatchCarrierInfoNote({});
        props.setDispatchCarrierInfoContactSearch({});
        props.setDispatchCarrierInfoShowingContactList(true);
        props.setSelectedDispatchCarrierInfoDriver({});
        props.setSelectedDispatchCarrierInfoCarrier({ id: 0, code: clearCode ? '' : props.selectedDispatchCarrierInfoCarrier?.code });
        setPopupItems([]);
    }

    const searchCarrierBtnClick = () => {
        let carrierSearch = [
            {
                field: 'Name',
                data: (props.selectedDispatchCarrierInfoCarrier?.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedDispatchCarrierInfoCarrier?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedDispatchCarrierInfoCarrier?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedDispatchCarrierInfoCarrier?.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedDispatchCarrierInfoCarrier?.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedDispatchCarrierInfoCarrier?.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedDispatchCarrierInfoCarrier?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/carrierSearch', { search: carrierSearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setDispatchCarrierInfoCarrierSearch(carrierSearch);
                await props.setDispatchCarrierInfoCarriers(res.carriers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-info-search') {
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
                            await props.setSelectedDispatchCarrierInfoCarrier(res.carriers[0]);

                            await res.carriers[0].contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedDispatchCarrierInfoContact(c);
                                }
                                return true;
                            });

                            await props.setSelectedDispatchCarrierInfoDriver({});
                            await props.setSelectedDispatchCarrierInfoInsurance({});

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
                let selectedCarrier = props.selectedDispatchCarrierInfoCarrier;

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

                                if (props.selectedDispatchCarrierInfoCarrier?.id === undefined && (props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
                                    props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, id: res.carrier.id });
                                }

                                (res.carrier.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedDispatchCarrierInfoContact(contact);
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
            if (props.selectedDispatchCarrierInfoCarrier?.id === undefined) {
                return;
            }

            let contact = props.selectedDispatchCarrierInfoContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedDispatchCarrierInfoCarrier?.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedDispatchCarrierInfoCarrier?.address1;
                contact.address2 = props.selectedDispatchCarrierInfoCarrier?.address2;
                contact.city = props.selectedDispatchCarrierInfoCarrier?.city;
                contact.state = props.selectedDispatchCarrierInfoCarrier?.state;
                contact.zip_code = props.selectedDispatchCarrierInfoCarrier?.zip;
            }

            if (!isSavingContact) {
                setIsSavingContact(true);

                $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedCarrier, contacts: res.contacts });
                        await props.setSelectedDispatchCarrierInfoContact(res.contact);
                    }

                    setIsSavingContact(false);
                });
            }
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        console.log(e);
        await props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, is_primary: e.target.checked ? 1 : 0 });

        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined) {
            return;
        }

        let contact = props.selectedDispatchCarrierInfoContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.carrier_id === undefined || contact.carrier_id === 0) {
            contact.carrier_id = props.selectedDispatchCarrierInfoCarrier?.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedDispatchCarrierInfoCarrier?.address1;
            contact.address2 = props.selectedDispatchCarrierInfoCarrier?.address2;
            contact.city = props.selectedDispatchCarrierInfoCarrier?.city;
            contact.state = props.selectedDispatchCarrierInfoCarrier?.state;
            contact.zip_code = props.selectedDispatchCarrierInfoCarrier?.zip;
        }

        $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedDispatchCarrierInfoContact(res.contact);
                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Carrier Id',
                data: props.selectedDispatchCarrierInfoCarrier?.id || 0
            },
            {
                field: 'First Name',
                data: (props.dispatchCarrierInfoContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.dispatchCarrierInfoContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.dispatchCarrierInfoContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.dispatchCarrierInfoContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.dispatchCarrierInfoContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.dispatchCarrierInfoContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.dispatchCarrierInfoContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.dispatchCarrierInfoContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/carrierContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, filters: filters });
                await props.setDispatchCarrierInfoCarrierContacts(res.contacts);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-info-contact-search') {
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

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'equipment':
                props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment_id: item.id, equipment: item });
                await setPopupItems([]);
                break;
            case 'insurance-type':
                props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, insurance_type_id: item.id, insurance_type: item });
                await setPopupItems([]);
                break;
            case 'insurance-company':
                props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, company: item.name });
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
                    props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id, equipment_id: item.id, equipment: item });
                    let driver = { ...props.selectedDispatchCarrierInfoDriver, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id, equipment_id: item.id, equipment: item };


                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingDriver) {
                            setIsSavingDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                    await props.setSelectedDispatchCarrierInfoDriver({ ...res.driver });
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
                if ((props.selectedDispatchCarrierInfoDriver.equipment_id || 0) === 0) {
                    props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment: {} });
                } else {
                    validateDriverForSaving(e);
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id, equipment_id: item.id, equipment: item });
                        let driver = { ...props.selectedDispatchCarrierInfoDriver, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id, equipment_id: item.id, equipment: item };

                        if ((driver.first_name || '').trim() !== '') {
                            if (!isSavingDriver) {
                                setIsSavingDriver(true);

                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                        await props.setSelectedDispatchCarrierInfoDriver({ ...res.driver });
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
        let equipment = props.selectedDispatchCarrierInfoDriver.equipment || {};
        equipment.name = e.target.value.trim();
        await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment_id: 0, equipment: equipment });

        setPopupActiveInput('equipment');

        if (props.selectedDispatchCarrierInfoCarrier?.id !== undefined) {
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
        props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, company: e.target.value.trim() });

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
                            props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, company: item.name });
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
        let selectedInsurance = props.selectedDispatchCarrierInfoInsurance || { id: 0 };
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
                        props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                    props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
                }

                return type;
            }));
        } else if (key === 'tab') {
            setPopupItems([]);


        } else if (key === 'arrowleft' || key === 'arrowup') {
            if (popupItems.length === 0) {
                if ((props.selectedDispatchCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedDispatchCarrierInfoInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                        props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'arrowright' || key === 'arrowdown') {
            if (popupItems.length === 0) {
                if ((props.selectedDispatchCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedDispatchCarrierInfoInsurance.insurance_type.name === type.name) {
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                        props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
                    }

                    return type;
                }));
            }
        } else if (key === 'click') {
            if (popupItems.length === 0) {
                if ((props.selectedDispatchCarrierInfoInsurance.insurance_type?.name || '') !== '') {
                    setPopupItems(props.dispatchCarrierInfoInsuranceTypes.map((type, index) => {
                        if (props.selectedDispatchCarrierInfoInsurance.insurance_type.name === type.name) {
                            type.selected = true;
                            selectedIndex = index;
                        }

                        if (type.selected) {
                            selectedInsurance.insurance_type_id = type.id;
                            selectedInsurance.insurance_type = type;
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                            props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
                        props.setSelectedDispatchCarrierInfoInsurance(selectedInsurance);
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
            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                    if (mailing_address.id !== undefined) {
                        mailing_address.id = 0;
                    }
                    mailing_address.carrier_id = props.selectedDispatchCarrierInfoCarrier?.id;

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
                                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: res.mailing_address });
                            }
                        });
                    }
                }, 300);
            }
        }
    }

    const clearMailingAddressBtn = async () => {
        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: {} });

        if (props.selectedDispatchCarrierInfoCarrier?.id || 0 > 0) {
            await $.post(props.serverUrl + '/deleteCarrierMailingAddress', { carrier_id: (props.selectedDispatchCarrierInfoCarrier?.id || 0) }).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: {} });
                }
            });
        }
    }

    const remitToAddressBtn = async (e) => {
        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined) {
            window.alert('You must select a carrier first!');
            return;
        }

        if (props.selectedDispatchCarrierInfoCarrier?.id === 0) {
            window.alert('You must save the carrier first!');
            return;
        }

        let mailing_address = {};

        mailing_address.id = -1;
        mailing_address.carrier_id = props.selectedDispatchCarrierInfoCarrier?.id;
        mailing_address.code = props.selectedDispatchCarrierInfoCarrier?.code;
        mailing_address.code_number = props.selectedDispatchCarrierInfoCarrier?.code_number;
        mailing_address.name = props.selectedDispatchCarrierInfoCarrier?.name;
        mailing_address.address1 = props.selectedDispatchCarrierInfoCarrier?.address1;
        mailing_address.address2 = props.selectedDispatchCarrierInfoCarrier?.address2;
        mailing_address.city = props.selectedDispatchCarrierInfoCarrier?.city;
        mailing_address.state = props.selectedDispatchCarrierInfoCarrier?.state;
        mailing_address.zip = props.selectedDispatchCarrierInfoCarrier?.zip;
        mailing_address.contact_name = props.selectedDispatchCarrierInfoCarrier?.contact_name;
        mailing_address.contact_phone = props.selectedDispatchCarrierInfoCarrier?.contact_phone;
        mailing_address.ext = props.selectedDispatchCarrierInfoCarrier?.ext;
        mailing_address.email = props.selectedDispatchCarrierInfoCarrier?.email;

        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
        await $.post(props.serverUrl + '/saveCarrierMailingAddress', mailing_address).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: res.mailing_address });
            }
        });
    }

    const validateFactoringCompanyToSave = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {

                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};

                    if (factoring_company.id !== undefined) {
                        factoring_company.id = 0;
                    }
                    factoring_company.carrier_id = props.selectedDispatchCarrierInfoCarrier?.id;

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
                                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: res.factoring_company });
                            }
                        });
                    }
                }, 300);
            }
        }
    }

    const searchFactoringCompanyBtnClick = () => {

        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedDispatchCarrierInfoCarrier?.factoring_company?.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setDispatchCarrierInfoFactoringCompanySearch(factoringCompanySearch);
                await props.setDispatchCarrierInfoFactoringCompanies(res.factoring_companies);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-info-factoring-company-search') {
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

    const moreFactoringCompanyBtnClick = () => {
        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
            window.alert('You must select a carrier first!');
            return;
        }

        if ((props.selectedDispatchCarrierInfoCarrier?.factoring_company?.id || 0) === 0) {
            window.alert('You must select a factoring company first!');
            return;
        }

        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'carrier-info-factoring-company') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoCarrier?.factoring_company });

        (props.selectedDispatchCarrierInfoCarrier.factoring_company.contacts || []).map((contact, index) => {
            if (contact.is_primary === 1) {
                props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...contact });
            }

            return true;
        })

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setDispatchPanels(panels);
    }

    const clearFactoringCompanyBtnClick = async () => {
        let selectedCarrier = { ...props.selectedDispatchCarrierInfoCarrier };
        selectedCarrier.factoring_company_id = 0;
        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: {} });

        if (props.selectedDispatchCarrierInfoCarrier?.id || 0 > 0) {
            await $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: {} });
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
            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                let driver = { ...props.selectedDispatchCarrierInfoDriver, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id };

                if ((driver.first_name || '').trim() !== '') {
                    if (!isSavingDriver) {
                        setIsSavingDriver(true);

                        $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedDispatchCarrierInfoDriver.id === undefined || (props.selectedDispatchCarrierInfoDriver.id || 0) === 0) {
                                    console.log(typeof tabindex, tabindex);
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedDispatchCarrierInfoDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, id: res.driver.id });
                                    }
                                } else {
                                    if (tabindex === (99 + props.tabTimes).toString()) {
                                        e.preventDefault();
                                        await props.setSelectedDispatchCarrierInfoDriver({});
                                        goToTabindex((92 + props.tabTimes).toString());
                                    } else {
                                        await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, id: res.driver.id });
                                    }
                                }

                                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                            }

                            await setIsSavingDriver(false);
                        });
                    } else {
                        if (tabindex === (99 + props.tabTimes).toString()) {
                            e.preventDefault();
                            if (isObjectEmpty(props.selectedDispatchCarrierInfoDriver)) {
                                goToTabindex((43 + props.tabTimes).toString());
                            } else {
                                goToTabindex((92 + props.tabTimes).toString());
                            }
                            props.setSelectedDispatchCarrierInfoDriver({});
                        }
                    }
                } else {
                    if (tabindex === (99 + props.tabTimes).toString()) {
                        e.preventDefault();
                        if (isObjectEmpty(props.selectedDispatchCarrierInfoDriver)) {
                            goToTabindex((43 + props.tabTimes).toString());
                        } else {
                            goToTabindex((92 + props.tabTimes).toString());
                        }
                        props.setSelectedDispatchCarrierInfoDriver({});
                    }
                }
            } else {
                if (tabindex === (99 + props.tabTimes).toString()) {
                    e.preventDefault();
                    if (isObjectEmpty(props.selectedDispatchCarrierInfoDriver)) {
                        goToTabindex((43 + props.tabTimes).toString());
                    } else {
                        goToTabindex((92 + props.tabTimes).toString());
                    }
                    props.setSelectedDispatchCarrierInfoDriver({});
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

    const validateInsuranceForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9 && (props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
            let insurance = { ...props.selectedDispatchCarrierInfoInsurance, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id };

            if ((insurance.insurance_type_id || 0) >= 0 &&
                (insurance.company || '').trim() !== '' &&
                (insurance.expiration_date || '').trim() !== '' &&
                (insurance.amount || '').trim() !== '') {

                if (!isSavingInsurance) {
                    setIsSavingInsurance(true);
                    $.post(props.serverUrl + '/saveInsurance', insurance).then(res => {
                        if (res.result === 'OK') {
                            props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedCarrier, insurances: res.insurances });
                            props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedInsurance, id: res.insurance.id });
                        }
                        setIsSavingInsurance(false);
                    });
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

        (props.selectedDispatchCarrierInfoCarrier?.insurances || []).map((insurance, index) => {
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
        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
            props.setSelectedDispatchCarrierInfoDocument({
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

            props.setDispatchPanels(panels);
        } else {
            window.alert('You must select a carrier first!');
        }
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

        props.setDispatchPanels(panels);
    }

    const equipmentInformationBtnClick = () => {
        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'equipment-information') {
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
            if (p.name === 'order-history') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setDispatchPanels(panels);
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

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

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
                                        onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, code: e.target.value })}
                                        value={(props.selectedDispatchCarrierInfoCarrier?.code_number || 0) === 0 ? (props.selectedDispatchCarrierInfoCarrier?.code || '') : props.selectedDispatchCarrierInfoCarrier?.code + props.selectedDispatchCarrierInfoCarrier?.code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={44 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, name: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={45 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, address1: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={46 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, address2: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={47 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, city: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={48 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, state: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={49 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, zip: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={50 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_name: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={51 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_phone: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={52 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, ext: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={53 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, email: e.target.value })} value={props.selectedDispatchCarrierInfoCarrier?.email || ''} />
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
                                    props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, do_not_use: e.target.checked ? 1 : 0 });
                                    // validateCarrierForSaving(e)
                                }} checked={(props.selectedDispatchCarrierInfoCarrier?.do_not_use || 0) === 1} />
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
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mc_number: e.target.value })
                                    }}
                                    value={props.selectedDispatchCarrierInfoCarrier?.mc_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={77 + props.tabTimes} type="text" placeholder='DOT Number'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, dot_number: e.target.value })
                                    }}
                                    value={props.selectedDispatchCarrierInfoCarrier?.dot_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={78 + props.tabTimes} type="text" placeholder='SCAC'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, scac: e.target.value })
                                    }}
                                    value={props.selectedDispatchCarrierInfoCarrier?.scac || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input tabIndex={79 + props.tabTimes} type="text" placeholder='FID'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, fid: e.target.value })
                                    }}
                                    value={props.selectedDispatchCarrierInfoCarrier?.fid || ''} />
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
                                        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined) {
                                            window.alert('You must select a contact first!');
                                            return;
                                        }

                                        if (props.selectedDispatchCarrierInfoContact.id === undefined) {
                                            window.alert('You must select a contact');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'carrier-info-contacts') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        await props.setDispatchCarrierInfoIsEditingContact(false);
                                        await props.setDispatchCarrierInfoContactSearchCarrier({ ...props.selectedDispatchCarrierInfoCarrier, selectedContact: props.selectedDispatchCarrierInfoContact });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined || props.selectedDispatchCarrierInfoCarrier?.id <= 0) {
                                            window.alert('You must select a carrier');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'carrier-info-contacts') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        props.setDispatchCarrierInfoContactSearchCarrier({ ...props.selectedDispatchCarrierInfoCarrier, selectedContact: { id: 0, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id } });
                                        props.setDispatchCarrierInfoIsEditingContact(true);

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => props.setSelectedDispatchCarrierInfoContact({})}>
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

                                        props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, first_name: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoContact.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={81 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, last_name: e.target.value })} value={props.selectedDispatchCarrierInfoContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '50%' }}>
                                    <MaskedInput tabIndex={82 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_work: e.target.value })} value={props.selectedDispatchCarrierInfoContact.phone_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input tabIndex={83 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_ext: e.target.value })} value={props.selectedDispatchCarrierInfoContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-carrier-info-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedDispatchCarrierInfoContact.is_primary || 0) === 1} />
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
                                    <input tabIndex={84 + props.tabTimes} type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, email_work: e.target.value })} value={props.selectedDispatchCarrierInfoContact.email_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={85 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, notes: e.target.value })} value={props.selectedDispatchCarrierInfoContact.notes || ''} />
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
                                        props.dispatchCarrierInfoShowingContactList &&
                                        <div className="mochi-button" onClick={() => props.setDispatchCarrierInfoShowingContactList(false)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !props.dispatchCarrierInfoShowingContactList &&
                                        <div className="mochi-button" onClick={() => props.setDispatchCarrierInfoShowingContactList(true)}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    {
                                        !props.dispatchCarrierInfoShowingContactList &&
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
                                <div className="form-slider-wrapper" style={{ left: props.dispatchCarrierInfoShowingContactList ? 0 : '-100%' }}>
                                    <div className="contact-list-box">

                                        {
                                            (props.selectedDispatchCarrierInfoCarrier?.contacts || []).length > 0 &&
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
                                                (props.selectedDispatchCarrierInfoCarrier?.contacts || []).map((contact, index) => {
                                                    return (
                                                        <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                            let index = props.panels.length - 1;
                                                            let panels = props.panels.map((p, i) => {
                                                                if (p.name === 'carrier-info-contacts') {
                                                                    index = i;
                                                                    p.isOpened = true;
                                                                }
                                                                return p;
                                                            });

                                                            await props.setDispatchCarrierInfoIsEditingContact(false);
                                                            await props.setDispatchCarrierInfoContactSearchCarrier({ ...props.selectedDispatchCarrierInfoCarrier, selectedContact: contact });

                                                            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                            props.setDispatchPanels(panels);
                                                        }} onClick={() => props.setSelectedDispatchCarrierInfoContact(contact)}>
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
                                                <input type="text" placeholder="First Name" onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, first_name: e.target.value })} value={props.dispatchCarrierInfoContactSearch.first_name || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Last Name" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, last_name: e.target.value })} value={props.dispatchCarrierInfoContactSearch.last_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, address1: e.target.value })} value={props.dispatchCarrierInfoContactSearch.address1 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, address2: e.target.value })} value={props.dispatchCarrierInfoContactSearch.address2 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, city: e.target.value })} value={props.dispatchCarrierInfoContactSearch.city || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, state: e.target.value })} value={props.dispatchCarrierInfoContactSearch.state || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, phone: e.target.value })} value={props.dispatchCarrierInfoContactSearch.phone || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setDispatchCarrierInfoShowingContactList(false) }} onChange={e => props.setDispatchCarrierInfoContactSearch({ ...props.dispatchCarrierInfoContactSearch, email: e.target.value })} value={props.dispatchCarrierInfoContactSearch.email || ''} />
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
                                        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
                                            window.alert('You must selecte a carrier first!');
                                            return;
                                        }

                                        if ((props.selectedDispatchCarrierInfoDriver.id || 0) === 0) {
                                            window.alert('You must selecte a driver first!');
                                            return;
                                        }

                                        if (window.confirm('Are you sure to delete this driver?')) {
                                            $.post(props.serverUrl + '/deleteCarrierDriver', props.selectedDispatchCarrierInfoDriver).then(res => {
                                                if (res.result === 'OK') {
                                                    console.log(res);
                                                    props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                                    props.setSelectedDispatchCarrierInfoDriver({});
                                                }
                                            })
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Delete</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>

                                    <div className="mochi-button" onClick={() => { props.setSelectedDispatchCarrierInfoDriver({}) }}>
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
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, first_name: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={93 + props.tabTimes} type="text" placeholder="Last Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, last_name: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.last_name || ''} />
                                </div>
                            </div>

                            <div className="form-v-sep"></div>

                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '40%' }}>
                                    <MaskedInput tabIndex={94 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateDriverForSaving} onChange={e => {
                                            props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, phone: e.target.value })
                                        }} value={props.selectedDispatchCarrierInfoDriver.phone || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container" style={{ flexGrow: 1 }}>
                                    <input tabIndex={95 + props.tabTimes} type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, email: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.email || ''} />
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
                                        value={props.selectedDispatchCarrierInfoDriver.equipment?.name || ''} />

                                    <span className="fas fa-caret-down" style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: `translateY(-50%)`,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer'
                                    }} onClick={() => {
                                        onEquipmentInput({ target: { value: refDispatchCarrierInfoEquipment.current.value } });
                                        refDispatchCarrierInfoEquipment.current.focus();
                                    }}></span>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={97 + props.tabTimes} type="text" placeholder="Truck" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, truck: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.truck || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={98 + props.tabTimes} type="text" placeholder="Trailer" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, trailer: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.trailer || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={99 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, notes: e.target.value })
                                    }} value={props.selectedDispatchCarrierInfoDriver.notes || ''} />
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
                                        value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input tabIndex={55 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={56 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={57 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={58 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={59 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={60 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={61 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={62 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                            let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                            mailing_address.contact_phone = e.target.value;
                                            props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                        }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={63 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={64 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoCarrier?.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.mailing_address?.email || ''} />
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
                                if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
                                    window.alert('There is nothing to print!');
                                    return;
                                }

                                let carrier = { ...props.selectedDispatchCarrierInfoCarrier };

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
                                    <div className="mochi-button" onClick={() => props.setSelectedDispatchCarrierInfoInsurance({})}>
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
                                        value={props.selectedDispatchCarrierInfoInsurance.insurance_type?.name || ''} />

                                    <span className="fas fa-caret-down" style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: `translateY(-50%)`,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer'
                                    }} onClick={() => {
                                        refDispatchCarrierInfoInsuranceType.current.focus();
                                        onInsuranceTypeKeydown({ key: 'click', preventDefault: () => { } });
                                    }}></span>

                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={87 + props.tabTimes} type="text" placeholder="Company"
                                        ref={refDispatchCarrierInfoInsuranceCompany}
                                        onKeyDown={onInsuranceCompanyKeydown}
                                        onInput={onInsuranceCompanyInput}
                                        // onChange={onInsuranceCompanyInput}
                                        value={props.selectedDispatchCarrierInfoInsurance.company || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={88 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Expiration Date" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, expiration_date: e.target.value })} value={props.selectedDispatchCarrierInfoInsurance.expiration_date || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={89 + props.tabTimes} type="text" placeholder="Amount" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, amount: e.target.value })} value={props.selectedDispatchCarrierInfoInsurance.amount || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={90 + props.tabTimes} type="text" placeholder="Deductible" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, deductible: e.target.value })} value={props.selectedDispatchCarrierInfoInsurance.deductible || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={91 + props.tabTimes} type="text" placeholder="Notes" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedDispatchCarrierInfoInsurance({ ...props.selectedDispatchCarrierInfoInsurance, notes: e.target.value })} value={props.selectedDispatchCarrierInfoInsurance.notes || ''} />
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
                                    (props.selectedDispatchCarrierInfoCarrier.insurances || []).length > 0 &&
                                    <div className="insurances-list-header">
                                        <div className="contact-list-col tcol type">Type</div>
                                        <div className="contact-list-col tcol company">Company</div>
                                        <div className="contact-list-col tcol expiration-date">Exp. Date</div>
                                        <div className="contact-list-col tcol amount">Amount</div>
                                    </div>
                                }

                                <div className="insurances-list-wrapper">
                                    {
                                        (props.selectedDispatchCarrierInfoCarrier?.insurances || []).map((insurance, index) => {
                                            return (
                                                <div className="insurances-list-item" key={index} onClick={() => props.setSelectedDispatchCarrierInfoInsurance({ ...insurance })}>
                                                    <div className="contact-list-col tcol type">{insurance.insurance_type.name}</div>
                                                    <div className="contact-list-col tcol company">{insurance.company}</div>
                                                    <div className="contact-list-col tcol expiration-date">{insurance.expiration_date}</div>
                                                    <div className="contact-list-col tcol amount">{insurance.amount}</div>
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
                                        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0 || props.selectedDispatchCarrierInfoCarrier?.drivers.length === 0) {
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

                                        props.selectedDispatchCarrierInfoCarrier.drivers.map((driver, index) => {
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
                                    (props.selectedDispatchCarrierInfoCarrier?.drivers || []).length > 0 &&
                                    <div className="drivers-list-header">
                                        <div className="contact-list-col tcol first-name">First Name</div>
                                        <div className="contact-list-col tcol last-name">Last Name</div>
                                        <div className="contact-list-col tcol phone">Phone</div>
                                        <div className="contact-list-col tcol email">E-Mail</div>
                                    </div>
                                }

                                <div className="drivers-list-wrapper">
                                    {
                                        (props.selectedDispatchCarrierInfoCarrier?.drivers || []).map((driver, index) => {
                                            return (

                                                <div className="drivers-list-item" key={index} onClick={() => {
                                                    props.setSelectedDispatchCarrierInfoDriver({ ...driver });
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
                                        value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input tabIndex={66 + props.tabTimes} type="text" placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={67 + props.tabTimes} type="text" placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.address1 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={68 + props.tabTimes} type="text" placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.address2 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={69 + props.tabTimes} type="text" placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.city = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={70 + props.tabTimes} type="text" placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.state = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={71 + props.tabTimes} type="text" placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.zip = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={72 + props.tabTimes} type="text" placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.contact_name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={73 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                            let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                            factoring_company.contact_phone = e.target.value;
                                            props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                        }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={74 + props.tabTimes} type="text" placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.ext = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={75 + props.tabTimes} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedDispatchCarrierInfoCarrier?.factoring_company || {};
                                        factoring_company.email = e.target.value;
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedDispatchCarrierInfoCarrier?.factoring_company?.email || ''} />
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
                                        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0) {
                                            window.alert('You must select a carrier first!');
                                            return;
                                        }

                                        props.setSelectedDispatchCarrierInfoNote({ id: 0, carrier_id: props.selectedDispatchCarrierInfoCarrier?.id })
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button" onClick={() => {
                                        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined || props.selectedDispatchCarrierInfoCarrier?.notes.length === 0) {
                                            window.alert('There is nothing to print!');
                                            return;
                                        }

                                        let html = ``;

                                        props.selectedDispatchCarrierInfoCarrier?.notes.map((note, index) => {
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
                                        (props.selectedDispatchCarrierInfoCarrier?.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index} onClick={() => props.setSelectedDispatchCarrierInfoNote(note)}>
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
                                        if (props.selectedDispatchCarrierInfoCarrier?.id === undefined || (props.selectedDispatchCarrierInfoCarrier?.past_orders || []).length === 0) {
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
                props.selectedDispatchCarrierInfoNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CarrierModal
                        selectedData={props.selectedDispatchCarrierInfoNote}
                        setSelectedData={props.setSelectedDispatchCarrierInfoNote}
                        selectedParent={props.selectedDispatchCarrierInfoCarrier}
                        setSelectedParent={(notes) => {
                            props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, notes: notes });
                        }}
                        savingDataUrl='/saveCarrierNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={true}
                        isAdding={props.selectedDispatchCarrierInfoNote.id === 0}
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

        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.systemReducers.scale,
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,

        dispatchCarrierInfoCarriers: state.carrierReducers.dispatchCarrierInfoCarriers,
        dispatchCarrierInfoContacts: state.carrierReducers.dispatchCarrierInfoContacts,
        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,
        selectedDispatchCarrierInfoContact: state.carrierReducers.selectedDispatchCarrierInfoContact,
        selectedDispatchCarrierInfoNote: state.carrierReducers.selectedDispatchCarrierInfoNote,
        selectedDispatchCarrierInfoDirection: state.carrierReducers.selectedDispatchCarrierInfoDirection,
        dispatchCarrierInfoContactSearch: state.carrierReducers.dispatchCarrierInfoContactSearch,
        dispatchCarrierInfoShowingContactList: state.carrierReducers.dispatchCarrierInfoShowingContactList,
        selectedDispatchCarrierInfoDriver: state.carrierReducers.selectedDispatchCarrierInfoDriver,
        selectedDispatchCarrierInfoInsurance: state.carrierReducers.selectedDispatchCarrierInfoInsurance
    }
}

export default connect(mapStateToProps, {
    setDispatchCarrierInfoCarriers,
    setSelectedDispatchCarrierInfoCarrier,
    setDispatchPanels,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoNote,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoShowingContactList,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarrierContacts,
    setDispatchCarrierInfoContactSearchCarrier,
    setDispatchCarrierInfoIsEditingContact,
    setSelectedDispatchCarrierInfoDocument,
    setDispatchCarrierInfoDrivers,
    setSelectedDispatchCarrierInfoDriver,
    setDispatchCarrierInfoEquipments,
    setDispatchCarrierInfoInsuranceTypes,
    setSelectedDispatchCarrierInfoEquipment,
    setSelectedDispatchCarrierInfoInsuranceType,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoFactoringCompanies,
    setDispatchCarrierInfoCarrierInsurances,
    setSelectedDispatchCarrierInfoInsurance,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyContact
})(CarrierInfo)