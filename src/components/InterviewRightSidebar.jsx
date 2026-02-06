import AIChatWindow from "./AIChatWindow"
import Notepad from "./notepad"
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function InterviewRightSidebar({ session_id,messages, phase, handleSendUserMessage, handleAddMessage }) {
    const [alignment, setAlignment] = React.useState('chat');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div className="w-[500px] h-full flex flex-col border-l border-border-dark bg-panel-dark min-h-0">
            {phase != "PROBLEM_DISCUSSION" ? (<ToggleButtonGroup
                sx={{color:"white",bgcolor:"#0083fd",position:"relative"}}
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="chat">Chat</ToggleButton>
                <ToggleButton value="android">Notepad</ToggleButton>
            </ToggleButtonGroup>) : null}
            <div className="flex-1 min-h-0">
                {alignment == "chat" ? (
                    <AIChatWindow chat_messages={messages} curr_phase={phase} onSendUserMessage={handleSendUserMessage}></AIChatWindow>
                ) : (
                    <Notepad session_id={session_id} onStartCoding={null} onSetMessage={handleAddMessage}></Notepad>
                )}
            </div>


        </div>

    )
}