import Sidebar from "../components/Sidebar";
import NavBarDashboard from "../components/NavBarDashboard";
import HistoryTable from "../components/HistoryTable";
import HistoryAiInsight from "../components/HistoryAiInsight";
import HistoryStats from "../components/HistoryStats";

function History(setIsUser) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar></Sidebar>

        <main className="flex-grow flex flex-col overflow-hidden bg-[#0d1117]">
          <NavBarDashboard setIsUser={setIsUser}></NavBarDashboard>
          <HistoryStats></HistoryStats>
          
          <HistoryTable></HistoryTable>

          <HistoryAiInsight></HistoryAiInsight>

        </main>
      </div>
    </div>
  )
}

export default History
