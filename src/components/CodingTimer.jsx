import Countdown from "react-countdown";

export default function CodingTimer({ minutes, onTimeUp }) {
  const endTime = Date.now() + minutes * 60 * 1000;

  return (
    <Countdown
      date={endTime}
      onComplete={onTimeUp}
      renderer={({ minutes, seconds }) => (
        <span>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      )}
    />
  );
}
