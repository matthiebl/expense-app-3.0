'use client'

import { FormEvent } from 'react'

export function SignupForm() {
    async function onRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
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
                        className='block w-full rounded-md border-0 bg-white/5 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                </div>
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
