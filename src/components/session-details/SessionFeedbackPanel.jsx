import InterviewFeedback from "../InterviewFeedback";

export default function SessionFeedbackPanel({ feedback }) {
    return (
        <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Feedback Summary</h3>
            {!feedback ? (
                <div className="text-slate-400 text-sm p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                    Feedback not generated yet.
                </div>
            ) : (
                <InterviewFeedback feedback={feedback} />
            )}
        </section>
    );
}
