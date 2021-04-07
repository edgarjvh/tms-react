import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './BillToCompanyContacts.css';
import {
    setDispatchPanels,
    setSelectedBillToCompanyContact,
    setBillToCompanyContactSearchCustomer,
    setSelectedBillToCompanyInfo,
    setBillToCompanyIsEditingContact
} from './../../../../../actions';
import MaskedInput from 'react-text-mask';

function BillToCompanyContacts(props) {    
    const refPrefix = useRef();
    const refInputAvatar = useRef();

    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'bill-to-company-contacts') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
    }

    var lastLetter = '';

    const borderBottomClasses = classnames({
        'field-border-bottom': true,
        'disabled': !props.billToCompanyIsEditingContact
    });

    const saveContact = () => {
        let contact = props.customer.selectedBillToCompanyContact;

        if ((contact.first_name || '').trim() === '') {
            window.alert('You must enter the first name!');
            return;
        }

        if ((contact.last_name || '').trim() === '') {
            window.alert('You must enter the last name!');
            return;
        }

        if ((contact.phone_work || '').trim() === '') {
            window.alert('You must enter the phone work!');
            return;
        }

        if ((contact.email_work || '').trim() === '') {
            window.alert('You must enter the e-mail work!');
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.customer.address1;
            contact.address2 = props.customer.address2;
            contact.city = props.customer.city;
            contact.state = props.customer.state;
            contact.zip_code = props.customer.zip;
        }

        $.post(props.serverUrl + '/saveContact', contact).then(async res => {
            if (res.result === 'OK') {
                if (props.selectedBillToCompanyInfo.id !== undefined) {
                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                }

                if (props.selectedBillToCompanyContact.id !== undefined) {
                    if (props.selectedBillToCompanyContact.id === contact.id) {
                        await props.setSelectedBillToCompanyContact(res.contact);
                    }
                }

                await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: res.contact, contacts: res.contacts });

                props.setBillToCompanyIsEditingContact(false);
            }
        });
    }

    const deleteContact = () => {
        let contact = props.customer.selectedBillToCompanyContact;

        if (window.confirm('Are you sure to delete this contact?')) {
            $.post(props.serverUrl + '/deleteContact', contact).then(async res => {
                if (res.result === 'OK') {
                    if (props.selectedBillToCompanyInfo.id !== undefined) {
                        await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                    }

                    if (props.selectedBillToCompanyContact.id !== undefined) {
                        if (props.selectedBillToCompanyContact.id === contact.id) {
                            await props.setSelectedBillToCompanyContact({});
                        }
                    }

                    await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: {}, contacts: res.contacts });

                    props.setBillToCompanyIsEditingContact(false);
                }
            });
        }
    }

    const contactAvatarChange = (e) => {
        let files = e.target.files;
        const maxSize = 1048576;

        if (FileReader && files && (files.length > 0)){
            if (files[0].size > maxSize) {
                window.alert("Selected image is too large, please select an image below 1mb");
                return;
            }

            let formData = new FormData();
            formData.append("avatar", files[0]);
            formData.append("contact_id", props.customer.selectedBillToCompanyContact?.id);
            formData.append("customer_id", props.customer.id);

            $.ajax({
                method: "post",
                url: props.serverUrl + "/uploadAvatar",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: async res => {
                    if (res.result === "OK") {
                        if (props.selectedBillToCompanyInfo.id !== undefined) {
                            await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                        }                           
    
                        await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: res.contact, contacts: res.contacts });
                    }
                },
                error: err => {
                    console.log("ajax error");
                },
            });
        }        
    }

    const removeContactAvatar = (e) => {
        $.post(props.serverUrl + '/removeAvatar', props.customer.selectedBillToCompanyContact).then(async res => {
            if (res.result === "OK") {
                if (props.selectedBillToCompanyInfo.id !== undefined) {
                    await props.setSelectedBillToCompanyInfo({ ...props.selectedBillToCompanyInfo, contacts: res.contacts });
                }                           

                await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: res.contact, contacts: res.contacts });
            }
        })
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>

            <div className="contact-container">

                <div className="contact-list-container">
                    <div className="title">{props.title}</div>

                    <div className="contact-list">
                        <div className="contact-list-wrapper">
                            {
                                (props.customer.contacts || []).map((contact, index) => {
                                    let curLetter = contact.last_name.substring(0, 1).toLowerCase();
                                    if (curLetter !== lastLetter) {
                                        lastLetter = curLetter;
                                        return (
                                            <div key={index}>
                                                <div className="letter-header">{curLetter}</div>

                                                <div className="row-contact" onClick={async () => {
                                                    await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                                    props.setBillToCompanyIsEditingContact(false);
                                                }}>
                                                    <div className="contact-avatar-container">
                                                        <img src={contact.avatar ? props.serverUrl + '/avatars/' + contact.avatar : 'img/avatar-user-default.png'} alt="" />
                                                    </div>

                                                    <div className="contact-data">
                                                        <div className="contact-name">{(contact.prefix || '') + " " + contact.first_name + " " + (contact.middle_name || '') + " " + contact.last_name}</div>
                                                        <div className={contact.is_online === 1 ? 'is-online is-online-on' : 'is-online is-online-off'}></div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    } else {
                                        return (
                                            <div key={index} className="row-contact" onClick={async () => {
                                                await props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                                props.setBillToCompanyIsEditingContact(false);
                                            }}>
                                                <div className="contact-avatar-container">
                                                    <img src={contact.avatar ? props.serverUrl + '/avatars/' + contact.avatar : 'img/avatar-user-default.png'} alt="" />
                                                </div>

                                                <div className="contact-data">
                                                    <div className="contact-name">{(contact.prefix || '') + " " + contact.first_name + " " + (contact.middle_name || '') + " " + contact.last_name}</div>
                                                    <div className={contact.is_online === 1 ? 'is-online is-online-on' : 'is-online is-online-off'}></div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <div className="contact-form-header">
                        <div className="contact-avatar-container">

                            {
                                (props.billToCompanyIsEditingContact && (props.customer.selectedBillToCompanyContact?.id || 0) > 0 && (props.customer.selectedBillToCompanyContact?.avatar || '') !== '') && <span className="fas fa-trash-alt remove-contact-avatar-btn" onClick={removeContactAvatar}></span>
                            }
                            {
                                (props.billToCompanyIsEditingContact && (props.customer.selectedBillToCompanyContact?.id || 0) > 0) && <span className="fas fa-sync change-contact-avatar-btn" onClick={() => {refInputAvatar.current.click()}}></span>
                            }
                            
                            <form encType='multipart/form-data' style={{display: 'none'}}>
                                <input type="file" ref={refInputAvatar} accept='image/*' onChange={contactAvatarChange} />
                            </form>

                            <div className="contact-avatar-wrapper">
                                <img src={props.customer.selectedBillToCompanyContact?.avatar ? props.serverUrl + '/avatars/' + props.customer.selectedBillToCompanyContact?.avatar : 'img/avatar-user-default.png'} alt="" />
                            </div>

                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                {(props.customer.selectedBillToCompanyContact?.prefix || '') + " " + (props.customer.selectedBillToCompanyContact?.first_name || '') + " " + (props.customer.selectedBillToCompanyContact?.middle_name || '') + " " + (props.customer.selectedBillToCompanyContact?.last_name || '')}
                            </div>
                            <div className="contact-company"><span style={{ fontWeight: 'bold' }}>{props.customer.selectedBillToCompanyContact?.id !== undefined ? props.customer.name : ''}</span> <span>{(props.customer.selectedBillToCompanyContact?.title || '')}</span> <span style={{ fontWeight: 'bold' }}>{(props.customer.selectedBillToCompanyContact?.department || '')}</span></div>
                        </div>
                        <div className="contact-buttons">
                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-panel-customer-contacts-primary-btn"
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.is_primary = e.target.checked ? 1 : 0;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    disabled={!props.billToCompanyIsEditingContact}
                                    checked={(props.customer.selectedBillToCompanyContact?.is_primary || 0) === 1} />
                                <label htmlFor="cbox-panel-customer-contacts-primary-btn">
                                    <div className="label-text">Primary</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>

                            <div className="mochi-button" onClick={deleteContact} style={{
                                pointerEvents: (props.customer.selectedBillToCompanyContact?.id !== undefined && props.customer.selectedBillToCompanyContact?.id > 0) ? 'all' : 'none'
                            }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base" style={{color: (props.customer.selectedBillToCompanyContact?.id !== undefined && props.customer.selectedBillToCompanyContact?.id > 0) ? 'rgba(138,8,8,1)' : 'rgba(138,8,8,0.5)'}}>Delete</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-fields">
                        <div className="contact-form-wrapper">
                            <div className="field-container">
                                <div className="field-title">Prefix</div>
                                <input ref={refPrefix} type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.prefix = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.prefix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">First Name</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.first_name = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.first_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Middle Name</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.middle_name = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.middle_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Last Name</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.last_name = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.last_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Suffix</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.suffix = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.suffix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Company</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    value={props.customer.selectedBillToCompanyContact?.id !== undefined ? props.customer.name : ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Title</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.title = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.title || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Department</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.department = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.department || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Work</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.email_work = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.email_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Personal</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.email_personal = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.email_personal || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Other</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.email_other = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.email_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_work = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Ext</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_ext = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_ext || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work Fax</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_work_fax = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_work_fax || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Mobile</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_mobile = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_mobile || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Direct</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_direct = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_direct || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Other</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.phone_other = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.phone_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Country</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.country = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.country || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 1</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.address1 = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.address1 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 2</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.address2 = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.address2 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">City</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.city = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.city || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">State</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.state = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.state || ''}
                                    style={{ textTransform: 'uppercase' }} maxLength={2} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Postal Code</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.zip_code = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.zip_code || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Birthday</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.birthday = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.birthday || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Website</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.website = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.website || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Notes</div>
                                <input type="text" readOnly={!props.billToCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedBillToCompanyContact;
                                        contact.notes = e.target.value;
                                        props.setBillToCompanyContactSearchCustomer({ ...props.customer, selectedBillToCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedBillToCompanyContact?.notes || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="left-buttons">
                        <div className="mochi-button" onClick={() => {
                            props.setBillToCompanyContactSearchCustomer({...props.customer, selectedBillToCompanyContact: {id: 0, customer_id: props.customer.id}});
                            props.setBillToCompanyIsEditingContact(true);
                            refPrefix.current.focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">
                                Add Contact
                        </div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>

                    <div className="right-buttons">
                        {
                            props.billToCompanyIsEditingContact &&
                            <span className="fas fa-save" onClick={saveContact}></span>
                        }
                        {
                            !props.billToCompanyIsEditingContact &&
                            <span className="fas fa-pencil-alt" onClick={() => { props.setBillToCompanyIsEditingContact(true) }} style={{
                                color: props.customer.selectedBillToCompanyContact?.id !== undefined ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
                                pointerEvents: props.customer.selectedBillToCompanyContact?.id !== undefined ? 'all' : 'none'
                            }}></span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,
        customer: state.customerReducers.billToCompanyContactSearchCustomer,
        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
        billToCompanyContacts: state.customerReducers.billToCompanyContacts,
        billToCompanyIsEditingContact: state.customerReducers.billToCompanyIsEditingContact
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedBillToCompanyContact,
    setBillToCompanyContactSearchCustomer,
    setSelectedBillToCompanyInfo,
    setBillToCompanyIsEditingContact
})(BillToCompanyContacts)