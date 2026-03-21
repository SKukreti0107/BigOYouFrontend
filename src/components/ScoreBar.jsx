export default function ScoreBar({ value }) {
    const getTrackColor = (v) => {
        if (v >= 80) return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]';
        if (v >= 50) return 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]';
        return 'bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.3)]';
    };

    return (
        <div className="w-full h-1.5 bg-[#0d1117]/80 ring-1 ring-[#30363d] rounded-full overflow-hidden">
            <div 
                className={`h-full ${getTrackColor(value)} rounded-full`}
                style={{ width: `${value}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
        </div>
    )
}