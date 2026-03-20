import api from "./Api";
import { useState, useEffect } from "react";

const ButtonSpinner = () => (
  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
);

export default function Notepad({ session_id, onStartCoding, onSetMessage, onAgentResponse, curr_phase, loadingType, setLoadingType }) {
  const STORAGE_KEY = `interview.notepad.${session_id}`;

  const [approach, setApproach] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) ?? "";
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, approach);
  }, [approach, STORAGE_KEY]);

  const onReviewApproach = async () => {
    try {
      setLoadingType('APPROACH_REVIEW');
      let res = await api.post('/interview/problem_discussion', { session_id: session_id, message: approach })
      console.log(res.data)
      onSetMessage(res.data.response)
      onAgentResponse?.(res?.data)
    } catch (error) {
      console.error("Error reviewing approach:", error);
    } finally {
      setLoadingType(null);
    }
  }

  const onApproachInput = (event) => {
    setApproach(event.target.value)
  }

  const isReadOnly = curr_phase !== "PROBLEM_DISCUSSION";

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-3 overflow-hidden">
      <div className="flex-1 min-h-0 p-2">
        <textarea
          aria-label="approach notepad"
          value={approach}
          onChange={onApproachInput}
          readOnly={isReadOnly}
          placeholder={`Explain your approach here...
• What is the core idea?
• What edge cases matter?
• What is the rough time complexity?`}
          className="h-full w-full resize-none overflow-y-auto rounded border-none p-3"
          style={{
            backgroundColor: isReadOnly ? "#2c313c" : "#4f566d",
            color: "#e2e8f0",
            cursor: isReadOnly ? "not-allowed" : "text",
            outline: "none",
          }}
        />
      </div>

      {curr_phase == "PROBLEM_DISCUSSION" ? (<div className="flex justify-between p-1 items-center" style={{ backgroundColor: "#181a22" }}>
        <button
          type="button"
          disabled={loadingType !== null}
          className={`px-4 py-2 rounded text-white font-bold transition-all flex items-center gap-2 ${loadingType !== null ? "bg-green-900/50 cursor-not-allowed" : "bg-green-900 hover:bg-green-800"}`}
          onClick={onReviewApproach}
        >
          {loadingType === 'APPROACH_REVIEW' ? <ButtonSpinner /> : null}
          {loadingType === 'APPROACH_REVIEW' ? "Reviewing..." : "Review my approach"}
        </button>
        {/* <span className="text-sm text-slate-400">If you feel confident and ready, proceed to coding.</span> */}
        {/* <button
          type="button"
          disabled={loadingType !== null}
          className={`px-4 py-2 rounded text-white font-bold transition-all flex items-center gap-2 ${loadingType !== null ? "bg-indigo-600/50 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}
          onClick={onStartCoding}
        >
          {loadingType === 'STARTING' ? <ButtonSpinner /> : null}
          {loadingType === 'STARTING' ? "Starting..." : "Start coding"}
        </button> */}
      </div>) : null}

    </div>
  );
}
