import AIChatMessage from "./AIChatMessage"
import UserChatMessage from "./UserChatMessage"
import AIChatHint from "./AIChatHint"
import UserChatInput from "./UserChatInput"
import { useEffect, useRef } from "react"

export default function AIChatWindow({ chat_messages, curr_phase, onSendUserMessage, loadingType }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chat_messages, loadingType]);

    const handleSendUserMessage = (message) => {
        if (onSendUserMessage) {
            onSendUserMessage(message);
        }
    }

    return (
        <section className="h-full flex flex-col bg-panel-dark min-h-0">
            <div className="p-4 border-b border-border-dark flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                    <h3 className="font-bold text-sm">AI Interviewer</h3>
                    <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        {loadingType === 'MESSAGE' ? 'Thinking...' : 'Analyzing your solution'}
                    </span>
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {chat_messages.length === 0 ?
                    (<AIChatMessage></AIChatMessage>) : (
                        chat_messages.map((msg, index) => {
                            const msgType = (msg.type || "").toLowerCase();
                            if (msgType == "user") {
                                return <UserChatMessage key={index} text={msg.text}></UserChatMessage>
                            }
                            else if (msgType == "ai") {
                                return <AIChatMessage key={index} text={msg.text}></AIChatMessage>
                            }
                            else {
                                return <AIChatHint key={index} text={msg.text}></AIChatHint>
                            }
                        })
                    )}
                {loadingType === 'MESSAGE' && (
                    <div className="flex items-center gap-2 text-slate-500 italic text-xs animate-pulse p-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        AI is thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {curr_phase == "PROBLEM_DISCUSSION" ? null : (<div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                <UserChatInput onSendMessage={handleSendUserMessage}></UserChatInput>
                <div className="flex items-center justify-between mt-3 px-1">
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">help</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">Request Hint</span>
                    </button>
                </div>
            </div>)}

        </section>
    )
}
