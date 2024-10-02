// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import FixedPlanForm from "./components/FixedPlanForm";
import GoalForm from "./components/GoalForm";
import Calendar from "./components/Calendar";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = getDjangoAPIData();
        setEvents(data); // Set events only for the logged-in user
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  }, []);

  async function getDjangoAPIData() {
    const response = await fetch("http://127.0.0.1:8000/api/events/");
    const data = await response.json();
    return data;
  }

  async function reloadData() {
    fetchEvents();
  }

  return (
    <div>
      <h1>My Calendar App</h1>
      <FixedPlanForm />
      <GoalForm event={events} />
      <button onClick={reloadData}>Reload Data</button>
      <Calendar events={events} />
    </div>
  );
}
