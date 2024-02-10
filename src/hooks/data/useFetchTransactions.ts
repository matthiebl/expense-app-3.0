import { auth } from '@/lib/firebase/auth'
import { db } from '@/lib/firebase/database'
import { DecoratedTransaction } from '@/models/transactions'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useFetchTransactions = () => {
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState<DecoratedTransaction[]>([])

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            if (!user) {
                setLoading(false)
                return
            }
            db.categories(user.uid, categories => {
                const categoryMap: Record<string, { kind: string; category: string }> = {}
                categories.forEach(({ id, kind, category }) => {
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
            })
        })
    }, [])

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
