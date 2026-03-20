export default function HistoryAiInsight() {
    return (
        <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 flex items-start gap-4 m-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
                <h4 className="font-bold text-slate-100">Performance Insight</h4>
                <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                    Your performance in <span className="text-primary font-semibold">Graph traversal</span> topics has
                    improved by 15% over the last 3 sessions. Consider attempting more <span
                        className="text-red-400 font-semibold">Hard</span> difficulty DP problems to maintain your
                    growth trajectory.
                </p>
            </div>
        </div>
    )
}