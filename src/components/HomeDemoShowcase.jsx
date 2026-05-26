import { useState, useEffect, useRef } from "react";

// Robust Python code syntax highlighting helper for mock presentation
const highlightPython = (code) => {
    if (!code) return "";
    let escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    
    // We replace target keywords with special tokens to avoid double-matching class/left attributes inside generated HTML tags
    escaped = escaped.replace(/\bdef\b/g, "___DEF___");
    escaped = escaped.replace(/\bclass\b/g, "___CLASS___");
    escaped = escaped.replace(/\bwhile\b/g, "___WHILE___");
    escaped = escaped.replace(/\bif\b/g, "___IF___");
    escaped = escaped.replace(/\belif\b/g, "___ELIF___");
    escaped = escaped.replace(/\belse\b/g, "___ELSE___");
    escaped = escaped.replace(/\breturn\b/g, "___RETURN___");
    
    escaped = escaped.replace(/\bsearchInsert\b/g, "___SEARCH_INSERT___");
    escaped = escaped.replace(/\blen\b/g, "___LEN___");
    
    escaped = escaped.replace(/\bnums\b/g, "___VAR_NUMS___");
    escaped = escaped.replace(/\btarget\b/g, "___VAR_TARGET___");
    escaped = escaped.replace(/\bleft\b/g, "___VAR_LEFT___");
    escaped = escaped.replace(/\bright\b/g, "___VAR_RIGHT___");
    escaped = escaped.replace(/\bmid\b/g, "___VAR_MID___");
    
    escaped = escaped.replace(/\b(\d+)\b/g, "___NUM_$1___");

    // Replace tokens with styled span classes
    escaped = escaped.replace(/___DEF___/g, '<span class="text-purple-400 font-bold">def</span>');
    escaped = escaped.replace(/___CLASS___/g, '<span class="text-purple-400 font-bold">class</span>');
    escaped = escaped.replace(/___WHILE___/g, '<span class="text-purple-400 font-bold">while</span>');
    escaped = escaped.replace(/___IF___/g, '<span class="text-purple-400 font-bold">if</span>');
    escaped = escaped.replace(/___ELIF___/g, '<span class="text-purple-400 font-bold">elif</span>');
    escaped = escaped.replace(/___ELSE___/g, '<span class="text-purple-400 font-bold">else</span>');
    escaped = escaped.replace(/___RETURN___/g, '<span class="text-purple-400 font-bold">return</span>');
    
    escaped = escaped.replace(/___SEARCH_INSERT___/g, '<span class="text-yellow-400 font-medium">searchInsert</span>');
    escaped = escaped.replace(/___LEN___/g, '<span class="text-cyan-400 font-medium">len</span>');
    
    escaped = escaped.replace(/___VAR_NUMS___/g, '<span class="text-slate-200">nums</span>');
    escaped = escaped.replace(/___VAR_TARGET___/g, '<span class="text-slate-200">target</span>');
    escaped = escaped.replace(/___VAR_LEFT___/g, '<span class="text-slate-200">left</span>');
    escaped = escaped.replace(/___VAR_RIGHT___/g, '<span class="text-slate-200">right</span>');
    escaped = escaped.replace(/___VAR_MID___/g, '<span class="text-slate-200">mid</span>');
    
    escaped = escaped.replace(/___NUM_(\d+)___/g, '<span class="text-amber-400">$1</span>');

    return escaped;
};

