export default function HistoryStats() {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161b22] p-6 rounded-2xl border border-[#30363d] shadow-sm">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total
                    Sessions</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">24</span>
                    <span className="text-xs text-emerald-500 flex items-center">+3 this week</span>
                </div>
            </div>
            <div className="bg-[#161b22] p-6 rounded-2xl border border-[#30363d] shadow-sm">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Average
                    Score</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">78%</span>
                    <span className="text-xs text-emerald-500 flex items-center">
                        <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                        4% from last month
                    </span>
                </div>
            </div>
            <div className="bg-[#161b22] p-6 rounded-2xl border border-[#30363d] shadow-sm">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Success
                    Rate</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">92%</span>
                    <span className="text-xs text-slate-400 italic">Easy/Medium only</span>
                </div>
            </div>
        </div>

    )
}