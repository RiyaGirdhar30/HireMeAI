import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

// const API_URL = "http://127.0.0.1:8000";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const suggestions = [
  { icon: "✦", label: "About me", prompt: "Tell me about Riya." },
  { icon: "⌘", label: "Projects", prompt: "Tell me about Riya's projects." },
  { icon: "◇", label: "Technical skills", prompt: "What are Riya's technical skills?" },
  { icon: "↗", label: "Contact", prompt: "How can I contact Riya?" },
];

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastFailedQuestion, setLastFailedQuestion] = useState("");
  const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, [messages, loading, error]);

  async function handleSend(text = input, isRetry=false) {
    const question = text.trim();

    if (!question || loading) return;

   setInput("");
setError("");
setLastFailedQuestion("");

if (!isRetry) {
  setMessages((previous) => [
    ...previous,
    { role: "user", content: question },
  ]);
}

setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (typeof data.answer !== "string") {
        throw new Error("The server returned an unexpected response.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      console.error("Chat request failed:", err);

      setLastFailedQuestion(question);
      setError(
        "I couldn't get a response. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    if (loading) return;
    setMessages([]);
    setInput("");
    setError("");
    setLastFailedQuestion("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/">
          <span className="brand-icon">✳</span>
          <span>
            HireMe<span className="brand-accent">AI</span>
          </span>
        </a>

        <button className="new-chat" onClick={startNewChat}>
          <span>＋</span> New conversation
        </button>

        <div className="sidebar-label">YOUR ASSISTANT</div>

        <div className="sidebar-item active">
          <span>✦</span> Portfolio assistant
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">RG</div>
          <div>
            <strong>Riya Girdhar</strong>
            <p>Developer portfolio</p>
          </div>
          <span className="online-dot" />
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="status-dot" />
            <span>AI PORTFOLIO ASSISTANT</span>
          </div>
          <span className="topbar-badge">✧ Powered by AI</span>
        </header>

        <section className="chat-area">
          {messages.length === 0 && (
            <div className="welcome">
              <div className="eyebrow">
                <span>✦</span> YOUR NEXT DEVELOPER CONNECTION
              </div>

              <div className="hero-avatar">
                <span>R</span>
                <i>✦</i>
              </div>

              <h1>
                Hey there, <span>curious mind.</span>
              </h1>

              <p className="hero-description">
                I'm HireMeAI, your guide to Riya's world of code,
                creativity, and projects. Ask me anything.
              </p>

              <div className="suggestion-heading">
                <span>GET TO KNOW RIYA</span>
                <span>✧ 4 QUICK STARTERS</span>
              </div>

              <div className="suggestion-grid">
                {suggestions.map((item) => (
                  <button
                    className="suggestion-card"
                    key={item.label}
                    onClick={() => handleSend(item.prompt)}
                    disabled={loading}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="messages" aria-live="polite">
              {messages.map((message, index) => (
                <div
  className={`message-row ${
    message.role === "user" ? "user-message" : "assistant-message"
  }`}
  key={index}
>
                  <span className="message-avatar">
                    {message.role === "user" ? "RG" : "AI"}
                  </span>
                  <div className="message-content">
                    <strong>
                      {message.role === "user" ? "You" : "HireMeAI"}
                    </strong>
                    <div className="markdown-content">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.content}
  </ReactMarkdown>
</div>
                  </div>
                </div>
              ))}

              {loading && (
  <div className="message-row assistant-message typing-row">
    <span className="message-avatar">AI</span>
    <div className="message-content">
      <strong>HireMeAI</strong>
      <div
        className="typing-bubble"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label="HireMeAI is generating a response"
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-label">Thinking</span>
      </div>
    </div>
  </div>
)}

              <div ref={messagesEndRef} className="chat-end" />
            </div>
          )}

          {error && (
  <div className="chat-error" role="alert" aria-atomic="true">
    <span>{error}</span>

    {lastFailedQuestion && (
      <button
        className="retry-button"
        onClick={() => handleSend(lastFailedQuestion,true)}
        disabled={loading}
      >
        ↻ Retry
      </button>
    )}
  </div>
)}
        </section>

        <footer className="composer-section">
          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <span className="composer-sparkle">✧</span>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me about projects, skills, or experience..."
              aria-label="Ask HireMeAI a question"
              disabled={loading}
            />
            <button
              className="send-button"
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              {loading ? "…" : "↑"}
            </button>
          </form>

          <p className="disclaimer">
            <span>✧</span> Curious questions. Thoughtful answers.
            <span> Built with AI.</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;