export default function HomeDemoShowcase() {
    const [activeTab, setActiveTab] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const autoplayTimerRef = useRef(null);

    // Step 1: Import Simulation States
    const [importState, setImportState] = useState("typing"); // typing, importing, success
    const [importUrlText, setImportUrlText] = useState("");
    const targetUrl = "https://leetcode.com/problems/search-insert-position/";

    // Step 2: Workspace Simulation States
    const [editorTab, setEditorTab] = useState("approach.md");
    const [editorMode, setEditorMode] = useState("MARKDOWN MODE");
    const [typedText, setTypedText] = useState("");
    const [showAIPopup, setShowAIPopup] = useState(false);

    const targetApproach = "I will use a binary search approach. Since the array is sorted, we can search for target in O(log n) time. If target is not found, left pointer points to insertion index.";
    const targetCode = `def searchInsert(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left`;

    // Step 3: Analytics Scores Progress
    const [scoreProgress, setScoreProgress] = useState(0);

    // Autoplay logic
    useEffect(() => {
        if (!isPlaying) {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
            return;
        }

        autoplayTimerRef.current = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % 3);
        }, 18000); // Cycle every 18 seconds

        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [isPlaying]);

    // Handle manual tab changes
    const handleTabClick = (index) => {
        setActiveTab(index);
        setIsPlaying(false); // Pause autoplay once user interacts
    };

    // Step 1: Typing & Import Animation Loop
    useEffect(() => {
        if (activeTab !== 0) return;

        setImportState("typing");
        setImportUrlText("");
        let charIndex = 0;
        let typingInterval = null;
        let importTimeout = null;
        let successTimeout = null;

        typingInterval = setInterval(() => {
            if (charIndex < targetUrl.length) {
                setImportUrlText(targetUrl.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                importTimeout = setTimeout(() => {
                    setImportState("importing");
                    
                    successTimeout = setTimeout(() => {
                        setImportState("success");
                    }, 2000);

                }, 800);
            }
        }, 40);

        return () => {
            if (typingInterval) clearInterval(typingInterval);
            if (importTimeout) clearTimeout(importTimeout);
            if (successTimeout) clearTimeout(successTimeout);
        };
    }, [activeTab]);

    // Step 2: Sequential Typing (Approach first, then Code)
    useEffect(() => {
        if (activeTab !== 1) return;

        // Reset workspace to initial approach view
        setEditorTab("approach.md");
        setEditorMode("MARKDOWN MODE");
        setTypedText("");
        setShowAIPopup(false);

        let charIndex = 0;
        let typingInterval = null;
        let switchTimeout = null;
        let codeInterval = null;
        let chatTimeout = null;

        // Start typing approach
        typingInterval = setInterval(() => {
            if (charIndex < targetApproach.length) {
                setTypedText(targetApproach.substring(0, charIndex + 1));
                charIndex += 4;
            } else {
                setTypedText(targetApproach);
                clearInterval(typingInterval);

                // Wait, then switch to solution.py tab and write code
                switchTimeout = setTimeout(() => {
                    setEditorTab("solution.py");
                    setEditorMode("PYTHON MODE");
                    setTypedText("");
                    
                    let codeIndex = 0;
                    codeInterval = setInterval(() => {
                        if (codeIndex < targetCode.length) {
                            setTypedText(targetCode.substring(0, codeIndex + 1));
                            codeIndex += 5;
                        } else {
                            setTypedText(targetCode);
                            clearInterval(codeInterval);

                            // Wait, then show AI popup feedback
                            chatTimeout = setTimeout(() => {
                                setShowAIPopup(true);
                            }, 1000);
                        }
                    }, 35);

                }, 1500);
            }
        }, 40);

        return () => {
            if (typingInterval) clearInterval(typingInterval);
            if (switchTimeout) clearTimeout(switchTimeout);
            if (codeInterval) clearInterval(codeInterval);
            if (chatTimeout) clearTimeout(chatTimeout);
        };
    }, [activeTab]);

    // Step 3: Score Counting Animation
    useEffect(() => {
        if (activeTab !== 2) {
            setScoreProgress(0);
            return;
        }

        let current = 0;
        const targetScore = 85;
        const countInterval = setInterval(() => {
            if (current < targetScore) {
                current += 2;
                setScoreProgress(Math.min(current, targetScore));
            } else {
                clearInterval(countInterval);
            }
        }, 15);

        return () => clearInterval(countInterval);
    }, [activeTab]);

    return (
        <section className="max-w-[1500px] mx-auto px-6 py-20 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-xs">visibility</span> Interactive Walkthrough
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    See how BigO(You) works
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                    Experience the seamless flow from importing a LeetCode problem, coding with speech-to-text, to getting a detailed feedback assessment.
                </p>
            </div>

            {/* Showcase Layout: Vertical Stack for maximum workspace width */}
            <div className="space-y-8 w-full">
                
                {/* Horizontal Navigation Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                        {
                            title: "1. Paste & Import",
                            desc: "Import any LeetCode problem instantly via URL.",
                            icon: "cloud_download",
                            color: "text-blue-500 bg-blue-500/10"
                        },
                        {
                            title: "2. Live Mock Workspace",
                            desc: "Solve in the IDE with problem panel and AI Speech Interviewer.",
                            icon: "code",
                            color: "text-purple-500 bg-purple-500/10"
                        },
                        {
                            title: "3. Interactive Assessment",
                            desc: "Detailed rubric score cards, critique tiers, and verdict.",
                            icon: "analytics",
                            color: "text-emerald-500 bg-emerald-500/10"
                        }
                    ].map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleTabClick(idx)}
                            className={`flex flex-col items-start text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer w-full ${
                                activeTab === idx
                                    ? "bg-white dark:bg-[#161b22] border-primary shadow-lg shadow-primary/5 -translate-y-1"
                                    : "bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#161b22]/30"
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-xl flex items-center justify-center ${tab.color}`}>
                                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                </div>
                                <h4 className={`font-bold text-sm md:text-base ${
                                    activeTab === idx ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                }`}>
                                    {tab.title}
                                </h4>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-1">
                                {tab.desc}
                            </p>
                        </button>
                    ))}
                </div>
                
                {/* Autoplay / Pause Controller */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">
                            {isPlaying ? "pause_circle" : "play_circle"}
                        </span>
                        <span>{isPlaying ? "Autoplay active" : "Autoplay paused"}</span>
                    </button>
                </div>

                {/* Animated Display Terminal - Now Full Width for enhanced readability */}
                <div className="w-full bg-[#070b11] rounded-2xl border border-[#30363d] shadow-2xl overflow-hidden min-h-[640px] flex flex-col relative text-slate-100 font-display">
                    
                    {/* Header bar resembling actual header */}
                    <div className="bg-[#0d1117] px-6 py-3.5 border-b border-[#30363d] flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="text-sm font-bold tracking-tight">
                                BigO<span className="text-[#137fec]">(You)</span>
                            </div>
                            
                            {activeTab === 1 && (
                                <>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">INTERVIEW PROGRESS</span>
                                        <div className="flex gap-1">
                                            <span className="w-4 h-1.5 rounded-full bg-primary"></span>
                                            <span className="w-4 h-1.5 rounded-full bg-primary/35"></span>
                                            <span className="w-4 h-1.5 rounded-full bg-primary/10"></span>
                                            <span className="w-4 h-1.5 rounded-full bg-primary/10"></span>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-[#161b22] px-3 py-1 rounded border border-[#30363d] text-slate-400 font-bold">
                                        PROBLEM DISCUSSION
                                    </span>
                                </>
                            )}
                        </div>
                        <div>
                            {activeTab === 1 ? (
                                <button className="border border-red-500/50 text-red-500 hover:bg-red-500/10 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider transition-all select-none">
                                    END INTERVIEW
                                </button>
                            ) : (
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#137fec] bg-[#137fec]/15 px-2.5 py-1 rounded border border-[#137fec]/25">
                                    PRODUCT MOCK
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Step 1 Content: Paste & Import */}
                    {activeTab === 0 && (
                        <div className="flex-1 p-8 flex flex-col justify-center max-w-2xl mx-auto w-full space-y-6">
                            <div className="text-center space-y-2">
                                <h4 className="text-xl font-bold text-white">Import from LeetCode</h4>
                                <p className="text-xs text-slate-400">Paste any LeetCode problem URL and our platform parses details, examples, and generates template code.</p>
                            </div>
                            
                            <div className="bg-[#161b22]/50 border border-[#30363d] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                                
                                <div className="space-y-4">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">LeetCode Question URL or Slug</label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 bg-[#0d1117]/90 border border-[#30363d] rounded-xl px-4 py-3.5 text-xs text-slate-200 font-mono flex items-center min-h-[46px]">
                                            {importUrlText}
                                            {importState === "typing" && <span className="w-1.5 h-4 bg-primary ml-0.5 animate-pulse"></span>}
                                        </div>
                                        <button className="bg-primary text-white rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-default transition-all duration-300">
                                            {importState === "importing" ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Importing...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-sm">cloud_download</span>
                                                    Import
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {importState === "importing" && (
                                        <div className="mt-4 border border-[#30363d] bg-[#0d1117]/40 rounded-xl p-4 space-y-2.5 text-[11px] text-slate-400 font-mono">
                                            <div className="flex items-center gap-2 text-primary">
                                                <div className="w-3.5 h-3.5 border border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <span>Fetching LeetCode problem data...</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-50">
                                                <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                                                <span>Parsing content parameters & examples...</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-50">
                                                <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                                                <span>Generating starter template boilerplate...</span>
                                            </div>
                                        </div>
                                    )}

                                    {importState === "success" && (
                                        <div className="mt-4 px-4 py-3.5 rounded-xl border bg-emerald-500/5 border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5 animate-fade-in">
                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                            <span>Successfully imported <b>Search Insert Position</b> into your problem library!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 Content: Workspace Simulation */}
                    {activeTab === 1 && (
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[580px]">
                            
                            {/* Left Pane: Problem Description (3/12 width) */}
                            <div className="w-full md:w-3/12 border-b md:border-b-0 md:border-r border-[#30363d] p-5 flex flex-col justify-between overflow-y-auto text-left select-none text-[12.5px]">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#0bda5b] font-mono text-[15px] font-bold">14:29</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border border-emerald-500/20">Easy</span>
                                    </div>
                                    <h4 className="text-base font-extrabold text-white">Search Insert Position</h4>
                                    <p className="text-slate-400 leading-relaxed text-[12px]">
                                        Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. 
                                        You must write an algorithm with O(log n) runtime complexity.
                                    </p>
                                    
                                    {/* Terminal Example Box */}
                                    <div className="bg-[#070b11] border border-[#30363d]/80 rounded-xl p-4 font-mono text-[10.5px] space-y-2">
                                        <div className="flex items-center justify-between pb-1.5 border-b border-[#30363d]/50">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 rounded-full bg-rose-500/60"></span>
                                                <span className="w-2 h-2 rounded-full bg-amber-500/60"></span>
                                                <span className="w-2 h-2 rounded-full bg-emerald-500/60"></span>
                                            </div>
                                            <span className="text-slate-500 text-[8px]">bash | example.sh</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div><span className="text-primary">Input:</span> nums = [1, 3, 5, 6], target = 2</div>
                                            <div><span className="text-primary">Output:</span> 1</div>
                                            <div className="text-slate-500 leading-relaxed">Explanation: The value 2 is not in the array. If inserted, it would go at index 1.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Pane: Markdown / Code Editor (5/12 width) */}
                            <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-[#30363d] flex flex-col justify-between text-left">
                                <div className="flex flex-col flex-1">
                                    {/* Editor tab bar */}
                                    <div className="bg-[#0d1117] border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono select-none">
                                        <span className="text-slate-300 font-bold flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-sm text-[#f48c06]">
                                                {editorTab === "approach.md" ? "description" : "code"}
                                            </span>
                                            {editorTab}
                                        </span>
                                        <span className="text-[#f48c06] flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#f48c06] animate-pulse"></span>
                                            {editorMode}
                                        </span>
                                    </div>
                                    
                                    {/* Text editor body */}
                                    <div className="flex-1 p-5 font-mono text-[13px] leading-relaxed text-slate-300 overflow-y-auto bg-[#070b11]/85 select-text whitespace-pre-wrap">
                                        <div className="flex gap-4">
                                            <span className="text-slate-600 select-none text-right pr-2 border-r border-[#30363d]/30 min-w-[20px]">
                                                {editorTab === "solution.py" ? (
                                                    Array.from({ length: typedText.split("\n").length }).map((_, i) => (
                                                        <div key={i}>{i + 1}</div>
                                                    ))
                                                ) : (
                                                    "1"
                                                )}
                                            </span>
                                            <span className="flex-1">
                                                {editorTab === "solution.py" ? (
                                                    <code dangerouslySetInnerHTML={{ __html: highlightPython(typedText) }} />
                                                ) : (
                                                    typedText
                                                )}
                                                <span className="w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse inline-block align-middle"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Bottom Action Bar */}
                                <div className="border-t border-[#30363d] p-4 flex items-center justify-between gap-3 bg-[#0d1117]/80">
                                    <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-[11px] px-3.5 py-1.5 rounded uppercase tracking-wider cursor-default shadow-lg shadow-emerald-500/10">
                                        {editorTab === "approach.md" ? "Review my approach" : "Run Code"}
                                    </button>
                                    <p className="text-[10px] text-slate-400 leading-normal flex-1">
                                        {editorTab === "approach.md" 
                                            ? "Explain your strategy to the Interviewer. Your code tab will unlock once approved."
                                            : "Compile and execute your solution against sample test suites."}
                                    </p>
                                </div>
                            </div>

                            {/* Right Pane: AI Chat Interviewer (4/12 width) */}
                            <div className="w-full md:w-4/12 flex flex-col justify-between bg-[#070b11] text-left">
                                {/* Chat header */}
                                <div className="bg-[#0d1117] border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between select-none">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-white">AI Interviewer</span>
                                        <div className="flex items-center gap-1.5 text-[9px] text-[#0bda5b]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#0bda5b] animate-ping"></span>
                                            <span>Analyzing your solution</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-base cursor-pointer">volume_up</span>
                                </div>
                                
                                {/* Dialogue area */}
                                <div className="flex-1 p-4 space-y-4 overflow-y-auto text-[13px] leading-relaxed">
                                    <div className="bg-[#161b22]/70 border border-[#30363d] rounded-xl p-4 shadow-md space-y-3 text-slate-200">
                                        <p>
                                            Welcome to your technical interview. We will discuss the problem, detail a high-level approach including complexity and edge cases, and then implement the solution.
                                        </p>
                                        <p className="text-[12px] text-slate-400 border-l-2 border-primary pl-2.5">
                                            Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. The runtime complexity must be O(log n).
                                        </p>
                                        <p className="font-bold text-white pt-1">
                                            What is your initial approach to solving this problem?
                                        </p>
                                    </div>

                                    {/* Simulated typed approach popup */}
                                    {showAIPopup && (
                                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 shadow-lg text-[12px] text-slate-300 animate-fade-in flex gap-2.5">
                                            <span className="material-symbols-outlined text-[#137fec] text-sm shrink-0 mt-0.5">smart_toy</span>
                                            <p className="leading-relaxed">
                                                <b>AI Assessment:</b> Excellent binary search proposal. O(log n) is indeed optimal and aligns with constraints. Let's start coding your implementation.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Chat Input Area */}
                                <div className="border-t border-[#30363d] p-4 space-y-3 bg-[#0d1117]">
                                    <textarea 
                                        readOnly
                                        placeholder="Answer here based on the AI Interviewer's question..."
                                        className="w-full bg-transparent border-none text-[12px] text-slate-300 placeholder-slate-600 resize-none h-14 focus:outline-none"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1 text-[10px] font-bold text-slate-400 border border-[#30363d] px-2.5 py-1 rounded bg-[#161b22]/40">
                                                <span className="material-symbols-outlined text-[12px]">attachment</span>
                                                Attach selection
                                            </button>
                                            <button className="flex items-center gap-1 text-[10px] font-bold text-slate-400 border border-[#30363d] px-2.5 py-1 rounded bg-[#161b22]/40 relative">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                <span className="material-symbols-outlined text-[12px]">mic</span>
                                                Mic Input
                                            </button>
                                        </div>
                                        <button className="bg-primary text-white text-[11px] font-bold px-4 py-1.5 rounded flex items-center gap-1 cursor-default">
                                            <span className="material-symbols-outlined text-[12px]">send</span>
                                            Send
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Step 3 Content: Assessment Results Page */}
                    {activeTab === 2 && (
                        <div className="flex-1 p-6 flex flex-col overflow-y-auto max-h-[580px] text-left select-none space-y-4">
                            
                            {/* Top Header Card: Strong Performance */}
                            <div className="bg-[#161b22]/70 border border-[#30363d] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative shadow-xl">
                                <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                                
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Score Gauge */}
                                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                                            <circle cx="50" cy="50" r="40" stroke="#0bda5b" strokeWidth="8" fill="transparent"
                                                strokeDasharray="251.2"
                                                strokeDashoffset={251.2 - (251.2 * scoreProgress) / 100}
                                                strokeLinecap="round"
                                                className="transition-all duration-300"
                                            />
                                        </svg>
                                        <div className="flex flex-col items-center select-none">
                                            <span className="text-lg font-black text-white leading-none">{scoreProgress}</span>
                                            <span className="text-[6px] text-[#0bda5b] uppercase font-bold tracking-widest mt-0.5">SCORE</span>
                                        </div>
                                    </div>
                                    
                                    {/* Title and Verdict */}
                                    <div className="space-y-0.5 text-left flex-1">
                                        <h4 className="text-sm font-black text-white">Strong Performance</h4>
                                        <p className="text-[11.5px] text-slate-400 max-w-3xl leading-relaxed">
                                            The candidate demonstrated strong algorithmic proficiency, successfully implemented the optimal solution, and correctly identified the complexities. Despite minor issues with production-style code formatting, they meet the hiring bar for a junior to mid-level engineering role.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side Info boxes */}
                                <div className="flex gap-2 shrink-0">
                                    <div className="bg-[#070b11] border border-[#30363d] px-3 py-2 rounded-xl text-center min-w-[70px]">
                                        <div className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">TIME SPENT</div>
                                        <div className="text-xs font-black text-slate-100 font-mono mt-0.5">3:11</div>
                                    </div>
                                    <div className="bg-[#070b11] border border-[#30363d] px-3 py-2 rounded-xl text-center min-w-[70px]">
                                        <div className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">DIFFICULTY</div>
                                        <div className="text-xs font-black text-yellow-400 font-mono mt-0.5">Easy</div>
                                    </div>
                                </div>
                            </div>

                            {/* Split Panels: Rubrics on Left, Improvement on Right */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                                
                                {/* Left Side Rubrics details (8/12 width) */}
                                <div className="lg:col-span-8 space-y-4">
                                    
                                    {/* Tabs row */}
                                    <div className="border-b border-[#30363d] flex gap-4 text-[10px] font-bold select-none">
                                        <span className="border-b-2 border-primary text-white pb-1.5 flex items-center gap-1.5 cursor-pointer">
                                            <span className="material-symbols-outlined text-[12px]">smart_toy</span>
                                            AI OVERVIEW
                                        </span>
                                        <span className="text-slate-500 pb-1.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-300">
                                            <span className="material-symbols-outlined text-[12px]">analytics</span>
                                            METRICS & BENCHMARKS
                                        </span>
                                        <span className="text-slate-500 pb-1.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-300">
                                            <span className="material-symbols-outlined text-[12px]">menu_book</span>
                                            REFERENCE SOLUTION
                                        </span>
                                        <span className="text-slate-500 pb-1.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-300">
                                            <span className="material-symbols-outlined text-[12px]">terminal</span>
                                            AI EVALUATION LOG
                                        </span>
                                    </div>

                                    {/* AI feedback summary */}
                                    <div className="space-y-4">
                                        <div className="space-y-0.5">
                                            <h5 className="text-xs font-bold text-white">AI Feedback Summary</h5>
                                            <p className="text-[10px] text-slate-400">Deep-dive analysis of your interview session</p>
                                        </div>

                                        {/* Highlights card */}
                                        <div className="space-y-1.5 text-left">
                                            <span className="text-[8px] font-bold uppercase text-slate-500 tracking-wider">STRENGTHS & HIGHLIGHTS</span>
                                            <div className="bg-[#161b22]/30 border border-[#30363d]/50 rounded-xl p-3 flex items-start gap-2.5">
                                                <span className="material-symbols-outlined text-[#0bda5b] text-base mt-0.5">check_circle</span>
                                                <div>
                                                    <h6 className="text-[11px] font-bold text-slate-200">Optimal Algorithm Implementation</h6>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Independently identified the O(n) time complexity solution with O(1) space usage.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Communication Rubric Card */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between border-b border-[#30363d]/50 pb-1.5">
                                                <span className="text-[8px] font-bold uppercase text-slate-500 tracking-wider">DETAILED CATEGORY RUBRICS</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-slate-300">Communication</span>
                                                    <span className="bg-[#0bda5b]/10 text-[#0bda5b] border border-[#0bda5b]/20 px-2 py-0.5 rounded text-[10px] font-bold">8 / 10</span>
                                                </div>
                                            </div>

                                            {/* Columns inside rubric details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Left column tiers */}
                                                <div className="space-y-2 text-[10px] text-slate-500">
                                                    <span className="text-[8px] font-bold uppercase tracking-wider block mb-0.5">MAANG HIRING RUBRIC TIERS</span>
                                                    <div className="border border-[#30363d]/50 rounded-xl p-2 flex items-center gap-2 bg-[#161b22]/20">
                                                        <span className="w-2 h-2 border border-slate-700 rounded-full shrink-0"></span>
                                                        <div>
                                                            <div className="text-slate-400 font-bold">9-10 (Exceptional)</div>
                                                            <div className="text-[9px] text-slate-600">Exceptional / Collaborative coding style</div>
                                                        </div>
                                                    </div>
                                                    <div className="border border-[#0bda5b]/30 rounded-xl p-2 flex items-center justify-between gap-2 bg-[#0bda5b]/5 text-[#0bda5b]">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[12px] shrink-0">check_circle</span>
                                                            <div className="text-left">
                                                                <div className="font-bold text-slate-200">7-8 (Clear Pass)</div>
                                                                <div className="text-[9px] text-slate-400">Clear pass communication quality</div>
                                                            </div>
                                                        </div>
                                                        <span className="bg-[#0bda5b]/10 border border-[#0bda5b]/20 text-[7px] font-bold px-1 rounded uppercase shrink-0">ACTIVE</span>
                                                    </div>
                                                    <div className="border border-[#30363d]/50 rounded-xl p-2 flex items-center gap-2 bg-[#161b22]/20">
                                                        <span className="w-2 h-2 border border-slate-700 rounded-full shrink-0"></span>
                                                        <div>
                                                            <div className="text-slate-400 font-bold">5-6 (Marginal/Weak)</div>
                                                            <div className="text-[9px] text-slate-600">Vague/one-word answers</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right column quotes */}
                                                <div className="bg-[#161b22]/20 border border-[#30363d]/50 rounded-xl p-3 flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">INTERVIEWER CRITICAL ASSESSMENT</span>
                                                        <p className="text-[10px] text-slate-300 italic leading-relaxed">
                                                            &quot;The candidate communicated their thoughts clearly and responded precisely to technical inquiries. They remained professional and focused throughout the interview. They did not reach the 9-10 level only because their explanations, while accurate, were slightly verbose rather than being purely concise and crisp.&quot;
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Verdict Column (4/12 width) */}
                                <div className="lg:col-span-4 space-y-3">
                                    <div className="bg-[#161b22]/50 border border-[#30363d] rounded-2xl p-4.5 space-y-3 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#f48c06] text-base">trending_up</span>
                                            <div>
                                                <h5 className="text-[11px] font-bold text-white">Improvement Plan</h5>
                                                <p className="text-[8px] text-slate-400">Targeted study recommendations</p>
                                            </div>
                                        </div>

                                        {/* Warning panel */}
                                        <div className="border border-[#f48c06]/20 bg-[#f48c06]/5 rounded-xl p-3 text-[10px] space-y-1 flex gap-2">
                                            <span className="material-symbols-outlined text-[#f48c06] text-sm mt-0.5 shrink-0">warning</span>
                                            <div>
                                                <span className="text-slate-500 font-bold uppercase tracking-wider text-[7px] block">CODE STRUCTURE</span>
                                                <span className="font-bold text-slate-200 block">Production Standards</span>
                                                <p className="text-slate-400 leading-relaxed mt-0.5">Used print statements for output within a functional implementation rather than returning values.</p>
                                            </div>
                                        </div>

                                        {/* Verdict banner */}
                                        <div className="space-y-1">
                                            <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest block text-center">FINAL VERDICT</span>
                                            <div className="bg-[#0bda5b]/10 border border-[#0bda5b]/30 rounded-xl py-2 text-center shadow-lg shadow-emerald-500/5">
                                                <span className="text-xs font-black text-[#0bda5b] uppercase tracking-[0.25em]">● HIRE</span>
                                            </div>
                                        </div>

                                        <button className="w-full bg-[#137fec] hover:bg-primary/95 text-white font-extrabold text-[9px] py-2.5 rounded-xl uppercase tracking-wider transition-all select-none shadow-lg shadow-primary/20">
                                            RETURN TO DASHBOARD
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
