import React, { Component } from 'react'
import moment from 'moment';
import './ToPrint.css';
import accounting from 'accounting';

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
        fontStyle: 'normal',
        whiteSpace: 'nowrap'
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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Play:wght@400;700&display=swap" rel="stylesheet" />

                <div className="container-sheet">
                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', marginBottom: '0.2rem' }}>
                        <div style={{ ...this.styleFieldName, textAlign: 'center', fontSize: '1rem', fontFamily: 'Play', fontWeight: 'bold' }}>
                            CARRIER INFORMATION
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ display: 'grid', gridTemplateColumns: '1fr 150px 1fr' }}>
                        <div style={{ ...this.styleFlexRow, justifyContent: 'flex-end' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>MC#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.mc_number || '')}</span>
                        </div>

                        <div style={{ ...this.styleFlexRow, justifyContent: 'center' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>DOT#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.dot_number || '')}</span>
                        </div>

                        <div style={{ ...this.styleFlexRow, justifyContent: 'flex-start' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>SCAC#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.scac || '')}</span>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Carrier</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selectedCarrier.code_number || 0) === 0 ? (this.props.selectedCarrier.code || '') : this.props.selectedCarrier.code + this.props.selectedCarrier.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.name}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.address1}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.address2}</span>
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
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.city}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.state || '').toUpperCase()}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.zip}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier?.contact_name || '')
                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).last_name
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
                                        (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier?.contact_phone || '')
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work
                                                : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier?.ext || '')
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_ext
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier?.email || '')
                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                            ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_work
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_personal
                                                : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                    ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_other
                                                    : ''
                                }</span>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Billing Address</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selectedCarrier.mailing_address?.code_number || 0) === 0 ? (this.props.selectedCarrier.mailing_address?.code || '') : this.props.selectedCarrier.mailing_address?.code + this.props.selectedCarrier.mailing_address?.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.name}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.address1}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.address2}</span>
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
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.city}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.mailing_address?.state || '').toUpperCase()}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.zip}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.mailing_address?.mailing_contact?.first_name || '') +
                                    ((this.props.selectedCarrier?.mailing_address?.mailing_contact?.last_name || '') === ''
                                        ? ''
                                        : ' ' + this.props.selectedCarrier?.mailing_address?.mailing_contact?.last_name)
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
                                        (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work || '')
                                            : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                                ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                                : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                    ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                    : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                        ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_direct || '')
                                                        : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_other || '')
                                                            : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_ext || ''
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                        ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_work || '')
                                        : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_personal || '')
                                            : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                                ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_other || '')
                                                : ''
                                }</span>
                            </div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    {
                        (this.props.selectedCarrier?.contacts || []).length > 0 &&
                        <div className="page-block" style={{ paddingTop: '2rem' }}>
                            <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                <div className="form-title" style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    top: -10,
                                    left: 10,
                                    padding: '0 10px'
                                }}>Contacts</div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    display: 'grid',
                                    gridTemplateColumns: '3fr 2fr 1fr 4fr',
                                    marginBottom: '2px'
                                }}>
                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>NAME</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>PHONE</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>EXT</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>E-MAIL</span>
                                    </div>
                                </div>

                                {
                                    this.props.selectedCarrier.contacts.map((contact, index) => {
                                        return (
                                            <div key={index} style={{
                                                ...this.styleFlexRow,
                                                display: 'grid',
                                                gridTemplateColumns: '3fr 2fr 1fr 4fr',
                                                marginBottom: '2px'
                                            }}>
                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{contact.first_name} {contact.last_name}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{
                                                        contact.primary_phone === 'work' ? contact.phone_work
                                                            : contact.primary_phone === 'fax' ? contact.phone_work_fax
                                                                : contact.primary_phone === 'mobile' ? contact.phone_mobile
                                                                    : contact.primary_phone === 'direct' ? contact.phone_direct
                                                                        : contact.primary_phone === 'other' ? contact.phone_other
                                                                            : ''
                                                    }</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{contact.phone_ext}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{
                                                        contact.primary_email === 'work' ? contact.email_work
                                                            : contact.primary_email === 'personal' ? contact.email_personal
                                                                : contact.primary_email === 'other' ? contact.email_other
                                                                    : ''
                                                    }</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Factoring Company</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selectedCarrier.factoring_company?.code_number || 0) === 0 ? (this.props.selectedCarrier.factoring_company?.code || '') : this.props.selectedCarrier.factoring_company?.code + this.props.selectedCarrier.factoring_company?.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.factoring_company?.name}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.factoring_company?.address1}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.factoring_company?.address2}</span>
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
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.factoring_company?.city}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.factoring_company?.state || '').toUpperCase()}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.factoring_company?.zip}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier.factoring_company?.contact_name || '')
                                        : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).last_name
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
                                        (this.props.selectedCarrier.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier.factoring_company?.contact_phone || '')
                                            : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_work
                                                : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        (this.props.selectedCarrier.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier.factoring_company?.ext || '')
                                            : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).phone_ext
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier.factoring_company?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier.factoring_company?.email || '')
                                        : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                            ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).email_work
                                            : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).email_personal
                                                : this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                    ? this.props.selectedCarrier.factoring_company?.contacts.find(c => c.is_primary === 1).email_other
                                                    : ''
                                }</span>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10, fontSize: '0.7rem' }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Equipments</div>

                            <div style={{
                                ...this.styleFlexRow,
                                display: 'grid',
                                gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                                marginBottom: '2px'
                            }}>
                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, fontSize: '0.7rem' }}>EQUIPMENT</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ ...this.styleFieldName, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>UNITS</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ ...this.styleFieldName, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>LENGTH</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ ...this.styleFieldName, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>WIDTH</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ ...this.styleFieldName, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>HEIGHT</span>
                                </div>
                            </div>

                            {
                                (this.props.selectedCarrier.equipments_information || []).map((equipment, index) => {
                                    return (
                                        <div key={index} style={{
                                            ...this.styleFlexRow,
                                            display: 'grid',
                                            gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                                            marginBottom: '2px'
                                        }}>
                                            <div style={{
                                                ...this.styleFlexRow
                                            }}>
                                                <span style={{ ...this.styleFieldDataBold, fontSize: '0.7rem' }}>{equipment.equipment?.name || ''}</span>
                                            </div>

                                            <div style={{
                                                ...this.styleFlexRow,
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ ...this.styleFieldDataBold, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>{equipment.units || ''}</span>
                                            </div>

                                            <div style={{
                                                ...this.styleFlexRow,
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ ...this.styleFieldDataBold, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>{(equipment.equipment_length || '') + ((equipment.equipment_length || '') !== '' ? (equipment.equipment_length_unit || '') === 'ft' ? '\'' : (equipment.equipment_length_unit || '') === 'in' ? '"' : '' : '')}</span>
                                            </div>

                                            <div style={{
                                                ...this.styleFlexRow,
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ ...this.styleFieldDataBold, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>{(equipment.equipment_width || '') + ((equipment.equipment_width || '') !== '' ? (equipment.equipment_width_unit || '') === 'ft' ? '\'' : (equipment.equipment_width_unit || '') === 'in' ? '"' : '' : '')}</span>
                                            </div>

                                            <div style={{
                                                ...this.styleFlexRow,
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ ...this.styleFieldDataBold, fontSize: '0.7rem', justifyContent: 'center', display: 'flex' }}>{(equipment.equipment_height || '') + ((equipment.equipment_height || '') !== '' ? (equipment.equipment_height_unit || '') === 'ft' ? '\'' : (equipment.equipment_height_unit || '') === 'in' ? '"' : '' : '')}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    {
                        (this.props.selectedCarrier?.contacts || []).length > 0 &&
                        <div className="page-block" style={{ paddingTop: '2rem' }}>
                            <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                <div className="form-title" style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    top: -10,
                                    left: 10,
                                    padding: '0 10px'
                                }}>Insurances</div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 3fr 3fr 1fr 1fr',
                                    marginBottom: '4px',
                                    gridGap: '0.2rem'
                                }}>
                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>TYPE</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>COMPANY</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>EXPIRATION DATE</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>AMOUNT</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>DEDUCTIBLE</span>
                                    </div>
                                </div>

                                {
                                    this.props.selectedCarrier.insurances.map((insurance, index) => {
                                        return (
                                            <div key={index} style={{
                                                ...this.styleFlexRow,
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 3fr 3fr 1fr 1fr',
                                                marginBottom: '2px',
                                                gridGap: '0.2rem'
                                            }}>
                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(insurance.insurance_type?.name || '').toUpperCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(insurance.company || '').toUpperCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{insurance.expiration_date || ''}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{accounting.formatMoney(insurance.amount || 0)}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{accounting.formatMoney(insurance.deductible || 0)}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* PAGE BLOCK */}
                    {
                        (this.props.selectedCarrier.notes || []).length > 0
                            ?
                            <div className="page-block" style={{ paddingTop: '2rem' }}>
                                <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                    <div className="form-title" style={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        top: -10,
                                        left: 10,
                                        padding: '0 10px'
                                    }}>Notes</div>

                                    {
                                        this.props.selectedCarrier.notes.map((note, index) => {
                                            return (
                                                <div key={index} style={{ ...this.styleFieldData, marginBottom: '5px' }}>
                                                    {note.text.split(/\r?\n/).map((text, i) => (
                                                        <div key={i}>{text.toUpperCase()}</div>
                                                    ))}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className="page-block" style={{ paddingTop: '2rem' }}>
                                <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', height: 200 }}>
                                    <div className="form-title" style={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        top: -10,
                                        left: 10,
                                        padding: '0 10px'
                                    }}>Notes</div>
                                </div>
                            </div>
                    }


                </div>

                <div className="no-print" style={{ height: '2rem' }}></div>

                <div className="container-sheet">
                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', pageBreakBefore: 'always' }}>
                        <div style={{ ...this.styleFieldName, textAlign: 'center', fontSize: '1rem', fontFamily: 'Play', fontWeight: 'bold' }}>
                            DRIVER INFORMATION
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ display: 'grid', gridTemplateColumns: '1fr 150px 1fr' }}>
                        <div style={{ ...this.styleFlexRow, justifyContent: 'flex-end' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>MC#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.mc_number || '')}</span>
                        </div>

                        <div style={{ ...this.styleFlexRow, justifyContent: 'center' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>DOT#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.dot_number || '')}</span>
                        </div>

                        <div style={{ ...this.styleFlexRow, justifyContent: 'flex-start' }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>SCAC#:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.scac || '')}</span>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Carrier</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selectedCarrier.code_number || 0) === 0 ? (this.props.selectedCarrier.code || '') : this.props.selectedCarrier.code + this.props.selectedCarrier.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.name}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.address1}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.address2}</span>
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
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.city}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.state || '').toUpperCase()}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.zip}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier?.contact_name || '')
                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).last_name
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
                                        (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier?.contact_phone || '')
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work
                                                : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                    ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                    : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                        ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                            ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_direct
                                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_other
                                                                : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                            ? (this.props.selectedCarrier?.ext || '')
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).phone_ext
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCarrier?.email || '')
                                        : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                            ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_work
                                            : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                                ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_personal
                                                : this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                    ? this.props.selectedCarrier?.contacts.find(c => c.is_primary === 1).email_other
                                                    : ''
                                }</span>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Billing Address</div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px',
                                marginTop: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{((this.props.selectedCarrier.mailing_address?.code_number || 0) === 0 ? (this.props.selectedCarrier.mailing_address?.code || '') : this.props.selectedCarrier.mailing_address?.code + this.props.selectedCarrier.mailing_address?.code_number).toUpperCase()}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.name}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.address1}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.address2}</span>
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
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.city}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{(this.props.selectedCarrier.mailing_address?.state || '').toUpperCase()}</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCarrier.mailing_address?.zip}</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.mailing_address?.mailing_contact?.first_name || '') +
                                    ((this.props.selectedCarrier?.mailing_address?.mailing_contact?.last_name || '') === ''
                                        ? ''
                                        : ' ' + this.props.selectedCarrier?.mailing_address?.mailing_contact?.last_name)
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
                                        (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work || '')
                                            : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                                ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                                : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                    ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                    : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                        ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_direct || '')
                                                        : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_other || '')
                                                            : ''
                                    }</span>
                                </div>

                                <div style={{
                                    ...this.styleFlexRow
                                }}>
                                    <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                        this.props.selectedCarrier?.mailing_address?.mailing_contact?.phone_ext || ''
                                    }</span>
                                </div>
                            </div>

                            <div style={{
                                ...this.styleFlexRow,
                                marginBottom: '2px'
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                        ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_work || '')
                                        : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                            ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_personal || '')
                                            : (this.props.selectedCarrier?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                                ? (this.props.selectedCarrier?.mailing_address?.mailing_contact?.email_other || '')
                                                : ''
                                }</span>
                            </div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    {
                        (this.props.selectedCarrier?.contacts || []).length > 0 &&
                        <div className="page-block" style={{ paddingTop: '2rem' }}>
                            <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                <div className="form-title" style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    top: -10,
                                    left: 10,
                                    padding: '0 10px'
                                }}>Drivers</div>

                                <div style={{
                                    ...this.styleFlexRow,
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1.5fr 2fr 2fr 1fr 1fr',
                                    marginBottom: '2px'
                                }}>
                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>NAME</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>PHONE</span>
                                    </div>                                    

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>E-MAIL</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>EQUIPMENT</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>UNIT</span>
                                    </div>

                                    <div style={{
                                        ...this.styleFlexRow
                                    }}>
                                        <span style={{ ...this.styleFieldName }}>TRAILER</span>
                                    </div>
                                </div>

                                {
                                    (this.props.selectedCarrier.drivers || []).map((driver, index) => {
                                        return (
                                            <div key={index} style={{
                                                ...this.styleFlexRow,
                                                display: 'grid',
                                                gridTemplateColumns: '2fr 1.5fr 2fr 2fr 1fr 1fr',
                                                marginBottom: '2px'
                                            }}>
                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{((driver.first_name || '') + ' ' + (driver.last_name || '')).toUpperCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(driver.phone || '').toUpperCase()}</span>
                                                </div>
                                                
                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(driver.email || '').toLowerCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(driver.equipment?.name || '').toUpperCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(driver.truck || '').toUpperCase()}</span>
                                                </div>

                                                <div style={{
                                                    ...this.styleFlexRow
                                                }}>
                                                    <span style={{ ...this.styleFieldDataBold }}>{(driver.trailer || '').toUpperCase()}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingTop: '2rem' }}>
                        <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', height: 200 }}>
                            <div className="form-title" style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -10,
                                left: 10,
                                padding: '0 10px'
                            }}>Notes</div>
                        </div>
                    </div>

                    {/* PAGE BLOCK */}
                    <div className="page-block" style={{ paddingBottom: '2rem' }}></div>
                </div>

            </div>
        )
    }
}
