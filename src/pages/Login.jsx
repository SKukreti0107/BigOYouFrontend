import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import SignUpForm from '../components/SignUpForm';

function Login({ checkAuth }) {
    let [isUser, setIsUser] = useState(true);

    return (
        <div className="min-h-screen bg-[#070b11] flex overflow-hidden">
            {/* ── Left Column: Brand Presentation ── */}
            <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#070b11]">
                {/* Ambient radial blobs */}
                <div className="absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full bg-teal-500/15 blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-700/10 blur-[90px] pointer-events-none" />

                {/* Tech dot grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(99,102,241,0.18) 1.5px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full px-12 py-10">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold tracking-tight text-white">
                        BigO<span className="text-[#137fec]">(You)</span>
                    </Link>

                    {/* Hero text */}
                    <div className="mt-16 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">AI-Powered Mock Interviews</span>
                        </div>
                        <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            Ace your next{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(90deg, #137fec 0%, #0bda5b 100%)' }}
                            >
                                DSA interview
                            </span>
                        </h2>
                        <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-sm">
                            Practice with a real-time AI interviewer, get instant complexity analysis, and track your progress across every session.
                        </p>
                    </div>

                    {/* Terminal Mockup resembling actual feedback page */}
                    <div className="flex-1 flex items-center">
                        <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-[#30363d]/80 shadow-2xl shadow-indigo-950/40 select-none animate-fade-in"
                            style={{ background: 'linear-gradient(135deg, rgba(22,27,34,0.85) 0%, rgba(13,17,23,0.95) 100%)', backdropFilter: 'blur(12px)' }}>

                            {/* Terminal header bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d]/80 bg-[#161b22]/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">ai_feedback.py</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#0bda5b]/10 border border-[#0bda5b]/20 text-[#0bda5b] font-bold uppercase tracking-wider animate-pulse">
                                    ● assessment
                                </span>
                            </div>

                            {/* Main Body of Feedback Mockup */}
                            <div className="p-5 space-y-4">
                                
                                {/* Top Banner Card: Strong Performance */}
                                <div className="bg-[#161b22]/70 border border-[#30363d]/60 rounded-xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {/* Score Gauge */}
                                        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                                            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="10" fill="transparent" />
                                                <circle cx="50" cy="50" r="40" stroke="#0bda5b" strokeWidth="10" fill="transparent"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset="37.6" // 85% score offset
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[12px] font-black text-white font-mono leading-none">85</span>
                                                <span className="text-[5px] text-[#0bda5b] font-bold tracking-widest mt-0.5">SCORE</span>
                                            </div>
                                        </div>
                                        
                                        {/* Performance Description */}
                                        <div className="text-left space-y-0.5">
                                            <h4 className="text-xs font-black text-white">Strong Performance</h4>
                                            <p className="text-[9px] text-slate-400 leading-snug">Met the hiring bar for a junior to mid-level engineering role.</p>
                                        </div>
                                    </div>

                                    {/* Info tags */}
                                    <div className="flex gap-1.5 shrink-0 text-[8px] font-mono">
                                        <div className="bg-[#070b11] border border-[#30363d] px-2 py-1 rounded text-center">
                                            <div className="text-slate-500 font-bold uppercase tracking-wider text-[6px]">TIME</div>
                                            <div className="font-bold text-slate-200">3:11</div>
                                        </div>
                                        <div className="bg-[#070b11] border border-[#30363d] px-2 py-1 rounded text-center">
                                            <div className="text-slate-500 font-bold uppercase tracking-wider text-[6px]">DIFF</div>
                                            <div className="font-bold text-yellow-400">Easy</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Strengths Highlights */}
                                <div className="space-y-2 text-left">
                                    <span className="text-[8px] font-bold uppercase text-slate-500 tracking-wider">STRENGTHS & HIGHLIGHTS</span>
                                    <div className="bg-[#161b22]/30 border border-[#30363d]/50 rounded-xl p-3 flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-[#0bda5b] text-sm mt-0.5">check_circle</span>
                                        <div>
                                            <h6 className="text-[10px] font-bold text-slate-200">Optimal Algorithm Implementation</h6>
                                            <p className="text-[9px] text-slate-400 mt-0.5">Independently identified the O(n) time complexity solution with O(1) space usage.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verdict row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1.5">
                                    <div className="space-y-1 text-left">
                                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest block text-center sm:text-left">FINAL VERDICT</span>
                                        <div className="bg-[#0bda5b]/10 border border-[#0bda5b]/20 rounded-xl py-2 text-center">
                                            <span className="text-[10px] font-black text-[#0bda5b] uppercase tracking-[0.2em]">● HIRE</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-[#137fec] text-white font-extrabold text-[9px] py-3 rounded-xl uppercase tracking-wider cursor-default shadow-lg shadow-[#137fec]/20 select-none">
                                        RETURN TO DASHBOARD
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Feature pills */}
                    <div className="mt-8 flex flex-wrap gap-2">
                        {['Real-time AI Feedback', 'Complexity Analysis', 'Progress Tracking', 'Personalized Weak Areas'].map(f => (
                            <span key={f} className="px-3 py-1 rounded-full text-[10px] font-bold border border-[#30363d]/80 text-slate-500 bg-[#161b22]/40 uppercase tracking-wider">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right Column: Auth Form ── */}
            <div className="flex flex-col w-full lg:w-[480px] xl:w-[520px] shrink-0 min-h-screen relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-[#0d1117]" />
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(19,127,236,0.04) 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                    }}
                />
                {/* Ambient glow behind form */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full bg-teal-500/8 blur-[60px] pointer-events-none" />

                {/* Mobile-only Logo */}
                <header className="relative z-10 flex lg:hidden items-center justify-between px-6 py-5 border-b border-[#30363d]/40">
                    <Link to="/" className="text-xl font-bold tracking-tight text-white">
                        BigO<span className="text-[#137fec]">(You)</span>
                    </Link>
                    <Link to="/dashboard" className="text-xs font-bold bg-[#137fec] text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all">
                        Dashboard
                    </Link>
                </header>

                {/* Form panel */}
                <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-8 py-12">
                    <div className="w-full max-w-sm">

                        {/* Form header */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-5">
                                <span className="material-symbols-outlined text-indigo-400 text-sm">terminal</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                                    {isUser ? 'Login' : 'Create Account'}
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                                {isUser ? 'Initialize Session' : 'Join BigO(You)'}
                            </h1>
                            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                                {isUser
                                    ? 'Welcome back. Log in to continue your mock interview prep.'
                                    : 'Create your account and start acing DSA interviews today.'}
                            </p>
                        </div>

                        {/* Forms */}
                        <div className="rounded-2xl border border-[#30363d]/60 bg-[#161b22]/50 p-6"
                            style={{ backdropFilter: 'blur(8px)' }}>
                            {isUser
                                ? <LoginForm checkAuth={checkAuth} />
                                : <SignUpForm />
                            }
                        </div>

                        {/* Toggle */}
                        <p className="text-center mt-6 text-sm text-slate-500">
                            {isUser ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsUser(u => !u)}
                                className="text-[#137fec] hover:text-blue-300 font-bold transition-colors cursor-pointer"
                            >
                                {isUser ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 py-5 text-center text-[10px] text-slate-700 border-t border-[#30363d]/30">
                    © 2026 BigO(You). Empowering engineers with LLM-powered practice.
                </footer>
            </div>
        </div>
    );
}

export default Login;
