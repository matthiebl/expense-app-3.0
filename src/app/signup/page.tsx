import { SignupForm } from '@/components/Signup/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className='flex min-h-full flex-1 flex-col justify-center bg-slate-900 px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-lg'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                    Sign Up
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-lg'>
                <SignupForm />

                <p className='mt-10 text-center text-sm text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='font-semibold leading-6 text-indigo-400 hover:text-indigo-300'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
