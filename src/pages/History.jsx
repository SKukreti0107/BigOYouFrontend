import Sidebar from "../components/Sidebar";
import HistoryTable from "../components/HistoryTable";
import { useState, useEffect } from "react";
import api from "../components/Api";

function History({ setIsUser, isUser }) {
    const [sessions, setSessions] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            try {
                const response = await api.get("/history", {
                    params: {
                        page: paginationModel.page + 1,
                        page_size: paginationModel.pageSize,
                    },
                });
                const data = response.data;
                console.log(`data`, data)
                setSessions(Array.isArray(data?.sessions) ? data.sessions : []);
                setTotal(data?.total ?? 0);
            } catch (error) {
                console.error(error);
                setSessions([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar></Sidebar>

                <main className="flex-1 flex flex-col min-w-0 ml-10 overflow-y-auto custom-scrollbar">
                    <header className="px-8 pt-10 pb-8">
                        <div className="flex flex-col gap-3 max-w-5xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <span className="material-symbols-outlined text-purple-400 text-[24px]">
                                        history
                                    </span>
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    Interview History
                                </h2>
                            </div>
                            <p className="text-slate-400 text-base max-w-2xl leading-relaxed mt-1">
                                Review your past mock interviews, analyze
                                AI-driven feedback, and track your performance
                                trends over time to identify areas for
                                improvement.
                            </p>
                        </div>
                    </header>

                    <div className="px-8 flex flex-col gap-8 pb-12">
                        <HistoryTable
                            sessions={sessions}
                            total={total}
                            loading={loading}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default History;
