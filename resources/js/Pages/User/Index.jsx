import UserAvatar from "@/Components/Message/UserAvatar";
import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, offices, users, queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
      queryParams['page'] = 1
    } else {
      delete queryParams[name]
    }

    router.get(route('user.index'), queryParams)
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
    router.get(route('user.index'), queryParams)
  }

  const archiveUser = (user) => {
    if(!window.confirm("データはアーカイブされます。\n実行しますか？")) {
      return;
    }
    router.post(route('user.archive', user.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            従業員一覧
          </h2>
          <div className="">
            <Link
              href={route("user.create")}
              className="bg-emerald-400 py-1 px-3 mr-2 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
            >
              新規作成
            </Link>
            <Link
              href={route("user.indexArchived")}
              className="bg-gray-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-gray-500"
            >
              復元
            </Link>
          </div>
        </div>
      }
    >

      <Head title="従業員一覧" />
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
                      <th className="py-3 px-2 text-center">
                        アイコン
                      </th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        氏名
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        メールアドレス
                      </TableHeading>
                      <TableHeading
                        name="office_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        事業所
                      </TableHeading>
                      <TableHeading
                        name="is_admin"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        管理者権限
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
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-auto max-w-12"
                          defaultValue={queryParams.id}
                          placeholder="ID"
                          onBlur={e => searchFieldChanged('id', e.target.value)}
                          onKeyPress={e => onKeyPress('id', e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-auto max-w-24"
                          defaultValue={queryParams.name}
                          placeholder="氏名"
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-auto"
                          defaultValue={queryParams.email}
                          placeholder="メールアドレス"
                          onBlur={e => searchFieldChanged('email', e.target.value)}
                          onKeyPress={e => onKeyPress('email', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-auto"
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
                      <th className="px-3 py-2 "></th>
                      <th className="px-3 py-2 "></th>
                      <th className="px-3 py-2 "></th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map(user => (
                      <tr className="bg-white border-b" key={user.id}>
                        <td className="px-3 py-3">{user.id}</td>
                        <td className="px-3 py-3 ">
                          <UserAvatar user={user} />
                        </td>
                        <td className="px-3 py-3 hover:underline">
                          <Link href={route("user.show", user.id)}>
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 ">{user.email}</td>
                        <td className="px-3 py-3 ">{user.office.name}</td>
                        <td className="px-3 py-3 text-center text-nowrap">
                          {user.is_admin ? "あり" : "なし"}
                        </td>
                        <td className="px-3 py-3 text-nowrap">{user.created_at}</td>
                        <td className="px-3 py-3 text-nowrap">{user.updated_at}</td>
                        <td className="px-3 py-3 text-center text-nowrap flex">
                          { user.office.id == auth.user.office.id || auth.user.is_global_admin?(
                            <Link
                            href={route('user.edit', user.id)}
                            className="font-medium text-blue-600 mx-1 hover:underline"
                            >
                              編集
                            </Link>
                          ): <div className="font-medium text-gray-300 mx-1">編集</div>}
                          {(auth.user.is_admin && user.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
                          <button
                          onClick={(e) => archiveUser(user)}
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
              <Pagenation links={users.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
