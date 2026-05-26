import AIChatWindow from "./AIChatWindow"

export default function InterviewRightSidebar({
    session_id,
    messages,
    phase,
    handleSendUserMessage,
    handleAddMessage,
    canAttachSelection,
    attachedSelection,
    selectionWasTruncated,
    onAttachSelection,
    onClearSelection,
    loadingType,
    onRequestHint
}) {
    return (
        <div className="w-[500px] h-full flex flex-col border-l border-white/5 glass-panel min-h-0">
            <div className="flex-1 min-h-0 h-full">
                <AIChatWindow
                    chat_messages={messages}
                    curr_phase={phase}
                    onSendUserMessage={handleSendUserMessage}
                    canAttachSelection={canAttachSelection}
                    attachedSelection={attachedSelection}
                    selectionWasTruncated={selectionWasTruncated}
                    onAttachSelection={onAttachSelection}
                    onClearSelection={onClearSelection}
                    loadingType={loadingType}
                    onRequestHint={onRequestHint}
                />
            </div>
        </div>
    )
}