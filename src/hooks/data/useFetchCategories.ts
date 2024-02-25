import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/database'
import { useUserProfile } from '@/contexts/UserProfileContext'
import { Category } from '@/models/categories'

export interface CategoriesHook {
    loading: boolean
    categories: Category[]
}

export const useFetchCategories = () => {
    const user = useUserProfile()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        if (user.loading) {
            return
        }
        if (!user.uid) {
            setLoading(false)
            return
        }
        db.categories(user.uid, data => {
            setCategories(data)
            setLoading(false)
        })
    }, [user])

    return {
        loading,
        categories,
    }
}
