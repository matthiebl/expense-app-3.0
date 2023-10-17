'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/auth'
import { toastError, toastSuccess } from '../Toasts'

export function SignupForm() {
    const router = useRouter()

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { error } = await auth.signUp(email, password)
        if (error) {
            toastError(error.message)
            return
        }

        const { error: updateError } = await auth.updateProfile(displayName)
        if (updateError) {
            toastError(updateError.message)
            return
        }

        toastSuccess(`Welcome ${displayName}!`, `You're all ready to go!`)
        router.push('/dashboard')
    }

    return (
        <form className='space-y-4' onSubmit={onRegister}>
            <div>
                <label
                    htmlFor='display-name'
                    className='block text-sm font-medium leading-6 text-white'
                >
                    Display name
                </label>
                <div className='mt-2'>
                    <input
                        id='display-name'
                        name='display-name'
                        type='text'
                        required
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>

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
                <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-white'
                >
                    Password
                </label>
                <div className='mt-2'>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        pattern='.{8,}'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                </div>
                <p className='mt-2 text-sm text-gray-500' id='email-description'>
                    Password must be at least 8 characters.
                </p>
            </div>

            <div>
                <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}
