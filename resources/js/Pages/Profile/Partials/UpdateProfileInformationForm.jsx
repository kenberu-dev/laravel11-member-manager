import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import UserAvatar from '@/Components/Message/UserAvatar';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        avatar: null,
        email: user.email,
        _method: "PATCH",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">プロフィール</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">

                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
              <div className="flex items-center gap-10">
                <UserAvatar user={user} profile={true} />
                <div>
                    <InputLabel htmlFor="name" value="プロフィール画像" />

                    <input
                        id="avatar"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => setData('avatar', e.target.files[0])}
                    />
                    <p className="mt-1 text-gray-800">
                      正方形の画像をアップロードしてください 例:512px&times;512px
                    </p>

                    <InputError className="mt-2" message={errors.avatar} />
                </div>
              </div>

                <div>
                    <InputLabel htmlFor="name" value="名前" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="メール" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            メールが認証されました
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                認証メールを再送信.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                登録したメールアドレスに新しい認証リンクを送信しました
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">保存しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
