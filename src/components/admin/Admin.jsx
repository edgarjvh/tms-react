import React, { useState, useRef } from 'react';
import './Admin.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faPencilAlt, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";

import {
    setMainScreen,
    setScale
} from '../../actions/systemActions';

import {
    setPages,
    setSelectedPageIndex,
    setMainAdminScreenFocused,
    setCustomerScreenFocused,
    setCarrierScreenFocused,
    setReportsScreenFocused,
    setSetupCompanyScreenFocused,
} from '../../actions/adminActions';

import {
    setAdminCustomers,
    setAdminSelectedCustomer,
    setAdminSelectedContact,
    setAdminSelectedNote,
    setAdminSelectedDirection,
    setAdminContactSearch,
    setAdminAutomaticEmailsTo,
    setAdminAutomaticEmailsCc,
    setAdminAutomaticEmailsBcc,
    setAdminShowingContactList,
    setAdminCustomerSearch,
    setAdminCustomerContacts,
    setAdminContactSearchCustomer,
    setAdminIsEditingContact,
    setAdminSelectedDocument,
    setAdminDocumentTags as setAdminSelectedDocumentTags,
    setAdminSelectedDocumentNote,
    setAdminCustomerOpenedPanels,

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

    setCustomerBillToCompanies,
    setCustomerSelectedBillToCompanyInfo,
    setCustomerBillToCompanySearch,
    setCustomerSelectedBillToCompanyContact,

    setCustomerShipperCompanies,
    setCustomerSelectedShipperCompanyInfo,
    setCustomerShipperCompanySearch,
    setCustomerSelectedShipperCompanyContact,

    setCustomerConsigneeCompanies,
    setCustomerSelectedConsigneeCompanyInfo,
    setCustomerConsigneeCompanySearch,
    setCustomerSelectedConsigneeCompanyContact,
} from '../../actions/customersActions';

import {
    setAdminCarriers,
    setAdminSelectedCarrier,
    setAdminSelectedCarrierContact,
    setAdminSelectedCarrierNote,
    setAdminContactSearch as setAdminCarrierContactSearch,
    setAdminShowingCarrierContactList,
    setAdminCarrierSearch,
    setAdminCarrierContacts,
    setAdminContactSearchCarrier,
    setAdminIsEditingContact as setAdminIsEditingCarrierContact,
    setAdminSelectedCarrierDocument,
    setAdminDrivers,
    setAdminSelectedDriver,
    setAdminEquipments,
    setAdminInsuranceTypes,
    setAdminSelectedEquipment,
    setAdminSelectedInsuranceType,
    setAdminFactoringCompanySearch,
    setAdminFactoringCompanies,
    setAdminCarrierInsurances,
    setAdminSelectedInsurance,
    setAdminSelectedFactoringCompany,
    setAdminSelectedFactoringCompanyContact,
    setAdminCarrierOpenedPanels,
    setAdminEquipmentInformation,

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

    setSelectedCustomerCarrierInfoCarrier,
    setSelectedCustomerCarrierInfoContact,
    setSelectedCustomerCarrierInfoDriver,
    setSelectedCustomerCarrierInfoInsurance,
    setSelectedCustomerCarrierInfoDocument,
    setCustomerCarrierInfoDocumentTags as setSelectedCustomerCarrierInfoDocumentTags,
    setSelectedCustomerCarrierInfoDocumentNote,

} from '../../actions/carriersActions';

import axios from 'axios';

import CustomersPage from './../company/customers/Customers.jsx';
import CarriersPage from './../company/carriers/Carriers.jsx';


