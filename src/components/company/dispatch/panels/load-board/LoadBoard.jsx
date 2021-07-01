import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './LoadBoard.css';
import {
    setDispatchOpenedPanels,
    setLbSelectedOrder,
    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbBillToCompanySearch,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbShipperCompanySearch,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanySearch,
    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoDriver
} from "./../../../../../actions";
import $ from 'jquery';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import classnames from 'classnames';

function LoadBoard(props) {
    const [currentSystemDateTime, setCurrentSystemDateTime] = useState(moment());
    const [orders, setOrders] = useState([]);
    const [availableOrders, setAvailableOrders] = useState([]);
    const [bookedOrders, setBookedOrders] = useState([]);
    const [inTransitOrders, setInTransitOrders] = useState([]);
    const [deliveredNotInvoiceOrders, setDeliveredNotInvoicedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showingShipperSecondPage, setShowingShipperSecondPage] = useState(false);
    const [showingConsigneeSecondPage, setShowingConsigneeSecondPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        $.post(props.serverUrl + '/getOrders').then(async res => {
            if (res.result === 'OK') {
                setOrders(res.orders.map(item => item));

                setAvailableOrders(res.orders.filter(item => (item.carrier_id || 0) === 0));

                setBookedOrders(res.orders.filter(item => ((item.carrier_id || 0) > 0) && (item.events.find(ev => ev.event_type === 'loaded') === undefined)));

                setInTransitOrders(res.orders.filter(item =>
                    ((item.carrier_id || 0) > 0) &&
                    (item.events.find(ev => ev.event_type === 'loaded') !== undefined) &&
                    // ((item.deliveries.length === 0) || (item.events.find(ev => ev.consignee_id === item.deliveries[item.deliveries.length - 1].id) === undefined))))
                    ((item.deliveries.length === 0) || (item.deliveries.filter(del => item.events.find(el => el.consignee_id === del.id) === undefined).length > 0))))

                setDeliveredNotInvoicedOrders(res.orders.filter(item =>
                    ((item.carrier_id || 0) > 0) &&
                    (item.events.find(ev => ev.event_type === 'loaded') !== undefined) &&
                    // ((item.deliveries.length > 0) && (item.events.find(ev => ev.consignee_id === item.deliveries[item.deliveries.length - 1].id) !== undefined))))
                    ((item.deliveries.length > 0) && (item.deliveries.filter(del => item.events.find(el => el.consignee_id === del.id) === undefined).length === 0))))

                setIsLoading(false);
            }
        }).catch(e => {
            console.log('error loading orders', e)
            setIsLoading(false);
        })

        updateSystemDateTime();

    }, [])

    const updateSystemDateTime = () => {
        window.setTimeout(() => {
            setCurrentSystemDateTime(moment());
            updateSystemDateTime();
        }, 1000)
    }

    const closePanelBtnClick = (e, name) => {
        props.setLbSelectedOrder({});
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
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

    const insuranceStatusClasses = () => {
        let classes = 'input-box-container insurance-status';
        let curDate = moment().startOf('day');
        let curDate2 = moment();
        let futureMonth = curDate2.add(1, 'M');
        let statusClass = '';

        (props.selectedLbCarrierInfoCarrier.insurances || []).map((insurance, index) => {
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

    const onOrderClick = (order) => {
        props.setLbSelectedOrder(order);

        props.setLbSelectedBillToCompanyInfo(order.bill_to_company || {})
        props.setLbSelectedBillToCompanyContact({});

        order.bill_to_company?.contacts.map(c => {
            if (c.is_primary === 1) {
                props.setLbSelectedBillToCompanyContact(c);
            }
            return true;
        });

        props.setSelectedLbCarrierInfoCarrier(order.carrier || {})
        props.setSelectedLbCarrierInfoContact({})

        order.carrier?.contacts.map(c => {
            if (c.is_primary === 1) {
                props.setSelectedLbCarrierInfoContact(c);
            }
            return true;
        });

        props.setSelectedLbCarrierInfoDriver(order.carrier?.driver || {});

        props.setLbSelectedShipperCompanyInfo(order.pickups[0] || {});
        props.setLbSelectedShipperCompanyContact({});

        ((order.pickups.length > 0 ? order.pickups[0] : {}).contacts || []).map(c => {
            if (c.is_primary === 1) {
                props.setLbSelectedShipperCompanyContact(c);
            }
            return true;
        });

        props.setLbSelectedConsigneeCompanyInfo(order.deliveries.length > 0 ? order.deliveries[0] : {});
        props.setLbSelectedConsigneeCompanyContact({});

        ((order.deliveries.length > 0 ? order.deliveries[0] : {}).contacts || []).map(c => {
            if (c.is_primary === 1) {
                props.setLbSelectedConsigneeCompanyContact(c);
            }
            return true;
        });
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'load-board')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="load-board">
                <div className="fields-container-col grow" style={{ marginRight: 10 }}>
                    <div className="form-bordered-box" style={{ marginBottom: 10 }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Available</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if (availableOrders.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = `<h2>Available Orders</h2></br></br>`;

                                    html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Order Number</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Starting City/State</div>
                                            <div style="min-width:50%;max-width:50%;text-decoration:underline">Destination City/State</div>
                                            
                                        </div>
                                        `;

                                    availableOrders.map((item, index) => {
                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:20%;max-width:20%">${item.order_number}</div>
                                            <div style="min-width:30%;max-width:30%">${item.pickups.length > 0
                                                ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                : ''
                                            }</div>
                                            <div style="min-width:50%;max-width:50%">${item.deliveries.length > 0
                                                ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                : ''
                                            }</div>
                                            
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

                        <div className="lb-form-container">
                            {
                                isLoading &&
                                <div className="loading-container">
                                    <Loader type="ThreeDots" color="#333738" height={20} width={20} active={true} />
                                </div>
                            }
                            <div className="lb-form-wrapper">
                                {
                                    availableOrders.length > 0 &&
                                    <div className="lb-form-item">
                                        <div className="order-number">Order Number</div>
                                        <div className="starting-city-state">Starting City/State</div>
                                        <div className="destination-city-state">Destination City/State</div>
                                    </div>
                                }
                                {
                                    availableOrders.map((item, i) => {
                                        const itemClasses = classnames({
                                            'lb-form-item': true,
                                            'selected': (props.selected_order.id || 0) === item.id
                                        })
                                        return (
                                            <div className={itemClasses} key={i} onClick={() => { onOrderClick(item) }}>
                                                <div className="order-number">{item.order_number}</div>
                                                <div className="starting-city-state">{
                                                    item.pickups.length > 0
                                                        ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                        : ''
                                                }</div>
                                                <div className="destination-city-state">{
                                                    item.deliveries.length > 0
                                                        ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                        : ''
                                                }</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="form-bordered-box" style={{ marginBottom: 10 }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Booked</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if (bookedOrders.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = `<h2>Booked Orders</h2></br></br>`;

                                    html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Order Number</div>
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Carrier Code</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Starting City/State</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Destination City/State</div>
                                            
                                        </div>
                                        `;

                                    bookedOrders.map((item, index) => {
                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:20%;max-width:20%">${item.order_number}</div>
                                            <div style="min-width:20%;max-width:20%">${item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                            <div style="min-width:30%;max-width:30%">${item.pickups.length > 0
                                                ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                : ''
                                            }</div>
                                            <div style="min-width:30%;max-width:30%">${item.deliveries.length > 0
                                                ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                : ''
                                            }</div>
                                            
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

                        <div className="lb-form-container">
                            {
                                isLoading &&
                                <div className="loading-container">
                                    <Loader type="ThreeDots" color="#333738" height={20} width={20} active={true} />
                                </div>
                            }
                            <div className="lb-form-wrapper">
                                {
                                    bookedOrders.length > 0 &&
                                    <div className="lb-form-item">
                                        <div className="order-number">Order Number</div>
                                        <div className="carrier-code">Carrier Code</div>
                                        <div className="starting-city-state">Starting City/State</div>
                                        <div className="destination-city-state">Destination City/State</div>
                                    </div>
                                }
                                {
                                    bookedOrders.map((item, i) => {
                                        const itemClasses = classnames({
                                            'lb-form-item': true,
                                            'selected': (props.selected_order.id || 0) === item.id
                                        })
                                        return (
                                            <div className={itemClasses} key={i} onClick={() => { onOrderClick(item) }}>
                                                <div className="order-number">{item.order_number}</div>
                                                <div className="carrier-code">{item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                                <div className="starting-city-state">{
                                                    item.pickups.length > 0
                                                        ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                        : ''
                                                }</div>
                                                <div className="destination-city-state">{
                                                    item.deliveries.length > 0
                                                        ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                        : ''
                                                }</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="form-bordered-box">
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">In Transit</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if (inTransitOrders.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = `<h2>In Transit Orders</h2></br></br>`;

                                    html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Order Number</div>
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Carrier Code</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Starting City/State</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Destination City/State</div>
                                            
                                        </div>
                                        `;

                                    inTransitOrders.map((item, index) => {
                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:20%;max-width:20%">${item.order_number}</div>
                                            <div style="min-width:20%;max-width:20%">${item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                            <div style="min-width:30%;max-width:30%">${item.pickups.length > 0
                                                ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                : ''
                                            }</div>
                                            <div style="min-width:30%;max-width:30%">${item.deliveries.length > 0
                                                ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                : ''
                                            }</div>
                                            
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

                        <div className="lb-form-container">
                            {
                                isLoading &&
                                <div className="loading-container">
                                    <Loader type="ThreeDots" color="#333738" height={20} width={20} active={true} />
                                </div>
                            }
                            <div className="lb-form-wrapper">
                                {
                                    inTransitOrders.length > 0 &&
                                    <div className="lb-form-item">
                                        <div className="order-number">Order Number</div>
                                        <div className="carrier-code">Carrier Code</div>
                                        <div className="starting-city-state">Starting City/State</div>
                                        <div className="destination-city-state">Destination City/State</div>
                                    </div>
                                }
                                {
                                    inTransitOrders.map((item, i) => {
                                        const itemClasses = classnames({
                                            'lb-form-item': true,
                                            'selected': (props.selected_order.id || 0) === item.id
                                        })
                                        return (
                                            <div className={itemClasses} key={i} onClick={() => { onOrderClick(item) }}>
                                                <div className="order-number">{item.order_number}</div>
                                                <div className="carrier-code">{item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                                <div className="starting-city-state">{
                                                    item.pickups.length > 0
                                                        ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                        : ''
                                                }</div>
                                                <div className="destination-city-state">{
                                                    item.deliveries.length > 0
                                                        ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                        : ''
                                                }</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col grow">
                    <div className="form-borderless-box" style={{ marginBottom: 15 }}>
                        <div className="form-row">
                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Refresh</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>

                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-load-board-auto-refresh-btn" />
                                <label htmlFor="cbox-load-board-auto-refresh-btn">
                                    <div className="label-text">Auto Refresh</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-bordered-box" style={{ marginBottom: 10, paddingTop: 20 }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Load Information</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selected_order?.id || 0) === 0) {
                                        window.alert('You must select an order first!');
                                        return;
                                    }

                                    if (!props.dispatchOpenedPanels.includes('lb-order')) {
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-order']);
                                    };
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Print</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        {
                            props.selected_order.id !== undefined &&

                            <div className="lb-form-container rows">
                                <div className="lb-form-row">

                                    <div className='form-bordered-box'>
                                        <div className='form-header'>
                                            <div className='top-border top-border-left'></div>
                                            <div className='form-title'>Bill To</div>
                                            <div className='top-border top-border-middle'></div>
                                            <div className='form-buttons'>
                                                {/* <div className='mochi-button' onClick={billToCompanySearch}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Search</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div> */}
                                                <div className='mochi-button' onClick={() => {
                                                    // if ((props.selectedBillToCompanyInfo.id || 0) === 0) {
                                                    //     window.alert('You must select a customer first!');
                                                    //     return;
                                                    // }

                                                    if (!props.dispatchOpenedPanels.includes('lb-bill-to-company-info')) {
                                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-bill-to-company-info']);
                                                    }
                                                }}>
                                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                    <div className='mochi-button-base'>Company info</div>
                                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                                </div>
                                                {/* <div className='mochi-button' onClick={() => {
                                                if (!props.dispatchOpenedPanels.includes('rating-screen')) {
                                                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'rating-screen'])
                                                }
                                            }}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Rate load</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div> */}
                                            </div>
                                            <div className='top-border top-border-right'></div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input tabIndex={6 + props.tabTimes} type="text" placeholder="Code" maxLength="8"
                                                    readOnly={true}
                                                    // onKeyDown={getBillToCompanyByCode}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, code: e.target.value }) }}
                                                    value={(props.selectedLbBillToCompanyInfo.code || '') + ((props.selectedLbBillToCompanyInfo.code_number || 0) === 0 ? '' : props.selectedLbBillToCompanyInfo.code_number)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={7 + props.tabTimes} type="text" placeholder="Name"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, name: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.name || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={8 + props.tabTimes} type="text" placeholder="Address 1"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address1: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.address1 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={9 + props.tabTimes} type="text" placeholder="Address 2"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, address2: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.address2 || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={10 + props.tabTimes} type="text" placeholder="City"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, city: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.city || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input tabIndex={11 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, state: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.state || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-zip-code">
                                                <input tabIndex={12 + props.tabTimes} type="text" placeholder="Postal Code"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, zip: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.zip || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input tabIndex={13 + props.tabTimes} type="text" placeholder="Contact Name"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyContactForSaving}
                                                    // onChange={(e) => {
                                                    //     let splitted = e.target.value.split(' ');
                                                    //     let first_name = splitted[0];

                                                    //     if (splitted.length > 1) {
                                                    //         first_name += ' ';
                                                    //     }


                                                    //     let last_name = '';

                                                    //     splitted.map((item, index) => {
                                                    //         if (index > 0) {
                                                    //             last_name += item;
                                                    //         }
                                                    //         return true;
                                                    //     })

                                                    //     props.setLbSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
                                                    // }}

                                                    // onInput={(e) => {
                                                    //     let splitted = e.target.value.split(' ');
                                                    //     let first_name = splitted[0];

                                                    //     if (splitted.length > 1) {
                                                    //         first_name += ' ';
                                                    //     }

                                                    //     let last_name = '';

                                                    //     splitted.map((item, index) => {
                                                    //         if (index > 0) {
                                                    //             last_name += item;
                                                    //         }
                                                    //         return true;
                                                    //     })

                                                    //     props.setLbSelectedBillToCompanyContact({ ...props.selectedBillToCompanyContact, first_name: first_name, last_name: last_name });
                                                    // }}

                                                    value={(props.selectedLbBillToCompanyContact.first_name || '') + ((props.selectedLbBillToCompanyContact.last_name || '').trim() === '' ? '' : ' ' + props.selectedLbBillToCompanyContact.last_name)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone">
                                                <MaskedInput tabIndex={14 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyContactForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contact_phone: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.contact_phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={15 + props.tabTimes} type="text" placeholder="Ext"
                                                    readOnly={true}
                                                    // onKeyDown={validateBillToCompanyContactForSaving}
                                                    // onInput={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                                    // onChange={(e) => { props.setLbSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, ext: e.target.value }) }}
                                                    value={props.selectedLbBillToCompanyInfo.ext || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-bordered-box'>
                                        <div className='form-header'>
                                            <div className='top-border top-border-left'></div>
                                            <div className='form-title'>Carrier</div>
                                            <div className='top-border top-border-middle'></div>
                                            <div className='form-buttons'>
                                                {/* <div className='mochi-button' onClick={searchCarrierBtnClick}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Search</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div> */}

                                                <div className='mochi-button' onClick={() => {
                                                    // if ((props.selectedDispatchCarrierInfoCarrier.id || 0) === 0) {
                                                    //     window.alert('You must select a carrier first!');
                                                    //     return;
                                                    // }

                                                    if (!props.dispatchOpenedPanels.includes('lb-carrier-info')) {
                                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info'])
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
                                                    // onKeyDown={getCarrierInfoByCode}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, code: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, code: e.target.value }) }}
                                                    value={(props.selectedLbCarrierInfoCarrier.code || '') + ((props.selectedLbCarrierInfoCarrier.code_number || 0) === 0 ? '' : props.selectedLbCarrierInfoCarrier.code_number)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={51 + props.tabTimes} type="text" placeholder="Name"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierInfoForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, name: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, name: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoCarrier.name || ''}
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
                                                    //     props.setLbSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                                    // }}
                                                    // onChange={(e) => {
                                                    //     props.setLbSelectedOrder({ ...props.selected_order, carrier_load: e.target.value });
                                                    // }}
                                                    value={
                                                        ((props.selected_order.carrier || {}).id !== undefined && (props.selected_order.pickups || []).length > 0 && (props.selected_order.deliveries || []).length > 0)
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
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierContactForSaving}
                                                    // onChange={(e) => {
                                                    //     let splitted = e.target.value.split(' ');
                                                    //     let first_name = splitted[0];

                                                    //     if (splitted.length > 1) {
                                                    //         first_name += ' ';
                                                    //     }


                                                    //     let last_name = '';

                                                    //     splitted.map((item, index) => {
                                                    //         if (index > 0) {
                                                    //             last_name += item;
                                                    //         }
                                                    //         return true;
                                                    //     })

                                                    //     props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, first_name: first_name, last_name: last_name });
                                                    // }}

                                                    // onInput={(e) => {
                                                    //     let splitted = e.target.value.split(' ');
                                                    //     let first_name = splitted[0];

                                                    //     if (splitted.length > 1) {
                                                    //         first_name += ' ';
                                                    //     }

                                                    //     let last_name = '';

                                                    //     splitted.map((item, index) => {
                                                    //         if (index > 0) {
                                                    //             last_name += item;
                                                    //         }
                                                    //         return true;
                                                    //     })

                                                    //     props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, first_name: first_name, last_name: last_name });
                                                    // }}

                                                    value={(props.selectedLbCarrierInfoContact.first_name || '') + ((props.selectedLbCarrierInfoContact.last_name || '').trim() === '' ? '' : ' ' + props.selectedLbCarrierInfoContact.last_name)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={54 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Contact Phone"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierContactForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_work: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_work: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoContact.phone_work || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-phone-ext">
                                                <input tabIndex={55 + props.tabTimes} type="text" placeholder="Ext"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierContactForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_ext: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoContact({ ...props.selectedDispatchCarrierInfoContact, phone_ext: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoContact.phone_ext || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow" style={{ position: 'relative' }}>
                                                <input tabIndex={56 + props.tabTimes} type="text" placeholder="Equipments"
                                                    readOnly={true}
                                                    // ref={refCarrierEquipment}
                                                    // onKeyDown={carrierEquipmentOnKeydown}
                                                    // onInput={onEquipmentInput}
                                                    // onChange={onEquipmentInput}
                                                    value={props.selectedLbCarrierInfoDriver.equipment?.name || ''}
                                                />
                                                {/* <span className="fas fa-caret-down" style={{
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
                                                }}></span> */}
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow" style={{ position: 'relative' }}>
                                                <input tabIndex={57 + props.tabTimes} type="text" placeholder="Driver Name"
                                                    readOnly={true}
                                                    // ref={refDriverName}
                                                    // onKeyDown={validateCarrierDriverForSaving}
                                                    // onChange={(e) => {
                                                    //     let driver = props.selectedDispatchCarrierInfoDriver || {};

                                                    //     if (e.target.value === '') {
                                                    //         driver = {};
                                                    //         props.setSelectedDispatchCarrierInfoDriver({ ...driver });
                                                    //     } else {
                                                    //         let splitted = e.target.value.split(' ');
                                                    //         let first_name = splitted[0];

                                                    //         if (splitted.length > 1) {
                                                    //             first_name += ' ';
                                                    //         }

                                                    //         let last_name = '';

                                                    //         splitted.map((item, index) => {
                                                    //             if (index > 0) {
                                                    //                 last_name += item;
                                                    //             }
                                                    //             return true;
                                                    //         })

                                                    //         props.setSelectedDispatchCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });
                                                    //     }
                                                    // }}

                                                    // onInput={(e) => {
                                                    //     let driver = props.selectedDispatchCarrierInfoDriver || {};

                                                    //     if (e.target.value === '') {
                                                    //         driver = {};
                                                    //         props.setSelectedDispatchCarrierInfoDriver({ ...driver });
                                                    //     } else {
                                                    //         let splitted = e.target.value.split(' ');
                                                    //         let first_name = splitted[0];

                                                    //         if (splitted.length > 1) {
                                                    //             first_name += ' ';
                                                    //         }

                                                    //         let last_name = '';

                                                    //         splitted.map((item, index) => {
                                                    //             if (index > 0) {
                                                    //                 last_name += item;
                                                    //             }
                                                    //             return true;
                                                    //         })

                                                    //         props.setSelectedDispatchCarrierInfoDriver({ ...driver, first_name: first_name, last_name: last_name });
                                                    //     }
                                                    // }}

                                                    value={(props.selectedLbCarrierInfoDriver?.first_name || '') + ((props.selectedLbCarrierInfoDriver?.last_name || '').trim() === '' ? '' : ' ' + props.selectedLbCarrierInfoDriver?.last_name)}
                                                />
                                                {/* {
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
                                            } */}
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput tabIndex={58 + props.tabTimes}
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Driver Phone"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierDriverForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, phone: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, phone: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoDriver.phone || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container" style={{
                                                maxWidth: '5.8rem',
                                                minWidth: '5.8rem'
                                            }}>
                                                <input tabIndex={59 + props.tabTimes} type="text" placeholder="Unit Number"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierDriverForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, truck: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, truck: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoDriver.truck || ''}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container" style={{
                                                maxWidth: '5.8rem',
                                                minWidth: '5.8rem'
                                            }}>
                                                <input tabIndex={60 + props.tabTimes} type="text" placeholder="Trailer Number"
                                                    readOnly={true}
                                                    // onKeyDown={validateCarrierDriverForSaving}
                                                    // onInput={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, trailer: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedDispatchCarrierInfoDriver({ ...props.selectedDispatchCarrierInfoDriver, trailer: e.target.value }) }}
                                                    value={props.selectedLbCarrierInfoDriver.trailer || ''}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="form-v-sep"></div>
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
                                    </div> */}
                                    </div>
                                </div>

                                <div className="lb-form-row" style={{
                                    minHeight: '2.5rem',
                                    display: 'flex'
                                }}>
                                    <div className="pickups-container" style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className="lb-swiper-pickup-prev-btn"><span className="fas fa-chevron-left"></span></div>

                                        <Swiper
                                            slidesPerView={3}
                                            navigation={{
                                                prevEl: ".lb-swiper-pickup-prev-btn",
                                                nextEl: ".lb-swiper-pickup-next-btn"
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
                                                            'selected': props.selectedLbShipperCompanyInfo?.id === pickup.id,
                                                            'active': true,
                                                            'warning': statusClass === 'warning',
                                                            'expired': statusClass === 'expired'
                                                        })

                                                        return (
                                                            <SwiperSlide className={classes} key={index} onClick={() => {
                                                                props.setLbSelectedShipperCompanyInfo(pickup);

                                                                (pickup.contacts || []).map((contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        props.setLbSelectedShipperCompanyContact(contact);
                                                                    }

                                                                    return true;
                                                                })
                                                            }}>
                                                                <div>PU {index + 1}</div>
                                                                {/* <div className="pu-remove-btn" title="Remove this pickup" onClick={async (e) => {
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
                                                                await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });

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

                                                                        routing.map((item, i) => {
                                                                            params['waypoint' + i] = 'geo!' + item.zip_data.latitude.toString() + ',' + item.zip_data.longitude.toString();
                                                                            return true;
                                                                        });

                                                                        routingService.calculateRoute(params,
                                                                            (result) => {
                                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                                selected_order.miles = miles;

                                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.result === 'OK') {
                                                                                        await props.setLbSelectedOrder(res.order);

                                                                                        if (res.order.pickups.length === 0) {
                                                                                            props.setLbSelectedShipperCompanyInfo({});
                                                                                            props.setLbSelectedShipperCompanyContact({});
                                                                                        } else {
                                                                                            let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                                                return pu.id === props.selectedLbShipperCompanyInfo.id;
                                                                                            });

                                                                                            if (filteredPickups.length === 0) {
                                                                                                let lastPu = res.order.pickups[0];
                                                                                                props.setLbSelectedShipperCompanyInfo(lastPu);

                                                                                                if (lastPu.contacts.length > 0) {
                                                                                                    (lastPu.contacts || []).map((contact, i) => {
                                                                                                        if (contact.is_primary === 1) {
                                                                                                            props.setLbSelectedShipperCompanyContact(contact);
                                                                                                        }
                                                                                                        return true;
                                                                                                    })
                                                                                                } else {
                                                                                                    props.setLbSelectedShipperCompanyContact({});
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
                                                                                        await props.setLbSelectedOrder(res.order);

                                                                                        if (res.order.pickups.length === 0) {
                                                                                            props.setLbSelectedShipperCompanyInfo({});
                                                                                            props.setLbSelectedShipperCompanyContact({});
                                                                                        } else {
                                                                                            let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                                                return pu.id === props.selectedLbShipperCompanyInfo.id;
                                                                                            });

                                                                                            if (filteredPickups.length === 0) {
                                                                                                let lastPu = res.order.pickups[0];
                                                                                                props.setLbSelectedShipperCompanyInfo(lastPu);

                                                                                                if (lastPu.contacts.length > 0) {
                                                                                                    (lastPu.contacts || []).map((contact, i) => {
                                                                                                        if (contact.is_primary === 1) {
                                                                                                            props.setLbSelectedShipperCompanyContact(contact);
                                                                                                        }
                                                                                                        return true;
                                                                                                    })
                                                                                                } else {
                                                                                                    props.setLbSelectedShipperCompanyContact({});
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
                                                                                await props.setLbSelectedOrder(res.order);

                                                                                if (res.order.pickups.length === 0) {
                                                                                    props.setLbSelectedShipperCompanyInfo({});
                                                                                    props.setLbSelectedShipperCompanyContact({});
                                                                                } else {
                                                                                    let filteredPickups = res.order.pickups.filter((pu, i) => {
                                                                                        return pu.id === props.selectedLbShipperCompanyInfo.id;
                                                                                    });

                                                                                    if (filteredPickups.length === 0) {
                                                                                        let lastPu = res.order.pickups[0];
                                                                                        props.setLbSelectedShipperCompanyInfo(lastPu);

                                                                                        if (lastPu.contacts.length > 0) {
                                                                                            (lastPu.contacts || []).map((contact, i) => {
                                                                                                if (contact.is_primary === 1) {
                                                                                                    props.setLbSelectedShipperCompanyContact(contact);
                                                                                                }
                                                                                                return true;
                                                                                            })
                                                                                        } else {
                                                                                            props.setLbSelectedShipperCompanyContact({});
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
                                                            </div> */}
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                    : ''
                                            }

                                            {/* {
                                            (props.selected_order?.pickups || []).filter((pu, i) => {
                                                return pu.id === 0;
                                            }).length === 0
                                            && <SwiperSlide className="order-pickup adding" title="Add new pickup" onClick={() => {
                                                // if ((props.selected_order?.id || 0) === 0) {
                                                //     window.alert('You must create or load an order first!');
                                                //     props.setLbSelectedShipperCompanyInfo({});
                                                //     props.setLbSelectedShipperCompanyContact({});
                                                //     return;
                                                // }

                                                let pickups = props.selected_order?.pickups || [];
                                                pickups.push({ id: 0 });
                                                props.setLbSelectedShipperCompanyInfo({ id: 0 });
                                                props.setLbSelectedShipperCompanyContact({});
                                                props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups })
                                            }}>
                                                <div><span className="fas fa-plus"></span></div>
                                            </SwiperSlide>
                                        } */}
                                        </Swiper>

                                        <div className="lb-swiper-pickup-next-btn"><span className="fas fa-chevron-right"></span></div>
                                    </div>

                                    <div className="form-h-sep"></div>
                                    <div className='mochi-button' onClick={() => {
                                        if ((props.selected_order?.id || 0) === 0) {
                                            window.alert('You must create or load an order first!');
                                            return;
                                        }

                                        if (!props.dispatchOpenedPanels.includes('lb-routing')) {
                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-routing']);
                                        };
                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Routing</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                    <div className="form-h-sep"></div>
                                    <div className="deliveries-container" style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className="lb-swiper-delivery-prev-btn"><span className="fas fa-chevron-left"></span></div>

                                        <Swiper
                                            slidesPerView={3}
                                            navigation={{
                                                prevEl: ".lb-swiper-delivery-prev-btn",
                                                nextEl: ".lb-swiper-delivery-next-btn"
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
                                                            'selected': props.selectedLbConsigneeCompanyInfo?.id === delivery.id,
                                                            'active': true,
                                                            'warning': statusClass === 'warning',
                                                            'expired': statusClass === 'expired'
                                                        })

                                                        return (
                                                            <SwiperSlide className={classes} key={index} onClick={() => {
                                                                props.setLbSelectedConsigneeCompanyInfo(delivery);

                                                                (delivery.contacts || []).map((contact, index) => {
                                                                    if (contact.is_primary === 1) {
                                                                        props.setLbSelectedConsigneeCompanyContact(contact);
                                                                    }

                                                                    return true;
                                                                })
                                                            }}>
                                                                <div>Delivery {index + 1}</div>
                                                                {/* <div className="delivery-remove-btn" title="Remove this delivery" onClick={async (e) => {
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
                                                                await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });


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

                                                                        routing.map((item, i) => {
                                                                            params['waypoint' + i] = 'geo!' + item.zip_data.latitude.toString() + ',' + item.zip_data.longitude.toString();
                                                                            return true;
                                                                        });

                                                                        routingService.calculateRoute(params,
                                                                            (result) => {
                                                                                let miles = result.response.route[0].summary.distance || 0;

                                                                                selected_order.miles = miles;

                                                                                $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                                                                                    if (res.result === 'OK') {
                                                                                        await props.setLbSelectedOrder(res.order);

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
                                                                                        await props.setLbSelectedOrder(res.order);

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
                                                                                await props.setLbSelectedOrder(res.order);

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
                                                            </div> */}
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                    : ''
                                            }

                                            {/* {
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
                                                props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries })
                                            }}>
                                                <div><span className="fas fa-plus"></span></div>
                                            </SwiperSlide>
                                        } */}
                                        </Swiper>

                                        <div className="lb-swiper-delivery-next-btn"><span className="fas fa-chevron-right"></span></div>
                                    </div>
                                </div>


                                <div className="lb-form-row">
                                    <div className='form-bordered-box'>
                                        <div className='form-header'>
                                            <div className='top-border top-border-left'></div>
                                            <div className='form-title'>Shipper</div>
                                            <div className='top-border top-border-middle'></div>
                                            <div className='form-buttons'>
                                                {/* <div className='mochi-button' onClick={shipperCompanySearch}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Search</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div> */}

                                                <div className='mochi-button' onClick={() => {
                                                    // if ((props.selectedShipperCompanyInfo.id || 0) === 0) {
                                                    //     window.alert('You must select a customer first!');
                                                    //     return;
                                                    // }

                                                    if (!props.dispatchOpenedPanels.includes('lb-shipper-company-info')) {
                                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-shipper-company-info'])
                                                    }
                                                }}>
                                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                    <div className='mochi-button-base'>Company info</div>
                                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                                </div>
                                                {
                                                    showingShipperSecondPage &&
                                                    <div className='mochi-button' onClick={() => { setShowingShipperSecondPage(false) }}>
                                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                        <div className='mochi-button-base'>1st Page</div>
                                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                                    </div>
                                                }
                                                {
                                                    !showingShipperSecondPage &&
                                                    <div className='mochi-button' onClick={() => { setShowingShipperSecondPage(true) }}>
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
                                                    readOnly={true}
                                                    // onKeyDown={getShipperCompanyByCode}
                                                    // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, code: e.target.value }) }}
                                                    value={(props.selectedLbShipperCompanyInfo.code || '') + ((props.selectedLbShipperCompanyInfo.code_number || 0) === 0 ? '' : props.selectedLbShipperCompanyInfo.code_number)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={17 + props.tabTimes} type="text" placeholder="Name"
                                                    readOnly={true}
                                                    // onKeyDown={validateShipperCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, name: e.target.value }) }}
                                                    value={props.selectedLbShipperCompanyInfo.name || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-slider">
                                            <div className="form-slider-wrapper" style={{ left: !showingShipperSecondPage ? 0 : '-100%' }}>
                                                <div className="first-page">
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={18 + props.tabTimes} type="text" placeholder="Address 1"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address1: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.address1 || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={19 + props.tabTimes} type="text" placeholder="Address 2"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, address2: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.address2 || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={20 + props.tabTimes} type="text" placeholder="City"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, city: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.city || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-state">
                                                            <input tabIndex={21 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, state: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.state || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-zip-code">
                                                            <input tabIndex={22 + props.tabTimes} type="text" placeholder="Postal Code"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, zip: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.zip || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={23 + props.tabTimes} type="text" placeholder="Contact Name"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyContactForSaving}
                                                                // onChange={(e) => {
                                                                //     let splitted = e.target.value.split(' ');
                                                                //     let first_name = splitted[0];

                                                                //     if (splitted.length > 1) {
                                                                //         first_name += ' ';
                                                                //     }


                                                                //     let last_name = '';

                                                                //     splitted.map((item, index) => {
                                                                //         if (index > 0) {
                                                                //             last_name += item;
                                                                //         }
                                                                //         return true;
                                                                //     })

                                                                //     props.setSelectedShipperCompanyContact({ ...props.selectedShipperCompanyContact, first_name: first_name, last_name: last_name });
                                                                // }}

                                                                // onInput={(e) => {
                                                                //     let splitted = e.target.value.split(' ');
                                                                //     let first_name = splitted[0];

                                                                //     if (splitted.length > 1) {
                                                                //         first_name += ' ';
                                                                //     }

                                                                //     let last_name = '';

                                                                //     splitted.map((item, index) => {
                                                                //         if (index > 0) {
                                                                //             last_name += item;
                                                                //         }
                                                                //         return true;
                                                                //     })

                                                                //     props.setSelectedShipperCompanyContact({ ...props.selectedShipperCompanyContact, first_name: first_name, last_name: last_name });
                                                                // }}

                                                                value={(props.selectedLbShipperCompanyContact?.first_name || '') + ((props.selectedLbShipperCompanyContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedLbShipperCompanyContact?.last_name)}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-phone">
                                                            <MaskedInput tabIndex={24 + props.tabTimes}
                                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={true}
                                                                type="text" placeholder="Contact Phone"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyContactForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, contact_phone: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.contact_phone || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-phone-ext">
                                                            <input tabIndex={25 + props.tabTimes} type="text" placeholder="Ext"
                                                                readOnly={true}
                                                                // onKeyDown={validateShipperCompanyContactForSaving}
                                                                // onInput={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, ext: e.target.value }) }}
                                                                value={props.selectedLbShipperCompanyInfo.ext || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="second-page" onFocus={() => { setShowingShipperSecondPage(true) }}>
                                                    <div className="form-row" style={{ alignItems: 'center' }}>
                                                        <div className="input-box-container grow">
                                                            <MaskedInput tabIndex={26 + props.tabTimes}
                                                                // ref={refPickupDate1}
                                                                mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={false}
                                                                type="text" placeholder="PU Date 1"
                                                                readOnly={true}
                                                                // onKeyDown={async (e) => {
                                                                //     e.stopPropagation();
                                                                //     let key = e.keyCode || e.which;
                                                                //     await setPuDate1KeyCode(key);

                                                                //     let puDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.extra_data?.pu_date1 || ''), 'MM/DD/YYYY');
                                                                //     await setPreSelectedPickupDate1(puDate1);
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};

                                                                //     if (key === 13) {
                                                                //         extra_data.pu_date1 = preSelectedPickupDate1.clone().format('MM/DD/YYYY');

                                                                //         await setIsPickupDate1CalendarShown(false);
                                                                //         await setIsPickupDate2CalendarShown(false);
                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //     }

                                                                //     if (key >= 37 && key <= 40) {
                                                                //         if (isPickupDate1CalendarShown) {
                                                                //             e.preventDefault();

                                                                //             if (key === 37) { // left - minus 1
                                                                //                 setPreSelectedPickupDate1(preSelectedPickupDate1.clone().subtract(1, 'day'));
                                                                //             }

                                                                //             if (key === 38) { // up - minus 7
                                                                //                 setPreSelectedPickupDate1(preSelectedPickupDate1.clone().subtract(7, 'day'));
                                                                //             }

                                                                //             if (key === 39) { // right - plus 1
                                                                //                 setPreSelectedPickupDate1(preSelectedPickupDate1.clone().add(1, 'day'));
                                                                //             }

                                                                //             if (key === 40) { // down - plus 7
                                                                //                 setPreSelectedPickupDate1(preSelectedPickupDate1.clone().add(7, 'day'));
                                                                //             }

                                                                //             await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //             let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //                 if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                     pu.extra_data = extra_data;
                                                                //                 }
                                                                //                 return pu;
                                                                //             });

                                                                //             await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //             await validateOrderForSaving({ keyCode: 9 });
                                                                //         }
                                                                //     }
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (puDate1KeyCode === 9) {
                                                                //         let formatted = getFormattedDates(e.target.value);
                                                                //         await props.setShipperPuDate1(formatted);
                                                                //         let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //         extra_data.pu_date1 = formatted;
                                                                //         await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //         let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //             if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                 pu.extra_data = extra_data;
                                                                //             }
                                                                //             return pu;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_date1 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_date1 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.pu_date1 || ''}
                                                            />

                                                            {/* <span className="fas fa-calendar-alt open-calendar-btn" onClick={async (e) => {
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
                                                        }}></span> */}
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={27 + props.tabTimes} type="text" placeholder="PU Time 1"
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     e.stopPropagation();
                                                                //     setPuTime1KeyCode(e.keyCode || e.which);
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (puTime1KeyCode === 9) {
                                                                //         let formatted = getFormattedHours(e.target.value);
                                                                //         await props.setShipperPuTime1(formatted);
                                                                //         let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //         extra_data.pu_time1 = formatted;
                                                                //         await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //         let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //             if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                 pu.extra_data = extra_data;
                                                                //             }
                                                                //             return pu;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_time1 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_time1 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.pu_time1 || ''}
                                                            />
                                                        </div>
                                                        <div style={{ minWidth: '1.5rem', fontSize: '0.7rem', textAlign: 'center' }}>To</div>
                                                        <div className="input-box-container grow">
                                                            <MaskedInput tabIndex={28 + props.tabTimes}
                                                                // ref={refPickupDate2}
                                                                mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={false}
                                                                type="text" placeholder="PU Date 2"
                                                                // onKeyDown={async (e) => {
                                                                //     e.stopPropagation();
                                                                //     let key = e.keyCode || e.which;
                                                                //     await setPuDate2KeyCode(key);

                                                                //     let puDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedShipperCompanyInfo?.extra_data?.pu_date2 || ''), 'MM/DD/YYYY');
                                                                //     await setPreSelectedPickupDate1(puDate2);
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};

                                                                //     if (key === 13) {
                                                                //         extra_data.pu_date2 = preSelectedPickupDate2.clone().format('MM/DD/YYYY');

                                                                //         await setIsPickupDate1CalendarShown(false);
                                                                //         await setIsPickupDate2CalendarShown(false);
                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //     }

                                                                //     if (key >= 37 && key <= 40) {
                                                                //         if (isPickupDate2CalendarShown) {
                                                                //             e.preventDefault();

                                                                //             if (key === 37) { // left - minus 1
                                                                //                 setPreSelectedPickupDate2(preSelectedPickupDate2.clone().subtract(1, 'day'));
                                                                //             }

                                                                //             if (key === 38) { // up - minus 7
                                                                //                 setPreSelectedPickupDate2(preSelectedPickupDate2.clone().subtract(7, 'day'));
                                                                //             }

                                                                //             if (key === 39) { // right - plus 1
                                                                //                 setPreSelectedPickupDate2(preSelectedPickupDate2.clone().add(1, 'day'));
                                                                //             }

                                                                //             if (key === 40) { // down - plus 7
                                                                //                 setPreSelectedPickupDate2(preSelectedPickupDate2.clone().add(7, 'day'));
                                                                //             }

                                                                //             await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //             let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //                 if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                     pu.extra_data = extra_data;
                                                                //                 }
                                                                //                 return pu;
                                                                //             });

                                                                //             await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //             await validateOrderForSaving({ keyCode: 9 });
                                                                //         }
                                                                //     }
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (puDate2KeyCode === 9) {
                                                                //         let formatted = getFormattedDates(e.target.value);
                                                                //         await props.setShipperPuDate2(formatted);
                                                                //         let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //         extra_data.pu_date2 = formatted;
                                                                //         await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //         let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //             if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                 pu.extra_data = extra_data;
                                                                //             }
                                                                //             return pu;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_date2 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_date2 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.pu_date2 || ''}
                                                            />

                                                            {/* <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
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
                                                        }}></span> */}
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={29 + props.tabTimes} type="text" placeholder="PU Time 2"
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     e.stopPropagation();
                                                                //     setPuTime2KeyCode(e.keyCode || e.which);
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (puTime2KeyCode === 9) {
                                                                //         let formatted = getFormattedHours(e.target.value);
                                                                //         await props.setShipperPuTime2(formatted);
                                                                //         let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //         extra_data.pu_time2 = formatted;
                                                                //         await props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })

                                                                //         let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //             if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //                 pu.extra_data = extra_data;
                                                                //             }
                                                                //             return pu;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_time2 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.pu_time2 = e.target.value;
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.pu_time2 || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row" style={{ alignItems: 'center' }}>
                                                        <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                            {
                                                                (props.selectedLbShipperCompanyInfo?.extra_data?.bol_numbers || '').split(' ').map((item, index) => {
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
                                                                                {/* <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                                    extra_data.bol_numbers = (props.selectedShipperCompanyInfo?.extra_data?.bol_numbers || '').replace(item, '').trim()
                                                                                    props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                                }}></span> */}

                                                                                <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                })
                                                            }

                                                            {/* <input tabIndex={30 + props.tabTimes} type="text" placeholder="BOL Numbers"
                                                            ref={refBolNumbers}
                                                            onKeyDown={bolNumbersOnKeydown}
                                                            onInput={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                            onChange={(e) => { props.setShipperBolNumber(e.target.value) }}
                                                            value={props.shipperBolNumber || ''}
                                                        /> */}
                                                        </div>
                                                        <div style={{ minWidth: '1.5rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                                        <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                            {
                                                                (props.selectedLbShipperCompanyInfo?.extra_data?.po_numbers || '').split(' ').map((item, index) => {
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
                                                                                {/* <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                                    extra_data.po_numbers = (props.selectedShipperCompanyInfo?.extra_data?.po_numbers || '').replace(item, '').trim()
                                                                                    props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                                }}></span> */}

                                                                                <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                })
                                                            }
                                                            {/* <input tabIndex={31 + props.tabTimes} type="text" placeholder="PO Numbers"
                                                            ref={refPoNumbers}
                                                            onKeyDown={poNumbersOnKeydown}
                                                            onInput={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                            onChange={(e) => { props.setShipperPoNumber(e.target.value) }}
                                                            value={props.shipperPoNumber || ''}
                                                        /> */}
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row" style={{ alignItems: 'center' }}>
                                                        <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                            {
                                                                (props.selectedLbShipperCompanyInfo?.extra_data?.ref_numbers || '').split(' ').map((item, index) => {
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
                                                                                {/* <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                                    extra_data.ref_numbers = (props.selectedShipperCompanyInfo?.extra_data?.ref_numbers || '').replace(item, '').trim()
                                                                                    props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                                }}></span> */}

                                                                                <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                })
                                                            }
                                                            {/* <input tabIndex={32 + props.tabTimes} type="text" placeholder="REF Numbers"
                                                            ref={refRefNumbers}
                                                            onKeyDown={refNumbersOnKeydown}
                                                            onInput={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                            onChange={(e) => { props.setShipperRefNumber(e.target.value) }}
                                                            value={props.shipperRefNumber || ''}
                                                        /> */}
                                                        </div>
                                                        <div style={{ minWidth: '1.5rem', fontSize: '1rem', textAlign: 'center' }}></div>
                                                        <div className="input-box-container grow" style={{ flexGrow: 1, flexBasis: '100%' }}>
                                                            <input tabIndex={33 + props.tabTimes} type="text" placeholder="SEAL Number"
                                                                readOnly={true}
                                                                // onInput={async (e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.seal_number = e.target.value

                                                                //     let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //         if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //             pu.extra_data = extra_data;
                                                                //         }
                                                                //         return pu;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={async (e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.seal_number = e.target.value

                                                                //     let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //         if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //             pu.extra_data = extra_data;
                                                                //         }
                                                                //         return pu;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.seal_number || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row" style={{ alignItems: 'center' }}>
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={34 + props.tabTimes} type="text" placeholder="Special Instructions"
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     let key = e.keyCode || e.which;

                                                                //     if (key === 9) {
                                                                //         e.preventDefault();

                                                                //         goToTabindex((35 + props.tabTimes).toString());
                                                                //         props.setIsShowingShipperSecondPage(false);
                                                                //     }
                                                                // }}
                                                                // onInput={async (e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.special_instructions = e.target.value

                                                                //     let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //         if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //             pu.extra_data = extra_data;
                                                                //         }
                                                                //         return pu;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={async (e) => {
                                                                //     let extra_data = props.selectedShipperCompanyInfo?.extra_data || {};
                                                                //     extra_data.special_instructions = e.target.value

                                                                //     let pickups = (props.selected_order?.pickups || []).map((pu, i) => {
                                                                //         if (pu.id === props.selectedShipperCompanyInfo.id) {
                                                                //             pu.extra_data = extra_data;
                                                                //         }
                                                                //         return pu;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, pickups: pickups });
                                                                //     props.setSelectedShipperCompanyInfo({ ...props.selectedShipperCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbShipperCompanyInfo?.extra_data?.special_instructions || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-bordered-box'>
                                        <div className='form-header'>
                                            <div className='top-border top-border-left'></div>
                                            <div className='form-title'>Consignee</div>
                                            <div className='top-border top-border-middle'></div>
                                            <div className='form-buttons'>
                                                {/* <div className='mochi-button' onClick={consigneeCompanySearch}>
                                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                <div className='mochi-button-base'>Search</div>
                                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                            </div> */}
                                                <div className='mochi-button' onClick={() => {
                                                    // if ((props.selectedConsigneeCompanyInfo.id || 0) === 0) {
                                                    //     window.alert('You must select a customer first!');
                                                    //     return;
                                                    // }

                                                    if (!props.dispatchOpenedPanels.includes('lb-consignee-company-info')) {
                                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-consignee-company-info'])
                                                    }
                                                }}>
                                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                    <div className='mochi-button-base'>Company info</div>
                                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                                </div>
                                                {
                                                    showingConsigneeSecondPage &&
                                                    <div className='mochi-button' onClick={() => { setShowingConsigneeSecondPage(false) }}>
                                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                                        <div className='mochi-button-base'>1st Page</div>
                                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                                    </div>
                                                }
                                                {
                                                    !showingConsigneeSecondPage &&
                                                    <div className='mochi-button' onClick={() => { setShowingConsigneeSecondPage(true) }}>
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
                                                    readOnly={true}
                                                    // onKeyDown={getConsigneeCompanyByCode}
                                                    // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, code: e.target.value }) }}
                                                    value={(props.selectedLbConsigneeCompanyInfo.code || '') + ((props.selectedLbConsigneeCompanyInfo.code_number || 0) === 0 ? '' : props.selectedLbConsigneeCompanyInfo.code_number)}
                                                />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input tabIndex={36 + props.tabTimes} type="text" placeholder="Name"
                                                    readOnly={true}
                                                    // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                    // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value }) }}
                                                    // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, name: e.target.value }) }}
                                                    value={props.selectedLbConsigneeCompanyInfo.name || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-slider">
                                            <div className="form-slider-wrapper" style={{ left: !showingConsigneeSecondPage ? 0 : '-100%' }}>
                                                <div className="first-page">
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={37 + props.tabTimes} type="text" placeholder="Address 1"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address1: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.address1 || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={38 + props.tabTimes} type="text" placeholder="Address 2"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, address2: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.address2 || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={39 + props.tabTimes} type="text" placeholder="City"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, city: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.city || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-state">
                                                            <input tabIndex={40 + props.tabTimes} type="text" placeholder="State" maxLength="2"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, state: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.state || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-zip-code">
                                                            <input tabIndex={41 + props.tabTimes} type="text" placeholder="Postal Code"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyInfoForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, zip: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.zip || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-v-sep"></div>
                                                    <div className="form-row">
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={42 + props.tabTimes} type="text" placeholder="Contact Name"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyContactForSaving}
                                                                // onChange={(e) => {
                                                                //     let splitted = e.target.value.split(' ');
                                                                //     let first_name = splitted[0];

                                                                //     if (splitted.length > 1) {
                                                                //         first_name += ' ';
                                                                //     }


                                                                //     let last_name = '';

                                                                //     splitted.map((item, index) => {
                                                                //         if (index > 0) {
                                                                //             last_name += item;
                                                                //         }
                                                                //         return true;
                                                                //     })

                                                                //     props.setSelectedConsigneeCompanyContact({ ...props.selectedConsigneeCompanyContact, first_name: first_name, last_name: last_name });
                                                                // }}

                                                                // onInput={(e) => {
                                                                //     let splitted = e.target.value.split(' ');
                                                                //     let first_name = splitted[0];

                                                                //     if (splitted.length > 1) {
                                                                //         first_name += ' ';
                                                                //     }

                                                                //     let last_name = '';

                                                                //     splitted.map((item, index) => {
                                                                //         if (index > 0) {
                                                                //             last_name += item;
                                                                //         }
                                                                //         return true;
                                                                //     })

                                                                //     props.setSelectedConsigneeCompanyContact({ ...props.selectedConsigneeCompanyContact, first_name: first_name, last_name: last_name });
                                                                // }}

                                                                value={(props.selectedLbConsigneeCompanyContact?.first_name || '') + ((props.selectedLbConsigneeCompanyContact?.last_name || '').trim() === '' ? '' : ' ' + props.selectedLbConsigneeCompanyContact?.last_name)}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-phone">
                                                            <MaskedInput tabIndex={43 + props.tabTimes}
                                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={true}
                                                                type="text" placeholder="Contact Phone"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyContactForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contact_phone: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.contact_phone || ''}
                                                            />
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container input-phone-ext">
                                                            <input tabIndex={44 + props.tabTimes} type="text" placeholder="Ext"
                                                                readOnly={true}
                                                                // onKeyDown={validateConsigneeCompanyContactForSaving}
                                                                // onInput={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                                // onChange={(e) => { props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, ext: e.target.value }) }}
                                                                value={props.selectedLbConsigneeCompanyInfo.ext || ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="second-page" onFocus={() => { setShowingConsigneeSecondPage(true) }}>
                                                    <div className="form-row" style={{ alignItems: 'center' }}>
                                                        <div className="input-box-container grow">
                                                            <MaskedInput tabIndex={45 + props.tabTimes}
                                                                // ref={refDeliveryDate1}
                                                                mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={false}
                                                                type="text" placeholder="Delivery Date 1"
                                                                readOnly={true}
                                                                // onKeyDown={async (e) => {
                                                                //     e.stopPropagation();
                                                                //     let key = e.keyCode || e.which;
                                                                //     await setDeliveryDate1KeyCode(key);

                                                                //     let deliveryDate1 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date1 || ''), 'MM/DD/YYYY');
                                                                //     await setPreSelectedDeliveryDate1(deliveryDate1);
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};

                                                                //     if (key === 13) {
                                                                //         extra_data.delivery_date1 = preSelectedDeliveryDate1.clone().format('MM/DD/YYYY');

                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //     }

                                                                //     if (key >= 37 && key <= 40) {
                                                                //         if (isDeliveryDate1CalendarShown) {
                                                                //             e.preventDefault();

                                                                //             if (key === 37) { // left - minus 1
                                                                //                 setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().subtract(1, 'day'));
                                                                //             }

                                                                //             if (key === 38) { // up - minus 7
                                                                //                 setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().subtract(7, 'day'));
                                                                //             }

                                                                //             if (key === 39) { // right - plus 1
                                                                //                 setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().add(1, 'day'));
                                                                //             }

                                                                //             if (key === 40) { // down - plus 7
                                                                //                 setPreSelectedDeliveryDate1(preSelectedDeliveryDate1.clone().add(7, 'day'));
                                                                //             }

                                                                //             await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //             let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //                 if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                     delivery.extra_data = extra_data;
                                                                //                 }
                                                                //                 return delivery;
                                                                //             });

                                                                //             await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                //             await validateOrderForSaving({ keyCode: 9 });
                                                                //         }
                                                                //     }
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (deliveryDate1KeyCode === 9) {
                                                                //         let formatted = getFormattedDates(e.target.value);
                                                                //         await props.setConsigneeDeliveryDate1(formatted);
                                                                //         let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //         extra_data.delivery_date1 = formatted;
                                                                //         await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //         let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //             if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                 delivery.extra_data = extra_data;
                                                                //             }
                                                                //             return delivery;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_date1 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_date1 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbConsigneeCompanyInfo?.extra_data?.delivery_date1 || ''}
                                                            />

                                                            {/* <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
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
                                                        }}></span> */}
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={46 + props.tabTimes} type="text" placeholder="Delivery Time 1"
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     e.stopPropagation();
                                                                //     setDeliveryTime1KeyCode(e.keyCode || e.which);
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (deliveryTime1KeyCode === 9) {
                                                                //         let formatted = getFormattedHours(e.target.value);
                                                                //         await props.setConsigneeDeliveryTime1(formatted);
                                                                //         let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //         extra_data.delivery_time1 = formatted;
                                                                //         await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //         let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //             if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                 delivery.extra_data = extra_data;
                                                                //             }
                                                                //             return delivery;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_time1 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_time1 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbConsigneeCompanyInfo?.extra_data?.delivery_time1 || ''}
                                                            />
                                                        </div>
                                                        <div style={{ minWidth: '1.5rem', fontSize: '0.7rem', textAlign: 'center' }}>To</div>
                                                        <div className="input-box-container grow">
                                                            <MaskedInput tabIndex={47 + props.tabTimes}
                                                                // ref={refDeliveryDate2}
                                                                mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                                guide={false}
                                                                type="text" placeholder="Delivery Date 2"
                                                                readOnly={true}
                                                                // onKeyDown={async (e) => {
                                                                //     e.stopPropagation();
                                                                //     let key = e.keyCode || e.which;
                                                                //     await setDeliveryDate2KeyCode(key);

                                                                //     let deliveryDate2 = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(props.selectedConsigneeCompanyInfo?.extra_data?.delivery_date2 || ''), 'MM/DD/YYYY');
                                                                //     await setPreSelectedDeliveryDate2(deliveryDate2);
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};

                                                                //     if (key === 13) {
                                                                //         extra_data.delivery_date2 = preSelectedDeliveryDate2.clone().format('MM/DD/YYYY');

                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //         await setIsDeliveryDate1CalendarShown(false);
                                                                //         await setIsDeliveryDate2CalendarShown(false);
                                                                //     }

                                                                //     if (key >= 37 && key <= 40) {
                                                                //         if (isDeliveryDate2CalendarShown) {
                                                                //             e.preventDefault();

                                                                //             if (key === 37) { // left - minus 1
                                                                //                 setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().subtract(1, 'day'));
                                                                //             }

                                                                //             if (key === 38) { // up - minus 7
                                                                //                 setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().subtract(7, 'day'));
                                                                //             }

                                                                //             if (key === 39) { // right - plus 1
                                                                //                 setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().add(1, 'day'));
                                                                //             }

                                                                //             if (key === 40) { // down - plus 7
                                                                //                 setPreSelectedDeliveryDate2(preSelectedDeliveryDate2.clone().add(7, 'day'));
                                                                //             }

                                                                //             await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //             let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //                 if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                     delivery.extra_data = extra_data;
                                                                //                 }
                                                                //                 return delivery;
                                                                //             });

                                                                //             await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                //             await validateOrderForSaving({ keyCode: 9 });
                                                                //         }
                                                                //     }
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (deliveryDate2KeyCode === 9) {
                                                                //         let formatted = getFormattedDates(e.target.value);
                                                                //         await props.setConsigneeDeliveryDate2(formatted);
                                                                //         let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //         extra_data.delivery_date2 = formatted;
                                                                //         await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //         let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //             if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                 delivery.extra_data = extra_data;
                                                                //             }
                                                                //             return delivery;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_date2 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_date2 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbConsigneeCompanyInfo?.extra_data?.delivery_date2 || ''}
                                                            />

                                                            {/* <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
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
                                                        }}></span> */}
                                                        </div>
                                                        <div className="form-h-sep"></div>
                                                        <div className="input-box-container grow">
                                                            <input tabIndex={48 + props.tabTimes} type="text" placeholder="Delivery Time 2"
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     e.stopPropagation();
                                                                //     setDeliveryTime2KeyCode(e.keyCode || e.which);
                                                                // }}
                                                                // onBlur={async (e) => {
                                                                //     if (deliveryTime2KeyCode === 9) {
                                                                //         let formatted = getFormattedHours(e.target.value);
                                                                //         await props.setConsigneeDeliveryTime2(formatted);
                                                                //         let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //         extra_data.delivery_time2 = formatted;
                                                                //         await props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })

                                                                //         let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //             if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //                 delivery.extra_data = extra_data;
                                                                //             }
                                                                //             return delivery;
                                                                //         });

                                                                //         await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });

                                                                //         await validateOrderForSaving({ keyCode: 9 });
                                                                //     }
                                                                // }}
                                                                // onInput={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_time2 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={(e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.delivery_time2 = e.target.value;
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbConsigneeCompanyInfo?.extra_data?.delivery_time2 || ''}
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
                                                                readOnly={true}
                                                                // onKeyDown={(e) => {
                                                                //     let key = e.keyCode || e.which;

                                                                //     if (key === 9) {
                                                                //         e.preventDefault();

                                                                //         goToTabindex((35 + props.tabTimes).toString());
                                                                //         props.setIsShowingConsigneeSecondPage(false);
                                                                //     }
                                                                // }}
                                                                // onInput={async (e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.special_instructions = e.target.value

                                                                //     let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //         if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //             delivery.extra_data = extra_data;
                                                                //         }
                                                                //         return delivery;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                // onChange={async (e) => {
                                                                //     let extra_data = props.selectedConsigneeCompanyInfo?.extra_data || {};
                                                                //     extra_data.special_instructions = e.target.value

                                                                //     let deliveries = (props.selected_order?.deliveries || []).map((delivery, i) => {
                                                                //         if (delivery.id === props.selectedConsigneeCompanyInfo.id) {
                                                                //             delivery.extra_data = extra_data;
                                                                //         }
                                                                //         return delivery;
                                                                //     })

                                                                //     await props.setLbSelectedOrder({ ...props.selected_order, deliveries: deliveries });
                                                                //     props.setSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, extra_data: extra_data })
                                                                // }}
                                                                value={props.selectedLbConsigneeCompanyInfo?.extra_data?.special_instructions || ''}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        }

                    </div>

                    <div className="form-bordered-box">
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Loads Delivered but not Invoiced</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if (deliveredNotInvoiceOrders.length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = `<h2>Delivered But Not Invoiced Orders</h2></br></br>`;

                                    html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Order Number</div>
                                            <div style="min-width:20%;max-width:20%;text-decoration:underline">Carrier Code</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Starting City/State</div>
                                            <div style="min-width:30%;max-width:30%;text-decoration:underline">Destination City/State</div>
                                            
                                        </div>
                                        `;

                                    deliveredNotInvoiceOrders.map((item, index) => {
                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:20%;max-width:20%">${item.order_number}</div>
                                            <div style="min-width:20%;max-width:20%">${item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                            <div style="min-width:30%;max-width:30%">${item.pickups.length > 0
                                                ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                : ''
                                            }</div>
                                            <div style="min-width:30%;max-width:30%">${item.deliveries.length > 0
                                                ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                : ''
                                            }</div>
                                            
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

                        <div className="lb-form-container">
                            {
                                isLoading &&
                                <div className="loading-container">
                                    <Loader type="ThreeDots" color="#333738" height={20} width={20} active={true} />
                                </div>
                            }
                            <div className="lb-form-wrapper">
                                {
                                    deliveredNotInvoiceOrders.length > 0 &&
                                    <div className="lb-form-item">
                                        <div className="order-number">Order Number</div>
                                        <div className="carrier-code">Carrier Code</div>
                                        <div className="starting-city-state">Starting City/State</div>
                                        <div className="destination-city-state">Destination City/State</div>
                                    </div>
                                }
                                {
                                    deliveredNotInvoiceOrders.map((item, i) => {
                                        const itemClasses = classnames({
                                            'lb-form-item': true,
                                            'selected': (props.selected_order.id || 0) === item.id
                                        })
                                        return (
                                            <div className={itemClasses} key={i} onClick={() => { onOrderClick(item) }}>
                                                <div className="order-number">{item.order_number}</div>
                                                <div className="carrier-code">{item.carrier.code.toUpperCase() + (item.carrier.code_number === 0 ? '' : item.carrier.code_number)}</div>
                                                <div className="starting-city-state">{
                                                    item.pickups.length > 0
                                                        ? item.pickups[0].city + ', ' + item.pickups[0].state
                                                        : ''
                                                }</div>
                                                <div className="destination-city-state">{
                                                    item.deliveries.length > 0
                                                        ? item.deliveries[item.deliveries.length - 1].city + ', ' + item.deliveries[item.deliveries.length - 1].state
                                                        : ''
                                                }</div>
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
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        selected_order: state.dispatchReducers.lb_selected_order,
        selectedLbBillToCompanyInfo: state.customerReducers.selectedLbBillToCompanyInfo,
        selectedLbBillToCompanyContact: state.customerReducers.selectedLbBillToCompanyContact,
        lbBillToCompanySearch: state.customerReducers.lbBillToCompanySearch,
        selectedLbShipperCompanyInfo: state.customerReducers.selectedLbShipperCompanyInfo,
        selectedLbShipperCompanyContact: state.customerReducers.selectedLbShipperCompanyContact,
        lbShipperCompanySearch: state.customerReducers.lbShipperCompanySearch,
        selectedLbConsigneeCompanyInfo: state.customerReducers.selectedLbConsigneeCompanyInfo,
        selectedLbConsigneeCompanyContact: state.customerReducers.selectedLbConsigneeCompanyContact,
        lbConsigneeCompanySearch: state.customerReducers.lbConsigneeCompanySearch,
        selectedLbCarrierInfoCarrier: state.carrierReducers.selectedLbCarrierInfoCarrier,
        selectedLbCarrierInfoContact: state.carrierReducers.selectedLbCarrierInfoContact,
        selectedLbCarrierInfoDriver: state.carrierReducers.selectedLbCarrierInfoDriver,
    }
}

export default connect(mapStateToProps, {
    setDispatchOpenedPanels,
    setLbSelectedOrder,
    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbBillToCompanySearch,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbShipperCompanySearch,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanySearch,
    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoDriver
})(LoadBoard)