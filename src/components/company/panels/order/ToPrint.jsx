import React, { Component } from 'react'
import moment from 'moment';
import './ToPrint.css';

export default class ToPrint extends Component {
    constructor(props) {
        super(props)
    }

    styleFlexRow = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
    styleFlexCol = {
        display: 'flex',
        flexDirection: 'column'
    }
    styleFieldName = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '0.7rem',
        fontStyle: 'normal',
        whiteSpace: 'nowrap'
    }
    styleFieldData = {
        color: 'red',
        fontSize: '0.7rem',
        fontStyle: 'italic'
    }
    styleTitleBackground = {
        backgroundColor: 'lightgray'
    }
    styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '0.7rem'
    }

    render() {
        return (
            <div className="content-page" style={{
                minWidth: '245.5mm',
                maxWidth: '245.5mm',
                display: 'block',
                fontSize: '0.8rem',
                fontFamily: 'Lato',
                fontStyle: 'italic'
            }}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Play:wght@400;700&display=swap" rel="stylesheet" />


                <div className="container-sheet">
                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ ...this.styleFieldName, fontSize: '0.9rem', marginRight: 10 }}>Date:</span> <span style={{ ...this.styleFieldData, fontSize: '0.9rem' }}>{moment().format('MM/DD/YYYY@HH:mm')}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ ...this.styleFieldData, fontWeight: 'bold', fontSize: '1.2rem' }}>ET3 LOGISTICS, LLC</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <div style={{ marginBottom: 5 }}><span style={{ ...this.styleFieldName, fontSize: '0.9rem', marginRight: 10 }}>ORDER#</span> <span style={{ ...this.styleFieldData, fontSize: '0.9rem' }}>{this.props.selected_order?.order_number}</span></div>
                                <div><span style={{ ...this.styleFieldName, fontSize: '0.9rem', marginRight: 10 }}>TRIP#</span> <span style={{ ...this.styleFieldData, fontSize: '0.9rem' }}>{this.props.selected_order?.trip_number}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Bill To</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selected_order.bill_to_company?.code_number || 0) === 0 ? (this.props.selected_order.bill_to_company?.code || '') : this.props.selected_order.bill_to_company?.code + this.props.selected_order.bill_to_company?.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.name || '')}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                alignItems: 'flex-start'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.address1 || '')}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                alignItems: 'flex-start'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.address2 || '')}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr',
                                marginBottom: '2px'
                            }}>
                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.city || '')}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.state || '')}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order.bill_to_company?.zip || '')}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selected_order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selected_order.bill_to_company?.contact_name || '')
                                        : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).last_name
                                }</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                display: 'grid',
                                gridTemplateColumns: '3fr 1fr',
                                marginBottom: '2px'
                            }}>
                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT PHONE:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        (this.props.selected_order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selected_order.bill_to_company?.contact_phone || '')
                                            : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_work
                                                : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        (this.props.selected_order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selected_order.bill_to_company?.ext || '')
                                            : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).phone_ext
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selected_order.bill_to_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selected_order.bill_to_company?.contact_phone || '')
                                        : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                            ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).email_work
                                            : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).email_personal
                                                : this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                    ? this.props.selected_order.bill_to_company?.contacts.find(c => c.is_primary === 1).email_other
                                                    : ''
                                }</span>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gridTemplateRows: '1fr 1fr 1fr 1fr',
                                gridGap: '0.5rem'
                            }}>
                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>PO NUMBERS:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    this.props.selected_order.pickups.length === 0 ? ''
                                        : (this.props.selected_order.pickups[0].po_numbers || '')
                                }</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>DIVISION:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order?.division?.name || '')}</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>BOL NUMBERS:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    this.props.selected_order.pickups.length === 0 ? ''
                                        : (this.props.selected_order.pickups[0].bol_numbers || '')
                                }</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>LOAD TYPE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selected_order?.load_type?.name || '')}</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>SHIPPER NUMBER:</span> <span style={{ ...this.styleFieldDataBold }}>123456789AB</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>TOTAL CHARGES:</span> <span style={{ ...this.styleFieldDataBold }}>$50,000.00</span></div>

                                <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>COMMODITY:</span> <span style={{ ...this.styleFieldDataBold }}>Aluminium Shapes</span></div>

                            </div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Order Information</div>


                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gridTemplateRows: '1fr 1fr 1fr 1fr',
                            }}>

                                <div style={{ ...this.styleFlexRow, justifyContent: 'space-evenly', marginBottom: 15 }}>
                                    <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>EQUIPMENT:</span> <span style={{ ...this.styleFieldData }}>{(this.props.selected_order?.driver?.equipment?.name || '').toUpperCase()}</span></div>
                                    <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>EXPEDITED:</span> <span style={{ ...this.styleFieldData }}>{this.props.selected_order?.expedited === 1 ? 'YES' : 'NO'}</span></div>
                                    <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, marginRight: 5 }}>HAX-MAT:</span> <span style={{ ...this.styleFieldData }}>{this.props.selected_order?.haz_mat === 1 ? 'YES' : 'NO'}</span></div>
                                </div>

                                <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ ...this.styleFieldName, width: '4rem', textDecoration: 'underline' }}>Pieces</span>
                                    <span style={{ ...this.styleFieldName, width: '4rem', textDecoration: 'underline' }}>Type</span>
                                    <span style={{ ...this.styleFieldName, width: '5rem', textDecoration: 'underline' }}>Weight</span>
                                    <span style={{ ...this.styleFieldName, flexGrow: 1, textDecoration: 'underline' }}>Description</span>
                                    <span style={{ ...this.styleFieldName, width: '5rem', textDecoration: 'underline' }}>Rate</span>
                                    <span style={{ ...this.styleFieldName, width: '5rem', textDecoration: 'underline' }}>Descriptor</span>
                                    <span style={{ ...this.styleFieldName, width: '5rem', textDecoration: 'underline' }}>Charges</span>
                                </div>

                                <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...this.styleFieldData, width: '4rem' }}>1,000</span>
                                    <span style={{ ...this.styleFieldData, width: '4rem' }}>Boxes</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>2,000</span>
                                    <span style={{ ...this.styleFieldData, flexGrow: 1 }}>Boxes of stuff</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>$2.00</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>Weight</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>$4,000.00</span>
                                </div>

                                <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <span style={{ ...this.styleFieldData, width: '4rem' }}>50</span>
                                    <span style={{ ...this.styleFieldData, width: '4rem' }}>Skids</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>10,000</span>
                                    <span style={{ ...this.styleFieldData, flexGrow: 1 }}>Skids of junk</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>$2,000.00</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>Skid</span>
                                    <span style={{ ...this.styleFieldData, width: '5rem' }}>$46,000.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gridGap: '1rem'
                            }}>

                                {
                                    (this.props.selected_order?.routing || []).map((route, index) => {
                                        let pickup = route.type === 'pickup' ? (this.props.selected_order?.pickups || []).find(p => p.id === route.pickup_id) : {};
                                        let delivery = route.type === 'delivery' ? (this.props.selected_order?.deliveries || []).find(d => d.id === route.delivery_id) : {};
                                        let customer = route.type === 'pickup' ? pickup.customer : delivery.customer;

                                        return (
                                            // PAGE BLOCK
                                            <div key={index} className="page-block">
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
                            </div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '3fr 2fr', gridGap: '1rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Carrier Information</div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gridGap: '0.5rem'
                            }}>
                                <div style={{ ...this.styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <span style={{ ...this.styleFieldData, color: '#4682B4', marginBottom: 5 }}>{
                                        ((this.props.selected_order.carrier?.code_number || 0) === 0 ? (this.props.selected_order.carrier?.code || '') : this.props.selected_order.carrier?.code + this.props.selected_order.carrier?.code_number).toUpperCase()
                                    }</span>
                                    <span style={{ ...this.styleFieldData, marginBottom: 5 }}>{(this.props.selected_order.carrier?.name || '')}</span>
                                    <span style={{ ...this.styleFieldData, marginBottom: 5 }}>{(this.props.selected_order.carrier?.address1 || '')}</span>
                                    <span style={{ ...this.styleFieldData }}>{(this.props.selected_order.carrier?.city || '')}, {(this.props.selected_order.carrier?.state || '').toUpperCase()} {(this.props.selected_order.carrier?.zip || '')}</span>
                                </div>

                                <div style={{ ...this.styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                    <div style={{ ...this.styleFlexRow, marginBottom: 5 }}><span style={{ ...this.styleFieldName, width: '4rem' }}>CONTACT:</span> <span style={{ ...this.styleFieldData }}>{
                                        (this.props.selected_order.carrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selected_order.carrier?.contact_name || '').toUpperCase()
                                            : (this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).last_name).toUpperCase()
                                    }</span></div>
                                    <div style={{ ...this.styleFlexRow, marginBottom: 5 }}>
                                        <span style={{ ...this.styleFieldName, width: '4rem' }}>PHONE:</span><span style={{ ...this.styleFieldData, marginRight: 5 }}>{
                                            (this.props.selected_order.carrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (this.props.selected_order.carrier?.contact_phone || '')
                                                : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                    ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_work
                                                    : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                        ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                        : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                            ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                            : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                                ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_direct
                                                                : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                    ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_other
                                                                    : ''
                                        }</span>
                                        <span style={{ ...this.styleFieldName, width: '1.5rem' }}>Ext:</span><span style={{ ...this.styleFieldData }}>{
                                            (this.props.selected_order.carrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                                ? (this.props.selected_order.carrier?.ext || '')
                                                : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).phone_ext
                                        }</span>
                                    </div>
                                    <div style={{ ...this.styleFlexRow }}><span style={{ ...this.styleFieldName, width: '4rem' }}>E-MAIL:</span> <span style={{ ...this.styleFieldData }}>{(
                                        (this.props.selected_order.carrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selected_order.carrier?.contact_phone || '')
                                            : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                                ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).email_work
                                                : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                    ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).email_personal
                                                    : this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                        ? this.props.selected_order.carrier?.contacts.find(c => c.is_primary === 1).email_other
                                                        : ''
                                    ).toLowerCase()}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Driver Information</div>

                            <div style={{ ...this.styleFlexCol, justifyContent: 'center', flexGrow: 1, flexBasis: '100%' }}>
                                <div style={{ ...this.styleFlexRow, marginBottom: 5 }}><span style={{ ...this.styleFieldName, width: '4rem' }}>NAME:</span> <span style={{ ...this.styleFieldData }}>{(this.props.selected_order.driver?.first_name || '').toUpperCase()} {(this.props.selected_order.driver?.last_name || '').toUpperCase()}</span></div>
                                <div style={{ ...this.styleFlexRow, marginBottom: 5 }}><span style={{ ...this.styleFieldName, width: '4rem' }}>PHONE:</span> <span style={{ ...this.styleFieldData }}>{(this.props.selected_order.driver?.phone || '').toUpperCase()}</span></div>
                                <div style={{ ...this.styleFlexRow, marginBottom: 5 }}><span style={{ ...this.styleFieldName, width: '4rem' }}>UNIT:</span> <span style={{ ...this.styleFieldData }}>{(this.props.selected_order.driver?.truck || '').toUpperCase()}</span></div>
                                <div style={{ ...this.styleFlexRow, marginBottom: 5 }}><span style={{ ...this.styleFieldName, width: '4rem' }}>TRAILER:</span> <span style={{ ...this.styleFieldData }}>{(this.props.selected_order.driver?.trailer || '').toUpperCase()}</span></div>
                            </div>
                        </div>
                    </div>

                    {
                        (this.props.selected_order?.notes_for_carrier || []).length > 0
                            ?
                            //* PAGE BLOCK */
                            < div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                                <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                    <div className="form-title" style={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        top: -10,
                                        left: 10,
                                        padding: '0 10px'
                                    }}>Notes for Carrier</div>

                                    {
                                        (this.props.selected_order?.notes_for_carrier || []).map((note, index) => {
                                            return (
                                                <div key={index} style={{ ...this.styleFieldData, marginTop: '0.5rem' }}>
                                                    {note.text.split(/\r?\n/).map(text => (
                                                        <div>{text.toUpperCase()}</div>
                                                    ))}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            //* PAGE BLOCK */
                            < div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                                <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10, minHeight: 100 }}>
                                    <div className="form-title" style={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        top: -10,
                                        left: 10,
                                        padding: '0 10px'
                                    }}>Notes for Carrier</div>
                                    
                                </div>
                            </div>
                    }


                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Events</div>

                            <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ ...this.styleFieldName, minWidth: '8rem', maxWidth: '8rem', textDecoration: 'underline' }}>Date & Time</span>
                                <span style={{ ...this.styleFieldName, minWidth: '8rem', maxWidth: '8rem', textDecoration: 'underline' }}>Event</span>
                                <span style={{ ...this.styleFieldName, minWidth: '8rem', maxWidth: '8rem', textDecoration: 'underline' }}>Event Location</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, textDecoration: 'underline' }}>Event Notes</span>
                                <span style={{ ...this.styleFieldName, minWidth: '3rem', maxWidth: '8rem', textDecoration: 'underline', textAlign: 'center' }}>User</span>
                            </div>

                            {
                                this.props.selected_order.events.map((item, index) => {

                                    return (
                                        <div key={index} style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ ...this.styleFieldData, minWidth: '8rem', maxWidth: '8rem' }}>{item.event_date}@{item.event_time}</span>
                                            <span style={{ ...this.styleFieldData, minWidth: '8rem', maxWidth: '8rem' }}>{item.event_type.toUpperCase()}</span>
                                            <span style={{ ...this.styleFieldData, minWidth: '8rem', maxWidth: '8rem' }}>{item.event_location}</span>
                                            <span style={{ ...this.styleFieldData, flexGrow: 1 }}>{item.event_notes}</span>
                                            <span style={{ ...this.styleFieldData, minWidth: '3rem', maxWidth: '8rem', textAlign: 'center' }}>{item.user_id}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Totals</div>

                            <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Pieces</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Weight</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Charges</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Order Cost</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Profit</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Percentage</span>
                                <span style={{ ...this.styleFieldName, flexGrow: 1, flexBasis: '100%', textDecoration: 'underline' }}>Miles</span>
                            </div>

                            <div style={{ ...this.styleFlexRow, justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>1,050</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>10,200 lbs</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$50,000.00</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$45,000.00</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>$5,000.00</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>10%</span>
                                <span style={{ ...this.styleFieldData, flexGrow: 1, flexBasis: '100%' }}>22,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
