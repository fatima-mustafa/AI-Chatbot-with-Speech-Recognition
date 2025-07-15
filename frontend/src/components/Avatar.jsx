import "./css/Avatar.css";
export default function Avatar({ isSpeaking }) {
  return (
    <div className="avatar-container">
      <img
        src="avatar.png"
        alt="AI Avatar"
        className={isSpeaking ? "avatar speaking" : "avatar"}
      />
    </div>
  );
}
