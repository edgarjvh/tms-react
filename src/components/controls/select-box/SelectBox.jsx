import React from 'react';
import { Transition, Spring, animated as animated2, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from "react-detect-click-outside";

export default function SelectBox(props) {
    const ref = useDetectClickOutside({ onTriggered: async () => { await setInsuranceTypesDropdownItems([]) } });



    return (
        <div className="select-box-container" style={{ ...props.style }}>
            <div className="select-box-wrapper">
                <input {...props} 
                    // type="text"
                    // tabIndex={86 + props.tabTimes}
                    // placeholder="Type"
                    // ref={refInsuranceType}
                    // onKeyDown={onInsuranceTypeKeydown}
                    // onInput={() => { }}
                    // onChange={() => { }}
                    // value={props.selectedInsurance?.insurance_type?.name || ''}
                />
                <FontAwesomeIcon className="dropdown-button" icon={faCaretDown} onClick={() => {
                    if (insuranceTypesDropdownItems.length > 0) {
                        setInsuranceTypesDropdownItems([]);
                    } else {
                        $.post(props.serverUrl + '/getInsuranceTypes').then(async res => {
                            if (res.result === 'OK') {
                                await setInsuranceTypesDropdownItems(res.types.map((item, index) => {
                                    item.selected = (props.selectedInsurance?.insurance_type?.id || 0) === 0
                                        ? index === 0
                                        : item.id === props.selectedInsurance.insurance_type.id
                                    return item;
                                }))
                            }
                        }).catch(async e => {
                            console.log('error getting insurance types', e);
                        })
                    }

                    refInsuranceType.current.focus();
                }} />
            </div>

            <Transition
                from={{ opacity: 0, top: 'calc(100% + 10px)' }}
                enter={{ opacity: 1, top: 'calc(100% + 15px)' }}
                leave={{ opacity: 0, top: 'calc(100% + 10px)' }}
                items={insuranceTypesDropdownItems.length > 0}
                config={{ duration: 100 }}
            >
                {show => show && (styles => (
                    <div
                        className="mochi-contextual-container"
                        id="mochi-contextual-container-insurance-type"
                        style={{
                            ...styles,
                            left: '-50%'
                        }}
                        ref={ref}
                    >
                        <div className="mochi-contextual-popup vertical below">
                            <div className="mochi-contextual-popup-content">
                                <div className="mochi-contextual-popup-wrapper">
                                    {
                                        insuranceTypesDropdownItems.map((item, index) => {
                                            const mochiItemClasses = classnames({
                                                'mochi-item': true,
                                                'selected': item.selected
                                            });

                                            return (
                                                <div key={index} className={mochiItemClasses} id={item.id}>
                                                    {item.name}
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
    )
}
