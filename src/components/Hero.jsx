import { useState } from "react"
import { Link } from "react-router-dom"
import DemoVideoModal from "./DemoVideoModal"

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        LLM Powered Mentorship
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                        Conquer Technical Interviews.<br />
                        <span className="bg-gradient-to-r from-primary via-indigo-400 to-success bg-clip-text text-transparent">No Stage Fright Required.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                        Master Data Structures and Algorithms with AI-led practice sessions. Mimic the pressure
                        of a real interview in a safe, private environment designed for developers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <Link
                            to="/dashboard"
                            className="bg-primary hover:bg-primary/95 text-white font-bold h-14 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-lg">play_arrow</span>
                            Start Practicing
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold h-14 px-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            View Demo Sessions
                        </button>
                    </div>

                    <DemoVideoModal
                        open={isModalOpen}
                        handleClose={() => setIsModalOpen(false)}
                    />
                    <div className="flex items-center gap-6 pt-4 grayscale opacity-60">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Supports:</span>
                        <span className="text-sm font-mono font-bold">Python</span>
                        <span className="text-sm font-mono font-bold">Java</span>
                        <span className="text-sm font-mono font-bold">C++</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
                    <div className="relative bg-[#070b11] rounded-xl border border-[#30363d] shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                        
                        {/* Header bar resembling actual workspace */}
                        <div className="bg-[#0d1117] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-xs font-bold text-white tracking-tight">
                                    BigO<span className="text-[#137fec]">(You)</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 text-[9px]">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider">PROGRESS</span>
                                    <div className="flex gap-0.5">
                                        <span className="w-2.5 h-1 rounded-full bg-primary"></span>
                                        <span className="w-2.5 h-1 rounded-full bg-primary/30"></span>
                                        <span className="w-2.5 h-1 rounded-full bg-primary/10"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d] text-[9px] text-slate-400 font-bold">
                                    PROBLEM DISCUSSION
                                </span>
                                <button className="border border-red-500/50 text-red-500 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider select-none cursor-default">
                                    END
                                </button>
                            </div>
                        </div>

                        {/* Main workspace split */}
                        <div className="flex-1 flex overflow-hidden text-left">
                            
                            {/* Left Pane: Problem (5/12 width) */}
                            <div className="w-5/12 border-r border-[#30363d] p-4 flex flex-col justify-between overflow-y-auto text-[10px] select-none">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#0bda5b] font-mono text-[12px] font-bold">14:29</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[8px] font-bold uppercase border border-emerald-500/20">Easy</span>
                                    </div>
                                    <h4 className="text-sm font-extrabold text-white">Search Insert Position</h4>
                                    <p className="text-slate-400 leading-relaxed text-[9px]">
                                        Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
                                    </p>
                                    
                                    {/* Example terminal box */}
                                    <div className="bg-[#070b11] border border-[#30363d]/80 rounded-xl p-2.5 font-mono text-[8px] space-y-1">
                                        <div className="flex items-center justify-between pb-1 border-b border-[#30363d]/50">
                                            <div className="flex gap-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/60"></span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60"></span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
                                            </div>
                                            <span className="text-slate-500 text-[7px]">bash</span>
                                        </div>
                                        <div><span className="text-primary">Input:</span> nums = [1,3,5,6], target = 2</div>
                                        <div><span className="text-primary">Output:</span> 1</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Pane: Code Editor + Floating AI Bubble (7/12 width) */}
                            <div className="w-7/12 flex flex-col justify-between overflow-hidden relative">
                                <div className="flex flex-col flex-1">
                                    {/* Editor header tab */}
                                    <div className="bg-[#0d1117] border-b border-[#30363d] px-3 py-2 flex items-center justify-between text-[9px] font-mono select-none">
                                        <span className="text-slate-300 font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs text-[#f48c06]">description</span>
                                            approach.md
                                        </span>
                                        <span className="text-[#f48c06] flex items-center gap-0.5">
                                            <span className="w-1 h-1 rounded-full bg-[#f48c06]"></span>
                                            MARKDOWN MODE
                                        </span>
                                    </div>

                                    {/* Editor body */}
                                    <div className="flex-1 p-3.5 font-mono text-[10px] leading-relaxed text-slate-300 bg-[#070b11]/85">
                                        <div className="flex gap-2">
                                            <span className="text-slate-600 select-none">1</span>
                                            <span>I will use a binary search approach...</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom action bar */}
                                <div className="border-t border-[#30363d] p-2 flex items-center justify-between bg-[#0d1117]/80 text-[8px]">
                                    <button className="bg-emerald-500 text-slate-950 font-extrabold px-2 py-1 rounded uppercase tracking-wider cursor-default">
                                        Review my approach
                                    </button>
                                </div>

                                {/* Floating AI Interviewer Bubble */}
                                <div className="absolute bottom-10 left-3 right-3 bg-[#161b22] border border-[#30363d] rounded-xl p-3 shadow-2xl animate-fade-in-up text-[9px] text-left select-none">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-white text-[12px]">smart_toy</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-slate-400">AI Interviewer</p>
                                            <p className="text-slate-200 leading-snug">
                                                &quot;Welcome to your technical interview. What is your initial approach to solving this problem?&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}