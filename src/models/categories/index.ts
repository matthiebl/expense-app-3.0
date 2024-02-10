import { Timestamp } from 'firebase/firestore'

export interface CategoryInput {
    kind: 'Income' | 'Expense'
    category: string
}

export interface Category {
    id: string
    uid: string
    kind: 'Income' | 'Expense'
    category: string
    createdAt: Timestamp
}

export type CategorySort = 'category' | 'type' | 'none'
