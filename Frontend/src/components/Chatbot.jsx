import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Moon, Sun, Bot, User } from "lucide-react";
import Particles from "react-tsparticles";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 I’m your personal chatbot. I can tell you about my skills, projects, or answer questions!",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [quote, setQuote] = useState("");
  const [techTip, setTechTip] = useState("");
  const [time, setTime] = useState(new Date());
  const [mood, setMood] = useState("😊");
  const chatEndRef = useRef(null);

  // moods for chatbot
  const moods = ["😊", "🤔", "😃", "😲", "😎", "🤖"];

useEffect(() => {
  const myQuotes = [
    "Stay positive, keep coding! 💻",
    "Code never lies, comments sometimes do. 📝",
    "First, solve the problem. Then, write the code. 🧠",
    "Make it work, make it right, make it fast. ⚡",
    "Simplicity is the soul of efficiency. ✨",
    "Debugging is like being the detective in a crime movie where you are also the murderer. 🔍",
    "Talk is cheap. Show me the code. 💬➡️💻",
  ];

  // 50% chance API, 50% chance local
  if (Math.random() > 0.5) {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => {
        setQuote(myQuotes[Math.floor(Math.random() * myQuotes.length)]);
      });
  } else {
    setQuote(myQuotes[Math.floor(Math.random() * myQuotes.length)]);
  }

  const tips = [
    "💡 Use meaningful variable names.",
    "💡 Break big functions into smaller ones.",
    "💡 Always handle API errors gracefully.",
    "💡 Use Git branches for safe development.",
  ];
  setTechTip(tips[Math.floor(Math.random() * tips.length)]);
}, []);


  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Change mood every 5s
  useEffect(() => {
    const moodInterval = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(moodInterval);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/chat",
        { prompt: input },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = { text: res.data.text, sender: "bot" };
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching response", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error retrieving response", sender: "bot" },
      ]);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: darkMode
          ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(135deg, #74ebd5, #ACB6E5)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Main content */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1 position-relative">
        {/* Particle Background */}
        <Particles
          className="position-absolute w-100 h-100"
          options={{
            background: { color: { value: "transparent" } },
            particles: {
              number: { value: 40 },
              size: { value: 3 },
              move: { enable: true, speed: 1 },
              links: { enable: true, color: "#ffffff" },
            },
          }}
        />

        {/* Left Panel - Tech Tip + Clock */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white me-4"
          style={{ width: "220px", zIndex: 1 }}
        >
          <h6>⏰ {time.toLocaleTimeString()}</h6>
          <p style={{ fontSize: "14px" }}>{techTip}</p>
        </div>

        {/* Chatbot Card */}
        <div
          className={`card shadow-lg ${
            darkMode ? "bg-secondary" : "bg-white"
          } d-flex flex-column`}
          style={{
            width: "650px",
            height: "80vh",
            borderRadius: "20px",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            className={`card-header d-flex justify-content-between align-items-center ${
              darkMode ? "bg-dark text-white" : "bg-primary text-white"
            }`}
          >
            <h5 className="m-0 d-flex align-items-center">
              <Bot className="me-2" /> Chatbot {mood}
            </h5>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Messages */}
          <div
            className="card-body chat-box flex-grow-1"
            style={{ overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div
                    className={`me-2 rounded-circle d-flex align-items-center justify-content-center ${
                      darkMode ? "bg-dark" : "bg-primary"
                    }`}
                    style={{ width: "35px", height: "35px" }}
                  >
                    <Bot size={18} color="white" />
                  </div>
                )}
                <div
                  className={`p-3 rounded shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : darkMode
                      ? "bg-dark text-white"
                      : "bg-light"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.sender === "user" && (
                  <div
                    className={`ms-2 rounded-circle d-flex align-items-center justify-content-center ${
                      darkMode ? "bg-dark" : "bg-secondary"
                    }`}
                    style={{ width: "35px", height: "35px" }}
                  >
                    <User size={18} color="white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="d-flex align-items-center mb-2">
                <div
                  className={`p-2 rounded ${
                    darkMode ? "bg-dark text-white" : "bg-light"
                  }`}
                >
                  <span className="typing-dots">...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="card-footer p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Quote of the Day */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white ms-4"
          style={{ width: "220px", zIndex: 1 }}
        >
          <h6>📜 Quote of the Day</h6>
          <p style={{ fontSize: "14px", fontStyle: "italic" }}>{quote}</p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-2"
        style={{
          background: darkMode ? "#111" : "#007bff",
          color: "white",
        }}
      >
        © 2025 Nikitha
      </footer>
    </div>
  );
};

export default Chatbot;

