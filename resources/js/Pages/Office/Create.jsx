import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import UserAvatar from "@/Components/Message/UserAvatar";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create ({ auth }) {

  const {data, setData, post, errors, reset} = useForm({
    name: "",
    zip_code: "",
    address: "",
    phone_number: "",
  })

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    post(route('office.index'));
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          事業所登録
        </h2>
      </div>
    }
  >
      <Head title="事業所登録" />
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
                  value="事業所名"
                />
                <TextInput
                  id="name"
                  type="text"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="zip_code"
                  value="郵便番号"
                />
                <TextInput
                  id="zip_code"
                  type="text"
                  value={data.zip_code}
                  pattern="\d{3}-\d{4}"
                  placeholder="xxx-xxxx"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("zip_code", e.target.value)}
                  required
                />
                <InputError message={errors.zip_code} className="mt-2" />
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
                  required
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
                  type="tel"
                  name="phone_number"
                  pattern="\d{1,5}-\d{1,4}-\d{4,5}"
                  placeholder="xxx-xxx-xxxx"
                  value={data.phone_number}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('phone_number', e.target.value)}
                  required
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("office.index")}
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
