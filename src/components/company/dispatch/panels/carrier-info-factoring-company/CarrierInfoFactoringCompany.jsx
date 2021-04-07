import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoFactoringCompany.css';
import MaskedInput from 'react-text-mask';
import FactoringCompanyModal from './../../modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoFactoringCompanyContact,
    setSelectedDispatchCarrierInfoFactoringCompanyContactSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyNote,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoices,
    setDispatchCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchCarrierInfoFactoringCompanyContacts,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoice,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoFactoringCompanies,
    setSelectedDispatchCarrierInfoFactoringCompanyDocument,
    setSelectedDispatchCarrierInfoCarrier
} from '../../../../../actions';

function CarrierInfoFactoringCompany(props) {

    var delayTimer;
    const modalTransitionProps = useSpring({ opacity: (props.selectedDispatchCarrierInfoFactoringCompanyNote.id !== undefined) ? 1 : 0 });

    const setInitialValues = (clearCode = true) => {
        props.setSelectedDispatchCarrierInfoFactoringCompany({ id: 0, code: clearCode ? '' : props.selectedDispatchCarrierInfoFactoringCompany.code });
        props.setSelectedDispatchCarrierInfoFactoringCompanyContact({});
        props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(true);
        props.setSelectedDispatchCarrierInfoFactoringCompanyNote({});
        props.setSelectedDispatchCarrierInfoFactoringCompanyInvoices([]);
        props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch([]);
    }


    const closePanelBtnClick = () => {
        console.log('closing')
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'carrier-info-factoring-company') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
    }

    const searchFactoringCompanyBtnClick = () => {

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedDispatchCarrierInfoFactoringCompany.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setDispatchCarrierInfoFactoringCompanySearch(factoringCompanySearch);
                await props.setDispatchCarrierInfoFactoringCompanies(res.factoring_companies);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-info-factoring-company-panel-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setDispatchPanels(panels);
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
                            props.setSelectedDispatchCarrierInfoFactoringCompany(res.factoring_companies[0]);

                            if (res.factoring_companies[0].contacts.length > 0) {
                                res.factoring_companies[0].contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedDispatchCarrierInfoFactoringCompanyContact(contact);
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
                let company = { ...props.selectedDispatchCarrierInfoFactoringCompany };

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
                            props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, id: res.factoring_company.id, code: res.factoring_company.code });

                            if (res.factoring_company.contacts.length > 0) {
                                res.factoring_company.contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedDispatchCarrierInfoFactoringCompanyContact(contact);
                                    }
                                    return true;
                                });
                            }

                            if ((props.selectedDispatchCarrierInfoCarrier.factoring_company?.id || 0) === res.factoring_company.id) {
                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: res.factoring_company });
                            }
                        }
                    });
                }

            }, 300);
        }
    }

    const validateMailingAddressToSave = (e) => {
        let key = e.keyCode || e.which;

        if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) > 0) {
            if (key === 9) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                    mailing_address.factoring_company_id = props.selectedDispatchCarrierInfoFactoringCompany.id;

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
                                    ...props.selectedDispatchCarrierInfoFactoringCompany.mailing_address,
                                    id: res.mailing_address.id,
                                    factoring_company_id: res.mailing_address.factoring_company_id,
                                    code: res.mailing_address.code
                                }

                                props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
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
            if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                return;
            }

            let contact = props.selectedDispatchCarrierInfoFactoringCompanyContact;

            if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
                contact.factoring_company_id = props.selectedDispatchCarrierInfoFactoringCompany.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedDispatchCarrierInfoFactoringCompany.address1;
                contact.address2 = props.selectedDispatchCarrierInfoFactoringCompany.address2;
                contact.city = props.selectedDispatchCarrierInfoFactoringCompany.city;
                contact.state = props.selectedDispatchCarrierInfoFactoringCompany.state;
                contact.zip_code = props.selectedDispatchCarrierInfoFactoringCompany.zip;
            }

            $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, contacts: res.contacts });
                    await props.setSelectedDispatchCarrierInfoFactoringCompanyContact(res.contact);
                }
            });
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, is_primary: e.target.checked ? 1 : 0 });

        if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
            return;
        }

        let contact = props.selectedDispatchCarrierInfoFactoringCompanyContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
            contact.factoring_company_id = props.selectedDispatchCarrierInfoFactoringCompany.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedDispatchCarrierInfoFactoringCompany.address1;
            contact.address2 = props.selectedDispatchCarrierInfoFactoringCompany.address2;
            contact.city = props.selectedDispatchCarrierInfoFactoringCompany.city;
            contact.state = props.selectedDispatchCarrierInfoFactoringCompany.state;
            contact.zip_code = props.selectedDispatchCarrierInfoFactoringCompany.zip;
        }

        $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedDispatchCarrierInfoFactoringCompanyContact(res.contact);
                await props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedDispatchCarrierInfoFactoringCompany.id || 0
            },
            {
                field: 'First Name',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanyContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, filters: filters });
                await props.setDispatchCarrierInfoFactoringCompanyContacts(res.contacts);

                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-info-factoring-company-contact-search') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                await props.setDispatchPanels(panels);
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
                data: props.selectedDispatchCarrierInfoFactoringCompany.id || 0
            },
            {
                field: 'Invoice Date',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_date || '').toLowerCase()
            },
            {
                field: 'Pick Up Location',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.pickup_location || '').toLowerCase()
            },
            {
                field: 'Delivery Location',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.delivery_location || '').toLowerCase()
            },
            {
                field: 'Invoice Number',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_number || '').toLowerCase()
            },
            {
                field: 'Order Number',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.order_number || '').toLowerCase()
            },
            {
                field: 'Trip Number',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.trip_number || '').toLowerCase()
            },
            {
                field: 'Invoice Amount',
                data: props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_amount || ''
            },
            {
                field: 'Customer Code',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.customer_code || '').toLowerCase()
            },
            {
                field: 'Customer Name',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.customer_name || '').toLowerCase()
            }
            ,
            {
                field: 'Carrier Code',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.carrier_code || '').toLowerCase()
            },
            {
                field: 'Carrier Name',
                data: (props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.carrier_name || '').toLowerCase()
            }
        ]

        await props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, filters: filters })

        let index = props.panels.length - 1;
        let panels = props.panels.map((p, i) => {
            if (p.name === 'carrier-info-factoring-company-invoice-search') {
                index = i;
                p.isOpened = true;
            }
            return p;
        });

        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
        await props.setDispatchPanels(panels);

        // $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
        //     if (res.result === 'OK') {
        //         await props.setContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, filters: filters });
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
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

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
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, code: e.target.value })}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.code_number || 0) === 0 ? (props.selectedDispatchCarrierInfoFactoringCompany.code || '') : props.selectedDispatchCarrierInfoFactoringCompany.code + props.selectedDispatchCarrierInfoFactoringCompany.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, name: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, address1: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, address2: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, city: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, state: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, zip: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, contact_name: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, contact_phone: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, ext: e.target.value })} value={props.selectedDispatchCarrierInfoFactoringCompany.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, email: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompany.email || ''} />
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
                                    if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany;
                                    mailing_address.factoring_company_id = props.selectedDispatchCarrierInfoFactoringCompany.id;
                                    props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });

                                    $.post(props.serverUrl + '/saveFactoringCompanyMailingAddress', mailing_address).then(res => {
                                        if (res.result === 'OK') {

                                            let selectedDispatchCarrierInfoFactoringCompany = { ...props.selectedDispatchCarrierInfoFactoringCompany };
                                            selectedDispatchCarrierInfoFactoringCompany.mailing_address = res.mailing_address;

                                            props.setSelectedDispatchCarrierInfoFactoringCompany(selectedDispatchCarrierInfoFactoringCompany);

                                            if ((props.selectedDispatchCarrierInfoCarrier.factoring_company?.id || 0) === selectedDispatchCarrierInfoFactoringCompany.id) {
                                                props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: selectedDispatchCarrierInfoFactoringCompany });
                                            }
                                        }
                                    });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Remit to address is the same</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                        return;
                                    }

                                    let selectedDispatchCarrierInfoFactoringCompany = { ...props.selectedDispatchCarrierInfoFactoringCompany };
                                    selectedDispatchCarrierInfoFactoringCompany.mailing_address = {};

                                    props.setSelectedDispatchCarrierInfoFactoringCompany(selectedDispatchCarrierInfoFactoringCompany);

                                    if ((props.selectedDispatchCarrierInfoCarrier.factoring_company?.id || 0) === selectedDispatchCarrierInfoFactoringCompany.id) {
                                        props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: selectedDispatchCarrierInfoFactoringCompany });
                                    }

                                    $.post(props.serverUrl + '/deleteFactoringCompanyMailingAddress', { factoring_company_id: props.selectedDispatchCarrierInfoFactoringCompany.id }).then(res => {
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
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.code = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.code || '') + ((props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.code_number || 0) === 0 ? '' : props.selectedDispatchCarrierInfoFactoringCompany.mailing_address.code_number)} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.name || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.address1 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.address2 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.city || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.state || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.zip || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.contact_name || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.contact_phone = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.contact_phone || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.ext || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedDispatchCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedDispatchCarrierInfoFactoringCompany.mailing_address?.email || '')} />
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
                                    if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    if (props.selectedDispatchCarrierInfoFactoringCompanyContact.id === undefined) {
                                        window.alert('You must select a contact');
                                        return;
                                    }

                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'carrier-info-factoring-company-contacts') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    await props.setDispatchCarrierInfoFactoringCompanyIsEditingContact(false);
                                    await props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompany, selectedContact: props.selectedDispatchCarrierInfoFactoringCompanyContact });

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                    props.setDispatchPanels(panels);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'carrier-info-factoring-company-contacts') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompany, selectedContact: { id: 0, factoring_company_id: props.selectedDispatchCarrierInfoFactoringCompany.id } });
                                    props.setDispatchCarrierInfoFactoringCompanyIsEditingContact(true);

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                    props.setDispatchPanels(panels);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add contact</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({})}>
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
                                        props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, first_name: e.target.value })
                                    }}
                                    value={props.selectedDispatchCarrierInfoFactoringCompanyContact.first_name || ''} />

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Last Name"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, last_name: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompanyContact.last_name || ''} />
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
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, phone_work: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompanyContact.phone_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext"
                                        onKeyDown={validateContactForSaving}
                                        onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, phone_ext: e.target.value })}
                                        value={props.selectedDispatchCarrierInfoFactoringCompanyContact.phone_ext || ''} />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-carrier-info-factoring-company-contacts-primary-btn"
                                        onChange={selectedContactIsPrimaryChange}
                                        checked={(props.selectedDispatchCarrierInfoFactoringCompanyContact.is_primary || 0) === 1} />
                                    <label htmlFor="cbox-carrier-info-factoring-company-contacts-primary-btn">
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
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, email_work: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompanyContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContact({ ...props.selectedDispatchCarrierInfoFactoringCompanyContact, notes: e.target.value })}
                                    value={props.selectedDispatchCarrierInfoFactoringCompanyContact.notes || ''} />
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
                                    props.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                                {
                                    !props.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(true)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Cancel</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }

                                {
                                    !props.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList &&
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
                            <div className="form-slider-wrapper" style={{ left: props.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList ? 0 : '-100%' }}>
                                <div className="contact-list-box">

                                    {
                                        (props.selectedDispatchCarrierInfoFactoringCompany.contacts || []).length > 0 &&
                                        <div className="contact-list-header">
                                            <div className="contact-list-col tcol first-name">First Name</div>
                                            <div className="contact-list-col tcol last-name">Last Name</div>
                                            <div className="contact-list-col tcol phone-work">Phone Work</div>
                                            <div className="contact-list-col tcol email-work">E-Mail Work</div>
                                            <div className="contact-list-col tcol pri"></div>
                                        </div>
                                    }

                                    <div className="contact-list-wrapper">
                                        {
                                            (props.selectedDispatchCarrierInfoFactoringCompany.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                        let index = props.panels.length - 1;
                                                        let panels = props.panels.map((p, i) => {
                                                            if (p.name === 'carrier-info-factoring-company-contacts') {
                                                                index = i;
                                                                p.isOpened = true;
                                                            }
                                                            return p;
                                                        });

                                                        await props.setDispatchCarrierInfoFactoringCompanyIsEditingContact(false);
                                                        await props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompany, selectedContact: contact });

                                                        panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);
                                                        props.setDispatchPanels(panels);
                                                    }} onClick={() => props.setSelectedDispatchCarrierInfoFactoringCompanyContact(contact)}>
                                                        <div className="contact-list-col tcol first-name">{contact.first_name}</div>
                                                        <div className="contact-list-col tcol last-name">{contact.last_name}</div>
                                                        <div className="contact-list-col tcol phone-work">{contact.phone_work}</div>
                                                        <div className="contact-list-col tcol email-work">{contact.email_work}</div>
                                                        <div className="contact-list-col tcol pri">
                                                            {
                                                                (contact.is_primary === 1) &&
                                                                <span className='fas fa-check'></span>
                                                            }
                                                        </div>
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
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, first_name: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.first_name || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Last Name"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, last_name: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.last_name || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 1"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, address1: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.address1 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 2"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, address2: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.address2 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="City"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, city: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.city || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container input-state">
                                            <input type="text" placeholder="State" maxLength="2"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, state: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.state || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <MaskedInput
                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                guide={true}
                                                type="text" placeholder="Phone (Work/Mobile/Fax)"
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, phone: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.phone || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                                onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyContactSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyContactSearch, email: e.target.value })}
                                                value={props.selectedDispatchCarrierInfoFactoringCompanyContactSearch.email || ''} />
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
                            if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) > 0) {
                                props.setSelectedDispatchCarrierInfoFactoringCompanyDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM-DD-YYYY')
                                });

                                let index = props.panels.length - 1;
                                let panels = props.panels.map((p, i) => {
                                    if (p.name === 'carrier-info-factoring-company-documents') {
                                        index = i;
                                        p.isOpened = true;
                                    }
                                    return p;
                                });

                                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                props.setDispatchPanels(panels);
                            } else {
                                window.alert('You must select a factoring company first!');
                            }
                        }}>
                            <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                            <div className='mochi-button-base'>Documents</div>
                            <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                        </div>

                        <div className='mochi-button' onClick={() => {
                            if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                window.alert('There is nothing to print!');
                                return;
                            }

                            let factoringCompany = { ...props.selectedDispatchCarrierInfoFactoringCompany };

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
                                    if ((props.selectedDispatchCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedDispatchCarrierInfoFactoringCompanyNote({ id: 0, factoring_company_id: props.selectedDispatchCarrierInfoFactoringCompany.id })
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Add note</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' onClick={() => {
                                    if (props.selectedDispatchCarrierInfoFactoringCompany.id === undefined || (props.selectedDispatchCarrierInfoFactoringCompany.notes || []).length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = ``;

                                    props.selectedDispatchCarrierInfoFactoringCompany.notes.map((note, index) => {
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
                                    (props.selectedDispatchCarrierInfoFactoringCompany.notes || []).map((note, index) => {
                                        return (
                                            <div className="factoring-company-list-item" key={index} onClick={() => props.setSelectedDispatchCarrierInfoFactoringCompanyNote(note)}>
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
                                    props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList &&
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
                                    !props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(true) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Cancel</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList &&
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
                            <div className="form-slider-wrapper" style={{ left: props.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList ? 0 : '-100%' }}>
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
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, invoice_date: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_date || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Pick Up Location (City / State)"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, pickup_location: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.pickup_location || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Delivery Location (City / State)"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, delivery_location: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.delivery_location || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Invoice Number"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, invoice_number: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Order Number"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, order_number: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.order_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Trip Number"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, trip_number: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.trip_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Amount"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, invoice_amount: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.invoice_amount || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Customer Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, customer_code: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.customer_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Customer Name"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, customer_name: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.customer_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Carrier Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, carrier_code: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.carrier_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Carrier Name"
                                                    onFocus={() => { props.setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch, carrier_name: e.target.value })}
                                                    value={props.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch.carrier_name || ''} />
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
                props.selectedDispatchCarrierInfoFactoringCompanyNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <FactoringCompanyModal
                        selectedData={props.selectedDispatchCarrierInfoFactoringCompanyNote}
                        setSelectedData={props.setSelectedDispatchCarrierInfoFactoringCompanyNote}
                        selectedParent={props.selectedDispatchCarrierInfoFactoringCompany}
                        setSelectedParent={(notes) => {
                            props.setSelectedDispatchCarrierInfoFactoringCompany({ ...props.selectedDispatchCarrierInfoFactoringCompany, notes: notes });
                        }}
                        savingDataUrl='/saveFactoringCompanyNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={false}
                        isAdding={props.selectedDispatchCarrierInfoFactoringCompanyNote.id === 0}
                    />
                </animated.div>

            }
        </div>

    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        panels: state.dispatchReducers.panels,
        dispatchCarrierInfoFactoringCompanySearch: state.carrierReducers.dispatchCarrierInfoFactoringCompanySearch,
        selectedDispatchCarrierInfoFactoringCompany: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompany,
        selectedDispatchCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyContact,
        selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
        selectedDispatchCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyNote,
        selectedDispatchCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyContactSearch,
        selectedDispatchCarrierInfoFactoringCompanyInvoices: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyInvoices,
        factoringCompanyIsEditingContact: state.carrierReducers.factoringCompanyIsEditingContact,
        selectedDispatchCarrierInfoFactoringCompanyInvoice: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyInvoice,
        selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
        selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch: state.carrierReducers.selectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,

    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoFactoringCompanyContact,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedDispatchCarrierInfoFactoringCompanyContactSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setSelectedDispatchCarrierInfoFactoringCompanyNote,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoices,
    setDispatchCarrierInfoFactoringCompanyIsEditingContact,
    setDispatchCarrierInfoFactoringCompanyContacts,
    setSelectedDispatchCarrierInfoFactoringCompanyInvoice,
    setSelectedDispatchCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setDispatchCarrierInfoFactoringCompanySearch,
    setDispatchCarrierInfoFactoringCompanies,
    setSelectedDispatchCarrierInfoFactoringCompanyDocument,
    setSelectedDispatchCarrierInfoCarrier
})(CarrierInfoFactoringCompany)