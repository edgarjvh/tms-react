import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { setDispatchPanels } from "./../../../../../actions";
import classnames from 'classnames';
import RatingScreenPopup from './../../popup/Popup.jsx';
import $ from 'jquery';

function RatingScreen(props) {

    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'rating-screen') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setDispatchPanels(panels);
    }

    const [rateTypesItems, setRateTypesItems] = useState([
        {
            id: 1,
            name: 'Rate Type 1',
            selected: false
        },
        {
            id: 2,
            name: 'Rate Type 2',
            selected: false
        },
        {
            id: 3,
            name: 'Rate Type 3',
            selected: false
        }
    ]);

    const [billToRateType, setBillToRateType] = useState({});
    const [carrierChargesRateType, setCarrierChargesRateType] = useState({});
    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');
    const refBillToRateTypes = useRef();
    const refCarrierChargesRateTypes = useRef();

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'bill-to-rate-type':
                setBillToRateType(item);
                await setPopupItems([]);
                break;
            case 'carrier-charges-rate-type':
                setCarrierChargesRateType(item);
                await setPopupItems([]);
                break;            
            default:
                break;
        }
    }

    const onBillToRateTypeKeydown = (e) => {

        let key = e.key.toLowerCase();

        setPopupActiveInput('bill-to-rate-type');

        const input = refBillToRateTypes.current.getBoundingClientRect();

        

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;
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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                rateTypesItems.map((item, index) => {
                    if (item.name === (billToRateType.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(rateTypesItems.map((item, index) => {
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
                        setBillToRateType(item);
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

    const onCarrierChargesRateTypeKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('carrier-charges-rate-type');

        const input = refCarrierChargesRateTypes.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

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

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                rateTypesItems.map((item, index) => {
                    if (item.name === (carrierChargesRateType.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(rateTypesItems.map((item, index) => {
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
                        setCarrierChargesRateType(item);
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

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className='form-bordered-box' style={{ borderBottom: 0, borderRight: 0, marginBottom: 15, marginTop: 10, boxShadow: 'none' }}>
                <div className='form-header'>
                    <div className='top-border top-border-left'></div>
                    <div className='form-title'>Customer Charges</div>
                    <div className='top-border top-border-middle'></div>
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
                        <div className="mochi-button" style={{ marginRight: 10 }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Delete</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="input-box-container" style={{ width: '10rem' }}>
                            <input type="text" placeholder="Total Customer Charges" />
                        </div>
                    </div>
                    <div className="bottom-border bottom-border-right"></div>
                </div>

                <div className="form-row" style={{ position: 'relative' }}>
                    <div className="input-box-container grow" style={{ position: 'relative' }}>
                        <input type="text" placeholder="Rate Type"
                            ref={refBillToRateTypes}
                            onKeyDown={onBillToRateTypeKeydown}
                            onChange={() => { }}
                            value={billToRateType.name || ''}
                        />

                        <span className="fas fa-caret-down" style={{
                            position: 'absolute',
                            right: 5,
                            top: 'calc(50% + 2px)',
                            transform: `translateY(-50%)`,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }} onClick={() => {

                        }}></span>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Rate Description" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Units" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Weight" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Miles" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Rate" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Total Charges" />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row" style={{ flexGrow: 1, padding: '5px 5px 15px 5px' }}>
                    <div className="form-portal" style={{flexGrow: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 5}}></div>
                </div>
            </div>

            <div className='form-bordered-box' style={{ borderBottom: 0, borderRight: 0, marginBottom: 20, marginTop: 10, boxShadow: 'none' }}>
                <div className='form-header'>
                    <div className='top-border top-border-left'></div>
                    <div className='form-title'>Carrier Payments</div>
                    <div className='top-border top-border-middle'></div>
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
                    <div className="form-buttons">
                        <div className="input-box-container" style={{ width: '10rem', marginRight: 5 }}>
                            <input type="text" placeholder="Gross Profit" />
                        </div>
                        <div className="input-box-container" style={{ width: '10rem' }}>
                            <input type="text" placeholder="Percentage Profit" />
                        </div>
                    </div>
                    <div className="bottom-border bottom-border-middle"></div>
                    <div className="form-buttons">
                        <div className="mochi-button" style={{ marginRight: 10 }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Delete</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="input-box-container" style={{ width: '10rem' }}>
                            <input type="text" placeholder="Total Carrier Payments" />
                        </div>
                    </div>
                    <div className="bottom-border bottom-border-right"></div>
                </div>

                <div className="form-row" style={{ position: 'relative' }}>
                    <div className="input-box-container grow" style={{ position: 'relative' }}>
                        <input type="text" placeholder="Rate Type"
                            ref={refCarrierChargesRateTypes}
                            onKeyDown={onCarrierChargesRateTypeKeydown}
                            onChange={() => { }}
                            value={carrierChargesRateType.name || ''}
                        />

                        <span className="fas fa-caret-down" style={{
                            position: 'absolute',
                            right: 5,
                            top: 'calc(50% + 2px)',
                            transform: `translateY(-50%)`,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }} onClick={() => {

                        }}></span>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Rate Description" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Units" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Weight" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Miles" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Rate" />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Total Payments" />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row" style={{ flexGrow: 1, padding: '5px 5px 15px 5px' }}>
                <div className="form-portal" style={{flexGrow: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 5}}></div>
                </div>
            </div>

            <RatingScreenPopup
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
})(RatingScreen)