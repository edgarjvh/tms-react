import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './BillToCompanyLaneHistory.css';
import { setDispatchPanels } from './../../../../../actions';
import MaskedInput from 'react-text-mask';

function BillToCompanyLaneHistory(props) {
    const closePanelBtnClick = () => {
        let panels = props.panels.map((panel) => {
            if (panel.name === 'bill-to-company-lane-history') {
                panel.isOpened = false;
            }
            return panel;
        });

        props.setDispatchPanels(panels);
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="lane-fields-container">
                <div className="row-fields">
                    <div className="input-box-container date">
                        <MaskedInput mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} guide={true} type="text" placeholder="Date Start" />
                    </div>
                    <div className="input-box-container city">
                        <input type="text" placeholder="City Origin" />
                    </div>
                    <div className="input-box-container state">
                        <input type="text" placeholder="State Origin" />
                    </div>
                    <div className="input-box-container zip">
                        <input type="text" placeholder="Zip Origin" />
                    </div>
                </div>

                <div className="row-fields">
                    <div className="input-box-container date">
                        <MaskedInput mask={[/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} guide={true} type="text" placeholder="Date End" />
                    </div>
                    <div className="input-box-container city">
                        <input type="text" placeholder="City Destination" />
                    </div>
                    <div className="input-box-container state">
                        <input type="text" placeholder="State Destination" />
                    </div>
                    <div className="input-box-container zip">
                        <input type="text" placeholder="Zip Destination" />
                    </div>
                </div>
            </div>
            <div className="lane-info-container">
                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
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
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        panels: state.dispatchReducers.panels
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels
})(BillToCompanyLaneHistory)