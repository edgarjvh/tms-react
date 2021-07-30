import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import './Invoice.css';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';
import InvoicePopup from './popup/Popup.jsx';
import InvoiceModal from './modal/Modal.jsx';
import $ from 'jquery';
import axios from 'axios';
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

    const [billingNotes, setBillingNotes] = useState([]);
    const [selectedBillingNote, setSelectedBillingNote] = useState({});

    const modalTransitionProps = useSpring({ opacity: (selectedBillingNote.id !== undefined || props.selectedInternalNote.id !== undefined) ? 1 : 0 });

    const [billToRateType, setBillToRateType] = useState({});
    const [carrierChargesRateType, setCarrierChargesRateType] = useState({});
    const [term, setTerm] = useState({});

    const refBillToRateTypes = useRef();
    const [billToRateTypeItems, setBillToRateTypeItems] = useState([]);
    const refBillToRateTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setBillToRateTypeItems([]) } });
    const refBillToRateTypePopupItems = useRef([]);

    const refCarrierChargesRateTypes = useRef();
    const [carrierChargesRateTypeItems, setCarrierChargesRateTypeItems] = useState([]);
    const refCarrierChargesRateTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setCarrierChargesRateTypeItems([]) } });
    const refCarrierChargesRateTypePopupItems = useRef([]);

    const refTerms = useRef();
    const [termsItems, setTermsItems] = useState([]);
    const refTermsDropDown = useDetectClickOutside({ onTriggered: async () => { await setTermsItems([]) } });
    const refTermsPopupItems = useRef([]);


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

    const getOrderByOrderNumber = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if ((props.order_number || '') !== '') {
                axios.post(props.serverUrl + '/getOrderByOrderNumber', { order_number: props.order_number }).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setInvoiceSelectedOrder({});
                        await props.setInvoiceSelectedOrder(res.data.order);
                        await props.setInvoiceOrderNumber(res.data.order.order_number);
                        await props.setInvoiceTripNumber(res.data.order.trip_number === 0 ? '' : res.data.order.trip_number);
                        await props.setInvoiceSelectedBillToCompanyInfo(res.data.order.bill_to_company || {});

                        if (res.data.order.bill_to_company) {
                            (res.data.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setInvoiceSelectedBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }


                        await props.setSelectedInvoiceCarrierInfoCarrier(res.data.order.carrier || {});

                        if (res.data.order.carrier) {
                            (res.data.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoDriver(res.data.order.driver || {});

                    } else {
                        props.setInvoiceOrderNumber(props.selected_order?.order_number || '');
                    }
                }).catch(e => {
                    console.log('error getting order by order number', e);
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
                axios.post(props.serverUrl + '/getOrderByTripNumber', { trip_number: props.trip_number }).then(async res => {
                    if (res.data.result === 'OK') {
                        await props.setInvoiceSelectedOrder({});
                        await props.setInvoiceSelectedOrder(res.data.order);
                        await props.setInvoiceOrderNumber(res.data.order.order_number);
                        await props.setInvoiceTripNumber(res.data.order.trip_number === 0 ? '' : res.data.order.trip_number);
                        await props.setSelectedInvoiceBillToCompanyInfo(res.data.order.bill_to_company || {});

                        if (res.data.order.bill_to_company) {
                            (res.data.order.bill_to_company.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceBillToCompanyContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoCarrier(res.data.order.carrier || {});

                        if (res.data.order.carrier) {
                            (res.data.order.carrier.contacts || []).map(async (contact, index) => {
                                if (contact.is_primary === 1) {
                                    await props.setSelectedInvoiceCarrierInfoContact(contact);
                                }
                                return true;
                            })
                        }

                        await props.setSelectedInvoiceCarrierInfoDriver(res.data.order.driver || {});

                    } else {
                        props.setInvoiceTripNumber(props.selected_order?.trip_number || '');
                    }
                }).catch(e => {
                    console.log('error getting order by trip number', e);
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

                axios.post(props.serverUrl + '/saveCustomer', selectedBillToCompanyInfo).then(async res => {
                    if (res.data.result === 'OK') {
                        if (props.selectedBillToCompanyInfo.id === undefined || (props.selectedBillToCompanyInfo.id || 0) === 0) {
                            await props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, id: res.data.customer.id });
                        }

                        (res.data.customer.contacts || []).map(async (contact, index) => {

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

            axios.post(props.serverUrl + '/saveContact', contact).then(async res => {
                if (res.data.result === 'OK') {
                    await props.setInvoiceSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.data.contacts });
                    await props.setInvoiceSelectedBillToCompanyContact(res.data.contact);
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

                axios.post(props.serverUrl + '/saveCarrier', selectedInvoiceCarrierInfoCarrier).then(async res => {
                    if (res.data.result === 'OK') {
                        if (props.selectedInvoiceCarrierInfoCarrier.id === undefined && (props.selectedInvoiceCarrierInfoCarrier.id || 0) === 0) {
                            await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, id: res.data.carrier.id });
                        }

                        (res.data.carrier.contacts || []).map(async (contact, index) => {

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

            axios.post(props.serverUrl + '/saveCarrierContact', contact).then(async res => {
                if (res.data.result === 'OK') {
                    await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, contacts: res.data.contacts });
                    await props.setSelectedInvoiceCarrierInfoContact(res.data.contact);
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
                    axios.post(props.serverUrl + '/saveCarrierDriver', driver).then(async res => {
                        if (res.data.result === 'OK') {
                            await props.setSelectedInvoiceCarrierInfoCarrier({ ...props.selectedInvoiceCarrierInfoCarrier, drivers: res.data.drivers });
                            await props.setSelectedInvoiceCarrierInfoDriver({ ...props.selectedInvoiceCarrierInfoDriver, id: res.data.driver.id });
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
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text" placeholder="Rate Type"
                                        ref={refBillToRateTypes}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (billToRateTypeItems.length > 0) {
                                                        let selectedIndex = billToRateTypeItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (billToRateTypeItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                        axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                                    item.selected = (billToRateType.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === billToRateType.id
                                                                    return item;
                                                                }))

                                                                refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting rate types', e);
                                                        })
                                                    }
                                                    break;

                                                case 39: case 40: // arrow right | arrow down
                                                    e.preventDefault();
                                                    if (billToRateTypeItems.length > 0) {
                                                        let selectedIndex = billToRateTypeItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                                if (selectedIndex === (billToRateTypeItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                        axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                                    item.selected = (billToRateType.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === billToRateType.id
                                                                    return item;
                                                                }))

                                                                refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting rate types', e);
                                                        })
                                                    }
                                                    break;

                                                case 27: // escape
                                                    setBillToRateTypeItems([]);
                                                    break;

                                                case 13: // enter
                                                    if (billToRateTypeItems.length > 0 && billToRateTypeItems.findIndex(item => item.selected) > -1) {
                                                        setBillToRateType(billToRateTypeItems[billToRateTypeItems.findIndex(item => item.selected)]);
                                                        setBillToRateTypeItems([]);
                                                        refBillToRateTypes.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (billToRateTypeItems.length > 0) {
                                                        e.preventDefault();
                                                        setBillToRateType(billToRateTypeItems[billToRateTypeItems.findIndex(item => item.selected)]);
                                                        setBillToRateTypeItems([]);
                                                        refBillToRateTypes.current.focus();
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onBlur={async () => {
                                            if ((billToRateType.id || 0) === 0) {
                                                await setBillToRateType({});
                                            }
                                        }}
                                        onInput={async (e) => {
                                            await setBillToRateType({
                                                id: 0,
                                                name: e.target.value
                                            });

                                            if (e.target.value.trim() === '') {
                                                setBillToRateTypeItems([]);
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }}
                                        onChange={async (e) => {
                                            await setBillToRateType({
                                                id: 0,
                                                name: e.target.value
                                            });

                                            if (e.target.value.trim() === '') {
                                                setBillToRateTypeItems([]);
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }}
                                        value={billToRateType.name || ''}
                                    />
                                    <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                        if (billToRateTypeItems.length > 0) {
                                            setBillToRateTypeItems([]);
                                        } else {
                                            if ((billToRateType.id || 0) === 0 && (billToRateType.name || '') !== '') {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: billToRateType.name
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                    console.log('error getting rate types', e);
                                                })
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setBillToRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
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
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }

                                        refBillToRateTypes.current.focus();
                                    }} />
                                </div>
                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={billToRateTypeItems.length > 0}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-load-type"
                                            style={{
                                                ...styles,
                                                left: '0',
                                                display: 'block'
                                            }}
                                            ref={refBillToRateTypeDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            billToRateTypeItems.map((item, index) => {
                                                                const mochiItemClasses = classnames({
                                                                    'mochi-item': true,
                                                                    'selected': item.selected
                                                                });

                                                                const searchValue = (billToRateType.id || 0) === 0 && (billToRateType.name || '') !== ''
                                                                    ? billToRateType.name : undefined;

                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={mochiItemClasses}
                                                                        id={item.id}
                                                                        onClick={async () => {
                                                                            await setBillToRateType(item);
                                                                            setBillToRateTypeItems([]);
                                                                            refBillToRateTypes.current.focus();
                                                                        }}
                                                                        ref={ref => refBillToRateTypePopupItems.current.push(ref)}
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
                            <div className="select-box-container" style={{ flexGrow: 1 }}>
                                <div className="select-box-wrapper">
                                    <input type="text" placeholder="Rate Type"
                                        ref={refCarrierChargesRateTypes}
                                        onKeyDown={async (e) => {
                                            let key = e.keyCode || e.which;

                                            switch (key) {
                                                case 37: case 38: // arrow left | arrow up
                                                    e.preventDefault();
                                                    if (carrierChargesRateTypeItems.length > 0) {
                                                        let selectedIndex = carrierChargesRateTypeItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                                if (selectedIndex === 0) {
                                                                    item.selected = index === (carrierChargesRateTypeItems.length - 1);
                                                                } else {
                                                                    item.selected = index === (selectedIndex - 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                        axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === carrierChargesRateType.id
                                                                    return item;
                                                                }))

                                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting rate types', e);
                                                        })
                                                    }
                                                    break;

                                                case 39: case 40: // arrow right | arrow down
                                                    e.preventDefault();
                                                    if (carrierChargesRateTypeItems.length > 0) {
                                                        let selectedIndex = carrierChargesRateTypeItems.findIndex(item => item.selected);

                                                        if (selectedIndex === -1) {
                                                            await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                                item.selected = index === 0;
                                                                return item;
                                                            }))
                                                        } else {
                                                            await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                                if (selectedIndex === (carrierChargesRateTypeItems.length - 1)) {
                                                                    item.selected = index === 0;
                                                                } else {
                                                                    item.selected = index === (selectedIndex + 1)
                                                                }
                                                                return item;
                                                            }))
                                                        }

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                        axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                            if (res.data.result === 'OK') {
                                                                await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                                        ? index === 0
                                                                        : item.id === carrierChargesRateType.id
                                                                    return item;
                                                                }))

                                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                            console.log('error getting rate types', e);
                                                        })
                                                    }
                                                    break;

                                                case 27: // escape
                                                    setCarrierChargesRateTypeItems([]);
                                                    break;

                                                case 13: // enter
                                                    if (carrierChargesRateTypeItems.length > 0 && carrierChargesRateTypeItems.findIndex(item => item.selected) > -1) {
                                                        setCarrierChargesRateType(carrierChargesRateTypeItems[carrierChargesRateTypeItems.findIndex(item => item.selected)]);
                                                        setCarrierChargesRateTypeItems([]);
                                                        refCarrierChargesRateTypes.current.focus();
                                                    }
                                                    break;

                                                case 9: // tab
                                                    if (carrierChargesRateTypeItems.length > 0) {
                                                        e.preventDefault();
                                                        setCarrierChargesRateType(carrierChargesRateTypeItems[carrierChargesRateTypeItems.findIndex(item => item.selected)]);
                                                        setCarrierChargesRateTypeItems([]);
                                                        refCarrierChargesRateTypes.current.focus();
                                                    }
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                        onBlur={async () => {
                                            if ((carrierChargesRateType.id || 0) === 0) {
                                                await setCarrierChargesRateType({});
                                            }
                                        }}
                                        onInput={async (e) => {
                                            await setCarrierChargesRateType({
                                                id: 0,
                                                name: e.target.value
                                            });

                                            if (e.target.value.trim() === '') {
                                                setCarrierChargesRateTypeItems([]);
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }}
                                        onChange={async (e) => {
                                            await setCarrierChargesRateType({
                                                id: 0,
                                                name: e.target.value
                                            });

                                            if (e.target.value.trim() === '') {
                                                setCarrierChargesRateTypeItems([]);
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: e.target.value.trim()
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }}
                                        value={carrierChargesRateType.name || ''}
                                    />
                                    <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                        if (carrierChargesRateTypeItems.length > 0) {
                                            setCarrierChargesRateTypeItems([]);
                                        } else {
                                            if ((carrierChargesRateType.id || 0) === 0 && (carrierChargesRateType.name || '') !== '') {
                                                axios.post(props.serverUrl + '/getRateTypes', {
                                                    name: carrierChargesRateType.name
                                                }).then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                    console.log('error getting rate types', e);
                                                })
                                            } else {
                                                axios.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.data.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.data.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
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
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                        }

                                        refCarrierChargesRateTypes.current.focus();
                                    }} />

                                </div>
                                <Transition
                                    from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                                    leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                                    items={carrierChargesRateTypeItems.length > 0}
                                    config={{ duration: 100 }}
                                >
                                    {show => show && (styles => (
                                        <div
                                            className="mochi-contextual-container"
                                            id="mochi-contextual-container-load-type"
                                            style={{
                                                ...styles,
                                                left: '0',
                                                display: 'block'
                                            }}
                                            ref={refCarrierChargesRateTypeDropDown}
                                        >
                                            <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                                <div className="mochi-contextual-popup-content" >
                                                    <div className="mochi-contextual-popup-wrapper">
                                                        {
                                                            carrierChargesRateTypeItems.map((item, index) => {
                                                                const mochiItemClasses = classnames({
                                                                    'mochi-item': true,
                                                                    'selected': item.selected
                                                                });

                                                                const searchValue = (carrierChargesRateType.id || 0) === 0 && (carrierChargesRateType.name || '') !== ''
                                                                    ? carrierChargesRateType.name : undefined;

                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={mochiItemClasses}
                                                                        id={item.id}
                                                                        onClick={async () => {
                                                                            await setCarrierChargesRateType(item);
                                                                            setCarrierChargesRateTypeItems([]);
                                                                            refCarrierChargesRateTypes.current.focus();
                                                                        }}
                                                                        ref={ref => refCarrierChargesRateTypePopupItems.current.push(ref)}
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
                                                            axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    await setEquipmentItems(res.data.equipments.map((item, index) => {
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
                                                            axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    await setEquipmentItems(res.data.equipments.map((item, index) => {
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
                                                    axios.post(props.serverUrl + '/getEquipments', {
                                                        name: e.target.value.trim()
                                                    }).then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
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
                                                    axios.post(props.serverUrl + '/getEquipments', {
                                                        name: props.selectedInvoiceCarrierInfoDriver?.equipment.name
                                                    }).then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
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
                                                    axios.post(props.serverUrl + '/getEquipments').then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setEquipmentItems(res.data.equipments.map((item, index) => {
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
                                                                axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        if (res.data.count > 1) {
                                                                            await setDriverItems(res.data.drivers.map((item, index) => {
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
                                                                axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                    carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                                }).then(async res => {
                                                                    if (res.data.result === 'OK') {
                                                                        if (res.data.count > 1) {
                                                                            await setDriverItems(res.data.drivers.map((item, index) => {
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
                                                    //     axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                    //         carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                    //     }).then(async res => {
                                                    //         if (res.data.result === 'OK') {
                                                    //             if (res.data.count > 1) {
                                                    //                 await setDriverItems(res.data.drivers.map((item, index) => {
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
                                                    //     axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                    //         carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                    //     }).then(async res => {
                                                    //         if (res.data.result === 'OK') {
                                                    //             if (res.data.count > 1) {
                                                    //                 await setDriverItems(res.data.drivers.map((item, index) => {
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
                                                            axios.post(props.serverUrl + '/getDriversByCarrierId', {
                                                                carrier_id: props.selectedInvoiceCarrierInfoCarrier.id
                                                            }).then(async res => {
                                                                if (res.data.result === 'OK') {
                                                                    if (res.data.count > 1) {
                                                                        await setDriverItems(res.data.drivers.map((item, index) => {
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
                        <div className="select-box-container" style={{ flexGrow: 1 }}>
                            <div className="select-box-wrapper">
                                <input type="text" placeholder="Terms"
                                    ref={refTerms}
                                    onKeyDown={async (e) => {
                                        let key = e.keyCode || e.which;

                                        switch (key) {
                                            case 37: case 38: // arrow left | arrow up
                                                e.preventDefault();
                                                if (termsItems.length > 0) {
                                                    let selectedIndex = termsItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setTermsItems(termsItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setTermsItems(termsItems.map((item, index) => {
                                                            if (selectedIndex === 0) {
                                                                item.selected = index === (termsItems.length - 1);
                                                            } else {
                                                                item.selected = index === (selectedIndex - 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refTermsPopupItems.current.map((r, i) => {
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
                                                    axios.post(props.serverUrl + '/getTerms').then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setTermsItems(res.data.terms.map((item, index) => {
                                                                item.selected = (term.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === term.id
                                                                return item;
                                                            }))

                                                            refTermsPopupItems.current.map((r, i) => {
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
                                                        console.log('error getting terms', e);
                                                    })
                                                }
                                                break;

                                            case 39: case 40: // arrow right | arrow down
                                                e.preventDefault();
                                                if (termsItems.length > 0) {
                                                    let selectedIndex = termsItems.findIndex(item => item.selected);

                                                    if (selectedIndex === -1) {
                                                        await setTermsItems(termsItems.map((item, index) => {
                                                            item.selected = index === 0;
                                                            return item;
                                                        }))
                                                    } else {
                                                        await setTermsItems(termsItems.map((item, index) => {
                                                            if (selectedIndex === (termsItems.length - 1)) {
                                                                item.selected = index === 0;
                                                            } else {
                                                                item.selected = index === (selectedIndex + 1)
                                                            }
                                                            return item;
                                                        }))
                                                    }

                                                    refTermsPopupItems.current.map((r, i) => {
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
                                                    axios.post(props.serverUrl + '/getTerms').then(async res => {
                                                        if (res.data.result === 'OK') {
                                                            await setTermsItems(res.data.terms.map((item, index) => {
                                                                item.selected = (term.id || 0) === 0
                                                                    ? index === 0
                                                                    : item.id === term.id
                                                                return item;
                                                            }))

                                                            refTermsPopupItems.current.map((r, i) => {
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
                                                        console.log('error getting terms', e);
                                                    })
                                                }
                                                break;

                                            case 27: // escape
                                                setTermsItems([]);
                                                break;

                                            case 13: // enter
                                                if (termsItems.length > 0 && termsItems.findIndex(item => item.selected) > -1) {
                                                    setTerm(termsItems[termsItems.findIndex(item => item.selected)]);
                                                    setTermsItems([]);
                                                    refTerms.current.focus();
                                                }
                                                break;

                                            case 9: // tab
                                                if (termsItems.length > 0) {
                                                    e.preventDefault();
                                                    setTerm(termsItems[termsItems.findIndex(item => item.selected)]);
                                                    setTermsItems([]);
                                                    refTerms.current.focus();
                                                }
                                                break;

                                            default:
                                                break;
                                        }
                                    }}
                                    onBlur={async () => {
                                        if ((term.id || 0) === 0) {
                                            await setTerm({});
                                        }
                                    }}
                                    onInput={async (e) => {
                                        await setTerm({
                                            id: 0,
                                            name: e.target.value
                                        });

                                        if (e.target.value.trim() === '') {
                                            setTermsItems([]);
                                        } else {
                                            axios.post(props.serverUrl + '/getTerms', {
                                                name: e.target.value.trim()
                                            }).then(async res => {
                                                if (res.data.result === 'OK') {
                                                    await setTermsItems(res.data.terms.map((item, index) => {
                                                        item.selected = (term.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === term.id
                                                        return item;
                                                    }))
                                                }
                                            }).catch(async e => {
                                                console.log('error getting terms', e);
                                            })
                                        }
                                    }}
                                    onChange={async (e) => {
                                        await setTerm({
                                            id: 0,
                                            name: e.target.value
                                        });

                                        if (e.target.value.trim() === '') {
                                            setTermsItems([]);
                                        } else {
                                            axios.post(props.serverUrl + '/getTerms', {
                                                name: e.target.value.trim()
                                            }).then(async res => {
                                                if (res.data.result === 'OK') {
                                                    await setTermsItems(res.data.terms.map((item, index) => {
                                                        item.selected = (term.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === term.id
                                                        return item;
                                                    }))
                                                }
                                            }).catch(async e => {
                                                console.log('error getting terms', e);
                                            })
                                        }
                                    }}
                                    value={term.name || ''}
                                />
                                <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                    if (termsItems.length > 0) {
                                        setTermsItems([]);
                                    } else {
                                        if ((term.id || 0) === 0 && (term.name || '') !== '') {
                                            axios.post(props.serverUrl + '/getTerms', {
                                                name: term.name
                                            }).then(async res => {
                                                if (res.data.result === 'OK') {
                                                    await setTermsItems(res.data.terms.map((item, index) => {
                                                        item.selected = (term.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === term.id
                                                        return item;
                                                    }))

                                                    refTermsPopupItems.current.map((r, i) => {
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
                                                console.log('error getting terms', e);
                                            })
                                        } else {
                                            axios.post(props.serverUrl + '/getTerms').then(async res => {
                                                if (res.data.result === 'OK') {
                                                    await setTermsItems(res.data.terms.map((item, index) => {
                                                        item.selected = (term.id || 0) === 0
                                                            ? index === 0
                                                            : item.id === term.id
                                                        return item;
                                                    }))

                                                    refTermsPopupItems.current.map((r, i) => {
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
                                                console.log('error getting terms', e);
                                            })
                                        }
                                    }

                                    refTerms.current.focus();
                                }} />
                            </div>
                            <Transition
                                from={{ opacity: 0, top: -150 }}
                                enter={{ opacity: 1, top: -155 }}
                                leave={{ opacity: 0, top: -150 }}
                                items={termsItems.length > 0}
                                config={{ duration: 100 }}
                            >
                                {show => show && (styles => (
                                    <div
                                        className="mochi-contextual-container"
                                        id="mochi-contextual-container-load-type"
                                        style={{
                                            ...styles,
                                            left: '-100%',
                                            display: 'block'
                                        }}
                                        ref={refTermsDropDown}
                                    >
                                        <div className="mochi-contextual-popup vertical above left" style={{ height: 150 }}>
                                            <div className="mochi-contextual-popup-content" >
                                                <div className="mochi-contextual-popup-wrapper">
                                                    {
                                                        termsItems.map((item, index) => {
                                                            const mochiItemClasses = classnames({
                                                                'mochi-item': true,
                                                                'selected': item.selected
                                                            });

                                                            const searchValue = (term.id || 0) === 0 && (term.name || '') !== ''
                                                                ? term.name : undefined;

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={mochiItemClasses}
                                                                    id={item.id}
                                                                    onClick={async () => {
                                                                        await setTerm(item);
                                                                        setTermsItems([]);
                                                                        refTerms.current.focus();
                                                                    }}
                                                                    ref={ref => refTermsPopupItems.current.push(ref)}
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
        </div>
    )
}

export default connect(null, null)(Invoice)