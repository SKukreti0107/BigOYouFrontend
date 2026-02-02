import InterviewSidebar from "../components/InterviewSidebar"
import CodeEditor from "../components/CodeEditor"
import TerminalOutput from "../components/TerminalOutpur"
import AIChatWindow from "../components/AIChatWindow"
import InterviewPageNav from "../components/InterviewPageNav"
import InterviewFeedback from "../components/InterviewFeedback"

import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import api from "/Users/Shubh/OneDrive/Desktop/Major Project/Frontend/bigOYou/src/components/Api"

import { PYTHON_STARTER_CODE } from "../components/StartedCode"
import Notepad from "../components/notepad"

const getStarterCode = (language) => {
  if (language === "python") return PYTHON_STARTER_CODE;
  if (language === "cpp") return CPP_STARTER_CODE;
  return JAVA_STARTER_CODE;
};

export default function InterviewPage() {
  const [phase, setPhase] = useState("PROBLEM_DISCUSSION")
  const { sessionId } = useParams();
  const [language, setLanguage] = useState("python")

  const [messages, setMessages] = useState([]);

  let STORAGE_KEY = `interview.editor.${sessionId}.${language}`


  // console.log(sessionId)
  const { state } = useLocation();
  const [session, setSession] = useState(state?.session_deets ?? null);

  const [code, setCode] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) ?? getStarterCode(language);
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, code);
  }, [STORAGE_KEY, code]);

  const [output, setOutput] = useState("");
  const [hasRunCode, setHasRunCode] = useState(false);


  const handleRun = async () => {
    let res = await api.post("/execute", { language: "python", code: code })
    let out = res.data;
    setOutput(out.error ? out.error : out.output)
    setHasRunCode(true);
  }

  const handleAddMessage = useCallback((text, type = "AI") => {
    setMessages((prev) => [...prev, { type, text }]);
  }, []);

  useEffect(() => {
    const loadSessionMessages = async () => {
      const res = await api.get("/interview/session/messages", {
        params: { session_id: sessionId },
      });
      const data = res.data;
      const restored = Array.isArray(data) ? data : (data?.messages ?? []);
      if (restored.length) {
        console.log(restored)
        restored.forEach((msg) => {
          handleAddMessage(msg.content, msg.role)
        })
      }
    };

    loadSessionMessages();
  }, [sessionId]);

  useEffect(() => {
    const didInitKey = `interview.agent_init.${sessionId}`;

    if (sessionStorage.getItem(didInitKey)) return;

    const initAgent = async () => {
      let res = await api.post("/interview/agent_init", { session_id: sessionId });
      handleAddMessage(res.data.response);
      sessionStorage.setItem(didInitKey, "1");
    };

    initAgent();
  }, [sessionId, handleAddMessage]);

  const handleStartCoding = async() => {
    let res = await api.post("/interview/coding", {
      session_id: sessionId,
      message: "I'm ready to start coding.",
      code: code,
      language: language
    });
    handleAddMessage(res.data.response);
    setPhase("CODING");
  }

  const handleDryRun = async() => {
    let res = await api.post("/interview/review", {
      session_id: sessionId,
      message: "I'd like to do a dry run of my solution.",
      code: code,
      language: language
    });
    handleAddMessage(res.data.response);
    setPhase("REVIEW");
  }

  const handleEndReview = async() => {
    let res = await api.post("/interview/feedback", {
      session_id: sessionId,
      message: "I'm done. Please provide feedback.",
      code: code,
      language: language
    });
    handleAddMessage(res.data.response);
    setPhase("FEEDBACK");
  }

  const handleSendUserMessage = async (message) => {
    handleAddMessage(message, "user");

    let endpoint = null;
    if (phase === "CODING") endpoint = "/interview/coding";
    else if (phase === "REVIEW") endpoint = "/interview/review";
    else if (phase === "FEEDBACK") endpoint = "/interview/feedback";

    if (!endpoint) return;

    const res = await api.post(endpoint, {
      session_id: sessionId,
      message: message,
      code: code,
      language: language,
    });

    if (res?.data?.response) {
      handleAddMessage(res.data.response, "ai");
    }
  }

  return (
    <div className="bg-[#0d1117] text-slate-200 h-screen flex flex-col overflow-hidden">
      <InterviewPageNav curr_phase={phase}></InterviewPageNav>
      {phase != "FEEDBACK" ? (
        <main className="flex-grow flex overflow-hidden">
          <InterviewSidebar problem_deets={session.problem} onRun={handleRun} curr_phase={phase} onDryRun={handleDryRun} onEndReview={handleEndReview} hasRunCode={hasRunCode}></InterviewSidebar>

          <div className="flex-grow flex flex-col">
            {(phase == "PROBLEM_DISCUSSION") ? <Notepad session_id={sessionId} onStartCoding={handleStartCoding} onSetMessage={handleAddMessage}></Notepad> : (<><CodeEditor code={code} onChange={setCode} setLanguage={setLanguage}></CodeEditor>
              <TerminalOutput output={output}></TerminalOutput></>
            )
            }
          </div>

          <AIChatWindow chat_messages={messages} curr_phase={phase} onSendUserMessage={handleSendUserMessage}></AIChatWindow>
        </main>
      ) : (
        <main className="flex-grow flex overflow-hidden">
          <InterviewFeedback></InterviewFeedback>
        </main>
      )}

    </div>
  )
}

