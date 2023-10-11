import { LogoutButton } from '@/components/Profile/LogoutButton'
import { PersonalInfoForm } from '@/components/Profile/PersonalInfoForm'

export default function Profile() {
    return (
        <div className='divide-y divide-gray-200/50'>
            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                <div>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Personal Information
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-500'>
                        Use a permanent address where you can receive mail.
                    </p>
                </div>

                <PersonalInfoForm />
            </div>

            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                <div>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Change password
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-500'>
                        Update your password associated with your account.
                    </p>
                </div>

                <form className='md:col-span-2'>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                        <div className='col-span-full'>
                            <label
                                htmlFor='current-password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Current password
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='current-password'
                                    name='current_password'
                                    type='password'
                                    autoComplete='current-password'
                                    disabled
                                    className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label
                                htmlFor='new-password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                New password
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='new-password'
                                    name='new_password'
                                    type='password'
                                    autoComplete='new-password'
                                    disabled
                                    className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label
                                htmlFor='confirm-password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Confirm password
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='confirm-password'
                                    name='confirm_password'
                                    type='password'
                                    autoComplete='new-password'
                                    disabled
                                    className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex'>
                        <button
                            type='submit'
                            disabled
                            className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                <div>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>Logout</h2>
                </div>

                <div className='flex'>
                    <LogoutButton />
                </div>
            </div>

            <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                <div>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Delete account
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-500'>
                        No longer want to use our service? You can delete your account here. This
                        action is not reversible. All information related to this account will be
                        deleted permanently.
                    </p>
                </div>

                <form className='flex items-start md:col-span-2'>
                    <button
                        disabled
                        className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400'
                    >
                        Yes, delete my account
                    </button>
                </form>
            </div>
        </div>
    )
}
