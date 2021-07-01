import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import './Routing.css';
import {
    setDispatchPanels,
    setDispatchOpenedPanels,
    setSelectedOrder,
    setMileageLoaderVisible,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
} from "./../../../../../actions";
import classnames from 'classnames';
import RoutingPopup from '../../popup/Popup.jsx';
import $ from 'jquery';
import MaskedInput from 'react-text-mask';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import moment from 'moment';

function Routing(props) {
    var delayTimer;

    const [list, setList] = useState([
        {
            title: 'pickup',
            items: ((props.selected_order?.pickups || []).filter(item => (props.selected_order?.routing || []).find(x => x.id === item.id && x.extra_data.type === 'pickup') === undefined)).map(item => {
                // item.extra_data = { type: 'pickup' };
                return item;
            })
        },
        {
            title: 'delivery',
            items: ((props.selected_order?.deliveries || []).filter(item => (props.selected_order?.routing || []).find(x => x.id === item.id && x.extra_data.type === 'delivery') === undefined)).map(item => {
                // item.extra_data = { type: 'delivery' };
                return item;
            })
        },
        {
            title: 'route',
            items: (props.selected_order?.routing || [])
        }
    ]);

    const mapRef = useRef();
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "_aKHLFzgJTYQLzsSzVqRKyiKk8iuywH3jbtV8Mxw5Gs",
        app_id: "X4qy0Sva14BQxJCbVqXL"
    });
    const routingService = platform.getRoutingService();

    const [dragging, setDragging] = useState(false);
    const refCarrierEquipment = useRef();
    const refDriverName = useRef();
    const [carrierEquipment, setCarrierEquipment] = useState({});
    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');

    const dragItem = useRef();
    const dragNode = useRef();

    const [isSavingOrder, setIsSavingOrder] = useState(false);

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

    const [trigger, setTrigger] = useState(false);

    const [isSavingCarrierInfo, setIsSavingCarrierInfo] = useState(false);
    const [isSavingCarrierContact, setIsSavingCarrierContact] = useState(false);
    const [isSavingCarrierDriver, setIsSavingCarrierDriver] = useState(false);

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const popupItemClick = async (item) => {
        let selected_order = { ...props.selected_order } || { order_number: 0 };

        switch (popupActiveInput) {
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
            case 'driver-name':
                await props.setSelectedDispatchCarrierInfoDriver(item);

                selected_order.carrier_driver_id = (item.id || 0);

                if (!isSavingOrder) {
                    setIsSavingOrder(true);
                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);
                        }

                        setIsSavingOrder(false);
                    });
                }

                await setPopupItems([]);
                break;
            default:
                break;
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

    const setPopupPosition = (input) => {
        let popup = refPopup.current;
        const { innerWidth, innerHeight } = window;
        const screenWSection = innerWidth / 3;

        let offset = innerWidth - $(popup).parent().width() - 45;

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
                popup.style.left = (input.left - offset) + 'px';

                if (input.width < 70) {
                    popup.style.left = ((input.left - offset) - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = ((input.left - offset) + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = ((input.left - offset) - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = ((input.left - offset) - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = ((input.left - offset)) - (300 - (input.width / 2)) + 'px';
                }
            }
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

    useEffect(() => {
        if (trigger) {
            setTrigger(false);

            let pickups = list[2].items.filter(item => {
                return item.extra_data.type === 'pickup';
            })

            pickups = [
                ...pickups,
                ...list[0].items
            ]

            let deliveries = list[2].items.filter(item => {
                return item.extra_data.type === 'delivery';
            })

            deliveries = [
                ...deliveries,
                ...list[1].items
            ]

            let routing = [
                ...list[2].items
            ]

            let selected_order = { ...props.selected_order };
            selected_order.pickups = pickups;
            selected_order.deliveries = deliveries;
            selected_order.routing = routing;

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
                                props.setMileageLoaderVisible(false);
                            }
                        });
                    },
                    (error) => {
                        console.log('error', error);
                        props.setMileageLoaderVisible(false);
                    })

            } else {
                selected_order.miles = 0;

                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                    if (res.result === 'OK') {
                        await props.setSelectedOrder(res.order);
                    }

                });
            }
        }
    }, [trigger])

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.currentTarget;
        setTrigger(false);

        dragNode.current.addEventListener('dragend', handleDragEnd);

        window.setTimeout(() => {
            setDragging(true);
        }, 0);
    }

    const handleDragEnd = (e) => {
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setDragging(false);

        setTrigger(true);
    }

    const handleDragEnter = (e, params) => {
        e.preventDefault();

        const currentItem = dragItem.current;

        if (e.currentTarget !== dragNode.current) {
            if (currentItem.grpI === 0) {
                if (params.grpI === 2) {
                    let curList = JSON.parse(JSON.stringify(list));
                    curList[params.grpI].items.splice(params.itemI, 0, curList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                    dragItem.current = params;
                    setList(curList);


                }
            }

            if (currentItem.grpI === 1) {
                if (params.grpI === 2) {
                    let curList = JSON.parse(JSON.stringify(list));
                    curList[params.grpI].items.splice(params.itemI, 0, curList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                    dragItem.current = params;
                    setList(curList);


                }
            }

            if (currentItem.grpI === 2) {
                if (params.grpI === 0) {
                    if (list[currentItem.grpI].items[currentItem.itemI].extra_data.type === 'pickup') {
                        let curList = JSON.parse(JSON.stringify(list));
                        curList[params.grpI].items.splice(params.itemI, 0, curList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                        dragItem.current = params;
                        setList(curList);


                    }
                }

                if (params.grpI === 1) {
                    if (list[currentItem.grpI].items[currentItem.itemI].extra_data.type === 'delivery') {
                        let curList = JSON.parse(JSON.stringify(list));
                        curList[params.grpI].items.splice(params.itemI, 0, curList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                        dragItem.current = params;
                        setList(curList);


                    }
                }

                if (params.grpI === 2) {
                    let curList = JSON.parse(JSON.stringify(list));
                    curList[params.grpI].items.splice(params.itemI, 0, curList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                    dragItem.current = params;
                    setList(curList);


                }
            }
        }
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;

        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            switch (params.grpI) {
                case 0:
                    return 'current routing-pickup-item';
                case 1:
                    return 'current routing-delivery-item';
                case 2:
                    return 'current routing-route-item';
            }
        }
        switch (params.grpI) {
            case 0:
                return 'routing-pickup-item';
            case 1:
                return 'routing-delivery-item';
            case 2:
                return 'routing-route-item';
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    return (
        <div className="panel-content routing">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'routing')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gridGap: '1rem',
                // justifyContent: 'space-between',
                width: '50%',
                marginTop: 15,
                marginBottom: 10
            }}>
                <div className="input-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>A/E Number:</div>
                    <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" disabled={true}
                        onChange={(e) => { }}
                        value={props.selected_order?.ae_number || ''} />
                </div>

                <div className="input-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Order Number:</div>
                    <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" disabled={true}
                        onChange={(e) => { }}
                        value={props.order_number || ''} />
                </div>

                <div className="input-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Trip Number:</div>
                    <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" disabled={true}
                        onChange={(e) => { }}
                        value={props.trip_number || ''} />
                </div>

                <div className="input-box-container" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Miles:</div>
                    <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" readOnly={true} onChange={() => { }} value={props.mileageLoaderVisible ? '' : ((props.selected_order?.miles || 0) / 1609.34).toFixed(0)} />
                    <div className="loading-container">
                        <Loader type="ThreeDots" color="#333738" height={20} width={20} visible={props.mileageLoaderVisible} />
                    </div>
                </div>
            </div>

            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 20
            }}>

                <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexBasis: '100%',
                    marginBottom: 10
                }}>
                    <div className='form-bordered-box' style={{ flexGrow: 1, marginRight: 10, flexBasis: '100%' }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Pick Ups</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        {
                            list.map((grp, grpI) => {
                                if (grp.title === 'pickup') {
                                    return <div
                                        key={grpI}
                                        className="routing-pickup-container"
                                        // onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
                                        onDragEnter={dragging ? (e) => handleDragEnter(e, { grpI, itemI: grp.items.length }) : null}
                                    >
                                        {
                                            grp.items.map((item, itemI) => {
                                                return <div
                                                    key={itemI}
                                                    className={dragging ? getStyles({ grpI, itemI }) : 'routing-pickup-item'}
                                                    draggable={true}
                                                    onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                                                    onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                                                >
                                                    <span>{item.code}</span> <span>{item.name}</span> <span>{item.city}-{item.state}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            })
                        }


                    </div>

                    <div className='form-bordered-box' style={{
                        flexGrow: 1, flexBasis: '100%'
                    }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Carrier</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    if (!props.dispatchOpenedPanels.includes('carrier-info')) {
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'carrier-info']);
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
                                    onInput={(e) => {
                                        props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                    }}
                                    onChange={(e) => {
                                        props.setSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                    }}
                                    value={
                                        ((props.selected_order.pickups || []).length > 0 && (props.selected_order.deliveries || []).length > 0)
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
                        <div className="form-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexGrow: 1, alignItems: 'flex-start', marginTop: 10 }}>
                            <div className='mochi-button' onClick={() => {
                                if (!props.dispatchOpenedPanels.includes('rate-conf')) {
                                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rate-conf'])
                                }
                            }}>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>Rate Confirmation</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                            <div className='mochi-button' onClick={() => {



                            }}>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>E-mail Rate Confirmation</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexBasis: '100%'
                }}>
                    <div className='form-bordered-box' style={{ marginRight: 10, flexGrow: 1, flexBasis: '100%' }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Deliveries</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        {
                            list.map((grp, grpI) => {
                                if (grp.title === 'delivery') {
                                    return <div
                                        key={grpI}
                                        className="routing-delivery-container"
                                        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
                                    >
                                        {
                                            grp.items.map((item, itemI) => {
                                                return <div
                                                    key={itemI}
                                                    className={dragging ? getStyles({ grpI, itemI }) : 'routing-delivery-item'}
                                                    draggable={true}
                                                    onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                                                    onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                                                >
                                                    <span>{item.code}</span> <span>{item.name}</span> <span>{item.city}-{item.state}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            })
                        }
                    </div>

                    <div className='form-bordered-box' style={{
                        borderBottom: 0,
                        borderRight: 0,
                        boxShadow: 'none',
                        flexGrow: 1,
                        flexBasis: '100%'
                    }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Route</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Update</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>E-mail route</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Print route</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>
                        <div className="form-right" style={{
                            position: 'absolute',
                            height: '100%',
                            width: 2,
                            right: -1,
                            top: 0,
                            borderRight: '1px solid rgba(0,0,0,0.5)',
                            boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.3)'
                        }}>
                        </div>
                        <div className="form-footer">
                            <div className="bottom-border bottom-border-left"></div>
                            <div className="bottom-border bottom-border-middle"></div>
                            <div className="form-buttons">
                                <div className="input-box-container" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Miles:</div>
                                    <input style={{ textAlign: 'right', fontWeight: 'bold' }} type="text" readOnly={true} onChange={() => { }} value={props.mileageLoaderVisible ? '' : ((props.selected_order?.miles || 0) / 1609.34).toFixed(0)} />
                                    <div className="loading-container">
                                        <Loader type="ThreeDots" color="#333738" height={20} width={20} visible={props.mileageLoaderVisible} />
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-border bottom-border-right"></div>
                        </div>

                        {
                            list.map((grp, grpI) => {
                                if (grp.title === 'route') {
                                    return <div
                                        key={grpI}
                                        className="routing-route-container"
                                        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
                                        // onDragEnter={dragging ? (e) => handleDragEnter(e, { grpI, itemI: grp.items.length }) : null}
                                    >
                                        {
                                            grp.items.map((item, itemI) => {
                                                return <div
                                                    key={itemI}
                                                    className={dragging ? getStyles({ grpI, itemI }) : 'routing-route-item'}
                                                    draggable={true}
                                                    onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                                                    onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                                                >
                                                    {/* <span className={item.extra_data.type === 'pickup' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></span> */}
                                                    <span>{item.code}</span>
                                                    <span>{item.name}</span>
                                                    <span>{item.city}-{item.state}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>

            <RoutingPopup
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
        panels: state.dispatchReducers.panels,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        selected_order: state.dispatchReducers.selected_order,
        order_number: state.dispatchReducers.order_number,
        trip_number: state.dispatchReducers.trip_number,
        mileageLoaderVisible: state.dispatchReducers.mileageLoaderVisible,
        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,
        selectedDispatchCarrierInfoContact: state.carrierReducers.selectedDispatchCarrierInfoContact,
        selectedDispatchCarrierInfoDriver: state.carrierReducers.selectedDispatchCarrierInfoDriver,
        selectedDispatchCarrierInfoInsurance: state.carrierReducers.selectedDispatchCarrierInfoInsurance,

    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setDispatchOpenedPanels,
    setSelectedOrder,
    setMileageLoaderVisible,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
})(Routing)