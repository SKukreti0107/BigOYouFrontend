import { useNavigate } from "react-router-dom";

export default function StreakCard() {
    const navigate = useNavigate();
    
    return (
        <div className="xl:col-span-1 relative group bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 flex flex-col justify-between min-h-[200px] border border-white/10 shadow-xl shadow-indigo-900/20 overflow-hidden">
            <div className="relative z-10">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded border border-white/20 mb-4 inline-block">
                    Current Streak
                </span>
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-amber-400 text-4xl">local_fire_department</span>
                    <h3 className="text-4xl font-bold text-white leading-tight tracking-tight">14 Days</h3>
                </div>
                <p className="text-white/70 text-[11px] font-medium leading-relaxed mt-1">
                    You're on a roll! Complete a mock interview today to keep your streak alive.
                </p>
            </div>
            <button 
                onClick={() => navigate('/practice')}
                className="relative z-10 w-full mt-4 bg-white text-indigo-700 font-black uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
            >
                Start Session
            </button>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/10 text-[140px] pointer-events-none group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                local_fire_department
            </span>
        </div>
    );
}
