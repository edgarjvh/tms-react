import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './Contacts.css';
import {
    setCustomerPanels,
    setSelectedContact,
    setContactSearchCustomer
} from './../../../../../actions';
import MaskedInput from 'react-text-mask';

function Contacts(props) {
    const [isEditing, setIsEditing] = useState(false);

    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'customer-contacts') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setCustomerPanels(panels);
    }

    var lastLetter = '';

    const borderBottomClasses = classnames({
        'field-border-bottom': true,
        'disabled': !isEditing
    });

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
                                            <div>
                                                <div className="letter-header">{curLetter}</div>

                                                <div className="row-contact">
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
                                            <div className="row-contact">
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
                        <div className="avatar-buttons">
                                <span className="fas fa-trash-alt"></span>
                                <span className="fas fa-sync"></span>
                            </div>
                            <div className="contact-avatar-wrapper">
                                <img src={props.customer.selectedContact.avatar ? props.serverUrl + '/avatars/' + props.customer.selectedContact.avatar : 'img/avatar-user-default.png'} alt="" />
                            </div>
                            
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">{(props.customer.selectedContact.prefix || '') + " " + props.customer.selectedContact.first_name + " " + (props.customer.selectedContact.middle_name || '') + " " + props.customer.selectedContact.last_name}</div>
                            <div className="contact-company"><span style={{ fontWeight: 'bold' }}>{props.customer.name}</span> <span>{props.customer.selectedContact.title}</span> <span style={{ fontWeight: 'bold' }}>{props.customer.selectedContact.department}</span></div>
                        </div>
                        <div className="contact-buttons">
                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-panel-customer-contacts-primary-btn"
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.is_primary = e.target.checked ? 1 : 0;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    disabled={!isEditing}
                                    checked={(props.customer.selectedContact.is_primary || 0) === 1} />
                                <label htmlFor="cbox-panel-customer-contacts-primary-btn">
                                    <div className="label-text">Primary</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>

                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Delete</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-fields">
                        <div className="contact-form-wrapper">
                            <div className="field-container">
                                <div className="field-title">Prefix</div>
                                <input type="text" readOnly={!isEditing} 
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.prefix = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.prefix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">First Name</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.first_name = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.first_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Middle Name</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.middle_name = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.middle_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Last Name</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.last_name = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.last_name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Suffix</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.suffix = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.suffix || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Company</div>
                                <input type="text" readOnly={!isEditing}
                                    value={props.customer.name || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Title</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.title = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.title || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Department</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.department = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.department || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Work</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.email_work = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.email_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Personal</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.email_personal = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.email_personal || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">E-mail Other</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.email_other = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.email_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_work = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_work || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Ext</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_ext = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_ext || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Work Fax</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_work_fax = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_work_fax || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Mobile</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_mobile = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_mobile || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Direct</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_direct = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_direct || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Phone Other</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.phone_other = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.phone_other || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Country</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.country = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.country || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 1</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.address1 = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.address1 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Address 2</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.address2 = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.address2 || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">City</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.city = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.city || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">State</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.state = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.state || ''}
                                    style={{ textTransform: 'uppercase' }} maxLength={2} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Postal Code</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.zip_code = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.zip_code || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Birthday</div>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.birthday = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.birthday || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Website</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.website = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.website || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>

                            <div className="field-container">
                                <div className="field-title">Notes</div>
                                <input type="text" readOnly={!isEditing}
                                    onChange={e => {
                                        let contact = props.customer.selectedContact;
                                        contact.notes = e.target.value;
                                        props.setContactSearchCustomer({ ...props.customer, selectedContact: contact });
                                    }}
                                    value={props.customer.selectedContact.notes || ''} />
                                <div className={borderBottomClasses}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="left-buttons">
                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">
                                Add Contact
                        </div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>

                    <div className="right-buttons">
                        {
                            isEditing && 
                            <span className="fas fa-save" onClick={() => {setIsEditing(false)}}></span>
                        }
                        {
                            !isEditing && 
                            <span className="fas fa-pencil-alt" onClick={() => {setIsEditing(true)}}></span>
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
        panels: state.customerReducers.panels,
        customer: state.customerReducers.contactSearchCustomer,
        selectedCustomer: state.customerReducers.selectedCustomer,
        selectedContact: state.customerReducers.selectedContact,
        contacts: state.customerReducers.contacts
    }
}

export default connect(mapStateToProps, {
    setCustomerPanels,
    setSelectedContact,
    setContactSearchCustomer
})(Contacts)