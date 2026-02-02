import { useState } from "react"

export default function UserChatInput({onSendMessage}) {

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log(message);
    }

    const sendMessage = () => {
        message.length!=0? onSendMessage(message):null
        setMessage("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // stop new line
            sendMessage()
        }
    };

    return (
        <div className="relative group">
            <textarea
                className="w-full bg-white dark:bg-panel-dark border border-slate-200 dark:border-slate-700 rounded-xl p-3 pr-12 text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px] resize-none"
                placeholder="Type your message to the interviewer..." value={message} onChange={handleChange} onKeyDown={handleKeyDown}
            ></textarea>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                    className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:scale-105 transition-transform" onClick={sendMessage} >
                    <span className="material-symbols-outlined text-sm">send</span>
                </button>
            </div>
        </div>
    )
}