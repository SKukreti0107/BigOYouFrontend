import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader';
import LastInterviewFeedback from '../components/LastInterviewFeedback';
import PerformanceAnalytics from '../components/PerformanceAnalytics';
import StreakCard from '../components/StreakCard';
import QuickStats from '../components/QuickStats';
import WeakAreas from '../components/WeakAreas';
import api from '../components/Api';
import { useMemo, useState, useEffect } from 'react';


export default function Dashboard({ setIsUser, isUser }) {
    const [dashboardData, setDashboardData] = useState({});
    const userId = useMemo(() => {
        if (!isUser) {
            return null;
        }
        if (typeof isUser === "string") {
            return isUser;
        }
        return isUser.user_id ?? null;
    }, [isUser]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!userId) {
                setDashboardData({});
                return;
            }
            try {
                const res = await api.get('/dashboard', {
                    params: {
                        user_id: userId,
                    },
                });
                console.log(res.data)
                setDashboardData(res.data ?? {});
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                setDashboardData({});
            }
        };

        fetchDashboardData();
    }, [userId]);
    
    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar></Sidebar>  

                <main className="flex-grow flex flex-col overflow-hidden bg-[#0d1117]">
                    <DashboardHeader />
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        <div className="w-full xl:max-w-[1600px] mx-auto space-y-6">
                            
                            {/* Top row: Streak Card and Quick Stats */}
                            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                                <div className="xl:col-span-2">
                                    <StreakCard />
                                </div>
                                <div className="xl:col-span-3">
                                    <QuickStats />
                                </div>
                            </div>

                            {/* Middle row: Score Trend and Feedback */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-bold text-lg">Score Trend</h3>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Last 10 Sessions</p>
                                        </div>
                                    </div>
                                    <PerformanceAnalytics></PerformanceAnalytics>
                                </div>

                                <div className="lg:col-span-1">
                                    <LastInterviewFeedback
                                        positive={dashboardData?.last_interview_feedback?.strengths}
                                        negative={dashboardData?.last_interview_feedback?.weaknesses}
                                        score={dashboardData?.last_interview_feedback?.score}
                                    />
                                </div>

                                {/* <WeakAreas /> */}
                            </div>
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
