import ChatMessage from "./ChatMessage"

let demo = (
    <>
        We will start with the interview shortly !!
    </>
)

export default function AIChatMessage({ text = demo }) {
    return (
        <ChatMessage align="gap-2 max-w-[90%]" accent="bg-slate-800" sender="ai">
            {text}
        </ChatMessage>

        // <div className="flex flex-col gap-2 max-w-[90%]">
        //     <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 text-sm leading-relaxed border border-border-dark">
        //         Great start! I see you're planning to use a dictionary for the cache. How do you plan to maintain the
        //         O(1) time complexity for both <code className="text-primary font-mono text-[11px]">get</code> and{' '}
        //         <code className="text-primary font-mono text-[11px]">put</code> operations, specifically when it comes to
        //         ordering?
        //     </div>
        //     <span className="text-[10px] text-slate-500 ml-1">AI Interviewer • Just now</span>
        // </div>
    )
}