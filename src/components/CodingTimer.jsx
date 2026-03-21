import Countdown from "react-countdown";
import api from "./Api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function CodingTimer({ onTimeUp, curr_phase, extensionSeconds = 0 }) {
  const { sessionId } = useParams();
  const [remainingTime, setRemainingTime] = useState(null);
  const prevExtensionRef = useRef(0);
  // Track whether this component already fired onTimeUp for the current mount
  const hasFiredRef = useRef(false);
  const isFrozen = curr_phase !== "CODING" && curr_phase !== "PROBLEM_DISCUSSION";

  const handleTimeUp = () => {
    // Only fire once per mount cycle to prevent re-triggering on refresh
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    if (typeof onTimeUp === "function") {
      onTimeUp();
    }
  }

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const res = await api.post("/interview/session/timer", null, {
          params: { session_id: sessionId }
        });
        if (res.data !== undefined && typeof res.data === 'number') {
          const secs = Math.max(0, Math.floor(res.data));
          setRemainingTime(secs);
        }
      } catch (err) {
        console.error("Error fetching timer:", err);
      }
    };
    if (sessionId) fetchTimer();
  }, [sessionId]);

  useEffect(() => {
    const previousExtension = prevExtensionRef.current;
    if (extensionSeconds > previousExtension) {
      const extensionDelta = extensionSeconds - previousExtension;
      setRemainingTime((prev) => (prev == null ? prev : prev + extensionDelta));
      // Reset the "already fired" flag so the new timer can fire onTimeUp later
      hasFiredRef.current = false;
    }
    prevExtensionRef.current = extensionSeconds;
  }, [extensionSeconds]);

  if (remainingTime == null) {
    return <span className="text-slate-400">--:--</span>;
  }

  // If time is already 0, show 0:00 without starting a countdown
  if (remainingTime <= 0) {
    return <span>0:00</span>;
  }

  const endTime = Date.now() + remainingTime * 1000;

  return (
    <Countdown
      key={`${sessionId}-${extensionSeconds}`}
      date={endTime}
      autoStart={!isFrozen}
      onComplete={handleTimeUp}
      renderer={({ minutes, seconds }) => (
        <span>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      )}
    />
  );
}
