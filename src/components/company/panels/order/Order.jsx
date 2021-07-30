import React, { useRef } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

function Order(props) {

    const refPage = useRef();

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const styleFlexRow = {
        display: 'flex',
        flexDirection: 'row'
    }
    const styleFlexCol = {
        display: 'flex',
        flexDirection: 'column'
    }
    const styleFieldName = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '0.7rem'
    }
    const styleFieldData = {
        color: 'red',
        fontSize: '0.7rem'
    }
    const styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '0.7rem'
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
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="header-buttons" style={{ marginTop: 10, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                <div className="mochi-button" onClick={() => {
                    printWindow(refPage.current.innerHTML);
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Print</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">E-Mail Order</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>
            </div>

            <div className="content-viewer" style={{ flexGrow: 1, position: 'relative' }}>
                <div className="content-viewer-wrapper" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
                    <div ref={refPage} className="content-page" style={{
                        minWidth: '215.5mm',
                        minHeight: '279.4mm',
                        maxWidth: '215.5mm',
                        maxHeight: '279.4mm',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '0.9rem',
                        padding: '15mm 10mm'
                    }}>


                        <div style={{ ...styleFlexRow, marginBottom: 20 }}>
                            <div style={{ flexGrow: 1, flexBasis: '100%' }}>
                                <span style={{ ...styleFieldName, fontSize: '0.9rem' }}>Date:</span> <span style={{ ...styleFieldData, fontSize: '0.9rem' }}>{moment().format('MM/DD/YYYY@HH:mm')}</span>
                            </div>
                            <div style={{ flexGrow: 1, flexBasis: '100%', textAlign: 'center' }}>
                                <span style={{ ...styleFieldData, fontWeight: 'bold', fontSize: '1.2rem' }}>ET3 LOGISTICS, LLC</span>
                            </div>
                            <div style={{ flexGrow: 1, flexBasis: '100%', textAlign: 'right' }}>
                                <div style={{ marginBottom: 5 }}><span style={{ ...styleFieldName, fontSize: '0.9rem' }}>ORDER#</span> <span style={{ ...styleFieldData, fontSize: '0.9rem' }}>{props.selected_order?.order_number}</span></div>
                                <div><span style={{ ...styleFieldName, fontSize: '0.9rem' }}>TRIP#</span> <span style={{ ...styleFieldData, fontSize: '0.9rem' }}>{props.selected_order?.trip_number}</span></div>
                            </div>
                        </div>

                        <div style={{
                            ...styleFlexCol,
                            flexGrow: 1,
                            border: '1px solid rgba(0,0,0,0.5)',
                            borderRadius: 5,
                            boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                // flexGrow: 1,
                                ...styleFlexRow
                            }}>


                                <div style={{
                                    ...styleFlexCol,
                                    minWidth: '50%',
                                    maxWidth: '50%',
                                    borderRight: '1px solid rgba(0,0,0,0.5)',
                                    padding: 10
                                }}>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>Bill To:</span>
                                        <span style={{ ...styleFieldData, color: '#4682B4' }}>{
                                            ((props.selected_order.bill_to_company?.code || '') +
                                                ((props.selected_order.bill_to_company?.code_number || 0) === 0 ? '' : props.selected_order.bill_to_company.code_number))
                                                .toUpperCase()
                                        }</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selected_order.bill_to_company?.name || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selected_order.bill_to_company?.address1 || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selected_order.bill_to_company?.city || '')}, {(props.selected_order.bill_to_company?.state || '').toUpperCase()} {(props.selected_order.bill_to_company?.zip || '')}</span>
                                    </div>

                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                        <span style={{ ...styleFieldData }}>{
                                            props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1) === -1
                                                ? ''
                                                : props.selected_order.bill_to_company?.contacts[props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1)].first_name + ' ' +
                                                props.selected_order.bill_to_company?.contacts[props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1)].last_name
                                        }</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                        <span style={{ ...styleFieldData }}>{
                                            props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1) === -1
                                                ? ''
                                                : props.selected_order.bill_to_company?.contacts[props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1)].phone_work
                                        }</span>
                                    </div>
                                    <div style={{ ...styleFlexRow }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                        <span style={{ ...styleFieldData }}>{
                                            (props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1) === -1
                                                ? ''
                                                : props.selected_order.bill_to_company?.contacts[props.selected_order.bill_to_company?.contacts.findIndex(el => el.is_primary === 1)].email_work).toLowerCase()
                                        }</span>
                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minWidth: '50%',
                                    maxWidth: '50%',
                                    padding: 10
                                }}>
                                    <div style={{ ...styleFlexCol, flexGrow: 1, marginRight: 10 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>PO Numbers:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.pickups.length === 0 ? ''
                                                : (props.selected_order.pickups[0].po_numbers || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>BOL Numbers:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.pickups.length === 0 ? ''
                                                : (props.selected_order.pickups[0].bol_numbers || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Shipper Number:</span> <span style={{ ...styleFieldData }}>123456789AB</span></div>
                                        <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Commodity:</span> <span style={{ ...styleFieldData }}>Aluminium Shapes</span></div>
                                    </div>

                                    <div style={{ ...styleFlexCol, flexGrow: 1 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Division:</span> <span style={{ ...styleFieldData }}>{(props.selected_order?.division || '')}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Load Type:</span> <span style={{ ...styleFieldData }}>{(props.selected_order?.load_type || '')}</span></div>
                                        <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Total Charges:</span> <span style={{ ...styleFieldData }}>$50,000.00</span></div>
                                    </div>
                                </div>
                            </div>



                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                padding: 10,
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFlexRow, justifyContent: 'space-evenly', marginBottom: 15 }}>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName }}>ORDER INFORMATION</span></div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Equipment:</span> <span style={{ ...styleFieldData }}>REMOVABLE GOOSE NECK</span></div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Expedited:</span> <span style={{ ...styleFieldData }}>{props.selected_order?.expedited === 1 ? 'YES' : 'NO'}</span></div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>HaxMat:</span> <span style={{ ...styleFieldData }}>{props.selected_order?.haz_mat === 1 ? 'YES' : 'NO'}</span></div>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldName, width: '4rem', textDecoration: 'underline' }}>Pieces</span>
                                    <span style={{ ...styleFieldName, width: '4rem', textDecoration: 'underline' }}>Type</span>
                                    <span style={{ ...styleFieldName, width: '5rem', textDecoration: 'underline' }}>Weight</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, textDecoration: 'underline' }}>Description</span>
                                    <span style={{ ...styleFieldName, width: '5rem', textDecoration: 'underline' }}>Rate</span>
                                    <span style={{ ...styleFieldName, width: '5rem', textDecoration: 'underline' }}>Descriptor</span>
                                    <span style={{ ...styleFieldName, width: '5rem', textDecoration: 'underline' }}>Charges</span>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldData, width: '4rem' }}>1,000</span>
                                    <span style={{ ...styleFieldData, width: '4rem' }}>Boxes</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>2,000</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1 }}>Boxes of stuff</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>$2.00</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>Weight</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>$4,000.00</span>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldData, width: '4rem' }}>50</span>
                                    <span style={{ ...styleFieldData, width: '4rem' }}>Skids</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>10,000</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1 }}>Skids of junk</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>$2,000.00</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>Skid</span>
                                    <span style={{ ...styleFieldData, width: '5rem' }}>$46,000.00</span>
                                </div>
                            </div>




                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                ...styleFlexRow
                            }}>
                                <div style={{
                                    ...styleFlexRow,
                                    minWidth: '50%',
                                    maxWidth: '50%',
                                    padding: 10,
                                    borderRight: '1px solid rgba(0,0,0,0.5)',
                                }}>
                                    <div style={{ ...styleFlexCol }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>SHIPPER:</span>
                                            <span style={{ ...styleFieldData, color: '#4682B4' }}>{
                                                props.selected_order.pickups.length === 0 ? ''
                                                    : ((props.selected_order.pickups[0].customer.code) + ((props.selected_order.pickups[0].customer.code_number || 0) === 0 ? '' : props.selected_order.pickups[0].customer.code_number)).toUpperCase()
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{props.selected_order.pickups.length === 0 ? '' : props.selected_order.pickups[0].customer.name}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{props.selected_order.pickups.length === 0 ? '' : props.selected_order.pickups[0].customer.address1}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>
                                                {props.selected_order.pickups.length === 0 ? '' : props.selected_order.pickups[0].customer.city}, {props.selected_order.pickups.length === 0 ? '' : props.selected_order.pickups[0].customer.state.toUpperCase()} {props.selected_order.pickups.length === 0 ? '' : props.selected_order.pickups[0].customer.zip}
                                            </span>
                                        </div>

                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.pickups.length === 0 ? ''
                                                    : props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.pickups[0].customer.contacts[props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1)].first_name + ' ' +
                                                        props.selected_order.pickups[0].customer.contacts[props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1)].last_name
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.pickups.length === 0 ? ''
                                                    : props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.pickups[0].customer.contacts[props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1)].phone_work
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                            <span style={{ ...styleFieldData }}>{
                                                (props.selected_order.pickups.length === 0 ? ''
                                                    : props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.pickups[0].customer.contacts[props.selected_order.pickups[0].customer.contacts.findIndex(el => el.is_primary === 1)].email_work).toLowerCase()
                                            }</span>
                                        </div>
                                    </div>

                                    <div style={{ ...styleFlexCol, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, flexGrow: 1 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, textDecoration: 'underline' }}>PICK UP TIMES</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>DATE:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.pickups.length === 0 ? '' : (props.selected_order.pickups[0].pu_date1 || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>FROM:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.pickups.length === 0 ? '' : (props.selected_order.pickups[0].pu_time1 || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>TO:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.pickups.length === 0 ? '' : (props.selected_order.pickups[0].pu_time2 || '')
                                        }</span></div>
                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minWidth: '50%',
                                    maxWidth: '50%',
                                    padding: 10,
                                    overflowY: 'hidden'
                                }}>
                                    <div style={{ ...styleFlexCol }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>CONSIGNEE:</span>
                                            <span style={{ ...styleFieldData, color: '#4682B4' }}>{
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : ((props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.code) + ((props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.code_number || 0) === 0 ? '' : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.code_number)).toUpperCase()
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.name
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.address1
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{props.selected_order.deliveries.length === 0 ? ''
                                                : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.city}, {(props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.state).toUpperCase()} {props.selected_order.deliveries.length === 0 ? ''
                                                        : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.zip}</span>
                                        </div>

                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts[props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1)].first_name + ' ' +
                                                        props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts[props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1)].last_name
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                            <span style={{ ...styleFieldData }}>{
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts[props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1)].phone_work
                                            }</span>
                                        </div>
                                        <div style={{ ...styleFlexRow }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                            <span style={{ ...styleFieldData }}>{(
                                                props.selected_order.deliveries.length === 0 ? ''
                                                    : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1) === -1
                                                        ? ''
                                                        : props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts[props.selected_order.deliveries[props.selected_order.deliveries.length - 1].customer.contacts.findIndex(el => el.is_primary === 1)].email_work
                                            ).toLowerCase()}</span>
                                        </div>
                                    </div>

                                    <div style={{ ...styleFlexCol, justifyContent: 'center', alignItems: 'flex-start', flexGrow: 1, paddingLeft: 10 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, textDecoration: 'underline' }}>DELIVERY TIMES</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>DATE:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.deliveries.length === 0 ? '' : (props.selected_order.deliveries[props.selected_order.deliveries.length - 1].delivery_date1 || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>FROM:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.deliveries.length === 0 ? '' : (props.selected_order.deliveries[props.selected_order.deliveries.length - 1].delivery_time1 || '')
                                        }</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>TO:</span> <span style={{ ...styleFieldData }}>{
                                            props.selected_order.deliveries.length === 0 ? '' : (props.selected_order.deliveries[props.selected_order.deliveries.length - 1].delivery_time2 || '')
                                        }</span></div>
                                    </div>
                                </div>
                            </div>




                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                ...styleFlexRow,
                                justifyContent: 'space-between',
                                padding: 10
                            }}>

                                <div style={{ ...styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <span style={{ ...styleFieldName, marginBottom: 5 }}>CARRIER INFORMATION</span>
                                    <span style={{ ...styleFieldData, color: '#4682B4', marginBottom: 5 }}>{
                                        ((props.selected_order.carrier?.code || '') + ((props.selected_order.carrier?.code_number || 0) === 0 ? '' : props.selected_order.carrier.code_number)).toUpperCase()
                                    }</span>
                                    <span style={{ ...styleFieldData, marginBottom: 5 }}>{(props.selected_order.carrier?.name || '')}</span>
                                    <span style={{ ...styleFieldData, marginBottom: 5 }}>{(props.selected_order.carrier?.address1 || '')}</span>
                                    <span style={{ ...styleFieldData }}>{(props.selected_order.carrier?.city || '')}, {(props.selected_order.carrier?.state || '').toUpperCase()} {(props.selected_order.carrier?.zip || '')}</span>
                                </div>

                                <div style={{ ...styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Contact:</span> <span style={{ ...styleFieldData }}>{
                                        props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1) === -1
                                            ? ''
                                            : props.selected_order.carrier?.contacts[props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1)].first_name + ' ' +
                                            props.selected_order.carrier?.contacts[props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1)].last_name
                                    }</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}>
                                        <span style={{ ...styleFieldName, width: '4rem' }}>Phone:</span><span style={{ ...styleFieldData, marginRight: 5 }}>{
                                            props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1) === -1
                                                ? ''
                                                : props.selected_order.carrier?.contacts[props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1)].phone_work
                                        }</span>
                                        <span style={{ ...styleFieldName, width: '1.5rem' }}>Ext:</span><span style={{ ...styleFieldData }}>{
                                            props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1) === -1
                                                ? ''
                                                : props.selected_order.carrier?.contacts[props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1)].phone_ext
                                        }</span>
                                    </div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, width: '4rem' }}>E-Mail:</span> <span style={{ ...styleFieldData }}>{(
                                        props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1) === -1
                                            ? ''
                                            : props.selected_order.carrier?.contacts[props.selected_order.carrier?.contacts.findIndex(el => el.is_primary === 1)].email_work
                                    ).toLowerCase()}</span></div>
                                </div>

                                <div style={{ ...styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <span style={{ ...styleFieldName, marginBottom: 5 }}>DRIVER INFORMATION</span>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Driver:</span> <span style={{ ...styleFieldData }}>{(props.selected_order.driver?.first_name || '')} {(props.selected_order.driver?.last_name || '')}</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Phone:</span> <span style={{ ...styleFieldData }}>{(props.selected_order.driver?.phone || '')}</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Unit:</span> <span style={{ ...styleFieldData }}>{(props.selected_order.driver?.truck || '')}</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Trailer:</span> <span style={{ ...styleFieldData }}>{(props.selected_order.driver?.trailer || '')}</span></div>
                                </div>

                            </div>


                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1,
                                padding: 10,
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFieldName, marginBottom: 15 }}>NOTES FOR CARRIER</div>
                                <div style={{ ...styleFieldData, ...styleFlexCol }}>
                                    {
                                        (props.selected_order?.notes_for_carrier || []).map((note, index) => {

                                            return (
                                                <div style={{ ...styleFieldData }} key={index}>{note.text}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>



                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1,
                                padding: 10
                            }}>
                                <div style={{ ...styleFlexRow, justifyContent: 'flex-start', marginBottom: 5 }}>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName }}>EVENTS</span></div>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Date & Time</span>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Event</span>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Event Location</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, textDecoration: 'underline' }}>Event Notes</span>
                                    <span style={{ ...styleFieldName, width: '3rem', textDecoration: 'underline' }}>User</span>
                                </div>

                                {
                                    props.selected_order.events.map((item, index) => {

                                        return (
                                            <div key={index} style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 5 }}>
                                                <span style={{ ...styleFieldData, width: '8rem' }}>{item.event_date}@{item.event_time}</span>
                                                <span style={{ ...styleFieldData, width: '8rem' }}>{item.event_type.toUpperCase()}</span>
                                                <span style={{ ...styleFieldData, width: '8rem' }}>{item.event_location}</span>
                                                <span style={{ ...styleFieldData, flexGrow: 1 }}>{item.event_notes}</span>
                                                <span style={{ ...styleFieldData, width: '3rem' }}>{item.user_id}</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>



                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1,
                                padding: 10
                            }}>
                                <div style={{ ...styleFlexRow, justifyContent: 'flex-start', marginBottom: 15 }}>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName }}>TOTALS</span></div>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Pieces</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Weight</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Charges</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Order Cost</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Profit</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Percentage</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Miles</span>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>1,050</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>10,200 lbs</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$50,000.00</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$45,000.00</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$5,000.00</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>10%</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1, flexBasis: '100%' }}>22,000</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(Order)