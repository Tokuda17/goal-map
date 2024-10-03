// src/app/components/Event.js
import "../styles/event.css"; // Use relative path for the CSS file

const EVENT_URL = "/api/events";

export async function getEvents() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(EVENT_URL, requestOptions);

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    return responseData.events;
  }
}

export async function addEvent(name, date, start_time, end_time) {
  const event = {
    name: name,
    date: date,
    start_time: start_time,
    end_time: end_time,
  };
  const jsonData = JSON.stringify(event);
  console.log("Add Event", jsonData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  const response = await fetch(EVENT_URL, requestOptions);

  if (response.ok) {
    console.log("Event Added");
    return event;
  } else {
    console.error("Failed to create event");
  }
}

export async function deleteEvent(name, date, start_time, end_time) {
  const events = await getEvents();

  for (var i = 0; i < events.length; i++) {
    if (
      events[i].name == name &&
      events[i].date == date &&
      events[i].start_time == start_time &&
      events[i].end_time == end_time
    ) {
      const jsonData = JSON.stringify(events[i]);
      console.log("Delete Event", jsonData);
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      };

      const response = await fetch(EVENT_URL, requestOptions);
      console.log(response);
      if (response) {
        console.log("Event Deleted");
        return;
      } else {
        console.error("Failed to Delete event");
      }
    }
  }
  console.log("NOT IN EVENTS");
}

export default function Event({
  name,
  date,
  start_time,
  end_time,
  top,
  style,
}) {
  const handleDelete = async () => {
    try {
      await deleteEvent(name, date, start_time, end_time);
    } catch (error) {
      console.error("An error occurred while deleting the event");
    }
  };

  return (
    <div className="event-block" style={{ ...style, top }}>
      <header>
        <div className="event-title">{name}</div>
        <button onClick={handleDelete}>Delete</button>
      </header>
      <div className="event-times">
        {start_time} - {end_time}
      </div>
    </div>
  );
}
