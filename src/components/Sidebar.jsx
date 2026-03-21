import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from './Api'

export default function Sidebar(){
    const {pathname} = useLocation();
    const isActive = (path) =>{
        return pathname === path;
    } 

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed:", err);
            window.location.href = "/login";
        }
    };

    return(
        <aside className="w-64 border-r border-[#30363d] bg-[#161b22] flex flex-col shrink-0 custom-scrollbar overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-8">
                            <h1 className="font-bold text-lg tracking-tight">BigO(You)</h1>
                        </div>
                        <nav className="space-y-1">
                            <Link to={"/dashboard"} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/dashboard") ? "text-[#137fec] bg-[#137fec]/10 border border-[#137fec]/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                            <Link to={"/history"} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/history")? "text-[#137fec] bg-[#137fec]/10 border border-[#137fec]/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                <span className="material-symbols-outlined text-[20px]">history</span>
                                <span className="text-sm font-medium">Interview History</span>
                            </Link>
                            <Link to={"/practice"} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/practice") ? "text-[#137fec] bg-[#137fec]/10 border border-[#137fec]/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                <span className="material-symbols-outlined text-[20px]">code</span>
                                <span className="text-sm font-medium">Practice</span>
                            </Link>
                            <Link to={"/settings"} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/settings") ? "text-[#137fec] bg-[#137fec]/10 border border-[#137fec]/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4 border-t border-[#30363d]">
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all">
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Sign Out
                        </button>
                    </div>
                </aside>
    )
    // flex items-center gap-3 px-3 py-2 rounded-lg text-[#137fec] bg-[#137fec]/10 border border-[#137fec]/20 transition-colors
}