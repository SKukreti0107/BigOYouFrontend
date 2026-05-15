const formatDateTime = (value) => {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString();
};

export default function LatestCodeCard({ latestCode }) {
    return (
        <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-100">Latest Code Snapshot</h3>
                <span className="text-xs text-slate-400">
                    {latestCode?.language || "Unknown Language"} • {formatDateTime(latestCode?.created_at)}
                </span>
            </div>

            {!latestCode?.code ? (
                <div className="text-slate-400 text-sm p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                    No code submitted for this session.
                </div>
            ) : (
                <pre className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    <code>{latestCode.code}</code>
                </pre>
            )}
        </section>
    );
}
