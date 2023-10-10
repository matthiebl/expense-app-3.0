'use client'

import { Database } from '@/lib/supabase/database'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toastError } from '../Toasts'

export function LogoutButton() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    async function onLogout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toastError(`Unable to logout`, error.message)
            return
        }
        router.push('/')
    }

    return (
        <button
            type='button'
            onClick={onLogout}
            className='inline-flex items-center gap-x-1.5 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
        >
            <ArrowLeftOnRectangleIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
            Logout
        </button>
    )
}
