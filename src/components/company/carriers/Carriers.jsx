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
    setFactoringCompanies
} from '../../../actions';

function Carriers(props) {
    const [popupItems, setPopupItems] = useState([]);
    const [lastState, setLastState] = useState(0);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refEquipment = useRef();
    const refInsuranceType = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
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

            case 'insurance type':

                break;

            default:

                break;
        }

        // $.post(props.serverUrl + '/saveAutomaticEmails', automaticEmails).then(res => {
        //     if (res.result === 'OK') {
        //         console.log(res);
        //     }
        // });

        // await setPopupItems([]);
    }

    const equipmentOnKeydown = async (e) => {
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
            await popupItems.map((item, index) => {
                if (item.selected) {
                    props.setSelectedDriver({ ...props.selectedDriver, equipment_id: item.id, equipment: item });
                }

                // save driver
                return true;
            });

            await setPopupItems([]);
        }

        if (key === 9) {
            if (popupItems.length === 0) {
                if ((props.selectedDriver.equipment_id || 0) === 0) {
                    props.setSelectedDriver({ ...props.selectedDriver, equipment: {} });
                } else {
                    // save driver
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedDriver({ ...props.selectedDriver, equipment_id: item.id, equipment: item });

                        // save driver
                    }
                });

                setPopupItems([]);
            }
        }

        if (key === 27) {
            setPopupItems([]);
        }

    }

    const onEquipmentInput = async (e) => {
        window.clearTimeout(delayTimer);
        let equipment = props.selectedDriver.equipments || {};
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
                                let items = []

                                res.equipments.map((equipment, i) => {
                                    items.push({ ...equipment, selected: i === 0 });
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

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

        props.setCarrierPanels(panels);
    }

    const clearFactoringCompanyBtnClick = async () => {
        await props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: {} });

        if (props.selectedCarrier.id || 0 > 0) {
            await $.post(props.serverUrl + '/deleteCarrierFactoringCompany', { carrier_id: (props.selectedCarrier.id || 0) }).then(async res => {
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
                                <input type="text" placeholder="Code" maxLength="8"
                                    onKeyDown={searchCarrierByCode}
                                    onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, code: e.target.value })}
                                    value={(props.selectedCarrier.code_number || 0) === 0 ? (props.selectedCarrier.code || '') : props.selectedCarrier.code + props.selectedCarrier.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, name: e.target.value })} value={props.selectedCarrier.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address1: e.target.value })} value={props.selectedCarrier.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, address2: e.target.value })} value={props.selectedCarrier.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, city: e.target.value })} value={props.selectedCarrier.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, state: e.target.value })} value={props.selectedCarrier.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, zip: e.target.value })} value={props.selectedCarrier.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })} value={props.selectedCarrier.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })} value={props.selectedCarrier.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })} value={props.selectedCarrier.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })} value={props.selectedCarrier.email || ''} />
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
                            <input type="text" placeholder='MC Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mc_number: e.target.value })
                                }}
                                value={props.selectedCarrier.mc_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input type="text" placeholder='DOT Number'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, dot_number: e.target.value })
                                }}
                                value={props.selectedCarrier.dot_number || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input type="text" placeholder='SCAC'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, scac: e.target.value })
                                }}
                                value={props.selectedCarrier.scac || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
                            <input type="text" placeholder='FID'
                                onKeyDown={validateCarrierForSaving}
                                onChange={(e) => {
                                    props.setSelectedCarrier({ ...props.selectedCarrier, fid: e.target.value })
                                }}
                                value={props.selectedCarrier.fid || ''} />
                        </div>
                        <div className="input-box-container" style={{ width: '100%' }}>
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
                                <input type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
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

                <div className="fields-container-col">
                    <div className="form-bordered-box">
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Drivers</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {

                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>

                                <div className="mochi-button" onClick={() => { }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="First Name" onKeyDown={(e) => { }} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                }} value={props.selectedDriver.first_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Last Name" onKeyDown={(e) => { }} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                }} value={props.selectedContact.last_name || ''} />
                            </div>
                        </div>

                        <div className="form-v-sep"></div>

                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '40%' }}>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone" onKeyDown={(e) => { }} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                    }} value={props.selectedDriver.phone || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container" style={{ flexGrow: 1 }}>
                                <input type="text" placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={(e) => { }} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                }} value={props.selectedDriver.email || ''} />
                            </div>

                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow" style={{ position: 'relative' }}>

                                <input
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
                                }}></span>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Truck" onKeyDown={(e) => { }} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                }} value={props.selectedDriver.truck || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Trailer" onKeyDown={(e) => { }} onChange={e => {
                                    props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                }} value={props.selectedContact.trailer || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes" onKeyDown={(e) => { }} onChange={e => {
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
                                <input type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={props.selectedCarrier.mailing_address?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.state = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
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
                                <input type="text" placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                    let mailing_address = props.selectedCarrier.mailing_address || {};
                                    mailing_address.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                }} value={props.selectedCarrier.mailing_address?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
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
                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Print Carrier Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Equipment Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Revenue Information</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Order History</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button">
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
                                <input type="text" placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setSelectedContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col">
                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Drivers</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => { }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Print</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="driver-list-box">
                            <div className="driver-list-wrapper">
                                {
                                    (props.selectedCarrier.drivers || []).map((driver, index) => {
                                        return (
                                            <div className="driver-list-item" key={index} onClick={() => { }}>
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
                                <input type="text" placeholder="Code" maxLength="8" readOnly={true}
                                    value={props.selectedCarrier.factoring_company?.code || ''} />
                            </div>

                            <div className="form-h-sep"></div>

                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address1 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.address2 = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.city = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.state = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.zip = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.contact_name = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
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
                                <input type="text" placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                    let factoring_company = props.selectedCarrier.factoring_company || {};
                                    factoring_company.ext = e.target.value;
                                    props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                }} value={props.selectedCarrier.factoring_company?.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
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
                                    if ((props.selectedCarrier.id || 0) === 0){
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
                <div className="fields-container-col">
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
                                <div className="mochi-button">
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
        factoringCompanies: state.carrierReducers.factoringCompanies
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
    setFactoringCompanies
})(Carriers)