import React, { Component } from 'react'
import moment from 'moment';
import './Customers.css';

export default class ToPrint extends Component {
    constructor(props) {
        super(props)
    }

    styleFlexRow = {
        display: 'flex',
        flexDirection: 'row',
    }
    styleFlexCol = {
        display: 'flex',
        flexDirection: 'column'
    }
    styleFieldName = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap'
    }
    styleFieldData = {
        color: 'red',
        fontSize: '0.8rem'
    }
    styleTitleBackground = {
        backgroundColor: 'lightgray'
    }
    styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '0.8rem'
    }

    render() {
        return (
            <div className="content-page" style={{
                fontSize: '0.9rem',
                padding: '0 15mm'
            }}>
                {/* PAGE BLOCK */}
                <div className="page-block" style={{ paddingTop: '2rem' }}>
                    <div style={{ ...this.styleFieldName, textAlign: 'center', fontSize: '1rem' }}>
                        CUSTOMER INFORMATION
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
                        }}>Customer</div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px',
                            marginTop: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.code + (this.props.selectedCustomer.code_number === 0 ? '' : this.props.selectedCustomer.code_number)}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.name}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.address1}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.address2}</span>
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
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.city}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.state}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.zip}</span>
                            </div>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                (this.props.selectedCustomer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                    ? (this.props.selectedCustomer?.contact_name || '')
                                    : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).first_name + ' ' + this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).last_name
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
                                    (this.props.selectedCustomer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCustomer?.contact_phone || '')
                                        : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_phone === 'work'
                                            ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_work
                                            : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_phone === 'fax'
                                                ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_work_fax
                                                : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_phone === 'mobile'
                                                    ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_mobile
                                                    : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_phone === 'direct'
                                                        ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_direct
                                                        : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_phone === 'other'
                                                            ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_other
                                                            : ''
                                }</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    (this.props.selectedCustomer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                        ? (this.props.selectedCustomer?.ext || '')
                                        : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).phone_ext
                                }</span>
                            </div>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                (this.props.selectedCustomer?.contacts || []).find(c => c.is_primary === 1) === undefined
                                    ? (this.props.selectedCustomer?.email || '')
                                    : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_email === 'work'
                                        ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).email_work
                                        : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_email === 'personal'
                                            ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).email_personal
                                            : this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).primary_email === 'other'
                                                ? this.props.selectedCustomer?.contacts.find(c => c.is_primary === 1).email_other
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
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>CODE:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.code + (this.props.selectedCustomer.mailing_address?.code_number === 0 ? '' : this.props.selectedCustomer.mailing_address?.code_number)}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.name}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 1:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.address1}</span>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>ADDRESS 2:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.address2}</span>
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
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>CITY:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.city}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>STATE:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.state}</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>ZIP:</span> <span style={{ ...this.styleFieldDataBold }}>{this.props.selectedCustomer.mailing_address?.zip}</span>
                            </div>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>CONTACT NAME:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                (this.props.selectedCustomer?.mailing_address?.mailing_contact?.first_name || '') +
                                ((this.props.selectedCustomer?.mailing_address?.mailing_contact?.last_name || '') === ''
                                    ? ''
                                    : ' ' + this.props.selectedCustomer?.mailing_address?.mailing_contact?.last_name)
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
                                    (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'work'
                                        ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work || '')
                                        : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'fax'
                                            ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_work_fax || '')
                                            : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'mobile'
                                                ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_mobile || '')
                                                : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'direct'
                                                    ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_direct || '')
                                                    : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_phone || '') === 'other'
                                                        ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_other || '')
                                                        : ''
                                }</span>
                            </div>

                            <div style={{
                                ...this.styleFlexRow
                            }}>
                                <span style={{ ...this.styleFieldName, marginRight: 10 }}>EXT:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                    this.props.selectedCustomer?.mailing_address?.mailing_contact?.phone_ext || ''
                                }</span>
                            </div>
                        </div>

                        <div style={{
                            ...this.styleFlexRow,
                            marginBottom: '2px'
                        }}>
                            <span style={{ ...this.styleFieldName, marginRight: 10 }}>E-MAIL:</span> <span style={{ ...this.styleFieldDataBold }}>{
                                (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'work'
                                    ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.email_work || '')
                                    : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'personal'
                                        ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.email_personal || '')
                                        : (this.props.selectedCustomer?.mailing_address?.mailing_contact_primary_email || '') === 'other'
                                            ? (this.props.selectedCustomer?.mailing_address?.mailing_contact?.email_other || '')
                                            : ''
                            }</span>
                        </div>
                    </div>
                </div>

                {/* PAGE BLOCK */}
                {
                    (this.props.selectedCustomer?.contacts || []).length > 0 &&
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
                                this.props.selectedCustomer.contacts.map((contact, index) => {
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
                {
                    (this.props.selectedCustomer.directions || []).length > 0
                        ?
                        <div className="page-block" style={{ paddingTop: '2rem' }}>
                            <div className="form-bordered-box" style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.8)', padding: 10 }}>
                                <div className="form-title" style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    top: -10,
                                    left: 10,
                                    padding: '0 10px'
                                }}>Directions</div>

                                {
                                    this.props.selectedCustomer.directions.map((direction, index) => {
                                        return (
                                            <div key={index} style={{ ...this.styleFieldData, marginBottom: '5px' }}>
                                                {direction.text.split(/\r?\n/).map((text, i) => (
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
                                }}>Directions</div>
                            </div>
                        </div>

                }

                {/* PAGE BLOCK */}
                {
                    (this.props.selectedCustomer.notes || []).length > 0
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
                                    this.props.selectedCustomer.notes.map((note, index) => {
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
        )
    }
}
