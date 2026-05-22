import { useMemo, useState } from "react"

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

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const sendMessage = () => {
        message.length!=0? onSendMessage(message):null
        setMessage("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // stop new line
            sendMessage()
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
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={onAttachSelection}
                    disabled={!canAttachSelection}
                >
                    <span className="material-symbols-outlined text-sm">content_paste</span>
                    Attach selection
                </button>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:scale-105 transition-transform"
                    onClick={sendMessage}
                >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Send
                </button>
            </div>
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