import { useEffect, useRef } from "react"
import AIChatMessage from "./AIChatMessage"
import UserChatMessage from "./UserChatMessage"
import AIChatHint from "./AIChatHint"
import UserChatInput from "./UserChatInput"
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis"

export default function AIChatWindow({
    chat_messages,
    curr_phase,
    onSendUserMessage,
    canAttachSelection,
    attachedSelection,
    selectionWasTruncated,
    onAttachSelection,
    onClearSelection,
    loadingType
}) {
    const scrollRef = useRef(null);
    const nearBottomRef = useRef(true);
    const { speak, cancel, isMuted, setIsMuted, isSupported } = useSpeechSynthesis();
    const prevMessagesLength = useRef(0);

    const handleSendUserMessage = (message) => {
        cancel();
        if (onSendUserMessage) {
            onSendUserMessage(message);
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            nearBottomRef.current = distanceFromBottom < 120;
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || !nearBottomRef.current) return;
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, [chat_messages.length, loadingType]);

    useEffect(() => {
        if (chat_messages.length > prevMessagesLength.current) {
            const lastMsg = chat_messages[chat_messages.length - 1];
            const msgType = (lastMsg?.type || "").toLowerCase();

            if (msgType === "user") {
                cancel();
            } else if (msgType === "ai") {
                if (chat_messages.length === 1 || prevMessagesLength.current > 0) {
                    speak(lastMsg.text);
                }
            }
        }
        prevMessagesLength.current = chat_messages.length;
    }, [chat_messages, speak, cancel]);

    return (
        <section className="h-full flex flex-col bg-transparent min-h-0">
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">AI Interviewer</h3>
                        <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Analyzing your solution
                        </span>
                    </div>
                </div>
                {isSupported && (
                    <button
                        onClick={() => setIsMuted((prev) => !prev)}
                        className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer ${
                            isMuted 
                                ? "text-slate-500 hover:text-slate-300 bg-slate-800/40 hover:bg-slate-800" 
                                : "text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20"
                        }`}
                        title={isMuted ? "Unmute AI Interviewer" : "Mute AI Interviewer"}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isMuted ? "volume_off" : "volume_up"}
                        </span>
                    </button>
                )}
            </div>
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {chat_messages.length === 0 ?
                (<div className="animate-fade-in-up"><AIChatMessage></AIChatMessage></div>):(
                    chat_messages.map((msg,index)=>{
                        const msgType = (msg.type || "").toLowerCase();
                        if(msgType == "user"){
                            return <div key={index} className="animate-fade-in-up"><UserChatMessage text={msg.text}></UserChatMessage></div>
                        }
                        else if (msgType == "ai") {
                            return <div key={index} className="animate-fade-in-up"><AIChatMessage text={msg.text}></AIChatMessage></div>
                        }
                        else{
                            return <div key={index} className="animate-fade-in-up"><AIChatHint text={msg.text}></AIChatHint></div>
                        }
                    })
                )}
                {loadingType === "MESSAGE" ? (
                    <div className="flex items-center gap-2 text-slate-400 text-xs animate-fade-in">
                        <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-2">
                            <span className="chat-typing-dot w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span className="chat-typing-dot w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span className="chat-typing-dot w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        </div>
                        <span>AI is thinking...</span>
                    </div>
                ) : null}
            </div>
            <div className="p-4 bg-white/[0.02] border-t border-white/5">
                <UserChatInput
                    onSendMessage={handleSendUserMessage}
                    canAttachSelection={canAttachSelection}
                    attachedSelection={attachedSelection}
                    selectionWasTruncated={selectionWasTruncated}
                    onAttachSelection={onAttachSelection}
                    onClearSelection={onClearSelection}
                    curr_phase={curr_phase}
                ></UserChatInput>
                <div className="flex items-center justify-between mt-3 px-1">
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">help</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">Request Hint</span>
                    </button>
                </div>
            </div>
            
        </section>
    )
}