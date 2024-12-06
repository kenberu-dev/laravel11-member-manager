import { useEffect, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/24/solid'
import { useEventBus } from '@/EventBus';
import MemberDropDown from '@/Components/MemberDropDown';
import ExternalDropDown from '@/Components/ExternalDropDown';

export default function AuthenticatedLayout({ header, children }) {
  const page = usePage();
  const user = page.props.auth.user;
  const conversations = page.props.conversations;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const { emit } = useEventBus();


  useEffect(() => {
    conversations.forEach((conversation) => {
      let channel = [];
      if (user.id === conversation.user_id) {
        channel = `message.meetinglog.${conversation.id}`
      }
      Echo.private(channel)
        .error((error) => {
          console.error(error);
        })
        .listen("SocketMessage", (e) => {
          console.log("SocketMessage", e);
          const message = e.message;

          emit("message.created", message);
          if (message.sender_id === user.id) {
            return;
          }
          emit("newMessageNotification", {
            user: message.sender,
            meeting_logs_id: message.meeting_logs_id,
            message: message.message
          });
        });
    });

    return () => {
      conversations.forEach((conversation) => {
        let channel = [];
        if (user.id === conversation.user_id) {
          channel = `message.meetinglog.${conversation.id}`
          Echo.leave(channel);
        }
      });
    }
  }, [conversations]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <HomeIcon className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>

              <div className="hidden space-x-4 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                  ダッシュボード
                </NavLink>
                <MemberDropDown
                  active={route().current('member.index') || route().current('meetinglog.index')}
                >
                  利用者対応
                </MemberDropDown>
                <ExternalDropDown
                  active={route().current('external.index') || route().current('external.meetinglog.index')}
                >
                  外部対応
                </ExternalDropDown>
                {user.is_admin || user.is_global_admin ? (
                  <NavLink href={route('user.index')} active={route().current('user.index')}>
                    従業員一覧
                  </NavLink>
                ):""}
                { user.is_global_admin ? (
                  <NavLink href={route('office.index')} active={route().current('office.index')}>
                    事業所一覧
                  </NavLink>
                ):""}
                <NavLink href={route('crm.index')} active={route().current('crm.index')}>
                  CRM
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user.name}
                        <ChevronDownIcon className="ms-2 -me-0.5 h-4 w-4"/>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>プロフィール編集</Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                      ログアウト
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              ダッシュボード
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('meetinglog.index')} active={route().current('meetinglog.index')}>
              面談記録
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('member.index')} active={route().current('member.index')}>
              利用者一覧
            </ResponsiveNavLink>
            {user.is_admin || user.is_global_admin ? (
              <ResponsiveNavLink href={route('user.index')} active={route().current('user.index')}>
                従業員一覧
              </ResponsiveNavLink>
            ):""}
            { user.is_global_admin ? (
              <ResponsiveNavLink href={route('office.index')} active={route().current('office.index')}>
                事業所一覧
              </ResponsiveNavLink>
            ):""}
            <ResponsiveNavLink href={route('crm.index')} active={route().current('crm.index')}>
              CRM
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>
                プロフィール編集
              </ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                ログアウト
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
