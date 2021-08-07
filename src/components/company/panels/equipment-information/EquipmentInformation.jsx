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
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

function EquipmentInformation(props) {
    const refEquipmentCarrierCode = useRef();

    const refEquipment = useRef();
    const [equipmentDropdownItems, setEquipmentDropdownItems] = useState([]);
    const refEquipmentDropDown = useDetectClickOutside({ onTriggered: async () => { await setEquipmentDropdownItems([]) } });
    const refEquipmentPopupItems = useRef([]);

    const refLength = useRef();
    const [lengthDropdownItems, setLengthDropdownItems] = useState([
        {
            id: 1,
            name: 'Feet',
            value: 'ft',
            selected: false
        },
        {
            id: 2,
            name: 'Inches',
            value: 'in',
            selected: false
        }
    ]);
    const refLengthDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowLengthDropdownItems(false) } });
    const refLengthPopupItems = useRef([]);
    const [showLengthDropdownItems, setShowLengthDropdownItems] = useState(false);

    const refWidth = useRef();
    const [widthDropdownItems, setWidthDropdownItems] = useState([
        {
            id: 1,
            name: 'Feet',
            value: 'ft',
            selected: false
        },
        {
            id: 2,
            name: 'Inches',
            value: 'in',
            selected: false
        }
    ]);
    const refWidthDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowWidthDropdownItems(false) } });
    const refWidthPopupItems = useRef([]);
    const [showWidthDropdownItems, setShowWidthDropdownItems] = useState(false);

    const refHeight = useRef();
    const [heightDropdownItems, setHeightDropdownItems] = useState([
        {
            id: 1,
            name: 'Feet',
            value: 'ft',
            selected: false
        },
        {
            id: 2,
            name: 'Inches',
            value: 'in',
            selected: false
        }
    ]);
    const refHeightDropDown = useDetectClickOutside({ onTriggered: async () => { await setShowHeightDropdownItems(false) } });
    const refHeightPopupItems = useRef([]);
    const [showHeightDropdownItems, setShowHeightDropdownItems] = useState(false);

    const [isSavingEquipmentInformation, setIsSavingEquipmentInformation] = useState(false);

    useEffect(() => {
        if (isSavingEquipmentInformation) {
            let equipmentInformation = { ...props.equipmentInformation };
            let carrier = props.equipmentInformation?.carrier || {};
            let equipment = props.equipmentInformation?.equipment || {};

            equipmentInformation.carrier_id = carrier.id || 0;
            equipmentInformation.equipment_id = equipment.id || 0;

            if (equipmentInformation.carrier_id > 0 &&
                equipmentInformation.equipment_id > 0) {

                $.post(props.serverUrl + '/saveCarrierEquipment', equipmentInformation).then(async res => {
                    if (res.result === 'OK') {
                        await props.setEquipmentInformation({
                            ...props.equipmentInformation,
                            carrier: {
                                ...props.equipmentInformation.carrier,
                                equipments_information: res.equipments_information
                            },
                            id: null,
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
            } else {
                setIsSavingEquipmentInformation(false);
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
            } else {
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
                setIsSavingEquipmentInformation(false);
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
                    <div className="form-buttons">
                        <div className="mochi-button" onClick={() => {
                            props.setEquipmentInformation({
                                ...props.equipmentInformation,
                                id: null,
                                equipment: {},
                                equipment_id: null,
                                units: '',
                                equipment_length: '',
                                equipment_length_unit: '',
                                equipment_width: '',
                                equipment_width_unit: '',
                                equipment_height: '',
                                equipment_height_unit: '',
                            });

                            refEquipment.current.focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Clear</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>
                    <div className='top-border top-border-right'></div>
                </div>

                <div className="form-row">
                    <div className="input-box-container input-code">
                        <input tabIndex={1 + props.tabTimes} type="text" maxLength="8" placeholder="Code"
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
                        <input tabIndex={2 + props.tabTimes} type="text" placeholder="Name"
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
                            <input tabIndex={3 + props.tabTimes} type="text" placeholder="Equipment"
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
                    <div className="input-box-container" style={{ width: '10rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Number of Units</div>
                        <input tabIndex={4 + props.tabTimes} style={{ textAlign: 'right', fontWeight: 'bold' }} type="text"
                            onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, units: e.target.value }) }}
                            onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, units: e.target.value }) }}
                            value={props.equipmentInformation.units || ''}
                        />
                    </div>
                </div>
                <div className="form-v-sep"></div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: 2 }}>
                    <div className="select-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="select-box-wrapper">
                            <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Length</div>
                            <input style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                paddingRight: (props.equipmentInformation?.equipment_length || '').trim().length > 0 ? 25 : 0
                            }}
                                tabIndex={5 + props.tabTimes} type="text"
                                guide={false}
                                ref={refLength}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    if (key === 70) {
                                        e.preventDefault();

                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_length_unit: 'ft'
                                        })
                                    } else if (key === 73) {
                                        e.preventDefault();
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_length_unit: 'in'
                                        })
                                    } else if (key === 38) {
                                        e.preventDefault();
                                        if (showLengthDropdownItems) {
                                            let selectedIndex = lengthDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                    if (selectedIndex === 0) {
                                                        item.selected = index === (lengthDropdownItems.length - 1);
                                                    } else {
                                                        item.selected = index === (selectedIndex - 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_length_unit === item.value
                                                return item;
                                            }))

                                            await setShowLengthDropdownItems(true);
                                        }

                                        refLengthPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 40) {
                                        e.preventDefault();
                                        if (showLengthDropdownItems) {
                                            let selectedIndex = lengthDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                    if (selectedIndex === (lengthDropdownItems.length - 1)) {
                                                        item.selected = index === 0;
                                                    } else {
                                                        item.selected = index === (selectedIndex + 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_length_unit === item.value
                                                return item;
                                            }))

                                            await setShowLengthDropdownItems(true);
                                        }

                                        refLengthPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 27) {
                                        await setShowLengthDropdownItems(false);
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_length_unit: ''
                                        })
                                    } else if (key === 13) {
                                        if (showLengthDropdownItems && lengthDropdownItems.findIndex(item => item.selected) > -1) {
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_length_unit: lengthDropdownItems[lengthDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowLengthDropdownItems(false);
                                            refLength.current.focus();
                                        }
                                    } else if (key === 9) {
                                        if (showLengthDropdownItems) {
                                            e.preventDefault();
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_length_unit: lengthDropdownItems[lengthDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowLengthDropdownItems(false);
                                            refLength.current.focus();
                                        }
                                    } else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {

                                    } else if (key === 8 || key === 46) {

                                    } else {
                                        e.preventDefault();
                                    }
                                }}

                                onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_length: e.target.value }) }}
                                onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_length: e.target.value }) }}
                                value={props.equipmentInformation.equipment_length || ''}
                            />
                            {
                                (props.equipmentInformation?.equipment_length || '').trim().length > 0 &&
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '18px',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'Mochi Med Oblique',
                                    fontWeight: 'bold'
                                }}>{props.equipmentInformation?.equipment_length_unit || ''}</div>
                            }
                            {
                                (props.equipmentInformation?.equipment_length || '').trim().length > 0 &&
                                <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                    if (showLengthDropdownItems) {
                                        setShowLengthDropdownItems(false);
                                    } else {
                                        setLengthDropdownItems(lengthDropdownItems.map((item, index) => {
                                            item.selected = props.equipmentInformation.equipment_length_unit === item.value
                                            return item;
                                        }))

                                        window.setTimeout(() => {
                                            setShowLengthDropdownItems(true);
                                        }, 0)
                                    }

                                    refLength.current.focus();
                                }} />
                            }
                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={showLengthDropdownItems}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-equipment-length"
                                    style={{
                                        ...styles,
                                        left: 0,
                                        display: 'block'
                                    }}
                                    ref={refLengthDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right">
                                        <div className="mochi-contextual-popup-content">
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    lengthDropdownItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await props.setEquipmentInformation({
                                                                        ...props.equipmentInformation,
                                                                        equipment_length_unit: item.value
                                                                    });
                                                                    setShowLengthDropdownItems(false);
                                                                    refLength.current.focus();
                                                                }}
                                                                ref={ref => refLengthPopupItems.current.push(ref)}
                                                            >
                                                                {
                                                                    item.name
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

                    <div className="select-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="select-box-wrapper">
                            <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Width</div>
                            <input style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                paddingRight: (props.equipmentInformation?.equipment_width || '').trim().length > 0 ? 25 : 0
                            }}
                                tabIndex={6 + props.tabTimes} type="text"
                                guide={false}
                                ref={refWidth}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    if (key === 70) {
                                        e.preventDefault();

                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_width_unit: 'ft'
                                        })
                                    } else if (key === 73) {
                                        e.preventDefault();
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_width_unit: 'in'
                                        })
                                    } else if (key === 38) {
                                        e.preventDefault();
                                        if (showWidthDropdownItems) {
                                            let selectedIndex = widthDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                    if (selectedIndex === 0) {
                                                        item.selected = index === (widthDropdownItems.length - 1);
                                                    } else {
                                                        item.selected = index === (selectedIndex - 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_width_unit === item.value
                                                return item;
                                            }))

                                            await setShowWidthDropdownItems(true);
                                        }

                                        refWidthPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 40) {
                                        e.preventDefault();
                                        if (showWidthDropdownItems) {
                                            let selectedIndex = widthDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                    if (selectedIndex === (widthDropdownItems.length - 1)) {
                                                        item.selected = index === 0;
                                                    } else {
                                                        item.selected = index === (selectedIndex + 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_width_unit === item.value
                                                return item;
                                            }))

                                            await setShowWidthDropdownItems(true);
                                        }

                                        refWidthPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 27) {
                                        await setShowWidthDropdownItems(false);
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_width_unit: ''
                                        })
                                    } else if (key === 13) {
                                        if (showWidthDropdownItems && widthDropdownItems.findIndex(item => item.selected) > -1) {
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_width_unit: widthDropdownItems[widthDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowWidthDropdownItems(false);
                                            refWidth.current.focus();
                                        }
                                    } else if (key === 9) {
                                        if (showWidthDropdownItems) {
                                            e.preventDefault();
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_width_unit: widthDropdownItems[widthDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowWidthDropdownItems(false);
                                            refWidth.current.focus();
                                        }
                                    } else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {

                                    } else if (key === 8 || key === 46) {

                                    } else {
                                        e.preventDefault();
                                    }
                                }}

                                onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_width: e.target.value }) }}
                                onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_width: e.target.value }) }}
                                value={props.equipmentInformation.equipment_width || ''}
                            />
                            {
                                (props.equipmentInformation?.equipment_width || '').trim().length > 0 &&
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '18px',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'Mochi Med Oblique',
                                    fontWeight: 'bold'
                                }}>{props.equipmentInformation?.equipment_width_unit || ''}</div>
                            }
                            {
                                (props.equipmentInformation?.equipment_width || '').trim().length > 0 &&
                                <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                    if (showWidthDropdownItems) {
                                        setShowWidthDropdownItems(false);
                                    } else {
                                        setWidthDropdownItems(widthDropdownItems.map((item, index) => {
                                            item.selected = props.equipmentInformation.equipment_width_unit === item.value
                                            return item;
                                        }))

                                        window.setTimeout(() => {
                                            setShowWidthDropdownItems(true);
                                        }, 0)
                                    }

                                    refWidth.current.focus();
                                }} />
                            }
                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={showWidthDropdownItems}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-equipment-width"
                                    style={{
                                        ...styles,
                                        left: 0,
                                        display: 'block'
                                    }}
                                    ref={refWidthDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below right">
                                        <div className="mochi-contextual-popup-content">
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    widthDropdownItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await props.setEquipmentInformation({
                                                                        ...props.equipmentInformation,
                                                                        equipment_width_unit: item.value
                                                                    });
                                                                    setShowWidthDropdownItems(false);
                                                                    refWidth.current.focus();
                                                                }}
                                                                ref={ref => refWidthPopupItems.current.push(ref)}
                                                            >
                                                                {
                                                                    item.name
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

                    <div className="select-box-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="select-box-wrapper">
                            <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}>Height</div>
                            <input style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                paddingRight: (props.equipmentInformation?.equipment_height || '').trim().length > 0 ? 25 : 0
                            }}
                                tabIndex={7 + props.tabTimes} type="text"
                                guide={false}
                                ref={refHeight}
                                onKeyDown={async (e) => {
                                    let key = e.keyCode || e.which;

                                    if (key === 70) {
                                        e.preventDefault();

                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_height_unit: 'ft'
                                        })
                                    } else if (key === 73) {
                                        e.preventDefault();
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_height_unit: 'in'
                                        })
                                    } else if (key === 38) {
                                        e.preventDefault();
                                        if (showHeightDropdownItems) {
                                            let selectedIndex = heightDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                    if (selectedIndex === 0) {
                                                        item.selected = index === (heightDropdownItems.length - 1);
                                                    } else {
                                                        item.selected = index === (selectedIndex - 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_height_unit === item.value
                                                return item;
                                            }))

                                            await setShowHeightDropdownItems(true);
                                        }

                                        refHeightPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 40) {
                                        e.preventDefault();
                                        if (showHeightDropdownItems) {
                                            let selectedIndex = heightDropdownItems.findIndex(item => item.selected);

                                            if (selectedIndex === -1) {
                                                await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                    item.selected = index === 0;
                                                    return item;
                                                }))
                                            } else {
                                                await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                    if (selectedIndex === (heightDropdownItems.length - 1)) {
                                                        item.selected = index === 0;
                                                    } else {
                                                        item.selected = index === (selectedIndex + 1)
                                                    }
                                                    return item;
                                                }))
                                            }
                                        } else {
                                            await setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                                item.selected = props.equipmentInformation.equipment_height_unit === item.value
                                                return item;
                                            }))

                                            await setShowHeightDropdownItems(true);
                                        }

                                        refHeightPopupItems.current.map((r, i) => {
                                            if (r && r.classList.contains('selected')) {
                                                r.scrollIntoView({
                                                    behavior: 'auto',
                                                    block: 'center',
                                                    inline: 'nearest'
                                                })
                                            }
                                            return true;
                                        });

                                    } else if (key === 27) {
                                        await setShowHeightDropdownItems(false);
                                        props.setEquipmentInformation({
                                            ...props.equipmentInformation,
                                            equipment_height_unit: ''
                                        })
                                    } else if (key === 13) {
                                        if (showHeightDropdownItems && heightDropdownItems.findIndex(item => item.selected) > -1) {
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_height_unit: heightDropdownItems[heightDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowHeightDropdownItems(false);
                                            refHeight.current.focus();
                                        }
                                    } else if (key === 9) {
                                        e.preventDefault();

                                        if (showHeightDropdownItems) {
                                            await props.setEquipmentInformation({
                                                ...props.equipmentInformation,
                                                equipment_height_unit: heightDropdownItems[heightDropdownItems.findIndex(item => item.selected)].value
                                            });
                                            await setShowHeightDropdownItems(false);
                                            refHeight.current.focus();
                                        }

                                        validateEquipmentForSaving(e);
                                    } else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {

                                    } else if (key === 8 || key === 46) {

                                    } else {
                                        e.preventDefault();
                                    }

                                    switch (key) {
                                        case 9: // tab
                                            e.preventDefault();
                                            if (showHeightDropdownItems) {
                                                await props.setEquipmentInformation({
                                                    ...props.equipmentInformation,
                                                    equipment_height_unit: heightDropdownItems[heightDropdownItems.findIndex(item => item.selected)].value
                                                });
                                                await setShowHeightDropdownItems(false);
                                                refHeight.current.focus();
                                            }

                                            validateEquipmentForSaving(e);
                                            break;

                                        default:
                                            break;
                                    }
                                }}

                                onInput={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_height: e.target.value }) }}
                                onChange={(e) => { props.setEquipmentInformation({ ...props.equipmentInformation, equipment_height: e.target.value }) }}
                                value={props.equipmentInformation.equipment_height || ''}
                            />
                            {
                                (props.equipmentInformation?.equipment_height || '').trim().length > 0 &&
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '18px',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'Mochi Med Oblique',
                                    fontWeight: 'bold'
                                }}>{props.equipmentInformation?.equipment_height_unit || ''}</div>
                            }
                            {
                                (props.equipmentInformation?.equipment_height || '').trim().length > 0 &&
                                <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                                    if (showHeightDropdownItems) {
                                        setShowHeightDropdownItems(false);
                                    } else {
                                        setHeightDropdownItems(heightDropdownItems.map((item, index) => {
                                            item.selected = props.equipmentInformation.equipment_height_unit === item.value
                                            return item;
                                        }))

                                        window.setTimeout(() => {
                                            setShowHeightDropdownItems(true);
                                        }, 0)
                                    }

                                    refHeight.current.focus();
                                }} />
                            }
                        </div>
                        <Transition
                            from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                            leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                            items={showHeightDropdownItems}
                            config={{ duration: 100 }}
                        >
                            {show => show && (styles => (
                                <div
                                    className="mochi-contextual-container"
                                    id="mochi-contextual-container-equipment-height"
                                    style={{
                                        ...styles,
                                        left: '-100%',
                                        display: 'block'
                                    }}
                                    ref={refHeightDropDown}
                                >
                                    <div className="mochi-contextual-popup vertical below left">
                                        <div className="mochi-contextual-popup-content">
                                            <div className="mochi-contextual-popup-wrapper">
                                                {
                                                    heightDropdownItems.map((item, index) => {
                                                        const mochiItemClasses = classnames({
                                                            'mochi-item': true,
                                                            'selected': item.selected
                                                        });

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={mochiItemClasses}
                                                                id={item.id}
                                                                onClick={async () => {
                                                                    await props.setEquipmentInformation({
                                                                        ...props.equipmentInformation,
                                                                        equipment_height_unit: item.value
                                                                    });
                                                                    setShowHeightDropdownItems(false);
                                                                    refHeight.current.focus();
                                                                }}
                                                                ref={ref => refHeightPopupItems.current.push(ref)}
                                                            >
                                                                {
                                                                    item.name
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
                            <div className="equipment-list-col tcol units">Unit</div>
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
                                            equipment_length_unit: eq.equipment_length_unit,
                                            equipment_width: eq.equipment_width,
                                            equipment_width_unit: eq.equipment_width_unit,
                                            equipment_height: eq.equipment_height,
                                            equipment_height_unit: eq.equipment_height_unit
                                        });

                                        refEquipment.current.focus();
                                    }}>
                                        <div className="equipment-list-col tcol equipment">{eq.equipment.name}</div>
                                        <div className="equipment-list-col tcol units">{eq.units}</div>
                                        <div className="equipment-list-col tcol equipment_length">{(eq.equipment_length || '') === '' ? '' : eq.equipment_length + ((eq.equipment_length_unit || '') === 'ft' ? '\'' : (eq.equipment_length_unit || '') === 'in' ? '"' : '')}</div>
                                        <div className="equipment-list-col tcol equipment_width">{(eq.equipment_width || '') === '' ? '' : eq.equipment_width + ((eq.equipment_width_unit || '') === 'ft' ? '\'' : (eq.equipment_width_unit || '') === 'in' ? '"' : '')}</div>
                                        <div className="equipment-list-col tcol equipment_height">{(eq.equipment_height || '') === '' ? '' : eq.equipment_height + ((eq.equipment_height_unit || '') === 'ft' ? '\'' : (eq.equipment_height_unit || '') === 'in' ? '"' : '')}</div>
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