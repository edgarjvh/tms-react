import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './BillToCompanyLaneHistory.css';
import { setDispatchPanels, setDispatchOpenedPanels } from './../../../../../actions';
import MaskedInput from 'react-text-mask';
import CalendarPopup from './../../calendarPopup/CalendarPopup.jsx';
import moment from 'moment';

function BillToCompanyLaneHistory(props) {
    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const [isDateStartCalendarShown, setIsDateStartCalendarShown] = useState(false);
    const [isDateEndCalendarShown, setIsDateEndCalendarShown] = useState(false);

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const [preSelectedDateStart, setPreSelectedDateStart] = useState(moment());
    const [preSelectedDateEnd, setPreSelectedDateEnd] = useState(moment());

    const refDateStart = useRef();
    const refDateEnd = useRef();

    const refDateStartCalendarPopup = useRef();
    const refDateEndCalendarPopup = useRef();

    const dateStartCalendarPopupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': isDateStartCalendarShown
    });

    const dateEndCalendarPopupContainerClasses = classnames({
        'mochi-contextual-container': true,
        'shown': isDateEndCalendarShown
    });

    const getFormattedDates = (date) => {
        let formattedDate = date;

        try {
            if (moment(date.trim(), 'MM/DD/YY').format('MM/DD/YY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/YY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/').format('MM/DD/') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD').format('MM/DD') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/').format('MM/') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM').format('MM') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/Y').format('M/D/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D/Y').format('MM/D/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/Y').format('MM/DD/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/DD/Y').format('M/DD/Y') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/DD/Y').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/YY').format('M/D/YY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/YY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/YYYY').format('M/D/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D/YYYY').format('MM/D/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/DD/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/DD/YYYY').format('M/DD/YYYY') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/DD/YYYY').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D/').format('M/D/') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D/').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M/D').format('M/D') === date.trim()) {
                formattedDate = moment(date.trim(), 'M/D').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'MM/D').format('MM/D') === date.trim()) {
                formattedDate = moment(date.trim(), 'MM/D').format('MM/DD/YYYY');
            }

            if (moment(date.trim(), 'M').format('M') === date.trim()) {
                formattedDate = moment(date.trim(), 'M').format('MM/DD/YYYY');
            }
        } catch (e) {
            console.log(e);
        }

        return formattedDate;
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'bill-to-company-lane-history')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="lane-fields-container">
                <div className="row-fields">
                    <div className="input-box-container date">
                        <MaskedInput
                            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                            guide={false} type="text" placeholder="Date Start"
                            ref={refDateStart}
                            onKeyDown={async (e) => {
                                let key = e.keyCode || e.which;

                                let curDateStart = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(dateStart || ''), 'MM/DD/YYYY');

                                await setPreSelectedDateStart(curDateStart);

                                if (key === 9) {
                                    await setIsDateStartCalendarShown(false);
                                }

                                if (key === 13) {
                                    if (isDateStartCalendarShown) {
                                        await setDateStart(preSelectedDateStart.clone().format('MM/DD/YYYY'));
                                        await setIsDateStartCalendarShown(false);
                                    }
                                }

                                if (key >= 37 && key <= 40) {
                                    if (isDateStartCalendarShown) {
                                        e.preventDefault();

                                        if (key === 37) { // left - minus 1
                                            setPreSelectedDateStart(preSelectedDateStart.clone().subtract(1, 'day'));
                                        }

                                        if (key === 38) { // up - minus 7
                                            setPreSelectedDateStart(preSelectedDateStart.clone().subtract(7, 'day'));
                                        }

                                        if (key === 39) { // right - plus 1
                                            setPreSelectedDateStart(preSelectedDateStart.clone().add(1, 'day'));
                                        }

                                        if (key === 40) { // down - plus 7
                                            setPreSelectedDateStart(preSelectedDateStart.clone().add(7, 'day'));
                                        }
                                    }
                                }
                            }}
                            onBlur={(e) => { setDateStart(getFormattedDates(dateStart)) }}
                            onInput={(e) => { setDateStart(e.target.value) }}
                            onChange={(e) => { setDateStart(e.target.value) }}
                            value={dateStart || ''}
                        />

                        <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                            e.stopPropagation();

                            if (moment((dateStart || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (dateStart || '').trim()) {
                                setPreSelectedDateStart(moment(dateStart, 'MM/DD/YYYY'));
                            } else {
                                setPreSelectedDateStart(moment());
                            }

                            const baseWidth = 0.95;
                            const panelGap = 70;
                            const panelWidth = (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-lane-history'));

                            const input = refDateStart.current.inputElement.getBoundingClientRect();

                            let popup = refDateStartCalendarPopup.current;

                            const { innerWidth, innerHeight } = window;

                            let screenWSection = innerWidth / 3;

                            popup && (popup.childNodes[0].className = 'mochi-contextual-popup');
                            popup && popup.childNodes[0].classList.add('vertical');

                            if ((innerHeight - 170 - 30) <= input.top) {
                                popup && popup.childNodes[0].classList.add('above');
                            }

                            if ((innerHeight - 170 - 30) > input.top) {
                                popup && popup.childNodes[0].classList.add('below');
                                popup && (popup.style.top = (input.top + 10) + 'px');
                            }

                            if (input.left <= (screenWSection * 1)) {
                                popup && popup.childNodes[0].classList.add('right');
                                popup && (popup.style.left = input.left + 'px');

                                if (input.width < 70) {
                                    popup && (popup.style.left = (input.left - 60 + (input.width / 2)) + 'px');

                                    if (input.left < 30) {
                                        popup && popup.childNodes[0].classList.add('corner');
                                        popup && (popup.style.left = (input.left + (input.width / 2)) + 'px');
                                    }
                                }
                            }

                            if (input.left <= (screenWSection * 2)) {
                                popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) + 'px');
                            }

                            if (input.left > (screenWSection * 2)) {
                                popup && popup.childNodes[0].classList.add('left');
                                popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) + 'px');

                                if ((innerWidth - input.left) < 100) {
                                    popup && popup.childNodes[0].classList.add('corner');
                                    popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) - (300 - (input.width / 2)) + 'px');
                                }
                            }

                            setIsDateStartCalendarShown(true)

                            refDateStart.current.inputElement.focus();
                        }}></span>
                    </div>
                    <div className="input-box-container city">
                        <input type="text" placeholder="City Origin" />
                    </div>
                    <div className="input-box-container state">
                        <input type="text" placeholder="State Origin" />
                    </div>
                    <div className="input-box-container zip">
                        <input type="text" placeholder="Zip Origin" />
                    </div>
                    <div className="input-box-container input-code">
                        <input type="text" placeholder="Bill To Code" />
                    </div>
                    <div className="input-box-container input-code">
                        <input type="text" placeholder="Shipper Code" />
                    </div>
                </div>

                <div className="row-fields">
                    <div className="input-box-container date">
                        <MaskedInput
                            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                            guide={false} type="text" placeholder="Date End"
                            ref={refDateEnd}
                            onKeyDown={async (e) => {
                                let key = e.keyCode || e.which;

                                let curDateEnd = e.target.value.trim() === '' ? moment() : moment(getFormattedDates(dateEnd || ''), 'MM/DD/YYYY');

                                await setPreSelectedDateEnd(curDateEnd);

                                if (key === 9) {
                                    await setIsDateEndCalendarShown(false);
                                }

                                if (key === 13) {
                                    if (isDateEndCalendarShown) {
                                        await setDateEnd(preSelectedDateEnd.clone().format('MM/DD/YYYY'));
                                        await setIsDateEndCalendarShown(false);
                                    }
                                }

                                if (key >= 37 && key <= 40) {
                                    if (isDateEndCalendarShown) {
                                        e.preventDefault();

                                        if (key === 37) { // left - minus 1
                                            setPreSelectedDateEnd(preSelectedDateEnd.clone().subtract(1, 'day'));
                                        }

                                        if (key === 38) { // up - minus 7
                                            setPreSelectedDateEnd(preSelectedDateEnd.clone().subtract(7, 'day'));
                                        }

                                        if (key === 39) { // right - plus 1
                                            setPreSelectedDateEnd(preSelectedDateEnd.clone().add(1, 'day'));
                                        }

                                        if (key === 40) { // down - plus 7
                                            setPreSelectedDateEnd(preSelectedDateEnd.clone().add(7, 'day'));
                                        }
                                    }
                                }
                            }}
                            onBlur={(e) => { setDateEnd(getFormattedDates(dateEnd)) }}
                            onInput={(e) => { setDateEnd(e.target.value) }}
                            onChange={(e) => { setDateEnd(e.target.value) }}
                            value={dateEnd || ''}
                        />

                        <span className="fas fa-calendar-alt open-calendar-btn" onClick={(e) => {
                            e.stopPropagation();

                            if (moment((dateEnd || '').trim(), 'MM/DD/YYYY').format('MM/DD/YYYY') === (dateEnd || '').trim()) {
                                setPreSelectedDateEnd(moment(dateEnd, 'MM/DD/YYYY'));
                            } else {
                                setPreSelectedDateEnd(moment());
                            }

                            const baseWidth = 0.95;
                            const panelGap = 70;
                            const panelWidth = (window.innerWidth * baseWidth) - (panelGap * props.dispatchOpenedPanels.indexOf('bill-to-company-lane-history'));

                            const input = refDateEnd.current.inputElement.getBoundingClientRect();

                            let popup = refDateEndCalendarPopup.current;

                            const { innerWidth, innerHeight } = window;

                            let screenWSection = innerWidth / 3;

                            popup && (popup.childNodes[0].className = 'mochi-contextual-popup');
                            popup && popup.childNodes[0].classList.add('vertical');

                            if ((innerHeight - 170 - 30) <= input.top) {
                                popup && popup.childNodes[0].classList.add('above');
                            }

                            if ((innerHeight - 170 - 30) > input.top) {
                                popup && popup.childNodes[0].classList.add('below');
                                popup && (popup.style.top = (input.top + 10) + 'px');
                            }

                            if (input.left <= (screenWSection * 1)) {
                                popup && popup.childNodes[0].classList.add('right');
                                popup && (popup.style.left = input.left + 'px');

                                if (input.width < 70) {
                                    popup && (popup.style.left = (input.left - 60 + (input.width / 2)) + 'px');

                                    if (input.left < 30) {
                                        popup && popup.childNodes[0].classList.add('corner');
                                        popup && (popup.style.left = (input.left + (input.width / 2)) + 'px');
                                    }
                                }
                            }

                            if (input.left <= (screenWSection * 2)) {
                                popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) + 'px');
                            }

                            if (input.left > (screenWSection * 2)) {
                                popup && popup.childNodes[0].classList.add('left');
                                popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) + 'px');

                                if ((innerWidth - input.left) < 100) {
                                    popup && popup.childNodes[0].classList.add('corner');
                                    popup && (popup.style.left = (input.left - (window.innerWidth - panelWidth)) - (300 - (input.width / 2)) + 'px');
                                }
                            }

                            setIsDateEndCalendarShown(true)

                            refDateEnd.current.inputElement.focus();
                        }}></span>
                    </div>
                    <div className="input-box-container city">
                        <input type="text" placeholder="City Destination" />
                    </div>
                    <div className="input-box-container state">
                        <input type="text" placeholder="State Destination" />
                    </div>
                    <div className="input-box-container zip">
                        <input type="text" placeholder="Zip Destination" />
                    </div>
                    <div className="input-box-container input-code">
                        <input type="text" placeholder="Consignee Code" />
                    </div>
                    <div className="mochi-button">
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Find</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>
                </div>
            </div>
            <div className="lane-info-container">
                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button">
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>
                </div>
            </div>

            <CalendarPopup
                popupRef={refDateStartCalendarPopup}
                popupClasses={dateStartCalendarPopupContainerClasses}
                popupGetter={moment((dateStart || ''), 'MM/DD/YYYY').format('MM/DD/YYYY') === (dateStart || '')
                    ? moment(dateStart, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={(day) => {
                    setDateStart(day.format('MM/DD/YYYY'))
                }}
                closeCalendar={() => { setIsDateStartCalendarShown(false); }}
                preDay={preSelectedDateStart}
            />

            <CalendarPopup
                popupRef={refDateEndCalendarPopup}
                popupClasses={dateEndCalendarPopupContainerClasses}
                popupGetter={moment((dateEnd || ''), 'MM/DD/YYYY').format('MM/DD/YYYY') === (dateEnd || '')
                    ? moment(dateEnd, 'MM/DD/YYYY')
                    : moment()}
                popupSetter={(day) => {
                    setDateEnd(day.format('MM/DD/YYYY'))
                }}
                closeCalendar={() => { setIsDateEndCalendarShown(false); }}
                preDay={preSelectedDateEnd}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        panels: state.dispatchReducers.panels,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setDispatchOpenedPanels
})(BillToCompanyLaneHistory)