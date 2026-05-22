import Editor from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "./Api";
import { getInterviewErrorMessage } from "./interviewErrors";
import TerminalOutput from "./TerminalOutpur";

const ButtonSpinner = () => (
  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
);

const getLanguageExtension = (lang) => {
  if (lang === "python") return "py";
  if (lang === "cpp") return "cpp";
  if (lang === "java") return "java";
  return "txt";
};

export default function UnifiedWorkspace({
  session_id,
  curr_phase,
  code,
  onChangeCode,
  language,
  onChangeLanguage,
  onSelectionChange,
  loadingType,
  setLoadingType,
  onSetMessage,
  onAgentResponse,
  output,
}) {
  const [activeTab, setActiveTab] = useState("approach.md");
  const NOTEPAD_KEY = `interview.notepad.${session_id}`;

  const [approach, setApproach] = useState(() => {
    return sessionStorage.getItem(NOTEPAD_KEY) ?? "";
  });

  useEffect(() => {
    sessionStorage.setItem(NOTEPAD_KEY, approach);
  }, [approach, NOTEPAD_KEY]);

  // Sync active tab with interview phase transitions
  useEffect(() => {
    if (curr_phase !== "PROBLEM_DISCUSSION") {
      setActiveTab("solution");
    } else {
      setActiveTab("approach.md");
    }
  }, [curr_phase]);

  const editorRef = useRef(null);
  const selectionListenerRef = useRef(null);

  const getSelectedText = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return "";
    const model = editor.getModel();
    if (!model) return "";

    const selections = editor.getSelections() || [];
    const chunks = selections
      .map((selection) => model.getValueInRange(selection))
      .map((text) => text.trimEnd())
      .filter((text) => text.length > 0);

    return chunks.join("\n\n");
  }, []);

  const handleEditorMount = useCallback((editorInstance) => {
    editorRef.current = editorInstance;

    if (selectionListenerRef.current) {
      selectionListenerRef.current.dispose();
      selectionListenerRef.current = null;
    }

    selectionListenerRef.current = editorInstance.onDidChangeCursorSelection(() => {
      if (activeTab === "solution" && onSelectionChange) {
        onSelectionChange(getSelectedText());
      }
    });
  }, [activeTab, getSelectedText, onSelectionChange]);

  useEffect(() => {
    return () => {
      if (selectionListenerRef.current) {
        selectionListenerRef.current.dispose();
        selectionListenerRef.current = null;
      }
    };
  }, []);

  const handleEditorChange = (value) => {
    const textVal = value || "";
    if (activeTab === "approach.md") {
      setApproach(textVal);
    } else {
      onChangeCode(textVal);
    }
  };

  const onReviewApproach = async () => {
    try {
      setLoadingType("APPROACH_REVIEW");
      const res = await api.post("/interview/problem_discussion", {
        session_id: session_id,
        message: approach,
      });
      onSetMessage(res.data.response);
      onAgentResponse?.(res?.data);
    } catch (error) {
      console.error("Error reviewing approach:", error);
      alert(getInterviewErrorMessage(error, "reviewing your approach"));
    } finally {
      setLoadingType(null);
    }
  };

  const isApproachReadOnly = curr_phase === "FEEDBACK";

  return (
    <div className="h-full flex flex-col w-full min-h-0 bg-[#0d1117]">
      {/* Tabs Navigation Header */}
      <div className="flex items-center justify-between px-4 bg-[#0a0f1d]/90 border-b border-white/5 select-none shrink-0 h-11">
        <div className="flex h-full items-end gap-1">
          {/* Tab 1: approach.md */}
          <button
            type="button"
            onClick={() => setActiveTab("approach.md")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all duration-200 border-t-2 border-x border-b-0 cursor-pointer h-[38px] ${
              activeTab === "approach.md"
                ? "bg-[#0d1117] border-white/5 border-t-primary text-white"
                : "bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="material-symbols-outlined text-sm text-amber-500">description</span>
            <span>approach.md</span>
          </button>

          {/* Tab 2: solution file */}
          {curr_phase !== "PROBLEM_DISCUSSION" && (
            <button
              type="button"
              onClick={() => setActiveTab("solution")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all duration-200 border-t-2 border-x border-b-0 cursor-pointer h-[38px] ${
                activeTab === "solution"
                  ? "bg-[#0d1117] border-white/5 border-t-primary text-white"
                  : "bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="material-symbols-outlined text-sm text-primary">terminal</span>
              <span>solution.{getLanguageExtension(language)}</span>
            </button>
          )}
        </div>

        {/* Right-aligned Info / Language selectors */}
        <div className="flex items-center gap-4">
          {activeTab === "approach.md" ? (
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse"></span>
              Markdown Mode
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 select-none">Language:</span>
              <select
                className="text-xs text-white bg-slate-800 border border-white/10 rounded px-2 py-0.5 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Editor Frame */}
      <div className="flex-grow min-h-0 relative bg-[#0d1117]">
        <Editor
          height="100%"
          language={activeTab === "approach.md" ? "markdown" : language}
          theme="vs-dark"
          value={activeTab === "approach.md" ? approach : code}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 4,
            readOnly: activeTab === "approach.md" ? isApproachReadOnly : false,
          }}
        />
      </div>

      {/* Action Footer for PROBLEM_DISCUSSION phase */}
      {activeTab === "approach.md" && curr_phase === "PROBLEM_DISCUSSION" && (
        <div className="p-4 border-t border-white/5 bg-[#0a0f1d]/85 backdrop-blur-sm flex justify-between items-center shrink-0">
          <button
            type="button"
            disabled={loadingType !== null}
            className={`px-5 py-2.5 rounded-lg text-white font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 ${
              loadingType !== null
                ? "bg-emerald-700/50 text-slate-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.02]"
            }`}
            onClick={onReviewApproach}
          >
            {loadingType === "APPROACH_REVIEW" && <ButtonSpinner />}
            {loadingType === "APPROACH_REVIEW" ? "Reviewing approach..." : "Review my approach"}
          </button>
          <span className="text-xs text-slate-400">
            Explain your strategy to the interviewer. Your code tab will unlock once approved.
          </span>
        </div>
      )}

      {/* Bottom Compiler Terminal Frame */}
      {activeTab === "solution" && curr_phase !== "PROBLEM_DISCUSSION" && (
        <div className="shrink-0">
          <TerminalOutput output={output} />
        </div>
      )}
    </div>
  );
}
