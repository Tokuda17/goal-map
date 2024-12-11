"use client"; // If using hooks or state management in Next.js

import { useState, useEffect } from "react";
import { addEvent, deleteEvent, getEvents } from "./Event";
import { getConflict, convertMinutesToTime } from "../utils";

const EVENT_URL = "/api/events";

export default function quickAdd({ onEventsAdded }) {
  return (
    <button onClick={quickAdd()} type="submit">
      Quick Add
    </button>
  );
}
