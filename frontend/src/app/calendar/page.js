// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { getEvents } from "../components/Event";
import FixedPlanForm from "../components/FixedPlanForm";
import GoalForm from "../components/GoalForm";
import Calendar from "../components/Calendar";
import Chat from "../components/Chat";

const EVENTS_URL = "/api/events/";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setEvents(await getEvents());
  }

  console.log(events);

  return (
    <div>
      <h1>My Calendar Page</h1>
      <nav>
        <a href="/signup">SignUp </a>
        <a href="/login">login </a>
        <a href="/logout">logout </a>
      </nav>
      <FixedPlanForm onEventsAdded={fetchEvents} />
      <GoalForm onEventsAdded={fetchEvents} />
      <button onClick={fetchEvents}>Reload Data</button>
      <Chat />
      <Calendar events={events} />
    </div>
  );
}
