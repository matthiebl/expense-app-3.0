'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/database'

export function SignupForm() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { error: registerError } = await supabase.auth.signUp({
            email,
            password,
        })
        if (registerError) {
            console.error(`Failed to signup: ${registerError.message}`)
            return
        }

        const { error } = await supabase.from('users').insert({
            email,
            firstname,
            lastname,
            fullname: firstname + ' ' + lastname,
        })
        if (error) {
            console.error(`Failed to add user entry: ${error.message}`)
            return
        }

        router.push('/dashboard')
    }

    return (
        <form className='space-y-4' onSubmit={onRegister}>
            <div className='flex flex-col gap-4 sm:flex-row'>
                <div className='flex-1'>
                    <label
                        htmlFor='firstname'
                        className='block text-sm font-medium leading-6 text-white'
                    >
                        First name
                    </label>
                    <div className='mt-2'>
                        <input
                            id='firstname'
                            name='firstname'
                            type='text'
                            required
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='flex-1'>
                    <label
                        htmlFor='lastname'
                        className='block text-sm font-medium leading-6 text-white'
                    >
                        Last name
                    </label>
                    <div className='mt-2'>
                        <input
                            id='lastname'
                            name='lastname'
                            type='text'
                            required
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                            className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                        />
                    </div>
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
