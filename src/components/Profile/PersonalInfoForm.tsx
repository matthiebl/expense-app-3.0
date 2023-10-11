'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/database'
import { toastError, toastSuccess } from '../Toasts'
import { useRouter } from 'next/navigation'

export function PersonalInfoForm() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const [loading, setLoading] = useState(true)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getUserDetails = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('firstname, lastname, email')
                .single()
            if (error) {
                toastError('Failed to fetch user entry', error.message)
                return
            }
            if (!data) {
                toastError('No user data was returned')
                return
            }
            setFirstname(data.firstname)
            setLastname(data.lastname)
            setEmail(data.email)
            setLoading(false)
        }
        getUserDetails()
    }, [])

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await supabase
            .from('users')
            .update({ firstname, lastname, fullname: `${firstname} ${lastname}` })
            .eq('email', email)
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
                <div className='sm:col-span-3'>
                    <label
                        htmlFor='first-name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        First name
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='first-name'
                            id='first-name'
                            autoComplete='given-name'
                            required
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            disabled={loading}
                            className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='sm:col-span-3'>
                    <label
                        htmlFor='last-name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Last name
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='last-name'
                            id='last-name'
                            required
                            autoComplete='family-name'
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
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
