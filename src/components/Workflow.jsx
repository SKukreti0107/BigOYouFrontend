export default function Workflow(){
    return(
        <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-base font-bold text-primary uppercase tracking-[0.2em]">Workflow</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                            Three steps to interview mastery
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Our platform is designed by developers for developers to ensure you are ready for your dream job.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative p-8 rounded-2xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="absolute -top-5 -left-5 size-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                                1
                            </div>
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">list_alt</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Select Topic</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Choose from a comprehensive library including Arrays, Graphs, DP, and System Design patterns tailored to specific company profiles.
                            </p>
                        </div>
                        <div className="group relative p-8 rounded-2xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="absolute -top-5 -left-5 size-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                                2
                            </div>
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">hourglass_top</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Solve under Pressure</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Experience live coding with a ticking clock, real-time edge-case testing, and an AI interviewer that asks follow-up questions.
                            </p>
                        </div>
                        <div className="group relative p-8 rounded-2xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="absolute -top-5 -left-5 size-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                                3
                            </div>
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">analytics</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Get Instant AI Review</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Receive a detailed breakdown of time/space complexity, code quality scores, and a comparison with the most optimal solutions.
                            </p>
                        </div>
                    </div>
                </section>
    )
}