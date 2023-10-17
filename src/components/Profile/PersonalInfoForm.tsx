'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '../Toasts'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

export function PersonalInfoForm() {
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth.auth, user => {
            if (user) {
                setDisplayName(user.displayName || '')
                setEmail(user.email || '')
                setLoading(false)
            }
        })
    }, [])

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await auth.updateProfile(displayName)
        if (error) {
            toastError('Update failed', error.message)
        } else {
            toastSuccess('Details updated successfully!')
            router.refresh()
        }
    }

    return (
        <form className='md:col-span-2' onSubmit={handleSave}>
            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                <div className='col-span-full'>
                    <label
                        htmlFor='display-name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Display name
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='display-name'
                            id='display-name'
                            autoComplete='given-name'
                            required
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                            disabled={loading}
                            className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='col-span-full'>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
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
                            disabled={true}
                            className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>
            </div>

            <div className='mt-8 flex'>
                <button
                    type='submit'
                    disabled={loading}
                    className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                >
                    Save
                </button>
            </div>
        </form>
    )
}
