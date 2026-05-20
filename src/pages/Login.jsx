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

                    {/* Terminal Mockup */}
                    <div className="flex-1 flex items-center">
                        <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-[#30363d]/80 shadow-2xl shadow-indigo-950/40"
                            style={{ background: 'linear-gradient(135deg, rgba(22,27,34,0.85) 0%, rgba(13,17,23,0.95) 100%)', backdropFilter: 'blur(12px)' }}>

                            {/* Terminal header bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d]/80 bg-[#161b22]/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">ai_assessment.py</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider animate-pulse">
                                    ● Live
                                </span>
                            </div>

                            {/* Code area */}
                            <div className="px-5 pt-4 pb-2 font-mono text-sm leading-7">
                                <div className="text-slate-600 text-xs mb-1"># Two-pointer — Container with Most Water</div>
                                <div>
                                    <span className="text-indigo-400">def</span>{' '}
                                    <span className="text-teal-300">maxArea</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-orange-300">height</span>
                                    <span className="text-slate-300">):</span>
                                </div>
                                <div className="pl-6">
                                    <span className="text-slate-500">left, right</span>
                                    <span className="text-slate-400"> = </span>
                                    <span className="text-amber-400">0</span>
                                    <span className="text-slate-400">, </span>
                                    <span className="text-indigo-400">len</span>
                                    <span className="text-slate-300">(height) - </span>
                                    <span className="text-amber-400">1</span>
                                </div>
                                <div className="pl-6">
                                    <span className="text-slate-500">best</span>
                                    <span className="text-slate-400"> = </span>
                                    <span className="text-amber-400">0</span>
                                </div>
                                <div className="pl-6 mt-1">
                                    <span className="text-indigo-400">while</span>
                                    <span className="text-slate-300"> left </span>
                                    <span className="text-rose-400">&lt;</span>
                                    <span className="text-slate-300"> right:</span>
                                </div>
                                <div className="pl-12">
                                    <span className="text-slate-500">best</span>
                                    <span className="text-slate-400"> = </span>
                                    <span className="text-indigo-400">max</span>
                                    <span className="text-slate-300">(best, </span>
                                    <span className="text-indigo-400">min</span>
                                    <span className="text-slate-300">(height[left], height[right])</span>
                                </div>
                                <div className="pl-24">
                                    <span className="text-slate-400"> * (right - left))</span>
                                </div>
                                <div className="pl-12 mt-1">
                                    <span className="text-indigo-400">if</span>
                                    <span className="text-slate-300"> height[left] </span>
                                    <span className="text-rose-400">&lt;</span>
                                    <span className="text-slate-300"> height[right]: left </span>
                                    <span className="text-slate-400">+= </span>
                                    <span className="text-amber-400">1</span>
                                </div>
                                <div className="pl-12">
                                    <span className="text-indigo-400">else</span>
                                    <span className="text-slate-300">: right </span>
                                    <span className="text-slate-400">-= </span>
                                    <span className="text-amber-400">1</span>
                                </div>
                                <div className="pl-6 mt-1">
                                    <span className="text-indigo-400">return</span>
                                    <span className="text-slate-300"> best</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mx-5 border-t border-[#30363d]/60 my-3" />

                            {/* AI Assessment row */}
                            <div className="px-5 pb-5">
                                <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-3">AI Assessment</div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="rounded-xl p-3 bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-1">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Time</span>
                                        <span className="text-base font-black text-emerald-400 font-mono">O(N)</span>
                                        <span className="text-[9px] text-emerald-600 font-bold">✓ Optimal</span>
                                    </div>
                                    <div className="rounded-xl p-3 bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-1">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Space</span>
                                        <span className="text-base font-black text-emerald-400 font-mono">O(1)</span>
                                        <span className="text-[9px] text-emerald-600 font-bold">✓ In-place</span>
                                    </div>
                                    <div className="rounded-xl p-3 bg-indigo-500/5 border border-indigo-500/20 flex flex-col gap-1">
                                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Score</span>
                                        <span className="text-base font-black text-indigo-400 font-mono">94</span>
                                        <span className="text-[9px] text-indigo-400 font-bold">↑ Top 8%</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-[#137fec]/5 border border-[#137fec]/20">
                                    <span className="material-symbols-outlined text-[#137fec] text-base shrink-0">smart_toy</span>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        <span className="text-white font-bold">Excellent edge-case handling.</span> Two-pointer reduces brute-force O(N²) to linear time elegantly.
                                    </p>
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
                                    {isUser ? 'Engineer Login' : 'Create Account'}
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
