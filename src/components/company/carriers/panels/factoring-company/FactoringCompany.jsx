import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompany.css';
import MaskedInput from 'react-text-mask';
import FactoringCompanyModal from './../../modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import {
    setCarrierPanels,
    setSelectedFactoringCompanyContact,
    setSelectedFactoringCompanyContactSearch,
    setSelectedFactoringCompanyIsShowingContactList,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyNote,
    setSelectedFactoringCompanyInvoiceSearch,
    setSelectedFactoringCompanyInvoices,
    setFactoringCompanyIsEditingContact,
    setFactoringCompanyContacts,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyIsShowingInvoiceList,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setSelectedFactoringCompanyDocument,
    setCarrierOpenedPanels
} from '../../../../../actions';

function FactoringCompany(props) {

    var delayTimer;
    const modalTransitionProps = useSpring({ opacity: (props.selectedFactoringCompanyNote.id !== undefined) ? 1 : 0 });

    const setInitialValues = (clearCode = true) => {
        props.setSelectedFactoringCompany({ id: 0, code: clearCode ? '' : props.selectedFactoringCompany.code });
        props.setSelectedFactoringCompanyContact({});
        props.setSelectedFactoringCompanyIsShowingContactList(true);
        props.setSelectedFactoringCompanyNote({});
        props.setSelectedFactoringCompanyInvoices([]);
        props.setSelectedFactoringCompanyInvoiceSearch([]);
    }

    const closePanelBtnClick = (e, name) => {
        props.setCarrierOpenedPanels(props.carrierOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const searchFactoringCompanyBtnClick = () => {

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedFactoringCompany.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedFactoringCompany.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedFactoringCompany.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedFactoringCompany.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedFactoringCompany.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedFactoringCompany.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedFactoringCompany.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setFactoringCompanySearch(factoringCompanySearch);
                await props.setFactoringCompanies(res.factoring_companies);

                if (!props.carrierOpenedPanels.includes('carrier-factoring-company-panel-search')) {
                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'carrier-factoring-company-panel-search']);
                }
            }
        });
    }

    const getFactoringCompanyByCode = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (e.target.value.trim() === '') {
                setInitialValues();
            } else {
                $.post(props.serverUrl + '/getFactoringCompanies', { code: e.target.value.trim().toLowerCase() }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.factoring_companies.length > 0) {
                            props.setSelectedFactoringCompany(res.factoring_companies[0]);

                            if (res.factoring_companies[0].contacts.length > 0) {
                                res.factoring_companies[0].contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedFactoringCompanyContact(contact);
                                    }

                                    return true;
                                });
                            }
                        } else {
                            setInitialValues(false);
                        }
                    }
                });
            }
        }
    }

    const validateFactoringCompanyToSave = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            window.clearTimeout(delayTimer);

            window.setTimeout(() => {
                let company = { ...props.selectedFactoringCompany };

                if ((company.name || '').trim() !== '' &&
                    (company.address1 || '').trim() !== '' &&
                    (company.city || '').trim() !== '' &&
                    (company.state || '').trim() !== '' &&
                    (company.zip || '').trim() !== '') {


                    let parseCity = company.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let newCode = (company.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (company.state || '').trim().replace(/\s/g, "").substring(0, 2);

                    company.code = newCode;

                    $.post(props.serverUrl + '/saveFactoringCompany', company).then(res => {
                        if (res.result === 'OK') {
                            props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, id: res.factoring_company.id, code: res.factoring_company.code });

                            if (res.factoring_company.contacts.length > 0) {
                                res.factoring_company.contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedFactoringCompanyContact(contact);
                                    }
                                    return true;
                                });
                            }
                        }
                    });
                }

            }, 300);
        }
    }

    const validateMailingAddressToSave = (e) => {
        let key = e.keyCode || e.which;

        if ((props.selectedFactoringCompany.id || 0) > 0) {
            if (key === 9) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                    mailing_address.factoring_company_id = props.selectedFactoringCompany.id;

                    if ((mailing_address.name || '').trim() !== '' &&
                        (mailing_address.address1 || '').trim() !== '' &&
                        (mailing_address.city || '').trim() !== '' &&
                        (mailing_address.state || '').trim() !== '' &&
                        (mailing_address.zip || '').trim() !== '') {


                        let parseCity = mailing_address.city.trim().replace(/\s/g, "").substring(0, 3);

                        if (parseCity.toLowerCase() === "ft.") {
                            parseCity = "FO";
                        }
                        if (parseCity.toLowerCase() === "mt.") {
                            parseCity = "MO";
                        }
                        if (parseCity.toLowerCase() === "st.") {
                            parseCity = "SA";
                        }

                        let newCode = (mailing_address.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (mailing_address.state || '').trim().replace(/\s/g, "").substring(0, 2);

                        mailing_address.code = newCode;

                        $.post(props.serverUrl + '/saveFactoringCompanyMailingAddress', mailing_address).then(res => {
                            if (res.result === 'OK') {
                                let mailing_address = {
                                    ...props.selectedFactoringCompany.mailing_address,
                                    id: res.mailing_address.id,
                                    factoring_company_id: res.mailing_address.factoring_company_id,
                                    code: res.mailing_address.code
                                }

                                props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                            }
                        });
                    }

                }, 300);
            }
        }
    }

    const validateContactForSaving = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if ((props.selectedFactoringCompany.id || 0) === 0) {
                return;
            }

            let contact = props.selectedFactoringCompanyContact;

            if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
                contact.factoring_company_id = props.selectedFactoringCompany.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedFactoringCompany.address1;
                contact.address2 = props.selectedFactoringCompany.address2;
                contact.city = props.selectedFactoringCompany.city;
                contact.state = props.selectedFactoringCompany.state;
                contact.zip_code = props.selectedFactoringCompany.zip;
            }

            $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contacts: res.contacts });
                    await props.setSelectedFactoringCompanyContact(res.contact);
                }
            });
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, is_primary: e.target.checked ? 1 : 0 });

        if ((props.selectedFactoringCompany.id || 0) === 0) {
            return;
        }

        let contact = props.selectedFactoringCompanyContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
            contact.factoring_company_id = props.selectedFactoringCompany.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedFactoringCompany.address1;
            contact.address2 = props.selectedFactoringCompany.address2;
            contact.city = props.selectedFactoringCompany.city;
            contact.state = props.selectedFactoringCompany.state;
            contact.zip_code = props.selectedFactoringCompany.zip;
        }

        $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedFactoringCompanyContact(res.contact);
                await props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedFactoringCompany.id || 0
            },
            {
                field: 'First Name',
                data: (props.selectedFactoringCompanyContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.selectedFactoringCompanyContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedFactoringCompanyContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedFactoringCompanyContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedFactoringCompanyContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedFactoringCompanyContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.selectedFactoringCompanyContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedFactoringCompanyContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanyContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, filters: filters });
                await props.setFactoringCompanyContacts(res.contacts);

                if (!props.carrierOpenedPanels.includes('factoring-company-contact-search')) {
                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-contact-search']);
                }
            }
        });
    }

    const printWindow = (data) => {
        let mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="../../css/index.css" type="text/css" media="all" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        setTimeout(function () { mywindow.print(); }, 1000);

        return true;
    }

    const searchInvoiceBtnClick = async () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedFactoringCompany.id || 0
            },
            {
                field: 'Invoice Date',
                data: (props.selectedFactoringCompanyInvoiceSearch.invoice_date || '').toLowerCase()
            },
            {
                field: 'Pick Up Location',
                data: (props.selectedFactoringCompanyInvoiceSearch.pickup_location || '').toLowerCase()
            },
            {
                field: 'Delivery Location',
                data: (props.selectedFactoringCompanyInvoiceSearch.delivery_location || '').toLowerCase()
            },
            {
                field: 'Invoice Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.invoice_number || '').toLowerCase()
            },
            {
                field: 'Order Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.order_number || '').toLowerCase()
            },
            {
                field: 'Trip Number',
                data: (props.selectedFactoringCompanyInvoiceSearch.trip_number || '').toLowerCase()
            },
            {
                field: 'Invoice Amount',
                data: props.selectedFactoringCompanyInvoiceSearch.invoice_amount || ''
            },
            {
                field: 'Customer Code',
                data: (props.selectedFactoringCompanyInvoiceSearch.customer_code || '').toLowerCase()
            },
            {
                field: 'Customer Name',
                data: (props.selectedFactoringCompanyInvoiceSearch.customer_name || '').toLowerCase()
            }
            ,
            {
                field: 'Carrier Code',
                data: (props.selectedFactoringCompanyInvoiceSearch.carrier_code || '').toLowerCase()
            },
            {
                field: 'Carrier Name',
                data: (props.selectedFactoringCompanyInvoiceSearch.carrier_name || '').toLowerCase()
            }
        ]

        await props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, filters: filters })

        if (!props.carrierOpenedPanels.includes('factoring-company-invoice-search')) {
            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-invoice-search']);
        }

        // $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
        //     if (res.result === 'OK') {
        //         await props.setContactSearch({ ...props.selectedFactoringCompanyInvoiceSearch, filters: filters });
        //         await props.setCustomerContacts(res.contacts);

        //         let index = props.panels.length - 1;
        //         let panels = props.panels.map((p, i) => {
        //             if (p.name === 'customer-contact-search') {
        //                 index = i;
        //                 p.isOpened = true;
        //             }
        //             return p;
        //         });

        //         panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
        //         await props.setCustomerPanels(panels);
        //     }
        // });
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'carrier-factoring-company')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="factoring-company-container">
                <div className="fields-container-col" style={{ marginRight: 10 }}>
                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Customer</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={searchFactoringCompanyBtnClick}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Search</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={setInitialValues}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input type="text" placeholder="Code" maxLength="8" style={{ textTransform: 'uppercase' }}
                                    onKeyDown={getFactoringCompanyByCode}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, code: e.target.value })}
                                    value={(props.selectedFactoringCompany.code_number || 0) === 0 ? (props.selectedFactoringCompany.code || '') : props.selectedFactoringCompany.code + props.selectedFactoringCompany.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, name: e.target.value })}
                                    value={props.selectedFactoringCompany.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, address1: e.target.value })}
                                    value={props.selectedFactoringCompany.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, address2: e.target.value })}
                                    value={props.selectedFactoringCompany.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, city: e.target.value })}
                                    value={props.selectedFactoringCompany.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, state: e.target.value })}
                                    value={props.selectedFactoringCompany.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, zip: e.target.value })}
                                    value={props.selectedFactoringCompany.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contact_name: e.target.value })}
                                    value={props.selectedFactoringCompany.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, contact_phone: e.target.value })}
                                    value={props.selectedFactoringCompany.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, ext: e.target.value })} value={props.selectedFactoringCompany.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, email: e.target.value })}
                                    value={props.selectedFactoringCompany.email || ''} />
                            </div>
                        </div>
                    </div>

                    {/* ================================================================================================ */}

                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Mailing Address</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    let mailing_address = props.selectedFactoringCompany;
                                    mailing_address.factoring_company_id = props.selectedFactoringCompany.id;
                                    props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });

                                    $.post(props.serverUrl + '/saveFactoringCompanyMailingAddress', mailing_address).then(res => {
                                        if (res.result === 'OK') {
                                            props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: res.mailing_address });
                                        }
                                    });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Remit to address is the same</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        return;
                                    }

                                    props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: {} })

                                    $.post(props.serverUrl + '/deleteFactoringCompanyMailingAddress', { factoring_company_id: props.selectedFactoringCompany.id }).then(res => {
                                        if (res.result === 'OK') {

                                            console.log(res.mailing_address);
                                        }
                                    });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input type="text" placeholder="Code" maxLength="8" readOnly={true} style={{ textTransform: 'uppercase' }}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.code = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.code || '') + ((props.selectedFactoringCompany.mailing_address?.code_number || 0) === 0 ? '' : props.selectedFactoringCompany.mailing_address.code_number)} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.name || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.address1 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.address2 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.city || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.state || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.zip || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.contact_name || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.contact_phone = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.contact_phone || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.ext || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedFactoringCompany.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedFactoringCompany.mailing_address?.email || '')} />
                            </div>
                        </div>
                    </div>

                    {/* ======================================================================================= */}

                    <div className="form-bordered-box" style={{ marginBottom: 10, flexGrow: 'initial' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Contacts</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button" onClick={async () => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    if (props.selectedFactoringCompanyContact.id === undefined) {
                                        window.alert('You must select a contact');
                                        return;
                                    }
                                    
                                    await props.setFactoringCompanyIsEditingContact(false);
                                    await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: props.selectedFactoringCompanyContact });

                                    if (!props.carrierOpenedPanels.includes('factoring-company-contacts')) {
                                        props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-contacts']);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: { id: 0, factoring_company_id: props.selectedFactoringCompany.id } });
                                    props.setFactoringCompanyIsEditingContact(true);

                                    if (!props.carrierOpenedPanels.includes('factoring-company-contacts')) {
                                        props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-contacts']);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add contact</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyContact({})}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Clear</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="First Name"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => {
                                        props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, first_name: e.target.value })
                                    }}
                                    value={props.selectedFactoringCompanyContact.first_name || ''} />

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Last Name"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, last_name: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.last_name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container" style={{ width: '50%' }}>
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Phone"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, phone_work: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.phone_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext"
                                        onKeyDown={validateContactForSaving}
                                        onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, phone_ext: e.target.value })}
                                        value={props.selectedFactoringCompanyContact.phone_ext || ''} />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-factoring-company-contacts-primary-btn"
                                        onChange={selectedContactIsPrimaryChange}
                                        checked={(props.selectedFactoringCompanyContact.is_primary || 0) === 1} />
                                    <label htmlFor="cbox-factoring-company-contacts-primary-btn">
                                        <div className="label-text">Primary</div>
                                        <div className="input-toggle-btn"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, email_work: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedFactoringCompanyContact({ ...props.selectedFactoringCompanyContact, notes: e.target.value })}
                                    value={props.selectedFactoringCompanyContact.notes || ''} />
                            </div>
                        </div>
                    </div>

                    {/* ================================================================================= */}

                    <div className="form-bordered-box" style={{
                        flexGrow: 1
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                {
                                    props.selectedFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyIsShowingContactList(false)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedFactoringCompanyIsShowingContactList(true)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Cancel</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }

                                {
                                    !props.selectedFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={searchContactBtnClick}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Send</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                            </div>
                            <div className="top-border top-border-right"></div>
                        </div>

                        <div className="form-slider">
                            <div className="form-slider-wrapper" style={{ left: props.selectedFactoringCompanyIsShowingContactList ? 0 : '-100%' }}>
                                <div className="contact-list-box">
                                    <div className="contact-list-wrapper">
                                        {
                                            (props.selectedFactoringCompany.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {
                                                        await props.setFactoringCompanyIsEditingContact(false);
                                                        await props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompany, selectedContact: contact });

                                                        if (!props.carrierOpenedPanels.includes('factoring-company-contacts')) {
                                                            props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-contacts']);
                                                        }
                                                    }} onClick={() => props.setSelectedFactoringCompanyContact(contact)}>
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
                                            <input type="text" placeholder="First Name"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, first_name: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.first_name || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Last Name"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, last_name: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.last_name || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 1"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, address1: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.address1 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 2"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, address2: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.address2 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="City"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, city: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.city || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container input-state">
                                            <input type="text" placeholder="State" maxLength="2"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, state: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.state || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <MaskedInput
                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                guide={true}
                                                type="text" placeholder="Phone (Work/Mobile/Fax)"
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, phone: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.phone || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                                onFocus={() => { props.setSelectedFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedFactoringCompanyContactSearch({ ...props.selectedFactoringCompanyContactSearch, email: e.target.value })}
                                                value={props.selectedFactoringCompanyContactSearch.email || ''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fields-container-col">

                    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <div className='mochi-button' onClick={() => {
                            if ((props.selectedFactoringCompany.id || 0) > 0) {
                                props.setSelectedFactoringCompanyDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY')
                                });

                                if (!props.carrierOpenedPanels.includes('factoring-company-documents')) {
                                    props.setCarrierOpenedPanels([...props.carrierOpenedPanels, 'factoring-company-documents']);
                                }
                            } else {
                                window.alert('You must select a factoring company first!');
                            }
                        }}>
                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                            <div className='mochi-button-base'>Documents</div>
                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                        </div>

                        <div className='mochi-button' onClick={() => {
                            if ((props.selectedFactoringCompany.id || 0) === 0) {
                                window.alert('There is nothing to print!');
                                return;
                            }

                            let factoringCompany = { ...props.selectedFactoringCompany };

                            let html = ``;

                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Code</span>: ${factoringCompany.code.toUpperCase() + (factoringCompany.code_number === 0 ? '' : factoringCompany.code_number)}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Name</span>: ${factoringCompany.name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 1</span>: ${factoringCompany.address1}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Address 2</span>: ${factoringCompany.address2}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">City</span>: ${factoringCompany.city}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">State</span>: ${factoringCompany.state.toUpperCase()}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Postal Code</span>: ${factoringCompany.zip}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Name</span>: ${factoringCompany.contact_name}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone</span>: ${factoringCompany.contact_phone}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">Contact Phone Ext</span>: ${factoringCompany.ext}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">E-Mail</span>: ${factoringCompany.email}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">MC Number</span>: ${factoringCompany.mc_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">DOT Number</span>: ${factoringCompany.dot_number}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">SCAC</span>: ${factoringCompany.scac}</div>`;
                            html += `<div style="margin-bottom:10px;"><span style="font-weight: bold;">FID</span>: ${factoringCompany.fid}</div>`;

                            printWindow(html);
                        }}>
                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                            <div className='mochi-button-base'>Print Company Information</div>
                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                        </div>
                    </div>

                    <div className='form-bordered-box' style={{ marginBottom: 10 }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Notes</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    if ((props.selectedFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedFactoringCompanyNote({ id: 0, factoring_company_id: props.selectedFactoringCompany.id })
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Add note</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' onClick={() => {
                                    if (props.selectedFactoringCompany.id === undefined || (props.selectedFactoringCompany.notes || []).length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = ``;

                                    props.selectedFactoringCompany.notes.map((note, index) => {
                                        html += `<div><b>${note.user}:${moment(note.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm')}</b> ${note.text}</div>`

                                        return true;
                                    })

                                    printWindow(html);
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Print</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="factoring-company-list-container">
                            <div className="factoring-company-list-wrapper">
                                {
                                    (props.selectedFactoringCompany.notes || []).map((note, index) => {
                                        return (
                                            <div className="factoring-company-list-item" key={index} onClick={() => props.setSelectedFactoringCompanyNote(note)}>
                                                {note.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>

                    <div className='form-bordered-box'>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Outstanding Invoices</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                {
                                    props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => {
                                        let html = `<h2>Factoring Company Invoices</h2></br></br>`;
                                        html += `
                                        <div style="display:flex;align-items:center;font-size: 0.9rem;font-weight:bold;margin-bottom:10px;color: rgba(0,0,0,0.8)">
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Invoice Date</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline">Invoice Number</div>
                                            <div style="min-width:25%;max-width:25%;flex-grow:1;text-decoration:underline">Order Number</div>
                                            <div style="min-width:25%;max-width:25%;text-decoration:underline;text-align:right">Amount</div>
                                        </div>
                                        `;

                                        html += `
                                        <div style="padding: 5px 0;display:flex;align-items:center;font-size: 0.7rem;font-weight:normal;margin-bottom:15px;color: rgba(0,0,0,1); borderTop:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1)">
                                            <div style="min-width:25%;max-width:25%">03/09/2021</div>
                                            <div style="min-width:25%;max-width:25%">12345</div>
                                            <div style="min-width:25%;max-width:25%;flex-grow:1">54321</div>
                                            <div style="min-width:25%;max-width:25%;text-align:right">$25,000.00</div>
                                        </div>
                                        `;

                                        printWindow(html);

                                    }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Print</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(true) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Cancel</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={searchInvoiceBtnClick}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Send</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }

                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="form-slider">
                            <div className="form-slider-wrapper" style={{ left: props.selectedFactoringCompanyIsShowingInvoiceList ? 0 : '-100%' }}>
                                <div className="factoring-company-invoice-list-container" style={{ width: '50%' }}>
                                    <div className="factoring-company-invoice-list-wrapper">
                                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: 5, color: 'rgba(0,0,0,0.8)' }}>
                                            <div style={{ width: '6rem', textDecoration: 'underline' }}>Invoice Date</div>
                                            <div style={{ width: '6rem', textDecoration: 'underline' }}>Invoice Number</div>
                                            <div style={{ flexGrow: 1, textDecoration: 'underline' }}>Order Number</div>
                                            <div style={{ width: '6rem', textAlign: 'right', textDecoration: 'underline' }}>Amount</div>
                                        </div>
                                        <div className="factoring-company-invoice-list-item" onClick={() => { }}>
                                            <div style={{ width: '6rem' }}>03/09/2021</div>
                                            <div style={{ width: '6rem' }}>12345</div>
                                            <div style={{ flexGrow: 1 }}>54321</div>
                                            <div style={{ width: '6rem', textAlign: 'right' }}>$25,000.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: '50%', flexGrow: 1 }}>
                                    <div className="form-borderless-box">
                                        <div className="form-row">
                                            <div className="input-box-container" style={{ width: '7.7rem' }}>
                                                <MaskedInput
                                                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                                    guide={true}
                                                    type="text" placeholder="Date (MM/DD/YYYY)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_date: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_date || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Pick Up Location (City / State)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, pickup_location: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.pickup_location || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Delivery Location (City / State)"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, delivery_location: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.delivery_location || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Invoice Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Order Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, order_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.order_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Trip Number"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, trip_number: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.trip_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Amount"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, invoice_amount: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.invoice_amount || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Customer Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, customer_code: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.customer_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Customer Name"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, customer_name: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.customer_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Carrier Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, carrier_code: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.carrier_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Carrier Name"
                                                    onFocus={() => { props.setSelectedFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedFactoringCompanyInvoiceSearch({ ...props.selectedFactoringCompanyInvoiceSearch, carrier_name: e.target.value })}
                                                    value={props.selectedFactoringCompanyInvoiceSearch.carrier_name || ''} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {
                props.selectedFactoringCompanyNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <FactoringCompanyModal
                        selectedData={props.selectedFactoringCompanyNote}
                        setSelectedData={props.setSelectedFactoringCompanyNote}
                        selectedParent={props.selectedFactoringCompany}
                        setSelectedParent={(notes) => {
                            props.setSelectedFactoringCompany({ ...props.selectedFactoringCompany, notes: notes });
                        }}
                        savingDataUrl='/saveFactoringCompanyNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={false}
                        isAdding={props.selectedFactoringCompanyNote.id === 0}
                    />
                </animated.div>

            }
        </div>

    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        panels: state.carrierReducers.panels,
        carrierOpenedPanels: state.carrierReducers.carrierOpenedPanels,
        carriers: state.carrierReducers.carriers,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        selectedFactoringCompany: state.carrierReducers.selectedFactoringCompany,
        selectedFactoringCompanyContact: state.carrierReducers.selectedFactoringCompanyContact,
        selectedFactoringCompanyIsShowingContactList: state.carrierReducers.selectedFactoringCompanyIsShowingContactList,
        selectedFactoringCompanyNote: state.carrierReducers.selectedFactoringCompanyNote,
        selectedFactoringCompanyContactSearch: state.carrierReducers.selectedFactoringCompanyContactSearch,
        selectedFactoringCompanyInvoices: state.carrierReducers.selectedFactoringCompanyInvoices,
        factoringCompanyIsEditingContact: state.carrierReducers.factoringCompanyIsEditingContact,
        selectedFactoringCompanyInvoice: state.carrierReducers.selectedFactoringCompanyInvoice,
        selectedFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedFactoringCompanyIsShowingInvoiceList,
        selectedFactoringCompanyInvoiceSearch: state.carrierReducers.selectedFactoringCompanyInvoiceSearch
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels,
    setSelectedFactoringCompanyContact,
    setSelectedFactoringCompanyIsShowingContactList,
    setSelectedFactoringCompanyContactSearch,
    setSelectedFactoringCompanyIsShowingContactList,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyNote,
    setSelectedFactoringCompanyInvoiceSearch,
    setSelectedFactoringCompanyInvoices,
    setFactoringCompanyIsEditingContact,
    setFactoringCompanyContacts,
    setSelectedFactoringCompanyInvoice,
    setSelectedFactoringCompanyIsShowingInvoiceList,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setSelectedFactoringCompanyDocument,
    setCarrierOpenedPanels
})(FactoringCompany)