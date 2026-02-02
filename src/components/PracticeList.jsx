import ProblemAccordion from '../components/ProblemAccordion';
import api from './Api';
import { useEffect,useState } from 'react';

export default function PracticeList(){
    const [topics,setTopics] = useState([])

    useEffect(()=>{
        const getProblems = async ()=>{
            const res = await api.get("/problems",)
            setTopics(res.data)
            console.log(res.data)
        }
        getProblems()
        
    },[])
    
    return (
        <div className="px-8 pb-10 flex flex-col gap-6 max-w-6xl">
            {topics.map((topic)=>(
                <ProblemAccordion key={topic.topic} topic_deets={topic}></ProblemAccordion>
            ))}
            


        </div>
    )
}