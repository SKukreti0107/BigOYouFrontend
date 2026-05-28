import CodingTimer from "./CodingTimer"
const demo = {
  title: "Two Sum",
  statement: "	Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume each input has exactly one solution, and you cannot use the same element twice.",
  example: "Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: nums[0] + nums[1] = 2 + 7 = 9",
  difficulty: "EASY",
  expected_time: "12"
}

const ButtonSpinner = () => (
  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
);

const parseExample = (exampleStr) => {
  const str = exampleStr || "";
  const inputIndex = str.indexOf("Input:");
  const outputIndex = str.indexOf("Output:");
  const explanationIndex = str.indexOf("Explanation:");

  if (inputIndex === -1 && outputIndex === -1) {
    return <code>{str}</code>;
  }

  let inputVal = "";
  let outputVal = "";
  let explanationVal = "";

  if (inputIndex !== -1) {
    const end = outputIndex !== -1 ? outputIndex : (explanationIndex !== -1 ? explanationIndex : str.length);
    inputVal = str.slice(inputIndex + 6, end).trim();
  }

  if (outputIndex !== -1) {
    const end = explanationIndex !== -1 ? explanationIndex : str.length;
    outputVal = str.slice(outputIndex + 7, end).trim();
  }

  if (explanationIndex !== -1) {
    explanationVal = str.slice(explanationIndex + 12).trim();
  }

  return (
    <>
      {inputVal && (
        <div>
          <span className="text-blue-400 font-semibold mr-2 font-sans select-none">Input:</span>
          <span className="text-slate-300 font-mono">{inputVal}</span>
        </div>
      )}
      {outputVal && (
        <div className="mt-1.5">
          <span className="text-emerald-400 font-semibold mr-2 font-sans select-none">Output:</span>
          <span className="text-emerald-300 font-bold font-mono">{outputVal}</span>
        </div>
      )}
      {explanationVal && (
        <div className="mt-2.5 pt-2.5 border-t border-white/5 text-slate-400 text-[11px] leading-relaxed">
          <span className="font-semibold text-slate-500 font-sans select-none block mb-1">Explanation:</span>
          {explanationVal}
        </div>
      )}
    </>
  );
};

export default function InterviewSidebar({ problem_deets = demo, onRun, curr_phase, onDryRun, onEndReview, onTimeout, extensionSeconds = 0, hasRunCode = false, loadingType }) {
  const diff = (problem_deets.difficulty || "EASY").toUpperCase();
  const diffBadgeClass = diff === "EASY"
    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
    : diff === "MEDIUM"
      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
      : "bg-rose-500/10 text-rose-400 border border-rose-500/30";

  return (
    <section className="w-[450px] flex flex-col border-r border-white/5 glass-panel overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-xl">timer</span>
          <span className="font-mono text-lg font-bold"><CodingTimer onTimeUp={onTimeout} curr_phase={curr_phase} extensionSeconds={extensionSeconds}></CodingTimer></span>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
        <div className="mb-6">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${diffBadgeClass}`}>
            {problem_deets.difficulty}
          </span>
          <h2 className="text-2xl font-bold mt-3 text-white tracking-tight leading-tight">{problem_deets.title}</h2>
        </div>
        <article className="text-slate-300 text-sm leading-relaxed space-y-4 font-light">
          {problem_deets.statement ? (
            problem_deets.statement.split(/\r?\n/).map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              return (
                <p 
                  key={index} 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: trimmed }} 
                />
              );
            })
          ) : null}
          <div className="my-6 rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-[#020617]/90 font-mono text-xs">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0b0f19] border-b border-white/5">
              <div className="flex items-center gap-1.5 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-[10px] text-slate-500 font-sans tracking-wide uppercase font-semibold select-none">
                bash - example.sh
              </span>
              <div className="w-12"></div> {/* Spacer for symmetry */}
            </div>
            {/* Terminal Content */}
            <div className="p-4 space-y-3 leading-relaxed text-slate-200">
              {parseExample(problem_deets.example)}
            </div>
          </div>
        </article>
      </div>
      {/* {curr_phase!="PROBLEM_DISCUSSION"?(<Notepad/>):null} */}
      <div className="p-4 border-t border-white/5 bg-slate-900/20 backdrop-blur-sm flex gap-2">
        {curr_phase == "PROBLEM_DISCUSSION" ? null : (
          <>
            <button
              onClick={onRun}
              disabled={loadingType !== null}
              className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-900/20 ${loadingType !== null ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loadingType === 'RUNNING' ? <ButtonSpinner /> : <span className="material-symbols-outlined text-sm">play_arrow</span>}
              {loadingType === 'RUNNING' ? "Running..." : "Run Code"}
            </button>
            {/* {(curr_phase == "REVIEW") ? (
              <button
                onClick={onEndReview}
                disabled={loadingType !== null}
                className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/20 ${loadingType !== null ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loadingType === 'FEEDBACK' ? <ButtonSpinner /> : <span className="material-symbols-outlined text-sm">done_all</span>}
                {loadingType === 'FEEDBACK' ? "Generating..." : "End & Generate Feedback"}
              </button>
            ) : (
              <button
                onClick={onDryRun}
                disabled={!hasRunCode || loadingType !== null}
                className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded text-white font-bold transition-all shadow-lg shadow-emerald-900/20 ${hasRunCode && loadingType === null ? "bg-yellow-600 hover:bg-yellow-500" : "bg-yellow-600/50 cursor-not-allowed"
                  }`}
              >
                {loadingType === 'DRY_RUN' ? <ButtonSpinner /> : <span className="material-symbols-outlined text-sm">play_arrow</span>}
                {loadingType === 'DRY_RUN' ? "Proceeding..." : "Proceed to Dry Run"}
              </button>
              
            )} */}
          </>
        )}

      </div>
    </section>
  )
}
