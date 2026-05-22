import React from 'react';

export default function HomeFeatures() {
    const features = [
        {
            icon: "record_voice_over",
            title: "Live Speech & Chat Interviewer",
            tagline: "Realistic mock execution",
            description: "Engage in spoken or written technical interviews. The AI acts as a senior engineer, detecting your response pacing and prompting you with optimal complexity questions.",
            glowClass: "from-[#137fec]/20 to-indigo-500/20",
            iconClass: "bg-[#137fec]/10 text-[#137fec] border-[#137fec]/20 dark:border-[#137fec]/30",
            textColor: "text-[#137fec]"
        },
        {
            icon: "terminal",
            title: "Integrated Developer IDE",
            tagline: "Standard setup & compiler",
            description: "Write solutions in Python, Java, or C++ with an integrated scratchpad. Keep your algorithmic thoughts organized and compile instantly with a live terminal output window.",
            glowClass: "from-emerald-500/20 to-teal-500/20",
            iconClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:border-emerald-500/30",
            textColor: "text-emerald-500"
        },
        {
            icon: "analytics",
            title: "Asymptotic Complexity Analytics",
            tagline: "Deep performance benchmarking",
            description: "Go beyond basic test cases with immediate asymptotic runtime O(N) evaluations and memory bounds. Compare your speed pacing against optimal developer benchmarks.",
            glowClass: "from-violet-500/20 to-purple-500/20",
            iconClass: "bg-violet-500/10 text-violet-400 border-violet-500/20 dark:border-violet-500/30",
            textColor: "text-violet-400"
        },
        {
            icon: "menu_book",
            title: "Premium Reference Center",
            tagline: "Deep-dive study guides",
            description: "Study curated optimal strategies, key insights, and pitfalls. Review clean pseudocode solutions formatted in an interactive mockup console with clipboard sync.",
            glowClass: "from-amber-500/20 to-orange-500/20",
            iconClass: "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:border-amber-500/30",
            textColor: "text-amber-500"
        }
    ];

    return (
        <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 relative overflow-hidden py-24 select-none">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">Core Platform Features</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        Built for interview confidence
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Experience a professional simulation that replicates the tooling, logic, and pressure of standard corporate interviews.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-[#161b22]/30 backdrop-blur-xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
                        >
                            {/* Radial Glow Highlight */}
                            <div className={`absolute -right-20 -top-20 w-44 h-44 rounded-full bg-gradient-to-br ${feature.glowClass} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                            <div>
                                {/* Icon Badge */}
                                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110 ${feature.iconClass}`}>
                                    <span className="material-symbols-outlined text-3xl font-light">{feature.icon}</span>
                                </div>

                                {/* Content */}
                                <span className={`text-[10px] uppercase font-bold tracking-widest block mb-2 ${feature.textColor}`}>
                                    {feature.tagline}
                                </span>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-snug">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                                    {feature.description}
                                </p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
