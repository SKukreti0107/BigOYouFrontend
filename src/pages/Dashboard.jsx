import Sidebar from '../components/Sidebar'
import NavBarDashboard from '../components/NavBarDashboard';
import LastInterviewFeedback from '../components/LastInterviewFeedback';
import PerformanceAnalytics from '../components/PerformanceAnalytics';
import RandomInterview from '../components/RandomInterview';

export default function Dashboard({setIsUser}) {
    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar></Sidebar>  

                <main className="flex-grow flex flex-col overflow-hidden bg-[#0d1117]">
                    <NavBarDashboard setIsUser={setIsUser}></NavBarDashboard>
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        <div className="max-w-7xl mx-auto space-y-8">
                            
                            <RandomInterview></RandomInterview>
                            <LastInterviewFeedback></LastInterviewFeedback>
                            <PerformanceAnalytics></PerformanceAnalytics>
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}