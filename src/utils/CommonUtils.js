export const stringToDate = function (dateString) {
    const [dd, mm, yyyy] = dateString.split("/");
    return new Date(`${yyyy}-${mm}-${dd}`);
};

export const isSameDate = (d1, d2) => {
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
}

export const isDateToday = (dateString) => {
    const inputDate = stringToDate(dateString);
    const currentDate = new Date();
    return isSameDate(currentDate, inputDate);
}

export const isTimingCurrent = (startTime, endTime) => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const [startTimeHour, startTimeMinutes] = startTime.split(':');
    const [endTimeHour, endTimeMinutes] = endTime.split(':');
    return ((currentHours >= parseInt(startTimeHour, 10) && currentHours <= parseInt(endTimeHour, 10)) &&
        (currentMinutes >= parseInt(startTimeMinutes, 10) && currentMinutes <= parseInt(endTimeMinutes, 10)));
}