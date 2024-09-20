import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, office }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`事業所詳細 - "${office.name}"`}
          </h2>
          <Link
            href={route("office.edit", office.id)}
            className="bg-emerald-400 py-1 px-3 text-gray-900 rounded shadown transition-all hover:bg-emerald-500"
          >
            編集
          </Link>
        </div>
      }
    >
      <Head title={`事業所詳細 - "${office.name}"`} />
      <div className="pt-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">ID</label>
                    <p className="mt-1">{office.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">事業所名</label>
                    <p className="mt-1">{office.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">郵便番号</label>
                    <p className="mt-1">{office.zip_code}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">住所</label>
                    <p className="mt-1">{office.address}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">電話番号</label>
                    <p className="mt-1">{office.phone_number}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">作成日</label>
                    <p className="mt-1">{office.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
