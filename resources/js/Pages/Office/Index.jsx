import Pagenation from "@/Components/Pagenation";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, offices, queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('office.index'), queryParams)
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
    router.get(route('office.index'), queryParams)
  }

  const deleteOffice = (office) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('office.destroy', office.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            利用者一覧
          </h2>
          <Link
            href={route("office.create")}
            className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
          >
            新規作成
          </Link>
        </div>
      }
    >

      <Head title="利用者一覧" />
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
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        事業所名
                      </TableHeading>
                      <TableHeading
                        name="zip_code"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        郵便番号
                      </TableHeading>
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
                          className="w-28"
                          defaultValue={queryParams.name}
                          placeholder="事業所名"
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.zip_code}
                          placeholder="郵便番号"
                          onBlur={e => searchFieldChanged('zip_code', e.target.value)}
                          onKeyPress={e => onKeyPress('zip_code', e)}
                        />
                      </th>
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
                      <th className="px-3 py-2 "></th>
                      <th className="px-3 py-2 "></th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {offices.data.map(office => (
                      <tr className="bg-white border-b" key={office.id}>
                        <td className="px-3 py-3">{office.id}</td>
                        <td className="px-3 py-3 hover:underline">
                          <Link href={route("office.show", office.id)}>
                            {office.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 ">{office.zip_code}</td>
                        <td className="px-3 py-3 ">{office.address}</td>
                        <td className="px-3 py-3 ">{office.phone_number}</td>
                        <td className="px-3 py-3 text-nowrap">{office.created_at}</td>
                        <td className="px-3 py-3 text-nowrap">{office.updated_at}</td>
                        <td className="px-3 py-3 text-center text-nowrap flex">
                          { auth.user.is_global_admin?(
                            <Link
                            href={route('office.edit', office.id)}
                            className="font-medium text-blue-600 mx-1 hover:underline"
                            >
                              編集
                            </Link>
                          ): <div className="font-medium text-gray-300 mx-1">編集</div>}
                          { auth.user.is_global_admin ? (
                          <button
                          onClick={(e) => deleteOffice(office)}
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
              <Pagenation links={offices.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
