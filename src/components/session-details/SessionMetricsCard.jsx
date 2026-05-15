const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) {
        return "-";
    }
    const total = Math.max(0, Number(seconds) || 0);
    const mins = Math.floor(total / 60);
    const secs = Math.floor(total % 60);
    return `${mins}m ${secs}s`;
};

const Metric = ({ label, value }) => (
    <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">{label}</p>
        <p className="text-xl font-bold text-slate-100">{value}</p>
    </div>
);

export default function SessionMetricsCard({ metrics }) {
    return (
        <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Session Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Metric
                    label="Total Time Spent"
                    value={formatDuration(metrics?.total_time_spent_sec)}
                />
                <Metric
                    label="Time To First Submit"
                    value={formatDuration(metrics?.time_to_first_submission_sec)}
                />
                <Metric
                    label="Total Submissions"
                    value={metrics?.total_submissions ?? 0}
                />
                <Metric
                    label="Hints Used"
                    value={metrics?.hints_used ?? 0}
                />
            </div>
        </section>
    );
}
