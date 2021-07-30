import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import axios from 'axios';
import Draggable from 'react-draggable';
import './Contacts.css';
import MaskedInput from 'react-text-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faCheck, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Contacts(props) {
    const refPrefix = useRef();
    const refInputAvatar = useRef();
    const [tempSelectedContact, setTempSelectedContact] = useState({});
    const [progressUploaded, setProgressUploaded] = useState(0);
    const [progressTotal, setProgressTotal] = useState(0);

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var lastLetter = '';

    const borderBottomClasses = classnames({
        'field-border-bottom': true,
        'disabled': !props.isEditingContact
    });

    const saveContact = () => {
        let contact = props.contactSearchCustomer.selectedContact;

        if ((tempSelectedContact.first_name || '').trim() === '') {
            window.alert('You must enter the first name!');
            return;
        }

        if ((tempSelectedContact.last_name || '').trim() === '') {
            window.alert('You must enter the last name!');
            return;
        }

        if ((tempSelectedContact.phone_work || '').trim() === '' &&
            (tempSelectedContact.phone_work_fax || '').trim() === '' &&
            (tempSelectedContact.phone_mobile || '').trim() === '' &&
            (tempSelectedContact.phone_direct || '').trim() === '' &&
            (tempSelectedContact.phone_other || '').trim() === '') {
            window.alert('You must enter at least one phone number!');
            return;
        }

        switch (tempSelectedContact.primary_phone) {
            case 'work':
                if ((tempSelectedContact.phone_work || '').trim() === '') {
                    tempSelectedContact.primary_phone = (tempSelectedContact.phone_work_fax || '').trim() !== ''
                        ? 'fax'
                        : (tempSelectedContact.phone_mobile || '').trim() !== ''
                            ? 'mobile'
                            : (tempSelectedContact.phone_direct || '').trim() !== ''
                                ? 'direct'
                                : (tempSelectedContact.phone_other || '').trim() !== ''
                                    ? 'other'
                                    : 'work'
                }
                break;
            case 'fax':
                if ((tempSelectedContact.phone_work_fax || '').trim() === '') {
                    tempSelectedContact.primary_phone = (tempSelectedContact.phone_work || '').trim() !== ''
                        ? 'work'
                        : (tempSelectedContact.phone_mobile || '').trim() !== ''
                            ? 'mobile'
                            : (tempSelectedContact.phone_direct || '').trim() !== ''
                                ? 'direct'
                                : (tempSelectedContact.phone_other || '').trim() !== ''
                                    ? 'other'
                                    : 'work'
                }
                break;
            case 'mobile':
                if ((tempSelectedContact.phone_mobile || '').trim() === '') {
                    tempSelectedContact.primary_phone = (tempSelectedContact.phone_work || '').trim() !== ''
                        ? 'work'
                        : (tempSelectedContact.phone_work_fax || '').trim() !== ''
                            ? 'fax'
                            : (tempSelectedContact.phone_direct || '').trim() !== ''
                                ? 'direct'
                                : (tempSelectedContact.phone_other || '').trim() !== ''
                                    ? 'other'
                                    : 'work'
                }
                break;
            case 'direct':
                if ((tempSelectedContact.phone_direct || '').trim() === '') {
                    tempSelectedContact.primary_phone = (tempSelectedContact.phone_work || '').trim() !== ''
                        ? 'work'
                        : (tempSelectedContact.phone_work_fax || '').trim() !== ''
                            ? 'fax'
                            : (tempSelectedContact.phone_mobile || '').trim() !== ''
                                ? 'mobile'
                                : (tempSelectedContact.phone_other || '').trim() !== ''
                                    ? 'other'
                                    : 'work'
                }
                break;
            case 'other':
                if ((tempSelectedContact.phone_other || '').trim() === '') {
                    tempSelectedContact.primary_phone = (tempSelectedContact.phone_work || '').trim() !== ''
                        ? 'work'
                        : (tempSelectedContact.phone_work_fax || '').trim() !== ''
                            ? 'fax'
                            : (tempSelectedContact.phone_mobile || '').trim() !== ''
                                ? 'mobile'
                                : (tempSelectedContact.phone_direct || '').trim() !== ''
                                    ? 'direct'
                                    : 'work'
                }
                break;
            default:
                tempSelectedContact.primary_phone = 'work';
                break;
        }

        if ((tempSelectedContact.address1 || '').trim() === '' && (tempSelectedContact.address2 || '').trim() === '') {
            tempSelectedContact.address1 = props.contactSearchCustomer.address1;
            tempSelectedContact.address2 = props.contactSearchCustomer.address2;
            tempSelectedContact.city = props.contactSearchCustomer.city;
            tempSelectedContact.state = props.contactSearchCustomer.state;
            tempSelectedContact.zip_code = props.contactSearchCustomer.zip;
        }

        axios.post(props.serverUrl + props.savingContactUrl, tempSelectedContact).then(async res => {
            if (res.data.result === 'OK') {
                if ((props.selectedCustomer?.id || 0) > 0) {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.data.contacts });
                }

                if ((props.selectedContact?.id || 0) > 0) {
                    if (props.selectedContact.id === tempSelectedContact.id) {
                        await props.setSelectedContact(res.data.contact);
                    }
                }

                await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: res.data.contact, contacts: res.data.contacts });

                props.setIsEditingContact(false);
            }
        }).catch(e => {
            console.log('error saving contact', e);
        });
    }

    const deleteContact = () => {
        let contact = props.contactSearchCustomer.selectedContact;

        if (window.confirm('Are you sure to delete this contact?')) {
            axios.post(props.serverUrl + props.deletingContactUrl, contact).then(async res => {
                if (res.data.result === 'OK') {
                    if ((props.selectedCustomer?.id || 0) > 0) {
                        await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.data.contacts });
                    }

                    if ((props.selectedContact?.id || 0) > 0) {
                        if (props.selectedContact.id === contact.id) {
                            await props.setSelectedContact({});
                        }
                    }

                    await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: {}, contacts: res.data.contacts });

                    props.setIsEditingContact(false);
                }
            }).catch(e => {
                console.log('error deleting contact', e);
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
            formData.append("contact_id", props.contactSearchCustomer.selectedContact.id);
            formData.append("customer_id", props.contactSearchCustomer.id);

            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;

                    setProgressUploaded(isNaN(loaded) ? 0 : loaded);
                    setProgressTotal(isNaN(total) ? 0 : total);
                }
            }

            axios.post(props.serverUrl + props.uploadAvatarUrl, formData, options)
                .then(async res => {
                    if (res.data.result === "OK") {
                        if ((props.selectedCustomer?.id || 0) > 0) {
                            await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.data.contacts });
                        }

                        await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: res.data.contact, contacts: res.data.contacts });
                    }
                    refInputAvatar.current.value = "";
                })
                .catch((err) => {
                    console.log("error changing contact avatar", err);
                    refInputAvatar.current.value = "";
                })
                .then(() => {
                    setProgressUploaded(0);
                    setProgressTotal(0);
                });
        }
    }

    const removeContactAvatar = (e) => {
        axios.post(props.serverUrl + props.removeAvatarUrl, props.contactSearchCustomer.selectedContact).then(async res => {
            if (res.data.result === "OK") {
                if ((props.selectedCustomer?.id || 0) > 0) {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, contacts: res.data.contacts });
                }

                await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: res.data.contact, contacts: res.data.contacts });
            }
        }).catch(e => {
            console.log('error removig contact avatar', e);
        });
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>

            <div className="contact-container" style={{ overflow: 'initial' }}>
                <div className="contact-list-container">
                    <div className="title">{props.title}</div><div className="side-title" style={{ left: '-45px' }}><div>{props.title}</div></div>

                    <div className="contact-list">
                        <div className="contact-list-wrapper">
                            {
                                (props.contactSearchCustomer.contacts || []).map((contact, index) => {
                                    let curLetter = contact.last_name.substring(0, 1).toLowerCase();
                                    if (curLetter !== lastLetter) {
                                        lastLetter = curLetter;
                                        return (
                                            <div key={index}>
                                                <div className="letter-header">{curLetter}</div>

                                                <div className="row-contact" onClick={async () => {
                                                    await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: contact });
                                                    props.setIsEditingContact(false);
                                                }}>
                                                    <div className="contact-avatar-container">
                                                        <img src={contact.avatar ? props.serverUrl + '/avatars/' + contact.avatar : 'img/avatar-user-default.png'} alt="" />
                                                    </div>

                                                    <div className="contact-data">
                                                        <div className="contact-name" style={{
                                                            display: 'flex', alignItems: 'center'
                                                        }}>
                                                            <div style={{flexGrow: 1}}>
                                                                {(contact.prefix || '') + " " + contact.first_name + " " + (contact.middle_name || '') + " " + contact.last_name}
                                                            </div>
                                                            {
                                                                (contact.is_primary === 1) &&
                                                                <div className="contact-list-col tcol pri">
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
                                                            }</div>
                                                        <div className="online-status">
                                                            <div className={contact.is_online === 1 ? 'is-online is-online-on' : 'is-online is-online-off'}></div>
                                                            <div className="mochi-button" onClick={(e) => { e.stopPropagation() }}>
                                                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                                <div className="mochi-button-base">Chat</div>
                                                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={index} className="row-contact" onClick={async () => {
                                                await props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: contact });
                                                props.setIsEditingContact(false);
                                            }}>
                                                <div className="contact-avatar-container">
                                                    <img src={contact.avatar ? props.serverUrl + '/avatars/' + contact.avatar : 'img/avatar-user-default.png'} alt="" />
                                                </div>

                                                <div className="contact-data">
                                                    <div className="contact-name">{(contact.prefix || '') + " " + contact.first_name + " " + (contact.middle_name || '') + " " + contact.last_name}</div>
                                                    <div className="online-status">
                                                        <div className={contact.is_online === 1 ? 'is-online is-online-on' : 'is-online is-online-off'}></div>
                                                        <div className="mochi-button" onClick={(e) => { e.stopPropagation() }}>
                                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                                            <div className="mochi-button-base">Chat</div>
                                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="contact-form-bg">
                    <div className="contact-form">
                        <div className="contact-form-header">
                            <div className="contact-avatar-container">

                                {
                                    (props.isEditingContact && (props.contactSearchCustomer.selectedContact.id || 0) > 0 && (props.contactSearchCustomer.selectedContact.avatar || '') !== '') && <span className="fas fa-trash-alt remove-contact-avatar-btn" onClick={removeContactAvatar}></span>
                                }
                                {
                                    (props.isEditingContact && (props.contactSearchCustomer.selectedContact.id || 0) > 0) && <span className="fas fa-sync change-contact-avatar-btn" onClick={() => { refInputAvatar.current.click() }}></span>
                                }

                                <form encType='multipart/form-data' style={{ display: 'none' }}>
                                    <input type="file" ref={refInputAvatar} accept='image/*' onChange={contactAvatarChange} />
                                </form>

                                <div className="contact-avatar-wrapper">
                                    <img src={props.contactSearchCustomer.selectedContact.avatar ? props.serverUrl + '/avatars/' + props.contactSearchCustomer.selectedContact.avatar : 'img/avatar-user-default.png'} alt="" />
                                </div>

                            </div>
                            <div className="contact-info">
                                <div className="contact-name">
                                    {(props.contactSearchCustomer.selectedContact.prefix || '') + " " + (props.contactSearchCustomer.selectedContact.first_name || '') + " " + (props.contactSearchCustomer.selectedContact.middle_name || '') + " " + (props.contactSearchCustomer.selectedContact.last_name || '')}
                                </div>
                                <div className="contact-company">
                                    <span>
                                        {props.contactSearchCustomer.selectedContact.id !== undefined ? props.contactSearchCustomer.name : ''}
                                    </span>

                                    <span>
                                        {(props.contactSearchCustomer.selectedContact.title || '')}
                                    </span>

                                    <span>
                                        {(props.contactSearchCustomer.selectedContact.department || '')}
                                    </span>
                                </div>
                                <div className="contact-username-info">
                                    <div className="contact-username">@username</div>
                                    <div className="mochi-button" onClick={(e) => { e.stopPropagation() }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Chat</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-buttons">
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-panel-customer-contacts-primary-btn"
                                        onChange={e => {
                                            setTempSelectedContact({ ...tempSelectedContact, is_primary: e.target.checked ? 1 : 0 })
                                        }}
                                        disabled={!props.isEditingContact}
                                        checked={props.isEditingContact ? (tempSelectedContact.is_primary || 0) === 1 : (props.contactSearchCustomer.selectedContact.is_primary || 0) === 1} />
                                    <label htmlFor="cbox-panel-customer-contacts-primary-btn">
                                        <div className="label-text">Primary</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>

                                <div className="right-buttons" style={{ display: 'flex' }}>
                                    {
                                        props.isEditingContact &&
                                        <div className="mochi-button" onClick={() => {
                                            props.setIsEditingContact(false);
                                            setTempSelectedContact({});
                                        }}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        props.isEditingContact &&
                                        <div className="mochi-button" onClick={saveContact}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Save</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !props.isEditingContact &&
                                        <div className="mochi-button" onClick={() => {
                                            props.setIsEditingContact(true);
                                            setTempSelectedContact({ ...props.contactSearchCustomer.selectedContact });
                                        }} style={{
                                            color: props.contactSearchCustomer.selectedContact.id !== undefined ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
                                            pointerEvents: props.contactSearchCustomer.selectedContact.id !== undefined ? 'all' : 'none'
                                        }}>
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Edit</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    <div className="mochi-button" onClick={deleteContact} style={{
                                        marginLeft: '0.2rem',
                                        pointerEvents: (props.contactSearchCustomer.selectedContact.id !== undefined && props.contactSearchCustomer.selectedContact.id > 0) ? 'all' : 'none'
                                    }}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base" style={{ color: (props.contactSearchCustomer.selectedContact.id !== undefined && props.contactSearchCustomer.selectedContact.id > 0) ? 'rgba(138,8,8,1)' : 'rgba(138,8,8,0.5)' }}>Delete</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form-fields">
                            <div className="col-contact-form">
                                <div className="contact-form-wrapper">
                                    <div className="field-container">
                                        <div className="field-title">Prefix</div>
                                        <input ref={refPrefix} type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, prefix: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, prefix: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.prefix || '' : props.contactSearchCustomer.selectedContact.prefix || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">First Name</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, first_name: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, first_name: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.first_name || '' : props.contactSearchCustomer.selectedContact.first_name || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Middle Name</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, middle_name: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, middle_name: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.middle_name || '' : props.contactSearchCustomer.selectedContact.middle_name || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Last Name</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, last_name: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, last_name: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.last_name || '' : props.contactSearchCustomer.selectedContact.last_name || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Suffix</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, suffix: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, suffix: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.suffix || '' : props.contactSearchCustomer.selectedContact.suffix || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Company</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => { }}
                                            onChange={e => { }}
                                            value={props.contactSearchCustomer.selectedContact.id !== undefined ? props.contactSearchCustomer.name : ''} />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Title</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, title: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, title: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.title || '' : props.contactSearchCustomer.selectedContact.title || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Department</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, department: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, department: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.department || '' : props.contactSearchCustomer.selectedContact.department || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">E-mail Work</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_work: e.target.value.toLowerCase() });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_work: e.target.value.toLowerCase() });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.email_work || '' : props.contactSearchCustomer.selectedContact.email_work || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">E-mail Personal</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_personal: e.target.value.toLowerCase() });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_personal: e.target.value.toLowerCase() });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.email_personal || '' : props.contactSearchCustomer.selectedContact.email_personal || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">E-mail Other</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_other: e.target.value.toLowerCase() });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, email_other: e.target.value.toLowerCase() });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.email_other || '' : props.contactSearchCustomer.selectedContact.email_other || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Phone Work</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_work: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_work: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_work || '' : props.contactSearchCustomer.selectedContact.phone_work || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Ext</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_ext: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_ext: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_ext || '' : props.contactSearchCustomer.selectedContact.phone_ext || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Phone Work Fax</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_work_fax: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_work_fax: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_work_fax || '' : props.contactSearchCustomer.selectedContact.phone_work_fax || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Phone Mobile</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_mobile: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_mobile: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_mobile || '' : props.contactSearchCustomer.selectedContact.phone_mobile || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Phone Direct</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_direct: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_direct: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_direct || '' : props.contactSearchCustomer.selectedContact.phone_direct || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Phone Other</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_other: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, phone_other: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.phone_other || '' : props.contactSearchCustomer.selectedContact.phone_other || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Country</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, country: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, country: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.country || '' : props.contactSearchCustomer.selectedContact.country || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Address 1</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, address1: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, address1: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.address1 || '' : props.contactSearchCustomer.selectedContact.address1 || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Address 2</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, address2: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, address2: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.address2 || '' : props.contactSearchCustomer.selectedContact.address2 || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">City</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, city: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, city: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.city || '' : props.contactSearchCustomer.selectedContact.city || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">State</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            style={{ textTransform: 'uppercase' }} maxLength={2}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, state: e.target.value.toUpperCase() });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, state: e.target.value.toUpperCase() });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.state || '' : props.contactSearchCustomer.selectedContact.state || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Postal Code</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, zip_code: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, zip_code: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.zip_code || '' : props.contactSearchCustomer.selectedContact.zip_code || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Birthday</div>
                                        <MaskedInput
                                            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                            guide={true}
                                            type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, birthday: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, birthday: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.birthday || '' : props.contactSearchCustomer.selectedContact.birthday || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Website</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, website: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, website: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.website || '' : props.contactSearchCustomer.selectedContact.website || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>

                                    <div className="field-container">
                                        <div className="field-title">Notes</div>
                                        <input type="text" readOnly={!props.isEditingContact}
                                            onInput={(e) => {
                                                setTempSelectedContact({ ...tempSelectedContact, notes: e.target.value });
                                            }}
                                            onChange={e => {
                                                setTempSelectedContact({ ...tempSelectedContact, notes: e.target.value });
                                            }}
                                            value={props.isEditingContact ? tempSelectedContact.notes || '' : props.contactSearchCustomer.selectedContact.notes || ''}
                                        />
                                        <div className={borderBottomClasses}></div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-contact-splitter">

                            </div>
                            <div className="col-contact-emails">
                                <div className="col-title">E-mails</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footer">
                    <div className="left-buttons">
                        <div className="mochi-button" onClick={() => {
                            props.setContactSearchCustomer({ ...props.contactSearchCustomer, selectedContact: { id: 0, customer_id: props.contactSearchCustomer.id } });
                            setTempSelectedContact({ id: 0, customer_id: props.contactSearchCustomer.id });

                            props.setIsEditingContact(true);
                            refPrefix.current.focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">
                                Add Contact
                            </div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(Contacts)