import ProblemAccordion from '../components/ProblemAccordion';
import api from './Api';
import { useEffect, useState } from 'react';

export default function PracticeList() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [importUrl, setImportUrl] = useState("");
    const [importing, setImporting] = useState(false);
    const [importFeedback, setImportFeedback] = useState(null);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const res = await api.get("/problems");
            setTopics(res.data);
        } catch (error) {
            console.error("Failed to fetch problems:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleImport = async (e) => {
        e.preventDefault();
        const trimmed = importUrl.trim();
        if (!trimmed) return;

        try {
            setImporting(true);
            setImportFeedback(null);
            const res = await api.post("/problems/import-leetcode", { url: trimmed });
            const data = res.data;
            
            let message = "";
            let isError = false;
            
            if (data.imported_count > 0) {
                message = `Successfully imported ${data.imported_count} problem(s).`;
                fetchProblems(); // Reload list to show newly imported problems
            } else if (data.already_imported.length > 0 && data.errors.length === 0) {
                message = `Problems already exist in library: ${data.already_imported.join(", ")}`;
            } else {
                message = `Failed to import problems.`;
                isError = true;
            }

            if (data.errors.length > 0) {
                message += ` Errors: ${data.errors.join("; ")}`;
                isError = true;
            }

            setImportFeedback({ text: message, isError });
            if (!isError) {
                setImportUrl("");
            }
        } catch (error) {
            const detail = error.response?.data?.detail || "Import failed. Please verify the URL or try again later.";
            setImportFeedback({ text: detail, isError: true });
        } finally {
            setImporting(false);
        }
    };

    if (loading) {
        return (
            <div className="px-8 pb-16 flex flex-col gap-6 max-w-5xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 animate-pulse">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-6 bg-slate-800 rounded w-1/4"></div>
                            <div className="h-8 bg-slate-800 rounded-lg w-32"></div>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full w-full mb-4"></div>
                        <div className="flex gap-4">
                            <div className="h-4 bg-slate-800 rounded w-20"></div>
                            <div className="h-4 bg-slate-800 rounded w-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="px-8 pb-16 flex flex-col gap-6 max-w-5xl">
            {/* LeetCode Import Card */}
            <div className="bg-[#161b22]/40 backdrop-blur-xl border border-[#30363d] rounded-2xl p-6 relative overflow-hidden group hover:border-[#137fec]/30 transition-all duration-300 shadow-xl mb-4">
                {/* Accent glows */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#137fec]/10 blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                        <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#137fec]">download</span>
                            Import LeetCode Problems
                        </h4>
                        <p className="text-xs text-slate-400 max-w-xl">
                            Paste LeetCode question URLs or slugs (e.g. <code>two-sum</code>). Separate multiple items with commas. We will fetch description details and dynamically generate reference files using AI.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleImport} className="flex flex-col sm:flex-row gap-3 mt-4">
                    <input
                        type="text"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        placeholder="e.g. https://leetcode.com/problems/two-sum/, container-with-most-water"
                        disabled={importing}
                        className="flex-1 bg-[#0d1117]/80 border border-[#30363d] rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] disabled:opacity-60 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={importing || !importUrl.trim()}
                        className="bg-[#137fec] hover:bg-[#137fec]/90 disabled:bg-[#137fec]/50 disabled:opacity-60 text-white rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
                    >
                        {importing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Importing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">cloud_download</span>
                                Import Problems
                            </>
                        )}
                    </button>
                </form>

                {importFeedback && (
                    <div className={`mt-4 px-4 py-3 rounded-xl border text-xs text-left flex items-start gap-2.5 animate-fade-in ${
                        importFeedback.isError 
                            ? 'bg-rose-500/5 border-rose-500/20 text-rose-400' 
                            : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                    }`}>
                        <span className="material-symbols-outlined text-sm mt-0.5">
                            {importFeedback.isError ? 'error' : 'check_circle'}
                        </span>
                        <span className="select-text">{importFeedback.text}</span>
                    </div>
                )}
            </div>

            {topics.map((topic) => (
                <ProblemAccordion key={topic.topic} topic_deets={topic}></ProblemAccordion>
            ))}
        </div>
    );
}