import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import NewMessageInput from "./NewMessageInput";
import { useState } from "react";


const MessageInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-1 px-3 min-x-[220px] basis-full flex-1 relative">
                <div className="flex ">
                    <NewMessageInput
                        value={newMessage}
                        onChange={(ev) => setNewMessage(ev.target.value)}
                    />
                    <button className="btn btn-info rounded-l-none">
                        {messageSending && (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                        <PaperAirplaneIcon className="w-6" />
                        <span className="hidden sm:inline">送信</span>
                    </button>
                </div>
                {inputErrorMessage && (
                    <p className="text-xs text-red-400">{inputErrorMessage}</p>
                )}
            </div>
        </div>
    );
}

export default MessageInput;