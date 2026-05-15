import { Link } from "react-router-dom";

export default function SessionDetailsHeader({ topic, sessionId }) {
    return (
        <header className="px-8 pt-10 pb-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-2">
                    <Link
                        to="/history"
                        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        Back to history
                    </Link>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Session Details
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        {topic || "Interview session"} • {sessionId}
                    </p>
                </div>
            </div>
        </header>
    );
}
