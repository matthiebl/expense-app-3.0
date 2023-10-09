'use client'

import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/database'
import { useRouter } from 'next/navigation'

export function AuthListener() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.refresh()
            }
        })
    }, [])

    return <></>
}
