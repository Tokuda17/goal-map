// src/app/components/GoalForm.js
"use client"; // Add this if using hooks

import { useState } from "react";

export default function GoalForm() {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle goal submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter flexible goal"
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
