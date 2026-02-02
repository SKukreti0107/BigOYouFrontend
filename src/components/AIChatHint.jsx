import ChatMessage from "./ChatMessage"
let demo = (
    <>
        That's a classic approach. Remember to handle the "edge case" when the capacity is 1. How will your logic
        behave then?
    </>
)
export default function AIChatHint({ text = demo }) {
    return (
        <ChatMessage align="gap-2 max-w-[90%]" accent="bg-slate-800 border-l-4 border-l-amber-500/50" sender="AI Interviewer">
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px] mb-1 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                Hint
            </div>
            {text}
        </ChatMessage>
    )

}