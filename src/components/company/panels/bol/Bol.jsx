import React, { useRef } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

function Bol(props) {

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
        color: 'black',
        fontSize: '0.7rem'
    }
    const styleTitleBackground = {
        backgroundColor: 'lightgray'
    }
    const styleFieldDataBold = {
        color: 'black',
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
                    <div className="mochi-button-base">E-Mail Bol</div>
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

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(0,0,0,0.3)',
                            borderRadius: 5
                        }}>
                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                ...styleFlexRow,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <div style={{ ...styleFlexCol, width: '10rem', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <div style={{ ...styleFieldName, marginBottom: 5 }}>PICK-UP DATE</div>
                                    <div style={{ ...styleFieldData }}>April 4, 2019</div>
                                </div>

                                <div style={{ ...styleFlexCol, flexGrow: 1, flexBasis: '100%', alignItems: 'center' }}>
                                    <div style={{ ...styleFieldName, fontSize: '1rem' }}>BILL OF LADING – SHORT FORM – NOT NEGOTIABLE</div>
                                </div>

                                <div style={{ ...styleFlexCol, width: '10rem', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <div style={{ ...styleFieldName, marginBottom: 5 }}>DELIVERY DATE</div>
                                    <div style={{ ...styleFieldData }}>April 5, 2019</div>
                                </div>
                            </div>




                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                ...styleFlexRow
                            }}>
                                <div style={{ flexGrow: 1, flexBasis: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', ...styleFlexCol }}>
                                    <div style={{
                                        ...styleTitleBackground,
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        SHIP FROM
                                    </div>
                                    <div style={{ ...styleFieldData, padding: 10 }}>
                                        ALLEN HOLDINGS INC <br />
                                        16397 FILBER ST LOT 12 <br />
                                        SYLMAR, CA 91342
                                    </div>
                                </div>

                                <div style={{ flexGrow: 1, flexBasis: '100%' }}>

                                </div>
                            </div>








                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                ...styleFlexRow
                            }}>
                                <div style={{ flexGrow: 1, flexBasis: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', ...styleFlexCol }}>
                                    <div style={{
                                        ...styleTitleBackground,
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        SHIP TO
                                    </div>
                                    <div style={{ ...styleFieldData, padding: 10 }}>
                                        INTELSAT GLOBAL SERVICE CORP <br />
                                        C/O ALLEN HOLDINGS INC <br />
                                        17625 TECHNOLOGY BLVD <br />
                                        HAGERSTOWN, MD 21740
                                    </div>
                                </div>

                                <div style={{ flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        Shipping Order Number:
                                    </div>
                                </div>
                            </div>



                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                ...styleFlexRow
                            }}>
                                <div style={{ flexGrow: 1, flexBasis: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', ...styleFlexCol }}>
                                    <div style={{
                                        ...styleTitleBackground,
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        THIRD PARTY FREIGHT CHARGES BILL TO
                                    </div>
                                    <div style={{ ...styleFieldData, padding: 10 }}>

                                    </div>
                                </div>

                                <div style={{ flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        borderBottom: '1px solid rgba(0,0,0,0.3)',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        Carrier Name:
                                    </div>
                                    <div style={{ ...styleFieldData, padding: 10 }}>
                                        Trailer Number: <br /><br />
                                        <b>Serial Number(s):</b>
                                    </div>
                                </div>
                            </div>



                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                ...styleFlexRow
                            }}>
                                <div style={{ flexGrow: 1, flexBasis: '100%', borderRight: '1px solid rgba(0,0,0,0.3)', ...styleFlexCol }}>
                                    <div style={{
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        Special Instructions:
                                    </div>
                                    <div style={{ ...styleFieldData, padding: 10 }}>

                                    </div>
                                </div>

                                <div style={{ flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        Freight Charge Terms:
                                    </div>
                                    <div style={{
                                        ...styleFlexRow,
                                        ...styleFieldName,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: 5,
                                        fontSize: '0.5rem'
                                    }}>
                                        (Freight charges are prepaid unless marked otherwise)
                                    </div>
                                    <div style={{ ...styleFieldData, ...styleFlexRow, padding: 10, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">Prepaid</label><input type="checkbox" /></div>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">Collect</label><input type="checkbox" /></div>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">3rd Party</label><input type="checkbox" /></div>
                                    </div>
                                    <div style={{

                                    }}>
                                        <div style={{ ...styleFlexRow, ...styleFieldData, alignItems: 'center', justifyContent: 'center', padding: 5, borderTop: '1px solid rgba(0,0,0,0.3)' }}>
                                            <input type="checkbox" /><label htmlFor="">Master bill of lading with attached underlying bills of lading.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{
                                    ...styleFieldName,
                                    ...styleTitleBackground,
                                    padding: 5,
                                    justifyContent: 'center',
                                    display: 'flex',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>
                                    CUSTOMER ORDER INFORMATION
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldName,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>
                                        Quantity or Piece Count
                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldName,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>
                                        Type (Skids, Bundles)
                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldName,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>
                                        Weight
                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldName,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>
                                        HazMat (X)
                                    </div>

                                    <div style={{
                                        ...styleFieldName,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        Commodity Description <br />
                                        <span style={{
                                            fontSize: '0.5rem'
                                        }}>
                                            Commodities requiring special or additional care or attention in handling or stowing must be so marked and packaged as to ensure safe transportation with ordinary care. See Section 2(e) of NMFC item 360
                                    </span>
                                    </div>
                                </div>


                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>
                                        1
                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>
                                        20000
                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>
                                            CONTAINER SATELITE EQUIPMENT
                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>


                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.3)'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>

                                <div style={{
                                    ...styleFlexRow,
                                    minHeight: '1.5rem'
                                }}>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '5rem',
                                        maxWidth: '5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        borderRight: '1px solid rgba(0,0,0,0.3)',
                                        ...styleFieldData,
                                        padding: 5,
                                        ...styleFlexCol,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        minWidth: '4.5rem',
                                        maxWidth: '4.5rem'
                                    }}>

                                    </div>

                                    <div style={{
                                        ...styleFieldData,
                                        ...styleFlexRow,
                                        justifyContent: 'center',
                                        flexGrow: 1
                                    }}>
                                        <div style={{ flexGrow: 1, borderRight: '1px solid rgba(0,0,0,0.3)', padding: 5 }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem', borderRight: '1px solid rgba(0,0,0,0.3)' }}>

                                        </div>
                                        <div style={{ minWidth: '4rem', maxWidth: '4rem' }}>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{
                            ...styleFlexCol,
                            border: '1px solid rgba(0,0,0,0.3)',
                            borderRadius: 5,
                            marginTop: 15
                        }}>


                            <div style={{
                                ...styleFlexRow,
                                borderBottom: '1px solid rgba(0,0,0,0.3)'
                            }}>

                                <div style={{
                                    ...styleFlexCol,
                                    padding: 5,
                                    borderRight: '1px solid rgba(0,0,0,0.3)',
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '0.6rem' }}>Where the rate is dependent on value, shippers are required to state specifically in writing the agreed or declared value of the property as follows: “The agreed or declared value of the property is specifically stated by the shipper to be not exceeding _______________ per _______________.</span>
                                </div>

                                <div style={{
                                    ...styleFlexCol,
                                    padding: 5,
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    ...styleFieldData,
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{
                                        ...styleFlexRow,
                                        marginBottom: 5
                                    }}>
                                        <span>COD Amount: $</span><span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.3)' }}></span>
                                    </div>

                                    <div style={{
                                        ...styleFlexRow,
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <b>Fee Terms:</b>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">Collet</label><input type="checkbox" /></div>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">Prepaid</label><input type="checkbox" /></div>
                                        <div style={{ ...styleFlexRow, alignItems: 'center' }}><label htmlFor="">Customer check acceptable</label><input type="checkbox" /></div>
                                    </div>
                                </div>

                            </div>



                            <div style={{
                                ...styleFlexRow,
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                padding: 5,
                                justifyContent: 'center'
                            }}>
                                <b>Note: Liability limitation for loss or damage in this shipment may be applicable. See 49 USC § 14706(c)(1)(A) and (B).</b>
                            </div>

                            <div style={{
                                ...styleFlexRow,
                                borderBottom: '1px solid rgba(0,0,0,0.3)'
                            }}>
                                <div style={{
                                    ...styleFlexCol,
                                    padding: 5,
                                    borderRight: '1px solid rgba(0,0,0,0.3)',
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '0.6rem' }}>Received, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable, otherwise to the rates, classifications, and rules that have been established by the carrier and are available to the shipper, on request, and to all applicable state and federal regulations.</span>
                                </div>

                                <div style={{
                                    ...styleFlexCol,
                                    padding: 5,
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    ...styleFieldData,
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ fontSize: '0.6rem' }}>The carrier shall not make delivery of this shipment without payment of charges and all other lawful fees.</div>

                                    <div style={{
                                        ...styleFlexRow,
                                        marginBottom: 5
                                    }}>
                                        <b><span>Shipper Signature</span></b> <span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.3)' }}></span>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                ...styleFlexRow
                            }}>

                                <div style={{
                                    padding: 5,
                                    borderRight: '1px solid rgba(0,0,0,0.3)',
                                    ...styleFlexCol,
                                    flexGrow: 3,
                                    flexBasis: '100%'
                                }}>
                                    <div style={{ ...styleFieldName, marginBottom: 20 }}>Shipper Signature/Date</div>
                                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.3)' }}></div>
                                    <div style={{ fontSize: '0.6rem' }}>This is to certify that the above named materials are properly classified, packaged, marked, and labeled, and are in proper condition for transportation according to the applicable regulations of the DOT.</div>
                                </div>

                                <div style={{
                                    padding: 5,
                                    borderRight: '1px solid rgba(0,0,0,0.3)',
                                    flexGrow: 2,
                                    flexBasis: '100%',
                                    ...styleFlexCol
                                }}>
                                    <div style={{ ...styleFieldName, marginBottom: 5 }}>Trailer Loaded:</div>
                                    <div style={{ ...styleFlexRow, alignItems: 'center', ...styleFieldData }}>
                                        <input type="checkbox" /><label htmlFor="">By shipper</label>
                                    </div>
                                    <div style={{ ...styleFlexRow, alignItems: 'center', ...styleFieldData }}>
                                        <input type="checkbox" /><label htmlFor="">By driver</label>
                                    </div>
                                </div>

                                <div style={{
                                    padding: 5,
                                    borderRight: '1px solid rgba(0,0,0,0.3)',
                                    flexGrow: 2,
                                    flexBasis: '100%',
                                    ...styleFlexCol
                                }}>
                                    <div style={{ ...styleFieldName, marginBottom: 5 }}>Freight Counted::</div>
                                    <div style={{ ...styleFlexRow, alignItems: 'center', ...styleFieldData }}>
                                        <input type="checkbox" /><label htmlFor="">By shipper</label>
                                    </div>
                                    <div style={{ ...styleFlexRow, alignItems: 'center', ...styleFieldData }}>
                                        <input type="checkbox" /><label htmlFor="">By driver/pallets said to contain</label>
                                    </div>
                                    <div style={{ ...styleFlexRow, alignItems: 'center', ...styleFieldData }}>
                                        <input type="checkbox" /><label htmlFor="">By driver/pieces</label>
                                    </div>
                                </div>

                                <div style={{
                                    padding: 5,
                                    ...styleFlexCol,
                                    flexGrow: 3,
                                    flexBasis: '100%'
                                }}>
                                    <div style={{ ...styleFieldName, marginBottom: 20 }}>Carrier Signature/PickupDate</div>
                                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.3)' }}></div>
                                    <div style={{ fontSize: '0.6rem' }}>Carrier acknowledges receipt of packages and required placards. Carrier certifies emergency response information was made available and/or carrier has the DOT emergency response guidebook or equivalent documentation in the vehicle. Property described above is received in good order, except as noted.</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(Bol)