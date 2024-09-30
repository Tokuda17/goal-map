"use client"; // If using hooks or state management in Next.js

import { useState, useEffect } from "react";
import { getConflict, convertMinutesToTime } from "../utils";

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    minutesPerWeek: "",
    importance: "medium", // Default importance
  });
  const [existingEvents, setExistingEvents] = useState([]);

  useEffect(() => {
    // Fetch existing events to find available slots
    const fetchEvents = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/events/");
      const data = await response.json();
      setExistingEvents(data);
    };

    fetchEvents();
  }, []);

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
    const chunkDuration = 30; // Duration of each chunk in minutes

    // Find available time slots for the events
    const availableSlots = getAvailableSlots(
      existingEvents,
      chunks,
      chunkDuration
    );

    if (availableSlots.length < chunks) {
      console.error("Not enough available slots for the events");
      return; // Not enough slots
    }
    console.log("availableSlots", availableSlots);

    // Create and post events for each available slot
    for (const slot of availableSlots) {
      const eventData = {
        name: formData.name,
        date: slot.date, // Assuming date is part of the slot object
        start_time: slot.startTime,
        end_time: slot.endTime,
      };
      console.log("event", eventData);

      const jsonData = JSON.stringify(eventData);

      console.log(jsonData);

      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log("Event successfully created!", eventData);
      } else {
        console.error("Failed to create event", eventData);
      }
    }

    // Reset the form
    setFormData({
      name: "",
      minutesPerWeek: "",
      importance: "medium",
    });
  };

  function getAvailableSlots(events, chucks, chunkDuration) {
    const tempEvents = events.slice(); //Keep track of Events that are available without editing original array in case of failure

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

  async function testGetConflict() {
    const date = "2024-09-25";
    const start_time = "14:00:00";
    const end_time = "15:30:00";
    const events = existingEvents;
    getAvailableSlots(events, 6, 30);
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
      <br></br>
      <button onClick={testGetConflict}>Test Get Conflict</button>
    </form>
  );
}
