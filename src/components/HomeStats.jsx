export default function HomeStats(){
    return(
        <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-2 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                                    Developers Trained
                                </p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">50,000+</p>
                                <div className="flex items-center gap-1 text-success text-sm font-bold">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    <span>+12% this month</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                                    Interview Success Rate
                                </p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">94%</p>
                                <div className="flex items-center gap-1 text-success text-sm font-bold">
                                    <span className="material-symbols-outlined text-sm">task_alt</span>
                                    <span>Hired at FAANG</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                                    Mock Sessions Run
                                </p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">120,000+</p>
                                <div className="flex items-center gap-1 text-success text-sm font-bold">
                                    <span className="material-symbols-outlined text-sm">history</span>
                                    <span>24/7 Availability</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    )
}