import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './CarrierInfoFactoringCompanySearch.css';
import {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setDispatchCarrierInfoContacts,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoShowingContactList,
    setDispatchCarrierInfoContactSearchCarrier,
    setDispatchCarrierInfoFactoringCompanySearch,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setDispatchOpenedPanels
} from '../../../../../actions';

function CarrierInfoFactoringCompanySearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var clickCount = 0;

    const rowClick = (e, f) => {

        clickCount++;

        window.setTimeout(() => {
            if (clickCount === 1) {
                props.setSelectedDispatchCarrierInfoFactoringCompany({...f});
              
                if (!props.dispatchOpenedPanels.includes('carrier-info-factoring-company')){
                    props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'carrier-info-factoring-company'])
                }
            } else {
                // props.setSelectedDispatchCarrierInfoCarrier({ ...props.selectedDispatchCarrierInfoCarrier, factoring_company: f });

                let selectedCarrier = props.selectedDispatchCarrierInfoCarrier;
                selectedCarrier.factoring_company_id = f.id;

                if (selectedCarrier.id === undefined || selectedCarrier.id === -1) {
                    selectedCarrier.id = 0;
                }

                if (
                    (selectedCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A") !== "" &&
                    (selectedCarrier.city || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedCarrier.state || '').trim().replace(/\s/g, "") !== "" &&
                    (selectedCarrier.address1 || '').trim() !== "" &&
                    (selectedCarrier.zip || '').trim() !== ""
                ) {
                    let parseCity = selectedCarrier.city.trim().replace(/\s/g, "").substring(0, 3);

                    if (parseCity.toLowerCase() === "ft.") {
                        parseCity = "FO";
                    }
                    if (parseCity.toLowerCase() === "mt.") {
                        parseCity = "MO";
                    }
                    if (parseCity.toLowerCase() === "st.") {
                        parseCity = "SA";
                    }

                    let newCode = (selectedCarrier.name || '').trim().replace(/\s/g, "").replace("&", "A").substring(0, 3) + parseCity.substring(0, 2) + (selectedCarrier.state || '').trim().replace(/\s/g, "").substring(0, 2);

                    selectedCarrier.code = newCode;

                    $.post(props.serverUrl + '/saveCarrier', selectedCarrier).then(async res => {
                        if (props.selectedDispatchCarrierInfoCarrier.id !== undefined && props.selectedDispatchCarrierInfoCarrier.id >= 0) {
                            selectedCarrier.factoring_company = f;
                            await props.setSelectedDispatchCarrierInfoCarrier(selectedCarrier);
                            if (res.carrier.contacts.length === 1) {
                                if (res.carrier.contacts[0].is_primary === 1) {
                                    await props.setSelectedDispatchCarrierInfoContact(res.carrier.contacts[0]);
                                }
                            }

                            await props.setDispatchCarrierInfoFactoringCompanySearch([]);
                            closePanelBtnClick(null, 'carrier-info-factoring-company-search');
                            
                        }
                    });

                    
                }
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'carrier-info-factoring-company-search')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.dispatchCarrierInfoFactoringCompanySearch || []).map((item, index) => {

                        if (index >= 0) {
                            if (item.data.trim() !== '') {
                                return (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '0.7rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        padding: '2px 10px',
                                        borderRadius: '10px',
                                        marginRight: '10px',
                                        cursor: 'default'
                                    }} title={item}>
                                        <span style={{ fontWeight: 'bold', marginRight: 5 }}>{item.field}: </span>
                                        <span style={{ whiteSpace: 'nowrap' }}>{item.data}</span>
                                    </div>
                                )
                            }
                        }

                        return false;
                    })
                }
            </div>

            <div className="tbl">
                <div className="thead">
                    <div className="trow">
                        <div className="tcol code">Code</div>
                        <div className="tcol name">Company Name</div>
                        <div className="tcol address1">Address 1</div>
                        <div className="tcol address2">Address 2</div>
                        <div className="tcol city">City</div>
                        <div className="tcol state">State</div>
                        <div className="tcol zip">Postal Code</div>
                    </div>
                </div>
                <div className="tbody">
                    <div className="tbody-wrapper">
                        {
                            props.dispatchCarrierInfoFactoringCompanies.length > 0
                                ? props.dispatchCarrierInfoFactoringCompanies.map((f, i) => {
                                    return (
                                        <div className="trow" onClick={(e) => { rowClick(e, { ...f }) }} key={i}>
                                            <div className="tcol code">{f.code + (f.code_number === 0 ? '' : f.code_number)}</div>
                                            <div className="tcol name">{f.name}</div>
                                            <div className="tcol address1">{f.address1}</div>
                                            <div className="tcol address2">{f.address2}</div>
                                            <div className="tcol city">{f.city}</div>
                                            <div className="tcol state">{f.state}</div>
                                            <div className="tcol zip">{f.zip}</div>
                                        </div>
                                    )
                                })
                                : <div className="trow"><div className="tcol empty">Nothing to show!</div></div>
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
        panels: state.dispatchReducers.panels,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        dispatchCarrierInfoFactoringCompanySearch: state.carrierReducers.dispatchCarrierInfoFactoringCompanySearch,
        dispatchCarrierInfoFactoringCompanies: state.carrierReducers.dispatchCarrierInfoFactoringCompanies,
        selectedDispatchCarrierInfoCarrier: state.carrierReducers.selectedDispatchCarrierInfoCarrier
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setDispatchCarrierInfoContactSearch,
    setDispatchCarrierInfoFactoringCompanySearch,
    setSelectedDispatchCarrierInfoFactoringCompany,
    setDispatchOpenedPanels
})(CarrierInfoFactoringCompanySearch)