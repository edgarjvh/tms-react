import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './FactoringCompanyPanelSearch.css';

function FactoringCompanyPanelSearch(props) {
    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    var clickCount = 0;

    const rowClick = (e, f) => {

        clickCount++;

        window.setTimeout(() => {
            if (clickCount === 1) {

            } else {
                props.setSelectedFactoringCompany({ ...f });

                (f.contacts || []).map(async c => {
                    if (c.is_primary === 1) {
                        props.setSelectedFactoringCompanyContact(c);
                    }
                    return true;
                });

        props.setFactoringCompanySearch([]);

        closePanelBtnClick(null, props.panelName);
    }

    clickCount = 0;
}, 300);
    }

return (
    <div className="panel-content">
        <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
        <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
        <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

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

export default connect(null, null)(FactoringCompanyPanelSearch)