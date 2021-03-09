import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './Dispatch.css';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import $ from 'jquery';
import DispatchPopup from './popup/Popup.jsx';
import DispatchModal from './modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';

import {
    setDispatchPanels,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setSelectedBillToCompanySearch,
    setSelectedShipperCompanyInfo,
    setSelectedShipperCompanyContact,
    setSelectedShipperCompanySearch,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setSelectedConsigneeCompanySearch,
    setBillToCompanies,
    setShipperCompanies,
    setConsigneeCompanies,
    setAeNumber,
    setOrderNumber,
    setTripNumber,
    setDivision,
    setLoadType,
    setTemplate,
    setPu1,
    setPu2,
    setPu3,
    setPu4,
    setPu5,
    setDelivery1,
    setDelivery2,
    setDelivery3,
    setDelivery4,
    setDelivery5,
    setShipperPuDate1,
    setShipperPuDate2,
    setShipperPuTime1,
    setShipperPuTime2,
    setShipperBolNumber,
    setShipperPoNumber,
    setShipperRefNumber,
    setShipperSealNumber,
    setShipperSpecialInstructions,
    setConsigneeDeliveryDate1,
    setConsigneeDeliveryDate2,
    setConsigneeDeliveryTime1,
    setConsigneeDeliveryTime2,
    setConsigneeSpecialInstructions,
    setDispatchEvent,
    setDispatchEventLocation,
    setDispatchEventNotes,
    setDispatchEvents,
    setHazMat,
    setExpedited,
    setNotesForCarrier,
    setSelectedNoteForCarrier,
    setInternalNotes,
    setSelectedInternalNote,
    setIsShowingShipperSecondPage,
    setIsShowingConsigneeSecondPage
} from './../../../actions';

