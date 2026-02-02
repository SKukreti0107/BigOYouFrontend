function History() {
  return (
    <div className="text-slate-200 h-screen flex flex-col overflow-hidden bg-[#0d1117]">
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-64 border-r border-border-dark bg-panel-dark flex flex-col shrink-0">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </div>
              <h1 className="font-bold text-lg tracking-tight">DSAMock AI</h1>
            </div>
            <nav className="space-y-1">
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary bg-primary/10 border border-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span className="text-sm font-medium">History</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                <span className="text-sm font-medium">Progress</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </a>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-border-dark">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add_box</span>
              Try Another Mock
            </button>
          </div>
        </aside>

        <main className="flex-grow flex flex-col overflow-hidden bg-background-dark">
          <header className="h-14 border-b border-border-dark flex items-center justify-between px-8 shrink-0 bg-panel-dark/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">History</span>
              <span className="material-symbols-outlined text-sm text-slate-600">chevron_right</span>
              <span className="text-slate-200 text-sm font-medium">Session #4829 - LRU Cache &amp; Graph</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 rounded-lg border border-border-dark text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">share</span>
                Share Results
              </button>
              <button className="px-4 py-1.5 rounded-lg bg-slate-800 border border-border-dark text-slate-200 hover:bg-slate-700 transition-all text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">code</span>
                View Full Code
              </button>
            </div>
          </header>

          <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-emerald-500/10 border border-primary/20 p-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10">
                      <div className="text-center">
                        <span className="block text-3xl font-bold text-emerald-400">85</span>
                        <span className="text-[10px] text-emerald-500/80 uppercase font-bold tracking-widest">Score</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">Strong Performance</h2>
                      <p className="text-slate-400 text-sm max-w-md">
                        You've demonstrated exceptional problem-solving skills and a solid grasp of data structures. Some
                        minor optimizations in space complexity were identified.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-background-dark/50 rounded-xl px-5 py-3 border border-border-dark">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                        Time Spent
                      </span>
                      <span className="text-xl font-mono text-white">44:21</span>
                    </div>
                    <div className="bg-background-dark/50 rounded-xl px-5 py-3 border border-border-dark">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                        Difficulty
                      </span>
                      <span className="text-xl font-bold text-amber-500">Medium</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-panel-dark border border-border-dark rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">psychology</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">AI Feedback Summary</h3>
                        <p className="text-xs text-slate-500">Deep-dive analysis of your interview session</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Technical Accuracy
                        </h4>
                        <ul className="space-y-2 ml-3.5">
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            Correctly implemented the LRU Cache using a hash map and doubly linked list.
                          </li>
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            All edge cases including single-element capacity were handled gracefully.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Code Quality
                        </h4>
                        <ul className="space-y-2 ml-3.5">
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Modular approach with clear separation of responsibilities between LL and Cache.
                          </li>
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Variable naming follows standard Python PEP8 conventions.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Communication
                        </h4>
                        <ul className="space-y-2 ml-3.5">
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            Proactively explained the trade-offs between O(n) and O(1) implementations.
                          </li>
                          <li className="text-sm text-slate-400 flex gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            Responded well to hints and adjusted the strategy accordingly.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-panel-dark border border-border-dark rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <span className="material-symbols-outlined">analytics</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Key Metrics</h3>
                        <p className="text-xs text-slate-500">Performance comparison vs optimal benchmarks</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="metric-card p-4 border border-border-dark rounded-xl">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                          Runtime Complexity
                        </span>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-2xl font-mono text-emerald-400">O(1)</span>
                          <span className="text-[10px] text-slate-500 mb-1">Optimal</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full">
                          <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                        </div>
                      </div>
                      <div className="metric-card p-4 border border-border-dark rounded-xl">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                          Memory Efficiency
                        </span>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-2xl font-mono text-amber-400">O(N)</span>
                          <span className="text-[10px] text-slate-500 mb-1">+12% over optimal</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full">
                          <div className="bg-amber-500 h-full rounded-full w-3/4"></div>
                        </div>
                      </div>
                      <div className="metric-card p-4 border border-border-dark rounded-xl">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                          Coding Speed
                        </span>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-2xl font-mono text-primary">High</span>
                          <span className="text-[10px] text-slate-500 mb-1">Top 15%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full">
                          <div className="bg-primary h-full rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-panel-dark border border-border-dark rounded-2xl p-6 sticky top-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Improvement Plan</h3>
                        <p className="text-xs text-slate-500">Targeted study recommendations</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-background-dark/50 border border-border-dark rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-sm text-amber-500">school</span>
                          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Data Structures</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          Review Doubly Linked List node removals to ensure garbage collection safety.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-border-dark">
                            LRU Variants
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-border-dark">
                            Node Sync
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-background-dark/50 border border-border-dark rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-sm text-primary">flash_on</span>
                          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Algorithms</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          Focus on optimizing search in multi-index structures for faster access.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-border-dark">
                            Hash Maps
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-border-dark">
                            Caches
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-background-dark/50 border border-border-dark rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-sm text-emerald-500">record_voice_over</span>
                          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Soft Skills</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          Practice explaining your thoughts while coding to maintain a better flow.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-border-dark">
                            Think Aloud
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 border border-primary/30 text-primary hover:bg-primary/5 rounded-xl text-sm font-bold transition-all">
                      Generate Study Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default History
