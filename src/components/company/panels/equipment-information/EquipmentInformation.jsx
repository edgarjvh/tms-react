import React, { useState, useRef } from 'react';
import { connect } from "react-redux";
import './EquipmentInformation.css';
import EquipmentInformationPopup from './../popup/Popup.jsx';
import classnames from 'classnames';
import $ from 'jquery';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import Highlighter from "react-highlight-words";

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

    const [equipmentDropdownItems, setEquipmentDropdownItems] = useState([]);
    const refEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setEquipmentDropdownItems([]) } });
    const refEquipmentPopupItems = useRef([]);

    const closePanelBtnClick = (e, name) => {
        props.setEquipmentInformation({});

        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
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

    const searchCarrierByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                $.post(props.serverUrl + '/carriers', {
                    code: e.target.value.toLowerCase()
                }).then(async res => {
                    if (res.result === 'OK') {
                        if (res.carriers.length > 0) {
                            await props.setEquipmentInformation({
                                ...props.equipmentInformation,
                                carrier: res.carriers[0]
                            });

                            // await res.carriers[0].contacts.map(async c => {
                            //     if (c.is_primary === 1) {
                            //         await props.setSelectedCarrierContact(c);
                            //     }
                            //     return true;
                            // });

                            // await props.setSelectedDriver({});
                            // await props.setSelectedInsurance({});
                        }
                    }
                });
            }
        }
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className='form-bordered-box' style={{ margin: '20px 0 10px 0', flexGrow: 'initial' }}>
                <div className='form-header'>
                    <div className='top-border top-border-left'></div>
                    <div className='top-border top-border-middle'></div>
                    <div className='top-border top-border-right'></div>
                </div>

                <div className="form-row">
                    <div className="input-box-container input-code">
                        <input type="text" maxLength="8" placeholder="Code"
                            onKeyDown={searchCarrierByCode}
                            onInput={e => {
                                props.setEquipmentInformation({
                                    ...props.equipmentInformation, carrier: {
                                        ...props.equipmentInformation.carrier,
                                        code: e.target.value
                                    }
                                })
                            }}
                            onChange={e => {
                                props.setEquipmentInformation({
                                    ...props.equipmentInformation, carrier: {
                                        ...props.equipmentInformation.carrier,
                                        code: e.target.value
                                    }
                                })
                            }}
                            value={(props.equipmentInformation?.carrier?.code_number || 0) === 0 ? (props.equipmentInformation?.carrier?.code || '') : props.equipmentInformation?.carrier?.code + props.equipmentInformation?.carrier?.code_number}
                        />
                    </div>
                    <div className="form-h-sep"></div>
                    <div className="input-box-container grow">
                        <input type="text" placeholder="Name"
                            onInput={e => {
                                props.setEquipmentInformation({
                                    ...props.equipmentInformation, carrier: {
                                        ...props.equipmentInformation.carrier,
                                        name: e.target.value
                                    }
                                })
                            }}
                            onChange={e => {
                                props.setEquipmentInformation({
                                    ...props.equipmentInformation, carrier: {
                                        ...props.equipmentInformation.carrier,
                                        name: e.target.value
                                    }
                                })
                            }}
                            value={props.equipmentInformation?.carrier?.name || ''}
                        />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row">
                    <div className="select-box-container" style={{ flexGrow: 1 }}>
                        <div className="select-box-wrapper">
                            <input type="text" placeholder="Equipment"
                                ref={refEquipment}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    switch (key) {
                                        case 37: case 38: // arrow left | arrow up
                                            e.preventDefault();
                                            if (equipmentDropdownItems.length > 0) {
                                                let selectedIndex = equipmentDropdownItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setEquipmentDropdownItems(equipmentDropdownItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setEquipmentDropdownItems(equipmentDropdownItems.map((item, index) => {
                                                        if (selectedIndex === 0) {
                                                            item.selected = index === (equipmentDropdownItems.length - 1);
                                                        } else {
                                                            item.selected = index === (selectedIndex - 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refEquipmentPopupItems.current.map((r, i) => {
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
                                                $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                            item.selected = (props.equipmentInformation?.equipment?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.equipmentInformation.equipment.id
                                                            return item;
                                                        }))

                                                        refEquipmentPopupItems.current.map((r, i) => {
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
                                                    console.log('error getting driver equipments', e);
                                                })
                                            }
                                            break;

                                        case 39: case 40: // arrow right | arrow down
                                            e.preventDefault();
                                            if (equipmentDropdownItems.length > 0) {
                                                let selectedIndex = equipmentDropdownItems.findIndex(item => item.selected);

                                                if (selectedIndex === -1) {
                                                    await setEquipmentDropdownItems(equipmentDropdownItems.map((item, index) => {
                                                        item.selected = index === 0;
                                                        return item;
                                                    }))
                                                } else {
                                                    await setEquipmentDropdownItems(equipmentDropdownItems.map((item, index) => {
                                                        if (selectedIndex === (equipmentDropdownItems.length - 1)) {
                                                            item.selected = index === 0;
                                                        } else {
                                                            item.selected = index === (selectedIndex + 1)
                                                        }
                                                        return item;
                                                    }))
                                                }

                                                refEquipmentPopupItems.current.map((r, i) => {
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
                                                $.post(props.serverUrl + '/getEquipments').then(async res => {
                                                    if (res.result === 'OK') {
                                                        await setEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                            item.selected = (props.equipmentInformation?.equipment?.id || 0) === 0
                                                                ? index === 0
                                                                : item.id === props.equipmentInformation.equipment.id
                                                            return item;
                                                        }))

                                                        refEquipmentPopupItems.current.map((r, i) => {
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
                                                    console.log('error getting driver equipments', e);
                                                })
                                            }
                                            break;

                                        case 27: // escape
                                            setEquipmentDropdownItems([]);
                                            break;

                                        case 13: // enter
                                            if (equipmentDropdownItems.length > 0 && equipmentDropdownItems.findIndex(item => item.selected) > -1) {
                                                await props.setEquipmentInformation({
                                                    ...props.equipmentInformation,
                                                    equipment: equipmentDropdownItems[equipmentDropdownItems.findIndex(item => item.selected)]
                                                });
                                                setEquipmentDropdownItems([]);
                                                refEquipment.current.focus();
                                            }
                                            break;

                                        case 9: // tab
                                            if (equipmentDropdownItems.length > 0) {
                                                e.preventDefault();
                                                await props.setEquipmentInformation({
                                                    ...props.equipmentInformation,
                                                    equipment: equipmentDropdownItems[equipmentDropdownItems.findIndex(item => item.selected)]
                                                });
                                                setEquipmentDropdownItems([]);
                                                refEquipment.current.focus();
                                            }
                                            break;

                                        default:
                                            break;
                                    }
                                }}
                                onBlur={async () => {
                                    if ((props.equipmentInformation?.equipment?.id || 0) === 0) {
                                        await props.setEquipmentInformation({ ...props.equipmentInformation, equipment: {} });
                                    }
                                }}
                                onInput={async (e) => {
                                    let equipment = props.equipmentInformation?.equipment || {};
                                    equipment.id = 0;
                                    equipment.name = e.target.value;
                                    await props.setEquipmentInformation({ ...props.equipmentInformation, equipment: equipment });

                                    if (e.target.value.trim() === '') {
                                        setEquipmentDropdownItems([]);
                                    } else {
                                        $.post(props.serverUrl + '/getEquipments', {
                                            name: e.target.value.trim()
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                    item.selected = (props.equipmentInformation?.equipment?.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === props.equipmentInformation.equipment.id
                                                    return item;
                                                }))
                                            }
                                        }).catch(async e => {
                                            console.log('error getting equipments', e);
                                        })
                                    }
                                }}
                                onChange={async (e) => {
                                    let equipment = props.equipmentInformation?.equipment || {};
                                    equipment.id = 0;
                                    equipment.name = e.target.value;
                                    await props.setEquipmentInformation({ ...props.equipmentInformation, equipment: equipment });
                                }}
                                value={props.equipmentInformation?.equipment?.name || ''}
                            />
                            <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                if (equipmentDropdownItems.length > 0) {
                                    setEquipmentDropdownItems([]);
                                } else {
                                    if ((props.equipmentInformation?.equipment?.id || 0) === 0 && (props.equipmentInformation?.equipment?.name || '') !== '') {
                                        $.post(props.serverUrl + '/getEquipments', {
                                            name: props.equipmentInformation?.equipment.name
                                        }).then(async res => {
                                            if (res.result === 'OK') {
                                                await setEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                    item.selected = (props.equipmentInformation?.equipment?.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === props.equipmentInformation.equipment.id
                                                    return item;
                                                }))

                                                refEquipmentPopupItems.current.map((r, i) => {
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
                                            console.log('error getting equipments', e);
                                        })
                                    } else {
                                        $.post(props.serverUrl + '/getEquipments').then(async res => {
                                            if (res.result === 'OK') {
                                                await setEquipmentDropdownItems(res.equipments.map((item, index) => {
                                                    item.selected = (props.equipmentInformation?.equipment?.id || 0) === 0
                                                        ? index === 0
                                                        : item.id === props.equipmentInformation.equipment.id
                                                    return item;
                                                }))

                                                refEquipmentPopupItems.current.map((r, i) => {
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
                                            console.log('error getting equipments', e);
                                        })
                                    }
                                }

                                refEquipment.current.focus();
                            }} />
                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={equipmentDropdownItems.length > 0}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-equipment"
                                    style={{
                                        ...styles,
                                        left: 0,
                                        display: 'block'
                                    }}
                                    ref={refEquipmentDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right">
                                        <div className="mochi-contextual-popup-content">
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    equipmentDropdownItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        const searchValue = (props.equipmentInformation?.equipment?.id || 0) === 0 && (props.equipmentInformation?.equipment?.name || '') !== ''
                                                            ? props.equipmentInformation?.equipment?.name : undefined;

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await props.setEquipmentInformation({ ...props.equipmentInformation, equipment: item });
                                                                    setEquipmentDropdownItems([]);
                                                                    refEquipment.current.focus();
                                                                }}
                                                                ref={ref => refEquipmentPopupItems.current.push(ref)}
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

export default connect(null, null)(EquipmentInformation)