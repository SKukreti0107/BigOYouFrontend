import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../components/Api";
import SessionDetailsHeader from "../components/session-details/SessionDetailsHeader";
import SessionOverviewCard from "../components/session-details/SessionOverviewCard";
import SessionMetricsCard from "../components/session-details/SessionMetricsCard";
import LatestCodeCard from "../components/session-details/LatestCodeCard";
import SessionFeedbackPanel from "../components/session-details/SessionFeedbackPanel";

const parseLatestCode = (codeStates) => {
    if (!Array.isArray(codeStates) || codeStates.length === 0) {
        return null;
    }
    return [...codeStates].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
};

export default function SessionDetails() {
    const { sessionId } = useParams();
    const [overview, setOverview] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [latestCode, setLatestCode] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSessionDetails = useCallback(async () => {
        if (!sessionId) {
            setError("Invalid session id.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        try {
            const requests = await Promise.allSettled([
                api.get("/interview/session", { params: { session_id: sessionId } }),
                api.get("/interview/session/metrics", { params: { session_id: sessionId } }),
                api.get("/interview/session/code_states", { params: { session_id: sessionId } }),
                api.get("/interview/session/feedback", { params: { session_id: sessionId } }),
            ]);

            const [overviewRes, metricsRes, codeStatesRes, feedbackRes] = requests;

            if (overviewRes.status === "fulfilled") {
                setOverview(overviewRes.value?.data ?? null);
            } else {
                setOverview(null);
            }

            if (metricsRes.status === "fulfilled") {
                setMetrics(metricsRes.value?.data ?? null);
            } else {
                setMetrics(null);
            }

            if (codeStatesRes.status === "fulfilled") {
                const codeStates = codeStatesRes.value?.data;
                setLatestCode(parseLatestCode(codeStates));
            } else {
                setLatestCode(null);
            }

            if (feedbackRes.status === "fulfilled") {
                const payload = feedbackRes.value?.data?.feedback;
                setFeedback(payload ? { feedback: payload } : null);
            } else {
                setFeedback(null);
            }

            if (requests.every((res) => res.status === "rejected")) {
                setError("Failed to load session details.");
            }
        } catch (err) {
            setError("Failed to load session details.");
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    useEffect(() => {
        loadSessionDetails();
    }, [loadSessionDetails]);

    const pageTitleTopic = useMemo(() => overview?.topic || "Interview Session", [overview]);

    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar />

                <main className="flex-1 flex flex-col min-w-0 ml-10 overflow-y-auto custom-scrollbar">
                    <SessionDetailsHeader topic={pageTitleTopic} sessionId={sessionId} />

                    <div className="px-8 flex flex-col gap-6 pb-12">
                        {loading && (
                            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 text-slate-400">
                                Loading session details...
                            </div>
                        )}

                        {!loading && error && (
                            <div className="bg-[#161b22] border border-red-500/40 rounded-2xl p-6">
                                <p className="text-red-300 mb-3">{error}</p>
                                <button
                                    onClick={loadSessionDetails}
                                    className="text-sm px-3 py-1.5 rounded-lg border border-[#30363d] text-slate-300 hover:text-white hover:border-slate-500"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!loading && !error && (
                            <>
                                <SessionOverviewCard overview={overview} />
                                <SessionMetricsCard metrics={metrics} />
                                <LatestCodeCard latestCode={latestCode} />
                                <SessionFeedbackPanel feedback={feedback} />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
