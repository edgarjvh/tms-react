import React, { useState, useEffect } from 'react';
import './Company.css';
import classnames from 'classnames';
import { connect } from 'react-redux';

import {
    setMainScreen,
    setScale
} from '../../actions/systemActions';

import {
    setPages,
    setSelectedPageIndex,
    setMainCompanyScreenFocused,
    setDispatchScreenFocused,
    setCustomerScreenFocused,
    setCarrierScreenFocused,
    setLoadBoardScreenFocused,
    setInvoiceScreenFocused,
} from '../../actions/companyActions';

import {
    setDispatchOpenedPanels,
    setSelectedOrder,
    setLbSelectedOrder,
    setOrderNumber,
    setTripNumber,
    setDivision,
    setLoadType,
    setTemplate,

    setIsShowingShipperSecondPage,
    setShipperBolNumber,
    setShipperPoNumber,
    setShipperRefNumber,

    setIsShowingConsigneeSecondPage,

    setShowingChangeCarrier,

    setDispatchEvent,
    setDispatchEventLocation,
    setDispatchEventNotes,
    setDispatchEventDate,
    setDispatchEventTime,

    setSelectedNoteForCarrier,
    setSelectedInternalNote,

    setSelectedOrderDocument,

    setNewCarrier,
} from '../../actions/dispatchActions';

import {
    setCustomers,
    setSelectedCustomer,
    setSelectedContact,
    setSelectedNote,
    setSelectedDirection,
    setContactSearch,
    setAutomaticEmailsTo,
    setAutomaticEmailsCc,
    setAutomaticEmailsBcc,
    setShowingContactList,
    setCustomerSearch,
    setCustomerContacts,
    setContactSearchCustomer,
    setIsEditingContact,
    setSelectedDocument,
    setDocumentTags as setSelectedDocumentTags,
    setSelectedDocumentNote,
    setCustomerOpenedPanels,

    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setBillToCompanySearch,
    setSelectedBillToCompanyContact,

    setShipperCompanies,
    setSelectedShipperCompanyInfo,
    setShipperCompanySearch,
    setSelectedShipperCompanyContact,

    setConsigneeCompanies,
    setSelectedConsigneeCompanyInfo,
    setConsigneeCompanySearch,
    setSelectedConsigneeCompanyContact,

    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbBillToCompanySearch,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbShipperCompanySearch,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanySearch,
    setInvoiceSelectedBillToCompanyInfo,
    setInvoiceSelectedBillToCompanyContact,
    setInvoiceSelectedBillToCompanyDocument,
    setInvoiceBillToCompanyDocumentTags as setInvoiceSelectedBillToCompanyDocumentTags,
    setInvoiceSelectedBillToCompanyDocumentNote,
} from '../../actions/customersActions';

import {
    setCarriers,
    setSelectedCarrier,
    setSelectedCarrierContact,
    setSelectedCarrierNote,
    setContactSearch as setCarrierContactSearch,
    setShowingCarrierContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingContact as setIsEditingCarrierContact,
    setSelectedCarrierDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyContact,
    setCarrierOpenedPanels,
    setEquipmentInformation,

    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarriers,

    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoDriver,

    setSelectedInvoiceCarrierInfoCarrier,
    setSelectedInvoiceCarrierInfoContact,
    setSelectedInvoiceCarrierInfoDriver,
    setSelectedInvoiceCarrierInfoInsurance,
    setSelectedInvoiceCarrierInfoDocument,
    setInvoiceCarrierInfoDocumentTags as setSelectedInvoiceCarrierInfoDocumentTags,
    setSelectedInvoiceCarrierInfoDocumentNote,

    setDispatchCarrierInfoCarriersChanging,
    setDispatchCarrierInfoCarrierSearchChanging,

} from '../../actions/carriersActions';

import {
    setLoadBoardOpenedPanels,
} from '../../actions/loadBoardActions';

import {
    setInvoiceOpenedPanels,
    setInvoiceSelectedOrder,
    setInvoiceOrderNumber,
    setInvoiceTripNumber,
    setInvoiceInternalNotes,
    setInvoiceSelectedInternalNote,
} from '../../actions/invoiceActions';


import axios from 'axios';

import DispatchPage from './dispatch/Dispatch.jsx';
import CustomersPage from './customers/Customers.jsx';
import CarriersPage from './carriers/Carriers.jsx';
import LoadBoardPage from './load-board/LoadBoard.jsx';
import InvoicePage from './invoice/Invoice.jsx';

