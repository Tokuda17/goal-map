"use client"; // Needed if using hooks

import { useEffect, useState } from "react";
import "../styles/calendar.css"; // Use relative path for the CSS file
import Event from "./Event"; // Import the Event component

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getCurrentWeekStart()
  );

  function getCurrentWeekStart() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to the most recent Sunday
    return startOfWeek;
  }

  const fetchEvents = async () => {
    const dummyEvents = [
      {
        id: 1,
        name: "Doctor Appointment",
        date: "2024-09-22T00:00:00",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
      },
      {
        id: 2,
        name: "Class",
        date: "2024-09-22T00:00:00",
        startTime: "2:00 PM",
        endTime: "5:00 PM",
      },
      {
        id: 3,
        name: "Meeting",
        date: "2024-09-23T00:00:00",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
      },
      {
        id: 4,
        name: "Workout",
        date: "2024-09-23T00:00:00",
        startTime: "6:00 PM",
        endTime: "7:00 PM",
      },
      {
        id: 5,
        name: "Lunch with Friends",
        date: "2024-09-24T00:00:00",
        startTime: "12:00 PM",
        endTime: "1:00 PM",
      },
      {
        id: 6,
        name: "Project Deadline",
        date: "2024-09-26T00:00:00",
        startTime: "5:00 PM",
        endTime: "6:00 PM",
      },
      {
        id: 7,
        name: "Grocery Shopping",
        date: "2024-09-27T00:00:00",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
      },
    ];
    setEvents(dummyEvents);
    console.log(dummyEvents); // Check if dummy events are correct
  };

  useEffect(() => {
    fetchEvents();
    console.log(events);
  }, []);

  const convertTimeToTop = (time) => {
    const [timePart, period] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);
    console.log(time);

    // Adjust hour based on AM/PM
    if (period === "PM" && hour < 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return ((hour * 60 + minute) / 1440) * 100; // Calculate percentage based on 24 hours
  };

  const convertTimeToHeight = (startTime, endTime) => {
    const start = startTime.split(" ")[0];
    const end = endTime.split(" ")[0];

    const startMinutes =
      parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
    const endMinutes =
      parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);

    const durationMinutes = endMinutes - startMinutes;
    return `${(durationMinutes / 1440) * 100}%`; // Calculate height based on total day minutes
  };

  const renderTimeSlots = () => {
    const hourSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const amPm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
      hourSlots.push(
        <div key={hour} className="time-slot">
          <span className="time">{`${displayHour}:00 ${amPm}`}</span>
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
            {events
              .filter((event) => {
                const eventDate = new Date(event.date);
                return (
                  eventDate.getFullYear() === date.getFullYear() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getDate() === date.getDate()
                );
              })
              .map((event) => {
                const startTop = `${convertTimeToTop(event.startTime)}%`;
                const height = convertTimeToHeight(
                  event.startTime,
                  event.endTime
                );
                return (
                  <Event
                    key={event.id}
                    name={event.name}
                    startTime={event.startTime}
                    endTime={event.endTime}
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
