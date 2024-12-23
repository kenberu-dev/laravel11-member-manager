import Pagenation from "@/Components/Pagenation";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, offices, members,  queryParams = null}) {
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
      queryParams['page'] = 1
    } else {
      delete queryParams[name]
    }

    router.get(route('member.index'), queryParams)
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
    router.get(route('member.index'), queryParams)
  }

  const deleteMember = (member) => {
    if(!window.confirm("削除されたデータはもとに戻すことができません！\n削除しますか？")) {
      return;
    }
    router.delete(route('member.destroy', member.id));
  }

  const alertColor = (member) => {
    let loadDate = new Date();
    let distDate = new Date(member.update_limit)
    let diffMilliSec = distDate - loadDate;
    let diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24);

    if (member.status == "利用意思獲得" || member.status == "利用中") {
      if (member.started_at == member.update_limit) {
        return "bg-blue-400";
      }
      if (diffDays < 14) {
        return "bg-red-400";
      }
      if (diffDays < 30) {
        return "bg-amber-400";
      } else {
        return "bg-white";
      }
    }
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
            href={route("member.create")}
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
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        氏名
                      </TableHeading>
                      <TableHeading
                        name="sex"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        性別
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
                        name="characteristics"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        特性・障害
                      </TableHeading>
                      <TableHeading
                        name="started_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        利用開始日
                      </TableHeading>
                      <TableHeading
                        name="update_limit"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        更新期限
                      </TableHeading>
                      <th className="px-3 py-2 text-center">編集・削除</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="氏名"
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                      <SelectInput
                          className="w-full"
                          defaultValue={queryParams.sex}
                          onChange={e =>
                            searchFieldChanged("sex", e.target.value)
                          }
                        >
                          <option value="">性別</option>
                          <option value="男性">男性</option>
                          <option value="女性">女性</option>
                          <option value="その他">その他</option>
                        </SelectInput>
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
                          <option value="体験">体験</option>
                          <option value="利用意思獲得">利用意思獲得</option>
                          <option value="利用中">利用中</option>
                          <option value="利用中止">利用中止</option>
                          <option value="利用終了">利用終了</option>
                          <option value="定着中">定着中</option>
                          <option value="ロスト">ロスト</option>
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
                          defaultValue={queryParams.characteristics}
                          placeholder="特性・障害"
                          onBlur={e => searchFieldChanged('characteristics', e.target.value)}
                          onKeyPress={e => onKeyPress('characteristics', e)}
                        />
                      </th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.data.map(member => (
                      <tr className={alertColor(member) + ` border-b`} key={member.id}>
                        <td className="px-3 py-3 hover:underline">
                          <Link href={route("member.show", member.id)}>
                            {member.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 ">{member.sex}</td>
                        <td className="px-3 py-3 ">{member.status}</td>
                        {auth.user.is_global_admin ? (
                          <td className="px-3 py-3 text-center">{member.office.name}</td>
                        ):<td></td>}
                        <td className="px-3 py-3 text-center">{member.characteristics}</td>
                        <td className="px-3 py-3 text-nowrap">{member.started_at}</td>
                        <td className="px-3 py-3 text-nowrap">
                          <div className="">
                            {member.update_limit}
                          </div>                        </td>
                        <td className="px-3 py-3 text-center text-nowrap flex">
                          { member.office.id == auth.user.office.id || auth.user.is_global_admin?(
                            <Link
                            href={route('member.edit', member.id)}
                            className="font-medium text-blue-600 mx-1 hover:underline"
                            >
                              編集
                            </Link>
                          ): <div className="font-medium text-gray-300 mx-1">編集</div>}
                          {(auth.user.is_admin && member.office.id == auth.user.office.id) || auth.user.is_global_admin ? (
                          <button
                          onClick={(e) => deleteMember(member)}
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
              <Pagenation links={members.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
