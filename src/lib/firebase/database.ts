import { Firestore, Timestamp, collection, getDocs, query, where } from 'firebase/firestore'
import { dbFB } from './config'

export type Category = {
    id: string
    uid: string
    kind: 'Income' | 'Expense'
    category: string
    createdAt: Timestamp
}

class FireDB {
    fb: Firestore

    constructor(db: Firestore) {
        this.fb = db
    }

    async categories(uid: string) {
        const q = query(collection(this.fb, 'categories'), where('uid', '==', uid))
        const docs = await getDocs(q)
        const categories: Category[] = []
        docs.forEach(doc => {
            const data = doc.data()
            categories.push({
                id: doc.id,
                uid: data.uid,
                kind: data.kind,
                category: data.category,
                createdAt: data.createdAt,
            })
        })
        return categories
    }
}

export const db = new FireDB(dbFB)
