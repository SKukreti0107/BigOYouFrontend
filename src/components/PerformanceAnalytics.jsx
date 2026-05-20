import MultiLineChart from './MultiLineChart'

export default function PerformanceAnalytics({ scoreTrend, loading = false }) {
    if (loading) {
        return (
            <div className="w-full h-[360px] bg-[#0d1117]/30 border border-[#30363d] rounded-xl flex items-center justify-center relative overflow-hidden animate-pulse">
                {/* SVG path to look like a line chart outline */}
                <svg className="w-full h-full p-6 text-slate-800/35" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d="M 0 150 Q 50 120 100 130 T 200 70 T 300 90 T 400 30" fill="none" stroke="currentColor" strokeWidth="4" />
                    <line x1="0" y1="190" x2="400" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50" y1="0" x2="50" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="150" y1="0" x2="150" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="250" y1="0" x2="250" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="350" y1="0" x2="350" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
            </div>
        );
    }
    return (
        <MultiLineChart height={360} scoreTrend={scoreTrend}></MultiLineChart>
    )
}