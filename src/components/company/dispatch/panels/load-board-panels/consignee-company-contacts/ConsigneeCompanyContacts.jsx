import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './ConsigneeCompanyContacts.css';
import {    
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanyContactSearchCustomer,
    setLbSelectedConsigneeCompanyInfo,
    setLbConsigneeCompanyIsEditingContact,
    setDispatchOpenedPanels
} from './../../../../../../actions';
import MaskedInput from 'react-text-mask';

function ConsigneeCompanyContacts(props) {    
    const refPrefix = useRef();
    const refInputAvatar = useRef();

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var lastLetter = '';

    const borderBottomClasses = classnames({
        'field-border-bottom': true,
        'disabled': !props.consigneeCompanyIsEditingContact
    });

    const saveContact = () => {
        let contact = props.customer.selectedConsigneeCompanyContact;

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
                if (props.selectedConsigneeCompanyInfo.id !== undefined) {
                    await props.setLbSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.contacts });
                }

                if (props.selectedConsigneeCompanyContact.id !== undefined) {
                    if (props.selectedConsigneeCompanyContact.id === contact.id) {
                        await props.setLbSelectedConsigneeCompanyContact(res.contact);
                    }
                }

                await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: res.contact, contacts: res.contacts });

                props.setLbConsigneeCompanyIsEditingContact(false);
            }
        });
    }

    const deleteContact = () => {
        let contact = props.customer.selectedConsigneeCompanyContact;

        if (window.confirm('Are you sure to delete this contact?')) {
            $.post(props.serverUrl + '/deleteContact', contact).then(async res => {
                if (res.result === 'OK') {
                    if (props.selectedConsigneeCompanyInfo.id !== undefined) {
                        await props.setLbSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.contacts });
                    }

                    if (props.selectedConsigneeCompanyContact.id !== undefined) {
                        if (props.selectedConsigneeCompanyContact.id === contact.id) {
                            await props.setLbSelectedConsigneeCompanyContact({});
                        }
                    }

                    await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: {}, contacts: res.contacts });

                    props.setLbConsigneeCompanyIsEditingContact(false);
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
            formData.append("contact_id", props.customer.selectedConsigneeCompanyContact?.id);
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
                        if (props.selectedConsigneeCompanyInfo.id !== undefined) {
                            await props.setLbSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.contacts });
                        }                           
    
                        await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: res.contact, contacts: res.contacts });
                    }
                },
                error: err => {
                    console.log("ajax error");
                },
            });
        }        
    }

    const removeContactAvatar = (e) => {
        $.post(props.serverUrl + '/removeAvatar', props.customer.selectedConsigneeCompanyContact).then(async res => {
            if (res.result === "OK") {
                if (props.selectedConsigneeCompanyInfo.id !== undefined) {
                    await props.setLbSelectedConsigneeCompanyInfo({ ...props.selectedConsigneeCompanyInfo, contacts: res.contacts });
                }                           

                await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: res.contact, contacts: res.contacts });
            }
        })
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-consignee-company-contacts')}><span className="fas fa-times"></span></div>

            <div className="contact-container">

                <div className="contact-list-container">
                    <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

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
                                                    await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                                    props.setLbConsigneeCompanyIsEditingContact(false);
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
                                                await props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                                props.setLbConsigneeCompanyIsEditingContact(false);
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
                                (props.consigneeCompanyIsEditingContact && (props.customer.selectedConsigneeCompanyContact?.id || 0) > 0 && (props.customer.selectedConsigneeCompanyContact?.avatar || '') !== '') && <span className="fas fa-trash-alt remove-contact-avatar-btn" onClick={removeContactAvatar}></span>
                            }
                            {
                                (props.consigneeCompanyIsEditingContact && (props.customer.selectedConsigneeCompanyContact?.id || 0) > 0) && <span className="fas fa-sync change-contact-avatar-btn" onClick={() => {refInputAvatar.current.click()}}></span>
                            }
                            
                            <form encType='multipart/form-data' style={{display: 'none'}}>
                                <input type="file" ref={refInputAvatar} accept='image/*' onChange={contactAvatarChange} />
                            </form>

                            <div className="contact-avatar-wrapper">
                                <img src={props.customer.selectedConsigneeCompanyContact?.avatar ? props.serverUrl + '/avatars/' + props.customer.selectedConsigneeCompanyContact?.avatar : 'img/avatar-user-default.png'} alt="" />
                            </div>

                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                {(props.customer.selectedConsigneeCompanyContact?.prefix || '') + " " + (props.customer.selectedConsigneeCompanyContact?.first_name || '') + " " + (props.customer.selectedConsigneeCompanyContact?.middle_name || '') + " " + (props.customer.selectedConsigneeCompanyContact?.last_name || '')}
                            </div>
                            <div className="contact-company"><span style={{ fontWeight: 'bold' }}>{props.customer.selectedConsigneeCompanyContact?.id !== undefined ? props.customer.name : ''}</span> <span>{(props.customer.selectedConsigneeCompanyContact?.title || '')}</span> <span style={{ fontWeight: 'bold' }}>{(props.customer.selectedConsigneeCompanyContact?.department || '')}</span></div>
                        </div>
                        <div className="contact-buttons">
                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-panel-customer-contacts-primary-btn"
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.is_primary = e.target.checked ? 1 : 0;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    disabled={!props.consigneeCompanyIsEditingContact}
                                    checked={(props.customer.selectedConsigneeCompanyContact?.is_primary || 0) === 1} />
                                <label htmlFor="cbox-panel-customer-contacts-primary-btn">
                                    <div className="label-text">Primary</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>

                            <div className="mochi-button" onClick={deleteContact} style={{
                                pointerEvents: (props.customer.selectedConsigneeCompanyContact?.id !== undefined && props.customer.selectedConsigneeCompanyContact?.id > 0) ? 'all' : 'none'
                            }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base" style={{color: (props.customer.selectedConsigneeCompanyContact?.id !== undefined && props.customer.selectedConsigneeCompanyContact?.id > 0) ? 'rgba(138,8,8,1)' : 'rgba(138,8,8,0.5)'}}>Delete</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-fields">
                        <div className="contact-form-wrapper">
                            <div className="field-container">
                                <div className="field-title">Prefix</div>
                                <input ref={refPrefix} type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.prefix = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.prefix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">First Name</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.first_name = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.first_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Middle Name</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.middle_name = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.middle_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Last Name</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.last_name = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.last_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Suffix</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.suffix = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.suffix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Company</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    value={props.customer.selectedConsigneeCompanyContact?.id !== undefined ? props.customer.name : ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Title</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.title = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.title || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Department</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.department = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.department || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Work</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.email_work = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.email_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Personal</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.email_personal = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.email_personal || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Other</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.email_other = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.email_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_work = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Ext</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_ext = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_ext || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work Fax</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_work_fax = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_work_fax || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Mobile</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_mobile = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_mobile || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Direct</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_direct = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_direct || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Other</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.phone_other = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.phone_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Country</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.country = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.country || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 1</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.address1 = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.address1 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 2</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.address2 = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.address2 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">City</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.city = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.city || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">State</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.state = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.state || ''}
                                    style={{ textTransform: 'uppercase' }} maxLength={2} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Postal Code</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.zip_code = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.zip_code || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Birthday</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.birthday = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.birthday || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Website</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.website = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.website || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Notes</div>
                                <input type="text" readOnly={!props.consigneeCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.customer.selectedConsigneeCompanyContact;
                                        contact.notes = e.target.value;
                                        props.setLbConsigneeCompanyContactSearchCustomer({ ...props.customer, selectedConsigneeCompanyContact: contact });
                                    }}
                                    value={props.customer.selectedConsigneeCompanyContact?.notes || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="left-buttons">
                        <div className="mochi-button" onClick={() => {
                            props.setLbConsigneeCompanyContactSearchCustomer({...props.customer, selectedConsigneeCompanyContact: {id: 0, customer_id: props.customer.id}});
                            props.setLbConsigneeCompanyIsEditingContact(true);
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
                            props.consigneeCompanyIsEditingContact &&
                            <span className="fas fa-save" onClick={saveContact}></span>
                        }
                        {
                            !props.consigneeCompanyIsEditingContact &&
                            <span className="fas fa-pencil-alt" onClick={() => { props.setLbConsigneeCompanyIsEditingContact(true) }} style={{
                                color: props.customer.selectedConsigneeCompanyContact?.id !== undefined ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
                                pointerEvents: props.customer.selectedConsigneeCompanyContact?.id !== undefined ? 'all' : 'none'
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
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        customer: state.customerReducers.lbConsigneeCompanyContactSearchCustomer,
        selectedConsigneeCompanyInfo: state.customerReducers.selectedLbConsigneeCompanyInfo,
        selectedConsigneeCompanyContact: state.customerReducers.selectedLbConsigneeCompanyContact,
        consigneeCompanyContacts: state.customerReducers.lbConsigneeCompanyContacts,
        consigneeCompanyIsEditingContact: state.customerReducers.lbConsigneeCompanyIsEditingContact
    }
}

export default connect(mapStateToProps, {    
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanyContactSearchCustomer,
    setLbSelectedConsigneeCompanyInfo,
    setLbConsigneeCompanyIsEditingContact,
    setDispatchOpenedPanels
})(ConsigneeCompanyContacts)