// src/app/page.js
import FixedPlanForm from "./components/FixedPlanForm";
import GoalForm from "./components/GoalForm";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <div>
      <h1>My Calendar App</h1>
      <FixedPlanForm />
      <GoalForm />
      <Calendar />
    </div>
  );
}
