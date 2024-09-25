// src/app/components/Event.js
import "../styles/event.css"; // Use relative path for the CSS file

export default function Event({ name, start_time, end_time, top, style }) {
  return (
    <div className="event-block" style={{ ...style, top }}>
      <div className="event-title">{name}</div>
      <div className="event-times">
        {start_time} - {end_time}
      </div>
    </div>
  );
}
