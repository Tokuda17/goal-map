"use client"; // If using hooks or state management in Next.js

import { useState, useEffect } from "react";
import { addEvent, deleteEvent, getEvents } from "./Event";
import { getConflict, convertMinutesToTime } from "../utils";

const EVENT_URL = "/api/events";

export default function EventForm({ onEventsAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    minutesPerWeek: "",
    importance: "medium", // Default importance
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalMinutes = parseInt(formData.minutesPerWeek);
    const chunks = Math.ceil(totalMinutes / 30); // Number of 30-minute chunks

    // Fetch available slots and create events
    const availableSlots = getAvailableSlots(existingEvents, chunks, 30);

    if (availableSlots.length < chunks) {
      console.error("Not enough available slots for the events");
      return; // Not enough slots
    }

    for (const slot of availableSlots) {
      addEvent(formData.name, slot.date, slot.start_time, slot.end_time);
    }

    // Reset the form
    setFormData({
      name: "",
      minutesPerWeek: "",
      importance: "medium",
    });
    onEventsAdded();
  };

  function getAvailableSlots(events, chucks, chunkDuration) {
    var tempEvents = getEvents();
    console.log(tempEvents);
    const availableSlots = [];
    const bookedSlots = new Set();

    for (var i = 0; i < 1440 - chunkDuration; i += 5) {
      for (var j = 0; j < 7; j++) {
        const start_time = convertMinutesToTime(i);
        const end_time = convertMinutesToTime(i + chunkDuration);
        const today = new Date();
        var date = new Date(today);
        date.setDate(today.getDate() + j);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        date = `${year}-${month}-${day}`;
        if (getConflict(date, start_time, end_time, tempEvents)) {
          availableSlots.push({
            date: date,
            startTime: start_time,
            endTime: end_time,
          });
          tempEvents.push({
            name: "",
            start_time: start_time,
            end_time: end_time,
            date: date,
          });
        }
        if (availableSlots.length == chucks) return availableSlots;
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Goal Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="minutesPerWeek">Minutes Per Week:</label>
        <input
          type="number"
          id="minutesPerWeek"
          name="minutesPerWeek"
          value={formData.minutesPerWeek}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="importance">Importance:</label>
        <select
          id="importance"
          name="importance"
          value={formData.importance}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button type="submit">Add Goal</button>
    </form>
  );
}
