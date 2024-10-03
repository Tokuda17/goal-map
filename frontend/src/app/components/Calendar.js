"use client"; // Needed if using hooks

import { useEffect, useState } from "react";
import "../styles/calendar.css"; // Use relative path for the CSS file
import Event from "./Event"; // Import the Event component
//Params: None
//Return: returns the most recent Sunday
function getCurrentWeekStart() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to the most recent Sunday
  return startOfWeek;
}

//Param: Time in "HH:MM:SS"
//Return: Convert the time in "HH:MM:SS" format to a percentage for positioning
function convertTimeToTop(time) {
  let [hour, minute] = time.split(":").map(Number);
  return ((hour * 60 + minute) / 1440) * 100; // Calculate percentage based on 24 hours
}

//Params: Start Time and End Time of an Event in "HH:MM:SS"
//Returns: Percentage of Calender Event should Span
function convertTimeToHeight(start_time, end_time) {
  const startMinutes =
    parseInt(start_time.split(":")[0]) * 60 +
    parseInt(start_time.split(":")[1]);
  const endMinutes =
    parseInt(end_time.split(":")[0]) * 60 + parseInt(end_time.split(":")[1]);

  const durationMinutes = endMinutes - startMinutes;
  return `${(durationMinutes / 1440) * 100}%`; // Calculate height based on total day minutes
}

export default function Calendar({ events }) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getCurrentWeekStart()
  );

  // Renders military time slots (00:00 to 23:00)
  const renderTimeSlots = () => {
    const hourSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const displayHour = hour.toString().padStart(2, "0"); // Pad hours to be in HH format
      hourSlots.push(
        <div key={hour} className="time-slot">
          <span className="time">{`${displayHour}:00`}</span>
        </div>
      );
    }
    return hourSlots;
  };

  const getWeekDates = () => {
    const start = new Date(currentWeekStart);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates();

  return (
    <div>
      <h2>Calendar</h2>
      <div className="calendar-container">
        {/* Empty top-left cell */}
        <div className="empty-cell"></div>
        {/* Days of the week header */}
        <div className="days-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>
        <div className="empty-cell"></div>
        {/* Day numbers row */}
        <div className="day-numbers">
          {weekDates.map((date) => (
            <div key={date} className="day-number">
              {date.getDate()}
            </div>
          ))}
        </div>
        {/* Times column */}
        <div className="time-column">{renderTimeSlots()}</div>
        {/* Render days of the week */}
        {weekDates.map((date, index) => (
          <div key={date} className="date-column">
            {(Array.isArray(events) ? events : [])
              .filter((event) => {
                const eventDate = new Date(event.date + "T00:00:00"); //Standardize Date

                return (
                  eventDate.getFullYear() === date.getFullYear() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getDate() === date.getDate()
                );
              })
              .map((event) => {
                const startTop = `${convertTimeToTop(event.start_time)}%`;
                const height = convertTimeToHeight(
                  event.start_time,
                  event.end_time
                );
                return (
                  <Event
                    key={event.id}
                    name={event.name}
                    date={event.date}
                    start_time={event.start_time}
                    end_time={event.end_time}
                    top={startTop}
                    style={{ height }} // Set height for the event block
                  />
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
