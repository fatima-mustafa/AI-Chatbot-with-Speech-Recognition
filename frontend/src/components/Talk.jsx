import "./css/Talk.css";

export default function Talk({ onClick }) {
  return (
    <button className="talk-btn" onClick={onClick}>
      🎤 Talk
    </button>
  );
}
