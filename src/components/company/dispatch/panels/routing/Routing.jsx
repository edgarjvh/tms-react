import React, { useState, useRef } from 'react';
import { connect } from "react-redux";
import './Routing.css';
import { setDispatchPanels } from "./../../../../../actions";
import classnames from 'classnames';
import RoutingPopup from '../../popup/Popup.jsx';
import $ from 'jquery';

function Routing(props) {
    const refCarrierEquipment = useRef();
    const [carrierEquipment, setCarrierEquipment] = useState({});
    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');

    const [carrierEquipmentsItems, setCarrierEquipmentsItems] = useState([
        {
            id: 1,
            name: 'Equipment 1',
            selected: false
        },
        {
            id: 2,
            name: 'Equipment 2',
            selected: false
        },
        {
            id: 3,
            name: 'Equipment 3',
            selected: false
        }
    ]);

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'carrier-equipment':
                setCarrierEquipment(item);
                await setPopupItems([]);
                break;
            default:
                break;
        }
    }

    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'routing') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
    }

    const carrierEquipmentOnKeydown = (e) => {
        let key = e.key.toLowerCase();
        setPopupActiveInput('carrier-equipment');
        const input = refCarrierEquipment.current.getBoundingClientRect();

        setPopupPosition(input);

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                carrierEquipmentsItems.map((item, index) => {
                    if (item.name === (carrierEquipment.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(carrierEquipmentsItems.map((item, index) => {
                    if (selectedIndex === -1) {
                        item.selected = index === 0;
                    } else {
                        item.selected = selectedIndex === index;
                    }
                    return item;
                }));
            }
        } else {
            if (key === 'arrowleft' || key === 'arrowup') {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        selectedIndex = index;
                    }
                    return true;
                });

                if (selectedIndex === -1) {
                    selectedIndex = 0;
                } else {
                    if (selectedIndex === 0) {
                        selectedIndex = popupItems.length - 1;
                    } else {
                        selectedIndex -= 1;
                    }
                }

                setPopupItems(popupItems.map((item, index) => {
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }

            if (key === 'arrowright' || key === 'arrowdown') {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        selectedIndex = index;
                    }
                    return true;
                });

                if (selectedIndex === -1) {
                    selectedIndex = 0;
                } else {
                    if (selectedIndex === popupItems.length - 1) {
                        selectedIndex = 0;
                    } else {
                        selectedIndex += 1;
                    }
                }

                setPopupItems(popupItems.map((item, index) => {
                    item.selected = selectedIndex === index;
                    return item;
                }));
            }
        }

        if (key === 'enter' || key === 'tab') {
            if (popupItems.length > 0) {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        setCarrierEquipment(item);
                    }

                    return true;
                });

                setPopupItems([]);
            }
        }

        if (key !== 'tab') {
            e.preventDefault();
        }
    }

    const setPopupPosition = (input) => {
        let popup = refPopup.current;
        const { innerWidth, innerHeight } = window;
        const screenWSection = innerWidth / 3;

        let offset = innerWidth - $(popup).parent().width() - 45;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            } else if ((innerHeight - 170 - 30) > input.top) {
                popup.childNodes[0].classList.add('below');
                popup.style.top = (input.top + 10) + 'px';
            }

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = (input.left - offset) + 'px';

                if (input.width < 70) {
                    popup.style.left = ((input.left - offset) - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = ((input.left - offset) + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = ((input.left - offset) - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = ((input.left - offset) - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = ((input.left - offset)) - (300 - (input.width / 2)) + 'px';
                }
            }
        }
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

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                marginTop: 15,
                marginBottom: 10
            }}>
                <div className="input-box-container">
                    <input type="text" placeholder="A/E Number" />
                </div>

                <div className="input-box-container">
                    <input type="text" placeholder="Order Number" />
                </div>

                <div className="input-box-container">
                    <input type="text" placeholder="Trip Number" />
                </div>

                <div className="input-box-container">
                    <input type="text" placeholder="Miles" />
                </div>
            </div>

            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 20
            }}>

                <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexBasis: '100%',
                    marginBottom: 10
                }}>
                    <div className='form-bordered-box' style={{ flexGrow: 1, marginRight: 10, flexBasis: '100%' }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Pick Ups</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>

                    </div>

                    <div className='form-bordered-box' style={{
                        flexGrow: 1, flexBasis: '100%'
                    }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Carrier</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button' onClick={() => {
                                    let index = props.panels.length - 1;
                                    let panels = props.panels.map((p, i) => {
                                        if (p.name === 'carrier-info') {
                                            index = i;
                                            p.isOpened = true;
                                        }
                                        return p;
                                    });

                                    panels.splice(panels.length - 1, 0, panels.splice(index, 1)[0]);

                                    props.setDispatchPanels(panels);
                                }}>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Carrier info</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>

                        <div className="form-row">
                            <div className="input-box-container input-code">
                                <input type="text" placeholder="Code" maxLength="8" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Name" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container" style={{ width: '7rem', backgroundColor: 'lightcoral' }}>
                                <input type="text" placeholder="Insurance" readOnly={true} />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Carrier Load - Starting City State - Destination City State" />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Name" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Contact Phone" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container input-phone-ext">
                                <input type="text" placeholder="Ext" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow" style={{ position: 'relative' }}>
                                <input type="text" placeholder="Equipments"
                                    ref={refCarrierEquipment}
                                    onKeyDown={carrierEquipmentOnKeydown}
                                    onChange={() => { }}
                                    value={carrierEquipment.name || ''}
                                />
                                <span className="fas fa-chevron-down" style={{
                                    position: 'absolute',
                                    right: 5,
                                    top: 'calc(50% + 2px)',
                                    transform: `translateY(-50%)`,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer'
                                }} onClick={() => {

                                }}></span>
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Driver Name" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Driver Phone" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Unit Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Trailer Number" />
                            </div>
                        </div>
                        <div className="form-v-sep"></div>
                        <div className="form-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexGrow: 1, alignItems: 'flex-start', marginTop: 10 }}>
                            <div className='mochi-button'>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>Rate Confirmation</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                            <div className='mochi-button'>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>E-mail Rate Confirmation</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexBasis: '100%'
                }}>
                    <div className='form-bordered-box' style={{ marginRight: 10, flexGrow: 1, flexBasis: '100%' }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Deliveries</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>

                    </div>

                    <div className='form-bordered-box' style={{
                        borderBottom: 0,
                        borderRight: 0,
                        boxShadow: 'none',
                        flexGrow: 1,
                        flexBasis: '100%'
                    }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Route</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Update</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>E-mail route</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                                <div className='mochi-button'>
                                    <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                    <div className='mochi-button-base'>Print route</div>
                                    <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                                </div>
                            </div>
                            <div className='top-border top-border-right'></div>
                        </div>
                        <div className="form-right" style={{
                            position: 'absolute',
                            height: '100%',
                            width: 2,
                            right: -1,
                            top: 0,
                            borderRight: '1px solid rgba(0,0,0,0.5)',
                            boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.3)'
                        }}>
                        </div>
                        <div className="form-footer">
                            <div className="bottom-border bottom-border-left"></div>
                            <div className="bottom-border bottom-border-middle"></div>
                            <div className="form-buttons">
                                <div className="input-box-container" style={{ width: '10rem' }}>
                                    <input type="text" placeholder="Miles" />
                                </div>
                            </div>
                            <div className="bottom-border bottom-border-right"></div>
                        </div>

                    </div>
                </div>
            </div>

            <RoutingPopup
                popupRef={refPopup}
                popupClasses={popupContainerClasses}
                popupItems={popupItems}
                popupItemsRef={popupItemsRef}
                popupItemClick={popupItemClick}
                popupItemKeydown={() => { }}
                setPopupItems={setPopupItems}
            />
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
})(Routing)