import React, { useRef } from 'react';
import { connect } from "react-redux";
import { setDispatchPanels, setDispatchOpenedPanels } from "./../../../../../actions";

function RateConf(props) {

    const refPage = useRef();

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
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
        fontSize: '0.9rem'
    }
    const styleFieldData = {
        color: 'red',
        fontSize: '0.9rem'
    }
    const styleTitleBackground = {
        backgroundColor: 'lightgray'
    }
    const styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '0.9rem'
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
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'rate-conf')}><span className="fas fa-times"></span></div>
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
                    <div className="content-page" ref={refPage} style={{
                        minWidth: '215.5mm',
                        minHeight: '558.4mm',
                        maxWidth: '215.5mm',
                        maxHeight: '558.4mm',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '0.9rem',
                        padding: '15mm 10mm',
                        position: 'relative'
                    }}>
                        <div style={{ width: '100%', height: '1px', position: 'absolute', left: 0, top: '279mm', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>

                        <div style={{
                            ...styleFlexRow
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>DATE AND TIME SENT:</span> <span style={{ ...styleFieldDataBold }}>04/02/2019 @10:15</span>
                        </div>
                        <div style={{
                            ...styleFlexRow
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>ATTN:</span> <span style={{ ...styleFieldDataBold }}>DAVID HAWKINS</span>
                        </div>
                        <div style={{
                            ...styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>FAX:</span> <span style={{ ...styleFieldDataBold }}>901-794-0073</span>
                        </div>

                        <div style={{ ...styleFieldName, textAlign: 'center', fontSize: '1rem', marginBottom: '1.5rem' }}>
                            LOAD CONFIRMATION AND RATE AGREEMENT
                        </div>

                        <div style={{
                            ...styleFlexRow
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>Load Number:</span> <span style={{ ...styleFieldDataBold }}>123456</span>
                        </div>
                        <div style={{
                            ...styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>Total Payment to the Carrier – Inclusive of all Accessorial charges:</span> <span style={{ ...styleFieldDataBold }}>$1,200.00</span>
                        </div>

                        <div style={{ ...styleFieldName, fontWeight: 'normal', marginBottom: '1.5rem' }}>
                            This rate confirmation sheet issued on <span style={{ ...styleFieldDataBold }}>04/02/2019</span> serves to supplement
                            the Master Brokerage Agreement between <span style={{ ...styleFieldDataBold }}>COMPANY</span>, an ICC Property Broker
                            (MC <span style={{ ...styleFieldData }}>780648</span>) and: <span style={{ ...styleFieldDataBold }}>Dan’s Transport</span> a permitted carrier
                            (MC <span style={{ ...styleFieldData }}>780648</span>), do hereby agree to enter into a mutual agreement on the following load.
                        </div>


                        <div style={{
                            ...styleFlexRow,
                            justifyContent: 'space-evenly',
                            marginBottom: '2.5rem'
                        }}>
                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline' }}>Pick up Information</div>
                                <div style={{ ...styleFieldData }}>
                                    American Heart Association <br />
                                    4808 Eastover Cir #101 <br />
                                    Mesquite, TX 75149
                                </div>
                            </div>

                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Latest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Phone:</div>
                                    <div style={{ ...styleFieldData }}>214-275-3216</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Contact:</div>
                                    <div style={{ ...styleFieldData }}>Wayne Duffy</div>
                                </div>

                            </div>
                        </div>


                        <div style={{
                            ...styleFlexCol,
                            marginBottom: '2.5rem'
                        }}>

                            <div style={{ ...styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', width: '9rem' }}>Pieces</div>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', width: '9rem' }}>Weight</div>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', flexGrow: 1 }}>Description</div>
                            </div>

                            <div style={{ ...styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...styleFieldData, width: '9rem' }}>1</div>
                                <div style={{ ...styleFieldData, width: '9rem' }}>25,000</div>
                                <div style={{ ...styleFieldData, flexGrow: 1 }}>PLTS PRINTED MATTER</div>
                            </div>

                        </div>

                        <div style={{
                            ...styleFlexRow,
                            justifyContent: 'space-evenly',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline' }}>Delivery Information</div>
                                <div style={{ ...styleFieldData }}>
                                    American Heart Association <br />
                                    4808 Eastover Cir #101 <br />
                                    Mesquite, TX 75149
                                </div>
                            </div>

                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Latest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Phone:</div>
                                    <div style={{ ...styleFieldData }}>214-275-3216</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Contact:</div>
                                    <div style={{ ...styleFieldData }}>Wayne Duffy</div>
                                </div>

                            </div>
                        </div>


                        <div style={{ ...styleFieldName, textAlign: 'center', marginBottom: '1.5rem', textDecoration: 'underline' }}>SPECIAL INSTRUCTIONS</div>

                        <div style={{ ...styleFieldData, marginBottom: '1.5rem' }}>RATE FOR EXCLUSIVE USE!  MUST DELIVER BY 2/9!</div>

                        <div style={{ ...styleFieldName, fontWeight: 'normal', marginBottom: '1.5rem' }}>
                            Carrier agrees that this reflects the entire amount due for all services provided
                            and that no other amount will be billed to <span style={{ ...styleFieldDataBold }}>COMPANY</span>. Will remit Payment with in 30 days
                            of receipt of original signed bills of lading and clear signed delivery receipts,
                            completed W-9 forms, signed Master Carrier Agreement, Rate confirmation, Contract Authority,
                            and original certificates of Insurance naming <span style={{ ...styleFieldDataBold }}>COMPANY</span> as certificate holder.
                        </div>

                        <div style={{ ...styleFieldData, marginBottom: '1.5rem' }}>
                            PERIMETER TRANSPORATION CO <br />
                            5515 E HOLMES RD <br />
                            MEMPHIS, TN 38118-7933
                        </div>

                        <div style={{
                            ...styleFlexRow,
                            width: '20rem',
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: '0.2rem' }}>By: </span><span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.5)' }}></span>
                        </div>

                        <div style={{
                            ...styleFlexRow,
                            width: '20rem',
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: '0.2rem' }}>Print Name: </span><span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.5)' }}></span>
                        </div>

                        <div style={{
                            ...styleFlexRow,
                            marginBottom: '12rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: '0.2rem' }}>Date: </span><span style={{ ...styleFieldData }}>*SAME AS DATE SENT AT TOP OF SHEET*</span>
                        </div>




                        <div style={{ ...styleFieldName, textAlign: 'center', fontSize: '1rem', marginBottom: '2.5rem' }}>
                            DRIVER INFORMATION SHEET
                        </div>


                        <div style={{
                            ...styleFlexRow,
                            justifyContent: 'space-evenly',
                            marginBottom: '2.5rem'
                        }}>
                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline' }}>Pick up Information</div>
                                <div style={{ ...styleFieldData }}>
                                    American Heart Association <br />
                                    4808 Eastover Cir #101 <br />
                                    Mesquite, TX 75149
                                </div>
                            </div>

                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Latest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Phone:</div>
                                    <div style={{ ...styleFieldData }}>214-275-3216</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Contact:</div>
                                    <div style={{ ...styleFieldData }}>Wayne Duffy</div>
                                </div>

                            </div>
                        </div>


                        <div style={{
                            ...styleFlexCol,
                            marginBottom: '2.5rem'
                        }}>

                            <div style={{ ...styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', width: '9rem' }}>Pieces</div>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', width: '9rem' }}>Weight</div>
                                <div style={{ ...styleFieldName, textDecoration: 'underline', flexGrow: 1 }}>Description</div>
                            </div>

                            <div style={{ ...styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...styleFieldData, width: '9rem' }}>1</div>
                                <div style={{ ...styleFieldData, width: '9rem' }}>25,000</div>
                                <div style={{ ...styleFieldData, flexGrow: 1 }}>PLTS PRINTED MATTER</div>
                            </div>

                        </div>

                        <div style={{
                            ...styleFlexRow,
                            justifyContent: 'space-evenly',
                            marginBottom: '2.5rem'
                        }}>
                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFieldName, textDecoration: 'underline' }}>Delivery Information</div>
                                <div style={{ ...styleFieldData }}>
                                    American Heart Association <br />
                                    4808 Eastover Cir #101 <br />
                                    Mesquite, TX 75149
                                </div>
                            </div>

                            <div style={{
                                ...styleFlexCol
                            }}>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Latest Time:</div>
                                    <div style={{ ...styleFieldData }}>02/09/2017@08:00</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Phone:</div>
                                    <div style={{ ...styleFieldData }}>214-275-3216</div>
                                </div>
                                <div style={{ ...styleFlexRow }}>
                                    <div style={{ ...styleFieldName, width: '6rem' }}>Contact:</div>
                                    <div style={{ ...styleFieldData }}>Wayne Duffy</div>
                                </div>

                            </div>
                        </div>


                        <div style={{ ...styleFieldName, textDecoration: 'underline' }}>DIRECTIONS TO SHIPPER</div>
                        <div style={{ ...styleFieldName, fontWeight: 'normal', marginBottom: '1.5rem' }}>
                            FROM HWY. 30, EXIT 53A WHICH IS BUCKNER BLVD. (LOOP 12). GO SOUTH ON BUCKNER
                            BLVD. TO THE FIRST STOP LIGHT, WHICH IS SAMUELL BLVD. TURN LEFT ONTO SAMUELL
                            BLVD. TURN RIGHT ONTO THE THIRD STREET ON THE RIGHT, WHICH IS EASTOVER CR.
                            PASS FIRST BUILDING ON RIGHT AND EASTOVER WILL CURVE TO THE LEFT. AT THAT
                            CURVE YOU WILL SEE A DECORATIVE BRICK WALL WITH AMERICAN HEART ASSOCIATION
                            AND WORKFLOWONE WRITTEN ON THE WALL. THE PICKUP IS DIRECTLY
                            BEHIND DECORATIVE BRICKWALL. THERE ARE TWO BUILDINGS IN A "L" SHAPE. BUILDING TO THE
                            RIGHT IS SHIPPING DEPARTMENT.

                            </div>

                            <div style={{ ...styleFieldName, textDecoration: 'underline' }}>DIRECTIONS TO CONSIGNEE</div>
                        <div style={{ ...styleFieldName, fontWeight: 'normal' }}>
                            FROM HWY. 30, EXIT 53A WHICH IS BUCKNER BLVD. (LOOP 12). GO SOUTH ON BUCKNER
                            BLVD. TO THE FIRST STOP LIGHT, WHICH IS SAMUELL BLVD. TURN LEFT ONTO SAMUELL
                            BLVD. TURN RIGHT ONTO THE THIRD STREET ON THE RIGHT, WHICH IS EASTOVER CR.
                            PASS FIRST BUILDING ON RIGHT AND EASTOVER WILL CURVE TO THE LEFT. AT THAT
                            CURVE YOU WILL SEE A DECORATIVE BRICK WALL WITH AMERICAN HEART ASSOCIATION
                            AND WORKFLOWONE WRITTEN ON THE WALL. THE PICKUP IS DIRECTLY
                            BEHIND DECORATIVE BRICKWALL. THERE ARE TWO BUILDINGS IN A "L" SHAPE. BUILDING TO THE
                            RIGHT IS SHIPPING DEPARTMENT.

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
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setDispatchOpenedPanels
})(RateConf)