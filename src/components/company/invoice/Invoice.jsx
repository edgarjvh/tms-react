import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import './Invoice.css';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';
import InvoicePopup from './popup/Popup.jsx';
import InvoiceModal from './modal/Modal.jsx';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import { useTransition, useSpring, animated } from 'react-spring';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import Highlighter from "react-highlight-words";
import moment from 'moment';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';

function Invoice(props) {

    const refOrderNumber = useRef(null);

    useEffect(() => {
        refOrderNumber.current.focus({
            preventScroll: true
        });

        updateSystemDateTime();
    }, [])

    useEffect(() => {
        if (props.invoiceScreenFocused) {
            refOrderNumber.current.focus({
                preventScroll: true
            });
        }
    }, [props.invoiceScreenFocused])

    const [currentSystemDateTime, setCurrentSystemDateTime] = useState(moment());

    const updateSystemDateTime = () => {
        window.setTimeout(() => {
            setCurrentSystemDateTime(moment());
            updateSystemDateTime();
        }, 1000)
    }


    const [rateTypesItems, setRateTypesItems] = useState([
        {
            id: 1,
            name: 'Rate Type 1',
            selected: false
        },
        {
            id: 2,
            name: 'Rate Type 2',
            selected: false
        },
        {
            id: 3,
            name: 'Rate Type 3',
            selected: false
        }
    ]);

    const [equipmentsItems, setEquipmentsItems] = useState([
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

    const [billingNotes, setBillingNotes] = useState([]);
    const [selectedBillingNote, setSelectedBillingNote] = useState({});

    const modalTransitionProps = useSpring({ opacity: (selectedBillingNote.id !== undefined || props.selectedInternalNote.id !== undefined) ? 1 : 0 });

    const [termsItems, setTermsItems] = useState([
        {
            id: 1,
            name: 'Term 1',
            selected: false
        },
        {
            id: 2,
            name: 'Term 2',
            selected: false
        },
        {
            id: 3,
            name: 'Term 3',
            selected: false
        }
    ]);

    const [billToRateType, setBillToRateType] = useState({});
    const [carrierChargesRateType, setCarrierChargesRateType] = useState({});
    const [equipment, setEquipment] = useState({});
    const [term, setTerm] = useState({});
    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refBillToRateTypes = useRef();
    const refCarrierChargesRateTypes = useRef();
    const refEquipments = useRef();
    const refTerms = useRef();


    const [isSavingBillToCompanyInfo, setIsSavingBillToCompanyInfo] = useState(false);
    const [isSavingBillToCompanyContact, setIsSavingBillToCompanyContact] = useState(false);
    const [isSavingCarrierInfo, setIsSavingCarrierInfo] = useState(false);
    const [isSavingCarrierContact, setIsSavingCarrierContact] = useState(false);
    const [isSavingCarrierDriver, setIsSavingCarrierDriver] = useState(false);

    const refEquipment = useRef();
    const refDriverName = useRef();

    const [equipmentItems, setEquipmentItems] = useState([]);
    const refEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setEquipmentItems([]) } });
    const refEquipmentPopupItems = useRef([]);

    const [driverItems, setDriverItems] = useState([]);
    const refDriverDropDown = useDetectClickOutside({ onTriggered: async () => { await setDriverItems([]) } });
    const refDriverPopupItems = useRef([]);




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

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'bill-to-rate-type':
                setBillToRateType(item);
                await setPopupItems([]);
                break;
            case 'carrier-charges-rate-type':
                setCarrierChargesRateType(item);
                await setPopupItems([]);
                break;
            case 'equipment':
                setEquipment(item);
                await setPopupItems([]);
                break;
            case 'term':
                setTerm(item);
                await setPopupItems([]);
                break;
            default:
                break;
        }
    }

    const onBillToRateTypeKeydown = (e) => {

        let key = e.key.toLowerCase();

        setPopupActiveInput('bill-to-rate-type');

        const input = refBillToRateTypes.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                rateTypesItems.map((item, index) => {
                    if (item.name === (billToRateType.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(rateTypesItems.map((item, index) => {
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
                        setBillToRateType(item);
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

    const onCarrierChargesRateTypeKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('carrier-charges-rate-type');

        const input = refCarrierChargesRateTypes.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                rateTypesItems.map((item, index) => {
                    if (item.name === (carrierChargesRateType.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(rateTypesItems.map((item, index) => {
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
                        setCarrierChargesRateType(item);
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

    const onEquipmentKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('equipment');

        const input = refEquipments.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                equipmentsItems.map((item, index) => {
                    if (item.name === (equipment.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(equipmentsItems.map((item, index) => {
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
                        setEquipment(item);
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

    const onTermsKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('term');

        const input = refTerms.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                termsItems.map((item, index) => {
                    if (item.name === (term.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(termsItems.map((item, index) => {
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
                        setTerm(item);
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

    const getOrderByOrderNumber = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.order_number || '') !== '') {
                $.post(props.serverUrl + '/getOrderByOrderNumber', { order_number: props.order_number }).then(async res => {
                    if (res.result === 'OK') {
                        await props.setInvoiceSelectedOrder({});
                        await props.setInvoiceSelectedOrder(res.order);
                        await props.setInvoiceOrderNumber(res.order.order_number);
                        await props.setInvoiceTripNumber(res.order.trip_number === 0 ? '' : res.order.trip_number);
                        await props.setInvoiceSelectedBillToCompanyInfo(res.order.bill_to_company || {});

                        if (res.order.bill_to_company) {
                            (res.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setInvoiceSelectedBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }


                        await props.setSelectedInvoiceCarrierInfoCarrier(res.order.carrier || {});

                        if (res.order.carrier) {
                            (res.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoDriver(res.order.driver || {});

                    } else {
                        props.setInvoiceOrderNumber(props.selected_order?.order_number || '');
                    }
                });
            } else {
                if ((props.selected_order?.order_number || '') !== '') {
                    props.setInvoiceOrderNumber(props.selected_order.order_number);
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
                        await props.setInvoiceSelectedOrder({});
                        await props.setInvoiceSelectedOrder(res.order);
                        await props.setInvoiceOrderNumber(res.order.order_number);
                        await props.setInvoiceTripNumber(res.order.trip_number === 0 ? '' : res.order.trip_number);
                        await props.setSelectedInvoiceBillToCompanyInfo(res.order.bill_to_company || {});

                        if (res.order.bill_to_company) {
                            (res.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoCarrier(res.order.carrier || {});

                        if (res.order.carrier) {
                            (res.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoDriver(res.order.driver || {});

                    } else {
                        props.setInvoiceTripNumber(props.selected_order?.trip_number || '');
                    }
                });
            } else {
                if ((props.selected_order?.trip_number || '') !== '') {
                    props.setInvoiceTripNumber(props.selected_order.trip_number);
                }
            }
        }
    }

    useEffect(() => {
        if (isSavingBillToCompanyInfo) {
            if ((props.selectedBillToCompanyInfo.id || 0) === 0) {
                return;
            }

            let selectedBillToCompanyInfo = props.selectedBillToCompanyInfo;

            if (selectedBillToCompanyInfo.id === undefined || selectedBillToCompanyInfo.id === -1) {
                selectedBillToCompanyInfo.id = 0;
                props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: 0 });
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

                $.post(props.serverUrl + '/saveCustomer', selectedBillToCompanyInfo).then(async res => {
                    if (res.result === 'OK') {
                        if (props.selectedBillToCompanyInfo.id === undefined || (props.selectedBillToCompanyInfo.id || 0) === 0) {
                            await props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: res.customer.id });
                        }

                        (res.customer.contacts || []).map(async (contact, index) => {

                            if (contact.is_primary === 1) {
                                await props.setInvoiceSelectedBillToCompanyContact(contact);
                            }

                            return true;
                        });
                    }

                    await setIsSavingBillToCompanyInfo(false);
                }).catch(async e => {
                    console.log('error saving bill to company', e);
                    await setIsSavingBillToCompanyInfo(false);
                });
            }
        }
    }, [isSavingBillToCompanyInfo])

    const validateBillToCompanyInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingBillToCompanyInfo) {
                setIsSavingBillToCompanyInfo(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingBillToCompanyContact) {
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

            $.post(props.serverUrl + '/saveContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                    await props.setInvoiceSelectedBillToCompanyContact(res.contact);
                }

                setIsSavingBillToCompanyContact(false);
            }).catch(e => {
                console.log('error saving bill to company contact', e);
                setIsSavingBillToCompanyContact(false);
            });
        }
    }, [isSavingBillToCompanyContact])

    const validateBillToCompanyContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingBillToCompanyContact) {
                setIsSavingBillToCompanyContact(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingCarrierInfo) {
            if ((props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0) {
                return;
            }

            let selectedInvoiceCarrierInfoCarrier = props.selectedInvoiceCarrierInfoCarrier;

            if (selectedInvoiceCarrierInfoCarrier.id === undefined || selectedInvoiceCarrierInfoCarrier.id === -1) {
                selectedInvoiceCarrierInfoCarrier.id = 0;
            }

            if (
                (selectedInvoiceCarrierInfoCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                (selectedInvoiceCarrierInfoCarrier.city || '').trim().replace(/\s/g, "") !== "" &&
                (selectedInvoiceCarrierInfoCarrier.state || '').trim().replace(/\s/g, "") !== "" &&
                (selectedInvoiceCarrierInfoCarrier.address1 || '').trim() !== "" &&
                (selectedInvoiceCarrierInfoCarrier.zip || '').trim() !== ""
            ) {
                let parseCity = selectedInvoiceCarrierInfoCarrier.city.trim().replace(/\s/g, "").substring(0, 3);

                if (parseCity.toLowerCase() === "ft.") {
                    parseCity = "FO";
                }
                if (parseCity.toLowerCase() === "mt.") {
                    parseCity = "MO";
                }
                if (parseCity.toLowerCase() === "st.") {
                    parseCity = "SA";
                }

                let newCode = (selectedInvoiceCarrierInfoCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedInvoiceCarrierInfoCarrier.state || '').trim().replace(/\s/g, "").substring(0, 2);

                selectedInvoiceCarrierInfoCarrier.code = newCode.toUpperCase();

                $.post(props.serverUrl + '/saveCarrier', selectedInvoiceCarrierInfoCarrier).then(async res => {
                    if (res.result === 'OK') {
                        if (props.selectedInvoiceCarrierInfoCarrier.id === undefined && (props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0) {
                            await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, id: res.carrier.id });
                        }

                        (res.carrier.contacts || []).map(async (contact, index) => {

                            if (contact.is_primary === 1) {
                                await props.setSelectedInvoiceCarrierInfoContact(contact);
                            }

                            return true;
                        });
                    }

                    await setIsSavingCarrierInfo(false);
                }).catch(async e => {
                    console.log('error on saving invoice carrier info', e);
                    await setIsSavingCarrierInfo(false);
                });
            }
        }
    }, [isSavingCarrierInfo])

    const validateCarrierInfoForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingCarrierInfo) {
                setIsSavingCarrierInfo(true);
            }
        }
    }

    const insuranceStatusClasses = () => {
        let classes = 'input-box-container insurance-status';
        let curDate = moment().startOf('day');
        let curDate2 = moment();
        let futureMonth = curDate2.add(1, 'M');
        let statusClass = '';

        (props.selectedInvoiceCarrierInfoCarrier.insurances || []).map((insurance, index) => {
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

    useEffect(() => {
        if (isSavingCarrierContact) {
            if ((props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0) {
                return;
            }

            if ((props.selectedInvoiceCarrierInfoContact.id || 0) === 0) {
                return;
            }

            let contact = props.selectedInvoiceCarrierInfoContact;

            if (contact.carrier_id === undefined || contact.carrier_id === 0) {
                contact.carrier_id = props.selectedInvoiceCarrierInfoCarrier.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedInvoiceCarrierInfoCarrier.address1;
                contact.address2 = props.selectedInvoiceCarrierInfoCarrier.address2;
                contact.city = props.selectedInvoiceCarrierInfoCarrier.city;
                contact.state = props.selectedInvoiceCarrierInfoCarrier.state;
                contact.zip_code = props.selectedInvoiceCarrierInfoCarrier.zip;
            }

            $.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, contacts: res.contacts });
                    await props.setSelectedInvoiceCarrierInfoContact(res.contact);
                }

                setIsSavingCarrierContact(false);
            }).catch(e => {
                console.log('error on saving invoice carrier contact', e);
                setIsSavingCarrierContact(false);
            });
        }
    }, [isSavingCarrierContact])

    const validateCarrierContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (!isSavingCarrierContact) {
                setIsSavingCarrierContact(true);
            }
        }
    }

    useEffect(() => {
        if (isSavingCarrierDriver) {
            let driver = {
                ...props.selectedInvoiceCarrierInfoDriver,
                id: (props.selectedInvoiceCarrierInfoDriver?.id || 0),
                carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
            };

            if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                if ((driver.first_name || '').trim() !== '') {
                    $.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, drivers: res.drivers });
                            await props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, id: res.driver.id });
                        }

                        await setIsSavingCarrierDriver(false);
                    }).catch(async e => {
                        console.log('error saving carrier driver', e);
                        await setIsSavingCarrierDriver(false);
                    });
                }
            }
        }
    }, [isSavingCarrierDriver])

    const validateCarrierDriverForSaving = async (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingCarrierDriver) {
                setIsSavingCarrierDriver(true);
            }
        }
    }



    return (
        <div className="invoice-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px',
            background: props.isOnPanel ? 'transparent' : 'rgb(250, 250, 250)',
            background: props.isOnPanel ? 'transparent' : '-moz-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : '-webkit-radial-gradient(center, ellipse cover, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            background: props.isOnPanel ? 'transparent' : 'radial-gradient(ellipse at center, rgba(250, 250, 250, 1) 0%, rgba(200, 200, 200, 1) 100%)',
            padding: props.isOnPanel ? '10px 0' : 10
        }}>
            <PanelContainer />

            <div className="fields-container-col" style={{ width: '60%' }}>
                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 25 }}>
                    <div className="form-bordered-box" style={{
                        borderBottom: 0,
                        borderRight: 0,
                        boxShadow: 'none'
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Bill To</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Reviewed</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must select an order first!');
                                        return;
                                    }

                                    props.setInvoiceSelectedBillToCompanyDocument({
                                        id: 0,
                                        user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                        date_entered: moment().format('MM/DD/YYYY')
                                    });

                                    if (!props.openedPanels.includes(props.billToCompanyDocumentsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.billToCompanyDocumentsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add Document</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Invoice</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
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
                                <div className="mochi-button" style={{ marginRight: 10 }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="input-box-container" style={{ width: '10rem' }}>
                                    <input type="text" placeholder="Total Charges" />
                                </div>
                            </div>
                            <div className="bottom-border bottom-border-right"></div>
                        </div>

                        <div className="form-row" style={{ position: 'relative' }}>
                            <div className="input-box-container grow" style={{ position: 'relative' }}>
                                <input type="text" placeholder="Rate Type"
                                    ref={refBillToRateTypes}
                                    onKeyDown={onBillToRateTypeKeydown}
                                    onChange={() => { }}
                                    value={billToRateType.name || ''}
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
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Rate Description" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Units" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Weight" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Miles" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Rate" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Total Charges" />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row" style={{ flexGrow: 1, padding: '5px 5px 15px 5px' }}>
                            <div className="form-portal"></div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 10, marginRight: 10, width: '15rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <div className="mochi-button" style={{ marginBottom: 2 }} onClick={() => {
                            props.setInvoiceSelectedOrder({});
                            props.setInvoiceOrderNumber('');
                            props.setInvoiceTripNumber('');
                            props.setInvoiceSelectedBillToCompanyInfo({});
                            props.setInvoiceSelectedBillToCompanyContact({});
                            props.setSelectedInvoiceCarrierInfoCarrier({});
                            props.setSelectedInvoiceCarrierInfoContact({});
                            props.setSelectedInvoiceCarrierInfoDriver({});

                            refOrderNumber.current.focus({
                                preventScroll: true
                            });
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left" style={{ fontSize: '0.9rem' }}>(</div>
                            <div className="mochi-button-base" style={{ fontSize: '0.9rem' }}>Clear</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right" style={{ fontSize: '0.9rem' }}>)</div>
                        </div>

                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Order Number:</div>
                            <input style={{ textAlign: 'right', fontWeight: 'bold' }} tabIndex={1 + props.tabTimes} type="text"
                                ref={refOrderNumber}
                                onKeyDown={getOrderByOrderNumber}
                                onChange={(e) => { props.setInvoiceOrderNumber(e.target.value) }}
                                value={props.order_number || ''}
                            />
                        </div>

                        <div className="input-box-container grow" style={{ marginBottom: 10 }}>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Trip Number:</div>
                            <input style={{ textAlign: 'right', fontWeight: 'bold' }} tabIndex={2 + props.tabTimes} type="text"
                                onKeyDown={getOrderByTripNumber}
                                onChange={(e) => { props.setInvoiceTripNumber(e.target.value) }}
                                value={
                                    (props.trip_number || '') === ''
                                        ? ''
                                        : (
                                            props.trip_number === 0
                                                ? ''
                                                : (
                                                    (props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0
                                                        ? ''
                                                        : props.trip_number
                                                )
                                        )
                                }
                            />
                        </div>

                        <div className='form-bordered-box' style={{ width: '100%' }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Bill To Docs</div>
                                <div className='top-border top-border-middle'></div>
                                <div className="form-buttons">
                                    <div className="mochi-button" onClick={() => {
                                        if ((props.selected_order?.id || 0) === 0) {
                                            window.alert('You must select an order first!');
                                            return;
                                        }

                                        props.setInvoiceSelectedBillToCompanyDocument({
                                            id: 0,
                                            user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                            date_entered: moment().format('MM/DD/YYYY')
                                        });

                                        if (!props.openedPanels.includes(props.billToCompanyDocumentsPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.billToCompanyDocumentsPanelName]);
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add Doc</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-wrapper">
                                {
                                    (props.selectedBillToCompanyInfo.documents || []).map((document, index) => {
                                        let docIconClasses = classnames({
                                            'fas': true,
                                            'fa-file-image': ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-word': ['doc', 'docx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-excel': ['xls', 'xlsx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-powerpoint': ['ppt', 'pptx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-code': ['htm', 'html'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-video': ['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-archive': ['7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-pdf': document.doc_extension.toLowerCase() === 'pdf',
                                            'fa-file-alt': ['txt', 'log'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file': !['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'htm', 'html', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip', 'pdf', 'txt'].includes(document.doc_extension.toLowerCase())
                                        });

                                        let itemClasses = classnames({
                                            'documents-list-item': true,
                                            'selected': (props.selectedBillToCompanyDocument?.id || 0) === document.id
                                        });

                                        return (
                                            <div className={itemClasses} key={index} onDoubleClick={async () => {
                                                await props.setInvoiceSelectedBillToCompanyDocument(document);

                                                if (!props.openedPanels.includes(props.billToCompanyDocumentsPanelName)) {
                                                    props.setOpenedPanels([...props.openedPanels, props.billToCompanyDocumentsPanelName]);
                                                }
                                            }}
                                                title={`User ID: ${document.user_id}  Date Entered: ${document.date_entered}  Subject: ${document.subject}`}
                                            >
                                                <div className="item-info">
                                                    <span className={docIconClasses}></span>
                                                    {/* <span>{document.user_id}</span>
                                                    <span>{document.date_entered}</span> */}
                                                    <span>{document.title}</span>
                                                    {/* <span>{document.subject}</span> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 10 }}>
                    <div className="form-bordered-box" style={{ borderRight: 0, borderBottom: 0, boxShadow: 'none' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Carrier Charges</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Previewed</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Invoice Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">BOL Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Rate Conf Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must select an order first!');
                                        return;
                                    }

                                    props.setSelectedInvoiceCarrierInfoDocument({
                                        id: 0,
                                        user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                        date_entered: moment().format('MM/DD/YYYY')
                                    });

                                    if (!props.openedPanels.includes(props.carrierInfoDocumentsPanelName)) {
                                        props.setOpenedPanels([...props.openedPanels, props.carrierInfoDocumentsPanelName]);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add Document</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Approved</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
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
                            <div className="form-buttons">
                                <div className="input-box-container" style={{ width: '7.5rem' }}>
                                    <input type="text" placeholder="Gross Profit" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{ width: '7.5rem' }}>
                                    <input type="text" placeholder="Net Profit" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{ width: '7.5rem' }}>
                                    <input type="text" placeholder="Percentage Profit" />
                                </div>
                            </div>
                            <div className="bottom-border bottom-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" style={{ marginRight: 10 }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="input-box-container" style={{ width: '10rem' }}>
                                    <input type="text" placeholder="Total Carrier Payments" />
                                </div>
                            </div>
                            <div className="bottom-border bottom-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow" style={{ position: 'relative' }}>
                                <input type="text" placeholder="Rate Type"
                                    ref={refCarrierChargesRateTypes}
                                    onKeyDown={onCarrierChargesRateTypeKeydown}
                                    onChange={() => { }}
                                    value={carrierChargesRateType.name || ''}
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
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Rate Description" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Units" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Weight" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Miles" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Rate" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Total Payments" />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row" style={{ flexGrow: 1, padding: '5px 5px 15px 5px' }}>
                            <div className="form-portal"></div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 10, marginRight: 10, width: '15rem', display: 'flex', flexDirection: 'column' }}>
                        <div className='form-bordered-box'>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Order Docs</div>
                                <div className='top-border top-border-middle'></div>
                                <div className="form-buttons">
                                    <div className="mochi-button" onClick={() => {
                                        if ((props.selected_order?.id || 0) === 0) {
                                            window.alert('You must select an order first!');
                                            return;
                                        }

                                        props.setSelectedInvoiceCarrierInfoDocument({
                                            id: 0,
                                            user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                            date_entered: moment().format('MM/DD/YYYY')
                                        });

                                        if (!props.openedPanels.includes(props.carrierInfoDocumentsPanelName)) {
                                            props.setOpenedPanels([...props.openedPanels, props.carrierInfoDocumentsPanelName]);
                                        }
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add Doc</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-wrapper">
                                {
                                    (props.selectedCarrier.documents || []).map((document, index) => {
                                        let docIconClasses = classnames({
                                            'fas': true,
                                            'fa-file-image': ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-word': ['doc', 'docx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-excel': ['xls', 'xlsx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-powerpoint': ['ppt', 'pptx'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-code': ['htm', 'html'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-video': ['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-archive': ['7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file-pdf': document.doc_extension.toLowerCase() === 'pdf',
                                            'fa-file-alt': ['txt', 'log'].includes(document.doc_extension.toLowerCase()),
                                            'fa-file': !['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'htm', 'html', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip', 'pdf', 'txt'].includes(document.doc_extension.toLowerCase())
                                        });

                                        let itemClasses = classnames({
                                            'documents-list-item': true,
                                            'selected': (props.selectedDocument?.id || 0) === document.id
                                        });

                                        return (
                                            <div className={itemClasses} key={index} onDoubleClick={async () => {
                                                await props.setInvoiceSelectedBillToCompanyDocument(document);

                                                if (!props.openedPanels.includes(props.carrierInfoDocumentsPanelName)) {
                                                    props.setOpenedPanels([...props.openedPanels, props.carrierInfoDocumentsPanelName]);
                                                }
                                            }}
                                                title={`User ID: ${document.user_id}  Date Entered: ${document.date_entered}  Subject: ${document.subject}`}
                                            >
                                                <div className="item-info">
                                                    <span className={docIconClasses}></span>
                                                    {/* <span>{document.user_id}</span>
                                                    <span>{document.date_entered}</span> */}
                                                    <span>{document.title}</span>
                                                    {/* <span>{document.subject}</span> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fields-container-col" style={{ width: '40%' }}>
                <div className="fields-container-row" style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className='form-bordered-box' style={{ minWidth: '100%', maxWidth: '100%', marginRight: 10 }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Bill To</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
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
                                </div>
                                <div className='top-border top-border-right'></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input tabIndex={6 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                        readOnly={true}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={7 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={8 + props.tabTimes} type="text" placeholder="Address 1"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address1 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={9 + props.tabTimes} type="text" placeholder="Address 2"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.address2 || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input tabIndex={10 + props.tabTimes} type="text" placeholder="City"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.city || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input tabIndex={11 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.state || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input tabIndex={12 + props.tabTimes} type="text" placeholder="Postal Code"
                                        onKeyDown={validateBillToCompanyInfoForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
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

                                            props.setInvoiceSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
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

                                            props.setInvoiceSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
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
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.contact_phone || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={15 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateBillToCompanyContactForSaving}
                                        onInput={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        onChange={(e) => { props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                        value={props.selectedBillToCompanyInfo.ext || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>Print Invoice</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>E-Mail Invoice</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>Batch Billing</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Date Received" />
                        </div>
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Check Number" />
                        </div>
                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <div className='form-bordered-box' style={{ border: 0, boxShadow: 'none' }}>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="BOL Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Ref Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="PO Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Seal Number" />
                            </div>
                        </div>

                    </div>

                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10 }}>

                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 10 }}>
                    <div className='form-bordered-box' style={{ marginRight: 10 }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Internal Notes</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must select an order first!');
                                        return;
                                    }
                                    props.setInvoiceSelectedInternalNote({ id: 0 });
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
                                            <div className="internal-notes-item" key={index} onClick={() => props.setInvoiceSelectedInternalNote(note)}>
                                                {note.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='form-bordered-box'>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Billing Notes</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must select an order first!');
                                        return;
                                    }
                                    setSelectedBillingNote({ id: 0 });
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
                                    (billingNotes || []).map((note, index) => {
                                        return (
                                            <div className="internal-notes-item" key={index} onClick={() => setSelectedBillingNote(note)}>
                                                {note.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10 }}>

                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', marginBottom: 10 }}>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className='form-bordered-box' style={{ minWidth: '100%', maxWidth: '100%', marginRight: 10 }}>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Carrier</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0) {
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
                                        readOnly={true}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, code: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, code: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoCarrier?.code || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input tabIndex={51 + props.tabTimes} type="text" placeholder="Name"
                                        onKeyDown={validateCarrierInfoForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, name: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, name: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoCarrier?.name || ''}
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
                                        //     props.setInvoiceSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                        // }}
                                        // onChange={(e) => {
                                        //     props.setInvoiceSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
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

                                            props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, first_name: first_name, last_name: last_name });
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

                                            props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, first_name: first_name, last_name: last_name });
                                        }}

                                        value={(props.selectedInvoiceCarrierInfoContact?.first_name || '') + ((props.selectedInvoiceCarrierInfoContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedInvoiceCarrierInfoContact?.last_name)}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <MaskedInput tabIndex={54 + props.tabTimes}
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, phone_work: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, phone_work: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoContact.phone_work || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input tabIndex={55 + props.tabTimes} type="text" placeholder="Ext"
                                        onKeyDown={validateCarrierContactForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, phone_ext: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoContact({ ...props.selectedInvoiceCarrierInfoContact, phone_ext: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoContact.phone_ext || ''}
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
                                                            $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.result === 'OK') {
                                                                    await setEquipmentItems(res.equipments.map((item, index) => {
                                                                        item.selected = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                            ? index === 0
                                                                            : item.id === props.selectedInvoiceCarrierInfoDriver.equipment.id
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
                                                            $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.result === 'OK') {
                                                                    await setEquipmentItems(res.equipments.map((item, index) => {
                                                                        item.selected = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                            ? index === 0
                                                                            : item.id === props.selectedInvoiceCarrierInfoDriver.equipment.id
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
                                                            await props.setSelectedInvoiceCarrierInfoDriver({
                                                                ...props.selectedInvoiceCarrierInfoDriver,
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
                                                            await props.setSelectedInvoiceCarrierInfoDriver({
                                                                ...props.selectedInvoiceCarrierInfoDriver,
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
                                                if ((props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0) {
                                                    await props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, equipment: {} });
                                                }
                                            }}
                                            onInput={async (e) => {
                                                let equipment = props.selectedInvoiceCarrierInfoDriver?.equipment || {};
                                                equipment.id = 0;
                                                equipment.name = e.target.value;
                                                await props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, equipment: equipment, equipment_id: equipment.id });

                                                if (e.target.value.trim() === '') {
                                                    setEquipmentItems([]);
                                                } else {
                                                    $.post(props.serverUrl + '/getEquipments', {
                                                        name: e.target.value.trim()
                                                    }).then(async res => {
                                                        if (res.result === 'OK') {
                                                            await setEquipmentItems(res.equipments.map((item, index) => {
                                                                item.selected = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedInvoiceCarrierInfoDriver.equipment.id
                                                                return item;
                                                            }))
                                                        }
                                                    }).catch(async e => {
                                                        console.log('error getting equipments', e);
                                                    })
                                                }
                                            }}
                                            onChange={async (e) => {
                                                let equipment = props.selectedInvoiceCarrierInfoDriver?.equipment || {};
                                                equipment.id = 0;
                                                equipment.name = e.target.value;
                                                await props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, equipment: equipment, equipment_id: equipment.id });
                                            }}
                                            value={props.selectedInvoiceCarrierInfoDriver?.equipment?.name || ''}
                                        />
                                        <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                            if (equipmentItems.length > 0) {
                                                setEquipmentItems([]);
                                            } else {
                                                if ((props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0 && (props.selectedInvoiceCarrierInfoDriver?.equipment?.name || '') !== '') {
                                                    $.post(props.serverUrl + '/getEquipments', {
                                                        name: props.selectedInvoiceCarrierInfoDriver?.equipment.name
                                                    }).then(async res => {
                                                        if (res.result === 'OK') {
                                                            await setEquipmentItems(res.equipments.map((item, index) => {
                                                                item.selected = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedInvoiceCarrierInfoDriver.equipment.id
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
                                                    $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                        if (res.result === 'OK') {
                                                            await setEquipmentItems(res.equipments.map((item, index) => {
                                                                item.selected = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === props.selectedInvoiceCarrierInfoDriver.equipment.id
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
                                        from={{ opacity: 0, top: -155 }}
                                        enter={{ opacity: 1, top: -160 }}
                                        leave={{ opacity: 0, top: -155 }}
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
                                                <div className="mochi-contextual-popup vertical above" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                equipmentItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = (props.selectedInvoiceCarrierInfoDriver?.equipment?.id || 0) === 0 && (props.selectedInvoiceCarrierInfoDriver?.equipment?.name || '') !== ''
                                                                        ? props.selectedInvoiceCarrierInfoDriver?.equipment?.name : undefined;

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedInvoiceCarrierInfoDriver({
                                                                                    ...props.selectedInvoiceCarrierInfoDriver,
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
                                                            if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                                                                $.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        if (res.count > 1) {
                                                                            await setDriverItems(res.drivers.map((item, index) => {
                                                                                item.selected = (props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0
                                                                                    ? index === 0
                                                                                    : item.id === props.selectedInvoiceCarrierInfoDriver.id
                                                                                return item;
                                                                            }))

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
                                                            if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                                                                $.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.result === 'OK') {
                                                                        if (res.count > 1) {
                                                                            await setDriverItems(res.drivers.map((item, index) => {
                                                                                item.selected = (props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0
                                                                                    ? index === 0
                                                                                    : item.id === props.selectedInvoiceCarrierInfoDriver.id
                                                                                return item;
                                                                            }))

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
                                                            await props.setSelectedInvoiceCarrierInfoDriver(driverItems[driverItems.findIndex(item => item.selected)]);

                                                            await props.setInvoiceSelectedOrder({
                                                                ...props.selected_order,
                                                                carrier_driver_id: driverItems[driverItems.findIndex(item => item.selected)].id
                                                            })

                                                            // validateOrderForSaving({ keyCode: 9 });
                                                            setDriverItems([]);
                                                            refDriverName.current.focus();
                                                        }
                                                        break;

                                                    case 9: // tab
                                                        if (driverItems.length > 0) {
                                                            e.preventDefault();
                                                            await props.setSelectedInvoiceCarrierInfoDriver(driverItems[driverItems.findIndex(item => item.selected)]);

                                                            await props.setInvoiceSelectedOrder({
                                                                ...props.selected_order,
                                                                carrier_driver_id: driverItems[driverItems.findIndex(item => item.selected)].id
                                                            })

                                                            // validateOrderForSaving({ keyCode: 9 });
                                                            setDriverItems([]);
                                                            refDriverName.current.focus();
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }}
                                            onBlur={async (e) => {
                                                if ((props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0) {
                                                    await props.setSelectedInvoiceCarrierInfoDriver({});
                                                    await props.setInvoiceSelectedOrder({
                                                        ...props.selected_order,
                                                        carrier_driver_id: 0
                                                    })

                                                    // validateOrderForSaving({ keyCode: 9 });
                                                }
                                            }}
                                            onInput={async (e) => {
                                                let driver = props.selectedInvoiceCarrierInfoDriver || {};
                                                driver.id = 0;

                                                if (e.target.value === '') {
                                                    driver = {};
                                                    await props.setSelectedInvoiceCarrierInfoDriver({ ...driver });
                                                    setDriverItems([]);
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

                                                    props.setSelectedInvoiceCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });

                                                    // if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                                                    //     $.post(props.serverUrl + '/getDriversByCarrierId', {
                                                    //         carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                    //     }).then(async res => {
                                                    //         if (res.result === 'OK') {
                                                    //             if (res.count > 1) {
                                                    //                 await setDriverItems(res.drivers.map((item, index) => {
                                                    //                     item.selected = (props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0
                                                    //                         ? index === 0
                                                    //                         : item.id === props.selectedInvoiceCarrierInfoDriver.id
                                                    //                     return item;
                                                    //                 }))

                                                    //                 refDriverPopupItems.current.map((r, i) => {
                                                    //                     if (r && r.classList.contains('selected')) {
                                                    //                         r.scrollIntoView({
                                                    //                             behavior: 'auto',
                                                    //                             block: 'center',
                                                    //                             inline: 'nearest'
                                                    //                         })
                                                    //                     }
                                                    //                     return true;
                                                    //                 });
                                                    //             }
                                                    //         }
                                                    //     }).catch(async e => {
                                                    //         console.log('error getting carrier drivers', e);
                                                    //     })
                                                    // }
                                                }
                                            }}
                                            onChange={async (e) => {
                                                let driver = props.selectedInvoiceCarrierInfoDriver || {};
                                                driver.id = 0;

                                                if (e.target.value === '') {
                                                    driver = {};
                                                    props.setSelectedInvoiceCarrierInfoDriver({ ...driver });
                                                    setDriverItems([]);
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

                                                    props.setSelectedInvoiceCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });

                                                    // if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                                                    //     $.post(props.serverUrl + '/getDriversByCarrierId', {
                                                    //         carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                    //     }).then(async res => {
                                                    //         if (res.result === 'OK') {
                                                    //             if (res.count > 1) {
                                                    //                 await setDriverItems(res.drivers.map((item, index) => {
                                                    //                     item.selected = (props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0
                                                    //                         ? index === 0
                                                    //                         : item.id === props.selectedInvoiceCarrierInfoDriver.id
                                                    //                     return item;
                                                    //                 }))

                                                    //                 refDriverPopupItems.current.map((r, i) => {
                                                    //                     if (r && r.classList.contains('selected')) {
                                                    //                         r.scrollIntoView({
                                                    //                             behavior: 'auto',
                                                    //                             block: 'center',
                                                    //                             inline: 'nearest'
                                                    //                         })
                                                    //                     }
                                                    //                     return true;
                                                    //                 });
                                                    //             }
                                                    //         }
                                                    //     }).catch(async e => {
                                                    //         console.log('error getting carrier drivers', e);
                                                    //     })
                                                    // }
                                                }
                                            }}
                                            value={(props.selectedInvoiceCarrierInfoDriver?.first_name || '') + ((props.selectedInvoiceCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedInvoiceCarrierInfoDriver?.last_name)}
                                        />
                                        {
                                            (props.selectedInvoiceCarrierInfoCarrier?.drivers || []).length > 1 &&

                                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                                if (driverItems.length > 0) {
                                                    setDriverItems([]);
                                                } else {
                                                    window.setTimeout(async () => {
                                                        if ((props.selectedInvoiceCarrierInfoCarrier?.id || 0) > 0) {
                                                            $.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                            }).then(async res => {
                                                                if (res.result === 'OK') {
                                                                    if (res.count > 1) {
                                                                        await setDriverItems(res.drivers.map((item, index) => {
                                                                            item.selected = (props.selectedInvoiceCarrierInfoDriver?.id || 0) === 0
                                                                                ? index === 0
                                                                                : item.id === props.selectedInvoiceCarrierInfoDriver.id
                                                                            return item;
                                                                        }))

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
                                        from={{ opacity: 0, top: -155 }}
                                        enter={{ opacity: 1, top: -160 }}
                                        leave={{ opacity: 0, top: -155 }}
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
                                                <div className="mochi-contextual-popup vertical above" style={{ height: 150 }}>
                                                    <div className="mochi-contextual-popup-content" >
                                                        <div className="mochi-contextual-popup-wrapper">
                                                            {
                                                                driverItems.map((item, index) => {
                                                                    const mochiItemClasses = classnames({
                                                                        'mochi-item': true,
                                                                        'selected': item.selected
                                                                    });

                                                                    const searchValue = (props.selectedInvoiceCarrierInfoDriver?.first_name || '') + ((props.selectedInvoiceCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedInvoiceCarrierInfoDriver?.last_name);

                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={mochiItemClasses}
                                                                            id={item.id}
                                                                            onClick={async () => {
                                                                                await props.setSelectedInvoiceCarrierInfoDriver(item);

                                                                                await props.setInvoiceSelectedOrder({
                                                                                    ...props.selected_order,
                                                                                    carrier_driver_id: item.id
                                                                                })

                                                                                // validateOrderForSaving({ keyCode: 9 });
                                                                                setDriverItems([]);
                                                                                refDriverName.current.focus();
                                                                            }}
                                                                            ref={ref => refDriverPopupItems.current.push(ref)}
                                                                        >
                                                                            {
                                                                                searchValue === undefined
                                                                                    ? (item?.first_name || '') + ((item?.last_name || '') === '' ? '' : ' ' + item.last_name)
                                                                                    : <Highlighter
                                                                                        highlightClassName="mochi-item-highlight-text"
                                                                                        searchWords={[(props.selectedInvoiceCarrierInfoDriver?.first_name || ''), (props.selectedInvoiceCarrierInfoDriver?.last_name || '')]}
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
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Driver Phone"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, phone: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, phone: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoDriver.phone || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{
                                    maxWidth: '5.8rem',
                                    minWidth: '5.8rem'
                                }}>
                                    <input tabIndex={59 + props.tabTimes} type="text" placeholder="Unit Number"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, truck: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, truck: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoDriver.truck || ''}
                                    />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container" style={{
                                    maxWidth: '5.8rem',
                                    minWidth: '5.8rem'
                                }}>
                                    <input tabIndex={60 + props.tabTimes} type="text" placeholder="Trailer Number"
                                        onKeyDown={validateCarrierDriverForSaving}
                                        onInput={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, trailer: e.target.value }) }}
                                        onChange={(e) => { props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, trailer: e.target.value }) }}
                                        value={props.selectedInvoiceCarrierInfoDriver.trailer || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1, alignItems: 'flex-end' }}>
                                <div className='mochi-button' style={{ fontSize: '1rem' }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>E-mail Rate Confirmation To Carrier</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Date Paid" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Check Number" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Invoice Rec'd Date" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Invoice Number" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2, position: 'relative' }}>
                            <input type="text" placeholder="Terms"
                                ref={refTerms}
                                onKeyDown={onTermsKeydown}
                                onChange={() => { }}
                                value={term.name || ''}
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
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Pay By Date" />
                        </div>
                    </div>
                </div>
            </div>

            {
                props.selectedInternalNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <InvoiceModal
                        selectedData={props.selectedInternalNote}
                        setSelectedData={props.setInvoiceSelectedInternalNote}
                        selectedParent={props.selected_order}
                        setSelectedParent={(notes) => {
                            props.setInvoiceSelectedOrder({ ...props.selected_order, internal_notes: notes });
                        }}
                        savingDataUrl='/saveInternalNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedInternalNote.id === 0}
                        title=""
                    />
                </animated.div>
            }

            {
                selectedBillingNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <InvoiceModal
                        selectedData={selectedBillingNote}
                        setSelectedData={setSelectedBillingNote}
                        selectedParent={props.selected_order}
                        setSelectedParent={(notes) => {
                            setBillingNotes(notes);
                        }}

                        billingNotes={billingNotes}
                        setBillingNotes={setBillingNotes}

                        savingDataUrl=''
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={selectedBillingNote.id === 0}
                        title="Will appear on Invoice"
                    />
                </animated.div>
            }

            <InvoicePopup
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

export default connect(null, null)(Invoice)