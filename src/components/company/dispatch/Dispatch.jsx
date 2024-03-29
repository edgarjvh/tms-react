import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './Dispatch.css';
import MaskedInput from 'react-text-mask';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import $ from 'jquery';
import axios from 'axios';
import DispatchPopup from './popup/Popup.jsx';
import DispatchModal from './modal/Modal.jsx';
import { useTransition, useSpring, animated } from 'react-spring';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import Highlighter from "react-highlight-words";
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import 'loaders.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import CalendarPopup from './calendarPopup/CalendarPopup.jsx';
import Calendar from './calendar/Calendar.jsx';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import ChangeCarrier from './../panels/change-carrier/ChangeCarrier.jsx';

function Dispatch(props) {
    const [selectedOrder, setSelectedOrder] = useState({});
    const [tempPickups, setTempPickups] = useState([]);
    const [tempDeliveries, setTempDeliveries] = useState([]);
    const [tempRouting, setTempRouting] = useState([]);
    const [driverItems, setDriverItems] = useState([]);
    SwiperCore.use([Navigation]);

    var delayTimer;

    const refOrderNumber = useRef(null);

    useEffect(() => {
        refOrderNumber.current.focus({
            preventScroll: true
        });

        setSelectedOrder(props.selected_order);

        updateSystemDateTime();
    }, [])

    useEffect(() => {
        if (props.screenFocused) {
            refOrderNumber.current.focus({
                preventScroll: true
            });
        }
    }, [props.screenFocused])

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
    const [dispatchEventTimeKeyCode, setDispatchEvebtTimeKeyCode] = useState(0);
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

    const refPickupDate1CalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsPickupDate1CalendarShown(false) } });
    const refPickupDate2CalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsPickupDate2CalendarShown(false) } });
    const refDeliveryDate1CalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsDeliveryDate1CalendarShown(false) } });
    const refDeliveryDate2CalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsDeliveryDate2CalendarShown(false) } });

    const refPickupDate1 = useRef();
    const refPickupDate2 = useRef();
    const refDeliveryDate1 = useRef();
    const refDeliveryDate2 = useRef();

    const refPickupTime1 = useRef();
    const refPickupTime2 = useRef();
    const refDeliveryTime1 = useRef();
    const refDeliveryTime2 = useRef();

    const refCalendarPickupDate1 = useRef();
    const refCalendarPickupDate2 = useRef();
    const refCalendarDeliveryDate1 = useRef();
    const refCalendarDeliveryDate2 = useRef();

    const refEventDate = useRef();
    const [isDispatchEventDateCalendarShown, setIsDispatchEventDateCalendarShown] = useState(false);
    const [preSelectedDispatchEventDate, setPreSelectedDispatchEventDate] = useState(moment());
    const refDispatchEventDateCalendarDropDown = useDetectClickOutside({ onTriggered: async () => { await setIsDispatchEventDateCalendarShown(false) } });

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
    // const routingService = {};

    const modalTransitionProps = useSpring({ opacity: (props.selectedNoteForCarrier.id !== undefined || props.selectedInternalNote.id !== undefined) ? 1 : 0 });

    const refBolNumbers = useRef();
    const refPoNumbers = useRef();
    const refRefNumbers = useRef();


    const [isSavingOrder, setIsSavingOrder] = useState(false);
    const [isSavingBillToCompanyInfo, setIsSavingBillToCompanyInfo] = useState(false);
    const [isSavingBillToCompanyContact, setIsSavingBillToCompanyContact] = useState(false);
    const [isSavingShipperCompanyInfo, setIsSavingShipperCompanyInfo] = useState(false);
    const [isSavingShipperCompanyContact, setIsSavingShipperCompanyContact] = useState(false);
    const [isSavingConsigneeCompanyInfo, setIsSavingConsigneeCompanyInfo] = useState(false);
    const [isSavingConsigneeCompanyContact, setIsSavingConsigneeCompanyContact] = useState(false);
    const [isSavingRouting, setIsSavingRouting] = useState(false);
    const [isSavingPickupId, setIsSavingPickupId] = useState(-1);
    const [isSavingDeliveryId, setIsSavingDeliveryId] = useState(-1);

    const [isSavingCarrierInfo, setIsSavingCarrierInfo] = useState(false);
    const [isSavingCarrierContact, setIsSavingCarrierContact] = useState(false);
    const [isSavingCarrierDriver, setIsSavingCarrierDriver] = useState(false);

    const refDivision = useRef();
    const refLoadType = useRef();
    const refTemplate = useRef();
    const refEquipment = useRef();
    const refDriverName = useRef();
    const refDriverPhone = useRef();
    const refDispatchEvents = useRef();
    const refEventTime = useRef();

    const [divisionItems, setDivisionItems] = useState([]);
    const refDivisionDropDown = useDetectClickOutside({ onTriggered: async () => { await setDivisionItems([]) } });
    const refDivisionPopupItems = useRef([]);

    const [loadTypeItems, setLoadTypeItems] = useState([]);
    const refLoadTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setLoadTypeItems([]) } });
    const refLoadTypePopupItems = useRef([]);

    const [templateItems, setTemplateItems] = useState([]);
    const refTemplateDropDown = useDetectClickOutside({ onTriggered: async () => { await setTemplateItems([]) } });
    const refTemplatePopupItems = useRef([]);

    const [equipmentItems, setEquipmentItems] = useState([]);
    const refEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setEquipmentItems([]) } });
    const refEquipmentPopupItems = useRef([]);


    const refDriverDropDown = useDetectClickOutside({ onTriggered: async () => { await setDriverItems([]) } });
    const refDriverPopupItems = useRef([]);

    const refShipperCompanyCode = useRef([]);
    const refConsigneeCompanyCode = useRef([]);

    const [dispatchEventItems, setDispatchEventItems] = useState([
        {
            id: 1,
            type: 'arrived',
            name: 'Arrived',
            enabled: true,
            selected: false
        },
        {
            id: 4,
            type: 'check call',
            name: 'Check Call',
            enabled: true,
            selected: false
        },
        {
            id: 5,
            type: 'damaged',
            name: 'Damaged',
            enabled: true,
            selected: false
        },
        {
            id: 6,
            type: 'delivered',
            name: 'Delivered',
            enabled: true,
            selected: false
        },
        {
            id: 7,
            type: 'departed',
            name: 'Departed',
            enabled: true,
            selected: false
        },
        {
            id: 8,
            type: 'general comment',
            name: 'General Comment',
            enabled: true,
            selected: false
        },
        {
            id: 9,
            type: 'loaded',
            name: 'Loaded',
            enabled: true,
            selected: false
        },
        {
            id: 10,
            type: 'overage',
            name: 'Overage',
            enabled: true,
            selected: false
        },

        {
            id: 11,
            type: 'short',
            name: 'Short',
            enabled: true,
            selected: false
        }
    ]);
    const [dispatchEventSecondPageItems, setDispatchEventSecondPageItems] = useState([]);
    const [showDispatchEventItems, setShowDispatchEventItems] = useState(false);
    const [showDispatchEventSecondPageItems, setShowDispatchEventSecondPageItems] = useState(false);
    const refDispatchEventDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowDispatchEventItems(false) } });
    const refDispatchEventPopupItems = useRef([]);
    const refDispatchEventSecondPagePopupItems = useRef([]);

    useEffect(() => {
        if (!showDispatchEventItems) {
            setDispatchEventItems(dispatchEventItems.map(item => {
                item.selected = false;
                return item;
            }));
            setShowDispatchEventSecondPageItems(false);
            setDispatchEventSecondPageItems([]);
        }
    }, [showDispatchEventItems]);

    const dispatchClearBtnClick = () => {
        props.setSelectedOrder({});

        props.setOrderNumber('');
        props.setTripNumber('');

        props.setDivision({});
        props.setLoadType({});
        props.setTemplate({});

        props.setSelectedBillToCompanyInfo({});
        props.setSelectedBillToCompanyContact({});
        props.setSelectedShipperCompanyInfo({});
        props.setSelectedShipperCompanyContact({});
        props.setSelectedConsigneeCompanyInfo({});
        props.setSelectedConsigneeCompanyContact({});

        props.setShipperBolNumber('');
        props.setShipperPoNumber('');
        props.setShipperRefNumber('');

        props.setDispatchEvent({});
        setSelectedOrderEvent({});
        props.setDispatchEventLocation('');
        props.setDispatchEventNotes('');

        props.setSelectedNoteForCarrier({});
        props.setSelectedInternalNote({});
        props.setIsShowingShipperSecondPage(false);
        props.setIsShowingConsigneeSecondPage(false);

        props.setSelectedDispatchCarrierInfoCarrier({});
        props.setSelectedDispatchCarrierInfoDriver({});
        props.setSelectedDispatchCarrierInfoInsurance({});
        props.setSelectedDispatchCarrierInfoContact({});

        refOrderNumber.current.focus();
    }

    const getBillToCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value !== '') {

                axios.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.data.result === 'OK') {
                        if (res.data.customers.length > 0) {
                            props.setSelectedBillToCompanyInfo(res.data.customers[0]);
                            props.setSelectedBillToCompanyContact((res.data.customers[0].contacts || []).find(c => c.is_primary === 1) || {});

                            let selected_order = { ...props.selected_order } || { order_number: 0 };
                            selected_order.bill_to_customer_id = res.data.customers[0].id;

                            props.setSelectedOrder(selected_order);

                            validateOrderForSaving({ keyCode: 9 });
                        } else {
                            props.setSelectedBillToCompanyInfo({});
                            props.setSelectedBillToCompanyContact({});
                        }
                    } else {
                        props.setSelectedBillToCompanyInfo({});
                        props.setSelectedBillToCompanyContact({});
                    }
                }).catch(e => {
                    console.log('error getting customers', e);
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

                axios.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.data.result === 'OK') {
                        if (res.data.customers.length > 0) {
                            if ((props.selected_order?.id || 0) > 0) {
                                props.setSelectedOrder({
                                    ...props.selected_order,
                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                        if (p.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                            p.order_id = props.selected_order.id;
                                            p.customer = res.data.customers[0];
                                            p.customer_id = res.data.customers[0].id;

                                            props.setSelectedShipperCompanyInfo({
                                                ...res.data.customers[0],
                                                ...p,
                                                customer: {},
                                                pickup_id: p.id
                                            });

                                            props.setSelectedShipperCompanyContact((res.data.customers[0].contacts || []).find(c => c.is_primary === 1) || {});

                                            setIsSavingPickupId(p.id);
                                        }
                                        return p;
                                    })
                                })

                            } else {

                                props.setSelectedOrder({
                                    ...props.selected_order,
                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                        if (p.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                            p.customer = res.data.customers[0];
                                            p.customer_id = res.data.customers[0].id;

                                            props.setSelectedShipperCompanyInfo({
                                                ...res.data.customers[0],
                                                ...p,
                                                customer: {},
                                                pickup_id: p.id
                                            });

                                            props.setSelectedShipperCompanyContact((res.data.customers[0].contacts || []).find(c => c.is_primary === 1) || {});

                                        }
                                        return p;
                                    })
                                })

                                if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                                    if ((res.data.customers[0].mailing_address?.bill_to_code || '') !== '') {

                                        axios.post(props.serverUrl + '/customers', {
                                            code: (res.data.customers[0].mailing_address?.bill_to_code || '') + ((res.data.customers[0].mailing_address?.bill_to_code_number || 0) === 0 ? '' : res.data.customers[0].mailing_address.bill_to_code_number)
                                        }).then(res => {
                                            if (res.data.result === 'OK') {
                                                if (res.data.customers.length > 0) {

                                                    props.setSelectedBillToCompanyInfo(res.data.customers[0]);
                                                    props.setSelectedBillToCompanyContact((res.data.customers[0].contacts || []).find(c => c.is_primary === 1) || {});

                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        ae_number: (props.selected_order?.ae_number || '') === '' ? getRandomInt(1, 100) : props.selected_order.ae_number,
                                                        bill_to_customer_id: res.data.customers[0].id,
                                                        pickups: (props.selected_order?.pickups || []).map((pickup) => {
                                                            pickup.toSave = pickup.id === 0;
                                                            return pickup;
                                                        })
                                                    });

                                                    validateOrderForSaving({ keyCode: 9 });
                                                }
                                            }
                                        }).catch(e => {
                                            console.log('error getting customers', e);
                                        });
                                    }
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
                }).catch(e => {
                    console.log('error getting customers', e);
                });
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
                    props.setSelectedOrder({ ...props.selected_order, deliveries: [] })
                    return;
                }

                axios.post(props.serverUrl + '/customers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.data.result === 'OK') {
                        if (res.data.customers.length > 0) {
                            let delivery_id = -1;

                            props.setSelectedOrder({
                                ...props.selected_order,
                                deliveries: (props.selected_order?.deliveries || []).map((d, i) => {
                                    if (d.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                        d.order_id = props.selected_order.id;
                                        d.customer = res.data.customers[0];
                                        d.customer_id = res.data.customers[0].id;

                                        let consignee = { ...res.data.customers[0] };
                                        consignee = { ...consignee, ...d };
                                        consignee.customer = {};
                                        consignee.delivery_id = d.id;

                                        props.setSelectedConsigneeCompanyInfo(consignee);
                                        props.setSelectedConsigneeCompanyContact((consignee.contacts || []).find(c => c.is_primary === 1) || {});

                                        delivery_id = d.id;
                                    }
                                    return d;
                                })
                            })

                            setIsSavingDeliveryId(delivery_id);

                            // validateOrderForSaving({ keyCode: 9 });
                        } else {
                            props.setSelectedConsigneeCompanyInfo({});
                            props.setSelectedConsigneeCompanyContact({});
                        }
                    } else {
                        props.setSelectedConsigneeCompanyInfo({});
                        props.setSelectedConsigneeCompanyContact({});
                    }
                }).catch(e => {
                    console.log('error getting customers', e);
                });
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

        axios.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.data.result === 'OK') {
                props.setBillToCompanySearch(companySearch);
                props.setBillToCompanies(res.data.customers);

                if (!props.openedPanels.includes(props.billToCompanySearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.billToCompanySearchPanelName]);
                }
            }
        }).catch(e => {
            console.log('error searching for customers', e);
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

        axios.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.data.result === 'OK') {
                props.setShipperCompanySearch(companySearch);
                props.setShipperCompanies(res.data.customers);

                if (!props.openedPanels.includes(props.shipperCompanySearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.shipperCompanySearchPanelName])
                }
            }
        }).catch(e => {
            console.log('error searching for customers', e);
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

        axios.post(props.serverUrl + '/customerSearch', { search: companySearch }).then(res => {
            if (res.data.result === 'OK') {
                props.setConsigneeCompanySearch(companySearch);
                props.setConsigneeCompanies(res.data.customers);

                if (!props.openedPanels.includes(props.consigneeCompanySearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.consigneeCompanySearchPanelName])
                }
            }
        }).catch(e => {
            console.log('error searching for customers', e);
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

                axios.post(props.serverUrl + '/carriers', {
                    code: e.target.value.toLowerCase()
                }).then(res => {
                    if (res.data.result === 'OK') {
                        if (res.data.carriers.length > 0) {

                            props.setSelectedDispatchCarrierInfoCarrier(res.data.carriers[0]);

                            res.data.carriers[0].contacts.map(c => {
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
                            selected_order.carrier_id = res.data.carriers[0].id;

                            if (res.data.carriers[0].drivers.length > 0) {
                                props.setSelectedDispatchCarrierInfoDriver({
                                    ...res.data.carriers[0].drivers[0],
                                    name: res.data.carriers[0].drivers[0].first_name + (res.data.carriers[0].drivers[0].last_name.trim() === '' ? '' : ' ' + res.data.carriers[0].drivers[0].last_name)
                                });
                                selected_order.carrier_driver_id = res.data.carriers[0].drivers[0].id;
                            }

                            if ((selected_order.ae_number || '') === '') {
                                selected_order.ae_number = getRandomInt(1, 100);
                            }

                            if ((selected_order.events || []).find(el => el.event_type === 'carrier asigned') === undefined) {
                                let event_parameters = {
                                    order_id: selected_order.id,
                                    time: moment().format('HHmm'),
                                    event_time: '',
                                    date: moment().format('MM/DD/YYYY'),
                                    event_date: '',
                                    user_id: selected_order.ae_number,
                                    event_location: '',
                                    event_notes: 'Assigned Carrier ' + res.data.carriers[0].code + (res.data.carriers[0].code_number === 0 ? '' : res.data.carriers[0].code_number) + ' - ' + res.data.carriers[0].name,
                                    event_type: 'carrier assigned',
                                    new_carrier_id: res.data.carriers[0].id
                                }

                                axios.post(props.serverUrl + '/saveOrderEvent', event_parameters).then(async res => {
                                    if (res.data.result === 'OK') {
                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                            if (res.data.result === 'OK') {
                                                await props.setSelectedOrder(res.data.order);
                                            }

                                            setIsSavingOrder(false);
                                        }).catch(e => {
                                            console.log('error saving order', e);
                                            setIsSavingOrder(false);
                                        });
                                    } else if (res.data.result === 'ORDER ID NOT VALID') {
                                        window.alert('The order number is not valid!');
                                        goToTabindex((73 + props.tabTimes).toString());
                                    }
                                }).catch(e => {
                                    console.log('error saving order event', e);
                                })

                            } else {
                                if (!isSavingOrder) {
                                    setIsSavingOrder(true);
                                    axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                        if (res.data.result === 'OK') {
                                            await props.setSelectedOrder(res.data.order);
                                        }

                                        setIsSavingOrder(false);
                                    }).catch(e => {
                                        console.log('error saving order', e);
                                        setIsSavingOrder(false);
                                    });
                                }
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
                }).catch(e => {
                    console.log('error getting carriers', e);
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

        axios.post(props.serverUrl + '/carrierSearch', { search: carrierSearch }).then(async res => {
            if (res.data.result === 'OK') {

                await props.setDispatchCarrierInfoCarrierSearch(carrierSearch);
                await props.setDispatchCarrierInfoCarriers(res.data.carriers);

                if (!props.openedPanels.includes(props.carrierInfoSearchPanelName)) {
                    props.setOpenedPanels([...props.openedPanels, props.carrierInfoSearchPanelName])
                }
            }
        }).catch(e => {
            console.log('error searching for carriers', e);
        });
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

                        axios.post(props.serverUrl + '/saveCustomer', selectedBillToCompanyInfo).then(async res => {
                            if (res.data.result === 'OK') {
                                if (props.selectedBillToCompanyInfo.id === undefined || (props.selectedBillToCompanyInfo.id || 0) === 0) {
                                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: res.data.customer.id });
                                }

                                (res.data.customer.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedBillToCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingBillToCompanyInfo(false);
                        }).catch(e => {
                            console.log('error saving customer', e);
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

                axios.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.data.contacts });
                        await props.setSelectedBillToCompanyContact(res.data.contact);
                    }

                    setIsSavingBillToCompanyContact(false);
                }).catch(e => {
                    console.log('error saving contact', e);
                });
            }
        }
    }

    useEffect(() => {
        if (isSavingShipperCompanyInfo) {
            if ((props.selectedShipperCompanyInfo.id || 0) === 0) {
                setIsSavingShipperCompanyInfo(false);
                return;
            }

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

                axios.post(props.serverUrl + '/saveCustomer', selectedShipperCompanyInfo).then(async res => {
                    if (res.data.result === 'OK') {
                        if (props.selectedShipperCompanyInfo.id === undefined || (props.selectedShipperCompanyInfo.id || 0) === 0) {
                            await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: res.data.customer.id });
                            await props.setSelectedShipperCompanyContact(res.data.customer.contacts.find(c => c.is_primary === 1) || {});

                            await props.setSelectedOrder({
                                ...props.selected_order,
                                pickups: props.selected_order.pickups.map((p, i) => {
                                    if (p.id || 0 === 0) {
                                        p.id = res.data.customer.id
                                    }
                                    return p;
                                })
                            })
                        }

                        // validate postal code for calculating miles
                        let doCalculateMiles = false;

                        if ((selectedShipperCompanyInfo.zip_code || '') !== '' && (selectedShipperCompanyInfo.zip_code !== res.data.customer.zip_code)) {
                            (props.selected_order?.routing || []).map((route, index) => {

                                if (route.type === 'pickup') {
                                    if (props.selected_order?.pickups || [].find(p => p.customer.id === res.data.customer.id) !== undefined) {
                                        doCalculateMiles = true;
                                    }
                                }

                                return false;
                            });
                        }

                        if (doCalculateMiles) {

                            let selected_order = props.selected_order || {};

                            if ((selected_order?.id || 0) > 0) {
                                selected_order.pickups = selected_order.pickups || [].map((p, i) => {

                                    if ((p.customer?.id || 0) === res.data.customer.id) {
                                        p.customer = { ...res.data.customer }
                                    }

                                    return p;
                                })

                                let params = {
                                    mode: 'fastest;car;traffic:disabled',
                                    routeAttributes: 'summary'
                                }

                                let waypointCount = 0;


                                (selected_order.routing || []).map((item, i) => {
                                    if (item.type === 'pickup') {
                                        (selected_order.pickups || []).map((p, i) => {
                                            if (p.id === item.pickup_id) {
                                                if ((p.customer?.zip_data || '') !== '') {
                                                    params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                    waypointCount += 1;
                                                }
                                            }
                                            return false;
                                        })
                                    } else {
                                        (selected_order.deliveries || []).map((d, i) => {
                                            if (d.id === item.delivery_id) {
                                                if ((d.customer?.zip_data || '') !== '') {
                                                    params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                    waypointCount += 1;
                                                }
                                            }
                                            return false;
                                        })
                                    }

                                    return true;
                                });

                                routingService.calculateRoute(params,
                                    (result) => {
                                        let miles = result.response.route[0].summary.distance || 0;

                                        selected_order.miles = miles;

                                        props.setSelectedOrder(selected_order);
                                        props.setMileageLoaderVisible(false);


                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                            if (res.data.result === 'OK') {

                                            }
                                        }).catch(e => {
                                            console.log('error on saving order miles', e);
                                            props.setMileageLoaderVisible(false);
                                        });
                                    },
                                    (error) => {
                                        console.log('error getting mileage', error);
                                        selected_order.miles = 0;

                                        props.setSelectedOrder(selected_order)
                                        props.setMileageLoaderVisible(false);

                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                            if (res.data.result === 'OK') {

                                            }
                                        }).catch(e => {
                                            console.log('error on saving order miles', e);
                                            props.setMileageLoaderVisible(false);
                                        });
                                    });
                            }
                        }
                    }

                    await setIsSavingShipperCompanyInfo(false);
                }).catch(async e => {
                    console.log('error saving customer', e);
                    await setIsSavingShipperCompanyInfo(false);
                });
            } else {
                setIsSavingShipperCompanyInfo(false);
            }
        }
    }, [isSavingShipperCompanyInfo])

    const validateShipperCompanyInfoForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingShipperCompanyInfo) {
                setIsSavingShipperCompanyInfo(true);
            }
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

                axios.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contacts: res.data.contacts });
                        await props.setSelectedShipperCompanyContact(res.data.contact);
                    }

                    setIsSavingShipperCompanyContact(false);
                }).catch(e => {
                    console.log('error saving contact', e);
                });
            }
        }
    }

    useEffect(() => {
        if (isSavingConsigneeCompanyInfo) {

            if ((props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                setIsSavingConsigneeCompanyInfo(false);
                return;
            }

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

                axios.post(props.serverUrl + '/saveCustomer', selectedConsigneeCompanyInfo).then(async res => {
                    if (res.data.result === 'OK') {
                        if (props.selectedConsigneeCompanyInfo.id === undefined || (props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                            await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: res.data.customer.id });
                            await props.setSelectedConsigneeCompanyContact(res.data.customer.contacts.find(c => c.is_primary === 1) || {});

                            await props.setSelectedOrder({
                                ...props.selected_order,
                                deliveries: props.selected_order.deliveries.map((d, i) => {
                                    if (d.id || 0 === 0) {
                                        d.id = res.data.customer.id
                                    }
                                    return d;
                                })
                            })
                        }

                        // validate postal code for calculating miles
                        let doCalculateMiles = false;

                        if ((selectedConsigneeCompanyInfo.zip_code || '') !== '' && (selectedConsigneeCompanyInfo.zip_code !== res.data.customer.zip_code)) {
                            (props.selected_order?.routing || []).map((route, index) => {

                                if (route.type === 'delivery') {
                                    if (props.selected_order?.deliveries || [].find(d => d.customer.id === res.data.customer.id) !== undefined) {
                                        doCalculateMiles = true;
                                    }
                                }

                                return false;
                            });
                        }

                        if (doCalculateMiles) {

                            let selected_order = props.selected_order || {};

                            if ((selected_order?.id || 0) > 0) {
                                selected_order.deliveries = selected_order.deliveries || [].map((d, i) => {

                                    if ((d.customer?.id || 0) === res.data.customer.id) {
                                        d.customer = { ...res.data.customer }
                                    }

                                    return d;
                                })

                                let params = {
                                    mode: 'fastest;car;traffic:disabled',
                                    routeAttributes: 'summary'
                                }

                                let waypointCount = 0;

                                (selected_order.routing || []).map((item, i) => {
                                    if (item.type === 'pickup') {
                                        (selected_order.pickups || []).map((p, i) => {
                                            if (p.id === item.pickup_id) {
                                                if ((p.customer?.zip_data || '') !== '') {
                                                    params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                    waypointCount += 1;
                                                }
                                            }
                                            return false;
                                        })
                                    } else {
                                        (selected_order.deliveries || []).map((d, i) => {
                                            if (d.id === item.delivery_id) {
                                                if ((d.customer?.zip_data || '') !== '') {
                                                    params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                    waypointCount += 1;
                                                }
                                            }
                                            return false;
                                        })
                                    }

                                    return true;
                                });

                                routingService.calculateRoute(params,
                                    (result) => {
                                        let miles = result.response.route[0].summary.distance || 0;

                                        selected_order.miles = miles;

                                        props.setSelectedOrder(selected_order);
                                        props.setMileageLoaderVisible(false);


                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                            if (res.data.result === 'OK') {

                                            }
                                        }).catch(e => {
                                            console.log('error on saving order miles', e);
                                            props.setMileageLoaderVisible(false);
                                        });
                                    },
                                    (error) => {
                                        console.log('error getting mileage', error);
                                        selected_order.miles = 0;

                                        props.setSelectedOrder(selected_order)
                                        props.setMileageLoaderVisible(false);

                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                            if (res.data.result === 'OK') {

                                            }
                                        }).catch(e => {
                                            console.log('error on saving order miles', e);
                                            props.setMileageLoaderVisible(false);
                                        });
                                    });
                            }
                        }
                    }

                    setIsSavingConsigneeCompanyInfo(false);
                }).catch(async e => {
                    console.log('error saving customer', e);
                    await setIsSavingConsigneeCompanyInfo(false);
                });
            }
        }
    }, [isSavingConsigneeCompanyInfo])


    const validateConsigneeCompanyInfoForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingConsigneeCompanyInfo) {
                setIsSavingConsigneeCompanyInfo(true);
            }
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

                axios.post(props.serverUrl + '/saveContact', contact).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.data.contacts });
                        await props.setSelectedConsigneeCompanyContact(res.data.contact);
                    }

                    setIsSavingConsigneeCompanyContact(false);
                }).catch(e => {
                    console.log('error saving contact', e);
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

                        axios.post(props.serverUrl + '/saveCarrier', selectedDispatchCarrierInfoCarrier).then(async res => {
                            if (res.data.result === 'OK') {
                                if (props.selectedDispatchCarrierInfoCarrier.id === undefined && (props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                                    await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, id: res.data.carrier.id });
                                }

                                (res.data.carrier.contacts || []).map(async (contact, index) => {

                                    if (contact.is_primary === 1) {
                                        await props.setSelectedDispatchCarrierInfoContact(contact);
                                    }

                                    return true;
                                });
                            }

                            await setIsSavingCarrierInfo(false);
                        }).catch(e => {
                            console.log('error saving carrier', e);
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

                axios.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contacts: res.data.contacts });
                        await props.setSelectedDispatchCarrierInfoContact(res.data.contact);
                    }

                    setIsSavingCarrierContact(false);
                }).catch(e => {
                    console.log('error saving carrier contact', e);
                });
            }
        }
    }

    const validateCarrierDriverForSaving = async (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingCarrierDriver) {
                setIsSavingCarrierDriver(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingCarrierDriver) {
            let driver = {
                ...props.selectedDispatchCarrierInfoDriver,
                id: (props.selectedDispatchCarrierInfoDriver?.id || 0),
                carrier_id: props.selectedDispatchCarrierInfoCarrier.id
            };

            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                if ((driver.first_name || '').trim() !== '') {
                    axios.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                        if (res.data.result === 'OK') {
                            props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, drivers: res.data.drivers });
                            props.setSelectedDispatchCarrierInfoDriver({ ...driver, id: res.data.driver.id });

                            axios.post(props.serverUrl + '/saveOrder', { ...props.selected_order, carrier_driver_id: res.data.driver.id }).then(async res => {
                                if (res.data.result === 'OK') {
                                    // await setTempRouting(res.data.order.routing);
                                    await props.setSelectedOrder(res.data.order);
                                } else {
                                    console.log(res.data.result);
                                }

                                setIsSavingOrder(false);
                            }).catch(e => {
                                console.log('error saving order', e);
                                setIsSavingOrder(false);
                            });
                        }

                        setIsSavingCarrierDriver(false);
                    }).catch(e => {
                        console.log('error saving carrier driver', e);
                        setIsSavingCarrierDriver(false);
                    });
                } else {
                    setIsSavingCarrierDriver(false);
                }
            } else {
                setIsSavingCarrierDriver(false);
            }
        }
    }, [isSavingCarrierDriver])

    const validateOrderForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingOrder) {
                setIsSavingOrder(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingOrder) {
            let selected_order = { ...props.selected_order } || { order_number: 0 };

            // check if there's a bill-to-company loaded
            if ((props.selectedBillToCompanyInfo?.id || 0) === 0) {
                setIsSavingOrder(false);
                props.setMileageLoaderVisible(false);
                return;
            }

            selected_order.bill_to_customer_id = (props.selectedBillToCompanyInfo?.id || 0) === 0 ? null : props.selectedBillToCompanyInfo.id;
            selected_order.carrier_id = (props.selectedDispatchCarrierInfoCarrier?.id || 0) === 0 ? null : props.selectedDispatchCarrierInfoCarrier.id;
            selected_order.carrier_driver_id = (props.selectedDispatchCarrierInfoDriver?.id || 0) === 0 ? null : props.selectedDispatchCarrierInfoDriver.id;

            if ((selected_order.ae_number || '') === '') {
                selected_order.ae_number = getRandomInt(1, 100);
            }

            if ((props.selected_order?.id || 0) === 0 && (selected_order.pickups || []).length === 1 && selected_order.pickups[0].id === 0 && (selected_order.pickups[0].customer_id || 0) > 0) {
                selected_order.pickups = (selected_order.pickups || []).map((pu, i) => {
                    pu.pu_date1 = getFormattedDates(pu.pu_date1 || '');
                    pu.pu_date2 = getFormattedDates(pu.pu_date2 || '');
                    pu.pu_time1 = getFormattedHours(pu.pu_time1 || '');
                    pu.pu_time2 = getFormattedHours(pu.pu_time2 || '');
                    return pu;
                });
            } else {
                selected_order.pickups = []; // se envia vacio para no tocarlo
            }

            if ((props.selected_order?.id || 0) === 0 && (selected_order.deliveries || []).length === 1 && selected_order.deliveries[0].id === 0 && (selected_order.deliveries[0].customer_id || 0) > 0) {
                selected_order.deliveries = (selected_order.deliveries || []).map((delivery, i) => {
                    delivery.delivery_date1 = getFormattedDates(delivery.delivery_date1 || '');
                    delivery.delivery_date2 = getFormattedDates(delivery.delivery_date2 || '');
                    delivery.delivery_time1 = getFormattedHours(delivery.delivery_time1 || '');
                    delivery.delivery_time2 = getFormattedHours(delivery.delivery_time2 || '');
                    return delivery;
                });
            } else {
                selected_order.deliveries = []; // se envia vacio para no tocarlo
            }

            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                if (res.data.result === 'OK') {
                    await setTempRouting(res.data.order.routing);
                    await props.setSelectedOrder(res.data.order);
                } else {
                    console.log(res.data.result);
                }

                setIsSavingOrder(false);
            }).catch(e => {
                console.log('error saving order', e);
                setIsSavingOrder(false);
            });
        }
    }, [isSavingOrder]);

    useEffect(() => {
        if (isSavingPickupId > -1) {
            if ((props.selected_order?.id || 0) > 0) {
                let pickup = (props.selected_order?.pickups || []).find(p => p.id === isSavingPickupId);

                if (pickup !== undefined) {
                    if ((pickup.customer?.id || 0) > 0) {
                        axios.post(props.serverUrl + '/saveOrderPickup', {
                            id: isSavingPickupId,
                            order_id: props.selected_order?.id || 0,
                            customer_id: pickup.customer.id,
                            pu_date1: pickup.pu_date1 || '',
                            pu_date2: pickup.pu_date2 || '',
                            pu_time1: pickup.pu_time1 || '',
                            pu_time2: pickup.pu_time2 || '',
                            bol_numbers: pickup.bol_numbers || '',
                            po_numbers: pickup.po_numbers || '',
                            ref_numbers: pickup.ref_numbers || '',
                            seal_number: pickup.seal_number || '',
                            special_instructions: pickup.special_instructions || '',
                            type: 'pickup'
                        }).then(async res => {
                            if (res.data.result === 'OK') {
                                await props.setSelectedOrder({
                                    ...props.selected_order,
                                    pickups: (props.selected_order.pickups || []).map((p, i) => {
                                        if (p.id === isSavingPickupId) {
                                            p = res.data.pickup;

                                            props.setSelectedShipperCompanyInfo({
                                                ...props.selectedShipperCompanyInfo,
                                                pickup_id: res.data.pickup.id
                                            })
                                        }
                                        return p;
                                    })
                                })

                                if (res.data.order.pickups.length === 1 && res.data.order.deliveries.length === 1) {
                                    let routing = [
                                        {
                                            id: 0,
                                            pickup_id: res.data.order.pickups[0].id,
                                            delivery_id: null,
                                            type: 'pickup'
                                        },
                                        {
                                            id: 0,
                                            pickup_id: null,
                                            delivery_id: res.data.order.deliveries[0].id,
                                            type: 'delivery'
                                        }
                                    ]

                                    let selected_order = props.selected_order;

                                    axios.post(props.serverUrl + '/saveOrderRouting', {
                                        order_id: props.selected_order?.id || 0,
                                        routing: routing
                                    }).then(res => {
                                        if (res.data.result === 'OK') {
                                            selected_order = res.data.order;
                                            props.setSelectedOrder(selected_order);

                                            props.setMileageLoaderVisible(true);

                                            let params = {
                                                mode: 'fastest;car;traffic:disabled',
                                                routeAttributes: 'summary'
                                            }

                                            let waypointCount = 0;

                                            selected_order.routing.map((item, i) => {
                                                if (item.type === 'pickup') {
                                                    selected_order.pickups.map((p, i) => {
                                                        if (p.id === item.pickup_id) {
                                                            if ((p.customer?.zip_data || '') !== '') {
                                                                params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                waypointCount += 1;
                                                            }
                                                        }
                                                        return false;
                                                    })
                                                } else {
                                                    selected_order.deliveries.map((d, i) => {
                                                        if (d.id === item.delivery_id) {
                                                            if ((d.customer?.zip_data || '') !== '') {
                                                                params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                waypointCount += 1;
                                                            }
                                                        }
                                                        return false;
                                                    })
                                                }

                                                return true;
                                            });

                                            routingService.calculateRoute(params,
                                                (result) => {
                                                    let miles = result.response.route[0].summary.distance || 0;

                                                    selected_order.miles = miles;

                                                    props.setSelectedOrder(selected_order);
                                                    props.setMileageLoaderVisible(false);

                                                    axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                        if (res.data.result === 'OK') {

                                                        }
                                                    }).catch(e => {
                                                        console.log('error on saving order miles', e);
                                                        props.setMileageLoaderVisible(false);
                                                    });
                                                },
                                                (error) => {
                                                    console.log('error getting mileage', error);
                                                    selected_order.miles = 0;

                                                    props.setSelectedOrder(selected_order)
                                                    props.setMileageLoaderVisible(false);

                                                    axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                        if (res.data.result === 'OK') {

                                                        }
                                                    }).catch(e => {
                                                        console.log('error on saving order miles', e);
                                                        props.setMileageLoaderVisible(false);
                                                    });
                                                });
                                        } else {
                                            console.log(res.data.result);

                                            selected_order.miles = 0;
                                            props.setSelectedOrder(selected_order)
                                            props.setMileageLoaderVisible(false);

                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                if (res.data.result === 'OK') {

                                                }
                                            }).catch(e => {
                                                console.log('error on saving order miles', e);
                                                props.setMileageLoaderVisible(false);
                                            });
                                        }
                                    }).catch(e => {
                                        console.log('error on saving order routing', e);
                                        props.setMileageLoaderVisible(false);
                                    })
                                }
                            } else {
                                console.log(res.data.result);
                            }
                            setIsSavingPickupId(-1);
                        }).catch(e => {
                            console.log('error on saving pickup', e);
                            setIsSavingPickupId(-1);
                        })
                    } else {
                        console.log('saving pickup customer undefined');
                        setIsSavingPickupId(-1);
                    }
                } else {
                    console.log('saving pickup undefined');
                    setIsSavingPickupId(-1);
                }

            } else {
                console.log('no order selected');
                setIsSavingPickupId(-1);
            }
        }
    }, [isSavingPickupId]);

    useEffect(() => {
        if (isSavingDeliveryId > -1) {
            if ((props.selected_order?.id || 0) > 0) {
                let delivery = (props.selected_order?.deliveries || []).find(d => d.id === isSavingDeliveryId);

                if (delivery !== undefined) {
                    if ((delivery.customer?.id || 0) > 0) {
                        axios.post(props.serverUrl + '/saveOrderDelivery', {
                            id: isSavingDeliveryId,
                            order_id: props.selected_order?.id || 0,
                            customer_id: delivery.customer.id,
                            delivery_date1: delivery.delivery_date1 || '',
                            delivery_date2: delivery.delivery_date2 || '',
                            delivery_time1: delivery.delivery_time1 || '',
                            delivery_time2: delivery.delivery_time2 || '',
                            special_instructions: delivery.special_instructions || '',
                            type: 'delivery'
                        }).then(async res => {
                            if (res.data.result === 'OK') {
                                await props.setSelectedOrder({
                                    ...props.selected_order,
                                    deliveries: (props.selected_order.deliveries || []).map((d, i) => {
                                        if (d.id === isSavingDeliveryId) {
                                            d = res.data.delivery;

                                            props.setSelectedConsigneeCompanyInfo({
                                                ...props.selectedConsigneeCompanyInfo,
                                                delivery_id: res.data.delivery.id
                                            })
                                        }
                                        return d;
                                    })
                                });

                                if (res.data.order.pickups.length === 1 && res.data.order.deliveries.length === 1) {
                                    if (!((props.selected_order?.routing || []).length >= 2 &&
                                        props.selected_order.routing[0].pickup_id === res.data.order.pickups[0].id &&
                                        props.selected_order.routing[1].delivery_id === res.data.order.deliveries[0].id)) {
                                        let routing = [
                                            {
                                                id: 0,
                                                pickup_id: res.data.order.pickups[0].id,
                                                delivery_id: null,
                                                type: 'pickup'
                                            },
                                            {
                                                id: 0,
                                                pickup_id: null,
                                                delivery_id: res.data.order.deliveries[0].id,
                                                type: 'delivery'
                                            }
                                        ]

                                        let selected_order = props.selected_order;

                                        await axios.post(props.serverUrl + '/saveOrderRouting', {
                                            order_id: props.selected_order?.id || 0,
                                            routing: routing
                                        }).then(async res => {
                                            if (res.data.result === 'OK') {
                                                selected_order = res.data.order;
                                                props.setSelectedOrder(selected_order);

                                                props.setMileageLoaderVisible(true);

                                                let params = {
                                                    mode: 'fastest;car;traffic:disabled',
                                                    routeAttributes: 'summary'
                                                }

                                                let waypointCount = 0;

                                                selected_order.routing.map((item, i) => {
                                                    if (item.type === 'pickup') {
                                                        selected_order.pickups.map((p, i) => {
                                                            if (p.id === item.pickup_id) {
                                                                if ((p.customer?.zip_data || '') !== '') {
                                                                    params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                    waypointCount += 1;
                                                                }
                                                            }
                                                            return false;
                                                        })
                                                    } else {
                                                        selected_order.deliveries.map((d, i) => {
                                                            if (d.id === item.delivery_id) {
                                                                if ((d.customer?.zip_data || '') !== '') {
                                                                    params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                    waypointCount += 1;
                                                                }
                                                            }
                                                            return false;
                                                        })
                                                    }

                                                    return true;
                                                });

                                                routingService.calculateRoute(params,
                                                    (result) => {
                                                        let miles = result.response.route[0].summary.distance || 0;

                                                        selected_order.miles = miles;

                                                        props.setSelectedOrder(selected_order);
                                                        props.setMileageLoaderVisible(false);

                                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                            if (res.data.result === 'OK') {

                                                            }
                                                        }).catch(e => {
                                                            console.log('error on saving order miles', e);
                                                            props.setMileageLoaderVisible(false);
                                                        });
                                                    },
                                                    (error) => {
                                                        console.log('error getting mileage', error);
                                                        selected_order.miles = 0;

                                                        props.setSelectedOrder(selected_order)
                                                        props.setMileageLoaderVisible(false);

                                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                            if (res.data.result === 'OK') {

                                                            }
                                                        }).catch(e => {
                                                            console.log('error on saving order miles', e);
                                                            props.setMileageLoaderVisible(false);
                                                        });
                                                    });
                                            } else {
                                                console.log(res.data.result);

                                                selected_order.miles = 0;
                                                props.setSelectedOrder(selected_order)
                                                props.setMileageLoaderVisible(false);

                                                axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                    if (res.data.result === 'OK') {

                                                    }
                                                }).catch(e => {
                                                    console.log('error on saving order miles', e);
                                                    props.setMileageLoaderVisible(false);
                                                });
                                            }
                                        }).catch(e => {
                                            console.log('error on saving order routing', e);
                                            props.setMileageLoaderVisible(false);
                                        })
                                    }
                                }
                            } else {
                                console.log(res.data.result);
                            }
                            setIsSavingDeliveryId(-1);
                        }).catch(e => {
                            console.log('error on saving delivery', e);
                            setIsSavingDeliveryId(-1);
                        });
                    } else {
                        console.log('saving delivery customer undefined');
                        setIsSavingDeliveryId(-1);
                    }
                } else {
                    console.log('saving delivery undefined');
                    setIsSavingDeliveryId(-1);
                }

            } else {
                console.log('no order selected');
                setIsSavingDeliveryId(-1);
            }
        }
    }, [isSavingDeliveryId]);


    const getOrderByOrderNumber = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.order_number || '') !== '') {
                axios.post(props.serverUrl + '/getOrderByOrderNumber', { order_number: props.order_number }).then(async res => {
                    if (res.data.result === 'OK') {
                        let order = JSON.parse(JSON.stringify(res.data.order));

                        await props.setSelectedOrder({});
                        await props.setSelectedOrder(order);
                        await setTempRouting(order.routing);
                        await props.setOrderNumber(order.order_number);
                        await props.setTripNumber(order.trip_number === 0 ? '' : order.trip_number);

                        await props.setSelectedBillToCompanyInfo({ ...order.bill_to_company });
                        await props.setSelectedBillToCompanyContact({ ...(order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) });

                        let pickup_id = (order.routing || []).find(r => r.type === 'pickup')?.pickup_id || 0;
                        let pickup = { ...((order.pickups || []).find(p => p.id === pickup_id) || (order.pickups || [])[0]) };

                        await props.setSelectedShipperCompanyInfo(pickup.id === undefined ? {} : {
                            ...pickup.customer,
                            pickup_id: pickup.id,
                            pu_date1: pickup.pu_date1,
                            pu_date2: pickup.pu_date2,
                            pu_time1: pickup.pu_time1,
                            pu_time2: pickup.pu_time2,
                            bol_numbers: pickup.bol_numbers,
                            po_numbers: pickup.po_numbers,
                            ref_numbers: pickup.ref_numbers,
                            seal_number: pickup.seal_number,
                            special_instructions: pickup.special_instructions,
                            type: pickup.type,
                        });
                        await props.setSelectedShipperCompanyContact({ ...(pickup.contacts || []).find(c => c.is_primary === 1) });

                        let delivery_id = (order.routing || []).find(r => r.type === 'delivery')?.delivery_id || 0;
                        let delivery = { ...((order.deliveries || []).find(d => d.id === delivery_id) || (order.deliveries || [])[0]) };

                        await props.setSelectedConsigneeCompanyInfo(delivery.id === undefined ? {} : {
                            ...delivery.customer,
                            delivery_id: delivery.id,
                            delivery_date1: delivery.pu_date1,
                            delivery_date2: delivery.pu_date2,
                            delivery_time1: delivery.pu_time1,
                            delivery_time2: delivery.pu_time2,
                            special_instructions: delivery.special_instructions,
                            type: delivery.type,
                        });
                        await props.setSelectedConsigneeCompanyContact({ ...(delivery.contacts || []).find(c => c.is_primary === 1) });

                        await props.setSelectedDispatchCarrierInfoCarrier({ ...order.carrier });
                        await props.setSelectedDispatchCarrierInfoContact({ ...(order.carrier?.contacts || []).find(c => c.is_primary === 1) });
                        await props.setSelectedDispatchCarrierInfoDriver({
                            ...order.driver,
                            name: (order.driver?.first_name || '') + ((order.driver?.last_name || '').trim() === '' ? '' : ' ' + (order.driver?.last_name || ''))
                        });

                        await props.setDivision({ name: order.division });
                        await props.setLoadType({ name: order.load_type });
                        await props.setTemplate({ name: order.template });
                    } else {
                        await props.setOrderNumber(props.selected_order?.order_number || '');
                    }
                }).catch(e => {
                    console.log('error getting order by order number', e);
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
                axios.post(props.serverUrl + '/getOrderByTripNumber', { trip_number: props.trip_number }).then(async res => {
                    if (res.data.result === 'OK') {
                        let order = JSON.parse(JSON.stringify(res.data.order));

                        await props.setSelectedOrder({});
                        await props.setSelectedOrder(order);
                        await setTempRouting(order.routing);
                        await props.setOrderNumber(order.order_number);
                        await props.setTripNumber(order.trip_number === 0 ? '' : order.trip_number);

                        await props.setSelectedBillToCompanyInfo({ ...order.bill_to_company });

                        await props.setSelectedBillToCompanyContact({ ...(order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) });

                        let pickup_id = (order.routing || []).find(r => r.type === 'pickup')?.pickup_id || 0;
                        let pickup = { ...((order.pickups || []).find(p => p.id === pickup_id) || (order.pickups || [])[0]) };

                        await props.setSelectedShipperCompanyInfo(pickup.id === undefined ? {} : {
                            ...pickup.customer,
                            pickup_id: pickup.id,
                            pu_date1: pickup.pu_date1,
                            pu_date2: pickup.pu_date2,
                            pu_time1: pickup.pu_time1,
                            pu_time2: pickup.pu_time2,
                            bol_numbers: pickup.bol_numbers,
                            po_numbers: pickup.po_numbers,
                            ref_numbers: pickup.ref_numbers,
                            seal_number: pickup.seal_number,
                            special_instructions: pickup.special_instructions,
                            type: pickup.type,
                        });

                        await props.setSelectedShipperCompanyContact({ ...(pickup.contacts || []).find(c => c.is_primary === 1) });


                        let delivery_id = (order.routing || []).find(r => r.type === 'delivery')?.delivery_id || 0;
                        let delivery = { ...((order.deliveries || []).find(d => d.id === delivery_id) || (order.deliveries || [])[0]) };

                        await props.setSelectedConsigneeCompanyInfo(delivery.id === undefined ? {} : {
                            ...delivery.customer,
                            delivery_id: delivery.id,
                            delivery_date1: delivery.pu_date1,
                            delivery_date2: delivery.pu_date2,
                            delivery_time1: delivery.pu_time1,
                            delivery_time2: delivery.pu_time2,
                            special_instructions: delivery.special_instructions,
                            type: delivery.type,
                        });

                        await props.setSelectedConsigneeCompanyContact({ ...(delivery.contacts || []).find(c => c.is_primary === 1) });

                        await props.setSelectedDispatchCarrierInfoCarrier({ ...order.carrier });
                        await props.setSelectedDispatchCarrierInfoContact({ ...(order.carrier?.contacts || []).find(c => c.is_primary === 1) });


                        await props.setSelectedDispatchCarrierInfoDriver({
                            ...order.driver,
                            name: (order.driver?.first_name || '') + ((order.driver?.last_name || '').trim() === '' ? '' : ' ' + (order.driver?.last_name || ''))
                        });

                        await props.setDivision({ name: order.division });
                        await props.setLoadType({ name: order.load_type });
                        await props.setTemplate({ name: order.template });
                    } else {
                        await props.setOrderNumber(props.selected_order?.trip_number || '');
                    }
                }).catch(e => {
                    console.log('error getting order by trip number', e);
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

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                bol_numbers: ((props.selectedShipperCompanyInfo?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim()
            });


            await props.setSelectedOrder({
                ...props.selected_order,
                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                    if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                        pu.bol_numbers = ((props.selectedShipperCompanyInfo?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim();
                    }
                    return pu;
                })
            });
            await props.setShipperBolNumber('');
            refBolNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
        if (keyCode === 9) {
            if (props.shipperBolNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                bol_numbers: ((props.selectedShipperCompanyInfo?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim()
            });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                    pu.bol_numbers = ((props.selectedShipperCompanyInfo?.bol_numbers || '') + ' ' + props.shipperBolNumber).trim();
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperBolNumber('');
            refBolNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
    }

    const poNumbersOnKeydown = async (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                po_numbers: ((props.selectedShipperCompanyInfo?.po_numbers || '') + ' ' + props.shipperPoNumber).trim()
            });


            await props.setSelectedOrder({
                ...props.selected_order,
                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                    if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                        pu.po_numbers = ((props.selectedShipperCompanyInfo?.po_numbers || '') + ' ' + props.shipperPoNumber).trim();
                    }
                    return pu;
                })
            });
            await props.setShipperPoNumber('');
            refPoNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
        if (keyCode === 9) {
            if (props.shipperPoNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                po_numbers: ((props.selectedShipperCompanyInfo?.po_numbers || '') + ' ' + props.shipperPoNumber).trim()
            });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                    pu.po_numbers = ((props.selectedShipperCompanyInfo?.po_numbers || '') + ' ' + props.shipperPoNumber).trim();
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperPoNumber('');
            refPoNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
    }

    const refNumbersOnKeydown = async (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                ref_numbers: ((props.selectedShipperCompanyInfo?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim()
            });


            await props.setSelectedOrder({
                ...props.selected_order,
                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                    if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                        pu.ref_numbers = ((props.selectedShipperCompanyInfo?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim();
                    }
                    return pu;
                })
            });
            await props.setShipperRefNumber('');
            refRefNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
        if (keyCode === 9) {
            if (props.shipperRefNumber || '' !== '') {
                e.preventDefault();
                e.stopPropagation();
            }

            await props.setSelectedShipperCompanyInfo({
                ...props.selectedShipperCompanyInfo,
                ref_numbers: ((props.selectedShipperCompanyInfo?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim()
            });

            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                    pu.ref_numbers = ((props.selectedShipperCompanyInfo?.ref_numbers || '') + ' ' + props.shipperRefNumber).trim();
                }
                return pu;
            })

            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
            await props.setShipperRefNumber('');
            refRefNumbers.current.focus();

            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
        }
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

    const getPickupsOnRouting = () => {
        let pickups = [];

        (props.selected_order?.routing || []).map((r, i) => {
            if (r.type === 'pickup') {
                pickups.push(props.selected_order.pickups.find(p => p.id === r.pickup_id))
            }
            return false;
        })

        return pickups;
    }

    const getDeliveriesOnRouting = () => {
        let deliveries = [];

        (props.selected_order?.routing || []).map((r, i) => {
            if (r.type === 'delivery') {
                deliveries.push(props.selected_order.deliveries.find(d => d.id === r.delivery_id))
            }
            return false;
        })

        return deliveries;
    }

    return (
        <div className="dispatch-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px',
            background: props.isOnPanel ? 'transparent' : 'rgb(250, 250, 250)',
            background: props.isOnPanel ? 'transparent' : '-moz-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : '-webkit-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : 'radial-gradient(ellipse at center, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            padding: props.isOnPanel ? '10px 0' : 10
        }}>

            <PanelContainer />

            <div className="fields-container-row">
                <div className="fields-container-col" style={{ minWidth: '91%', maxWidth: '91%', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexGrow: 1, flexBasis: '100%', alignItems: 'center' }}>
                        <div style={{ minWidth: '38%', maxWidth: '38%', marginRight: 10 }}>
                            <div className="form-borderless-box">
                                <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <div className="input-box-container" style={{ width: '9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>A/E Number:</div>
                                        <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" readOnly={true}
                                            onChange={(e) => { }}
                                            value={props.selected_order?.ae_number || ''}
                                        />
                                    </div>

                                    <div className="input-box-container" style={{ width: '9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Order Number</div>
                                        <input style={{ textAlign: 'right', fontWeight: 'bold' }} tabIndex={1 + props.tabTimes} type="text"
                                            ref={refOrderNumber}
                                            onKeyDown={getOrderByOrderNumber}
                                            onChange={(e) => { props.setOrderNumber(e.target.value) }}
                                            value={props.order_number || ''}
                                        />
                                    </div>

                                    <div className="input-box-container" style={{ width: '9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Trip Number</div>
                                        <input style={{ textAlign: 'right', fontWeight: 'bold' }} tabIndex={2 + props.tabTimes} type="text"
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
                                            }
                                        />
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

                                    <div className="select-box-container" style={{ width: '9rem' }}>
                                        <div className="select-box-wrapper">
                                            <input type="text"
                                                tabIndex={3 + props.tabTimes}
                                                placeholder="Division"
                                                ref={refDivision}
                                                onKeyDown={async (e) => {
                                                    let key = e.keyCode || e.which;

                                                    switch (key) {
                                                        case 37: case 38: // arrow left | arrow up
                                                            e.preventDefault();
                                                            if (divisionItems.length > 0) {
                                                                let selectedIndex = divisionItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setDivisionItems(divisionItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setDivisionItems(divisionItems.map((item, index) => {
                                                                        if (selectedIndex === 0) {
                                                                            item.selected = index === (divisionItems.length - 1);
                                                                        } else {
                                                                            item.selected = index === (selectedIndex - 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refDivisionPopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getDivisions').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setDivisionItems(res.data.divisions.map((item, index) => {
                                                                            item.selected = (props.selected_order?.division?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.division.id
                                                                            return item;
                                                                        }))

                                                                        refDivisionPopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting divisions', e);
                                                                })
                                                            }
                                                            break;

                                                        case 39: case 40: // arrow right | arrow down
                                                            e.preventDefault();
                                                            if (divisionItems.length > 0) {
                                                                let selectedIndex = divisionItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setDivisionItems(divisionItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setDivisionItems(divisionItems.map((item, index) => {
                                                                        if (selectedIndex === (divisionItems.length - 1)) {
                                                                            item.selected = index === 0;
                                                                        } else {
                                                                            item.selected = index === (selectedIndex + 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refDivisionPopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getDivisions').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setDivisionItems(res.data.divisions.map((item, index) => {
                                                                            item.selected = (props.selected_order?.division?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.division.id
                                                                            return item;
                                                                        }))

                                                                        refDivisionPopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting divisions', e);
                                                                })
                                                            }
                                                            break;

                                                        case 27: // escape
                                                            setDivisionItems([]);
                                                            break;

                                                        case 13: // enter
                                                            if (divisionItems.length > 0 && divisionItems.findIndex(item => item.selected) > -1) {
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    division: divisionItems[divisionItems.findIndex(item => item.selected)],
                                                                    division_id: divisionItems[divisionItems.findIndex(item => item.selected)].id
                                                                });

                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setDivisionItems([]);
                                                                refDivision.current.focus();
                                                            }
                                                            break;

                                                        case 9: // tab
                                                            if (divisionItems.length > 0) {
                                                                e.preventDefault();
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    division: divisionItems[divisionItems.findIndex(item => item.selected)],
                                                                    division_id: divisionItems[divisionItems.findIndex(item => item.selected)].id
                                                                });
                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setDivisionItems([]);
                                                                refDivision.current.focus();
                                                            }
                                                            break;

                                                        default:
                                                            break;
                                                    }
                                                }}
                                                onBlur={async () => {
                                                    if ((props.selected_order?.division?.id || 0) === 0) {
                                                        await props.setSelectedOrder({ ...props.selected_order, division: {} });
                                                    }
                                                }}
                                                onInput={async (e) => {
                                                    let division = props.selected_order?.division || {};
                                                    division.id = 0;
                                                    division.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, division: division, division_id: division.id });

                                                    if (e.target.value.trim() === '') {
                                                        setDivisionItems([]);
                                                    } else {
                                                        axios.post(props.serverUrl + '/getDivisions', {
                                                            name: e.target.value.trim()
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setDivisionItems(res.data.divisions.map((item, index) => {
                                                                    item.selected = (props.selected_order?.division?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.division.id
                                                                    return item;
                                                                }))
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting divisions', e);
                                                        })
                                                    }
                                                }}
                                                onChange={async (e) => {
                                                    let division = props.selected_order?.division || {};
                                                    division.id = 0;
                                                    division.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, division: division, division_id: division.id });
                                                }}
                                                value={props.selected_order?.division?.name || ''}
                                            />
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                                if (divisionItems.length > 0) {
                                                    setDivisionItems([]);
                                                } else {
                                                    if ((props.selected_order?.division?.id || 0) === 0 && (props.selected_order?.division?.name || '') !== '') {
                                                        axios.post(props.serverUrl + '/getDivisions', {
                                                            name: props.selected_order?.division.name
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setDivisionItems(res.data.divisions.map((item, index) => {
                                                                    item.selected = (props.selected_order?.division?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.division.id
                                                                    return item;
                                                                }))

                                                                refDivisionPopupItems.current.map((r, i) => {
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
                                                            console.log('error getting divisions', e);
                                                        })
                                                    } else {
                                                        axios.post(props.serverUrl + '/getDivisions').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setDivisionItems(res.data.divisions.map((item, index) => {
                                                                    item.selected = (props.selected_order?.division?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.division.id
                                                                    return item;
                                                                }))

                                                                refDivisionPopupItems.current.map((r, i) => {
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
                                                            console.log('error getting divisions', e);
                                                        })
                                                    }
                                                }

                                                refDivision.current.focus();
                                            }} />
                                        </div>

                                        <Transition
                                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            items={divisionItems.length > 0}
                                            config={{ duration: 100 }}
                                        >
                                            {show => show && (styles => (
                                                <div
                                                    className="mochi-contextual-container"
                                                    id="mochi-contextual-container-division"
                                                    style={{
                                                        ...styles,
                                                        left: '-50%',
                                                        display: 'block'
                                                    }}
                                                    ref={refDivisionDropDown}
                                                >
                                                    <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                        <div className="mochi-contextual-popup-content" >
                                                            <div className="mochi-contextual-popup-wrapper">
                                                                {
                                                                    divisionItems.map((item, index) => {
                                                                        const mochiItemClasses = classnames({
                                                                            'mochi-item': true,
                                                                            'selected': item.selected
                                                                        });

                                                                        const searchValue = (props.selected_order?.division?.id || 0) === 0 && (props.selected_order?.division?.name || '') !== ''
                                                                            ? props.selected_order?.division?.name : undefined;

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className={mochiItemClasses}
                                                                                id={item.id}
                                                                                onClick={() => {
                                                                                    props.setSelectedOrder({ ...props.selected_order, division: item });

                                                                                    window.setTimeout(() => {
                                                                                        validateOrderForSaving({ keyCode: 9 });
                                                                                        setDivisionItems([]);
                                                                                        refDivision.current.focus();
                                                                                    }, 0);
                                                                                }}
                                                                                ref={ref => refDivisionPopupItems.current.push(ref)}
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

                                    <div className="select-box-container" style={{ width: '9rem' }}>
                                        <div className="select-box-wrapper">
                                            <input type="text"
                                                tabIndex={4 + props.tabTimes}
                                                placeholder="Load Type"
                                                ref={refLoadType}
                                                onKeyDown={async (e) => {
                                                    let key = e.keyCode || e.which;

                                                    switch (key) {
                                                        case 37: case 38: // arrow left | arrow up
                                                            e.preventDefault();
                                                            if (loadTypeItems.length > 0) {
                                                                let selectedIndex = loadTypeItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setLoadTypeItems(loadTypeItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setLoadTypeItems(loadTypeItems.map((item, index) => {
                                                                        if (selectedIndex === 0) {
                                                                            item.selected = index === (loadTypeItems.length - 1);
                                                                        } else {
                                                                            item.selected = index === (selectedIndex - 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refLoadTypePopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getLoadTypes').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setLoadTypeItems(res.data.load_types.map((item, index) => {
                                                                            item.selected = (props.selected_order?.load_type?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.load_type.id
                                                                            return item;
                                                                        }))

                                                                        refLoadTypePopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting load types', e);
                                                                })
                                                            }
                                                            break;

                                                        case 39: case 40: // arrow right | arrow down
                                                            e.preventDefault();
                                                            if (loadTypeItems.length > 0) {
                                                                let selectedIndex = loadTypeItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setLoadTypeItems(loadTypeItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setLoadTypeItems(loadTypeItems.map((item, index) => {
                                                                        if (selectedIndex === (loadTypeItems.length - 1)) {
                                                                            item.selected = index === 0;
                                                                        } else {
                                                                            item.selected = index === (selectedIndex + 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refLoadTypePopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getLoadTypes').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setLoadTypeItems(res.data.load_types.map((item, index) => {
                                                                            item.selected = (props.selected_order?.load_type?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.load_type.id
                                                                            return item;
                                                                        }))

                                                                        refLoadTypePopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting load types', e);
                                                                })
                                                            }
                                                            break;

                                                        case 27: // escape
                                                            setLoadTypeItems([]);
                                                            break;

                                                        case 13: // enter
                                                            if (loadTypeItems.length > 0 && loadTypeItems.findIndex(item => item.selected) > -1) {
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    load_type: loadTypeItems[loadTypeItems.findIndex(item => item.selected)],
                                                                    load_type_id: loadTypeItems[loadTypeItems.findIndex(item => item.selected)].id
                                                                });
                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setLoadTypeItems([]);
                                                                refLoadType.current.focus();
                                                            }
                                                            break;

                                                        case 9: // tab
                                                            if (loadTypeItems.length > 0) {
                                                                e.preventDefault();
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    load_type: loadTypeItems[loadTypeItems.findIndex(item => item.selected)],
                                                                    load_type_id: loadTypeItems[loadTypeItems.findIndex(item => item.selected)].id
                                                                });
                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setLoadTypeItems([]);
                                                                refLoadType.current.focus();
                                                            }
                                                            break;

                                                        default:
                                                            break;
                                                    }
                                                }}
                                                onBlur={async () => {
                                                    if ((props.selected_order?.load_type?.id || 0) === 0) {
                                                        await props.setSelectedOrder({ ...props.selected_order, load_type: {} });
                                                    }
                                                }}
                                                onInput={async (e) => {
                                                    let load_type = props.selected_order?.load_type || {};
                                                    load_type.id = 0;
                                                    load_type.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, load_type: load_type, load_type_id: load_type.id });

                                                    if (e.target.value.trim() === '') {
                                                        setLoadTypeItems([]);
                                                    } else {
                                                        axios.post(props.serverUrl + '/getLoadTypes', {
                                                            name: e.target.value.trim()
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setLoadTypeItems(res.data.load_types.map((item, index) => {
                                                                    item.selected = (props.selected_order?.load_type?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.load_type.id
                                                                    return item;
                                                                }))
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting load types', e);
                                                        })
                                                    }
                                                }}
                                                onChange={async (e) => {
                                                    let load_type = props.selected_order?.load_type || {};
                                                    load_type.id = 0;
                                                    load_type.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, load_type: load_type, load_type_id: load_type.id });
                                                }}
                                                value={props.selected_order?.load_type?.name || ''}
                                            />
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                                if (loadTypeItems.length > 0) {
                                                    setLoadTypeItems([]);
                                                } else {
                                                    if ((props.selected_order?.load_type?.id || 0) === 0 && (props.selected_order?.load_type?.name || '') !== '') {
                                                        axios.post(props.serverUrl + '/getLoadTypes', {
                                                            name: props.selected_order?.load_type.name
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setLoadTypeItems(res.data.load_types.map((item, index) => {
                                                                    item.selected = (props.selected_order?.load_type?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.load_type.id
                                                                    return item;
                                                                }))

                                                                refLoadTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting load types', e);
                                                        })
                                                    } else {
                                                        axios.post(props.serverUrl + '/getLoadTypes').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setLoadTypeItems(res.data.load_types.map((item, index) => {
                                                                    item.selected = (props.selected_order?.load_type?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.load_type.id
                                                                    return item;
                                                                }))

                                                                refLoadTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting load types', e);
                                                        })
                                                    }
                                                }

                                                refLoadType.current.focus();
                                            }} />
                                        </div>

                                        <Transition
                                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            items={loadTypeItems.length > 0}
                                            config={{ duration: 100 }}
                                        >
                                            {show => show && (styles => (
                                                <div
                                                    className="mochi-contextual-container"
                                                    id="mochi-contextual-container-load-type"
                                                    style={{
                                                        ...styles,
                                                        left: '-50%',
                                                        display: 'block'
                                                    }}
                                                    ref={refLoadTypeDropDown}
                                                >
                                                    <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                        <div className="mochi-contextual-popup-content" >
                                                            <div className="mochi-contextual-popup-wrapper">
                                                                {
                                                                    loadTypeItems.map((item, index) => {
                                                                        const mochiItemClasses = classnames({
                                                                            'mochi-item': true,
                                                                            'selected': item.selected
                                                                        });

                                                                        const searchValue = (props.selected_order?.load_type?.id || 0) === 0 && (props.selected_order?.load_type?.name || '') !== ''
                                                                            ? props.selected_order?.load_type?.name : undefined;

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className={mochiItemClasses}
                                                                                id={item.id}
                                                                                onClick={() => {
                                                                                    props.setSelectedOrder({ ...props.selected_order, load_type: item });

                                                                                    window.setTimeout(() => {
                                                                                        validateOrderForSaving({ keyCode: 9 });
                                                                                        setLoadTypeItems([]);
                                                                                        refLoadType.current.focus();
                                                                                    },0);
                                                                                }}
                                                                                ref={ref => refLoadTypePopupItems.current.push(ref)}
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

                                    <div className="select-box-container" style={{ width: '9rem' }}>
                                        <div className="select-box-wrapper">
                                            <input type="text"
                                                tabIndex={5 + props.tabTimes}
                                                placeholder="Template"
                                                ref={refTemplate}
                                                onKeyDown={async (e) => {
                                                    let key = e.keyCode || e.which;

                                                    switch (key) {
                                                        case 37: case 38: // arrow left | arrow up
                                                            e.preventDefault();
                                                            if (templateItems.length > 0) {
                                                                let selectedIndex = templateItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setTemplateItems(templateItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setTemplateItems(templateItems.map((item, index) => {
                                                                        if (selectedIndex === 0) {
                                                                            item.selected = index === (templateItems.length - 1);
                                                                        } else {
                                                                            item.selected = index === (selectedIndex - 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refTemplatePopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getTemplates').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setTemplateItems(res.data.templates.map((item, index) => {
                                                                            item.selected = (props.selected_order?.template?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.template.id
                                                                            return item;
                                                                        }))

                                                                        refTemplatePopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting templates', e);
                                                                })
                                                            }
                                                            break;

                                                        case 39: case 40: // arrow right | arrow down
                                                            e.preventDefault();
                                                            if (templateItems.length > 0) {
                                                                let selectedIndex = templateItems.findIndex(item => item.selected);

                                                                if (selectedIndex === -1) {
                                                                    await setTemplateItems(templateItems.map((item, index) => {
                                                                        item.selected = index === 0;
                                                                        return item;
                                                                    }))
                                                                } else {
                                                                    await setTemplateItems(templateItems.map((item, index) => {
                                                                        if (selectedIndex === (templateItems.length - 1)) {
                                                                            item.selected = index === 0;
                                                                        } else {
                                                                            item.selected = index === (selectedIndex + 1)
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }

                                                                refTemplatePopupItems.current.map((r, i) => {
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
                                                                axios.post(props.serverUrl + '/getTemplates').then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await setTemplateItems(res.data.templates.map((item, index) => {
                                                                            item.selected = (props.selected_order?.template?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selected_order.template.id
                                                                            return item;
                                                                        }))

                                                                        refTemplatePopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting templates', e);
                                                                })
                                                            }
                                                            break;

                                                        case 27: // escape
                                                            setTemplateItems([]);
                                                            break;

                                                        case 13: // enter
                                                            if (templateItems.length > 0 && templateItems.findIndex(item => item.selected) > -1) {
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    template: templateItems[templateItems.findIndex(item => item.selected)],
                                                                    template_id: templateItems[templateItems.findIndex(item => item.selected)].id
                                                                });
                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setTemplateItems([]);
                                                                refTemplate.current.focus();
                                                            }
                                                            break;

                                                        case 9: // tab
                                                            if (templateItems.length > 0) {
                                                                e.preventDefault();
                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    template: templateItems[templateItems.findIndex(item => item.selected)],
                                                                    template_id: templateItems[templateItems.findIndex(item => item.selected)].id
                                                                });
                                                                validateOrderForSaving({ keyCode: 9 });
                                                                setTemplateItems([]);
                                                                refTemplate.current.focus();
                                                            }
                                                            break;

                                                        default:
                                                            break;
                                                    }
                                                }}
                                                onBlur={async () => {
                                                    if ((props.selected_order?.template?.id || 0) === 0) {
                                                        await props.setSelectedOrder({ ...props.selected_order, template: {} });
                                                    }
                                                }}
                                                onInput={async (e) => {
                                                    let template = props.selected_order?.template || {};
                                                    template.id = 0;
                                                    template.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, template: template, template_id: template.id });

                                                    if (e.target.value.trim() === '') {
                                                        setTemplateItems([]);
                                                    } else {
                                                        axios.post(props.serverUrl + '/getTemplates', {
                                                            name: e.target.value.trim()
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setTemplateItems(res.data.templates.map((item, index) => {
                                                                    item.selected = (props.selected_order?.template?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.template.id
                                                                    return item;
                                                                }))
                                                            }
                                                        }).catch(async e => {
                                                            console.log('error getting templates', e);
                                                        })
                                                    }
                                                }}
                                                onChange={async (e) => {
                                                    let template = props.selected_order?.template || {};
                                                    template.id = 0;
                                                    template.name = e.target.value;
                                                    await props.setSelectedOrder({ ...props.selected_order, template: template, template_id: template.id });
                                                }}
                                                value={props.selected_order?.template?.name || ''}
                                            />
                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                                if (templateItems.length > 0) {
                                                    setTemplateItems([]);
                                                } else {
                                                    if ((props.selected_order?.template?.id || 0) === 0 && (props.selected_order?.template?.name || '') !== '') {
                                                        axios.post(props.serverUrl + '/getTemplates', {
                                                            name: props.selected_order?.template.name
                                                        }).then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setTemplateItems(res.data.templates.map((item, index) => {
                                                                    item.selected = (props.selected_order?.template?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.template.id
                                                                    return item;
                                                                }))

                                                                refTemplatePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting templates', e);
                                                        })
                                                    } else {
                                                        axios.post(props.serverUrl + '/getTemplates').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setTemplateItems(res.data.templates.map((item, index) => {
                                                                    item.selected = (props.selected_order?.template?.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === props.selected_order.template.id
                                                                    return item;
                                                                }))

                                                                refTemplatePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting templates', e);
                                                        })
                                                    }
                                                }

                                                refTemplate.current.focus();
                                            }} />
                                        </div>

                                        <Transition
                                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                            items={templateItems.length > 0}
                                            config={{ duration: 100 }}
                                        >
                                            {show => show && (styles => (
                                                <div
                                                    className="mochi-contextual-container"
                                                    id="mochi-contextual-container-template"
                                                    style={{
                                                        ...styles,
                                                        left: '-50%',
                                                        display: 'block'
                                                    }}
                                                    ref={refTemplateDropDown}
                                                >
                                                    <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                        <div className="mochi-contextual-popup-content" >
                                                            <div className="mochi-contextual-popup-wrapper">
                                                                {
                                                                    templateItems.map((item, index) => {
                                                                        const mochiItemClasses = classnames({
                                                                            'mochi-item': true,
                                                                            'selected': item.selected
                                                                        });

                                                                        const searchValue = (props.selected_order?.template?.id || 0) === 0 && (props.selected_order?.template?.name || '') !== ''
                                                                            ? props.selected_order?.template?.name : undefined;

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className={mochiItemClasses}
                                                                                id={item.id}
                                                                                onClick={() => {
                                                                                    props.setSelectedOrder({ ...props.selected_order, template: item });

                                                                                    window.setTimeout(() => {
                                                                                        validateOrderForSaving({ keyCode: 9 });
                                                                                        setTemplateItems([]);
                                                                                        refTemplate.current.focus();
                                                                                    });
                                                                                }}
                                                                                ref={ref => refTemplatePopupItems.current.push(ref)}
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

                                        if (!props.openedPanels.includes(props.billToCompanyInfoPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.billToCompanyInfoPanelName]);
                                        }
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Company info</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className='mochi-button' onClick={() => {
                                        if (!props.openedPanels.includes(props.ratingScreenPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.ratingScreenPanelName])
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
                                        onInput={e => {
                                            props.setSelectedBillToCompanyInfo({
                                                ...props.selectedBillToCompanyInfo,
                                                code: e.target.value,
                                                code_number: 0
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedBillToCompanyInfo({
                                                ...props.selectedBillToCompanyInfo,
                                                code: e.target.value,
                                                code_number: 0
                                            })
                                        }}
                                        value={(props.selectedBillToCompanyInfo.code_number || 0) === 0 ? (props.selectedBillToCompanyInfo.code || '') : props.selectedBillToCompanyInfo.code + props.selectedBillToCompanyInfo.code_number}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={7 + props.tabTimes} type="text" placeholder="Name"
                                        // onKeyDown={validateBillToCompanyInfoForSaving}
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
                                        // onKeyDown={validateBillToCompanyInfoForSaving}
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
                                        // onKeyDown={validateBillToCompanyInfoForSaving}
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
                                        // onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.city || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={11 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                        // onKeyDown={validateBillToCompanyInfoForSaving}
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
                                        // onKeyDown={validateBillToCompanyContactForSaving}
                                        onChange={(e) => {
                                            // let splitted = e.target.value.split(' ');
                                            // let first_name = splitted[0];

                                            // if (splitted.length > 1) {
                                            //     first_name += ' ';
                                            // }


                                            // let last_name = '';

                                            // splitted.map((item, index) => {
                                            //     if (index > 0) {
                                            //         last_name += item;
                                            //     }
                                            //     return true;
                                            // })

                                            // props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });

                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value })
                                            }
                                        }}

                                        onInput={(e) => {
                                            // let splitted = e.target.value.split(' ');
                                            // let first_name = splitted[0];

                                            // if (splitted.length > 1) {
                                            //     first_name += ' ';
                                            // }

                                            // let last_name = '';

                                            // splitted.map((item, index) => {
                                            //     if (index > 0) {
                                            //         last_name += item;
                                            //     }
                                            //     return true;
                                            // })

                                            // props.setSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });

                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_name: e.target.value })
                                            }
                                        }}

                                        value={
                                            (props.selectedBillToCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedBillToCompanyInfo?.contact_name || '')
                                                : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).last_name
                                        }
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone" style={{ position: 'relative' }}>
                                    <MaskedInput tabIndex={14 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        // onKeyDown={validateBillToCompanyContactForSaving}
                                        onInput={(e) => {
                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value })
                                            }
                                        }}
                                        value={
                                            (props.selectedBillToCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedBillToCompanyInfo?.contact_phone || '')
                                                : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                    ? props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work
                                                    : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                        ? props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                        : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                            ? props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                            : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                                ? props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_direct
                                                                : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                    ? props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_other
                                                                    : ''
                                        }
                                    />

                                    {
                                        ((props.selectedBillToCompanyInfo?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                        <div
                                            className={classnames({
                                                'selected-customer-contact-primary-phone': true,
                                                'pushed': false
                                            })}>
                                            {props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone}
                                        </div>
                                    }
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={15 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateBillToCompanyContactForSaving}
                                        onInput={(e) => {
                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedBillToCompanyInfo?.contacts || []).length === 0) {
                                                props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value })
                                            }
                                        }}
                                        value={
                                            (props.selectedBillToCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedBillToCompanyInfo?.ext || '')
                                                : props.selectedBillToCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_ext
                                        }
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

                                        if (!props.openedPanels.includes(props.carrierInfoPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.carrierInfoPanelName])
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

                                        onInput={e => {
                                            props.setSelectedDispatchCarrierInfoCarrier({
                                                ...props.selectedDispatchCarrierInfoCarrier,
                                                code: e.target.value,
                                                code_number: 0
                                            })
                                        }}
                                        onChange={e => {
                                            props.setSelectedDispatchCarrierInfoCarrier({
                                                ...props.selectedDispatchCarrierInfoCarrier,
                                                code: e.target.value,
                                                code_number: 0
                                            })
                                        }}
                                        value={(props.selectedDispatchCarrierInfoCarrier.code_number || 0) === 0 ? (props.selectedDispatchCarrierInfoCarrier.code || '') : props.selectedDispatchCarrierInfoCarrier.code + props.selectedDispatchCarrierInfoCarrier.code_number}
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
                                        value={
                                            ((props.selected_order?.routing || []).length >= 2 && (props.selected_order?.carrier?.id || 0) > 0)
                                                ? props.selected_order.routing[0].type === 'pickup'
                                                    ? ((props.selected_order.pickups.find(p => p.id === props.selected_order.routing[0].pickup_id).customer?.city || '') + ', ' + (props.selected_order.pickups.find(p => p.id === props.selected_order.routing[0].pickup_id).customer?.state || '') +
                                                        ' - ' + (props.selected_order.routing[props.selected_order.routing.length - 1].type === 'pickup'
                                                            ? (props.selected_order.pickups.find(p => p.id === props.selected_order.routing[props.selected_order.routing.length - 1].pickup_id).customer?.city || '') + ', ' + (props.selected_order.pickups.find(p => p.id === props.selected_order.routing[props.selected_order.routing.length - 1].pickup_id).customer?.state || '') :
                                                            (props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[props.selected_order.routing.length - 1].delivery_id).customer?.city || '') + ', ' + (props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[props.selected_order.routing.length - 1].delivery_id).customer?.state || '')))

                                                    : ((props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[0].delivery_id).customer?.city || '') + ', ' + (props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[0].delivery_id).customer?.state || '') +
                                                        ' - ' + (props.selected_order.routing[props.selected_order.routing.length - 1].type === 'pickup'
                                                            ? (props.selected_order.pickups.find(p => p.id === props.selected_order.routing[props.selected_order.routing.length - 1].pickup_id).customer?.city || '') + ', ' + (props.selected_order.pickups.find(p => p.id === props.selected_order.routing[props.selected_order.routing.length - 1].pickup_id).customer?.state || '') :
                                                            (props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[props.selected_order.routing.length - 1].delivery_id).customer?.city || '') + ', ' + (props.selected_order.deliveries.find(d => d.id === props.selected_order.routing[props.selected_order.routing.length - 1].delivery_id).customer?.state || '')))
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={53 + props.tabTimes} type="text" placeholder="Contact Name"
                                        // onKeyDown={validateCarrierContactForSaving}
                                        onChange={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_name: e.target.value })
                                            }
                                        }}
                                        onInput={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_name: e.target.value })
                                            }
                                        }}

                                        value={
                                            (props.selectedDispatchCarrierInfoCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedDispatchCarrierInfoCarrier?.contact_name || '')
                                                : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).last_name
                                        }
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow" style={{ position: 'relative' }}>
                                    <MaskedInput tabIndex={54 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        // onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_phone: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, contact_phone: e.target.value })
                                            }
                                        }}
                                        value={
                                            (props.selectedDispatchCarrierInfoCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedDispatchCarrierInfoCarrier?.contact_phone || '')
                                                : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                    ? props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_work
                                                    : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                        ? props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                        : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                            ? props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                            : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                                ? props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_direct
                                                                : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                    ? props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_other
                                                                    : ''
                                        }
                                    />

                                    {
                                        ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                        <div
                                            className={classnames({
                                                'selected-carrier-contact-primary-phone': true,
                                                'pushed': false
                                            })}>
                                            {props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).primary_phone}
                                        </div>
                                    }
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={55 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, ext: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedDispatchCarrierInfoCarrier?.contacts || []).length === 0) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, ext: e.target.value })
                                            }
                                        }}
                                        value={
                                            (props.selectedDispatchCarrierInfoCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (props.selectedDispatchCarrierInfoCarrier?.ext || '')
                                                : props.selectedDispatchCarrierInfoCarrier?.contacts.find(c => c.is_primary === 1).phone_ext
                                        }
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="select-box-container" style={{ width: '9rem' }}>
                                    <div className="select-box-wrapper">
                                        <input type="text"
                                            tabIndex={56 + props.tabTimes}
                                            placeholder="Equipment"
                                            ref={refEquipment}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (equipmentItems.length > 0) {
                                                            let selectedIndex = equipmentItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEquipmentItems(equipmentItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEquipmentItems(equipmentItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (equipmentItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEquipmentPopupItems.current.map((r, i) => {
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
                                                            axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    await setEquipmentItems(res.data.equipments.map((item, index) => {
                                                                        item.selected = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                            ? index === 0
                                                                            : item.id === props.selectedDispatchCarrierInfoDriver.equipment.id
                                                                        return item;
                                                                    }))

                                                                    refEquipmentPopupItems.current.map((r, i) => {
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
                                                                console.log('error getting equipments', e);
                                                            })
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (equipmentItems.length > 0) {
                                                            let selectedIndex = equipmentItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setEquipmentItems(equipmentItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setEquipmentItems(equipmentItems.map((item, index) => {
                                                                    if (selectedIndex === (equipmentItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refEquipmentPopupItems.current.map((r, i) => {
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
                                                            axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    await setEquipmentItems(res.data.equipments.map((item, index) => {
                                                                        item.selected = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                            ? index === 0
                                                                            : item.id === props.selectedDispatchCarrierInfoDriver.equipment.id
                                                                        return item;
                                                                    }))

                                                                    refEquipmentPopupItems.current.map((r, i) => {
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
                                                                console.log('error getting equipments', e);
                                                            })
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setEquipmentItems([]);
                                                        break;

                                                    case 13: // enter
                                                        if (equipmentItems.length > 0 && equipmentItems.findIndex(item => item.selected) > -1) {
                                                            await props.setSelectedDispatchCarrierInfoDriver({
                                                                ...props.selectedDispatchCarrierInfoDriver,
                                                                equipment: equipmentItems[equipmentItems.findIndex(item => item.selected)],
                                                                equipment_id: equipmentItems[equipmentItems.findIndex(item => item.selected)].id
                                                            });
                                                            validateCarrierDriverForSaving({ keyCode: 9 });
                                                            setEquipmentItems([]);
                                                            refEquipment.current.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (equipmentItems.length > 0) {
                                                            e.preventDefault();
                                                            await props.setSelectedDispatchCarrierInfoDriver({
                                                                ...props.selectedDispatchCarrierInfoDriver,
                                                                equipment: equipmentItems[equipmentItems.findIndex(item => item.selected)],
                                                                equipment_id: equipmentItems[equipmentItems.findIndex(item => item.selected)].id
                                                            });
                                                            validateCarrierDriverForSaving({ keyCode: 9 });
                                                            setEquipmentItems([]);
                                                            refEquipment.current.focus();
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onBlur={async () => {
                                                if ((props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0) {
                                                    await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment: {} });
                                                }
                                            }}
                                            onInput={async (e) => {
                                                let equipment = props.selectedDispatchCarrierInfoDriver?.equipment || {};
                                                equipment.id = 0;
                                                equipment.name = e.target.value;
                                                await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment: equipment, equipment_id: equipment.id });

                                                if (e.target.value.trim() === '') {
                                                    setEquipmentItems([]);
                                                } else {
                                                    axios.post(props.serverUrl + '/getEquipments', {
                                                        name: e.target.value.trim()
                                                    }).then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
                                                                item.selected = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedDispatchCarrierInfoDriver.equipment.id
                                                                return item;
                                                            }))
                                                        }
                                                    }).catch(async e => {
                                                        console.log('error getting equipments', e);
                                                    })
                                                }
                                            }}
                                            onChange={async (e) => {
                                                let equipment = props.selectedDispatchCarrierInfoDriver?.equipment || {};
                                                equipment.id = 0;
                                                equipment.name = e.target.value;
                                                await props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, equipment: equipment, equipment_id: equipment.id });
                                            }}
                                            value={props.selectedDispatchCarrierInfoDriver?.equipment?.name || ''}
                                        />
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                            if (equipmentItems.length > 0) {
                                                setEquipmentItems([]);
                                            } else {
                                                if ((props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0 && (props.selectedDispatchCarrierInfoDriver?.equipment?.name || '') !== '') {
                                                    axios.post(props.serverUrl + '/getEquipments', {
                                                        name: props.selectedDispatchCarrierInfoDriver?.equipment.name
                                                    }).then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
                                                                item.selected = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedDispatchCarrierInfoDriver.equipment.id
                                                                return item;
                                                            }))

                                                            refEquipmentPopupItems.current.map((r, i) => {
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
                                                        console.log('error getting equipments', e);
                                                    })
                                                } else {
                                                    axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
                                                                item.selected = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedDispatchCarrierInfoDriver.equipment.id
                                                                return item;
                                                            }))

                                                            refEquipmentPopupItems.current.map((r, i) => {
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
                                                        console.log('error getting equipments', e);
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
                                        items={equipmentItems.length > 0}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-equipment"
                                                style={{
                                                    ...styles,
                                                    left: '-50%',
                                                    display: 'block'
                                                }}
                                                ref={refEquipmentDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                equipmentItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = (props.selectedDispatchCarrierInfoDriver?.equipment?.id || 0) === 0 && (props.selectedDispatchCarrierInfoDriver?.equipment?.name || '') !== ''
                                                                        ? props.selectedDispatchCarrierInfoDriver?.equipment?.name : undefined;

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedDispatchCarrierInfoDriver({
                                                                                    ...props.selectedDispatchCarrierInfoDriver,
                                                                                    equipment: item,
                                                                                    equipment_id: item.id
                                                                                });

                                                                                validateCarrierDriverForSaving({ keyCode: 9 });
                                                                                setEquipmentItems([]);
                                                                                refEquipment.current.focus();
                                                                            }}
                                                                            ref={ref => refEquipmentPopupItems.current.push(ref)}
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
                                <div className="select-box-container" style={{ width: '9rem' }}>
                                    <div className="select-box-wrapper">
                                        <input type="text"
                                            tabIndex={57 + props.tabTimes}
                                            placeholder="Driver Name"
                                            ref={refDriverName}
                                            onKeyDown={async (e) => {
                                                let key = e.keyCode || e.which;

                                                switch (key) {
                                                    case 37: case 38: // arrow left | arrow up
                                                        e.preventDefault();
                                                        if (driverItems.length > 0) {
                                                            let selectedIndex = driverItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setDriverItems(driverItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setDriverItems(driverItems.map((item, index) => {
                                                                    if (selectedIndex === 0) {
                                                                        item.selected = index === (driverItems.length - 1);
                                                                    } else {
                                                                        item.selected = index === (selectedIndex - 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refDriverPopupItems.current.map((r, i) => {
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
                                                            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                                                                axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedDispatchCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        if (res.data.count > 0) {
                                                                            await setDriverItems([
                                                                                ...[{
                                                                                    first_name: 'Clear',
                                                                                    id: null
                                                                                }],
                                                                                ...res.data.drivers.map((item, index) => {
                                                                                    item.selected = (props.selectedDispatchCarrierInfoDriver?.id || 0) === 0
                                                                                        ? index === 0
                                                                                        : item.id === props.selectedDispatchCarrierInfoDriver.id;

                                                                                    item.name = item.first_name + (item.last_name.trim() === '' ? '' : ' ' + item.last_name);
                                                                                    return item;
                                                                                })
                                                                            ])

                                                                        } else {
                                                                            await setDriverItems([
                                                                                ...[{
                                                                                    first_name: 'Clear',
                                                                                    id: null
                                                                                }]
                                                                            ])
                                                                        }

                                                                        refDriverPopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting carrier drivers', e);
                                                                })
                                                            }
                                                        }
                                                        break;

                                                    case 39: case 40: // arrow right | arrow down
                                                        e.preventDefault();
                                                        if (driverItems.length > 0) {
                                                            let selectedIndex = driverItems.findIndex(item => item.selected);

                                                            if (selectedIndex === -1) {
                                                                await setDriverItems(driverItems.map((item, index) => {
                                                                    item.selected = index === 0;
                                                                    return item;
                                                                }))
                                                            } else {
                                                                await setDriverItems(driverItems.map((item, index) => {
                                                                    if (selectedIndex === (driverItems.length - 1)) {
                                                                        item.selected = index === 0;
                                                                    } else {
                                                                        item.selected = index === (selectedIndex + 1)
                                                                    }
                                                                    return item;
                                                                }))
                                                            }

                                                            refDriverPopupItems.current.map((r, i) => {
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
                                                            if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                                                                axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedDispatchCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        if (res.data.count > 0) {
                                                                            await setDriverItems([
                                                                                ...[{
                                                                                    first_name: 'Clear',
                                                                                    id: null
                                                                                }],
                                                                                ...res.data.drivers.map((item, index) => {
                                                                                    item.selected = (props.selectedDispatchCarrierInfoDriver?.id || 0) === 0
                                                                                        ? index === 0
                                                                                        : item.id === props.selectedDispatchCarrierInfoDriver.id;

                                                                                    item.name = item.first_name + (item.last_name.trim() === '' ? '' : ' ' + item.last_name);
                                                                                    return item;
                                                                                })
                                                                            ])

                                                                        } else {
                                                                            await setDriverItems([
                                                                                ...[{
                                                                                    first_name: 'Clear',
                                                                                    id: null
                                                                                }]
                                                                            ])
                                                                        }

                                                                        refDriverPopupItems.current.map((r, i) => {
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
                                                                    console.log('error getting carrier drivers', e);
                                                                })
                                                            }
                                                        }
                                                        break;

                                                    case 27: // escape
                                                        setDriverItems([]);
                                                        break;

                                                    case 13: // enter
                                                        if (driverItems.length > 0 && driverItems.findIndex(item => item.selected) > -1) {
                                                            if (driverItems[driverItems.findIndex(item => item.selected)].id === null) {
                                                                await props.setSelectedDispatchCarrierInfoDriver({ name: '' });

                                                                axios.post(props.serverUrl + '/saveOrder', { ...props.selected_order, carrier_driver_id: null }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await props.setSelectedOrder(res.data.order);
                                                                    } else {
                                                                        console.log(res.data.result);
                                                                    }

                                                                    setIsSavingOrder(false);
                                                                }).catch(e => {
                                                                    console.log('error saving order', e);
                                                                    setIsSavingOrder(false);
                                                                });

                                                                refDriverName.current.focus();
                                                            } else {
                                                                await props.setSelectedDispatchCarrierInfoDriver(driverItems[driverItems.findIndex(item => item.selected)]);
                                                                validateCarrierDriverForSaving({ keyCode: 9 });
                                                                refDriverPhone.current.inputElement.focus();
                                                            }

                                                            setDriverItems([]);
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (driverItems.length > 0) {
                                                            e.preventDefault();
                                                            if (driverItems[driverItems.findIndex(item => item.selected)].id === null) {
                                                                await props.setSelectedDispatchCarrierInfoDriver({ name: '' });

                                                                axios.post(props.serverUrl + '/saveOrder', { ...props.selected_order, carrier_driver_id: null }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        await props.setSelectedOrder(res.data.order);
                                                                    } else {
                                                                        console.log(res.data.result);
                                                                    }

                                                                    setIsSavingOrder(false);
                                                                }).catch(e => {
                                                                    console.log('error saving order', e);
                                                                    setIsSavingOrder(false);
                                                                });

                                                                refDriverName.current.focus();
                                                            } else {
                                                                await props.setSelectedDispatchCarrierInfoDriver(driverItems[driverItems.findIndex(item => item.selected)]);
                                                                refDriverPhone.current.inputElement.focus();
                                                            }

                                                            setDriverItems([]);

                                                        }

                                                        await validateCarrierDriverForSaving({ keyCode: 9 });
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if ((props.selectedDispatchCarrierInfoDriver?.id || 0) > 0) {
                                                    if (e.target.value.trim() === '') {
                                                        props.setSelectedDispatchCarrierInfoDriver({ name: '' });
                                                    }
                                                }
                                            }}
                                            onInput={async (e) => {
                                                let driver = props.selectedDispatchCarrierInfoDriver || {};

                                                let splitted = e.target.value.split(' ');
                                                let first_name = splitted[0];

                                                let last_name = '';

                                                splitted.map((item, index) => {
                                                    if (index > 0) {
                                                        last_name += item + (index < (splitted.length - 1) ? ' ' : '');
                                                    }
                                                    return true;
                                                })

                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver, name: e.target.value, first_name: first_name, last_name: last_name });
                                            }}
                                            onChange={async (e) => {
                                                let driver = props.selectedDispatchCarrierInfoDriver || {};

                                                let splitted = e.target.value.split(' ');
                                                let first_name = splitted[0];

                                                let last_name = '';

                                                splitted.map((item, index) => {
                                                    if (index > 0) {
                                                        last_name += item + (index < (splitted.length - 1) ? ' ' : '');
                                                    }
                                                    return true;
                                                })

                                                props.setSelectedDispatchCarrierInfoDriver({ ...driver, name: e.target.value, first_name: first_name, last_name: last_name });
                                            }}
                                            value={(props.selectedDispatchCarrierInfoDriver?.name || '')}
                                        />
                                        {
                                            (props.selectedDispatchCarrierInfoCarrier?.drivers || []).length >= 0 &&

                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                                if (driverItems.length > 0) {
                                                    setDriverItems([]);
                                                } else {
                                                    window.setTimeout(async () => {
                                                        if ((props.selectedDispatchCarrierInfoCarrier?.id || 0) > 0) {
                                                            axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                carrier_id: props.selectedDispatchCarrierInfoCarrier.id
                                                            }).then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    if (res.data.count > 0) {
                                                                        await setDriverItems([
                                                                            ...[{
                                                                                first_name: 'Clear',
                                                                                id: null
                                                                            }],
                                                                            ...res.data.drivers.map((item, index) => {
                                                                                item.selected = (props.selectedDispatchCarrierInfoDriver?.id || 0) === 0
                                                                                    ? index === 0
                                                                                    : item.id === props.selectedDispatchCarrierInfoDriver.id;

                                                                                item.name = item.first_name + (item.last_name.trim() === '' ? '' : ' ' + item.last_name);
                                                                                return item;
                                                                            })
                                                                        ])

                                                                    } else {
                                                                        await setDriverItems([
                                                                            ...[{
                                                                                first_name: 'Clear',
                                                                                id: null
                                                                            }]
                                                                        ])
                                                                    }

                                                                    refDriverPopupItems.current.map((r, i) => {
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
                                                                console.log('error getting carrier drivers', e);
                                                            })
                                                        }

                                                        refDriverName.current.focus();
                                                    }, 0)
                                                }
                                            }} />
                                        }
                                    </div>

                                    <Transition
                                        from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                        leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                        items={driverItems.length > 0}
                                        config={{ duration: 100 }}
                                    >
                                        {show => show && (styles => (
                                            <div
                                                className="mochi-contextual-container"
                                                id="mochi-contextual-container-driver-name"
                                                style={{
                                                    ...styles,
                                                    left: '-50%',
                                                    display: 'block'
                                                }}
                                                ref={refDriverDropDown}
                                            >
                                                <div className="mochi-contextual-popup vertical below" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                driverItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = (props.selectedDispatchCarrierInfoDriver?.first_name || '') + ((props.selectedDispatchCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedDispatchCarrierInfoDriver?.last_name);

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={() => {
                                                                                if (item.id === null) {
                                                                                    props.setSelectedDispatchCarrierInfoDriver({ name: '' });

                                                                                    axios.post(props.serverUrl + '/saveOrder', { ...props.selected_order, carrier_driver_id: null }).then(res => {
                                                                                        if (res.data.result === 'OK') {
                                                                                            props.setSelectedOrder(res.data.order);
                                                                                        } else {
                                                                                            console.log(res.data.result);
                                                                                        }

                                                                                        setIsSavingOrder(false);
                                                                                    }).catch(e => {
                                                                                        console.log('error saving order', e);
                                                                                        setIsSavingOrder(false);
                                                                                    });

                                                                                    refDriverName.current.focus();
                                                                                } else {
                                                                                    props.setSelectedDispatchCarrierInfoDriver(item);
                                                                                    validateCarrierDriverForSaving({ keyCode: 9 });

                                                                                    refDriverPhone.current.inputElement.focus();
                                                                                }

                                                                                setDriverItems([]);
                                                                            }}
                                                                            ref={ref => refDriverPopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                searchValue === undefined
                                                                                    ? (item?.first_name || '') + ((item?.last_name || '') === '' ? '' : ' ' + item.last_name)
                                                                                    : <Highlighter
                                                                                        highlightClassName="mochi-item-highlight-text"
                                                                                        searchWords={[(props.selectedDispatchCarrierInfoDriver?.first_name || ''), (props.selectedDispatchCarrierInfoDriver?.last_name || '')]}
                                                                                        autoEscape={true}
                                                                                        textToHighlight={(item?.first_name || '') + ((item?.last_name || '') === '' ? '' : ' ' + item.last_name)}
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
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={58 + props.tabTimes}
                                        ref={refDriverPhone}
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
                                    if (!props.openedPanels.includes(props.rateConfPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.rateConfPanelName])
                                    }
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Rate Confirmation</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' style={{ fontSize: '1rem' }} onClick={() => {
                                    if (!props.openedPanels.includes(props.adjustRatePanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.adjustRatePanelName])
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
                                        onChange={async (e) => {
                                            await props.setSelectedOrder({
                                                ...props.selected_order,
                                                haz_mat: e.target.checked ? 1 : 0
                                            })

                                            validateOrderForSaving({ keyCode: 9 });
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
                                        onChange={async (e) => {
                                            await props.setSelectedOrder({
                                                ...props.selected_order,
                                                expedited: e.target.checked ? 1 : 0
                                            })

                                            validateOrderForSaving({ keyCode: 9 });
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
                        if ((props.selected_order?.id || 0) === 0) {
                            window.alert('You must create or load an order first!');
                            return;
                        }

                        if (!props.openedPanels.includes(props.rateConfPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.rateConfPanelName])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Rate Conf</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if ((props.selected_order?.id || 0) === 0) {
                            window.alert('You must create or load an order first!');
                            return;
                        }

                        if (!props.openedPanels.includes(props.orderPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.orderPanelName])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Print Order</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if ((props.selected_order?.id || 0) === 0) {
                            window.alert('You must create or load an order first!');
                            return;
                        }

                        if (!props.openedPanels.includes(props.bolPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.bolPanelName])
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

                        if (!props.openedPanels.includes(props.orderDocumentsPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.orderDocumentsPanelName])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Documents</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={async () => {
                        await props.setLbSelectedOrder({});

                        if (!props.openedPanels.includes(props.loadBoardPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.loadBoardPanelName])
                        }
                    }}>
                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                        <div className='mochi-button-base'>Load Board</div>
                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                    </div>
                    <div className='mochi-button' onClick={() => {
                        if ((props.selected_order?.id || 0) === 0) {
                            window.alert('You must create or load an order first!');
                            return;
                        }

                        if (!props.openedPanels.includes(props.ratingScreenPanelName)) {
                            props.setOpenedPanels([...props.openedPanels, props.ratingScreenPanelName])
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
                            [
                                ...getPickupsOnRouting(),
                                ...(props.selected_order?.pickups || []).filter(p => (props.selected_order?.routing || []).find(r => r.pickup_id === p.id) === undefined)
                            ].map((pickup, index) => {
                                if (pickup === undefined) {
                                    return ''
                                } else {
                                    let fulDateTime1 = (pickup.pu_date1 || '') + ' ' + (pickup.pu_time1 || '');
                                    let fulDateTime2 = (pickup.pu_date2 || '') + ' ' + (pickup.pu_time2 || '');
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
                                        'selected': props.selectedShipperCompanyInfo?.pickup_id === pickup.id,
                                        'active': statusClass === 'active',
                                        'warning': statusClass === 'warning',
                                        'expired': statusClass === 'expired',
                                        'unsaved': pickup.id === 0
                                    })

                                    return (
                                        <SwiperSlide className={classes} key={index} onClick={() => {
                                            props.setSelectedShipperCompanyInfo({
                                                ...pickup.customer,
                                                pickup_id: pickup.id,
                                                pu_date1: pickup.pu_date1,
                                                pu_date2: pickup.pu_date2,
                                                pu_time1: pickup.pu_time1,
                                                pu_time2: pickup.pu_time2,
                                                bol_numbers: pickup.bol_numbers,
                                                po_numbers: pickup.po_numbers,
                                                ref_numbers: pickup.ref_numbers,
                                                seal_number: pickup.seal_number,
                                                special_instructions: pickup.special_instructions,
                                                type: pickup.type,
                                            });

                                            props.setSelectedShipperCompanyContact((pickup.customer?.contacts || []).find(c => c.is_primary === 1) || {});

                                            refShipperCompanyCode.current.focus();
                                        }}>
                                            <div>PU {index + 1}</div>
                                            <div className="pu-remove-btn" title="Remove this pickup" onClick={async (e) => {
                                                e.stopPropagation();

                                                let selected_order = JSON.parse(JSON.stringify(props.selected_order));

                                                selected_order.pickups = (selected_order?.pickups || []).filter((pu, i) => {
                                                    return pu.id !== pickup.id;
                                                });

                                                await props.setSelectedOrder(selected_order);

                                                if (selected_order.pickups.length > 0) {
                                                    await props.setSelectedShipperCompanyInfo({
                                                        ...selected_order.pickups[0].customer || {},
                                                        ...selected_order.pickups[0],
                                                        customer: {},
                                                        pickup_id: selected_order.pickups[0].id
                                                    })

                                                    await props.setSelectedShipperCompanyContact((selected_order.pickups[0].customer?.contacts || []).find(c => c.is_primary === 1) || {});
                                                } else {
                                                    await props.setSelectedShipperCompanyInfo({});
                                                    await props.setSelectedShipperCompanyContact({});
                                                }

                                                await axios.post(props.serverUrl + '/removeOrderPickup', { id: pickup.id, order_id: selected_order?.id || 0 }).then(res => {
                                                    if (res.data.result === 'OK') {
                                                        selected_order = res.data.order;

                                                        // validar routing
                                                        // 1. VALIDAR PICKUPS AND DELIVERIES = 1
                                                        if ((selected_order?.pickups || []).length > 0 && selected_order.deliveries.length > 0) {
                                                            if (selected_order.pickups.length === 1 && selected_order.deliveries.length === 1) {
                                                                let routing = [
                                                                    {
                                                                        order_id: selected_order?.id || 0,
                                                                        pickup_id: selected_order.pickups[0].id,
                                                                        delivery_id: null,
                                                                        type: 'pickup'
                                                                    },
                                                                    {
                                                                        order_id: selected_order?.id || 0,
                                                                        pickup_id: null,
                                                                        delivery_id: selected_order.deliveries[0].id,
                                                                        type: 'delivery'
                                                                    }
                                                                ];

                                                                axios.post(props.serverUrl + '/saveOrderRouting', {
                                                                    order_id: selected_order?.id || 0,
                                                                    routing: routing
                                                                }).then(res => {
                                                                    if (res.data.result === 'OK') {
                                                                        selected_order.routing = res.data.order;
                                                                        props.setSelectedOrder(selected_order);

                                                                        props.setMileageLoaderVisible(true);

                                                                        let params = {
                                                                            mode: 'fastest;car;traffic:disabled',
                                                                            routeAttributes: 'summary'
                                                                        }

                                                                        let waypointCount = 0;

                                                                        selected_order.routing.map((item, i) => {
                                                                            if (item.type === 'pickup') {
                                                                                selected_order.pickups.map((p, i) => {
                                                                                    if (p.id === item.pickup_id) {
                                                                                        if ((p.customer?.zip_data || '') !== '') {
                                                                                            params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                                            waypointCount += 1;
                                                                                        }
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            } else {
                                                                                selected_order.deliveries.map((d, i) => {
                                                                                    if (d.id === item.delivery_id) {
                                                                                        if ((d.customer?.zip_data || '') !== '') {
                                                                                            params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                                            waypointCount += 1;
                                                                                        }
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            }

                                                                            return true;
                                                                        });

                                                                        routingService.calculateRoute(params,
                                                                            (result) => {
                                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                                selected_order.miles = miles;

                                                                                props.setSelectedOrder(selected_order);
                                                                                props.setMileageLoaderVisible(false);


                                                                                axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.data.result === 'OK') {

                                                                                    }
                                                                                }).catch(e => {
                                                                                    console.log('error on saving order miles', e);
                                                                                    props.setMileageLoaderVisible(false);
                                                                                });
                                                                            },
                                                                            (error) => {
                                                                                console.log('error getting mileage', error);
                                                                                selected_order.miles = 0;

                                                                                props.setSelectedOrder(selected_order)
                                                                                props.setMileageLoaderVisible(false);

                                                                                axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.data.result === 'OK') {

                                                                                    }
                                                                                }).catch(e => {
                                                                                    console.log('error on saving order miles', e);
                                                                                    props.setMileageLoaderVisible(false);
                                                                                });
                                                                            });
                                                                    } else {
                                                                        console.log(res.data.result);

                                                                        selected_order.miles = 0;
                                                                        props.setSelectedOrder(selected_order)
                                                                        props.setMileageLoaderVisible(false);

                                                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                            if (res.data.result === 'OK') {

                                                                            }
                                                                        }).catch(e => {
                                                                            console.log('error on saving order miles', e);
                                                                            props.setMileageLoaderVisible(false);
                                                                        });
                                                                    }
                                                                }).catch(e => {
                                                                    console.log('error saving order miles', e);
                                                                    props.setMileageLoaderVisible(false);
                                                                });
                                                            } else {
                                                                if (selected_order.routing.length >= 2) {
                                                                    props.setMileageLoaderVisible(true);

                                                                    let params = {
                                                                        mode: 'fastest;car;traffic:disabled',
                                                                        routeAttributes: 'summary'
                                                                    }

                                                                    let waypointCount = 0;

                                                                    selected_order.routing.map((item, i) => {
                                                                        if (item.type === 'pickup') {
                                                                            selected_order.pickups.map((p, i) => {
                                                                                if (p.id === item.pickup_id) {
                                                                                    if ((p.customer?.zip_data || '') !== '') {
                                                                                        params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                                        waypointCount += 1;
                                                                                    }
                                                                                }
                                                                                return false;
                                                                            })
                                                                        } else {
                                                                            selected_order.deliveries.map((d, i) => {
                                                                                if (d.id === item.delivery_id) {
                                                                                    if ((d.customer?.zip_data || '') !== '') {
                                                                                        params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                                        waypointCount += 1;
                                                                                    }
                                                                                }
                                                                                return false;
                                                                            })
                                                                        }

                                                                        return true;
                                                                    });

                                                                    routingService.calculateRoute(params,
                                                                        (result) => {
                                                                            let miles = result.response.route[0].summary.distance || 0;
                                                                            selected_order.miles = miles;

                                                                            props.setSelectedOrder(selected_order);
                                                                            props.setMileageLoaderVisible(false);


                                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                if (res.data.result === 'OK') {

                                                                                }
                                                                            }).catch(e => {
                                                                                props.setMileageLoaderVisible(false);
                                                                                console.log('error on saving order miles', e);
                                                                            });
                                                                        },
                                                                        (error) => {
                                                                            console.log('error getting mileage', error);
                                                                            selected_order.miles = 0;
                                                                            props.setSelectedOrder(selected_order)
                                                                            props.setMileageLoaderVisible(false);

                                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                if (res.data.result === 'OK') {

                                                                                }
                                                                            }).catch(e => {
                                                                                props.setMileageLoaderVisible(false);
                                                                                console.log('error on saving order miles', e);
                                                                            });
                                                                        })
                                                                } else {
                                                                    selected_order.miles = 0;
                                                                    props.setSelectedOrder(selected_order)
                                                                    props.setMileageLoaderVisible(false);

                                                                    axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                        if (res.data.result === 'OK') {

                                                                        }
                                                                    }).catch(e => {
                                                                        props.setMileageLoaderVisible(false);
                                                                        console.log('error on saving order miles', e);
                                                                    });
                                                                }
                                                            }
                                                        } else {
                                                            // GUARDAR ORDEN CON MILES = 0;
                                                            selected_order.miles = 0;
                                                            props.setSelectedOrder(selected_order)
                                                            props.setMileageLoaderVisible(false);

                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                if (res.data.result === 'OK') {

                                                                }
                                                            }).catch(e => {
                                                                props.setMileageLoaderVisible(false);
                                                                console.log('error on saving order miles', e);
                                                            });
                                                        }
                                                    } else {
                                                        console.log(res.data);
                                                        props.setMileageLoaderVisible(false);
                                                    }
                                                }).catch(e => {
                                                    props.setMileageLoaderVisible(false);
                                                    console.log('error on removing order pickup', e);
                                                });
                                            }}>
                                                <span className="fas fa-times"></span>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            })
                        }

                        {
                            (props.selected_order?.pickups || []).find(p => p.id === 0) === undefined
                            && <SwiperSlide className="order-pickup adding" title="Add new pickup" onClick={() => {
                                // if ((props.selected_order?.id || 0) === 0) {
                                //     window.alert('You must create or load an order first!');
                                //     props.setSelectedShipperCompanyInfo({});
                                //     props.setSelectedShipperCompanyContact({});
                                //     return;
                                // }

                                let pickups = props.selected_order?.pickups || [];
                                pickups.push({ id: 0 });
                                props.setSelectedShipperCompanyInfo({ id: 0, pickup_id: 0 });
                                props.setSelectedShipperCompanyContact({});
                                props.setSelectedOrder({ ...props.selected_order, pickups: pickups })

                                refShipperCompanyCode.current.focus();
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

                    if (!props.openedPanels.includes(props.routingPanelName)) {
                        props.setOpenedPanels([...props.openedPanels, props.routingPanelName]);
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
                            [
                                ...getDeliveriesOnRouting(),
                                ...(props.selected_order?.deliveries || []).filter(d => (props.selected_order?.routing || []).find(r => r.delivery_id === d.id) === undefined)
                            ].map((delivery, index) => {
                                if (delivery === undefined) {
                                    return ''
                                } else {
                                    let fulDateTime1 = (delivery.delivery_date1 || '') + ' ' + (delivery.delivery_time1 || '');
                                    let fulDateTime2 = (delivery.delivery_date2 || '') + ' ' + (delivery.delivery_time2 || '');
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
                                        'selected': props.selectedConsigneeCompanyInfo?.delivery_id === delivery.id,
                                        'active': statusClass === 'active',
                                        'warning': statusClass === 'warning',
                                        'expired': statusClass === 'expired',
                                        'unsaved': delivery.id === 0
                                    })

                                    return (
                                        <SwiperSlide className={classes} key={index} onClick={() => {
                                            props.setSelectedConsigneeCompanyInfo({
                                                ...delivery.customer,
                                                delivery_id: delivery.id,
                                                delivery_date1: delivery.delivery_date1,
                                                delivery_date2: delivery.delivery_date2,
                                                delivery_time1: delivery.delivery_time1,
                                                delivery_time2: delivery.delivery_time2,
                                                special_instructions: delivery.special_instructions,
                                                type: delivery.type,
                                            });

                                            props.setSelectedConsigneeCompanyContact((delivery.customer?.contacts || []).find(c => c.is_primary === 1) || {});

                                            refConsigneeCompanyCode.current.focus();
                                        }}>
                                            <div>Delivery {index + 1}</div>
                                            <div className="delivery-remove-btn" title="Remove this delivery" onClick={async (e) => {
                                                e.stopPropagation();

                                                let selected_order = JSON.parse(JSON.stringify(props.selected_order));

                                                selected_order.deliveries = (selected_order?.deliveries || []).filter((del, i) => {
                                                    return del.id !== delivery.id;
                                                });

                                                await props.setSelectedOrder(selected_order);

                                                if (selected_order.deliveries.length > 0) {
                                                    await props.setSelectedConsigneeCompanyInfo({
                                                        ...selected_order.deliveries[0].customer || {},
                                                        ...selected_order.deliveries[0],
                                                        customer: {},
                                                        delivery_id: selected_order.deliveries[0].id
                                                    })

                                                    await props.setSelectedConsigneeCompanyContact((selected_order.deliveries[0].customer?.contacts || []).find(c => c.is_primary === 1) || {});
                                                } else {
                                                    await props.setSelectedConsigneeCompanyInfo({});
                                                    await props.setSelectedConsigneeCompanyContact({});
                                                }

                                                await axios.post(props.serverUrl + '/removeOrderDelivery', { id: delivery.id, order_id: selected_order?.id || 0 }).then(res => {
                                                    if (res.data.result === 'OK') {
                                                        selected_order = res.data.order;

                                                        // validar routing
                                                        // 1. VALIDAR PICKUPS AND DELIVERIES = 1
                                                        if ((selected_order?.pickups || []).length > 0 && selected_order.deliveries.length > 0) {
                                                            if (selected_order.pickups.length === 1 && selected_order.deliveries.length === 1) {
                                                                let routing = [
                                                                    {
                                                                        order_id: selected_order?.id || 0,
                                                                        pickup_id: selected_order.pickups[0].id,
                                                                        delivery_id: null,
                                                                        type: 'pickup'
                                                                    },
                                                                    {
                                                                        order_id: selected_order?.id || 0,
                                                                        pickup_id: null,
                                                                        delivery_id: selected_order.deliveries[0].id,
                                                                        type: 'delivery'
                                                                    }
                                                                ];

                                                                axios.post(props.serverUrl + '/saveOrderRouting', {
                                                                    order_id: selected_order?.id || 0,
                                                                    routing: routing
                                                                }).then(res => {
                                                                    if (res.data.result === 'OK') {
                                                                        selected_order = res.data.order;
                                                                        props.setSelectedOrder(selected_order);

                                                                        props.setMileageLoaderVisible(true);

                                                                        let params = {
                                                                            mode: 'fastest;car;traffic:disabled',
                                                                            routeAttributes: 'summary'
                                                                        }

                                                                        let waypointCount = 0;

                                                                        selected_order.routing.map((item, i) => {
                                                                            if (item.type === 'pickup') {
                                                                                selected_order.pickups.map((p, i) => {
                                                                                    if (p.id === item.pickup_id) {
                                                                                        if ((p.customer?.zip_data || '') !== '') {
                                                                                            params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                                            waypointCount += 1;
                                                                                        }
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            } else {
                                                                                selected_order.deliveries.map((d, i) => {
                                                                                    if (d.id === item.delivery_id) {
                                                                                        if ((d.customer?.zip_data || '') !== '') {
                                                                                            params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                                            waypointCount += 1;
                                                                                        }
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            }

                                                                            return true;
                                                                        });

                                                                        routingService.calculateRoute(params,
                                                                            (result) => {
                                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                                selected_order.miles = miles;

                                                                                props.setSelectedOrder(selected_order);
                                                                                props.setMileageLoaderVisible(false);


                                                                                axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.data.result === 'OK') {

                                                                                    }
                                                                                }).catch(e => {
                                                                                    console.log('error on saving order miles', e);
                                                                                    props.setMileageLoaderVisible(false);
                                                                                });
                                                                            },
                                                                            (error) => {
                                                                                console.log('error getting mileage', error);
                                                                                selected_order.miles = 0;

                                                                                props.setSelectedOrder(selected_order)
                                                                                props.setMileageLoaderVisible(false);

                                                                                axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.data.result === 'OK') {

                                                                                    }
                                                                                }).catch(e => {
                                                                                    console.log('error on saving order miles', e);
                                                                                    props.setMileageLoaderVisible(false);
                                                                                });
                                                                            });
                                                                    } else {
                                                                        console.log(res.data.result);

                                                                        selected_order.miles = 0;
                                                                        props.setSelectedOrder(selected_order)
                                                                        props.setMileageLoaderVisible(false);

                                                                        axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                            if (res.data.result === 'OK') {

                                                                            }
                                                                        }).catch(e => {
                                                                            console.log('error on saving order miles', e);
                                                                            props.setMileageLoaderVisible(false);
                                                                        });
                                                                    }
                                                                }).catch(e => {
                                                                    props.setMileageLoaderVisible(false);
                                                                    console.log('error saving order miles', e);
                                                                });
                                                            } else {
                                                                if (selected_order.routing.length >= 2) {
                                                                    props.setMileageLoaderVisible(true);

                                                                    let params = {
                                                                        mode: 'fastest;car;traffic:disabled',
                                                                        routeAttributes: 'summary'
                                                                    }

                                                                    let waypointCount = 0;

                                                                    selected_order.routing.map((item, i) => {
                                                                        if (item.type === 'pickup') {
                                                                            selected_order.pickups.map((p, i) => {
                                                                                if (p.id === item.pickup_id) {
                                                                                    if ((p.customer?.zip_data || '') !== '') {
                                                                                        params['waypoint' + waypointCount] = 'geo!' + p.customer.zip_data.latitude.toString() + ',' + p.customer.zip_data.longitude.toString();
                                                                                        waypointCount += 1;
                                                                                    }
                                                                                }
                                                                                return false;
                                                                            })
                                                                        } else {
                                                                            selected_order.deliveries.map((d, i) => {
                                                                                if (d.id === item.delivery_id) {
                                                                                    if ((d.customer?.zip_data || '') !== '') {
                                                                                        params['waypoint' + waypointCount] = 'geo!' + d.customer.zip_data.latitude.toString() + ',' + d.customer.zip_data.longitude.toString();
                                                                                        waypointCount += 1;
                                                                                    }
                                                                                }
                                                                                return false;
                                                                            })
                                                                        }

                                                                        return true;
                                                                    });

                                                                    routingService.calculateRoute(params,
                                                                        (result) => {
                                                                            let miles = result.response.route[0].summary.distance || 0;
                                                                            selected_order.miles = miles;

                                                                            props.setSelectedOrder(selected_order);
                                                                            props.setMileageLoaderVisible(false);


                                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                if (res.data.result === 'OK') {

                                                                                }
                                                                            }).catch(e => {
                                                                                console.log('error on saving order miles', e);
                                                                                props.setMileageLoaderVisible(false);
                                                                            });
                                                                        },
                                                                        (error) => {
                                                                            console.log('error getting mileage', error);
                                                                            selected_order.miles = 0;
                                                                            props.setSelectedOrder(selected_order)
                                                                            props.setMileageLoaderVisible(false);

                                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                if (res.data.result === 'OK') {

                                                                                }
                                                                            }).catch(e => {
                                                                                console.log('error on saving order miles', e);
                                                                                props.setMileageLoaderVisible(false);
                                                                            });
                                                                        })
                                                                } else {
                                                                    selected_order.miles = 0;
                                                                    props.setSelectedOrder(selected_order)
                                                                    props.setMileageLoaderVisible(false);

                                                                    axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                        if (res.data.result === 'OK') {

                                                                        }
                                                                    }).catch(e => {
                                                                        console.log('error on saving order miles', e);
                                                                        props.setMileageLoaderVisible(false);
                                                                    });
                                                                }
                                                            }
                                                        } else {
                                                            // GUARDAR ORDEN CON MILES = 0;
                                                            selected_order.miles = 0;
                                                            props.setSelectedOrder(selected_order)
                                                            props.setMileageLoaderVisible(false);

                                                            axios.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                if (res.data.result === 'OK') {

                                                                }
                                                            }).catch(e => {
                                                                console.log('error on saving order miles', e);
                                                                props.setMileageLoaderVisible(false);
                                                            });
                                                        }
                                                    } else {
                                                        console.log(res.data);
                                                    }
                                                }).catch(e => {
                                                    props.setMileageLoaderVisible(false);
                                                    console.log('error on removing order delivery', e);
                                                });
                                            }}>
                                                <span className="fas fa-times"></span>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            })
                        }

                        {
                            (props.selected_order?.deliveries || []).find(d => d.id === 0) === undefined
                            && <SwiperSlide className="order-delivery adding" title="Add new delivery" onClick={() => {
                                if ((props.selected_order?.id || 0) === 0) {
                                    window.alert('You must create or load an order first!');
                                    props.setSelectedConsigneeCompanyInfo({});
                                    props.setSelectedConsigneeCompanyContact({});
                                    return;
                                }

                                let deliveries = props.selected_order?.deliveries || [];
                                deliveries.push({ id: 0 });
                                props.setSelectedConsigneeCompanyInfo({ id: 0, delivery_id: 0 });
                                props.setSelectedConsigneeCompanyContact({});
                                props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries })

                                refConsigneeCompanyCode.current.focus();
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

                                        if (!props.openedPanels.includes(props.shipperCompanyInfoPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.shipperCompanyInfoPanelName])
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
                                        ref={refShipperCompanyCode}
                                        onKeyDown={getShipperCompanyByCode}
                                        onInput={(e) => {
                                            if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: [
                                                            ...props.selected_order?.pickups || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedShipperCompanyInfo({
                                                    ...props.selectedShipperCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                        if (p.id === props.selectedShipperCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                code: e.target.value.toUpperCase()
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedShipperCompanyInfo({
                                                    ...props.selectedShipperCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: [
                                                            ...props.selected_order?.pickups || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedShipperCompanyInfo({
                                                    ...props.selectedShipperCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                        if (p.id === props.selectedShipperCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                code: e.target.value.toUpperCase()
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedShipperCompanyInfo({
                                                    ...props.selectedShipperCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            }
                                        }}
                                        value={(props.selectedShipperCompanyInfo.code_number || 0) === 0 ? (props.selectedShipperCompanyInfo.code || '') : props.selectedShipperCompanyInfo.code + props.selectedShipperCompanyInfo.code_number}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={17 + props.tabTimes} type="text" placeholder="Name"
                                        // onKeyDown={validateShipperCompanyInfoForSaving}                                        
                                        onInput={(e) => {
                                            if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: [
                                                            ...props.selected_order?.pickups || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, name: e.target.value })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                        if (p.id === props.selectedShipperCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                name: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: [
                                                            ...props.selected_order?.pickups || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, name: e.target.value })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                        if (p.id === props.selectedShipperCompanyInfo.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                name: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value })
                                            }
                                        }}
                                        value={props.selectedShipperCompanyInfo?.name || ''}
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
                                                    // onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, address1: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === props.selectedShipperCompanyInfo?.id) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address1: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, address1: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address1: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={19 + props.tabTimes} type="text" placeholder="Address 2"
                                                    // onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, address2: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address2: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, address2: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address2: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={20 + props.tabTimes} type="text" placeholder="City"
                                                    // onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, city: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            city: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, city: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            city: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input tabIndex={21 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                    // onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, state: e.target.value.toUpperCase() })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            state: e.target.value.toUpperCase()
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value.toUpperCase() })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, state: e.target.value.toUpperCase() })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            state: e.target.value.toUpperCase()
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value.toUpperCase() })
                                                        }
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input tabIndex={22 + props.tabTimes} type="text" placeholder="Postal Code"
                                                    onKeyDown={validateShipperCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, zip: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            zip: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, id: 0, zip: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            zip: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={23 + props.tabTimes} type="text" placeholder="Contact Name"
                                                    // onKeyDown={validateShipperCompanyContactForSaving}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value })
                                                            }
                                                        }
                                                    }}

                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_name: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedShipperCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedShipperCompanyInfo?.contact_name || '')
                                                            : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).last_name
                                                    }
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone" style={{ position: 'relative' }}>
                                                <MaskedInput tabIndex={24 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    // onKeyDown={validateShipperCompanyContactForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedShipperCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedShipperCompanyInfo?.contact_phone || '')
                                                            : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                                ? props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work
                                                                : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                                    ? props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                                    : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                                        ? props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                                        : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                                            ? props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_direct
                                                                            : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                                ? props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_other
                                                                                : ''
                                                    }
                                                />

                                                {
                                                    ((props.selectedShipperCompanyInfo?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                                    <div
                                                        className={classnames({
                                                            'selected-customer-contact-primary-phone': true,
                                                            'pushed': false
                                                        })}>
                                                        {props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone}
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={25 + props.tabTimes} type="text" placeholder="Ext"
                                                    onKeyDown={validateShipperCompanyContactForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedShipperCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.pickups || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: [
                                                                        ...props.selected_order?.pickups || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value })
                                                        } else {
                                                            if ((props.selectedShipperCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedShipperCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedShipperCompanyInfo?.ext || '')
                                                            : props.selectedShipperCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_ext
                                                    }
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

                                                        let puDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.pu_date1 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedPickupDate1(puDate1);

                                                        if (key === 13) {
                                                            if (isPickupDate1CalendarShown) {
                                                                await props.setSelectedShipperCompanyInfo({
                                                                    ...props.selectedShipperCompanyInfo,
                                                                    pu_date1: preSelectedPickupDate1.clone().format('MM/DD/YYYY')
                                                                });

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                            pu.pu_date1 = preSelectedPickupDate1.clone().format('MM/DD/YYYY');
                                                                            pu.pu_date2 = preSelectedPickupDate1.clone().format('MM/DD/YYYY');
                                                                            setIsSavingPickupId(-1);
                                                                            setIsSavingPickupId(pu.id);
                                                                        }
                                                                        return pu;
                                                                    })
                                                                });

                                                                await setIsPickupDate1CalendarShown(false);
                                                                await setIsPickupDate2CalendarShown(false);
                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);

                                                                refPickupTime1.current.focus();
                                                            }

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

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                            pu.pu_date1 = preSelectedPickupDate1.clone().format('MM/DD/YYYY');
                                                                        }
                                                                        return pu;
                                                                    })
                                                                });
                                                                // await validateOrderForSaving({ keyCode: 9 });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puDate1KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);

                                                            await props.setSelectedShipperCompanyInfo({
                                                                ...props.selectedShipperCompanyInfo,
                                                                pu_date1: formatted,
                                                                pu_date2: formatted
                                                            })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date1 = formatted;
                                                                    pu.pu_date2 = formatted;
                                                                    setIsSavingPickupId(-1);
                                                                    setIsSavingPickupId(pu.id);
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            // await setIsPickupDate1CalendarShown(false);
                                                            // await setIsPickupDate2CalendarShown(false);
                                                            // await setIsDeliveryDate1CalendarShown(false);
                                                            // await setIsDeliveryDate2CalendarShown(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_date1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date1 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_date1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date1 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    value={(props.selectedShipperCompanyInfo?.pu_date1 || '')}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={async (e) => {
                                                    await setIsPickupDate2CalendarShown(false);
                                                    await setIsDeliveryDate1CalendarShown(false);
                                                    await setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedShipperCompanyInfo?.pu_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.pu_date1 || '').trim()) {
                                                        setPreSelectedPickupDate1(moment(props.selectedShipperCompanyInfo?.pu_date1, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedPickupDate1(moment());
                                                    }

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
                                                        popup && (popup.style.top = (input.top + 5) + 'px');
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

                                                    window.setTimeout(async () => {
                                                        await setIsPickupDate1CalendarShown(true);
                                                        refPickupDate1.current.inputElement.focus();
                                                    }, 0);
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={27 + props.tabTimes} type="text" placeholder="PU Time 1"
                                                    ref={refPickupTime1}
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setPuTime1KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puTime1KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);

                                                            await props.setSelectedShipperCompanyInfo({
                                                                ...props.selectedShipperCompanyInfo,
                                                                pu_time1: formatted
                                                            })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time1 = formatted;
                                                                    setIsSavingPickupId(-1);
                                                                    setIsSavingPickupId(pu.id);
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_time1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time1 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_time1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time1 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.pu_time1 || ''}
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

                                                        let puDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.pu_date2 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedPickupDate2(puDate2);

                                                        if (key === 13) {
                                                            if (isPickupDate2CalendarShown) {
                                                                await props.setSelectedShipperCompanyInfo({
                                                                    ...props.selectedShipperCompanyInfo,
                                                                    pu_date2: preSelectedPickupDate2.clone().format('MM/DD/YYYY')
                                                                });

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                            pu.pu_date2 = preSelectedPickupDate2.clone().format('MM/DD/YYYY')
                                                                            setIsSavingPickupId(-1);
                                                                            setIsSavingPickupId(pu.id);
                                                                        }
                                                                        return pu;
                                                                    })
                                                                });

                                                                await setIsPickupDate1CalendarShown(false);
                                                                await setIsPickupDate2CalendarShown(false);
                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);

                                                                refPickupTime2.current.focus();
                                                            }
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

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                            pu.pu_date2 = preSelectedPickupDate2.clone().format('MM/DD/YYYY');
                                                                        }
                                                                        return pu;
                                                                    })
                                                                });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puDate2KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);

                                                            await props.setSelectedShipperCompanyInfo({
                                                                ...props.selectedShipperCompanyInfo,
                                                                pu_date2: formatted
                                                            })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date2 = formatted;
                                                                    setIsSavingPickupId(-1);
                                                                    setIsSavingPickupId(pu.id);
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                            // await setIsPickupDate1CalendarShown(false);
                                                            // await setIsPickupDate2CalendarShown(false);
                                                            // await setIsDeliveryDate1CalendarShown(false);
                                                            // await setIsDeliveryDate2CalendarShown(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_date2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date2 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_date2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_date2 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    value={(props.selectedShipperCompanyInfo?.pu_date2 || '')}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsDeliveryDate1CalendarShown(false);
                                                    setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedShipperCompanyInfo?.pu_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.pu_date2 || '').trim()) {
                                                        setPreSelectedPickupDate2(moment(props.selectedShipperCompanyInfo?.pu_date2, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedPickupDate2(moment());
                                                    }

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
                                                        popup && (popup.style.top = (input.top + 5) + 'px');
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

                                                    window.setTimeout(async () => {
                                                        setIsPickupDate2CalendarShown(true);
                                                        refPickupDate2.current.inputElement.focus();
                                                    }, 0);
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={29 + props.tabTimes} type="text" placeholder="PU Time 2"
                                                    ref={refPickupTime2}
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setPuTime2KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (puTime2KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);

                                                            await props.setSelectedShipperCompanyInfo({
                                                                ...props.selectedShipperCompanyInfo,
                                                                pu_time2: formatted
                                                            })

                                                            let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time2 = formatted;
                                                                    setIsSavingPickupId(-1);
                                                                    setIsSavingPickupId(pu.id);
                                                                }
                                                                return pu;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_time2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time2 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            pu_time2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.pu_time2 = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.pu_time2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row" style={{ alignItems: 'center' }}>
                                            <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                {
                                                    (props.selectedShipperCompanyInfo?.bol_numbers || '').split(' ').map((item, index) => {
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
                                                                            props.setSelectedShipperCompanyInfo({
                                                                                ...props.selectedShipperCompanyInfo,
                                                                                bol_numbers: (props.selectedShipperCompanyInfo?.bol_numbers || '').replace(item, '').trim()
                                                                            })

                                                                            props.setSelectedOrder({
                                                                                ...props.selected_order,
                                                                                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                                    if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                                        pu.bol_numbers = (props.selectedShipperCompanyInfo?.bol_numbers || '').replace(item, '').trim()
                                                                                    }
                                                                                    return pu;
                                                                                })
                                                                            })

                                                                            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
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
                                                    (props.selectedShipperCompanyInfo?.po_numbers || '').split(' ').map((item, index) => {
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
                                                                            props.setSelectedShipperCompanyInfo({
                                                                                ...props.selectedShipperCompanyInfo,
                                                                                po_numbers: (props.selectedShipperCompanyInfo?.po_numbers || '').replace(item, '').trim()
                                                                            })

                                                                            props.setSelectedOrder({
                                                                                ...props.selected_order,
                                                                                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                                    if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                                        pu.po_numbers = (props.selectedShipperCompanyInfo?.po_numbers || '').replace(item, '').trim()
                                                                                    }
                                                                                    return pu;
                                                                                })
                                                                            })

                                                                            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
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
                                                    (props.selectedShipperCompanyInfo?.ref_numbers || '').split(' ').map((item, index) => {
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
                                                                            props.setSelectedShipperCompanyInfo({
                                                                                ...props.selectedShipperCompanyInfo,
                                                                                ref_numbers: (props.selectedShipperCompanyInfo?.ref_numbers || '').replace(item, '').trim()
                                                                            })

                                                                            props.setSelectedOrder({
                                                                                ...props.selected_order,
                                                                                pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                                    if (pu.id === props.selectedShipperCompanyInfo.pickup_id) {
                                                                                        pu.ref_numbers = (props.selectedShipperCompanyInfo?.ref_numbers || '').replace(item, '').trim()
                                                                                    }
                                                                                    return pu;
                                                                                })
                                                                            })

                                                                            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
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
                                                    onKeyDown={(e) => {
                                                        let key = e.keyCode || e.which;

                                                        if (key === 9) {
                                                            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.seal_number = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        });

                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            seal_number: e.target.value
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.seal_number = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        });

                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            seal_number: e.target.value
                                                        })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.seal_number || ''}
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
                                                            setIsSavingPickupId(props.selectedShipperCompanyInfo?.pickup_id || 0);
                                                            goToTabindex((35 + props.tabTimes).toString());
                                                            props.setIsShowingShipperSecondPage(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.special_instructions = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        });

                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            special_instructions: e.target.value
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            pickups: (props.selected_order?.pickups || []).map((pu, i) => {
                                                                if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                                                                    pu.special_instructions = e.target.value;
                                                                }
                                                                return pu;
                                                            })
                                                        });

                                                        props.setSelectedShipperCompanyInfo({
                                                            ...props.selectedShipperCompanyInfo,
                                                            special_instructions: e.target.value
                                                        })
                                                    }}
                                                    value={props.selectedShipperCompanyInfo?.special_instructions || ''}
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

                                        if (!props.openedPanels.includes(props.consigneeCompanyInfoPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.consigneeCompanyInfoPanelName])
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
                                        ref={refConsigneeCompanyCode}
                                        onKeyDown={getConsigneeCompanyByCode}
                                        onInput={(e) => {
                                            if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: [
                                                            ...props.selected_order?.deliveries || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedConsigneeCompanyInfo({
                                                    ...props.selectedConsigneeCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                        if (p.id === props.selectedConsigneeCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                code: e.target.value.toUpperCase()
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedConsigneeCompanyInfo({
                                                    ...props.selectedConsigneeCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: [
                                                            ...props.selected_order?.deliveries || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    code: e.target.value.toUpperCase()
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedConsigneeCompanyInfo({
                                                    ...props.selectedConsigneeCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                        if (p.id === props.selectedConsigneeCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                code: e.target.value.toUpperCase()
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedConsigneeCompanyInfo({
                                                    ...props.selectedConsigneeCompanyInfo,
                                                    code: e.target.value.toUpperCase(),
                                                    code_number: 0
                                                })
                                            }
                                        }}
                                        value={(props.selectedConsigneeCompanyInfo.code_number || 0) === 0 ? (props.selectedConsigneeCompanyInfo.code || '') : props.selectedConsigneeCompanyInfo.code + props.selectedConsigneeCompanyInfo.code_number}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={36 + props.tabTimes} type="text" placeholder="Name"
                                        // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                        onInput={(e) => {
                                            if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: [
                                                            ...props.selected_order?.deliveries || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, name: e.target.value })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                        if (p.id === props.selectedConsigneeCompanyInfo?.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                name: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value })
                                            }
                                        }}
                                        onChange={(e) => {
                                            if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: [
                                                            ...props.selected_order?.deliveries || [],
                                                            {
                                                                id: 0,
                                                                customer: {
                                                                    id: 0,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    props.setSelectedOrder({
                                                        ...props.selected_order,
                                                        deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                            if (p.id === 0) {
                                                                p.customer = {
                                                                    ...p.customer,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                            return p;
                                                        })
                                                    })
                                                }

                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, name: e.target.value })
                                            } else {
                                                props.setSelectedOrder({
                                                    ...props.selected_order,
                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                        if (p.id === props.selectedConsigneeCompanyInfo.id) {
                                                            p.customer = {
                                                                ...p.customer,
                                                                name: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                })

                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value })
                                            }
                                        }}
                                        value={props.selectedConsigneeCompanyInfo?.name || ''}
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
                                                    // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, address1: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === props.selectedConsigneeCompanyInfo?.id) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address1: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address1: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, address1: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address1: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={38 + props.tabTimes} type="text" placeholder="Address 2"
                                                    // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, address2: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === props.selectedConsigneeCompanyInfo?.id) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address2: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                address2: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, address2: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            address2: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={39 + props.tabTimes} type="text" placeholder="City"
                                                    // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, city: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            city: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                city: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, city: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            city: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input tabIndex={40 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                    // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, state: e.target.value.toUpperCase() })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            state: e.target.value.toUpperCase()
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value.toUpperCase() })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                state: e.target.value.toUpperCase()
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, state: e.target.value.toUpperCase() })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            state: e.target.value.toUpperCase()
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value.toUpperCase() })
                                                        }
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input tabIndex={41 + props.tabTimes} type="text" placeholder="Postal Code"
                                                    onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, zip: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            zip: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value })
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                id: 0,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                zip: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, id: 0, zip: e.target.value })
                                                        } else {
                                                            props.setSelectedOrder({
                                                                ...props.selected_order,
                                                                deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                    if (p.id === 0) {
                                                                        p.customer = {
                                                                            ...p.customer,
                                                                            zip: e.target.value
                                                                        }
                                                                    }
                                                                    return p;
                                                                })
                                                            })

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value })
                                                        }
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={42 + props.tabTimes} type="text" placeholder="Contact Name"
                                                    // onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value })
                                                            }
                                                        }
                                                    }}

                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_name: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_name: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedConsigneeCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedConsigneeCompanyInfo?.contact_name || '')
                                                            : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).first_name + ' ' + props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).last_name
                                                    }
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone" style={{ position: 'relative' }}>
                                                <MaskedInput tabIndex={43 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    // onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.pickups || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    pickups: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                contact_phone: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedConsigneeCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedConsigneeCompanyInfo?.contact_phone || '')
                                                            : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                                ? props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work
                                                                : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                                    ? props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                                    : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                                        ? props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                                        : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                                            ? props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_direct
                                                                            : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                                ? props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_other
                                                                                : ''
                                                    }
                                                />

                                                {
                                                    ((props.selectedConsigneeCompanyInfo?.contacts || []).find(c => c.is_primary === 1) !== undefined) &&
                                                    <div
                                                        className={classnames({
                                                            'selected-customer-contact-primary-phone': true,
                                                            'pushed': false
                                                        })}>
                                                        {props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).primary_phone}
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={44 + props.tabTimes} type="text" placeholder="Ext"
                                                    onKeyDown={validateConsigneeCompanyContactForSaving}
                                                    onInput={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        if ((props.selectedConsigneeCompanyInfo?.id || 0) === 0) {
                                                            if ((props.selected_order?.deliveries || []).find(p => p.id === 0) === undefined) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: [
                                                                        ...props.selected_order?.deliveries || [],
                                                                        {
                                                                            id: 0,
                                                                            customer: {
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            } else {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })
                                                            }

                                                            props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value })
                                                        } else {
                                                            if ((props.selectedConsigneeCompanyInfo?.contacts || []).length === 0) {
                                                                props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((p, i) => {
                                                                        if (p.id === 0) {
                                                                            p.customer = {
                                                                                ...p.customer,
                                                                                ext: e.target.value
                                                                            }
                                                                        }
                                                                        return p;
                                                                    })
                                                                })

                                                                props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value })
                                                            }
                                                        }
                                                    }}
                                                    value={
                                                        (props.selectedConsigneeCompanyInfo?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? (props.selectedConsigneeCompanyInfo?.ext || '')
                                                            : props.selectedConsigneeCompanyInfo?.contacts.find(c => c.is_primary === 1).phone_ext
                                                    }
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

                                                        let deliveryDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.delivery_date1 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedDeliveryDate1(deliveryDate1);

                                                        if (key === 13) {
                                                            if (isDeliveryDate1CalendarShown) {
                                                                await props.setSelectedConsigneeCompanyInfo({
                                                                    ...props.selectedConsigneeCompanyInfo,
                                                                    delivery_date1: preSelectedDeliveryDate1.clone().format('MM/DD/YYYY')
                                                                });

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                            delivery.delivery_date1 = preSelectedDeliveryDate1.clone().format('MM/DD/YYYY');
                                                                            delivery.delivery_date2 = preSelectedDeliveryDate1.clone().format('MM/DD/YYYY');
                                                                            setIsSavingDeliveryId(-1);
                                                                            setIsSavingDeliveryId(delivery.id);
                                                                        }
                                                                        return delivery;
                                                                    })
                                                                });

                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);
                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);

                                                                refDeliveryTime1.current.focus();
                                                            }
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

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                            delivery.delivery_date1 = preSelectedDeliveryDate1.clone().format('MM/DD/YYYY');
                                                                        }
                                                                        return delivery;
                                                                    })
                                                                });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryDate1KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);

                                                            await props.setSelectedConsigneeCompanyInfo({
                                                                ...props.selectedConsigneeCompanyInfo,
                                                                delivery_date1: formatted,
                                                                delivery_date2: formatted
                                                            })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date1 = formatted;
                                                                    delivery.delivery_date2 = formatted;
                                                                    setIsSavingDeliveryId(-1);
                                                                    setIsSavingDeliveryId(delivery.id);
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            // await setIsPickupDate1CalendarShown(false);
                                                            // await setIsPickupDate2CalendarShown(false);
                                                            // await setIsDeliveryDate1CalendarShown(false);
                                                            // await setIsDeliveryDate2CalendarShown(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_date1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date1 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_date1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date1 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    value={(props.selectedConsigneeCompanyInfo?.delivery_date1 || '')}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsPickupDate2CalendarShown(false);
                                                    setIsDeliveryDate2CalendarShown(false);

                                                    if (moment((props.selectedConsigneeCompanyInfo?.delivery_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.delivery_date1 || '').trim()) {
                                                        setPreSelectedDeliveryDate1(moment(props.selectedConsigneeCompanyInfo?.delivery_date1, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedDeliveryDate1(moment());
                                                    }

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
                                                        popup && (popup.style.top = (input.top + 5) + 'px');
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

                                                    window.setTimeout(async () => {
                                                        setIsDeliveryDate1CalendarShown(true);
                                                        refDeliveryDate1.current.inputElement.focus();
                                                    }, 0);
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={46 + props.tabTimes} type="text" placeholder="Delivery Time 1"
                                                    ref={refDeliveryTime1}
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setDeliveryTime1KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryTime1KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);

                                                            await props.setSelectedConsigneeCompanyInfo({
                                                                ...props.selectedConsigneeCompanyInfo,
                                                                delivery_time1: formatted
                                                            })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time1 = formatted;
                                                                    setIsSavingDeliveryId(-1);
                                                                    setIsSavingDeliveryId(delivery.id);
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_time1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time1 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_time1: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time1 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.delivery_time1 || ''}
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

                                                        let deliveryDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.delivery_date2 || ''), 'MM/DD/YYYY');
                                                        await setPreSelectedDeliveryDate2(deliveryDate2);

                                                        if (key === 13) {
                                                            if (isDeliveryDate2CalendarShown) {
                                                                await props.setSelectedConsigneeCompanyInfo({
                                                                    ...props.selectedConsigneeCompanyInfo,
                                                                    delivery_date2: preSelectedDeliveryDate2.clone().format('MM/DD/YYYY')
                                                                });

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                            delivery.delivery_date2 = preSelectedDeliveryDate2.clone().format('MM/DD/YYYY');
                                                                            setIsSavingDeliveryId(-1);
                                                                            setIsSavingDeliveryId(delivery.id);
                                                                        }
                                                                        return delivery;
                                                                    })
                                                                });

                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);
                                                                await setIsDeliveryDate1CalendarShown(false);
                                                                await setIsDeliveryDate2CalendarShown(false);

                                                                refDeliveryTime2.current.focus();
                                                            }

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

                                                                await props.setSelectedOrder({
                                                                    ...props.selected_order,
                                                                    deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                            delivery.delivery_date2 = preSelectedDeliveryDate2.clone().format('MM/DD/YYYY');
                                                                        }
                                                                        return delivery;
                                                                    })
                                                                });
                                                            }
                                                        }
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryDate2KeyCode === 9) {
                                                            let formatted = getFormattedDates(e.target.value);

                                                            await props.setSelectedConsigneeCompanyInfo({
                                                                ...props.selectedConsigneeCompanyInfo,
                                                                delivery_date2: formatted
                                                            })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date2 = formatted;
                                                                    setIsSavingDeliveryId(-1);
                                                                    setIsSavingDeliveryId(delivery.id);
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                            // await setIsPickupDate1CalendarShown(false);
                                                            // await setIsPickupDate2CalendarShown(false);
                                                            // await setIsDeliveryDate1CalendarShown(false);
                                                            // await setIsDeliveryDate2CalendarShown(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_date2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date2 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_date2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_date2 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    value={(props.selectedConsigneeCompanyInfo?.delivery_date2 || '')}
                                                />

                                                <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                                                    setIsPickupDate1CalendarShown(false);
                                                    setIsPickupDate2CalendarShown(false);
                                                    setIsDeliveryDate1CalendarShown(false);

                                                    if (moment((props.selectedConsigneeCompanyInfo?.delivery_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.delivery_date2 || '').trim()) {
                                                        setPreSelectedDeliveryDate2(moment(props.selectedConsigneeCompanyInfo?.delivery_date2, 'MM/DD/YYYY'));
                                                    } else {
                                                        setPreSelectedDeliveryDate2(moment());
                                                    }

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
                                                        popup && (popup.style.top = (input.top + 5) + 'px');
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

                                                    window.setTimeout(async () => {
                                                        setIsDeliveryDate2CalendarShown(true);
                                                        refDeliveryDate2.current.inputElement.focus();
                                                    }, 0);
                                                }}></span>
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={48 + props.tabTimes} type="text" placeholder="Delivery Time 2"
                                                    ref={refDeliveryTime2}
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        setDeliveryTime2KeyCode(e.keyCode || e.which);
                                                    }}
                                                    onBlur={async (e) => {
                                                        if (deliveryTime2KeyCode === 9) {
                                                            let formatted = getFormattedHours(e.target.value);

                                                            await props.setSelectedConsigneeCompanyInfo({
                                                                ...props.selectedConsigneeCompanyInfo,
                                                                delivery_time2: formatted
                                                            })

                                                            let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time2 = formatted;
                                                                    setIsSavingDeliveryId(-1);
                                                                    setIsSavingDeliveryId(delivery.id);
                                                                }
                                                                return delivery;
                                                            });

                                                            await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_time2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time2 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            delivery_time2: e.target.value
                                                        });

                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.delivery_time2 = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.delivery_time2 || ''}
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
                                                            setIsSavingDeliveryId(props.selectedConsigneeCompanyInfo?.delivery_id || 0);
                                                            goToTabindex((50 + props.tabTimes).toString());
                                                            props.setIsShowingConsigneeSecondPage(false);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.special_instructions = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        });

                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            special_instructions: e.target.value
                                                        })
                                                    }}
                                                    onChange={(e) => {
                                                        props.setSelectedOrder({
                                                            ...props.selected_order,
                                                            deliveries: (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                                                                    delivery.special_instructions = e.target.value;
                                                                }
                                                                return delivery;
                                                            })
                                                        });

                                                        props.setSelectedConsigneeCompanyInfo({
                                                            ...props.selectedConsigneeCompanyInfo,
                                                            special_instructions: e.target.value
                                                        })
                                                    }}
                                                    value={props.selectedConsigneeCompanyInfo?.special_instructions || ''}
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
                    <div className="select-box-container" style={{ width: '10rem', position: 'relative' }}>
                        <div className="select-box-wrapper">
                            <input tabIndex={71 + props.tabTimes} type="text" placeholder="Event"
                                ref={refDispatchEvents}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    switch (key) {
                                        case 37: case 38: // arrow left | arrow up
                                            e.preventDefault();

                                            if ((props.selected_order?.id || 0) === 0) {
                                                // window.alert('You must create or load an order first!');
                                                return;
                                            }

                                            if (showDispatchEventItems) {
                                                if (showDispatchEventSecondPageItems) {
                                                    let selectedIndex = dispatchEventSecondPageItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setDispatchEventSecondPageItems(dispatchEventSecondPageItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setDispatchEventSecondPageItems(dispatchEventSecondPageItems.map((item, index) => {
                                                            if (selectedIndex === 0) {
                                                                item.selected = index === (dispatchEventSecondPageItems.length - 1);
                                                            } else {
                                                                item.selected = index === (selectedIndex - 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refDispatchEventSecondPagePopupItems.current.map((r, i) => {
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
                                                    let selectedIndex = dispatchEventItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                            if (selectedIndex === 0) {
                                                                item.selected = index === (dispatchEventItems.length - 1);
                                                            } else {
                                                                item.selected = index === (selectedIndex - 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refDispatchEventPopupItems.current.map((r, i) => {
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
                                            } else {
                                                await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                    if (item.name.toLowerCase().includes((props.dispatchEvent?.name || '').trim().toLowerCase())) {
                                                        item.hidden = false;
                                                        item.selected = (props.dispatchEvent?.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === props.dispatchEvent.id
                                                    } else {
                                                        item.selected = false;
                                                        item.hidden = true;
                                                    }

                                                    return item;
                                                }));

                                                window.setTimeout(() => {
                                                    if (dispatchEventItems.find(i => !i.hidden) !== undefined) {
                                                        if (!showDispatchEventItems) {
                                                            setShowDispatchEventItems(true);

                                                            refDispatchEventPopupItems.current.map((r, i) => {
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
                                                    } else {
                                                        setShowDispatchEventItems(false);
                                                    }
                                                }, 0);
                                            }
                                            break;

                                        case 39: case 40: // arrow right | arrow down
                                            e.preventDefault();

                                            if ((props.selected_order?.id || 0) === 0) {
                                                // window.alert('You must create or load an order first!');
                                                return;
                                            }

                                            if (showDispatchEventItems) {
                                                if (showDispatchEventSecondPageItems) {
                                                    let selectedIndex = dispatchEventSecondPageItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setDispatchEventSecondPageItems(dispatchEventSecondPageItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setDispatchEventSecondPageItems(dispatchEventSecondPageItems.map((item, index) => {
                                                            if (selectedIndex === (dispatchEventSecondPageItems.length - 1)) {
                                                                item.selected = index === 0;
                                                            } else {
                                                                item.selected = index === (selectedIndex + 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refDispatchEventSecondPagePopupItems.current.map((r, i) => {
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
                                                    let selectedIndex = dispatchEventItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                            if (selectedIndex === (dispatchEventItems.length - 1)) {
                                                                item.selected = index === 0;
                                                            } else {
                                                                item.selected = index === (selectedIndex + 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refDispatchEventPopupItems.current.map((r, i) => {
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

                                            } else {
                                                await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                    if (item.name.toLowerCase().includes((props.dispatchEvent?.name || '').trim().toLowerCase())) {
                                                        item.hidden = false;
                                                        item.selected = (props.dispatchEvent?.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === props.dispatchEvent.id
                                                    } else {
                                                        item.selected = false;
                                                        item.hidden = true;
                                                    }

                                                    return item;
                                                }));

                                                window.setTimeout(() => {
                                                    if (dispatchEventItems.find(i => !i.hidden) !== undefined) {
                                                        if (!showDispatchEventItems) {
                                                            setShowDispatchEventItems(true);

                                                            refDispatchEventPopupItems.current.map((r, i) => {
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
                                                    } else {
                                                        setShowDispatchEventItems(false);
                                                    }
                                                }, 0);
                                            }
                                            break;

                                        case 27: // escape
                                            e.preventDefault();
                                            if (showDispatchEventSecondPageItems) {
                                                await setShowDispatchEventSecondPageItems(false);
                                            } else {
                                                await setShowDispatchEventItems(false);
                                            }

                                            // refDispatchEvents.current.focus();
                                            break;

                                        case 13: // enter
                                            if (showDispatchEventItems && dispatchEventItems.findIndex(item => item.selected) > -1) {
                                                if (showDispatchEventSecondPageItems) {
                                                    let item = dispatchEventSecondPageItems.find(el => el.selected);

                                                    if (item !== undefined) {
                                                        let eventItem = dispatchEventItems.find(el => el.selected);

                                                        await setSelectedOrderEvent(item);

                                                        await props.setDispatchEvent(eventItem);
                                                        await props.setDispatchEventLocation(item.customer.city + ', ' + item.customer.state);

                                                        if (eventItem.type === 'arrived') {
                                                            await props.setDispatchEventNotes('Arrived at ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                        }

                                                        if (eventItem.type === 'loaded') {
                                                            await props.setDispatchEventNotes('Loaded at Shipper ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                        }

                                                        if (eventItem.type === 'delivered') {
                                                            await props.setDispatchEventNotes('Delivered at Consignee ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                        }

                                                        window.setTimeout(() => {
                                                            setShowDispatchEventSecondPageItems(false);
                                                            setShowDispatchEventItems(false);
                                                            goToTabindex((73 + props.tabTimes).toString());
                                                        }, 0);
                                                    }
                                                } else {
                                                    let item = dispatchEventItems[dispatchEventItems.findIndex(item => item.selected)];

                                                    if (item.type === 'arrived') {
                                                        if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                            await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                item.selected = item.type === 'arrived'
                                                                return item;
                                                            }));

                                                            let arriveIndex = -1;
                                                            let departureIndex = -1;

                                                            for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                let event = (props.selected_order?.events || [])[i];

                                                                if (event.event_type === 'arrived') {
                                                                    arriveIndex = i;
                                                                    break;
                                                                }

                                                            }

                                                            for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                let event = (props.selected_order?.events || [])[i];

                                                                if (event.event_type === 'departed') {
                                                                    departureIndex = i;
                                                                    break;
                                                                }

                                                            }

                                                            if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                                let items = [
                                                                    ...(props.selected_order?.pickups || []).filter(pu => {
                                                                        return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.shipper_id === (pu.customer?.id || 0))) === undefined;
                                                                    }),
                                                                    ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                        return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.consignee_id === (delivery?.customer.id || 0))) === undefined;
                                                                    })
                                                                ]

                                                                if (items.length > 0) {
                                                                    if (items.length === 1) {
                                                                        await props.setDispatchEvent(item);
                                                                        await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                        await props.setDispatchEventNotes('Arrived at ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                        await setSelectedOrderEvent(items[0]);

                                                                        window.setTimeout(() => {
                                                                            setShowDispatchEventItems(false);
                                                                            setDispatchEventSecondPageItems([]);
                                                                            setShowDispatchEventSecondPageItems(false);
                                                                            goToTabindex((73 + props.tabTimes).toString());
                                                                        }, 0);
                                                                    } else {
                                                                        items = items.map((x, i) => {
                                                                            x.selected = i === 0;
                                                                            return x;
                                                                        })
                                                                    }
                                                                } else {
                                                                    window.alert('No shippers or consignees available!');
                                                                    refDispatchEvents.current.focus();
                                                                    return;
                                                                }

                                                                window.setTimeout(async () => {
                                                                    await setDispatchEventSecondPageItems(items);
                                                                    await setShowDispatchEventSecondPageItems(true);
                                                                }, 0);
                                                            } else {
                                                                window.alert("You must enter a 'departed' event for the last 'arrived' event first!");
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }
                                                        } else {
                                                            window.alert('No shippers or consignees available!');
                                                            refDispatchEvents.current.focus();
                                                            return;
                                                        }

                                                    } else if (item.type === 'departed') {
                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                            item.selected = item.type === 'arrived'
                                                            return item;
                                                        }));

                                                        let arriveIndex = -1;
                                                        let departureIndex = -1;
                                                        let arrived_customer = {};

                                                        for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                            let event = (props.selected_order?.events || [])[i];

                                                            if (event.event_type === 'arrived') {
                                                                arrived_customer = { ...event.arrived_customer };
                                                                arriveIndex = i;
                                                                break;
                                                            }
                                                        }

                                                        for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                            let event = (props.selected_order?.events || [])[i];

                                                            if (event.event_type === 'departed') {
                                                                departureIndex = i;
                                                                break;
                                                            }
                                                        }

                                                        if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                            window.alert("You must enter an 'arrived' event first!");
                                                            refDispatchEvents.current.focus();
                                                            return;
                                                        } else {
                                                            await props.setDispatchEvent(item);
                                                            await props.setDispatchEventLocation(arrived_customer.city + ', ' + arrived_customer.state);
                                                            await props.setDispatchEventNotes('Departed at ' + arrived_customer.code + (arrived_customer.code_number === 0 ? '' : arrived_customer.code_number) + ' - ' + arrived_customer.name);
                                                            await setSelectedOrderEvent(arrived_customer);

                                                            window.setTimeout(() => {
                                                                setShowDispatchEventItems(false);
                                                                setDispatchEventSecondPageItems([]);
                                                                setShowDispatchEventSecondPageItems(false);
                                                                goToTabindex((73 + props.tabTimes).toString());
                                                            }, 0);
                                                        }
                                                    } else if (item.type === 'loaded') {
                                                        if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                            await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                item.selected = item.type === 'loaded'
                                                                return item;
                                                            }));

                                                            let items = [
                                                                ...(props.selected_order?.pickups || []).filter(pu => {
                                                                    return (props.selected_order?.events.find(el => el.event_type === 'loaded' && el.shipper_id === pu.customer.id)) === undefined;
                                                                })
                                                            ]

                                                            if (items.length > 0) {
                                                                if (items.length === 1) {
                                                                    await props.setDispatchEvent(item);
                                                                    await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                    await props.setDispatchEventNotes('Loaded at Shipper ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                    await setSelectedOrderEvent(items[0]);

                                                                    window.setTimeout(() => {
                                                                        setShowDispatchEventItems(false);
                                                                        setDispatchEventSecondPageItems([]);
                                                                        setShowDispatchEventSecondPageItems(false);
                                                                        goToTabindex((73 + props.tabTimes).toString());
                                                                    }, 0);
                                                                } else {
                                                                    items = items.map((x, i) => {
                                                                        x.selected = i === 0;
                                                                        return x;
                                                                    })
                                                                }
                                                            } else {
                                                                window.alert('No shippers available!');
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }

                                                            window.setTimeout(async () => {
                                                                await setDispatchEventSecondPageItems(items);
                                                                await setShowDispatchEventSecondPageItems(true);
                                                            }, 0);
                                                        } else {
                                                            window.alert('No shippers available!');
                                                            refDispatchEvents.current.focus();
                                                            return;
                                                        }

                                                    } else if (item.type === 'delivered') {
                                                        if ((props.selected_order?.deliveries || []).length > 0) {
                                                            await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                item.selected = item.type === 'delivered'
                                                                return item;
                                                            }));

                                                            let items = [
                                                                ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                    return (props.selected_order?.events.find(el => el.event_type === 'delivered' && el.consignee_id === delivery.customer.id)) === undefined;
                                                                })
                                                            ]

                                                            if (items.length > 0) {
                                                                if (items.length === 1) {
                                                                    await props.setDispatchEvent(item);
                                                                    await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                    await props.setDispatchEventNotes('Delivered at Consignee ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                    await setSelectedOrderEvent(items[0]);

                                                                    window.setTimeout(() => {
                                                                        setShowDispatchEventItems(false);
                                                                        setDispatchEventSecondPageItems([]);
                                                                        setShowDispatchEventSecondPageItems(false);
                                                                        goToTabindex((73 + props.tabTimes).toString());
                                                                    }, 0);
                                                                } else {
                                                                    items = items.map((x, i) => {
                                                                        x.selected = i === 0;
                                                                        return x;
                                                                    })
                                                                }
                                                            } else {
                                                                window.alert('No consignees available!');
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }

                                                            window.setTimeout(async () => {
                                                                await setDispatchEventSecondPageItems(items);
                                                                await setShowDispatchEventSecondPageItems(true);
                                                            }, 0);
                                                        } else {
                                                            window.alert('No consignees available!');
                                                            refDispatchEvents.current.focus();
                                                            return;
                                                        }

                                                    } else {
                                                        await props.setDispatchEvent(item);
                                                        await props.setDispatchEventLocation('');
                                                        await props.setDispatchEventNotes('');
                                                        setShowDispatchEventItems(false);
                                                        goToTabindex((72 + props.tabTimes).toString());
                                                    }
                                                }
                                            }
                                            break;

                                        case 9: // tab

                                            if (showDispatchEventItems || showDispatchEventSecondPageItems) {
                                                e.preventDefault();
                                                if (showDispatchEventItems && dispatchEventItems.findIndex(item => item.selected) > -1) {
                                                    if (showDispatchEventSecondPageItems) {
                                                        let item = dispatchEventSecondPageItems.find(el => el.selected);

                                                        if (item !== undefined) {
                                                            let eventItem = dispatchEventItems.find(el => el.selected);

                                                            await setSelectedOrderEvent(item);

                                                            await props.setDispatchEvent(eventItem);
                                                            await props.setDispatchEventLocation(item.customer.city + ', ' + item.customer.state);

                                                            if (eventItem.type === 'arrived') {
                                                                await props.setDispatchEventNotes('Arrived at ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                            }

                                                            if (eventItem.type === 'loaded') {
                                                                await props.setDispatchEventNotes('Loaded at Shipper ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                            }

                                                            if (eventItem.type === 'delivered') {
                                                                await props.setDispatchEventNotes('Delivered at Consignee ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                            }

                                                            window.setTimeout(() => {
                                                                setShowDispatchEventSecondPageItems(false);
                                                                setShowDispatchEventItems(false);
                                                                goToTabindex((73 + props.tabTimes).toString());
                                                            }, 0);
                                                        }
                                                    } else {
                                                        let item = dispatchEventItems[dispatchEventItems.findIndex(item => item.selected)];

                                                        if (item.type === 'arrived') {
                                                            if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                                await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                    item.selected = item.type === 'arrived'
                                                                    return item;
                                                                }));

                                                                let arriveIndex = -1;
                                                                let departureIndex = -1;

                                                                for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                    let event = (props.selected_order?.events || [])[i];

                                                                    if (event.event_type === 'arrived') {
                                                                        arriveIndex = i;
                                                                        break;
                                                                    }

                                                                }

                                                                for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                    let event = (props.selected_order?.events || [])[i];

                                                                    if (event.event_type === 'departed') {
                                                                        departureIndex = i;
                                                                        break;
                                                                    }

                                                                }

                                                                if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                                    let items = [
                                                                        ...(props.selected_order?.pickups || []).filter(pu => {
                                                                            return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.shipper_id === (pu.customer?.id || 0))) === undefined;
                                                                        }),
                                                                        ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                            return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.consignee_id === (delivery?.customer.id || 0))) === undefined;
                                                                        })
                                                                    ]

                                                                    if (items.length > 0) {
                                                                        if (items.length === 1) {
                                                                            await props.setDispatchEvent(item);
                                                                            await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                            await props.setDispatchEventNotes('Arrived at ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                            await setSelectedOrderEvent(items[0]);

                                                                            window.setTimeout(() => {
                                                                                setShowDispatchEventItems(false);
                                                                                setDispatchEventSecondPageItems([]);
                                                                                setShowDispatchEventSecondPageItems(false);
                                                                                goToTabindex((73 + props.tabTimes).toString());
                                                                            }, 0);
                                                                        } else {
                                                                            items = items.map((x, i) => {
                                                                                x.selected = i === 0;
                                                                                return x;
                                                                            })
                                                                        }
                                                                    } else {
                                                                        window.alert('No shippers or consignees available!');
                                                                        refDispatchEvents.current.focus();
                                                                        return;
                                                                    }

                                                                    window.setTimeout(async () => {
                                                                        await setDispatchEventSecondPageItems(items);
                                                                        await setShowDispatchEventSecondPageItems(true);
                                                                    }, 0);
                                                                } else {
                                                                    window.alert("You must enter a 'departed' event for the last 'arrived' event first!");
                                                                    refDispatchEvents.current.focus();
                                                                    return;
                                                                }
                                                            } else {
                                                                window.alert('No shippers or consignees available!');
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }

                                                        } else if (item.type === 'departed') {
                                                            await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                item.selected = item.type === 'arrived'
                                                                return item;
                                                            }));

                                                            let arriveIndex = -1;
                                                            let departureIndex = -1;
                                                            let arrived_customer = {};

                                                            for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                let event = (props.selected_order?.events || [])[i];

                                                                if (event.event_type === 'arrived') {
                                                                    arrived_customer = { ...event.arrived_customer };
                                                                    arriveIndex = i;
                                                                    break;
                                                                }
                                                            }

                                                            for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                let event = (props.selected_order?.events || [])[i];

                                                                if (event.event_type === 'departed') {
                                                                    departureIndex = i;
                                                                    break;
                                                                }
                                                            }

                                                            if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                                window.alert("You must enter an 'arrived' event first!");
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            } else {
                                                                await props.setDispatchEvent(item);
                                                                await props.setDispatchEventLocation(arrived_customer.city + ', ' + arrived_customer.state);
                                                                await props.setDispatchEventNotes('Departed at ' + arrived_customer.code + (arrived_customer.code_number === 0 ? '' : arrived_customer.code_number) + ' - ' + arrived_customer.name);
                                                                await setSelectedOrderEvent(arrived_customer);

                                                                window.setTimeout(() => {
                                                                    setShowDispatchEventItems(false);
                                                                    setDispatchEventSecondPageItems([]);
                                                                    setShowDispatchEventSecondPageItems(false);
                                                                    goToTabindex((73 + props.tabTimes).toString());
                                                                }, 0);
                                                            }
                                                        } else if (item.type === 'loaded') {
                                                            if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                                await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                    item.selected = item.type === 'loaded'
                                                                    return item;
                                                                }));

                                                                let items = [
                                                                    ...(props.selected_order?.pickups || []).filter(pu => {
                                                                        return (props.selected_order?.events.find(el => el.event_type === 'loaded' && el.shipper_id === pu.customer.id)) === undefined;
                                                                    })
                                                                ]

                                                                if (items.length > 0) {
                                                                    if (items.length === 1) {
                                                                        await props.setDispatchEvent(item);
                                                                        await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                        await props.setDispatchEventNotes('Loaded at Shipper ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                        await setSelectedOrderEvent(items[0]);

                                                                        window.setTimeout(() => {
                                                                            setShowDispatchEventItems(false);
                                                                            setDispatchEventSecondPageItems([]);
                                                                            setShowDispatchEventSecondPageItems(false);
                                                                            goToTabindex((73 + props.tabTimes).toString());
                                                                        }, 0);
                                                                    } else {
                                                                        items = items.map((x, i) => {
                                                                            x.selected = i === 0;
                                                                            return x;
                                                                        })
                                                                    }
                                                                } else {
                                                                    window.alert('No shippers available!');
                                                                    refDispatchEvents.current.focus();
                                                                    return;
                                                                }

                                                                window.setTimeout(async () => {
                                                                    await setDispatchEventSecondPageItems(items);
                                                                    await setShowDispatchEventSecondPageItems(true);
                                                                }, 0);
                                                            } else {
                                                                window.alert('No shippers available!');
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }

                                                        } else if (item.type === 'delivered') {
                                                            if ((props.selected_order?.deliveries || []).length > 0) {
                                                                await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                    item.selected = item.type === 'delivered'
                                                                    return item;
                                                                }));

                                                                let items = [
                                                                    ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                        return (props.selected_order?.events.find(el => el.event_type === 'delivered' && el.consignee_id === delivery.customer.id)) === undefined;
                                                                    })
                                                                ]

                                                                if (items.length > 0) {
                                                                    if (items.length === 1) {
                                                                        await props.setDispatchEvent(item);
                                                                        await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                        await props.setDispatchEventNotes('Delivered at Consignee ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                        await setSelectedOrderEvent(items[0]);

                                                                        window.setTimeout(() => {
                                                                            setShowDispatchEventItems(false);
                                                                            setDispatchEventSecondPageItems([]);
                                                                            setShowDispatchEventSecondPageItems(false);
                                                                            goToTabindex((73 + props.tabTimes).toString());
                                                                        }, 0);
                                                                    } else {
                                                                        items = items.map((x, i) => {
                                                                            x.selected = i === 0;
                                                                            return x;
                                                                        })
                                                                    }
                                                                } else {
                                                                    window.alert('No consignees available!');
                                                                    refDispatchEvents.current.focus();
                                                                    return;
                                                                }

                                                                window.setTimeout(async () => {
                                                                    await setDispatchEventSecondPageItems(items);
                                                                    await setShowDispatchEventSecondPageItems(true);
                                                                }, 0);
                                                            } else {
                                                                window.alert('No consignees available!');
                                                                refDispatchEvents.current.focus();
                                                                return;
                                                            }

                                                        } else {
                                                            await props.setDispatchEvent(item);
                                                            await props.setDispatchEventLocation('');
                                                            await props.setDispatchEventNotes('');
                                                            setShowDispatchEventItems(false);
                                                            goToTabindex((72 + props.tabTimes).toString());
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                onBlur={(e) => {
                                    if ((props.dispatchEvent?.id || 0) === 0) {
                                        props.setDispatchEvent({})
                                    }
                                }}
                                onInput={(e) => {
                                    if (!showDispatchEventSecondPageItems) {
                                        props.setDispatchEvent({
                                            ...props.dispatchEvent,
                                            name: e.target.value,
                                            id: 0
                                        })

                                        setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                            if (item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                                                item.hidden = false;
                                                item.selected = (props.dispatchEvent?.id || 0) === 0
                                                    ? index === 0
                                                    : item.id === props.dispatchEvent.id
                                            } else {
                                                item.selected = false;
                                                item.hidden = true;
                                            }

                                            return item;
                                        }));

                                        window.setTimeout(() => {
                                            if (dispatchEventItems.find(i => !i.hidden) !== undefined) {
                                                if (!showDispatchEventItems) {
                                                    setShowDispatchEventItems(true);

                                                    refDispatchEventPopupItems.current.map((r, i) => {
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
                                            } else {
                                                setShowDispatchEventItems(false);
                                            }
                                        }, 0);
                                    }

                                }}
                                onChange={(e) => {
                                    if (!showDispatchEventSecondPageItems) {
                                        props.setDispatchEvent({
                                            ...props.dispatchEvent,
                                            name: e.target.value,
                                            id: 0
                                        })

                                        setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                            if (item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                                                item.hidden = false;
                                                item.selected = (props.dispatchEvent?.id || 0) === 0
                                                    ? index === 0
                                                    : item.id === props.dispatchEvent.id
                                            } else {
                                                item.selected = false;
                                                item.hidden = true;
                                            }

                                            return item;
                                        }));

                                        window.setTimeout(() => {
                                            if (dispatchEventItems.find(i => !i.hidden) !== undefined) {
                                                if (!showDispatchEventItems) {
                                                    setShowDispatchEventItems(true);

                                                    refDispatchEventPopupItems.current.map((r, i) => {
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
                                            } else {
                                                setShowDispatchEventItems(false);
                                            }
                                        }, 0);
                                    }
                                }}
                                value={(props.dispatchEvent.name || '').toUpperCase()}

                            />

                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={async () => {
                                if (showDispatchEventItems) {
                                    setShowDispatchEventItems(false);
                                } else {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must create or load an order first!');
                                        return;
                                    }

                                    await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                        item.hidden = false;
                                        item.selected = (props.dispatchEvent?.id || 0) === 0
                                            ? index === 0
                                            : item.id === props.dispatchEvent.id

                                        return item;
                                    }));

                                    window.setTimeout(() => {
                                        if (dispatchEventItems.find(i => !i.hidden) !== undefined) {
                                            if (!showDispatchEventItems) {
                                                setShowDispatchEventItems(true);

                                                refDispatchEventPopupItems.current.map((r, i) => {
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
                                        } else {
                                            setShowDispatchEventItems(false);
                                        }
                                    }, 0);
                                }

                                refDispatchEvents.current.focus();
                            }} />

                        </div>

                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={showDispatchEventItems}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-dispatch-event"
                                    style={{
                                        ...styles,
                                        left: '0',
                                        display: 'block'
                                    }}
                                    ref={refDispatchEventDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                        <div className="mochi-contextual-popup-content" >
                                            <div className="mochi-contextual-popup-wrapper multipage">
                                                <div className="mochi-contextual-popup-slider" style={{
                                                    transform: `translateX(${showDispatchEventSecondPageItems ? '-50%' : '0'})`
                                                }}>
                                                    <div className="first-page">
                                                        <div className="page-wrapper">
                                                            {
                                                                dispatchEventItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected,
                                                                        'hidden': item.hidden
                                                                    });

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onMouseOver={async () => {
                                                                                await setDispatchEventItems(dispatchEventItems.map((i, index) => {
                                                                                    i.selected = i.id === item.id
                                                                                    return i;
                                                                                }));
                                                                            }}
                                                                            onClick={async () => {
                                                                                if (item.type === 'arrived') {
                                                                                    if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                                            item.selected = item.type === 'arrived'
                                                                                            return item;
                                                                                        }));

                                                                                        let arriveIndex = -1;
                                                                                        let departureIndex = -1;

                                                                                        for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                                            let event = (props.selected_order?.events || [])[i];

                                                                                            if (event.event_type === 'arrived') {
                                                                                                arriveIndex = i;
                                                                                                break;
                                                                                            }

                                                                                        }

                                                                                        for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                                            let event = (props.selected_order?.events || [])[i];

                                                                                            if (event.event_type === 'departed') {
                                                                                                departureIndex = i;
                                                                                                break;
                                                                                            }

                                                                                        }

                                                                                        if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                                                            let items = [
                                                                                                ...(props.selected_order?.pickups || []).filter(pu => {
                                                                                                    return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.shipper_id === (pu.customer?.id || 0))) === undefined;
                                                                                                }),
                                                                                                ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                                                    return (props.selected_order?.events.find(el => el.event_type === 'arrived' && el.consignee_id === (delivery?.id || 0))) === undefined;
                                                                                                })
                                                                                            ]

                                                                                            if (items.length > 0) {
                                                                                                if (items.length === 1) {
                                                                                                    await props.setDispatchEvent(item);
                                                                                                    await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                                                    await props.setDispatchEventNotes('Arrived at ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                                                    await setSelectedOrderEvent(items[0]);

                                                                                                    window.setTimeout(() => {
                                                                                                        setShowDispatchEventItems(false);
                                                                                                        setDispatchEventSecondPageItems([]);
                                                                                                        setShowDispatchEventSecondPageItems(false);
                                                                                                        goToTabindex((73 + props.tabTimes).toString());
                                                                                                    }, 0);
                                                                                                } else {
                                                                                                    items = items.map((x, i) => {
                                                                                                        x.selected = i === 0;
                                                                                                        return x;
                                                                                                    })
                                                                                                }
                                                                                            } else {
                                                                                                window.alert('No shippers or consignees available!');
                                                                                                refDispatchEvents.current.focus();
                                                                                                return;
                                                                                            }

                                                                                            window.setTimeout(async () => {
                                                                                                await setDispatchEventSecondPageItems(items);
                                                                                                await setShowDispatchEventSecondPageItems(true);
                                                                                            }, 0);
                                                                                        } else {
                                                                                            window.alert("You must enter a 'departed' event for the last 'arrived' event first!");
                                                                                            refDispatchEvents.current.focus();
                                                                                            return;
                                                                                        }
                                                                                    } else {
                                                                                        window.alert('No shippers or consignees available!');
                                                                                        refDispatchEvents.current.focus();
                                                                                        return;
                                                                                    }

                                                                                } else if (item.type === 'departed') {
                                                                                    await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                                        item.selected = item.type === 'arrived'
                                                                                        return item;
                                                                                    }));

                                                                                    let arriveIndex = -1;
                                                                                    let departureIndex = -1;
                                                                                    let arrived_customer = {};

                                                                                    for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                                        let event = (props.selected_order?.events || [])[i];

                                                                                        if (event.event_type === 'arrived') {
                                                                                            arrived_customer = { ...event.arrived_customer };
                                                                                            arriveIndex = i;
                                                                                            break;
                                                                                        }
                                                                                    }

                                                                                    for (let i = 0; i < (props.selected_order?.events || []).length; i++) {
                                                                                        let event = (props.selected_order?.events || [])[i];

                                                                                        if (event.event_type === 'departed') {
                                                                                            departureIndex = i;
                                                                                            break;
                                                                                        }
                                                                                    }

                                                                                    if ((arriveIndex === -1 && departureIndex === -1) || (departureIndex > -1 && departureIndex < arriveIndex)) {
                                                                                        window.alert("You must enter an 'arrived' event first!");
                                                                                        refDispatchEvents.current.focus();
                                                                                        return;
                                                                                    } else {
                                                                                        await props.setDispatchEvent(item);
                                                                                        await props.setDispatchEventLocation(arrived_customer.city + ', ' + arrived_customer.state);
                                                                                        await props.setDispatchEventNotes('Departed at ' + arrived_customer.code + (arrived_customer.code_number === 0 ? '' : arrived_customer.code_number) + ' - ' + arrived_customer.name);
                                                                                        await setSelectedOrderEvent(arrived_customer);

                                                                                        window.setTimeout(() => {
                                                                                            setShowDispatchEventItems(false);
                                                                                            setDispatchEventSecondPageItems([]);
                                                                                            setShowDispatchEventSecondPageItems(false);
                                                                                            goToTabindex((73 + props.tabTimes).toString());
                                                                                        }, 0);
                                                                                    }

                                                                                } else if (item.type === 'loaded') {
                                                                                    if ((props.selected_order?.pickups || []).length > 0 || (props.selected_order?.deliveries || []).length > 0) {
                                                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                                            item.selected = item.type === 'loaded'
                                                                                            return item;
                                                                                        }));

                                                                                        let items = [
                                                                                            ...(props.selected_order?.pickups || []).filter(pu => {
                                                                                                return (props.selected_order?.events.find(el => el.event_type === 'loaded' && el.shipper_id === (pu.customer?.id || 0))) === undefined;
                                                                                            })
                                                                                        ]

                                                                                        if (items.length > 0) {
                                                                                            if (items.length === 1) {
                                                                                                await props.setDispatchEvent(item);
                                                                                                await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                                                await props.setDispatchEventNotes('Loaded at Shipper ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                                                await setSelectedOrderEvent(items[0]);

                                                                                                window.setTimeout(() => {
                                                                                                    setShowDispatchEventItems(false);
                                                                                                    setDispatchEventSecondPageItems([]);
                                                                                                    setShowDispatchEventSecondPageItems(false);
                                                                                                    goToTabindex((73 + props.tabTimes).toString());
                                                                                                }, 0);
                                                                                            } else {
                                                                                                items = items.map((x, i) => {
                                                                                                    x.selected = i === 0;
                                                                                                    return x;
                                                                                                })
                                                                                            }
                                                                                        } else {
                                                                                            window.alert('No shippers available!');
                                                                                            refDispatchEvents.current.focus();
                                                                                            return;
                                                                                        }

                                                                                        window.setTimeout(async () => {
                                                                                            await setDispatchEventSecondPageItems(items);
                                                                                            await setShowDispatchEventSecondPageItems(true);
                                                                                        }, 0);
                                                                                    } else {
                                                                                        window.alert('No shippers available!');
                                                                                        refDispatchEvents.current.focus();
                                                                                        return;
                                                                                    }

                                                                                } else if (item.type === 'delivered') {
                                                                                    if ((props.selected_order?.deliveries || []).length > 0) {
                                                                                        await setDispatchEventItems(dispatchEventItems.map((item, index) => {
                                                                                            item.selected = item.type === 'delivered'
                                                                                            return item;
                                                                                        }));

                                                                                        let items = [
                                                                                            ...(props.selected_order?.deliveries || []).filter(delivery => {
                                                                                                return (props.selected_order?.events.find(el => el.event_type === 'delivered' && el.consignee_id === (delivery.customer?.id || 0))) === undefined;
                                                                                            })
                                                                                        ]

                                                                                        if (items.length > 0) {
                                                                                            if (items.length === 1) {
                                                                                                await props.setDispatchEvent(item);
                                                                                                await props.setDispatchEventLocation(items[0].customer.city + ', ' + items[0].customer.state);
                                                                                                await props.setDispatchEventNotes('Delivered at Consignee ' + items[0].customer.code + (items[0].customer.code_number === 0 ? '' : items[0].customer.code_number) + ' - ' + items[0].customer.name);
                                                                                                await setSelectedOrderEvent(items[0]);

                                                                                                window.setTimeout(() => {
                                                                                                    setShowDispatchEventItems(false);
                                                                                                    setDispatchEventSecondPageItems([]);
                                                                                                    setShowDispatchEventSecondPageItems(false);
                                                                                                    goToTabindex((73 + props.tabTimes).toString());
                                                                                                }, 0);
                                                                                            } else {
                                                                                                items = items.map((x, i) => {
                                                                                                    x.selected = i === 0;
                                                                                                    return x;
                                                                                                })
                                                                                            }
                                                                                        } else {
                                                                                            window.alert('No consignees available!');
                                                                                            refDispatchEvents.current.focus();
                                                                                            return;
                                                                                        }

                                                                                        window.setTimeout(async () => {
                                                                                            await setDispatchEventSecondPageItems(items);
                                                                                            await setShowDispatchEventSecondPageItems(true);
                                                                                        }, 0);
                                                                                    } else {
                                                                                        window.alert('No consignees available!');
                                                                                        refDispatchEvents.current.focus();
                                                                                        return;
                                                                                    }

                                                                                } else {
                                                                                    await props.setDispatchEvent(item);
                                                                                    await props.setDispatchEventLocation('');
                                                                                    await props.setDispatchEventNotes('');
                                                                                    setShowDispatchEventItems(false);
                                                                                    goToTabindex((72 + props.tabTimes).toString());
                                                                                }
                                                                            }}
                                                                            ref={ref => refDispatchEventPopupItems.current.push(ref)}
                                                                        >
                                                                            <Highlighter
                                                                                highlightClassName="mochi-item-highlight-text"
                                                                                searchWords={[]}
                                                                                autoEscape={true}
                                                                                textToHighlight={item.name}
                                                                            />
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
                                                    <div className="second-page">
                                                        <div className="page-wrapper">
                                                            {
                                                                dispatchEventSecondPageItems.map((item, index) => {
                                                                    console.log(item);
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
                                                                                let eventItem = dispatchEventItems.find(el => el.selected);

                                                                                await setSelectedOrderEvent(item);

                                                                                await props.setDispatchEvent(eventItem);
                                                                                await props.setDispatchEventLocation(item.customer.city + ', ' + item.customer.state);

                                                                                if (eventItem.type === 'arrived') {
                                                                                    await props.setDispatchEventNotes('Arrived at ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                                                }

                                                                                if (eventItem.type === 'loaded') {
                                                                                    await props.setDispatchEventNotes('Loaded at Shipper ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                                                }

                                                                                if (eventItem.type === 'delivered') {
                                                                                    await props.setDispatchEventNotes('Delivered at Consignee ' + item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.name);
                                                                                }

                                                                                window.setTimeout(() => {
                                                                                    setShowDispatchEventSecondPageItems(false);
                                                                                    setShowDispatchEventItems(false);
                                                                                    goToTabindex((73 + props.tabTimes).toString());
                                                                                }, 0);
                                                                            }}
                                                                            onMouseOver={async () => {
                                                                                await setDispatchEventSecondPageItems(dispatchEventSecondPageItems.map((i, index) => {
                                                                                    i.selected = i.id === item.id
                                                                                    return i;
                                                                                }));
                                                                            }}
                                                                            ref={ref => refDispatchEventSecondPagePopupItems.current.push(ref)}
                                                                        >
                                                                            <Highlighter
                                                                                highlightClassName="mochi-item-highlight-text"
                                                                                searchWords={[]}
                                                                                autoEscape={true}
                                                                                textToHighlight={
                                                                                    item.customer.code + (item.customer.code_number === 0 ? '' : item.customer.code_number) + ' - ' + item.customer.city + ', ' + item.customer.state
                                                                                }
                                                                            />
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Transition>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '10rem' }}>
                        <input tabIndex={72 + props.tabTimes} type="text" placeholder="Event Location"
                            onInput={(e) => {
                                if ((props.dispatchEvent?.type || '') !== 'arrived' &&
                                    (props.dispatchEvent?.type || '') !== 'departed' &&
                                    (props.dispatchEvent?.type || '') !== 'loaded' &&
                                    (props.dispatchEvent?.type || '') !== 'delivered')
                                    props.setDispatchEventLocation(e.target.value)
                            }}
                            onChange={(e) => {
                                if ((props.dispatchEvent?.type || '') !== 'arrived' &&
                                    (props.dispatchEvent?.type || '') !== 'departed' &&
                                    (props.dispatchEvent?.type || '') !== 'loaded' &&
                                    (props.dispatchEvent?.type || '') !== 'delivered')
                                    props.setDispatchEventLocation(e.target.value)
                            }}
                            value={props.dispatchEventLocation || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input tabIndex={73 + props.tabTimes} type="text" placeholder="Event Notes"
                            onKeyDown={(e) => {
                                let key = e.keyCode || e.which;

                                if (key === 9) {

                                }
                            }}
                            onInput={(e) => {
                                if ((props.dispatchEvent?.type || '') !== 'arrived' &&
                                    (props.dispatchEvent?.type || '') !== 'departed' &&
                                    (props.dispatchEvent?.type || '') !== 'loaded' &&
                                    (props.dispatchEvent?.type || '') !== 'delivered')
                                    props.setDispatchEventNotes(e.target.value)
                            }}
                            onChange={(e) => {
                                if ((props.dispatchEvent?.type || '') !== 'arrived' &&
                                    (props.dispatchEvent?.type || '') !== 'departed' &&
                                    (props.dispatchEvent?.type || '') !== 'loaded' &&
                                    (props.dispatchEvent?.type || '') !== 'delivered')
                                    props.setDispatchEventNotes(e.target.value)
                            }}
                            value={props.dispatchEventNotes || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="select-box-container" style={{ width: '8rem' }}>
                        <div className="select-box-wrapper">
                            <MaskedInput tabIndex={74 + props.tabTimes}
                                mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                guide={false}
                                type="text" placeholder="Event Date"
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    if (key >= 37 && key <= 40) {
                                        let event_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.dispatchEventDate || ''), 'MM/DD/YYYY');
                                        await setPreSelectedDispatchEventDate(event_date);

                                        if (isDispatchEventDateCalendarShown) {
                                            e.preventDefault();

                                            if (key === 37) { // left - minus 1
                                                setPreSelectedDispatchEventDate(preSelectedDispatchEventDate.clone().subtract(1, 'day'));
                                            }

                                            if (key === 38) { // up - minus 7
                                                setPreSelectedDispatchEventDate(preSelectedDispatchEventDate.clone().subtract(7, 'day'));
                                            }

                                            if (key === 39) { // right - plus 1
                                                setPreSelectedDispatchEventDate(preSelectedDispatchEventDate.clone().add(1, 'day'));
                                            }

                                            if (key === 40) { // down - plus 7
                                                setPreSelectedDispatchEventDate(preSelectedDispatchEventDate.clone().add(7, 'day'));
                                            }
                                        } else {
                                            await setIsDispatchEventDateCalendarShown(true);
                                        }
                                    }

                                    if (key === 13) {
                                        let event_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.dispatchEventDate || ''), 'MM/DD/YYYY');
                                        await setPreSelectedDispatchEventDate(event_date);

                                        if (isDispatchEventDateCalendarShown) {
                                            event_date = preSelectedDispatchEventDate.clone().format('MM/DD/YYYY');

                                            await props.setDispatchEventDate(event_date);

                                            await setIsDispatchEventDateCalendarShown(false);
                                        }
                                    }

                                    if (key === 9) {
                                        let event_date = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.dispatchEventDate || ''), 'MM/DD/YYYY');
                                        await setPreSelectedDispatchEventDate(event_date);

                                        if (isDispatchEventDateCalendarShown) {
                                            event_date = preSelectedDispatchEventDate.clone().format('MM/DD/YYYY');

                                            await props.setDispatchEventDate(event_date);

                                            await setIsDispatchEventDateCalendarShown(false);
                                        }
                                    }

                                }}
                                onBlur={e => { props.setDispatchEventDate(getFormattedDates(props.dispatchEventDate)) }}
                                onInput={e => { props.setDispatchEventDate(e.target.value) }}
                                onChange={e => { props.setDispatchEventDate(e.target.value) }}
                                value={props.dispatchEventDate || ''}
                                ref={refEventDate}
                            />

                            <FontAwesomeIcon className="dropdown-button calendar" icon={faCalendarAlt} onClick={(e) => {
                                e.stopPropagation();
                                setIsDispatchEventDateCalendarShown(true)

                                if (moment((props.dispatchEventDate || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.dispatchEventDate || '').trim()) {
                                    setPreSelectedDispatchEventDate(moment(props.dispatchEventDate, 'MM/DD/YYYY'));
                                } else {
                                    setPreSelectedDispatchEventDate(moment());
                                }

                                refEventDate.current.inputElement.focus();
                            }} />
                        </div>

                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={isDispatchEventDateCalendarShown}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-dispatch-event-date"
                                    style={{
                                        ...styles,
                                        left: '-100px',
                                        display: 'block'
                                    }}
                                    ref={refDispatchEventDateCalendarDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below" style={{ height: 275 }}>
                                        <div className="mochi-contextual-popup-content" >
                                            <div className="mochi-contextual-popup-wrapper">
                                                <Calendar
                                                    value={moment((props.dispatchEventDate || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.dispatchEventDate || '').trim()
                                                        ? moment(props.dispatchEventDate, 'MM/DD/YYYY')
                                                        : moment()}
                                                    onChange={(day) => {
                                                        props.setDispatchEventDate(day.format('MM/DD/YYYY'))
                                                    }}
                                                    closeCalendar={() => { setIsDispatchEventDateCalendarShown(false); }}
                                                    preDay={preSelectedDispatchEventDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Transition>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '6rem' }}>
                        <input tabIndex={75 + props.tabTimes} type="text" placeholder="Event Time"
                            ref={refEventTime}
                            onKeyDown={async (e) => {
                                let key = e.keyCode || e.which;

                                e.stopPropagation();

                                if (key === 9) {
                                    e.preventDefault();

                                    let formatted = getFormattedHours(e.target.value);
                                    console.log(e.target.value, formatted);
                                    await props.setDispatchEventTime(formatted);

                                    if ((props.dispatchEvent?.name || '') === '') {
                                        goToTabindex((1 + props.tabTimes).toString());

                                    } else {
                                        if ((props.selected_order?.id || 0) === 0) {
                                            goToTabindex((1 + props.tabTimes).toString());
                                            return;
                                        }

                                        let event_parameters = {
                                            order_id: props.selected_order.id,
                                            time: moment().format('HHmm'),
                                            event_time: formatted,
                                            date: moment().format('MM/DD/YYYY'),
                                            event_date: props.dispatchEventDate,
                                            user_id: props.selected_order.ae_number,
                                            event_location: props.dispatchEventLocation,
                                            event_notes: props.dispatchEventNotes,
                                            event_type: props.dispatchEvent.type,
                                        }

                                        if (props.dispatchEvent.type === 'arrived') {
                                            event_parameters.arrived_customer_id = selectedOrderEvent.customer.id;
                                            event_parameters.shipper_id = (selectedOrderEvent.customer.type || '') === 'pickup' ? selectedOrderEvent.customer.id : null;
                                            event_parameters.consignee_id = (selectedOrderEvent.customer.type || '') === 'delivery' ? selectedOrderEvent.customer.id : null;
                                        } else if (props.dispatchEvent.type === 'departed') {
                                            event_parameters.departed_customer_id = selectedOrderEvent.id;
                                        } else if (props.dispatchEvent.type === 'loaded') {
                                            event_parameters.shipper_id = selectedOrderEvent.customer.id;
                                        } else if (props.dispatchEvent.type === 'delivered') {
                                            event_parameters.consignee_id = selectedOrderEvent.customer.id;
                                        } else {
                                            if (event_parameters.event_notes.trim() === '') {
                                                window.alert('You must include some notes!');
                                                refEventTime.current.focus();
                                                return;
                                            }

                                            if (event_parameters.event_date.trim() === '') {
                                                window.alert('You must include the event date!');
                                                refEventTime.current.focus();
                                                return;
                                            }

                                            if (event_parameters.event_time.trim() === '') {
                                                window.alert('You must include the event time!');
                                                refEventTime.current.focus();
                                                return;
                                            }
                                        }

                                        if (window.confirm('Save this event?')) {
                                            e.preventDefault();
                                            axios.post(props.serverUrl + '/saveOrderEvent', event_parameters).then(async res => {
                                                if (res.data.result === 'OK') {
                                                    await props.setSelectedOrder({ ...props.selected_order, events: res.data.order_events });

                                                    props.setDispatchEvent({});
                                                    props.setDispatchEventLocation('');
                                                    props.setDispatchEventNotes('');
                                                    props.setDispatchEventDate('');
                                                    props.setDispatchEventTime('');

                                                    refDispatchEvents.current.focus();
                                                } else if (res.data.result === 'ORDER ID NOT VALID') {
                                                    window.alert('The order number is not valid!');
                                                    refEventTime.current.focus();
                                                }
                                            }).catch(e => {
                                                console.log('error saving order event', e);
                                            })
                                        } else {
                                            e.preventDefault();
                                            refEventTime.current.focus();
                                        }
                                    }
                                }
                            }}
                            onInput={(e) => {
                                props.setDispatchEventTime(e.target.value);
                            }}
                            onChange={(e) => {
                                props.setDispatchEventTime(e.target.value);
                            }}
                            value={props.dispatchEventTime || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div style={{ borderRight: 'solid 1px rgba(0,0,0,0.5)', width: 1, height: '100%', marginLeft: 8 }}></div>
                </div>

                <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '.8fr 0.1fr 1.3fr 0.1fr 1.3fr 0.1fr 1.3fr 0.1fr .9fr' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', textDecoration: 'underline', fontWeight: 'bold', whiteSpace: 'nowrap', textAlign: 'center', marginBottom: 1 }}>Miles</div>
                        <div style={{ fontSize: '0.7rem', position: 'relative', textAlign: 'center', height: '100%' }}>
                            {props.mileageLoaderVisible ? <div className="loading-container" style={{ right: 'initial', left: '50%' }}>
                                <Loader type="ThreeDots" color="#333738" height={20} width={20} visible={props.mileageLoaderVisible} />
                            </div> : ((props.selected_order?.miles || 0) / 1609.34).toFixed(0)}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.5)' }}>|</div>
                    <div>
                        <div style={{ fontSize: '0.7rem', textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', marginBottom: 1 }}>Customer Charges</div>
                        <div style={{ fontSize: '0.7rem', textAlign: 'center' }}>$2,300.00</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.5)' }}>|</div>
                    <div>
                        <div style={{ fontSize: '0.7rem', textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', marginBottom: 1 }}>Carrier Costs</div>
                        <div style={{ fontSize: '0.7rem', textAlign: 'center' }}>$2,000.00</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.5)' }}>|</div>
                    <div>
                        <div style={{ fontSize: '0.7rem', textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', marginBottom: 1 }}>Profit</div>
                        <div style={{ fontSize: '0.7rem', textAlign: 'center' }}>$300.00</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.5)' }}>|</div>
                    <div>
                        <div style={{ fontSize: '0.7rem', textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', marginBottom: 1 }}>Percentage</div>
                        <div style={{ fontSize: '0.7rem', textAlign: 'center' }}>15%</div>
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
                                        <div style="min-width:15%;max-width:15%;">${item.event_date}@${item.event_time}</div>
                                        <div style="min-width:10%;max-width:10%;">${item.user_id}</div>
                                        <div style="min-width:15%;max-width:15%;">${item.event_type.toUpperCase()}</div>
                                        <div style="min-width:20%;max-width:20%;">${item.event_location || ''}</div>
                                        <div style="min-width:40%;max-width:40%;">${item.event_notes || ''}</div> 
                                    </div>
                                    `;

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

                    <div className="order-events-container">
                        {
                            (props.selected_order?.events || []).length > 0 &&
                            <div className="order-events-item">
                                <div className="event-date">Date</div>
                                <div className="event-time">Time</div>
                                <div className="event-user-id">User ID</div>
                                <div className="event-type">Event</div>
                                <div className="event-location">Location</div>
                                <div className="event-notes">Notes</div>
                                <div className="event-date">Event Date</div>
                                <div className="event-time">Event Time</div>
                            </div>
                        }

                        <div className="order-events-wrapper">
                            {
                                (props.selected_order?.events || []).map((item, index) => (
                                    <div className="order-events-item" key={index}>
                                        <div className="event-date">{item.date}</div>
                                        <div className="event-time">{item.time}</div>
                                        <div className="event-user-id">{item.user_id}</div>
                                        <div className="event-type">{item.event_type.toUpperCase()}</div>
                                        <div className="event-location">{item.event_location}</div>
                                        <div className="event-notes">{item.event_notes}</div>
                                        <div className="event-date">{item.event_date}</div>
                                        <div className="event-time">{item.event_time}</div>
                                    </div>
                                ))
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
                                <ChangeCarrier
                                    setOpenedPanels={props.setOpenedPanels}
                                    setShowingChangeCarrier={props.setShowingChangeCarrier}
                                    setSelectedOrder={props.setSelectedOrder}
                                    setNewCarrier={props.setNewCarrier}
                                    setDispatchCarrierInfoCarrierSearchChanging={props.setDispatchCarrierInfoCarrierSearchChanging}
                                    setDispatchCarrierInfoCarriersChanging={props.setDispatchCarrierInfoCarriersChanging}
                                    setSelectedDispatchCarrierInfoCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                    setSelectedDispatchCarrierInfoContact={props.setSelectedDispatchCarrierInfoContact}
                                    setSelectedDispatchCarrierInfoInsurance={props.setSelectedDispatchCarrierInfoInsurance}
                                    setSelectedDispatchCarrierInfoDriver={props.setSelectedDispatchCarrierInfoDriver}

                                    carrierInfoSearchChangingPanelName='carrier-info-search-changing'
                                    adjustRatePanelName='adjust-rate'
                                />
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

            <CalendarPopup
                popupRef={refCalendarPickupDate1}
                popupClasses={popupCalendarPickupDate1Classes}

                popupGetter={moment((props.selectedShipperCompanyInfo?.pu_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.pu_date1 || '').trim()
                    ? moment(props.selectedShipperCompanyInfo?.pu_date1, 'MM/DD/YYYY')
                    : moment()}

                popupSetter={async (day) => {
                    await props.setSelectedShipperCompanyInfo({
                        ...props.selectedShipperCompanyInfo,
                        pu_date1: day.format('MM/DD/YYYY'),
                        pu_date2: day.format('MM/DD/YYYY')
                    })

                    let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                            pu.pu_date1 = day.format('MM/DD/YYYY');
                            pu.pu_date2 = day.format('MM/DD/YYYY');
                        }
                        return pu;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                    refPickupTime1.current.focus();
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

                popupGetter={moment((props.selectedShipperCompanyInfo?.pu_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedShipperCompanyInfo?.pu_date2 || '').trim()
                    ? moment(props.selectedShipperCompanyInfo?.pu_date2, 'MM/DD/YYYY')
                    : moment()}

                popupSetter={async (day) => {
                    await props.setSelectedShipperCompanyInfo({
                        ...props.selectedShipperCompanyInfo,
                        pu_date2: day.format('MM/DD/YYYY')
                    })

                    let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                        if (pu.id === (props.selectedShipperCompanyInfo?.pickup_id || 0)) {
                            pu.pu_date2 = day.format('MM/DD/YYYY');
                        }
                        return pu;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, pickups: pickups });

                    refPickupTime2.current.focus();
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

                popupGetter={moment((props.selectedConsigneeCompanyInfo?.delivery_date1 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.delivery_date1 || '').trim()
                    ? moment(props.selectedConsigneeCompanyInfo?.delivery_date1, 'MM/DD/YYYY')
                    : moment()}

                popupSetter={async (day) => {
                    await props.setSelectedConsigneeCompanyInfo({
                        ...props.selectedConsigneeCompanyInfo,
                        delivery_date1: day.format('MM/DD/YYYY'),
                        delivery_date2: day.format('MM/DD/YYYY')
                    })

                    let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                            delivery.delivery_date1 = day.format('MM/DD/YYYY');
                            delivery.delivery_date2 = day.format('MM/DD/YYYY');
                        }
                        return delivery;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                    refDeliveryTime1.current.focus();
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

                popupGetter={moment((props.selectedConsigneeCompanyInfo?.delivery_date2 || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (props.selectedConsigneeCompanyInfo?.delivery_date2 || '').trim()
                    ? moment(props.selectedConsigneeCompanyInfo?.delivery_date2, 'MM/DD/YYYY')
                    : moment()}

                popupSetter={async (day) => {
                    await props.setSelectedConsigneeCompanyInfo({
                        ...props.selectedConsigneeCompanyInfo,
                        delivery_date2: day.format('MM/DD/YYYY')
                    })

                    let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                        if (delivery.id === (props.selectedConsigneeCompanyInfo?.delivery_id || 0)) {
                            delivery.delivery_date2 = day.format('MM/DD/YYYY');
                        }
                        return delivery;
                    });

                    await props.setSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                    refDeliveryTime2.current.focus();
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

export default connect(null, null)(Dispatch)