import MessageInput from "@/Components/Message/MessageInput";
import MessageItem from "@/Components/Message/MessageItem";
import { useEventBus } from "@/EventBus";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Show({ auth, meetingLog, messages }) {
  const [localMessages, setLocalMessages] = useState([]);
  const [noMoreMessages, setNoMoreMessages] = useState(false);
  const [scrollFromBottom, setScrollFromBottom] = useState(0);
  const { on, emit } = useEventBus();
  const page = usePage();
  const conversations = page.props.conversations;
  const loadMoreIntersect = useRef(null);
  const messagesCtrRef = useRef(null);

  const messageCreated = (message) => {
    if (meetingLog && meetingLog.id == message.external_meeting_logs_id) {
      console.log("Updated setLocalMessages");
      setLocalMessages((prevMessages) => [...prevMessages, message]);
    }
  }

  const loadMoreMessages = useCallback(() => {
    if (noMoreMessages) {
      return;
    }

    const firstMessage = localMessages[0];
    axios
      .get(route("message.loadOlder", firstMessage.id))
      .then(({data}) => {
        if(data.data.length === 0) {
          console.log("No more Messages");
          setNoMoreMessages(true);
          return;
        }
        const scrollHeight = messagesCtrRef.current.scrollHeight;
        const scrollTop = messagesCtrRef.current.scrollTop;
        const clientHeight = messagesCtrRef.current.clientHeight;
        const tmpScrollFromBottom =
          scrollHeight - scrollTop - clientHeight;
        setScrollFromBottom(tmpScrollFromBottom);

        setLocalMessages((prevMessages) => {
          return [...data.data.reverse(), ...prevMessages];
        });
      })
  }, [localMessages]);

  useEffect(() => {
    let channel = `message.meetinglog.${meetingLog.id}`;

    conversations.forEach((conversation) => {
      if (channel === `message.meetinglog.${conversation.id}`) {
        channel = [];
        return;
      }
    });

    if (channel.length != 0) {
      Echo.private(channel)
        .error((error) => {
          console.error(error);
        })
        .listen("SocketMessage", (e) => {
          console.log("SocketMessage", e);
          const message = e.message;

          emit("message.created", message);
          if (message.sender_id === auth.id) {
            return;
          }
          emit("newMessageNotification", {
            user: message.sender,
            meeting_logs_id: message.external_meeting_logs_id,
            message: message.message
          });
        });

      return () => {
        let channel = `message.meetinglog.${meetingLog.id}`;
        Echo.leave(channel);
      }
    }
  }, [meetingLog]);

  useEffect(() => {
    setTimeout(() => {
      if (messagesCtrRef.current) {
        messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
      }
    }, 10);

    const offCreated = on('message.created', messageCreated);

    setScrollFromBottom(0);
    setNoMoreMessages(false);

    return () => {
      offCreated();
    }
  }, [meetingLog]);

  useEffect(() => {
    setLocalMessages(messages ? messages.data.reverse() : []);
  }, [messages]);

  useEffect(() => {
    if(messagesCtrRef.current && scrollFromBottom !== null) {
      messagesCtrRef.current.scrollTop =
        messagesCtrRef.current.scrollHeight -
        messagesCtrRef.current.offsetHeight -
        scrollFromBottom;
    }

    if (noMoreMessages) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && loadMoreMessages()
        ),
      {
        rootMargin: "0px 0px 250px 0px",
      }
    );

    if(loadMoreIntersect.current) {
      setTimeout(() => {
        observer.observe(loadMoreIntersect.current);
      }, 100);
    }

    return () => {
      observer.disconnect();
    }
  },[localMessages]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`面談記録 - "${meetingLog.title}"`}
          </h2>
          {meetingLog.user.office.id == auth.user.office.id || auth.user.is_global_admin?(
            <Link
              href={route("external.meetinglog.edit", meetingLog.id)}
              className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
            >
              編集
            </Link>
          ): ""}

        </div>
      }
    >
      <Head title={`面談記録 - "${meetingLog.title}"`} />
      <div className="pt-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID</label>
                    <p className="mt-1">{meetingLog.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">会社名</label>
                    <p className="mt-1">{meetingLog.external.company_name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">作成者</label>
                    <p className="mt-1">{meetingLog.user.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">事業所</label>
                    <p className="mt-1">{meetingLog.external.office.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">作成日</label>
                    <p className="mt-1">{meetingLog.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-1">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 border-b-2 rounded-sm">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">面談記録</label>
                    <div className="mt-1 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                      {meetingLog.meeting_log}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-lg">チャット</label>
                  <div className="mt-1 whitespace-pre-wrap">
                    <>
                      <div
                        ref={messagesCtrRef}
                        className="flex-1 overflow-y-auto p-5 max-h-[400px]"
                      >
                        {/* {messages} */}
                        {localMessages.length === 0 && (
                          <div className="flex justify-center items-center h-full">
                            <div className="text-lg text-gray-500">
                              メッセージがありません
                            </div>
                          </div>
                        )}
                        {localMessages.length > 0 && (
                          <div className="flex-1 flex flex-col">
                            <div ref={loadMoreIntersect}></div>
                            {localMessages.map((message) => (
                              <MessageItem
                                key={message.id}
                                message={message}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <MessageInput meetingLogId={meetingLog.id} />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
