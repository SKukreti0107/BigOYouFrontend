import { useNavigate } from 'react-router-dom';
import api from './Api'

export default function LastInterviewFeedback({
    positive = [
        { title: "Excellent approach explanation; communicated trade-offs clearly before coding." },
        { title: "Optimal space complexity achieved through in-place pointer manipulation." }
    ],
    negative = [
        { title: "Missed edge case: failed to handle empty input arrays which caused a runtime error." }
    ],
    score = null,
    loading = false,
}) {
    const navigate = useNavigate();
    
    if (loading) {
        return (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 relative overflow-hidden flex-grow flex flex-col justify-between min-h-[220px] animate-pulse">
                <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0"></div>
                        <div className="flex-grow space-y-2">
                            <div className="h-4 w-32 bg-slate-800 rounded"></div>
                            <div className="h-3 w-20 bg-slate-800 rounded"></div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <div className="h-3 w-10 bg-slate-800 rounded"></div>
                            <div className="h-6 w-12 bg-slate-800 rounded"></div>
                        </div>
                    </div>

                    <div className="space-y-3.5 mt-2">
                        <div className="flex gap-3">
                            <div className="w-4 h-4 bg-slate-800 rounded-full shrink-0"></div>
                            <div className="h-3 w-full bg-slate-800 rounded"></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-4 h-4 bg-slate-800 rounded-full shrink-0"></div>
                            <div className="h-3 w-5/6 bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="h-10 w-full bg-slate-800 rounded-lg mt-4"></div>
            </div>
        );
    }
    
    const get_last_interview_session_id = async () => {
        const response = await api.get('/last_session_id');
        console.log(response.data);
        return response.data.last_session_id;
    };
    
    const handleClick = async () => {
        try {
            const session_id = await get_last_interview_session_id();
            if (session_id) {
                navigate(`/history/session/${session_id}`);
            } else {
                navigate('/practice');
            }
        } catch (err) {
            console.error("No past session found", err);
            navigate('/practice');
        }
    };

    const getItemText = (item) => {
        if (!item) return '';
        if (typeof item === 'string') return item;
        return item.title || item.description || '';
    };

    const hasFeedback = (score !== null && score !== undefined && score > 0) || 
                        (positive && positive.length > 0) || 
                        (negative && negative.length > 0);

    return (
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 shadow-lg shadow-indigo-950/20 relative overflow-hidden group flex-grow flex flex-col justify-between min-h-[220px]">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">chat_bubble_outline</span>
            </div>
            
            <div>
                <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                        <span className="material-symbols-outlined text-lg">smart_toy</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-base text-white">Last Interview Feedback</h3>
                        <p className="text-[10px] text-indigo-300/60 uppercase tracking-widest">AI Agent Analysis</p>
                    </div>
                    {score !== null && score !== undefined && score > 0 ? (
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-indigo-300/60 uppercase tracking-widest">Score</span>
                            <span className="text-xl font-bold text-white">{score}</span>
                        </div>
                    ) : null}
                </div>

                {hasFeedback ? (
                    <ul className="space-y-4 mb-6 relative z-10">
                        {positive && positive.map((item, idx) => (
                            <li key={`pos-${idx}`} className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5 shrink-0">check_circle</span>
                                <span className="text-xs text-slate-300 leading-relaxed font-medium">{getItemText(item)}</span>
                            </li>
                        ))}
                        
                        {negative && negative.map((item, idx) => (
                            <li key={`neg-${idx}`} className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5 shrink-0">warning</span>
                                <span className="text-xs text-slate-300 leading-relaxed font-medium">{getItemText(item)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="py-4 text-center relative z-10">
                        <p className="text-xs text-indigo-200/70 italic leading-relaxed">
                            No feedback available yet. Complete a mock interview session to unlock premium AI insights!
                        </p>
                    </div>
                )}
            </div>

            <button 
                onClick={handleClick}  
                className="w-full py-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-100 transition-all relative z-10 cursor-pointer mt-4"
            >
                {hasFeedback ? "View Full Feedback Report" : "Start Mock Interview"}
            </button>
        </div>
    );
}