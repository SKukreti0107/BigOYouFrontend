import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import { getInterviewErrorMessage } from './interviewErrors';

export default function DashboardHeader() {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('Medium');
    const [loading, setLoading] = useState(false);

    return (
        <header className="h-20 border-b border-[#30363d] flex items-center justify-between px-8 shrink-0 bg-[#161b22]/30 backdrop-blur-md">
            <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Welcome Back!</h2>
            </div>
            <div className="flex items-center gap-4 hidden sm:flex">

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
