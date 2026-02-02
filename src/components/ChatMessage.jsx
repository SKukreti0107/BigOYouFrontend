export default function ChatMessage({children,align,accent,sender}) {
    return (
        <div className={`flex flex-col ${align}`}>
            <div className={`${accent} rounded-2xl rounded-tl-none p-3 text-sm leading-relaxed border border-border-dark`}>
                {children}
            </div>
            <span className="text-[10px] text-slate-500 ml-1">{sender}</span>
        </div>
    )
}
