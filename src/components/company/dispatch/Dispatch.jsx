import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './Dispatch.css';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import $ from 'jquery';
import DispatchPopup from './popup/Popup.jsx';
import DispatchModal from './modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';

import {
    setDispatchPanels,
    setSelectedOrder,
    setSelectedBillToCompanyInfo,
    setBillToCompanySearch,
    setSelectedBillToCompanyContact,
    setSelectedShipperCompanyInfo,
    setShipperCompanySearch,
    setSelectedShipperCompanyContact,
    setSelectedConsigneeCompanyInfo,
    setConsigneeCompanySearch,
    setSelectedConsigneeCompanyContact,
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
    setIsShowingConsigneeSecondPage,

    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,

    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarriers
} from './../../../actions';

function Dispatch(props) {
    var delayTimer;

    const refOrderNumber = useRef(null);

    useEffect(() => {
        refOrderNumber.current.focus({
            preventScroll: true
        });
    }, [])

    const modalTransitionProps = useSpring({ opacity: (props.selectedNoteForCarrier.id !== undefined || props.selectedInternalNote.id !== undefined) ? 1 : 0 });

    const refPopup = useRef();
    const [orderNumberFocused, setOrderNumberFocused] = useState(false);
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const panelRefs = useRef([]);

    const refBolNumbers = useRef();
    const refPoNumbers = useRef();
    const refRefNumbers = useRef();

    const [popupActiveInput, setPopupActiveInput] = useState('');

    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const [isSavingBillToCompanyInfo, setIsSavingBillToCompanyInfo] = useState(false);
    const [isSavingBillToCompanyContact, setIsSavingBillToCompanyContact] = useState(false);
    const [isSavingShipperCompanyInfo, setIsSavingShipperCompanyInfo] = useState(false);
    const [isSavingShipperCompanyContact, setIsSavingShipperCompanyContact] = useState(false);
    const [isSavingConsigneeCompanyInfo, setIsSavingConsigneeCompanyInfo] = useState(false);
    const [isSavingConsigneeCompanyContact, setIsSavingConsigneeCompanyContact] = useState(false);

    const [isSavingCarrierInfo, setIsSavingCarrierInfo] = useState(false);
    const [isSavingCarrierContact, setIsSavingCarrierContact] = useState(false);
    const [isSavingCarrierDriver, setIsSavingCarrierDriver] = useState(false);


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
            name: 'Truckload',
            selected: false
        },
        {
            id: 2,
            name: 'LTL',
            selected: false
        },
        {
            id: 3,
            name: 'Partial',
            selected: false
        },
        {
            id: 3,
            name: 'Air Freight',
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
        props.setSelectedOrder({});
        props.setAeNumber('');
        props.setOrderNumber('');
        props.setTripNumber('');

        props.setDivision({});
        props.setLoadType({});
        props.setTemplate({});
        setCarrierEquipment({});

        props.setSelectedBillToCompanyInfo({});
        props.setSelectedBillToCompanyContact({});
        props.setSelectedShipperCompanyInfo({});
        props.setSelectedShipperCompanyContact({});
        props.setSelectedConsigneeCompanyInfo({});
        props.setSelectedConsigneeCompanyContact({});

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

        props.setSelectedDispatchCarrierInfoCarrier({});
        props.setSelectedDispatchCarrierInfoDriver({});
        props.setSelectedDispatchCarrierInfoInsurance({});
        props.setSelectedDispatchCarrierInfoContact({});
    }

    const popupItemClick = (item) => {
        let selected_order = { ...props.selected_order } || { order_number: 0 };

        switch (popupActiveInput) {
            case 'division':
                props.setDivision(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    return;
                }

                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                selected_order.division = item.name;

                if ((selected_order.ae_number || '') === '') {
                    selected_order.ae_number = getRandomInt(1, 100);
                }

                if (!isSavingOrder) {
                    setIsSavingOrder(true);
                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);
                        }

                        setIsSavingOrder(false);
                    });
                }

                setPopupItems([]);
                break;
            case 'load-type':
                props.setLoadType(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    return;
                }

                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                selected_order.load_type = item.name;

                if ((selected_order.ae_number || '') === '') {
                    selected_order.ae_number = getRandomInt(1, 100);
                }

                if (!isSavingOrder) {
                    setIsSavingOrder(true);
                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);
                        }

                        setIsSavingOrder(false);
                    });
                }

                setPopupItems([]);
                break;
            case 'template':
                props.setTemplate(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    return;
                }

                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                selected_order.template = item.name;

                if ((selected_order.ae_number || '') === '') {
                    selected_order.ae_number = getRandomInt(1, 100);
                }

                if (!isSavingOrder) {
                    setIsSavingOrder(true);
                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);
                        }

                        setIsSavingOrder(false);
                    });
                }

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
                popupItems.map(async (item, index) => {
                    if (item.selected) {
                        await props.setDivision(item);

                        if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                            return;
                        }

                        let selected_order = { ...props.selected_order } || { order_number: 0 };

                        selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                        selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                        selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                        selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                        selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                        selected_order.division = item.name;

                        if ((selected_order.ae_number || '') === '') {
                            selected_order.ae_number = getRandomInt(1, 100);
                        }

                        if (!isSavingOrder) {
                            setIsSavingOrder(true);
                            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedOrder(res.order);
                                }

                                setIsSavingOrder(false);
                            });
                        }

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
                popupItems.map(async (item, index) => {
                    if (item.selected) {
                        await props.setLoadType(item);

                        if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                            return;
                        }

                        let selected_order = { ...props.selected_order } || { order_number: 0 };

                        selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                        selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                        selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                        selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                        selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                        selected_order.load_type = item.name;

                        if ((selected_order.ae_number || '') === '') {
                            selected_order.ae_number = getRandomInt(1, 100);
                        }

                        if (!isSavingOrder) {
                            setIsSavingOrder(true);
                            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedOrder(res.order);
                                }

                                setIsSavingOrder(false);
                            });
                        }
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
                popupItems.map(async (item, index) => {
                    if (item.selected) {
                        await props.setTemplate(item);

                        if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                            return;
                        }

                        let selected_order = { ...props.selected_order } || { order_number: 0 };

                        selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                        selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                        selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                        selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                        selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                        selected_order.template = item.name;

                        if ((selected_order.ae_number || '') === '') {
                            selected_order.ae_number = getRandomInt(1, 100);
                        }

                        if (!isSavingOrder) {
                            setIsSavingOrder(true);
                            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedOrder(res.order);
                                }

                                setIsSavingOrder(false);
                            });
                        }
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
                    props.setSelectedDispatchCarrierInfoDriver({
                        ...props.selectedDispatchCarrierInfoDriver,
                        id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                        carrier_id: props.selectedDispatchCarrierInfoCarrier.id,
                        equipment_id: item.id, equipment: item
                    });

                    let driver = {
                        ...props.selectedDispatchCarrierInfoDriver,
                        id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                        carrier_id: props.selectedDispatchCarrierInfoCarrier.id,
                        equipment_id: item.id, equipment: item
                    };

                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingCarrierDriver) {
                            setIsSavingCarrierDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                    await props.setSelectedDispatchCarrierInfoDriver({ ...res.driver });
                                }
                                setIsSavingCarrierDriver(false);
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
                    validateCarrierDriverForSaving(e);
                }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setSelectedDispatchCarrierInfoDriver({
                            ...props.selectedDispatchCarrierInfoDriver,
                            id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                            carrier_id: props.selectedDispatchCarrierInfoCarrier.id,
                            equipment_id: item.id, equipment: item
                        });

                        let driver = {
                            ...props.selectedDispatchCarrierInfoDriver,
                            id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                            carrier_id: props.selectedDispatchCarrierInfoCarrier.id,
                            equipment_id: item.id, equipment: item
                        };

                        if ((driver.first_name || '').trim() !== '') {
                            if (!isSavingCarrierDriver) {
                                setIsSavingCarrierDriver(true);

                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                        await props.setSelectedDispatchCarrierInfoDriver({ ...res.driver });
                                    }
                                    setIsSavingCarrierDriver(false);
                                });
                            }
                        }
                    }

                    return true;
                });

                // validateDriverForSaving(e);
                setPopupItems([]);
            }
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

                            let selected_order = { ...props.selected_order } || { order_number: 0 };

                            selected_order.bill_to_customer_id = res.customers[0].id;
                            selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                            selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                            selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                            selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                            if ((selected_order.ae_number || '') === '') {
                                selected_order.ae_number = getRandomInt(1, 100);
                            }

                            if (!isSavingOrder) {
                                setIsSavingOrder(true);
                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedOrder(res.order);
                                    }

                                    setIsSavingOrder(false);
                                });
                            }

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

                            let selected_order = { ...props.selected_order } || { order_number: 0 };
                            selected_order.shipper_customer_id = res.customers[0].id;


                            if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {

                                if (res.customers[0].mailing_bll_to !== '') {

                                    $.post(props.serverUrl + '/customers', {
                                        code: res.customers[0].mailing_bll_to
                                    }).then(res => {
                                        if (res.result === 'OK') {
                                            if (res.customers.length > 0) {
                                                props.setSelectedBillToCompanyInfo(res.customers[0]);

                                                selected_order.bill_to_customer_id = res.customers[0].id;
                                                selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                                                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                                                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                                                if ((selected_order.ae_number || '') === '') {
                                                    selected_order.ae_number = getRandomInt(1, 100);
                                                }

                                                if (!isSavingOrder) {
                                                    setIsSavingOrder(true);
                                                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                        if (res.result === 'OK') {
                                                            await props.setSelectedOrder(res.order);
                                                        }

                                                        setIsSavingOrder(false);
                                                    });
                                                }
                                            }
                                        }
                                    })

                                }

                                return;
                            }

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

                            let selected_order = { ...props.selected_order } || { order_number: 0 };

                            selected_order.consignee_customer_id = res.customers[0].id;
                            selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                            selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                            selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                            selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                            if ((selected_order.ae_number || '') === '') {
                                selected_order.ae_number = getRandomInt(1, 100);
                            }

                            if (!isSavingOrder) {
                                setIsSavingOrder(true);
                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedOrder(res.order);
                                    }

                                    setIsSavingOrder(false);
                                });
                            }

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
                props.setBillToCompanySearch(companySearch);
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
                props.setShipperCompanySearch(companySearch);
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
                props.setConsigneeCompanySearch(companySearch);
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


    const getCarrierInfoByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                $.post(props.serverUrl + '/carriers', {
                    code: e.target.value.toLowerCase()
                }).then(res => {
                    if (res.result === 'OK') {
                        if (res.carriers.length > 0) {

                            props.setSelectedDispatchCarrierInfoCarrier(res.carriers[0]);

                            res.carriers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedDispatchCarrierInfoContact(c);
                                }
                                return true;
                            });

                            props.setSelectedDispatchCarrierInfoInsurance({});

                            let selected_order = { ...props.selected_order } || { order_number: 0 };

                            selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                            selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                            selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                            selected_order.carrier_id = res.carriers[0].id;

                            if (res.carriers[0].drivers.length > 0) {
                                props.setSelectedDispatchCarrierInfoDriver(res.carriers[0].drivers[0]);
                                selected_order.carrier_driver_id = res.carriers[0].drivers[0].id;
                            }

                            if ((selected_order.ae_number || '') === '') {
                                selected_order.ae_number = getRandomInt(1, 100);
                            }

                            if (!isSavingOrder) {
                                setIsSavingOrder(true);
                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedOrder(res.order);
                                    }

                                    setIsSavingOrder(false);
                                });
                            }

                        } else {
                            props.setSelectedDispatchCarrierInfoCarrier({});
                            props.setSelectedDispatchCarrierInfoDriver({});
                            props.setSelectedDispatchCarrierInfoInsurance({});
                            props.setSelectedDispatchCarrierInfoContact({});
                        }
                    } else {
                        props.setSelectedDispatchCarrierInfoCarrier({});
                        props.setSelectedDispatchCarrierInfoDriver({});
                        props.setSelectedDispatchCarrierInfoInsurance({});
                        props.setSelectedDispatchCarrierInfoContact({});
                    }
                });
            } else {
                props.setSelectedDispatchCarrierInfoCarrier({});
                props.setSelectedDispatchCarrierInfoDriver({});
                props.setSelectedDispatchCarrierInfoInsurance({});
                props.setSelectedDispatchCarrierInfoContact({});
            }
        }
    }

    const insuranceStatusClasses = () => {
        let classes = 'input-box-container insurance-status';
        let curDate = moment().startOf('day');
        let curDate2 = moment();
        let futureMonth = curDate2.add(1, 'M');
        let statusClass = '';

        (props.selectedDispatchCarrierInfoCarrier.insurances || []).map((insurance, index) => {
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

    const goToTabindex = (index) => {
        let elems = document.getElementsByTagName('input');

        for (var i = elems.length; i--;) {
            if (elems[i].getAttribute('tabindex') && elems[i].getAttribute('tabindex') === index) {
                elems[i].focus();
                break;
            }
        }
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

    const searchCarrierBtnClick = () => {
        let carrierSearch = [
            {
                field: 'Name',
                data: (props.selectedDispatchCarrierInfoCarrier.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedDispatchCarrierInfoCarrier.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedDispatchCarrierInfoCarrier.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: props.selectedDispatchCarrierInfoCarrier.zip || ''
            },
            {
                field: 'Contact Name',
                data: (props.selectedDispatchCarrierInfoCarrier.contact_name || '').toLowerCase()
            },
            {
                field: 'Contact Phone',
                data: props.selectedDispatchCarrierInfoCarrier.contact_phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedDispatchCarrierInfoCarrier.email || '').toLowerCase()
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

    const onEquipmentInput = async (e) => {

        window.clearTimeout(delayTimer);
        let equipment = props.selectedDispatchCarrierInfoDriver.equipment || {};
        equipment.name = e.target.value.trim();
        await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment_id: 0, equipment: equipment });

        setPopupActiveInput('equipment');

        if (props.selectedDispatchCarrierInfoCarrier.id !== undefined) {
            if (e.target.value.trim() === '') {
                await setPopupItems([]);
            } else {
                delayTimer = window.setTimeout(() => {
                    $.post(props.serverUrl + '/getEquipments', {
                        name: e.target.value.toLowerCase().trim()
                    }).then(async res => {
                        const input = refCarrierEquipment.current.getBoundingClientRect();

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

    const validateBillToCompanyInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            if ((props.selectedBillToCompanyInfo.id || 0) === 0) {
                return;
            }

            window.setTimeout(() => {
                let selectedBillToCompanyInfo = props.selectedBillToCompanyInfo;

                if (selectedBillToCompanyInfo.id === undefined || selectedBillToCompanyInfo.id === -1) {
                    selectedBillToCompanyInfo.id = 0;
                    props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: 0 });
                }

                if (
                    (selectedBillToCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedBillToCompanyInfo.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedBillToCompanyInfo.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedBillToCompanyInfo.address1 || '').trim() !== "" &&
                    (selectedBillToCompanyInfo.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedBillToCompanyInfo.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let mailingParseCity = (selectedBillToCompanyInfo.mailing_city || '').trim().replace(/\s/g, "").substring(0, 3);

                    if (mailingParseCity.toLowerCase() === "ft.") {
                        mailingParseCity = "FO";
                    }
                    if (mailingParseCity.toLowerCase() === "mt.") {
                        mailingParseCity = "MO";
                    }
                    if (mailingParseCity.toLowerCase() === "st.") {
                        mailingParseCity = "SA";
                    }

                    let newCode = (selectedBillToCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedBillToCompanyInfo.state || '').trim().replace(/\s/g, "").substring(0, 2);
                    let mailingNewCode = (selectedBillToCompanyInfo.mailing_name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + mailingParseCity.substring(0, 2) + (selectedBillToCompanyInfo.mailing_state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedBillToCompanyInfo.code = newCode.toUpperCase();
                    selectedBillToCompanyInfo.mailing_code = mailingNewCode.toUpperCase();

                    if (!isSavingBillToCompanyInfo) {
                        setIsSavingBillToCompanyInfo(true);

                        $.post(props.serverUrl + '/saveCustomer', selectedBillToCompanyInfo).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedBillToCompanyInfo.id === undefined || (props.selectedBillToCompanyInfo.id || 0) === 0) {
                                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: res.customer.id });
                                }

                                (res.customer.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedBillToCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingBillToCompanyInfo(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateBillToCompanyContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedBillToCompanyInfo.id === undefined) {
                return;
            }

            let contact = props.selectedBillToCompanyContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedBillToCompanyInfo.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedBillToCompanyInfo.address1;
                contact.address2 = props.selectedBillToCompanyInfo.address2;
                contact.city = props.selectedBillToCompanyInfo.city;
                contact.state = props.selectedBillToCompanyInfo.state;
                contact.zip_code = props.selectedBillToCompanyInfo.zip;
            }

            if (!isSavingBillToCompanyContact) {
                setIsSavingBillToCompanyContact(true);

                $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                        await props.setSelectedBillToCompanyContact(res.contact);
                    }

                    setIsSavingBillToCompanyContact(false);
                });
            }
        }
    }

    const validateShipperCompanyInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            if ((props.selectedShipperCompanyInfo.id || 0) === 0) {
                return;
            }

            window.setTimeout(() => {
                let selectedShipperCompanyInfo = props.selectedShipperCompanyInfo;

                if (selectedShipperCompanyInfo.id === undefined || selectedShipperCompanyInfo.id === -1) {
                    selectedShipperCompanyInfo.id = 0;
                    props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0 });
                }

                if (
                    (selectedShipperCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedShipperCompanyInfo.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedShipperCompanyInfo.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedShipperCompanyInfo.address1 || '').trim() !== "" &&
                    (selectedShipperCompanyInfo.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedShipperCompanyInfo.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let mailingParseCity = (selectedShipperCompanyInfo.mailing_city || '').trim().replace(/\s/g, "").substring(0, 3);

                    if (mailingParseCity.toLowerCase() === "ft.") {
                        mailingParseCity = "FO";
                    }
                    if (mailingParseCity.toLowerCase() === "mt.") {
                        mailingParseCity = "MO";
                    }
                    if (mailingParseCity.toLowerCase() === "st.") {
                        mailingParseCity = "SA";
                    }

                    let newCode = (selectedShipperCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedShipperCompanyInfo.state || '').trim().replace(/\s/g, "").substring(0, 2);
                    let mailingNewCode = (selectedShipperCompanyInfo.mailing_name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + mailingParseCity.substring(0, 2) + (selectedShipperCompanyInfo.mailing_state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedShipperCompanyInfo.code = newCode.toUpperCase();
                    selectedShipperCompanyInfo.mailing_code = mailingNewCode.toUpperCase();

                    if (!isSavingShipperCompanyInfo) {
                        setIsSavingShipperCompanyInfo(true);

                        $.post(props.serverUrl + '/saveCustomer', selectedShipperCompanyInfo).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedShipperCompanyInfo.id === undefined || (props.selectedShipperCompanyInfo.id || 0) === 0) {
                                    await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: res.customer.id });
                                }

                                (res.customer.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedShipperCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingShipperCompanyInfo(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateShipperCompanyContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedShipperCompanyInfo.id === undefined) {
                return;
            }

            let contact = props.selectedShipperCompanyContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedShipperCompanyInfo.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedShipperCompanyInfo.address1;
                contact.address2 = props.selectedShipperCompanyInfo.address2;
                contact.city = props.selectedShipperCompanyInfo.city;
                contact.state = props.selectedShipperCompanyInfo.state;
                contact.zip_code = props.selectedShipperCompanyInfo.zip;
            }

            if (!isSavingShipperCompanyContact) {
                setIsSavingShipperCompanyContact(true);

                $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contacts: res.contacts });
                        await props.setSelectedShipperCompanyContact(res.contact);
                    }

                    setIsSavingShipperCompanyContact(false);
                });
            }
        }
    }

    const validateConsigneeCompanyInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            if ((props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                return;
            }

            window.setTimeout(() => {
                let selectedConsigneeCompanyInfo = props.selectedConsigneeCompanyInfo;

                if (selectedConsigneeCompanyInfo.id === undefined || selectedConsigneeCompanyInfo.id === -1) {
                    selectedConsigneeCompanyInfo.id = 0;
                    props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0 });
                }

                if (
                    (selectedConsigneeCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedConsigneeCompanyInfo.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedConsigneeCompanyInfo.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedConsigneeCompanyInfo.address1 || '').trim() !== "" &&
                    (selectedConsigneeCompanyInfo.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedConsigneeCompanyInfo.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let mailingParseCity = (selectedConsigneeCompanyInfo.mailing_city || '').trim().replace(/\s/g, "").substring(0, 3);

                    if (mailingParseCity.toLowerCase() === "ft.") {
                        mailingParseCity = "FO";
                    }
                    if (mailingParseCity.toLowerCase() === "mt.") {
                        mailingParseCity = "MO";
                    }
                    if (mailingParseCity.toLowerCase() === "st.") {
                        mailingParseCity = "SA";
                    }

                    let newCode = (selectedConsigneeCompanyInfo.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedConsigneeCompanyInfo.state || '').trim().replace(/\s/g, "").substring(0, 2);
                    let mailingNewCode = (selectedConsigneeCompanyInfo.mailing_name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + mailingParseCity.substring(0, 2) + (selectedConsigneeCompanyInfo.mailing_state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedConsigneeCompanyInfo.code = newCode.toUpperCase();
                    selectedConsigneeCompanyInfo.mailing_code = mailingNewCode.toUpperCase();

                    if (!isSavingConsigneeCompanyInfo) {
                        setIsSavingConsigneeCompanyInfo(true);

                        $.post(props.serverUrl + '/saveCustomer', selectedConsigneeCompanyInfo).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedConsigneeCompanyInfo.id === undefined || (props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                                    await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: res.customer.id });
                                }

                                (res.customer.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedConsigneeCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingConsigneeCompanyInfo(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateConsigneeCompanyContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (props.selectedConsigneeCompanyInfo.id === undefined) {
                return;
            }

            let contact = props.selectedConsigneeCompanyContact;

            if (contact.customer_id === undefined || contact.customer_id === 0) {
                contact.customer_id = props.selectedConsigneeCompanyInfo.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedConsigneeCompanyInfo.address1;
                contact.address2 = props.selectedConsigneeCompanyInfo.address2;
                contact.city = props.selectedConsigneeCompanyInfo.city;
                contact.state = props.selectedConsigneeCompanyInfo.state;
                contact.zip_code = props.selectedConsigneeCompanyInfo.zip;
            }

            if (!isSavingConsigneeCompanyContact) {
                setIsSavingConsigneeCompanyContact(true);

                $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.contacts });
                        await props.setSelectedConsigneeCompanyContact(res.contact);
                    }

                    setIsSavingConsigneeCompanyContact(false);
                });
            }
        }
    }

    const validateCarrierInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            window.clearTimeout(delayTimer);

            if ((props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                return;
            }

            window.setTimeout(() => {
                let selectedDispatchCarrierInfoCarrier = props.selectedDispatchCarrierInfoCarrier;

                if (selectedDispatchCarrierInfoCarrier.id === undefined || selectedDispatchCarrierInfoCarrier.id === -1) {
                    selectedDispatchCarrierInfoCarrier.id = 0;
                }

                if (
                    (selectedDispatchCarrierInfoCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedDispatchCarrierInfoCarrier.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedDispatchCarrierInfoCarrier.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedDispatchCarrierInfoCarrier.address1 || '').trim() !== "" &&
                    (selectedDispatchCarrierInfoCarrier.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedDispatchCarrierInfoCarrier.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let newCode = (selectedDispatchCarrierInfoCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedDispatchCarrierInfoCarrier.state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedDispatchCarrierInfoCarrier.code = newCode.toUpperCase();

                    if (!isSavingCarrierInfo) {
                        setIsSavingCarrierInfo(true);

                        $.post(props.serverUrl + '/saveCarrier', selectedDispatchCarrierInfoCarrier).then(async res => {
                            if (res.result === 'OK') {
                                if (props.selectedDispatchCarrierInfoCarrier.id === undefined && (props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, id: res.carrier.id });
                                }

                                (res.carrier.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedDispatchCarrierInfoContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingCarrierInfo(false);
                        });
                    }
                }
            }, 300);
        }
    }

    const validateCarrierContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                return;
            }

            if ((props.selectedDispatchCarrierInfoContact.id || 0) === 0) {
                return;
            }

            let contact = props.selectedDispatchCarrierInfoContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedDispatchCarrierInfoCarrier.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedDispatchCarrierInfoCarrier.address1;
                contact.address2 = props.selectedDispatchCarrierInfoCarrier.address2;
                contact.city = props.selectedDispatchCarrierInfoCarrier.city;
                contact.state = props.selectedDispatchCarrierInfoCarrier.state;
                contact.zip_code = props.selectedDispatchCarrierInfoCarrier.zip;
            }

            if (!isSavingCarrierContact) {
                setIsSavingCarrierContact(true);

                $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contacts: res.contacts });
                        await props.setSelectedDispatchCarrierInfoContact(res.contact);
                    }

                    setIsSavingCarrierContact(false);
                });
            }
        }
    }

    const validateCarrierDriverForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                let driver = { ...props.selectedDispatchCarrierInfoDriver, id: (props.selectedDispatchCarrierInfoDriver?.id || 0), carrier_id: props.selectedDispatchCarrierInfoCarrier?.id };

                if ((driver.first_name || '').trim() !== '') {
                    if (!isSavingCarrierDriver) {
                        setIsSavingCarrierDriver(true);

                        $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                            if (res.result === 'OK') {
                                await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, id: res.driver.id });
                            }

                            await setIsSavingCarrierDriver(false);
                        });
                    }
                }
            }
        }
    }

    const validateOrderForSaving = (e) => {
        let key = e.keyCode || e.which;
        let selected_order = { ...props.selected_order } || { order_number: 0 };

        if (key === 9) {
            // check if there's a bill-to-company loaded
            if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                return;
            }

            selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
            selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
            selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
            selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
            selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

            if ((selected_order.ae_number || '') === '') {
                selected_order.ae_number = getRandomInt(1, 100);
            }

            selected_order.pu_time1 = getFormattedHours(props.shipperPuTime1);
            selected_order.pu_time2 = getFormattedHours(props.shipperPuTime2);
            selected_order.delivery_time1 = getFormattedHours(props.consigneeDeliveryTime1);
            selected_order.delivery_time2 = getFormattedHours(props.consigneeDeliveryTime2);

            if (!isSavingOrder) {
                setIsSavingOrder(true);
                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedOrder(res.order);
                    }

                    setIsSavingOrder(false);
                });
            }

        }
    }

    const getOrderByOrderNumber = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.order_number || '') !== '') {
                $.post(props.serverUrl + '/getOrderByOrderNumber', { order_number: props.order_number }).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedOrder(res.order);
                        await props.setOrderNumber(res.order.order_number);
                        await props.setTripNumber(res.order.trip_number === 0 ? '' : res.order.trip_number);
                        await props.setSelectedBillToCompanyInfo(res.order.bill_to_company || {});

                        if (res.order.bill_to_company) {
                            (res.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedShipperCompanyInfo(res.order.shipper_company || {});

                        if (res.order.shipper_company) {
                            (res.order.shipper_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedShipperCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedConsigneeCompanyInfo(res.order.consignee_company || {});

                        if (res.order.consignee_company) {
                            (res.order.consignee_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedConsigneeCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedDispatchCarrierInfoCarrier(res.order.carrier || {});

                        if (res.order.carrier) {
                            (res.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedDispatchCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedDispatchCarrierInfoDriver(res.order.driver || {});

                        await props.setDivision({ name: res.order.division });
                        await props.setLoadType({ name: res.order.load_type });
                        await props.setTemplate({ name: res.order.template });
                    } else {
                        props.setOrderNumber(props.selected_order?.order_number || '');
                    }
                });
            } else {
                if ((props.selected_order?.order_number || '') !== '') {
                    props.setOrderNumber(props.selected_order.order_number);
                }
            }
        }
    }

    const getOrderByTripNumber = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.trip_number || '') !== '') {
                $.post(props.serverUrl + '/getOrderByTripNumber', { trip_number: props.trip_number }).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedOrder(res.order);
                        await props.setOrderNumber(res.order.order_number);
                        await props.setTripNumber(res.order.trip_number === 0 ? '' : res.order.trip_number);
                        await props.setSelectedBillToCompanyInfo(res.order.bill_to_company || {});

                        if (res.order.bill_to_company) {
                            (res.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedShipperCompanyInfo(res.order.shipper_company || {});

                        if (res.order.shipper_company) {
                            (res.order.shipper_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedShipperCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedConsigneeCompanyInfo(res.order.consignee_company || {});

                        if (res.order.consignee_company) {
                            (res.order.consignee_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedConsigneeCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedDispatchCarrierInfoCarrier(res.order.carrier || {});

                        if (res.order.carrier) {
                            (res.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedDispatchCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedDispatchCarrierInfoDriver(res.order.driver || {});

                        await props.setDivision({ name: res.order.division });
                        await props.setLoadType({ name: res.order.load_type });
                        await props.setTemplate({ name: res.order.template });
                    } else {
                        props.setTripNumber(props.selected_order?.trip_number || '');
                    }
                });
            } else {
                if ((props.selected_order?.trip_number || '') !== '') {
                    props.setTripNumber(props.selected_order.trip_number);
                }
            }
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const bolNumbersOnKeydown = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            props.setSelectedOrder({ ...props.selected_order, bol_numbers: ((props.selected_order.bol_numbers || '') + ' ' + props.shipperBolNumber).trim() });
            props.setShipperBolNumber('');
            refBolNumbers.current.focus();
        }
        if (keyCode === 9) {
            if (props.shipperBolNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            props.setSelectedOrder({ ...props.selected_order, bol_numbers: ((props.selected_order.bol_numbers || '') + ' ' + props.shipperBolNumber).trim() });
            props.setShipperBolNumber('');
            refBolNumbers.current.focus();
        }
    }

    const poNumbersOnKeydown = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            props.setSelectedOrder({ ...props.selected_order, po_numbers: ((props.selected_order.po_numbers || '') + ' ' + props.shipperPoNumber).trim() });
            props.setShipperPoNumber('');
            refPoNumbers.current.focus();
        }
        if (keyCode === 9) {
            if (props.shipperPoNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            props.setSelectedOrder({ ...props.selected_order, po_numbers: ((props.selected_order.po_numbers || '') + ' ' + props.shipperPoNumber).trim() });
            props.setShipperPoNumber('');
            refPoNumbers.current.focus();
        }
    }

    const refNumbersOnKeydown = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            props.setSelectedOrder({ ...props.selected_order, ref_numbers: ((props.selected_order.ref_numbers || '') + ' ' + props.shipperRefNumber).trim() });
            props.setShipperRefNumber('');
            refRefNumbers.current.focus();
        }
        if (keyCode === 9) {
            if (props.shipperRefNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            props.setSelectedOrder({ ...props.selected_order, ref_numbers: ((props.selected_order.ref_numbers || '') + ' ' + props.shipperRefNumber).trim() });
            props.setShipperRefNumber('');
            refRefNumbers.current.focus();
        }
    }


    return (
        <div className="dispatch-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <PanelContainer panels={props.panels} panelRefs={panelRefs} />

            <div className="fields-container-row">
                <div className="fields-container-col" style={{ minWidth: '91%', maxWidth: '91%', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%', alignItems: 'center' }}>
                        <div style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className="form-borderless-box">
                                <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input type="text" readOnly={true} placeholder='A/E Number'
                                            onChange={(e) => { }}
                                            value={props.selected_order?.ae_number || ''} />
                                    </div>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input tabIndex={1 + props.tabTimes} type="text" placeholder='Order Number'
                                            ref={refOrderNumber}
                                            onKeyDown={getOrderByOrderNumber}
                                            onChange={(e) => { props.setOrderNumber(e.target.value) }}
                                            value={props.order_number || ''}
                                        />
                                    </div>
                                    <div className="input-box-container" style={{ width: '9rem' }}>
                                        <input tabIndex={2 + props.tabTimes} type="text" placeholder='Trip Number'
                                            onKeyDown={getOrderByTripNumber}
                                            onChange={(e) => { props.setTripNumber(e.target.value) }}
                                            value={
                                                (props.trip_number || '') === ''
                                                    ? ''
                                                    : (
                                                        props.trip_number === 0
                                                            ? ''
                                                            : (
                                                                (props.selectedDispatchCarrierInfoCarrier.id || 0) === 0
                                                                    ? ''
                                                                    : props.trip_number
                                                            )
                                                    )
                                            } />
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
                                        <input tabIndex={3 + props.tabTimes} type="text" placeholder="Division"
                                            ref={refDivision}
                                            onKeyDown={divisionOnKeydown}
                                            onChange={() => { }}
                                            value={props.division.name || ''}
                                        />
                                        <span className="fas fa-caret-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={async () => {
                                            window.setTimeout(() => {
                                                let selectedIndex = -1;

                                                if (popupItems.length === 0) {
                                                    const input = refDivision.current.getBoundingClientRect();
                                                    setPopupPosition(input);
                                                    setPopupActiveInput('division');

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
                                                } else {
                                                    if (popupActiveInput !== 'division') {
                                                        const input = refDivision.current.getBoundingClientRect();
                                                        setPopupPosition(input);
                                                        setPopupActiveInput('division');

                                                    }
                                                }

                                                refDivision.current.focus();
                                            }, 100);
                                        }}></span>
                                    </div>

                                    <div className="input-box-container" style={{ position: 'relative', width: '9rem' }}>
                                        <input tabIndex={4 + props.tabTimes} type="text" placeholder="Load Types"
                                            ref={refLoadTypes}
                                            onKeyDown={loadTypesOnKeydown}
                                            onChange={() => { }}
                                            value={props.load_type.name || ''}
                                        />
                                        <span className="fas fa-caret-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={() => {
                                            window.setTimeout(() => {
                                                let selectedIndex = -1;

                                                if (popupItems.length === 0) {
                                                    const input = refLoadTypes.current.getBoundingClientRect();
                                                    setPopupPosition(input);
                                                    setPopupActiveInput('load-type');

                                                    loadTypesItems.map((item, index) => {
                                                        if (item.name === (props.division.name || '')) {
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
                                                } else {
                                                    if (popupActiveInput !== 'load-type') {
                                                        const input = refLoadTypes.current.getBoundingClientRect();
                                                        setPopupPosition(input);
                                                        setPopupActiveInput('load-type');

                                                    }
                                                }

                                                refLoadTypes.current.focus();
                                            }, 100);
                                        }}></span>
                                    </div>

                                    <div className="input-box-container" style={{ position: 'relative', width: '9rem' }}>
                                        <input tabIndex={5 + props.tabTimes} type="text" placeholder="Templates"
                                            ref={refTemplates}
                                            onKeyDown={templatesOnKeydown}
                                            onChange={() => { }}
                                            value={props.template.name || ''}
                                        />
                                        <span className="fas fa-caret-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={() => {
                                            window.setTimeout(() => {
                                                let selectedIndex = -1;

                                                if (popupItems.length === 0) {
                                                    const input = refTemplates.current.getBoundingClientRect();
                                                    setPopupPosition(input);
                                                    setPopupActiveInput('template');

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
                                                } else {
                                                    if (popupActiveInput !== 'template') {
                                                        const input = refTemplates.current.getBoundingClientRect();
                                                        setPopupPosition(input);
                                                        setPopupActiveInput('template');

                                                    }
                                                }

                                                refTemplates.current.focus();
                                            }, 100);
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
                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }} onKeyDown={validateOrderForSaving}>
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
                                    <input tabIndex={6 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getBillToCompanyByCode}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={7 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={8 + props.tabTimes} type="text" placeholder="Address 1"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address1 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={9 + props.tabTimes} type="text" placeholder="Address 2"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address2 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={10 + props.tabTimes} type="text" placeholder="City"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.city || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={11 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.state || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={12 + props.tabTimes} type="text" placeholder="Postal Code"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.zip || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={13 + props.tabTimes} type="text" placeholder="Contact Name"
                                        onKeyDown={validateBillToCompanyContactForSaving}
                                        onChange={(e) => {
                                            let splitted = e.target.value.split(' ');
                                            let first_name = splitted[0];

                                            if (splitted.length > 1) {
                                                first_name += ' ';
                                            }


                                            let last_name = '';

                                            splitted.map((item, index) => {
                                                if (index > 0) {
                                                    last_name += item;
                                                }
                                                return true;
                                            })

                                            props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
                                        }}

                                        onInput={(e) => {
                                            let splitted = e.target.value.split(' ');
                                            let first_name = splitted[0];

                                            if (splitted.length > 1) {
                                                first_name += ' ';
                                            }

                                            let last_name = '';

                                            splitted.map((item, index) => {
                                                if (index > 0) {
                                                    last_name += item;
                                                }
                                                return true;
                                            })

                                            props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
                                        }}

                                        value={(props.selectedBillToCompanyContact?.first_name || '') + ((props.selectedBillToCompanyContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedBillToCompanyContact?.last_name)}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput tabIndex={14 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        onKeyDown={validateBillToCompanyContactForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.contact_phone || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={15 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateBillToCompanyContactForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.ext || ''}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }} onKeyDown={validateOrderForSaving}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Carrier</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={searchCarrierBtnClick}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>

                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                                            window.alert('You must select a carrier first!');
                                            return;
                                        }

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
                                    <input tabIndex={50 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getCarrierInfoByCode}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, code: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoCarrier?.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={51 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateCarrierInfoForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, name: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoCarrier?.name || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className={insuranceStatusClasses()} style={{ width: '7rem' }}>
                                    <input type="text" placeholder="Insurance" readOnly={true} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={52 + props.tabTimes} type="text" placeholder="Carrier Load - Starting City State - Destination City State"
                                        onInput={(e) => {
                                            props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                        }}
                                        onChange={(e) => {
                                            props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                        }}
                                        value={props.selected_order?.carrier_load || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={53 + props.tabTimes} type="text" placeholder="Contact Name"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onChange={(e) => {
                                            let splitted = e.target.value.split(' ');
                                            let first_name = splitted[0];

                                            if (splitted.length > 1) {
                                                first_name += ' ';
                                            }


                                            let last_name = '';

                                            splitted.map((item, index) => {
                                                if (index > 0) {
                                                    last_name += item;
                                                }
                                                return true;
                                            })

                                            props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, first_name: first_name, last_name: last_name });
                                        }}

                                        onInput={(e) => {
                                            let splitted = e.target.value.split(' ');
                                            let first_name = splitted[0];

                                            if (splitted.length > 1) {
                                                first_name += ' ';
                                            }

                                            let last_name = '';

                                            splitted.map((item, index) => {
                                                if (index > 0) {
                                                    last_name += item;
                                                }
                                                return true;
                                            })

                                            props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, first_name: first_name, last_name: last_name });
                                        }}

                                        value={(props.selectedDispatchCarrierInfoContact?.first_name || '') + ((props.selectedDispatchCarrierInfoContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedDispatchCarrierInfoContact?.last_name)}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={54 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_work: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_work: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoContact.phone_work || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={55 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_ext: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_ext: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoContact.phone_ext || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow" style={{ position: 'relative' }}>
                                    <input tabIndex={56 + props.tabTimes} type="text" placeholder="Equipments"
                                        ref={refCarrierEquipment}
                                        onKeyDown={carrierEquipmentOnKeydown}
                                        onInput={onEquipmentInput}
                                        onChange={onEquipmentInput}
                                        value={props.selectedDispatchCarrierInfoDriver.equipment?.name || ''}
                                    />
                                    <span className="fas fa-caret-down" style={{
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
                                <div className="input-box-container grow" style={{ position: 'relative' }}>
                                    <input tabIndex={57 + props.tabTimes} type="text" placeholder="Driver Name"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onChange={(e) => {
                                            let driver = props.selectedDispatchCarrierInfoDriver || {};

                                            if (e.target.value === '') {
                                                driver = {};
                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver });
                                            } else {
                                                let splitted = e.target.value.split(' ');
                                                let first_name = splitted[0];

                                                if (splitted.length > 1) {
                                                    first_name += ' ';
                                                }

                                                let last_name = '';

                                                splitted.map((item, index) => {
                                                    if (index > 0) {
                                                        last_name += item;
                                                    }
                                                    return true;
                                                })

                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });
                                            }
                                        }}

                                        onInput={(e) => {
                                            let driver = props.selectedDispatchCarrierInfoDriver || {};

                                            if (e.target.value === '') {
                                                driver = {};
                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver });
                                            } else {
                                                let splitted = e.target.value.split(' ');
                                                let first_name = splitted[0];

                                                if (splitted.length > 1) {
                                                    first_name += ' ';
                                                }

                                                let last_name = '';

                                                splitted.map((item, index) => {
                                                    if (index > 0) {
                                                        last_name += item;
                                                    }
                                                    return true;
                                                })

                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });
                                            }
                                        }}

                                        value={(props.selectedDispatchCarrierInfoDriver?.first_name || '') + ((props.selectedDispatchCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedDispatchCarrierInfoDriver?.last_name)}
                                    />
                                    {
                                        (props.selectedDispatchCarrierInfoCarrier?.drivers || []).length > 1 &&
                                        <span className="fas fa-caret-down" style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 'calc(50% + 2px)',
                                            transform: `translateY(-50%)`,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer'
                                        }} onClick={() => {

                                        }}></span>
                                    }
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={58 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Driver Phone"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, phone: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, phone: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoDriver.phone || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{
                                    maxWidth: '5.8rem',
                                    minWidth: '5.8rem'
                                }}>
                                    <input tabIndex={59 + props.tabTimes} type="text" placeholder="Unit Number" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{
                                    maxWidth: '5.8rem',
                                    minWidth: '5.8rem'
                                }}>
                                    <input tabIndex={60 + props.tabTimes} type="text" placeholder="Trailer Number"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, trailer: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, trailer: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoDriver.trailer || ''}
                                    />
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
                                    <input type="checkbox" id="cbox-dispatch-hazmat-btn"
                                        onChange={(e) => {
                                            props.setSelectedOrder({ ...props.selected_order, haz_mat: e.target.checked ? 1 : 0 })
                                        }}
                                        checked={(props.selected_order?.haz_mat || 0) === 1}
                                    />
                                    <label htmlFor="cbox-dispatch-hazmat-btn">
                                        <div className="label-text">HazMat</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-dispatch-expedited-btn"
                                        onChange={(e) => {
                                            props.setSelectedOrder({ ...props.selected_order, expedited: e.target.checked ? 1 : 0 })
                                        }}
                                        checked={(props.selected_order?.expedited || 0) === 1}
                                    />
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
                                                if ((props.selected_order?.order_number || 0) === 0) {
                                                    window.alert('You must select or create an order first!');
                                                    return;
                                                }

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
                                                (props.selected_order?.notes_for_carrier || []).map((note, index) => {
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

            <div className="fields-container-row" style={{ display: 'flex', alignSelf: 'flex-start', minWidth: '70%', maxWidth: '69%', alignItems: 'center' }} onKeyDown={validateOrderForSaving}>
                <div className="input-box-container grow">
                    <input tabIndex={61 + props.tabTimes} type="text" placeholder="PU 1"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu1: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu1: e.target.value }) }}
                        value={props.selected_order?.pu1 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={62 + props.tabTimes} type="text" placeholder="PU 2"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu2: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu2: e.target.value }) }}
                        value={props.selected_order?.pu2 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={63 + props.tabTimes} type="text" placeholder="PU 3"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu3: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu3: e.target.value }) }}
                        value={props.selected_order?.pu3 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={64 + props.tabTimes} type="text" placeholder="PU 4"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu4: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu4: e.target.value }) }}
                        value={props.selected_order?.pu4 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={65 + props.tabTimes} type="text" placeholder="PU 5"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu5: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu5: e.target.value }) }}
                        value={props.selected_order?.pu5 || ''} />
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
                    <input tabIndex={66 + props.tabTimes} type="text" placeholder="Delivery 1"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery1: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery1: e.target.value }) }}
                        value={props.selected_order?.delivery1 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={67 + props.tabTimes} type="text" placeholder="Delivery 2"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery2: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery2: e.target.value }) }}
                        value={props.selected_order?.delivery2 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={68 + props.tabTimes} type="text" placeholder="Delivery 3"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery3: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery3: e.target.value }) }}
                        value={props.selected_order?.delivery3 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={69 + props.tabTimes} type="text" placeholder="Delivery 4"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery4: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery4: e.target.value }) }}
                        value={props.selected_order?.delivery4 || ''} />
                </div>
                <div className="form-h-sep"></div>
                <div className="input-box-container grow">
                    <input tabIndex={70 + props.tabTimes} type="text" placeholder="Delivery 5"
                        onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery5: e.target.value }) }}
                        onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery5: e.target.value }) }}
                        value={props.selected_order?.delivery5 || ''} />
                </div>
                <div className="form-h-sep"></div>
            </div>

            <div className="fields-container-row" style={{ marginTop: 10 }}>
                <div className="fields-container-col" style={{ minWidth: '91%', maxWidth: '91%', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%' }}>
                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10, height: '9rem' }} onKeyDown={validateOrderForSaving}>
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
                                    <input tabIndex={16 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getShipperCompanyByCode}
                                        onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedShipperCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={17 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateShipperCompanyInfoForSaving}
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
                                                <input tabIndex={18 + props.tabTimes} type="text" placeholder="Address 1"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={19 + props.tabTimes} type="text" placeholder="Address 2"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={20 + props.tabTimes} type="text" placeholder="City"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input tabIndex={21 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input tabIndex={22 + props.tabTimes} type="text" placeholder="Postal Code"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={23 + props.tabTimes} type="text" placeholder="Contact Name"
                                                    onKeyDown={validateShipperCompanyContactForSaving}
                                                    onChange={(e) => {
                                                        let splitted = e.target.value.split(' ');
                                                        let first_name = splitted[0];

                                                        if (splitted.length > 1) {
                                                            first_name += ' ';
                                                        }


                                                        let last_name = '';

                                                        splitted.map((item, index) => {
                                                            if (index > 0) {
                                                                last_name += item;
                                                            }
                                                            return true;
                                                        })

                                                        props.setSelectedShipperCompanyContact({ ...props.selectedShipperCompanyContact, first_name: first_name, last_name: last_name });
                                                    }}

                                                    onInput={(e) => {
                                                        let splitted = e.target.value.split(' ');
                                                        let first_name = splitted[0];

                                                        if (splitted.length > 1) {
                                                            first_name += ' ';
                                                        }

                                                        let last_name = '';

                                                        splitted.map((item, index) => {
                                                            if (index > 0) {
                                                                last_name += item;
                                                            }
                                                            return true;
                                                        })

                                                        props.setSelectedShipperCompanyContact({ ...props.selectedShipperCompanyContact, first_name: first_name, last_name: last_name });
                                                    }}

                                                    value={(props.selectedShipperCompanyContact?.first_name || '') + ((props.selectedShipperCompanyContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedShipperCompanyContact?.last_name)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone">
                                                <MaskedInput tabIndex={24 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    onKeyDown={validateShipperCompanyContactForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.contact_phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={25 + props.tabTimes} type="text" placeholder="Ext"
                                                    onKeyDown={validateShipperCompanyContactForSaving}
                                                    onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                    value={props.selectedShipperCompanyInfo.ext || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="second-page" onFocus={() => { props.setIsShowingShipperSecondPage(true) }}>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={26 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Date 1"
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu_date1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu_date1: e.target.value }) }}
                                                    value={props.selected_order?.pu_date1 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={27 + props.tabTimes} type="text" placeholder="PU Time 1"
                                                    onBlur={(e) => {
                                                        let formatted = getFormattedHours(e.target.value);
                                                        props.setShipperPuTime1(formatted);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time1: formatted });
                                                    }}
                                                    onInput={(e) => {
                                                        props.setShipperPuTime1(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time1: e.target.value });
                                                    }}
                                                    onChange={(e) => {
                                                        props.setShipperPuTime1(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time1: e.target.value });
                                                    }}
                                                    value={props.selected_order?.pu_time1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={28 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="PU Date 2"
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, pu_date2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, pu_date2: e.target.value }) }}
                                                    value={props.selected_order?.pu_date2 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={29 + props.tabTimes} type="text" placeholder="PU Time 2"
                                                    onBlur={(e) => {
                                                        let formatted = getFormattedHours(e.target.value);
                                                        props.setShipperPuTime2(formatted);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time2: formatted });
                                                    }}
                                                    onInput={(e) => {
                                                        props.setShipperPuTime2(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time2: e.target.value });
                                                    }}
                                                    onChange={(e) => {
                                                        props.setShipperPuTime2(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, pu_time2: e.target.value });
                                                    }}
                                                    value={props.selected_order?.pu_time2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                {
                                                    (props.selected_order?.bol_numbers || '').split(' ').map((item, index) => {
                                                        if (item.trim() !== '') {
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
                                                                            props.setSelectedOrder({ ...props.selected_order, bol_numbers: (props.selected_order.bol_numbers || '').replace(item, '').trim() })
                                                                        }}></span>

                                                                    <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                </div>
                                                            )
                                                        } else {
                                                            return false;
                                                        }
                                                    })
                                                }

                                                <input tabIndex={30 + props.tabTimes} type="text" placeholder="BOL Numbers"
                                                    ref={refBolNumbers}
                                                    onKeyDown={bolNumbersOnKeydown}
                                                    onInput={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                    value={props.shipperBolNumber || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                {
                                                    (props.selected_order?.po_numbers || '').split(' ').map((item, index) => {
                                                        if (item.trim() !== '') {
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
                                                                            props.setSelectedOrder({ ...props.selected_order, po_numbers: (props.selected_order.po_numbers || '').replace(item, '').trim() })
                                                                        }}></span>

                                                                    <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                </div>
                                                            )
                                                        } else {
                                                            return false;
                                                        }
                                                    })
                                                }
                                                <input tabIndex={31 + props.tabTimes} type="text" placeholder="PO Numbers"
                                                    ref={refPoNumbers}
                                                    onKeyDown={poNumbersOnKeydown}
                                                    onInput={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                    value={props.shipperPoNumber || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                {
                                                    (props.selected_order?.ref_numbers || '').split(' ').map((item, index) => {
                                                        if (item.trim() !== '') {
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
                                                                            props.setSelectedOrder({ ...props.selected_order, ref_numbers: (props.selected_order.ref_numbers || '').replace(item, '').trim() })
                                                                        }}></span>

                                                                    <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                </div>
                                                            )
                                                        } else {
                                                            return false;
                                                        }
                                                    })
                                                }
                                                <input tabIndex={32 + props.tabTimes} type="text" placeholder="REF Numbers"
                                                    ref={refRefNumbers}
                                                    onKeyDown={refNumbersOnKeydown}
                                                    onInput={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                    onChange={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                    value={props.shipperRefNumber || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                <input tabIndex={33 + props.tabTimes} type="text" placeholder="SEAL Number"
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, seal_number: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, seal_number: e.target.value }) }}
                                                    value={props.selected_order?.seal_number || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <input tabIndex={34 + props.tabTimes} type="text" placeholder="Special Instructions"
                                                    onKeyDown={(e) => {
                                                        let key = e.keyCode || e.which;

                                                        if (key === 9) {
                                                            e.preventDefault();

                                                            goToTabindex((35 + props.tabTimes).toString());
                                                            props.setIsShowingShipperSecondPage(false);
                                                        }
                                                    }}
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, shipper_special_instructions: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, shipper_special_instructions: e.target.value }) }}
                                                    value={props.selected_order?.shipper_special_instructions || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-bordered-box' style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10, height: '9rem' }} onKeyDown={validateOrderForSaving}>
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
                                    <input tabIndex={35 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        onKeyDown={getConsigneeCompanyByCode}
                                        onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedConsigneeCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={36 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateConsigneeCompanyInfoForSaving}
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
                                                <input tabIndex={37 + props.tabTimes} type="text" placeholder="Address 1"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={38 + props.tabTimes} type="text" placeholder="Address 2"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={39 + props.tabTimes} type="text" placeholder="City"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input tabIndex={40 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input tabIndex={41 + props.tabTimes} type="text" placeholder="Postal Code"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={42 + props.tabTimes} type="text" placeholder="Contact Name"
                                                    onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onChange={(e) => {
                                                        let splitted = e.target.value.split(' ');
                                                        let first_name = splitted[0];

                                                        if (splitted.length > 1) {
                                                            first_name += ' ';
                                                        }


                                                        let last_name = '';

                                                        splitted.map((item, index) => {
                                                            if (index > 0) {
                                                                last_name += item;
                                                            }
                                                            return true;
                                                        })

                                                        props.setSelectedConsigneeCompanyContact({ ...props.selectedConsigneeCompanyContact, first_name: first_name, last_name: last_name });
                                                    }}

                                                    onInput={(e) => {
                                                        let splitted = e.target.value.split(' ');
                                                        let first_name = splitted[0];

                                                        if (splitted.length > 1) {
                                                            first_name += ' ';
                                                        }

                                                        let last_name = '';

                                                        splitted.map((item, index) => {
                                                            if (index > 0) {
                                                                last_name += item;
                                                            }
                                                            return true;
                                                        })

                                                        props.setSelectedConsigneeCompanyContact({ ...props.selectedConsigneeCompanyContact, first_name: first_name, last_name: last_name });
                                                    }}

                                                    value={(props.selectedConsigneeCompanyContact?.first_name || '') + ((props.selectedConsigneeCompanyContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedConsigneeCompanyContact?.last_name)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone">
                                                <MaskedInput tabIndex={43 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.contact_phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={44 + props.tabTimes} type="text" placeholder="Ext"
                                                    onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                    value={props.selectedConsigneeCompanyInfo.ext || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="second-page" onFocus={() => { props.setIsShowingConsigneeSecondPage(true) }}>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={45 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Date 1"
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery_date1: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery_date1: e.target.value }) }}
                                                    value={props.selected_order?.delivery_date1 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={46 + props.tabTimes} type="text" placeholder="Delivery Time 1"
                                                    onBlur={(e) => {
                                                        let formatted = getFormattedHours(e.target.value);
                                                        props.setConsigneeDeliveryTime1(formatted);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time1: formatted });
                                                    }}
                                                    onInput={(e) => {
                                                        props.setConsigneeDeliveryTime1(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time1: e.target.value });
                                                    }}
                                                    onChange={(e) => {
                                                        props.setConsigneeDeliveryTime1(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time1: e.target.value });
                                                    }}
                                                    value={props.selected_order?.delivery_time1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={47 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Delivery Date 2"
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery_date2: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, delivery_date2: e.target.value }) }}
                                                    value={props.selected_order?.delivery_date2 || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={48 + props.tabTimes} type="text" placeholder="Delivery Time 2"
                                                    onBlur={(e) => {
                                                        let formatted = getFormattedHours(e.target.value);
                                                        props.setConsigneeDeliveryTime2(formatted);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time2: formatted });
                                                    }}
                                                    onInput={(e) => {
                                                        props.setConsigneeDeliveryTime2(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time2: e.target.value });
                                                    }}
                                                    onChange={(e) => {
                                                        props.setConsigneeDeliveryTime2(e.target.value);
                                                        props.setSelectedOrder({ ...props.selected_order, delivery_time2: e.target.value });
                                                    }}
                                                    value={props.selected_order?.delivery_time2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ flexGrow: 1 }}>
                                            <div className="input-box-container grow" style={{ maxHeight: 'initial', minHeight: 'initial' }}>
                                                <textarea tabIndex={49 + props.tabTimes} placeholder="Special Instructions" style={{
                                                    resize: 'none',
                                                    flexGrow: 1,
                                                    border: 0,
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                                    onKeyDown={(e) => {
                                                        let key = e.keyCode || e.which;

                                                        if (key === 9) {
                                                            e.preventDefault();

                                                            goToTabindex((50 + props.tabTimes).toString());
                                                            props.setIsShowingConsigneeSecondPage(false);
                                                        }
                                                    }}
                                                    onInput={(e) => { props.setSelectedOrder({ ...props.selected_order, consignee_special_instructions: e.target.value }) }}
                                                    onChange={(e) => { props.setSelectedOrder({ ...props.selected_order, consignee_special_instructions: e.target.value }) }}
                                                    value={props.selected_order?.consignee_special_instructions || ''}
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
                                                if ((props.selected_order?.order_number || 0) === 0) {
                                                    window.alert('You must select or create an order first!');
                                                    return;
                                                }
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
                                                (props.selected_order?.internal_notes || []).map((note, index) => {
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
                        <input tabIndex={71 + props.tabTimes} type="text" placeholder="Events"
                            ref={refDispatchEvents}
                            onKeyDown={dispatchEventsOnKeydown}
                            onChange={() => { }}
                            value={dispatchEvent.name || ''}

                        />
                        <span className="fas fa-caret-down" style={{
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
                        <input tabIndex={72 + props.tabTimes} type="text" placeholder="Event Location"
                            onInput={(e) => { props.setDispatchEventLocation(e.target.value) }}
                            onChange={(e) => { props.setDispatchEventLocation(e.target.value) }}
                            value={props.dispatchEventLocation || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input tabIndex={73 + props.tabTimes} type="text" placeholder="Event Notes"
                            onKeyDown={(e) => {
                                let key = e.keyCode || e.which;

                                if (key === 9) {
                                    e.preventDefault();

                                    goToTabindex((1 + props.tabTimes).toString());
                                }
                            }}
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
                        selectedParent={props.selected_order}
                        setSelectedParent={(notes) => {
                            props.setSelectedOrder({ ...props.selected_order, notes_for_carrier: notes });
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
                        selectedParent={props.selected_order}
                        setSelectedParent={(notes) => {
                            props.setSelectedOrder({ ...props.selected_order, internal_notes: notes });
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

        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
        billToCompanySearch: state.customerReducers.billToCompanySearch,
        selectedShipperCompanyInfo: state.customerReducers.selectedShipperCompanyInfo,
        selectedShipperCompanyContact: state.customerReducers.selectedShipperCompanyContact,
        shipperCompanySearch: state.customerReducers.shipperCompanySearch,
        selectedConsigneeCompanyInfo: state.customerReducers.selectedConsigneeCompanyInfo,
        selectedConsigneeCompanyContact: state.customerReducers.selectedConsigneeCompanyContact,
        consigneeCompanySearch: state.customerReducers.consigneeCompanySearch,

        selected_order: state.dispatchReducers.selected_order,
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
        isShowingConsigneeSecondPage: state.dispatchReducers.isShowingConsigneeSecondPage,

        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,
        selectedDispatchCarrierInfoContact: state.carrierReducers.selectedDispatchCarrierInfoContact,
        selectedDispatchCarrierInfoDriver: state.carrierReducers.selectedDispatchCarrierInfoDriver,
        selectedDispatchCarrierInfoInsurance: state.carrierReducers.selectedDispatchCarrierInfoInsurance,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedOrder,
    setSelectedBillToCompanyInfo,
    setBillToCompanySearch,
    setSelectedBillToCompanyContact,
    setSelectedShipperCompanyInfo,
    setShipperCompanySearch,
    setSelectedShipperCompanyContact,
    setSelectedConsigneeCompanyInfo,
    setConsigneeCompanySearch,
    setSelectedConsigneeCompanyContact,
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
    setIsShowingConsigneeSecondPage,

    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,

    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarriers
})(Dispatch)