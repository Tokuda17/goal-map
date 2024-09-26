"use client"; // If using hooks or state management in Next.js
import { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    importance: "high",
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

    const formData = new FormData(e.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);

    console.log(jsonData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (response.ok) {
        console.log("Event successfully created!");
        // Handle success (you can show a success message or clear the form)
        setFormData({
          name: "",
          date: "",
          start_time: "",
          end_time: "",
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
