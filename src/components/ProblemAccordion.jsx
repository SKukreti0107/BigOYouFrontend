import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LinearProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import api from './Api';


export default function ProblemAccordion({topic_deets}){
    let problems_list = topic_deets.problems;
    const navigate = useNavigate()
    const startInterview = async ()=>{
        const res = await api.post(`/interview/start?topic=${encodeURIComponent(topic_deets.topic)}`);
        let session_deets = res.data;
        console.log(session_deets)
        navigate(`/interviewPage/${session_deets.session_id}`,{state:{session_deets}});
    }

    return(
        <Accordion sx={{ bgcolor: "#181a22", color: "white" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="arrays-content"
                                id="arrays-header"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                    spacing={2}
                                >
                                    {/* Left: Topic name */}
                                    <Typography fontWeight={600}>{topic_deets.topic}</Typography>

                                    {/* Right: Progress */}
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={topic_deets.completed/topic_deets.total}
                                            sx={{ width: 100, height: 6, borderRadius: 4 }}
                                        />
                                        <Typography variant="caption" >
                                            {topic_deets.completed}/{topic_deets.total}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Stack spacing={2}>
                                    {/* Primary CTA */}
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={startInterview}
                                    >
                                        Start Random Interview
                                    </Button>

                                    {/* Completed problems */}
                                    <Stack spacing={1}>


                                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />} justifyContent={'space-evenly'}>
                                            <div>
                                                <Typography variant="subtitle2">
                                                    Completed in this topic
                                                </Typography>
                                                <ul className='completed'>
                                                    {problems_list.map((p) =>
                                                        p.is_completed ?(
                                                            <li key={p.id}>
                                                                <Typography variant='body2'>✔ {p.title}</Typography> 
                                                            </li>
                                                        ):null
                                                    )}
                                                </ul>
                                            </div>

                                            <div>
                                                <Typography variant="subtitle2">
                                                    Remaining in this topic
                                                </Typography>
                                                <ul className='pending'>
                                                    {problems_list.map((p) =>
                                                        !p.is_completed ?(
                                                            <li key={p.id}>
                                                                <Typography variant='body2'>{p.title}</Typography> 
                                                            </li>
                                                        ):null
                                                    )}
                                                </ul>
                                            </div>


                                        </Stack>
                                    </Stack>
                                </Stack>
                            </AccordionDetails>


                        </Accordion>
    )
}