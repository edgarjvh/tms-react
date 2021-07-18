import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import { useTransition, useSpring, animated } from 'react-spring';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import Highlighter from "react-highlight-words";

function AdjustRate(props) {

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const [billToRateType, setBillToRateType] = useState({});
    const [carrierChargesRateType, setCarrierChargesRateType] = useState({});

    const refBillToRateTypes = useRef();
    const [billToRateTypeItems, setBillToRateTypeItems] = useState([]);
    const refBillToRateTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setBillToRateTypeItems([]) } });
    const refBillToRateTypePopupItems = useRef([]);

    const refCarrierChargesRateTypes = useRef();
    const [carrierChargesRateTypeItems, setCarrierChargesRateTypeItems] = useState([]);
    const refCarrierChargesRateTypeDropDown = useDetectClickOutside({ onTriggered: async () => { await setCarrierChargesRateTypeItems([]) } });
    const refCarrierChargesRateTypePopupItems = useRef([]);


    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

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
                    <div className="select-box-container" style={{ flexGrow: 1 }}>
                        <div className="select-box-wrapper">
                            <input type="text" placeholder="Rate Type"
                                ref={refBillToRateTypes}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    switch (key) {
                                        case 37: case 38: // arrow left | arrow up
                                            e.preventDefault();
                                            if (billToRateTypeItems.length > 0) {
                                                let selectedIndex = billToRateTypeItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                        if (selectedIndex === 0) {
                                                            item.selected = index === (billToRateTypeItems.length - 1);
                                                        } else {
                                                            item.selected = index === (selectedIndex - 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refBillToRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            } else {
                                                $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
                                                            if (r && r.classList.contains('selected')) {
                                                                r.scrollIntoView({
                                                                    behavior: 'auto',
                                                                    block: 'center',
                                                                    inline: 'nearest'
                                                                })
                                                            }
                                                            return true;
                                                        });
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                            break;

                                        case 39: case 40: // arrow right | arrow down
                                            e.preventDefault();
                                            if (billToRateTypeItems.length > 0) {
                                                let selectedIndex = billToRateTypeItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setBillToRateTypeItems(billToRateTypeItems.map((item, index) => {
                                                        if (selectedIndex === (billToRateTypeItems.length - 1)) {
                                                            item.selected = index === 0;
                                                        } else {
                                                            item.selected = index === (selectedIndex + 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refBillToRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            } else {
                                                $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                            item.selected = (billToRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === billToRateType.id
                                                            return item;
                                                        }))

                                                        refBillToRateTypePopupItems.current.map((r, i) => {
                                                            if (r && r.classList.contains('selected')) {
                                                                r.scrollIntoView({
                                                                    behavior: 'auto',
                                                                    block: 'center',
                                                                    inline: 'nearest'
                                                                })
                                                            }
                                                            return true;
                                                        });
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                            break;

                                        case 27: // escape
                                            setBillToRateTypeItems([]);
                                            break;

                                        case 13: // enter
                                            if (billToRateTypeItems.length > 0 && billToRateTypeItems.findIndex(item => item.selected) > -1) {
                                                setBillToRateType(billToRateTypeItems[billToRateTypeItems.findIndex(item => item.selected)]);
                                                setBillToRateTypeItems([]);
                                                refBillToRateTypes.current.focus();
                                            }
                                            break;

                                        case 9: // tab
                                            if (billToRateTypeItems.length > 0) {
                                                e.preventDefault();
                                                setBillToRateType(billToRateTypeItems[billToRateTypeItems.findIndex(item => item.selected)]);
                                                setBillToRateTypeItems([]);
                                                refBillToRateTypes.current.focus();
                                            }
                                            break;

                                        default:
                                            break;
                                    }
                                }}
                                onBlur={async () => {
                                    if ((billToRateType.id || 0) === 0) {
                                        await setBillToRateType({});
                                    }
                                }}
                                onInput={async (e) => {
                                    await setBillToRateType({
                                        id: 0,
                                        name: e.target.value
                                    });

                                    if (e.target.value.trim() === '') {
                                        setBillToRateTypeItems([]);
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: e.target.value.trim()
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (billToRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === billToRateType.id
                                                    return item;
                                                }))
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }}
                                onChange={async (e) => {
                                    await setBillToRateType({
                                        id: 0,
                                        name: e.target.value
                                    });

                                    if (e.target.value.trim() === '') {
                                        setBillToRateTypeItems([]);
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: e.target.value.trim()
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (billToRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === billToRateType.id
                                                    return item;
                                                }))
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }}
                                value={billToRateType.name || ''}
                            />
                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                if (billToRateTypeItems.length > 0) {
                                    setBillToRateTypeItems([]);
                                } else {
                                    if ((billToRateType.id || 0) === 0 && (billToRateType.name || '') !== '') {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: billToRateType.name
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (billToRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === billToRateType.id
                                                    return item;
                                                }))

                                                refBillToRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                            if (res.result === 'OK') {
                                                await setBillToRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (billToRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === billToRateType.id
                                                    return item;
                                                }))

                                                refBillToRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }

                                refBillToRateTypes.current.focus();
                            }} />
                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={billToRateTypeItems.length > 0}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-load-type"
                                    style={{
                                        ...styles,
                                        left: '0',
                                        display: 'block'
                                    }}
                                    ref={refBillToRateTypeDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                        <div className="mochi-contextual-popup-content" >
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    billToRateTypeItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        const searchValue = (billToRateType.id || 0) === 0 && (billToRateType.name || '') !== ''
                                                            ? billToRateType.name : undefined;

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await setBillToRateType(item);
                                                                    setBillToRateTypeItems([]);
                                                                    refBillToRateTypes.current.focus();
                                                                }}
                                                                ref={ref => refBillToRateTypePopupItems.current.push(ref)}
                                                            >
                                                                {
                                                                    searchValue === undefined
                                                                        ? item.name
                                                                        : <Highlighter
                                                                            highlightClassName="mochi-item-highlight-text"
                                                                            searchWords={[searchValue]}
                                                                            autoEscape={true}
                                                                            textToHighlight={item.name}
                                                                        />
                                                                }
                                                                {
                                                                    item.selected &&
                                                                    <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Transition>
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
                    <div className="form-portal" style={{ flexGrow: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 5 }}></div>
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
                        <div className="input-box-container" style={{ width: '10rem', marginRight: 5 }}>
                            <input type="text" placeholder="Net Profit" />
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
                    <div className="select-box-container" style={{ flexGrow: 1 }}>
                        <div className="select-box-wrapper">
                            <input type="text" placeholder="Rate Type"
                                ref={refCarrierChargesRateTypes}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    switch (key) {
                                        case 37: case 38: // arrow left | arrow up
                                            e.preventDefault();
                                            if (carrierChargesRateTypeItems.length > 0) {
                                                let selectedIndex = carrierChargesRateTypeItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                        if (selectedIndex === 0) {
                                                            item.selected = index === (carrierChargesRateTypeItems.length - 1);
                                                        } else {
                                                            item.selected = index === (selectedIndex - 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            } else {
                                                $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                            if (r && r.classList.contains('selected')) {
                                                                r.scrollIntoView({
                                                                    behavior: 'auto',
                                                                    block: 'center',
                                                                    inline: 'nearest'
                                                                })
                                                            }
                                                            return true;
                                                        });
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                            break;

                                        case 39: case 40: // arrow right | arrow down
                                            e.preventDefault();
                                            if (carrierChargesRateTypeItems.length > 0) {
                                                let selectedIndex = carrierChargesRateTypeItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setCarrierChargesRateTypeItems(carrierChargesRateTypeItems.map((item, index) => {
                                                        if (selectedIndex === (carrierChargesRateTypeItems.length - 1)) {
                                                            item.selected = index === 0;
                                                        } else {
                                                            item.selected = index === (selectedIndex + 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            } else {
                                                $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                            item.selected = (carrierChargesRateType.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === carrierChargesRateType.id
                                                            return item;
                                                        }))

                                                        refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                            if (r && r.classList.contains('selected')) {
                                                                r.scrollIntoView({
                                                                    behavior: 'auto',
                                                                    block: 'center',
                                                                    inline: 'nearest'
                                                                })
                                                            }
                                                            return true;
                                                        });
                                                    }
                                                }).catch(async e => {
                                                    console.log('error getting rate types', e);
                                                })
                                            }
                                            break;

                                        case 27: // escape
                                            setCarrierChargesRateTypeItems([]);
                                            break;

                                        case 13: // enter
                                            if (carrierChargesRateTypeItems.length > 0 && carrierChargesRateTypeItems.findIndex(item => item.selected) > -1) {
                                                setCarrierChargesRateType(carrierChargesRateTypeItems[carrierChargesRateTypeItems.findIndex(item => item.selected)]);
                                                setCarrierChargesRateTypeItems([]);
                                                refCarrierChargesRateTypes.current.focus();
                                            }
                                            break;

                                        case 9: // tab
                                            if (carrierChargesRateTypeItems.length > 0) {
                                                e.preventDefault();
                                                setCarrierChargesRateType(carrierChargesRateTypeItems[carrierChargesRateTypeItems.findIndex(item => item.selected)]);
                                                setCarrierChargesRateTypeItems([]);
                                                refCarrierChargesRateTypes.current.focus();
                                            }
                                            break;

                                        default:
                                            break;
                                    }
                                }}
                                onBlur={async () => {
                                    if ((carrierChargesRateType.id || 0) === 0) {
                                        await setCarrierChargesRateType({});
                                    }
                                }}
                                onInput={async (e) => {
                                    await setCarrierChargesRateType({
                                        id: 0,
                                        name: e.target.value
                                    });

                                    if (e.target.value.trim() === '') {
                                        setCarrierChargesRateTypeItems([]);
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: e.target.value.trim()
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === carrierChargesRateType.id
                                                    return item;
                                                }))
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }}
                                onChange={async (e) => {
                                    await setCarrierChargesRateType({
                                        id: 0,
                                        name: e.target.value
                                    });

                                    if (e.target.value.trim() === '') {
                                        setCarrierChargesRateTypeItems([]);
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: e.target.value.trim()
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === carrierChargesRateType.id
                                                    return item;
                                                }))
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }}
                                value={carrierChargesRateType.name || ''}
                            />
                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                if (carrierChargesRateTypeItems.length > 0) {
                                    setCarrierChargesRateTypeItems([]);
                                } else {
                                    if ((carrierChargesRateType.id || 0) === 0 && (carrierChargesRateType.name || '') !== '') {
                                        $.post(props.serverUrl + '/getRateTypes', {
                                            name: carrierChargesRateType.name
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === carrierChargesRateType.id
                                                    return item;
                                                }))

                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    } else {
                                        $.post(props.serverUrl + '/getRateTypes').then(async res => {
                                            if (res.result === 'OK') {
                                                await setCarrierChargesRateTypeItems(res.rate_types.map((item, index) => {
                                                    item.selected = (carrierChargesRateType.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === carrierChargesRateType.id
                                                    return item;
                                                }))

                                                refCarrierChargesRateTypePopupItems.current.map((r, i) => {
                                                    if (r && r.classList.contains('selected')) {
                                                        r.scrollIntoView({
                                                            behavior: 'auto',
                                                            block: 'center',
                                                            inline: 'nearest'
                                                        })
                                                    }
                                                    return true;
                                                });
                                            }
                                        }).catch(async e => {
                                            console.log('error getting rate types', e);
                                        })
                                    }
                                }

                                refCarrierChargesRateTypes.current.focus();
                            }} />

                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={carrierChargesRateTypeItems.length > 0}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-load-type"
                                    style={{
                                        ...styles,
                                        left: '0',
                                        display: 'block'
                                    }}
                                    ref={refCarrierChargesRateTypeDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right" style={{ height: 150 }}>
                                        <div className="mochi-contextual-popup-content" >
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    carrierChargesRateTypeItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        const searchValue = (carrierChargesRateType.id || 0) === 0 && (carrierChargesRateType.name || '') !== ''
                                                            ? carrierChargesRateType.name : undefined;

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await setCarrierChargesRateType(item);
                                                                    setCarrierChargesRateTypeItems([]);
                                                                    refCarrierChargesRateTypes.current.focus();
                                                                }}
                                                                ref={ref => refCarrierChargesRateTypePopupItems.current.push(ref)}
                                                            >
                                                                {
                                                                    searchValue === undefined
                                                                        ? item.name
                                                                        : <Highlighter
                                                                            highlightClassName="mochi-item-highlight-text"
                                                                            searchWords={[searchValue]}
                                                                            autoEscape={true}
                                                                            textToHighlight={item.name}
                                                                        />
                                                                }
                                                                {
                                                                    item.selected &&
                                                                    <FontAwesomeIcon className="dropdown-selected" icon={faCaretRight} />
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Transition>
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
                    <div className="form-portal" style={{ flexGrow: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 5 }}></div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(AdjustRate)