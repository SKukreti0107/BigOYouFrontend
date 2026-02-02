import { Link } from "react-router-dom"
export default function Hero(){
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
                                Conquer Technical Interviews.{' '}
                                <span className="text-primary">No Stage Fright</span> Required.
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                Master Data Structures and Algorithms with AI-led practice sessions. Mimic the pressure
                                of a real interview in a safe, private environment designed for developers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    className="bg-primary text-white font-bold h-14 px-8 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
                                    to="/ide"
                                >
                                    Start Free Mock Interview
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <button className="border border-slate-300 dark:border-slate-700 font-bold h-14 px-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    View Demo Sessions
                                </button>
                            </div>
                            <div className="flex items-center gap-6 pt-4 grayscale opacity-60">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Supports:</span>
                                <span className="text-sm font-mono font-bold">Python</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
                            <div className="relative bg-[#0d1117] rounded-xl border border-slate-700 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                                <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="size-3 rounded-full bg-red-500/80"></div>
                                        <div className="size-3 rounded-full bg-amber-500/80"></div>
                                        <div className="size-3 rounded-full bg-emerald-500/80"></div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded border border-primary/20">
                                            <span className="material-symbols-outlined text-sm">timer</span>
                                            <span>24:58</span>
                                        </div>
                                        <button className="bg-success text-slate-900 px-3 py-1 rounded text-xs font-bold hover:bg-success/90">
                                            RUN CODE
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 flex overflow-hidden">
                                    <div className="w-12 bg-[#0d1117] border-r border-slate-800 flex flex-col items-center py-4 gap-4">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">description</span>
                                        <span className="material-symbols-outlined text-primary text-lg">code</span>
                                        <span className="material-symbols-outlined text-slate-500 text-lg">settings</span>
                                    </div>
                                    <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-hidden">
                                        <div className="flex gap-4">
                                            <span className="text-slate-600">1</span>
                                            <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-slate-600">2</span>
                                            <span className="pl-4 font-normal text-slate-300">
                                                <span className="text-purple-400">def</span> <span className="text-yellow-400">findLCA</span>(self, root, p, q):
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-slate-600">3</span>
                                            <span className="pl-8 text-slate-500"># Start your implementation here</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-slate-600">4</span>
                                            <span className="pl-8 text-white">curr = root</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-slate-600">5</span>
                                            <span className="pl-8 text-purple-400">while</span> <span className="text-white">curr:</span>
                                        </div>
                                        <div className="mt-8 border-t border-slate-800 pt-4">
                                            <p className="text-success flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                                All 12 test cases passed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 right-6 w-72 bg-[#1c2127] rounded-xl border border-slate-600 shadow-xl p-4 transform translate-y-0 group hover:-translate-y-1 transition-transform">
                                    <div className="flex items-start gap-3">
                                        <div className="size-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">AI Interviewer</p>
                                            <p className="text-sm text-slate-200 leading-snug">
                                                &quot;Great start! Can you explain the time complexity of your approach if the tree is highly skewed?&quot;
                                            </p>
                                            <div className="flex gap-1.5 pt-1">
                                                <div className="size-1.5 rounded-full bg-primary/50 animate-bounce"></div>
                                                <div className="size-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="size-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.3s]"></div>
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