function Company(props) {
    const containerCls = classnames({
        'main-company-container': true,
        'is-showing': props.mainScreen === 'company'
    })

    const userClick = () => {
        props.setMainScreen('admin');
    }

    const dispatchBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('dispatch') === -1) {
            await props.setPages([...curPages, 'dispatch']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('dispatch'));
        }

        props.setDispatchScreenFocused(true);
    }

    const customersBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('customer') === -1) {
            await props.setPages([...curPages, 'customer']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('customer'));
        }

        props.setCustomerScreenFocused(true);
    }

    const carriersBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('carrier') === -1) {
            await props.setPages([...curPages, 'carrier']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('carrier'));
        }

        props.setCarrierScreenFocused(true);
    }

    const loadBoardBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('load board') === -1) {
            await props.setPages([...curPages, 'load board']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('load board'));
        }

        props.setLoadBoardScreenFocused(true);
    }

    const invoiceBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('invoice') === -1) {
            await props.setPages([...curPages, 'invoice']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('invoice'));
        }

        props.setInvoiceScreenFocused(true);
    }

    const switchAppBtnClick = () => {
        props.setScale(props.scale === 1 ? 0.7 : 1);
    }

    return (
        <div className={containerCls}>
            <div className="main-content">
                <div className="menu-bar">
                    <div className="section">
                        <div className="menu-btn" id="switch-company-screen-btn" onClick={userClick}>Admin</div>
                    </div>
                    <div className="section">
                        <div className="mochi-input-decorator">
                            <input type="search" placeholder="just type" id="txt-main-search" />
                        </div>
                    </div>
                    <div className="section">
                        <div className="menu-btn" id="home-btn" title="Home" onClick={() => { props.setSelectedPageIndex(-1); props.setMainCompanyScreenFocused(true); }}><span className="fas fa-home"></span></div>
                        <div className="menu-btn" id="dispatch-btn" title="Dispatch" onClick={dispatchBtnClick}><span className="fas fa-truck-loading"></span></div>
                        <div className="menu-btn" id="customers-btn" title="Customers" onClick={customersBtnClick}><span className="fas fa-users"></span></div>
                        <div className="menu-btn" id="carriers-btn" title="Carriers" onClick={carriersBtnClick}><span className="fas fa-people-carry"></span></div>
                        <div className="menu-btn" id="load-board-btn" title="Load Board" onClick={loadBoardBtnClick}><span className="fas fa-chart-area"></span></div>
                        <div className="menu-btn" id="invoice-btn" title="Invoice" onClick={invoiceBtnClick}><span className="fas fa-file-invoice"></span></div>
                        <div className="menu-btn" id="switch-app-btn" title="Switch App" onClick={switchAppBtnClick}><span className="fas fa-exchange-alt"></span></div>
                    </div>
                </div>
                <div className="screen-content">
                    <div className="pages-container" style={{
                        position: 'absolute',
                        display: 'flex',
                        width: `${props.pages.length * 100}%`,
                        overflowX: 'auto',
                        transform: `translateX(${((100 / props.pages.length) * -1) * (props.selectedPageIndex + 1)}%)`
                    }}>
                        <div style={{
                            width: `${100 / props.pages.length}%`,
                            height: '100%',
                            transform: `scale(${props.scale})`,
                            transition: 'all ease 0.7s',
                            boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                            borderRadius: props.scale === 1 ? 0 : '20px'
                        }}>
                            <DispatchPage
                                pageName={'Dispatch Page'}
                                panelName={'dispatch-page'}
                                tabTimes={1000}
                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setDispatchOpenedPanels}
                                openedPanels={props.dispatchOpenedPanels}
                                screenFocused={props.dispatchScreenFocused}

                                setNewCarrier={props.setNewCarrier}
                                setDispatchCarrierInfoCarriersChanging={props.setDispatchCarrierInfoCarriersChanging}
                                setDispatchCarrierInfoCarrierSearchChanging={props.setDispatchCarrierInfoCarrierSearchChanging}
                                newCarrier={props.newCarrier
                                }
                                setSelectedOrder={props.setSelectedOrder}
                                setLbSelectedOrder={props.setLbSelectedOrder}
                                setOrderNumber={props.setOrderNumber}
                                setTripNumber={props.setTripNumber}
                                setDivision={props.setDivision}
                                setLoadType={props.setLoadType}
                                setTemplate={props.setTemplate}

                                setBillToCompanies={props.setBillToCompanies}
                                setSelectedBillToCompanyInfo={props.setSelectedBillToCompanyInfo}
                                setBillToCompanySearch={props.setBillToCompanySearch}
                                setSelectedBillToCompanyContact={props.setSelectedBillToCompanyContact}

                                setShipperCompanies={props.setShipperCompanies}
                                setSelectedShipperCompanyInfo={props.setSelectedShipperCompanyInfo}
                                setShipperCompanySearch={props.setShipperCompanySearch}
                                setSelectedShipperCompanyContact={props.setSelectedShipperCompanyContact}
                                setIsShowingShipperSecondPage={props.setIsShowingShipperSecondPage}
                                setShipperBolNumber={props.setShipperBolNumber}
                                setShipperPoNumber={props.setShipperPoNumber}
                                setShipperRefNumber={props.setShipperRefNumber}

                                setConsigneeCompanies={props.setConsigneeCompanies}
                                setSelectedConsigneeCompanyInfo={props.setSelectedConsigneeCompanyInfo}
                                setConsigneeCompanySearch={props.setConsigneeCompanySearch}
                                setSelectedConsigneeCompanyContact={props.setSelectedConsigneeCompanyContact}
                                setIsShowingConsigneeSecondPage={props.setIsShowingConsigneeSecondPage}

                                setSelectedDispatchCarrierInfoCarrier={props.setSelectedDispatchCarrierInfoCarrier}
                                setSelectedDispatchCarrierInfoContact={props.setSelectedDispatchCarrierInfoContact}
                                setSelectedDispatchCarrierInfoDriver={props.setSelectedDispatchCarrierInfoDriver}
                                setSelectedDispatchCarrierInfoInsurance={props.setSelectedDispatchCarrierInfoInsurance}
                                setDispatchCarrierInfoCarrierSearch={props.setDispatchCarrierInfoCarrierSearch}
                                setDispatchCarrierInfoCarriers={props.setDispatchCarrierInfoCarriers}
                                setShowingChangeCarrier={props.setShowingChangeCarrier}

                                setDispatchEvent={props.setDispatchEvent}
                                setDispatchEventLocation={props.setDispatchEventLocation}
                                setDispatchEventNotes={props.setDispatchEventNotes}
                                setDispatchEventDate={props.setDispatchEventDate}
                                setDispatchEventTime={props.setDispatchEventTime}

                                setSelectedNoteForCarrier={props.setSelectedNoteForCarrier}
                                setSelectedInternalNote={props.setSelectedInternalNote}

                                selected_order={props.selected_order}
                                order_number={props.order_number}
                                trip_number={props.trip_number}
                                division={props.division}
                                load_type={props.load_type}
                                template={props.template}

                                selectedBillToCompanyInfo={props.selectedBillToCompanyInfo}
                                selectedBillToCompanyContact={props.selectedBillToCompanyContact}
                                billToCompanySearch={props.billToCompanySearch}

                                selectedShipperCompanyInfo={props.selectedShipperCompanyInfo}
                                selectedShipperCompanyContact={props.selectedShipperCompanyContact}
                                shipperCompanySearch={props.shipperCompanySearch}
                                shipperBolNumber={props.shipperBolNumber}
                                shipperPoNumber={props.shipperPoNumber}
                                shipperRefNumber={props.shipperRefNumber}

                                selectedConsigneeCompanyInfo={props.selectedConsigneeCompanyInfo}
                                selectedConsigneeCompanyContact={props.selectedConsigneeCompanyContact}
                                consigneeCompanySearch={props.consigneeCompanySearch}

                                dispatchEvent={props.dispatchEvent}
                                dispatchEventLocation={props.dispatchEventLocation}
                                dispatchEventNotes={props.dispatchEventNotes}
                                dispatchEventDate={props.dispatchEventDate}
                                dispatchEventTime={props.dispatchEventTime}
                                dispatchEvents={props.dispatchEvents}

                                selectedNoteForCarrier={props.selectedNoteForCarrier}
                                selectedInternalNote={props.selectedInternalNote}
                                isShowingShipperSecondPage={props.isShowingShipperSecondPage}
                                isShowingConsigneeSecondPage={props.isShowingConsigneeSecondPage}

                                selectedDispatchCarrierInfoCarrier={props.selectedDispatchCarrierInfoCarrier}
                                selectedDispatchCarrierInfoContact={props.selectedDispatchCarrierInfoContact}
                                selectedDispatchCarrierInfoDriver={props.selectedDispatchCarrierInfoDriver}
                                selectedDispatchCarrierInfoInsurance={props.selectedDispatchCarrierInfoInsurance}

                                setSelectedOrderDocument={props.setSelectedOrderDocument}

                                mileageLoaderVisible={props.mileageLoaderVisible}
                                showingChangeCarrier={props.showingChangeCarrier}

                                billToCompanyInfoPanelName='bill-to-company-info'
                                billToCompanySearchPanelName='bill-to-company-search'
                                shipperCompanyInfoPanelName='shipper-company-info'
                                shipperCompanySearchPanelName='shipper-company-search'
                                consigneeCompanyInfoPanelName='consignee-company-info'
                                consigneeCompanySearchPanelName='consignee-company-search'
                                carrierInfoPanelName='carrier-info'
                                carrierInfoSearchPanelName='carrier-info-search'
                                routingPanelName='routing'
                                ratingScreenPanelName='rating-screen'
                                adjustRatePanelName='adjust-rate'
                                rateConfPanelName='rate-conf'
                                orderPanelName='order'
                                bolPanelName='bol'
                                orderDocumentsPanelName='order-documents'
                                loadBoardPanelName='load-board'
                            />
                        </div>

                        <div style={{
                            width: `${100 / props.pages.length}%`,
                            height: '100%',
                            transform: `scale(${props.scale})`,
                            transition: 'all ease 0.7s',
                            boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                            borderRadius: props.scale === 1 ? 0 : '20px'
                        }}>
                            <CustomersPage
                                pageName={'Customer Page'}
                                panelName={'customer-page'}
                                tabTimes={2000}
                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setCustomerOpenedPanels}
                                openedPanels={props.customerOpenedPanels}
                                screenFocused={props.customerScreenFocused}

                                setCustomers={props.setCustomers}
                                setSelectedCustomer={props.setSelectedCustomer}
                                setCustomerSearch={props.setCustomerSearch}
                                setCustomerContacts={props.setCustomerContacts}
                                setSelectedContact={props.setSelectedContact}
                                setContactSearch={props.setContactSearch}
                                setIsEditingContact={props.setIsEditingContact}
                                setShowingContactList={props.setShowingContactList}
                                setContactSearchCustomer={props.setContactSearchCustomer}
                                setAutomaticEmailsTo={props.setAutomaticEmailsTo}
                                setAutomaticEmailsCc={props.setAutomaticEmailsCc}
                                setAutomaticEmailsBcc={props.setAutomaticEmailsBcc}
                                setSelectedNote={props.setSelectedNote}
                                setSelectedDirection={props.setSelectedDirection}
                                setSelectedDocument={props.setSelectedDocument}

                                customers={props.customers}
                                selectedCustomer={props.selectedCustomer}
                                customerSearch={props.customerSearch}
                                contacts={props.contacts}
                                selectedContact={props.selectedContact}
                                contactSearch={props.contactSearch}
                                showingContactList={props.showingContactList}
                                automaticEmailsTo={props.automaticEmailsTo}
                                automaticEmailsCc={props.automaticEmailsCc}
                                automaticEmailsBcc={props.automaticEmailsBcc}
                                selectedNote={props.selectedNote}
                                selectedDirection={props.selectedDirection}

                                selectedDocument={props.selectedDocument}
                                selectedDocumentTags={props.selectedDocumentTags}
                                selectedDocumentNote={props.selectedDocumentNote}
                                isEditingContact={props.isEditingContact}
                                contactSearchCustomer={props.contactSearchCustomer}

                                customerSearchPanelName='customer-search'
                                customerContactsPanelName='customer-contacts'
                                customerContactSearchPanelName='customer-contact-search'
                                customerRevenueInformationPanelName='revenue-information'
                                customerOrderHistoryPanelName='order-history'
                                customerLaneHistoryPanelName='lane-history'
                                customerDocumentsPanelName='documents'
                            />
                        </div>

                        <div style={{
                            width: `${100 / props.pages.length}%`,
                            height: '100%',
                            transform: `scale(${props.scale})`,
                            transition: 'all ease 0.7s',
                            boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                            borderRadius: props.scale === 1 ? 0 : '20px'
                        }}>
                            <CarriersPage
                                pageName={'Carriers Page'}
                                panelName={'carrier-page'}
                                tabTimes={3000}
                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setCarrierOpenedPanels}
                                openedPanels={props.carrierOpenedPanels}
                                screenFocused={props.carrierScreenFocused}

                                setCarriers={props.setCarriers}
                                setSelectedCarrier={props.setSelectedCarrier}
                                setSelectedCarrierContact={props.setSelectedCarrierContact}
                                setSelectedCarrierNote={props.setSelectedCarrierNote}
                                setContactSearch={props.setCarrierContactSearch}
                                setShowingCarrierContactList={props.setShowingCarrierContactList}
                                setCarrierSearch={props.setCarrierSearch}
                                setCarrierContacts={props.setCarrierContacts}
                                setContactSearchCarrier={props.setContactSearchCarrier}
                                setIsEditingContact={props.setIsEditingCarrierContact}
                                setSelectedCarrierDocument={props.setSelectedCarrierDocument}
                                setDrivers={props.setDrivers}
                                setSelectedDriver={props.setSelectedDriver}
                                setEquipments={props.setEquipments}
                                setInsuranceTypes={props.setInsuranceTypes}
                                setSelectedEquipment={props.setSelectedEquipment}
                                setSelectedInsuranceType={props.setSelectedInsuranceType}
                                setFactoringCompanySearch={props.setFactoringCompanySearch}
                                setFactoringCompanies={props.setFactoringCompanies}
                                setCarrierInsurances={props.setCarrierInsurances}
                                setSelectedInsurance={props.setSelectedInsurance}
                                setSelectedFactoringCompany={props.setSelectedFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setSelectedFactoringCompanyContact}
                                setEquipmentInformation={props.setEquipmentInformation}

                                carriers={props.carriers}
                                contacts={props.carrierContacts}
                                selectedCarrier={props.selectedCarrier}
                                selectedContact={props.selectedCarrierContact}
                                selectedNote={props.selectedCarrierNote}
                                selectedDirection={props.selectedCarrierDirection}
                                contactSearch={props.carrierContactSearch}
                                showingContactList={props.showingCarrierContactList}
                                carrierSearch={props.carrierSearch}
                                selectedDocument={props.selectedCarrierDocument}
                                drivers={props.drivers}
                                selectedDriver={props.selectedDriver}
                                equipments={props.equipments}
                                insuranceTypes={props.insuranceTypes}
                                selectedEquipment={props.selectedEquipment}
                                selectedInsuranceType={props.selectedInsuranceType}
                                factoringCompanySearch={props.factoringCompanySearch}
                                factoringCompanies={props.factoringCompanies}
                                carrierInsurances={props.carrierInsurances}
                                selectedInsurance={props.selectedInsurance}
                                selectedFactoringCompany={props.selectedFactoringCompany}
                                equipmentInformation={props.equipmentInformation}

                                carrierSearchPanelName='carrier-search'
                                carrierContactSearchPanelName='carrier-contact-search'
                                carrierContactsPanelName='carrier-contacts'
                                carrierDocumentsPanelName='documents'
                                carrierRevenueInformationPanelName='revenue-information'
                                carrierOrderHistoryPanelName='order-history'
                                carrierEquipmentPanelName='equipment-information'
                                carrierFactoringCompanySearchPanelName='carrier-factoring-company-search'
                                carrierFactoringCompanyPanelName='carrier-factoring-company'
                            />
                        </div>

                        <div style={{
                            width: `${100 / props.pages.length}%`,
                            height: '100%',
                            transform: `scale(${props.scale})`,
                            transition: 'all ease 0.7s',
                            boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                            borderRadius: props.scale === 1 ? 0 : '20px'
                        }}>
                            <LoadBoardPage
                                pageName={'Load Board Page'}
                                tabTimes={4000}

                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                openedPanels={props.loadBoardOpenedPanels}
                                screenFocused={props.loadBoardScreenFocused}

                                setOpenedPanels={props.setLoadBoardOpenedPanels}
                                setLbSelectedOrder={props.setLbSelectedOrder}
                                setLbSelectedBillToCompanyInfo={props.setLbSelectedBillToCompanyInfo}
                                setLbSelectedBillToCompanyContact={props.setLbSelectedBillToCompanyContact}
                                setLbBillToCompanySearch={props.setLbBillToCompanySearch}
                                setLbSelectedShipperCompanyInfo={props.setLbSelectedShipperCompanyInfo}
                                setLbSelectedShipperCompanyContact={props.setLbSelectedShipperCompanyContact}
                                setLbShipperCompanySearch={props.setLbShipperCompanySearch}
                                setLbSelectedConsigneeCompanyInfo={props.setLbSelectedConsigneeCompanyInfo}
                                setLbSelectedConsigneeCompanyContact={props.setLbSelectedConsigneeCompanyContact}
                                setLbConsigneeCompanySearch={props.setLbConsigneeCompanySearch}
                                setSelectedLbCarrierInfoCarrier={props.setSelectedLbCarrierInfoCarrier}
                                setSelectedLbCarrierInfoContact={props.setSelectedLbCarrierInfoContact}
                                setSelectedLbCarrierInfoDriver={props.setSelectedLbCarrierInfoDriver}

                                selected_order={props.lb_selected_order}
                                selectedLbBillToCompanyInfo={props.selectedLbBillToCompanyInfo}
                                selectedLbBillToCompanyContact={props.selectedLbBillToCompanyContact}
                                lbBillToCompanySearch={props.lbBillToCompanySearch}
                                selectedLbShipperCompanyInfo={props.selectedLbShipperCompanyInfo}
                                selectedLbShipperCompanyContact={props.selectedLbShipperCompanyContact}
                                lbShipperCompanySearch={props.lbShipperCompanySearch}
                                selectedLbConsigneeCompanyInfo={props.selectedLbConsigneeCompanyInfo}
                                selectedLbConsigneeCompanyContact={props.selectedLbConsigneeCompanyContact}
                                lbConsigneeCompanySearch={props.lbConsigneeCompanySearch}
                                selectedLbCarrierInfoCarrier={props.selectedLbCarrierInfoCarrier}
                                selectedLbCarrierInfoContact={props.selectedLbCarrierInfoContact}
                                selectedLbCarrierInfoDriver={props.selectedLbCarrierInfoDriver}

                                orderPanelName='lb-order'
                                billToCompanyInfoPanelName='lb-bill-to-company-info'
                                shipperCompanyInfoPanelName='lb-shipper-company-info'
                                consigneeCompanyInfoPanelName='lb-consignee-company-info'
                                carrierInfoPanelName='lb-carrier-info'
                                routingPanelName='lb-routing'
                            />
                        </div>

                        <div style={{
                            width: `${100 / props.pages.length}%`,
                            height: '100%',
                            transform: `scale(${props.scale})`,
                            transition: 'all ease 0.7s',
                            boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                            borderRadius: props.scale === 1 ? 0 : '20px'
                        }}>
                            <InvoicePage
                                pageName={'Invoice Page'}
                                tabTimes={5000}
                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setInvoiceOpenedPanels}
                                openedPanels={props.invoiceOpenedPanels}
                                screenFocused={props.invoiceScreenFocused}

                                setInvoiceSelectedOrder={props.setInvoiceSelectedOrder}
                                setInvoiceOrderNumber={props.setInvoiceOrderNumber}
                                setInvoiceTripNumber={props.setInvoiceTripNumber}
                                setInvoiceInternalNotes={props.setInvoiceInternalNotes}
                                setInvoiceSelectedInternalNote={props.setInvoiceSelectedInternalNote}
                                setInvoiceSelectedBillToCompanyInfo={props.setInvoiceSelectedBillToCompanyInfo}
                                setInvoiceSelectedBillToCompanyContact={props.setInvoiceSelectedBillToCompanyContact}
                                setInvoiceSelectedBillToCompanyDocument={props.setInvoiceSelectedBillToCompanyDocument}
                                setInvoiceSelectedBillToCompanyDocumentTags={props.setInvoiceSelectedBillToCompanyDocumentTags}
                                setInvoiceSelectedBillToCompanyDocumentNote={props.setInvoiceSelectedBillToCompanyDocumentNote}
                                setSelectedInvoiceCarrierInfoCarrier={props.setSelectedInvoiceCarrierInfoCarrier}
                                setSelectedInvoiceCarrierInfoContact={props.setSelectedInvoiceCarrierInfoContact}
                                setSelectedInvoiceCarrierInfoDriver={props.setSelectedInvoiceCarrierInfoDriver}
                                setSelectedInvoiceCarrierInfoInsurance={props.setSelectedInvoiceCarrierInfoInsurance}
                                setSelectedInvoiceCarrierInfoDocument={props.setSelectedInvoiceCarrierInfoDocument}
                                setSelectedInvoiceCarrierInfoDocumentTags={props.setSelectedInvoiceCarrierInfoDocumentTags}
                                setSelectedInvoiceCarrierInfoDocumentNote={props.setSelectedInvoiceCarrierInfoDocumentNote}
                                internalNotes={props.invoiceInternalNotes}
                                selectedInternalNote={props.selectedInvoiceInternalNote}
                                selected_order={props.invoice_selected_order}
                                order_number={props.invoice_order_number}
                                trip_number={props.invoice_trip_number}
                                selectedBillToCompanyInfo={props.selectedInvoiceBillToCompanyInfo}
                                selectedBillToCompanyContact={props.selectedInvoiceBillToCompanyContact}
                                selectedBillToCompanyDocument={props.selectedInvoiceBillToCompanyDocument}
                                billToCompanyDocumentTags={props.selectedInvoiceBillToCompanyDocumentTags}
                                selectedBillToCompanyDocumentNote={props.selectedInvoiceBillToCompanyDocumentNote}
                                selectedInvoiceCarrierInfoCarrier={props.selectedInvoiceCarrierInfoCarrier}
                                selectedInvoiceCarrierInfoContact={props.selectedInvoiceCarrierInfoContact}
                                selectedInvoiceCarrierInfoDriver={props.selectedInvoiceCarrierInfoDriver}
                                selectedInvoiceCarrierInfoInsurance={props.selectedInvoiceCarrierInfoInsurance}
                                selectedCarrier={props.selectedInvoiceCarrierInfoCarrier}
                                selectedDocument={props.selectedInvoiceCarrierInfoDocument}
                                documentTags={props.selectedInvoiceCarrierInfoDocumentTags}
                                selectedDocumentNote={props.selectedInvoiceCarrierInfoDocumentNote}

                                billToCompanyInfoPanelName='bill-to-company-info'
                                billToCompanyDocumentsPanelName='bill-to-company-documents'
                                carrierInfoPanelName='carrier-info'
                                carrierInfoDocumentsPanelName='carrier-info-documents'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        scale: state.systemReducers.scale,
        mainScreen: state.systemReducers.mainScreen,
        pages: state.companyReducers.pages,
        selectedPageIndex: state.companyReducers.selectedPageIndex,
        mainCompanyScreenFocused: state.companyReducers.mainCompanyScreenFocused,
        dispatchScreenFocused: state.companyReducers.dispatchScreenFocused,
        customerScreenFocused: state.companyReducers.customerScreenFocused,
        carrierScreenFocused: state.companyReducers.carrierScreenFocused,
        loadBoardScreenFocused: state.companyReducers.loadBoardScreenFocused,
        invoiceScreenFocused: state.companyReducers.invoiceScreenFocused,

        //DISPATCH
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        selected_order: state.dispatchReducers.selected_order,
        order_number: state.dispatchReducers.order_number,
        trip_number: state.dispatchReducers.trip_number,
        division: state.dispatchReducers.division,
        load_type: state.dispatchReducers.load_type,
        template: state.dispatchReducers.template,

        selectedBillToCompanyInfo: state.customerReducers.selectedBillToCompanyInfo,
        selectedBillToCompanyContact: state.customerReducers.selectedBillToCompanyContact,
        billToCompanySearch: state.customerReducers.billToCompanySearch,

        selectedShipperCompanyInfo: state.customerReducers.selectedShipperCompanyInfo,
        selectedShipperCompanyContact: state.customerReducers.selectedShipperCompanyContact,
        shipperCompanySearch: state.customerReducers.shipperCompanySearch,
        shipperBolNumber: state.dispatchReducers.shipperBolNumber,
        shipperPoNumber: state.dispatchReducers.shipperPoNumber,
        shipperRefNumber: state.dispatchReducers.shipperRefNumber,

        selectedConsigneeCompanyInfo: state.customerReducers.selectedConsigneeCompanyInfo,
        selectedConsigneeCompanyContact: state.customerReducers.selectedConsigneeCompanyContact,
        consigneeCompanySearch: state.customerReducers.consigneeCompanySearch,

        dispatchEvent: state.dispatchReducers.dispatchEvent,
        dispatchEventLocation: state.dispatchReducers.dispatchEventLocation,
        dispatchEventNotes: state.dispatchReducers.dispatchEventNotes,
        dispatchEventDate: state.dispatchReducers.dispatchEventDate,
        dispatchEventTime: state.dispatchReducers.dispatchEventTime,
        dispatchEvents: state.dispatchReducers.dispatchEvents,

        selectedNoteForCarrier: state.dispatchReducers.selectedNoteForCarrier,
        selectedInternalNote: state.dispatchReducers.selectedInternalNote,
        isShowingShipperSecondPage: state.dispatchReducers.isShowingShipperSecondPage,
        isShowingConsigneeSecondPage: state.dispatchReducers.isShowingConsigneeSecondPage,

        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier,
        selectedDispatchCarrierInfoContact: state.carrierReducers.selectedDispatchCarrierInfoContact,
        selectedDispatchCarrierInfoDriver: state.carrierReducers.selectedDispatchCarrierInfoDriver,
        selectedDispatchCarrierInfoInsurance: state.carrierReducers.selectedDispatchCarrierInfoInsurance,

        mileageLoaderVisible: state.dispatchReducers.mileageLoaderVisible,
        showingChangeCarrier: state.dispatchReducers.showingChangeCarrier,

        newCarrier: state.dispatchReducers.newCarrier,

        //CUSTOMER
        customerOpenedPanels: state.customerReducers.customerOpenedPanels,
        customerScreenFocused: state.companyReducers.customerScreenFocused,
        customers: state.customerReducers.customers,
        selectedCustomer: state.customerReducers.selectedCustomer,
        customerSearch: state.customerReducers.customerSearch,
        contacts: state.customerReducers.contacts,
        selectedContact: state.customerReducers.selectedContact,
        contactSearch: state.customerReducers.contactSearch,
        showingContactList: state.customerReducers.showingContactList,
        automaticEmailsTo: state.customerReducers.automaticEmailsTo,
        automaticEmailsCc: state.customerReducers.automaticEmailsCc,
        automaticEmailsBcc: state.customerReducers.automaticEmailsBcc,
        selectedNote: state.customerReducers.selectedNote,
        selectedDirection: state.customerReducers.selectedDirection,
        selectedDocument: state.customerReducers.selectedDocument,
        selectedDocumentTags: state.customerReducers.documentTags,
        selectedDocumentNote: state.customerReducers.selectedDocumentNote,
        isEditingContact: state.customerReducers.isEditingContact,
        contactSearchCustomer: state.customerReducers.contactSearchCustomer,

        //CARRIER
        carrierOpenedPanels: state.carrierReducers.carrierOpenedPanels,
        carrierScreenFocused: state.companyReducers.carrierScreenFocused,
        carriers: state.carrierReducers.carriers,
        carrierContacts: state.carrierReducers.contacts,
        selectedCarrier: state.carrierReducers.selectedCarrier,
        selectedCarrierContact: state.carrierReducers.selectedContact,
        selectedCarrierNote: state.carrierReducers.selectedNote,
        selectedCarrierDirection: state.carrierReducers.selectedDirection,
        carrierContactSearch: state.carrierReducers.contactSearch,
        showingCarrierContactList: state.carrierReducers.showingContactList,
        carrierSearch: state.carrierReducers.carrierSearch,
        selectedCarrierDocument: state.carrierReducers.selectedDocument,
        drivers: state.carrierReducers.drivers,
        selectedDriver: state.carrierReducers.selectedDriver,
        equipments: state.carrierReducers.equipments,
        insuranceTypes: state.carrierReducers.insuranceTypes,
        selectedEquipment: state.carrierReducers.selectedEquipment,
        selectedInsuranceType: state.carrierReducers.selectedInsuranceType,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        carrierInsurances: state.carrierReducers.carrierInsurances,
        selectedInsurance: state.carrierReducers.selectedInsurance,
        selectedFactoringCompany: state.carrierReducers.selectedFactoringCompany,
        selectedFactoringCompanyContact: state.carrierReducers.selectedFactoringCompanyContact,
        equipmentInformation: state.carrierReducers.equipmentInformation,

        //LOAD BOARD
        loadBoardOpenedPanels: state.loadBoardReducers.loadBoardOpenedPanels,
        lb_selected_order: state.dispatchReducers.lb_selected_order,
        selectedLbBillToCompanyInfo: state.customerReducers.selectedLbBillToCompanyInfo,
        selectedLbBillToCompanyContact: state.customerReducers.selectedLbBillToCompanyContact,
        lbBillToCompanySearch: state.customerReducers.lbBillToCompanySearch,
        selectedLbShipperCompanyInfo: state.customerReducers.selectedLbShipperCompanyInfo,
        selectedLbShipperCompanyContact: state.customerReducers.selectedLbShipperCompanyContact,
        lbShipperCompanySearch: state.customerReducers.lbShipperCompanySearch,
        selectedLbConsigneeCompanyInfo: state.customerReducers.selectedLbConsigneeCompanyInfo,
        selectedLbConsigneeCompanyContact: state.customerReducers.selectedLbConsigneeCompanyContact,
        lbConsigneeCompanySearch: state.customerReducers.lbConsigneeCompanySearch,
        selectedLbCarrierInfoCarrier: state.carrierReducers.selectedLbCarrierInfoCarrier,
        selectedLbCarrierInfoContact: state.carrierReducers.selectedLbCarrierInfoContact,
        selectedLbCarrierInfoDriver: state.carrierReducers.selectedLbCarrierInfoDriver,

        //INVOICE
        invoiceOpenedPanels: state.invoiceReducers.invoiceOpenedPanels,
        invoiceInternalNotes: state.invoiceReducers.internalNotes,
        selectedInvoiceInternalNote: state.invoiceReducers.selectedInternalNote,
        invoice_selected_order: state.invoiceReducers.selected_order,
        invoice_order_number: state.invoiceReducers.order_number,
        invoice_trip_number: state.invoiceReducers.trip_number,
        selectedInvoiceBillToCompanyInfo: state.customerReducers.selectedInvoiceBillToCompanyInfo,
        selectedInvoiceBillToCompanyContact: state.customerReducers.selectedInvoiceBillToCompanyContact,
        selectedInvoiceBillToCompanyDocument: state.customerReducers.selectedInvoiceBillToCompanyDocument,
        selectedInvoiceBillToCompanyDocumentTags: state.customerReducers.invoiceBillToCompanyDocumentTags,
        selectedInvoiceBillToCompanyDocumentNote: state.customerReducers.selectedInvoiceBillToCompanyDocumentNote,
        selectedInvoiceCarrierInfoCarrier: state.carrierReducers.selectedInvoiceCarrierInfoCarrier,
        selectedInvoiceCarrierInfoContact: state.carrierReducers.selectedInvoiceCarrierInfoContact,
        selectedInvoiceCarrierInfoDriver: state.carrierReducers.selectedInvoiceCarrierInfoDriver,
        selectedInvoiceCarrierInfoInsurance: state.carrierReducers.selectedInvoiceCarrierInfoInsurance,
        selectedInvoiceCarrierInfoDocument: state.carrierReducers.selectedInvoiceCarrierInfoDocument,
        selectedInvoiceCarrierInfoDocumentTags: state.carrierReducers.invoiceCarrierInfoDocumentTags,
        selectedInvoiceCarrierInfoDocumentNote: state.carrierReducers.selectedInvoiceCarrierInfoDocumentNote,
    }
}

