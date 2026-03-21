import Sidebar from '../components/Sidebar'
import PracticeList from '../components/PracticeList';

export default function Practice() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar></Sidebar>

                <main className="flex-1 flex flex-col min-w-0 ml-10">
                    <header className="px-8 pt-10 pb-8">
                        <div className="flex flex-col gap-3 max-w-5xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-[#137fec]/10 border border-[#137fec]/20">
                                    <span className="material-symbols-outlined text-[#137fec] text-[24px]">terminal</span>
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    Problem Library
                                </h2>
                            </div>
                            <p className="text-slate-400 text-base max-w-2xl leading-relaxed mt-1">
                                Master data structures and algorithms with our curated collection. Select a problem to begin a 45-minute simulated technical interview with an expert LLM interviewer.
                            </p>
                        </div>
                    </header>
                    <PracticeList></PracticeList>
                </main>
            </div>


        </div>
    );
}