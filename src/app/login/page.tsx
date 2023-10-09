import Link from 'next/link'
import { LoginForm } from '@/components/Login/LoginForm'

export default function LoginPage() {
    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-lg'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                    Login
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-lg'>
                <LoginForm />

                <p className='mt-10 text-center text-sm text-gray-400'>
                    First time here?{' '}
                    <Link
                        href='/signup'
                        className='font-semibold leading-6 text-indigo-400 hover:text-indigo-300'
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
