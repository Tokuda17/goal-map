export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, date, startTime, endTime } = req.body;

    // Here, you can send the data to your backend (e.g., Django) via another API call
    // Example: Send to your Django API endpoint
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          date,
          start_time: startTime,
          end_time: endTime,
        }),
      });

      if (response.ok) {
        res.status(200).json({ message: "Event created successfully!" });
      } else {
        res.status(response.status).json({ error: "Failed to create event" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
