import Countdown from "react-countdown";
import api from "./Api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewErrorMessage } from "./interviewErrors";

export default function CodingTimer({ onTimeUp, curr_phase, extensionSeconds = 0 }) {
  const { sessionId } = useParams();
  const [endTime, setEndTime] = useState(null);
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
          setEndTime(Date.now() + secs * 1000);
        }
      } catch (err) {
        console.error("Error fetching timer:", err);
        alert(getInterviewErrorMessage(err, "loading interview timer"));
      }
    };
    if (sessionId) fetchTimer();
  }, [sessionId]);

  useEffect(() => {
    const previousExtension = prevExtensionRef.current;
    if (extensionSeconds > previousExtension) {
      const extensionDelta = extensionSeconds - previousExtension;
      setEndTime((prev) => (prev == null ? null : prev + extensionDelta * 1000));
      // Reset the "already fired" flag so the new timer can fire onTimeUp later
      hasFiredRef.current = false;
    }
    prevExtensionRef.current = extensionSeconds;
  }, [extensionSeconds]);

  if (endTime == null) {
    return <span className="text-slate-400">--:--</span>;
  }

  const remainingSecs = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  // If time is already 0, show 0:00 without starting a countdown
  if (remainingSecs <= 0) {
    return <span>0:00</span>;
  }

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
