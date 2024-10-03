"use client"; // If using hooks or state management in Next.js
import { useState } from "react";
import { addEvent, deleteEvent, getEvents } from "./Event";

const EVENT_URL = "/api/events";

export default function EventForm({ onEventsAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    importance: "high",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");

    const formData = new FormData(e.target);
    const event = Object.fromEntries(formData);

    const response = addEvent(
      event.name,
      event.date,
      event.start_time,
      event.end_time
    );

    if (response) {
      console.log("Event successfully created!");
      // Handle success (you can show a success message or clear the form)
      setFormData({
        name: "",
        date: "",
        start_time: "",
        end_time: "",
      });

      onEventsAdded();
    } else {
      console.error("Failed to create event");
      // Handle failure
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Event Name:</label>
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
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Mandatory Event</button>
    </form>
  );
}
