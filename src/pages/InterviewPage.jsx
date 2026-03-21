import InterviewSidebar from "../components/InterviewSidebar"
import CodeEditor from "../components/CodeEditor"
import TerminalOutput from "../components/TerminalOutpur"
import InterviewPageNav from "../components/InterviewPageNav"
import InterviewFeedback from "../components/InterviewFeedback"
import InterviewRightSidebar from "../components/InterviewRightSidebar"
import Notepad from "../components/notepad"
import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from "react"
import api from "../components/Api"

import { PYTHON_STARTER_CODE, CPP_STARTER_CODE, JAVA_STARTER_CODE } from "../components/StartedCode"




const getStarterCode = (language) => {
  if (language === "python") return PYTHON_STARTER_CODE;
  if (language === "cpp") return CPP_STARTER_CODE;
  return JAVA_STARTER_CODE;
};

export default function InterviewPage() {
  // ── Fullscreen lock ──
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRequested = useRef(false);

  useEffect(() => {
    const enterFullscreen = async () => {
      if (fullscreenRequested.current) return;
      fullscreenRequested.current = true;
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.warn("Fullscreen request denied:", err);
      }
    };
    enterFullscreen();

    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    onFsChange();

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const { sessionId } = useParams();
  const VALID_PHASES = new Set(["PROBLEM_DISCUSSION", "CODING", "REVIEW", "FEEDBACK"]);
  const PHASE_KEY = `interview.phase.${sessionId}`
  const [phase, setPhase] = useState(() => {
    return sessionStorage.getItem(PHASE_KEY) ?? "PROBLEM_DISCUSSION";
  })

  useEffect(() => {
    sessionStorage.setItem(PHASE_KEY, phase);
  }, [PHASE_KEY, phase]);

  const [language, setLanguage] = useState("python")

  const [messages, setMessages] = useState([]);

  const STORAGE_KEY = `interview.editor.${sessionId}.${language}`;

  const { state } = useLocation();
  const [session, setSession] = useState(state?.session_deets ?? null);

  useEffect(() => {
    const loadSessionOverview = async () => {
      try {
        const res = await api.get("/interview/session", {
          params: { session_id: sessionId },
        });

        // Backend overview is the source of truth for current session/problem.
        if (res?.data) {
          setSession((prev) => ({ ...(prev ?? {}), ...res.data }));
          // Restore phase from backend on refresh
          if (res.data.phase) {
            setPhase(res.data.phase);
          }
        }
      } catch (error) {
        console.error("Failed to load session overview:", error);
      }
    };

    if (sessionId) {
      loadSessionOverview();
    }
  }, [sessionId]);

  const [code, setCode] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) ?? getStarterCode(language);
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, code);
  }, [STORAGE_KEY, code]);

  // Sync code when language changes
  const handleLanguageChange = (newLanguage) => {
    // 1. Save current work
    sessionStorage.setItem(STORAGE_KEY, code);

    // 2. Load new work
    const newStorageKey = `interview.editor.${sessionId}.${newLanguage}`;
    const savedCode = sessionStorage.getItem(newStorageKey);
    const newCode = savedCode || getStarterCode(newLanguage);

    // 3. Update state
    setLanguage(newLanguage);
    setCode(newCode);
  };

  const FEEDBACK_KEY = `interview.feedback.${sessionId}`;
  const [feedbackData, setFeedbackData] = useState(() => {
    try {
      const stored = sessionStorage.getItem(FEEDBACK_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [output, setOutput] = useState("");
  const [hasRunCode, setHasRunCode] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // 'RUNNING', 'STARTING', 'DRY_RUN', 'FEEDBACK', 'APPROACH_REVIEW', 'MESSAGE'
  const TIMEOUT_STATE_KEY = `interview.timeout_state.${sessionId}`;
  const TIMEOUT_ACTION_KEY = `interview.timeout_action.${sessionId}`;

  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutState, setTimeoutState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(TIMEOUT_STATE_KEY);
      return stored ? JSON.parse(stored) : {
        timeExpired: false,
        extraTimeUsed: false,
        extensionCount: 0,
        maxExtensions: 1,
        extensionSeconds: 0,
      };
    } catch { return {
      timeExpired: false,
      extraTimeUsed: false,
      extensionCount: 0,
      maxExtensions: 1,
      extensionSeconds: 0,
    }; }
  });

  const syncFromAgentResponse = useCallback((data) => {
    if (!data) return;

    if (data.phase && VALID_PHASES.has(data.phase)) {
      setPhase(data.phase);
    }

    if (data.feedback) {
      const payload = { ...data, feedback: data.feedback };
      setFeedbackData(payload);
      sessionStorage.setItem(FEEDBACK_KEY, JSON.stringify(payload));
    }
  }, [FEEDBACK_KEY]);


  const handleRun = async () => {
    try {
      setLoadingType('RUNNING');
      let res = await api.post("/execute", { language: language, code: code, session_id: sessionId })
      let out = res.data;
      setOutput(out.error ? out.error : out.output)
      let agent_res = await api.post("/interview/coding", {
        session_id: sessionId,
        message: "I ran my code and got this output: " + out.output,
        code: code,
        language: language,
        role: "system"
      });
      handleAddMessage(agent_res.data.response);
      syncFromAgentResponse(agent_res?.data);
      setHasRunCode(true);
    } catch (error) {
      console.error("Error in handleRun:", error);
      alert("Failed to execute code. Please check your connection.");
    } finally {
      setLoadingType(null);
    }
  }

  const handleAddMessage = useCallback((text, type = "AI") => {
    setMessages((prev) => [...prev, { type, text }]);
  }, []);

  useEffect(() => {
    const loadSessionMessages = async () => {
      try {
        const res = await api.get("/interview/agent_messages", {
          params: { session_id: sessionId },
        });
        const restored = Array.isArray(res.data) ? res.data : [];
        if (restored.length) {
          const formattedMessages = restored.map((msg) => ({
            type: msg.role === "user" ? "user" : "ai",
            text: msg.content
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Failed to load agent messages:", error);
      }
    };

    loadSessionMessages();
  }, [sessionId]);

  useEffect(() => {
    const didInitKey = `interview.agent_init.${sessionId}`;

    if (sessionStorage.getItem(didInitKey)) return;

    const initAgent = async () => {
      let res = await api.post("/interview/agent_init", { session_id: sessionId, role: "system" });
      handleAddMessage(res.data.response);
      syncFromAgentResponse(res?.data);
      sessionStorage.setItem(didInitKey, "1");
    };

    initAgent();
  }, [sessionId, handleAddMessage, syncFromAgentResponse]);

  const handleStartCoding = async () => {
    try {
      setLoadingType('STARTING');
      let res = await api.post("/interview/coding", {
        session_id: sessionId,
        message: "I'm ready to start coding.",
        code: code,
        language: language,
        role: "system"
      });
      handleAddMessage(res.data.response);
      syncFromAgentResponse(res?.data);
    } catch (error) {
      console.error("Error in handleStartCoding:", error);
      alert("Failed to transition to coding phase.");
    } finally {
      setLoadingType(null);
    }
  }

  const handleDryRun = async () => {
    try {
      setLoadingType('DRY_RUN');
      let res = await api.post("/interview/review", {
        session_id: sessionId,
        message: "I'd like to do a dry run of my solution.",
        code: code,
        language: language,
        role: "system"
      });
      handleAddMessage(res.data.response);
      syncFromAgentResponse(res?.data);
    } catch (error) {
      console.error("Error in handleDryRun:", error);
      alert("Failed to transition to dry run phase.");
    } finally {
      setLoadingType(null);
    }
  }

  const handleFeedback = async () => {
    try {
      setLoadingType('FEEDBACK');
      console.log("Generating feedback...");
      let res = await api.post("/interview/feedback", {
        session_id: sessionId,
        message: "I'm done. Please provide feedback.",
        code: code,
        language: language,
        role: "system",
        time_expired: timeoutState.timeExpired,
        extra_time_used: timeoutState.extraTimeUsed,
        extension_count: timeoutState.extensionCount,
        session_ended_by: timeoutState.timeExpired ? "TIMEOUT_END" : "NORMAL",
      });
      console.log("Feedback response received:", res.data);
      if (res?.data?.response) {
        handleAddMessage(res.data.response, "ai");
      }
      syncFromAgentResponse(res?.data);
    } catch (error) {
      console.error("Error in handleFeedback:", error);
      alert("Failed to generate feedback. Please try again.");
    } finally {
      setLoadingType(null);
    }
  }

  // Persist timeoutState changes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(TIMEOUT_STATE_KEY, JSON.stringify(timeoutState));
  }, [TIMEOUT_STATE_KEY, timeoutState]);

  const handleTimeout = () => {
    // If the user already took a timeout action, don't re-show the modal
    const existingAction = sessionStorage.getItem(TIMEOUT_ACTION_KEY);
    if (existingAction) return;

    setTimeoutState((prev) => ({ ...prev, timeExpired: true }));
    setTimeoutModalOpen(true);
  }

  const handleTimeoutEndFeedback = async () => {
    try {
      setLoadingType('FEEDBACK');

      await api.post("/interview/timeout_action", {
        session_id: sessionId,
        action: "END_FEEDBACK",
      });

      sessionStorage.setItem(TIMEOUT_ACTION_KEY, "END_FEEDBACK");

      let res = await api.post("/interview/feedback", {
        session_id: sessionId,
        message: "[SYSTEM EVENT] Time is up. Generate final feedback based on performance so far.",
        code: code,
        language: language,
        role: "system",
        time_expired: true,
        extra_time_used: timeoutState.extraTimeUsed,
        extension_count: timeoutState.extensionCount,
        session_ended_by: "TIMEOUT_END",
      });

      if (res?.data?.response) {
        handleAddMessage(res.data.response, "ai");
      }
      syncFromAgentResponse(res?.data);
      setTimeoutModalOpen(false);
    } catch (error) {
      console.error("Error handling timeout feedback:", error);
      alert("Failed to generate feedback after timeout.");
    } finally {
      setLoadingType(null);
    }
  }

  const handleTimeoutExtend = async () => {
    try {
      setLoadingType('MESSAGE');
      const res = await api.post("/interview/timeout_action", {
        session_id: sessionId,
        action: "EXTEND",
        extension_minutes: 15,
      });

      const extSeconds = res?.data?.extension_seconds || 0;

      // Clear action key so the modal can re-appear when the new 15-min timer expires
      sessionStorage.removeItem(TIMEOUT_ACTION_KEY);

      setTimeoutState((prev) => ({
        ...prev,
        timeExpired: false,
        extraTimeUsed: true,
        extensionCount: res?.data?.extension_count ?? prev.extensionCount + 1,
        maxExtensions: res?.data?.max_extensions ?? prev.maxExtensions,
        extensionSeconds: prev.extensionSeconds + extSeconds,
      }));
      setTimeoutModalOpen(false);
      handleAddMessage("[SYSTEM] Extra time granted: +15 minutes. Continue from where you left off.", "AI");
    } catch (error) {
      console.error("Error requesting extension:", error);
      alert(error?.response?.data?.detail || "Extension request failed.");
    } finally {
      setLoadingType(null);
    }
  }

  const handleSendUserMessage = async (message) => {
    handleAddMessage(message, "user");

    const notepadContent = sessionStorage.getItem(`interview.notepad.${sessionId}`) || "";

    // Inject current context into the message sent to the backend
    const contextWrappedMessage = `
[CURRENT CONTEXT]
Language: ${language}
Notepad/Approach: ${notepadContent}
Current Implementation:
\`\`\`${language}
${code}
\`\`\`

[USER MESSAGE]
${message}
`;

    let endpoint = null;
    if (phase === "CODING") endpoint = "/interview/coding";
    else if (phase === "REVIEW") endpoint = "/interview/review";
    else if (phase === "FEEDBACK") endpoint = "/interview/feedback";
    else endpoint = "/interview/problem_discussion";

    if (!endpoint) return;

    try {
      setLoadingType('MESSAGE');
      const res = await api.post(endpoint, {
        session_id: sessionId,
        message: contextWrappedMessage,
        code: code,
        language: language,
        role: "user",
        time_expired: timeoutState.timeExpired,
        extra_time_used: timeoutState.extraTimeUsed,
        extension_count: timeoutState.extensionCount,
        session_ended_by: "NORMAL",
      });

      if (res?.data?.response) {
        handleAddMessage(res.data.response, "ai");
      }
      syncFromAgentResponse(res?.data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoadingType(null);
    }
  }

  return (
    <div className="bg-[#0d1117] text-slate-200 h-screen flex flex-col overflow-hidden relative">
      {/* Fullscreen exit overlay */}
      {!isFullscreen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-amber-500 mb-4">fullscreen</span>
          <h2 className="text-2xl font-bold text-white mb-2">Fullscreen Required</h2>
          <p className="text-slate-400 mb-6 text-center max-w-md">
            Please stay in fullscreen mode during your interview to maintain focus.
          </p>
          <button
            onClick={() => document.documentElement.requestFullscreen().catch(() => {})}
            className="px-8 py-3 bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold rounded-xl shadow-lg shadow-[#137fec]/20 transition-all"
          >
            Re-enter Fullscreen
          </button>
        </div>
      )}
      <InterviewPageNav curr_phase={phase}></InterviewPageNav>
      {loadingType === 'FEEDBACK' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold">Generating AI Feedback...</p>
          <p className="text-slate-400 mt-2">Please wait while we analyze your performance</p>
        </div>
      )}
      {timeoutModalOpen ? (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-xl border border-border-dark bg-[#111827] p-6">
            <h3 className="text-xl font-bold text-white mb-2">Time is up</h3>
            <p className="text-slate-300 mb-6">Choose how you want to proceed:</p>
            <div className="grid gap-3">
              <button
                type="button"
                disabled={loadingType !== null}
                onClick={handleTimeoutEndFeedback}
                className="w-full rounded bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loadingType === 'FEEDBACK' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {loadingType === 'FEEDBACK' ? 'Generating feedback...' : 'End and generate feedback'}
              </button>
              <button
                type="button"
                disabled={loadingType !== null || timeoutState.extensionCount >= timeoutState.maxExtensions}
                onClick={handleTimeoutExtend}
                className="w-full rounded bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loadingType === 'MESSAGE' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {loadingType === 'MESSAGE' ? 'Granting extra time...' : `Request +15 min extension (${timeoutState.extensionCount}/${timeoutState.maxExtensions} used)`}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {phase != "FEEDBACK" ? (
        <main className="flex-grow flex overflow-hidden">
          <InterviewSidebar problem_deets={session?.problem} onRun={handleRun} curr_phase={phase} onDryRun={handleDryRun} onEndReview={handleFeedback} onTimeout={handleTimeout} extensionSeconds={timeoutState.extensionSeconds} hasRunCode={hasRunCode} loadingType={loadingType}></InterviewSidebar>

          <div className="flex-grow flex flex-col min-h-0">
            {(phase == "PROBLEM_DISCUSSION") ? <Notepad session_id={sessionId} onStartCoding={handleStartCoding} onSetMessage={handleAddMessage} onAgentResponse={syncFromAgentResponse} curr_phase={phase} loadingType={loadingType} setLoadingType={setLoadingType}></Notepad> : (<><CodeEditor code={code} onChange={setCode} language={language} setLanguage={handleLanguageChange} curr_phase={phase}></CodeEditor>
              <TerminalOutput output={output}></TerminalOutput></>
            )
            }
          </div>

          <InterviewRightSidebar session_id={sessionId} messages={messages} phase={phase} handleSendUserMessage={handleSendUserMessage} handleAddMessage={handleAddMessage} loadingType={loadingType} setLoadingType={setLoadingType}></InterviewRightSidebar>
        </main>
      ) : (
        <main className="flex-grow flex overflow-hidden p-8 overflow-y-auto">
          <InterviewFeedback feedback={feedbackData}></InterviewFeedback>
        </main>
      )}

    </div>
  )
}

