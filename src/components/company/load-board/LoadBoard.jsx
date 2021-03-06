import React from 'react';
import { connect } from 'react-redux';
import './LoadBoard.css';

function LoadBoard() {

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

    return (
        <div className="load-board-main-container">
            <div className="fields-container-col grow" style={{ marginRight: 10 }}>
                <div className="form-bordered-box" style={{ marginBottom: 10 }}>
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Available</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                let html = `<h2>Available</h2>`;
                                html += `<ul>`;

                                for (let i = 0; i < 10; i++) {
                                    html += `<li>Element ${(i + 1)}</li>`;
                                }

                                html += `</ul>`;

                                printWindow(html);
                            }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>
                </div>

                <div className="form-bordered-box" style={{ marginBottom: 10 }}>
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Booked</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                let html = `<h2>Booked</h2>`;
                                html += `<ul>`;

                                for (let i = 0; i < 10; i++) {
                                    html += `<li>Element ${(i + 1)}</li>`;
                                }

                                html += `</ul>`;

                                printWindow(html);
                             }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>
                </div>

                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">In Transit</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                let html = `<h2>In Transit</h2>`;
                                html += `<ul>`;

                                for (let i = 0; i < 10; i++) {
                                    html += `<li>Element ${(i + 1)}</li>`;
                                }

                                html += `</ul>`;

                                printWindow(html);
                             }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>
                </div>
            </div>

            <div className="fields-container-col grow">
                <div className="form-borderless-box">
                    <div className="form-row">
                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Refresh</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div className="input-toggle-container">
                            <input type="checkbox" id="cbox-load-board-auto-refresh-btn" />
                            <label htmlFor="cbox-load-board-auto-refresh-btn">
                                <div className="label-text">Auto Refresh</div>
                                <div className="input-toggle-btn"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-bordered-box" style={{ marginBottom: 10 }}>
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Load Information</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                let html = `<h2>Load Information</h2>`;
                                html += `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
                                printWindow(html);
                             }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>
                </div>

                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Loads Delivered but not Invoiced</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                let html = `<h2>Loads Delivered but not Invoiced</h2>`;
                                html += `<ul>`;

                                for (let i = 0; i < 10; i++) {
                                    html += `<li>Element ${(i + 1)}</li>`;
                                }

                                html += `</ul>`;

                                printWindow(html);
                             }}>
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

export default connect(null, null)(LoadBoard)