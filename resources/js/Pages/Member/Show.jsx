import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, member, meetingLogs, users, queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('member.show', [member, queryParams]))
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    router.get(route('member.show', [member, queryParams]))
  }

  const updateLimit = (member) => {
    if(!window.confirm("更新期限を今日から３ヶ月後に更新します。\n更新しますか？")) {
      return;
    }
    router.post(route('member.updateLimit', member.id));
  }

  const deleteMeetingLog = (meetingLog) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('meetinglog.destroy', meetingLog.id));
  }

  const createMeetingLog = (member) => {
    queryParams["member"] = member.id;
    router.get(route('meetinglog.create'), queryParams);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`利用者情報詳細 - "${member.name}"`}
          </h2>
          {(member.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
            <Link
              href={route("member.edit", member.id)}
              className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
            >
              編集
            </Link>
          ):""}
        </div>
      }
    >
      <Head title={`利用者情報詳細 - "${member.name}"`} />
      <div className="pt-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-4">
                <div>
                  <div>
                    <label className="font-bold text-lg">受給者番号</label>
                    {member.beneficiary_number ? (
                      <p className="mt-1">{member.beneficiary_number}</p>
                    ): <p className="mt-1">未登録</p>}
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">氏名</label>
                    <p className="mt-1">{member.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">性別</label>
                    <p className="mt-1">{member.sex}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">ステータス</label>
                    <p className="mt-1">{member.status}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">特性・障害</label>
                    <p className="mt-1">{member.characteristics}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">事業所</label>
                    <p className="mt-1">{member.office.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">利用開始日</label>
                    <p className="mt-1">{member.started_at}</p>
                  </div>
                  <div className="flex  items-center mt-4">
                    <div className="mr-5">
                      <label className="font-bold text-lg">更新期限</label>
                      <p className="mt-1">{member.update_limit}</p>
                    </div>
                    <div>
                      {member.started_at != member.created_at ? (
                        <button
                          onClick={(e) => updateLimit(member)}
                          className="btn btn-success text-white"
                        >
                          更新する
                        </button>
                      ):""}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-lg">備考</label>
                  <p className="mt-1 whitespace-pre-wrap max-h-[200px] overflow-y-auto">{member.notes}</p>
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
              <div>
                <div className="flex justify-between items-center">
                  <label className="font-bold text-lg">面談記録</label>
                  <div>
                    <button
                      className="btn btn-success text-white mr-2"
                      onClick={(e) => createMeetingLog(member)}
                    >
                      新規作成
                    </button>
                    {member.document_url ? (
                      <a
                        className="btn btn-info text-white"
                        href={member.document_url} target="_blank"
                      >
                        フォルダを開く
                      </a>
                    ):""}
                  </div>
                </div>
                <div className="mt-1 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                  <div className="">
                    <table className="w-full text-sm text-left rtl:text-right">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 sticky top-0">
                        <tr className="text-nowrap">
                          <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            ID
                          </TableHeading>
                          <TableHeading
                            name="title"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            タイトル
                          </TableHeading>
                          <TableHeading
                            name="user_id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            作成者
                          </TableHeading>
                          <TableHeading
                            name="condition"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            体調
                          </TableHeading>
                          <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            作成日時
                          </TableHeading>
                          <TableHeading
                            name="updated_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                          >
                            更新日時
                          </TableHeading>
                          <th className="px-3 py-2 text-center">編集・削除</th>
                        </tr>
                      </thead>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b sticky top-10">
                        <tr className="text-nowrap">
                          <th className="px-3 py-2">
                            <TextInput
                              className="w-full max-w-16"
                              defaultValue={queryParams.id}
                              placeholder="ID"
                              onBlur={e => searchFieldChanged('id', e.target.value)}
                              onKeyPress={e => onKeyPress('id', e)}
                            />
                          </th>
                          <th className="px-3 py-2">
                            <TextInput
                              className="w-full"
                              defaultValue={queryParams.title}
                              placeholder="タイトル"
                              onBlur={e => searchFieldChanged('title', e.target.value)}
                              onKeyPress={e => onKeyPress('title', e)}
                            />
                          </th>
                          <th className="px-3 py-2">
                          <SelectInput
                              className="w-full"
                              defaultValue={queryParams.user}
                              onChange={e =>
                                searchFieldChanged("user", e.target.value)
                              }
                            >
                              <option value="">担当者名</option>
                              {users.data.map(user =>(
                                <option key={user.id} value={user.id}>{user.name}</option>
                              ))}
                            </SelectInput>
                          </th>
                          <th className="px-3 py-2">
                          <SelectInput
                              className="w-full"
                              defaultValue={queryParams.condition}
                              onChange={e =>
                                searchFieldChanged("condition", e.target.value)
                              }
                            >
                              <option value="">体調</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </SelectInput>
                          </th>
                          <th className="px-3 py-2"></th>
                          <th className="px-3 py-2"></th>
                          <th className="px-3 py-2 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {meetingLogs.data.map(meetingLog => (
                          <tr className="bg-white border-b" key={meetingLog.id}>
                            <td className="px-3 py-3">{meetingLog.id}</td>
                            <td className="px-3 py-3 hover:underline">
                              <Link href={route("meetinglog.show", meetingLog.id)}>
                                {meetingLog.title}
                              </Link>
                            </td>
                            <td className="px-3 py-3 ">{meetingLog.user.name}</td>
                            <td className="px-3 py-3 text-center">{meetingLog.condition}</td>
                            <td className="px-3 py-3 text-nowrap">{meetingLog.created_at}</td>
                            <td className="px-3 py-3 text-nowrap">{meetingLog.updated_at}</td>
                            <td className="px-3 py-3 text-center text-nowrap flex">
                              { meetingLog.user.office.id == auth.user.office.id || auth.user.is_global_admin?(
                                <Link
                                href={route('meetinglog.edit', meetingLog.id)}
                                className="font-medium text-blue-600 mx-1 hover:underline"
                                >
                                  編集
                                </Link>
                              ): <div className="font-medium text-gray-300 mx-1">編集</div>}
                              {(auth.user.is_admin && meetingLog.user.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
                              <button
                                onClick={(e) => deleteMeetingLog(meetingLog)}
                                className="font-medium text-red-600 mx-1 hover:underline"
                              >
                                削除
                              </button>
                              ):<div className="font-medium text-gray-300 mx-1">削除</div>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagenation links={meetingLogs.meta.links} queryParams={queryParams}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