function Dispatch(props) {

    const modalTransitionProps = useSpring({ opacity: (props.selectedNoteForCarrier.id !== undefined || props.selectedInternalNote.id !== undefined) ? 1 : 0 });

    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');
  
    const [carrierEquipment, setCarrierEquipment] = useState({});
    const [dispatchEvent, setDispatchEvent] = useState({});
    const refDivision = useRef();
    const refLoadTypes = useRef();
    const refTemplates = useRef();
    const refCarrierEquipment = useRef();
    const refDispatchEvents = useRef();

    const [divisionsItems, setDivisionsItems] = useState([
        {
            id: 1,
            name: 'Division 1',
            selected: false
        },
        {
            id: 2,
            name: 'Division 2',
            selected: false
        },
        {
            id: 3,
            name: 'Division 3',
            selected: false
        }
    ]);

    const [loadTypesItems, setLoadTypesItems] = useState([
        {
            id: 1,
            name: 'Load Type 1',
            selected: false
        },
        {
            id: 2,
            name: 'Load Type 2',
            selected: false
        },
        {
            id: 3,
            name: 'Load Type 3',
            selected: false
        }
    ]);

    const [templatesItems, setTemplatesItems] = useState([
        {
            id: 1,
            name: 'Template 1',
            selected: false
        },
        {
            id: 2,
            name: 'Template 2',
            selected: false
        },
        {
            id: 3,
            name: 'Template 3',
            selected: false
        }
    ]);

    const [carrierEquipmentsItems, setCarrierEquipmentsItems] = useState([
        {
            id: 1,
            name: 'Equipment 1',
            selected: false
        },
        {
            id: 2,
            name: 'Equipment 2',
            selected: false
        },
        {
            id: 3,
            name: 'Equipment 3',
            selected: false
        }
    ]);

    const [dispatchEventsItems, setDispatchEventsItems] = useState([
        {
            id: 1,
            name: 'Event 1',
            selected: false
        },
        {
            id: 2,
            name: 'Event 2',
            selected: false
        },
        {
            id: 3,
            name: 'Event 3',
            selected: false
        }
    ]);

    const dispatchClearBtnClick = () => {
        props.setAeNumber('');
        props.setOrderNumber('');
        props.setTripNumber('');

        props.setDivision({});
        props.setLoadType({});
        props.setTemplate({});
        setCarrierEquipment({});

        props.setSelectedBillToCompanyInfo({});
        props.setSelectedBillToCompanyContact({});
        props.setSelectedBillToCompanySearch([]);

        props.setSelectedShipperCompanyInfo({});
        props.setSelectedShipperCompanyContact({});
        props.setSelectedShipperCompanySearch([]);

        props.setSelectedConsigneeCompanyInfo({});
        props.setSelectedConsigneeCompanyContact({});
        props.setSelectedConsigneeCompanySearch([]);

        props.setPu1('');
        props.setPu2('');
        props.setPu3('');
        props.setPu4('');
        props.setPu5('');
        props.setDelivery1('');
        props.setDelivery2('');
        props.setDelivery3('');
        props.setDelivery4('');
        props.setDelivery5('');
        props.setShipperPuDate1('');
        props.setShipperPuDate2('');
        props.setShipperPuTime1('');
        props.setShipperPuTime2('');
        props.setShipperBolNumber('');
        props.setShipperPoNumber('');
        props.setShipperRefNumber('');
        props.setShipperSealNumber('');
        props.setShipperSpecialInstructions('');
        props.setConsigneeDeliveryDate1('');
        props.setConsigneeDeliveryDate2('');
        props.setConsigneeDeliveryTime1('');
        props.setConsigneeDeliveryTime2('');
        props.setConsigneeSpecialInstructions('');

        props.setDispatchEvents([]);
        props.setDispatchEvent({});
        props.setDispatchEventLocation('');
        props.setDispatchEventNotes('');

        props.setHazMat(0);
        props.setExpedited(0);
        props.setNotesForCarrier([]);
        props.setInternalNotes([]);
        props.setSelectedNoteForCarrier({});
        props.setSelectedInternalNote({});
        props.setIsShowingShipperSecondPage(false);
        props.setIsShowingConsigneeSecondPage(false);

        
    }

    const popupItemClick = (item) => {
        switch (popupActiveInput) {
            case 'division':
                setDivision(item);
                setPopupItems([]);
                break;
            case 'load-type':
                setLoadType(item);
                setPopupItems([]);
                break;
            case 'template':
                setTemplate(item);
                setPopupItems([]);
                break;
            case 'carrier-equipment':
                setCarrierEquipment(item);
                setPopupItems([]);
                break;
            case 'dispatch-event':
                setDispatchEvent(item);
                setPopupItems([]);
                break;
            default:
                break;
        }
    }

    const setPopupPosition = (input) => {
        let popup = refPopup.current;
        const { innerWidth, innerHeight } = window;
        const screenWSection = innerWidth / 3;

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

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = input.left + 'px';

                if (input.width < 70) {
                    popup.style.left = (input.left - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = (input.left + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = (input.left - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = (input.left - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px';
                }
            }
        }
    }

    const divisionOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('division');
        const input = refDivision.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {

                divisionsItems.map((item, index) => {
                    if (item.name === (props.division.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(divisionsItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));

            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {

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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setDivision(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const loadTypesOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('load-type');
        const input = refLoadTypes.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                loadTypesItems.map((item, index) => {
                    if (item.name === (props.load_type.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(loadTypesItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));
            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setLoadType(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const templatesOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('template');
        const input = refTemplates.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                templatesItems.map((item, index) => {
                    if (item.name === (props.template.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(templatesItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));
            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setTemplate(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const carrierEquipmentOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('carrier-equipment');
        const input = refCarrierEquipment.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                carrierEquipmentsItems.map((item, index) => {
                    if (item.name === (carrierEquipment.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(carrierEquipmentsItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));
            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        setCarrierEquipment(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const dispatchEventsOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('dispatch-event');
        const input = refDispatchEvents.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                dispatchEventsItems.map((item, index) => {
                    if (item.name === (props.dispatchEvent.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(dispatchEventsItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));
            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {
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
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setDispatchEvent(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const getBillToCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value !== '') {

                $.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.customers.length > 0) {

                            props.setSelectedBillToCompanyInfo(res.customers[0]);

                            res.customers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedBillToCompanyContact(c);
                                }
                                return true;
                            });

                        } else {
                            props.setSelectedBillToCompanyInfo({});
                            props.setSelectedBillToCompanyContact({});
                        }
                    } else {
                        props.setSelectedBillToCompanyInfo({});
                        props.setSelectedBillToCompanyContact({});
                    }
                });
            } else {
                props.setSelectedBillToCompanyInfo({});
                props.setSelectedBillToCompanyContact({});
            }
        }
    }

    const getShipperCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value !== '') {

                $.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.customers.length > 0) {

                            props.setSelectedShipperCompanyInfo(res.customers[0]);

                            res.customers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedShipperCompanyContact(c);
                                }
                                return true;
                            });

                        } else {
                            props.setSelectedShipperCompanyInfo({});
                            props.setSelectedShipperCompanyContact({});
                        }
                    } else {
                        props.setSelectedShipperCompanyInfo({});
                        props.setSelectedShipperCompanyContact({});
                    }
                });
            } else {
                props.setSelectedShipperCompanyInfo({});
                props.setSelectedShipperCompanyContact({});
            }
        }
    }

    const getConsigneeCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value !== '') {

                $.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.customers.length > 0) {

                            props.setSelectedConsigneeCompanyInfo(res.customers[0]);

                            res.customers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedConsigneeCompanyContact(c);
                                }
                                return true;
                            });

                        } else {
                            props.setSelectedConsigneeCompanyInfo({});
                            props.setSelectedConsigneeCompanyContact({});
                        }
                    } else {
                        props.setSelectedConsigneeCompanyInfo({});
                        props.setSelectedConsigneeCompanyContact({});
                    }
                });
            } else {
                props.setSelectedConsigneeCompanyInfo({});
                props.setSelectedConsigneeCompanyContact({});
            }
        }
    }

    const billToCompanySearch = () => {
        let companySearch = [
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

        $.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.result === 'OK') {
                props.setSelectedBillToCompanySearch(companySearch);
                props.setBillToCompanies(res.customers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'bill-to-company-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                props.setDispatchPanels(panels);
            }
        });
    }

    const shipperCompanySearch = () => {
        let companySearch = [
            {
                field: 'Name',
                data: (props.selectedShipperCompanyInfo.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedShipperCompanyInfo.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedShipperCompanyInfo.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedShipperCompanyInfo.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedShipperCompanyInfo.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedShipperCompanyInfo.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedShipperCompanyInfo.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.result === 'OK') {
                props.setSelectedShipperCompanySearch(companySearch);
                props.setShipperCompanies(res.customers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'shipper-company-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                props.setDispatchPanels(panels);
            }
        });
    }

    const consigneeCompanySearch = () => {
        let companySearch = [
            {
                field: 'Name',
                data: (props.selectedConsigneeCompanyInfo.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedConsigneeCompanyInfo.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedConsigneeCompanyInfo.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedConsigneeCompanyInfo.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedConsigneeCompanyInfo.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedConsigneeCompanyInfo.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedConsigneeCompanyInfo.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.result === 'OK') {
                props.setSelectedConsigneeCompanySearch(companySearch);
                props.setConsigneeCompanies(res.customers);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'consignee-company-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                props.setDispatchPanels(panels);
            }
        });
    }

    

    return (
        <div className="dispatch-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <PanelContainer panels={props.panels} />

            <div className="fields-container-row">
                <div className="fields-container-col" style={{ minWidth: '91%', maxWidth: '91%', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%', alignItems: 'center' }}>
                        <div style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className="form-borderless-box">
                                <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input type="text" placeholder='A/E Number' onChange={(e) => { props.setAeNumber(e.target.value) }} value={props.ae_number || ''} />
                                    </div>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input type="text" placeholder='Order Number' onChange={(e) => { props.setOrderNumber(e.target.value) }} value={props.order_number || ''} />
                                    </div>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input type="text" placeholder='Trip Number' onChange={(e) => { props.setTripNumber(e.target.value) }} value={props.trip_number || ''} />
                                    </div>
                                    <div className="mochi-button" onClick={dispatchClearBtnClick}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className="form-borderless-box">
                                <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container" style={{ position: 'relative', width: '9rem' }}>
                                        <input type="text" placeholder="Division"
                                            ref={refDivision}
                                            onKeyDown={divisionOnKeydown}
                                            onChange={() => { }}
                                            value={props.division.name || ''}
                                        />
                                        <span className="fas fa-chevron-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={async () => {

                                        }}></span>
                                    </div>

                                    <div className="input-box-container" style={{ position: 'relative', width: '9rem' }}>
                                        <input type="text" placeholder="Load Types"
                                            ref={refLoadTypes}
                                            onKeyDown={loadTypesOnKeydown}
                                            onChange={() => { }}
                                            value={props.load_type.name || ''}
                                        />
                                        <span className="fas fa-chevron-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={() => {

                                        }}></span>
                                    </div>

                                    <div className="input-box-container" style={{ position: 'relative', width: '9rem' }}>
                                        <input type="text" placeholder="Templates"
                                            ref={refTemplates}
                                            onKeyDown={templatesOnKeydown}
                                            onChange={() => { }}
                                            value={props.template.name || ''}
                                        />
                                        <span className="fas fa-chevron-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={() => {

                                        }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <div className="form-borderless-box" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <div className='mochi-button' style={{ marginRight: 15 }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>New Template</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Replicate Order</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%' }}>
                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Bill To</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={billToCompanySearch}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selectedBillToCompanyInfo.id || 0) === 0) {
                                            window.alert('You must select a customer first!');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'bill-to-company-info') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Company info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'rating-screen') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Rate load</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getBillToCompanyByCode}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address1 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address2 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.city || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" maxLength="2"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.state || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.zip || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.contact_name || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.contact_phone || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext"
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.ext || ''}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Carrier</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={() => {
                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'carrier-info') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Carrier info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{ width: '7rem', backgroundColor: 'lightcoral' }}>
                                    <input type="text" placeholder="Insurance" readOnly={true} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Carrier Load - Starting City State - Destination City State" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Phone" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow" style={{ position: 'relative' }}>
                                    <input type="text" placeholder="Equipments"
                                        ref={refCarrierEquipment}
                                        onKeyDown={carrierEquipmentOnKeydown}
                                        onChange={() => { }}
                                        value={carrierEquipment.name || ''}
                                    />
                                    <span className="fas fa-chevron-down" style={{
                                        position: 'absolute',
                                        right: 5,
                                        top: 'calc(50% + 2px)',
                                        transform: `translateY(-50%)`,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer'
                                    }} onClick={() => {

                                    }}></span>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Driver Name" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Driver Phone" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Unit Number" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Trailer Number" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1, alignItems: 'flex-end' }}>
                                <div className='mochi-button' style={{ fontSize: '1rem' }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Rate Confirmation</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }} onClick={() => {
                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'adjust-rate') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                    props.setDispatchPanels(panels);
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Adjust Rate</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Charge Carrier</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>E-mail Rate Confirmation</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                        </div>

                        <div className="form-borderless-box" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-dispatch-hazmat-btn" onChange={(e) => { props.setHazMat(e.target.checked ? 1 : 0) }} checked={props.hazMat || 0} />
                                    <label htmlFor="cbox-dispatch-hazmat-btn">
                                        <div className="label-text">HazMat</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-dispatch-expedited-btn" onChange={(e) => { props.setExpedited(e.target.checked ? 1 : 0) }} checked={props.expedited || 0} />
                                    <label htmlFor="cbox-dispatch-expedited-btn">
                                        <div className="label-text">Expedited</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-row" style={{ flexGrow: 1, display: 'flex' }}>
                                <div className='form-bordered-box'>
                                    <div className='form-header'>
                                        <div className='top-border top-border-left'></div>
                                        <div className='form-title'>Notes for Carrier on Rate Conf</div>
                                        <div className='top-border top-border-middle'></div>
                                        <div className='form-buttons'>
                                            <div className='mochi-button' onClick={() => {
                                                props.setSelectedNoteForCarrier({ id: 0 });
                                            }}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Add note</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div>
                                        </div>
                                        <div className='top-border top-border-right'></div>
                                    </div>

                                    <div className="notes-for-carrier-container">
                                        <div className="notes-for-carrier-wrapper">
                                            {
                                                (props.notesForCarrier || []).map((note, index) => {
                                                    return (
                                                        <div className="notes-for-carrier-item" key={index} onClick={() => props.setSelectedNoteForCarrier(note)}>
                                                            {note.text}
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
                </div>

                <div className="fields-container-col" style={{ display: 'flex', flexDirection: 'column', width: '10%', justifyContent: 'space-between', alignItems: 'flex-end', padding: '2px 0 10px 0' }}>
                    <div className='mochi-button' onClick={() => {
                        let index = props.panels.length - 1;
                        let panels = props.panels.map((p, i) => {
                            if (p.name === 'rate-conf') {
                                index = i;
                                p.isOpened = true;
                            }
                            return p;
                        });

                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                        props.setDispatchPanels(panels);
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Rate Conf</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        let index = props.panels.length - 1;
                        let panels = props.panels.map((p, i) => {
                            if (p.name === 'order') {
                                index = i;
                                p.isOpened = true;
                            }
                            return p;
                        });

                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                        props.setDispatchPanels(panels);
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Print Order</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        let index = props.panels.length - 1;
                        let panels = props.panels.map((p, i) => {
                            if (p.name === 'bol') {
                                index = i;
                                p.isOpened = true;
                            }
                            return p;
                        });

                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                        props.setDispatchPanels(panels);
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Print BOL</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
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
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Documents</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        let index = props.panels.length - 1;
                        let panels = props.panels.map((p, i) => {
                            if (p.name === 'load-board') {
                                index = i;
                                p.isOpened = true;
                            }
                            return p;
                        });

                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                        props.setDispatchPanels(panels);
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Load Board</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        let index = props.panels.length - 1;
                        let panels = props.panels.map((p, i) => {
                            if (p.name === 'rating-screen') {
                                index = i;
                                p.isOpened = true;
                            }
                            return p;
                        });

                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                        props.setDispatchPanels(panels);
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Rate Load</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                </div>
            </div>

            <div className="fields-container-row" style={{ display: 'flex', alignSelf: 'flex-start', minWidth: '70%', maxWidth: '69%', alignItems: 'center' }}>
                <div className="input-box-container grow">
                    <input type="text" placeholder="PU 1" onChange={(e) => { props.setPu1(e.target.value) }} value={props.pu1 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="PU 2" onChange={(e) => { props.setPu2(e.target.value) }} value={props.pu2 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="PU 3" onChange={(e) => { props.setPu3(e.target.value) }} value={props.pu3 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="PU 4" onChange={(e) => { props.setPu4(e.target.value) }} value={props.pu4 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="PU 5" onChange={(e) => { props.setPu5(e.target.value) }} value={props.pu5 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className='mochi-button' onClick={() => {
                    let index = props.panels.length - 1;
                    let panels = props.panels.map((p, i) => {
                        if (p.name === 'routing') {
                            index = i;
                            p.isOpened = true;
                        }
                        return p;
                    });

                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                    props.setDispatchPanels(panels);
                }}>
                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                    <div className='mochi-button-base'>Routing</div>
                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="Delivery 1" onChange={(e) => { props.setDelivery1(e.target.value) }} value={props.delivery1 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="Delivery 2" onChange={(e) => { props.setDelivery2(e.target.value) }} value={props.delivery2 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="Delivery 3" onChange={(e) => { props.setDelivery3(e.target.value) }} value={props.delivery3 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="Delivery 4" onChange={(e) => { props.setDelivery4(e.target.value) }} value={props.delivery4 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input type="text" placeholder="Delivery 5" onChange={(e) => { props.setDelivery5(e.target.value) }} value={props.delivery5 || ''} />
                </div>
                <div className="form-h-sep"></div>
            </div>

            <div className="fields-container-row" style={{ marginTop: 10 }}>
                <div className="fields-container-col" style={{ minWidth: '91%', maxWidth: '91%', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%' }}>
                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10, height: '9rem' }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Shipper</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={shipperCompanySearch}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selectedShipperCompanyInfo.id || 0) === 0) {
                                            window.alert('You must select a customer first!');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'shipper-company-info') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Company info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    {
                                        props.isShowingShipperSecondPage &&
                                        <div className='mochi-button' onClick={() => { props.setIsShowingShipperSecondPage(false) }}>
                                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                            <div className='mochi-button-base'>1st Page</div>
                                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                        </div>
                                    }
                                    {
                                        !props.isShowingShipperSecondPage &&
                                        <div className='mochi-button' onClick={() => { props.setIsShowingShipperSecondPage(true) }}>
                                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                            <div className='mochi-button-base'>2nd Page</div>
                                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                        </div>
                                    }

                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getShipperCompanyByCode}
                                        onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedShipperCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name"
                                        onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value }) }}
                                        value={props.selectedShipperCompanyInfo.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-slider">
                                <div className="form-slider-wrapper" style={{ left: !props.isShowingShipperSecondPage ? 0 : '-100%' }}>
                                    <div className="first-page">
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input type="text" placeholder="Postal Code"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Contact Name"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.contact_name || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.contact_phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input type="text" placeholder="Ext"
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.ext || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="second-page">
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Date 1"
                                                    onInput={(e) => { props.setShipperPuDate1(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPuDate1(e.target.value) }}
                                                    value={props.shipperPuDate1 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, ':', /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Time 1"
                                                    onInput={(e) => { props.setShipperPuTime1(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPuTime1(e.target.value) }}
                                                    value={props.shipperPuTime1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Date 2"
                                                    onInput={(e) => { props.setShipperPuDate2(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPuDate2(e.target.value) }}
                                                    value={props.shipperPuDate2 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, ':', /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Time 2"
                                                    onInput={(e) => { props.setShipperPuTime2(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPuTime2(e.target.value) }}
                                                    value={props.shipperPuTime2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="BOL Number"
                                                    onInput={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                    value={props.shipperBolNumber || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="PO Number"
                                                    onInput={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                    value={props.shipperPoNumber || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="REF Number"
                                                    onInput={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                    value={props.shipperRefNumber || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="SEAL Number"
                                                    onInput={(e) => { props.setShipperSealNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperSealNumber(e.target.value) }}
                                                    value={props.shipperSealNumber || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Special Instructions"
                                                    onInput={(e) => { props.setShipperSpecialInstructions(e.target.value) }}
                                                    onChange={(e) => { props.setShipperSpecialInstructions(e.target.value) }}
                                                    value={props.shipperSpecialInstructions || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10, height: '9rem' }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Consignee</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={consigneeCompanySearch}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                                            window.alert('You must select a customer first!');
                                            return;
                                        }

                                        let index = props.panels.length - 1;
                                        let panels = props.panels.map((p, i) => {
                                            if (p.name === 'consignee-company-info') {
                                                index = i;
                                                p.isOpened = true;
                                            }
                                            return p;
                                        });

                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                        props.setDispatchPanels(panels);
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Company info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    {
                                        props.isShowingConsigneeSecondPage &&
                                        <div className='mochi-button' onClick={() => { props.setIsShowingConsigneeSecondPage(false) }}>
                                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                            <div className='mochi-button-base'>1st Page</div>
                                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                        </div>
                                    }
                                    {
                                        !props.isShowingConsigneeSecondPage &&
                                        <div className='mochi-button' onClick={() => { props.setIsShowingConsigneeSecondPage(true) }}>
                                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                            <div className='mochi-button-base'>2nd Page</div>
                                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                        </div>
                                    }
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getConsigneeCompanyByCode}
                                        onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedConsigneeCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Name"
                                        onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value }) }}
                                        value={props.selectedConsigneeCompanyInfo.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-slider">
                                <div className="form-slider-wrapper" style={{ left: !props.isShowingConsigneeSecondPage ? 0 : '-100%' }}>
                                    <div className="first-page">
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 1"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Address 2"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="City"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" placeholder="State" maxLength="2"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input type="text" placeholder="Postal Code"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Contact Name"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.contact_name || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.contact_phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input type="text" placeholder="Ext"
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.ext || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="second-page">
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Date 1"
                                                    onInput={(e) => { props.setConsigneeDeliveryDate1(e.target.value) }}
                                                    onChange={(e) => { props.setConsigneeDeliveryDate1(e.target.value) }}
                                                    value={props.consigneeDeliveryDate1 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, ':', /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Time 1"
                                                    onInput={(e) => { props.setConsigneeDeliveryTime1(e.target.value) }}
                                                    onChange={(e) => { props.setConsigneeDeliveryTime1(e.target.value) }}
                                                    value={props.consigneeDeliveryTime1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Date 2"
                                                    onInput={(e) => { props.setConsigneeDeliveryDate2(e.target.value) }}
                                                    onChange={(e) => { props.setConsigneeDeliveryDate2(e.target.value) }}
                                                    value={props.consigneeDeliveryDate2 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, ':', /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Time 2"
                                                    onInput={(e) => { props.setConsigneeDeliveryTime2(e.target.value) }}
                                                    onChange={(e) => { props.setConsigneeDeliveryTime2(e.target.value) }}
                                                    value={props.consigneeDeliveryTime2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ flexGrow: 1 }}>
                                            <div className="input-box-container grow" style={{ maxHeight: 'initial', minHeight: 'initial' }}>
                                                <textarea placeholder="Special Instructions" style={{
                                                    resize: 'none',
                                                    flexGrow: 1,
                                                    border: 0,
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                                    onInput={(e) => { props.setConsigneeSpecialInstructions(e.target.value) }}
                                                    onChange={(e) => { props.setConsigneeSpecialInstructions(e.target.value) }}
                                                    value={props.consigneeSpecialInstructions || ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="form-borderless-box" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                            <div className="form-row" style={{ flexGrow: 1, display: 'flex' }}>
                                <div className='form-bordered-box'>
                                    <div className='form-header'>
                                        <div className='top-border top-border-left'></div>
                                        <div className='form-title'>Internal Notes</div>
                                        <div className='top-border top-border-middle'></div>
                                        <div className='form-buttons'>
                                            <div className='mochi-button' onClick={() => {
                                                props.setSelectedInternalNote({ id: 0 });
                                            }}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Add note</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div>
                                        </div>
                                        <div className='top-border top-border-right'></div>
                                    </div>

                                    <div className="internal-notes-container">
                                        <div className="internal-notes-wrapper">
                                            {
                                                (props.internalNotes || []).map((note, index) => {
                                                    return (
                                                        <div className="internal-notes-item" key={index} onClick={() => props.setSelectedInternalNote(note)}>
                                                            {note.text}
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
                </div>

                <div className="fields-container-col" style={{ display: 'flex', flexDirection: 'column', width: '10%', padding: '0 0 10px 0' }}>
                    <div className='form-bordered-box' style={{ flexGrow: 1, justifyContent: 'space-evenly' }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Commisions</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="input-box-container grow">
                            <input type="text" placeholder="Agent Code" readOnly={true} />
                        </div>
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Agent Commision" readOnly={true} />
                        </div>
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Salesman Code" readOnly={true} />
                        </div>
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Salesman Commission" readOnly={true} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="fields-container-row" style={{ marginBottom: 10 }}>
                <div style={{ minWidth: '70%', maxWidth: '70%', display: 'flex', alignItems: 'center', marginRight: 10 }}>
                    <div className="input-box-container" style={{ width: '10rem', position: 'relative' }}>
                        <input type="text" placeholder="Events"
                            ref={refDispatchEvents}
                            onKeyDown={dispatchEventsOnKeydown}
                            onChange={() => { }}
                            value={dispatchEvent.name || ''}

                        />
                        <span className="fas fa-chevron-down" style={{
                            position: 'absolute',
                            right: 5,
                            top: 'calc(50% + 2px)',
                            transform: `translateY(-50%)`,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }} onClick={() => {

                        }}></span>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '10rem' }}>
                        <input type="text" placeholder="Event Location"
                            onInput={(e) => { props.setDispatchEventLocation(e.target.value) }}
                            onChange={(e) => { props.setDispatchEventLocation(e.target.value) }}
                            value={props.dispatchEventLocation || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Event Notes"
                            onInput={(e) => { props.setDispatchEventNotes(e.target.value) }}
                            onChange={(e) => { props.setDispatchEventNotes(e.target.value) }}
                            value={props.dispatchEventNotes || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div style={{ borderRight: 'solid 1px rgba(0,0,0,0.5)', width: 1, height: '100%', marginLeft: 8 }}></div>
                </div>

                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="input-box-container">
                        <input type="text" placeholder="Miles" readOnly={true} />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container">
                        <input type="text" placeholder="Charges" readOnly={true} />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container">
                        <input type="text" placeholder="Order Cost" readOnly={true} />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '4rem' }}>
                        <input type="text" placeholder="Profit" readOnly={true} />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '4rem' }}>
                        <input type="text" placeholder="%" readOnly={true} />
                    </div>
                </div>
            </div>

            <div className="fields-container-row" style={{ flexGrow: 1 }}>
                <div className='form-bordered-box'>
                    <div className='form-header'>
                        <div className='top-border top-border-left'></div>
                        <div className='form-title'>Events</div>
                        <div className='top-border top-border-middle'></div>
                        <div className='form-buttons'>
                            <div className='mochi-button'>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>Print</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                        </div>
                        <div className='top-border top-border-right'></div>
                    </div>

                </div>
            </div>

            {
                props.selectedNoteForCarrier.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <DispatchModal
                        selectedData={props.selectedNoteForCarrier}
                        setSelectedData={props.setSelectedNoteForCarrier}
                        selectedParent={props.notesForCarrier}
                        setSelectedParent={(notes) => {
                            props.setNotesForCarrier(notes);
                        }}
                        savingDataUrl='/saveNotesForCarrier'
                        deletingDataUrl='/deleteNotesForCarrier'
                        type='note'
                        isEditable={true}
                        isDeletable={true}
                        isAdding={props.selectedNoteForCarrier.id === 0}
                    />
                </animated.div>
            }

            {
                props.selectedInternalNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <DispatchModal
                        selectedData={props.selectedInternalNote}
                        setSelectedData={props.setSelectedInternalNote}
                        selectedParent={props.internalNotes}
                        setSelectedParent={(notes) => {
                            props.setInternalNotes(notes);
                        }}
                        savingDataUrl='/saveInternalNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedInternalNote.id === 0}
                    />
                </animated.div>
            }

            <DispatchPopup
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
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,
        panels: state.dispatchReducers.panels,
        billToCompanies: state.dispatchReducers.billToCompanies,
        selectedBillToCompanyInfo: state.dispatchReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.dispatchReducers.selectedBillToCompanyContact,
        selectedBillToCompanySearch: state.dispatchReducers.selectedBillToCompanySearch,
        shipperCompanies: state.dispatchReducers.shipperCompanies,
        selectedShipperCompanyInfo: state.dispatchReducers.selectedShipperCompanyInfo,
        selectedShipperCompanyContact: state.dispatchReducers.selectedShipperCompanyContact,
        selectedShipperCompanySearch: state.dispatchReducers.selectedShipperCompanySearch,
        consigneeCompanies: state.dispatchReducers.consigneeCompanies,
        selectedConsigneeCompanyInfo: state.dispatchReducers.selectedConsigneeCompanyInfo,
        selectedConsigneeCompanyContact: state.dispatchReducers.selectedConsigneeCompanyContact,
        selectedConsigneeCompanySearch: state.dispatchReducers.selectedConsigneeCompanySearch,
        ae_number: state.dispatchReducers.ae_number,
        order_number: state.dispatchReducers.order_number,
        trip_number: state.dispatchReducers.trip_number,
        division: state.dispatchReducers.division,
        load_type: state.dispatchReducers.load_type,
        template: state.dispatchReducers.template,
        pu1: state.dispatchReducers.pu1,
        pu2: state.dispatchReducers.pu2,
        pu3: state.dispatchReducers.pu3,
        pu4: state.dispatchReducers.pu4,
        pu5: state.dispatchReducers.pu5,
        delivery1: state.dispatchReducers.delivery1,
        delivery2: state.dispatchReducers.delivery2,
        delivery3: state.dispatchReducers.delivery3,
        delivery4: state.dispatchReducers.delivery4,
        delivery5: state.dispatchReducers.delivery5,
        shipperPuDate1: state.dispatchReducers.shipperPuDate1,
        shipperPuDate2: state.dispatchReducers.shipperPuDate2,
        shipperPuTime1: state.dispatchReducers.shipperPuTime1,
        shipperPuTime2: state.dispatchReducers.shipperPuTime2,
        shipperBolNumber: state.dispatchReducers.shipperBolNumber,
        shipperPoNumber: state.dispatchReducers.shipperPoNumber,
        shipperRefNumber: state.dispatchReducers.shipperRefNumber,
        shipperSealNumber: state.dispatchReducers.shipperSealNumber,
        shipperSpecialInstructions: state.dispatchReducers.shipperSpecialInstructions,
        consigneeDeliveryDate1: state.dispatchReducers.consigneeDeliveryDate1,
        consigneeDeliveryDate2: state.dispatchReducers.consigneeDeliveryDate2,
        consigneeDeliveryTime1: state.dispatchReducers.consigneeDeliveryTime1,
        consigneeDeliveryTime2: state.dispatchReducers.consigneeDeliveryTime2,
        consigneeSpecialInstructions: state.dispatchReducers.consigneeSpecialInstructions,
        dispatchEvent: state.dispatchReducers.dispatchEvent,
        dispatchEventLocation: state.dispatchReducers.dispatchEventLocation,
        dispatchEventNotes: state.dispatchReducers.dispatchEventNotes,
        dispatchEvents: state.dispatchReducers.dispatchEvents,
        hazMat: state.dispatchReducers.hazMat,
        expedited: state.dispatchReducers.expedited,
        notesForCarrier: state.dispatchReducers.notesForCarrier,
        selectedNoteForCarrier: state.dispatchReducers.selectedNoteForCarrier,
        internalNotes: state.dispatchReducers.internalNotes,
        selectedInternalNote: state.dispatchReducers.selectedInternalNote,
        isShowingShipperSecondPage: state.dispatchReducers.isShowingShipperSecondPage,
        isShowingConsigneeSecondPage: state.dispatchReducers.isShowingConsigneeSecondPage
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setSelectedBillToCompanySearch,
    setSelectedShipperCompanyInfo,
    setSelectedShipperCompanyContact,
    setSelectedShipperCompanySearch,
    setSelectedConsigneeCompanyInfo,
    setSelectedConsigneeCompanyContact,
    setSelectedConsigneeCompanySearch,
    setBillToCompanies,
    setShipperCompanies,
    setConsigneeCompanies,
    setAeNumber,
    setOrderNumber,
    setTripNumber,
    setDivision,
    setLoadType,
    setTemplate,
    setPu1,
    setPu2,
    setPu3,
    setPu4,
    setPu5,
    setDelivery1,
    setDelivery2,
    setDelivery3,
    setDelivery4,
    setDelivery5,
    setShipperPuDate1,
    setShipperPuDate2,
    setShipperPuTime1,
    setShipperPuTime2,
    setShipperBolNumber,
    setShipperPoNumber,
    setShipperRefNumber,
    setShipperSealNumber,
    setShipperSpecialInstructions,
    setConsigneeDeliveryDate1,
    setConsigneeDeliveryDate2,
    setConsigneeDeliveryTime1,
    setConsigneeDeliveryTime2,
    setConsigneeSpecialInstructions,
    setDispatchEvent,
    setDispatchEventLocation,
    setDispatchEventNotes,
    setDispatchEvents,
    setHazMat,
    setExpedited,
    setNotesForCarrier,
    setSelectedNoteForCarrier,
    setInternalNotes,
    setSelectedInternalNote,
    setIsShowingShipperSecondPage,
    setIsShowingConsigneeSecondPage
})(Dispatch)