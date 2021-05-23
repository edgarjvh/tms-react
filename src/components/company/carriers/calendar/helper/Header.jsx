import React from 'react'

export default function Header({ value, setValue }) {

    function currMonthName(){
        return value.format('MMMM');
    } 

    function currYear(){
        return value.format('YYYY');
    } 

    function prevMonth(){
        return value.clone().subtract(1, 'month');
    }

    function nextMonth(){
        return value.clone().add(1, 'month');
    }
    return (
        <div className="header">
            <div className="prev-month-btn" onClick={(e) => {e.stopPropagation(); setValue(prevMonth());}}><span className="fas fa-chevron-left"></span></div>
            <div className="month-name" onClick={(e) => {e.stopPropagation(); }}><span className="month">{currMonthName()}</span> <span className="year">{currYear()}</span></div>
            <div className="next-month-btn" onClick={(e) => {e.stopPropagation(); setValue(nextMonth());}}><span className="fas fa-chevron-right"></span></div>
        </div>
    )
}
