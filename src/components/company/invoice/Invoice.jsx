import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import './Invoice.css';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';
import InvoicePopup from './popup/Popup.jsx';
import moment from 'moment';
import PanelContainer from './panels/panel-container/PanelContainer.jsx';
import { 
    setSelectedDocument, 
    setInvoicePanels, 
    setDocumentTags, 
    setSelectedDocumentNote,
    setInvoiceOpenedPanels
 } from './../../../actions/invoiceActions';

function Invoice(props) {
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

    const [equipmentsItems, setEquipmentsItems] = useState([
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

    const [termsItems, setTermsItems] = useState([
        {
            id: 1,
            name: 'Term 1',
            selected: false
        },
        {
            id: 2,
            name: 'Term 2',
            selected: false
        },
        {
            id: 3,
            name: 'Term 3',
            selected: false
        }
    ]);

    const [billToRateType, setBillToRateType] = useState({});
    const [carrierChargesRateType, setCarrierChargesRateType] = useState({});
    const [equipment, setEquipment] = useState({});
    const [term, setTerm] = useState({});
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
    const refEquipments = useRef();
    const refTerms = useRef();

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
            case 'equipment':
                setEquipment(item);
                await setPopupItems([]);
                break;
            case 'term':
                setTerm(item);
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

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
                popup.childNodes[0].classList.add('below');
                popup.style.top = (input.top + 10) + 'px';
            }

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = input.left + 'px';

                if (input.width < 70) {
                    popup.style.left = (input.left - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = (input.left + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = (input.left - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = (input.left - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px';
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

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
                popup.childNodes[0].classList.add('below');
                popup.style.top = (input.top + 10) + 'px';
            }

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = input.left + 'px';

                if (input.width < 70) {
                    popup.style.left = (input.left - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = (input.left + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = (input.left - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = (input.left - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px';
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

    const onEquipmentKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('equipment');

        const input = refEquipments.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
                popup.childNodes[0].classList.add('below');
                popup.style.top = (input.top + 10) + 'px';
            }

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = input.left + 'px';

                if (input.width < 70) {
                    popup.style.left = (input.left - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = (input.left + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = (input.left - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = (input.left - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px';
                }
            }
        }

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                equipmentsItems.map((item, index) => {
                    if (item.name === (equipment.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(equipmentsItems.map((item, index) => {
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
                        setEquipment(item);
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

    const onTermsKeydown = (e) => {
        let key = e.key.toLowerCase();

        setPopupActiveInput('term');

        const input = refTerms.current.getBoundingClientRect();

        let popup = refPopup.current;

        const { innerWidth, innerHeight } = window;

        let screenWSection = innerWidth / 3;

        if (popup) {
            popup.childNodes[0].className = 'mochi-contextual-popup';
            popup.childNodes[0].classList.add('vertical');

            if ((innerHeight - 170 - 30) <= input.top) {
                popup.childNodes[0].classList.add('above');
                popup.style.top = (input.top - 175 - input.height) + 'px';
            }

            if ((innerHeight - 170 - 30) > input.top) {
                popup.childNodes[0].classList.add('below');
                popup.style.top = (input.top + 10) + 'px';
            }

            if (input.left <= (screenWSection * 1)) {
                popup.childNodes[0].classList.add('right');
                popup.style.left = input.left + 'px';

                if (input.width < 70) {
                    popup.style.left = (input.left - 60 + (input.width / 2)) + 'px';

                    if (input.left < 30) {
                        popup.childNodes[0].classList.add('corner');
                        popup.style.left = (input.left + (input.width / 2)) + 'px';
                    }
                }
            } else if (input.left <= (screenWSection * 2)) {
                popup.style.left = (input.left - 100) + 'px';
            } else if (input.left > (screenWSection * 2)) {
                popup.childNodes[0].classList.add('left');
                popup.style.left = (input.left - 200) + 'px';

                if ((innerWidth - input.left) < 100) {
                    popup.childNodes[0].classList.add('corner');
                    popup.style.left = (input.left) - (300 - (input.width / 2)) + 'px';
                }
            }
        }

        let selectedIndex = -1;

        if (popupItems.length === 0) {
            if (key !== 'tab') {
                termsItems.map((item, index) => {
                    if (item.name === (term.name || '')) {
                        selectedIndex = index;
                    }
                    return true;
                });

                setPopupItems(termsItems.map((item, index) => {
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
                        setTerm(item);
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
        <div className="invoice-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <PanelContainer panels={props.panels} />

            <div className="fields-container-col" style={{width: '60%'}}>
                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 25 }}>
                    <div className="form-bordered-box" style={{
                        borderBottom: 0,
                        borderRight: 0,
                        boxShadow: 'none'
                    }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Bill To</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Reviewed</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button" onClick={() => {
                                    props.setSelectedDocument({
                                        id: 0,
                                        user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                        date_entered: moment().format('MM/DD/YYYY')
                                    });
                                
                                    if (!props.invoiceOpenedPanels.includes('documents')) {
                                        props.setInvoiceOpenedPanels([...props.invoiceOpenedPanels, 'documents']);
                                    }
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Docs</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Invoice</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
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
                                    <input type="text" placeholder="Total Charges" />
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
                            <div className="form-portal"></div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 10, marginRight: 10, width: '15rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Order Number" />
                        </div>

                        <div className="input-box-container grow" style={{ marginBottom: 10 }}>
                            <input type="text" placeholder="Trip Number" />
                        </div>

                        <div className='form-bordered-box'>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Docs</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='top-border top-border-right'></div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 10 }}>
                    <div className="form-bordered-box" style={{ borderRight: 0, borderBottom: 0, boxShadow: 'none' }}>
                        <div className="form-header">
                            <div className="top-border top-border-left"></div>
                            <div className="form-title">Carrier Charges</div>
                            <div className="top-border top-border-middle"></div>
                            <div className="form-buttons">
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Previewed</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Invoice Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">BOL Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Rate Conf Rec'd</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Add Documents</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Approved</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div>
                            <div className="top-border top-border-right"></div>
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
                                <div className="input-box-container" style={{ width: '10rem' }}>
                                    <input type="text" placeholder="Gross Profit" />
                                </div>
                                <div className="form-h-sep"></div>
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

                        <div className="form-row">
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
                            <div className="form-portal"></div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 10, marginRight: 10, width: '15rem', display: 'flex', flexDirection: 'column' }}>
                        <div className='form-bordered-box'>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Docs</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='top-border top-border-right'></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="fields-container-col" style={{width: '40%'}}>
                <div className="fields-container-row" style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className='form-bordered-box'>
                            <div className='form-header'>
                                <div className='top-border top-border-left'></div>
                                <div className='form-title'>Bill To</div>
                                <div className='top-border top-border-middle'></div>
                                <div className='form-buttons'>
                                    <div className='mochi-button'>
                                        <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                        <div className='mochi-button-base'>Customer info</div>
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
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 1" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Address 2" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="City" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-state">
                                    <input type="text" placeholder="State" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-zip-code">
                                    <input type="text" placeholder="Postal Code" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="Contact Name" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone">
                                    <MaskedInput
                                        mask={[/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        guide={true}
                                        type="text" placeholder="Contact Phone" />
                                </div>
                                <div className="form-h-sep"></div>
                                <div className="input-box-container input-phone-ext">
                                    <input type="text" placeholder="Ext" />
                                </div>
                            </div>
                            <div className="form-v-sep"></div>
                            <div className="form-row">
                                <div className="input-box-container grow">
                                    <input type="text" placeholder="E-Mail" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>Print Invoice</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>E-Mail Invoice</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="mochi-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base" style={{ fontSize: '1.2rem' }}>Batch Billing</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Date Received" />
                        </div>
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Check Number" />
                        </div>
                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <div className='form-bordered-box' style={{ border: 0, boxShadow: 'none' }}>
                        <div className="form-row">
                            <div className="input-box-container grow">
                                <input type="text" placeholder="BOL Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Ref Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="PO Number" />
                            </div>
                            <div className="form-h-sep"></div>
                            <div className="input-box-container grow">
                                <input type="text" placeholder="Seal Number" />
                            </div>
                        </div>

                    </div>

                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10 }}>

                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', flexGrow: 1, marginBottom: 10 }}>
                    <div className='form-bordered-box' style={{ marginRight: 10 }}>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Internal Notes</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>
                    </div>
                    <div className='form-bordered-box'>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Billing Notes (Will appear on Invoice)</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='top-border top-border-right'></div>
                        </div>
                    </div>
                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10 }}>

                    </div>
                </div>

                <div className="fields-container-row" style={{ display: 'flex', marginBottom: 10 }}>
                    <div className='form-bordered-box'>
                        <div className='form-header'>
                            <div className='top-border top-border-left'></div>
                            <div className='form-title'>Carrier</div>
                            <div className='top-border top-border-middle'></div>
                            <div className='form-buttons'>
                                <div className='mochi-button'>
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
                                    ref={refEquipments}
                                    onKeyDown={onEquipmentKeydown}
                                    onChange={() => { }}
                                    value={equipment.name || ''}
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
                        <div className="form-row" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flexGrow: 1, alignItems: 'center' }}>
                            <div className='mochi-button'>
                                <div className='mochi-button-decorator mochi-button-decorator-left'>(</div>
                                <div className='mochi-button-base'>E-mail Rate Confirmation to Carrier</div>
                                <div className='mochi-button-decorator mochi-button-decorator-right'>)</div>
                            </div>
                        </div>
                    </div>
                    <div className='fixed' style={{ minWidth: '10rem', paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Date Paid" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Check Number" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Invoice Rec'd Date" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2 }}>
                            <input type="text" placeholder="Invoice Number" />
                        </div>
                        <div className="input-box-container grow" style={{ marginBottom: 2, position: 'relative' }}>
                            <input type="text" placeholder="Terms"
                                ref={refTerms}
                                onKeyDown={onTermsKeydown}
                                onChange={() => { }}
                                value={term.name || ''}
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
                        <div className="input-box-container grow">
                            <input type="text" placeholder="Pay By Date" />
                        </div>
                    </div>
                </div>
            </div>

            <InvoicePopup
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
        panels: state.invoiceReducers.panels,
        invoiceOpenedPanels: state.invoiceReducers.invoiceOpenedPanels
    }
}

export default connect(mapStateToProps, {
    setSelectedDocument,
    setInvoicePanels,
    setDocumentTags,
    setSelectedDocumentNote,
    setInvoiceOpenedPanels
})(Invoice)