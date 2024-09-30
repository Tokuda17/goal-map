"use client";
//Params: date "YYYY-MM-DD", start_time and end_time in "HH:MM:SS", events
export function getConflict(date, start_time, end_time, events) {
  const todayEvents = events.filter((event) => event.date == date);
  const start_time_decimal = timeToDecimal(start_time);
  const end_time_decimal = timeToDecimal(end_time);

  for (var i = 0; i < todayEvents.length; i++) {
    const event = todayEvents[i];
    const event_start_time_decimal = timeToDecimal(event.start_time);
    const event_end_time_decimal = timeToDecimal(event.end_time);
    if (
      !(
        start_time_decimal > event_end_time_decimal ||
        end_time_decimal < event_start_time_decimal
      )
    ) {
      return false;
    }
  }
  return true;
}
export function convertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}:00`;
  return formattedTime;
}
//Params: time in "HH:MM:SS"
//Returns: time as a decimal (can be used to compare easily)
function timeToDecimal(time) {
  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);
  return hours + minutes / 60 + seconds / 3600;
}
