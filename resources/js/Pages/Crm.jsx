import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Crm ({auth, visiters, experiencers, premembers, members}){

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        CRM
      </h2>
    }
  >
    <Head title="CRM" />

    <div className="py-6">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between p-6 text-gray-900 dark:text-gray-100">
              <label className="text-xl">見学</label>
              <div className="text-xl text-right font-bold">{visiters.data.length}件</div>
            </div>
            <table>
              <tbody>
                {visiters.data.map(visiter => (
                  <tr key={visiter.id}>
                    <td className="badge badge-neutral badge-lg m-1 hover:underline">
                      <Link href={route("member.show", visiter.id)}>
                        {visiter.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between p-6 text-gray-900 dark:text-gray-100">
              <label className="text-xl">体験</label>
              <div className="text-xl text-right font-bold">{experiencers.data.length}件</div>
            </div>
            <table>
              <tbody>
                {experiencers.data.map(experiencer => (
                  <tr key={experiencer.id}>
                    <td className="badge badge-neutral badge-lg m-1 hover:underline">
                      <Link href={route("member.show", experiencer.id)}>
                        {experiencer.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between p-6 text-gray-900 dark:text-gray-100">
              <label className="text-xl">利用意思獲得</label>
              <div className="text-xl text-right font-bold">{premembers.data.length}件</div>
            </div>
            <table>
              <tbody>
                {premembers.data.map(premember => (
                  <tr key={premember.id}>
                    <td className="badge badge-neutral badge-lg m-1 hover:underline">
                      <Link href={route("member.show", premember.id)}>
                        {premember.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between p-6 text-gray-900 dark:text-gray-100">
              <label className="text-xl">利用中</label>
              <div className="text-xl text-right font-bold">{members.data.length}件</div>
            </div>
            <table>
              <tbody>
                {members.data.map(member => (
                  <tr key={member.id}>
                    <td className="badge badge-neutral badge-lg m-1 hover:underline">
                      <Link
                        href={route("member.show", member.id)}
                      >
                        {member.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
);
}
