import ChatMessage from "./ChatMessage"

let demo = (
    <>
        I'm thinking of using a doubly linked list combined with the hash map to achieve the O(1) requirement for
        re-ordering.
    </>
)
export default function UserChatMessage({ text=demo }) {
    return (
        <ChatMessage align={"gap-2 max-w-[90%] ml-auto"} accent={"bg-primary"} sender="user">
            {text}
        </ChatMessage>
    )
}