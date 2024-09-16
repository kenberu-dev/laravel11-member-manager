import { formatMessageDateLong } from "@/helpers";
import { usePage } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";

const MessageItem = ({ message }) => {
    const currnetUser = usePage().props.auth.user;

    return (
        <div
            className={
                "chat " +
                (message.sender.id === currnetUser.id
                    ? "chat-end"
                    : "chat-start")
            }
        >
            {<UserAvatar user={message.sender} />}
            <div className="chat-header">
                {message.sender.id !== currnetUser.id
                    ? message.sender.name
                    : ""}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={
                    "chat-bubble relative " +
                    (message.sender.id === currnetUser.id
                        ? "chat-bubble-info"
                        : "")
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        {message.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageItem;
