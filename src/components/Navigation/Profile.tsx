import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toastError } from '../Toasts'
import { auth } from '@/lib/firebase/auth'
import { authFB } from '@/lib/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export function Profile() {
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth.auth, user => {
            if (user) {
                setName(user.displayName)
            }
        })
    }, [])

    return (
        <>
            <Link
                href='/profile'
                className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800'
            >
                <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100'>
                    <svg
                        className='h-full w-full text-gray-300'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                </span>
                <span className='sr-only'>Your profile</span>
                {name ? (
                    <span aria-hidden='true'>{name}</span>
                ) : (
                    <span
                        aria-hidden='true'
                        className='h-6 w-32 animate-pulse rounded-md bg-white/30'
                    />
                )}
            </Link>
        </>
    )
}
