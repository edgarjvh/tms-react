import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './Carriers.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import CarrierPopup from './popup/Popup.jsx';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import CarrierModal from './modal/Modal.jsx';
import ReactStars from "react-rating-stars-component";
import {
    setCarriers,
    setSelectedCarrier,
    setCarrierPanels,
    setSelectedContact,
    setSelectedNote,
    setContactSearch,
    setShowingContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedDocument,
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
    setSelectedFactoringCompany
} from '../../../actions';

function Carriers(props) {
    const [popupItems, setPopupItems] = useState([]);
    const [lastState, setLastState] = useState(0);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refEquipment = useRef();
    const refInsuranceType = useRef();
    const refInsuranceCompany = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const [driverPendingSave, setDriverPendingSave] = useState(false);
    const [insurancePendingSave, setInsurancePendingSave] = useState(false);
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
        setLastState(-1);
        props.setSelectedContact({});
        props.setSelectedNote({});
        props.setContactSearch({});
        props.setShowingContactList(true);
        props.setSelectedDriver({});
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

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setCarrierPanels(panels);
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
                                    await props.setSelectedContact(c);
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

                    selectedCarrier.code = newCode;

                    $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(res => {
                        if (props.selectedCarrier.id !== undefined && props.selectedCarrier.id >= 0) {
                            if (lastState >= 0) {
                                props.setSelectedCarrier(res.carrier);
                                if (res.carrier.contacts.length === 1) {
                                    if (res.carrier.contacts[0].is_primary === 1) {
                                        props.setSelectedContact(res.carrier.contacts[0]);
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

            $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedCarrier({ ...props.selectedCarrier, contacts: res.contacts });
                    await props.setSelectedContact(res.contact);
                }
            });
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        console.log(e);
        await props.setSelectedContact({ ...props.selectedContact, is_primary: e.target.checked ? 1 : 0 });

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
                await props.setSelectedContact(res.contact);
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

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-contact-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setCarrierPanels(panels);
            }
        });
    }

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'equipment':
                props.setSelectedDriver({ ...props.selectedDriver, equipment_id: item.id, equipment: item });
                await setPopupItems([]);
                break;
            case 'insurance-type':
                props.setSelectedInsurance({ ...props.selectedInsurance, insurance_type_id: item.id, insurance_type: item });
                await setPopupItems([]);
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
                    if (!driverPendingSave) {

                        if ((driver.first_name || '').trim() !== '') {
                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                                setDriverPendingSave(true);
                                if (res.result === 'OK') {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                    props.setSelectedDriver({ ...res.driver });
                                }
                                setDriverPendingSave(false);
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
                    validateDriverForSaving({ keyCode: 9 });
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedDriver({ ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item });
                        let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item };
                        if (!driverPendingSave) {

                            if ((driver.first_name || '').trim() !== '') {
                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                                    setDriverPendingSave(true);
                                    if (res.result === 'OK') {
                                        props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                                        props.setSelectedDriver({ ...res.driver });
                                    }
                                    setDriverPendingSave(false);
                                });
                            }
                        }
                    }

                    return true;
                });

                validateDriverForSaving({ keyCode: 9 });
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

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-factoring-company-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setCarrierPanels(panels);
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

        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'carrier-factoring-company') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        props.setSelectedFactoringCompany({ ...props.selectedCarrier.factoring_company });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setCarrierPanels(panels);
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
                if (!driverPendingSave) {

                    let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id };

                    if ((driver.first_name || '').trim() !== '') {
                        $.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                            setDriverPendingSave(true);
                            if (res.result === 'OK') {
                                props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });                                

                                if (tabindex === '99'){
                                    e.preventDefault();
                                    props.setSelectedDriver({});
                                    goToTabindex('92');
                                }else{
                                    props.setSelectedDriver({...res.driver});
                                }
                            }
                            setDriverPendingSave(false);
                        });
                    }else{
                        if (tabindex === '99'){
                            e.preventDefault();
                            goToTabindex('43');
                        }
                    }
                }else{
                    if (tabindex === '99'){
                        e.preventDefault();
                        goToTabindex('43');
                    }
                }
            }else{
                if (tabindex === '99'){
                    e.preventDefault();
                    goToTabindex('43');
                }
            }
        }
    }

    const validateInsuranceForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9 && (props.selectedCarrier.id || 0) > 0) {
            if (!insurancePendingSave) {
                console.log(props.selectedCarrier.id)

                let insurance = { ...props.selectedInsurance, carrier_id: props.selectedCarrier.id };

                if ((insurance.insurance_type_id || 0) >= 0 &&
                    (insurance.company || '').trim() !== '' &&
                    (insurance.expiration_date || '').trim() !== '' &&
                    (insurance.amount || '').trim() !== '') {

                    setInsurancePendingSave(true);
                    $.post(props.serverUrl + '/saveInsurance', insurance).then(res => {
                        if (res.result === 'OK') {
                            props.setSelectedCarrier({ ...props.selectedCarrier, insurances: res.insurances });
                            props.setSelectedInsurance({ ...props.selectedInsurance, id: res.insurance.id });
                        }
                        setInsurancePendingSave(false);
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

            props.setCarrierPanels(panels);
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

        props.setCarrierPanels(panels);
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

        props.setCarrierPanels(panels);
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

        props.setCarrierPanels(panels);
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
                                <input tabIndex={43} type="text" placeholder="Code" maxLength="8"
                                    onKeyDown={searchCarrierByCode}
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, code: e.target.value })}
                                    value={(props.selectedCarrier.code_number || 0) === 0 ? (props.selectedCarrier.code || '') : props.selectedCarrier.code + props.selectedCarrier.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={44} type="text" placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, name: e.target.value })} value={props.selectedCarrier.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={45} type="text" placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address1: e.target.value })} value={props.selectedCarrier.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={46} type="text" placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address2: e.target.value })} value={props.selectedCarrier.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={47} type="text" placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, city: e.target.value })} value={props.selectedCarrier.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={48} type="text" placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, state: e.target.value })} value={props.selectedCarrier.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={49} type="text" placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, zip: e.target.value })} value={props.selectedCarrier.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={50} type="text" placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })} value={props.selectedCarrier.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={51}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })} value={props.selectedCarrier.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input tabIndex={52} type="text" placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })} value={props.selectedCarrier.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={53} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })} value={props.selectedCarrier.email || ''} />
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
                            <input tabIndex={76} type="text" placeholder='MC Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mc_number: e.target.value })
                                }}
                                value={props.selectedCarrier.mc_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={77} type="text" placeholder='DOT Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, dot_number: e.target.value })
                                }}
                                value={props.selectedCarrier.dot_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={78} type="text" placeholder='SCAC'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, scac: e.target.value })
                                }}
                                value={props.selectedCarrier.scac || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input tabIndex={79} type="text" placeholder='FID'
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

                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'carrier-contacts') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    await props.setIsEditingContact(false);
                                    await props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: props.selectedContact });

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                    props.setCarrierPanels(panels);
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

                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'carrier-contacts') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: { id: 0, carrier_id: props.selectedCarrier.id } });
                                    props.setIsEditingContact(true);

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                    props.setCarrierPanels(panels);
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
                                <input tabIndex={80} type="text" placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                    props.setSelectedContact({ ...props.selectedContact, first_name: e.target.value })
                                }} value={props.selectedContact.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={81} type="text" placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, last_name: e.target.value })} value={props.selectedContact.last_name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '50%' }}>
                                <MaskedInput tabIndex={82}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, phone_work: e.target.value })} value={props.selectedContact.phone_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={83} type="text" placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, phone_ext: e.target.value })} value={props.selectedContact.phone_ext || ''} />
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
                                <input tabIndex={84} type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={85} type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
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
                                            (props.selectedCarrier.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                        let index = props.panels.length - 1;
                                                        let panels = props.panels.map((p, i) => {
                                                            if (p.name === 'carrier-contacts') {
                                                                index = i;
                                                                p.isOpened = true;
                                                            }
                                                            return p;
                                                        });

                                                        await props.setIsEditingContact(false);
                                                        await props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: contact });

                                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                        props.setCarrierPanels(panels);
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
                                <input tabIndex={92} type="text" placeholder="First Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                }} value={props.selectedDriver.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={93} type="text" placeholder="Last Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                }} value={props.selectedDriver.last_name || ''} />
                            </div>
                        </div>

                        <div className="form-v-sep"></div>

                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '40%' }}>
                                <MaskedInput tabIndex={94}
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                    }} value={props.selectedDriver.phone || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container" style={{ flexGrow: 1 }}>
                                <input tabIndex={95} type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                }} value={props.selectedDriver.email || ''} />
                            </div>

                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow" style={{ position: 'relative' }}>

                                <input tabIndex={96}
                                    type="text"
                                    placeholder="Equipment"
                                    ref={refEquipment}
                                    onKeyDown={equipmentOnKeydown}
                                    onInput={onEquipmentInput}
                                    onChange={onEquipmentInput}
                                    value={props.selectedDriver.equipment?.name || ''} />

                                <span className="fas fa-chevron-down" style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: `translateY(-50%)`,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer'
                                }} onClick={() => {
                                    onEquipmentInput({ target: { value: refEquipment.current.value } });
                                    refEquipment.current.focus();
                                }}></span>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={97} type="text" placeholder="Truck" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                }} value={props.selectedDriver.truck || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={98} type="text" placeholder="Trailer" onKeyDown={validateDriverForSaving} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                }} value={props.selectedContact.trailer || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={99} type="text" placeholder="Notes" onKeyDown={validateDriverForSaving} onChange={e => {
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
                                <input tabIndex={54} type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={props.selectedCarrier.mailing_address?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input tabIndex={55} type="text" placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={56} type="text" placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={57} type="text" placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={58} type="text" placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={59} type="text" placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.state = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={60} type="text" placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={61} type="text" placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={62}
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
                                <input tabIndex={63} type="text" placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={64} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
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
                                <input tabIndex={86} type="text" placeholder="Type"
                                    ref={refInsuranceType}
                                    onKeyDown={onInsuranceTypeKeydown}
                                    onInput={() => { }}
                                    onChange={() => { }}
                                    value={props.selectedInsurance.insurance_type?.name || ''} />

                                <span className="fas fa-chevron-down" style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: `translateY(-50%)`,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer'
                                }} onClick={() => {
                                    refInsuranceType.current.focus();
                                    onInsuranceTypeKeydown({ key: 'click', preventDefault: () => { } });
                                }}></span>

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={87} type="text" placeholder="Company"
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
                                <MaskedInput tabIndex={88}
                                    mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Expiration Date" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: e.target.value })} value={props.selectedInsurance.expiration_date || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={89} type="text" placeholder="Amount" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, amount: e.target.value })} value={props.selectedInsurance.amount || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input tabIndex={90} type="text" placeholder="Deductible" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, deductible: e.target.value })} value={props.selectedInsurance.deductible || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={91} type="text" placeholder="Notes" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, notes: e.target.value })} value={props.selectedInsurance.notes || ''} />
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
                            <div className="insurances-list-wrapper">
                                {
                                    (props.selectedCarrier.insurances || []).map((insurance, index) => {
                                        return (
                                            <div className="insurances-list-item" key={index} onClick={() => props.setSelectedInsurance({ ...insurance })}>
                                                <span>
                                                    <b>{insurance.insurance_type.name}</b> {insurance.company} <b>{insurance.expiration_date}</b> {insurance.amount}
                                                </span>
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

                                    let html = ``;

                                    props.selectedCarrier.drivers.map((driver, index) => {
                                        html += `
                                        <div style="margin-bottom: 15px">
                                            <div><b>First Name</b>: ${(driver.first_name || '')}</div>
                                            <div><b>Last Name</b>: ${(driver.Last_name || '')}</div>
                                            <div><b>Phone</b>: ${(driver.phone || '')}</div>
                                            <div><b>E-Mail</b>: ${(driver.email || '')}</div>
                                            <div><b>Equipment</b>: ${(driver.equipment?.name || '')}</div>
                                            <div><b>Truck</b>: ${(driver.truck || '')}</div>
                                            <div><b>Trailer</b>: ${(driver.trailer || '')}</div>
                                            <div><b>Notes</b>: ${(driver.notes || '')}</div>
                                        </div>`

                                        return true;
                                    });


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
                            <div className="drivers-list-wrapper">
                                {
                                    (props.selectedCarrier.drivers || []).map((driver, index) => {
                                        return (
                                            <div className="drivers-list-item" key={index} onClick={() => {
                                                props.setSelectedDriver({ ...driver });
                                            }}>
                                                <span>
                                                    {driver.first_name + ' ' + driver.last_name + ' ' + driver.phone + ' ' + driver.email}
                                                </span>
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
                                <input tabIndex={65} type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={props.selectedCarrier.factoring_company?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input tabIndex={66} type="text" placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={67} type="text" placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={68} type="text" placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={69} type="text" placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input tabIndex={70} type="text" placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.state = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input tabIndex={71} type="text" placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={72} type="text" placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput tabIndex={73}
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
                                <input tabIndex={74} type="text" placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input tabIndex={75} type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
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

                                    props.setSelectedNote({ id: 0, carrier_id: props.selectedCarrier.id })
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
                        setSelectedData={props.setSelectedNote}
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
    setSelectedContact,
    setSelectedNote,
    setContactSearch,
    setShowingContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedDocument,
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
    setSelectedFactoringCompany
})(Carriers)