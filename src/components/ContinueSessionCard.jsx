import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';

const DIFF_COLORS = {
    Easy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    Medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    Hard: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

const PHASE_LABELS = {
    PROBLEM_DISCUSSION: 'Discussion',
    CODING: 'Coding',
    REVIEW: 'Review',
};

function formatTime(totalSeconds) {
    if (totalSeconds <= 0) return '00:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function ContinueSessionCard({ userId }) {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [expired, setExpired] = useState(false);
    const [discarding, setDiscarding] = useState(false);
    const intervalRef = useRef(null);

    const fetchPaused = useCallback(async () => {
        if (!userId) { setLoading(false); return; }
        try {
            const res = await api.get('/dashboard/paused-session', { params: { user_id: userId } });
            const paused = res.data?.paused_session;
            if (paused) {
                setSession(paused);
                setSecondsLeft(paused.seconds_remaining);
            } else {
                setSession(null);
            }
        } catch {
            setSession(null);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => { fetchPaused(); }, [fetchPaused]);

    // Countdown timer
    useEffect(() => {
        if (!session || expired) return;
        intervalRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [session, expired]);

    const handleContinue = () => {
        if (session) navigate(`/interviewPage/${session.session_id}`);
    };

    const handleDiscard = async () => {
        if (!session) return;
        setDiscarding(true);
        try {
            await api.post('/interview/end', {
                session_id: session.session_id,
                message: '[SYSTEM EVENT] User discarded paused session.',
                code: '',
                language: 'python',
                role: 'system',
                session_ended_by: 'USER_END',
                exit_clicked: true,
            });
        } catch {
            // Best-effort termination
        }
        setSession(null);
        setDiscarding(false);
    };

    if (loading || !session) return null;

    const dc = DIFF_COLORS[session.difficulty] || DIFF_COLORS.Medium;
    const phaseLabel = PHASE_LABELS[session.phase] || session.phase;
    const isUrgent = secondsLeft < 300; // Less than 5 min

    if (expired) {
        return (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">timer_off</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-slate-500">Your paused session for <strong className="text-slate-400">{session.problem_title}</strong> has expired and been terminated.</p>
                </div>
                <button onClick={() => setSession(null)} className="text-slate-600 hover:text-slate-400 cursor-pointer">
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>
        );
    }

    return (
        <div className={`relative bg-[#161b22] rounded-2xl p-5 overflow-hidden transition-all ${isUrgent ? 'border-2 border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border border-[#30363d]'}`}>
            {/* Animated pulse border for urgency */}
            {isUrgent && (
                <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/20 animate-pulse pointer-events-none"></div>
            )}

            <div className="flex items-center gap-5 flex-wrap">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isUrgent ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20'}`}>
                    <span className="material-symbols-outlined text-2xl">pause_circle</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-bold text-white">Paused Interview</h3>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${dc.text} ${dc.bg} ${dc.border}`}>{session.difficulty}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-slate-400 bg-slate-800 border border-[#30363d]">{phaseLabel}</span>
                    </div>
                    <p className="text-sm text-slate-400 truncate">
                        <strong className="text-slate-300">{session.problem_title}</strong>
                        <span className="text-slate-600 mx-2">·</span>
                        <span>{session.topic}</span>
                    </p>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${isUrgent ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-[#0d1117] border border-[#30363d]'}`}>
                        <span className={`material-symbols-outlined text-sm ${isUrgent ? 'text-amber-400' : 'text-slate-500'}`}>schedule</span>
                        <span className={`font-mono text-sm font-bold tabular-nums ${isUrgent ? 'text-amber-400' : 'text-slate-300'}`}>
                            {formatTime(secondsLeft)}
                        </span>
                    </div>
                    <span className="text-[9px] text-slate-600 uppercase tracking-wider font-bold">until<br />expired</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={handleDiscard}
                        disabled={discarding}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-[#30363d] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {discarding ? 'Discarding…' : 'Discard'}
                    </button>
                    <button
                        onClick={handleContinue}
                        className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-900/30"
                        style={{ background: 'linear-gradient(135deg, #137fec 0%, #0b6fcc 100%)' }}
                    >
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                            Continue
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
