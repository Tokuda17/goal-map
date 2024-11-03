// pages/index.js
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    // Display user's message
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      const response = await axios.post("/api/chat", { message: input });
      // Display chatbot's response
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Chat with AI</h1>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          minHeight: "300px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{ textAlign: msg.role === "user" ? "right" : "left" }}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ width: "100%", padding: "10px" }}
      />
      <button
        onClick={sendMessage}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        Send
      </button>
    </div>
  );
}
