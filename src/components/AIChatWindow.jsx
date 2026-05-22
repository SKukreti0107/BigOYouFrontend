import { useEffect, useRef } from "react"
import AIChatMessage from "./AIChatMessage"
import UserChatMessage from "./UserChatMessage"
import AIChatHint from "./AIChatHint"
import UserChatInput from "./UserChatInput"
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

    const handleSendUserMessage = (message) => {
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
                        Analyzing your solution
                    </span>
                </div>
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
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
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