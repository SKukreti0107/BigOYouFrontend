import { useMemo, useState, useRef } from "react"
import { useSpeechRecognition } from "../hooks/useSpeechRecognition"

export default function UserChatInput({
    onSendMessage,
    canAttachSelection,
    attachedSelection,
    selectionWasTruncated,
    onAttachSelection,
    onClearSelection,
    curr_phase
}) {

    const [message, setMessage] = useState("");
    const attachedLength = useMemo(() => (attachedSelection || "").length, [attachedSelection]);
    const hasAttachedSelection = attachedLength > 0;
    const baseTextRef = useRef("");

    const { isListening, isTranscribing, recognitionError, toggleListening, stopListening, isSupported } = useSpeechRecognition({
        onTranscriptChange: (sessionTranscript) => {
            const separator = baseTextRef.current ? " " : "";
            setMessage(baseTextRef.current + separator + sessionTranscript);
        },
        onStop: () => {
            baseTextRef.current = "";
        }
    });

    const handleMicToggle = () => {
        if (!isListening) {
            baseTextRef.current = message.trim();
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        }
        toggleListening();
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
        if (isListening) {
            baseTextRef.current = event.target.value;
        }
    }

    const sendMessage = () => {
        stopListening();
        message.length != 0 ? onSendMessage(message) : null;
        setMessage("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // stop new line
            sendMessage();
        }
    };

    const placeholderText = curr_phase === "PROBLEM_DISCUSSION"
        ? "Answer here based on the AI interviewer's question..."
        : "Type your message to the interviewer...";

    return (
        <div className="group">
            <textarea
                className="w-full bg-white dark:bg-panel-dark border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px] resize-none"
                placeholder={placeholderText} value={message} onChange={handleChange} onKeyDown={handleKeyDown}
            ></textarea>
            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                        onClick={onAttachSelection}
                        disabled={!canAttachSelection}
                    >
                        <span className="material-symbols-outlined text-sm">content_paste</span>
                        Attach selection
                    </button>
                    {isSupported && (
                        <button
                            type="button"
                            onClick={handleMicToggle}
                            disabled={isTranscribing}
                            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                isListening
                                    ? "bg-red-500 hover:bg-red-600 text-white mic-active-pulse"
                                    : isTranscribing
                                        ? "bg-slate-700 text-slate-400 border border-slate-600 cursor-wait"
                                        : "border border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
                            }`}
                            title={isListening ? "Press again to stop and transcribe" : isTranscribing ? "Transcribing speech..." : "Use voice input"}
                        >
                            {isTranscribing ? (
                                <div className="w-3.5 h-3.5 border-2 border-slate-500 border-t-slate-200 rounded-full animate-spin"></div>
                            ) : (
                                <span className="material-symbols-outlined text-sm">
                                    {isListening ? "mic" : "mic_off"}
                                </span>
                            )}
                            {isListening ? "Listening (Press again to transcribe)" : isTranscribing ? "Transcribing..." : "Mic Input"}
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:scale-105 transition-transform cursor-pointer"
                    onClick={sendMessage}
                >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Send
                </button>
            </div>
            {recognitionError && (
                <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5 animate-fade-in">
                    <span className="material-symbols-outlined text-xs">warning</span>
                    <span>{recognitionError}</span>
                </div>
            )}
            {hasAttachedSelection ? (
                <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Selection attached</span>
                        <span className="text-[10px] uppercase tracking-wide">{attachedLength} chars</span>
                        {selectionWasTruncated ? (
                            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-500">Truncated</span>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
                        onClick={onClearSelection}
                    >
                        Clear
                    </button>
                </div>
            ) : null}
        </div>
    )
}