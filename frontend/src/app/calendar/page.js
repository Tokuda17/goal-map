// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { addEvent, getEvents } from "../components/Event";
import FixedPlanForm from "../components/FixedPlanForm";
import GoalForm from "../components/GoalForm";
import Calendar from "../components/Calendar";
import Chat from "../components/Chat";
import quickAdd from "../components/quickAdd";

const EVENTS_URL = "/api/events/";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {}, [events]);

  async function fetchEvents() {
    setEvents(await getEvents());
  }

  // async function quickAdd() {
  //   const intervals = [];
  //   const date = "2024-12-10";
  //   const start_time = "00:00:00";
  //   const end_time = "24:00:00";

  //   // Combine date with start and end times
  //   const startDateTime = new Date(`${date}T${start_time}`);
  //   const endDateTime = new Date(`${date}T${end_time}`);

  //   // Iterate in 15-minute intervals

  //   let currentTime = new Date(startDateTime);
  //   console.log(currentTime);
  //   while (currentTime < endDateTime) {
  //     intervals.push(currentTime.toTimeString().split(" ")[0]); // Extract HH:MM:SS
  //     currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // Add 15 minutes
  //   }
  //   const dates = [];
  //   const startDate = new Date("2024-12-10");
  //   const endDate = new Date("2024-12-20");
  //   const currentDate = new Date(startDate);

  //   // Increment the date until it reaches the end date
  //   while (currentDate <= endDate) {
  //     dates.push(currentDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   console.log(intervals);
  //   console.log(dates);
  //   for (let i = 0; i < intervals.length - 1; i++) {
  //     for (let j = 0; j < dates.length; j++) {
  //       addEvent("dummy", dates[j], intervals[i], intervals[j]);
  //     }
  //   }
  // }

  return (
    <div>
      <h1>My Calendar Page</h1>
      <nav>
        <a href="/signup">SignUp </a>
        <a href="/login">login </a>
        <a href="/logout">logout </a>
      </nav>
      <FixedPlanForm onEventsAdded={fetchEvents} />
      {/* <GoalForm onEventsAdded={fetchEvents} /> */}
      <button onClick={fetchEvents}>Reload Data</button>
      {/* <button onClick={quickAdd}>quickAdd</button> */}
      <Chat />

      <Calendar events={events} />
    </div>
  );
}
