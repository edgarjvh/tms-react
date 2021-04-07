import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompanySearch.css';
import {
    setCarrierPanels,
    setSelectedCarrier,
    setSelectedContact,
    setCarrierContacts,
    setContactSearch,
    setShowingContactList,
    setContactSearchCarrier,
    setFactoringCompanySearch,
    setSelectedFactoringCompany
} from '../../../../../actions';

function FactoringCompanySearch(props) {
    const closePanelBtnClick = () => {
        console.log('closing')
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'carrier-factoring-company-search') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setCarrierPanels(panels);
    }

    var clickCount = 0;

    const rowClick = (e, f) => {

        clickCount++;

        window.setTimeout(() => {
            if (clickCount === 1) {
                let index = props.panels.length - 1;
                let panels = props.panels.map((p, i) => {
                    if (p.name === 'carrier-factoring-company') {
                        index = i;
                        p.isOpened = true;
                    }
                    return p;
                });

                props.setSelectedFactoringCompany({...f});

                panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                props.setCarrierPanels(panels);
            } else {
                // props.setSelectedCarrier({ ...props.selectedCarrier, factoring_company: f });

                let selectedCarrier = props.selectedCarrier;
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
                        if (props.selectedCarrier.id !== undefined && props.selectedCarrier.id >= 0) {
                            selectedCarrier.factoring_company = f;
                            await props.setSelectedCarrier(selectedCarrier);
                            if (res.carrier.contacts.length === 1) {
                                if (res.carrier.contacts[0].is_primary === 1) {
                                    await props.setSelectedContact(res.carrier.contacts[0]);
                                }
                            }

                            await props.setFactoringCompanySearch([]);
                            closePanelBtnClick();
                            
                        }
                    });

                    
                }
            }

            clickCount = 0;
        }, 300);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="input-box-container" style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {
                    (props.factoringCompanySearch || []).map((item, index) => {

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
                            props.factoringCompanies.length > 0
                                ? props.factoringCompanies.map((f, i) => {
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
        panels: state.carrierReducers.panels,
        carriers: state.carrierReducers.carriers,
        factoringCompanySearch: state.carrierReducers.factoringCompanySearch,
        factoringCompanies: state.carrierReducers.factoringCompanies,
        selectedCarrier: state.carrierReducers.selectedCarrier
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels,
    setSelectedCarrier,
    setSelectedContact,
    setCarrierContacts,
    setContactSearch,
    setShowingContactList,
    setContactSearchCarrier,
    setFactoringCompanySearch,
    setSelectedFactoringCompany
})(FactoringCompanySearch)