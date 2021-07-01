function notSameMonth(day, value){
    return !value.isSame(day, 'month');
}
function isSelected(day, value){
    return value.isSame(day, 'day');
}
function isToday(day){
    return day.isSame(new Date(), 'day');
}
function isPreSelected(day, preDay, value){
    return preDay.isSame(day, 'day') && !value.isSame(day, 'day');
}
export default function dayStyles(day, value, preDay){
    if (notSameMonth(day, value)) return "not-same-month";
    if (isSelected(day, value)) return "selected";
    if (isToday(day)) return "today";
    if (isPreSelected(day, preDay, value)) return "pre-selected";
 
    return "";
}