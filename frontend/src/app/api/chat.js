// pages/api/chat.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", // or 'gpt-3.5-turbo' based on your access
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      res
        .status(200)
        .json({ response: response.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: "Error connecting to OpenAI API" });
    }
  } else {
    res.status(405).json({ error: "Only POST requests allowed" });
  }
}
