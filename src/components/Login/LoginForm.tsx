'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '../Toasts'
import { auth } from '@/lib/firebase/auth'

export function LoginForm() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { user, error } = await auth.signIn(email, password)
        if (error) {
            toastError(error.message)
            return
        }
        toastSuccess(`Welcome back ${user.displayName}!`, `Logged in as ${user.email}`)

        router.push('/dashboard')
    }

    return (
        <form className='space-y-4' onSubmit={onRegister}>
            <div>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-white'>
                    Email address
                </label>
                <div className='mt-2'>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>

            <div>
                <div className='flex items-center justify-between'>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-white'
                    >
                        Password
                    </label>
                    <div className='text-sm'>
                        <a href='#' className='font-semibold text-indigo-400 hover:text-indigo-300'>
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className='mt-2'>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>

            <div>
                <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                >
                    Login
                </button>
            </div>
        </form>
    )
}
