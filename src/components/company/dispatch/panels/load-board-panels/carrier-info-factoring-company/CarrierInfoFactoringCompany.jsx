import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoFactoringCompany.css';
import MaskedInput from 'react-text-mask';
import FactoringCompanyModal from './../../../modal/Modal.jsx';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';
import {    
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyNote,
    setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedLbCarrierInfoFactoringCompanyInvoices,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setLbCarrierInfoFactoringCompanyContacts,
    setSelectedLbCarrierInfoFactoringCompanyInvoice,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoFactoringCompanies,
    setSelectedLbCarrierInfoFactoringCompanyDocument,
    setSelectedLbCarrierInfoCarrier,
    setDispatchOpenedPanels
} from '../../../../../../actions';

function CarrierInfoFactoringCompany(props) {

    var delayTimer;
    const modalTransitionProps = useSpring({ opacity: (props.selectedLbCarrierInfoFactoringCompanyNote.id !== undefined) ? 1 : 0 });

    const setInitialValues = (clearCode = true) => {
        props.setSelectedLbCarrierInfoFactoringCompany({ id: 0, code: clearCode ? '' : props.selectedLbCarrierInfoFactoringCompany.code });
        props.setSelectedLbCarrierInfoFactoringCompanyContact({});
        props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(true);
        props.setSelectedLbCarrierInfoFactoringCompanyNote({});
        props.setSelectedLbCarrierInfoFactoringCompanyInvoices([]);
        props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch([]);
    }

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const searchFactoringCompanyBtnClick = () => {

        let factoringCompanySearch = [
            {
                field: 'Name',
                data: (props.selectedLbCarrierInfoFactoringCompany.name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedLbCarrierInfoFactoringCompany.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedLbCarrierInfoFactoringCompany.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedLbCarrierInfoFactoringCompany.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedLbCarrierInfoFactoringCompany.state || '').toLowerCase()
            },
            {
                field: 'Postal Code',
                data: (props.selectedLbCarrierInfoFactoringCompany.zip || '').toLowerCase()
            },
            {
                field: 'E-Mail',
                data: (props.selectedLbCarrierInfoFactoringCompany.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanySearch', { search: factoringCompanySearch }).then(async res => {
            if (res.result === 'OK') {
                await props.setLbCarrierInfoFactoringCompanySearch(factoringCompanySearch);
                await props.setLbCarrierInfoFactoringCompanies(res.factoring_companies);
                
                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-panel-search')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-panel-search'])
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
                            props.setSelectedLbCarrierInfoFactoringCompany(res.factoring_companies[0]);

                            if (res.factoring_companies[0].contacts.length > 0) {
                                res.factoring_companies[0].contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedLbCarrierInfoFactoringCompanyContact(contact);
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
                let company = { ...props.selectedLbCarrierInfoFactoringCompany };

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
                            props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, id: res.factoring_company.id, code: res.factoring_company.code });

                            if (res.factoring_company.contacts.length > 0) {
                                res.factoring_company.contacts.map((contact, index) => {
                                    if (contact.is_primary === 1) {
                                        props.setSelectedLbCarrierInfoFactoringCompanyContact(contact);
                                    }
                                    return true;
                                });
                            }

                            if ((props.selectedLbCarrierInfoCarrier.factoring_company?.id || 0) === res.factoring_company.id) {
                                props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: res.factoring_company });
                            }
                        }
                    });
                }

            }, 300);
        }
    }

    const validateMailingAddressToSave = (e) => {
        let key = e.keyCode || e.which;

        if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) > 0) {
            if (key === 9) {
                window.clearTimeout(delayTimer);

                window.setTimeout(() => {
                    let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                    mailing_address.factoring_company_id = props.selectedLbCarrierInfoFactoringCompany.id;

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
                                    ...props.selectedLbCarrierInfoFactoringCompany.mailing_address,
                                    id: res.mailing_address.id,
                                    factoring_company_id: res.mailing_address.factoring_company_id,
                                    code: res.mailing_address.code
                                }

                                props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
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
            if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                return;
            }

            let contact = props.selectedLbCarrierInfoFactoringCompanyContact;

            if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
                contact.factoring_company_id = props.selectedLbCarrierInfoFactoringCompany.id;
            }

            if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
                return;
            }

            if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
                contact.address1 = props.selectedLbCarrierInfoFactoringCompany.address1;
                contact.address2 = props.selectedLbCarrierInfoFactoringCompany.address2;
                contact.city = props.selectedLbCarrierInfoFactoringCompany.city;
                contact.state = props.selectedLbCarrierInfoFactoringCompany.state;
                contact.zip_code = props.selectedLbCarrierInfoFactoringCompany.zip;
            }

            $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
                if (res.result === 'OK') {
                    await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
                    await props.setSelectedLbCarrierInfoFactoringCompanyContact(res.contact);
                }
            });
        }
    }

    const selectedContactIsPrimaryChange = async (e) => {
        await props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, is_primary: e.target.checked ? 1 : 0 });

        if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
            return;
        }

        let contact = props.selectedLbCarrierInfoFactoringCompanyContact;
        contact = { ...contact, is_primary: e.target.checked ? 1 : 0 };

        if (contact.factoring_company_id === undefined || contact.factoring_company_id === 0) {
            contact.factoring_company_id = props.selectedLbCarrierInfoFactoringCompany.id;
        }

        if ((contact.first_name || '').trim() === '' || (contact.last_name || '').trim() === '' || (contact.phone_work || '').trim() === '' || (contact.email_work || '').trim() === '') {
            return;
        }

        if ((contact.address1 || '').trim() === '' && (contact.address2 || '').trim() === '') {
            contact.address1 = props.selectedLbCarrierInfoFactoringCompany.address1;
            contact.address2 = props.selectedLbCarrierInfoFactoringCompany.address2;
            contact.city = props.selectedLbCarrierInfoFactoringCompany.city;
            contact.state = props.selectedLbCarrierInfoFactoringCompany.state;
            contact.zip_code = props.selectedLbCarrierInfoFactoringCompany.zip;
        }

        $.post(props.serverUrl + '/saveFactoringCompanyContact', contact).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedLbCarrierInfoFactoringCompanyContact(res.contact);
                await props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contacts: res.contacts });
            }
        });

    }

    const searchContactBtnClick = () => {
        let filters = [
            {
                field: 'Factoring Company Id',
                data: props.selectedLbCarrierInfoFactoringCompany.id || 0
            },
            {
                field: 'First Name',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.first_name || '').toLowerCase()
            },
            {
                field: 'Last Name',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.last_name || '').toLowerCase()
            },
            {
                field: 'Address 1',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.address1 || '').toLowerCase()
            },
            {
                field: 'Address 2',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.address2 || '').toLowerCase()
            },
            {
                field: 'City',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.city || '').toLowerCase()
            },
            {
                field: 'State',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.state || '').toLowerCase()
            },
            {
                field: 'Phone',
                data: props.selectedLbCarrierInfoFactoringCompanyContactSearch.phone || ''
            },
            {
                field: 'E-Mail',
                data: (props.selectedLbCarrierInfoFactoringCompanyContactSearch.email || '').toLowerCase()
            }
        ]

        $.post(props.serverUrl + '/factoringCompanyContactsSearch', { search: filters }).then(async res => {
            if (res.result === 'OK') {
                await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, filters: filters });
                await props.setLbCarrierInfoFactoringCompanyContacts(res.contacts);

                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contact-search')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-contact-search'])
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
                data: props.selectedLbCarrierInfoFactoringCompany.id || 0
            },
            {
                field: 'Invoice Date',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_date || '').toLowerCase()
            },
            {
                field: 'Pick Up Location',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.pickup_location || '').toLowerCase()
            },
            {
                field: 'Delivery Location',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.delivery_location || '').toLowerCase()
            },
            {
                field: 'Invoice Number',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_number || '').toLowerCase()
            },
            {
                field: 'Order Number',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.order_number || '').toLowerCase()
            },
            {
                field: 'Trip Number',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.trip_number || '').toLowerCase()
            },
            {
                field: 'Invoice Amount',
                data: props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_amount || ''
            },
            {
                field: 'Customer Code',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.customer_code || '').toLowerCase()
            },
            {
                field: 'Customer Name',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.customer_name || '').toLowerCase()
            }
            ,
            {
                field: 'Carrier Code',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.carrier_code || '').toLowerCase()
            },
            {
                field: 'Carrier Name',
                data: (props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.carrier_name || '').toLowerCase()
            }
        ]

        await props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, filters: filters })

        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-invoice-search')){
            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-invoice-search'])
        }

        // $.post(props.serverUrl + '/customerContactsSearch', { search: filters }).then(async res => {
        //     if (res.result === 'OK') {
        //         await props.setContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, filters: filters });
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
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'lb-carrier-info-factoring-company')}><span className="fas fa-times"></span></div>
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
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, code: e.target.value })}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.code_number || 0) === 0 ? (props.selectedLbCarrierInfoFactoringCompany.code || '') : props.selectedLbCarrierInfoFactoringCompany.code + props.selectedLbCarrierInfoFactoringCompany.code_number} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, name: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.name || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, address1: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.address1 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, address2: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.address2 || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, city: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.city || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, state: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.state || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, zip: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.zip || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contact_name: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.contact_name || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, contact_phone: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.contact_phone || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, ext: e.target.value })} value={props.selectedLbCarrierInfoFactoringCompany.ext || ''} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                    onKeyDown={validateFactoringCompanyToSave}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, email: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompany.email || ''} />
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
                                    if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    let mailing_address = props.selectedLbCarrierInfoFactoringCompany;
                                    mailing_address.factoring_company_id = props.selectedLbCarrierInfoFactoringCompany.id;
                                    props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });

                                    $.post(props.serverUrl + '/saveFactoringCompanyMailingAddress', mailing_address).then(res => {
                                        if (res.result === 'OK') {

                                            let selectedLbCarrierInfoFactoringCompany = { ...props.selectedLbCarrierInfoFactoringCompany };
                                            selectedLbCarrierInfoFactoringCompany.mailing_address = res.mailing_address;

                                            props.setSelectedLbCarrierInfoFactoringCompany(selectedLbCarrierInfoFactoringCompany);

                                            if ((props.selectedLbCarrierInfoCarrier.factoring_company?.id || 0) === selectedLbCarrierInfoFactoringCompany.id) {
                                                props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: selectedLbCarrierInfoFactoringCompany });
                                            }
                                        }
                                    });
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Remit to address is the same</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                        return;
                                    }

                                    let selectedLbCarrierInfoFactoringCompany = { ...props.selectedLbCarrierInfoFactoringCompany };
                                    selectedLbCarrierInfoFactoringCompany.mailing_address = {};

                                    props.setSelectedLbCarrierInfoFactoringCompany(selectedLbCarrierInfoFactoringCompany);

                                    if ((props.selectedLbCarrierInfoCarrier.factoring_company?.id || 0) === selectedLbCarrierInfoFactoringCompany.id) {
                                        props.setSelectedLbCarrierInfoCarrier({ ...props.selectedLbCarrierInfoCarrier, factoring_company: selectedLbCarrierInfoFactoringCompany });
                                    }

                                    $.post(props.serverUrl + '/deleteFactoringCompanyMailingAddress', { factoring_company_id: props.selectedLbCarrierInfoFactoringCompany.id }).then(res => {
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
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.code = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.code || '') + ((props.selectedLbCarrierInfoFactoringCompany.mailing_address?.code_number || 0) === 0 ? '' : props.selectedLbCarrierInfoFactoringCompany.mailing_address.code_number)} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.name = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.name || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 1"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.address1 = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.address1 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Address 2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.address2 = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.address2 || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="City"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.city = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.city || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-state">
                                <input type="text" placeholder="State" maxLength="2"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.state = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.state || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-zip-code">
                                <input type="text" placeholder="Postal Code"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.zip = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.zip || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.contact_name = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.contact_name || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone">
                                <MaskedInput
                                    mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    type="text" placeholder="Contact Phone"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.contact_phone = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.contact_phone || '')} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.ext = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.ext || '')} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="E-Mail"
                                    onKeyDown={validateMailingAddressToSave}
                                    onChange={e => {
                                        let mailing_address = props.selectedLbCarrierInfoFactoringCompany.mailing_address || {};
                                        mailing_address.email = e.target.value;
                                        props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, mailing_address: mailing_address });
                                    }}
                                    value={(props.selectedLbCarrierInfoFactoringCompany.mailing_address?.email || '')} />
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
                                    if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    if (props.selectedLbCarrierInfoFactoringCompanyContact.id === undefined) {
                                        window.alert('You must select a contact');
                                        return;
                                    }

                                    await props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
                                    await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompany, selectedContact: props.selectedLbCarrierInfoFactoringCompanyContact });

                                    if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contacts')){
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-contacts'])
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">More</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompany, selectedContact: { id: 0, factoring_company_id: props.selectedLbCarrierInfoFactoringCompany.id } });
                                    props.setLbCarrierInfoFactoringCompanyIsEditingContact(true);

                                    if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contacts')){
                                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-contacts'])
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add contact</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => props.setSelectedLbCarrierInfoFactoringCompanyContact({})}>
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
                                        props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, first_name: e.target.value })
                                    }}
                                    value={props.selectedLbCarrierInfoFactoringCompanyContact.first_name || ''} />

                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Last Name"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, last_name: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompanyContact.last_name || ''} />
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
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, phone_work: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompanyContact.phone_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext"
                                        onKeyDown={validateContactForSaving}
                                        onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, phone_ext: e.target.value })}
                                        value={props.selectedLbCarrierInfoFactoringCompanyContact.phone_ext || ''} />
                                </div>
                                <div className="input-toggle-container">
                                    <input type="checkbox" id="cbox-carrier-info-factoring-company-contacts-primary-btn"
                                        onChange={selectedContactIsPrimaryChange}
                                        checked={(props.selectedLbCarrierInfoFactoringCompanyContact.is_primary || 0) === 1} />
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
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, email_work: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompanyContact.email_work || ''} />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Notes"
                                    onKeyDown={validateContactForSaving}
                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContact({ ...props.selectedLbCarrierInfoFactoringCompanyContact, notes: e.target.value })}
                                    value={props.selectedLbCarrierInfoFactoringCompanyContact.notes || ''} />
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
                                    props.selectedLbCarrierInfoFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Search</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }
                                {
                                    !props.selectedLbCarrierInfoFactoringCompanyIsShowingContactList &&
                                    <div className="mochi-button" onClick={() => props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(true)}>
                                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                        <div className="mochi-button-base">Cancel</div>
                                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                    </div>
                                }

                                {
                                    !props.selectedLbCarrierInfoFactoringCompanyIsShowingContactList &&
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
                            <div className="form-slider-wrapper" style={{ left: props.selectedLbCarrierInfoFactoringCompanyIsShowingContactList ? 0 : '-100%' }}>
                                <div className="contact-list-box">

                                    {
                                        (props.selectedLbCarrierInfoFactoringCompany.contacts || []).length > 0 &&
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
                                            (props.selectedLbCarrierInfoFactoringCompany.contacts || []).map((contact, index) => {
                                                return (
                                                    <div className="contact-list-item" key={index} onDoubleClick={async () => {

                                                        await props.setLbCarrierInfoFactoringCompanyIsEditingContact(false);
                                                        await props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompany, selectedContact: contact });

                                                        if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-contacts')){
                                                            props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-contacts'])
                                                        }
                                                    }} onClick={() => props.setSelectedLbCarrierInfoFactoringCompanyContact(contact)}>
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
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, first_name: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.first_name || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Last Name"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, last_name: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.last_name || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 1"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, address1: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.address1 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="Address 2"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, address2: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.address2 || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="City"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, city: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.city || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container input-state">
                                            <input type="text" placeholder="State" maxLength="2"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, state: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.state || ''} />
                                        </div>
                                        <div className="form-h-sep"></div>
                                        <div className="input-box-container grow">
                                            <MaskedInput
                                                mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                guide={true}
                                                type="text" placeholder="Phone (Work/Mobile/Fax)"
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, phone: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.phone || ''} />
                                        </div>
                                    </div>
                                    <div className="form-v-sep"></div>
                                    <div className="form-row">
                                        <div className="input-box-container grow">
                                            <input type="text" placeholder="E-Mail" style={{ textTransform: 'lowercase' }}
                                                onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList(false) }}
                                                onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyContactSearch({ ...props.selectedLbCarrierInfoFactoringCompanyContactSearch, email: e.target.value })}
                                                value={props.selectedLbCarrierInfoFactoringCompanyContactSearch.email || ''} />
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
                            if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) > 0) {
                                props.setSelectedLbCarrierInfoFactoringCompanyDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY')
                                });                               

                                if (!props.dispatchOpenedPanels.includes('lb-carrier-info-factoring-company-documents')){
                                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'lb-carrier-info-factoring-company-documents'])
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
                            if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                window.alert('There is nothing to print!');
                                return;
                            }

                            let factoringCompany = { ...props.selectedLbCarrierInfoFactoringCompany };

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
                                    if ((props.selectedLbCarrierInfoFactoringCompany.id || 0) === 0) {
                                        window.alert('You must select a factoring company first!');
                                        return;
                                    }

                                    props.setSelectedLbCarrierInfoFactoringCompanyNote({ id: 0, factoring_company_id: props.selectedLbCarrierInfoFactoringCompany.id })
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Add note</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button' onClick={() => {
                                    if (props.selectedLbCarrierInfoFactoringCompany.id === undefined || (props.selectedLbCarrierInfoFactoringCompany.notes || []).length === 0) {
                                        window.alert('There is nothing to print!');
                                        return;
                                    }

                                    let html = ``;

                                    props.selectedLbCarrierInfoFactoringCompany.notes.map((note, index) => {
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
                                    (props.selectedLbCarrierInfoFactoringCompany.notes || []).map((note, index) => {
                                        return (
                                            <div className="factoring-company-list-item" key={index} onClick={() => props.setSelectedLbCarrierInfoFactoringCompanyNote(note)}>
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
                                    props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Search</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList &&
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
                                    !props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList &&
                                    <div className='mochi-button' onClick={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(true) }}>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Cancel</div>
                                        <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                    </div>
                                }
                                {
                                    !props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList &&
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
                            <div className="form-slider-wrapper" style={{ left: props.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList ? 0 : '-100%' }}>
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
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, invoice_date: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_date || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Pick Up Location (City / State)"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, pickup_location: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.pickup_location || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Delivery Location (City / State)"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, delivery_location: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.delivery_location || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Invoice Number"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, invoice_number: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Order Number"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, order_number: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.order_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Trip Number"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, trip_number: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.trip_number || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Amount"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, invoice_amount: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.invoice_amount || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Customer Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, customer_code: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.customer_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Customer Name"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, customer_name: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.customer_name || ''} />
                                            </div>
                                        </div>
                                        <div className="form-v-sep"></div>
                                        <div className="form-row">
                                            <div className="input-box-container input-code">
                                                <input type="text" placeholder="Carrier Code" maxLength="8"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, carrier_code: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.carrier_code || ''} />
                                            </div>
                                            <div className="form-h-sep"></div>
                                            <div className="input-box-container grow">
                                                <input type="text" placeholder="Carrier Name"
                                                    onFocus={() => { props.setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList(false) }}
                                                    onChange={e => props.setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch({ ...props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch, carrier_name: e.target.value })}
                                                    value={props.selectedLbCarrierInfoFactoringCompanyInvoiceSearch.carrier_name || ''} />
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
                props.selectedLbCarrierInfoFactoringCompanyNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <FactoringCompanyModal
                        selectedData={props.selectedLbCarrierInfoFactoringCompanyNote}
                        setSelectedData={props.setSelectedLbCarrierInfoFactoringCompanyNote}
                        selectedParent={props.selectedLbCarrierInfoFactoringCompany}
                        setSelectedParent={(notes) => {
                            props.setSelectedLbCarrierInfoFactoringCompany({ ...props.selectedLbCarrierInfoFactoringCompany, notes: notes });
                        }}
                        savingDataUrl='/saveFactoringCompanyNotes'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isPrintable={false}
                        isAdding={props.selectedLbCarrierInfoFactoringCompanyNote.id === 0}
                    />
                </animated.div>

            }
        </div>

    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        dispatchCarrierInfoFactoringCompanySearch: state.carrierReducers.dispatchCarrierInfoFactoringCompanySearch,
        selectedLbCarrierInfoFactoringCompany: state.carrierReducers.selectedLbCarrierInfoFactoringCompany,
        selectedLbCarrierInfoFactoringCompanyContact: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContact,
        selectedLbCarrierInfoFactoringCompanyIsShowingContactList: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyIsShowingContactList,
        selectedLbCarrierInfoFactoringCompanyNote: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyNote,
        selectedLbCarrierInfoFactoringCompanyContactSearch: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyContactSearch,
        selectedLbCarrierInfoFactoringCompanyInvoices: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyInvoices,
        selectedLbCarrierInfoFactoringCompanyInvoice: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyInvoice,
        selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
        selectedLbCarrierInfoFactoringCompanyInvoiceSearch: state.carrierReducers.selectedLbCarrierInfoFactoringCompanyInvoiceSearch,
        selectedLbCarrierInfoCarrier: state.carrierReducers.selectedLbCarrierInfoCarrier,
    }
}

export default connect(mapStateToProps, {    
    setSelectedLbCarrierInfoFactoringCompanyContact,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompanyContactSearch,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingContactList,
    setSelectedLbCarrierInfoFactoringCompany,
    setSelectedLbCarrierInfoFactoringCompanyNote,
    setSelectedLbCarrierInfoFactoringCompanyInvoiceSearch,
    setSelectedLbCarrierInfoFactoringCompanyInvoices,
    setLbCarrierInfoFactoringCompanyIsEditingContact,
    setLbCarrierInfoFactoringCompanyContacts,
    setSelectedLbCarrierInfoFactoringCompanyInvoice,
    setSelectedLbCarrierInfoFactoringCompanyIsShowingInvoiceList,
    setLbCarrierInfoFactoringCompanySearch,
    setLbCarrierInfoFactoringCompanies,
    setSelectedLbCarrierInfoFactoringCompanyDocument,
    setSelectedLbCarrierInfoCarrier,
    setDispatchOpenedPanels
})(CarrierInfoFactoringCompany)