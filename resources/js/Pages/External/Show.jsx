import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, external, meetingLogs, users, queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('external.show', [external, queryParams]))
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
    router.get(route('external.show', [external, queryParams]))
  }

  const deleteMeetingLog = (meetingLog) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('meetinglog.destroy', meetingLog.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`外部関係者情報詳細 - "${external.company_name}"`}
          </h2>
          {(external.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
            <Link
              href={route("external.edit", external.id)}
              className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
            >
              編集
            </Link>
          ):""}
        </div>
      }
    >
      <Head title={`利用者情報詳細 - "${external.name}"`} />
      <div className="pt-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-3">
                <div>
                  <div>
                    <label className="font-bold text-lg">会社名</label>
                    <p className="mt-1">{external.company_name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">担当者名</label>
                    <p className="mt-1">{external.manager_name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">ステータス</label>
                    <p className="mt-1">{external.status}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">電話番号</label>
                    <p className="mt-1">{external.phone_number}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">住所</label>
                    <p className="mt-1">{external.address}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">メールアドレス</label>
                    <p className="mt-1">{external.email}</p>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-lg">備考</label>
                  <p className="mt-1 whitespace-pre-wrap max-h-[200px] overflow-y-auto">{external.notes}</p>
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
                    <Link
                      className="btn btn-success text-white mr-2"
                      href={route("meetinglog.create")}
                    >
                      新規作成
                    </Link>
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
