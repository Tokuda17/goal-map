"use client"; // If using hooks or state management in Next.js

import { useState, useEffect } from "react";

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

  const getAvailableSlots = (events, chunks, chunkDuration) => {
    const availableSlots = [];
    const totalSlots = 24 * 60; // Total minutes in a day (1440 minutes)
    const bookedSlots = new Set();

    // Helper function to format date as "YYYY-MM-DD"
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    // Process booked slots based on existing events
    events.forEach((event) => {
      const start = new Date(event.date + "T" + event.start_time);
      const end = new Date(event.date + "T" + event.end_time);
      const duration = (end - start) / (1000 * 60); // Duration in minutes

      for (let i = 0; i < duration; i += 30) {
        bookedSlots.add(start.getMinutes() + i);
      }
    });

    // Function to find available slots starting from the current or future dates
    const findAvailableSlots = (startDate) => {
      let currentDate = new Date(startDate); // Start from today
      while (availableSlots.length < chunks) {
        for (let i = 0; i < totalSlots; i += chunkDuration) {
          if (!bookedSlots.has(i)) {
            availableSlots.push({
              date: formatDate(currentDate),
              startTime: `${Math.floor(i / 60)}:${(i % 60)
                .toString()
                .padStart(2, "0")}`,
              endTime: `${Math.floor((i + chunkDuration) / 60)}:${(
                (i + chunkDuration) %
                60
              )
                .toString()
                .padStart(2, "0")}`,
            });
          }
          if (availableSlots.length === chunks) break; // Stop once we have enough slots
        }

        // Move to the next day if not enough slots are found
        if (availableSlots.length < chunks) {
          currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
        }
      }
    };

    // Start searching from the current date
    findAvailableSlots(new Date());

    return availableSlots;
  };

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
