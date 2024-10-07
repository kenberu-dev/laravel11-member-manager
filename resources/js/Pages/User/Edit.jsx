import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import UserAvatar from "@/Components/Message/UserAvatar";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create ({ auth, offices, user }) {

  const {data, setData, post, errors, reset} = useForm({
    name: user.name || "",
    avatar: null,
    email: user.email || "",
    office_id: user.office.id || "",
    is_admin: user.is_admin || false,
    _method: "PATCH",
  })

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    post(route('user.update', user.id));
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          プロフィール編集 - {user.name}
        </h2>
      </div>
    }
  >
      <Head title="プロフィール編集" />
      <div className="py-12">
        <div className="flex gap-4 justify-center items-start max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className=" text-gray-900 w-1/2 bg-white shadow sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-6 sm:p-8"
            >
              <div className="mt-4 flex items-center gap-5">
                <UserAvatar user={user} profile={true} />
                <div>
                  <InputLabel htmlFor="name" value="プロフィール画像(任意)" />
                  <input
                      id="avatar"
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                      onChange={(e) => setData('avatar', e.target.files[0])}
                  />
                  <InputError className="mt-2" message={errors.avatar} />
                </div>
              </div>
              <p className="mt-1 text-gray-800">
                正方形の画像をアップロードしてください 例:512px&times;512px
              </p>
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
                  required
                />
                <InputError message={errors.name} className="mt-2" />
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
                  required
                />
                <InputError message={errors.email} className="mt-2" />
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
                  required
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
                  htmlFor="is_admin"
                  value="管理者権限"
                />
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">このアカウントに管理者権限を与える</span>
                    <input
                      id="is_admin"
                      type="checkbox"
                      value={data.is_admin}
                      checked = {data.is_admin ? "checked" : ""}
                      onChange={(e) => setData("is_admin", e.target.checked)}
                      className="checkbox"
                    />
                  </label>
                </div>
                <InputError message={errors.is_admin} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                  <Link
                    href={route("user.index")}
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
