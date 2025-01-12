// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import { getEvents } from "./components/Event";
import Button from "./components/Button";
import "./styles/home.css";
import Link from "next/link";

const EVENTS_URL = "/api/events/";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-top">
        <p className="home-slogan">Effortless Scheduling with AI</p>
        <h1 className="home-title">RU Busy</h1>

        <Link className="home-signup" href="/signup">
          <Button name="Sign Up" />
        </Link>
        <p className="home-slogan">#1 App To Improve Time Management.</p>
      </div>
    </div>
  );
}
