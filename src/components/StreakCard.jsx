import { useNavigate } from "react-router-dom";

export default function StreakCard({ streak = 0, loading = false }) {
    const navigate = useNavigate();
    
    if (loading) {
        return (
            <div className="xl:col-span-1 relative bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between min-h-[200px] overflow-hidden animate-pulse">
                <div className="space-y-4">
                    <div className="h-6 w-24 bg-slate-800 rounded"></div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                        <div className="h-8 w-28 bg-slate-800 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3.5 w-full bg-slate-800 rounded"></div>
                        <div className="h-3.5 w-4/5 bg-slate-800 rounded"></div>
                    </div>
                </div>
                <div className="h-12 w-full bg-slate-800 rounded-xl mt-4"></div>
            </div>
        );
    }
    
    const displayStreak = streak !== undefined && streak !== null ? streak : 0;
    
    return (
        <div className="xl:col-span-1 relative group bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 flex flex-col justify-between min-h-[200px] border border-white/10 shadow-xl shadow-indigo-900/20 overflow-hidden">
            <div className="relative z-10">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded border border-white/20 mb-4 inline-block">
                    Current Streak
                </span>
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-amber-400 text-4xl">local_fire_department</span>
                    <h3 className="text-4xl font-bold text-white leading-tight tracking-tight">
                        {displayStreak} {displayStreak === 1 ? 'Day' : 'Days'}
                    </h3>
                </div>
                <p className="text-white/70 text-[11px] font-medium leading-relaxed mt-1">
                    {displayStreak > 0 
                      ? "You're on a roll! Complete a mock interview today to keep your streak alive." 
                      : "No active streak yet. Complete your first interview to ignite your journey!"}
                </p>
            </div>
            <button 
                onClick={() => navigate('/practice')}
                className="relative z-10 w-full mt-4 bg-white text-indigo-700 font-black uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-indigo-50 transition-all shadow-lg cursor-pointer"
            >
                Start Session
            </button>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/10 text-[140px] pointer-events-none group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                local_fire_department
            </span>
        </div>
    );
}
