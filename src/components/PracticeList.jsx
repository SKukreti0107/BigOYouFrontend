import ProblemAccordion from '../components/ProblemAccordion';
import api from './Api';
import { useEffect, useState } from 'react';

export default function PracticeList() {
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProblems = async () => {
            try {
                setLoading(true);
                const res = await api.get("/problems")
                setTopics(res.data)
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            } finally {
                setLoading(false);
            }
        }
        getProblems()
    }, [])

    if (loading) {
        return (
            <div className="px-8 pb-16 flex flex-col gap-6 max-w-5xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 animate-pulse">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-6 bg-slate-800 rounded w-1/4"></div>
                            <div className="h-8 bg-slate-800 rounded-lg w-32"></div>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full w-full mb-4"></div>
                        <div className="flex gap-4">
                            <div className="h-4 bg-slate-800 rounded w-20"></div>
                            <div className="h-4 bg-slate-800 rounded w-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="px-8 pb-16 flex flex-col gap-6 max-w-5xl">
            {topics.map((topic) => (
                <ProblemAccordion key={topic.topic} topic_deets={topic}></ProblemAccordion>
            ))}
        </div>
    )
}