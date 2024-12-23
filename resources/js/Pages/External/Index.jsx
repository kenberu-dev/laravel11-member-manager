import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, offices, externals,  queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
      queryParams['page'] = 1
    } else {
      delete queryParams[name]
    }

    router.get(route('external.index'), queryParams)
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
    router.get(route('external.index'), queryParams)
  }

  const deleteMember = (external) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('external.destroy', external.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            外部対応一覧
          </h2>
          <Link
            href={route("external.create")}
            className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
          >
            新規作成
          </Link>
        </div>
      }
    >
      <Head title="外部対応一覧" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="company_name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        会社名
                      </TableHeading>
                      <TableHeading
                        name="manager_name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        担当者名
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ステータス
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
                        name="address"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        住所
                      </TableHeading>
                      <TableHeading
                        name="phone_number"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        電話番号
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        メールアドレス
                      </TableHeading>
                      <th className="px-3 py-2 text-center">編集・削除</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.company_name}
                          placeholder="会社名"
                          onBlur={e => searchFieldChanged('company_name', e.target.value)}
                          onKeyPress={e => onKeyPress('company_name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.manager_name}
                          placeholder="担当者名"
                          onBlur={e => searchFieldChanged('manager_name', e.target.value)}
                          onKeyPress={e => onKeyPress('manager_name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                      <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={e =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">ステータス</option>
                          <option value="見学">見学</option>
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
                      <th className="px-3 py-2">
                      <TextInput
                          className="w-full"
                          defaultValue={queryParams.address}
                          placeholder="住所"
                          onBlur={e => searchFieldChanged('address', e.target.value)}
                          onKeyPress={e => onKeyPress('address', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.phone_number}
                          placeholder="電話番号"
                          onBlur={e => searchFieldChanged('phone_number', e.target.value)}
                          onKeyPress={e => onKeyPress('phone_number', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.email}
                          placeholder="メールアドレス"
                          onBlur={e => searchFieldChanged('email', e.target.value)}
                          onKeyPress={e => onKeyPress('email', e)}
                        />
                      </th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {externals.data.map(external => (
                      <tr className="border-b" key={external.id}>
                        <td className="px-3 py-3 hover:underline">
                          <Link href={route("external.show", external.id)}>
                            {external.company_name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 ">{external.manager_name}</td>
                        <td className="px-3 py-3 ">{external.status}</td>
                        {auth.user.is_global_admin ? (
                          <td className="px-3 py-3 text-center">{external.office.name}</td>
                        ):<td></td>}
                        <td className="px-3 py-3 text-center">{external.address}</td>
                        <td className="px-3 py-3 text-nowrap">{external.phone_number}</td>
                        <td className="px-3 py-3 text-nowrap">{external.email}</td>
                        <td className="px-3 py-3 text-center text-nowrap flex">
                          { external.office.id == auth.user.office.id || auth.user.is_global_admin?(
                            <Link
                            href={route('external.edit', external.id)}
                            className="font-medium text-blue-600 mx-1 hover:underline"
                            >
                              編集
                            </Link>
                          ): <div className="font-medium text-gray-300 mx-1">編集</div>}
                          {(auth.user.is_admin && external.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
                          <button
                          onClick={(e) => deleteMember(external)}
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
              <Pagenation links={externals.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
