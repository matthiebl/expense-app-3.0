import { Timestamp } from 'firebase/firestore'

export interface TransactionInput {
    title: string
    description: string
    category: string
    amount: string
    date: string
}

export interface Transaction {
    id: string
    uid: string
    title: string
    description: string
    amount: number
    date: string
    category: string
    group: string
    createdAt: Timestamp
}

export type DecoratedTransaction = {
    id: string
    uid: string
    title: string
    description: string
    amount: number
    date: string
    categoryId: string
    category: string
    categoryKind: string
    group: string
    createdAt: Timestamp
}
