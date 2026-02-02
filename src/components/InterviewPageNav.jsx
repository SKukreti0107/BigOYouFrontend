export default function InterviewPageNav({ curr_phase }) {
  const phases = [
    "PROBLEM_DISCUSSION",
    "CODING",
    "REVIEW",
    "FEEDBACK",
  ];

  const activeIndex = Math.max(phases.indexOf(curr_phase), 0);

  return (
    <header className="h-14 border-b border-border-dark flex items-center justify-between px-4 shrink-0 bg-panel-dark">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-tight hidden md:block">BigO(You)</h1>
        </div>
        <div className="h-6 w-[1px] bg-border-dark"></div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Interview Progress</span>
          <div className="flex gap-1">
            {phases.map((_, idx) => (
              <div
                key={idx}
                className={`w-6 h-1.5 rounded-full ${idx <= activeIndex ? "bg-primary" : "bg-border-dark"}`}
              ></div>
            ))}
          </div>
          <span className="text-sm font-medium ml-2">{curr_phase}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-1.5 rounded hover:bg-slate-700 text-sm font-medium transition-colors border border-border-dark bg-red-500/10">
          End Interview
        </button>
      </div>
    </header>
  );
}