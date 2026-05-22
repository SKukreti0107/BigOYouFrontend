export default function InterviewPageNav({ curr_phase, onEndInterview }) {
  const phases = [
    "PROBLEM_DISCUSSION",
    "CODING",
    "REVIEW",
    "FEEDBACK",
  ];

  const activeIndex = Math.max(phases.indexOf(curr_phase), 0);

  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 shrink-0 glass-header select-none">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-tight hidden md:block bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">BigO(You)</h1>
        </div>
        <div className="h-6 w-[1px] bg-white/10"></div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Interview Progress</span>
          <div className="flex gap-1.5">
            {phases.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx <= activeIndex
                    ? "bg-primary w-8"
                    : "bg-white/10 w-6"
                }`}
              ></div>
            ))}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 ml-2">
            {curr_phase.replace("_", " ")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onEndInterview}
          className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border border-red-500/20 hover:border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 hover:scale-[1.02] cursor-pointer"
        >
          End Interview
        </button>
      </div>
    </header>
  );
}