import React, { useRef } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import {
    setDispatchPanels
} from "./../../../../../actions";

function Order(props) {

    const refPage = useRef();

    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'order') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
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
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

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
                                <div style={{ marginBottom: 5 }}><span style={{ ...styleFieldName, fontSize: '0.9rem' }}>ORDER#</span> <span style={{ ...styleFieldData, fontSize: '0.9rem' }}>{props.order_number}</span></div>
                                <div><span style={{ ...styleFieldName, fontSize: '0.9rem' }}>TRIP#</span> <span style={{ ...styleFieldData, fontSize: '0.9rem' }}>{props.trip_number}</span></div>
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
                                        <span style={{ ...styleFieldData, color: '#4682B4' }}>{(props.selectedBillToCompanyInfo.code || '').toUpperCase()}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.name || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.address1 || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.city || '')}, {(props.selectedBillToCompanyInfo.state || '').toUpperCase()} {(props.selectedBillToCompanyInfo.zip || '')}</span>
                                    </div>

                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.contact_name || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.contact_phone || '')}</span>
                                    </div>
                                    <div style={{ ...styleFlexRow }}>
                                        <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                        <span style={{ ...styleFieldData }}>{(props.selectedBillToCompanyInfo.email || '').toLowerCase()}</span>
                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minWidth: '50%',
                                    maxWidth: '50%',
                                    padding: 10
                                }}>
                                    <div style={{ ...styleFlexCol, flexGrow: 1, marginRight: 10 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>PO Number:</span> <span style={{ ...styleFieldData }}>{props.shipperPoNumber}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>BOL Number:</span> <span style={{ ...styleFieldData }}>{props.shipperBolNumber}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Shipper Number:</span> <span style={{ ...styleFieldData }}>123456789AB</span></div>
                                        <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Commodity:</span> <span style={{ ...styleFieldData }}>Aluminium Shapes</span></div>
                                    </div>

                                    <div style={{ ...styleFlexCol, flexGrow: 1 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Division:</span> <span style={{ ...styleFieldData }}>{(props.division.name || '')}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 10 }}><span style={{ ...styleFieldName, marginRight: 5 }}>Load Type:</span> <span style={{ ...styleFieldData }}>{(props.load_type.name || '')}</span></div>
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
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>Expedited:</span> <span style={{ ...styleFieldData }}>{props.expedited === 0 ? 'NO' : 'YES'}</span></div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, marginRight: 5 }}>HaxMat:</span> <span style={{ ...styleFieldData }}>{props.hazMat === 0 ? 'NO' : 'YES'}</span></div>
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
                                    <div style={{ ...styleFlexCol}}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>SHIPPER:</span>
                                            <span style={{ ...styleFieldData, color: '#4682B4' }}>{(props.selectedShipperCompanyInfo.code || '').toUpperCase()}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.name || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.address1 || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.city || '')}, {(props.selectedShipperCompanyInfo.state || '').toUpperCase()} {(props.selectedShipperCompanyInfo.zip || '')}</span>
                                        </div>

                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.contact_name || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.contact_phone || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedShipperCompanyInfo.email || '').toLowerCase()}</span>
                                        </div>
                                    </div>

                                    <div style={{ ...styleFlexCol, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, flexGrow: 1 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, textDecoration: 'underline' }}>PICK UP TIMES</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>DATE:</span> <span style={{ ...styleFieldData }}>{props.shipperPuDate1}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>FROM:</span> <span style={{ ...styleFieldData }}>{props.shipperPuTime1}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>TO:</span> <span style={{ ...styleFieldData }}>{props.shipperPuTime2}</span></div>
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
                                            <span style={{ ...styleFieldData, color: '#4682B4' }}>{(props.selectedConsigneeCompanyInfo.code || '').toUpperCase()}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.name || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.address1 || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}></span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.city || '')}, {(props.selectedConsigneeCompanyInfo.state || '').toUpperCase()} {(props.selectedConsigneeCompanyInfo.zip || '')}</span>
                                        </div>

                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Contact:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.contact_name || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>Phone:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.contact_phone || '')}</span>
                                        </div>
                                        <div style={{ ...styleFlexRow }}>
                                            <span style={{ ...styleFieldName, minWidth: '4rem' }}>E-Mail:</span>
                                            <span style={{ ...styleFieldData }}>{(props.selectedConsigneeCompanyInfo.email || '').toLowerCase()}</span>
                                        </div>
                                    </div>

                                    <div style={{ ...styleFlexCol, justifyContent: 'center', alignItems: 'flex-start', flexGrow: 1, paddingLeft: 10 }}>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, textDecoration: 'underline' }}>DELIVERY TIMES</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>DATE:</span> <span style={{ ...styleFieldData }}>{props.consigneeDeliveryDate1}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>FROM:</span> <span style={{ ...styleFieldData }}>{props.consigneeDeliveryTime1}</span></div>
                                        <div style={{ ...styleFlexRow, marginBottom: 3 }}><span style={{ ...styleFieldName, width: '3rem' }}>TO:</span> <span style={{ ...styleFieldData }}>{props.consigneeDeliveryTime2}</span></div>
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
                                    <span style={{ ...styleFieldData, color: '#4682B4', marginBottom: 5 }}>CARRIER CODE</span>
                                    <span style={{ ...styleFieldData, marginBottom: 5 }}>CARRIER NAME</span>
                                    <span style={{ ...styleFieldData, marginBottom: 5 }}>ADDRESS</span>
                                    <span style={{ ...styleFieldData }}>CITY, ST ZIP</span>
                                </div>

                                <div style={{ ...styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Contact:</span> <span style={{ ...styleFieldData }}>FIRST LAST</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}>
                                        <span style={{ ...styleFieldName, width: '4rem' }}>Phone:</span><span style={{ ...styleFieldData, marginRight: 5 }}>555-123-4567</span>
                                        <span style={{ ...styleFieldName, width: '1.5rem' }}>Ext:</span><span style={{ ...styleFieldData }}>123</span>
                                    </div>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName, width: '4rem' }}>Contact:</span> <span style={{ ...styleFieldData }}>FIRST LAST</span></div>
                                </div>

                                <div style={{ ...styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <span style={{ ...styleFieldName, marginBottom: 5 }}>DRIVER INFORMATION</span>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Driver:</span> <span style={{ ...styleFieldData }}>FIRST LAST</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Phone:</span> <span style={{ ...styleFieldData }}>555-123-4567</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Unit:</span> <span style={{ ...styleFieldData }}>12345678</span></div>
                                    <div style={{ ...styleFlexRow, marginBottom: 5 }}><span style={{ ...styleFieldName, width: '4rem' }}>Trailer:</span> <span style={{ ...styleFieldData }}>T123456789</span></div>
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
                                        props.notesForCarrier.map((note, index) => {

                                            return (
                                                <div style={{ ...styleFieldData }}>{note.text}</div>
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
                                <div style={{ ...styleFlexRow, justifyContent: 'flex-start', marginBottom: 15 }}>
                                    <div style={{ ...styleFlexRow }}><span style={{ ...styleFieldName }}>EVENTS</span></div>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Date & Time</span>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Event</span>
                                    <span style={{ ...styleFieldName, width: '8rem', textDecoration: 'underline' }}>Event Location</span>
                                    <span style={{ ...styleFieldName, flexGrow: 1, textDecoration: 'underline' }}>Event Notes</span>
                                    <span style={{ ...styleFieldName, width: '3rem', textDecoration: 'underline' }}>User</span>
                                </div>

                                <div style={{ ...styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...styleFieldData, width: '8rem' }}>10/29/2020@19:30</span>
                                    <span style={{ ...styleFieldData, width: '8rem' }}>Loaded</span>
                                    <span style={{ ...styleFieldData, width: '8rem' }}>Abercrombie, SC</span>
                                    <span style={{ ...styleFieldData, flexGrow: 1 }}>Loaded at Shipper</span>
                                    <span style={{ ...styleFieldData, width: '3rem' }}>EV</span>
                                </div>
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

const mapStateToProps = state => {
    return {
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
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels
})(Order)