import React, { useRef } from 'react';
import { connect } from "react-redux";
import ToPrint from './ToPrint.jsx';
import { useReactToPrint } from 'react-to-print';

function RateConf(props) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({        
        pageStyle: () => "@media print {@page {size: 8.5in 11in !important; margin: 0} body {margin: 0;padding: 0;} .page-block {page-break-after: auto !important;page-break-beforer: auto !important; page-break-inside: avoid !important;} .no-print{display:none !important;} .container-sheet{box-shadow: initial !important;margin: 0 !important}}",
        content: () => componentRef.current,
    });

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="header-buttons" style={{ marginTop: 10, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                <div className="mochi-button" onClick={() => {
                    handlePrint();
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Print</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className="mochi-button">
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">E-Mail Rate Conf</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>
            </div>

            <div className="content-viewer" style={{ flexGrow: 1, position: 'relative' }}>
                <div className="content-viewer-wrapper" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto'
                }}>

                    <ToPrint
                        ref={componentRef}
                        selected_order={props.selected_order}
                        selectedCarrierInfo={props.selectedCarrierInfo}
                        selectedCarrierInfoContact={props.selectedCarrierInfoContact}
                    />
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(RateConf)