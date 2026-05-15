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

const Item = ({ label, value }) => (
    <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">{label}</p>
        <p className="text-sm text-slate-200 break-all">{value || "-"}</p>
    </div>
);

export default function SessionOverviewCard({ overview }) {
    return (
        <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Session Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Item label="Session ID" value={overview?.session_id} />
                <Item label="Topic" value={overview?.topic} />
                <Item label="Current Phase" value={overview?.phase} />
                <Item label="Status" value={overview?.status} />
                <Item label="Started At" value={formatDateTime(overview?.started_at)} />
                <Item label="Problem ID" value={overview?.problem_id} />
            </div>
        </section>
    );
}
