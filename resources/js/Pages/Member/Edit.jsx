import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create ({ auth, offices, member }) {

  const {data, setData, post, errors, reset} = useForm({
    name: member.name || "",
    sex: member.sex || "",
    office_id: member.office.id || "",
    status: member.status || "",
    characteristics: member.characteristics || "",
    notes: member.notes,
    _method: "PUT"
  })

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    post(route('member.update', member.id));
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {data.name}の編集
        </h2>
      </div>
    }
  >
      <Head title="編集画面" />
      <div className="py-12">
        <div className="flex gap-4 justify-center items-start max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className=" text-gray-900 w-1/2 bg-white shadow sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-6 sm:p-8"
            >
              <div className="mt-4">
                <InputLabel
                  htmlFor="name"
                  value="名前"
                />
                <TextInput
                  id="name"
                  type="text"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="sex"
                  value="性別"
                />
                <SelectInput
                  id="sex"
                  value={data.sex}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("sex", e.target.value)}
                >
                  <option value="">性別を選択してください</option>
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="その他">その他</option>
                </SelectInput>
                <InputError message={errors.sex} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="office_id"
                  value="所属事業所"
                />
                <SelectInput
                  id="office_id"
                  value={data.office_id}
                  defaultValue={auth.user.office_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("office_id", e.target.value)}
                >
                  <option value="">事業所を選択してください</option>
                  {offices.data.map(office => (
                    <option value={office.id} key={office.id}>{office.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.office_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="status"
                  value="ステータス"
                />
                <SelectInput
                  id="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">ステータスを選択してください</option>
                  <option value="利用中">利用中</option>
                  <option value="利用中止">利用中止</option>
                  <option value="利用終了">利用終了</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="characteristics"
                  value="特性・障害"
                />
                <TextInput
                  id="characteristics"
                  type="text"
                  value={data.characteristics}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("characteristics", e.target.value)}
                />
                <InputError message={errors.characteristics} className="mt-2" />
              </div>
              <div className="mt-4 max-h-96">
                <InputLabel
                  htmlFor="notes"
                  value="備考"
                />
                <TextAreaInput
                  id="notes"
                  rows="14"
                  value={data.notes}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("notes", e.target.value)}
                />
                <InputError message={errors.notes} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                  <Link
                    href={route("member.index")}
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
