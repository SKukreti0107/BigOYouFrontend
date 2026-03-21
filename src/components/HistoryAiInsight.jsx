export default function HistoryAiInsight() {
    return (
        <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                <span className="material-symbols-outlined max-w-[24px]">lightbulb</span>
            </div>
            <div>
                <h4 className="font-bold text-slate-100 text-lg">Performance Insight</h4>
                <p className="text-sm text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
                    Your performance in <span className="text-purple-400 font-semibold">Graph traversal</span> topics has
                    improved by 15% over the last 3 sessions. Consider attempting more <span
                        className="text-red-400 font-semibold">Hard</span> difficulty DP problems to maintain your
                    growth trajectory.
                </p>
            </div>
        </div>
    )
}