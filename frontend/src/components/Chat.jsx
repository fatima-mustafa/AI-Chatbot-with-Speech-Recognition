import "./css/Chat.css";

export default function Chat({ messages }) {
  return (
    <div className="chat-box">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={msg.sender === "AI" ? "bubble ai-bubble" : "bubble user-bubble"}
        >
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}
