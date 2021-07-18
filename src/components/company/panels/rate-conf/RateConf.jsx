import React, { useRef } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

function RateConf(props) {

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
                            <span style={{ ...styleFieldName, marginRight: 10 }}>DATE AND TIME SENT:</span> <span style={{ ...styleFieldDataBold }}>{moment().format('MM/DD/YYYY')}@{moment().format('HHmm')}</span>
                        </div>
                        <div style={{
                            ...styleFlexRow
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>ATTN:</span> <span style={{ ...styleFieldDataBold }}>
                                {props.selectedCarrierInfoContact?.first_name || ''} {props.selectedCarrierInfoContact?.last_name || ''}
                            </span>
                        </div>
                        <div style={{
                            ...styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>E-mail:</span> <span style={{ ...styleFieldDataBold }}>
                                {
                                    (props.selectedCarrierInfoContact?.primary_email || 'work') === 'work'
                                        ? props.selectedCarrierInfoContact?.email_work || ''
                                        : (props.selectedCarrierInfoContact?.primary_email || 'work') === 'personal'
                                            ? props.selectedCarrierInfoContact?.email_personal || ''
                                            : (props.selectedCarrierInfoContact?.primary_email || 'work') === 'other'
                                                ? props.selectedCarrierInfoContact?.email_other || ''
                                                : ''
                                }
                            </span>
                        </div>

                        <div style={{ ...styleFieldName, textAlign: 'center', fontSize: '1rem', marginBottom: '1.5rem' }}>
                            LOAD CONFIRMATION AND RATE AGREEMENT
                        </div>

                        <div style={{
                            ...styleFlexRow
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>Order Number:</span> <span style={{ ...styleFieldDataBold }}>
                                {props.selected_order?.order_number}
                            </span>
                        </div>
                        <div style={{
                            ...styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...styleFieldName, marginRight: 10 }}>Total Payment to the Carrier – Inclusive of all Accessorial charges:</span> <span style={{ ...styleFieldDataBold }}>$1,200.00</span>
                        </div>

                        <div style={{ ...styleFieldName, fontWeight: 'normal', marginBottom: '1.5rem' }}>
                            This rate confirmation sheet issued on <span style={{ ...styleFieldDataBold }}>{moment().format('MM/DD/YYYY')}</span> serves to supplement
                            the Master Brokerage Agreement between <span style={{ ...styleFieldDataBold }}>ET3 Logistics, LLC</span>, an ICC Property Broker
                            (MC <span style={{ ...styleFieldData }}>780648</span>) and: <span style={{ ...styleFieldDataBold }}>{props.selectedCarrierInfo?.name}</span> a permitted carrier
                            (MC <span style={{ ...styleFieldData }}>{props.selectedCarrierInfo?.mc_number}</span>), do hereby agree to enter into a mutual agreement on the following load.
                        </div>


                        {
                            (props.selected_order?.routing || []).map((route, index) => {
                                let pickup = route.type === 'pickup' ? (props.selected_order?.pickups || []).find(p => p.id === route.pickup_id) : {};
                                let delivery = route.type === 'delivery' ? (props.selected_order?.deliveries || []).find(d => d.id === route.delivery_id) : {};
                                let customer = route.type === 'pickup' ? pickup.customer : delivery.customer;

                                return (
                                    <div style={{
                                        ...styleFlexRow,
                                        justifyContent: 'space-evenly',
                                        marginBottom: '2.5rem'
                                    }}>
                                        <div style={{
                                            ...styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...styleFieldName, textDecoration: 'underline' }}>{route.type === 'pickup' ? 'Pick-Up' : 'Delivery'} Information</div>
                                            <div style={{ ...styleFieldData }}>
                                                {customer.name} <br />
                                                {customer.address1} <br />
                                                {customer.city}, {customer.state} {customer.zip}
                                            </div>
                                        </div>

                                        <div style={{
                                            ...styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...styleFlexRow }}>
                                                <div style={{ ...styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                                <div style={{ ...styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date1 || '') : (delivery.delivery_date1 || '')}@{route.type === 'pickup' ? (pickup.pu_time1 || '') : (delivery.delivery_time1 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...styleFlexRow }}>
                                                <div style={{ ...styleFieldName, width: '6rem' }}>Latest Time:</div>
                                                <div style={{ ...styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date2 || '') : (delivery.delivery_date2 || '')}@{route.type === 'pickup' ? (pickup.pu_time2 || '') : (delivery.delivery_time2 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...styleFlexRow }}>
                                                <div style={{ ...styleFieldName, width: '6rem' }}>Phone:</div>
                                                <div style={{ ...styleFieldData }}>
                                                    {
                                                        (customer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? ''
                                                            : (customer.contacts.find(c => c.is_primary === 1).primary_phone || 'work') === 'work'
                                                                ? customer.contacts.find(c => c.is_primary === 1).phone_work
                                                                : (customer.contacts.find(c => c.is_primary === 1).primary_phone || 'work') === 'fax'
                                                                    ? customer.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                                    : (customer.contacts.find(c => c.is_primary === 1).primary_phone || 'work') === 'mobile'
                                                                        ? customer.contacts.find(c => c.is_primary === 1).phone_mobile
                                                                        : (customer.contacts.find(c => c.is_primary === 1).primary_phone || 'work') === 'direct'
                                                                            ? customer.contacts.find(c => c.is_primary === 1).phone_direct
                                                                            : (customer.contacts.find(c => c.is_primary === 1).primary_phone || 'work') === 'other'
                                                                                ? customer.contacts.find(c => c.is_primary === 1).phone_other
                                                                                : ''
                                                    }
                                                </div>
                                            </div>
                                            <div style={{ ...styleFlexRow }}>
                                                <div style={{ ...styleFieldName, width: '6rem' }}>Contact:</div>
                                                <div style={{ ...styleFieldData }}>
                                                    {
                                                        (customer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? ''
                                                            : customer?.contacts.find(c => c.is_primary === 1).first_name + ' ' + customer?.contacts.find(c => c.is_primary === 1).last_name
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

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

                        <div style={{ ...styleFieldName, textAlign: 'center', marginBottom: '1.5rem', textDecoration: 'underline' }}>SPECIAL INSTRUCTIONS</div>

                        {
                            (props.selected_order?.notes_for_carrier || []).map((note, index) => {
                                return (
                                    <div key={index} style={{ ...styleFieldData, marginBottom: '1.5rem' }}>
                                        {note.text.toUpperCase()}
                                    </div>
                                )
                            })
                        }

                        <div style={{ ...styleFieldName, fontWeight: 'normal', marginBottom: '1.5rem' }}>
                            Carrier agrees that this reflects the entire amount due for all services provided
                            and that no other amount will be billed to <span style={{ ...styleFieldDataBold }}>ET3 Logistics, LLC</span>. Will remit Payment with in 30 days
                            of receipt of original signed bills of lading and clear signed delivery receipts,
                            completed W-9 forms, signed Master Carrier Agreement, Rate confirmation, Contract Authority,
                            and original certificates of Insurance naming <span style={{ ...styleFieldDataBold }}>ET3 Logistics, LLC</span> as certificate holder.
                        </div>

                        <div style={{ ...styleFieldData, marginBottom: '1.5rem' }}>
                            <div><b>{(props.selectedCarrierInfo?.name || '').toUpperCase()}</b></div>
                            <div>{(props.selectedCarrierInfo?.address1 || '').toUpperCase()} </div>
                            <div>{(props.selectedCarrierInfo?.address2 || '').toUpperCase()}</div>
                            <div>{(props.selectedCarrierInfo?.city || '').toUpperCase()}, {(props.selectedCarrierInfo?.state || '').toUpperCase()} {props.selectedCarrierInfo?.zip || ''}</div>
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

export default connect(null, null)(RateConf)