function Admin(props) {
    const [chatOptionItems, setChatOptionItems] = useState([
        {
            id: 0,
            name: 'Open in a new tab'
        },
        {
            id: 1,
            name: 'Open in a panel'
        }
    ]);
    const [showChatOptions, setShowChatOptions] = useState(false);
    const refShowChatOptionsDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowChatOptions(false) } });
    const refChatOptionPopupItems = useRef([]);

    const containerCls = classnames({
        'main-admin-container': true,
        'is-showing': props.mainScreen === 'admin'
    })

    const userClick = () => {
        props.setMainScreen('company');
    }

    const customersBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('admin customer') === -1) {
            await props.setPages([...curPages, 'admin customer']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('admin customer'));
        }

        props.setCustomerScreenFocused(true);
    }

    const carriersBtnClick = async () => {
        let curPages = props.pages;

        if (curPages.indexOf('admin carrier') === -1) {
            await props.setPages([...curPages, 'admin carrier']);
            await props.setSelectedPageIndex(curPages.length);

        } else {
            await props.setSelectedPageIndex(props.pages.indexOf('admin carrier'));
        }

        props.setCarrierScreenFocused(true);
    }

    return (
        <div className={containerCls}>
            <div className="main-content">
                <div className="menu-bar">
                    <div className="section">
                        <div className="menu-btn" id="switch-admin-screen-btn" onClick={userClick}>Company</div>
                    </div>
                    <div className="section chat-video-buttons">
                        <div className="mochi-button" onClick={() => {
                            window.open('', '_blank').focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Chat</div>                            
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="mochi-button" onClick={() => {
                            window.open('', '_blank').focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Video</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="mochi-input-decorator">
                            <input type="search" placeholder="just type" id="txt-main-search" />
                        </div>
                    </div>
                    <div className="section">
                        <div className="menu-btn" id="home-btn" title="Home" onClick={() => { props.setSelectedPageIndex(-1); props.setMainAdminScreenFocused(true); }}><span className="fas fa-home"></span></div>
                        <div className="menu-btn" id="customers-btn" title="Customers" onClick={customersBtnClick}><span className="fas fa-users"></span></div>
                        <div className="menu-btn" id="carriers-btn" title="Carriers" onClick={carriersBtnClick}><span className="fas fa-people-carry"></span></div>
                        <div className="menu-btn" id="reports-btn" title="Reports"><span className="fas fa-file-alt"></span></div>
                        <div className="menu-btn" id="setup-company-btn" title="Setup Company"><span className="fas fa-building"></span></div>
                        <div className="menu-btn" id="switch-app-btn" title="Switch App"><span className="fas fa-exchange-alt"></span></div>
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
                            <CustomersPage
                                pageName={'Customer Page'}
                                panelName={'customer-page'}
                                tabTimes={2000}
                                scale={props.scale}
                                serverUrl={props.serverUrl}
                                setOpenedPanels={props.setAdminCustomerOpenedPanels}
                                openedPanels={props.adminCustomerOpenedPanels}
                                screenFocused={props.customerScreenFocused}

                                isAdmin={true}

                                setCustomers={props.setAdminCustomers}
                                setSelectedCustomer={props.setAdminSelectedCustomer}
                                setCustomerSearch={props.setAdminCustomerSearch}
                                setCustomerContacts={props.setAdminCustomerContacts}
                                setSelectedContact={props.setAdminSelectedContact}
                                setContactSearch={props.setAdminContactSearch}
                                setIsEditingContact={props.setAdminIsEditingContact}
                                setShowingContactList={props.setAdminShowingContactList}
                                setContactSearchCustomer={props.setAdminContactSearchCustomer}
                                setAutomaticEmailsTo={props.setAdminAutomaticEmailsTo}
                                setAutomaticEmailsCc={props.setAdminAutomaticEmailsCc}
                                setAutomaticEmailsBcc={props.setAdminAutomaticEmailsBcc}
                                setSelectedNote={props.setAdminSelectedNote}
                                setSelectedDirection={props.setAdminSelectedDirection}
                                setSelectedDocument={props.setAdminSelectedDocument}

                                setCustomerSelectedOrder={props.setCustomerSelectedOrder}
                                setCustomerOrderNumber={props.setCustomerOrderNumber}
                                setCustomerTripNumber={props.setCustomerTripNumber}
                                setCustomerDivision={props.setCustomerDivision}
                                setCustomerLoadType={props.setCustomerLoadType}
                                setCustomerTemplate={props.setCustomerTemplate}
                                setCustomerBillToCompanies={props.setCustomerBillToCompanies}
                                setCustomerSelectedBillToCompanyInfo={props.setCustomerSelectedBillToCompanyInfo}
                                setCustomerBillToCompanySearch={props.setCustomerBillToCompanySearch}
                                setCustomerSelectedBillToCompanyContact={props.setCustomerSelectedBillToCompanyContact}
                                setCustomerShipperCompanies={props.setCustomerShipperCompanies}
                                setCustomerSelectedShipperCompanyInfo={props.setCustomerSelectedShipperCompanyInfo}
                                setCustomerShipperCompanySearch={props.setCustomerShipperCompanySearch}
                                setCustomerSelectedShipperCompanyContact={props.setCustomerSelectedShipperCompanyContact}
                                setCustomerConsigneeCompanies={props.setCustomerConsigneeCompanies}
                                setCustomerSelectedConsigneeCompanyInfo={props.setCustomerSelectedConsigneeCompanyInfo}
                                setCustomerConsigneeCompanySearch={props.setCustomerConsigneeCompanySearch}
                                setCustomerSelectedConsigneeCompanyContact={props.setCustomerSelectedConsigneeCompanyContact}
                                setSelectedCustomerCarrierInfoCarrier={props.setSelectedCustomerCarrierInfoCarrier}
                                setSelectedCustomerCarrierInfoContact={props.setSelectedCustomerCarrierInfoContact}
                                setSelectedCustomerCarrierInfoDriver={props.setSelectedCustomerCarrierInfoDriver}
                                setSelectedCustomerCarrierInfoInsurance={props.setSelectedCustomerCarrierInfoInsurance}

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



                                customerSearchPanelName='admin-customer-search'
                                customerContactsPanelName='admin-customer-contacts'
                                customerContactSearchPanelName='admin-customer-contact-search'
                                customerRevenueInformationPanelName='admin-revenue-information'
                                customerOrderHistoryPanelName='admin-order-history'
                                customerLaneHistoryPanelName='admin-lane-history'
                                customerDocumentsPanelName='admin-documents'
                                customerDispatchPanelName='admin-customer-dispatch'
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
                                setOpenedPanels={props.setAdminCarrierOpenedPanels}
                                openedPanels={props.adminCarrierOpenedPanels}
                                screenFocused={props.carrierScreenFocused}

                                isAdmin={true}

                                setCarriers={props.setAdminCarriers}
                                setSelectedCarrier={props.setAdminSelectedCarrier}
                                setSelectedCarrierContact={props.setAdminSelectedCarrierContact}
                                setSelectedCarrierNote={props.setAdminSelectedCarrierNote}
                                setContactSearch={props.setAdminCarrierContactSearch}
                                setShowingCarrierContactList={props.setAdminShowingCarrierContactList}
                                setCarrierSearch={props.setAdminCarrierSearch}
                                setCarrierContacts={props.setAdminCarrierContacts}
                                setContactSearchCarrier={props.setAdminContactSearchCarrier}
                                setIsEditingContact={props.setAdminIsEditingCarrierContact}
                                setSelectedCarrierDocument={props.setAdminSelectedCarrierDocument}
                                setDrivers={props.setAdminDrivers}
                                setSelectedDriver={props.setAdminSelectedDriver}
                                setEquipments={props.setAdminEquipments}
                                setInsuranceTypes={props.setAdminInsuranceTypes}
                                setSelectedEquipment={props.setAdminSelectedEquipment}
                                setSelectedInsuranceType={props.setAdminSelectedInsuranceType}
                                setFactoringCompanySearch={props.setAdminFactoringCompanySearch}
                                setFactoringCompanies={props.setAdminFactoringCompanies}
                                setCarrierInsurances={props.setAdminCarrierInsurances}
                                setSelectedInsurance={props.setAdminSelectedInsurance}
                                setSelectedFactoringCompany={props.setAdminSelectedFactoringCompany}
                                setSelectedFactoringCompanyContact={props.setAdminSelectedFactoringCompanyContact}
                                setEquipmentInformation={props.setAdminEquipmentInformation}

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

                                carrierSearchPanelName='admin-carrier-search'
                                carrierContactSearchPanelName='admin-carrier-contact-search'
                                carrierContactsPanelName='admin-carrier-contacts'
                                carrierDocumentsPanelName='admin-documents'
                                carrierRevenueInformationPanelName='admin-revenue-information'
                                carrierOrderHistoryPanelName='admin-order-history'
                                carrierEquipmentPanelName='admin-equipment-information'
                                carrierFactoringCompanySearchPanelName='admin-carrier-factoring-company-search'
                                carrierFactoringCompanyPanelName='admin-carrier-factoring-company'
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
        pages: state.adminReducers.pages,
        selectedPageIndex: state.adminReducers.selectedPageIndex,
        mainAdminScreenFocused: state.adminReducers.mainAdminScreenFocused,
        customerScreenFocused: state.adminReducers.customerScreenFocused,
        carrierScreenFocused: state.adminReducers.carrierScreenFocused,
        reportsScreenFocused: state.adminReducers.reportsScreenFocused,
        setupCompanyScreenFocused: state.adminReducers.setupCompanyScreenFocused,

        //CUSTOMER
        adminCustomerOpenedPanels: state.customerReducers.adminCustomerOpenedPanels,
        customers: state.customerReducers.adminCustomers,
        selectedCustomer: state.customerReducers.adminSelectedCustomer,
        customerSearch: state.customerReducers.adminCustomerSearch,
        contacts: state.customerReducers.adminContacts,
        selectedContact: state.customerReducers.adminSelectedContact,
        contactSearch: state.customerReducers.adminContactSearch,
        showingContactList: state.customerReducers.adminShowingContactList,
        automaticEmailsTo: state.customerReducers.adminAutomaticEmailsTo,
        automaticEmailsCc: state.customerReducers.adminAutomaticEmailsCc,
        automaticEmailsBcc: state.customerReducers.adminAutomaticEmailsBcc,
        selectedNote: state.customerReducers.adminSelectedNote,
        selectedDirection: state.customerReducers.adminSelectedDirection,
        selectedDocument: state.customerReducers.adminSelectedDocument,
        selectedDocumentTags: state.customerReducers.adminDocumentTags,
        selectedDocumentNote: state.customerReducers.adminSelectedDocumentNote,
        isEditingContact: state.customerReducers.adminIsEditingContact,
        contactSearchCustomer: state.customerReducers.adminContactSearchCustomer,

        //CARRIER
        adminCarrierOpenedPanels: state.carrierReducers.adminCarrierOpenedPanels,
        carriers: state.carrierReducers.adminCarriers,
        carrierContacts: state.carrierReducers.adminContacts,
        selectedCarrier: state.carrierReducers.adminSelectedCarrier,
        selectedCarrierContact: state.carrierReducers.adminSelectedContact,
        selectedCarrierNote: state.carrierReducers.adminSelectedNote,
        selectedCarrierDirection: state.carrierReducers.adminSelectedDirection,
        carrierContactSearch: state.carrierReducers.adminContactSearch,
        showingCarrierContactList: state.carrierReducers.adminShowingContactList,
        carrierSearch: state.carrierReducers.adminCarrierSearch,
        selectedCarrierDocument: state.carrierReducers.adminSelectedDocument,
        drivers: state.carrierReducers.adminDrivers,
        selectedDriver: state.carrierReducers.adminSelectedDriver,
        equipments: state.carrierReducers.adminEquipments,
        insuranceTypes: state.carrierReducers.adminInsuranceTypes,
        selectedEquipment: state.carrierReducers.adminSelectedEquipment,
        selectedInsuranceType: state.carrierReducers.adminSelectedInsuranceType,
        factoringCompanySearch: state.carrierReducers.adminFactoringCompanySearch,
        factoringCompanies: state.carrierReducers.adminFactoringCompanies,
        carrierInsurances: state.carrierReducers.adminCarrierInsurances,
        selectedInsurance: state.carrierReducers.adminSelectedInsurance,
        selectedFactoringCompany: state.carrierReducers.adminSelectedFactoringCompany,
        selectedFactoringCompanyContact: state.carrierReducers.adminSelectedFactoringCompanyContact,
        equipmentInformation: state.carrierReducers.adminEquipmentInformation,
    }
}

export default connect(mapStateToProps, {
    setMainScreen,
    setPages,
    setSelectedPageIndex,
    setScale,
    setMainAdminScreenFocused,
    setCustomerScreenFocused,
    setCarrierScreenFocused,
    setReportsScreenFocused,
    setSetupCompanyScreenFocused,

    // CUSTOMER
    setAdminCustomers,
    setAdminSelectedCustomer,
    setAdminSelectedContact,
    setAdminSelectedNote,
    setAdminSelectedDirection,
    setAdminContactSearch,
    setAdminAutomaticEmailsTo,
    setAdminAutomaticEmailsCc,
    setAdminAutomaticEmailsBcc,
    setAdminShowingContactList,
    setAdminCustomerSearch,
    setAdminCustomerContacts,
    setAdminContactSearchCustomer,
    setAdminIsEditingContact,
    setAdminSelectedDocument,
    setAdminSelectedDocumentTags,
    setAdminSelectedDocumentNote,
    setAdminCustomerOpenedPanels,

    setCustomerBillToCompanies,
    setCustomerSelectedBillToCompanyInfo,
    setCustomerBillToCompanySearch,
    setCustomerSelectedBillToCompanyContact,

    setCustomerShipperCompanies,
    setCustomerSelectedShipperCompanyInfo,
    setCustomerShipperCompanySearch,
    setCustomerSelectedShipperCompanyContact,

    setCustomerConsigneeCompanies,
    setCustomerSelectedConsigneeCompanyInfo,
    setCustomerConsigneeCompanySearch,
    setCustomerSelectedConsigneeCompanyContact,

    //CARRIER
    setAdminCarriers,
    setAdminSelectedCarrier,
    setAdminSelectedCarrierContact,
    setAdminSelectedCarrierNote,
    setAdminCarrierContactSearch,
    setAdminShowingCarrierContactList,
    setAdminCarrierSearch,
    setAdminCarrierContacts,
    setAdminContactSearchCarrier,
    setAdminIsEditingCarrierContact,
    setAdminSelectedCarrierDocument,
    setAdminDrivers,
    setAdminSelectedDriver,
    setAdminEquipments,
    setAdminInsuranceTypes,
    setAdminSelectedEquipment,
    setAdminSelectedInsuranceType,
    setAdminFactoringCompanySearch,
    setAdminFactoringCompanies,
    setAdminCarrierInsurances,
    setAdminSelectedInsurance,
    setAdminSelectedFactoringCompany,
    setAdminSelectedFactoringCompanyContact,
    setAdminCarrierOpenedPanels,
    setAdminEquipmentInformation,

    setDispatchCarrierInfoCarriersChanging,
    setDispatchCarrierInfoCarrierSearchChanging,

    setSelectedCustomerCarrierInfoCarrier,
    setSelectedCustomerCarrierInfoContact,
    setSelectedCustomerCarrierInfoDriver,
    setSelectedCustomerCarrierInfoInsurance,
    setSelectedCustomerCarrierInfoDocument,
    setSelectedCustomerCarrierInfoDocumentTags,
    setSelectedCustomerCarrierInfoDocumentNote,
})(Admin)