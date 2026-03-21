import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';

export default function DashboardHeader() {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('Medium');
    const [loading, setLoading] = useState(false);

    const startInterview = async () => {
        try {
            setLoading(true);
            const res = await api.post(`/interview/start?topic=random&difficulty=${difficulty}`);
            let session_deets = res.data;
            navigate(`/interviewPage/${session_deets.session_id}`, { state: { session_deets } });
        } catch (error) {
            console.error("Failed to start random interview", error);
            alert("Failed to start interview.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="h-20 border-b border-[#30363d] flex items-center justify-between px-8 shrink-0 bg-[#161b22]/30 backdrop-blur-md">
            <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Welcome Back!</h2>
            </div>
            <div className="flex items-center gap-4 hidden sm:flex">
                {/* Quick Start Panel */}
                <div className="flex items-center gap-2 bg-[#161b22] p-1 rounded-xl border border-[#30363d] shadow-2xl">
                    <div className="relative group">
                        <select 
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            disabled={loading}
                            className="appearance-none bg-[#0d1117] border-[#30363d] text-xs font-bold text-slate-300 pl-3 pr-8 py-2 rounded-lg hover:bg-slate-800 focus:outline-none cursor-pointer focus:ring-1 focus:ring-[#137fec] transition-all disabled:opacity-50"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            {/* <option value="Mixed">Mixed</option> */}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-[16px] pointer-events-none">expand_more</span>
                    </div>
                    <div className="w-px h-6 bg-[#30363d] mx-1"></div>
                    <button 
                        onClick={startInterview}
                        disabled={loading}
                        className="bg-[#137fec] hover:bg-[#137fec]/90 text-white text-xs font-black uppercase tracking-wider py-2 px-6 rounded-lg shadow-lg shadow-[#137fec]/20 transition-all ml-1 disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {loading ? 'Booting...' : 'Start Mock Interview'}
                    </button>
                </div>
                
                {/* Profile & Notifications */}
                <div className="flex items-center gap-3 border-l border-[#30363d] pl-4">
                    <button className="w-10 h-10 rounded-full border border-[#30363d] flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#137fec] rounded-full ring-2 ring-[#0d1117]"></span>
                    </button>
                    <div className="w-10 h-10 rounded-full border-2 border-[#137fec] overflow-hidden">
                        {/* Placeholder image for user profile */}
                        <img alt="User" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Alex&background=137fec&color=fff" />
                    </div>
                </div>
            </div>
        </header>
    );
}
