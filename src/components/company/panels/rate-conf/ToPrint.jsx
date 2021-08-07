import React, { Component } from 'react'
import moment from 'moment';
import './ToPrint.css';

export default class ToPrint extends Component {
    constructor(props) {
        super(props)
    }

    styleFlexRow = {
        display: 'flex',
        flexDirection: 'row'
    }
    styleFlexCol = {
        display: 'flex',
        flexDirection: 'column'
    }
    styleFieldName = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        fontStyle: 'normal'
    }
    styleFieldData = {
        color: 'red',
        fontSize: '0.9rem',
        fontStyle: 'italic'
    }
    styleTitleBackground = {
        backgroundColor: 'lightgray'
    }
    styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '0.9rem'
    }

    render() {
        return (
            <div className="content-page" style={{
                minWidth: '245.5mm',
                maxWidth: '245.5mm',
                display: 'block',
                fontSize: '0.9rem',
                fontFamily: 'Lato',
                fontStyle: 'italic'
            }}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Play:wght@400;700&display=swap" rel="stylesheet" />


                <div className="container-sheet">
                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem' }}>
                        
                        <div style={{
                            ...this.styleFlexRow
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>DATE AND TIME SENT:</span> <span style={{ ...this.styleFieldDataBold }}>{moment().format('MM/DD/YYYY')}@{moment().format('HHmm')}</span>
                        </div>
                        <div style={{
                            ...this.styleFlexRow
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>ATTN:</span> <span style={{ ...this.styleFieldDataBold }}>
                                {this.props.selectedCarrierInfoContact?.first_name || ''} {this.props.selectedCarrierInfoContact?.last_name || ''}
                            </span>
                        </div>
                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-mail:</span> <span style={{ ...this.styleFieldDataBold }}>
                                {
                                    (this.props.selectedCarrierInfoContact?.primary_email || 'work') === 'work'
                                        ? this.props.selectedCarrierInfoContact?.email_work || ''
                                        : (this.props.selectedCarrierInfoContact?.primary_email || 'work') === 'personal'
                                            ? this.props.selectedCarrierInfoContact?.email_personal || ''
                                            : (this.props.selectedCarrierInfoContact?.primary_email || 'work') === 'other'
                                                ? this.props.selectedCarrierInfoContact?.email_other || ''
                                                : ''
                                }
                            </span>
                        </div>

                        <div style={{ ...this.styleFieldName, textAlign: 'center', fontSize: '1rem', fontFamily: 'Play', fontWeight: 'bold' }}>
                            LOAD CONFIRMATION AND RATE AGREEMENT
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem' }}>
                        <div style={{
                            ...this.styleFlexRow
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>Order Number:</span> <span style={{ ...this.styleFieldDataBold }}>
                                {this.props.selected_order?.order_number}
                            </span>
                        </div>
                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>Total Payment to the Carrier – Inclusive of all Accessorial charges:</span> <span style={{ ...this.styleFieldDataBold }}>$1,200.00</span>
                        </div>

                        <div style={{ ...this.styleFieldName, fontWeight: 'normal', fontStyle: 'italic' }}>
                            This rate confirmation sheet issued on <span style={{ ...this.styleFieldDataBold }}>{moment().format('MM/DD/YYYY')}</span> serves to supplement
                            the Master Brokerage Agreement between <span style={{ ...this.styleFieldDataBold }}>ET3 Logistics, LLC</span>, an ICC Property Broker
                            (MC <span style={{ ...this.styleFieldData }}>780648</span>) and: <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrierInfo?.name}</span> a permitted carrier
                            (MC <span style={{ ...this.styleFieldData }}>{this.props.selectedCarrierInfo?.mc_number}</span>), do hereby agree to enter into a mutual agreement on the following load.
                        </div>
                    </div>

                    {
                        (this.props.selected_order?.routing || []).map((route, index) => {
                            let pickup = route.type === 'pickup' ? (this.props.selected_order?.pickups || []).find(p => p.id === route.pickup_id) : {};
                            let delivery = route.type === 'delivery' ? (this.props.selected_order?.deliveries || []).find(d => d.id === route.delivery_id) : {};
                            let customer = route.type === 'pickup' ? pickup.customer : delivery.customer;

                            return (
                                // PAGE BLOCK
                                <div key={index} className="page-block" style={{ paddingTop: '2rem' }}>
                                    <div style={{
                                        ...this.styleFlexRow,
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr'
                                    }}>
                                        <div style={{
                                            ...this.styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...this.styleFieldName}}>{route.type === 'pickup' ? 'Pick-Up' : 'Delivery'} Information</div>
                                            <div style={{ ...this.styleFieldData }}>
                                                {customer.name} <br />
                                                {customer.address1} <br />
                                                {customer.city}, {customer.state} {customer.zip}
                                            </div>
                                        </div>

                                        <div style={{
                                            ...this.styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date1 || '') : (delivery.delivery_date1 || '')}@{route.type === 'pickup' ? (pickup.pu_time1 || '') : (delivery.delivery_time1 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Latest Time:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date2 || '') : (delivery.delivery_date2 || '')}@{route.type === 'pickup' ? (pickup.pu_time2 || '') : (delivery.delivery_time2 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Phone:</div>
                                                <div style={{ ...this.styleFieldData }}>
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
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Contact:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {
                                                        (customer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? ''
                                                            : customer?.contacts.find(c => c.is_primary === 1).first_name + ' ' + customer?.contacts.find(c => c.is_primary === 1).last_name
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem' }}>
                        <div style={{
                            ...this.styleFlexCol,
                        }}>
                            <div style={{ ...this.styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', width: '9rem' }}>Pieces</div>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', width: '9rem' }}>Weight</div>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', flexGrow: 1 }}>Description</div>
                            </div>

                            <div style={{ ...this.styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...this.styleFieldData, width: '9rem' }}>1</div>
                                <div style={{ ...this.styleFieldData, width: '9rem' }}>25,000</div>
                                <div style={{ ...this.styleFieldData, flexGrow: 1 }}>PLTS PRINTED MATTER</div>
                            </div>

                        </div>

                        <div style={{ ...this.styleFieldName, textAlign: 'left', marginTop: '2rem', textDecoration: 'underline' }}>SPECIAL INSTRUCTIONS</div>

                        {
                            (this.props.selected_order?.notes_for_carrier || []).map((note, index) => {
                                return (
                                    <div key={index} style={{ ...this.styleFieldData, marginTop: '1rem' }}>
                                        {note.text.split(/\r?\n/).map(text => (
                                            <div>{text.toUpperCase()}</div>
                                        ))}
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingBottom: '1.5rem', paddingTop: '2rem' }}>
                        <div style={{ ...this.styleFieldName, fontStyle: 'italic' , fontWeight: 'normal', pageBreakInside: 'avoid' }}>
                            Carrier agrees that this reflects the entire amount due for all services provided
                            and that no other amount will be billed to <span style={{ ...this.styleFieldDataBold }}>ET3 Logistics, LLC</span>. Will remit Payment with in 30 days
                            of receipt of original signed bills of lading and clear signed delivery receipts,
                            completed W-9 forms, signed Master Carrier Agreement, Rate confirmation, Contract Authority,
                            and original certificates of Insurance naming <span style={{ ...this.styleFieldDataBold }}>ET3 Logistics, LLC</span> as certificate holder.
                        </div>

                        <div style={{ ...this.styleFieldData, marginTop: '1.5rem' }}>
                            <div><b>{(this.props.selectedCarrierInfo?.name || '').toUpperCase()}</b></div>
                            <div>{(this.props.selectedCarrierInfo?.address1 || '').toUpperCase()} </div>
                            <div>{(this.props.selectedCarrierInfo?.address2 || '').toUpperCase()}</div>
                            <div>{(this.props.selectedCarrierInfo?.city || '').toUpperCase()}, {(this.props.selectedCarrierInfo?.state || '').toUpperCase()} {this.props.selectedCarrierInfo?.zip || ''}</div>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            width: '20rem',
                            marginTop: '1.5rem'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: '0.2rem' }}>By: </span><span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.5)' }}></span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            width: '20rem',
                            marginTop: '1.5rem'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: '0.2rem' }}>Print Name: </span><span style={{ flexGrow: 1, borderBottom: '1px solid rgba(0,0,0,0.5)' }}></span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginTop: '1.5rem'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: '0.2rem' }}>Date: </span><span style={{ ...this.styleFieldData }}>*SAME AS DATE SENT AT TOP OF SHEET*</span>
                        </div>
                    </div>
                </div>

                <div className="no-print" style={{ height: '2rem' }}></div>

                <div className="container-sheet">
                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', pageBreakBefore: 'always' }}>
                        <div style={{ ...this.styleFieldName, textAlign: 'center', fontSize: '1rem',fontFamily: 'Play', fontWeight: 'bold' }}>
                            DRIVER INFORMATION SHEET
                        </div>
                    </div>

                    {
                        (this.props.selected_order?.routing || []).map((route, index) => {
                            let pickup = route.type === 'pickup' ? (this.props.selected_order?.pickups || []).find(p => p.id === route.pickup_id) : {};
                            let delivery = route.type === 'delivery' ? (this.props.selected_order?.deliveries || []).find(d => d.id === route.delivery_id) : {};
                            let customer = route.type === 'pickup' ? pickup.customer : delivery.customer;

                            return (
                                // PAGE BLOCK
                                <div className="page-block" style={{ paddingTop: '2rem' }}>
                                    <div style={{
                                        ...this.styleFlexRow,
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr'
                                    }}>
                                        <div style={{
                                            ...this.styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...this.styleFieldName }}>{route.type === 'pickup' ? 'Pick-Up' : 'Delivery'} Information</div>
                                            <div style={{ ...this.styleFieldData }}>
                                                {customer.name} <br />
                                                {customer.address1} <br />
                                                {customer.city}, {customer.state} {customer.zip}
                                            </div>
                                        </div>

                                        <div style={{
                                            ...this.styleFlexCol,
                                            minWidth: '16rem'
                                        }}>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Earliest Time:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date1 || '') : (delivery.delivery_date1 || '')}@{route.type === 'pickup' ? (pickup.pu_time1 || '') : (delivery.delivery_time1 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Latest Time:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {route.type === 'pickup' ? (pickup.pu_date2 || '') : (delivery.delivery_date2 || '')}@{route.type === 'pickup' ? (pickup.pu_time2 || '') : (delivery.delivery_time2 || '')}
                                                </div>
                                            </div>
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Phone:</div>
                                                <div style={{ ...this.styleFieldData }}>
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
                                            <div style={{ ...this.styleFlexRow }}>
                                                <div style={{ ...this.styleFieldName, width: '6rem' }}>Contact:</div>
                                                <div style={{ ...this.styleFieldData }}>
                                                    {
                                                        (customer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                            ? ''
                                                            : customer?.contacts.find(c => c.is_primary === 1).first_name + ' ' + customer?.contacts.find(c => c.is_primary === 1).last_name
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem' }}>
                        <div style={{
                            ...this.styleFlexCol,
                        }}>
                            <div style={{ ...this.styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', width: '9rem' }}>Pieces</div>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', width: '9rem' }}>Weight</div>
                                <div style={{ ...this.styleFieldName, textDecoration: 'underline', flexGrow: 1 }}>Description</div>
                            </div>

                            <div style={{ ...this.styleFlexRow, padding: '0.2rem 0' }}>
                                <div style={{ ...this.styleFieldData, width: '9rem' }}>1</div>
                                <div style={{ ...this.styleFieldData, width: '9rem' }}>25,000</div>
                                <div style={{ ...this.styleFieldData, flexGrow: 1 }}>PLTS PRINTED MATTER</div>
                            </div>

                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    {
                        (this.props.selected_order?.routing || []).map((route, index) => {
                            let pickup = route.type === 'pickup' ? (this.props.selected_order?.pickups || []).find(p => p.id === route.pickup_id) : {};
                            let delivery = route.type === 'delivery' ? (this.props.selected_order?.deliveries || []).find(d => d.id === route.delivery_id) : {};
                            let customer = route.type === 'pickup' ? pickup.customer : delivery.customer;

                            if ((customer.directions || []).length > 0) {
                                return (
                                    // PAGE BLOCK
                                    <div key={index} className="page-block" style={{ paddingTop: '2rem' }}>
                                        <div style={{ ...this.styleFieldName, textDecoration: 'underline' }}>Directions to {customer.name} - {customer.city}, {customer.state.toUpperCase()}</div>
                                        {
                                            customer.directions.map((direction, index) => {
                                                return (
                                                    <div key={index} style={{ ...this.styleFieldData, marginBottom: '5px' }}>
                                                        {direction.text.split(/\r?\n/).map(text => (
                                                            <div>{text.toUpperCase()}</div>
                                                        ))}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            } else {
                                return '';
                            }
                        })
                    }

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingBottom: '2rem' }}></div>
                </div>
            </div>
        )
    }
}
