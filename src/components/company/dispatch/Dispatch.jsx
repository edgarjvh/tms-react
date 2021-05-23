import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './Dispatch.css';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import $ from 'jquery';
import DispatchPopup from './popup/Popup.jsx';
import DispatchModal from './modal/Modal.jsx';
import { useTransition, useSpring, animated } from 'react-spring';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import 'loaders.css';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import CalendarPopup from './calendarPopup/CalendarPopup.jsx';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import CarrierChange from './popup/ChangeCarrier.jsx';

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
    setDispatchCarrierInfoCarriers,
    setDispatchOpenedPanels,
    setOrderSelectedPickup,
    setIsAddingPickup,
    setIsAddingDelivery,
    setMileageLoaderVisible,
    setSelectedOrderDocument,

    setLbSelectedOrder,

    setShowingChangeCarrier
} from './../../../actions';
import ChangeCarrier from './popup/ChangeCarrier.jsx';

function Dispatch(props) {
    SwiperCore.use([Navigation]);

    var delayTimer;



    const refOrderNumber = useRef(null);

    useEffect(() => {
        refOrderNumber.current.focus({
            preventScroll: true
        });

        updateSystemDateTime();
    }, [])

    const [currentSystemDateTime, setCurrentSystemDateTime] = useState(moment());

    const updateSystemDateTime = () => {
        window.setTimeout(() => {
            setCurrentSystemDateTime(moment());
            updateSystemDateTime();
        }, 1000)
    }

    const [puTime1KeyCode, setPuTime1KeyCode] = useState(0);
    const [puTime2KeyCode, setPuTime2KeyCode] = useState(0);
    const [puDate1KeyCode, setPuDate1KeyCode] = useState(0);
    const [puDate2KeyCode, setPuDate2KeyCode] = useState(0);
    const [deliveryTime1KeyCode, setDeliveryTime1KeyCode] = useState(0);
    const [deliveryTime2KeyCode, setDeliveryTime2KeyCode] = useState(0);
    const [deliveryDate1KeyCode, setDeliveryDate1KeyCode] = useState(0);
    const [deliveryDate2KeyCode, setDeliveryDate2KeyCode] = useState(0);


    const [preSelectedPickupDate1, setPreSelectedPickupDate1] = useState(moment());
    const [preSelectedPickupDate2, setPreSelectedPickupDate2] = useState(moment());
    const [preSelectedDeliveryDate1, setPreSelectedDeliveryDate1] = useState(moment());
    const [preSelectedDeliveryDate2, setPreSelectedDeliveryDate2] = useState(moment());

    const [isPickupDate1CalendarShown, setIsPickupDate1CalendarShown] = useState(false);
    const [isPickupDate2CalendarShown, setIsPickupDate2CalendarShown] = useState(false);
    const [isDeliveryDate1CalendarShown, setIsDeliveryDate1CalendarShown] = useState(false);
    const [isDeliveryDate2CalendarShown, setIsDeliveryDate2CalendarShown] = useState(false);

    const refPickupDate1 = useRef();
    const refPickupDate2 = useRef();
    const refDeliveryDate1 = useRef();
    const refDeliveryDate2 = useRef();

    const refCalendarPickupDate1 = useRef();
    const refCalendarPickupDate2 = useRef();
    const refCalendarDeliveryDate1 = useRef();
    const refCalendarDeliveryDate2 = useRef();


    const popupCalendarPickupDate1Classes = classnames({
        'mochi-contextual-container': true,
        'shown': isPickupDate1CalendarShown
    });

    const popupCalendarPickupDate2Classes = classnames({
        'mochi-contextual-container': true,
        'shown': isPickupDate2CalendarShown
    });

    const popupCalendarDeliveryDate1Classes = classnames({
        'mochi-contextual-container': true,
        'shown': isDeliveryDate1CalendarShown
    });

    const popupCalendarDeliveryDate2Classes = classnames({
        'mochi-contextual-container': true,
        'shown': isDeliveryDate2CalendarShown
    });

    const [selectedOrderEvent, setSelectedOrderEvent] = useState({});

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "_aKHLFzgJTYQLzsSzVqRKyiKk8iuywH3jbtV8Mxw5Gs",
        app_id: "X4qy0Sva14BQxJCbVqXL"
    });
    const routingService = platform.getRoutingService();

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
    const refDriverName = useRef();
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

        props.setOrderSelectedPickup({})

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
        setSelectedOrderEvent({});
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

    const popupItemClick = async (item) => {
        let selected_order = { ...props.selected_order } || { order_number: 0 };

        switch (popupActiveInput) {
            case 'division':
                await props.setDivision(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    await setPopupItems([]);
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
                    }).catch(e => {
                        console.log('error saving order', e);
                        setIsSavingOrder(false);
                    });
                }

                await setPopupItems([]);
                break;
            case 'load-type':
                await props.setLoadType(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    await setPopupItems([]);
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
                    }).catch(e => {
                        console.log('error saving order', e);
                        setIsSavingOrder(false);
                    });
                }

                await setPopupItems([]);
                break;
            case 'template':
                await props.setTemplate(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    await setPopupItems([]);
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
                    }).catch(e => {
                        console.log('error saving order', e);
                        setIsSavingOrder(false);
                    });
                }

                await setPopupItems([]);
                break;
            case 'equipment':
                await props.setSelectedDispatchCarrierInfoDriver({
                    ...props.selectedDispatchCarrierInfoDriver,
                    equipment: item,
                    equipment_id: item.id,
                    carrier_id: props.selectedDispatchCarrierInfoCarrier.id || 0
                });

                if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                    let driver = {
                        ...props.selectedDispatchCarrierInfoDriver,
                        id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                        carrier_id: props.selectedDispatchCarrierInfoCarrier.id || 0,
                        equipment: item,
                        equipment_id: item.id
                    };

                    if ((driver.first_name || '').trim() !== '') {
                        if (!isSavingCarrierDriver) {
                            setIsSavingCarrierDriver(true);

                            $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                if (res.result === 'OK') {
                                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                    await props.setSelectedDispatchCarrierInfoDriver({ ...driver, id: res.driver.id });
                                }

                                await setIsSavingCarrierDriver(false);
                            });
                        }
                    }
                }
                await setPopupItems([]);
                break;
            case 'dispatch-event':
                await props.setDispatchEvent(item);
                await setSelectedOrderEvent(item);
                await setPopupItems([]);

                props.setDispatchEventLocation(item.location || '');
                props.setDispatchEventNotes(item.notes || '');
                goToTabindex((72 + props.tabTimes).toString());
                break;
            case 'driver-name':

                await props.setSelectedDispatchCarrierInfoDriver(item);

                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                    await setPopupItems([]);
                    return;
                }

                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                selected_order.shipper_customer_id = (props.selectedShipperCompanyInfo?.id || 0);
                selected_order.consignee_customer_id = (props.selectedConsigneeCompanyInfo?.id || 0);
                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                selected_order.carrier_driver_id = (item.id || 0);

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
                    }).catch(e => {
                        console.log('error saving order', e);
                        setIsSavingOrder(false);
                    });
                }

                await setPopupItems([]);
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

        $.post(props.serverUrl + '/getDivisions').then(async res => {
            setPopupActiveInput('division');
            const input = refDivision.current.getBoundingClientRect();
            setPopupPosition(input);

            if (res.result === 'OK') {
                let selectedIndex = -1;

                if (popupItems.length === 0) {
                    if (key !== 'tab') {

                        res.divisions.map((item, index) => {
                            if (item.name === (props.division.name || '')) {
                                selectedIndex = index;
                            }
                            return true;
                        });

                        setPopupItems(res.divisions.map((item, index) => {
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
                                    }).catch(e => {
                                        console.log('error saving order', e);
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

        });
    }

    const loadTypesOnKeydown = (e) => {
        let key = e.key.toLowerCase();

        $.post(props.serverUrl + '/getLoadTypes').then(async res => {
            setPopupActiveInput('load-type');
            const input = refLoadTypes.current.getBoundingClientRect();
            setPopupPosition(input);

            if (res.result === 'OK') {
                let selectedIndex = -1;

                if (popupItems.length === 0) {
                    if (key !== 'tab') {
                        res.load_types.map((item, index) => {
                            if (item.name === (props.load_type.name || '')) {
                                selectedIndex = index;
                            }
                            return true;
                        });

                        setPopupItems(res.load_types.map((item, index) => {
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
                                    }).catch(e => {
                                        console.log('error saving order', e);
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
        });
    }

    const templatesOnKeydown = (e) => {
        let key = e.key.toLowerCase();

        $.post(props.serverUrl + '/getTemplates').then(async res => {
            setPopupActiveInput('template');
            const input = refTemplates.current.getBoundingClientRect();
            setPopupPosition(input);

            if (res.result === 'OK') {
                let selectedIndex = -1;

                if (popupItems.length === 0) {
                    if (key !== 'tab') {
                        res.templates.map((item, index) => {
                            if (item.name === (props.template.name || '')) {
                                selectedIndex = index;
                            }
                            return true;
                        });

                        setPopupItems(res.templates.map((item, index) => {
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
                                    }).catch(e => {
                                        console.log('error saving order', e);
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
        });
    }

    const carrierEquipmentOnKeydown = async (e) => {
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

                await setPopupItems(items);

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

                await setPopupItems(items);

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

    const dispatchEventsOnKeydown = async (e) => {
        let key = e.key.toLowerCase();
        await setPopupActiveInput('dispatch-event');
        const input = refDispatchEvents.current.getBoundingClientRect();
        setPopupPosition(input);


        if (key === 'arrowleft' || key === 'arrowup' || key === 'arrowright' || key === 'arrowdown') {
            if (popupItems.length === 0) {
                window.clearTimeout(delayTimer);
                delayTimer = null;

                delayTimer = window.setTimeout(async () => {

                    if ((props.selected_order?.id || 0) === 0) {
                        await setPopupItems([]);
                        return;
                    }

                    let items = [];

                    if ((props.selected_order?.carrier_id || 0) === 0) {
                        items.push({
                            name: 'Other',
                            type: 'other'
                        })

                        await setPopupItems(items);

                        return;
                    }

                    if ((props.selected_order?.routing || []).length > 0) {

                        for (let i = 0; i < props.selected_order.routing.length; i++) {
                            let route = props.selected_order.routing[i];

                            if (route.extra_data.type === 'pickup') {
                                if ((props.selected_order?.events || []).find(item => item.event_type === 'loaded' && item.shipper_id === route.id) === undefined) {
                                    items.push({
                                        name: 'Loaded - ' + route.code,
                                        type: 'loaded',
                                        location: route.city + ', ' + route.state,
                                        notes: 'Loaded at Shipper ' + route.code + ((route.code_number || 0) === 0 ? '' : route.code_number),
                                        shipper_id: route.id,
                                    })

                                    items.push({
                                        name: 'Other',
                                        type: 'other'
                                    })

                                    await setPopupItems(items);

                                    return;
                                }
                            } else {
                                if ((props.selected_order?.events || []).find(item => item.event_type === 'delivered' && item.consignee_id === route.id) === undefined) {
                                    items.push({
                                        name: 'Delivered - ' + route.code,
                                        type: 'delivered',
                                        location: route.city + ', ' + route.state,
                                        notes: 'Delivered at Consignee ' + route.code + ((route.code_number || 0) === 0 ? '' : route.code_number),
                                        consignee_id: route.id,
                                    })

                                    items.push({
                                        name: 'Other',
                                        type: 'other'
                                    })

                                    await setPopupItems(items);

                                    return;
                                }
                            }
                        }
                    }

                    items.push({
                        name: 'Other',
                        type: 'other'
                    });

                    await setPopupItems(items);

                    refDispatchEvents.current.focus();
                }, 100);
            } else {
                if (key === 'arrowright' || key === 'arrowdown') {
                    let selectedIndex = popupItems.findIndex(item => item.selected);

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

                if (key === 'arrowleft' || key === 'arrowup') {
                    let selectedIndex = popupItems.findIndex(item => item.selected);

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
            }
        } else if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                e.preventDefault();
                let selectedIndex = popupItems.findIndex(item => item.selected);

                if (selectedIndex === -1) {
                    await props.setDispatchEvent(popupItems[0]);
                    await setSelectedOrderEvent(popupItems[0]);
                    props.setDispatchEventLocation(popupItems[0].location || '');
                    props.setDispatchEventNotes(popupItems[0].notes || '');

                    await setPopupItems([]);
                    goToTabindex((72 + props.tabTimes).toString());
                } else {
                    await props.setDispatchEvent(popupItems[selectedIndex]);
                    await setSelectedOrderEvent(popupItems[selectedIndex]);
                    props.setDispatchEventLocation(popupItems[selectedIndex].location || '');
                    props.setDispatchEventNotes(popupItems[selectedIndex].notes || '');

                    await setPopupItems([]);
                    goToTabindex((72 + props.tabTimes).toString());
                }
            } else {
                if (key === 'enter') {
                    e.preventDefault();
                }
            }
        } else {
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
                                }).catch(e => {
                                    console.log('error saving order', e);
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
                            let pickups = props.selected_order?.pickups || [];

                            let isAdding = pickups.filter(pu => pu.id === 0).length > 0;

                            if (isAdding) {
                                pickups = pickups.map((pu, i) => {
                                    if (pu.id === 0) {
                                        let extra_data = {};
                                        pu = res.customers[0];
                                        pu.extra_data = extra_data;
                                    }
                                    return pu;
                                })
                            } else {
                                if (pickups.length > 0) {
                                    pickups = pickups.map((pu, i) => {
                                        if (pu.id === (props.selectedShipperCompanyInfo.id || 0)) {
                                            let extra_data = pu.extra_data || {};
                                            pu = res.customers[0];
                                            pu.extra_data = extra_data;
                                        }
                                        return pu;
                                    })
                                } else {
                                    pickups.push(res.customers[0]);
                                }
                            }

                            props.setSelectedShipperCompanyInfo(res.customers[0]);

                            res.customers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedShipperCompanyContact(c);
                                }
                                return true;
                            });

                            let selected_order = { ...props.selected_order } || { order_number: 0 };
                            selected_order.shipper_customer_id = res.customers[0].id;
                            selected_order.pickups = pickups;

                            if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {

                                if (res.customers[0].mailing_bll_to !== '') {

                                    $.post(props.serverUrl + '/customers', {
                                        code: res.customers[0].mailing_bll_to
                                    }).then(res => {
                                        if (res.result === 'OK') {
                                            if (res.customers.length > 0) {
                                                props.setSelectedBillToCompanyInfo(res.customers[0]);

                                                selected_order.bill_to_customer_id = res.customers[0].id;
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
                                                    }).catch(e => {
                                                        console.log('error saving order', e);
                                                        setIsSavingOrder(false);
                                                    });
                                                }
                                            }
                                        }
                                    })

                                }

                                return;
                            } else {
                                if (!isSavingOrder) {
                                    setIsSavingOrder(true);
                                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                        if (res.result === 'OK') {
                                            await props.setSelectedOrder(res.order);
                                        }

                                        setIsSavingOrder(false);
                                    }).catch(e => {
                                        console.log('error saving order', e);
                                        setIsSavingOrder(false);
                                    });
                                }
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

                if ((props.selected_order?.id || 0) === 0) {
                    e.preventDefault();
                    window.alert('You must create or load an order first!');
                    props.setSelectedConsigneeCompanyInfo({});
                    props.setSelectedConsigneeCompanyContact({});
                    return;
                }

                $.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.customers.length > 0) {
                            let selected_order = { ...props.selected_order } || { order_number: 0 };

                            let deliveries = selected_order.deliveries || [];

                            let isAdding = deliveries.filter(delivery => delivery.id === 0).length > 0;

                            if (isAdding) {
                                deliveries = deliveries.map((delivery, i) => {
                                    if (delivery.id === 0) {
                                        let extra_data = {};
                                        delivery = res.customers[0];
                                        delivery.extra_data = extra_data;
                                    }
                                    return delivery;
                                })
                            } else {
                                if (deliveries.length > 0) {
                                    deliveries = deliveries.map((delivery, i) => {
                                        if (delivery.id === (props.selectedConsigneeCompanyInfo.id || 0)) {
                                            let extra_data = delivery.extra_data || {};
                                            delivery = res.customers[0];
                                            delivery.extra_data = extra_data;
                                        }
                                        return delivery;
                                    })
                                } else {
                                    deliveries.push(res.customers[0]);
                                }
                            }

                            selected_order.deliveries = deliveries;

                            props.setSelectedConsigneeCompanyInfo(res.customers[0]);

                            res.customers[0].contacts.map(c => {
                                if (c.is_primary === 1) {
                                    props.setSelectedConsigneeCompanyContact(c);
                                }
                                return true;
                            });

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
                                }).catch(e => {
                                    console.log('error saving order', e);
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

                if (!props.dispatchOpenedPanels.includes('bill-to-company-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'bill-to-company-search']);
                }
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

                if (!props.dispatchOpenedPanels.includes('shipper-company-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'shipper-company-search'])
                }
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

                if (!props.dispatchOpenedPanels.includes('consignee-company-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'consignee-company-search'])
                }
            }
        });
    }


    const getCarrierInfoByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                if ((props.selected_order?.id || 0) === 0) {
                    e.preventDefault();
                    window.alert('You must create or load an order first!');
                    props.setSelectedDispatchCarrierInfoCarrier({});
                    props.setSelectedDispatchCarrierInfoContact({});
                    props.setSelectedDispatchCarrierInfoDriver({});
                    return;
                }

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
                                }).catch(e => {
                                    console.log('error saving order', e);
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

                if (!props.dispatchOpenedPanels.includes('carrier-info-search')) {
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'carrier-info-search'])
                }
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

    const validateCarrierDriverForSaving = async (e) => {
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

                await setPopupItems(items);

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

                await setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 13) {
            await popupItems.map(async (item, index) => {
                if (item.selected) {
                    await props.setSelectedDispatchCarrierInfoDriver(item);
                }

                return true;
            });

            setPopupItems([]);
        }

        if (key === 9) {
            if (popupItems.length === 0) {
                if ((props.selectedDispatchCarrierInfoDriver.id || 0) === 0) {
                    await props.setSelectedDispatchCarrierInfoDriver({});
                } else {
                    // validateDriverForSaving(e);
                }
            } else {
                popupItems.map(async (item, index) => {
                    if (item.selected) {
                        await props.setSelectedDispatchCarrierInfoDriver(item);
                    }

                    return true;
                });

                // validateDriverForSaving(e);
                await setPopupItems([]);
            }
        }

        if (key === 9) {
            let driver = { ...props.selectedDispatchCarrierInfoDriver, id: (props.selectedDispatchCarrierInfoDriver?.id || 0), carrier_id: props.selectedDispatchCarrierInfoCarrier?.id };

            if (popupItems.length === 0) {
                if ((props.selectedDispatchCarrierInfoDriver.id || 0) === 0) {
                    await props.setSelectedDispatchCarrierInfoDriver({});
                } else {
                    if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                        if ((driver.first_name || '').trim() !== '') {
                            if (!isSavingCarrierDriver) {
                                setIsSavingCarrierDriver(true);

                                $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                                    if (res.result === 'OK') {
                                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.drivers });
                                        await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, id: res.driver.id });
                                    }

                                    await setIsSavingCarrierDriver(false);
                                    await setPopupItems([]);
                                });
                            }
                        }
                    }
                }
            } else {
                popupItems.map(async (item, index) => {
                    if (item.selected) {
                        driver = item;
                        await props.setSelectedDispatchCarrierInfoDriver(item);
                    }

                    return true;
                });

                if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
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
                await setPopupItems([]);
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
            selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
            selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

            if ((selected_order.ae_number || '') === '') {
                selected_order.ae_number = getRandomInt(1, 100);
            }

            selected_order.pickups = (selected_order.pickups || []).map((pu, i) => {
                let extra_data = pu.extra_data || {};
                extra_data.pu_date1 = getFormattedDates(extra_data?.pu_date1 || '');
                extra_data.pu_date2 = getFormattedDates(extra_data?.pu_date2 || '');
                extra_data.pu_time1 = getFormattedHours(extra_data?.pu_time1 || '');
                extra_data.pu_time2 = getFormattedHours(extra_data?.pu_time2 || '');
                pu.extra_data = extra_data;
                return pu;
            });

            selected_order.deliveries = (selected_order.deliveries || []).map((delivery, i) => {
                let extra_data = delivery.extra_data || {};
                extra_data.delivery_date1 = getFormattedDates(extra_data?.delivery_date1 || '');
                extra_data.delivery_date2 = getFormattedDates(extra_data?.delivery_date2 || '');
                extra_data.delivery_time1 = getFormattedHours(extra_data?.delivery_time1 || '');
                extra_data.delivery_time2 = getFormattedHours(extra_data?.delivery_time2 || '');
                delivery.extra_data = extra_data;
                return delivery;
            });

            if (!isSavingOrder) {
                setIsSavingOrder(true);
                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                    console.log(res);
                    if (res.result === 'OK') {
                        await props.setSelectedOrder(res.order);
                    }

                    setIsSavingOrder(false);
                }).catch(e => {
                    console.log('error saving order', e);
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

                        await props.setSelectedShipperCompanyInfo(res.order.pickups.length > 0 ? res.order.pickups[0] : {});

                        if (res.order.pickups.length > 0) {
                            (res.order.pickups[0].contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedShipperCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedConsigneeCompanyInfo(res.order.deliveries.length > 0 ? res.order.deliveries[0] : {});

                        if (res.order.deliveries.length > 0) {
                            (res.order.deliveries[0].contacts || []).map(async (contact, index) => {
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

                        await props.setSelectedShipperCompanyInfo(res.order.pickups.length > 0 ? res.order.pickups[0] : {});

                        if (res.order.pickups.length > 0) {
                            (res.order.pickups[0].contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedShipperCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedConsigneeCompanyInfo(res.order.deliveries.length > 0 ? res.order.deliveries[0] : {});

                        if (res.order.deliveries.length > 0) {
                            (res.order.deliveries[0].contacts || []).map(async (contact, index) => {
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

    const bolNumbersOnKeydown = async (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.bol_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperBolNumber('');
            refBolNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
        if (keyCode === 9) {
            if (props.shipperBolNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.bol_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperBolNumber('');
            refBolNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
    }

    const poNumbersOnKeydown = async (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.po_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.po_numbers || '') + ' ' + props.shipperPoNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperPoNumber('');
            refPoNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
        if (keyCode === 9) {
            if (props.shipperPoNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.po_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.po_numbers || '') + ' ' + props.shipperPoNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperPoNumber('');
            refPoNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
    }

    const refNumbersOnKeydown = async (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.ref_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperRefNumber('');
            refRefNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
        if (keyCode === 9) {
            if (props.shipperRefNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
            extra_data.ref_numbers = ((props.selectedShipperCompanyInfo?.extra_data?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim();
            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.id) {
                    pu.extra_data = extra_data;
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperRefNumber('');
            refRefNumbers.current.focus();

            validateOrderForSaving({ keyCode: 9 });
        }
    }

    const calculateMileage = (routing) => {

        if (routing.length >= 2) {

        }

        return 0;

    }

    const printWindow = (data) => {
        let mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="../../css/index.css" type="text/css" media="all" />');
        mywindow.document.write('<style>@media print {@page {margin: 0;}body {margin:0;padding: 15mm 10mm;}}</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        setTimeout(function () { mywindow.print(); }, 1000);

        return true;
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
                                            delayTimer = window.setTimeout(async () => {
                                                await setPopupActiveInput('division');

                                                $.post(props.serverUrl + '/getDivisions').then(async res => {
                                                    const input = refDivision.current.getBoundingClientRect();
                                                    setPopupPosition(input);

                                                    if (res.result === 'OK') {
                                                        if (res.divisions.length > 0) {
                                                            let items = [];
                                                            let matched = false;

                                                            items = res.divisions.map((division, i) => {
                                                                if (division.name === props.division?.name) {
                                                                    division.selected = true;
                                                                    matched = true;
                                                                } else {
                                                                    division.selected = false;
                                                                }

                                                                return division;
                                                            });

                                                            if (!matched) {
                                                                items = res.divisions.map((division, i) => {
                                                                    division.selected = i === 0;
                                                                    return division;
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
                                                });

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
                                            delayTimer = window.setTimeout(async () => {
                                                await setPopupActiveInput('load-type');

                                                $.post(props.serverUrl + '/getLoadTypes').then(async res => {
                                                    const input = refLoadTypes.current.getBoundingClientRect();
                                                    setPopupPosition(input);

                                                    if (res.result === 'OK') {
                                                        if (res.load_types.length > 0) {
                                                            let items = [];
                                                            let matched = false;

                                                            items = res.load_types.map((load_type, i) => {
                                                                if (load_type.name === props.load_type?.name) {
                                                                    load_type.selected = true;
                                                                    matched = true;
                                                                } else {
                                                                    load_type.selected = false;
                                                                }

                                                                return load_type;
                                                            });

                                                            if (!matched) {
                                                                items = res.load_types.map((load_type, i) => {
                                                                    load_type.selected = i === 0;
                                                                    return load_type;
                                                                });
                                                            }

                                                            await setPopupItems(items);

                                                            popupItemsRef.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView()
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                    }
                                                });
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
                                            delayTimer = window.setTimeout(async () => {
                                                await setPopupActiveInput('template');

                                                $.post(props.serverUrl + '/getTemplates').then(async res => {
                                                    const input = refTemplates.current.getBoundingClientRect();
                                                    setPopupPosition(input);

                                                    if (res.result === 'OK') {
                                                        if (res.templates.length > 0) {
                                                            let items = [];
                                                            let matched = false;

                                                            items = res.templates.map((template, i) => {
                                                                if (template.name === props.template?.name) {
                                                                    template.selected = true;
                                                                    matched = true;
                                                                } else {
                                                                    template.selected = false;
                                                                }

                                                                return template;
                                                            });

                                                            if (!matched) {
                                                                items = res.templates.map((template, i) => {
                                                                    template.selected = i === 0;
                                                                    return template;
                                                                });
                                                            }

                                                            await setPopupItems(items);

                                                            popupItemsRef.current.map((r, i) => {
                                                                if (r && r.classList.contains('selected')) {
                                                                    r.scrollIntoView()
                                                                }
                                                                return true;
                                                            });
                                                        }
                                                    }
                                                });
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

                                        if (!props.dispatchOpenedPanels.includes('bill-to-company-info')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'bill-to-company-info']);
                                        }
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Company info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        if (!props.dispatchOpenedPanels.includes('rating-screen')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rating-screen'])
                                        }
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

                                        if (!props.dispatchOpenedPanels.includes('carrier-info')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'carrier-info'])
                                        }
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
                                        readOnly={true}
                                        // onInput={(e) => {
                                        //     props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                        // }}
                                        // onChange={(e) => {
                                        //     props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                        // }}
                                        value={
                                            ((props.selected_order?.carrier || {}).id !== undefined && (props.selected_order.pickups || []).length > 0 && (props.selected_order.deliveries || []).length > 0)
                                                ? props.selected_order.pickups[0].city + ', ' + props.selected_order.pickups[0].state +
                                                ' - ' + props.selected_order.deliveries[props.selected_order.deliveries.length - 1].city + ', ' + props.selected_order.deliveries[props.selected_order.deliveries.length - 1].state
                                                : ''
                                        }
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
                                        delayTimer = window.setTimeout(() => {
                                            setPopupActiveInput('equipment');
                                            $.post(props.serverUrl + '/getEquipments', {
                                                name: ""
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
                                                        let items = [];
                                                        let matched = false;

                                                        items = res.equipments.map((equipment, i) => {
                                                            if (equipment.name === props.selectedDispatchCarrierInfoDriver.equipment?.name) {
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

                                                refCarrierEquipment.current.focus();
                                            });
                                        }, 300);
                                    }}></span>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow" style={{ position: 'relative' }}>
                                    <input tabIndex={57 + props.tabTimes} type="text" placeholder="Driver Name"
                                        ref={refDriverName}
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
                                            delayTimer = window.setTimeout(async () => {
                                                await setPopupActiveInput('driver-name');

                                                const input = refDriverName.current.getBoundingClientRect();

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

                                                let items = [];
                                                let matched = false;

                                                items = props.selectedDispatchCarrierInfoCarrier.drivers.map((driver, i) => {
                                                    if (((driver.first_name || '') + ((driver.last_name || '').trim() === '' ? '' : ' ' + driver.last_name))
                                                        === ((props.selectedDispatchCarrierInfoDriver?.first_name || '') + ((props.selectedDispatchCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedDispatchCarrierInfoDriver?.last_name))) {
                                                        driver.selected = true;
                                                        matched = true;
                                                    } else {
                                                        driver.selected = false;
                                                    }

                                                    driver.name = ((driver.first_name || '') + ((driver.last_name || '').trim() === '' ? '' : ' ' + driver.last_name));

                                                    return driver;
                                                });

                                                if (!matched) {
                                                    items = props.selectedDispatchCarrierInfoCarrier.drivers.map((driver, i) => {
                                                        driver.selected = i === 0;
                                                        return driver;
                                                    });
                                                }

                                                await setPopupItems(items);

                                                popupItemsRef.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView()
                                                    }
                                                    return true;
                                                });

                                                refDriverName.current.focus();
                                            }, 300);
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
                                    <input tabIndex={59 + props.tabTimes} type="text" placeholder="Unit Number"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, truck: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, truck: e.target.value }) }}
                                        value={props.selectedDispatchCarrierInfoDriver.truck || ''}
                                    />
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
                                <div className='mochi-button' style={{ fontSize: '1rem' }} onClick={() => {
                                    if (!props.dispatchOpenedPanels.includes('rate-conf')) {
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rate-conf'])
                                    }
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Rate Confirmation</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }} onClick={() => {
                                    if (!props.dispatchOpenedPanels.includes('adjust-rate')) {
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'adjust-rate'])
                                    }
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Adjust Rate</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }} onClick={(e) => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must create or load an order first!');
                                        return;
                                    }

                                    if ((props.selected_order?.carrier?.id || 0) === 0) {
                                        window.alert('You must select a carrier first!');
                                        return;
                                    }

                                    props.setShowingChangeCarrier(true);
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Change Carrier</div>
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
                                            let selected_order = { ...props.selected_order };
                                            selected_order.haz_mat = e.target.checked ? 1 : 0;

                                            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                if (res.result === 'OK') {
                                                    await props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        haz_mat: e.target.checked ? 1 : 0
                                                    });
                                                }
                                            }).catch(e => {
                                                console.log('error saving haz mat', e);
                                            });
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
                                            let selected_order = { ...props.selected_order };
                                            selected_order.expedited = e.target.checked ? 1 : 0;

                                            $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                if (res.result === 'OK') {
                                                    await props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        expedited: e.target.checked ? 1 : 0
                                                    });
                                                }
                                            }).catch(e => {
                                                console.log('error saving expedited', e);
                                            });
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
                        if (!props.dispatchOpenedPanels.includes('rate-conf')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rate-conf'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Rate Conf</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if (!props.dispatchOpenedPanels.includes('order')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'order'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Print Order</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if (!props.dispatchOpenedPanels.includes('bol')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'bol'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Print BOL</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if ((props.selected_order?.id || 0) === 0) {
                            window.alert('You must create or load an order first!');
                            return;
                        }

                        props.setSelectedOrderDocument({
                            id: 0,
                            user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                            date_entered: moment().format('MM/DD/YYYY')
                        });

                        if (!props.dispatchOpenedPanels.includes('order-documents')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'order-documents'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Documents</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={async () => {
                        await props.setLbSelectedOrder({});

                        if (!props.dispatchOpenedPanels.includes('load-board')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'load-board'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Load Board</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if (!props.dispatchOpenedPanels.includes('rating-screen')) {
                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rating-screen'])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Rate Load</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                </div>
            </div>

            <div className="fields-container-row" style={{ display: 'flex', alignSelf: 'flex-start', minWidth: '70%', maxWidth: '69%', alignItems: 'center' }}>
                <div className="pickups-container" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="swiper-pickup-prev-btn"><span className="fas fa-chevron-left"></span></div>

                    <Swiper
                        slidesPerView={5}
                        navigation={{
                            prevEl: ".swiper-pickup-prev-btn",
                            nextEl: ".swiper-pickup-next-btn"
                        }}
                    >
                        {
                            (props.selected_order?.pickups || []).length > 0
                                ? (props.selected_order?.pickups || []).map((pickup, index) => {
                                    let fulDateTime1 = (pickup.extra_data?.pu_date1 || '') + ' ' + (pickup.extra_data?.pu_time1 || '');
                                    let fulDateTime2 = (pickup.extra_data?.pu_date2 || '') + ' ' + (pickup.extra_data?.pu_time2 || '');
                                    let puDateTime = undefined;
                                    let statusClass = 'active';
                                    let curDateTime = currentSystemDateTime;

                                    if (moment(fulDateTime2, 'MM/DD/YYYY HHmm').format('MM/DD/YYYY HHmm') === fulDateTime2) {
                                        puDateTime = moment(fulDateTime2, 'MM/DD/YYYY HHmm');
                                    } else if (moment(fulDateTime1, 'MM/DD/YYYY HHmm').format('MM/DD/YYYY HHmm') === fulDateTime1) {
                                        puDateTime = moment(fulDateTime1, 'MM/DD/YYYY HHmm');
                                    }

                                    if (puDateTime !== undefined) {
                                        let pastHour = puDateTime.clone().subtract(1, 'hours');

                                        if ((props.selected_order?.events || []).length > 0) {
                                            props.selected_order.events.map(item => {
                                                if (item.event_type === 'loaded' && item.shipper_id === pickup.id) {
                                                    curDateTime = moment(item.event_date + ' ' + item.event_time, 'MM/DD/YYYY HHmm');
                                                }
                                                return true;
                                            })
                                        }

                                        if (curDateTime < pastHour) {
                                            statusClass = 'active';
                                        } else if (curDateTime >= pastHour && curDateTime <= puDateTime) {
                                            statusClass = 'warning';
                                        } else {
                                            statusClass = 'expired';
                                        }
                                    }

                                    let classes = classnames({
                                        'order-pickup': true,
                                        'selected': props.selectedShipperCompanyInfo?.id === pickup.id,
                                        'active': true,
                                        'warning': statusClass === 'warning',
                                        'expired': statusClass === 'expired'
                                    })

                                    return (
                                        <SwiperSlide className={classes} key={index} onClick={() => {
                                            props.setSelectedShipperCompanyInfo(pickup);

                                            (pickup.contacts || []).map((contact, index) => {
                                                if (contact.is_primary === 1) {
                                                    props.setSelectedShipperCompanyContact(contact);
                                                }

                                                return true;
                                            })
                                        }}>
                                            <div>PU {index + 1}</div>
                                            <div className="pu-remove-btn" title="Remove this pickup" onClick={async (e) => {
                                                e.stopPropagation();

                                                let pickups = (props.selected_order?.pickups || []).filter((pu, i) => {
                                                    return pu.id !== pickup.id;
                                                });

                                                let routing = [];

                                                if (pickups.length === 1 && (props.selected_order?.deliveries || []).length === 1) {
                                                    routing = [
                                                        { ...pickups[0], extra_data: { type: 'pickup' } },
                                                        { ...props.selected_order?.deliveries[0], extra_data: { type: 'delivery' } }
                                                    ]
                                                } else {
                                                    routing = (props.selected_order?.routing || []).filter((r, i) => {
                                                        return !(r.id === pickup.id && r.extra_data.type === 'pickup')
                                                    })
                                                }

                                                let selected_order = { ...props.selected_order } || { order_number: 0 };
                                                selected_order.pickups = pickups;
                                                selected_order.routing = routing;
                                                await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                // check if there's a bill-to-company loaded
                                                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                                                    return;
                                                }

                                                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                                                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                                                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                                                if ((selected_order.ae_number || '') === '') {
                                                    selected_order.ae_number = getRandomInt(1, 100);
                                                }

                                                if (!isSavingOrder) {
                                                    setIsSavingOrder(true);

                                                    if (routing.length >= 2) {

                                                        props.setMileageLoaderVisible(true);
                                                        let params = {
                                                            mode: 'fastest;car;traffic:disabled',
                                                            routeAttributes: 'summary'
                                                        }


                                                        let waypointCount = 0;

                                                        routing.map((item, i) => {
                                                            if (item.zip_data) {
                                                                params['waypoint' + waypointCount] = 'geo!' + item.zip_data.latitude.toString() + ',' + item.zip_data.longitude.toString();
                                                                waypointCount += 1;
                                                            }

                                                            return true;
                                                        });

                                                        routingService.calculateRoute(params,
                                                            (result) => {
                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                selected_order.miles = miles;

                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        await props.setSelectedOrder(res.order);

                                                                        if (res.order.pickups.length === 0) {
                                                                            props.setSelectedShipperCompanyInfo({});
                                                                            props.setSelectedShipperCompanyContact({});
                                                                        } else {
                                                                            let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                                return pu.id === props.selectedShipperCompanyInfo.id;
                                                                            });

                                                                            if (filteredPickups.length === 0) {
                                                                                let lastPu = res.order.pickups[0];
                                                                                props.setSelectedShipperCompanyInfo(lastPu);

                                                                                if (lastPu.contacts.length > 0) {
                                                                                    (lastPu.contacts || []).map((contact, i) => {
                                                                                        if (contact.is_primary === 1) {
                                                                                            props.setSelectedShipperCompanyContact(contact);
                                                                                        }
                                                                                        return true;
                                                                                    })
                                                                                } else {
                                                                                    props.setSelectedShipperCompanyContact({});
                                                                                }
                                                                            }
                                                                        }
                                                                        props.setMileageLoaderVisible(false);
                                                                        setIsSavingOrder(false);
                                                                    }
                                                                }).catch(e => {
                                                                    console.log(e);
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                });
                                                            },
                                                            (error) => {
                                                                console.log('error getting mileage', error);

                                                                selected_order.miles = 0;

                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        await props.setSelectedOrder(res.order);

                                                                        if (res.order.pickups.length === 0) {
                                                                            props.setSelectedShipperCompanyInfo({});
                                                                            props.setSelectedShipperCompanyContact({});
                                                                        } else {
                                                                            let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                                return pu.id === props.selectedShipperCompanyInfo.id;
                                                                            });

                                                                            if (filteredPickups.length === 0) {
                                                                                let lastPu = res.order.pickups[0];
                                                                                props.setSelectedShipperCompanyInfo(lastPu);

                                                                                if (lastPu.contacts.length > 0) {
                                                                                    (lastPu.contacts || []).map((contact, i) => {
                                                                                        if (contact.is_primary === 1) {
                                                                                            props.setSelectedShipperCompanyContact(contact);
                                                                                        }
                                                                                        return true;
                                                                                    })
                                                                                } else {
                                                                                    props.setSelectedShipperCompanyContact({});
                                                                                }
                                                                            }
                                                                        }
                                                                        props.setMileageLoaderVisible(false);
                                                                        setIsSavingOrder(false);
                                                                    }
                                                                }).catch(e => {
                                                                    console.log(e);
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                });
                                                            })
                                                    } else {
                                                        selected_order.miles = 0;

                                                        $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                            if (res.result === 'OK') {
                                                                await props.setSelectedOrder(res.order);

                                                                if (res.order.pickups.length === 0) {
                                                                    props.setSelectedShipperCompanyInfo({});
                                                                    props.setSelectedShipperCompanyContact({});
                                                                } else {
                                                                    let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                        return pu.id === props.selectedShipperCompanyInfo.id;
                                                                    });

                                                                    if (filteredPickups.length === 0) {
                                                                        let lastPu = res.order.pickups[0];
                                                                        props.setSelectedShipperCompanyInfo(lastPu);

                                                                        if (lastPu.contacts.length > 0) {
                                                                            (lastPu.contacts || []).map((contact, i) => {
                                                                                if (contact.is_primary === 1) {
                                                                                    props.setSelectedShipperCompanyContact(contact);
                                                                                }
                                                                                return true;
                                                                            })
                                                                        } else {
                                                                            props.setSelectedShipperCompanyContact({});
                                                                        }
                                                                    }
                                                                }
                                                                props.setMileageLoaderVisible(false);
                                                                setIsSavingOrder(false);
                                                            }
                                                        }).catch(e => {
                                                            console.log(e);
                                                            props.setMileageLoaderVisible(false);
                                                            setIsSavingOrder(false);
                                                        });
                                                    }
                                                }
                                            }}>
                                                <span className="fas fa-times"></span>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                : ''
                        }

                        {
                            (props.selected_order?.pickups || []).filter((pu, i) => {
                                return pu.id === 0;
                            }).length === 0
                            && <SwiperSlide className="order-pickup adding" title="Add new pickup" onClick={() => {
                                // if ((props.selected_order?.id || 0) === 0) {
                                //     window.alert('You must create or load an order first!');
                                //     props.setSelectedShipperCompanyInfo({});
                                //     props.setSelectedShipperCompanyContact({});
                                //     return;
                                // }

                                let pickups = props.selected_order?.pickups || [];
                                pickups.push({ id: 0 });
                                props.setSelectedShipperCompanyInfo({ id: 0 });
                                props.setSelectedShipperCompanyContact({});
                                props.setSelectedOrder({ ...props.selected_order, pickups: pickups })
                            }}>
                                <div><span className="fas fa-plus"></span></div>
                            </SwiperSlide>
                        }
                    </Swiper>

                    <div className="swiper-pickup-next-btn"><span className="fas fa-chevron-right"></span></div>
                </div>

                <div className="form-h-sep"></div>
                <div className='mochi-button' onClick={() => {
                    if ((props.selected_order?.id || 0) === 0) {
                        window.alert('You must create or load an order first!');
                        return;
                    }

                    if (!props.dispatchOpenedPanels.includes('routing')) {
                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'routing']);
                    };
                }}>
                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                    <div className='mochi-button-base'>Routing</div>
                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                </div>
                <div className="form-h-sep"></div>
                <div className="deliveries-container" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="swiper-delivery-prev-btn"><span className="fas fa-chevron-left"></span></div>

                    <Swiper
                        slidesPerView={5}
                        navigation={{
                            prevEl: ".swiper-delivery-prev-btn",
                            nextEl: ".swiper-delivery-next-btn"
                        }}
                    >
                        {
                            (props.selected_order?.deliveries || []).length > 0
                                ? (props.selected_order?.deliveries || []).map((delivery, index) => {
                                    let fulDateTime1 = (delivery.extra_data?.delivery_date1 || '') + ' ' + (delivery.extra_data?.delivery_time1 || '');
                                    let fulDateTime2 = (delivery.extra_data?.delivery_date2 || '') + ' ' + (delivery.extra_data?.delivery_time2 || '');
                                    let deliveryDateTime = undefined;
                                    let statusClass = 'active';
                                    let curDateTime = currentSystemDateTime;

                                    if (moment(fulDateTime2, 'MM/DD/YYYY HHmm').format('MM/DD/YYYY HHmm') === fulDateTime2) {
                                        deliveryDateTime = moment(fulDateTime2, 'MM/DD/YYYY HHmm');
                                    } else if (moment(fulDateTime1, 'MM/DD/YYYY HHmm').format('MM/DD/YYYY HHmm') === fulDateTime1) {
                                        deliveryDateTime = moment(fulDateTime1, 'MM/DD/YYYY HHmm');
                                    }

                                    if (deliveryDateTime !== undefined) {
                                        let pastHour = deliveryDateTime.clone().subtract(1, 'hours');

                                        if ((props.selected_order?.events || []).length > 0) {
                                            props.selected_order.events.map(item => {
                                                if (item.event_type === 'delivered' && item.consignee_id === delivery.id) {
                                                    curDateTime = moment(item.event_date + ' ' + item.event_time, 'MM/DD/YYYY HHmm');
                                                }
                                                return true;
                                            })
                                        }

                                        if (curDateTime < pastHour) {
                                            statusClass = 'active';
                                        } else if (curDateTime >= pastHour && curDateTime <= deliveryDateTime) {
                                            statusClass = 'warning';
                                        } else {
                                            statusClass = 'expired';
                                        }
                                    }

                                    let classes = classnames({
                                        'order-delivery': true,
                                        'selected': props.selectedConsigneeCompanyInfo?.id === delivery.id,
                                        'active': true,
                                        'warning': statusClass === 'warning',
                                        'expired': statusClass === 'expired'
                                    })

                                    return (
                                        <SwiperSlide className={classes} key={index} onClick={() => {
                                            props.setSelectedConsigneeCompanyInfo(delivery);

                                            (delivery.contacts || []).map((contact, index) => {
                                                if (contact.is_primary === 1) {
                                                    props.setSelectedConsigneeCompanyContact(contact);
                                                }

                                                return true;
                                            })
                                        }}>
                                            <div>Delivery {index + 1}</div>
                                            <div className="delivery-remove-btn" title="Remove this delivery" onClick={async (e) => {
                                                e.stopPropagation();

                                                let deliveries = (props.selected_order?.deliveries || []).filter((d, i) => {
                                                    return d.id !== delivery.id;
                                                });

                                                let routing = [];

                                                if (deliveries.length === 1 && (props.selected_order?.pickups || []).length === 1) {
                                                    routing = [
                                                        { ...props.selected_order?.deliveries[0], extra_data: { type: 'pickup' } },
                                                        { ...deliveries[0], extra_data: { type: 'delivery' } }
                                                    ]
                                                } else {
                                                    routing = (props.selected_order?.routing || []).filter((r, i) => {
                                                        return !(r.id === delivery.id && r.extra_data.type === 'delivery')
                                                    })
                                                }

                                                let selected_order = { ...props.selected_order } || { order_number: 0 };
                                                selected_order.deliveries = deliveries;
                                                selected_order.routing = routing;
                                                await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });


                                                // check if there's a bill-to-company loaded
                                                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                                                    return;
                                                }

                                                selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0);
                                                selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0);
                                                selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0);

                                                if ((selected_order.ae_number || '') === '') {
                                                    selected_order.ae_number = getRandomInt(1, 100);
                                                }

                                                if (!isSavingOrder) {
                                                    setIsSavingOrder(true);

                                                    if (routing.length >= 2) {

                                                        props.setMileageLoaderVisible(true);
                                                        let params = {
                                                            mode: 'fastest;car;traffic:disabled',
                                                            routeAttributes: 'summary'
                                                        }

                                                        let waypointCount = 0;

                                                        routing.map((item, i) => {
                                                            if (item.zip_data) {
                                                                params['waypoint' + waypointCount] = 'geo!' + item.zip_data.latitude.toString() + ',' + item.zip_data.longitude.toString();
                                                                waypointCount += 1;
                                                            }

                                                            return true;
                                                        });

                                                        routingService.calculateRoute(params,
                                                            (result) => {
                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                selected_order.miles = miles;

                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        await props.setSelectedOrder(res.order);

                                                                        if (res.order.deliveries.length === 0) {
                                                                            props.setSelectedConsigneeCompanyInfo({});
                                                                            props.setSelectedConsigneeCompanyContact({});
                                                                        } else {
                                                                            let filteredPickups = res.order.deliveries.filter((delivery, i) => {
                                                                                return delivery.id === props.selectedConsigneeCompanyInfo.id;
                                                                            });

                                                                            if (filteredPickups.length === 0) {
                                                                                let lastDelivery = res.order.deliveries[0];
                                                                                props.setSelectedConsigneeCompanyInfo(lastDelivery);

                                                                                if (lastDelivery.contacts.length > 0) {
                                                                                    (lastDelivery.contacts || []).map((contact, i) => {
                                                                                        if (contact.is_primary === 1) {
                                                                                            props.setSelectedConsigneeCompanyContact(contact);
                                                                                        }
                                                                                        return true;
                                                                                    })
                                                                                } else {
                                                                                    props.setSelectedConsigneeCompanyContact({});
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                }).catch(e => {
                                                                    console.log(e);
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                });
                                                            },
                                                            (error) => {
                                                                console.log('error getting mileage', error);

                                                                selected_order.miles = 0;

                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        await props.setSelectedOrder(res.order);

                                                                        if (res.order.deliveries.length === 0) {
                                                                            props.setSelectedConsigneeCompanyInfo({});
                                                                            props.setSelectedConsigneeCompanyContact({});
                                                                        } else {
                                                                            let filteredPickups = res.order.deliveries.filter((delivery, i) => {
                                                                                return delivery.id === props.selectedConsigneeCompanyInfo.id;
                                                                            });

                                                                            if (filteredPickups.length === 0) {
                                                                                let lastDelivery = res.order.deliveries[0];
                                                                                props.setSelectedConsigneeCompanyInfo(lastDelivery);

                                                                                if (lastDelivery.contacts.length > 0) {
                                                                                    (lastDelivery.contacts || []).map((contact, i) => {
                                                                                        if (contact.is_primary === 1) {
                                                                                            props.setSelectedConsigneeCompanyContact(contact);
                                                                                        }
                                                                                        return true;
                                                                                    })
                                                                                } else {
                                                                                    props.setSelectedConsigneeCompanyContact({});
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                }).catch(e => {
                                                                    console.log(e);
                                                                    props.setMileageLoaderVisible(false);
                                                                    setIsSavingOrder(false);
                                                                });
                                                            })

                                                    } else {
                                                        selected_order.miles = 0;

                                                        $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                            if (res.result === 'OK') {
                                                                await props.setSelectedOrder(res.order);

                                                                if (res.order.deliveries.length === 0) {
                                                                    props.setSelectedConsigneeCompanyInfo({});
                                                                    props.setSelectedConsigneeCompanyContact({});
                                                                } else {
                                                                    let filteredPickups = res.order.deliveries.filter((delivery, i) => {
                                                                        return delivery.id === props.selectedConsigneeCompanyInfo.id;
                                                                    });

                                                                    if (filteredPickups.length === 0) {
                                                                        let lastDelivery = res.order.deliveries[0];
                                                                        props.setSelectedConsigneeCompanyInfo(lastDelivery);

                                                                        if (lastDelivery.contacts.length > 0) {
                                                                            (lastDelivery.contacts || []).map((contact, i) => {
                                                                                if (contact.is_primary === 1) {
                                                                                    props.setSelectedConsigneeCompanyContact(contact);
                                                                                }
                                                                                return true;
                                                                            })
                                                                        } else {
                                                                            props.setSelectedConsigneeCompanyContact({});
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            props.setMileageLoaderVisible(false);
                                                            setIsSavingOrder(false);
                                                        }).catch(e => {
                                                            console.log(e);
                                                            props.setMileageLoaderVisible(false);
                                                            setIsSavingOrder(false);
                                                        });
                                                    }

                                                }
                                            }}>
                                                <span className="fas fa-times"></span>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                : ''
                        }

                        {
                            (props.selected_order?.deliveries || []).filter((delivery, i) => {
                                return delivery.id === 0;
                            }).length === 0
                            && <SwiperSlide className="order-delivery adding" title="Add new delivery" onClick={() => {
                                if ((props.selected_order?.id || 0) === 0) {
                                    window.alert('You must create or load an order first!');
                                    props.setSelectedConsigneeCompanyInfo({});
                                    props.setSelectedConsigneeCompanyContact({});
                                    return;
                                }

                                let deliveries = props.selected_order?.deliveries || [];
                                deliveries.push({ id: 0 });
                                props.setSelectedConsigneeCompanyInfo({ id: 0 });
                                props.setSelectedConsigneeCompanyContact({});
                                props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries })
                            }}>
                                <div><span className="fas fa-plus"></span></div>
                            </SwiperSlide>
                        }
                    </Swiper>

                    <div className="swiper-delivery-next-btn"><span className="fas fa-chevron-right"></span></div>
                </div>
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

                                        if (!props.dispatchOpenedPanels.includes('shipper-company-info')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'shipper-company-info'])
                                        }
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
                                                    ref={refPickupDate1}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={false}
                                                    type="text" placeholder="PU Date 1"
                                                    onKeyDown={async (e) => {
                                                        e.stopPropagation();
                                                        let key = e.keyCode || e.which;
                                                        await setPuDate1KeyCode(key);

                                                        let puDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedPickupDate1(puDate1);
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};

                                                        if (key === 13) {
                                                            extra_data.pu_date1 = preSelectedPickupDate1.clone().format('MM/DD/YYYY');

                                                            await setIsPickupDate1CalendarShown(false);
                                                            await setIsPickupDate2CalendarShown(false);
                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                        }

                                                        if (key >= 37 && key <= 40) {
                                                            if (isPickupDate1CalendarShown) {
                                                                e.preventDefault();

                                                                if (key === 37) { // left - minus 1
                                                                    setPreSelectedPickupDate1(preSelectedPickupDate1.clone().subtract(1, 'day'));
                                                                }

                                                                if (key === 38) { // up - minus 7
                                                                    setPreSelectedPickupDate1(preSelectedPickupDate1.clone().subtract(7, 'day'));
                                                                }

                                                                if (key === 39) { // right - plus 1
                                                                    setPreSelectedPickupDate1(preSelectedPickupDate1.clone().add(1, 'day'));
                                                                }

                                                                if (key === 40) { // down - plus 7
                                                                    setPreSelectedPickupDate1(preSelectedPickupDate1.clone().add(7, 'day'));
                                                                }

                                                                await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                    if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                        pu.extra_data = extra_data;
                                                                    }
                                                                    return pu;
                                                                });

                                                                await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                await validateOrderForSaving({ keyCode: 9 });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puDate1KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);
                                                            await props.setShipperPuDate1(formatted);
                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                            extra_data.pu_date1 = formatted;
                                                            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                    pu.extra_data = extra_data;
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_date1 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_date1 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || ''}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={async (e) => {
                                                    await setIsPickupDate2CalendarShown(false);
                                                    await setIsDeliveryDate1CalendarShown(false);
                                                    await setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || '').trim()) {
                                                        setPreSelectedPickupDate1(moment(props.selectedShipperCompanyInfo?.extra_data?.pu_date1, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedPickupDate1(moment());
                                                    }

                                                    e.stopPropagation();
                                                    const input = refPickupDate1.current.inputElement.getBoundingClientRect();

                                                    let popup = refCalendarPickupDate1.current;

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
                                                        popup && (popup.style.left = (input.left) + 'px');
                                                    }

                                                    if (input.left > (screenWSection * 2)) {
                                                        popup && popup.childNodes[0].classList.add('left');
                                                        popup && (popup.style.left = (input.left) + 'px');

                                                        if ((innerWidth - input.left) < 100) {
                                                            popup && popup.childNodes[0].classList.add('corner');
                                                            popup && (popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px');
                                                        }
                                                    }

                                                    await setIsPickupDate1CalendarShown(true)

                                                    refPickupDate1.current.inputElement.focus();
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={27 + props.tabTimes} type="text" placeholder="PU Time 1"
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setPuTime1KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puTime1KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);
                                                            await props.setShipperPuTime1(formatted);
                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                            extra_data.pu_time1 = formatted;
                                                            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                    pu.extra_data = extra_data;
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_time1 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_time1 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.pu_time1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={28 + props.tabTimes}
                                                    ref={refPickupDate2}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={false}
                                                    type="text" placeholder="PU Date 2"
                                                    onKeyDown={async (e) => {
                                                        e.stopPropagation();
                                                        let key = e.keyCode || e.which;
                                                        await setPuDate2KeyCode(key);

                                                        let puDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedPickupDate1(puDate2);
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};

                                                        if (key === 13) {
                                                            extra_data.pu_date2 = preSelectedPickupDate2.clone().format('MM/DD/YYYY');

                                                            await setIsPickupDate1CalendarShown(false);
                                                            await setIsPickupDate2CalendarShown(false);
                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                        }

                                                        if (key >= 37 && key <= 40) {
                                                            if (isPickupDate2CalendarShown) {
                                                                e.preventDefault();

                                                                if (key === 37) { // left - minus 1
                                                                    setPreSelectedPickupDate2(preSelectedPickupDate2.clone().subtract(1, 'day'));
                                                                }

                                                                if (key === 38) { // up - minus 7
                                                                    setPreSelectedPickupDate2(preSelectedPickupDate2.clone().subtract(7, 'day'));
                                                                }

                                                                if (key === 39) { // right - plus 1
                                                                    setPreSelectedPickupDate2(preSelectedPickupDate2.clone().add(1, 'day'));
                                                                }

                                                                if (key === 40) { // down - plus 7
                                                                    setPreSelectedPickupDate2(preSelectedPickupDate2.clone().add(7, 'day'));
                                                                }

                                                                await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                    if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                        pu.extra_data = extra_data;
                                                                    }
                                                                    return pu;
                                                                });

                                                                await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                await validateOrderForSaving({ keyCode: 9 });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puDate2KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);
                                                            await props.setShipperPuDate2(formatted);
                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                            extra_data.pu_date2 = formatted;
                                                            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                    pu.extra_data = extra_data;
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_date2 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_date2 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || ''}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsDeliveryDate1CalendarShown(false);
                                                    setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || '').trim()) {
                                                        setPreSelectedPickupDate2(moment(props.selectedShipperCompanyInfo?.extra_data?.pu_date2, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedPickupDate2(moment());
                                                    }

                                                    e.stopPropagation();
                                                    const input = refPickupDate2.current.inputElement.getBoundingClientRect();

                                                    let popup = refCalendarPickupDate2.current;

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
                                                        popup && (popup.style.left = (input.left) + 'px');

                                                        if (input.width < 70) {
                                                            popup && (popup.style.left = ((input.left) - 60 + (input.width / 2)) + 'px');

                                                            if (input.left < 30) {
                                                                popup && popup.childNodes[0].classList.add('corner');
                                                                popup && (popup.style.left = ((input.left) + (input.width / 2)) + 'px');
                                                            }
                                                        }
                                                    }

                                                    if (input.left <= (screenWSection * 2)) {
                                                        popup && (popup.style.left = (input.left) + 'px');
                                                    }

                                                    if (input.left > (screenWSection * 2)) {
                                                        popup && popup.childNodes[0].classList.add('left');
                                                        popup && (popup.style.left = (input.left) + 'px');

                                                        if ((innerWidth - input.left) < 100) {
                                                            popup && popup.childNodes[0].classList.add('corner');
                                                            popup && (popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px');
                                                        }
                                                    }

                                                    setIsPickupDate2CalendarShown(true)

                                                    refPickupDate2.current.inputElement.focus();
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={29 + props.tabTimes} type="text" placeholder="PU Time 2"
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setPuTime2KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puTime2KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);
                                                            await props.setShipperPuTime2(formatted);
                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                            extra_data.pu_time2 = formatted;
                                                            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                    pu.extra_data = extra_data;
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_time2 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.pu_time2 = e.target.value;
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.pu_time2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                {
                                                    (props.selectedShipperCompanyInfo?.extra_data?.bol_numbers || '').split(' ').map((item, index) => {
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
                                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                            extra_data.bol_numbers = (props.selectedShipperCompanyInfo?.extra_data?.bol_numbers || '').replace(item, '').trim()
                                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
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
                                                    (props.selectedShipperCompanyInfo?.extra_data?.po_numbers || '').split(' ').map((item, index) => {
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
                                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                            extra_data.po_numbers = (props.selectedShipperCompanyInfo?.extra_data?.po_numbers || '').replace(item, '').trim()
                                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
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
                                                    (props.selectedShipperCompanyInfo?.extra_data?.ref_numbers || '').split(' ').map((item, index) => {
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
                                                                            let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                            extra_data.ref_numbers = (props.selectedShipperCompanyInfo?.extra_data?.ref_numbers || '').replace(item, '').trim()
                                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
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
                                                    onInput={async (e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.seal_number = e.target.value

                                                        let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                            if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                pu.extra_data = extra_data;
                                                            }
                                                            return pu;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={async (e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.seal_number = e.target.value

                                                        let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                            if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                pu.extra_data = extra_data;
                                                            }
                                                            return pu;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.seal_number || ''}
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
                                                    onInput={async (e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.special_instructions = e.target.value

                                                        let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                            if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                pu.extra_data = extra_data;
                                                            }
                                                            return pu;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={async (e) => {
                                                        let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                        extra_data.special_instructions = e.target.value

                                                        let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                            if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                pu.extra_data = extra_data;
                                                            }
                                                            return pu;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.extra_data?.special_instructions || ''}
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

                                        if (!props.dispatchOpenedPanels.includes('consignee-company-info')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'consignee-company-info'])
                                        }
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
                                                    ref={refDeliveryDate1}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={false}
                                                    type="text" placeholder="Delivery Date 1"
                                                    onKeyDown={async (e) => {
                                                        e.stopPropagation();
                                                        let key = e.keyCode || e.which;
                                                        await setDeliveryDate1KeyCode(key);

                                                        let deliveryDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedDeliveryDate1(deliveryDate1);
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};

                                                        if (key === 13) {
                                                            extra_data.delivery_date1 = preSelectedDeliveryDate1.clone().format('MM/DD/YYYY');

                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                        }

                                                        if (key >= 37 && key <= 40) {
                                                            if (isDeliveryDate1CalendarShown) {
                                                                e.preventDefault();

                                                                if (key === 37) { // left - minus 1
                                                                    setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().subtract(1, 'day'));
                                                                }

                                                                if (key === 38) { // up - minus 7
                                                                    setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().subtract(7, 'day'));
                                                                }

                                                                if (key === 39) { // right - plus 1
                                                                    setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().add(1, 'day'));
                                                                }

                                                                if (key === 40) { // down - plus 7
                                                                    setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().add(7, 'day'));
                                                                }

                                                                await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                    if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                        delivery.extra_data = extra_data;
                                                                    }
                                                                    return delivery;
                                                                });

                                                                await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                await validateOrderForSaving({ keyCode: 9 });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryDate1KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);
                                                            await props.setConsigneeDeliveryDate1(formatted);
                                                            let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                            extra_data.delivery_date1 = formatted;
                                                            await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                    delivery.extra_data = extra_data;
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_date1 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_date1 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || ''}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsPickupDate2CalendarShown(false);
                                                    setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || '').trim()) {
                                                        setPreSelectedDeliveryDate1(moment(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedDeliveryDate1(moment());
                                                    }

                                                    e.stopPropagation();
                                                    const input = refDeliveryDate1.current.inputElement.getBoundingClientRect();

                                                    let popup = refCalendarDeliveryDate1.current;

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
                                                        popup && (popup.style.left = (input.left) + 'px');

                                                        if ((innerWidth - input.left) < 100) {
                                                            popup && popup.childNodes[0].classList.add('corner');
                                                            popup && (popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px');
                                                        }
                                                    }

                                                    setIsDeliveryDate1CalendarShown(true)

                                                    refDeliveryDate1.current.inputElement.focus();
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={46 + props.tabTimes} type="text" placeholder="Delivery Time 1"
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setDeliveryTime1KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryTime1KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);
                                                            await props.setConsigneeDeliveryTime1(formatted);
                                                            let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                            extra_data.delivery_time1 = formatted;
                                                            await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                    delivery.extra_data = extra_data;
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_time1 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_time1 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.extra_data?.delivery_time1 || ''}
                                                />
                                            </div>
                                            <div style={{ minWidth: '1.8rem', fontSize: '1rem', textAlign: 'center' }}>To</div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={47 + props.tabTimes}
                                                    ref={refDeliveryDate2}
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={false}
                                                    type="text" placeholder="Delivery Date 2"
                                                    onKeyDown={async (e) => {
                                                        e.stopPropagation();
                                                        let key = e.keyCode || e.which;
                                                        await setDeliveryDate2KeyCode(key);

                                                        let deliveryDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedDeliveryDate2(deliveryDate2);
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};

                                                        if (key === 13) {
                                                            extra_data.delivery_date2 = preSelectedDeliveryDate2.clone().format('MM/DD/YYYY');

                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                            await setIsDeliveryDate1CalendarShown(false);
                                                            await setIsDeliveryDate2CalendarShown(false);
                                                        }

                                                        if (key >= 37 && key <= 40) {
                                                            if (isDeliveryDate2CalendarShown) {
                                                                e.preventDefault();

                                                                if (key === 37) { // left - minus 1
                                                                    setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().subtract(1, 'day'));
                                                                }

                                                                if (key === 38) { // up - minus 7
                                                                    setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().subtract(7, 'day'));
                                                                }

                                                                if (key === 39) { // right - plus 1
                                                                    setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().add(1, 'day'));
                                                                }

                                                                if (key === 40) { // down - plus 7
                                                                    setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().add(7, 'day'));
                                                                }

                                                                await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                    if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                        delivery.extra_data = extra_data;
                                                                    }
                                                                    return delivery;
                                                                });

                                                                await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                await validateOrderForSaving({ keyCode: 9 });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryDate2KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);
                                                            await props.setConsigneeDeliveryDate2(formatted);
                                                            let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                            extra_data.delivery_date2 = formatted;
                                                            await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                    delivery.extra_data = extra_data;
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_date2 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_date2 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || ''}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsPickupDate2CalendarShown(false);
                                                    setIsDeliveryDate1CalendarShown(false);

                                                    if (moment((props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || '').trim()) {
                                                        setPreSelectedDeliveryDate2(moment(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedDeliveryDate2(moment());
                                                    }

                                                    e.stopPropagation();
                                                    const input = refDeliveryDate2.current.inputElement.getBoundingClientRect();

                                                    let popup = refCalendarDeliveryDate2.current;

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
                                                        popup && (popup.style.left = (input.left) + 'px');

                                                        if ((innerWidth - input.left) < 100) {
                                                            popup && popup.childNodes[0].classList.add('corner');
                                                            popup && (popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px');
                                                        }
                                                    }

                                                    setIsDeliveryDate2CalendarShown(true)

                                                    refDeliveryDate2.current.inputElement.focus();
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={48 + props.tabTimes} type="text" placeholder="Delivery Time 2"
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setDeliveryTime2KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryTime2KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);
                                                            await props.setConsigneeDeliveryTime2(formatted);
                                                            let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                            extra_data.delivery_time2 = formatted;
                                                            await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                    delivery.extra_data = extra_data;
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            await validateOrderForSaving({ keyCode: 9 });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_time2 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={(e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.delivery_time2 = e.target.value;
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.extra_data?.delivery_time2 || ''}
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

                                                            goToTabindex((35 + props.tabTimes).toString());
                                                            props.setIsShowingConsigneeSecondPage(false);
                                                        }
                                                    }}
                                                    onInput={async (e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.special_instructions = e.target.value

                                                        let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                            if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                delivery.extra_data = extra_data;
                                                            }
                                                            return delivery;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    onChange={async (e) => {
                                                        let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                        extra_data.special_instructions = e.target.value

                                                        let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                            if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                delivery.extra_data = extra_data;
                                                            }
                                                            return delivery;
                                                        })

                                                        await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                        props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.extra_data?.special_instructions || ''}
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
                            value={props.dispatchEvent.name || ''}

                        />
                        <span className="fas fa-caret-down" style={{
                            position: 'absolute',
                            right: 5,
                            top: 'calc(50% + 2px)',
                            transform: `translateY(-50%)`,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }} onClick={() => {
                            window.clearTimeout(delayTimer);
                            delayTimer = null;

                            delayTimer = window.setTimeout(async () => {
                                await setPopupActiveInput('dispatch-event');
                                const input = refDispatchEvents.current.getBoundingClientRect();
                                setPopupPosition(input);

                                if ((props.selected_order?.id || 0) === 0) {
                                    await setPopupItems([]);
                                    return;
                                }

                                let items = [];

                                if ((props.selected_order?.carrier_id || 0) === 0) {
                                    items.push({
                                        name: 'Other',
                                        type: 'other'
                                    })

                                    await setPopupItems(items);

                                    return;
                                }

                                if ((props.selected_order?.routing || []).length > 0) {

                                    for (let i = 0; i < props.selected_order.routing.length; i++) {
                                        let route = props.selected_order.routing[i];

                                        if (route.extra_data.type === 'pickup') {
                                            if ((props.selected_order?.events || []).find(item => item.event_type === 'loaded' && item.shipper_id === route.id) === undefined) {
                                                items.push({
                                                    name: 'Loaded - ' + route.code,
                                                    type: 'loaded',
                                                    location: route.city + ', ' + route.state,
                                                    notes: 'Loaded at Shipper ' + route.code + ((route.code_number || 0) === 0 ? '' : route.code_number),
                                                    shipper_id: route.id,
                                                })

                                                items.push({
                                                    name: 'Other',
                                                    type: 'other'
                                                })

                                                await setPopupItems(items);

                                                return;
                                            }
                                        } else {
                                            if ((props.selected_order?.events || []).find(item => item.event_type === 'delivered' && item.consignee_id === route.id) === undefined) {
                                                items.push({
                                                    name: 'Delivered - ' + route.code,
                                                    type: 'delivered',
                                                    location: route.city + ', ' + route.state,
                                                    notes: 'Delivered at Consignee ' + route.code + ((route.code_number || 0) === 0 ? '' : route.code_number),
                                                    consignee_id: route.id,
                                                })

                                                items.push({
                                                    name: 'Other',
                                                    type: 'other'
                                                })

                                                await setPopupItems(items);

                                                return;
                                            }
                                        }
                                    }
                                }

                                items.push({
                                    name: 'Other',
                                    type: 'other'
                                });

                                await setPopupItems(items);

                                refDispatchEvents.current.focus();
                            }, 100);
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

                                    if ((props.dispatchEvent?.name || '') === '') {
                                        goToTabindex((1 + props.tabTimes).toString());
                                    } else if (selectedOrderEvent.type === undefined) {
                                        goToTabindex((1 + props.tabTimes).toString());
                                    } else {

                                        if ((props.selected_order?.id || 0) === 0) {
                                            goToTabindex((1 + props.tabTimes).toString());
                                            return;
                                        }

                                        let event_parameters = {
                                            order_id: props.selected_order.id,
                                            event_time: moment().format('HHmm'),
                                            event_date: moment().format('MM/DD/YYYY'),
                                            user_id: getRandomInt(1, 99),
                                            event_location: props.dispatchEventLocation,
                                            event_notes: props.dispatchEventNotes,
                                            event_type: selectedOrderEvent.type,
                                        }

                                        switch (selectedOrderEvent.type) {
                                            case 'loaded':
                                                event_parameters.shipper_id = selectedOrderEvent.shipper_id;
                                                break;
                                            case 'delivered':
                                                event_parameters.consignee_id = selectedOrderEvent.consignee_id;
                                                break;
                                            default:
                                                if (event_parameters.event_notes.trim() === '') {
                                                    window.alert('You must include some notes!');
                                                    goToTabindex((73 + props.tabTimes).toString());
                                                    return;
                                                }
                                                break;
                                        }

                                        if (window.confirm('Are you sure to save this event?')) {
                                            $.post(props.serverUrl + '/saveOrderEvent', event_parameters).then(async res => {
                                                if (res.result === 'OK') {
                                                    await props.setSelectedOrder({ ...props.selected_order, events: res.order_events });

                                                    props.setDispatchEvent({});
                                                    props.setDispatchEventLocation('');
                                                    props.setDispatchEventNotes('');

                                                    refDispatchEvents.current.focus();
                                                } else if (res.result === 'ORDER ID NOT VALID') {
                                                    window.alert('The order number is not valid!');
                                                    goToTabindex((73 + props.tabTimes).toString());
                                                }
                                            }).catch(e => {
                                                console.log('error saving order event', e);
                                            })
                                        } else {
                                            goToTabindex((73 + props.tabTimes).toString());
                                        }
                                    }
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
                    <div className="input-box-container" style={{ position: 'relative' }}>
                        <input type="text" placeholder="Miles" readOnly={true} value={((props.selected_order?.miles || 0) / 1609.34).toFixed(2)} />
                        <div className="loading-container">
                            <Loader type="ThreeDots" color="#333738" height={20} width={20} visible={props.mileageLoaderVisible} />
                        </div>
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
                            <div className='mochi-button' onClick={() => {
                                if ((props.selected_order?.id || 0) === 0 || props.selected_order.events.length === 0) {
                                    window.alert('There is nothing to print!');
                                    return;
                                }

                                let html = `<h2>Order Number: ${props.selected_order.order_number} - Events</h2></br></br>`;

                                html += `
                                    <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                        <div style="min-width:15%;max-width:15%;text-decoration:underline">Date & Time</div>
                                        <div style="min-width:10%;max-width:10%;text-decoration:underline">User ID</div>
                                        <div style="min-width:15%;max-width:15%;text-decoration:underline">Event</div>
                                        <div style="min-width:20%;max-width:20%;text-decoration:underline">Location</div>
                                        <div style="min-width:40%;max-width:40%;text-decoration:underline">Notes</div>
                                        
                                    </div>
                                    `;

                                props.selected_order.events.map((item, index) => {
                                    html += `
                                    <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                        <div style="min-width:15%;max-width:15%;text-decoration:underline">${item.event_date}@${item.event_time}</div>
                                        <div style="min-width:10%;max-width:10%;text-decoration:underline">${item.user_id}</div>
                                        <div style="min-width:15%;max-width:15%;text-decoration:underline">${item.event_type.toUpperCase()}</div>
                                        <div style="min-width:20%;max-width:20%;text-decoration:underline">${item.event_location}</div>
                                        <div style="min-width:40%;max-width:40%;text-decoration:underline">${item.event_notes}</div> 
                                    </div>
                                    `;
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

                    <div className="order-events-container">
                        <div className="order-events-wrapper">
                            {
                                (props.selected_order?.events || []).length > 0 &&
                                <div className="order-events-item">
                                    <div className="event-time">Time</div>
                                    <div className="event-date">Date</div>
                                    <div className="event-user-id">User ID</div>
                                    <div className="event-type">Event</div>
                                    <div className="event-location">Location</div>
                                    <div className="event-notes">Notes</div>
                                </div>
                            }
                            {
                                (props.selected_order?.events || []).map((item, index) => {
                                    switch (item.event_type) {
                                        case 'loaded':
                                            return (
                                                <div className="order-events-item">
                                                    <div className="event-time">{item.event_time}</div>
                                                    <div className="event-date">{item.event_date}</div>
                                                    <div className="event-user-id">{item.user_id}</div>
                                                    <div className="event-type">{item.event_type.toUpperCase()}</div>
                                                    <div className="event-location">{item.event_location}</div>
                                                    <div className="event-notes">{item.event_notes}</div>

                                                </div>
                                            )
                                            break;

                                        case 'pickup carried out':
                                            return (
                                                <div className="order-events-item">
                                                    <div className="event-time">{item.event_time}</div>
                                                    <div className="event-date">{item.event_date}</div>
                                                    <div className="event-user-id">{item.user_id}</div>
                                                    <div className="event-type">{item.event_type.toUpperCase()} - {item.shipper.code}</div>
                                                    <div className="event-location">{item.event_location}</div>
                                                    <div className="event-notes">{item.event_notes}</div>
                                                </div>
                                            )
                                            break;

                                        case 'delivery carried out':
                                            return (
                                                <div className="order-events-item">
                                                    <div className="event-time">{item.event_time}</div>
                                                    <div className="event-date">{item.event_date}</div>
                                                    <div className="event-user-id">{item.user_id}</div>
                                                    <div className="event-type">{item.event_type.toUpperCase()} - {item.consignee.code}</div>
                                                    <div className="event-location">{item.event_location}</div>
                                                    <div className="event-notes">{item.event_notes}</div>
                                                </div>
                                            )
                                            break;

                                        case 'changed carrier':
                                            return (
                                                <div className="order-events-item">
                                                    <div className="event-time">{item.event_time}</div>
                                                    <div className="event-date">{item.event_date}</div>
                                                    <div className="event-user-id">{item.user_id}</div>
                                                    <div className="event-type">{item.event_type.toUpperCase()}</div>
                                                    <div className="event-location">{item.event_location}</div>
                                                    <div className="event-notes">Changed carrier from {item.old_carrier.code} - {item.old_carrier.name} to {item.new_carrier.code} - {item.new_carrier.name}</div>
                                                </div>
                                            )
                                            break;

                                        default:

                                            return (
                                                <div className="order-events-item">
                                                    <div className="event-time">{item.event_time}</div>
                                                    <div className="event-date">{item.event_date}</div>
                                                    <div className="event-user-id">{item.user_id}</div>
                                                    <div className="event-type">{item.event_type.toUpperCase()}</div>
                                                    <div className="event-location">{item.event_location}</div>
                                                    <div className="event-notes">{item.event_notes}</div>
                                                </div>
                                            )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Transition
                from={{
                    opacity: 0
                }}
                enter={{
                    opacity: 1
                }}
                leave={{
                    opacity: 0
                }}
                items={props.showingChangeCarrier}
                config={{ duration: 500 }}
            >
                {
                    show => show && (styles => (
                        <animated.div className="change-carrier-main-container" style={{
                            ...styles,
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)'
                        }}>
                            <div className="change-carrier-wrapper" style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <ChangeCarrier />
                            </div>
                        </animated.div>
                    ))
                }
            </Transition>

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

            <CalendarPopup
                popupRef={refCalendarPickupDate1}
                popupClasses={popupCalendarPickupDate1Classes}
                popupGetter={moment((props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || '').trim()
                    ? moment(props.selectedShipperCompanyInfo?.extra_data?.pu_date1, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={async (day) => {

                    let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                    extra_data.pu_date1 = day.format('MM/DD/YYYY');
                    await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                    let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                        if (pu.id === props.selectedShipperCompanyInfo.id) {
                            pu.extra_data = extra_data;
                        }
                        return pu;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                    await validateOrderForSaving({ keyCode: 9 });
                }}
                closeCalendar={() => {
                    setIsPickupDate1CalendarShown(false);
                    setIsPickupDate2CalendarShown(false);
                    setIsDeliveryDate1CalendarShown(false);
                    setIsDeliveryDate2CalendarShown(false);
                }}
                preDay={preSelectedPickupDate1}
                onChangePreDay={async (day) => { await setPreSelectedPickupDate1(day) }}
            />

            <CalendarPopup
                popupRef={refCalendarPickupDate2}
                popupClasses={popupCalendarPickupDate2Classes}
                popupGetter={moment((props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || '').trim()
                    ? moment(props.selectedShipperCompanyInfo?.extra_data?.pu_date2, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={async (day) => {

                    let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                    extra_data.pu_date2 = day.format('MM/DD/YYYY');
                    await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                    let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                        if (pu.id === props.selectedShipperCompanyInfo.id) {
                            pu.extra_data = extra_data;
                        }
                        return pu;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                    await validateOrderForSaving({ keyCode: 9 });
                }}
                closeCalendar={() => {
                    setIsPickupDate1CalendarShown(false);
                    setIsPickupDate2CalendarShown(false);
                    setIsDeliveryDate1CalendarShown(false);
                    setIsDeliveryDate2CalendarShown(false);
                }}
                preDay={preSelectedPickupDate2}
            />

            <CalendarPopup
                popupRef={refCalendarDeliveryDate1}
                popupClasses={popupCalendarDeliveryDate1Classes}
                popupGetter={moment((props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || '').trim()
                    ? moment(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={async (day) => {

                    let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                    extra_data.delivery_date1 = day.format('MM/DD/YYYY');
                    await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                    let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                        if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                            delivery.extra_data = extra_data;
                        }
                        return delivery;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                    await validateOrderForSaving({ keyCode: 9 });
                }}
                closeCalendar={() => {
                    setIsPickupDate1CalendarShown(false);
                    setIsPickupDate2CalendarShown(false);
                    setIsDeliveryDate1CalendarShown(false);
                    setIsDeliveryDate2CalendarShown(false);
                }}
                preDay={preSelectedDeliveryDate1}
            />

            <CalendarPopup
                popupRef={refCalendarDeliveryDate2}
                popupClasses={popupCalendarDeliveryDate2Classes}
                popupGetter={moment((props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || '').trim()
                    ? moment(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={async (day) => {

                    let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                    extra_data.delivery_date2 = day.format('MM/DD/YYYY');
                    await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                    let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                        if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                            delivery.extra_data = extra_data;
                        }
                        return delivery;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                    await validateOrderForSaving({ keyCode: 9 });
                }}
                closeCalendar={() => {
                    setIsPickupDate1CalendarShown(false);
                    setIsPickupDate2CalendarShown(false);
                    setIsDeliveryDate1CalendarShown(false);
                    setIsDeliveryDate2CalendarShown(false);
                }}
                preDay={preSelectedDeliveryDate2}
            />


        </div >
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

        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        orderSelectedPickup: state.dispatchReducers.orderSelectedPickup,
        isAddingPickup: state.dispatchReducers.isAddingPickup,
        isAddingDelivery: state.dispatchReducers.isAddingDelivery,
        mileageLoaderVisible: state.dispatchReducers.mileageLoaderVisible,
        showingChangeCarrier: state.dispatchReducers.showingChangeCarrier,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedOrder,
    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setSelectedBillToCompanyContact,
    setBillToCompanySearch,
    setSelectedShipperCompanyInfo,
    setShipperCompanySearch,
    setSelectedShipperCompanyContact,
    setSelectedConsigneeCompanyInfo,
    setConsigneeCompanySearch,
    setSelectedConsigneeCompanyContact,
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
    setDispatchCarrierInfoCarriers,
    setOrderSelectedPickup,
    setIsAddingPickup,
    setIsAddingDelivery,

    setDispatchOpenedPanels,
    setMileageLoaderVisible,
    setSelectedOrderDocument,
    setLbSelectedOrder,
    setShowingChangeCarrier
})(Dispatch)