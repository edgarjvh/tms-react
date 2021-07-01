import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { useDetectClickOutside } from "react-detect-click-outside";
import './CalendarPopup.css';
import Calendar from './../calendar/Calendar.jsx';


function CalendarPopup(props) {
    const ref = useDetectClickOutside({ onTriggered: () => { props.closeCalendar() }});
   
    return (
        <div ref={props.popupRef} className={props.popupClasses} style={{
            minHeight: '275px',
            minWidth: '300px'
        }}  >
            <div className="mochi-contextual-popup" ref={ref} style={{
                height: '100%',
                position: 'absolute',
                maxHeight:'initial'
            }} onClick={(e) => {e.stopPropagation()}}>
                <div className="mochi-contextual-popup-content">
                    <div className="mochi-contextual-popup-wrapper">
                        <Calendar
                            value={props.popupGetter}
                            onChange={props.popupSetter}
                            closeCalendar={() => props.closeCalendar()}
                            preDay={props.preDay}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(CalendarPopup);