export default connect(mapStateToProps, {
    setMainScreen,
    setPages,
    setSelectedPageIndex,
    setScale,
    setMainCompanyScreenFocused,
    setDispatchScreenFocused,
    setCustomerScreenFocused,
    setCarrierScreenFocused,
    setLoadBoardScreenFocused,
    setInvoiceScreenFocused,

    //DISPATCH
    setDispatchOpenedPanels,
    setSelectedOrder,
    setOrderNumber,
    setTripNumber,
    setDivision,
    setLoadType,
    setTemplate,

    setBillToCompanies,
    setSelectedBillToCompanyInfo,
    setBillToCompanySearch,
    setSelectedBillToCompanyContact,

    setShipperCompanies,
    setSelectedShipperCompanyInfo,
    setShipperCompanySearch,
    setSelectedShipperCompanyContact,
    setIsShowingShipperSecondPage,
    setShipperBolNumber,
    setShipperPoNumber,
    setShipperRefNumber,

    setConsigneeCompanies,
    setSelectedConsigneeCompanyInfo,
    setConsigneeCompanySearch,
    setSelectedConsigneeCompanyContact,
    setIsShowingConsigneeSecondPage,

    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoDriver,
    setSelectedDispatchCarrierInfoInsurance,
    setDispatchCarrierInfoCarrierSearch,
    setDispatchCarrierInfoCarriers,
    setShowingChangeCarrier,

    setDispatchEvent,
    setDispatchEventLocation,
    setDispatchEventNotes,
    setDispatchEventDate,
    setDispatchEventTime,

    setSelectedNoteForCarrier,
    setSelectedInternalNote,
    setSelectedOrderDocument,

    setNewCarrier,

    // CUSTOMER
    setCustomerOpenedPanels,
    setCustomers,
    setSelectedCustomer,
    setCustomerSearch,
    setCustomerContacts,
    setSelectedContact,
    setContactSearch,
    setIsEditingContact,
    setShowingContactList,
    setContactSearchCustomer,
    setAutomaticEmailsTo,
    setAutomaticEmailsCc,
    setAutomaticEmailsBcc,
    setSelectedNote,
    setSelectedDirection,
    setSelectedDocument,
    setSelectedDocumentTags,
    setSelectedDocumentNote,

    //CARRIER
    setCarriers,
    setSelectedCarrier,
    setSelectedCarrierContact,
    setSelectedCarrierNote,
    setCarrierContactSearch,
    setShowingCarrierContactList,
    setCarrierSearch,
    setCarrierContacts,
    setContactSearchCarrier,
    setIsEditingCarrierContact,
    setSelectedCarrierDocument,
    setDrivers,
    setSelectedDriver,
    setEquipments,
    setInsuranceTypes,
    setSelectedEquipment,
    setSelectedInsuranceType,
    setFactoringCompanySearch,
    setFactoringCompanies,
    setCarrierInsurances,
    setSelectedInsurance,
    setSelectedFactoringCompany,
    setSelectedFactoringCompanyContact,
    setCarrierOpenedPanels,
    setEquipmentInformation,

    setDispatchCarrierInfoCarriersChanging,
    setDispatchCarrierInfoCarrierSearchChanging,

    //LOAD BOARD
    setLoadBoardOpenedPanels,
    setLbSelectedOrder,
    setLbSelectedBillToCompanyInfo,
    setLbSelectedBillToCompanyContact,
    setLbBillToCompanySearch,
    setLbSelectedShipperCompanyInfo,
    setLbSelectedShipperCompanyContact,
    setLbShipperCompanySearch,
    setLbSelectedConsigneeCompanyInfo,
    setLbSelectedConsigneeCompanyContact,
    setLbConsigneeCompanySearch,
    setSelectedLbCarrierInfoCarrier,
    setSelectedLbCarrierInfoContact,
    setSelectedLbCarrierInfoDriver,

    //INVOICE
    setInvoiceOpenedPanels,
    setInvoiceSelectedOrder,
    setInvoiceOrderNumber,
    setInvoiceTripNumber,
    setInvoiceInternalNotes,
    setInvoiceSelectedInternalNote,
    setInvoiceSelectedBillToCompanyInfo,
    setInvoiceSelectedBillToCompanyContact,
    setInvoiceSelectedBillToCompanyDocument,
    setInvoiceSelectedBillToCompanyDocumentTags,
    setInvoiceSelectedBillToCompanyDocumentNote,
    setSelectedInvoiceCarrierInfoCarrier,
    setSelectedInvoiceCarrierInfoContact,
    setSelectedInvoiceCarrierInfoDriver,
    setSelectedInvoiceCarrierInfoInsurance,
    setSelectedInvoiceCarrierInfoDocument,
    setSelectedInvoiceCarrierInfoDocumentTags,
    setSelectedInvoiceCarrierInfoDocumentNote,
})(Company)