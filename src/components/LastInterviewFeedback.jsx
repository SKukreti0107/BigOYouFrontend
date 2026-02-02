import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function LastInterviewFeedback({ positive=[1,2,3,4], negative=[1,2,3] }) {

    let positiveFeedback = (positiveList)=>{
        return positiveList.map((item,idx)=>(
            <Alert sx={{bgcolor:"#152326",color:"white",}} key={idx} severity="success">{item}</Alert>
        )

        )
    }

    let negativeFeedback = (negativeList)=>{
        return negativeList.map((item,idx)=>(
            <Alert sx={{bgcolor:"#222220",color:"white",}} key={idx} severity="warning">{item}</Alert>
        )

        )
    }




    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#137fec]/10 text-[#137fec] flex items-center justify-center">
                        <span className="material-symbols-outlined">feedback</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Last Interview Feedback</h3>
                        <p className="text-xs text-slate-500">Session #4829 • LRU Cache &amp; Graph</p>
                    </div>
                </div>
                <button className="px-4 cursor-pointer py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all border border-[#30363d]">
                    View Full Feedback
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">thumb_up</span> Strengths
                    </h4>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {positiveFeedback(positive)}
                    </Stack>

                </div>
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">lightbulb</span> Improvement Areas
                    </h4>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {negativeFeedback(negative)}
                    </Stack>
                </div>
            </div>
        </div>
    )
}