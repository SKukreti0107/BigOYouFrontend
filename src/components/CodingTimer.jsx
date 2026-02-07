import Countdown from "react-countdown";
import api from "./Api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CodingTimer({ minutes, onTimeUp, setPhase }) {
  const { sessionId } = useParams();
  const [remainingTime, setRemainingTime] = useState(minutes * 60);

  const handleTimeUp = () => {
    // onTimeUp();
    setPhase("REVIEW");
  }

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const res = await api.post("/interview/session/timer", null, {
          params: { session_id: sessionId }
        });
        if (res.data !== undefined && typeof res.data === 'number') {
          setRemainingTime(res.data);
        }
      } catch (err) {
        console.error("Error fetching timer:", err);
      }
    };
    if (sessionId) fetchTimer();
  }, [sessionId]);

  const endTime = Date.now() + remainingTime * 1000;

  return (
    <Countdown
      key={endTime}
      date={endTime}
      onComplete={handleTimeUp}
      renderer={({ minutes, seconds }) => (
        <span>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      )}
    />
  );
}
