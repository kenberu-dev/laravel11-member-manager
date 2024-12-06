import Dropdown from './Dropdown';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function MemberDropDown({ active = false, className = '', children, ...props }) {
    return (
        <div
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700 '
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
          <Dropdown>
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center"
                >
                  {children}
                  <ChevronDownIcon className="ms-2 -me-0.5 h-4 w-4" />
                </button>
              </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link href={route('member.index')}>利用者一覧</Dropdown.Link>
              <Dropdown.Link href={route('meetinglog.index')}>面談記録一覧</Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>

    );
}
