import ChatMessage from "./ChatMessage"
import ReactMarkdown from 'react-markdown';
let demo = "We will start with the interview shortly !!"

export default function AIChatMessage({ text = demo }) {
    return (
        <ChatMessage align="gap-2 max-w-[90%]" accent="bg-slate-800" sender="ai">
            <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                    components={{
                        pre: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-2 bg-slate-900/50 rounded-lg p-3 scrollbar-thin scrollbar-thumb-slate-700">
                                <pre className="font-mono text-xs" {...props} />
                            </div>
                        ),
                        code: ({ node, inline, ...props }) => (
                            inline
                                ? <code className="bg-slate-700/50 px-1 py-0.5 rounded font-mono text-xs" {...props} />
                                : <code {...props} />
                        ),
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </ChatMessage>

    )
}