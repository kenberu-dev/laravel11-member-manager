import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, meetingLogs, offices, users, externals,  queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
      queryParams['page'] = 1
    } else {
      delete queryParams[name]
    }

    router.get(route('external.meetinglog.index'), queryParams)
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
    router.get(route('external.meetinglog.index'), queryParams)
  }

  const deleteMeetingLog = (meetingLog) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('external.meetinglog.destroy', meetingLog.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            外部対応：面談記録
          </h2>
          <Link
            href={route("external.meetinglog.create")}
            className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
          >
            新規作成
          </Link>
        </div>
      }
    >
      <Head title="面談記録" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
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
                        name="external_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        会社名
                      </TableHeading>
                      <TableHeading
                        name="user_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        作成者
                      </TableHeading>
                      {auth.user.is_global_admin ? (
                        <TableHeading
                          name="office_id"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          事業所名
                        </TableHeading>
                      ):<th></th>}
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
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
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
                          defaultValue={queryParams.external}
                          onChange={e =>
                            searchFieldChanged("external", e.target.value)
                          }
                        >
                          <option value="">会社名</option>
                          {externals.data.map(external =>(
                            <option key={external.id} value={external.id}>{external.company_name}</option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2">
                      <SelectInput
                          className="w-full"
                          defaultValue={queryParams.user}
                          onChange={e =>
                            searchFieldChanged("user", e.target.value)
                          }
                        >
                          <option value="">作成者名</option>
                          {users.data.map(user =>(
                            <option key={user.id} value={user.id}>{user.name}</option>
                          ))}
                        </SelectInput>
                      </th>
                      {auth.user.is_global_admin ? (
                        <th className="px-3 py-2">
                          <SelectInput
                            className="w-full"
                            defaultValue={queryParams.office}
                            onChange={e =>
                              searchFieldChanged("office", e.target.value)
                            }
                          >
                            <option value="">事業所名</option>
                            {offices.data.map(office =>(
                              <option key={office.id} value={office.id}>{office.name}</option>
                            ))}
                          </SelectInput>
                        </th>
                      ):<th></th>}
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetingLogs.data.map(meetingLog => (
                      <tr className="bg-white border-b" key={meetingLog.id}>
                        <td className="px-3 py-3">{meetingLog.id}</td>
                        <td className="px-3 py-3 hover:underline">
                          <Link href={route("external.meetinglog.show", meetingLog.id)}>
                            {meetingLog.title}
                          </Link>
                        </td>
                        <td className="px-3 py-3 ">{meetingLog.external.company_name}</td>
                        <td className="px-3 py-3 ">{meetingLog.user.name}</td>
                        {auth.user.is_global_admin ? (
                          <td className="px-3 py-3 text-center">{meetingLog.external.office.name}</td>
                        ):<td></td>}
                        <td className="px-3 py-3 text-nowrap">{meetingLog.created_at}</td>
                        <td className="px-3 py-3 text-nowrap">{meetingLog.updated_at}</td>
                        <td className="px-3 py-3 text-center text-nowrap flex">
                          { meetingLog.user.office.id == auth.user.office.id || auth.user.is_global_admin?(
                            <Link
                            href={route('external.meetinglog.edit', meetingLog.id)}
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
    </AuthenticatedLayout>
  );
}
