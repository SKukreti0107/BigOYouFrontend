export default function ChatMessage({ children, align, accent, sender }) {
    const isAi = sender?.toLowerCase() === "ai" || sender?.toLowerCase()?.includes("interviewer");
    const bubbleRadius = isAi ? "rounded-2xl rounded-tl-none" : "rounded-2xl rounded-tr-none";
    return (
        <div className={`flex flex-col ${align} min-w-0`}>
            <div className={`${accent} ${bubbleRadius} p-4 text-sm leading-relaxed border border-white/5 break-words overflow-hidden`}>
                {children}
            </div>
            <span className="text-[9px] text-slate-500 ml-2 mt-1 uppercase font-bold tracking-widest select-none">{sender}</span>
        </div>
    )
}
