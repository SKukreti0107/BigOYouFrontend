import { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../components/Api';

const DIFF_COLORS = {
    Easy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    Medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    Hard: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

const inputClass = "w-full px-4 h-12 rounded-xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all bg-[#070b11]/80 border border-[#30363d] hover:border-slate-600/70 focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20";
const textareaClass = "w-full px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all bg-[#070b11]/80 border border-[#30363d] hover:border-slate-600/70 focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20 resize-none";
const labelClass = "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block";

export default function Admin({ isUser }) {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProblem, setEditingProblem] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Form state
    const [form, setForm] = useState({ title: '', statement: '', example: '', difficulty: 'Medium', expected_time: 30, topics: [], leetcode_slug: '', leetcode_url: '', code_snippets: null, meta_data: null, example_testcases: '', sample_testcase: '', hidden_testcases: '' });
    const [topicInput, setTopicInput] = useState('');
    const [showRef, setShowRef] = useState(false);
    const [refForm, setRefForm] = useState({ optimal_approach: '', time_complexity: '', space_complexity: '', key_insights: '', common_pitfalls: '', pseudocode: '', pseudocode_cpp: '', pseudocode_java: '' });
    const [refExists, setRefExists] = useState(false);
    const [refSaving, setRefSaving] = useState(false);
    const [testCases, setTestCases] = useState([]);
    const [showTestCases, setShowTestCases] = useState(false);
    
    // LeetCode seeding state
    const [seedInput, setSeedInput] = useState('');
    const [seeding, setSeeding] = useState(false);

    const handleFetchLeetCode = async () => {
        if (!seedInput.trim()) return;
        setSeeding(true);
        try {
            const res = await api.post('/admin/problems/preview-import', { url: seedInput });
            const data = res.data;
            
            // Auto-fill form state
            setForm({
                title: data.title || '',
                statement: data.statement || '',
                example: data.example || '',
                difficulty: data.difficulty || 'Medium',
                expected_time: data.expected_time || 30,
                topics: data.topics || [],
                leetcode_slug: data.leetcode_slug || '',
                leetcode_url: data.leetcode_url || '',
                code_snippets: data.code_snippets || null,
                meta_data: data.meta_data || null,
                example_testcases: data.example_testcases || '',
                sample_testcase: data.sample_testcase || '',
                hidden_testcases: data.hidden_testcases || ''
            });
            
            // Auto-fill reference form state
            setRefForm({
                optimal_approach: data.optimal_approach || '',
                time_complexity: data.time_complexity || 'O(N)',
                space_complexity: data.space_complexity || 'O(1)',
                key_insights: data.key_insights || '',
                common_pitfalls: data.common_pitfalls || '',
                pseudocode: data.pseudocode || '',
                pseudocode_cpp: data.pseudocode_cpp || '',
                pseudocode_java: data.pseudocode_java || ''
            });
            
            setEditingProblem(null); // It is a new problem
            setRefExists(false);
            setShowRef(true); // Open reference solution section automatically
            setShowModal(true); // Open the creation modal showing auto-filled fields
            setSeedInput('');
            showToast('LeetCode details fetched & loaded!');
        } catch (err) {
            showToast(err.response?.data?.detail || 'Failed to fetch LeetCode data', 'error');
        } finally {
            setSeeding(false);
        }
    };

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Admin check
    useEffect(() => {
        api.get('/admin/check').then(res => {
            if (res.data.is_admin) {
                setAuthorized(true);
                fetchProblems();
            } else {
                navigate('/dashboard');
            }
        }).catch(() => navigate('/dashboard'))
          .finally(() => setLoading(false));
    }, [navigate]);

    const fetchProblems = useCallback(async () => {
        setTableLoading(true);
        try {
            const res = await api.get('/admin/problems');
            setProblems(res.data);
        } catch (err) {
            console.error('Failed to fetch problems', err);
        } finally {
            setTableLoading(false);
        }
    }, []);

    // Group problems by primary topic for organized display
    const groupedProblems = useMemo(() => {
        const groups = {};
        problems.forEach(p => {
            const primaryTopic = p.topics.length > 0 ? p.topics[0] : 'Uncategorized';
            if (!groups[primaryTopic]) groups[primaryTopic] = [];
            groups[primaryTopic].push(p);
        });
        // Sort groups alphabetically, but put Uncategorized last
        return Object.entries(groups).sort(([a], [b]) => {
            if (a === 'Uncategorized') return 1;
            if (b === 'Uncategorized') return -1;
            return a.localeCompare(b);
        });
    }, [problems]);

    // Open create modal
    const openCreate = () => {
        setEditingProblem(null);
        setForm({ title: '', statement: '', example: '', difficulty: 'Medium', expected_time: 30, topics: [], leetcode_slug: '', leetcode_url: '', code_snippets: null, meta_data: null, example_testcases: '', sample_testcase: '', hidden_testcases: '' });
        setShowRef(false);
        setRefForm({ optimal_approach: '', time_complexity: '', space_complexity: '', key_insights: '', common_pitfalls: '', pseudocode: '', pseudocode_cpp: '', pseudocode_java: '' });
        setRefExists(false);
        setTestCases([]);
        setShowTestCases(false);
        setShowModal(true);
    };

    // Open edit modal
    const openEdit = async (p) => {
        setEditingProblem(p);
        setForm({
            title: p.title, statement: p.statement, example: p.example,
            difficulty: p.difficulty, expected_time: p.expected_time, topics: [...p.topics],
            leetcode_slug: p.leetcode_slug || '', leetcode_url: p.leetcode_url || '',
            code_snippets: p.code_snippets || null, meta_data: p.meta_data || null,
            example_testcases: p.example_testcases || '', sample_testcase: p.sample_testcase || '',
            hidden_testcases: p.hidden_testcases || ''
        });
        setShowModal(true);
        setShowTestCases(false);
        setTestCases([]);
        // Fetch full problem with reference
        try {
            const res = await api.get(`/admin/problems/${p.problem_id}`);
            const data = res.data;
            setForm(f => ({
                ...f,
                code_snippets: data.code_snippets || null,
                meta_data: data.meta_data || null,
                example_testcases: data.example_testcases || '',
                sample_testcase: data.sample_testcase || '',
                hidden_testcases: data.hidden_testcases || ''
            }));
            if (res.data.reference) {
                setRefForm(res.data.reference);
                setRefExists(true);
                setShowRef(true);
            } else {
                setRefForm({ optimal_approach: '', time_complexity: '', space_complexity: '', key_insights: '', common_pitfalls: '', pseudocode: '', pseudocode_cpp: '', pseudocode_java: '' });
                setRefExists(false);
                setShowRef(false);
            }
            if (res.data.test_cases) {
                setTestCases(res.data.test_cases);
            }
        } catch { /* ignore */ }
    };

    // Save problem
    const handleSave = async () => {
        if (!form.title.trim() || !form.statement.trim()) {
            showToast('Title and statement are required', 'error');
            return;
        }
        setSaving(true);
        try {
            if (editingProblem) {
                const payload = {
                    ...form,
                    pseudocode_cpp: refForm.pseudocode_cpp || null,
                    pseudocode_java: refForm.pseudocode_java || null,
                };
                await api.put(`/admin/problems/${editingProblem.problem_id}`, payload);
                showToast('Problem updated');
            } else {
                const payload = {
                    ...form,
                    optimal_approach: refForm.optimal_approach || null,
                    time_complexity: refForm.time_complexity || null,
                    space_complexity: refForm.space_complexity || null,
                    key_insights: refForm.key_insights || null,
                    common_pitfalls: refForm.common_pitfalls || null,
                    pseudocode: refForm.pseudocode || null,
                    pseudocode_cpp: refForm.pseudocode_cpp || null,
                    pseudocode_java: refForm.pseudocode_java || null,
                };
                await api.post('/admin/problems', payload);
                showToast('Problem created');
            }
            setShowModal(false);
            fetchProblems();
        } catch (err) {
            showToast(err.response?.data?.detail || 'Failed to save', 'error');
        } finally {
            setSaving(false);
        }
    };

    // Delete problem
    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await api.delete(`/admin/problems/${deleteTarget.problem_id}`);
            showToast('Problem deleted');
            setDeleteTarget(null);
            fetchProblems();
        } catch (err) {
            showToast(err.response?.data?.detail || 'Failed to delete', 'error');
        }
    };

    // Save reference
    const handleSaveRef = async () => {
        if (!editingProblem) return;
        if (!refForm.optimal_approach || !refForm.time_complexity || !refForm.space_complexity || !refForm.key_insights) {
            showToast('Fill in all required reference fields', 'error');
            return;
        }
        setRefSaving(true);
        try {
            await api.post(`/admin/problems/${editingProblem.problem_id}/reference`, refForm);
            showToast('Reference solution saved');
            setRefExists(true);
        } catch (err) {
            showToast(err.response?.data?.detail || 'Failed to save reference', 'error');
        } finally {
            setRefSaving(false);
        }
    };

    // Delete reference
    const handleDeleteRef = async () => {
        if (!editingProblem) return;
        try {
            await api.delete(`/admin/problems/${editingProblem.problem_id}/reference`);
            showToast('Reference deleted');
            setRefExists(false);
            setRefForm({ optimal_approach: '', time_complexity: '', space_complexity: '', key_insights: '', common_pitfalls: '', pseudocode: '', pseudocode_cpp: '', pseudocode_java: '' });
        } catch (err) {
            showToast(err.response?.data?.detail || 'Failed to delete reference', 'error');
        }
    };

    // Topic management
    const addTopic = () => {
        const t = topicInput.trim();
        if (t && !form.topics.includes(t)) {
            setForm(f => ({ ...f, topics: [...f.topics, t] }));
        }
        setTopicInput('');
    };
    const removeTopic = (t) => setForm(f => ({ ...f, topics: f.topics.filter(x => x !== t) }));

    const stats = {
        total: problems.length,
        easy: problems.filter(p => p.difficulty === 'Easy').length,
        medium: problems.filter(p => p.difficulty === 'Medium').length,
        hard: problems.filter(p => p.difficulty === 'Hard').length,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
                <div className="animate-pulse text-slate-400 text-sm">Verifying admin access…</div>
            </div>
        );
    }

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-200">
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar isUser={isUser} />

                <main className="flex-grow flex flex-col overflow-hidden bg-[#0d1117]">
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        <div className="w-full max-w-[1400px] mx-auto space-y-6">

                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                                            <span className="material-symbols-outlined">shield_person</span>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Panel</h1>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest">Manage Problems & Reference Solutions</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-900/30" style={{ background: 'linear-gradient(135deg, #137fec 0%, #0b6fcc 100%)' }}>
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    New Problem
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard label="Total Problems" value={stats.total} icon="database" color="text-[#137fec]" />
                                <StatCard label="Easy" value={stats.easy} icon="sentiment_satisfied" color="text-emerald-400" />
                                <StatCard label="Medium" value={stats.medium} icon="psychology" color="text-amber-400" />
                                <StatCard label="Hard" value={stats.hard} icon="local_fire_department" color="text-rose-400" />
                            </div>

                            {/* LeetCode Seeding Card */}
                            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 relative overflow-hidden group hover:border-[#137fec]/20 transition-all duration-300">
                                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#137fec]/5 blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-1 text-left">
                                        <div className="flex items-center gap-2 text-amber-500">
                                            <span className="material-symbols-outlined text-xl">cloud_download</span>
                                            <h3 className="font-bold text-white">Seed Problem from LeetCode</h3>
                                        </div>
                                        <p className="text-xs text-slate-400 max-w-xl">
                                            Fetch metadata and generate reference solutions using AI. You can review and modify the data in a form before saving globally.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 max-w-xl gap-2 w-full md:justify-end">
                                        <input 
                                            className="flex-1 bg-[#0d1117]/80 border border-[#30363d] rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] disabled:opacity-60 transition-all"
                                            placeholder="LeetCode URL or Slug (e.g. climbing-stairs)" 
                                            value={seedInput}
                                            onChange={e => setSeedInput(e.target.value)}
                                            disabled={seeding}
                                        />
                                        <button 
                                            onClick={handleFetchLeetCode} 
                                            disabled={seeding || !seedInput.trim()}
                                            className="bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/50 disabled:opacity-60 text-white rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
                                        >
                                            {seeding ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Fetching…
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                                    Fetch & Auto-Fill
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Problems Table */}
                            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between">
                                    <h2 className="font-bold text-white">All Problems</h2>
                                    <span className="text-xs text-slate-500">{problems.length} items</span>
                                </div>

                                {tableLoading ? (
                                    /* Skeleton loader */
                                    <div className="p-4 space-y-3">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 px-2 py-3 animate-pulse">
                                                <div className="h-4 bg-slate-800 rounded-md flex-[2.5]"></div>
                                                <div className="h-5 w-16 bg-slate-800 rounded-full"></div>
                                                <div className="flex gap-1 flex-[1.5]">
                                                    <div className="h-4 w-14 bg-slate-800 rounded"></div>
                                                    <div className="h-4 w-14 bg-slate-800 rounded"></div>
                                                </div>
                                                <div className="h-4 w-10 bg-slate-800 rounded"></div>
                                                <div className="h-4 w-5 bg-slate-800 rounded-full"></div>
                                                <div className="flex gap-1.5 ml-auto">
                                                    <div className="h-7 w-7 bg-slate-800 rounded-lg"></div>
                                                    <div className="h-7 w-7 bg-slate-800 rounded-lg"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : problems.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <span className="material-symbols-outlined text-slate-700 text-5xl mb-3 block">quiz</span>
                                        <p className="text-slate-500 text-sm">No problems yet. Click "New Problem" to create your first one.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-[10px] text-slate-500 uppercase tracking-wider border-b border-[#30363d]">
                                                    <th className="px-6 py-3 text-left font-bold">Title</th>
                                                    <th className="px-4 py-3 text-left font-bold">Difficulty</th>
                                                    <th className="px-4 py-3 text-left font-bold">Topics</th>
                                                    <th className="px-4 py-3 text-center font-bold">Time</th>
                                                    <th className="px-4 py-3 text-center font-bold">Reference</th>
                                                    <th className="px-4 py-3 text-right font-bold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {groupedProblems.map(([topic, items]) => (
                                                    <Fragment key={`topic-group-${topic}`}>
                                                        {/* Topic group divider */}
                                                        <tr key={`group-${topic}`} className="bg-[#0d1117]/60">
                                                            <td colSpan={6} className="px-6 py-2">
                                                                <div className="flex items-center gap-2.5">
                                                                    <span className="material-symbols-outlined text-[14px] text-[#137fec]">folder</span>
                                                                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{topic}</span>
                                                                    <span className="text-[10px] text-slate-600 font-medium">{items.length} {items.length === 1 ? 'problem' : 'problems'}</span>
                                                                    <div className="flex-1 h-px bg-[#30363d]/50 ml-2"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {items.map(p => {
                                                            const dc = DIFF_COLORS[p.difficulty] || DIFF_COLORS.Medium;
                                                            return (
                                                                <tr key={p.problem_id} className="border-b border-[#30363d]/30 hover:bg-[#0d1117]/40 transition-colors">
                                                                    <td className="px-6 py-3.5 font-semibold text-white max-w-[260px] truncate">{p.title}</td>
                                                                    <td className="px-4 py-3.5">
                                                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${dc.text} ${dc.bg} ${dc.border}`}>{p.difficulty}</span>
                                                                    </td>
                                                                    <td className="px-4 py-3.5">
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {p.topics.map(t => (
                                                                                <span key={t} className="px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-[#0d1117] rounded border border-[#30363d]">{t}</span>
                                                                            ))}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-3.5 text-center text-slate-400 font-mono text-xs">{p.expected_time}m</td>
                                                                    <td className="px-4 py-3.5 text-center">
                                                                        <span className={`material-symbols-outlined text-base ${p.has_reference ? 'text-emerald-400' : 'text-slate-700'}`}>
                                                                            {p.has_reference ? 'check_circle' : 'cancel'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-3.5 text-right">
                                                                        <div className="flex items-center justify-end gap-2">
                                                                            <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                                                                                <span className="material-symbols-outlined text-base">edit</span>
                                                                            </button>
                                                                            <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer">
                                                                                <span className="material-symbols-outlined text-base">delete</span>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Create/Edit Modal ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
                    <div className="w-full max-w-3xl bg-[#161b22]/95 border border-[#30363d] rounded-2xl shadow-2xl mx-4" style={{ backdropFilter: 'blur(16px)' }}>
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d]">
                            <h2 className="text-lg font-bold text-white">{editingProblem ? 'Edit Problem' : 'Create Problem'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div>
                                <label className={labelClass}>Title *</label>
                                <input className={inputClass} placeholder="Two Sum" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>

                            <div>
                                <label className={labelClass}>Problem Statement *</label>
                                <textarea className={textareaClass} rows={5} placeholder="Given an array of integers nums and an integer target, return indices…" value={form.statement} onChange={e => setForm(f => ({ ...f, statement: e.target.value }))} />
                            </div>

                            <div>
                                <label className={labelClass}>Example</label>
                                <textarea className={textareaClass} rows={3} placeholder="Input: nums = [2,7,11,15], target = 9&#10;Output: [0,1]" value={form.example} onChange={e => setForm(f => ({ ...f, example: e.target.value }))} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>LeetCode Slug</label>
                                    <input className={inputClass} placeholder="e.g. two-sum" value={form.leetcode_slug || ''} onChange={e => setForm(f => ({ ...f, leetcode_slug: e.target.value }))} />
                                </div>
                                <div>
                                    <label className={labelClass}>LeetCode URL</label>
                                    <input className={inputClass} placeholder="e.g. https://leetcode.com/problems/two-sum/" value={form.leetcode_url || ''} onChange={e => setForm(f => ({ ...f, leetcode_url: e.target.value }))} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Difficulty *</label>
                                    <select className={inputClass + " appearance-none cursor-pointer"} value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Expected Time (min) *</label>
                                    <input className={inputClass} type="number" min={1} value={form.expected_time} onChange={e => setForm(f => ({ ...f, expected_time: parseInt(e.target.value) || 0 }))} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Example Testcases</label>
                                    <textarea className={textareaClass + " font-mono text-xs"} rows={4} placeholder="[2,7,11,15]&#10;9" value={form.example_testcases || ''} onChange={e => setForm(f => ({ ...f, example_testcases: e.target.value }))} />
                                </div>
                                <div>
                                    <label className={labelClass}>Sample Testcase</label>
                                    <textarea className={textareaClass + " font-mono text-xs"} rows={4} placeholder="[2,7,11,15]&#10;9" value={form.sample_testcase || ''} onChange={e => setForm(f => ({ ...f, sample_testcase: e.target.value }))} />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Hidden Test Cases</label>
                                <textarea className={textareaClass + " font-mono text-xs"} rows={5} placeholder="[2,7,11,15]&#10;9&#10;[3,2,4]&#10;6" value={form.hidden_testcases || ''} onChange={e => setForm(f => ({ ...f, hidden_testcases: e.target.value }))} />
                                <p className="text-[10px] text-slate-500 mt-1">Each testcase should consist of parameter values in order, separated by newlines.</p>
                            </div>

                            {/* Topics */}
                            <div>
                                <label className={labelClass}>Topics</label>
                                <div className="flex gap-2 mb-2">
                                    <input className={inputClass} placeholder="e.g. Arrays, Two Pointers" value={topicInput}
                                        onChange={e => setTopicInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } }}
                                    />
                                    <button type="button" onClick={addTopic} className="shrink-0 px-4 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-[#30363d] transition-colors cursor-pointer">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.topics.map(t => (
                                        <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#137fec]/10 border border-[#137fec]/20 text-[#137fec] text-xs font-bold">
                                            {t}
                                            <button onClick={() => removeTopic(t)} className="hover:text-white cursor-pointer">
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                {/* ── Reference Solution ── */}
                                <div className="border-t border-[#30363d] pt-4 mt-4">
                                    <button onClick={() => setShowRef(r => !r)} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer w-full text-left">
                                        <span className="material-symbols-outlined text-base transition-transform" style={{ transform: showRef ? 'rotate(90deg)' : 'rotate(0)' }}>chevron_right</span>
                                        Reference Solution
                                        {refExists && <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">EXISTS</span>}
                                    </button>

                                    {showRef && (
                                        <div className="mt-4 space-y-4 pl-1">
                                            <div>
                                                <label className={labelClass}>Optimal Approach *</label>
                                                <textarea className={textareaClass} rows={4} placeholder="Two-pointer technique: Start with pointers at both ends…" value={refForm.optimal_approach} onChange={e => setRefForm(f => ({ ...f, optimal_approach: e.target.value }))} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Time Complexity *</label>
                                                    <input className={inputClass} placeholder="O(n)" value={refForm.time_complexity} onChange={e => setRefForm(f => ({ ...f, time_complexity: e.target.value }))} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Space Complexity *</label>
                                                    <input className={inputClass} placeholder="O(1)" value={refForm.space_complexity} onChange={e => setRefForm(f => ({ ...f, space_complexity: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Key Insights *</label>
                                                <textarea className={textareaClass} rows={3} placeholder="Sorting + two pointers avoids nested loops…" value={refForm.key_insights} onChange={e => setRefForm(f => ({ ...f, key_insights: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Common Pitfalls</label>
                                                <textarea className={textareaClass} rows={2} placeholder="Forgetting to handle duplicates…" value={refForm.common_pitfalls} onChange={e => setRefForm(f => ({ ...f, common_pitfalls: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Pseudocode (Python)</label>
                                                <textarea className={textareaClass + " font-mono text-xs"} rows={6} placeholder="sort(arr)&#10;left = 0, right = n-1&#10;while left < right:&#10;  ..." value={refForm.pseudocode || ''} onChange={e => setRefForm(f => ({ ...f, pseudocode: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>C++ Reference Solution</label>
                                                <textarea className={textareaClass + " font-mono text-xs"} rows={6} placeholder="class Solution { ... }" value={refForm.pseudocode_cpp || ''} onChange={e => setRefForm(f => ({ ...f, pseudocode_cpp: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Java Reference Solution</label>
                                                <textarea className={textareaClass + " font-mono text-xs"} rows={6} placeholder="class Solution { ... }" value={refForm.pseudocode_java || ''} onChange={e => setRefForm(f => ({ ...f, pseudocode_java: e.target.value }))} />
                                            </div>
                                            {editingProblem && (
                                                <div className="flex items-center gap-3">
                                                    <button onClick={handleSaveRef} disabled={refSaving} className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer disabled:opacity-50">
                                                        {refSaving ? 'Saving…' : (refExists ? 'Update Reference' : 'Add Reference')}
                                                    </button>
                                                    {refExists && (
                                                        <button onClick={handleDeleteRef} className="px-4 py-2 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer">
                                                            Delete Reference
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                {/* ── Hidden Test Cases ── */}
                                {editingProblem && (
                                    <div className="border-t border-[#30363d] pt-4 mt-4">
                                        <button type="button" onClick={() => setShowTestCases(t => !t)} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer w-full text-left">
                                            <span className="material-symbols-outlined text-base transition-transform" style={{ transform: showTestCases ? 'rotate(90deg)' : 'rotate(0)' }}>chevron_right</span>
                                            Hidden Test Cases
                                            {testCases.length > 0 && (
                                                <span className="text-[9px] text-[#137fec] font-black bg-[#137fec]/10 border border-[#137fec]/20 px-2 py-0.5 rounded-full ml-1">
                                                    {testCases.length} SEEDED
                                                </span>
                                            )}
                                        </button>

                                        {showTestCases && (
                                            <div className="mt-4 space-y-3 pl-1">
                                                {testCases.length === 0 ? (
                                                    <p className="text-xs text-slate-500 italic">No hidden test cases seeded for this problem yet. (They are automatically generated when you import or create a problem with a reference solution).</p>
                                                ) : (
                                                    <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                                                        {testCases.map((tc, idx) => (
                                                            <div key={tc.test_case_id || idx} className="bg-[#0d1117] border border-[#30363d] rounded-xl p-3.5 space-y-2 text-xs">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-bold text-[#137fec]">Test Case #{idx + 1}</span>
                                                                    {tc.is_edge_case && (
                                                                        <span className="text-[9px] font-black tracking-wider uppercase bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20">Edge Case</span>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-1">
                                                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Input Arguments</span>
                                                                        <pre className="p-2 bg-[#161b22] border border-[#30363d]/50 rounded-lg text-slate-300 font-mono text-[10px] overflow-x-auto custom-scrollbar select-all whitespace-pre-wrap">{tc.input_args}</pre>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Expected Output</span>
                                                                        <pre className="p-2 bg-[#161b22] border border-[#30363d]/50 rounded-lg text-emerald-400 font-mono text-[10px] overflow-x-auto custom-scrollbar select-all whitespace-pre-wrap">{tc.expected_output}</pre>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#30363d]">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer disabled:opacity-50 shadow-lg shadow-indigo-900/30" style={{ background: 'linear-gradient(135deg, #137fec 0%, #0b6fcc 100%)' }}>
                                {saving ? 'Saving…' : (editingProblem ? 'Update Problem' : 'Create Problem')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirmation ── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-6 mx-4 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Delete Problem</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">
                            Are you sure you want to delete <strong className="text-white">"{deleteTarget.title}"</strong>?
                        </p>
                        <p className="text-xs text-rose-400/70 mb-6">
                            This will permanently delete all associated sessions, feedback, metrics, and reference solutions.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button onClick={() => setDeleteTarget(null)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">Cancel</button>
                            <button onClick={handleDelete} className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer shadow-lg shadow-rose-900/30">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Toast ── */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-2xl text-sm font-bold transition-all animate-[slideUp_0.3s_ease-out] ${toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'}`}>
                    <span className="material-symbols-outlined text-base">{toast.type === 'error' ? 'error' : 'check_circle'}</span>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex items-center gap-3">
            <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
            <div>
                <div className="text-2xl font-black text-white font-mono">{value}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{label}</div>
            </div>
        </div>
    );
}
