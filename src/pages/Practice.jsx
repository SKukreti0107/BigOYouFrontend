import Sidebar from '../components/Sidebar'
import PracticeList from '../components/PracticeList';

export default function Practice() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar></Sidebar>

                <main className="flex-1 flex flex-col min-w-0 ml-10">
                    <header className="px-8 pt-10 pb-6">
                        <div className="flex flex-col gap-2 max-w-5xl">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Problem Library</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">Master data structures and
                                algorithms with our curated collection. Select a problem to begin a 45-minute simulated
                                technical interview with an LLM interviewer.</p>
                        </div>
                    </header>
                    <PracticeList></PracticeList>
                </main>
            </div>


        </div>
    );
}