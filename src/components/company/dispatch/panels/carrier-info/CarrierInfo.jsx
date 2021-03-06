import React, { useState, useRef,useEffect } from 'react';
import { connect } from "react-redux";
import classnames from "classnames";
import $ from 'jquery';
import './CarrierInfo.css';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import MaskedInput from 'react-text-mask';
import ReactStars from "react-rating-stars-component";
import { 
    setDispatchCarriers,
    setDispatchSelectedCarrier,
    setDispatchPanels,
    setDispatchSelectedCarrierContact,
    setSelectedNote,
    setContactSearch,
    setShowingContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance
 } from "./../../../../../actions";

function CarrierInfo(props) {
    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'carrier-info') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
    }

    const [popupItems, setPopupItems] = useState([]);
    const [lastState, setLastState] = useState(0);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refEquipment = useRef();
    const refInsuranceType = useRef();
    const refInsuranceCompany = useRef();
    const popupItemsRef = useRef([]);
    const refPopup = useRef();
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const [driverPendingSave, setDriverPendingSave] = useState(false);
    const [insurancePendingSave, setInsurancePendingSave] = useState(false);
    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(-1);
    var delayTimer;

    const modalTransitionProps = useSpring({ opacity: (props.selectedNote.id !== undefined || props.selectedDirection.id !== undefined) ? 1 : 0 });

    useEffect(() => {
        $.post(props.serverUrl + '/getCarrierPopupItems').then(res => {
            if (res.result === 'OK') {
                props.setEquipments(res.equipments.map(e => {
                    e.selected = false;
                    return e;
                }));
                props.setInsuranceTypes(res.insurance_types.map(t => {
                    t.selected = false;
                    return t;
                }));
            }
        })
    }, []);

    const carrierStars = {
        size: 25,
        count: 5,
        isHalf: false,
        value: 0,
        color: "rgba(137,137,137,1)",
        activeColor: "yellow",
        onChange: () => { }
    };

    const setInitialValues = (clearCode = true) => {
        
    }

    const searchCarrierBtnClick = () => {
        
    }

    const searchCarrierByCode = (e) => {
        
    }

    const validateCarrierForSaving = (e) => {

    }

    const validateContactForSaving = (e) => {
        
    }

    const selectedContactIsPrimaryChange = async (e) => {
       
    }

    const searchContactBtnClick = () => {
        
    }

    const popupItemClick = async (item) => {
        
    }

    const equipmentOnKeydown = (e) => {
        
    }

    const onEquipmentInput = async (e) => {

    }

    const onInsuranceCompanyInput = (e) => {
        
    }

    const onInsuranceCompanyKeydown = (e) => {

    }

    const onInsuranceTypeKeydown = (e) => {

    }

    const validateMailingAddressToSave = (e) => {
        
    }

    const clearMailingAddressBtn = async () => {
        
    }

    const remitToAddressBtn = async (e) => {
        
    }

    const validateFactoringCompanyToSave = (e) => {
        
    }

    const searchFactoringCompanyBtnClick = () => {

    }

    const moreFactoringCompanyBtnClick = () => {
        
    }

    const clearFactoringCompanyBtnClick = async () => {
        
    }

    const printWindow = (data) => {
        
    }


    const validateDriverForSaving = (e) => {
        
    }

    const validateInsuranceForSaving = (e) => {
        
    }

    const insuranceStatusClasses = () => {
        let classes = 'input-box-container insurance-status';
        let curDate = moment().startOf('day');
        let curDate2 = moment();
        let futureMonth = curDate2.add(1, 'M');
        let statusClass = '';

        (props.selectedCarrier.insurances || []).map((insurance, index) => {
            let expDate = moment(insurance.expiration_date, 'MM/DD/YYYY');

            if (expDate < curDate) {
                statusClass = 'expired';
            } else if (expDate >= curDate && expDate <= futureMonth) {
                if (statusClass !== 'expired') {
                    statusClass = 'warning';
                }
            } else {
                if (statusClass !== 'expired' && statusClass !== 'warning') {
                    statusClass = 'active';
                }
            }
        })

        return classes + ' ' + statusClass;
    }

    const documentsBtnClick = () => {
       
    }

    const revenueInformationBtnClick = () => {
       
    }

    const orderHistoryBtnClick = () => {
        
    }
    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="carrier-info">
                <div className="fields-container-row">
                    <div className="fields-container-col">
                        <div className="form-bordered-box" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '15px 10px'
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Carrier</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" readOnly={true} placeholder="Code" maxLength="8"
                                        onKeyDown={searchCarrierByCode}
                                        onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, code: e.target.value })}
                                        value={(props.selectedCarrier.code_number || 0) === 0 ? (props.selectedCarrier.code || '') : props.selectedCarrier.code + props.selectedCarrier.code_number} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, name: e.target.value })} value={props.selectedCarrier.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 1" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, address1: e.target.value })} value={props.selectedCarrier.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 2" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, address2: e.target.value })} value={props.selectedCarrier.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="City" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, city: e.target.value })} value={props.selectedCarrier.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" readOnly={true} placeholder="State" maxLength="2" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, state: e.target.value })} value={props.selectedCarrier.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" readOnly={true} placeholder="Postal Code" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, zip: e.target.value })} value={props.selectedCarrier.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Contact Name" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, contact_name: e.target.value })} value={props.selectedCarrier.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, contact_phone: e.target.value })} value={props.selectedCarrier.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, ext: e.target.value })} value={props.selectedCarrier.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateCarrierForSaving} onChange={e => props.setDispatchSelectedCarrier({ ...props.selectedCarrier, email: e.target.value })} value={props.selectedCarrier.email || ''} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col grow">
                        <div className="form-borderless-box" style={{
                            alignItems: 'center',
                            padding: '15px 5px'
                        }}>
                            <div className="input-toggle-container">
                                <input type="checkbox" id="cbox-carrier-do-not-use-btn" onChange={(e) => {
                                    props.setDispatchSelectedCarrier({ ...props.selectedCarrier, do_not_use: e.target.checked ? 1 : 0 });
                                    // validateCarrierForSaving(e)
                                }} checked={false} />
                                <label htmlFor="cbox-carrier-do-not-use-btn">
                                    <div className="label-text">DO NOT USE</div>
                                    <div className="input-toggle-btn"></div>
                                </label>
                            </div>

                            <ReactStars {...carrierStars} />

                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input type="text" readOnly={true} placeholder='MC Number'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mc_number: e.target.value })
                                    }}
                                    value={props.selectedCarrier.mc_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input type="text" readOnly={true} placeholder='DOT Number'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, dot_number: e.target.value })
                                    }}
                                    value={props.selectedCarrier.dot_number || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input type="text" readOnly={true} placeholder='SCAC'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, scac: e.target.value })
                                    }}
                                    value={props.selectedCarrier.scac || ''} />
                            </div>
                            <div className="input-box-container" style={{ width: '100%' }}>
                                <input type="text" readOnly={true} placeholder='FID'
                                    onKeyDown={validateCarrierForSaving}
                                    onChange={(e) => {
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, fid: e.target.value })
                                    }}
                                    value={props.selectedCarrier.fid || ''} />
                            </div>
                            <div className={insuranceStatusClasses()} style={{ width: '100%' }}>
                                <input type="text" readOnly={true} placeholder='Insurance' readOnly={true} />
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col" style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        <div className="form-bordered-box" style={{
                            flexGrow: 0,
                            marginBottom: 10
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Contacts</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add contact</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">


                                    <input type="text" readOnly={true} placeholder="First Name" onKeyDown={validateContactForSaving} onChange={e => {

                                        props.setDispatchSelectedCarrierContact({ ...props.selectedContact, first_name: e.target.value })
                                    }} value={props.selectedContact.first_name || ''} />



                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Last Name" onKeyDown={validateContactForSaving} onChange={e => props.setDispatchSelectedCarrierContact({ ...props.selectedContact, last_name: e.target.value })} value={props.selectedContact.last_name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '50%' }}>
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateContactForSaving} onChange={e => props.setDispatchSelectedCarrierContact({ ...props.selectedContact, phone_work: e.target.value })} value={props.selectedContact.phone_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="input-box-container input-phone-ext">
                                        <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateContactForSaving} onChange={e => props.setDispatchSelectedCarrierContact({ ...props.selectedContact, phone_ext: e.target.value })} value={props.selectedContact.phone_ext || ''} />
                                    </div>
                                    <div className="input-toggle-container">
                                        <input type="checkbox" id="cbox-carrier-contacts-primary-btn" onChange={selectedContactIsPrimaryChange} checked={(props.selectedContact.is_primary || 0) === 1} />
                                        <label htmlFor="cbox-carrier-contacts-primary-btn">
                                            <div className="label-text">Primary</div>
                                            <div className="input-toggle-btn"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="E-Mail" onKeyDown={validateContactForSaving} onChange={e => props.setDispatchSelectedCarrierContact({ ...props.selectedContact, email_work: e.target.value })} value={props.selectedContact.email_work || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Notes" onKeyDown={validateContactForSaving} onChange={e => props.setDispatchSelectedCarrierContact({ ...props.selectedContact, notes: e.target.value })} value={props.selectedContact.notes || ''} />
                                </div>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{
                            flexGrow: 1
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    {
                                        props.showingContactList &&
                                        <div className="mochi-button">
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Search</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                    {
                                        !props.showingContactList &&
                                        <div className="mochi-button">
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Cancel</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }

                                    {
                                        !props.showingContactList &&
                                        <div className="mochi-button">
                                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                            <div className="mochi-button-base">Send</div>
                                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                        </div>
                                    }
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-slider">
                                <div className="form-slider-wrapper" style={{ left: props.showingContactList ? 0 : '-100%' }}>
                                    <div className="contact-list-box">
                                        <div className="contact-list-wrapper">
                                            {
                                                (props.selectedCarrier.contacts || []).map((contact, index) => {
                                                    return (
                                                        <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                            let index = props.panels.length - 1;
                                                            let panels = props.panels.map((p, i) => {
                                                                if (p.name === 'carrier-contacts') {
                                                                    index = i;
                                                                    p.isOpened = true;
                                                                }
                                                                return p;
                                                            });

                                                            await props.setIsEditingContact(false);
                                                            await props.setContactSearchCarrier({ ...props.selectedCarrier, selectedContact: contact });

                                                            panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                            props.setDispatchPanels(panels);
                                                        }}>
                                                            <span>
                                                                {contact.first_name + (contact.middle_name === '' ? '' : ' ' + contact.middle_name) + ' ' + contact.last_name + ' ' + contact.phone_work + ' ' + contact.email_work}
                                                            </span>
                                                            {
                                                                (contact.is_primary === 1) &&
                                                                <span className='fas fa-check'></span>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    <div className="contact-search-box">
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="First Name" onChange={e => props.setContactSearch({ ...props.contactSearch, first_name: e.target.value })} value={props.contactSearch.first_name || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="Last Name" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, last_name: e.target.value })} value={props.contactSearch.last_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="Address 1" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address1: e.target.value })} value={props.contactSearch.address1 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="Address 2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, address2: e.target.value })} value={props.contactSearch.address2 || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="City" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, city: e.target.value })} value={props.contactSearch.city || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container input-state">
                                                <input type="text" readOnly={true} placeholder="State" maxLength="2" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, state: e.target.value })} value={props.contactSearch.state || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Phone (Work/Mobile/Fax)" onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, phone: e.target.value })} value={props.contactSearch.phone || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onFocus={() => { props.setShowingContactList(false) }} onChange={e => props.setContactSearch({ ...props.contactSearch, email: e.target.value })} value={props.contactSearch.email || ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col" style={{minWidth: '28%', maxWidth: '28%'}}>
                        <div className="form-bordered-box" style={{flexGrow: 1}}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Driver Information</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Delete</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>

                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="First Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, first_name: e.target.value })
                                    }} value={props.selectedDriver.first_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Last Name" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, last_name: e.target.value })
                                    }} value={props.selectedDriver.last_name || ''} />
                                </div>
                            </div>

                            <div className="form-v-sep"></div>

                            <div className="form-row">
                                <div className="input-box-container" style={{ width: '40%' }}>
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Phone" onKeyDown={validateDriverForSaving} onChange={e => {
                                            props.setSelectedDriver({ ...props.selectedDriver, phone: e.target.value })
                                        }} value={props.selectedDriver.phone || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container" style={{ flexGrow: 1 }}>
                                    <input type="text" readOnly={true} placeholder="E-mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, email: e.target.value })
                                    }} value={props.selectedDriver.email || ''} />
                                </div>

                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow" style={{ position: 'relative' }}>

                                    <input
                                        type="text"
                                        placeholder="Equipment"
                                        ref={refEquipment}
                                        onKeyDown={equipmentOnKeydown}
                                        onInput={onEquipmentInput}
                                        onChange={onEquipmentInput}
                                        value={props.selectedDriver.equipment?.name || ''} />

                                    <span className="fas fa-chevron-down" style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: `translateY(-50%)`,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer'
                                    }}></span>
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Truck" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, truck: e.target.value })
                                    }} value={props.selectedDriver.truck || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Trailer" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, trailer: e.target.value })
                                    }} value={props.selectedContact.trailer || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Notes" onKeyDown={validateDriverForSaving} onChange={e => {
                                        props.setSelectedDriver({ ...props.selectedDriver, notes: e.target.value })
                                    }} value={props.selectedDriver.notes || ''} />
                                </div>
                            </div>

                            <div className="form-row" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                paddingBottom: 10
                            }}>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">E-mail Driver</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="fields-container-row" style={{ marginTop: 10 }}>
                    <div className="fields-container-col">
                        <div className="form-bordered-box" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '15px 10px'
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Mailing Address</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Remit to address is the same</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" readOnly={true} placeholder="Code" maxLength="8" readOnly={true}
                                        value={props.selectedCarrier.mailing_address?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 1" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="City" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" readOnly={true} placeholder="State" maxLength="2" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" readOnly={true} placeholder="Postal Code" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Contact Name" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                            let mailing_address = props.selectedCarrier.mailing_address || {};
                                            mailing_address.contact_phone = e.target.value;
                                            props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                        }} value={props.selectedCarrier.mailing_address?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateMailingAddressToSave} onChange={e => {
                                        let mailing_address = props.selectedCarrier.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, mailing_address: mailing_address });
                                    }} value={props.selectedCarrier.mailing_address?.email || ''} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col grow">
                        <div className="form-borderless-box" style={{
                            alignItems: 'center',
                            padding: '15px 5px'
                        }}>
                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print Carrier Information</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>

                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Equipment Information</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>

                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Revenue Information</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>

                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Order History</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>

                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Documents</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col" style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        <div className="form-bordered-box" style={{
                            flexGrow: 0,
                            marginBottom: 10
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Insurances</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container" style={{ position: 'relative', width: '10rem' }}>
                                    <input type="text" readOnly={true} placeholder="Type"
                                        ref={refInsuranceType}
                                        onKeyDown={onInsuranceTypeKeydown}
                                        onInput={() => { }}
                                        onChange={() => { }}
                                        value={props.selectedInsurance.insurance_type?.name || ''} />

                                    <span className="fas fa-chevron-down" style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: `translateY(-50%)`,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer'
                                    }}></span>

                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Company"
                                        ref={refInsuranceCompany}
                                        onKeyDown={onInsuranceCompanyKeydown}
                                        onInput={onInsuranceCompanyInput}
                                        // onChange={onInsuranceCompanyInput}
                                        value={props.selectedInsurance.company || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Expiration Date" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, expiration_date: e.target.value })} value={props.selectedInsurance.expiration_date || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Amount" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, amount: e.target.value })} value={props.selectedInsurance.amount || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Deductible" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, deductible: e.target.value })} value={props.selectedInsurance.deductible || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Notes" onKeyDown={validateInsuranceForSaving} onChange={e => props.setSelectedInsurance({ ...props.selectedInsurance, notes: e.target.value })} value={props.selectedInsurance.notes || ''} />
                                </div>
                            </div>
                        </div>

                        <div className="form-bordered-box" style={{
                            flexGrow: 1
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="top-border top-border-middle"></div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="insurances-list-container">
                                <div className="insurances-list-wrapper">
                                    {
                                        (props.selectedCarrier.insurances || []).map((insurance, index) => {
                                            return (
                                                <div className="insurances-list-item" key={index}>
                                                    <span>
                                                        <b>{insurance.insurance_type.name}</b> {insurance.company} <b>{insurance.expiration_date}</b> {insurance.amount}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fields-container-col" style={{minWidth: '28%', maxWidth: '28%'}}>
                        <div className="form-bordered-box" style={{
                            flexGrow: 1
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Drivers</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Print</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="drivers-list-container">
                                <div className="drivers-list-wrapper">
                                    {
                                        (props.selectedCarrier.drivers || []).map((driver, index) => {
                                            return (
                                                <div className="drivers-list-item" key={index}>
                                                    <span>
                                                        {driver.first_name + ' ' + driver.last_name + ' ' + driver.phone + ' ' + driver.email}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="fields-container-row" style={{ marginTop: 10 }}>
                    <div className="fields-container-col">
                        <div className="form-bordered-box" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '15px 10px'
                        }}>
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Factoring Company</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">More</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Clear</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="form-row">
                                <div className="input-box-container input-code">
                                    <input type="text" readOnly={true} placeholder="Code" maxLength="8" readOnly={true}
                                        value={props.selectedCarrier.factoring_company?.code || ''} />
                                </div>

                                <div className="form-h-sep"></div>

                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.name = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.name || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 1" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.address1 = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.address1 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Address 2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.address2 = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.address2 || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="City" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.city = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.city || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" readOnly={true} placeholder="State" maxLength="2" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.state = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.state || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" readOnly={true} placeholder="Postal Code" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.zip = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.zip || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="Contact Name" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.contact_name = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.contact_name || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                            let factoring_company = props.selectedCarrier.factoring_company || {};
                                            factoring_company.contact_phone = e.target.value;
                                            props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                        }} value={props.selectedCarrier.factoring_company?.contact_phone || ''} />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" readOnly={true} placeholder="Ext" onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.ext = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.ext || ''} />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" readOnly={true} placeholder="E-Mail" style={{ textTransform: 'lowercase' }} onKeyDown={validateFactoringCompanyToSave} onChange={e => {
                                        let factoring_company = props.selectedCarrier.factoring_company || {};
                                        factoring_company.email = e.target.value;
                                        props.setDispatchSelectedCarrier({ ...props.selectedCarrier, factoring_company: factoring_company });
                                    }} value={props.selectedCarrier.factoring_company?.email || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col grow">

                    </div>
                    <div className="fields-container-col">
                        <div className="form-bordered-box" >
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Notes</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Add note</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Print</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>

                            <div className="notes-list-container">
                                <div className="notes-list-wrapper">
                                    {
                                        (props.selectedCarrier.notes || []).map((note, index) => {
                                            return (
                                                <div className="notes-list-item" key={index}>
                                                    {note.text}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fields-container-col"  style={{minWidth: '28%', maxWidth: '28%'}}>
                        <div className="form-bordered-box" >
                            <div className="form-header">
                                <div className="top-border top-border-left"></div>
                                <div className="form-title">Past Orders</div>
                                <div className="top-border top-border-middle"></div>
                                <div className="form-buttons">
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                    <div className="mochi-button">
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Print</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                </div>
                                <div className="top-border top-border-right"></div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.systemReducers.scale,
        panels: state.dispatchReducers.panels,
        carriers: state.dispatchReducers.carriers,
        contacts: state.carrierReducers.contacts,
        selectedCarrier: state.dispatchReducers.selectedCarrier,
        serverUrl: state.systemReducers.serverUrl,
        selectedContact: state.dispatchReducers.selectedCarrierContact,
        selectedNote: state.carrierReducers.selectedNote,
        selectedDirection: state.carrierReducers.selectedDirection,
        contactSearch: state.carrierReducers.contactSearch,
        automaticEmailsTo: state.carrierReducers.automaticEmailsTo,
        automaticEmailsCc: state.carrierReducers.automaticEmailsCc,
        automaticEmailsBcc: state.carrierReducers.automaticEmailsBcc,
        showingContactList: state.carrierReducers.showingContactList,
        carrierSearch: state.carrierReducers.carrierSearch,
        selectedDocument: state.carrierReducers.selectedDocument,
        drivers: state.carrierReducers.drivers,
        selectedDriver: state.carrierReducers.selectedDriver,
        equipments: state.carrierReducers.equipments,
        insuranceTypes: state.carrierReducers.insuranceTypes,
        selectedEquipment: state.carrierReducers.selectedEquipment,
        selectedInsuranceType: state.carrierReducers.selectedInsuranceType,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        carrierInsurances: state.carrierReducers.carrierInsurances,
        selectedInsurance: state.carrierReducers.selectedInsurance
    }
}

export default connect(mapStateToProps, {
    setDispatchCarriers,
    setDispatchSelectedCarrier,
    setDispatchPanels,
    setDispatchSelectedCarrierContact,
    setSelectedNote,
    setContactSearch,
    setShowingContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact,
    setSelectedDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance
})(CarrierInfo)