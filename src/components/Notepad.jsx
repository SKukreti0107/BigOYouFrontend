import TextareaAutosize from "@mui/material/TextareaAutosize";
import api from "./Api";
import { useState } from "react";
export default function Notepad({ session_id, onStartCoding,onSetMessage }) {

  const [approach, setApproach] = useState("");

  const onReviewApproach = async () => {
    let res = await api.post('/interview/problem_discussion', { session_id: session_id, message: approach })
    console.log(res.data)
    onSetMessage(res.data.response)
  }



  const onApproachInput = (event) => {
    setApproach(event.target.value)
    // console.log(approach)
  }

  return (
    <div className="flex flex-col gap-4 p-3">
      <TextareaAutosize
        aria-label="approach notepad"
        value={approach}
        onChange={onApproachInput}
        minRows={20}
        placeholder={`Explain your approach here...
• What is the core idea?
• What edge cases matter?
• What is the rough time complexity?`}
        style={{ margin: 10, backgroundColor: "#4f566d", color: "#e2e8f0", }}
      /><button
        type="button"
        className="px-4 py-2 rounded bg-green-900 hover:bg-green-800"
        onClick={onReviewApproach}
      >
        Review my approach
      </button>
      <div className="flex justify-between p-1 items-center" style={{ backgroundColor: "#181a22" }}>
        <span>If you feel confident and ready, proceed to coding.</span>
        <button
          type="button"
          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500"
          onClick={onStartCoding}
        >
          Start coding
        </button>
      </div>
    </div>
  );
}