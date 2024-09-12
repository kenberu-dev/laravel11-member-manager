import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import NewMessageInput from "./NewMessageInput";
import { useState } from "react";
import axios from "axios";


const MessageInput = (meetingLogId = null) => {
  const [newMessage, setNewMessage] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);

  // meetingLogIdがオブジェクト型だったので配列型に直している
  const id = Object.values(meetingLogId)

  const onSendClick = () => {
    if (newMessage.trim() === "") {
      setInputErrorMessage("メッセージを入力してください");
      setTimeout(() => {
        setInputErrorMessage("");
      }, 3000);
      return;
    }
    const formData = new FormData();
    formData.append("message", newMessage);
    formData.append("meeting_logs_id", id[0]);

    setMessageSending(true);

    axios.post(route("message.store"), formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        console.log("progress", progress);
      }
    }).then((response) => {
      setNewMessage("");
      setMessageSending(false);
    }).catch((error) => {
      setMessageSending(false);
    });
  }

  return (
    <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
      <div className="order-1 px-3 min-x-[220px] basis-full flex-1 relative">
        <div className="flex ">
          <NewMessageInput
            value={newMessage}
            onSend={onSendClick}
            onChange={(ev) => setNewMessage(ev.target.value)}
          />
          <button
            onClick={onSendClick}
            className="btn btn-info rounded-l-none"
          >
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
