import React, { useState, useRef } from 'react';
import { connect } from "react-redux";
import './EquipmentInformation.css';
import EquipmentInformationPopup from './../../popup/Popup.jsx';
import classnames from 'classnames';
import $ from 'jquery';
import {
    setCarrierPanels,
    setEquipmentInformation
} from "./../../../../../actions";

function EquipmentInformation(props) {
    var delayTimer;
    const refEquipment = useRef();
    const refPopup = useRef();
    const [popupItems, setPopupItems] = useState([]);
    const popupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': popupItems.length > 0
    });
    const popupItemsRef = useRef([]);
    const [popupActiveInput, setPopupActiveInput] = useState('');

    const closePanelBtnClick = () => {
        let index = props.panels.length - 1;

        let panels = props.panels.map((panel, i) => {
            if (panel.name === 'equipment-information') {
                index = i;
                panel.isOpened = false;
            }
            return panel;
        });

        props.setEquipmentInformation({});

        panels.splice(0, 0, panels.splice(index, 1)[0]);
        props.setCarrierPanels(panels);
    }

    const popupItemClick = async (item) => {
        switch (popupActiveInput) {
            case 'equipment':
                props.setEquipmentInformation({ ...props.equipmentInformation, equipment: item, equipment_id: item.id });
                await setPopupItems([]);
                break;
            default:
                break;
        }
    }

    const equipmentOnKeydown = (e) => {
        let key = e.keyCode || e.which;
        let selectedIndex = -1;
        let items = popupItems.map((a, b) => {
            if (a.selected) selectedIndex = b;
            return a;
        });

        if (key === 37 || key === 38) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === 0) {
                        if (b === items.length - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex - 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 39 || key === 40) {
            e.preventDefault();
            if (selectedIndex === -1) {
                // items[0].selected = true;
            } else {
                items = items.map((a, b) => {
                    if (selectedIndex === items.length - 1) {
                        if (b === 0) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    } else {
                        if (b === selectedIndex + 1) {
                            a.selected = true;
                        } else {
                            a.selected = false;
                        }
                    }
                    return a;
                });

                setPopupItems(items);

                popupItemsRef.current.map((r, i) => {
                    if (r && r.classList.contains('selected')) {
                        r.scrollIntoView()
                    }
                    return true;
                });
            }
        }

        if (key === 13) {
            popupItems.map((item, index) => {
                if (item.selected) {

                    props.setEquipmentInformation({ ...props.equipmentInformation, equipment: item });
                    // let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item };


                    // if (!driverPendingSave) {

                    //     if ((driver.first_name || '').trim() !== '') {
                    //         $.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                    //             setDriverPendingSave(true);
                    //             if (res.result === 'OK') {
                    //                 props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                    //                 props.setSelectedDriver({ ...res.driver });
                    //             }
                    //             setDriverPendingSave(false);
                    //         });
                    //     }
                    // }
                }

                return true;
            });

            setPopupItems([]);
        }

        if (key === 9) {
            if (popupItems.length === 0) {
                // if ((props.selectedDriver.equipment_id || 0) === 0) {
                //     props.setSelectedDriver({ ...props.selectedDriver, equipment: {} });
                // } else {
                //     validateDriverForSaving({ keyCode: 9 });
                // }
            } else {
                popupItems.map((item, index) => {
                    if (item.selected) {
                        props.setEquipmentInformation({ ...props.equipmentInformation, equipment: item });
                        // let driver = { ...props.selectedDriver, carrier_id: props.selectedCarrier.id, equipment_id: item.id, equipment: item };
                        // if (!driverPendingSave) {

                        //     if ((driver.first_name || '').trim() !== '') {
                        //         $.post(props.serverUrl + '/saveCarrierDriver', driver).then(res => {
                        //             setDriverPendingSave(true);
                        //             if (res.result === 'OK') {
                        //                 props.setSelectedCarrier({ ...props.selectedCarrier, drivers: res.drivers });
                        //                 props.setSelectedDriver({ ...res.driver });
                        //             }
                        //             setDriverPendingSave(false);
                        //         });
                        //     }
                        // }
                    }

                    return true;
                });

                // validateDriverForSaving({ keyCode: 9 });
                setPopupItems([]);
            }
        }
    }



    const onEquipmentInput = async (e) => {

        window.clearTimeout(delayTimer);
        let equipment = props.equipmentInformation.equipment || {};
        equipment.name = e.target.value.trim();
        await props.setEquipmentInformation({ ...props.equipmentInformation, equipment_id: 0, equipment: equipment });

        setPopupActiveInput('equipment');

        if (e.target.value.trim() === '') {
            await setPopupItems([]);
        } else {
            delayTimer = window.setTimeout(() => {
                $.post(props.serverUrl + '/getEquipments', {
                    name: e.target.value.toLowerCase().trim()
                }).then(async res => {
                    const input = refEquipment.current.getBoundingClientRect();

                    let popup = refPopup.current;

                    const { innerWidth, innerHeight } = window;
                    let parentWidth = $(popup).parent().width();
                    let parentLeft = $(popup).parent().position().left;

                    let screenWSection = parentWidth / 3;
                    let offset = innerWidth - parentWidth - 45;

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

                        if ((input.left - offset) <= (screenWSection * 1)) {
                            popup.childNodes[0].classList.add('right');
                            popup.style.left = (input.left - offset) + 'px';

                            if (input.width < 70) {
                                popup.style.left = ((input.left - offset) - 60 + (input.width / 2)) + 'px';

                                if (input.left < 30) {
                                    popup.childNodes[0].classList.add('corner');
                                    popup.style.left = ((input.left - offset) + (input.width / 2)) + 'px';
                                }
                            }
                        } else if ((input.left - offset) <= (screenWSection * 2)) {
                            popup.style.left = ((input.left - offset) - 100) + 'px';
                        } else if ((input.left - offset) > (screenWSection * 2)) {
                            popup.childNodes[0].classList.add('left');
                            popup.style.left = ((input.left - offset) - 200) + 'px';

                            if ((innerWidth - (input.left - offset)) < 100) {
                                popup.childNodes[0].classList.add('corner');
                                popup.style.left = ((input.left - offset)) - (300 - (input.width / 2)) + 'px';
                            }
                        }
                    }

                    if (res.result === 'OK') {
                        if (res.equipments.length > 0) {
                            let items = res.equipments.map((equipment, i) => {
                                equipment.selected = i === 0;
                                return equipment;
                            });

                            await setPopupItems(e.target.value.trim() === '' ? [] : items);
                        } else {
                            await setPopupItems([]);
                        }
                    }
                });
            }, 300);
        }
    }

    return (
        <div className="panel-content">
            <div className="drag-handler"></div>
            <div className="close-btn" title="Close" onClick={closePanelBtnClick}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div>

            <div className='form-bordered-box' style={{ margin: '20px 0 10px 0', flexGrow: 'initial' }}>
                <div className='form-header'>
                    <div className='top-border top-border-left'></div>
                    <div className='top-border top-border-middle'></div>
                    <div className='top-border top-border-right'></div>
                </div>

                <div className="form-row">
                    <div className="input-box-container input-code">
                        <input type="text" maxLength="8" placeholder="Code"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, code: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, code: e.target.value }) }}
                            value={props.equipmentInformation.code || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Name"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, name: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, name: e.target.value }) }}
                            value={props.equipmentInformation.name || ''}
                        />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row">
                    <div className="input-box-container grow" style={{ position: 'relative' }}>
                        <input type="text" placeholder="Equipment"
                            ref={refEquipment}
                            onKeyDown={equipmentOnKeydown}
                            onInput={onEquipmentInput}
                            onChange={onEquipmentInput}
                            value={props.equipmentInformation.equipment?.name || ''}
                        />
                        <span className="fas fa-chevron-down" style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: `translateY(-50%)`,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}></span>
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container" style={{ width: '10rem' }}>
                        <input type="text" placeholder="Number of Units"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, units: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, units: e.target.value }) }}
                            value={props.equipmentInformation.units || ''}
                        />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row">
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Length"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_length: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_length: e.target.value }) }}
                            value={props.equipmentInformation.equipment_length || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Width"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_width: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_width: e.target.value }) }}
                            value={props.equipmentInformation.equipment_width || ''}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Hieght"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_height: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_height: e.target.value }) }}
                            value={props.equipmentInformation.equipment_height || ''}
                        />
                    </div>
                </div>
            </div>

            <div className='form-bordered-box' style={{ marginBottom: 10 }}>
                <div className='form-header'>
                    <div className='top-border top-border-left'></div>
                    <div className='top-border top-border-middle'></div>
                    <div className='top-border top-border-right'></div>
                </div>
            </div>

            <EquipmentInformationPopup
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
        serverUrl: state.systemReducers.serverUrl,
        panels: state.carrierReducers.panels,
        equipmentInformation: state.carrierReducers.equipmentInformation
    }
}

export default connect(mapStateToProps, {
    setCarrierPanels,
    setEquipmentInformation
})(EquipmentInformation)