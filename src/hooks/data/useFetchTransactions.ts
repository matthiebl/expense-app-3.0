import { useEffect, useState } from 'react'
import { useUserProfile } from '@/contexts/UserProfileContext'
import { auth } from '@/lib/firebase/auth'
import { db } from '@/lib/firebase/database'
import { DecoratedTransaction } from '@/models/transactions'
import { onAuthStateChanged } from 'firebase/auth'
import { useCategories } from '@/contexts/CategoryContext'

export const useFetchTransactions = () => {
    const user = useUserProfile()
    const categories = useCategories()

    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState<DecoratedTransaction[]>([])

    useEffect(() => {
        if (user.loading || categories.loading) {
            return
        }
        if (!user.uid) {
            setLoading(false)
            return
        }
        const categoryMap: Record<string, { kind: string; category: string }> = {}
        categories.categories.forEach(({ id, kind, category }) => {
            categoryMap[id] = { kind, category }
        })
        db.transactions(user.uid, data => {
            setTransactions(
                data.map(transaction => ({
                    ...transaction,
                    categoryId: transaction.category,
                    category: categoryMap[transaction.category].category,
                    categoryKind: categoryMap[transaction.category].kind,
                })),
            )
            setLoading(false)
        })
    }, [user])

    const formatAmount = (value: number): string => {
        if (value < 0) {
            return '-$' + Math.abs(value).toFixed(2)
        }
        return '$' + value.toFixed(2)
    }

    return {
        loading,
        transactions,
        formatAmount,
    }
}
