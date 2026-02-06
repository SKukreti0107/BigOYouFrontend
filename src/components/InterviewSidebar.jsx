import CodingTimer from "./CodingTimer"
import Notepad from "./notepad"
const demo = {
  title: "Two Sum",
  statement: "	Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume each input has exactly one solution, and you cannot use the same element twice.",
  example: "Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: nums[0] + nums[1] = 2 + 7 = 9",
  difficulty: "EASY",
  expected_time: "12"
}

export default function InterviewSidebar({ problem_deets = demo, onRun, curr_phase, onDryRun, onEndReview, hasRunCode = false }) {

  return (
    <section className="w-[450px] flex flex-col border-r border-border-dark bg-panel-dark overflow-hidden">
      <div className="p-4 border-b border-border-dark flex items-center justify-between bg-background-dark/50">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-xl">timer</span>
          <span className="font-mono text-lg font-bold"><CodingTimer minutes={problem_deets.expected_time}></CodingTimer></span>
        </div>
        {/* <div className="text-xs  font-medium">{problem_deets.expected_time} minutes</div> */}
      </div>
      <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
        <div className="mb-6">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
            {problem_deets.difficulty}
          </span>
          <h2 className="text-2xl font-bold mt-2">{problem_deets.title}</h2>
        </div>
        <article className="text-slate-400 text-sm leading-relaxed space-y-4">
          <p>
            {problem_deets.statement}
          </p>
          <div className="my-6 p-4 bg-background-dark rounded-lg border border-border-dark">
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Example</h4>
            <code>{problem_deets.example}</code>
          </div>
        </article>
      </div>
      {/* {curr_phase!="PROBLEM_DISCUSSION"?(<Notepad/>):null} */}
      <div className="p-4 border-t border-border-dark flex gap-2">
        {curr_phase == "PROBLEM_DISCUSSION" ? null : (
          <>
            <button onClick={onRun} className="flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-900/20">
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              Run Code
            </button>
            {(curr_phase == "REVIEW") ? (
              <button
                onClick={onEndReview}
                className="flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/20"
              >
                <span className="material-symbols-outlined text-sm">done_all</span>
                End & Generate Feedback
              </button>
            ) : (
              <button
                onClick={onDryRun}
                disabled={!hasRunCode}
                className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded text-white font-bold transition-all shadow-lg shadow-emerald-900/20 ${
                  hasRunCode ? "bg-yellow-600 hover:bg-yellow-500" : "bg-yellow-600/50 cursor-not-allowed"
                }`}
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Proceed to Dry Run
              </button>
            )}
          </>
        )}

      </div>
    </section>
  )
}