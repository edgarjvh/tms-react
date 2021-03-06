import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { useDetectClickOutside } from "react-detect-click-outside";
import './Popup.css';


function Popup(props) {
    const ref = useDetectClickOutside({ onTriggered: () => { props.setPopupItems([]) } });
    return (
        <div ref={props.popupRef} className={props.popupClasses}>
            <div className="mochi-contextual-popup" onKeyDown={(e) => { props.popupItemKeydown(e) }} ref={ref} >
                <div className="mochi-contextual-popup-content">
                    <div className="mochi-contextual-popup-wrapper">
                        {
                            props.popupItems.map((item, index) => {
                                const itemClasses = classnames({
                                    'mochi-contextual-popup-item': true,
                                    'selected': item.selected
                                })
                                return (
                                    <div onClick={() => { props.popupItemClick(item) }} key={index} ref={ref => props.popupItemsRef.current.push(ref)} className={itemClasses}>{item.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(Popup);