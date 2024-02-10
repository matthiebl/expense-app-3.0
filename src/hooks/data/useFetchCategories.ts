import { auth } from '@/lib/firebase/auth'
import { db } from '@/lib/firebase/database'
import { Category } from '@/models/categories'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useFetchCategories = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            if (!user) {
                setLoading(false)
                return
            }
            db.categories(user.uid, data => {
                setCategories(data)
                setLoading(false)
            })
        })
    }, [])

    return {
        loading,
        categories,
    }
}
