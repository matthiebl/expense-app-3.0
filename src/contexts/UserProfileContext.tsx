'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

export interface UserProfileHook {
    loading: boolean
    uid: string
    name: string
}

const UserProfileContext = createContext<UserProfileHook | null>(null)

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState({
        uid: '',
        name: 'Unknown',
    })

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            setLoading(false)
            if (!user) {
                return
            }
            setUserProfile({
                uid: user.uid,
                name: user.displayName || 'Unknown',
            })
        })
    }, [])

    const value = {
        loading,
        ...userProfile,
    }

    return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export const useUserProfile = () => {
    const context = useContext(UserProfileContext)
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider')
    }
    return context
}
