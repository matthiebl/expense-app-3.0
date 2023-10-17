'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

export function AuthListener() {
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            if (!user) {
                router.replace('/')
            }
        })
    }, [])

    return <></>
}
