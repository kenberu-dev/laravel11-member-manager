import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Show({auth, meetingLog, messages}) {
  const [localMessages, setlocalMessages] = useState([]);
  const messagesCtrRef = useRef(null);

  useEffect(() => {
    setlocalMessages(messages);
  }, [messages]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`面談記録 - "${meetingLog.title}"`}
          </h2>
          <Link
            href={route("meetinglog.edit", meetingLog.id)}
            className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
          >
            編集
          </Link>
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
                    <label className="font-bold text-lg">利用者名</label>
                    <p className="mt-1">{meetingLog.member.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">体調</label>
                    <p className="mt-1">{meetingLog.condition}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">作成者</label>
                    <p className="mt-1">{meetingLog.user.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">事業所</label>
                    <p className="mt-1">{meetingLog.member.office.name}</p>
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
                    <div className="mt-1 whitespace-pre-wrap">{meetingLog.meeting_log}</div>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">チャット</label>
                    <div className="mt-1 whitespace-pre-wrap">

                    </div>
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
