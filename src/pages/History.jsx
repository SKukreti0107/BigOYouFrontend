import Sidebar from "../components/Sidebar";
import HistoryTable from "../components/HistoryTable";
import HistoryAiInsight from "../components/HistoryAiInsight";
import HistoryStats from "../components/HistoryStats";

function History() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar></Sidebar>

        <main className="flex-1 flex flex-col min-w-0 ml-10 overflow-y-auto custom-scrollbar">
          <header className="px-8 pt-10 pb-8">
            <div className="flex flex-col gap-3 max-w-5xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="material-symbols-outlined text-purple-400 text-[24px]">history</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Interview History
                </h2>
              </div>
              <p className="text-slate-400 text-base max-w-2xl leading-relaxed mt-1">
                Review your past mock interviews, analyze AI-driven feedback, and track your performance trends over time to identify areas for improvement.
              </p>
            </div>
          </header>

          <div className="px-8 flex flex-col gap-8 pb-12">
            <HistoryStats />
            <HistoryAiInsight />
            <HistoryTable />
          </div>
        </main>
      </div>
    </div>
  )
}

export default History
