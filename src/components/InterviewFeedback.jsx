export default function InterviewFeedback({ feedback }) {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="bg-panel-dark border border-border-dark rounded-xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border-dark">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">analytics</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Interview Performance Analysis</h2>
                        <p className="text-slate-400">Detailed feedback based on your coding session</p>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-lg">
                        {feedback || "Calculating your score and generating insights..."}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border-dark flex justify-center">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}