import React,{useRef} from 'react';
import { connect } from "react-redux";
import {
    setDispatchPanels
} from "./../../../../../actions";

function Order(props) {

    const refPage = useRef();

    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'order') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
    }

    const styleFlexRow = {
        display: 'flex',
        flexDirection: 'row'
    }
    const styleFlexCol = {
        display: 'flex',
        flexDirection: 'column'
    }
    const styleFieldName = {
        color: 'black',
        fontWeight: 'bold'
    }
    const styleFieldData = {
        color: 'red'
    }
    const styleFieldDataBold = {
        color: 'red',
        fontWeight: 'bold'
    }

    const printWindow = (data) => {
        let mywindow = window.open('', 'new div', 'height=400,width=600');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="../../css/index.css" type="text/css" media="all" />');
        mywindow.document.write('<style>@media print {@page {margin: 0;}body {margin:0;padding: 15mm 10mm;}}</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        setTimeout(function () { mywindow.print(); }, 1000);

        return true;
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className="header-buttons" style={{ marginTop: 10, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                <div className="mochi-button" onClick={() => {
                    printWindow(refPage.current.innerHTML);
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Print</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">E-Mail Order</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>
            </div>

            <div className="content-viewer" style={{ flexGrow: 1, position: 'relative' }}>
                <div className="content-viewer-wrapper" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
                    <div ref={refPage} className="content-page" style={{
                        minWidth: '215.5mm',
                        minHeight: '279.4mm',
                        maxWidth: '215.5mm',
                        maxHeight: '279.4mm',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '0.9rem',
                        padding: '15mm 10mm'
                    }}>


                        <div style={{ ...styleFlexRow, marginBottom: 20 }}>
                            <div style={{ flexGrow: 1, flexBasis: '100%' }}>
                                <span style={{ ...styleFieldName }}>Date:</span> <span style={{ ...styleFieldData }}>2019/10/29 @ 12:00</span>
                            </div>
                            <div style={{ flexGrow: 1, flexBasis: '100%', textAlign: 'center' }}>
                                <span style={{ ...styleFieldData, fontWeight: 'bold', fontSize: '1.2rem' }}>ET3 LOGISTICS, LLC</span>
                            </div>
                            <div style={{ flexGrow: 1, flexBasis: '100%', textAlign: 'right' }}>
                                <div style={{ marginBottom: 5 }}><span style={{ ...styleFieldName }}>ORDER#</span> <span style={{ ...styleFieldData }}>12345678</span></div>
                                <div><span style={{ ...styleFieldName }}>TRIP#</span> <span style={{ ...styleFieldData }}>12345678</span></div>
                            </div>
                        </div>

                        <div style={{
                            ...styleFlexCol,
                            flexGrow: 1,
                            border: '1px solid rgba(0,0,0,0.5)',
                            borderRadius: 5,
                            boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1,
                                ...styleFlexRow
                            }}>
                                <div style={{
                                    ...styleFlexCol,
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    borderRight: '1px solid rgba(0,0,0,0.5)'
                                }}>

                                </div>

                                <div style={{
                                    ...styleFlexCol,
                                    flexGrow: 1,
                                    flexBasis: '100%'
                                }}>

                                </div>
                            </div>

                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div>

                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div
                            >
                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div>

                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div>

                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div>

                            <div style={{
                                borderBottom: '1px solid rgba(0,0,0,0.5)',
                                flexGrow: 1
                            }}>

                            </div>

                        </div>
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
})(Order)