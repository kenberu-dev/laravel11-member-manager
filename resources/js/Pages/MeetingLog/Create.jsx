import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create ({ auth, members, meetingLogs, queryParams = null}) {
  queryParams = queryParams || {}

  const {data, setData, post, errors, reset} = useForm({
    title: "",
    user_id: auth.user.id ?? "",
    member_id: queryParams.member ?? "",
    condition: "",
    meeting_log: "",
  })

  const memberChanged = (value) => {
    if (value) {
      queryParams["member"] = value;
    } else {
      delete queryParams["member"];
    }
    console.log(queryParams)
    router.get(route('meetinglog.create'), queryParams);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    post(route('meetinglog.index'));
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          新規作成
        </h2>
      </div>
    }
  >
      <Head title="新規作成" />
      <div className="py-12">
        <div className="flex gap-4 justify-center items-start max-w-7xl mx-auto sm:px-6 lg:px-8">
          {meetingLogs.data.length != 0 && (
            <div className="p-6 text-gray-900 w-1/2 sm:p-8 bg-white shadow sm:rounded-lg">
                {meetingLogs.data.map(meetingLog => (
                  <div>
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
                    <div>
                      <label className="font-bold text-lg">面談記録</label>
                      <div className="mt-1 whitespace-pre-wrap h-96 overflow-y-auto">{meetingLog.meeting_log}</div>
                    </div>
                  </div>
                ))}
                <Pagenation links={meetingLogs.meta.links} queryParams={queryParams}/>
            </div>
          )}
          <div className=" text-gray-900 w-1/2 bg-white shadow sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-6 sm:p-8"
            >
              <div className="">
                <InputLabel
                  htmlFor="member_id"
                  value="利用者名"
                />
                <SelectInput
                  id="member_id"
                  value={queryParams.member}
                  className="mt-1 block w-full"
                  onChange={(e) => {memberChanged(e.target.value) }}
                >
                  <option value="">利用者名を選択してください</option>
                  {members.data.map(member => (
                    <option value={member.id}>{member.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.member_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="title"
                  value="タイトル"
                />
                <TextInput
                  id="title"
                  type="text"
                  value={data.title}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("title", e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="condition"
                  value="体調"
                />
                <SelectInput
                  id="condition"
                  value={data.condition}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("condition", e.target.value)}
                >
                  <option value="">体調を選択してください</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </SelectInput>
                <InputError message={errors.condition} className="mt-2" />
              </div>
              <div className="mt-4 max-h-96">
                <InputLabel
                  htmlFor="meeting_log"
                  value="面談記録"
                />
                <TextAreaInput
                  id="meeting_log"
                  rows="14"
                  value={data.meeting_log}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("meeting_log", e.target.value)}
                />
                <InputError message={errors.meeting_log} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                  <Link
                    href={route("meetinglog.index")}
                    className="bg-gray-300 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                  >
                    戻る
                  </Link>
                  <button
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-400"
                  >
                    保存
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </AuthenticatedLayout>
  );

}
