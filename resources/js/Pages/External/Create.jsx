import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create ({ auth, offices }) {

  const {data, setData, post, errors, reset} = useForm({
    company_name: "",
    manager_name: "",
    office_id: auth.user.office.id || "",
    status: "",
    address: "",
    phone_number: "",
    email: "",
    notes: "",
  })

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('external.index'));
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
          <div className=" text-gray-900 w-1/2 bg-white shadow sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-6 sm:p-8"
            >
              <div className="mt-4">
                <InputLabel
                  htmlFor="company_name"
                  value="会社名"
                />
                <TextInput
                  id="company_name"
                  type="text"
                  value={data.company_name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("company_name", e.target.value)}
                />
                <InputError message={errors.company_name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="manager_name"
                  value="担当者名"
                />
                <TextInput
                  id="manager_name"
                  type="text"
                  value={data.manager_name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("manager_name", e.target.value)}
                />
                <InputError message={errors.manager_name} className="mt-2" />
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
                  <option value="見学">見学</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="address"
                  value="住所"
                />
                <TextInput
                  id="address"
                  type="text"
                  value={data.address}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("address", e.target.value)}
                />
                <InputError message={errors.address} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="phone_number"
                  value="電話番号"
                />
                <TextInput
                  id="phone_number"
                  type="text"
                  value={data.phone_number}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("phone_number", e.target.value)}
                />
                <InputError message={errors.phone_number} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="email"
                  value="メールアドレス"
                />
                <TextInput
                  id="email"
                  type="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
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
