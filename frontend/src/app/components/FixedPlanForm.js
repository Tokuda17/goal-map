"use client"; // If using hooks or state management in Next.js
import { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
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
    console.log("handleSubmit");

    const formData = {
      name: "Event Name",
      date: "2024-09-25", // Ensure this is in 'YYYY-MM-DD' format
      startTime: "14:00:00", // Ensure this is in 'HH:MM:SS' format
      endTime: "16:00:00", // Ensure this is in 'HH:MM:SS' format
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Event successfully created!");
        // Handle success (you can show a success message or clear the form)
        setFormData({
          name: "",
          date: "",
          startTime: "",
          endTime: "",
        });
      } else {
        console.error("Failed to create event");
        // Handle failure
      }
    } catch (error) {
      console.error("An error occurred while creating the event", error);
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
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Mandatory Event</button>
    </form>
  );
}
