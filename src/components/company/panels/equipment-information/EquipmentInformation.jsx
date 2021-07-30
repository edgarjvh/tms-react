import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import './EquipmentInformation.css';
import EquipmentInformationPopup from './../popup/Popup.jsx';
import classnames from 'classnames';
import $ from 'jquery';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faCalendarAlt, faPencilAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";
import Highlighter from "react-highlight-words";

function EquipmentInformation(props) {
    const refEquipment = useRef();
    const refEquipmentCarrierCode = useRef();

    const [equipmentDropdownItems, setEquipmentDropdownItems] = useState([]);
    const refEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setEquipmentDropdownItems([]) } });
    const refEquipmentPopupItems = useRef([]);

    const [isSavingEquipmentInformation, setIsSavingEquipmentInformation] = useState(false);

    useEffect(() => {
        if (isSavingEquipmentInformation) {
            let equipmentInformation = { ...props.equipmentInformation };
            let carrier = props.equipmentInformation?.carrier || {};
            let equipment = props.equipmentInformation?.equipment || {};

            equipmentInformation.carrier_id = carrier.id || 0;
            equipmentInformation.equipment_id = equipment.id || 0;

            if (equipmentInformation.carrier_id > 0 &&
                equipmentInformation.equipment_id > 0 &&
                (equipmentInformation.units || '').trim() !== '' &&
                (equipmentInformation.equipment_length || '').trim() !== '' &&
                (equipmentInformation.equipment_width || '').trim() !== '' &&
                (equipmentInformation.equipment_height || '').trim() !== '') {

                $.post(props.serverUrl + '/saveCarrierEquipment', equipmentInformation).then(async res => {
                    if (res.result === 'OK') {
                        await props.setEquipmentInformation({
                            ...props.equipmentInformation,
                            carrier: {
                                ...props.equipmentInformation.carrier,
                                equipments_information: res.equipments_information
                            },
                            id: 0,
                            equipment_id: 0,
                            equipment: {},
                            units: '',
                            equipment_length: '',
                            equipment_width: '',
                            equipment_height: ''
                        });

                        refEquipment.current.focus();
                    }
                    setIsSavingEquipmentInformation(false);
                }).catch(async e => {
                    console.log('error on saving carrier equipment information', e);
                    setIsSavingEquipmentInformation(false);
                });
            }
        }
    }, [isSavingEquipmentInformation]);

    const closePanelBtnClick = (e, name) => {
        props.setEquipmentInformation({});

        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
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
                                carrier: {
                                    id: res.carriers[0].id,
                                    code: res.carriers[0].code,
                                    code_number: res.carriers[0].code_number,
                                    name: res.carriers[0].name,
                                    equipments_information: res.carriers[0].equipments_information
                                }
                            });

                            refEquipment.current.focus();

                            // await res.carriers[0].contacts.map(async c => {
                            //     if (c.is_primary === 1) {
                            //         await props.setSelectedCarrierContact(c);
                            //     }
                            //     return true;
                            // });

                            // await props.setSelectedDriver({});
                            // await props.setSelectedInsurance({});
                        } else {
                            await props.setEquipmentInformation({
                                ...props.equipmentInformation,
                                carrier: {
                                    ...props.equipmentInformation.carrier,
                                    id: 0,
                                    code_number: 0,
                                    name: '',
                                    equipments_information: []
                                },
                                id: 0,
                                equipment_id: 0,
                                equipment: {},
                                units: '',
                                equipment_length: '',
                                equipment_width: '',
                                equipment_height: ''
                            });
                        }
                    }
                });
            }else{
                props.setEquipmentInformation({
                    ...props.equipmentInformation,
                    carrier: {
                        ...props.equipmentInformation.carrier,
                        id: 0,
                        code_number: 0,
                        name: '',
                        equipments_information: []
                    },
                    id: 0,
                    equipment_id: 0,
                    equipment: {},
                    units: '',
                    equipment_length: '',
                    equipment_width: '',
                    equipment_height: ''
                });
            }
        }
    }

    const validateEquipmentForSaving = (e) => {
        let key = e.keyCode || e.which;

        if (key === 9) {
            if (!isSavingEquipmentInformation) {
                e.preventDefault();
                setIsSavingEquipmentInformation(true);
            } else {
                e.preventDefault();
                refEquipmentCarrierCode.current.focus();
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
                            ref={refEquipmentCarrierCode}
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
                            readOnly={true}
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
                        <input type="text" placeholder="Height"
                            onKeyDown={validateEquipmentForSaving}
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

                <div className="equipment-list-box">
                    {
                        (props.equipmentInformation?.carrier?.equipments_information || []).length > 0 &&
                        <div className="equipment-list-header">
                            <div className="equipment-list-col tcol equipment">Equipment</div>
                            <div className="equipment-list-col tcol units">Number of Units</div>
                            <div className="equipment-list-col tcol equipment_length">Length</div>
                            <div className="equipment-list-col tcol equipment_width">Width</div>
                            <div className="equipment-list-col tcol equipment_height">Height</div>
                        </div>
                    }

                    <div className="equipment-list-wrapper">
                        {
                            (props.equipmentInformation?.carrier?.equipments_information || []).map((eq, index) => {
                                const itemClasses = classnames({
                                    'equipment-list-item': true,
                                    'selected': eq.id === props.equipmentInformation.id
                                })
                                return (
                                    <div className='equipment-list-item' key={index} onClick={() => {
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            id: eq.id,
                                            equipment: eq.equipment,
                                            equipment_id: eq.equipment.id,
                                            units: eq.units,
                                            equipment_length: eq.equipment_length,
                                            equipment_width: eq.equipment_width,
                                            equipment_height: eq.equipment_height
                                        });

                                        refEquipment.current.focus();
                                    }}>
                                        <div className="equipment-list-col tcol equipment">{eq.equipment.name}</div>
                                        <div className="equipment-list-col tcol units">{eq.units}</div>
                                        <div className="equipment-list-col tcol equipment_length">{eq.equipment_length}</div>
                                        <div className="equipment-list-col tcol equipment_width">{eq.equipment_width}</div>
                                        <div className="equipment-list-col tcol equipment_height">{eq.equipment_height}</div>
                                        {
                                            (eq.id === props.equipmentInformation.id) &&
                                            <div className="equipment-list-col tcol equipment-selected">
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(EquipmentInformation)