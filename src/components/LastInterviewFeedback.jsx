export default function LastInterviewFeedback({ positive=["Excellent approach explanation; communicated trade-offs clearly before coding.", "Optimal space complexity achieved through in-place pointer manipulation."], negative=["Missed edge case: failed to handle empty input arrays which caused a runtime error."] }) {

    return (
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 shadow-lg shadow-indigo-950/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">chat_bubble_outline</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <span className="material-symbols-outlined text-lg">smart_toy</span>
                </div>
                <div>
                    <h3 className="font-bold text-base text-white">Last Interview Feedback</h3>
                    <p className="text-[10px] text-indigo-300/60 uppercase tracking-widest">AI Agent Analysis</p>
                </div>
            </div>

            <ul className="space-y-4 mb-6 relative z-10">
                {positive.map((item, idx) => (
                    <li key={`pos-${idx}`} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5 shrink-0">check_circle</span>
                        <span className="text-xs text-slate-300 leading-relaxed font-medium">{item}</span>
                    </li>
                ))}
                
                {negative.map((item, idx) => (
                    <li key={`neg-${idx}`} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5 shrink-0">warning</span>
                        <span className="text-xs text-slate-300 leading-relaxed font-medium">{item}</span>
                    </li>
                ))}
            </ul>

            <button className="w-full py-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-100 transition-all relative z-10">
                View Full Feedback Report
            </button>
        </div>
    )
}