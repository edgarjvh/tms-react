import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoFactoringCompanyContacts.css';
import {    
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompany,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchOpenedPanels
} from './../../../../../../actions';
import MaskedInput from 'react-text-mask';

function CarrierInfoFactoringCompanyContacts(props) {
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
        'disabled': !props.lbCarrierInfoFactoringCompanyIsEditingContact
    });

    const saveFactoringCompanyContact = () => {
        let contact = props.factoringCompany.selectedContact;

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
            contact.address1 = props.factoringCompany.address1;
            contact.address2 = props.factoringCompany.address2;
            contact.city = props.factoringCompany.city;
            contact.state = props.factoringCompany.state;
            contact.zip_code = props.factoringCompany.zip;
        }

        $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
            if (res.result === 'OK') {
                if (props.selectedLbCarrierInfoFactoringCompany.id !== undefined) {
                    await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
                }

                if (props.selectedContact.id !== undefined) {
                    if (props.selectedContact.id === contact.id) {
                        await props.setSelectedLbCarrierInfoFactoringCompanyContact(res.contact);
                    }
                }

                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: res.contact, contacts: res.contacts });

                props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
            }
        });
    }

    const deleteContact = () => {
        let contact = props.factoringCompany.selectedContact;

        if (window.confirm('Are you sure to delete this contact?')) {
            $.post(props.serverUrl + '/deleteFactoringCompanyContact', contact).then(async res => {
                if (res.result === 'OK') {
                    if (props.selectedLbCarrierInfoFactoringCompany.id !== undefined) {
                        await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
                    }

                    if (props.selectedContact.id !== undefined) {
                        if (props.selectedContact.id === contact.id) {
                            await props.setSelectedLbCarrierInfoFactoringCompanyContact({});
                        }
                    }

                    await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: {}, contacts: res.contacts });

                    props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
                }
            });
        }
    }

    const contactAvatarChange = (e) => {
        let files = e.target.files;
        const maxSize = 1048576;

        if (FileReader && files && (files.length > 0)) {
            if (files[0].size > maxSize) {
                window.alert("Selected image is too large, please select an image below 1mb");
                return;
            }

            let formData = new FormData();
            formData.append("avatar", files[0]);
            formData.append("contact_id", props.factoringCompany.selectedContact?.id);
            formData.append("factoring_company_id", props.factoringCompany.id);

            $.ajax({
                method: "post",
                url: props.serverUrl + "/uploadFactoringCompanyAvatar",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: async res => {
                    if (res.result === "OK") {
                        if (props.selectedLbCarrierInfoFactoringCompany.id !== undefined) {
                            await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
                        }

                        await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: res.contact, contacts: res.contacts });
                    }
                },
                error: err => {
                    console.log("ajax error");
                },
            });
        }
    }

    const removeContactAvatar = (e) => {
        $.post(props.serverUrl + '/removeFactoringCompanyAvatar', props.factoringCompany.selectedContact).then(async res => {
            if (res.result === "OK") {
                if (props.selectedLbCarrierInfoFactoringCompany.id !== undefined) {
                    await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
                }

                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: res.contact, contacts: res.contacts });
            }
        })
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-carrier-info-factoring-company-contacts')}><span className="fas fa-times"></span></div>

            <div className="contact-container" style={{overflow: 'initial'}}>
                <div className="contact-list-container">
                    <div className="title">{props.title}</div><div className="side-title" style={{left: '-45px'}}><div>{props.title}</div></div>

                    <div className="contact-list">
                        <div className="contact-list-wrapper">
                            {
                                (props.factoringCompany.contacts || []).map((contact, index) => {
                                    let curLetter = contact.last_name.substring(0, 1).toLowerCase();
                                    if (curLetter !== lastLetter) {
                                        lastLetter = curLetter;
                                        return (
                                            <div key={index}>
                                                <div className="letter-header">{curLetter}</div>

                                                <div className="row-contact" onClick={async () => {
                                                    await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                                    props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
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
                                                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                                props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
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
                                (props.lbCarrierInfoFactoringCompanyIsEditingContact && (props.factoringCompany.selectedContact?.id || 0) > 0 && (props.factoringCompany.selectedContact?.avatar || '') !== '') && <span className="fas fa-trash-alt remove-contact-avatar-btn" onClick={removeContactAvatar}></span>
                            }
                            {
                                (props.lbCarrierInfoFactoringCompanyIsEditingContact && (props.factoringCompany.selectedContact?.id || 0) > 0) && <span className="fas fa-sync change-contact-avatar-btn" onClick={() => { refInputAvatar.current.click() }}></span>
                            }

                            <form encType='multipart/form-data' style={{ display: 'none' }}>
                                <input type="file" ref={refInputAvatar} accept='image/*' onChange={contactAvatarChange} />
                            </form>

                            <div className="contact-avatar-wrapper">
                                <img src={props.factoringCompany.selectedContact?.avatar ? props.serverUrl + '/avatars/' + props.factoringCompany.selectedContact?.avatar : 'img/avatar-user-default.png'} alt="" />
                            </div>

                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                {(props.factoringCompany.selectedContact?.prefix || '') + " " + (props.factoringCompany.selectedContact?.first_name || '') + " " + (props.factoringCompany.selectedContact?.middle_name || '') + " " + (props.factoringCompany.selectedContact?.last_name || '')}
                            </div>
                            <div className="contact-company">
                                <span>
                                    {props.factoringCompany.selectedContact.id !== undefined ? props.factoringCompany.name : ''}
                                </span>
                                
                                <span>
                                    {(props.factoringCompany.selectedContact.title || '')}
                                </span>
                                
                                <span>
                                    {(props.factoringCompany.selectedContact.department || '')}
                                </span>
                            </div>                        </div>
                        <div className="contact-buttons">
                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-panel-carrier-info-factoring-company-contacts-primary-btn"
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.is_primary = e.target.checked ? 1 : 0;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    disabled={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    checked={(props.factoringCompany.selectedContact?.is_primary || 0) === 1}
                                     />
                                <label htmlFor="cbox-panel-carrier-info-factoring-company-contacts-primary-btn">
                                    <div className="label-text">Primary</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>

                            <div className="mochi-button" onClick={deleteContact} style={{
                                pointerEvents: (props.factoringCompany.selectedContact?.id !== undefined && props.factoringCompany.selectedContact?.id > 0) ? 'all' : 'none'
                            }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base" style={{ color: (props.factoringCompany.selectedContact?.id !== undefined && props.factoringCompany.selectedContact?.id > 0) ? 'rgba(138,8,8,1)' : 'rgba(138,8,8,0.5)' }}>Delete</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-fields">
                        <div className="contact-form-wrapper">
                            <div className="field-container">
                                <div className="field-title">Prefix</div>
                                <input ref={refPrefix} type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.prefix = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.prefix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">First Name</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.first_name = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.first_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Middle Name</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.middle_name = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.middle_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Last Name</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.last_name = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.last_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Suffix</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.suffix = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.suffix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Company</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    value={props.factoringCompany.selectedContact?.id !== undefined ? props.factoringCompany.name : ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Title</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.title = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.title || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Department</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.department = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.department || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Work</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.email_work = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.email_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Personal</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.email_personal = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.email_personal || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Other</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.email_other = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.email_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_work = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Ext</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_ext = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_ext || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work Fax</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_work_fax = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_work_fax || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Mobile</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_mobile = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_mobile || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Direct</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_direct = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_direct || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Other</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.phone_other = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.phone_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Country</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.country = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.country || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 1</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.address1 = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.address1 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 2</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.address2 = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.address2 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">City</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.city = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.city || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">State</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.state = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.state || ''}
                                    style={{ textTransform: 'uppercase' }} maxLength={2} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Postal Code</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.zip_code = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.zip_code || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Birthday</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.birthday = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.birthday || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Website</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.website = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.website || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Notes</div>
                                <input type="text" readOnly={!props.lbCarrierInfoFactoringCompanyIsEditingContact}
                                    onChange={e => {
                                        let contact = props.factoringCompany.selectedContact;
                                        contact.notes = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: contact });
                                    }}
                                    value={props.factoringCompany.selectedContact?.notes || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="left-buttons">
                        <div className="mochi-button" onClick={() => {
                            props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.factoringCompany, selectedContact: { id: 0, carrier_id: props.factoringCompany.id } });
                            props.setLbCarrierInfoFactoringCompanyIsEditingContact(true);
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
                            props.lbCarrierInfoFactoringCompanyIsEditingContact &&
                            <span className="fas fa-save" onClick={saveFactoringCompanyContact}></span>
                        }
                        {
                            !props.lbCarrierInfoFactoringCompanyIsEditingContact &&
                            <span className="fas fa-pencil-alt" onClick={() => { props.setLbCarrierInfoFactoringCompanyIsEditingContact(true) }} style={{
                                color: props.factoringCompany.selectedContact?.id !== undefined ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
                                pointerEvents: props.factoringCompany.selectedContact?.id !== undefined ? 'all' : 'none'
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
        factoringCompany: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContactSearch,
        selectedLbCarrierInfoFactoringCompany: state.carrierReducers.selectedLbCarrierInfoFactoringCompany,
        selectedContact: state.carrierReducers.selectedContact, // PENDING TO CHECK
        lbCarrierInfoFactoringCompanyIsEditingContact: state.carrierReducers.lbCarrierInfoFactoringCompanyIsEditingContact
    }
}

export default connect(mapStateToProps, {    
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompany,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchOpenedPanels
})(CarrierInfoFactoringCompanyContacts)